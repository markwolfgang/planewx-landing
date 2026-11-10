import { describe, expect, it } from "vitest"
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
})

describe("decodeHtmlEntities", () => {
  it("folds nbsp and dashes to ASCII", () => {
    expect(decodeHtmlEntities("A&nbsp;&mdash;&nbsp;B")).toBe("A  -  B")
  })
})
