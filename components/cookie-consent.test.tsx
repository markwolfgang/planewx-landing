/**
 * @vitest-environment jsdom
 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { CookieConsent } from "@/components/cookie-consent"
import { COOKIE_PREFS_STORAGE_KEY } from "@/lib/cookie-prefs"

const CONSENT_BANNER_H_VAR = "--consent-banner-h"

describe("CookieConsent banner and manage dialog", () => {
  beforeEach(() => {
    localStorage.clear()
    document.cookie = "pw_consent_region=notice; path=/"
    document.documentElement.style.removeProperty(CONSENT_BANNER_H_VAR)
    document.body.style.removeProperty("padding-bottom")

    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      width: 390,
      height: 221,
      top: 0,
      left: 0,
      bottom: 221,
      right: 390,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    class MockResizeObserver {
      private cb: ResizeObserverCallback
      constructor(cb: ResizeObserverCallback) {
        this.cb = cb
      }
      observe(target: Element) {
        this.cb(
          [
            {
              target,
              contentRect: target.getBoundingClientRect(),
              borderBoxSize: [],
              contentBoxSize: [],
              devicePixelContentBoxSize: [],
            } as ResizeObserverEntry,
          ],
          this as unknown as ResizeObserver,
        )
      }
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("ResizeObserver", MockResizeObserver)
  })

  afterEach(() => {
    cleanup()
    try {
      localStorage.clear()
    } catch {
      /* storage may still be blocked from a prior test */
    }
    document.documentElement.style.removeProperty(CONSENT_BANNER_H_VAR)
    document.body.style.removeProperty("padding-bottom")
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("shows a labeled banner region and opens Manage with Accept all", async () => {
    render(<CookieConsent />)
    const banner = await screen.findByTestId("cookie-consent-banner")
    expect(banner.getAttribute("role")).toBe("region")
    expect(banner.getAttribute("aria-label")).toBe("Cookies and Preferences")

    fireEvent.click(screen.getByTestId("cookie-manage-button"))
    expect(screen.getByTestId("cookie-manage-panel")).toBeTruthy()
    expect(screen.getByTestId("manage-accept-all")).toBeTruthy()
    expect((screen.getByTestId("toggle-analytics") as HTMLInputElement).checked).toBe(false)
    expect((screen.getByTestId("toggle-marketing") as HTMLInputElement).checked).toBe(false)
  })

  it("traps focus with Tab wrap and closes on Escape, returning focus to Manage", async () => {
    render(<CookieConsent />)
    await screen.findByTestId("cookie-consent-banner")
    const manage = screen.getByTestId("cookie-manage-button")
    manage.focus()
    fireEvent.click(manage)
    const panel = await screen.findByTestId("cookie-manage-panel")
    expect(panel).toBeTruthy()

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1)
    expect(focusable.length).toBeGreaterThan(1)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    last.focus()
    fireEvent.keyDown(document, { key: "Tab" })
    expect(document.activeElement).toBe(first)
    first.focus()
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true })
    expect(document.activeElement).toBe(last)

    fireEvent.keyDown(document, { key: "Escape" })
    expect(screen.queryByTestId("cookie-manage-panel")).toBeNull()
    expect(document.activeElement).toBe(manage)
  })

  it("Accept all persists prefs and hides the banner", async () => {
    render(<CookieConsent />)
    await screen.findByTestId("cookie-consent-banner")
    fireEvent.click(screen.getByRole("button", { name: "Accept all" }))
    expect(screen.queryByTestId("cookie-consent-banner")).toBeNull()
    const raw = localStorage.getItem(COOKIE_PREFS_STORAGE_KEY)
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw!)).toMatchObject({ analytics: true, marketing: true })
  })

  it("sets --consent-banner-h while open and clears it after a choice", async () => {
    render(<CookieConsent />)
    await screen.findByTestId("cookie-consent-banner")

    expect(document.documentElement.style.getPropertyValue(CONSENT_BANNER_H_VAR)).toBe("221px")
    expect(document.body.style.paddingBottom).toContain(`var(${CONSENT_BANNER_H_VAR})`)

    fireEvent.click(screen.getByRole("button", { name: "Accept all" }))
    expect(screen.queryByTestId("cookie-consent-banner")).toBeNull()
    expect(document.documentElement.style.getPropertyValue(CONSENT_BANNER_H_VAR)).toBe("")
    expect(document.body.style.paddingBottom).toBe("")
  })

  it("returns focus with preventScroll so the page does not jump to the footer", async () => {
    const settings = document.createElement("button")
    settings.type = "button"
    settings.setAttribute("data-testid", "cookie-settings-link")
    settings.textContent = "Cookie settings"
    document.body.appendChild(settings)

    const focusCalls: FocusOptions[] = []
    const originalFocus = HTMLElement.prototype.focus
    HTMLElement.prototype.focus = function focus(this: HTMLElement, options?: FocusOptions) {
      if (options) focusCalls.push(options)
      return originalFocus.call(this, options)
    }

    Object.defineProperty(window, "scrollY", { configurable: true, value: 1500, writable: true })
    Object.defineProperty(window, "scrollX", { configurable: true, value: 0, writable: true })
    const scrollTo = vi.fn()
    vi.stubGlobal("scrollTo", scrollTo)

    render(<CookieConsent />)
    await screen.findByTestId("cookie-consent-banner")
    fireEvent.click(screen.getByTestId("cookie-manage-button"))
    await screen.findByTestId("cookie-manage-panel")
    fireEvent.click(screen.getByTestId("manage-accept-all"))

    expect(screen.queryByTestId("cookie-manage-panel")).toBeNull()
    expect(focusCalls.some((opts) => opts.preventScroll === true)).toBe(true)
    expect(window.scrollY).toBe(1500)
    expect(scrollTo).not.toHaveBeenCalled()

    HTMLElement.prototype.focus = originalFocus
    settings.remove()
  })

  it("dismisses the banner in memory when storage is blocked", async () => {
    const desc = Object.getOwnPropertyDescriptor(window, "localStorage")
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("blocked")
      },
    })
    try {
      render(<CookieConsent />)
      await screen.findByTestId("cookie-consent-banner")
      fireEvent.click(screen.getByRole("button", { name: "Accept all" }))
      expect(screen.queryByTestId("cookie-consent-banner")).toBeNull()
    } finally {
      if (desc) Object.defineProperty(window, "localStorage", desc)
    }
  })
})
