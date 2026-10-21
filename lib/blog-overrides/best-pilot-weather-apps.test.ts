import { describe, expect, it } from "vitest"
import { BLOG_OVERRIDES } from "./index"
import { faqJsonLd, html, dateModified } from "./best-pilot-weather-apps"

const text = html.replace(/<[^>]+>/g, " ")

describe("best-pilot-weather-apps override", () => {
  it("is registered for the slug", () => {
    expect(BLOG_OVERRIDES["best-pilot-weather-apps"]?.html).toBe(html)
    expect(dateModified).toBe("2026-10-21")
  })

  it("uses no em dashes, en dashes, or arrows", () => {
    const all = `${html} ${JSON.stringify(faqJsonLd)}`
    expect(all).not.toMatch(/[\u2013\u2014\u2190-\u21FF]|->|=>/)
  })

  it("never frames the free plan as a trial", () => {
    const lower = text.toLowerCase()
    expect(lower).not.toMatch(/free trial|free to start|no credit card|\btrial\b/)
    expect(lower).toContain("completely free")
  })

  it("names every app in both groups", () => {
    for (const app of [
      "ForeFlight",
      "Garmin Pilot",
      "FltPlan Go",
      "RadarScope",
      "Windy",
      "MyRadar",
      "StationWeather",
      "AeroWeather",
      "WeatherSpork",
      "Aviation Weather Center",
    ]) {
      expect(html).toContain(`<h3>${app}`)
    }
  })

  it("keeps the existing internal links and adds learn and cross-check links", () => {
    for (const href of [
      "https://www.planewx.ai/ga-customs",
      "https://www.planewx.ai/apps",
      "https://app.planewx.ai/auth/sign-up?lp=d",
      "https://www.planewx.ai/blog/cross-check-pilot-weather-briefing",
      "https://www.planewx.ai/learn/flight-risk-assessment-tool",
      "https://www.planewx.ai/learn/aviation-weather/metar",
    ]) {
      expect(html).toContain(`href="${href}"`)
    }
  })

  it("mentions the connector only with the Pro Plus caveat", () => {
    expect(text).toMatch(/Pro Plus plan, PlaneWX also offers an AI assistant connector/)
    expect(text).toMatch(/Claude, Grok, ChatGPT and Gemini/)
  })

  it("has FAQ JSON-LD that matches the visible FAQ", () => {
    expect(faqJsonLd["@type"]).toBe("FAQPage")
    expect(faqJsonLd.mainEntity).toHaveLength(3)
    for (const q of faqJsonLd.mainEntity) {
      expect(html).toContain(`<h3>${q.name}</h3>\n<p>${q.acceptedAnswer.text}</p>`)
    }
  })
})
