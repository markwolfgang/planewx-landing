import { NextResponse } from "next/server"
import { readJsonBody, requireAdmin } from "@/lib/admin-auth"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// CORS headers for cross-origin requests from main app
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Secret",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

interface MarkJoinedRequest {
  token?: string
  email?: string
  secret: string
}

export async function POST(request: Request) {
  try {
    const body = (await readJsonBody(request)) as unknown as MarkJoinedRequest

    // Admin only. Fails closed when WAITLIST_ADMIN_SECRET is unset.
    const denied = requireAdmin(request, body, { headers: corsHeaders })
    if (denied) return denied

    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const { token, email } = body

    if (!token && !email) {
      return NextResponse.json(
        { error: "Must provide token or email" },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Find and update the entry
    let query = supabase.from("waitlist").update({
      status: 'joined',
      signed_up_at: new Date().toISOString(),
    })

    if (token) {
      query = query.eq("approval_token", token)
    } else if (email) {
      query = query.eq("email", email)
    }

    const { data, error } = await query.select().single()

    if (error) {
      console.error("[Mark Joined] Error:", error)
      // If not found, that's okay - user might not have been on waitlist
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          message: "No matching waitlist entry found",
          updated: false,
        })
      }
      return NextResponse.json(
        { error: "Failed to update entry" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "User marked as joined",
      updated: true,
      email: data?.email,
    }, { headers: corsHeaders })
  } catch (error) {
    console.error("[Mark Joined] Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500, headers: corsHeaders }
    )
  }
}

