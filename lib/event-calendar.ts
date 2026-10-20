import type { PlaneWxEvent } from "./events"

export type EventCalendarLinks = {
  googleHref: string
  /** data: URI for a client-side .ics download. */
  icsHref: string
  icsFilename: string
}

const EVENTS_PAGE_URL = "https://www.planewx.ai/events"

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  dt.setUTCDate(dt.getUTCDate() + days)
  return dt.toISOString().slice(0, 10)
}

function compactDate(iso: string): string {
  return iso.replace(/-/g, "")
}

function compactTime(hhmm: string): string {
  const [h, m] = hhmm.split(":")
  return `${h.padStart(2, "0")}${m.padStart(2, "0")}00`
}

function formatUtcStamp(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  )
}

/** Wall-clock time in an IANA zone, as a UTC Date. */
export function zonedTimeToUtc(isoDate: string, hhmm: string, timeZone: string): Date {
  const [y, m, d] = isoDate.split("-").map(Number)
  const [hh, mm] = hhmm.split(":").map(Number)
  const utcGuess = new Date(Date.UTC(y, m - 1, d, hh, mm, 0))
  const offset = timeZoneOffsetMs(utcGuess, timeZone)
  const corrected = new Date(utcGuess.getTime() - offset)
  const offset2 = timeZoneOffsetMs(corrected, timeZone)
  return new Date(utcGuess.getTime() - offset2)
}

function timeZoneOffsetMs(instant: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const parts = dtf.formatToParts(instant)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0"
  let hour = Number(get("hour"))
  if (hour === 24) hour = 0
  const asUtc = Date.UTC(
    Number(get("year")),
    Number(get("month")) - 1,
    Number(get("day")),
    hour,
    Number(get("minute")),
    Number(get("second"))
  )
  return asUtc - instant.getTime()
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n")
}

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

function calendarDetails(event: PlaneWxEvent): string {
  const parts = [
    event.dateLabel,
    ...event.planewx,
    ...(event.details ?? []),
    EVENTS_PAGE_URL,
  ].filter((line): line is string => Boolean(line))
  return parts.join("\n")
}

function timedEndDate(startDate: string, startTime: string, endTime: string): string {
  return endTime > startTime ? startDate : addDaysIso(startDate, 1)
}

/**
 * Google Calendar and .ics links built from the event's own dates, times,
 * and location. Private events and undated events return null.
 * Multi-day events with no clock time are all-day spans (end date exclusive).
 */
export function eventCalendarLinks(
  event: PlaneWxEvent,
  now: Date = new Date()
): EventCalendarLinks | null {
  if (event.invitationOnly || !event.startDate) return null

  const hasClock = Boolean(event.startTime || event.endTime || event.timeZone)
  if (hasClock && (!event.startTime || !event.endTime || !event.timeZone)) {
    throw new Error(`${event.id} needs startTime, endTime, and timeZone together`)
  }

  const details = calendarDetails(event)
  const location = event.location ?? ""
  let googleDates: string
  let dtStart: string
  let dtEnd: string
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.name,
    details,
  })
  if (location) params.set("location", location)

  if (event.startTime && event.endTime && event.timeZone) {
    const endDate = timedEndDate(event.startDate, event.startTime, event.endTime)
    googleDates = `${compactDate(event.startDate)}T${compactTime(event.startTime)}/${compactDate(endDate)}T${compactTime(event.endTime)}`
    params.set("ctz", event.timeZone)
    dtStart = `DTSTART:${formatUtcStamp(zonedTimeToUtc(event.startDate, event.startTime, event.timeZone))}`
    dtEnd = `DTEND:${formatUtcStamp(zonedTimeToUtc(endDate, event.endTime, event.timeZone))}`
  } else {
    const lastDay = event.endDate ?? event.startDate
    const exclusiveEnd = addDaysIso(lastDay, 1)
    googleDates = `${compactDate(event.startDate)}/${compactDate(exclusiveEnd)}`
    dtStart = `DTSTART;VALUE=DATE:${compactDate(event.startDate)}`
    dtEnd = `DTEND;VALUE=DATE:${compactDate(exclusiveEnd)}`
  }
  params.set("dates", googleDates)

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PlaneWX//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@planewx.ai`,
    `DTSTAMP:${formatUtcStamp(now)}`,
    dtStart,
    dtEnd,
    foldIcsLine(`SUMMARY:${escapeIcsText(event.name)}`),
    location ? foldIcsLine(`LOCATION:${escapeIcsText(location)}`) : "",
    foldIcsLine(`DESCRIPTION:${escapeIcsText(details)}`),
    `URL:${EVENTS_PAGE_URL}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter((line) => line !== "")
    .join("\r\n")

  return {
    googleHref: `https://calendar.google.com/calendar/render?${params.toString()}`,
    icsHref: `data:text/calendar;charset=utf-8,${encodeURIComponent(`${ics}\r\n`)}`,
    icsFilename: `${event.id}.ics`,
  }
}

export function decodeIcsHref(icsHref: string): string {
  const prefix = "data:text/calendar;charset=utf-8,"
  if (!icsHref.startsWith(prefix)) throw new Error("Not an ics data URI")
  return decodeURIComponent(icsHref.slice(prefix.length))
}
