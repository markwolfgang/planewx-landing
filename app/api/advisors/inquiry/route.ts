import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  inquiryClientKey,
  takeInquiryRateLimit,
} from "@/lib/inquiry-rate-limit"
import { resolveAdvisorInquiryRecipients } from "@/lib/inquiry-recipients"
import { ADVISOR_EXPERTISE_OPTIONS } from "@/lib/advisor-expertise"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_EXPERTISE = new Set<string>(ADVISOR_EXPERTISE_OPTIONS)

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
  { optional = false }: { optional?: boolean } = {},
):
  | { ok: true; value: string }
  | { ok: false; reason: "missing" | "too_long" | "invalid" } {
  if (typeof value !== "string") {
    if (optional && (value === undefined || value === null)) {
      return { ok: true, value: "" }
    }
    return { ok: false, reason: "invalid" }
  }
  const trimmed = value.trim()
  if (!trimmed) {
    if (optional) return { ok: true, value: "" }
    return { ok: false, reason: "missing" }
  }
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
      inquiryClientKey(request, "advisors-inquiry"),
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

    const nameField = readField(fields.name, 120)
    const emailField = readField(fields.email, 254)
    const phoneField = readField(fields.phone, 40, { optional: true })
    const linkedinField = readField(fields.linkedin, 400, { optional: true })
    const backgroundField = readField(fields.background, 4000)
    const whyField = readField(fields.why, 4000)

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
    if (!phoneField.ok) {
      return NextResponse.json(
        { error: fieldError("Phone", phoneField) },
        { status: 400 },
      )
    }
    if (!linkedinField.ok) {
      return NextResponse.json(
        { error: fieldError("LinkedIn or website", linkedinField) },
        { status: 400 },
      )
    }
    if (!backgroundField.ok) {
      return NextResponse.json(
        { error: fieldError("Aviation background", backgroundField) },
        { status: 400 },
      )
    }
    if (!whyField.ok) {
      return NextResponse.json(
        { error: fieldError("Why PlaneWX", whyField) },
        { status: 400 },
      )
    }

    const expertiseRaw = fields.expertise
    if (!Array.isArray(expertiseRaw) || expertiseRaw.length === 0) {
      return NextResponse.json(
        { error: "Select at least one area of expertise" },
        { status: 400 },
      )
    }
    const expertise: string[] = []
    for (const item of expertiseRaw) {
      if (typeof item !== "string" || !ALLOWED_EXPERTISE.has(item)) {
        return NextResponse.json(
          { error: "Expertise is invalid" },
          { status: 400 },
        )
      }
      if (!expertise.includes(item)) expertise.push(item)
    }

    const name = nameField.value
    const phone = phoneField.value
    const linkedin = linkedinField.value
    const background = backgroundField.value
    const why = whyField.value
    const to = resolveAdvisorInquiryRecipients()

    if (process.env.INQUIRY_EMAIL_DRY_RUN === "1") {
      return NextResponse.json({
        success: true,
        message: "Thanks. We got your note and will reply soon.",
        dryRun: true,
        to,
        received: {
          name,
          email,
          phone,
          linkedin,
          background,
          expertise,
          why,
        },
      })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("[Advisors Inquiry] RESEND_API_KEY missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const rawFrom =
      process.env.FROM_EMAIL ||
      process.env.EMAIL_FROM ||
      "PlaneWX <hello@planewx.ai>"
    const from = rawFrom.split("#")[0].trim() || "PlaneWX <hello@planewx.ai>"

    const expertiseHtml = expertise
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("")

    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "Advisor inquiry",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Advisor inquiry</h2>
          <p>New note from the PlaneWX Advisors page:</p>
          <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Name</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Email</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">Phone</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(phone || "(none)")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; background: #f8fafc;">LinkedIn or website</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(linkedin || "(none)")}</td>
            </tr>
          </table>
          <h3 style="margin: 0 0 8px;">Aviation background</h3>
          <p style="white-space: pre-wrap; line-height: 1.55;">${escapeHtml(background)}</p>
          <h3 style="margin: 16px 0 8px;">Areas of expertise</h3>
          <ul>${expertiseHtml}</ul>
          <h3 style="margin: 16px 0 8px;">Why PlaneWX</h3>
          <p style="white-space: pre-wrap; line-height: 1.55;">${escapeHtml(why)}</p>
        </div>
      `,
    })

    if (error) {
      console.error("[Advisors Inquiry] Resend error:", error)
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
    console.error("[Advisors Inquiry] unexpected error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    )
  }
}
