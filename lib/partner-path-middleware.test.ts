// @vitest-environment node
import { describe, expect, it } from "vitest"
import { NextRequest } from "next/server"
import { middleware } from "@/middleware"

function run(url: string, headers: Record<string, string> = {}) {
  const res = middleware(new NextRequest(url, { headers }))
  const rewrite = res.headers.get("x-middleware-rewrite")
  return { res, rewrite: rewrite ? new URL(rewrite) : null }
}

describe("partner short links in middleware", () => {
  it.each([
    ["https://www.planewx.ai/flightchops", "FLIGHTCHOPS"],
    ["https://www.planewx.ai/FlightChops", "FLIGHTCHOPS"],
    ["https://www.planewx.ai/FLIGHTCHOPS", "FLIGHTCHOPS"],
    ["https://www.planewx.ai/flightfollower", "FLIGHTFOLLOWER"],
    ["https://www.planewx.ai/FlightFollower", "FLIGHTFOLLOWER"],
  ])("serves %s as the homepage funnel with ref=%s", (url, code) => {
    const { rewrite } = run(url, { cookie: "planewx-variant=a" })
    expect(rewrite?.pathname).toBe("/variants/a")
    expect(rewrite?.searchParams.get("ref")).toBe(code)
  })

  it("keeps utm and other query params", () => {
    const { rewrite } = run(
      "https://www.planewx.ai/FlightChops?utm_source=youtube&utm_medium=video&utm_campaign=oct26",
      { cookie: "planewx-variant=a" },
    )
    expect(rewrite?.searchParams.get("ref")).toBe("FLIGHTCHOPS")
    expect(rewrite?.searchParams.get("utm_source")).toBe("youtube")
    expect(rewrite?.searchParams.get("utm_medium")).toBe("video")
    expect(rewrite?.searchParams.get("utm_campaign")).toBe("oct26")
  })

  it("lets an explicit ?ref= win over the path code", () => {
    const { rewrite } = run("https://www.planewx.ai/flightchops?ref=OTHER", {
      cookie: "planewx-variant=a",
    })
    expect(rewrite?.searchParams.get("ref")).toBe("OTHER")
  })

  it("pins link-unfurl bots to variant A so the preview card is stable", () => {
    const { rewrite } = run("https://www.planewx.ai/flightchops", {
      "user-agent": "Mozilla/5.0 (compatible; Discordbot/2.0)",
    })
    expect(rewrite?.pathname).toBe("/variants/a")
    expect(rewrite?.searchParams.get("ref")).toBe("FLIGHTCHOPS")
  })

  it("does not rewrite unknown single-segment paths", () => {
    const { rewrite } = run("https://www.planewx.ai/flightchop")
    expect(rewrite).toBeNull()
  })
})
