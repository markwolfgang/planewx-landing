/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  COOKIE_DNS_CONFIRMED_EVENT,
  COOKIE_PREFS_CHANGED_EVENT,
  COOKIE_PREFS_STORAGE_KEY,
  COOKIE_PREFS_VERSION,
  analyticsAfterDoNotSell,
  effectiveCookieToggleState,
  hasAnalyticsConsent,
  hasMarketingConsent,
  hasValidCookieChoice,
  notifyCookiePrefsChanged,
  optOutOfSaleOrSharing,
  parseCookiePrefs,
  readCookiePrefs,
  writeCookiePrefs,
} from "./cookie-prefs"
import { allowsAnalytics, allowsMarketing } from "./consent-region"
import { resolveTrackingLoad } from "./tracking-host"

describe("parseCookiePrefs", () => {
  it("returns null for missing or empty", () => {
    expect(parseCookiePrefs(null)).toBeNull()
    expect(parseCookiePrefs(undefined)).toBeNull()
    expect(parseCookiePrefs("")).toBeNull()
  })

  it("returns null for unknown or stale values instead of assuming consent", () => {
    expect(parseCookiePrefs('"accepted"')).toBeNull()
    expect(parseCookiePrefs("accepted")).toBeNull()
    expect(parseCookiePrefs("true")).toBeNull()
    expect(parseCookiePrefs(JSON.stringify({ foo: 1 }))).toBeNull()
    expect(
      parseCookiePrefs(
        JSON.stringify({
          essential: true,
          analytics: true,
          marketing: true,
          updatedAt: "2026-01-01T00:00:00.000Z",
        }),
      ),
    ).toBeNull()
    expect(
      parseCookiePrefs(
        JSON.stringify({
          version: COOKIE_PREFS_VERSION - 1,
          essential: true,
          analytics: true,
          marketing: true,
          updatedAt: "2026-01-01T00:00:00.000Z",
        }),
      ),
    ).toBeNull()
  })

  it("accepts a valid Essential only choice", () => {
    const prefs = parseCookiePrefs(
      JSON.stringify({
        version: COOKIE_PREFS_VERSION,
        essential: true,
        analytics: false,
        marketing: false,
        updatedAt: "2026-09-27T00:00:00.000Z",
      }),
    )
    expect(prefs).toEqual({
      version: COOKIE_PREFS_VERSION,
      essential: true,
      analytics: false,
      marketing: false,
      updatedAt: "2026-09-27T00:00:00.000Z",
    })
    expect(hasAnalyticsConsent(prefs)).toBe(false)
    expect(hasMarketingConsent(prefs)).toBe(false)
    expect(hasValidCookieChoice(prefs)).toBe(true)
  })

  it("accepts a valid Accept all choice", () => {
    const prefs = parseCookiePrefs(
      JSON.stringify({
        version: COOKIE_PREFS_VERSION,
        essential: true,
        analytics: true,
        marketing: true,
        updatedAt: "2026-09-27T00:00:00.000Z",
      }),
    )
    expect(hasAnalyticsConsent(prefs)).toBe(true)
    expect(hasMarketingConsent(prefs)).toBe(true)
  })
})

describe("read / write cookie prefs", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it("Essential only persists analytics:false and is a valid choice", () => {
    const prefs = writeCookiePrefs({ analytics: false, marketing: false })
    expect(prefs?.analytics).toBe(false)
    expect(prefs?.marketing).toBe(false)
    expect(prefs?.version).toBe(COOKIE_PREFS_VERSION)

    const raw = localStorage.getItem(COOKIE_PREFS_STORAGE_KEY)
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw!)).toMatchObject({
      version: COOKIE_PREFS_VERSION,
      essential: true,
      analytics: false,
      marketing: false,
    })

    const reread = readCookiePrefs()
    expect(hasValidCookieChoice(reread)).toBe(true)
    expect(hasAnalyticsConsent(reread)).toBe(false)
  })

  it("notifyCookiePrefsChanged dispatches the change event", () => {
    const prefs = writeCookiePrefs({ analytics: true, marketing: false })!
    const handler = vi.fn()
    window.addEventListener(COOKIE_PREFS_CHANGED_EVENT, handler)
    notifyCookiePrefsChanged(prefs)
    expect(handler).toHaveBeenCalledTimes(1)
    window.removeEventListener(COOKIE_PREFS_CHANGED_EVENT, handler)
  })
})

describe("effectiveCookieToggleState (Manage panel)", () => {
  it("with no choice, both toggles are off in notice and strict", () => {
    expect(
      effectiveCookieToggleState({ mode: "notice", prefs: null, gpc: false }),
    ).toEqual({ analytics: false, marketing: false })
    expect(
      effectiveCookieToggleState({ mode: "strict", prefs: null, gpc: false }),
    ).toEqual({ analytics: false, marketing: false })
  })

  it("reads stored prefs so Save without changes does not invent grants", () => {
    const stored = { analytics: true, marketing: false }
    expect(
      effectiveCookieToggleState({ mode: "notice", prefs: stored, gpc: false }),
    ).toEqual({ analytics: true, marketing: false })
    expect(
      effectiveCookieToggleState({ mode: "strict", prefs: stored, gpc: false }),
    ).toEqual({ analytics: true, marketing: false })
  })

  it("GPC forces marketing off in the Manage panel", () => {
    expect(
      effectiveCookieToggleState({
        mode: "notice",
        prefs: { analytics: true, marketing: true },
        gpc: true,
      }),
    ).toEqual({ analytics: true, marketing: false })
  })
})

describe("Do not sell or share", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it("never turns Analytics on when there is no prior choice", () => {
    expect(analyticsAfterDoNotSell({ mode: "notice", prefs: null })).toBe(false)
    expect(analyticsAfterDoNotSell({ mode: "strict", prefs: null })).toBe(false)
    const prefs = optOutOfSaleOrSharing(localStorage, "notice", false)
    expect(prefs?.analytics).toBe(false)
    expect(prefs?.marketing).toBe(false)
  })

  it("Essential-only visitor keeps Analytics off after Do not sell", () => {
    writeCookiePrefs({ analytics: false, marketing: false })
    const dns = vi.fn()
    window.addEventListener(COOKIE_DNS_CONFIRMED_EVENT, dns)
    const prefs = optOutOfSaleOrSharing(localStorage, "notice", false)
    expect(prefs?.analytics).toBe(false)
    expect(prefs?.marketing).toBe(false)
    expect(dns).toHaveBeenCalledTimes(1)
    window.removeEventListener(COOKIE_DNS_CONFIRMED_EVENT, dns)

    const plan = resolveTrackingLoad({
      hostname: "www.planewx.ai",
      gaDebug: false,
      analytics: allowsAnalytics({ mode: "notice", prefs }),
      marketing: allowsMarketing({ mode: "notice", prefs, gpc: false }),
      hasChoice: true,
    })
    expect(plan.loadGa).toBe(false)
    expect(plan.loadMarketing).toBe(false)
  })

  it("keeps Analytics on when the visitor already allowed Analytics", () => {
    writeCookiePrefs({ analytics: true, marketing: true })
    const prefs = optOutOfSaleOrSharing(localStorage, "notice", false)
    expect(prefs?.analytics).toBe(true)
    expect(prefs?.marketing).toBe(false)
  })

  it("strict region visitor with no choice: Do not sell loads nothing", () => {
    const prefs = optOutOfSaleOrSharing(localStorage, "strict", false)
    expect(prefs?.analytics).toBe(false)
    expect(prefs?.marketing).toBe(false)
    expect(allowsAnalytics({ mode: "strict", prefs })).toBe(false)
    expect(allowsMarketing({ mode: "strict", prefs, gpc: false })).toBe(false)
    const plan = resolveTrackingLoad({
      hostname: "www.planewx.ai",
      gaDebug: false,
      analytics: false,
      marketing: false,
      hasChoice: true,
    })
    expect(plan.loadGa).toBe(false)
    expect(plan.loadMarketing).toBe(false)
  })
})
