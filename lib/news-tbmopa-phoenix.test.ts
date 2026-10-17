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
