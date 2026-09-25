/**
 * Verifies the ambassadors inquiry submit path after collapsing to one
 * "Name or handle" field. Uses INQUIRY_EMAIL_DRY_RUN so nothing is emailed.
 *
 * Run: INQUIRY_EMAIL_DRY_RUN=1 npx tsx scripts/verify-ambassadors-inquiry.ts
 */
import assert from "node:assert/strict"

process.env.INQUIRY_EMAIL_DRY_RUN = "1"

async function main() {
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

  // Partners route is separate; confirm it still requires its own name field
  // and is untouched by this ambassadors-only mapping.
  const { POST: partnerPost } = await import("../app/api/partners/inquiry/route")
  process.env.INQUIRY_EMAIL_DRY_RUN = "1"
  // Partners route has no dry-run; only validate the 400 path (no email send).
  const partnerMissing = await partnerPost(
    new Request("http://localhost/api/partners/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.3",
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
    "OK: ambassadors inquiry accepts single-handle payload (name=handle); partner route still requires name",
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
