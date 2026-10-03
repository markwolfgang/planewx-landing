import { describe, expect, it } from "vitest"
import {
  INDEXABLE_LEARN_ARTICLE_SLUGS,
  LEARN_ARTICLES,
  LEARN_PUBLIC,
  LIVE_LEARN_ROUTES,
  LEARN_TAF_DECODE_HREF,
  getIndexableLearnArticles,
  getIndexableLearnHubPages,
  getLearnSitemapPaths,
  isIndexableLearnArticleSlug,
  shouldEmitArticleJsonLd,
  shouldIndexLearnArticle,
  shouldIndexLearnHub,
  getLearnArticle,
} from "./learn-data"

describe("learn production indexing allow list", () => {
  it("ships with LEARN_PUBLIC true", () => {
    expect(LEARN_PUBLIC).toBe(true)
  })

  it("indexes the Learning Center hub", () => {
    expect(shouldIndexLearnHub()).toBe(true)
  })

  it("allowlists mos-vs-nbm-vs-taf, risk-stacking and the ASI case studies among [slug] articles", () => {
    expect([...INDEXABLE_LEARN_ARTICLE_SLUGS]).toEqual([
      "mos-vs-nbm-vs-taf",
      "risk-stacking",
      "fair-weather-flier",
      "trapped-in-ice",
      "blind-over-bakersfield",
      "delayed-reaction",
      "hazardous-attitudes",
      "night-falls-on-final",
      "in-too-deep",
      "cross-country-crisis",
      "time-lapse",
      "into-thin-air",
      "high-aspirations",
      "deadly-disorientation",
      "faulty-assumptions",
    ])
    expect(isIndexableLearnArticleSlug("risk-stacking")).toBe(true)
    expect(isIndexableLearnArticleSlug("mos-vs-nbm-vs-taf")).toBe(true)
    expect(isIndexableLearnArticleSlug("tcf-vs-ecfp")).toBe(false)
    expect(isIndexableLearnArticleSlug("what-the-wx-score-actually-is")).toBe(
      false
    )
  })

  it("includes only allowlisted articles in the sitemap set", () => {
    const slugs = getIndexableLearnArticles().map((a) => a.slug)
    expect(slugs).toEqual([
      "mos-vs-nbm-vs-taf",
      "risk-stacking",
      "fair-weather-flier",
      "trapped-in-ice",
      "blind-over-bakersfield",
      "delayed-reaction",
      "hazardous-attitudes",
      "night-falls-on-final",
      "in-too-deep",
      "cross-country-crisis",
      "time-lapse",
      "into-thin-air",
      "high-aspirations",
      "deadly-disorientation",
      "faulty-assumptions",
    ])
  })

  it("indexes and emits JSON-LD for MOS only", () => {
    const mos = getLearnArticle("mos-vs-nbm-vs-taf")!
    const tcf = getLearnArticle("tcf-vs-ecfp")!
    expect(shouldIndexLearnArticle(mos)).toBe(true)
    expect(shouldEmitArticleJsonLd(mos)).toBe(true)
    expect(shouldIndexLearnArticle(tcf)).toBe(false)
    expect(shouldEmitArticleJsonLd(tcf)).toBe(false)
  })

  it("keeps non-allowlisted LEARN_ARTICLES reachable but excluded from index set", () => {
    const all = LEARN_ARTICLES.map((a) => a.slug)
    expect(all).toContain("tcf-vs-ecfp")
    expect(getIndexableLearnArticles().map((a) => a.slug)).not.toContain(
      "tcf-vs-ecfp"
    )
  })

  it("ships all twenty hub pages in the sitemap set", () => {
    const hrefs = getIndexableLearnHubPages().map((p) => p.href)
    expect(hrefs).toEqual([
      "/learn/aviation-weather/taf",
      "/learn/aviation-weather/metar",
      "/learn/aviation-weather/airmet-sigmet",
      "/learn/aviation-weather/pirep",
      "/learn/aviation-weather/winds-aloft",
      "/learn/aviation-weather/icing",
      "/learn/aviation-weather/turbulence",
      "/learn/aviation-weather/weather-radar",
      "/learn/aviation-weather/density-altitude",
      "/learn/aviation-weather/thunderstorms",
      "/learn/aviation-weather/ceiling-visibility",
      "/learn/aviation-weather/fog",
      "/learn/aviation-weather/wind-shear-microburst",
      "/learn/aviation-weather/mountain-wave",
      "/learn/aviation-weather/fronts-troughs-drylines",
      "/learn/aviation-weather/atmospheric-stability",
      "/learn/aviation-weather/surface-analysis-prog-charts",
      "/learn/aviation-weather/weather-briefings",
      "/learn/aviation-weather/weather-risk",
      "/learn/flight-risk-assessment-tool",
    ])
  })

  it("includes exactly 36 learn URLs in the sitemap path set", () => {
    const paths = getLearnSitemapPaths()
    expect(paths).toHaveLength(36)
    expect(paths).toContain("/learn/trapped-in-ice")
    expect(paths[0]).toBe("/learn")
    expect(paths).toContain("/learn/aviation-weather/thunderstorms")
    expect(paths).toContain("/learn/aviation-weather/weather-risk")
    expect(paths).toContain("/learn/mos-vs-nbm-vs-taf")
    expect(paths).toContain("/learn/risk-stacking")
  })

  it("registers the TAF hub in LIVE_LEARN_ROUTES", () => {
    expect(LIVE_LEARN_ROUTES.some((r) => r.href === LEARN_TAF_DECODE_HREF)).toBe(
      true
    )
  })

  it("keeps a future [slug] article off index and sitemap unless allowlisted", () => {
    const futureSlug = "future-learn-article-not-on-allow-list"
    expect(isIndexableLearnArticleSlug(futureSlug)).toBe(false)

    const futureArticle = {
      ...getLearnArticle("tcf-vs-ecfp")!,
      slug: futureSlug,
      draft: false,
    }
    expect(shouldIndexLearnArticle(futureArticle)).toBe(false)
    expect(shouldEmitArticleJsonLd(futureArticle)).toBe(false)
    expect(
      getIndexableLearnArticles().some((a) => a.slug === futureSlug)
    ).toBe(false)
  })
})
