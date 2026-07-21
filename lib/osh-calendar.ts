/** Calendar helpers for Oshkosh Wed Jul 22, 2026 (America/Chicago — Central Time) */

export type OshCalendarEventId = "meetup" | "talk"

export type OshCalendarEvent = {
  id: OshCalendarEventId
  title: string
  location: string
  details: string
  /** Local Central Time as YYYYMMDDTHHMMSS (no Z) */
  startLocal: string
  endLocal: string
}

export const OSH_TZ = "America/Chicago"

export const OSH_EVENTS: Record<OshCalendarEventId, OshCalendarEvent> = {
  meetup: {
    id: "meetup",
    title: "PlaneWX Meetup @ Flyte — Oshkosh",
    location: "Flyte Booth 337, EAA AirVenture Oshkosh",
    details:
      "Meet Mark and Sara at the Flyte booth. Drinks by Flyte, giveaways (must be present to win). Details: https://www.planewx.ai/osh",
    // Wed Jul 22, 2026 11:00–12:00 CDT
    startLocal: "20260722T110000",
    endLocal: "20260722T120000",
  },
  talk: {
    id: "talk",
    title: "Advanced Aviation Risk Management — Mark Wolfgang",
    location: "Forum Stage 10, EAA AirVenture Oshkosh",
    details:
      "PlaneWX forum talk on personal minimums, multi-model weather, and WX Score inside a PAVE risk assessment. Giveaway drawing at the talk (must be present to win). EAA: https://events.rdmobile.com/Sessions/Details/3567392 · Details: https://www.planewx.ai/osh",
    // Wed Jul 22, 2026 16:00–17:15 CDT
    startLocal: "20260722T160000",
    endLocal: "20260722T171500",
  },
}

export function googleCalendarUrl(event: OshCalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${event.startLocal}/${event.endLocal}`,
    ctz: OSH_TZ,
    details: event.details,
    location: event.location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function icsHref(event: OshCalendarEvent): string {
  return `/osh/${event.id}.ics`
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n")
}

/** Fold long ICS lines at 75 octets (approx via chars). */
function foldIcsLine(line: string): string {
  if (line.length <= 75) return line
  const parts: string[] = []
  let rest = line
  parts.push(rest.slice(0, 75))
  rest = rest.slice(75)
  while (rest.length > 0) {
    parts.push(` ${rest.slice(0, 74)}`)
    rest = rest.slice(74)
  }
  return parts.join("\r\n")
}

/** Minimal America/Chicago VTIMEZONE (CST/CDT) for calendar clients. */
const CHICAGO_VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:America/Chicago",
  "X-LIC-LOCATION:America/Chicago",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0600",
  "TZOFFSETTO:-0500",
  "TZNAME:CDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0600",
  "TZNAME:CST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
]

export function buildIcs(event: OshCalendarEvent): string {
  const uid = `${event.id}@planewx.ai`
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PlaneWX//Oshkosh 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...CHICAGO_VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:20260720T000000Z`,
    `DTSTART;TZID=${OSH_TZ}:${event.startLocal}`,
    `DTEND;TZID=${OSH_TZ}:${event.endLocal}`,
    foldIcsLine(`SUMMARY:${escapeIcsText(event.title)}`),
    foldIcsLine(`LOCATION:${escapeIcsText(event.location)}`),
    foldIcsLine(`DESCRIPTION:${escapeIcsText(event.details)}`),
    "URL:https://www.planewx.ai/osh",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
  return `${lines.join("\r\n")}\r\n`
}
