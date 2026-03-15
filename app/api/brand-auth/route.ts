import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const password = process.env.BRAND_PORTAL_PASSWORD

  if (!password) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 })
  }

  try {
    const body = await request.json()

    if (body.password === password) {
      const response = NextResponse.json({ success: true })
      response.cookies.set("planewx-brand-auth", "true", {
        maxAge: 60 * 60 * 24 * 90, // 90 days
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      return response
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}
