/**
 * KLAL Weather Outlook — Sun 'n Fun 2026
 *
 * Fetches GFS + ECMWF from Open-Meteo for KLAL (Lakeland Linder Regional)
 * and returns a per-day + per-hour flyability summary for Apr 14–20, 2026.
 *
 * Auto-selects the best model based on lead time:
 *   3–16 days out → ECMWF + GFS weighted blend
 *   1–2 days out  → HRRR + ECMWF blend
 *   Same day      → HRRR (updates hourly)
 *
 * Uses the same Open-Meteo endpoints and ceiling-derivation algorithm
 * as the PlaneWX NWP shadow consensus system.
 *
 * Called directly by the server component (no self-referential HTTP fetch)
 * and also exposed as a public API route for external consumers.
 */

const KLAL_LAT = 27.99
const KLAL_LON = -82.02
const KLAL_ELEV_FT = 142

const EVENT_END = "2026-04-20"
const EVENT_OPEN = "2026-04-14"  // show badge on this date

/**
 * Returns all dates from tomorrow (Eastern) through Apr 20, inclusive.
 * Past dates are dropped automatically each day — no manual update needed.
 */
export function getEventDates(): string[] {
  // Use Eastern time so the day rolls over at midnight ET, not UTC
  const nowEt = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  )
  // Start from tomorrow
  const start = new Date(nowEt)
  start.setDate(start.getDate() + 1)
  start.setHours(0, 0, 0, 0)

  const end = new Date(EVENT_END + "T23:59:59")
  const dates: string[] = []
  const cur = new Date(start)
  while (cur <= end) {
    dates.push(cur.toISOString().slice(0, 10))
    cur.setDate(cur.getDate() + 1)
  }
  return dates
}

const CEILING_LEVELS = [1000, 975, 950, 925, 900, 850, 800, 700] as const
const PRESSURE_TO_ALT_FT: Record<number, number> = {
  1000: 364, 975: 1181, 950: 1773, 925: 2500,
  900: 3243, 850: 4781, 800: 6394, 700: 9882,
}
const CEILING_CC_THRESHOLD = 62

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HourSlot {
  hour: number
  capeJpkg: number
  precipPct: number
  riskLevel: "low" | "moderate" | "high"
}

export interface DayOutlook {
  date: string
  dayLabel: string
  isDepartureDay: boolean
  isEventOpen: boolean      // true on Apr 14 — "Show opens"
  isPreEvent: boolean       // true Apr 6–13 — planning / arrival window
  morningVfrPct: number
  bestWindow: string | null
  convectionRisk: "low" | "moderate" | "high"
  afternoonStormPct: number
  ceilingFtAgl: number | null
  windMaxKt: number
  gustMaxKt: number
  freezingLevelFt: number | null
  modelAgreement: "agree" | "minor_divergence" | "significant_divergence"
  ecmwfCeilingFt: number | null
  gfsCeilingFt: number | null
  riskColor: "green" | "yellow" | "red"
  summary: string
  hours: HourSlot[]
}

export interface KlalOutlookResponse {
  updatedAt: string
  modelLabel: string
  ecmwfWeight: number
  gfsWeight: number
  dataQuality: "good" | "partial" | "unavailable"
  days: DayOutlook[]
}

// ─── Open-Meteo fetch ─────────────────────────────────────────────────────────

function apiBase(model: "gfs" | "ecmwf" | "hrrr"): string {
  const key = process.env.OPEN_METEO_API_KEY
  const paths: Record<string, string> = {
    gfs: "/v1/gfs",
    ecmwf: "/v1/ecmwf",
    hrrr: "/v1/gfs",
  }
  const host = key ? "https://customer-api.open-meteo.com" : "https://api.open-meteo.com"
  const base = key
    ? `${host}${paths[model]}?apikey=${key}`
    : `${host}${paths[model]}`
  if (model === "hrrr") {
    return base + (base.includes("?") ? "&" : "?") + "models=hrrr_conus"
  }
  return base
}

function pressureVars(): string {
  return CEILING_LEVELS.map(l => `cloud_cover_${l}hPa`).join(",")
}

function gfsVars(): string {
  return [
    "cloud_cover", "cloud_cover_low", "precipitation",
    "precipitation_probability", "wind_speed_10m", "wind_gusts_10m",
    "freezing_level_height", "visibility", "cape", "lifted_index",
    pressureVars(),
  ].join(",")
}

function ecmwfVars(): string {
  return [
    "cloud_cover", "cloud_cover_low", "precipitation",
    "wind_speed_10m", "wind_gusts_10m", "freezing_level_height",
    pressureVars(),
  ].join(",")
}

async function fetchModel(
  model: "gfs" | "ecmwf" | "hrrr",
  days: number,
): Promise<{ hourly: Record<string, number[]>; times: string[] } | null> {
  const base = apiBase(model)
  const sep = base.includes("?") ? "&" : "?"
  const vars = model === "ecmwf" ? ecmwfVars() : gfsVars()
  const url =
    `${base}${sep}latitude=${KLAL_LAT}&longitude=${KLAL_LON}` +
    `&hourly=${vars}&forecast_days=${days}&wind_speed_unit=kn&timezone=America%2FNew_York`

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 21600 },
    })
    if (!res.ok) {
      console.error(`[KLAL Outlook] ${model} fetch failed: ${res.status}`)
      return null
    }
    const json = await res.json()
    const hourly = json.hourly as Record<string, number[]>
    const times: string[] = json.hourly?.time ?? []
    return { hourly, times }
  } catch (err) {
    console.error(`[KLAL Outlook] ${model} fetch error:`, err)
    return null
  }
}

// ─── Ceiling derivation ───────────────────────────────────────────────────────

function ceilingAgl(hourly: Record<string, number[]>, idx: number): number | null {
  for (const level of CEILING_LEVELS) {
    const cc = hourly[`cloud_cover_${level}hPa`]?.[idx]
    if (cc !== undefined && cc >= CEILING_CC_THRESHOLD) {
      const altMsl = PRESSURE_TO_ALT_FT[level]
      return Math.max(0, altMsl - KLAL_ELEV_FT)
    }
  }
  return null
}

function fmt12h(hour: number): string {
  const h = hour % 12 || 12
  return `${h}${hour < 12 ? "am" : "pm"}`
}

// ─── Per-day classification ───────────────────────────────────────────────────

function classifyDay(
  gfsData: { hourly: Record<string, number[]>; times: string[] },
  ecmwfData: { hourly: Record<string, number[]>; times: string[] } | null,
  dateStr: string,
  ecmwfWeight: number,
  gfsWeight: number,
): DayOutlook {
  const date = new Date(dateStr + "T12:00:00")
  const dayLabel = date.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  })
  const isDepartureDay = dateStr === "2026-04-20"
  const isEventOpen = dateStr === EVENT_OPEN
  const isPreEvent = dateStr < EVENT_OPEN

  const { hourly: gfsH, times } = gfsData
  const ecmwfH = ecmwfData?.hourly ?? null

  const idxForDate = (t: string[]) =>
    t.reduce<number[]>((acc, s, i) => {
      if (s.startsWith(dateStr)) acc.push(i)
      return acc
    }, [])

  const gfsIdx = idxForDate(times)
  const ecmwfIdx = ecmwfData ? idxForDate(ecmwfData.times) : []

  if (gfsIdx.length === 0) {
    return {
      date: dateStr, dayLabel, isDepartureDay, isEventOpen, isPreEvent,
      morningVfrPct: 0, bestWindow: null,
      convectionRisk: "high", afternoonStormPct: 0,
      ceilingFtAgl: null, windMaxKt: 0, gustMaxKt: 0, freezingLevelFt: null,
      modelAgreement: "agree", ecmwfCeilingFt: null, gfsCeilingFt: null,
      riskColor: "red", summary: "Forecast data not yet available for this date.",
      hours: [],
    }
  }

  const localHour = (i: number) => new Date(times[i]).getHours()

  const morningIdx = gfsIdx.filter(i => localHour(i) >= 7 && localHour(i) < 12)
  const afternoonIdx = gfsIdx.filter(i => localHour(i) >= 13 && localHour(i) <= 19)

  // Morning VFR probability
  let vfrHours = 0
  for (const i of morningIdx) {
    const ceil = ceilingAgl(gfsH, i)
    const vis = (gfsH.visibility?.[i] ?? 9999) / 1609.34
    const lowCC = gfsH.cloud_cover_low?.[i] ?? 0
    if ((ceil === null || ceil > 3000) && vis >= 5 && lowCC < 50) vfrHours++
  }
  const morningVfrPct = morningIdx.length > 0
    ? Math.round((vfrHours / morningIdx.length) * 100)
    : 0

  // Best 3-hour window
  const earlyIdx = gfsIdx.filter(i => localHour(i) >= 6 && localHour(i) < 13)
  let bestWindow: string | null = null
  let bestScore = -1
  for (let j = 0; j <= earlyIdx.length - 3; j++) {
    const w = earlyIdx.slice(j, j + 3)
    let score = 0
    for (const i of w) {
      const ceil = ceilingAgl(gfsH, i)
      const lowCC = gfsH.cloud_cover_low?.[i] ?? 100
      const precip = gfsH.precipitation?.[i] ?? 0
      const cape = gfsH.cape?.[i] ?? 0
      if (ceil === null || ceil > 3000) score += 3
      if (lowCC < 25) score += 2
      if (precip < 0.1) score += 2
      if (cape < 200) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      if (score >= 12) {
        const sh = localHour(w[0])
        const eh = localHour(w[2]) + 1
        bestWindow = `${fmt12h(sh)}–${fmt12h(eh)} EDT`
      }
    }
  }

  // Afternoon convection (GFS only — ECMWF doesn't provide CAPE via Open-Meteo)
  const afCape = afternoonIdx.map(i => gfsH.cape?.[i] ?? 0)
  const afPrecipProb = afternoonIdx.map(i => gfsH.precipitation_probability?.[i] ?? 0)
  const maxCape = afCape.length ? Math.max(...afCape) : 0
  const maxPrecipProb = afPrecipProb.length ? Math.max(...afPrecipProb) : 0
  const afternoonStormPct = Math.round(maxPrecipProb)

  let convectionRisk: "low" | "moderate" | "high"
  if (maxCape > 1500 || maxPrecipProb > 60) convectionRisk = "high"
  else if (maxCape > 500 || maxPrecipProb > 30) convectionRisk = "moderate"
  else convectionRisk = "low"

  // GFS ceiling (morning worst-case)
  const gfsCeilings = morningIdx
    .map(i => ceilingAgl(gfsH, i))
    .filter((c): c is number => c !== null)
  const gfsCeilingFt = gfsCeilings.length ? Math.min(...gfsCeilings) : null

  // ECMWF ceiling
  let ecmwfCeilingFt: number | null = null
  if (ecmwfH && ecmwfIdx.length > 0) {
    const ecmwfMorning = ecmwfIdx.filter(i => {
      const h = new Date(ecmwfData!.times[i]).getHours()
      return h >= 7 && h < 12
    })
    const ecmwfCeilings = ecmwfMorning
      .map(i => ceilingAgl(ecmwfH, i))
      .filter((c): c is number => c !== null)
    ecmwfCeilingFt = ecmwfCeilings.length ? Math.min(...ecmwfCeilings) : null
  }

  // Blended ceiling
  let ceilingFtAgl: number | null = null
  if (gfsCeilingFt !== null && ecmwfCeilingFt !== null) {
    ceilingFtAgl = Math.round(gfsCeilingFt * gfsWeight + ecmwfCeilingFt * ecmwfWeight)
  } else {
    ceilingFtAgl = gfsCeilingFt ?? ecmwfCeilingFt
  }

  // Model agreement
  let modelAgreement: "agree" | "minor_divergence" | "significant_divergence" = "agree"
  if (gfsCeilingFt !== null && ecmwfCeilingFt !== null) {
    const delta = Math.abs(gfsCeilingFt - ecmwfCeilingFt)
    if (delta > 2000) modelAgreement = "significant_divergence"
    else if (delta > 800) modelAgreement = "minor_divergence"
  }

  // Wind / gusts (worst-case full day, blended)
  const gfsWinds = gfsIdx.map(i => gfsH.wind_speed_10m?.[i] ?? 0)
  const gfsGusts = gfsIdx.map(i => gfsH.wind_gusts_10m?.[i] ?? 0)
  let windMaxKt = Math.max(0, ...gfsWinds)
  let gustMaxKt = Math.max(0, ...gfsGusts)

  if (ecmwfH && ecmwfIdx.length > 0) {
    const ecmwfWinds = ecmwfIdx.map(i => ecmwfH.wind_speed_10m?.[i] ?? 0)
    const ecmwfGusts = ecmwfIdx.map(i => ecmwfH.wind_gusts_10m?.[i] ?? 0)
    windMaxKt = Math.round(windMaxKt * gfsWeight + Math.max(0, ...ecmwfWinds) * ecmwfWeight)
    gustMaxKt = Math.round(gustMaxKt * gfsWeight + Math.max(0, ...ecmwfGusts) * ecmwfWeight)
  } else {
    windMaxKt = Math.round(windMaxKt)
    gustMaxKt = Math.round(gustMaxKt)
  }

  // Freezing level (morning average, GFS)
  const gfsFreezes = morningIdx
    .map(i => gfsH.freezing_level_height?.[i])
    .filter((v): v is number => v !== null && v !== undefined)
  const freezingLevelFt = gfsFreezes.length
    ? Math.round((gfsFreezes.reduce((a, b) => a + b, 0) / gfsFreezes.length) * 3.281)
    : null

  // Risk color
  let riskColor: "green" | "yellow" | "red"
  if (morningVfrPct >= 70 && convectionRisk === "low") riskColor = "green"
  else if (convectionRisk === "high" && morningVfrPct < 40) riskColor = "red"
  else riskColor = "yellow"

  // Summary sentence
  let summary: string
  if (isPreEvent) {
    if (riskColor === "green") {
      summary = bestWindow
        ? `Potential arrival window ${bestWindow}. If you&apos;re flying in early, conditions look favorable in the morning.`
        : "Conditions look favorable for early arrivals. Morning departures are your best bet."
    } else if (convectionRisk === "high") {
      summary = "Challenging conditions if you're planning an early arrival. Keep an eye on this as the event gets closer."
    } else {
      summary = "Reasonable morning window for early arrivals. Check back as we get closer — model confidence improves within 48 hours."
    }
  } else if (isDepartureDay) {
    if (convectionRisk === "high") {
      summary = "Departure day with high convection risk. Get your briefing the night before and plan an early morning exit — everyone will be trying to leave at once."
    } else if (convectionRisk === "moderate") {
      summary = "Departure day looks manageable in the morning. File early, brief the night before, and watch for afternoon build-up as the field empties."
    } else {
      summary = "Departure day looks clean. Still, brief the night before — departure-day traffic density at KLAL is its own weather problem."
    }
  } else if (riskColor === "green") {
    summary = bestWindow
      ? `Good morning window ${bestWindow}. Fly before noon to stay ahead of afternoon heating.`
      : "Morning conditions look favorable. Depart early — central Florida convection can fire rapidly after midday."
  } else if (riskColor === "yellow") {
    summary = convectionRisk === "moderate"
      ? "Plan your arrival before 1 PM EDT. Afternoon thunderstorm development is possible — normal for central Florida in April."
      : "Mixed conditions. Check your full PlaneWX briefing for ceiling and visibility details specific to your route."
  } else {
    summary = `${afternoonStormPct > 60 ? "High" : "Elevated"} storm probability in the afternoon. Consider an early morning arrival or a weather hold. Brief your specific route — conditions vary significantly by direction.`
  }

  // Hourly heatmap (6 AM–8 PM)
  const hours: HourSlot[] = []
  for (let h = 6; h <= 20; h++) {
    const i = gfsIdx.find(idx => localHour(idx) === h)
    if (i === undefined) continue
    const cape = gfsH.cape?.[i] ?? 0
    const precipPct = gfsH.precipitation_probability?.[i] ?? 0
    let riskLevel: "low" | "moderate" | "high"
    if (cape > 1000 || precipPct > 50) riskLevel = "high"
    else if (cape > 300 || precipPct > 20) riskLevel = "moderate"
    else riskLevel = "low"
    hours.push({ hour: h, capeJpkg: Math.round(cape), precipPct: Math.round(precipPct), riskLevel })
  }

  return {
    date: dateStr, dayLabel, isDepartureDay, isEventOpen, isPreEvent,
    morningVfrPct, bestWindow, convectionRisk, afternoonStormPct,
    ceilingFtAgl, windMaxKt, gustMaxKt, freezingLevelFt,
    modelAgreement, ecmwfCeilingFt, gfsCeilingFt,
    riskColor, summary, hours,
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function fetchKlalOutlook(): Promise<KlalOutlookResponse> {
  const now = new Date()

  // Days until the last event date (Apr 20) — determines forecast range needed
  const eventEnd = new Date("2026-04-20T23:59:59-04:00")
  const daysToEnd = Math.max(1, (eventEnd.getTime() - now.getTime()) / 86400000)

  const eventDates = getEventDates()

  // Model selection: key off the FURTHEST date we need to cover.
  // HRRR only reaches ~48h, so only use it when all remaining dates fit in that window.
  // Otherwise always use GFS+ECMWF which covers the full event range.
  let modelLabel: string
  let ecmwfWeight: number
  let gfsWeight: number
  let useHrrr = false

  if (daysToEnd <= 1) {
    // Only same-day / next-day left — HRRR is best
    modelLabel = "HRRR · day-of precision · updates hourly"
    ecmwfWeight = 0; gfsWeight = 1; useHrrr = true
  } else if (daysToEnd <= 2) {
    // All remaining dates within 48h — HRRR + ECMWF blend
    modelLabel = "HRRR + ECMWF blend · short-range forecast"
    ecmwfWeight = 0.35; gfsWeight = 0.65; useHrrr = true
  } else {
    // Extended range — ECMWF + GFS blend (covers full event window)
    modelLabel = "ECMWF + GFS blend · extended planning outlook"
    ecmwfWeight = 0.58; gfsWeight = 0.42; useHrrr = false
  }

  // Need enough days to cover through Apr 20 (capped at model limits)
  const forecastDays = Math.min(16, Math.ceil(daysToEnd) + 1)
  const primaryModel = useHrrr ? "hrrr" : "gfs"

  const [primaryData, ecmwfData] = await Promise.all([
    fetchModel(primaryModel, forecastDays),
    ecmwfWeight > 0 ? fetchModel("ecmwf", Math.min(15, forecastDays)) : Promise.resolve(null),
  ])

  if (!primaryData) {
    return {
      updatedAt: now.toISOString(),
      modelLabel,
      ecmwfWeight,
      gfsWeight,
      dataQuality: "unavailable",
      days: [],
    }
  }

  const days = eventDates.map(d =>
    classifyDay(primaryData, ecmwfData, d, ecmwfWeight, gfsWeight)
  )

  return {
    updatedAt: now.toISOString(),
    modelLabel,
    ecmwfWeight,
    gfsWeight,
    dataQuality: days.some(d => d.morningVfrPct > 0 || d.hours.length > 0) ? "good" : "partial",
    days,
  }
}
