import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// CORS headers for cross-origin requests from main app
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { error: "Missing token", reason: "invalid" },
        { status: 400 }
      )
    }

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

    // Find the entry with this token
    const { data: entry, error } = await supabase
      .from("waitlist")
      .select("*")
      .eq("approval_token", token)
      .single()

    if (error || !entry) {
      return NextResponse.json(
        { error: "Invalid invite token", reason: "invalid" },
        { status: 404 }
      )
    }

    // Check if already used (joined)
    if (entry.status === 'joined' || entry.signed_up_at) {
      return NextResponse.json(
        { error: "Invite already used", reason: "used" },
        { status: 400 }
      )
    }

    // Check if expired
    if (entry.approval_token_expires_at) {
      const expiresAt = new Date(entry.approval_token_expires_at)
      if (expiresAt < new Date()) {
        return NextResponse.json(
          { error: "Invite has expired", reason: "expired" },
          { status: 400 }
        )
      }
    }

    // Token is valid
    return NextResponse.json({
      valid: true,
      email: entry.email,
    }, { headers: corsHeaders })
  } catch (error) {
    console.error("[Validate Invite] Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500, headers: corsHeaders }
    )
  }
}

