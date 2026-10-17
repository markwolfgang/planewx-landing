// Public /events page data. One entry per event; edit a line here to update the page.
// Rules (Mark, Oct 16 2026): dates and venues only from official sources or
// confirmed PlaneWX correspondence. Unknown dates stay null and render as
// "Date coming soon". Do not add a PlaneWX role (booth, talk) unless confirmed.
// Sources for every field are listed in the PR that added this page.

export type PlaneWxEvent = {
  id: string
  name: string
  /** First public day, YYYY-MM-DD. null = date not confirmed yet. */
  startDate: string | null
  /** Last public day, YYYY-MM-DD. Defaults to startDate. */
  endDate?: string | null
  /** Display text for the date. Ignored when startDate is null. */
  dateLabel?: string
  location: string | null
  /** Confirmed PlaneWX role lines, shown as-is. Empty = event listing only. */
  planewx: string[]
  /** Extra plain-text details (exhibit hours, talk slot). */
  details?: string[]
  link: { href: string; label: string }
}

export const DATE_COMING_SOON = "Date coming soon"

/** Meta/OG description for /events. Must not imply PlaneWX is at every event. */
export const EVENTS_PAGE_DESCRIPTION =
  "Upcoming aviation events, and where to find PlaneWX at a booth or a talk."

export const EVENTS: PlaneWxEvent[] = [
  {
    id: "wurst-fly-in-2026",
    name: "Wurst Fly-In Ever",
    startDate: "2026-10-17",
    dateLabel: "Sat, Oct 17, 2026, 11:00 AM-2:00 PM CT",
    location: "Blair Executive Airport (KBTA), Hangar J, 2785 NE-133, Blair, NE 68008",
    planewx: [
      "Come meet the Founder of PlaneWX and discuss all things weather, risk management, airplanes.",
    ],
    details: [
      "A day of aviation, community, and good food.",
      "Free will donations. Proceeds support UNO's Women in Aviation.",
      "Hot dogs, football, and good times.",
      "Hosted by Omaha Aircraft and SkyWerx Aviation.",
    ],
    link: { href: "https://www.skywerxaviation.com", label: "SkyWerx Aviation" },
  },
  {
    id: "tbmopa-2026",
    name: "TBMOPA Convention",
    startDate: "2026-10-28",
    endDate: "2026-11-01",
    dateLabel: "Oct 28-Nov 1, 2026",
    location: "Sheraton Phoenix Downtown, Phoenix, AZ",
    planewx: [
      "Visit the PlaneWX booth in the exhibit hall, Oct 29-31.",
      "Speaking: Mark Wolfgang, PlaneWX founder. \"Beyond the Weather Briefing: Using a Decision Support System for Safer Flights\", Fri Oct 30, 12:30-1:00 PM MST (Arizona time), during Lunch with Vendors.",
    ],
    link: { href: "https://tbmowners.org", label: "TBMOPA" },
  },
  {
    id: "eaa-282-2026-11",
    name: "EAA Chapter 282 meeting",
    startDate: "2026-11-02",
    dateLabel: "Mon, Nov 2, 2026",
    location: "EAA 282 Hangar, north side of Clearwater Air Park (KCLW), Clearwater, FL",
    planewx: [
      "Speaking: Mark Wolfgang, PlaneWX founder. Topic: how he makes go/no-go decisions (a 15-20 minute talk).",
    ],
    link: { href: "https://eaachapter282.org", label: "EAA Chapter 282" },
  },
  {
    id: "dtsb-summit-2027",
    name: "DTSB 2027 General Aviation Safety Summit",
    startDate: "2027-01-08",
    endDate: "2027-01-10",
    dateLabel: "Jan 8-10, 2027",
    location: "Wyndham Grand Orlando Resort Bonnet Creek, Orlando, FL",
    planewx: ["Speaking: Mark Wolfgang, PlaneWX founder"],
    link: {
      href: "https://www.zeffy.com/en-US/ticketing/dtsb-2027-general-aviation-safety-summit",
      label: "Tickets",
    },
  },
  {
    id: "sun-n-fun-2027",
    name: "SUN 'n FUN Aerospace Expo 2027",
    startDate: "2027-04-06",
    endDate: "2027-04-11",
    dateLabel: "Apr 6-11, 2027",
    location: "Lakeland Linder International Airport, Lakeland, FL",
    planewx: [],
    link: { href: "https://www.sun-n-fun.org", label: "sun-n-fun.org" },
  },
  {
    id: "airventure-2027",
    name: "EAA AirVenture Oshkosh 2027",
    startDate: "2027-07-26",
    endDate: "2027-08-01",
    dateLabel: "Jul 26-Aug 1, 2027",
    location: "Oshkosh, WI",
    planewx: [],
    link: { href: "https://www.eaa.org/airventure", label: "eaa.org/airventure" },
  },
]

/** YYYY-MM-DD for "today" in America/Chicago (site owner's zone). */
export function todayIso(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)
}

/**
 * Upcoming events in display order: dated events by start date, then
 * undated events (in array order). Events whose last day is before today
 * are hidden.
 */
export function getUpcomingEvents(
  events: PlaneWxEvent[] = EVENTS,
  today: string = todayIso()
): PlaneWxEvent[] {
  const dated = events
    .filter((e) => e.startDate !== null)
    .filter((e) => (e.endDate ?? e.startDate)! >= today)
    .sort((a, b) => a.startDate!.localeCompare(b.startDate!))
  const undated = events.filter((e) => e.startDate === null)
  return [...dated, ...undated]
}

export function eventDateText(event: PlaneWxEvent): string {
  if (!event.startDate) return DATE_COMING_SOON
  return event.dateLabel ?? event.startDate
}
