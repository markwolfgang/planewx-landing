import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  inquiryClientKey,
  takeInquiryRateLimit,
} from "@/lib/inquiry-rate-limit"
import { resolveInquiryRecipients } from "@/lib/inquiry-recipients"

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

function readField(
  value: unknown,
  max: number,
):
  | { ok: true; value: string }
  | { ok: false; reason: "missing" | "too_long" | "invalid" } {
  if (typeof value !== "string") return { ok: false, reason: "invalid" }
  const trimmed = value.trim()
  if (!trimmed) return { ok: false, reason: "missing" }
  if (trimmed.length > max) return { ok: false, reason: "too_long" }
  return { ok: true, value: trimmed }
}

function fieldError(
  label: string,
  result: ReturnType<typeof readField>,
): string {
  if (result.ok) return ""
  if (result.reason === "too_long") return `${label} is too long`
  if (result.reason === "invalid") return `${label} is invalid`
  return `${label} is required`
}

export async function POST(request: Request) {
  try {
    const limited = takeInquiryRateLimit(
      inquiryClientKey(request, "partners-inquiry"),
    )
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many inquiries. Please try again shortly." },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    const fields = body as Record<string, unknown>
    const orgField = readField(fields.org, 200)
    const nameField = readField(fields.name, 120)
    const emailField = readField(fields.email, 254)
    const noteField = readField(fields.note, 4000)

    if (!orgField.ok) {
      return NextResponse.json(
        { error: fieldError("Organization", orgField) },
        { status: 400 },
      )
    }
    if (!nameField.ok) {
      return NextResponse.json(
        { error: fieldError("Name", nameField) },
        { status: 400 },
      )
    }
    if (!emailField.ok) {
      return NextResponse.json(
        { error: fieldError("Email", emailField) },
        { status: 400 },
      )
    }
    const email = emailField.value.toLowerCase()
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }
    if (!noteField.ok) {
      return NextResponse.json(
        { error: fieldError("Note", noteField) },
        { status: 400 },
      )
    }

    const org = orgField.value
    const name = nameField.value
    const note = noteField.value
    const to = resolveInquiryRecipients()

    // Local/CI verify only. Never set in production; skips Resend entirely.
    if (process.env.INQUIRY_EMAIL_DRY_RUN === "1") {
      return NextResponse.json({
        success: true,
        message: "Thanks. We got your note and will reply soon.",
        dryRun: true,
        to,
        received: { org, name, email, note },
      })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("[Partners Inquiry] RESEND_API_KEY missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

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
      subject: `Partnership inquiry: ${org}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Partnership inquiry</h2>
          <p>New note from the PlaneWX Partners page:</p>
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
      console.error("[Partners Inquiry] Resend error:", error)
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
    console.error("[Partners Inquiry] unexpected error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    )
  }
}
