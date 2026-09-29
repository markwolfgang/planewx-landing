import { describe, expect, it } from "vitest"
import {
  LEARN_TAF_DECODE_HREF,
  LIVE_LEARN_ROUTES,
  getLearnArticle,
  getTafDecodeCrossLink,
  withOptionalTafDecodeLink,
  type LiveLearnRoute,
} from "./learn-data"

const LIVE_TAF: LiveLearnRoute = {
  href: LEARN_TAF_DECODE_HREF,
  title: "What Is a TAF? How to Read a Terminal Aerodrome Forecast",
}

describe("getTafDecodeCrossLink", () => {
  it("returns null when the TAF decode route is not live", () => {
    expect(LIVE_LEARN_ROUTES).toEqual([])
    expect(getTafDecodeCrossLink([])).toBeNull()
    expect(getTafDecodeCrossLink()).toBeNull()
  })

  it("returns href and label when a live TAF entry is injected", () => {
    expect(getTafDecodeCrossLink([LIVE_TAF])).toEqual({
      href: "/learn/aviation-weather/taf",
      label: "What Is a TAF? How to Read a Terminal Aerodrome Forecast",
    })
  })
})

describe("withOptionalTafDecodeLink", () => {
  const mosBody = getLearnArticle("mos-vs-nbm-vs-taf")!.body

  it("omits the decode line and TAF href when the route is not live", () => {
    const blocks = withOptionalTafDecodeLink(mosBody, [])
    expect(blocks).toEqual(mosBody)
    const serialized = JSON.stringify(blocks)
    expect(serialized).not.toContain("/learn/aviation-weather/taf")
    expect(serialized).not.toContain("For a group by group decode of a TAF")
  })

  it("inserts the decode line with the registry href and label when live", () => {
    const blocks = withOptionalTafDecodeLink(mosBody, [LIVE_TAF])
    const decode = blocks.find(
      (b) =>
        b.type === "paragraph" &&
        b.text.includes("For a group by group decode of a TAF")
    )
    expect(decode).toEqual({
      type: "paragraph",
      text: "For a group by group decode of a TAF, see [What Is a TAF? How to Read a Terminal Aerodrome Forecast](/learn/aviation-weather/taf).",
    })
    const firstPara = mosBody.findIndex((b) => b.type === "paragraph")
    expect(blocks[firstPara + 1]).toEqual(decode)
  })
})
