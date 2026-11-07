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

const PARTNER_BLURB =
  "Corporate Aircraft Association (CAA) is PlaneWX's first fuel provider partner. CAA members on PlaneWX plans that include Fuel Advisor see negotiated Jet-A member prices at CAA Preferred FBOs inside Fuel Stop Advisor."

const MARK_QUOTE =
  "CAA is our first fuel provider partner for a reason. Their members already work hard to buy Jet-A well. Putting those prices next to the fuel stop plan, in the same trip picture pilots use for weather, makes the decision clearer."

/** Release-only strings that must not enter public news loaders/routes. */
const NEWS_ONLY_MARKERS = [
  "MemberPrices feed",
  "Open Profile, edit an aircraft, expand Fuel Programs",
  MARK_QUOTE,
  "CAA member Jet-A prices now appear in Fuel Stop Advisor",
] as const

const GUESSED_SLUGS = [
  "caa-fuel-provider-partner",
  "caa-fuel-partner",
  "caa-press-release",
  "corporate-aircraft-association",
  "caa-first-fuel-provider-partner",
  "planewx-caa-partnership",
] as const

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

describe("CAA unpublished news fail-closed", () => {
  it("stores quote-clean unpublished source (no Doc tab/footer/quote labels)", () => {
    expect(existsSync(caaSourcePath)).toBe(true)
    const source = readFileSync(caaSourcePath, "utf8")

    expect(source).not.toContain("[LAUNCH DATE]")
    expect(source).toContain("November 7, 2026")
    expect(source).toContain(
      "can verify their membership starting November 7, 2026.",
    )
    expect(source).toContain(MARK_QUOTE)
    expect(source).toContain("Mark Wolfgang, Founder, PlaneWX")
    expect(source).toContain(
      "CAA member Jet-A prices now appear in Fuel Stop Advisor",
    )
    expect(source).toContain(PARTNER_BLURB)
    expect(source).toContain(
      "Tagline: The confidence to go. The courage to stay.",
    )

    // Exact deletions from quote-clean candidate.
    expect(source).not.toMatch(/Doc tab:/i)
    expect(source).not.toMatch(/TAB:\s*Tab 1/i)
    expect(source).not.toMatch(/DRAFT QUOTE FOR MARK'S APPROVAL/i)
    expect(source).not.toMatch(/\[QUOTE APPROVED/i)
    expect(source).not.toMatch(/\[CAA QUOTE/i)
    expect(source).not.toMatch(/CAA quote — pending/i)
    expect(source).not.toMatch(/CAA spokesperson/i)
    expect(source).not.toMatch(/DRAFT ONLY — not published, sent, shared/)
    expect(source).not.toMatch(/\blinked\b/i)
    expect(source).not.toMatch(/\bLinked\b/)
    expect(source).not.toMatch(/\badmin\b/i)
    expect(source).not.toMatch(/\bbeta\b/i)

    // Internal note stays outside article copy (HTML comment only).
    expect(source).toMatch(/<!--[\s\S]*UNPUBLISHED[\s\S]*-->/)
  })

  it("loads preview HTML with internal comments stripped", () => {
    const preview = loadCaaPressPreview()
    expect(preview.title).toBe(
      "PlaneWX names Corporate Aircraft Association its first fuel provider partner",
    )
    expect(preview.date).toBe("November 7, 2026")
    expect(preview.isoDate).toBe("2026-11-07")
    expect(preview.partnerBlurb).toBe(PARTNER_BLURB)
    expect(preview.bodyHtml).toContain(MARK_QUOTE)
    expect(preview.bodyHtml).not.toMatch(/UNPUBLISHED review source/)
    expect(preview.bodyHtml).not.toMatch(/DRAFT ONLY/)
    expect(preview.bodyHtml).not.toMatch(/Doc tab:/i)
    expect(preview.bodyHtml).not.toMatch(/\blinked\b/i)
    expect(preview.bodyHtml).not.toMatch(/\badmin\b/i)
    expect(preview.bodyHtml).not.toMatch(/\bbeta\b/i)
  })

  it("fail-closes press preview on Vercel production env", () => {
    const prev = process.env.VERCEL_ENV
    process.env.VERCEL_ENV = "production"
    expect(isCaaPressPreviewAllowed()).toBe(false)
    process.env.VERCEL_ENV = "preview"
    expect(isCaaPressPreviewAllowed()).toBe(true)
    delete process.env.VERCEL_ENV
    expect(isCaaPressPreviewAllowed()).toBe(true)
    if (prev === undefined) delete process.env.VERCEL_ENV
    else process.env.VERCEL_ENV = prev
  })

  it("keeps a brand-portal draft review page (not a public news route)", () => {
    expect(existsSync(previewPagePath)).toBe(true)
    const page = readFileSync(previewPagePath, "utf8")
    expect(page).toMatch(/isCaaPressPreviewAllowed/)
    expect(page).toMatch(/Draft review only/)
    expect(page).toMatch(/robots:\s*\{\s*index:\s*false/)
    expect(page).toMatch(/force-dynamic/)
  })

  it("documents unpublished status in NEWSROOM-BACKLOG", () => {
    const backlog = readFileSync(newsroomBacklogPath, "utf8")
    expect(backlog).toMatch(/CAA first fuel provider partner/)
    expect(backlog).toMatch(/content\/unpublished\/caa-fuel-provider-partner\.md/)
    expect(backlog).toMatch(/not live on \/news/i)
  })

  it("does not register CAA in NEWS_ITEMS or public news helpers", () => {
    for (const slug of GUESSED_SLUGS) {
      expect(getNewsItem(slug)).toBeUndefined()
      expect(NEWS_ITEMS.some((n) => n.slug === slug)).toBe(false)
    }
    for (const marker of NEWS_ONLY_MARKERS) {
      expect(NEWS_ITEMS.some((n) => n.body.includes(marker))).toBe(false)
      expect(
        getPublishedNewsItems().some(
          (n) =>
            n.body.includes(marker) ||
            n.title.includes("Corporate Aircraft Association") ||
            n.excerpt.includes(marker),
        ),
      ).toBe(false)
    }
    expect(
      NEWS_ITEMS.some((n) =>
        n.title.includes("Corporate Aircraft Association"),
      ),
    ).toBe(false)
  })

  it("does not import unpublished sources from news route modules", () => {
    const newsFiles = [
      "app/news/news-data.ts",
      "app/news/page.tsx",
      "app/news/[slug]/page.tsx",
      "app/news/[slug]/opengraph-image.tsx",
      "app/sitemap.ts",
    ]
    for (const rel of newsFiles) {
      const text = readFileSync(join(root, rel), "utf8")
      expect(text).not.toMatch(/content\/unpublished/)
      expect(text).not.toMatch(/caa-fuel-provider-partner/)
      for (const marker of NEWS_ONLY_MARKERS) {
        expect(text).not.toContain(marker)
      }
    }
  })

  it("keeps existing published news discoverable", () => {
    const published = getPublishedNewsItems()
    expect(published.length).toBeGreaterThan(0)
    expect(published.every((n) => !n.draft)).toBe(true)
    expect(
      published.some((n) => n.slug === "planewx-connects-to-perplexity"),
    ).toBe(true)
    expect(
      published.some(
        (n) => n.slug === "5x5-aviation-insurance-exclusive-partner",
      ),
    ).toBe(true)
    // Existing partner-review draft stays out of the public list but is still
    // a NEWS_ITEMS entry (unlike CAA, which must remain source-only).
    expect(getNewsItem("aca-air-care-alliance-partnership")?.draft).toBe(true)
    expect(
      published.some((n) => n.slug === "aca-air-care-alliance-partnership"),
    ).toBe(false)
  })

  it("does not place unpublished markdown under public/", () => {
    const publicFiles = walkFiles(join(root, "public"))
    expect(
      publicFiles.some((f) => f.includes("caa-fuel-provider-partner")),
    ).toBe(false)
    expect(existsSync(join(unpublishedDir, "README.md"))).toBe(true)
  })
})
