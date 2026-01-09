import { NextResponse } from "next/server"

// This is a preview-only endpoint - shows the invite email HTML
const LANDING_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://planewx-landing.vercel.app"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email") || "pilot@example.com"
  const token = "PREVIEW_TOKEN_EXAMPLE"
  
  const inviteUrl = `${LANDING_URL}/invite?token=${token}`
  
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Invited to Beta Test PlaneWX!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 16px; border: 1px solid #2a2a4a;">
          <tr>
            <td align="center" style="padding: 40px 40px 20px;">
              <div style="font-size: 48px; margin-bottom: 16px;">✈️</div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff;">PlaneWX</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #60a5fa; text-transform: uppercase; letter-spacing: 2px;">Powered by Synoptic Intelligence™</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; color: #22c55e; text-align: center;">🧪 Welcome to the PlaneWX Beta!</h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #d1d5db; text-align: center;">
                You've been selected as one of our first beta testers! We're building the smartest weather briefings in aviation, and we need your help to make it great.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(59, 130, 246, 0.1); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.2);">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #60a5fa; text-transform: uppercase; letter-spacing: 1px;">What You'll Get</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">Synoptic Intelligence™</strong> – AI-synthesized regional weather</td></tr>
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">Smart Refresh</strong> – Briefings update automatically with new products</td></tr>
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">Personal Minimums</strong> – GO Score calibrated to your limits</td></tr>
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">14-Day Planning</strong> – Plan trips up to two weeks ahead</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(234, 179, 8, 0.1); border-radius: 12px; border: 1px solid rgba(234, 179, 8, 0.3);">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #facc15; text-transform: uppercase; letter-spacing: 1px;">🧪 As a Beta Tester</p>
                    <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #d1d5db;">
                      You may encounter bugs or rough edges — that's expected! Your feedback helps us improve.
                    </p>
                    <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #ffffff;">Ways to share feedback:</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.8; color: #d1d5db;">
                      📝 <strong style="color: #ffffff;">Feedback button</strong> in the top menu<br>
                      👍👎 <strong style="color: #ffffff;">Thumbs up/down</strong> on each briefing section<br>
                      📧 <strong style="color: #ffffff;">Email with screenshots</strong> to <a href="mailto:mark@planewx.ai" style="color: #60a5fa;">mark@planewx.ai</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px 40px;">
              <a href="${inviteUrl}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; font-size: 18px; font-weight: 600; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);">Join the Beta →</a>
              <p style="margin: 16px 0 0; font-size: 13px; color: #9ca3af;">This invite link is unique to you and expires in 7 days.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #2a2a4a;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af; text-align: center;">Questions or feedback? Just reply to this email — I read every one.</p>
              <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280; text-align: center;">— Mark, Founder</p>
              <p style="margin: 16px 0 0; font-size: 12px; color: #4b5563; text-align: center;">© ${new Date().getFullYear()} PlaneWX. Fly smarter.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
  
  return new NextResponse(emailHtml, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}
