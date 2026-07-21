import { NextResponse } from "next/server"
import { randomInt } from "crypto"
import {
  assertAdminSecret,
  attendanceEligibleForEvent,
  getOshSupabase,
  isRaffleDrawEvent,
  isRafflePrize,
  type RaffleDrawEvent,
  type RafflePrize,
} from "@/lib/osh-admin"

const PAGE_SIZE = 500

async function fetchEligibleEntryIds(
  supabase: NonNullable<ReturnType<typeof getOshSupabase>>,
  event: RaffleDrawEvent,
): Promise<string[]> {
  // Already won at this specific event → ineligible for another draw there
  const wonAtEvent = new Set<string>()
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("oshkosh_raffle_draws")
      .select("entry_id, event")
      .eq("status", "won")
      .range(from, from + PAGE_SIZE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    for (const row of data) {
      const drawEvent = (row.event as string) || "meetup"
      if (drawEvent === event) wonAtEvent.add(row.entry_id as string)
    }
    from += data.length
  }

  const eligible: string[] = []
  from = 0
  while (true) {
    const { data, error } = await supabase
      .from("oshkosh_raffle_entries")
      .select("id, event_attendance")
      .range(from, from + PAGE_SIZE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    for (const row of data) {
      if (wonAtEvent.has(row.id as string)) continue
      if (!attendanceEligibleForEvent(row.event_attendance as string, event)) continue
      eligible.push(row.id as string)
    }
    from += data.length
  }
  return eligible
}

export async function POST(request: Request) {
  try {
    const supabase = getOshSupabase()
    if (!supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const body = await request.json()
    if (!assertAdminSecret(body.secret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const prize: RafflePrize | null = isRafflePrize(body.prize) ? body.prize : null
    if (!prize) {
      return NextResponse.json(
        { error: "Prize must be 'sunglasses' or 'merch'" },
        { status: 400 },
      )
    }

    const event: RaffleDrawEvent | null = isRaffleDrawEvent(body.event) ? body.event : null
    if (!event) {
      return NextResponse.json(
        { error: "Event must be 'meetup' or 'talk'" },
        { status: 400 },
      )
    }

    const eligibleIds = await fetchEligibleEntryIds(supabase, event)
    if (eligibleIds.length === 0) {
      return NextResponse.json(
        { error: `No eligible entries left for the ${event === "talk" ? "forum talk" : "meetup"}` },
        { status: 409 },
      )
    }

    const winnerId = eligibleIds[randomInt(eligibleIds.length)]

    const { data: entry, error: entryError } = await supabase
      .from("oshkosh_raffle_entries")
      .select("id, email, first_name, event_attendance")
      .eq("id", winnerId)
      .single()

    if (entryError || !entry) {
      console.error("[Osh Raffle Draw] entry fetch failed:", entryError)
      return NextResponse.json({ error: "Failed to load winner" }, { status: 500 })
    }

    const { data: draw, error: drawError } = await supabase
      .from("oshkosh_raffle_draws")
      .insert({
        entry_id: entry.id,
        prize,
        event,
        status: "won",
      })
      .select("id, entry_id, prize, event, status, created_at")
      .single()

    if (drawError || !draw) {
      console.error("[Osh Raffle Draw] insert failed:", drawError)
      return NextResponse.json({ error: "Failed to record draw" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      eligibleRemaining: eligibleIds.length - 1,
      winner: {
        id: entry.id,
        email: entry.email,
        firstName: entry.first_name,
        eventAttendance: entry.event_attendance,
      },
      draw,
    })
  } catch (err) {
    console.error("[Osh Raffle Draw] unexpected error:", err)
    return NextResponse.json({ error: "Failed to pick a winner" }, { status: 500 })
  }
}
