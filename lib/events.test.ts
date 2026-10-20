import { readFileSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { eventCalendarLinks } from "./event-calendar"
import {
  DATE_COMING_SOON,
  EVENTS,
  EVENTS_PAGE_DESCRIPTION,
  eventAttendLinks,
  eventDateText,
  getUpcomingEvents,
  todayIso,
  type PlaneWxEvent,
} from "./events"

describe("events data", () => {
  it("lists exactly the approved events", () => {
    expect(EVENTS.map((e) => e.id)).toEqual([
      "wurst-fly-in-2026",
      "tbmopa-2026",
      "eaa-282-2026-11",
      "vac-gala-2026",
      "dtsb-summit-2027",
      "sun-n-fun-2027",
      "airventure-2027",
    ])
  })

  it("keeps copy ASCII-only", () => {
    expect(JSON.stringify(EVENTS)).toMatch(/^[\x20-\x7E]*$/)
  })

  it("claims no confirmed booth location at AirVenture", () => {
    expect(EVENTS.find((e) => e.id === "airventure-2027")!.planewx).toEqual([])
  })

  it("states the confirmed SUN 'n FUN booth", () => {
    const snf = EVENTS.find((e) => e.id === "sun-n-fun-2027")!
    expect(snf.planewx).toEqual(["Find us in Hangar C, booth C-095."])
    const text = JSON.stringify(EVENTS)
    expect(text).toContain("booth C-095")
    expect(text).not.toMatch(/booth\s*#|booth\s+\d/i)
  })

  it("links the DTSB ticket page", () => {
    expect(EVENTS.find((e) => e.id === "dtsb-summit-2027")!.link.href).toBe(
      "https://www.zeffy.com/en-US/ticketing/dtsb-2027-general-aviation-safety-summit"
    )
  })

  it("uses the official TBMOPA convention dates (Oct 28-Nov 1) and keeps the booth and talk lines", () => {
    // Source: https://tbmowners.swoogo.com/con26 ("October 28 to November 1, 2026").
    const tbm = EVENTS.find((e) => e.id === "tbmopa-2026")!
    expect(tbm.startDate).toBe("2026-10-28")
    expect(tbm.endDate).toBe("2026-11-01")
    expect(eventDateText(tbm)).toBe("Oct 28-Nov 1, 2026")
    expect(tbm.planewx[0]).toBe("Visit the PlaneWX booth in the exhibit hall, Oct 29-31.")
    expect(tbm.planewx[1]).toContain("Fri Oct 30, 12:30-1:00 PM MST")
  })

  it("has no box paths in the data file", () => {
    const src = readFileSync(path.join(__dirname, "events.ts"), "utf8")
    expect(src).not.toMatch(/\/workspace\/|\/home\//)
  })

  it("has no promo codes", () => {
    const text = JSON.stringify(EVENTS).toLowerCase()
    expect(text).not.toMatch(/promo|discount|coupon/)
  })

  it("lists the EAA 282 gather and meeting start, and keeps Mark's talk", () => {
    const eaa = EVENTS.find((e) => e.id === "eaa-282-2026-11")!
    expect(eaa.startDate).toBe("2026-11-02")
    expect(eventDateText(eaa)).toBe(
      "Mon, Nov 2, 2026. Gather at 6:00 PM, meeting starts 7:00 PM Eastern."
    )
    expect(eaa.timeZone).toBe("America/New_York")
    expect(eaa.startTime).toBe("18:00")
    expect(eaa.endTime).toBe("19:00")
    expect(eaa.planewx[0]).toContain("go/no-go decisions")
  })

  it("lists the private VAC Gala between EAA 282 and DTSB, with no attend link", () => {
    const vac = EVENTS.find((e) => e.id === "vac-gala-2026")!
    expect(vac.name).toBe("Veterans Airlift Command (VAC) Gala")
    expect(vac.startDate).toBe("2026-11-06")
    expect(vac.endDate).toBe("2026-11-08")
    expect(eventDateText(vac)).toBe("Nov 6-8, 2026")
    expect(vac.location).toBe("Savannah, GA")
    expect(vac.invitationOnly).toBe(true)
    expect(vac.link).toBeUndefined()
    expect(vac.watchLink).toBeUndefined()
    expect(eventAttendLinks(vac)).toEqual([])
    expect(eventCalendarLinks(vac)).toBeNull()
    expect(vac.planewx).toEqual(["PlaneWX and Mark Wolfgang will be attending."])
    const ids = EVENTS.map((e) => e.id)
    expect(ids.indexOf("vac-gala-2026")).toBe(ids.indexOf("eaa-282-2026-11") + 1)
    expect(ids.indexOf("dtsb-summit-2027")).toBe(ids.indexOf("vac-gala-2026") + 1)
  })

  it("uses action labels on the existing official attend links", () => {
    expect(EVENTS.find((e) => e.id === "tbmopa-2026")!.link).toEqual({
      href: "https://tbmowners.org",
      label: "Event info",
    })
    expect(EVENTS.find((e) => e.id === "eaa-282-2026-11")!.link).toEqual({
      href: "https://eaachapter282.org",
      label: "Event info",
    })
    expect(EVENTS.find((e) => e.id === "dtsb-summit-2027")!.link).toEqual({
      href: "https://www.zeffy.com/en-US/ticketing/dtsb-2027-general-aviation-safety-summit",
      label: "Get tickets",
    })
    expect(EVENTS.find((e) => e.id === "sun-n-fun-2027")!.link).toEqual({
      href: "https://www.sun-n-fun.org",
      label: "Event info",
    })
    expect(EVENTS.find((e) => e.id === "airventure-2027")!.link).toEqual({
      href: "https://www.eaa.org/airventure",
      label: "Event info",
    })
    expect(EVENTS.find((e) => e.id === "wurst-fly-in-2026")!.link).toEqual({
      href: "https://www.skywerxaviation.com",
      label: "Event info",
    })
  })

  it("asks for booth help only at SUN 'n FUN and AirVenture", () => {
    const ids = EVENTS.filter((e) => e.boothVolunteer).map((e) => e.id)
    expect(ids).toEqual(["sun-n-fun-2027", "airventure-2027"])
  })

  it("can attach a Register / Watch link without listing a webinar today", () => {
    const webinar: PlaneWxEvent = {
      id: "example-webinar",
      name: "Example webinar",
      startDate: "2026-12-01",
      location: null,
      planewx: [],
      watchLink: { href: "https://example.com/webinar", label: "Register / Watch" },
    }
    expect(EVENTS.some((e) => e.watchLink)).toBe(false)
    expect(eventAttendLinks(webinar)).toEqual([
      { href: "https://example.com/webinar", label: "Register / Watch" },
    ])
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
    expect(getUpcomingEvents(EVENTS, "2026-11-01").map((e) => e.id)[0]).toBe("tbmopa-2026")
    expect(getUpcomingEvents(EVENTS, "2026-11-02").map((e) => e.id)[0]).toBe("eaa-282-2026-11")
    expect(getUpcomingEvents(EVENTS, "2026-11-03").map((e) => e.id)[0]).toBe("vac-gala-2026")
    expect(getUpcomingEvents(EVENTS, "2026-11-08").map((e) => e.id)[0]).toBe("vac-gala-2026")
    expect(getUpcomingEvents(EVENTS, "2026-11-09").map((e) => e.id)[0]).toBe("dtsb-summit-2027")
  })

  it("keeps TBMOPA up through 11:59 PM Chicago time on Nov 1", () => {
    // DST ends 2 AM Nov 1, so midnight Nov 1/Nov 2 is CST: 11:59 PM CST Nov 1 = 05:59Z Nov 2.
    const ids = (iso: string) => getUpcomingEvents(EVENTS, todayIso(new Date(iso))).map((e) => e.id)
    expect(ids("2026-11-02T05:59:00Z")).toContain("tbmopa-2026")
    expect(ids("2026-11-02T06:00:00Z")).not.toContain("tbmopa-2026")
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

  it("keeps the speaking form and adds four links that scroll to it", () => {
    expect(page).toContain("Want PlaneWX at your chapter, fly-in, or event?")
    for (const label of [
      "Invite Mark to speak",
      "Tell us about your fly-in",
      "Host an event with us",
      "Help at our booth",
    ]) {
      expect(page).toContain(label)
    }
    expect(page).toContain('href: SPEAKING_FORM_HREF')
    expect(page).toContain("Want to help at our booth? Let us know.")
    expect(page).toContain("Interested in Mark coming to speak at your conference? Get in touch")
    expect(page).toContain("<SpeakingInquiryForm />")
    expect(page).not.toMatch(/\u2014|\u2013/)
  })

  it("shows add to calendar on cards and hides attend links for private events", () => {
    expect(page).toContain("Add to calendar")
    expect(page).toContain("Google Calendar")
    expect(page).toContain("Download .ics")
    expect(page).toContain("eventAttendLinks(event)")
    expect(page).toContain("Private event, invitation only")
  })
})
