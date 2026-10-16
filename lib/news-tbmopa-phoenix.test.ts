import { describe, expect, it } from "vitest"
import { getNewsItem, getPublishedNewsItems } from "@/app/news/news-data"

const SLUG = "tbmopa-annual-convention-phoenix-2026"

describe("TBMOPA Phoenix convention news draft", () => {
  const item = getNewsItem(SLUG)

  it("exists and stays a draft (off the public list and sitemap)", () => {
    expect(item).toBeDefined()
    expect(item?.draft).toBe(true)
    expect(getPublishedNewsItems().some((n) => n.slug === SLUG)).toBe(false)
  })

  it("links to the live event group and breaks out of the in-app News iframe", () => {
    expect(item?.body).toContain(
      'href="https://app.planewx.ai/group/tbmopa-annual-convention-phx" target="_top"',
    )
    expect(item?.body).toContain("Join the TBMOPA Phoenix group")
  })

  it("embeds the Short via youtube-nocookie", () => {
    expect(item?.body).toContain("https://www.youtube-nocookie.com/embed/mar3nK6daag")
  })

  it("uses Mark's approved quote and the convention dates", () => {
    expect(item?.body).toContain(
      "As a TBM pilot, I'm excited to meet other TBM owners in Phoenix and keep learning about this airplane. I'm looking forward to sharing the risk management process I use before every flight and hearing how other TBM pilots approach theirs.",
    )
    expect(item?.body).not.toContain("DRAFT QUOTE")
    // Official dates: https://tbmowners.swoogo.com/con26 ("October 28 to November 1, 2026").
    expect(item?.excerpt).toContain("October 28 to November 1")
    expect(item?.body).toContain("October 28 to November 1")
    expect(`${item?.excerpt} ${item?.body}`).not.toContain("October 28 to 31")
  })

  it("follows copy rules", () => {
    const text = `${item?.title} ${item?.excerpt} ${item?.body}`
    expect(text).not.toMatch(/\u2014|\u2013|&mdash;|&ndash;/)
    expect(text).not.toMatch(/TBMOPA30/i)
    expect(text).not.toMatch(/insurance|5X5/i)
    expect(text).not.toMatch(/ForeFlight/i)
    expect(text).not.toMatch(/endorse/i)
    expect(text).toContain("12:30 to 1:00 PM MST")
  })
})
