/**
 * Partner short-link allowlist: `/[slug]` → campaign code for the homepage funnel.
 *
 * Add future partners here (slug lowercase → CODE uppercase). Middleware rewrites
 * the path to the A/B homepage variants with `?ref=CODE`. Only allowlisted slugs
 * are rewritten — reserved app routes are never hijacked.
 *
 * When adding a slug: (1) add it here, (2) add `/{slug}` to middleware `config.matcher`
 * (Next.js requires a static matcher array), (3) seed campaign_codes.
 */

/** Lowercase path slug → uppercase campaign_codes.code */
export const PARTNER_PATH_CODES: Record<string, string> = {
  runway: "RUNWAY",
}

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
  "_next",
])

for (const slug of Object.keys(PARTNER_PATH_CODES)) {
  if (RESERVED_PARTNER_PATH_SLUGS.has(slug)) {
    throw new Error(
      `[partner-paths] Refusing to register reserved slug "/${slug}" as a partner path`
    )
  }
}

/** Single-segment pathname → campaign code, or null if not a partner short link. */
export function partnerCodeFromPathname(pathname: string): string | null {
  const trimmed = pathname.replace(/\/+$/, "") || "/"
  if (trimmed === "/") return null
  const segments = trimmed.split("/").filter(Boolean)
  if (segments.length !== 1) return null
  const slug = segments[0].toLowerCase()
  if (slug.includes(".")) return null // static files
  return PARTNER_PATH_CODES[slug] ?? null
}
