/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  getLocalStorage,
  getSessionStorage,
  readCookiePrefs,
  writeCookiePrefs,
} from "./cookie-prefs"

describe("storage access when site data is blocked", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("getLocalStorage returns null when accessing localStorage throws", () => {
    vi.stubGlobal("localStorage", {
      get getItem() {
        throw new Error("blocked")
      },
    })
    // Accessing window.localStorage itself may throw in some browsers.
    const desc = Object.getOwnPropertyDescriptor(window, "localStorage")
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("blocked")
      },
    })
    expect(getLocalStorage()).toBeNull()
    expect(readCookiePrefs()).toBeNull()
    if (desc) Object.defineProperty(window, "localStorage", desc)
  })

  it("getSessionStorage returns null when sessionStorage throws", () => {
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      get() {
        throw new Error("blocked")
      },
    })
    expect(getSessionStorage()).toBeNull()
  })

  it("writeCookiePrefs returns null when setItem throws", () => {
    const storage = {
      setItem: () => {
        throw new Error("quota")
      },
      getItem: () => null,
    }
    expect(writeCookiePrefs({ analytics: true, marketing: false }, storage)).toBeNull()
  })
})
