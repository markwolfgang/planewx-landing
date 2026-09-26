/**
 * Verifies inquiry recipient resolution and dry-run submit paths.
 * Uses INQUIRY_EMAIL_DRY_RUN so nothing is emailed.
 *
 * Run: INQUIRY_EMAIL_DRY_RUN=1 npx tsx scripts/verify-ambassadors-inquiry.ts
 */
import assert from "node:assert/strict"
import {
  INQUIRY_HELLO_EMAIL,
  INQUIRY_MARK_EMAIL,
  INQUIRY_SARA_EMAIL,
  resolveAdvisorInquiryRecipients,
  resolveInquiryRecipients,
} from "../lib/inquiry-recipients"
import { ADVISOR_EXPERTISE_OPTIONS } from "../lib/advisor-expertise"

process.env.INQUIRY_EMAIL_DRY_RUN = "1"
delete process.env.PARTNERSHIP_INQUIRY_EMAIL
delete process.env.ADMIN_NOTIFICATION_EMAIL
delete process.env.ADVISOR_INQUIRY_EMAIL

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

function assertAdvisorRecipients(recipients: string[], label: string) {
  assert.ok(
    recipients.includes(INQUIRY_MARK_EMAIL),
    `${label}: missing ${INQUIRY_MARK_EMAIL} in ${JSON.stringify(recipients)}`,
  )
  assert.ok(
    recipients.includes(INQUIRY_SARA_EMAIL),
    `${label}: missing ${INQUIRY_SARA_EMAIL} in ${JSON.stringify(recipients)}`,
  )
}

async function main() {
  const defaults = resolveInquiryRecipients({})
  assert.deepEqual(defaults, [INQUIRY_HELLO_EMAIL, INQUIRY_SARA_EMAIL])

  const withOverride = resolveInquiryRecipients({
    PARTNERSHIP_INQUIRY_EMAIL: "ops@planewx.ai",
  })
  assert.deepEqual(withOverride, ["ops@planewx.ai", INQUIRY_SARA_EMAIL])

  const advisorDefaults = resolveAdvisorInquiryRecipients({})
  assert.deepEqual(advisorDefaults, [INQUIRY_MARK_EMAIL, INQUIRY_SARA_EMAIL])

  const advisorOverride = resolveAdvisorInquiryRecipients({
    ADVISOR_INQUIRY_EMAIL: "board@planewx.ai",
  })
  assert.ok(advisorOverride.includes("board@planewx.ai"))
  assertAdvisorRecipients(advisorOverride, "advisor override")

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
  assertIncludesBoth(body.to, "ambassadors dry-run")

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

  const { POST: advisorPost } = await import("../app/api/advisors/inquiry/route")
  const advisorOk = await advisorPost(
    new Request("http://localhost/api/advisors/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.5",
      },
      body: JSON.stringify({
        name: "Advisor Name",
        email: "advisor@example.com",
        phone: "",
        linkedin: "https://linkedin.com/in/example",
        background: "ATP, CFI, type club leadership",
        expertise: [ADVISOR_EXPERTISE_OPTIONS[0], ADVISOR_EXPERTISE_OPTIONS[4]],
        why: "Want to help pilots fly like professionals.",
      }),
    }),
  )
  const advisorBody = await advisorOk.json()
  assert.equal(advisorOk.status, 200, JSON.stringify(advisorBody))
  assert.equal(advisorBody.dryRun, true)
  assertAdvisorRecipients(advisorBody.to, "advisors dry-run")
  assert.equal(advisorBody.received.name, "Advisor Name")

  const advisorMissingExpertise = await advisorPost(
    new Request("http://localhost/api/advisors/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.6",
      },
      body: JSON.stringify({
        name: "Advisor Name",
        email: "advisor@example.com",
        background: "ATP",
        expertise: [],
        why: "Curious about PlaneWX.",
      }),
    }),
  )
  assert.equal(advisorMissingExpertise.status, 400)

  console.log(
    "OK: partners/ambassadors To hello@+sara@; advisors To mark@+sara@; dry-runs pass",
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
