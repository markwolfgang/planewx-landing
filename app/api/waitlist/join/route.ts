import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
// Using service role key for public signup (bypasses RLS for inserts)
// This is safe because we validate all inputs server-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("[Waitlist API] Missing Supabase environment variables")
}

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, homeAirport, xcFlightsPerWeek } = body

    // Validate required fields
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate XC flights if provided
    const validXcOptions = ["less_than_1", "1_to_2", "3_to_5", "more_than_5"]
    if (xcFlightsPerWeek && !validXcOptions.includes(xcFlightsPerWeek)) {
      return NextResponse.json(
        { error: "Invalid XC flights option" },
        { status: 400 }
      )
    }

    // Validate home airport format (3-4 uppercase letters) if provided
    if (homeAirport && !/^[A-Z]{3,4}$/.test(homeAirport.trim().toUpperCase())) {
      return NextResponse.json(
        { error: "Home airport must be a valid ICAO code (3-4 letters)" },
        { status: 400 }
      )
    }

    // Create Supabase client with service role key (bypasses RLS)
    // This is safe because we validate all inputs above
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Insert into waitlist
    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        email: email.trim().toLowerCase(),
        home_airport: homeAirport ? homeAirport.trim().toUpperCase() : null,
        xc_flights_per_week: xcFlightsPerWeek || null,
      })
      .select()
      .single()

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505" || error.message?.includes("unique")) {
        return NextResponse.json(
          { error: "This email is already on the waitlist" },
          { status: 409 }
        )
      }

      console.error("[Waitlist] Error inserting:", error)
      return NextResponse.json(
        { error: "Failed to join waitlist. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll notify you when access is available.",
    })
  } catch (error) {
    console.error("[Waitlist] Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}
