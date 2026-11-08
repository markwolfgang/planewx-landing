import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import {
  NEWS_ITEMS,
  getNewsItem,
  getPublishedNewsItems,
} from "@/app/news/news-data"
import {
  isCaaPressPreviewAllowed,
  loadCaaPressPreview,
} from "@/lib/caa-press-preview"

const root = process.cwd()
const partnersSrc = readFileSync(join(root, "app/partners/page.tsx"), "utf8")
const unpublishedDir = join(root, "content/unpublished")
const caaSourcePath = join(unpublishedDir, "caa-fuel-provider-partner.md")
const caaLogoPath = join(root, "public/partners/caa-logo-rgb-gradient.svg")
const previewPagePath = join(
  root,
  "app/brand/reviews/caa-fuel-provider-partner/page.tsx",
)
const newsroomBacklogPath = join(root, "app/news/NEWSROOM-BACKLOG.md")
const sitemapSrc = readFileSync(join(root, "app/sitemap.ts"), "utf8")
const newsPageSrc = readFileSync(join(root, "app/news/page.tsx"), "utf8")

const PARTNER_BLURB =
  "Corporate Aircraft Association (CAA) is PlaneWX's first fuel provider partner. CAA members on PlaneWX plans that include Fuel Advisor see negotiated Jet-A member prices at CAA Preferred FBOs inside Fuel Stop Advisor."

const MARK_QUOTE =
  "CAA is our first fuel provider partner for a reason. Their members already work hard to buy Jet-A well. Putting those prices next to the fuel stop plan, in the same trip picture pilots use for weather, makes the decision clearer."

const VERIFIED_SENTENCE =
  "Verified CAA members can see negotiated Jet-A member prices at CAA Preferred FBOs in Fuel Stop Advisor."

const SLUG = "caa-fuel-provider-partner"

function walkFiles(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walkFiles(full))
    else out.push(full)
  }
  return out
}

describe("CAA partner listing", () => {
  it("keeps the quote-clean partner-page blurb and logo path from the source", () => {
    expect(partnersSrc).toContain(PARTNER_BLURB)
    expect(partnersSrc).not.toMatch(/Linked CAA members see/)
    expect(partnersSrc).not.toMatch(/\blinked\b/i)
    expect(partnersSrc).toContain('src: "/partners/caa-logo-rgb-gradient.svg"')
    expect(partnersSrc).toContain(
      'alt: "Corporate Aircraft Association (CAA) logo"',
    )
    expect(partnersSrc).toContain("width: 612")
    expect(partnersSrc).toContain("height: 288")
    expect(partnersSrc).toContain("object-contain")
    expect(partnersSrc).toContain("h-16 sm:h-20")
    expect(partnersSrc).toContain('href: "https://www.caa.org"')
    expect(existsSync(caaLogoPath)).toBe(true)
  })

  it("preserves existing partner entries", () => {
    expect(partnersSrc).toContain("5X5 Aviation Insurance")
    expect(partnersSrc).toContain("Air Care Alliance")
    expect(partnersSrc).toContain("Veterans Airlift Command")
    expect(partnersSrc).toContain("FLYTE")
  })
})

describe("CAA press release published in NEWS_ITEMS", () => {
  it("registers CAA as the newest published Newsroom article", () => {
    const item = getNewsItem(SLUG)
    expect(item).toBeDefined()
    expect(item!.draft).toBeFalsy()
    expect(item!.category).toBe("Partnerships")
    expect(item!.date).toBe("November 7, 2026")
    expect(item!.isoDate).toBe("2026-11-07")
    expect(item!.title).toBe(
      "PlaneWX names Corporate Aircraft Association its first fuel provider partner",
    )
    expect(item!.excerpt).toBe(
      "CAA member Jet-A prices now appear in Fuel Stop Advisor",
    )
    expect(item!.coBrand?.logoClassName).toBe("h-12 sm:h-14 w-auto")
    expect(item!.body).toContain(MARK_QUOTE)
    expect(item!.body).toContain(VERIFIED_SENTENCE)
    expect(item!.body).toContain("November 7, 2026</strong>")
    expect(item!.body).not.toMatch(/2026 &mdash;<\/strong>/)
    expect(item!.body).not.toContain(
      "Until now, Fuel Stop Advisor could show where CAA Preferred FBOs sit along a route.",
    )
    expect(item!.body).not.toContain(
      "Verified CAA members now also see their CAA Jet-A member price on those stops.",
    )
    expect(item!.body).not.toMatch(/\[QUOTE APPROVED/i)
    expect(item!.body).not.toMatch(/\[CAA QUOTE/i)
    expect(item!.body).not.toMatch(/\blinked\b/i)
    expect(item!.body).not.toMatch(/\badmin\b/i)
    expect(item!.body).not.toMatch(/\bbeta\b/i)

    const published = getPublishedNewsItems()
    expect(published[0]?.slug).toBe(SLUG)
    expect(published.some((n) => n.slug === SLUG)).toBe(true)
    expect(NEWS_ITEMS[0]?.slug).toBe(SLUG)
  })

  it("scopes coBrand logoClassName to CAA only; article page keeps default fallback", () => {
    for (const item of NEWS_ITEMS) {
      if (!item.coBrand) continue
      if (item.slug === SLUG) {
        expect(item.coBrand.logoClassName).toBe("h-12 sm:h-14 w-auto")
      } else {
        expect(item.coBrand.logoClassName).toBeUndefined()
      }
    }
    const articlePage = readFileSync(
      join(root, "app/news/[slug]/page.tsx"),
      "utf8",
    )
    expect(articlePage).toContain('"h-8 w-auto sm:h-9"')
    expect(articlePage).toContain(
      "item.coBrand.logoClassName ?? \"h-8 w-auto sm:h-9\"",
    )
  })

  it("keeps Perplexity and other published news discoverable after CAA", () => {
    const published = getPublishedNewsItems()
    expect(published.length).toBeGreaterThan(1)
    expect(published.every((n) => !n.draft)).toBe(true)
    expect(
      published.some((n) => n.slug === "planewx-connects-to-perplexity"),
    ).toBe(true)
    expect(
      published.some(
        (n) => n.slug === "5x5-aviation-insurance-exclusive-partner",
      ),
    ).toBe(true)
    expect(getNewsItem("aca-air-care-alliance-partnership")?.draft).toBe(true)
    expect(
      published.some((n) => n.slug === "aca-air-care-alliance-partnership"),
    ).toBe(false)
  })

  it("wires public news list + sitemap helpers to published items", () => {
    expect(newsPageSrc).toContain("getPublishedNewsItems")
    expect(newsPageSrc).toContain("News from PlaneWX")
    expect(newsPageSrc).toContain('embed === "1"')
    expect(sitemapSrc).toContain("getPublishedNewsItems")
  })

  it("documents CAA on the NEWSROOM backlog as on-page", () => {
    const backlog = readFileSync(newsroomBacklogPath, "utf8")
    expect(backlog).toMatch(/caa-fuel-provider-partner/)
    expect(backlog).toMatch(/Nov 7, 2026/)
    expect(backlog).toMatch(/NEWS_ITEMS/)
  })

  it("keeps brand review page gated to non-production", () => {
    expect(existsSync(previewPagePath)).toBe(true)
    const page = readFileSync(previewPagePath, "utf8")
    expect(page).toMatch(/isCaaPressPreviewAllowed/)
    expect(page).toMatch(/force-dynamic/)
    const prev = process.env.VERCEL_ENV
    process.env.VERCEL_ENV = "production"
    expect(isCaaPressPreviewAllowed()).toBe(false)
    process.env.VERCEL_ENV = "preview"
    expect(isCaaPressPreviewAllowed()).toBe(true)
    if (prev === undefined) delete process.env.VERCEL_ENV
    else process.env.VERCEL_ENV = prev

    const preview = loadCaaPressPreview()
    expect(preview.bodyHtml).toContain(VERIFIED_SENTENCE)
    expect(preview.bodyHtml).toContain(MARK_QUOTE)
  })

  it("keeps provenance mirror under content/unpublished without public/ copy", () => {
    expect(existsSync(caaSourcePath)).toBe(true)
    const source = readFileSync(caaSourcePath, "utf8")
    expect(source).toContain(PARTNER_BLURB)
    expect(source).toContain('slug: "caa-fuel-provider-partner"')
    const publicFiles = walkFiles(join(root, "public"))
    expect(
      publicFiles.some((f) => f.includes("caa-fuel-provider-partner.md")),
    ).toBe(false)
    expect(existsSync(join(unpublishedDir, "README.md"))).toBe(true)
  })
})
