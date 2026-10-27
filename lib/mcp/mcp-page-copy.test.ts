import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const src = readFileSync(join(process.cwd(), "app/mcp/page.tsx"), "utf8")
const news = readFileSync(join(process.cwd(), "app/news/news-data.ts"), "utf8")
const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8")

/** The news items that describe the connector. */
function newsItem(slug: string): string {
  const start = news.indexOf(`slug: "${slug}"`)
  expect(start).toBeGreaterThan(-1)
  const next = news.indexOf("\n    slug: ", start + 1)
  return news.slice(start, next === -1 ? undefined : next)
}

describe("/mcp connector copy", () => {
  it("names assistants as Claude, Grok, ChatGPT and Gemini", () => {
    expect(src).toContain("Claude, Grok, ChatGPT and Gemini")
    expect(src).not.toContain("Gemini and ChatGPT")
  })

  it("keeps the meta description at 160 characters or fewer", () => {
    const m = src.match(/const DESCRIPTION =\s*"([^"]*)"/)
    expect(m).toBeTruthy()
    expect(m![1].length).toBeLessThanOrEqual(160)
  })

  it("uses Customize, then Connectors for Claude", () => {
    expect(src).toContain("In Claude, open Customize, then Connectors, then Discover.")
    expect(src).toContain("Customize, then Connectors, then Add custom connector")
    expect(src).not.toContain("Settings, then Connectors")
  })

  it("ChatGPT uses the plugin link only, with the paid-plan note", () => {
    expect(src).toContain(
      "https://chatgpt.com/plugins/plugin_asdk_app_6ace72ff9874819192f7ceb03d1a17d1",
    )
    expect(src).toContain("You need a paid ChatGPT plan. Open")
    expect(src).not.toContain("Add custom MCP server")
  })

  it("Gemini steps follow Google's Connected Apps wording", () => {
    expect(src).toContain("Settings, then Connected Apps")
    expect(src).toContain("Add a custom app")
    expect(src).toContain("Leave Client ID and Client secret blank.")
    expect(src).toContain("Keep Activity on")
    expect(src).not.toMatch(/coming soon/i)
  })

  it("does not offer the connector on a PlaneWX Enterprise plan", () => {
    expect(src).not.toMatch(/enterprise/i)
    expect(src).toContain("You need Pro Plus or a Pro Plus trial.")
    expect(src).toContain("It is not available on Free, Casual or Pro without a Pro Plus trial.")
    expect(llms).not.toMatch(/enterprise/i)
    expect(llms).toContain("Pro Plus, trials included. Not available on Free, Casual or Pro without a Pro Plus trial.")
  })

  it("tells pilots to choose Allow on the consent screen, not approve", () => {
    expect(src).not.toMatch(/approve/i)
    expect(src).toContain("Sign in to PlaneWX and choose Allow on the consent screen.")
    expect(src).toContain("Sign in to PlaneWX and choose Allow; tick Also allow")
  })

  it("tells pilots to disconnect and reconnect if a feature does not work, and renders it", () => {
    const m = src.match(/const TROUBLESHOOTING =\s*"([^"]*)"/)
    expect(m).toBeTruthy()
    expect(m![1]).toBe(
      "If a feature does not seem to work, disconnect and reconnect to the PlaneWX connector. In PlaneWX, open your Profile, then the Account tab, then Connected apps, and choose Disconnect next to the assistant. You can also revoke the PlaneWX connection in your AI assistant's app or connector settings. Then follow the steps for your assistant above to connect again.",
    )
    // The const must be rendered in the JSX, after the assistant steps it points to.
    expect(src).toMatch(/\{TROUBLESHOOTING\}/)
    expect(src.indexOf("{TROUBLESHOOTING}")).toBeGreaterThan(src.indexOf("<DemoVideo video={MCP_CHATGPT_DEMO_VIDEO} />"))
    expect(src.indexOf("{TROUBLESHOOTING}")).toBeGreaterThan(src.indexOf("{GROK_STEPS.map"))
  })

  it("connector news posts have no PlaneWX Enterprise plan text and no approve step", () => {
    const claudeGrok = newsItem("new-beta-planewx-in-claude-and-grok")
    expect(claudeGrok).not.toMatch(/enterprise/i)
    expect(claudeGrok).not.toMatch(/approve/i)
    expect(claudeGrok).toContain("choose Allow on the consent screen")
    const perplexity = newsItem("planewx-connects-to-perplexity")
    expect(perplexity).not.toContain("Enterprise included")
    const access = perplexity.slice(perplexity.indexOf("<h2>Who can use it</h2>"))
    expect(access.slice(0, access.indexOf("</p>"))).not.toMatch(/enterprise/i)
    expect(perplexity).toContain("is a Pro Plus Labs feature, and Pro Plus trials include it.")
    // Perplexity vendor plan note stays.
    expect(perplexity).toContain("Pro, Max or Enterprise")
  })
})
