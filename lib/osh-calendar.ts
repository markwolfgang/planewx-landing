/** Calendar helpers for Oshkosh Wed Jul 22, 2026 (America/Chicago = CDT = UTC-5) */

export type OshCalendarEventId = "meetup" | "talk"

export type OshCalendarEvent = {
  id: OshCalendarEventId
  title: string
  location: string
  details: string
  /** UTC start/end as YYYYMMDDTHHMMSSZ */
  startUtc: string
  endUtc: string
}

export const OSH_EVENTS: Record<OshCalendarEventId, OshCalendarEvent> = {
  meetup: {
    id: "meetup",
    title: "PlaneWX Meetup @ Flyte — Oshkosh",
    location: "Flyte Booth 337, EAA AirVenture Oshkosh",
    details:
      "Meet Mark and Sara at the Flyte booth. Drinks by Flyte, giveaways (must be present to win). Details: https://www.planewx.ai/osh",
    // Wed Jul 22, 2026 11:00–12:00 CDT
    startUtc: "20260722T160000Z",
    endUtc: "20260722T170000Z",
  },
  talk: {
    id: "talk",
    title: "Advanced Aviation Risk Management — Mark Wolfgang",
    location: "Forum Stage 10, EAA AirVenture Oshkosh",
    details:
      "PlaneWX forum talk on personal minimums, multi-model weather, and WX Score inside a PAVE risk assessment. Giveaway drawing at the talk (must be present to win). EAA: https://events.rdmobile.com/Sessions/Details/3567392 · Details: https://www.planewx.ai/osh",
    // Wed Jul 22, 2026 16:00–17:15 CDT
    startUtc: "20260722T210000Z",
    endUtc: "20260722T221500Z",
  },
}

export function googleCalendarUrl(event: OshCalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${event.startUtc}/${event.endUtc}`,
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

export function buildIcs(event: OshCalendarEvent): string {
  const uid = `${event.id}@planewx.ai`
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PlaneWX//Oshkosh 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:20260720T000000Z`,
    `DTSTART:${event.startUtc}`,
    `DTEND:${event.endUtc}`,
    foldIcsLine(`SUMMARY:${escapeIcsText(event.title)}`),
    foldIcsLine(`LOCATION:${escapeIcsText(event.location)}`),
    foldIcsLine(`DESCRIPTION:${escapeIcsText(event.details)}`),
    "URL:https://www.planewx.ai/osh",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
  return `${lines.join("\r\n")}\r\n`
}
