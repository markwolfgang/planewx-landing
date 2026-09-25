/**
 * Verifies inquiry recipient resolution and dry-run submit paths.
 * Uses INQUIRY_EMAIL_DRY_RUN so nothing is emailed.
 *
 * Run: INQUIRY_EMAIL_DRY_RUN=1 npx tsx scripts/verify-ambassadors-inquiry.ts
 */
import assert from "node:assert/strict"
import {
  INQUIRY_HELLO_EMAIL,
  INQUIRY_SARA_EMAIL,
  resolveInquiryRecipients,
} from "../lib/inquiry-recipients"

process.env.INQUIRY_EMAIL_DRY_RUN = "1"
delete process.env.PARTNERSHIP_INQUIRY_EMAIL
delete process.env.ADMIN_NOTIFICATION_EMAIL

function assertIncludesBoth(recipients: string[], label: string) {
  assert.ok(
    recipients.includes(INQUIRY_HELLO_EMAIL),
    `${label}: missing ${INQUIRY_HELLO_EMAIL} in ${JSON.stringify(recipients)}`,
  )
  assert.ok(
    recipients.includes(INQUIRY_SARA_EMAIL),
    `${label}: missing ${INQUIRY_SARA_EMAIL} in ${JSON.stringify(recipients)}`,
  )
}

async function main() {
  // Default: both hello@ and sara@ as To recipients
  const defaults = resolveInquiryRecipients({})
  assert.deepEqual(defaults, [INQUIRY_HELLO_EMAIL, INQUIRY_SARA_EMAIL])

  // Override replaces hello default but still adds sara@
  const withOverride = resolveInquiryRecipients({
    PARTNERSHIP_INQUIRY_EMAIL: "ops@planewx.ai",
  })
  assert.deepEqual(withOverride, ["ops@planewx.ai", INQUIRY_SARA_EMAIL])

  // Override that already lists sara@ does not duplicate
  const saraAlready = resolveInquiryRecipients({
    PARTNERSHIP_INQUIRY_EMAIL: `hello@planewx.ai, ${INQUIRY_SARA_EMAIL}`,
  })
  assert.deepEqual(saraAlready, [INQUIRY_HELLO_EMAIL, INQUIRY_SARA_EMAIL])

  // Override that is only sara@: still just sara@ (already included)
  const saraOnly = resolveInquiryRecipients({
    ADMIN_NOTIFICATION_EMAIL: INQUIRY_SARA_EMAIL,
  })
  assert.deepEqual(saraOnly, [INQUIRY_SARA_EMAIL])

  const { POST } = await import("../app/api/ambassadors/inquiry/route")

  const handle = "N123AB / @pilot"
  const payload = {
    org: handle,
    name: handle,
    email: "pilot@example.com",
    note: "Flight instructor (CFI)",
  }

  const response = await POST(
    new Request("http://localhost/api/ambassadors/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.1",
      },
      body: JSON.stringify(payload),
    }),
  )
  const body = await response.json()

  assert.equal(
    response.status,
    200,
    `expected 200, got ${response.status}: ${JSON.stringify(body)}`,
  )
  assert.equal(body.success, true)
  assert.equal(body.dryRun, true)
  assert.equal(body.received.org, handle)
  assert.equal(body.received.name, handle)
  assert.equal(body.received.email, "pilot@example.com")
  assert.equal(body.received.note, "Flight instructor (CFI)")
  assertIncludesBoth(body.to, "ambassadors dry-run")

  // Route still requires name; client maps handle -> name
  const missingName = await POST(
    new Request("http://localhost/api/ambassadors/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.2",
      },
      body: JSON.stringify({
        org: handle,
        email: "pilot@example.com",
        note: "Flight instructor (CFI)",
      }),
    }),
  )
  const missingBody = await missingName.json()
  assert.equal(missingName.status, 400)
  assert.match(String(missingBody.error || ""), /Name/i)

  // Partners dry-run also returns both recipients
  const { POST: partnerPost } = await import("../app/api/partners/inquiry/route")
  const partnerOk = await partnerPost(
    new Request("http://localhost/api/partners/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.3",
      },
      body: JSON.stringify({
        org: "COPA",
        name: "Partner Pilot",
        email: "partner@example.com",
        note: "Co-marketing idea",
      }),
    }),
  )
  const partnerBody = await partnerOk.json()
  assert.equal(partnerOk.status, 200, JSON.stringify(partnerBody))
  assert.equal(partnerBody.dryRun, true)
  assertIncludesBoth(partnerBody.to, "partners dry-run")

  const partnerMissing = await partnerPost(
    new Request("http://localhost/api/partners/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.4",
      },
      body: JSON.stringify({
        org: "COPA",
        email: "partner@example.com",
        note: "Co-marketing idea",
      }),
    }),
  )
  assert.equal(partnerMissing.status, 400)

  console.log(
    "OK: inquiry dry-run To includes hello@planewx.ai and sara@planewx.ai; ambassadors single-handle + partners name required",
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
