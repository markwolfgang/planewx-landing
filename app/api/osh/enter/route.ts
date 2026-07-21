import { NextResponse } from "next/server"
import { EMAIL_REGEX, getOshSupabase } from "@/lib/osh-admin"

export async function POST(request: Request) {
  try {
    const supabase = getOshSupabase()
    if (!supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const firstName =
      typeof body.firstName === "string" ? body.firstName.trim().slice(0, 80) : ""
    const marketingOptIn = Boolean(body.marketingOptIn)
    const source =
      typeof body.source === "string" && body.source.trim()
        ? body.source.trim().slice(0, 40)
        : "page"

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const { error } = await supabase.from("oshkosh_raffle_entries").insert({
      email,
      first_name: firstName || null,
      marketing_opt_in: marketingOptIn,
      source,
    })

    if (error) {
      if (error.code === "23505" || error.message?.includes("unique")) {
        return NextResponse.json(
          {
            success: true,
            alreadyEntered: true,
            message: "You're already entered. See you at Booth 337!",
          },
          { status: 200 },
        )
      }
      console.error("[Osh Raffle] insert error:", error)
      return NextResponse.json(
        { error: "Failed to enter raffle. Please try again." },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      alreadyEntered: false,
      message: "You're in! See you Wednesday 11 AM at Flyte Booth 337.",
    })
  } catch (err) {
    console.error("[Osh Raffle] unexpected error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    )
  }
}
