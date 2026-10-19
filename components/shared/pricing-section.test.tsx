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

describe("pricing-section Pro Plus AI Connector", () => {
  afterEach(() => {
    cleanup()
  })

  it("lists AI Connector (Claude, Grok, ChatGPT and Gemini) first under Pro Plus with help link", () => {
    const src = readFileSync(
      join(process.cwd(), "components/shared/pricing-section.tsx"),
      "utf8",
    )
    expect(src).toContain('name: "AI Connector (Claude, Grok, ChatGPT and Gemini)"')
    expect(src).toContain(
      'detail: "Cross-check your briefing with your AI assistant."',
    )
    expect(src).toContain('helpPath: "/help/connect-ai-assistant"')
    expect(src).not.toMatch(/coming soon/i)
    expect(src).toContain("or $59.99/yr (save $36 vs monthly)")
    expect(src).not.toMatch(/go or no-go|GO\/NO-GO|go\/no-go/i)

    const plusBulletsStart = src.indexOf("const PLUS_BULLETS")
    const firstName = src.indexOf('name: "', plusBulletsStart)
    expect(firstName).toBeGreaterThan(-1)
    expect(
      src.startsWith('name: "AI Connector (Claude, Grok, ChatGPT and Gemini)"', firstName),
    ).toBe(true)

    render(<PricingSection variant="default" />)

    const connector = screen.getByRole("link", {
      name: "AI Connector (Claude, Grok, ChatGPT and Gemini)",
    })
    expect(connector.getAttribute("href")).toBe(
      `${APP_ORIGIN}/help/connect-ai-assistant`,
    )
    expect(
      screen.getByText("Cross-check your briefing with your AI assistant."),
    ).toBeTruthy()

    const askAcross = screen.getByRole("link", {
      name: "See your AI assistant combine your ForeFlight logbook and PlaneWX trips",
    })
    expect(askAcross.getAttribute("href")).toBe(
      "/news/new-beta-planewx-in-claude-and-grok",
    )

    const chatgpt = screen.getByRole("link", { name: "Add PlaneWX to ChatGPT" })
    expect(chatgpt.getAttribute("href")).toBe(
      "https://chatgpt.com/plugins/plugin_asdk_app_6ace72ff9874819192f7ceb03d1a17d1",
    )

    const proPlusHeading = screen.getByRole("heading", { name: "Pro Plus" })
    const list = proPlusHeading
      .closest("div")
      ?.parentElement?.querySelector("ul")
    expect(list).toBeTruthy()
    const firstLink = list?.querySelector("a")
    expect(firstLink?.textContent).toBe("AI Connector (Claude, Grok, ChatGPT and Gemini)")
  })
})
