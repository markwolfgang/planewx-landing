/**
 * @vitest-environment jsdom
 */
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { PricingSection } from "@/components/shared/pricing-section"
import { APP_ORIGIN, APP_SIGN_UP_PATH } from "@/lib/app-signup-url"

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string
    children: React.ReactNode
    className?: string
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

const VARIANTS = ["a", "e", "f", "default"] as const

describe("pricing-section two-year offer removal", () => {
  afterEach(() => {
    cleanup()
  })

  it("source does not contain Lock 2 years, two years, or TWO_YEAR", () => {
    const src = readFileSync(
      join(process.cwd(), "components/shared/pricing-section.tsx"),
      "utf8",
    )
    expect(src).not.toContain("Lock 2 years")
    expect(src).not.toContain("two years")
    expect(src).not.toContain("TWO_YEAR")
  })

  it.each(VARIANTS)(
    "renders without two-year offer surfaces for variant %s",
    (variant) => {
      const { container } = render(<PricingSection variant={variant} />)
      const text = container.textContent ?? ""

      expect(screen.queryByText(/Lock 2 years/i)).toBeNull()
      expect(screen.queryByText(/Lock today's price/i)).toBeNull()
      expect(screen.queryByText(/Mark Wolfgang, founder/i)).toBeNull()
      expect(text).not.toMatch(/two years/i)
      expect(text).not.toMatch(/\$498/)
      expect(text).not.toMatch(/\$120\b/)
      expect(text).not.toMatch(/\$238/)

      const expectedHref = `${APP_ORIGIN}${APP_SIGN_UP_PATH}?lp=${encodeURIComponent(variant)}`
      const trialLinks = screen.getAllByRole("link", {
        name: "Start Free 14-Day Trial",
      })
      expect(trialLinks).toHaveLength(4)
      for (const link of trialLinks) {
        expect(link.getAttribute("href")).toBe(expectedHref)
      }
      expect(
        screen.getByRole("link", { name: "Get Started" }).getAttribute("href"),
      ).toBe(expectedHref)
    },
  )
})
