import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it, vi } from "vitest"
import { NEWS_ITEMS, getPublishedNewsItems } from "@/app/news/news-data"
import { generateMetadata } from "@/app/news/[slug]/page"
import sitemap from "@/app/sitemap"

// The sitemap reads blog articles over the network. Stub only that source;
// the real sitemap function and the real news helpers run.
vi.mock("@/lib/soro", () => ({ getSoroArticles: async () => [] }))

const SLUG = "planewx-connector-edit-trips-from-chat"
const post = NEWS_ITEMS.find((n) => n.slug === SLUG)

// Source of truth: the TROUBLESHOOTING constant in app/mcp/page.tsx, read the
// same way lib/mcp/mcp-page-copy.test.ts reads it.
const mcpPageSrc = readFileSync(join(process.cwd(), "app/mcp/page.tsx"), "utf8")
const troubleshootMatch = mcpPageSrc.match(/const TROUBLESHOOTING =\s*"([^"]*)"/)
const RECONNECT_TIP = troubleshootMatch ? troubleshootMatch[1] : ""

function allText(): string {
  return [post!.title, post!.excerpt, post!.date, post!.body].join("\n")
}

describe("news: MCP connector capabilities post", () => {
  it("exists exactly once, with the usual fields", () => {
    expect(NEWS_ITEMS.filter((n) => n.slug === SLUG)).toHaveLength(1)
    expect(post).toBeTruthy()
    expect(post!.category).toBe("Product")
    expect(post!.isoDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(post!.title.length).toBeGreaterThan(0)
    expect(post!.excerpt.length).toBeGreaterThan(0)
  })

  it("names the five assistants", () => {
    expect(post!.body).toContain("Claude, Grok, ChatGPT, Gemini and Perplexity")
  })

  it("never mentions Enterprise", () => {
    expect(allText()).not.toMatch(/enterprise/i)
  })

  it("says Allow, never approve", () => {
    expect(post!.body).toContain("choose Allow")
    expect(post!.body).toContain("Also allow building briefings")
    expect(allText()).not.toMatch(/approv/i)
  })

  it("puts the briefings box before Allow, as on the real consent screen", () => {
    expect(post!.body).toContain(
      "On the consent screen, tick Also allow building briefings for scored runs, then choose Allow.",
    )
    // Old order, Allow first and tick after, is rejected.
    expect(post!.body).not.toContain("choose Allow. Tick")
    expect(post!.body.indexOf("tick Also allow building briefings")).toBeLessThan(
      post!.body.indexOf("then choose Allow"),
    )
  })

  it("includes the exact reconnect tip from the /mcp page", () => {
    expect(troubleshootMatch).toBeTruthy()
    expect(RECONNECT_TIP.length).toBeGreaterThan(50)
    expect(post!.body).toContain(RECONNECT_TIP)
  })

  it("does not name admin-only tools or claim a tool count", () => {
    const t = allText()
    expect(t).not.toContain("trip_sync")
    expect(t).not.toContain("get_customs_info")
    expect(t).not.toMatch(/\b13 tools\b/i)
    expect(t).not.toMatch(/\bthirteen\b/i)
  })

  it("uses no em or en dashes, arrows, ellipses, spaced hyphens or non-ASCII", () => {
    const t = allText()
    expect(t).not.toMatch(/[\u2013\u2014\u2192\u2190\u2026]/)
    expect(t).not.toContain(" - ")
    expect(t).not.toContain("--")
    // eslint-disable-next-line no-control-regex
    expect(t).toMatch(/^[\x00-\x7F]*$/)
  })

  it("avoids banned safety and recommendation words", () => {
    const t = allText()
    expect(t).not.toMatch(/\bsafe(ly)?\b|\bsafety\b|\blegal(ly)?\b|\bshould\b|\brecommend/i)
    expect(t).not.toMatch(/guarantee/i)
  })

  it("keeps the PIC line and does not tell the pilot to go or not go", () => {
    expect(post!.body).toContain("PlaneWX never tells you to go or not to go")
    expect(post!.body).toContain("pilot in command")
  })

  it("states the plan, Labs toggle and the limits from the help copy", () => {
    expect(post!.body).toContain("Pro Plus trial pilots")
    expect(post!.body).toContain("Profile, Preferences, PlaneWX Labs")
    expect(post!.body).toContain("AI assistant connector")
    expect(post!.body).toContain("not available on Free, Casual or Pro without a Pro Plus trial")
    expect(post!.body).toContain("Pro Plus gets 60 scoring runs a day and Pro Plus trials get 12")
  })

  it("states the update_trip rules from the help copy and promises no far-out support", () => {
    const b = post!.body
    expect(b).toContain("valid for 10 minutes")
    expect(b).toContain("more than 30 minutes")
    expect(b).toContain("30 minutes or less")
    expect(b).toContain("14 days ahead")
    expect(b).toContain("more than 400 days out")
    expect(b).toContain("<h2>How far ahead it can look</h2>")
    expect(b).not.toContain("Far-out trips are not new")
    expect(b).not.toMatch(/coming soon|later this|next month|soon/i)
  })

  it("states the private notes caps", () => {
    expect(post!.body).toContain("up to 300 characters, or up to 400 characters when you ask for full details")
  })

  it("is placed first and does not touch the other entries' slugs", () => {
    expect(NEWS_ITEMS[0].slug).toBe(SLUG)
    const slugs = NEWS_ITEMS.map((n) => n.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("describes confirm without over-claiming a new briefing every time", () => {
    const b = post!.body
    expect(b).toContain(
      "For most changes PlaneWX runs one new score and saves the change and the new briefing together. A departure time move of 30 minutes or less on the same date is saved without a new score.",
    )
    expect(b).toContain("because most edits build a new briefing.")
    // Old wording, written so it does not match the new sentences.
    expect(b).not.toContain("valid for 10 minutes. PlaneWX runs one new score")
    expect(b).not.toContain("because it builds a new briefing")
    expect(b).not.toMatch(/always (builds|uses|runs)/i)
  })

  it("pins the exact edit rules and the example prompt", () => {
    const b = post!.body
    expect(b).toContain("uses 1 scoring run")
    expect(b).toContain("uses 0 scoring runs")
    expect(b).toContain("uses no scoring run")
    expect(b).toContain("under 10 minutes")
    expect(b).toContain("ETA and fuel are not accepted")
    expect(b).toContain("Move my Friday KGDJ to KAUS trip to depart at 9:30 AM Central.")
    expect(b).toContain("KGDJ WINDU KAUS")
  })

  it("keeps the tool names in parentheses and the Pro Plus Labs wording", () => {
    const b = post!.body
    for (const tool of [
      "resolve_airport",
      "get_pilot_profile",
      "get_my_limits",
      "list_trips",
      "get_trip_briefing",
      "score_trip",
      "find_departure_windows",
      "get_window_results",
      "save_candidate_as_trip",
      "update_trip",
      "report_discrepancy",
    ]) {
      expect(b).toContain(`(${tool})`)
    }
    expect(b).toContain("a Pro Plus Labs feature")
  })

  it("does not mention admin, customs or apply keys", () => {
    expect(post!.body).not.toMatch(/admin|customs|apply key/i)
  })

  it("uses plain WX Score in the PIC section, with no (briefing) suffix", () => {
    expect(post!.body).toContain("The assistant reports the WX Score and what drives it.")
    expect(post!.body).not.toContain("WX Score (briefing)")
  })
})

// The publish PR flips `draft` in news-data.ts. Only this block changes then:
// delete it (or invert it). The content checks above do not depend on `draft`.
describe("news: MCP connector capabilities post, while draft", () => {
  it("is marked draft", () => {
    expect(post!.draft).toBe(true)
  })

  it("stays out of the published list and the sitemap while draft is true", async () => {
    expect(getPublishedNewsItems().some((n) => n.slug === SLUG)).toBe(false)
    const entries = await sitemap()
    expect(entries.some((e) => e.url.includes(SLUG))).toBe(false)
  })

  it("is noindex on its direct URL while draft", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: SLUG }),
      searchParams: Promise.resolve({}),
    })
    expect(meta.robots).toEqual({ index: false, follow: false })
  })
})
