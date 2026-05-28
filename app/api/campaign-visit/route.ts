import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Only allow known campaign codes — validated against campaign_codes table.
// Peer referral codes (8-char hex) are silently ignored.
// Peer codes arrive via ?ref= too, and we don't want to create a campaign_visits
// row for those since they have no campaign_codes row to FK to.

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const code = typeof (body as any)?.code === "string"
    ? (body as any).code.trim().toUpperCase()
    : null
  const lp = typeof (body as any)?.lp === "string"
    ? (body as any).lp.trim().toLowerCase().slice(0, 8)
    : null

  if (!code || code.length < 4 || code.length > 32) {
    // Return 200 to avoid client-side errors for invalid/peer codes
    return NextResponse.json({ ok: false, reason: "invalid_code" })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("[campaign-visit] Missing Supabase env vars")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  const db = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Validate the code is a known campaign code (not a peer referral code).
  // This also prevents junk data if someone manually crafts a request.
  const { data: codeRow } = await db
    .from("campaign_codes")
    .select("code")
    .eq("code", code)
    .eq("active", true)
    .maybeSingle()

  if (!codeRow) {
    // Silently accept — don't reveal which codes are valid
    return NextResponse.json({ ok: false, reason: "unknown_code" })
  }

  // Read Vercel's geo header — available in production, absent locally
  const country = request.headers.get("x-vercel-ip-country") ?? null

  const { error } = await db.from("campaign_visits").insert({
    code,
    lp_variant: lp || null,
    country,
  })

  if (error) {
    console.error("[campaign-visit] Insert failed:", error.message)
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
