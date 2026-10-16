import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const CACHE_REAL_GREETING = "public, s-maxage=3600, stale-while-revalidate=86400"
const CACHE_NULL = "no-store"

/**
 * GET /api/campaign-greeting?code=AOPA-FS
 *
 * Returns the greeting string for a known, active campaign code that has one,
 * or null when the code is unknown, inactive, a peer referral code, or simply
 * has no greeting configured.
 *
 * Real greetings are cached aggressively because greeting copy is static marketing
 * text that changes at most when an admin edits a record. Null answers are never
 * cached so a newly added code can show its bar right away.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("code")
  const code = raw?.trim().toUpperCase() ?? null

  if (!code || code.length < 2 || code.length > 32) {
    return NextResponse.json(
      { greeting: null },
      { headers: { "Cache-Control": CACHE_NULL } }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("[campaign-greeting] Missing Supabase env vars")
    return NextResponse.json(
      { greeting: null },
      { status: 500, headers: { "Cache-Control": CACHE_NULL } }
    )
  }

  const db = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data } = await db
    .from("campaign_codes")
    .select("greeting")
    .eq("code", code)
    .eq("active", true)
    .not("greeting", "is", null)
    .maybeSingle()

  const greeting = data?.greeting ?? null
  return NextResponse.json(
    { greeting },
    {
      headers: {
        "Cache-Control": greeting ? CACHE_REAL_GREETING : CACHE_NULL,
      },
    }
  )
}
