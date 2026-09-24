import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const org = trimField(body.org, 200)
    const name = trimField(body.name, 120)
    const email = trimField(body.email, 254).toLowerCase()
    const note = trimField(body.note, 4000)

    if (!org) {
      return NextResponse.json({ error: "Organization is required" }, { status: 400 })
    }
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }
    if (!note) {
      return NextResponse.json({ error: "A short note is required" }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("[Ambassadors Inquiry] RESEND_API_KEY missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const to =
      process.env.PARTNERSHIP_INQUIRY_EMAIL ||
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      "hello@planewx.ai"
    const rawFrom =
      process.env.FROM_EMAIL ||
      process.env.EMAIL_FROM ||
      "PlaneWX <hello@planewx.ai>"
    const from = rawFrom.split("#")[0].trim() || "PlaneWX <hello@planewx.ai>"

    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Community inquiry: ${org}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Community inquiry</h2>
          <p>New note from the PlaneWX Ambassadors page:</p>
          <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Organization</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(org)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Name</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Email</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(email)}</td>
            </tr>
          </table>
          <p style="white-space: pre-wrap; line-height: 1.55;">${escapeHtml(note)}</p>
        </div>
      `,
    })

    if (error) {
      console.error("[Ambassadors Inquiry] Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send inquiry. Please try again." },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Thanks. We got your note and will reply soon.",
    })
  } catch (err) {
    console.error("[Ambassadors Inquiry] unexpected error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    )
  }
}
