/**
 * Partner short-link allowlist: `/[slug]` → campaign code for the homepage funnel.
 *
 * Add future partners here (slug lowercase → CODE uppercase). Middleware rewrites
 * the path to the A/B homepage variants with `?ref=CODE`. Only allowlisted slugs
 * are rewritten — reserved app routes are never hijacked.
 *
 * Matching is case-insensitive and ignores a trailing slash (/FlightChops/ works).
 * Query strings (utm_*) are kept; an explicit ?ref= in the URL wins over the path.
 *
 * When adding a slug: (1) add it here, (2) add `/{slug}` to middleware `config.matcher`
 * (Next.js requires a static matcher array), (3) make sure the campaign_codes row exists
 * and is active (its greeting drives the banner; the app resolves the code at signup).
 */

export type PartnerUtm = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
}

export type PartnerPath = {
  /** Uppercase campaign_codes.code */
  code: string
  /**
   * Mirrors campaign_codes.utm_source, utm_medium, utm_campaign for this code.
   * Middleware puts these in the browser URL (307) so GA4 records the campaign.
   * Keep in sync with Supabase; lib/partner-landing-redirect.test.ts holds the snapshot.
   */
  utm: PartnerUtm
}

/** Lowercase path slug to partner campaign config. */
export const PARTNER_PATHS: Record<string, PartnerPath> = {
  runway: {
    code: "RUNWAY",
    utm: { utm_source: "runway", utm_medium: "partner", utm_campaign: "runway-to-oshkosh-2026" },
  },
  flightchops: {
    code: "FLIGHTCHOPS",
    utm: { utm_source: "flightchops", utm_medium: "partner", utm_campaign: "flightchops-2026" },
  },
  flightfollower: {
    code: "FLIGHTFOLLOWER",
    utm: { utm_source: "flightfollower", utm_medium: "partner", utm_campaign: "flightfollower-2026" },
  },
}

/** Lowercase path slug to uppercase campaign_codes.code */
export const PARTNER_PATH_CODES: Record<string, string> = Object.fromEntries(
  Object.entries(PARTNER_PATHS).map(([slug, p]) => [slug, p.code]),
)

/**
 * Existing (and likely) app routes that must never be registered as partner slugs.
 * Allowlist-only matching already protects these; this set is a guardrail.
 */
export const RESERVED_PARTNER_PATH_SLUGS = new Set([
  "about",
  "apps",
  "osh",
  "brand",
  "brand-login",
  "ga-customs",
  "boldface",
  "news",
  "blog",
  "invite",
  "ios",
  "variants",
  "api",
  "admin",
  "v2",
  "v3",
  "events",
  "research",
  "privacy",
  "terms",
  "cookies",
  "multi-model-analysis",
  "facebook-cover",
  "facebook-profile",
  "sitemap",
  "talk",
  "talks",
  "decision-support",
  "volunteer",
  "partners",
  "ambassadors",
  "_next",
])

for (const slug of Object.keys(PARTNER_PATHS)) {
  if (RESERVED_PARTNER_PATH_SLUGS.has(slug)) {
    throw new Error(
      `[partner-paths] Refusing to register reserved slug "/${slug}" as a partner path`
    )
  }
}

/** Single-segment pathname to lowercase partner slug, or null if not a partner short link. */
export function partnerSlugFromPathname(pathname: string): string | null {
  const trimmed = pathname.replace(/\/+$/, "") || "/"
  if (trimmed === "/") return null
  const segments = trimmed.split("/").filter(Boolean)
  if (segments.length !== 1) return null
  const slug = segments[0].toLowerCase()
  if (slug.includes(".")) return null // static files
  return slug in PARTNER_PATHS ? slug : null
}

/** Single-segment pathname to campaign code, or null if not a partner short link. */
export function partnerCodeFromPathname(pathname: string): string | null {
  const slug = partnerSlugFromPathname(pathname)
  return slug ? PARTNER_PATHS[slug].code : null
}

/** Campaign code (any case) to its partner slug, or null when the code has no vanity path. */
export function partnerSlugFromCode(code: string): string | null {
  const upper = code.trim().toUpperCase()
  for (const [slug, p] of Object.entries(PARTNER_PATHS)) {
    if (p.code === upper) return slug
  }
  return null
}
