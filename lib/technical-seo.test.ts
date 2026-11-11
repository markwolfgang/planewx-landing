// @vitest-environment node
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const ROOT = join(__dirname, "..")

function read(rel: string) {
  return readFileSync(join(ROOT, rel), "utf8")
}

describe("technical SEO guards", () => {
  it("does not set a site-wide homepage canonical in the root layout", () => {
    const layout = read("app/layout.tsx")
    expect(layout).not.toMatch(/alternates:\s*\{\s*canonical:\s*["']\/["']/)
    expect(layout).not.toContain('"@type": "FAQPage"')
    expect(layout).not.toContain("SearchAction")
    expect(layout).toContain('"name": "PlaneWX"')
    expect(layout).toContain("https://instagram.com/plane_wx")
    expect(layout).toContain("https://facebook.com/planewxai")
    expect(layout).toContain("https://x.com/planewxai")
    expect(layout).toContain("https://tiktok.com/@planewx")
    expect(layout).toContain("https://youtube.com/@planewx")
    expect(layout).toContain('"name": "Mark Wolfgang"')
    expect(layout).not.toMatch(/aggregateRating|reviewCount|"@type":\s*"Review"/)
  })

  it("gives legal and research pages self-referencing canonicals", () => {
    const paths = [
      ["app/privacy/page.tsx", "/privacy"],
      ["app/terms/page.tsx", "/terms"],
      ["app/cookies/page.tsx", "/cookies"],
      ["app/multi-model-analysis/page.tsx", "/multi-model-analysis"],
      ["app/research/turbulence-safety/page.tsx", "/research/turbulence-safety"],
      ["app/research/mountain-wave-validation/page.tsx", "/research/mountain-wave-validation"],
      ["app/dmca/page.tsx", "/dmca"],
    ] as const
    for (const [file, path] of paths) {
      expect(read(file)).toContain(`canonical: "https://www.planewx.ai${path}"`)
    }
  })

  it("adds self-canonical tags to talks HTML", () => {
    expect(read("public/talks/index.html")).toContain(
      'href="https://www.planewx.ai/talks"',
    )
    expect(read("public/talks/osh/index.html")).toContain(
      'href="https://www.planewx.ai/talks/osh"',
    )
    expect(read("public/talks/eaa983/index.html")).toContain(
      'href="https://www.planewx.ai/talks/eaa983"',
    )
    expect(read("public/talks/tbmopa/index.html")).toContain(
      'href="https://www.planewx.ai/talks/tbmopa"',
    )
  })

  it("keeps sitemap free of llms.txt, fake lastmod, and blog duplicates", () => {
    const sitemap = read("app/sitemap.ts")
    expect(sitemap).not.toContain("/llms.txt")
    expect(sitemap).not.toMatch(/lastModified:\s*new Date\(\)/)
    expect(sitemap).toContain("if (seenBlogSlugs.has(a.slug)) continue")
    expect(sitemap).toContain("seenBlogSlugs.add(a.slug)")
    expect(sitemap).toContain("STATIC_LASTMOD")
    // Partner funnel rewrite, not a distinct indexable page.
    expect(sitemap).not.toMatch(/url:.*\/runway/)
  })

  it("points the FLYTE partners card at the existing flyte.aero site", () => {
    const partners = read("app/partners/page.tsx")
    expect(partners).toContain('href: "https://flyte.aero"')
    expect(partners).not.toContain("https://www.planewx.ai/flyte")
  })

  it("ships a single IndexNow key file at the site root", () => {
    const keys = readdirSync(join(ROOT, "public")).filter((name) =>
      /^[a-f0-9]{32}\.txt$/i.test(name),
    )
    expect(keys).toHaveLength(1)
    const key = keys[0].replace(/\.txt$/i, "")
    expect(read(`public/${keys[0]}`).trim()).toBe(key)
    const script = read("scripts/indexnow-ping.mjs")
    expect(script).toContain("api.indexnow.org/indexnow")
    expect(script).toContain("--dry-run")
  })
})
