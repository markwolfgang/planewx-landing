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
  member_since: string          // ISO date string of profiles.created_at
  home_airport: string | null
  pilot_certificate: string | null   // STUDENT | PRIVATE | COMMERCIAL | ATP | SPORT
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

/** Returns the set of user_ids who filed a trip into the Oshkosh area. */
async function fetchOshInboundUserIds(
  supabase: NonNullable<ReturnType<typeof getOshSupabase>>,
): Promise<Set<string>> {
  const userIds = new Set<string>()
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("trips")
      .select("user_id")
      .or(OSH_AREA_AIRPORTS.map((a) => `destination.eq.${a}`).join(","))
      .gte("date", OSH_ARRIVAL_START)
      .lte("date", OSH_ARRIVAL_END)
      .range(from, from + 999)
    if (error || !data || data.length === 0) break
    for (const t of data) if (t.user_id) userIds.add(t.user_id as string)
    from += data.length
    if (data.length < 1000) break
  }
  return userIds
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
 * Fetches profile + lifetime trip count for a set of user_ids.
 * Returns a map of user_id → PilotProfile.
 */
async function fetchPilotProfiles(
  supabase: NonNullable<ReturnType<typeof getOshSupabase>>,
  userIds: string[],
): Promise<Map<string, PilotProfile>> {
  if (userIds.length === 0) return new Map()

  const orFilter = userIds.map((id) => `user_id.eq.${id}`).join(",")

  // Profiles
  const { data: profiles } = await supabase
    .from("profiles")
    .select(PROFILE_COLS)
    .or(orFilter)

  // Trip counts — paginate in case a user has many trips
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

    const [entries, draws, oshUserIds] = await Promise.all([
      fetchAllEntries(supabase),
      fetchAllDraws(supabase),
      fetchOshInboundUserIds(supabase),
    ])

    // Resolve each raffle entry email → user_id (parallel, list is small)
    const emailToUserId = new Map<string, string | null>()
    await Promise.all(
      entries.map(async (e) => {
        const uid = await lookupUserIdByEmail(e.email as string, supabaseUrl, serviceKey)
        emailToUserId.set(e.email as string, uid)
      }),
    )

    // Batch-fetch profiles for all resolved user_ids
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
    })
  } catch (err) {
    console.error("[Osh Raffle List] error:", err)
    return NextResponse.json({ error: "Failed to fetch raffle entries" }, { status: 500 })
  }
}

