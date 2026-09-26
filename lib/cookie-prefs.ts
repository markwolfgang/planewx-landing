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

/**
 * Toggle values the Manage panel should show.
 * Stored prefs win; otherwise region defaults (notice: both on; strict: both off).
 * GPC always forces Marketing off.
 */
export function effectiveCookieToggleState(opts: {
  mode: ConsentMode
  prefs: Pick<CookiePrefs, "analytics" | "marketing"> | null
  gpc: boolean
}): { analytics: boolean; marketing: boolean } {
  if (opts.prefs) {
    return {
      analytics: opts.prefs.analytics,
      marketing: opts.gpc ? false : opts.prefs.marketing,
    }
  }
  if (opts.mode === "notice") {
    return {
      analytics: true,
      marketing: opts.gpc ? false : true,
    }
  }
  return { analytics: false, marketing: false }
}

/**
 * Analytics value to keep when turning off sale/sharing.
 * Prior choice wins; with no choice, notice defaults on and strict defaults off.
 */
export function analyticsAfterDoNotSell(opts: {
  mode: ConsentMode
  prefs: Pick<CookiePrefs, "analytics"> | null
}): boolean {
  if (opts.prefs) return opts.prefs.analytics === true
  return opts.mode === "notice"
}

function notifyDoNotSellConfirmed(prefs: CookiePrefs): void {
  if (typeof window === "undefined") return
  try {
    window.dispatchEvent(new CustomEvent(COOKIE_DNS_CONFIRMED_EVENT, { detail: prefs }))
  } catch {
    /* ignore */
  }
}

/**
 * Do not sell or share: turn Marketing off (Google Ads, Meta Pixel, Reddit Pixel).
 * Keeps Analytics as the visitor already set it. With no prior choice, uses the
 * region default (on in notice / US, off in strict / EU-UK unless they opted in).
 * GPC also keeps Marketing off; it does not force Analytics on.
 */
export function optOutOfSaleOrSharing(
  storage: Pick<Storage, "getItem" | "setItem"> | null | undefined =
    typeof window === "undefined" ? null : window.localStorage,
  mode: ConsentMode =
    typeof window === "undefined" ? "strict" : readConsentModeFromDocument(),
  gpc: boolean =
    typeof window === "undefined" ? false : hasGlobalPrivacyControl(),
): CookiePrefs | null {
  const existing = readCookiePrefs(storage)
  const analytics = analyticsAfterDoNotSell({ mode, prefs: existing })
  // Sale/sharing opt-out always clears Marketing. GPC is already an opt-out.
  void gpc
  const prefs = writeCookiePrefs({ analytics, marketing: false }, storage)
  if (prefs) {
    notifyCookiePrefsChanged(prefs)
    notifyDoNotSellConfirmed(prefs)
  }
  return prefs
}
