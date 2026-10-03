import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import {
  AVIATION_WEATHER_HUB_PAGES,
  DECISION_MAKING_HUB_PAGES,
  getIndexableLearnArticles,
  getIndexableLearnHubPages,
  getLearnSitemapPaths,
  hubPageRobots,
  shouldEmitHubJsonLd,
  shouldIndexLearnHub,
} from "./learn-data"

const HUB_PAGE_FILES = [
  ...AVIATION_WEATHER_HUB_PAGES.map((p) => {
    const slug = p.href.replace("/learn/aviation-weather/", "")
    return join("app/learn/aviation-weather", slug, "page.tsx")
  }),
  join("app/learn/flight-risk-assessment-tool/page.tsx"),
]

describe("learn hub LEARN_PUBLIC rollback gating", () => {
  it("lists every shipped hub page file", () => {
    expect(HUB_PAGE_FILES).toHaveLength(
      AVIATION_WEATHER_HUB_PAGES.length + DECISION_MAKING_HUB_PAGES.length
    )
    expect(HUB_PAGE_FILES).toHaveLength(20)
  })

  it("each hub page derives robots and JSON-LD from LEARN_PUBLIC helpers", () => {
    for (const file of HUB_PAGE_FILES) {
      const src = readFileSync(join(process.cwd(), file), "utf8")
      expect(src).toContain("hubPageRobots()")
      expect(src).toContain("shouldEmitHubJsonLd()")
      expect(src).not.toMatch(/robots:\s*\{\s*index:\s*true/)
    }
  })

  it("with LEARN_PUBLIC false, every hub robots metadata is noindex", () => {
    expect(shouldIndexLearnHub(false)).toBe(false)
    expect(hubPageRobots(false)).toEqual({ index: false, follow: false })
    expect(shouldEmitHubJsonLd(false)).toBe(false)

    // Same robots object every hub page exports via hubPageRobots().
    for (const _file of HUB_PAGE_FILES) {
      expect(hubPageRobots(false).index).toBe(false)
      expect(hubPageRobots(false).follow).toBe(false)
    }
  })

  it("with LEARN_PUBLIC false, the sitemap has no learn entries", () => {
    expect(getIndexableLearnHubPages(false)).toEqual([])
    expect(getIndexableLearnArticles(false)).toEqual([])
    expect(getLearnSitemapPaths(false)).toEqual([])
  })

  it("with LEARN_PUBLIC true, hubs index and sitemap includes learn paths", () => {
    expect(hubPageRobots(true)).toEqual({ index: true, follow: true })
    expect(shouldEmitHubJsonLd(true)).toBe(true)
    expect(getLearnSitemapPaths(true)).toEqual([
      "/learn",
      ...AVIATION_WEATHER_HUB_PAGES.map((p) => p.href),
      ...DECISION_MAKING_HUB_PAGES.map((p) => p.href),
      "/learn/mos-vs-nbm-vs-taf",
      "/learn/risk-stacking",
      "/learn/fair-weather-flier",
      "/learn/trapped-in-ice",
      "/learn/blind-over-bakersfield",
      "/learn/delayed-reaction",
      "/learn/hazardous-attitudes",
      "/learn/night-falls-on-final",
      "/learn/in-too-deep",
      "/learn/cross-country-crisis",
      "/learn/time-lapse",
      "/learn/into-thin-air",
      "/learn/high-aspirations",
      "/learn/deadly-disorientation",
      "/learn/faulty-assumptions",
    ])
  })
})
