import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { MAIN_HTML } from "./content"
import { ARTICLE_JSON_LD, FAQ_JSON_LD } from "./json-ld"

const PAGE_TSX = readFileSync(
  join(process.cwd(), "app/learn/flight-risk-assessment-tool/page.tsx"),
  "utf8",
)

function decode(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&#8209;/g, "\u2011")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u00a0/g, " ")
}

function visibleText(html: string): string {
  return decode(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim()
}

function faqAnswerText(html: string): string {
  return decode(
    html
      .replace(/(?:\s|&nbsp;)*<span class="cites">[\s\S]*?<\/span>/g, "")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim()
}

const TEXT = visibleText(MAIN_HTML)
const PAGE_COPY = visibleText(
  PAGE_TSX.replace(/className="[^"]*"/g, "").replace(/style=\{\{[\s\S]*?\}\}/g, ""),
)
const COPY = `${TEXT} ${JSON.stringify(FAQ_JSON_LD)} ${JSON.stringify(ARTICLE_JSON_LD)}`

const sentences = TEXT.split(/(?<=[.!?])\s+/)

function withoutQuotes(text: string): string {
  return text.replace(/"[^"]*"/g, '""')
}

describe("FRAT learn page copy rules", () => {
  it("uses no em dashes, en dashes, or arrows in copy or structured data", () => {
    expect(COPY).not.toMatch(/[\u2013\u2014\u2190-\u21FF\u27F5-\u27FF]|->|=>|<-/)
    expect(PAGE_COPY).not.toMatch(/[\u2013\u2014\u2190-\u21FF]/)
  })

  it("never frames the Free plan as a trial or makes credit card claims", () => {
    const lower = `${COPY} ${PAGE_COPY}`.toLowerCase()
    expect(lower).not.toMatch(/\btrial\b|free to start|credit card/)
    expect(TEXT).toContain("the Free plan is completely free")
  })

  it("never calls the product a briefing app", () => {
    const lower = `${COPY} ${PAGE_COPY}`.toLowerCase()
    expect(lower).not.toMatch(/briefing app|try a planewx briefing|briefing board/)
  })

  it("does not describe VFR into IMC, CFIT, or scud risk items as shipped PlaneWX features", () => {
    const productSentences = sentences.filter((s) => /PlaneWX|eFRAT/.test(s))
    for (const s of productSentences) {
      expect(s).not.toMatch(/VFR[ -]into[ -]IMC|\bIMC\b|\bCFIT\b|controlled flight into terrain|\bscud/i)
    }
    for (const faq of FAQ_JSON_LD.mainEntity) {
      const both = `${faq.name} ${faq.acceptedAnswer.text}`
      if (/PlaneWX|eFRAT/.test(both)) {
        expect(both).not.toMatch(/VFR[ -]into[ -]IMC|\bIMC\b|\bCFIT\b|\bscud/i)
      }
    }
  })

  it("writes GO / NO-GO only in uppercase outside direct FAA quotes", () => {
    const unquoted = withoutQuotes(`${TEXT} ${FAQ_JSON_LD.mainEntity.map((q) => q.acceptedAnswer.text).join(" ")}`)
    expect(unquoted).not.toMatch(/\bgo\s*\/\s*no-go\b|\bno-go\b/)
    expect(unquoted).not.toMatch(/\bGo\s*\/\s*No-Go\b|\bNo-Go\b/)
  })

  it("names the other sources a pilot weighs and keeps the call with the pilot", () => {
    expect(TEXT).toMatch(/pilots also weigh NOTAMs, ATIS, PIREPs, an official weather briefing, and their own judgment/)
    expect(TEXT).toContain("PlaneWX never recommends GO or NO-GO")
  })

  it("keeps the approved PlaneWX FRAT facts", () => {
    expect(TEXT).toContain("Night counts from the end of evening civil twilight, not sunset, the same rule the briefing uses.")
    expect(TEXT).toContain("The FRAT does not change the WX Score")
    expect(TEXT).toContain("opens within 4 hours of departure")
    expect(TEXT).not.toMatch(/PlaneWX Labs feature for Pro Plus/)
  })

  it("answers FAA FRAT near the top with FAA and FAASafety links", () => {
    const answer = MAIN_HTML.match(/<p class="answer">([\s\S]*?)<\/p>/)?.[1] ?? ""
    expect(answer).toContain("An FAA FRAT is a Flight Risk Assessment Tool")
    expect(answer).toContain('href="https://www.faa.gov/general/flight-risk-assessment-tool-frat-faa-safety-team"')
    expect(answer).toContain('href="https://www.faasafety.gov/gslac/alc/lib_categoryview.aspx?categoryId=31"')
    expect(MAIN_HTML).toContain('<li id="ref-8">')
  })

  it("has FAQPage JSON-LD that matches the visible FAQ exactly", () => {
    const faqSection = MAIN_HTML.match(/<section class="faq">([\s\S]*?)<\/section>/)?.[1] ?? ""
    const visible = [...faqSection.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(
      (m) => [decode(m[1]), faqAnswerText(m[2])],
    )
    expect(FAQ_JSON_LD["@type"]).toBe("FAQPage")
    const schema = FAQ_JSON_LD.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])
    expect(schema).toEqual(visible)
    const names = schema.map(([q]) => q)
    for (const q of ["What is a FRAT form?", "What is a FRAT checklist?", "What is a FRAT tool?"]) {
      expect(names).toContain(q)
    }
    expect(new Set(names).size).toBe(names.length)
  })
})
