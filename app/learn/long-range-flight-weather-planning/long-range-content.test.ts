import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { DECISION_MAKING_HUB_PAGES } from "../learn-data"
import { MAIN_HTML } from "./content"
import { ARTICLE_JSON_LD, BREADCRUMB_JSON_LD } from "./json-ld"

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8")
const PAGE_TSX = read("app/learn/long-range-flight-weather-planning/page.tsx")
const NEXT_CONFIG = read("next.config.mjs")

function decode(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&#8209;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u00a0/g, " ")
}

function visibleText(html: string): string {
  return decode(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim()
}

const TEXT = visibleText(MAIN_HTML)
const JSON_LD = [ARTICLE_JSON_LD, BREADCRUMB_JSON_LD]
  .map((block) => JSON.stringify(block))
  .join(" ")

const REDIRECTS = [
  "can-pilots-plan-trips-three-days-ahead",
  "general-aviation-weather-planning-guide",
  "guide-to-planning-flights-days-ahead",
  "how-to-brief-multi-day-flights",
  "how-to-plan-flights-before-tafs",
  "how-to-plan-flights-with-uncertain-weather",
  "long-range-aviation-weather-forecasts",
  "multi-day-flight-planning-that-holds-up",
] as const

describe("long-range flight weather planning hub", () => {
  it("registers on the Decision-Making hub list", () => {
    expect(
      DECISION_MAKING_HUB_PAGES.some(
        (p) => p.href === "/learn/long-range-flight-weather-planning",
      ),
    ).toBe(true)
  })

  it("uses Article and BreadcrumbList JSON-LD only (no FAQPage, no Article image)", () => {
    expect(PAGE_TSX).toContain("ARTICLE_JSON_LD")
    expect(PAGE_TSX).toContain("BREADCRUMB_JSON_LD")
    expect(PAGE_TSX).not.toContain("FAQ_JSON_LD")
    expect(JSON_LD).not.toMatch(/FAQPage/)
    expect(ARTICLE_JSON_LD["@type"]).toBe("Article")
    expect(BREADCRUMB_JSON_LD["@type"]).toBe("BreadcrumbList")
    expect(ARTICLE_JSON_LD).not.toHaveProperty("image")
  })

  it("covers the required planning topics on the page", () => {
    expect(TEXT).toMatch(/TAF/)
    expect(TEXT).toMatch(/MOS/)
    expect(TEXT).toMatch(/LAMP/)
    expect(TEXT).toMatch(/NBM/)
    expect(TEXT).toMatch(/GFS/)
    expect(TEXT).toMatch(/ECMWF ensemble \(ENS\)/)
    expect(TEXT).toMatch(/CPC/)
    expect(TEXT).toMatch(/14 days/)
    expect(TEXT).toMatch(/7 days/)
    expect(TEXT).toMatch(/3 days/)
    expect(TEXT).toMatch(/WX Score/)
    expect(TEXT).toMatch(/personal minimums/i)
    expect(TEXT).toMatch(/FAQ/)
  })

  it("places ECFP at 72 to 30 hours and eTCF inside 30 to 24 hours", () => {
    expect(MAIN_HTML).toContain("About 72 to 30 hours")
    expect(MAIN_HTML).not.toContain("About 3 days to 72 hours")
    expect(MAIN_HTML).toMatch(
      /About 72 to 30 hours[\s\S]*ECFP for convective planning context/,
    )
    expect(MAIN_HTML).toMatch(
      /About 30 to 24 hours and in[\s\S]*eTCF for convective planning context/,
    )
    expect(MAIN_HTML).toContain("NBX through about day 11")
    expect(MAIN_HTML).not.toContain("eTCF / ECFP")
  })

  it("keeps PlaneWX as decision support, not an EFB, and never GO / NO-GO", () => {
    expect(TEXT).toMatch(/never recommends GO or NO-GO/i)
    expect(TEXT).toMatch(/not an EFB/i)
    expect(TEXT).toMatch(/weather risk layer/i)
    expect(TEXT).not.toMatch(/ForeFlight/i)
    expect(TEXT).toMatch(/How forecast confidence changes trip commitments/)
    expect(TEXT).not.toMatch(/When should trip commitments wait/)
    expect(TEXT + JSON_LD).not.toMatch(/[\u2013\u2014]/)
    expect(TEXT).not.toMatch(/->|<-|→|←/)
  })

  it("cites official FAA / NWS / CPC sources", () => {
    expect(MAIN_HTML).toContain("FAA-H-8083-28")
    expect(MAIN_HTML).toContain("aviationweather.gov")
    expect(MAIN_HTML).toContain("cpc.ncep.noaa.gov")
    expect(MAIN_HTML).toContain("AC 00-45")
    expect(MAIN_HTML).toContain("AC 91-92")
    expect(MAIN_HTML).toContain("documentID/1030235")
    expect(MAIN_HTML).toContain("FAA-H-8083-28_FAA_Web.pdf")
  })

  it("permanently redirects true duplicate blog hubs to this page", () => {
    for (const slug of REDIRECTS) {
      expect(NEXT_CONFIG).toContain(`/blog/${slug}`)
      expect(NEXT_CONFIG).toContain(
        "/learn/long-range-flight-weather-planning",
      )
    }
    expect(NEXT_CONFIG).toMatch(/permanent:\s*true/)
  })
})
