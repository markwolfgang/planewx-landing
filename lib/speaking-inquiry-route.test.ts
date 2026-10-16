// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

// Mocked mailer: nothing in this file can reach Resend or send real email.
const send = vi.fn()
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send } })),
}))

import { POST } from "@/app/api/events/speaking-inquiry/route"

const BODY = {
  name: "Pat Pilot",
  email: "Pat@Example.com",
  org: "Example Pilots Association",
  eventName: "Example Safety Day",
  eventDates: "Mar 12-14, 2027",
  location: "Lakeland, FL",
  audienceSize: "150",
  message: "We would like a talk on go/no-go decisions.",
}

let ip = 0
function req(body: unknown) {
  ip += 1
  return new Request("http://localhost/api/events/speaking-inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `198.51.100.${ip}` },
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
}

const ENV_KEYS = [
  "INQUIRY_EMAIL_DRY_RUN",
  "VERCEL_ENV",
  "RESEND_API_KEY",
  "PARTNERSHIP_INQUIRY_EMAIL",
  "ADMIN_NOTIFICATION_EMAIL",
  "FROM_EMAIL",
  "EMAIL_FROM",
] as const
const saved: Record<string, string | undefined> = {}

beforeEach(() => {
  for (const k of ENV_KEYS) {
    saved[k] = process.env[k]
    delete process.env[k]
  }
  send.mockReset()
  send.mockResolvedValue({ data: { id: "test" }, error: null })
})
afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k]
    else process.env[k] = saved[k]
  }
})

describe("POST /api/events/speaking-inquiry", () => {
  it("dry run (forced) answers success without calling the mailer or echoing recipients", async () => {
    process.env.INQUIRY_EMAIL_DRY_RUN = "1"
    process.env.VERCEL_ENV = "production"
    process.env.RESEND_API_KEY = "test-key-not-real"
    const res = await POST(req(BODY))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.dryRun).toBe(true)
    expect(json.to).toBeUndefined()
    expect(JSON.stringify(json)).not.toContain("@planewx.ai")
    expect(send).not.toHaveBeenCalled()
  })

  it("is dry run by default outside production, even with a mail key set", async () => {
    process.env.RESEND_API_KEY = "test-key-not-real"
    const log = vi.spyOn(console, "log").mockImplementation(() => {})
    const info = vi.spyOn(console, "info").mockImplementation(() => {})
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const err = vi.spyOn(console, "error").mockImplementation(() => {})
    try {
      for (const env of [undefined, "preview", "development"]) {
        if (env === undefined) delete process.env.VERCEL_ENV
        else process.env.VERCEL_ENV = env
        const res = await POST(req(BODY))
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.dryRun).toBe(true)
        expect(JSON.stringify(json)).not.toContain("@planewx.ai")
      }
      expect(send).not.toHaveBeenCalled()
      const logged = [log, info, warn, err].flatMap((s) => s.mock.calls).map((c) => c.join(" "))
      expect(logged.join("\n")).not.toContain("@planewx.ai")
    } finally {
      log.mockRestore()
      info.mockRestore()
      warn.mockRestore()
      err.mockRestore()
    }
  })

  it("INQUIRY_EMAIL_DRY_RUN=0 allows a real (mocked) send outside production", async () => {
    process.env.INQUIRY_EMAIL_DRY_RUN = "0"
    process.env.VERCEL_ENV = "preview"
    process.env.RESEND_API_KEY = "test-key-not-real"
    const res = await POST(req(BODY))
    expect(res.status).toBe(200)
    expect(send).toHaveBeenCalledTimes(1)
  })

  it("silently accepts and drops a filled honeypot", async () => {
    process.env.VERCEL_ENV = "production"
    process.env.RESEND_API_KEY = "test-key-not-real"
    for (const body of [
      { ...BODY, website: "https://spam.example" },
      { website: "x" },
    ]) {
      const res = await POST(req(body))
      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toEqual({ success: true, message: "Thanks. We got your request and will reply soon." })
    }
    expect(send).not.toHaveBeenCalled()
  })

  it("an empty honeypot does not block a real request", async () => {
    process.env.VERCEL_ENV = "production"
    process.env.RESEND_API_KEY = "test-key-not-real"
    const res = await POST(req({ ...BODY, website: "" }))
    expect(res.status).toBe(200)
    expect(send).toHaveBeenCalledTimes(1)
  })

  it("sends one email to hello@ and sara@ with a speaking request subject and every field (mocked mailer)", async () => {
    process.env.VERCEL_ENV = "production"
    process.env.RESEND_API_KEY = "test-key-not-real"
    const res = await POST(req(BODY))
    expect(res.status).toBe(200)
    expect(send).toHaveBeenCalledTimes(1)
    const arg = send.mock.calls[0][0]
    expect(arg.to).toEqual(["hello@planewx.ai", "sara@planewx.ai"])
    expect(arg.replyTo).toEqual(["pat@example.com"])
    expect(arg.from).toBe("PlaneWX <hello@planewx.ai>")
    expect(arg.subject).toBe("Speaking request: Example Safety Day (Example Pilots Association)")
    for (const [label, value] of [
      ["Name", "Pat Pilot"],
      ["Email", "pat@example.com"],
      ["Organization", "Example Pilots Association"],
      ["Event name", "Example Safety Day"],
      ["Event date(s)", "Mar 12-14, 2027"],
      ["Location", "Lakeland, FL"],
      ["Audience size", "150"],
    ]) {
      expect(arg.html).toContain(`>${label}</td>`)
      expect(arg.html).toContain(`>${value}</td>`)
    }
    expect(arg.html).toContain(BODY.message)
  })

  it("rejects a missing required field with 400 and does not send", async () => {
    process.env.RESEND_API_KEY = "test-key-not-real"
    const res = await POST(req({ ...BODY, location: "" }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe("Location is required")
    expect(send).not.toHaveBeenCalled()
  })

  it("rejects invalid JSON with 400", async () => {
    const res = await POST(req("{not json"))
    expect(res.status).toBe(400)
  })

  it("rate limits repeated posts from one client", async () => {
    process.env.INQUIRY_EMAIL_DRY_RUN = "1"
    const make = () =>
      new Request("http://localhost/api/events/speaking-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.77" },
        body: JSON.stringify(BODY),
      })
    const codes: number[] = []
    for (let i = 0; i < 6; i++) codes.push((await POST(make())).status)
    expect(codes.slice(0, 5)).toEqual([200, 200, 200, 200, 200])
    expect(codes[5]).toBe(429)
  })

  it("returns 500 when the mail key is missing outside dry run", async () => {
    process.env.VERCEL_ENV = "production"
    const res = await POST(req(BODY))
    expect(res.status).toBe(500)
    expect(send).not.toHaveBeenCalled()
  })
})
