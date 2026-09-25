/**
 * Cookie / tracking preference storage (client-only).
 *
 * Key: localStorage `cookie_prefs_v1`
 * Shape: {
 *   version: number,
 *   essential: true,
 *   analytics: boolean,
 *   marketing: boolean,
 *   updatedAt: ISO string
 * }
 *
 * Only a fully valid object with the current version counts as a choice.
 * Unknown, stale, malformed, or wrong-version values must NOT hide the banner
 * and must NOT enable analytics or marketing.
 */

export const COOKIE_PREFS_STORAGE_KEY = "cookie_prefs_v1"
export const COOKIE_PREFS_CHANGED_EVENT = "planewx:cookie-prefs-changed"
export const COOKIE_PREFS_OPEN_EVENT = "planewx:open-cookie-settings"
/** Bump when categories or meaning change so returning visitors are asked again. */
export const COOKIE_PREFS_VERSION = 1

export type CookiePrefs = {
  version: number
  essential: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export function isValidCookiePrefs(value: unknown): value is CookiePrefs {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return (
    v.version === COOKIE_PREFS_VERSION &&
    v.essential === true &&
    typeof v.analytics === "boolean" &&
    typeof v.marketing === "boolean" &&
    typeof v.updatedAt === "string" &&
    v.updatedAt.length > 0
  )
}

/**
 * Parse a raw localStorage string. Returns null for missing, malformed,
 * wrong-version, or unknown shapes (including legacy strings like "accepted").
 */
export function parseCookiePrefs(raw: string | null | undefined): CookiePrefs | null {
  if (raw == null || raw === "") return null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isValidCookiePrefs(parsed)) return null
    return parsed
  } catch {
    return null
  }
}

export function readCookiePrefs(
  storage: Pick<Storage, "getItem"> | null | undefined = typeof window === "undefined" ? null : window.localStorage,
): CookiePrefs | null {
  if (!storage) return null
  try {
    return parseCookiePrefs(storage.getItem(COOKIE_PREFS_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeCookiePrefs(
  opts: { analytics: boolean; marketing: boolean },
  storage: Pick<Storage, "setItem"> | null | undefined = typeof window === "undefined" ? null : window.localStorage,
  now: () => string = () => new Date().toISOString(),
): CookiePrefs | null {
  if (!storage) return null
  const prefs: CookiePrefs = {
    version: COOKIE_PREFS_VERSION,
    essential: true,
    analytics: opts.analytics,
    marketing: opts.marketing,
    updatedAt: now(),
  }
  try {
    storage.setItem(COOKIE_PREFS_STORAGE_KEY, JSON.stringify(prefs))
    return prefs
  } catch {
    return null
  }
}

/** True only when a valid choice exists with analytics enabled. */
export function hasAnalyticsConsent(prefs: CookiePrefs | null = readCookiePrefs()): boolean {
  return prefs?.analytics === true
}

/** True only when a valid choice exists with marketing enabled. */
export function hasMarketingConsent(prefs: CookiePrefs | null = readCookiePrefs()): boolean {
  return prefs?.marketing === true
}

/** True when the user has made a valid cookie choice (banner may hide). */
export function hasValidCookieChoice(prefs: CookiePrefs | null = readCookiePrefs()): boolean {
  return prefs !== null
}

export function notifyCookiePrefsChanged(prefs: CookiePrefs): void {
  if (typeof window === "undefined") return
  try {
    window.dispatchEvent(new CustomEvent(COOKIE_PREFS_CHANGED_EVENT, { detail: prefs }))
  } catch {
    /* ignore */
  }
}

/** Ask the banner to reopen (footer "Cookie settings" link). */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return
  try {
    window.dispatchEvent(new CustomEvent(COOKIE_PREFS_OPEN_EVENT))
  } catch {
    /* ignore */
  }
}
