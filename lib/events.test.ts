import { readFileSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import {
  DATE_COMING_SOON,
  EVENTS,
  EVENTS_PAGE_DESCRIPTION,
  eventDateText,
  getUpcomingEvents,
  todayIso,
  type PlaneWxEvent,
} from "./events"

describe("events data", () => {
  it("lists exactly the six approved events", () => {
    expect(EVENTS.map((e) => e.id)).toEqual([
      "wurst-fly-in-2026",
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

  it("uses the TBMOPA convention dates Mark set (Oct 28-31) and keeps the booth and talk lines", () => {
    const tbm = EVENTS.find((e) => e.id === "tbmopa-2026")!
    expect(tbm.startDate).toBe("2026-10-28")
    expect(tbm.endDate).toBe("2026-10-31")
    expect(eventDateText(tbm)).toBe("Oct 28-31, 2026")
    expect(tbm.planewx[0]).toBe("Visit the PlaneWX booth in the exhibit hall, Oct 29-31.")
    expect(tbm.planewx[1]).toContain("Fri Oct 30, 12:30-1:00 PM MST")
  })

  it("has no box paths in the data file", () => {
    const src = readFileSync(path.join(__dirname, "events.ts"), "utf8")
    expect(src).not.toMatch(/\/workspace\/|\/home\//)
  })

  it("has no booth numbers or promo codes", () => {
    const text = JSON.stringify(EVENTS).toLowerCase()
    expect(text).not.toMatch(/booth\s*#|booth\s+\d|promo|discount|coupon/)
  })

  it("lists the Wurst Fly-In (Oct 17, 11:00 AM-2:00 PM CT) before TBMOPA", () => {
    const wurst = EVENTS.find((e) => e.id === "wurst-fly-in-2026")!
    expect(wurst.startDate).toBe("2026-10-17")
    expect(eventDateText(wurst)).toBe("Sat, Oct 17, 2026, 11:00 AM-2:00 PM CT")
    expect(wurst.location).toContain("(KBTA), Hangar J")
    const ids = getUpcomingEvents(EVENTS, "2026-10-16").map((e) => e.id)
    expect(ids.indexOf("wurst-fly-in-2026")).toBe(ids.indexOf("tbmopa-2026") - 1)
  })

  it("keeps the Wurst Fly-In upcoming through its 2:00 PM CT end (dates compared in Chicago time)", () => {
    const ids = (iso: string) => getUpcomingEvents(EVENTS, todayIso(new Date(iso))).map((e) => e.id)
    // CDT (UTC-5) on Oct 17: 11:00 AM = 16:00Z, 1:59 PM = 18:59Z, 2:00 PM = 19:00Z.
    expect(ids("2026-10-17T16:00:00Z")).toContain("wurst-fly-in-2026")
    expect(ids("2026-10-17T18:59:00Z")).toContain("wurst-fly-in-2026")
    expect(ids("2026-10-17T19:00:00Z")).toContain("wurst-fly-in-2026")
    // Drops off after the day ends in Chicago (midnight CDT = 05:00Z Oct 18).
    expect(ids("2026-10-18T05:00:00Z")).not.toContain("wurst-fly-in-2026")
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
    expect(getUpcomingEvents(EVENTS, "2026-10-28").map((e) => e.id)[0]).toBe("tbmopa-2026")
    expect(getUpcomingEvents(EVENTS, "2026-10-31").map((e) => e.id)[0]).toBe("tbmopa-2026")
    expect(getUpcomingEvents(EVENTS, "2026-11-01").map((e) => e.id)[0]).toBe("eaa-282-2026-11")
  })

  it("keeps TBMOPA up through 11:59 PM Chicago time on Oct 31", () => {
    // Still CDT at midnight Oct 31/Nov 1 (DST ends 2 AM Nov 1): 11:59 PM CDT Oct 31 = 04:59Z Nov 1.
    const ids = (iso: string) => getUpcomingEvents(EVENTS, todayIso(new Date(iso))).map((e) => e.id)
    expect(ids("2026-11-01T04:59:00Z")).toContain("tbmopa-2026")
    expect(ids("2026-11-01T05:00:00Z")).not.toContain("tbmopa-2026")
  })

  it("returns an empty list once every dated event has ended", () => {
    expect(getUpcomingEvents(EVENTS, "2027-08-02")).toEqual([])
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

describe("/events page", () => {
  const page = readFileSync(path.join(__dirname, "..", "app", "events", "page.tsx"), "utf8")

  it("revalidates hourly", () => {
    expect(page).toMatch(/export const revalidate = 3600\b/)
  })

  it("uses a description that does not imply PlaneWX is at every event", () => {
    expect(page).toContain("const DESCRIPTION = EVENTS_PAGE_DESCRIPTION")
    expect(EVENTS_PAGE_DESCRIPTION).toBe(
      "Upcoming aviation events, and where to find PlaneWX at a booth or a talk."
    )
    expect(EVENTS_PAGE_DESCRIPTION).not.toMatch(/with PlaneWX/i)
  })

  it("renders the events list only when there are events", () => {
    expect(page).toMatch(/\{events\.length > 0 \? \(\s*<ul className="space-y-4" data-testid="events-list">/)
  })
})
