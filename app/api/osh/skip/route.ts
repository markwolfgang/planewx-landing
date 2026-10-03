import { NextResponse } from "next/server"
import { readJsonBody, requireAdmin } from "@/lib/admin-auth"
import { getOshSupabase } from "@/lib/osh-admin"

/**
 * Mark a draw as "not present" so that entry becomes eligible again,
 * then the admin can hit Pick Winner for a new random selection.
 */
export async function POST(request: Request) {
  try {
    // Admin only. Fails closed when WAITLIST_ADMIN_SECRET is unset.
    const body = await readJsonBody(request)
    const denied = requireAdmin(request, body)
    if (denied) return denied

    const supabase = getOshSupabase()
    if (!supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const drawId = typeof body.drawId === "string" ? body.drawId : ""
    if (!drawId) {
      return NextResponse.json({ error: "drawId is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("oshkosh_raffle_draws")
      .update({ status: "skipped_not_present" })
      .eq("id", drawId)
      .eq("status", "won")
      .select("id, entry_id, prize, status")
      .maybeSingle()

    if (error) {
      console.error("[Osh Raffle Skip] update failed:", error)
      return NextResponse.json({ error: "Failed to skip winner" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json(
        { error: "Draw not found or already skipped" },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      draw: data,
      message: "Marked not present — entry is eligible again. Pick another winner.",
    })
  } catch (err) {
    console.error("[Osh Raffle Skip] unexpected error:", err)
    return NextResponse.json({ error: "Failed to skip winner" }, { status: 500 })
  }
}
