import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  inquiryClientKey,
  takeInquiryRateLimit,
} from "@/lib/inquiry-rate-limit"
import { resolveInquiryRecipients } from "@/lib/inquiry-recipients"
import {
  buildSpeakingInquiryEmail,
  validateSpeakingInquiry,
} from "@/lib/speaking-inquiry"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const SUCCESS_MESSAGE = "Thanks. We got your request and will reply soon."

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

    const result = validateSpeakingInquiry(body)
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
    const data = result.data
    const to = resolveInquiryRecipients()

    // Local/CI verify only. Never set in production; skips Resend entirely.
    if (process.env.INQUIRY_EMAIL_DRY_RUN === "1") {
      return NextResponse.json({
        success: true,
        message: SUCCESS_MESSAGE,
        dryRun: true,
        to,
        received: data,
      })
    }

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
      replyTo: data.email,
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
