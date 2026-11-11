import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getLearnArticle } from "@/app/learn/learn-data"
import {
  MARKDOWN_PAGES,
  SITE_ORIGIN,
  buildLlmsFull,
  getMarkdownForMdPath,
  getMarkdownForSlug,
  markdownUrl,
  readLlmsTxt,
  withMarkdownAlternate,
} from "@/lib/markdown-pages"

const COPY_LOCK_FILES = [
  "components/landing-page-v3.tsx",
  "components/landing-variant-a.tsx",
  "components/landing-variant-d.tsx",
  "components/landing-variant-f.tsx",
  "components/shared/landing-data.ts",
  "components/shared/pricing-section.tsx",
  "components/shared/footer-cta.tsx",
  "components/landing-page.tsx",
  "components/landing-variant-b.tsx",
  "components/landing-variant-c.tsx",
  "app/about/page.tsx",
  "app/decision-support/page.tsx",
  "app/events/sun-n-fun-2026/page.tsx",
  "app/volunteer/page.tsx",
  "lib/volunteer-landing.ts",
] as const

function read(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8")
}

describe("markdown page registry", () => {
  it("lists every in-scope HTML page and its .md URL", () => {
    const paths = MARKDOWN_PAGES.map((page) => page.mdPath)
    expect(paths).toEqual([
      "/index.md",
      "/about.md",
      "/mcp.md",
      "/learn.md",
      "/ga-customs.md",
      "/ios.md",
      "/apps.md",
      "/learn/risk-management-loop.md",
      "/learn/hazardous-attitudes.md",
      "/learn/aviation-weather/airmet-sigmet.md",
      "/learn/swiss-cheese-model-three-strikes-rule.md",
    ])
  })

  it("builds each page with a canonical URL, H1, and text body", () => {
    for (const page of MARKDOWN_PAGES) {
      const body = getMarkdownForMdPath(page.mdPath)
      expect(body, page.mdPath).toBeTruthy()
      expect(body).toContain(`Canonical: ${SITE_ORIGIN}${page.htmlPath === "/" ? "/" : page.htmlPath}`)
      expect(body).toMatch(/^# /m)
      expect(body!.length).toBeGreaterThan(200)
    }
  })

  it("keeps learn article markdown on the same source as the HTML page", () => {
    const article = getLearnArticle("hazardous-attitudes")
    expect(article).toBeTruthy()
    const md = getMarkdownForSlug("learn/hazardous-attitudes") ?? ""
    expect(md).toContain(`# ${article!.title}`)
    expect(md).toContain(article!.summary)
    if (article!.faq && article!.faq.length > 0) {
      expect(md).toContain("**Q:**")
    }
    const swiss = getLearnArticle("swiss-cheese-model-three-strikes-rule")
    const swissMd = getMarkdownForSlug("learn/swiss-cheese-model-three-strikes-rule") ?? ""
    expect(swissMd).toContain(`# ${swiss!.title}`)
    expect(swissMd).toContain(swiss!.summary)
  })

  it("uses the homepage FAQ source, including the approved Free Plan wording", () => {
    const home = getMarkdownForSlug("index") ?? ""
    expect(home).toContain("Full safety analysis on every plan. Free Plan, No End Date.")
    expect(home).toContain("## FAQ")
    expect(home).toContain(
      "Yes. The Free Plan, No End Date, includes full-quality briefings for 2 flights at a time.",
    )
    expect(home).not.toMatch(/Free forever/)
    expect(home).not.toMatch(/No credit card required/i)
  })

  it("keeps About and MCP facts in the markdown pages", () => {
    const about = getMarkdownForSlug("about") ?? ""
    expect(about).toContain("stay the same quality on the Free Plan, No End Date.")
    expect(about).not.toMatch(/forever/i)
    expect(about).toContain("Veterans Airlift Command")

    const mcp = getMarkdownForSlug("mcp") ?? ""
    expect(mcp).toContain("Claude, Grok, ChatGPT and Gemini")
    expect(mcp).toContain("https://app.planewx.ai/api/mcp")
    expect(mcp).toContain(
      "If a feature does not seem to work, disconnect and reconnect to the PlaneWX connector.",
    )
    expect(mcp).not.toMatch(/enterprise/i)
  })

  it("converts GA Customs and hub HTML so key facts survive", () => {
    const customs = getMarkdownForSlug("ga-customs") ?? ""
    expect(customs).toContain("## FAQ")
    expect(customs).toMatch(/eAPIS/i)
    expect(customs.length).toBeGreaterThan(1000)

    const loop = getMarkdownForSlug("learn/risk-management-loop") ?? ""
    expect(loop).toContain("Brief, Assess, Decide, Debrief")
    expect(loop).toContain("## FAQ")
    expect(loop.length).toBeGreaterThan(2000)
  })

  it("returns null for inherited Object keys instead of calling them", () => {
    for (const key of ["constructor", "toString", "hasOwnProperty", "__proto__", "valueOf"]) {
      expect(getMarkdownForSlug(key), key).toBeNull()
    }
    expect(getMarkdownForSlug("about")).toMatch(/^# /m)
  })

  it("keeps the AIRMET/SIGMET sample advisory text byte-exact", () => {
    const md = getMarkdownForSlug("learn/aviation-weather/airmet-sigmet") ?? ""
    expect(md).toContain(
      [
        "```",
        "SFOR UWS 100130",
        "SIGMET ROMEO 1 VALID UNTIL 100530",
        "OR WA",
        "FROM SEA TO PDT TO EUG TO SEA",
        "SEV TURB BTN FL280 AND FL350. CONDS CONTG BYD 0530Z.",
        "```",
      ].join("\n"),
    )
  })

})

describe("llms.txt and llms-full.txt", () => {
  it("has Plan facts, Common questions, markdown links, and no stale commit", () => {
    const llms = readLlmsTxt()
    expect(llms).toContain("## Plan facts")
    expect(llms).toContain("Free covers 2 flights at a time.")
    expect(llms).toContain("## Common questions")
    expect(llms).toContain("What is a WX Score?")
    expect(llms).toContain(
      "Fuel Advisor (paid plans) for fuel planning with weather on every leg",
    )
    expect(llms).toContain("## Learning Center weather hubs")
    expect(llms).toContain("https://www.planewx.ai/learn/aviation-weather/taf")
    expect(llms).toContain("https://www.planewx.ai/learn/mos-vs-nbm-vs-taf")
    expect(llms).toContain("https://www.planewx.ai/learn/risk-management-loop")
    expect(llms).toContain("## Markdown versions")
    for (const page of MARKDOWN_PAGES) {
      expect(llms).toContain(markdownUrl(page.mdPath))
    }
    expect(llms).toContain("# Full context: https://www.planewx.ai/llms-full.txt")
    expect(llms).toMatch(/^Last updated: \d{4}-\d{2}-\d{2}$/m)
    expect(llms).not.toContain("c6076e2")
    expect(llms).toContain(
      "Pro Plus, trials included. Not available on Free, Casual or Pro without a Pro Plus trial.",
    )
    expect(llms).not.toMatch(/enterprise/i)
  })

  it("builds llms-full.txt from llms.txt plus About and MCP markdown", () => {
    const full = buildLlmsFull()
    expect(full.startsWith("# PlaneWX")).toBe(true)
    expect(full).toContain("# https://www.planewx.ai/about.md")
    expect(full).toContain("# https://www.planewx.ai/mcp.md")
    expect(full).toContain("Veterans Airlift Command")
    expect(full).toContain("https://app.planewx.ai/api/mcp")
    expect(full.length).toBeGreaterThan(readLlmsTxt().length + 5000)
  })
})

describe("copy locks on covered files", () => {
  it("uses Free Plan, No End Date and drops the covered No credit card lines", () => {
    const combined = COPY_LOCK_FILES.map((path) => read(path)).join("\n")
    expect(combined).toContain("Free Plan, No End Date")
    expect(combined).not.toMatch(/Free forever/)
    expect(combined).not.toMatch(/Free plan forever/)
    expect(combined).not.toMatch(/\/forever/)
    expect(combined).not.toMatch(/free-quality forever/)
    expect(combined).not.toMatch(/Free briefing quality forever/)
    expect(combined).not.toMatch(/No credit card required/)
  })

  it("leaves the 14-day Pro Plus trial wording in place", () => {
    expect(read("components/shared/pricing-section.tsx")).toContain("Free for 14 days.")
    expect(read("components/landing-page.tsx")).toContain("14-day Pro Plus trial.")
  })
})

describe("rel=alternate metadata", () => {
  it("adds a text/markdown type without dropping canonical", () => {
    const result = withMarkdownAlternate({ canonical: "/about" }, "/about.md")
    expect(result).toEqual({
      canonical: "/about",
      types: { "text/markdown": "https://www.planewx.ai/about.md" },
    })
  })

  it("is present on the homepage metadata export only as an alternate", () => {
    const home = read("app/page.tsx")
    expect(home).toContain("alternates: HOME_MARKDOWN_ALTERNATES")
    expect(home).not.toContain("Fly like it's your job.")
    const layout = read("app/layout.tsx")
    expect(layout).toContain("PlaneWX | Fly like it's your job.")
    expect(layout).toContain(
      "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. The risk-management loop for pilots without a dispatcher. Beyond the weather briefing.",
    )
  })
})

describe("markdown routes are identical for every visitor", () => {
  it("does not branch on user-agent", () => {
    const route = read("app/md-content/[...slug]/route.ts")
    const full = read("app/llms-full.txt/route.ts")
    expect(route.toLowerCase()).not.toContain("user-agent")
    expect(full.toLowerCase()).not.toContain("user-agent")
    expect(route).toContain("text/markdown; charset=utf-8")
    expect(full).toContain("text/plain; charset=utf-8")
  })
})
