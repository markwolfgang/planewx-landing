/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { VariantTracker } from "@/components/shared/variant-tracker"
import { partnerLandingRedirectTarget } from "@/lib/partner-landing-redirect"

const ORIGIN = window.location.origin

/** Land like a browser: apply the server redirect (if any) to the URL, then load the page. */
function land(path: string) {
  const target = partnerLandingRedirectTarget(new URL(path, ORIGIN))
  const url = target ?? new URL(path, ORIGIN)
  window.history.replaceState({}, "", `${url.pathname}${url.search}`)
  cleanup()
  render(<VariantTracker variant="a" />)
  return url
}

function visitCalls(fetchMock: ReturnType<typeof vi.fn>) {
  return fetchMock.mock.calls.filter(([u]) => String(u) === "/api/campaign-visit")
}

describe("exactly one /api/campaign-visit per session", () => {
  let fetchMock: ReturnType<typeof vi.fn>
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
    fetchMock = vi.fn(() => Promise.resolve(new Response("{}")))
    vi.stubGlobal("fetch", fetchMock)
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    window.history.replaceState({}, "", "/")
  })

  it("the vanity redirect lands on a tagged URL and fires one visit", () => {
    const url = land("/flightfollower")
    expect(url.searchParams.get("ref")).toBe("FLIGHTFOLLOWER")
    expect(url.searchParams.get("utm_source")).toBe("flightfollower")
    const calls = visitCalls(fetchMock)
    expect(calls).toHaveLength(1)
    expect(JSON.parse(String((calls[0][1] as RequestInit).body))).toEqual({
      code: "FLIGHTFOLLOWER",
      lp: "a",
    })
    expect(localStorage.getItem("planewx_referral")).toBe("FLIGHTFOLLOWER")
  })

  it("reloads, the old /ref/ path, case variants, and the tagged URL do not add a second visit", () => {
    land("/flightfollower")
    land("/flightfollower") // reload of the vanity link
    land(window.location.pathname + window.location.search) // reload of the tagged URL
    land("/ref/FLIGHTFOLLOWER")
    land("/ref/flightfollower/")
    land("/FlightFollower")
    land("/?ref=flightfollower")
    expect(visitCalls(fetchMock)).toHaveLength(1)
  })

  it("the old /ref/ path alone fires exactly one visit", () => {
    land("/ref/FLIGHTFOLLOWER")
    expect(window.location.pathname).toBe("/flightfollower")
    expect(visitCalls(fetchMock)).toHaveLength(1)
  })

  it("a new session counts again", () => {
    land("/flightfollower")
    sessionStorage.clear()
    land("/flightfollower")
    expect(visitCalls(fetchMock)).toHaveLength(2)
  })
})
