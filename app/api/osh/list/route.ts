import { NextResponse } from "next/server"
import {
  assertAdminSecret,
  attendanceEligibleForEvent,
  getOshSupabase,
  type RaffleDrawEvent,
} from "@/lib/osh-admin"

const PAGE_SIZE = 500

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

    const [entries, draws] = await Promise.all([
      fetchAllEntries(supabase),
      fetchAllDraws(supabase),
    ])

    return NextResponse.json({
      entries,
      draws,
      count: entries.length,
      eligibleMeetup: eligibleForEvent(entries, draws, "meetup"),
      eligibleTalk: eligibleForEvent(entries, draws, "talk"),
      marketingOptInCount: entries.filter((e) => e.marketing_opt_in).length,
      attendanceCounts: {
        meetup: entries.filter((e) => e.event_attendance === "meetup").length,
        talk: entries.filter((e) => e.event_attendance === "talk").length,
        both: entries.filter((e) => e.event_attendance === "both" || !e.event_attendance).length,
      },
    })
  } catch (err) {
    console.error("[Osh Raffle List] error:", err)
    return NextResponse.json({ error: "Failed to fetch raffle entries" }, { status: 500 })
  }
}
