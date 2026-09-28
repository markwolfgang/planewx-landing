/**
 * Cookie and tracking preference storage (client only).
 * Uses the same localStorage key and category shape as the product app
 * (cookie_prefs_v1 with essential, analytics, marketing). Landing-only
 * wording and gates may still differ from the app UI.
 *
 * Shape:
 * {
 *   version: number,
 *   essential: true,
 *   analytics: boolean,
 *   marketing: boolean,
 *   updatedAt: ISO string
 * }
 *
 * Only a fully valid object with the current version counts as a choice.
 * Unknown, stale, malformed, or wrong-version values must not hide the banner
 * and must not enable analytics or marketing.
 *
 * Opt-in everywhere (Mark 2026-09-27): no stored choice means nothing loads.
 */

import {
  hasGlobalPrivacyControl,
  readConsentModeFromDocument,
  type ConsentMode,
} from "@/lib/consent-region"

export const COOKIE_PREFS_STORAGE_KEY = "cookie_prefs_v1"
export const COOKIE_PREFS_CHANGED_EVENT = "planewx:cookie-prefs-changed"
export const COOKIE_PREFS_OPEN_EVENT = "planewx:open-cookie-settings"
/** Fired after Do not sell or share writes prefs so the UI can confirm. */
export const COOKIE_DNS_CONFIRMED_EVENT = "planewx:do-not-sell-confirmed"
export const COOKIE_PREFS_VERSION = 1

export type CookiePrefs = {
  version: number
  essential: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

/** Accessing localStorage can throw when site data is blocked. */
export function getLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null
    return window.localStorage
  } catch {
    return null
  }
}

/** Accessing sessionStorage can throw when site data is blocked. */
export function getSessionStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null
    return window.sessionStorage
  } catch {
    return null
  }
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
  storage: Pick<Storage, "getItem"> | null | undefined = getLocalStorage(),
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
  storage: Pick<Storage, "setItem"> | null | undefined = getLocalStorage(),
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

export function hasAnalyticsConsent(prefs: CookiePrefs | null = readCookiePrefs()): boolean {
  return prefs?.analytics === true
}

export function hasMarketingConsent(prefs: CookiePrefs | null = readCookiePrefs()): boolean {
  return prefs?.marketing === true
}

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

export function openCookieSettings(): void {
  if (typeof window === "undefined") return
  try {
    window.dispatchEvent(new CustomEvent(COOKIE_PREFS_OPEN_EVENT))
  } catch {
    /* ignore */
  }
}

export function effectiveCookieToggleState(opts: {
  mode: ConsentMode
  prefs: Pick<CookiePrefs, "analytics" | "marketing"> | null
  gpc: boolean
}): { analytics: boolean; marketing: boolean } {
  void opts.mode
  if (opts.prefs) {
    return {
      analytics: opts.prefs.analytics === true,
      marketing: opts.gpc ? false : opts.prefs.marketing === true,
    }
  }
  return { analytics: false, marketing: false }
}

export function analyticsAfterDoNotSell(opts: {
  mode: ConsentMode
  prefs: Pick<CookiePrefs, "analytics"> | null
}): boolean {
  void opts.mode
  return opts.prefs?.analytics === true
}

function notifyDoNotSellConfirmed(prefs: CookiePrefs): void {
  if (typeof window === "undefined") return
  try {
    window.dispatchEvent(new CustomEvent(COOKIE_DNS_CONFIRMED_EVENT, { detail: prefs }))
  } catch {
    /* ignore */
  }
}

export function optOutOfSaleOrSharing(
  storage: Pick<Storage, "getItem" | "setItem"> | null | undefined = getLocalStorage(),
  mode: ConsentMode =
    typeof window === "undefined" ? "strict" : readConsentModeFromDocument(),
  gpc: boolean =
    typeof window === "undefined" ? false : hasGlobalPrivacyControl(),
): CookiePrefs | null {
  const existing = readCookiePrefs(storage)
  const analytics = analyticsAfterDoNotSell({ mode, prefs: existing })
  void gpc
  const prefs = writeCookiePrefs({ analytics, marketing: false }, storage)
  if (prefs) {
    notifyCookiePrefsChanged(prefs)
    notifyDoNotSellConfirmed(prefs)
  }
  return prefs
}
