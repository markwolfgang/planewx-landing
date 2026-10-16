import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"

vi.mock("@/components/shared/brand-logo", () => ({ BrandLogo: () => <span>PlaneWX</span> }))
vi.mock("@/components/cookie-prefs-links", () => ({ CookiePrefsLinks: () => null }))
vi.mock("./shared", () => ({
  SignUpButton: ({ children }: { children: React.ReactNode }) => <button type="button">{children}</button>,
}))

import { LandingVariantANav } from "./landing-variant-a-nav"
import { SiteFooter } from "./shared/site-footer"

afterEach(() => cleanup())

function navHrefs(container: Element): string[] {
  return Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href") ?? "")
}

describe("/events is findable from the header and footer", () => {
  it("lists Events right after News in the desktop header", () => {
    const { container } = render(<LandingVariantANav variant="a" />)
    const nav = container.querySelector("nav")!
    const panel = nav.querySelector("[hidden]")!
    const desktop = Array.from(nav.querySelectorAll("a")).filter((a) => !panel.contains(a))
    const hrefs = desktop.map((a) => a.getAttribute("href"))
    expect(hrefs).toContain("/events")
    expect(hrefs.indexOf("/events")).toBe(hrefs.indexOf("/news") + 1)
    const link = desktop.find((a) => a.getAttribute("href") === "/events")!
    expect(link.textContent).toBe("Events")
    expect(link.className).toBe(desktop.find((a) => a.getAttribute("href") === "/news")!.className)
  })

  it("lists Events right after News in the mobile menu", () => {
    render(<LandingVariantANav variant="a" />)
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }))
    const panel = document.getElementById(
      screen.getByRole("button", { name: "Close menu" }).getAttribute("aria-controls")!,
    )!
    expect(panel.hidden).toBe(false)
    const hrefs = navHrefs(panel)
    expect(hrefs.indexOf("/events")).toBe(hrefs.indexOf("/news") + 1)
    expect(Array.from(panel.querySelectorAll('a[href="/events"]')).map((a) => a.textContent)).toEqual(["Events"])
  })

  it("keeps the Events link in the site footer", () => {
    render(<SiteFooter variant="a" />)
    const link = screen.getByRole("link", { name: "Events" })
    expect(link.getAttribute("href")).toBe("/events")
    expect(link.textContent).toBe("Events")
  })
})
