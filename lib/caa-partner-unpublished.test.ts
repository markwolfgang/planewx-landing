import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import {
  NEWS_ITEMS,
  getNewsItem,
  getPublishedNewsItems,
} from "@/app/news/news-data"

const root = process.cwd()
const partnersSrc = readFileSync(join(root, "app/partners/page.tsx"), "utf8")
const unpublishedDir = join(root, "content/unpublished")
const caaSourcePath = join(
  unpublishedDir,
  "caa-fuel-provider-partner.md",
)
const caaLogoPath = join(root, "public/partners/caa-logo-rgb-gradient.svg")

const PARTNER_BLURB =
  "Corporate Aircraft Association (CAA) is PlaneWX's first fuel provider partner. CAA members see negotiated Jet-A member prices at CAA Preferred FBOs inside Fuel Stop Advisor."

/** News-release-only strings that must not enter public news loaders. */
const NEWS_ONLY_MARKERS = [
  "DRAFT QUOTE FOR MARK'S APPROVAL",
  "[CAA QUOTE, needs CAA approval]",
  "CAA member Jet-A prices now appear in Fuel Stop Advisor for CAA members",
  "MemberPrices feed",
  "Open Profile, edit an aircraft, expand Fuel Programs",
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
  it("keeps the exact partner-page blurb and logo path from the source", () => {
    expect(partnersSrc).toContain(PARTNER_BLURB)
    expect(partnersSrc).not.toMatch(/Linked CAA members see/)
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
  it("keeps the unpublished source with approved date and quote markers", () => {
    expect(existsSync(caaSourcePath)).toBe(true)
    const source = readFileSync(caaSourcePath, "utf8")
    expect(source).not.toContain("[LAUNCH DATE]")
    expect(source).toContain("ST. PETERSBURG, Fla. — November 7, 2026 —")
    expect(source).toContain(
      "can link membership starting November 7, 2026.",
    )
    expect(source).toContain("DRAFT QUOTE FOR MARK'S APPROVAL")
    expect(source).toContain("[CAA QUOTE, needs CAA approval]")
    expect(source).toContain(
      "CAA member Jet-A prices now appear in Fuel Stop Advisor for CAA members",
    )
    expect(source).toContain("CAA members can now see negotiated CAA Jet-A")
    expect(source).not.toMatch(/for linked CAA members/)
    expect(source).not.toMatch(/Linked CAA members can now see/)
    expect(source).not.toMatch(/Linked CAA members see/)
    expect(source).toContain(
      "Tagline: The confidence to go. The courage to stay.",
    )
    expect(source).toContain(PARTNER_BLURB)
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
