import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const src = readFileSync(join(process.cwd(), "app/mcp/page.tsx"), "utf8")

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
})
