import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import {
  LONG_RANGE_HUB_APPEND_HTML,
  LONG_RANGE_KEEP_APPEND_SLUGS,
  LONG_RANGE_REDIRECT_SLUGS,
  isLongRangeRedirectSlug,
} from "./long-range-planning-consolidation"
import { BLOG_APPENDS } from "./blog-overrides"

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8")

describe("long-range planning consolidation", () => {
  it("lists exactly eight permanent redirect slugs", () => {
    expect([...LONG_RANGE_REDIRECT_SLUGS]).toEqual([
      "can-pilots-plan-trips-three-days-ahead",
      "general-aviation-weather-planning-guide",
      "guide-to-planning-flights-days-ahead",
      "how-to-brief-multi-day-flights",
      "how-to-plan-flights-before-tafs",
      "how-to-plan-flights-with-uncertain-weather",
      "long-range-aviation-weather-forecasts",
      "multi-day-flight-planning-that-holds-up",
    ])
  })

  it("excludes the eight redirected slugs from the sitemap filter", () => {
    const sitemapSrc = read("app/sitemap.ts")
    expect(sitemapSrc).toContain("isLongRangeRedirectSlug")
    expect(sitemapSrc).toContain(
      ".filter((a) => !isLongRangeRedirectSlug(a.slug))",
    )

    const sample = [
      "kept-post",
      ...LONG_RANGE_REDIRECT_SLUGS,
      "another-kept-post",
    ]
    const forSitemap = sample.filter((slug) => !isLongRangeRedirectSlug(slug))
    expect(forSitemap).toEqual(["kept-post", "another-kept-post"])
    for (const slug of LONG_RANGE_REDIRECT_SLUGS) {
      expect(isLongRangeRedirectSlug(slug)).toBe(true)
      expect(forSitemap).not.toContain(slug)
    }
  })

  it("filters redirected posts from the blog index listing", () => {
    const blogIndex = read("app/blog/page.tsx")
    expect(blogIndex).toContain("isLongRangeRedirectSlug")
  })

  it("gives when-do-aviation-forecasts-stabilize a single hub link", () => {
    expect(LONG_RANGE_KEEP_APPEND_SLUGS).not.toContain(
      "when-do-aviation-forecasts-stabilize",
    )
    expect(BLOG_APPENDS["when-do-aviation-forecasts-stabilize"]).toBeUndefined()
    const override = read(
      "lib/blog-overrides/when-do-aviation-forecasts-stabilize.ts",
    )
    const matches = override.match(
      /\/learn\/long-range-flight-weather-planning/g,
    )
    expect(matches).toHaveLength(1)
    expect(LONG_RANGE_HUB_APPEND_HTML).toContain(
      "/learn/long-range-flight-weather-planning",
    )
  })
})
