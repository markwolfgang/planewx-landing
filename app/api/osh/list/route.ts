import { NextResponse } from "next/server"
import {
  assertAdminSecret,
  attendanceEligibleForEvent,
  getOshSupabase,
  type RaffleDrawEvent,
} from "@/lib/osh-admin"

const PAGE_SIZE = 500

const OSH_AREA_AIRPORTS = [
  "KOSH","KATW","KUES","KMSN","KGRB","KMKE","KSBM","KRYV","KLNR","KFLD",
]
const OSH_ARRIVAL_START = "2026-07-14"
const OSH_ARRIVAL_END   = "2026-07-28"

const PROFILE_COLS = [
  "user_id","created_at","home_airport",
  "pilot_certificate","instrument_rating","multi_engine_rating","cfi",
  "total_hours","last_30_days",
  "subscription_tier","is_trial","beta_alumni_status","badges",
].join(",")

export type PilotProfile = {
  member_since: string
  home_airport: string | null
  pilot_certificate: string | null
  instrument_rating: boolean
  multi_engine_rating: boolean
  cfi: boolean
  total_hours: number
  last_30_days: number
  subscription_tier: string | null
  is_trial: boolean
  beta_alumni_status: string | null
  badges: string[]
  total_trips: number
}

export type OshCohortStats = {
  pilot_count: number
  trip_count: number
  profiles_with_data: number
  top_origins: Array<{ airport: string; count: number }>
  longest_trips: Array<{ route: string; nm: number; aircraft: string | null; date: string }>
  certificate_breakdown: Record<string, number>
  ifr_count: number
  me_count: number
  cfi_count: number
  tier_breakdown: Record<string, number>
  hours: { avg: number; median: number; max: number; sample_size: number }
  member_days: { avg: number; longest: number; sample_size: number }
  top_aircraft_types: Array<{ type: string; count: number }>
  nogo_count: number
  avg_score: number | null
}

type OshInboundTrip = {
  user_id: string
  origin: string | null
  destination: string
  date: string
  distance_nm: number | null
  aircraft_type: string | null
  go_score: number | null
  status: string | null
}

/** Fetches all inbound trips to the OSH area with full columns for cohort analysis. */
async function fetchOshInboundData(
  supabase: NonNullable<ReturnType<typeof getOshSupabase>>,
): Promise<{ userIds: Set<string>; trips: OshInboundTrip[] }> {
  const all: OshInboundTrip[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("trips")
      .select("user_id,origin,destination,date,distance_nm,aircraft_type,go_score,status")
      .or(OSH_AREA_AIRPORTS.map((a) => `destination.eq.${a}`).join(","))
      .gte("date", OSH_ARRIVAL_START)
      .lte("date", OSH_ARRIVAL_END)
      .range(from, from + 999)
    if (error || !data || data.length === 0) break
    all.push(...(data as OshInboundTrip[]))
    from += data.length
    if (data.length < 1000) break
  }
  const userIds = new Set(all.map((t) => t.user_id).filter(Boolean))
  return { userIds, trips: all }
}

/** Looks up a Supabase auth user_id by email via the admin API. */
async function lookupUserIdByEmail(
  email: string,
  supabaseUrl: string,
  serviceKey: string,
): Promise<string | null> {
  try {
    const r = await fetch(
      `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(email)}&page=1&per_page=5`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    )
    if (!r.ok) return null
    const body = await r.json()
    const match = (body.users as Array<{ id: string; email: string }> | undefined)
      ?.find((u) => u.email?.toLowerCase() === email.toLowerCase())
    return match?.id ?? null
  } catch {
    return null
  }
}

/**
 * Fetches profile + lifetime trip count for a set of user_ids (raffle entry enrichment).
 * Returns a map of user_id → PilotProfile.
 */
async function fetchPilotProfiles(
  supabase: NonNullable<ReturnType<typeof getOshSupabase>>,
  userIds: string[],
): Promise<Map<string, PilotProfile>> {
  if (userIds.length === 0) return new Map()

  const orFilter = userIds.map((id) => `user_id.eq.${id}`).join(",")

  const { data: profiles } = await supabase
    .from("profiles")
    .select(PROFILE_COLS)
    .or(orFilter)

  const tripCounts = new Map<string, number>()
  let from = 0
  while (true) {
    const { data: trips } = await supabase
      .from("trips")
      .select("user_id")
      .or(orFilter)
      .range(from, from + 999)
    if (!trips || trips.length === 0) break
    for (const t of trips) {
      const uid = t.user_id as string
      tripCounts.set(uid, (tripCounts.get(uid) ?? 0) + 1)
    }
    from += trips.length
    if (trips.length < 1000) break
  }

  const result = new Map<string, PilotProfile>()
  for (const p of profiles ?? []) {
    const uid = p.user_id as string
    result.set(uid, {
      member_since: (p.created_at as string)?.slice(0, 10) ?? "",
      home_airport: (p.home_airport as string) ?? null,
      pilot_certificate: (p.pilot_certificate as string) ?? null,
      instrument_rating: !!(p.instrument_rating),
      multi_engine_rating: !!(p.multi_engine_rating),
      cfi: !!(p.cfi),
      total_hours: (p.total_hours as number) ?? 0,
      last_30_days: (p.last_30_days as number) ?? 0,
      subscription_tier: (p.subscription_tier as string) ?? null,
      is_trial: !!(p.is_trial),
      beta_alumni_status: (p.beta_alumni_status as string) ?? null,
      badges: (p.badges as string[]) ?? [],
      total_trips: tripCounts.get(uid) ?? 0,
    })
  }
  return result
}

/**
 * Batch-fetches profiles for all OSH cohort pilots (for aggregate stats).
 * Chunks to avoid URL length limits.
 */
async function fetchCohortProfiles(
  supabase: NonNullable<ReturnType<typeof getOshSupabase>>,
  userIds: string[],
): Promise<Array<Record<string, unknown>>> {
  const CHUNK = 40
  const all: Array<Record<string, unknown>> = []
  for (let i = 0; i < userIds.length; i += CHUNK) {
    const chunk = userIds.slice(i, i + CHUNK)
    const { data } = await supabase
      .from("profiles")
      .select(PROFILE_COLS)
      .or(chunk.map((id) => `user_id.eq.${id}`).join(","))
    if (data) all.push(...(data as Array<Record<string, unknown>>))
  }
  return all
}

function computeOshCohortStats(
  trips: OshInboundTrip[],
  profiles: Array<Record<string, unknown>>,
): OshCohortStats {
  const userIds = new Set(trips.map((t) => t.user_id).filter(Boolean))

  const originsMap: Record<string, number> = {}
  for (const t of trips) if (t.origin) originsMap[t.origin] = (originsMap[t.origin] || 0) + 1
  const top_origins = Object.entries(originsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([airport, count]) => ({ airport, count }))

  const longest_trips = trips
    .filter((t) => (t.distance_nm ?? 0) > 0)
    .sort((a, b) => (b.distance_nm ?? 0) - (a.distance_nm ?? 0))
    .slice(0, 5)
    .map((t) => ({
      route: `${t.origin ?? "?"}→${t.destination}`,
      nm: t.distance_nm ?? 0,
      aircraft: t.aircraft_type ?? null,
      date: t.date,
    }))

  const acMap: Record<string, number> = {}
  for (const t of trips) if (t.aircraft_type) acMap[t.aircraft_type] = (acMap[t.aircraft_type] || 0) + 1
  const top_aircraft_types = Object.entries(acMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([type, count]) => ({ type, count }))

  const scoredTrips = trips.filter((t) => t.go_score != null)
  const avg_score =
    scoredTrips.length > 0
      ? Math.round(scoredTrips.reduce((a, t) => a + (t.go_score ?? 0), 0) / scoredTrips.length)
      : null
  const nogo_count = trips.filter((t) => t.status === "no-go").length

  const certs: Record<string, number> = {}
  let ifr_count = 0, me_count = 0, cfi_count = 0
  const tiers: Record<string, number> = {}
  const hoursArr: number[] = []
  const daysArr: number[] = []
  const now = Date.now()

  for (const p of profiles) {
    const cert = (p.pilot_certificate as string) || "unknown"
    certs[cert] = (certs[cert] || 0) + 1
    if (p.instrument_rating) ifr_count++
    if (p.multi_engine_rating) me_count++
    if (p.cfi) cfi_count++
    const tier = p.is_trial ? "trial" : ((p.subscription_tier as string) || "unknown")
    tiers[tier] = (tiers[tier] || 0) + 1
    const h = p.total_hours as number
    if (h > 0) hoursArr.push(h)
    if (p.created_at) {
      const days = Math.floor((now - new Date(p.created_at as string).getTime()) / 86400000)
      if (days > 0) daysArr.push(days)
    }
  }

  hoursArr.sort((a, b) => a - b)
  daysArr.sort((a, b) => a - b)

  return {
    pilot_count: userIds.size,
    trip_count: trips.length,
    profiles_with_data: profiles.length,
    top_origins,
    longest_trips,
    certificate_breakdown: certs,
    ifr_count,
    me_count,
    cfi_count,
    tier_breakdown: tiers,
    hours:
      hoursArr.length > 0
        ? {
            avg: Math.round(hoursArr.reduce((a, b) => a + b, 0) / hoursArr.length),
            median: hoursArr[Math.floor(hoursArr.length / 2)],
            max: hoursArr[hoursArr.length - 1],
            sample_size: hoursArr.length,
          }
        : { avg: 0, median: 0, max: 0, sample_size: 0 },
    member_days:
      daysArr.length > 0
        ? {
            avg: Math.round(daysArr.reduce((a, b) => a + b, 0) / daysArr.length),
            longest: daysArr[daysArr.length - 1],
            sample_size: daysArr.length,
          }
        : { avg: 0, longest: 0, sample_size: 0 },
    top_aircraft_types,
    nogo_count,
    avg_score,
  }
}

async function fetchAllEntries(supabase: NonNullable<ReturnType<typeof getOshSupabase>>) {
  const all: Array<Record<string, unknown>> = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("oshkosh_raffle_entries")
      .select("id, email, first_name, marketing_opt_in, source, event_attendance, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1)

    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += data.length
  }
  return all
}

async function fetchAllDraws(supabase: NonNullable<ReturnType<typeof getOshSupabase>>) {
  const all: Array<Record<string, unknown>> = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("oshkosh_raffle_draws")
      .select("id, entry_id, prize, event, status, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1)

    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += data.length
  }
  return all
}

function eligibleForEvent(
  entries: Array<Record<string, unknown>>,
  draws: Array<Record<string, unknown>>,
  event: RaffleDrawEvent,
): number {
  const wonAtEvent = new Set(
    draws
      .filter((d) => d.status === "won" && ((d.event as string) || "meetup") === event)
      .map((d) => d.entry_id as string),
  )
  return entries.filter(
    (e) =>
      !wonAtEvent.has(e.id as string) &&
      attendanceEligibleForEvent(e.event_attendance as string, event),
  ).length
}

export async function GET(request: Request) {
  try {
    const supabase = getOshSupabase()
    if (!supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    if (!assertAdminSecret(searchParams.get("secret"))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""

    const [entries, draws, { userIds: oshUserIds, trips: oshTrips }] = await Promise.all([
      fetchAllEntries(supabase),
      fetchAllDraws(supabase),
      fetchOshInboundData(supabase),
    ])

    // Resolve each raffle entry email → user_id (parallel, list is small)
    const emailToUserId = new Map<string, string | null>()
    await Promise.all(
      entries.map(async (e) => {
        const uid = await lookupUserIdByEmail(e.email as string, supabaseUrl, serviceKey)
        emailToUserId.set(e.email as string, uid)
      }),
    )

    // Batch-fetch profiles for all resolved raffle entry user_ids
    const resolvedIds = [...emailToUserId.values()].filter((id): id is string => id !== null)
    const pilotProfiles = await fetchPilotProfiles(supabase, resolvedIds)

    const enrichedEntries = entries.map((e) => {
      const userId = emailToUserId.get(e.email as string) ?? null
      const pilot  = userId ? (pilotProfiles.get(userId) ?? null) : null
      return {
        ...e,
        flew_to_osh: userId !== null ? oshUserIds.has(userId) : null,
        pilot,
      }
    })

    const raffleOshPilotCount = enrichedEntries.filter((e) => e.flew_to_osh === true).length

    // Cohort stats across all OSH-area pilots (not just raffle entrants)
    const cohortProfiles = await fetchCohortProfiles(supabase, [...oshUserIds])
    const oshCohortStats = computeOshCohortStats(oshTrips, cohortProfiles)

    return NextResponse.json({
      entries: enrichedEntries,
      draws,
      count: enrichedEntries.length,
      eligibleMeetup: eligibleForEvent(entries, draws, "meetup"),
      eligibleTalk: eligibleForEvent(entries, draws, "talk"),
      marketingOptInCount: entries.filter((e) => e.marketing_opt_in).length,
      attendanceCounts: {
        meetup: entries.filter((e) => e.event_attendance === "meetup").length,
        talk: entries.filter((e) => e.event_attendance === "talk").length,
        both: entries.filter((e) => e.event_attendance === "both" || !e.event_attendance).length,
      },
      oshPilotCount: oshUserIds.size,
      raffleOshPilotCount,
      oshCohortStats,
    })
  } catch (err) {
    console.error("[Osh Raffle List] error:", err)
    return NextResponse.json({ error: "Failed to fetch raffle entries" }, { status: 500 })
  }
}
