import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import {
  isVolunteerProductionDeploy,
  normalizeVolunteerCallSignForOrg,
  resolveVolunteerOrg,
  VOLUNTEER_CAMPAIGN_CODE,
} from "@/lib/volunteer-landing"

/**
 * POST /api/volunteer/call-sign
 *
 * Format-only validation per org (ACA: CMF + 1-4 digits; SkyHope: SYH + 1-4 digits).
 * No membership list lookup. Stores the normalized call sign with timestamp + ref
 * when Supabase is available. Always returns the normalized sign on success so the
 * client can pass it into signup even if durable storage is temporarily unavailable.
 * Never blocks signup when storage fails.
 *
 * Preview / non-production: reject writes (landing preview shares prod Supabase).
 */
export async function POST(request: NextRequest) {
  if (!isVolunteerProductionDeploy()) {
    return NextResponse.json(
      { ok: false, error: "Call-sign storage is disabled outside production." },
      { status: 403 }
    )
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const raw =
    typeof (body as { callSign?: unknown })?.callSign === "string"
      ? (body as { callSign: string }).callSign
      : typeof (body as { call_sign?: unknown })?.call_sign === "string"
        ? (body as { call_sign: string }).call_sign
        : ""

  const refRaw =
    typeof (body as { ref?: unknown })?.ref === "string"
      ? (body as { ref: string }).ref.trim().toUpperCase()
      : ""
  const ref =
    refRaw && refRaw.length >= 2 && refRaw.length <= 32
      ? refRaw
      : VOLUNTEER_CAMPAIGN_CODE

  const org = resolveVolunteerOrg(ref)
  const callSign = normalizeVolunteerCallSignForOrg(raw, org)
  if (!callSign) {
    return NextResponse.json({ ok: false, error: org.error }, { status: 400 })
  }

  const lp =
    typeof (body as { lp?: unknown })?.lp === "string"
      ? (body as { lp: string }).lp.trim().toLowerCase().slice(0, 8) || null
      : null

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  let stored = false
  if (supabaseUrl && supabaseKey) {
    const db = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { error } = await db.from("volunteer_call_signs").insert({
      call_sign: callSign,
      ref,
      lp,
    })

    if (error) {
      // Do not block the pilot. Client still has the validated sign for signup.
      console.error("[volunteer/call-sign] Insert failed:", error.message)
    } else {
      stored = true
    }
  } else {
    console.error("[volunteer/call-sign] Missing Supabase env vars")
  }

  return NextResponse.json({
    ok: true,
    callSign,
    ref,
    stored,
  })
}
