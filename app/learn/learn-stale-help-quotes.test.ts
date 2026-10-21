import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

// Risk Loop and WX Score help copy as of app PR #3161
// (markwolfgang/v0-planewx-v0 @ 45b2d17fd0a8f70610c86372ae24d2bf482c9ee0).
const RISK_LOOP_FIRST =
  "PlaneWX is not a substitute for a complete, independent pre-flight weather briefing."
const RISK_LOOP_SECOND =
  "Complete briefings are available from official sources such as 1800wxbrief.com."

const STALE_VARIANTS = [
  "Pull one from a source you already trust before you fly.",
  "Pull one from a source",
  "source you already trust",
  "already trust before you fly",
  "doesn't mean don't fly",
  "does not mean don't fly",
  "don't fly without asking why",
] as const

const LEARN_DIR = join(process.cwd(), "app/learn")

function learnSources(): { file: string; text: string }[] {
  const files = (readdirSync(LEARN_DIR, { recursive: true }) as string[])
    .filter((f) => f.endsWith("/content.ts") || f === "content.ts")
    .map((f) => join(LEARN_DIR, f))
  files.push(join(LEARN_DIR, "learn-data.ts"))
  return files.map((file) => {
    const raw = readFileSync(file, "utf8")
    // Decode every string literal export so escaped text is checked as rendered.
    const decoded = [...raw.matchAll(/export const \w+ = ("(?:\\.|[^"\\])*")/g)]
      .map((m) => JSON.parse(m[1]) as string)
      .join("\n")
    const unescaped = raw.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    )
    return { file, text: `${decoded}\n${unescaped}`.replace(/\u00a0/g, " ") }
  })
}

describe("learn pages carry no stale PlaneWX help quotes", () => {
  const sources = learnSources()

  it("scans every learn content.ts plus learn-data.ts", () => {
    expect(sources.length).toBeGreaterThanOrEqual(23)
  })

  it("has no stale Risk Loop or WX Score wording on any learn page", () => {
    const hits: string[] = []
    for (const { file, text } of sources) {
      for (const stale of STALE_VARIANTS) {
        if (text.includes(stale)) hits.push(`${file}: ${stale}`)
      }
    }
    expect(hits).toEqual([])
  })

  it("follows every Risk Loop quote with the current second sentence", () => {
    const bad: string[] = []
    for (const { file, text } of sources) {
      let i = text.indexOf(RISK_LOOP_FIRST)
      while (i !== -1) {
        const after = text.slice(i + RISK_LOOP_FIRST.length).trimStart()
        if (!after.startsWith(RISK_LOOP_SECOND)) bad.push(`${file}: ${after.slice(0, 80)}`)
        i = text.indexOf(RISK_LOOP_FIRST, i + 1)
      }
    }
    expect(bad).toEqual([])
  })
})
