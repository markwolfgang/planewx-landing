import { describe, expect, it } from "vitest"
import {
  BLOG_PREVIEW_SLUGS,
  isBlogPreviewAllowedEnv,
  isBlogPreviewSlug,
} from "./blog-preview"

describe("blog preview allowlist", () => {
  it("allows only the three r10 expand slugs", () => {
    expect(BLOG_PREVIEW_SLUGS).toEqual([
      "vfr-weather-go-no-go",
      "pave-risk-assessment-weather",
      "personal-minimums-weather-planning",
    ])
    expect(isBlogPreviewSlug("vfr-weather-go-no-go")).toBe(true)
    expect(isBlogPreviewSlug("pave-risk-assessment-weather")).toBe(true)
    expect(isBlogPreviewSlug("personal-minimums-weather-planning")).toBe(true)
    expect(isBlogPreviewSlug("some-other-post")).toBe(false)
    expect(isBlogPreviewSlug("")).toBe(false)
  })

  it("is blocked in production and allowed on preview/local", () => {
    expect(isBlogPreviewAllowedEnv("production")).toBe(false)
    expect(isBlogPreviewAllowedEnv("preview")).toBe(true)
    expect(isBlogPreviewAllowedEnv("development")).toBe(true)
    expect(isBlogPreviewAllowedEnv(undefined)).toBe(true)
  })
})

describe("blog preview noindex contract", () => {
  it("documents that the preview route sets noindex, nofollow", async () => {
    // The page module's generateMetadata returns robots index:false, follow:false.
    // Assert the contract here so a regression removing noindex fails the suite.
    const { generateMetadata } = await import(
      "../app/learn-preview/blog/[slug]/page"
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "vfr-weather-go-no-go" }),
    })
    expect(meta.robots).toEqual({ index: false, follow: false })
  })
})
