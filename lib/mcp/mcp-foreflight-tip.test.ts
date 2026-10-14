import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const src = readFileSync(join(process.cwd(), "app/mcp/page.tsx"), "utf8")
const TIP =
  "If you also use the ForeFlight MCP, you can ask your assistant to compare the ForeFlight briefing directly with the PlaneWX briefing. Only do this for flights departing within about 2 hours. ForeFlight briefings are built for near-term departures, so a comparison made hours in advance won't be accurate."

describe("/mcp ForeFlight compare tip", () => {
  it("shows the tip text exactly", () => {
    expect(src).toContain(TIP)
    expect(src).toContain('<strong className="text-white">Tip:</strong> {FOREFLIGHT_COMPARE_TIP}')
  })

  it("adds the FAQ entry that feeds the JSON-LD", () => {
    expect(src).toContain('q: "Can I compare a ForeFlight briefing with my PlaneWX briefing?"')
    expect(src).toContain("a: FOREFLIGHT_COMPARE_TIP")
    expect(src).toContain("mainEntity: FAQ.map(")
  })

  it("does not misspell ForeFlight or claim a partnership", () => {
    expect(src).not.toMatch(/Foreflight|Fore Flight/)
    expect(src).not.toMatch(/ForeFlight (partner|integration)/i)
  })
})
