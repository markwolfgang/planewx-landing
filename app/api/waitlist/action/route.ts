import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Resend email provider
const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || "PlaneWX <hello@planewx.ai>"
const LANDING_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://planewx-landing.vercel.app"

type ActionType = 'invite' | 'resend' | 'reset' | 'revoke' | 'delete' | 'mark_joined'

interface ActionRequest {
  ids: string[]
  action: ActionType
  secret: string
}

// Delay helper to respect Resend rate limit (2 req/sec)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function generateInviteToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

async function sendInviteEmail(email: string, inviteToken: string): Promise<boolean> {
  const inviteUrl = `${LANDING_URL}/invite?token=${inviteToken}`
  
  if (!RESEND_API_KEY) {
    console.log(`[Waitlist Action] Would send email to ${email} with invite URL: ${inviteUrl}`)
    return true
  }

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
              <h2 style="margin: 0 0 16px; font-size: 24px; color: #22c55e; text-align: center;">Your PlaneWX Invite is Waiting</h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #d1d5db; text-align: center;">
                We sent you an invite a while back, and we've been busy building. PlaneWX has grown a lot since then — here's what's waiting for you.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(59, 130, 246, 0.1); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.2);">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #60a5fa; text-transform: uppercase; letter-spacing: 1px;">What's New</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">3-Model Weather Soundings</strong> – GFS, HRRR &amp; ECMWF analyzed together for winds, icing &amp; turbulence at every altitude along your route</td></tr>
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">Interactive Route Profile</strong> – See clouds, icing, turbulence &amp; winds from departure to destination with altitude-by-altitude scoring</td></tr>
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">Flyable Band &amp; Optimal Altitude</strong> – AI recommends the best cruise altitude based on your aircraft, winds, and hazards</td></tr>
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">Synoptic Intelligence™</strong> – AI-synthesized weather from 122 NWS forecast offices, updated 4x daily</td></tr>
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">Trip Watchers</strong> – Share your trip with passengers and management so they see WX Score changes in real time</td></tr>
                      <tr><td style="padding: 8px 0; color: #d1d5db; font-size: 15px;">✓ <strong style="color: #ffffff;">Advanced Personal Minimums</strong> – Global + aircraft-specific minimums that calibrate your WX Score</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(139, 92, 246, 0.1); border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.3);">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #a78bfa; text-transform: uppercase; letter-spacing: 1px;">How It Works</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.8; color: #d1d5db;">
                      <strong style="color: #ffffff;">1.</strong> Enter your route and aircraft<br>
                      <strong style="color: #ffffff;">2.</strong> Get an AI-powered briefing with a 0–100 WX Score<br>
                      <strong style="color: #ffffff;">3.</strong> Explore the interactive route profile to see conditions at every altitude<br>
                      <strong style="color: #ffffff;">4.</strong> Share with your passengers or management — let the data speak for itself
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px 40px;">
              <a href="${inviteUrl}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; font-size: 18px; font-weight: 600; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);">Get Started Free →</a>
              <p style="margin: 16px 0 0; font-size: 13px; color: #9ca3af;">Includes a 14-day Pro trial. This link is unique to you and expires in 7 days.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #2a2a4a;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af; text-align: center;">Questions? Just reply to this email — I read every one.</p>
              <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280; text-align: center;">— Mitch, Founder &amp; Pilot</p>
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

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "✈️ PlaneWX has been waiting for you — here's what's new",
        html: emailHtml,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error(`[Waitlist Action] Resend error for ${email}:`, errorData)
      return false
    }

    const result = await response.json()
    console.log(`[Waitlist Action] Email sent to ${email}, id: ${result.id}`)
    return true
  } catch (error) {
    console.error(`[Waitlist Action] Failed to send email to ${email}:`, error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const body: ActionRequest = await request.json()
    const { ids, action, secret } = body

    // Check admin secret
    const expectedSecret = process.env.WAITLIST_ADMIN_SECRET
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No users selected" }, { status: 400 })
    }

    if (!action) {
      return NextResponse.json({ error: "No action specified" }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // Fetch the selected entries
    const { data: entries, error: fetchError } = await supabase
      .from("waitlist")
      .select("*")
      .in("id", ids)

    if (fetchError) {
      console.error("[Waitlist Action] Fetch error:", fetchError)
      return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 })
    }

    if (!entries || entries.length === 0) {
      return NextResponse.json({ error: "No valid entries found" }, { status: 404 })
    }

    const results = { success: 0, failed: 0, skipped: 0 }

    for (const entry of entries) {
      try {
        switch (action) {
          case 'invite': {
            // Only invite pending users
            if (entry.status && entry.status !== 'pending') {
              results.skipped++
              continue
            }
            const token = generateInviteToken()
            const expiresAt = new Date()
            expiresAt.setDate(expiresAt.getDate() + 7)
            
            const emailSent = await sendInviteEmail(entry.email, token)
            if (emailSent) {
              await supabase.from("waitlist").update({
                status: 'invited',
                invited_at: new Date().toISOString(),
                approval_token: token,
                approval_token_expires_at: expiresAt.toISOString(),
              }).eq("id", entry.id)
              results.success++
            } else {
              results.failed++
            }
            // Rate limit: wait 600ms between emails (Resend allows 2/sec)
            await delay(600)
            break
          }

          case 'resend': {
            // Resend to already-invited users (generate new token)
            if (entry.status !== 'invited') {
              results.skipped++
              continue
            }
            const token = generateInviteToken()
            const expiresAt = new Date()
            expiresAt.setDate(expiresAt.getDate() + 7)
            
            const emailSent = await sendInviteEmail(entry.email, token)
            if (emailSent) {
              await supabase.from("waitlist").update({
                invited_at: new Date().toISOString(),
                approval_token: token,
                approval_token_expires_at: expiresAt.toISOString(),
              }).eq("id", entry.id)
              results.success++
            } else {
              results.failed++
            }
            // Rate limit: wait 600ms between emails (Resend allows 2/sec)
            await delay(600)
            break
          }

          case 'reset': {
            // Reset back to pending
            await supabase.from("waitlist").update({
              status: 'pending',
              invited_at: null,
              approval_token: null,
              approval_token_expires_at: null,
            }).eq("id", entry.id)
            results.success++
            break
          }

          case 'revoke': {
            // Revoke the invite (invalidate token)
            if (entry.status !== 'invited') {
              results.skipped++
              continue
            }
            await supabase.from("waitlist").update({
              status: 'revoked',
              approval_token: null,
              approval_token_expires_at: null,
            }).eq("id", entry.id)
            results.success++
            break
          }

          case 'delete': {
            // Delete the entry entirely
            await supabase.from("waitlist").delete().eq("id", entry.id)
            results.success++
            break
          }

          case 'mark_joined': {
            // Manually mark as joined
            await supabase.from("waitlist").update({
              status: 'joined',
              signed_up_at: new Date().toISOString(),
            }).eq("id", entry.id)
            results.success++
            break
          }

          default:
            results.skipped++
        }
      } catch (err) {
        console.error(`[Waitlist Action] Error processing ${entry.email}:`, err)
        results.failed++
      }
    }

    const actionLabels: Record<ActionType, string> = {
      invite: 'invited',
      resend: 'resent invites to',
      reset: 'reset to pending',
      revoke: 'revoked invites for',
      delete: 'deleted',
      mark_joined: 'marked as joined',
    }

    let message = `${actionLabels[action]} ${results.success} user(s)`
    if (results.skipped > 0) {
      message += `, ${results.skipped} skipped`
    }
    if (results.failed > 0) {
      message += `, ${results.failed} failed`
    }

    return NextResponse.json({ message, results })
  } catch (error) {
    console.error("[Waitlist Action] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

