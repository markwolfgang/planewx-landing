import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getSoroArticleBySlug, getSoroArticles } from "@/lib/soro"

const BLOG_SLUG_PAGE = join(process.cwd(), "app/blog/[slug]/page.tsx")
const NOT_FOUND_PAGE = join(process.cwd(), "app/not-found.tsx")

describe("blog unknown slug returns notFound (no DYNAMIC_SERVER_USAGE)", () => {
  it("calls notFound in generateMetadata and the page before any dereference", () => {
    const src = readFileSync(BLOG_SLUG_PAGE, "utf8")

    expect(src).not.toMatch(/\bconnection\b/)
    expect(src).toContain('from "next/navigation"')
    expect(src).toContain("export const dynamicParams = true")

    const metaFn = src.slice(src.indexOf("export async function generateMetadata"))
    const metaBody = metaFn.slice(0, metaFn.indexOf("export default"))
    expect(metaBody).toMatch(/if\s*\(\s*!article\s*\)\s*notFound\s*\(\s*\)/)
    expect(metaBody).not.toMatch(/if\s*\(\s*!article\s*\)\s*return\s*\{\s*\}/)

    const pageFn = src.slice(src.indexOf("export default async function BlogPostPage"))
    expect(pageFn).toMatch(/if\s*\(\s*!article\s*\)\s*notFound\s*\(\s*\)/)
    // Title render must come after the notFound guard.
    const notFoundIdx = pageFn.search(/if\s*\(\s*!article\s*\)\s*notFound\s*\(\s*\)/)
    const titleIdx = pageFn.indexOf("article.title")
    expect(notFoundIdx).toBeGreaterThanOrEqual(0)
    expect(titleIdx).toBeGreaterThan(notFoundIdx)
  })

  it("ships a global not-found page with robots noindex", () => {
    const src = readFileSync(NOT_FOUND_PAGE, "utf8")
    expect(src).toMatch(/robots:\s*\{\s*index:\s*false\s*,\s*follow:\s*true\s*\}/)
  })

  it("resolves a known published slug and returns null for an unknown slug", async () => {
    const articles = await getSoroArticles()
    expect(articles.length).toBeGreaterThan(0)

    const known = articles[0]
    const found = await getSoroArticleBySlug(known.slug)
    expect(found).not.toBeNull()
    expect(found?.slug).toBe(known.slug)
    expect(found?.title).toBeTruthy()

    const missing = await getSoroArticleBySlug(
      "ifr-personal-minimums-low-time-instrument-pilots"
    )
    expect(missing).toBeNull()
  }, 20_000)
})
