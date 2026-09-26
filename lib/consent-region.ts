/**
 * Consent region helpers (EU/UK/EEA/CH strict opt-in vs notice elsewhere).
 * Geo comes from Vercel `x-vercel-ip-country` via middleware cookie. No third-party geo API.
 * Missing or unknown country defaults to strict (safest).
 */

export const CONSENT_REGION_COOKIE = "pw_consent_region"
export const CONSENT_GPC_COOKIE = "pw_gpc"

export type ConsentMode = "strict" | "notice"

/** EU member states, EEA extras, UK, Switzerland. */
export const STRICT_CONSENT_COUNTRIES = new Set([
  // EU
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
  // EEA (non-EU)
  "IS",
  "LI",
  "NO",
  // UK + Switzerland
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
  if (typeof document === "undefined") return "strict"
  const match = document.cookie.match(/(?:^|;\s*)pw_consent_region=([^;]*)/)
  return parseConsentMode(match?.[1] ? decodeURIComponent(match[1]) : null)
}

/** Sec-GPC / navigator.globalPrivacyControl. Cookie set by middleware when header present. */
export function hasGlobalPrivacyControl(
  nav: { globalPrivacyControl?: boolean } | null | undefined = typeof navigator === "undefined"
    ? null
    : (navigator as Navigator & { globalPrivacyControl?: boolean }),
  cookieSource: string | null | undefined = typeof document === "undefined" ? null : document.cookie,
): boolean {
  if (nav && nav.globalPrivacyControl === true) return true
  if (cookieSource && /(?:^|;\s*)pw_gpc=1(?:;|$)/.test(cookieSource)) return true
  return false
}

/**
 * Effective marketing allowance for notice-mode visitors.
 * GPC is treated as opt-out of sale/sharing (marketing) scripts.
 */
export function noticeModeAllowsMarketing(opts: {
  prefs: { marketing: boolean } | null
  gpc: boolean
}): boolean {
  if (opts.gpc) return false
  if (opts.prefs) return opts.prefs.marketing === true
  // Notice mode with no stored choice and no GPC: marketing may run (opt-out model).
  return true
}

/**
 * Effective analytics allowance.
 * Strict: only after explicit analytics:true.
 * Notice: allowed unless the user chose Essential only (analytics:false).
 */
export function allowsAnalytics(opts: {
  mode: ConsentMode
  prefs: { analytics: boolean } | null
}): boolean {
  if (opts.mode === "strict") {
    return opts.prefs?.analytics === true
  }
  if (opts.prefs) return opts.prefs.analytics === true
  return true
}

/**
 * Effective marketing allowance.
 * Strict: only after explicit marketing:true.
 * Notice: default on unless GPC or user opted marketing off.
 */
export function allowsMarketing(opts: {
  mode: ConsentMode
  prefs: { marketing: boolean } | null
  gpc: boolean
}): boolean {
  // GPC is always an opt-out of sale/sharing (marketing) scripts.
  if (opts.gpc) return false
  if (opts.mode === "strict") {
    return opts.prefs?.marketing === true
  }
  return noticeModeAllowsMarketing({ prefs: opts.prefs, gpc: false })
}
