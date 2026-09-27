/**
 * Consent region helpers.
 * Geo comes from Vercel x-vercel-ip-country via middleware cookie. No third-party geo API.
 * Missing or unknown country defaults to strict (safest for wording and links).
 *
 * Mark 2026-09-27: every region is opt-in. Region mode only changes banner wording
 * and which links show (for example Do not sell or share for notice / US visitors).
 * It must never auto-load GA, Ads, Meta, or Reddit without a stored choice.
 */

export const CONSENT_REGION_COOKIE = "pw_consent_region"
export const CONSENT_GPC_COOKIE = "pw_gpc"

export type ConsentMode = "strict" | "notice"

/** EU member states, EEA extras, UK, Switzerland. */
export const STRICT_CONSENT_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "UK",
  "CH",
])

export function consentModeFromCountry(country: string | null | undefined): ConsentMode {
  if (!country) return "strict"
  const code = country.trim().toUpperCase()
  if (!code || code === "XX" || code === "T1") return "strict"
  return STRICT_CONSENT_COUNTRIES.has(code) ? "strict" : "notice"
}

export function parseConsentMode(raw: string | null | undefined): ConsentMode {
  if (raw === "notice") return "notice"
  return "strict"
}

/** Read region cookie set by middleware. Defaults to strict if missing. */
export function readConsentModeFromDocument(): ConsentMode {
  if (typeof window !== "undefined") {
    const override = (window as Window & { __PLANWX_CONSENT_MODE__?: ConsentMode })
      .__PLANWX_CONSENT_MODE__
    if (override === "notice" || override === "strict") return override
  }
  if (typeof document === "undefined") return "strict"
  const match = document.cookie.match(/(?:^|;\s*)pw_consent_region=([^;]*)/)
  return parseConsentMode(match?.[1] ? decodeURIComponent(match[1]) : null)
}

/** Sec-GPC / navigator.globalPrivacyControl. Cookie set by middleware when header present. */
export function hasGlobalPrivacyControl(
  nav: { globalPrivacyControl?: boolean } | null | undefined =
    typeof navigator === "undefined"
      ? null
      : (navigator as Navigator & { globalPrivacyControl?: boolean }),
  cookieSource: string | null | undefined =
    typeof document === "undefined" ? null : document.cookie,
): boolean {
  if (typeof window !== "undefined") {
    const override = (window as Window & { __PLANWX_GPC__?: boolean }).__PLANWX_GPC__
    if (override === true) return true
    if (override === false) {
      /* fall through to nav/cookie unless forced false for shots */
    }
  }
  if (nav && nav.globalPrivacyControl === true) return true
  if (cookieSource && /(?:^|;\s*)pw_gpc=1(?:;|$)/.test(cookieSource)) return true
  return false
}

/**
 * Analytics loads only after an explicit stored analytics:true choice.
 * Region mode does not auto-enable analytics (opt-in everywhere).
 */
export function allowsAnalytics(opts: {
  mode: ConsentMode
  prefs: { analytics: boolean } | null
}): boolean {
  void opts.mode
  return opts.prefs?.analytics === true
}

/**
 * Marketing loads only after an explicit stored marketing:true choice.
 * GPC always forces marketing off. Region mode does not auto-enable marketing.
 */
export function allowsMarketing(opts: {
  mode: ConsentMode
  prefs: { marketing: boolean } | null
  gpc: boolean
}): boolean {
  void opts.mode
  if (opts.gpc) return false
  return opts.prefs?.marketing === true
}

/** Notice (US and similar) may show Do not sell or share links. */
export function showDoNotSellLink(mode: ConsentMode = readConsentModeFromDocument()): boolean {
  return mode === "notice"
}
