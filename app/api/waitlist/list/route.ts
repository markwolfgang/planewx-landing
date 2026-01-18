import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: Request) {
  try {
    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Check for admin secret (simple protection)
    const { searchParams } = new URL(request.url)
    const adminSecret = searchParams.get("secret")
    const expectedSecret = process.env.WAITLIST_ADMIN_SECRET

    if (expectedSecret && adminSecret !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Fetch all waitlist entries, ordered by created_at (newest first)
    const { data: waitlistData, error: waitlistError } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })

    if (waitlistError) {
      console.error("[Waitlist List] Error:", waitlistError)
      return NextResponse.json(
        { error: "Failed to fetch waitlist" },
        { status: 500 }
      )
    }

    // If no entries, return early
    if (!waitlistData || waitlistData.length === 0) {
      return NextResponse.json({
        entries: [],
        count: 0,
      })
    }

    // Get unique referral codes that are not null
    const referralCodes = [...new Set(waitlistData
      .map(entry => entry.referral_code)
      .filter(code => code !== null && code !== undefined))] as string[]

    // Fetch referrer information for all unique codes
    let referrersMap: Record<string, any> = {}
    if (referralCodes.length > 0) {
      const { data: referrerData, error: referrerError } = await supabase
        .from("profiles")
        .select("id, user_id, first_name, last_name, name, referral_code")
        .in("referral_code", referralCodes)

      if (!referrerError && referrerData) {
        // Build a map of referral_code -> referrer info
        referrersMap = referrerData.reduce((acc, profile) => {
          if (profile.referral_code) {
            acc[profile.referral_code] = profile
          }
          return acc
        }, {} as Record<string, any>)
      }
    }

    // Combine waitlist entries with referrer information
    const entries = waitlistData.map(entry => ({
      ...entry,
      referrer: entry.referral_code ? referrersMap[entry.referral_code] || null : null,
    }))

    return NextResponse.json({
      entries,
      count: entries.length,
    })
  } catch (error) {
    console.error("[Waitlist List] Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}



