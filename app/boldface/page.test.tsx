/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, priority: _priority, preload: _preload, ...rest } = props
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />
  },
}))

vi.mock("@/components/boldface-campaign-tracker", () => ({
  BoldfaceCampaignTracker: () => null,
  BoldfacePlaneWxLink: ({
    className,
    children,
  }: {
    className?: string
    children: React.ReactNode
  }) => (
    <a href="https://www.planewx.ai/?ref=BOLDFACE" className={className}>
      {children}
    </a>
  ),
}))

import BoldfacePage from "@/app/boldface/page"
import { BETA_SUPPORTING_LINE } from "@/components/testflight-beta-cta"

describe("/boldface hero", () => {
  afterEach(() => cleanup())

  it("puts all three CTAs in one row with the beta line below it", () => {
    render(<BoldfacePage />)
    const row = screen.getByTestId("boldface-hero-ctas")
    const links = within(row).getAllByRole("link")
    expect(links.map((a) => a.textContent?.trim())).toEqual([
      "Download on the App Store",
      "Test the beta",
      "Get PlaneWX",
    ])
    // The supporting line must not sit inside the row (it used to push the row out of line).
    expect(row.textContent).not.toContain(BETA_SUPPORTING_LINE)
    const betaLine = screen.getByTestId("boldface-hero-beta-line")
    expect(betaLine.textContent).toContain(BETA_SUPPORTING_LINE)
    expect(row.contains(betaLine)).toBe(false)
  })

  it("has no em dashes in the hero copy or the screenshots intro", () => {
    const { container } = render(<BoldfacePage />)
    const hero = container.querySelector("main header")
    expect(hero).not.toBeNull()
    expect(hero!.textContent).not.toContain("\u2014")
    expect(screen.getByTestId("boldface-hero-copy").textContent).toContain(
      "Free iPhone/iPad app for TBM memory items. Study, test, and chair-fly",
    )
    expect(
      screen.getByText("Home through Settings, the same screens you'll open in the app."),
    ).toBeTruthy()
  })

  it("never calls PlaneWX a trial", () => {
    const { container } = render(<BoldfacePage />)
    expect(container.textContent?.toLowerCase()).not.toContain("trial")
  })
})
