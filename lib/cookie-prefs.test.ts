/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  COOKIE_PREFS_CHANGED_EVENT,
  COOKIE_PREFS_STORAGE_KEY,
  COOKIE_PREFS_VERSION,
  hasAnalyticsConsent,
  hasMarketingConsent,
  hasValidCookieChoice,
  notifyCookiePrefsChanged,
  parseCookiePrefs,
  readCookiePrefs,
  writeCookiePrefs,
} from "./cookie-prefs"

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
        updatedAt: "2026-09-25T00:00:00.000Z",
      }),
    )
    expect(prefs).toEqual({
      version: COOKIE_PREFS_VERSION,
      essential: true,
      analytics: false,
      marketing: false,
      updatedAt: "2026-09-25T00:00:00.000Z",
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
        updatedAt: "2026-09-25T00:00:00.000Z",
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

  it("Accept all persists analytics:true so analytics may load", () => {
    writeCookiePrefs({ analytics: true, marketing: true })
    const prefs = readCookiePrefs()
    expect(hasAnalyticsConsent(prefs)).toBe(true)
    expect(hasMarketingConsent(prefs)).toBe(true)
  })

  it("stale or unknown stored value does not count as a choice or consent", () => {
    localStorage.setItem(COOKIE_PREFS_STORAGE_KEY, '"accepted"')
    expect(readCookiePrefs()).toBeNull()
    expect(hasValidCookieChoice()).toBe(false)
    expect(hasAnalyticsConsent()).toBe(false)

    localStorage.setItem(COOKIE_PREFS_STORAGE_KEY, JSON.stringify({ status: "accepted" }))
    expect(readCookiePrefs()).toBeNull()
    expect(hasAnalyticsConsent()).toBe(false)
  })

  it("version bump re-asks (old version is not a valid choice)", () => {
    localStorage.setItem(
      COOKIE_PREFS_STORAGE_KEY,
      JSON.stringify({
        version: 0,
        essential: true,
        analytics: true,
        marketing: true,
        updatedAt: "2026-01-01T00:00:00.000Z",
      }),
    )
    expect(readCookiePrefs()).toBeNull()
    expect(hasValidCookieChoice()).toBe(false)
  })

  it("writeCookiePrefs returns null when storage throws (does not invent consent)", () => {
    const storage = {
      setItem: () => {
        throw new Error("quota")
      },
    }
    expect(writeCookiePrefs({ analytics: false, marketing: false }, storage)).toBeNull()
  })

  it("notifyCookiePrefsChanged dispatches the change event", () => {
    const handler = vi.fn()
    window.addEventListener(COOKIE_PREFS_CHANGED_EVENT, handler)
    const prefs = writeCookiePrefs({ analytics: true, marketing: false })!
    notifyCookiePrefsChanged(prefs)
    expect(handler).toHaveBeenCalledTimes(1)
    window.removeEventListener(COOKIE_PREFS_CHANGED_EVENT, handler)
  })
})
