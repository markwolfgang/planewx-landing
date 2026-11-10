import { describe, expect, it } from "vitest"
import { MAIN_HTML as AIRMET_HTML } from "@/app/learn/aviation-weather/airmet-sigmet/content"
import { MAIN_HTML as RISK_LOOP_HTML } from "@/app/learn/risk-management-loop/content"
import { decodeHtmlEntities, htmlToMarkdown } from "@/lib/html-to-markdown"

describe("htmlToMarkdown", () => {
  it("converts headings, links, lists and emphasis", () => {
    const md = htmlToMarkdown(
      '<h1>Title</h1><p>Hello <strong>world</strong> and <a href="/learn">learn</a>.</p><ul><li>One</li><li>Two</li></ul>',
    )
    expect(md).toContain("# Title")
    expect(md).toContain("Hello **world** and [learn](/learn).")
    expect(md).toContain("- One")
    expect(md).toContain("- Two")
  })

  it("converts tables and definition lists", () => {
    const md = htmlToMarkdown(
      '<table><caption>Demo</caption><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table><dl><dt>Term</dt><dd>Definition</dd></dl>',
    )
    expect(md).toContain("*Demo*")
    expect(md).toContain("| A | B |")
    expect(md).toContain("| 1 | 2 |")
    expect(md).toContain("**Term**")
    expect(md).toContain("Definition")
  })

  it("builds readable markdown from the risk-loop HTML source", () => {
    const md = htmlToMarkdown(RISK_LOOP_HTML)
    expect(md).toMatch(/^# Brief, Assess, Decide, Debrief/)
    expect(md).toContain("## Brief, Assess, Decide, Debrief: key takeaways")
    expect(md.length).toBeGreaterThan(2000)
    expect(md).not.toContain("<article")
  })

  it("keeps raw pre text newlines and spacing, including adjacent tokens", () => {
    const md = htmlToMarkdown(
      "<pre><code><a>SFO</a><a>R</a> UWS 100130\nVALID UNTIL 100530</code></pre>",
    )
    const fence = /```\n([\s\S]*?)\n```/.exec(md)
    expect(fence?.[1]).toBe("SFOR UWS 100130\nVALID UNTIL 100530")
    expect(fence?.[1]?.split("\n")).toEqual([
      "SFOR UWS 100130",
      "VALID UNTIL 100530",
    ])
  })

  it("keeps the sample SIGMET pre blocks byte-exact, including joined tokens", () => {
    const fences = [...htmlToMarkdown(AIRMET_HTML).matchAll(/```\n([\s\S]*?)\n```/g)].map(
      (match) => match[1],
    )
    expect(fences).toContain(
      [
        "SFOR UWS 100130",
        "SIGMET ROMEO 1 VALID UNTIL 100530",
        "OR WA",
        "FROM SEA TO PDT TO EUG TO SEA",
        "SEV TURB BTN FL280 AND FL350. CONDS CONTG BYD 0530Z.",
      ].join("\n"),
    )
    expect(fences).toContain(
      [
        "MKCC WST 221855",
        "CONVECTIVE SIGMET 20C",
        "VALID UNTIL 2055Z",
        "ND SD",
        "FROM 90W MOT-GFK-ABR-90W MOT",
        "INTSFYG AREA SEV TS MOVG FROM 24045KT. TOPS ABV FL450. WIND GUSTS TO 60KTS RPRTD. TORNADOES...HAIL TO 2 IN... WIND GUSTS TO 65KTS POSS ND PTN.",
      ].join("\n"),
    )
  })

  it("reduces in-page fragment hrefs to label text and keeps real links", () => {
    const md = htmlToMarkdown(
      '<p>See <a href="#gl-sigmet">SIGMET</a> and <a class="cite" href="#ref-3">[3, para. 7-1-6]</a> or <a href="/learn">learn</a>.</p>',
    )
    expect(md).toBe("See SIGMET and [3, para. 7-1-6] or [learn](/learn).")
  })

})

describe("decodeHtmlEntities", () => {
  it("folds nbsp and dashes to ASCII", () => {
    expect(decodeHtmlEntities("A&nbsp;&mdash;&nbsp;B")).toBe("A  -  B")
  })
})
