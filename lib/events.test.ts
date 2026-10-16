import { describe, expect, it } from "vitest"
import {
  DATE_COMING_SOON,
  EVENTS,
  eventDateText,
  getUpcomingEvents,
  todayIso,
  type PlaneWxEvent,
} from "./events"

describe("events data", () => {
  it("lists exactly the five approved events", () => {
    expect(EVENTS.map((e) => e.id)).toEqual([
      "tbmopa-2026",
      "eaa-282-2026-11",
      "dtsb-summit-2027",
      "sun-n-fun-2027",
      "airventure-2027",
    ])
  })

  it("keeps copy ASCII-only", () => {
    expect(JSON.stringify(EVENTS)).toMatch(/^[\x20-\x7E]*$/)
  })

  it("claims no PlaneWX role at SUN 'n FUN or AirVenture", () => {
    for (const id of ["sun-n-fun-2027", "airventure-2027"]) {
      expect(EVENTS.find((e) => e.id === id)!.planewx).toEqual([])
    }
  })

  it("links the DTSB ticket page", () => {
    expect(EVENTS.find((e) => e.id === "dtsb-summit-2027")!.link.href).toBe(
      "https://www.zeffy.com/en-US/ticketing/dtsb-2027-general-aviation-safety-summit"
    )
  })

  it("has no booth numbers or promo codes", () => {
    const text = JSON.stringify(EVENTS).toLowerCase()
    expect(text).not.toMatch(/booth\s*#|booth\s+\d|promo|discount|coupon/)
  })
})

describe("getUpcomingEvents", () => {
  const undated: PlaneWxEvent = {
    id: "tbd",
    name: "TBD",
    startDate: null,
    location: null,
    planewx: [],
    link: { href: "https://example.com", label: "x" },
  }

  it("orders by date with undated events last", () => {
    const shuffled = [undated, ...EVENTS].reverse()
    const ids = getUpcomingEvents(shuffled, "2026-10-16").map((e) => e.id)
    expect(ids).toEqual([...EVENTS.map((e) => e.id), "tbd"])
  })

  it("hides events after their last day and keeps multi-day events through the end", () => {
    expect(getUpcomingEvents(EVENTS, "2026-10-31").map((e) => e.id)[0]).toBe("tbmopa-2026")
    expect(getUpcomingEvents(EVENTS, "2026-11-01").map((e) => e.id)[0]).toBe("eaa-282-2026-11")
  })

  it("never hides undated events", () => {
    expect(getUpcomingEvents([undated], "2099-01-01")).toEqual([undated])
  })

  it("renders Date coming soon for undated events", () => {
    expect(eventDateText(undated)).toBe(DATE_COMING_SOON)
  })

  it("computes today in America/Chicago", () => {
    expect(todayIso(new Date("2026-10-17T03:00:00Z"))).toBe("2026-10-16")
  })
})
