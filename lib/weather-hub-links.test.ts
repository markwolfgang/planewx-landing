import { describe, expect, it } from "vitest"
import {
  DEFAULT_RELATED_WEATHER_HUB_HREFS,
  WEATHER_HUB_LINKS,
  formatWeatherHubsForLlms,
  getRelatedWeatherHubs,
  hubShortTitle,
  weatherHubCanonicalUrl,
} from "./weather-hub-links"

describe("weather hub link library", () => {
  it("lists every aviation-weather hub plus MOS and decision hubs", () => {
    const hrefs = WEATHER_HUB_LINKS.map((h) => h.href)
    expect(hrefs).toContain("/learn/aviation-weather/taf")
    expect(hrefs).toContain("/learn/aviation-weather/metar")
    expect(hrefs).toContain("/learn/aviation-weather/airmet-sigmet")
    expect(hrefs).toContain("/learn/mos-vs-nbm-vs-taf")
    expect(hrefs).toContain("/learn/risk-management-loop")
    expect(hrefs).toContain("/learn/flight-risk-assessment-tool")
    expect(new Set(hrefs).size).toBe(hrefs.length)
    expect(hrefs.length).toBeGreaterThanOrEqual(20)
  })

  it("builds www canonical URLs without trailing slashes", () => {
    for (const hub of WEATHER_HUB_LINKS) {
      const url = weatherHubCanonicalUrl(hub.href)
      expect(url).toMatch(/^https:\/\/www\.planewx\.ai\/learn\//)
      expect(url.endsWith("/")).toBe(false)
    }
  })

  it("shortens titles at the colon", () => {
    expect(hubShortTitle("What Is a TAF? How to Read a Terminal Aerodrome Forecast")).toBe(
      "What Is a TAF?",
    )
    expect(
      hubShortTitle("AIRMET, SIGMET, and CWA: In-Flight Weather Advisories Explained"),
    ).toBe("AIRMET, SIGMET, and CWA")
  })

  it("matches blog topics to related hubs", () => {
    const icing = getRelatedWeatherHubs({
      slug: "trapped-in-ice-briefing",
      title: "Icing forecasts and CIP for GA",
      excerpt: "How freezing level and CIP change a cross-country plan.",
    })
    expect(icing.length).toBeGreaterThanOrEqual(2)
    expect(icing.length).toBeLessThanOrEqual(4)
    expect(icing.some((h) => h.href.includes("icing"))).toBe(true)
  })

  it("falls back to the default set when nothing matches", () => {
    const related = getRelatedWeatherHubs({
      slug: "community-picnic-recap",
      title: "Hangar barbecue photos",
      excerpt: "Friends and airplanes under clear skies.",
    })
    expect(related.map((h) => h.href)).toEqual([...DEFAULT_RELATED_WEATHER_HUB_HREFS])
  })

  it("formats llms bullets with canonical URLs and descriptions", () => {
    const md = formatWeatherHubsForLlms(WEATHER_HUB_LINKS.slice(0, 2))
    expect(md).toContain("https://www.planewx.ai/learn/aviation-weather/")
    expect(md).not.toContain("https://planewx.ai/learn")
    expect(md.split("\n").every((line) => line.startsWith("- https://"))).toBe(true)
  })

  it("keeps public/llms.txt in sync with every weather hub URL", async () => {
    const { readFileSync } = await import("node:fs")
    const { join } = await import("node:path")
    const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8")
    expect(llms).toContain("## Learning Center weather hubs")
    for (const hub of WEATHER_HUB_LINKS) {
      expect(llms).toContain(weatherHubCanonicalUrl(hub.href))
    }
  })
})
