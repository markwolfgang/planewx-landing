import { NextResponse } from "next/server"
import { assertAdminSecret, getOshSupabase } from "@/lib/osh-admin"

const PAGE_SIZE = 500

async function fetchAllEntries(supabase: NonNullable<ReturnType<typeof getOshSupabase>>) {
  const all: Array<Record<string, unknown>> = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("oshkosh_raffle_entries")
      .select("id, email, first_name, marketing_opt_in, source, created_at")
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
      .select("id, entry_id, prize, status, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1)

    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += data.length
  }
  return all
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

    const wonEntryIds = new Set(
      draws.filter((d) => d.status === "won").map((d) => d.entry_id as string),
    )

    return NextResponse.json({
      entries,
      draws,
      count: entries.length,
      eligibleCount: entries.filter((e) => !wonEntryIds.has(e.id as string)).length,
      marketingOptInCount: entries.filter((e) => e.marketing_opt_in).length,
    })
  } catch (err) {
    console.error("[Osh Raffle List] error:", err)
    return NextResponse.json({ error: "Failed to fetch raffle entries" }, { status: 500 })
  }
}
