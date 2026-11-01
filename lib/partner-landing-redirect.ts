/**
 * Partner vanity links (/flightfollower, /flightchops, /runway) and /ref/CODE.
 *
 * Why a server redirect: GA4 reads page_location when gtag config runs. The old
 * flow added ?ref= only inside a middleware rewrite, so the browser URL (and GA)
 * never saw it. A 307 puts utm_* and ref in the address bar before any script
 * runs, so it does not depend on consent timing, hydration order, or JS at all.
 * The redirect response runs no JS, so /api/campaign-visit still fires once,
 * on the final page, deduped per session by VariantTracker.
 *
 * Precedence (documented in the PR):
 * 1. Visitor UTMs win as a set. If the incoming URL has any non-blank key out
 *    of the 6 standard ones (utm_source, utm_medium, utm_campaign, utm_content,
 *    utm_term, utm_id), every incoming utm_* is kept as is and no partner UTM is
 *    added (no mixing of two campaigns in one URL). A nonstandard key such as
 *    utm_foo is kept but does not count, so it never blocks the partner tags.
 * 2. Otherwise utm_source, utm_medium, utm_campaign come from PARTNER_PATHS
 *    (mirror of campaign_codes).
 * 3. An explicit non-blank ?ref= wins over the vanity path code. On /ref/CODE
 *    the path code is the ref.
 * 4. All other params (fbclid, gclid, variant) are kept.
 * 5. /ref/CODE matches "ref" in any case (/REF/, /Ref/). The code is uppercased.
 *
 * Trailing slash: when the request reaches middleware, /flightfollower/ goes
 * straight to the tagged URL in one hop. On Vercel the built in Next.js
 * trailing slash 308 runs before middleware, so a typed /flightfollower/ still
 * sees that 308 first. Removing it needs skipTrailingSlashRedirect site wide,
 * which is out of scope for this PR (see PR body).
 *
 * 307 (temporary) on purpose: campaign values can change without cached hops.
 * Pure so it can run in middleware and in jsdom tests.
 */
import {
  PARTNER_PATHS,
  partnerSlugFromCode,
  partnerSlugFromPathname,
} from "@/lib/partner-paths"
import { isStandardUtmKey } from "@/lib/utm-keys"

export const PARTNER_REDIRECT_STATUS = 307

const UTM_DEFAULT_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const
const REF_PATH = /^\/ref\/([A-Za-z0-9_-]{2,32})\/*$/i

function hasVisitorUtm(params: URLSearchParams): boolean {
  for (const [key, value] of params) {
    if (isStandardUtmKey(key) && value.trim()) return true
  }
  return false
}

function withPartnerParams(
  incoming: URLSearchParams,
  slug: string,
  refOverride: string | null,
): URLSearchParams {
  const { code, utm } = PARTNER_PATHS[slug]
  const out = new URLSearchParams()
  const incomingRef = incoming.get("ref")?.trim() || null
  const ref = refOverride ?? incomingRef ?? code
  const addUtm = !hasVisitorUtm(incoming)

  for (const [key, value] of incoming) {
    if (key === "ref") continue
    if (addUtm && (UTM_DEFAULT_KEYS as readonly string[]).includes(key)) continue // blank placeholders
    out.append(key, value)
  }
  if (addUtm) {
    for (const key of UTM_DEFAULT_KEYS) out.set(key, utm[key])
  }
  out.set("ref", ref)
  return out
}

/**
 * Where a GET to this URL should 307, or null to serve it as is.
 * Bots are not redirected on vanity slugs, so link-unfurl previews stay one hop.
 */
export function partnerLandingRedirectTarget(
  url: URL,
  opts: { method?: string; isBot?: boolean } = {},
): URL | null {
  const method = (opts.method ?? "GET").toUpperCase()
  if (method !== "GET" && method !== "HEAD") return null

  const refMatch = REF_PATH.exec(url.pathname)
  if (refMatch) {
    const code = refMatch[1].toUpperCase()
    const slug = partnerSlugFromCode(code)
    const target = new URL(url.toString())
    if (slug) {
      target.pathname = `/${slug}`
      target.search = withPartnerParams(url.searchParams, slug, code).toString()
    } else {
      const params = new URLSearchParams(url.searchParams)
      params.set("ref", code)
      target.pathname = "/"
      target.search = params.toString()
    }
    return target
  }

  if (opts.isBot) return null
  const slug = partnerSlugFromPathname(url.pathname)
  if (!slug) return null

  const target = new URL(url.toString())
  target.pathname = `/${slug}`
  target.search = withPartnerParams(url.searchParams, slug, null).toString()

  const already =
    url.pathname === target.pathname &&
    url.searchParams.get("ref")?.trim() &&
    hasVisitorUtm(url.searchParams)
  return already ? null : target
}
