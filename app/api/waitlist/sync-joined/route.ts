import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Check for admin secret
    const body = await request.json()
    const adminSecret = body.secret
    const expectedSecret = process.env.WAITLIST_ADMIN_SECRET

    if (expectedSecret && adminSecret !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Create Supabase client with service role (needed to access auth.users)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get all invited waitlist entries
    const { data: invitedUsers, error: waitlistError } = await supabase
      .from("waitlist")
      .select("id, email")
      .eq("status", "invited")

    if (waitlistError) {
      console.error("[Sync Joined] Waitlist error:", waitlistError)
      return NextResponse.json(
        { error: "Failed to fetch waitlist" },
        { status: 500 }
      )
    }

    if (!invitedUsers || invitedUsers.length === 0) {
      return NextResponse.json({
        message: "No invited users to check",
        synced: 0
      })
    }

    // Get all users from auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      console.error("[Sync Joined] Auth error:", authError)
      return NextResponse.json(
        { error: "Failed to fetch auth users" },
        { status: 500 }
      )
    }

    // Create a set of signed-up emails (lowercase for comparison)
    const signedUpEmails = new Set(
      authData.users.map(u => u.email?.toLowerCase()).filter(Boolean)
    )

    // Find invited users who have signed up
    const usersToSync = invitedUsers.filter(u => 
      signedUpEmails.has(u.email.toLowerCase())
    )

    if (usersToSync.length === 0) {
      return NextResponse.json({
        message: "No invited users have signed up yet",
        synced: 0,
        checked: invitedUsers.length
      })
    }

    // Update their status to 'joined'
    const idsToUpdate = usersToSync.map(u => u.id)
    
    const { error: updateError } = await supabase
      .from("waitlist")
      .update({ 
        status: "joined",
        signed_up_at: new Date().toISOString()
      })
      .in("id", idsToUpdate)

    if (updateError) {
      console.error("[Sync Joined] Update error:", updateError)
      return NextResponse.json(
        { error: "Failed to update waitlist status" },
        { status: 500 }
      )
    }

    const syncedEmails = usersToSync.map(u => u.email)
    console.log("[Sync Joined] Synced users:", syncedEmails)

    return NextResponse.json({
      message: `Synced ${usersToSync.length} user(s) as joined`,
      synced: usersToSync.length,
      checked: invitedUsers.length,
      emails: syncedEmails
    })

  } catch (error) {
    console.error("[Sync Joined] Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}

