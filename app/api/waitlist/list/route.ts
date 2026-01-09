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
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[Waitlist List] Error:", error)
      return NextResponse.json(
        { error: "Failed to fetch waitlist" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      entries: data || [],
      count: data?.length || 0,
    })
  } catch (error) {
    console.error("[Waitlist List] Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}



