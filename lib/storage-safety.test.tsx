/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  getLocalStorage,
  getSessionStorage,
  readCookiePrefs,
  writeCookiePrefs,
} from "./cookie-prefs"
import { SignUpButton } from "@/components/shared/sign-up-button"

describe("storage access when site data is blocked", () => {
  afterEach(() => {
    cleanup()
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

  it("SignUpButton still renders when localStorage throws", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("blocked")
      },
    })
    expect(() =>
      render(
        <SignUpButton variant="a" className="btn">
          Start free trial
        </SignUpButton>,
      ),
    ).not.toThrow()
    expect(screen.getByText("Start free trial")).toBeTruthy()
  })
})
