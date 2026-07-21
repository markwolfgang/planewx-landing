import { Resend } from "resend"
import type { RaffleAttendance } from "@/lib/osh-admin"

function eventBlock(attendance: RaffleAttendance): string {
  const meetup = `
    <p style="margin: 0 0 8px; font-size: 15px;"><strong>Meetup</strong> — Wednesday · 11:00 AM · Flyte Booth 337</p>
  `
  const talk = `
    <p style="margin: 0; font-size: 15px;"><strong>Forum talk</strong> — Wednesday · 4:00–5:15 PM · Stage 10</p>
  `
  if (attendance === "meetup") {
    return `${meetup}<p style="margin: 8px 0 0; font-size: 14px; color: #64748b;">Drawing at the meetup · <em>must be present to win</em></p>`
  }
  if (attendance === "talk") {
    return `${talk}<p style="margin: 8px 0 0; font-size: 14px; color: #64748b;">Drawing at the talk · <em>must be present to win</em></p>`
  }
  return `${meetup}${talk}<p style="margin: 8px 0 0; font-size: 14px; color: #64748b;">Drawings at both events · <em>must be present to win</em></p>`
}

export async function sendOshRaffleConfirmation(opts: {
  email: string
  firstName?: string | null
  eventAttendance: RaffleAttendance
}): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.warn("[Osh Raffle] RESEND_API_KEY missing — skipping confirmation email")
    return
  }

  const name = opts.firstName?.trim()
  const greeting = name ? `Hi ${name},` : "Hi,"
  const rawFrom =
    process.env.FROM_EMAIL ||
    process.env.EMAIL_FROM ||
    "PlaneWX <hello@planewx.ai>"
  const from = rawFrom.split("#")[0].trim() || "PlaneWX <hello@planewx.ai>"

  const resend = new Resend(resendApiKey)
  await resend.emails.send({
    from,
    to: opts.email,
    subject: "You're entered — PlaneWX giveaway at Oshkosh",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a; line-height: 1.55;">
        <p style="font-size: 16px;">${greeting}</p>
        <p style="font-size: 16px;">You're entered in the <strong>PlaneWX × Flyte</strong> giveaway at AirVenture — come meet <strong>Mark and Sara</strong>.</p>
        <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 8px; padding: 16px 18px; margin: 24px 0;">
          ${eventBlock(opts.eventAttendance)}
        </div>
        <p style="font-size: 15px; color: #475569;">
          Prizes: Flyte sunglasses + PlaneWX hats &amp; t-shirts. Drinks at the meetup provided by Flyte.
        </p>
        <p style="font-size: 15px; color: #475569;">
          Mark's forum talk: <em>Advanced Aviation Risk Management</em> — Forum Stage 10.
        </p>
        <p style="margin-top: 28px;">
          <a href="https://www.planewx.ai/osh" style="color: #0ea5e9; font-weight: 600; text-decoration: none;">View event details →</a>
        </p>
        <p style="margin-top: 32px; font-size: 13px; color: #94a3b8;">
          See you there.<br/>
          — Mark &amp; Sara
        </p>
      </div>
    `,
  })
}
