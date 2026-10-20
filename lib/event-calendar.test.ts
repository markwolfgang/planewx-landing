import { describe, expect, it } from "vitest"
import { decodeIcsHref, eventCalendarLinks, zonedTimeToUtc } from "./event-calendar"
import { EVENTS, type PlaneWxEvent } from "./events"

const NOW = new Date("2026-10-20T17:00:00Z")

function linksFor(id: string) {
  const event = EVENTS.find((e) => e.id === id)
  expect(event).toBeTruthy()
  const links = eventCalendarLinks(event!, NOW)
  expect(links).not.toBeNull()
  return links!
}

function googleDates(id: string): string {
  return new URL(linksFor(id).googleHref).searchParams.get("dates") ?? ""
}

function icsText(id: string): string {
  return decodeIcsHref(linksFor(id).icsHref).replace(/\r\n[ \t]/g, "")
}

describe("event calendar links", () => {
  it("builds all-day spans for multi-day public events, with an exclusive end", () => {
    expect(googleDates("tbmopa-2026")).toBe("20261028/20261102")
    expect(googleDates("dtsb-summit-2027")).toBe("20270108/20270111")
    expect(googleDates("sun-n-fun-2027")).toBe("20270406/20270412")
    expect(googleDates("airventure-2027")).toBe("20270726/20270802")
    for (const id of ["tbmopa-2026", "dtsb-summit-2027", "sun-n-fun-2027", "airventure-2027"]) {
      expect(new URL(linksFor(id).googleHref).searchParams.get("ctz")).toBeNull()
      const ics = icsText(id)
      expect(ics).toContain("DTSTART;VALUE=DATE:")
      expect(ics).not.toContain("DTSTART:")
    }
  })

  it("puts EAA 282 on the calendar from 6:00 PM to 7:00 PM Eastern", () => {
    expect(zonedTimeToUtc("2026-11-02", "18:00", "America/New_York").toISOString()).toBe(
      "2026-11-02T23:00:00.000Z"
    )
    expect(zonedTimeToUtc("2026-11-02", "19:00", "America/New_York").toISOString()).toBe(
      "2026-11-03T00:00:00.000Z"
    )
    const url = new URL(linksFor("eaa-282-2026-11").googleHref)
    expect(url.searchParams.get("dates")).toBe("20261102T180000/20261102T190000")
    expect(url.searchParams.get("ctz")).toBe("America/New_York")
    expect(url.searchParams.get("location")).toContain("KCLW")
    const ics = icsText("eaa-282-2026-11")
    expect(ics).toContain("DTSTART:20261102T230000Z")
    expect(ics).toContain("DTEND:20261103T000000Z")
    expect(ics).toContain("Gather at 6:00 PM\\, meeting starts 7:00 PM Eastern.")
  })

  it("uses Central Time for the Wurst Fly-In hours already on the card", () => {
    expect(zonedTimeToUtc("2026-10-17", "11:00", "America/Chicago").toISOString()).toBe(
      "2026-10-17T16:00:00.000Z"
    )
    const url = new URL(linksFor("wurst-fly-in-2026").googleHref)
    expect(url.searchParams.get("dates")).toBe("20261017T110000/20261017T140000")
    expect(url.searchParams.get("ctz")).toBe("America/Chicago")
    const ics = icsText("wurst-fly-in-2026")
    expect(ics).toContain("DTSTART:20261017T160000Z")
    expect(ics).toContain("DTEND:20261017T190000Z")
  })

  it("does not offer a calendar link for the private VAC Gala", () => {
    const vac = EVENTS.find((e) => e.id === "vac-gala-2026")!
    expect(eventCalendarLinks(vac, NOW)).toBeNull()
  })

  it("offers a calendar link for every other dated public event", () => {
    for (const event of EVENTS) {
      if (event.invitationOnly) continue
      expect(eventCalendarLinks(event, NOW)?.googleHref).toMatch(
        /^https:\/\/calendar\.google\.com\/calendar\/render\?/
      )
    }
  })

  it("supports a future webinar with a Register / Watch link and a timed calendar entry", () => {
    const webinar: PlaneWxEvent = {
      id: "example-webinar",
      name: "Example webinar",
      startDate: "2026-12-01",
      dateLabel: "Tue, Dec 1, 2026, 7:00 PM Eastern",
      location: "Online",
      planewx: [],
      watchLink: { href: "https://example.com/webinar", label: "Register / Watch" },
      startTime: "19:00",
      endTime: "20:00",
      timeZone: "America/New_York",
    }
    const links = eventCalendarLinks(webinar, NOW)!
    const url = new URL(links.googleHref)
    expect(url.searchParams.get("dates")).toBe("20261201T190000/20261201T200000")
    expect(url.searchParams.get("ctz")).toBe("America/New_York")
    expect(webinar.watchLink?.label).toBe("Register / Watch")
    const ics = decodeIcsHref(links.icsHref).replace(/\r\n[ \t]/g, "")
    expect(ics).toContain("DTSTART:20261202T000000Z")
    expect(ics).toContain("DTEND:20261202T010000Z")
  })

  it("escapes commas in the .ics location", () => {
    const ics = icsText("eaa-282-2026-11")
    expect(ics).toContain("Clearwater\\, FL")
  })

  it("does not put a booth on the AirVenture calendar entry", () => {
    const ics = icsText("airventure-2027")
    expect(ics.toLowerCase()).not.toContain("booth")
    const details = new URL(linksFor("airventure-2027").googleHref).searchParams.get("details") ?? ""
    expect(details.toLowerCase()).not.toContain("booth")
  })
})
