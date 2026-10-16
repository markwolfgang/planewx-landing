import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  inquiryClientKey,
  takeInquiryRateLimit,
} from "@/lib/inquiry-rate-limit"
import { resolveInquiryRecipients } from "@/lib/inquiry-recipients"
import {
  SPEAKING_INQUIRY_HONEYPOT,
  buildSpeakingInquiryEmail,
  validateSpeakingInquiry,
} from "@/lib/speaking-inquiry"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const SUCCESS_MESSAGE = "Thanks. We got your request and will reply soon."

/**
 * Dry run (no email) unless this is the production deployment.
 * INQUIRY_EMAIL_DRY_RUN=1 forces dry run anywhere; =0 allows a real send
 * outside production (manual preview check only).
 */
function isDryRun(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env.INQUIRY_EMAIL_DRY_RUN === "1") return true
  if (env.INQUIRY_EMAIL_DRY_RUN === "0") return false
  return env.VERCEL_ENV !== "production"
}

function honeypotFilled(body: unknown): boolean {
  if (body === null || typeof body !== "object" || Array.isArray(body)) return false
  const value = (body as Record<string, unknown>)[SPEAKING_INQUIRY_HONEYPOT]
  return typeof value === "string" ? value.trim() !== "" : value != null
}

export async function POST(request: Request) {
  try {
    const limited = takeInquiryRateLimit(
      inquiryClientKey(request, "speaking-inquiry"),
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

    // Honeypot: answer like a normal success so bots learn nothing; send nothing.
    if (honeypotFilled(body)) {
      return NextResponse.json({ success: true, message: SUCCESS_MESSAGE })
    }

    const result = validateSpeakingInquiry(body)
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
    const data = result.data

    // Skips Resend entirely. Never echoes recipients or the submitted data.
    if (isDryRun()) {
      console.info("[Speaking Inquiry] dry run: valid request, email not sent")
      return NextResponse.json({ success: true, message: SUCCESS_MESSAGE, dryRun: true })
    }
    const to = resolveInquiryRecipients()

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("[Speaking Inquiry] RESEND_API_KEY missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const rawFrom =
      process.env.FROM_EMAIL ||
      process.env.EMAIL_FROM ||
      "PlaneWX <hello@planewx.ai>"
    const from = rawFrom.split("#")[0].trim() || "PlaneWX <hello@planewx.ai>"

    const { subject, html } = buildSpeakingInquiryEmail(data)
    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: [data.email],
      subject,
      html,
    })

    if (error) {
      console.error("[Speaking Inquiry] Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send inquiry. Please try again." },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE })
  } catch (err) {
    console.error("[Speaking Inquiry] unexpected error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    )
  }
}
