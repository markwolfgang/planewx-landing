/**
 * @vitest-environment jsdom
 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { CookieConsent } from "@/components/cookie-consent"
import { COOKIE_PREFS_STORAGE_KEY } from "@/lib/cookie-prefs"

describe("CookieConsent banner and manage dialog", () => {
  beforeEach(() => {
    localStorage.clear()
    document.cookie = "pw_consent_region=notice; path=/"
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
    document.body.style.removeProperty("padding-bottom")
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

  it("traps focus and closes on Escape, returning focus to Manage", async () => {
    render(<CookieConsent />)
    await screen.findByTestId("cookie-consent-banner")
    const manage = screen.getByTestId("cookie-manage-button")
    manage.focus()
    fireEvent.click(manage)
    const panel = await screen.findByTestId("cookie-manage-panel")
    expect(panel).toBeTruthy()

    fireEvent.keyDown(document, { key: "Escape" })
    expect(screen.queryByTestId("cookie-manage-panel")).toBeNull()
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
})
