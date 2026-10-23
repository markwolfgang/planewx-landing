import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { DECISION_MAKING_HUB_PAGES } from "../learn-data"
import { MAIN_HTML } from "./content"
import { ARTICLE_JSON_LD, BREADCRUMB_JSON_LD, DEFINED_TERM_SET_JSON_LD, FAQ_JSON_LD } from "./json-ld"

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8")

const PAGE_TSX = read("app/learn/risk-management-loop/page.tsx")
const NEXT_CONFIG = read("next.config.mjs")
const LLMS_TXT = read("public/llms.txt")
const normalize = (text: string) => text.replace(/\u00a0/g, " ").replace(/\u2011/g, "-").replace(/\s+/g, " ")
const HOMEPAGE = normalize(read("components/landing-variant-a.tsx"))
const V3 = normalize(read("components/landing-page-v3.tsx"))
const FOOTER = normalize(read("components/shared/footer-cta.tsx"))

const DEFINITION =
  "Brief, Assess, Decide, Debrief is a four-step risk management loop for general aviation pilots: the pilot briefs the flight, assesses the risk with PAVE and a FRAT, makes their own GO / NO-GO call, then debriefs what actually happened so the next flight starts with better information."
const URL = "https://www.planewx.ai/learn/risk-management-loop"

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
const JSON_LD = [ARTICLE_JSON_LD, FAQ_JSON_LD, DEFINED_TERM_SET_JSON_LD, BREADCRUMB_JSON_LD]
  .map((block) => JSON.stringify(block))
  .join(" ")
const COPY = `${TEXT} ${JSON_LD}`

// Text inside double quotes is a verbatim FAA or PlaneWX help quote.
const UNQUOTED = TEXT.replace(/"[^"]*"|\u201c[^\u201d]*\u201d/g, '""')

// Non-decision uses of the word "Go" (titles of other guides).
const NON_DECISION_GO = ["Where to Go Next"] as const

const TITLE = PAGE_TSX.match(/const TITLE = "([^"]+)"/)?.[1] ?? ""
const DESCRIPTION = PAGE_TSX.match(/const DESCRIPTION =\s*"([^"]+)"/)?.[1] ?? ""

describe("risk management loop learn page", () => {
  it("uses the agreed title, a short meta description, and an H1 that spells out general aviation", () => {
    expect(TITLE).toBe("Brief, Assess, Decide, Debrief: GA Risk Management Loop")
    expect(TITLE.length).toBeLessThanOrEqual(60)
    expect(PAGE_TSX).toContain("title: { absolute: TITLE }")
    expect(DESCRIPTION.length).toBeGreaterThan(0)
    expect(DESCRIPTION.length).toBeLessThanOrEqual(155)
    expect(PAGE_TSX).toContain(`const CANONICAL = "${URL}"`)
    const h1 = visibleText(MAIN_HTML.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] ?? "")
    expect(h1).toBe("Brief, Assess, Decide, Debrief: A Risk Management Loop for General Aviation")
    expect(ARTICLE_JSON_LD.headline).toBe(h1)
  })

  it("opens with the exact definition", () => {
    const answer = MAIN_HTML.match(/<p class="answer" id="definition">([\s\S]*?)<\/p>/)?.[1] ?? ""
    expect(answer.startsWith(`<strong>${DEFINITION}</strong>`)).toBe(true)
    expect(DEFINITION).toContain("general aviation")
  })

  it("uses no em dashes, en dashes, or arrows in copy or structured data", () => {
    expect(COPY).not.toMatch(/[\u2013\u2014\u2190-\u21FF\u27F5-\u27FF]|->|=>|<-|\s-\s/)
    expect(PAGE_COPY).not.toMatch(/[\u2013\u2014\u2190-\u21FF]|\s-\s/)
  })

  it("never frames the Free plan as a trial or makes credit card claims", () => {
    const lower = `${COPY} ${PAGE_COPY}`.toLowerCase()
    expect(lower).not.toMatch(/\btrial\b|free to start|credit card/)
    expect(TEXT).toContain("the Free plan is completely free")
    expect(PAGE_COPY).toContain("the Free plan is completely free")
  })

  it("never calls the product a briefing", () => {
    const lower = `${COPY} ${PAGE_COPY}`.toLowerCase()
    expect(lower).not.toMatch(/briefing app|planewx briefing|wx score briefing|briefing board|briefing tool/)
  })

  it("writes GO / NO-GO only in uppercase", () => {
    let checked = `${TEXT} ${PAGE_COPY} ${JSON_LD}`
    for (const phrase of NON_DECISION_GO) checked = checked.split(phrase).join("")
    expect(checked).not.toMatch(/\b[Gg]o\s*\/\s*[Nn]o-[Gg]o\b|\b[Nn]o-[Gg]o\b/)
    expect(checked).not.toMatch(/\b[Gg]o\b(?!-)/)
    expect(TEXT).toContain("GO / NO-GO")
  })

  it("does not tell the pilot what to do", () => {
    const sentences = UNQUOTED.split(/(?<=[.!?])\s+/)
    const imperative =
      /^(Check|Ask|Run|Use|Make|Try|Fly|Stay|Avoid|Remember|Consider|See|Hover|Tap|Click|Start|Pick|Review|Read|Plan|Compare|Don't|Do not|Never|Always|Be|Get|Open|Set|Keep|Take|Write|Call|Think|Look|Learn|Brief the|Assess the|Decide on|Debrief the)\b/
    for (const s of sentences) expect(s).not.toMatch(imperative)
    expect(UNQUOTED.toLowerCase()).not.toMatch(/\byou should\b|\byou must\b|\byou need to\b|\bpilots should\b|\bmake sure\b/)
    expect(PAGE_COPY.toLowerCase()).not.toMatch(/\byou should\b|\bpilots should\b/)
  })

  it("never implies PlaneWX alone is enough and keeps the call with the pilot", () => {
    expect(TEXT).toContain("Pilots also weigh NOTAMs, ATIS, PIREPs, an official weather briefing, and their own judgment")
    expect(TEXT).toContain("PlaneWX never recommends GO or NO-GO")
    expect(TEXT).not.toMatch(/PlaneWX (is all|is everything|replaces)/)
  })

  it("keeps the shipped PlaneWX facts", () => {
    expect(TEXT).toContain("opens within 4 hours of departure")
    expect(TEXT).toContain("Self Debrief")
    expect(TEXT).toMatch(/WX Score points/)
    expect(TEXT).toMatch(/FRAT points|risk points/)
    expect(TEXT).not.toMatch(/PlaneWX Labs feature for Pro Plus|coming soon|Corridor Watch/i)
  })

  it("states the debrief and FRAT figure only as an association", () => {
    expect(TEXT).toContain(
      "One pattern in PlaneWX data: pilots who debrief a flight are about twice as likely to run a FRAT on the next one. That is an association, not evidence that the debrief causes it.",
    )
    expect(TEXT.match(/twice as likely/g)?.length).toBe(1)
  })

  it("cites FAA-H-8083-2A, the PHAK, and 14 CFR with links, and every cite resolves", () => {
    for (const href of [
      "https://www.faa.gov/sites/faa.gov/files/2022-06/risk_management_handbook_2A.pdf",
      "https://www.faa.gov/sites/faa.gov/files/04_phak_ch2.pdf",
      "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91/subpart-B/section-91.103",
      "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91/subpart-A/section-91.3",
      "https://www.faa.gov/general/flight-risk-assessment-tool-frat-faa-safety-team",
    ]) {
      expect(MAIN_HTML).toContain(`href="${href}"`)
    }
    expect(TEXT).toContain("FAA-H-8083-2A")
    const cited = new Set([...MAIN_HTML.matchAll(/href="#ref-(\d+)"/g)].map((m) => m[1]))
    expect(cited.size).toBeGreaterThan(0)
    for (const n of cited) expect(MAIN_HTML).toContain(`<li id="ref-${n}">`)
  })

  it("has FAQPage JSON-LD that matches the visible FAQ exactly", () => {
    const faqSection = MAIN_HTML.match(/<section class="faq">([\s\S]*?)<\/section>/)?.[1] ?? ""
    const visible = [...faqSection.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(
      (m) => [decode(m[1]), faqAnswerText(m[2])],
    )
    expect(FAQ_JSON_LD["@type"]).toBe("FAQPage")
    const schema = FAQ_JSON_LD.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])
    expect(visible.length).toBeGreaterThanOrEqual(5)
    expect(schema).toEqual(visible)
  })

  it("has DefinedTerm JSON-LD whose terms match the visible glossary", () => {
    expect(DEFINED_TERM_SET_JSON_LD["@type"]).toBe("DefinedTermSet")
    const terms = DEFINED_TERM_SET_JSON_LD.hasDefinedTerm
    const loop = terms.find((t) => t["@id"] === `${URL}#gl-risk-management-loop`)
    expect(loop?.name).toBe("Brief, Assess, Decide, Debrief")
    expect(loop?.description).toBe(DEFINITION)
    expect(ARTICLE_JSON_LD.about).toEqual({ "@id": `${URL}#gl-risk-management-loop` })
    const glossary = MAIN_HTML.match(/<section class="glossary"[\s\S]*?<\/section>/)?.[0] ?? ""
    const dds = [...glossary.matchAll(/<dd>([\s\S]*?)<\/dd>/g)].map((m) => visibleText(m[1]))
    for (const term of terms) {
      expect(term["@type"]).toBe("DefinedTerm")
      expect(dds.some((dd) => dd.startsWith(term.description))).toBe(true)
      const anchor = term["@id"].split("#")[1]
      expect(MAIN_HTML).toContain(`id="${anchor}"`)
    }
    for (const step of ["Brief", "Assess", "Decide", "Debrief"]) {
      expect(terms.map((t) => t.name)).toContain(step)
    }
  })

  it("redirects /learn/brief-assess-decide-debrief permanently", () => {
    expect(NEXT_CONFIG).toMatch(
      /source:\s*"\/learn\/brief-assess-decide-debrief",\s*destination:\s*"\/learn\/risk-management-loop",\s*permanent:\s*true/,
    )
  })

  it("is in the learn registry and linked from the FRAT, IMSAFE, weather risk, and PAVE pages", () => {
    expect(DECISION_MAKING_HUB_PAGES.map((p) => p.href)).toContain("/learn/risk-management-loop")
    for (const path of [
      "app/learn/flight-risk-assessment-tool/content.ts",
      "app/learn/imsafe-checklist/content.ts",
      "app/learn/aviation-weather/weather-risk/content.ts",
      "lib/blog-overrides/pave-risk-assessment-weather.ts",
    ]) {
      expect(read(path)).toContain('href=\\"/learn/risk-management-loop\\"')
    }
    expect(read("app/learn/aviation-weather/weather-risk/content.ts")).not.toContain("PlaneWX Labs feature for Pro Plus")
  })

  it("labels every cell of the stacked tables for screens below 600px", () => {
    const tables = MAIN_HTML.match(/<table class="stack"[\s\S]*?<\/table>/g) ?? []
    expect(tables.length).toBe(2)
    let cells = 0
    for (const table of tables) {
      const headers = [...(table.match(/<thead>[\s\S]*?<\/thead>/)?.[0] ?? "").matchAll(/<th scope="col">([\s\S]*?)<\/th>/g)].map(
        (m) => decode(m[1]),
      )
      expect(table).not.toMatch(/<td(?![^>]*\bdata-label="[^"]+")[^>]*>/)
      const rows = [...table.matchAll(/<tr><th scope="row">[\s\S]*?<\/tr>/g)].map((m) => m[0])
      expect(rows.length).toBeGreaterThan(0)
      for (const row of rows) {
        const labels = [...row.matchAll(/<td data-label="([^"]+)">/g)].map((m) => m[1])
        expect(labels).toEqual(headers.slice(1))
        cells += labels.length
      }
    }
    expect(cells).toBe(28)
  })

  it("keeps stacked-table captions full width below 600px", () => {
    const css = read("app/learn/aviation-weather/aw-hub.css")
    const start = css.indexOf("@media (max-width: 599.98px) {")
    expect(start).toBeGreaterThan(-1)
    let depth = 0
    let end = start
    for (let i = css.indexOf("{", start); i < css.length; i++) {
      if (css[i] === "{") depth++
      if (css[i] === "}" && --depth === 0) {
        end = i
        break
      }
    }
    const mobile = css.slice(start, end)
    const rule = mobile.match(/table\.stack caption\s*\{([^}]*)\}/)?.[1] ?? ""
    expect(rule).toMatch(/display:\s*block/)
    expect(rule).toMatch(/width:\s*100%/)
    expect(rule).toMatch(/text-align:\s*center/)
    const tables = MAIN_HTML.match(/<table class="stack"[\s\S]*?<\/table>/g) ?? []
    for (const table of tables) expect(table).toMatch(/<table class="stack"[^>]*>\s*<caption>/)
  })

  it("uses the loop name on the homepage, /v3, and the footer without saying PlaneWX makes the call", () => {
    expect(HOMEPAGE).toContain('<span className="text-sky-400">Brief, Assess, Decide, Debrief.</span>')
    expect(HOMEPAGE).toContain('href="/learn/risk-management-loop"')
    for (const step of ["Brief", "Assess", "Decide", "Debrief"]) {
      expect(HOMEPAGE).toContain(`<h3 className="text-2xl font-bold mb-2">${step}</h3>`)
    }
    expect(HOMEPAGE).toContain("PlaneWX never recommends GO or NO-GO")
    expect(V3).toContain("Brief, Assess, Decide, Debrief: the WX Score, the FRAT, your own")
    for (const step of ["Brief", "Assess", "Decide", "Debrief"]) {
      expect(V3).toContain(`<h3 className="text-2xl font-bold mb-2">${step}</h3>`)
    }
    expect(FOOTER).toContain(
      "PlaneWX supports each step of Brief, Assess, Decide, Debrief with the WX Score, the FRAT, and Self Debrief, and the GO / NO-GO call stays with the pilot.",
    )
    for (const source of [HOMEPAGE, V3, FOOTER]) {
      expect(source).not.toMatch(/decide on your terms|WX Score briefing|never recommends go or no-go|use PlaneWX to (Brief|Decide)/)
      expect(source).not.toMatch(/>(Weather Briefing|Self Debrief|FRAT)<\/h3>/)
    }
  })

  it("is listed in llms.txt with the same definition", () => {
    expect(LLMS_TXT).toContain(URL)
    expect(LLMS_TXT).toContain(DEFINITION)
    expect(LLMS_TXT).not.toContain("Risk loop structure: Weather Briefing")
  })
})

// SF4 follow-up to #205: the old loop names must not come back anywhere in /learn content.
const SF4_PAGES = [
  "airmet-sigmet",
  "atmospheric-stability",
  "ceiling-visibility",
  "density-altitude",
  "fog",
  "fronts-troughs-drylines",
  "icing",
  "metar",
  "mountain-wave",
  "pirep",
  "surface-analysis-prog-charts",
  "taf",
  "thunderstorms",
  "turbulence",
  "weather-briefings",
  "weather-radar",
  "wind-shear-microburst",
  "winds-aloft",
] as const

function learnContentSources(): { file: string; text: string }[] {
  const files = (readdirSync(join(process.cwd(), "app/learn"), { recursive: true }) as string[])
    .filter((f) => /\.(ts|tsx|json|md|mdx)$/.test(f) && !/\.test\.tsx?$/.test(f))
    .map((f) => join("app/learn", f))
  for (const dir of ["lib/blog-posts", "lib/blog-overrides"]) {
    for (const f of readdirSync(join(process.cwd(), dir))) {
      if (/\.(ts|tsx|md|mdx)$/.test(f) && !/\.test\.tsx?$/.test(f)) files.push(join(dir, f))
    }
  }
  files.push("public/llms.txt")
  return files.map((file) => ({
    file,
    text: normalize(read(file).replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))),
  }))
}

describe("old loop wording stays out of /learn content", () => {
  const sources = learnContentSources()

  it("scans every learn source file plus the blog posts and llms.txt", () => {
    expect(sources.length).toBeGreaterThan(60)
    expect(sources.map((s) => s.file)).toContain("app/learn/learn-data.ts")
  })

  it("never uses the retired Fly or Stay loop step or the old chained loop names", () => {
    const hits: string[] = []
    for (const { file, text } of sources) {
      for (const stale of [/fly or stay/i, /then FRAT, then/i, /WX Score, then FRAT/i]) {
        const m = text.match(stale)
        if (m) hits.push(`${file}: ${m[0]}`)
      }
    }
    expect(hits).toEqual([])
  })

  it("names the loop Brief, Assess, Decide, Debrief on the renamed aviation-weather pages", () => {
    for (const slug of SF4_PAGES) {
      const html = JSON.parse(
        read(`app/learn/aviation-weather/${slug}/content.ts`).match(/export const MAIN_HTML = ("(?:\\.|[^"\\])*")/)![1],
      ) as string
      expect(html, slug).toContain(
        '<a href="/learn/risk-management-loop"><span class="loop">Brief, Assess, Decide, Debrief</span></a>, with a Mentor optional, alongside it.',
      )
      for (const step of ["Assess", "Decide", "Debrief"]) expect(html, slug).toContain(`<li><strong>${step}.</strong> `)
      expect(html, slug).toMatch(/GO \/ NO-GO is the pilot['\u2019]s call\./)
      expect(html, slug).toMatch(/Self Debrief is on every plan, Free included\./)
      expect(html, slug).not.toMatch(/Self Debrief is a PlaneWX Labs feature|It is a PlaneWX Labs feature for Pro Plus/)
      expect(html, slug).not.toMatch(/Treat the (weather decision|performance question)/)
    }
  })
})
