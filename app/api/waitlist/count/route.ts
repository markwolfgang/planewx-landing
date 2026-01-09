import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET() {
  try {
    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Count waitlist entries (excluding those who have already signed up)
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .is("signed_up_at", null) // Only count those who haven't signed up yet

    if (error) {
      console.error("[Waitlist Count] Error:", error)
      return NextResponse.json(
        { error: "Failed to get waitlist count" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      count: count || 0,
    })
  } catch (error) {
    console.error("[Waitlist Count] Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}



