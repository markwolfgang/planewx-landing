// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import {
  ADMIN_SECRET_HEADER,
  adminSecretFromRequest,
  checkAdminSecret,
  getAdminSecret,
  readJsonBody,
  requireAdmin,
  secretsMatch,
} from "@/lib/admin-auth"

// Dummy value for tests only. Not a real secret.
const RIGHT = "test-only-admin-secret-0123456789"

const ORIGINAL = process.env.WAITLIST_ADMIN_SECRET

beforeEach(() => {
  delete process.env.WAITLIST_ADMIN_SECRET
})

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.WAITLIST_ADMIN_SECRET
  else process.env.WAITLIST_ADMIN_SECRET = ORIGINAL
})

describe("getAdminSecret", () => {
  it("returns null when WAITLIST_ADMIN_SECRET is unset", () => {
    expect(getAdminSecret()).toBeNull()
  })

  it("returns null when WAITLIST_ADMIN_SECRET is empty or blank", () => {
    process.env.WAITLIST_ADMIN_SECRET = ""
    expect(getAdminSecret()).toBeNull()
    process.env.WAITLIST_ADMIN_SECRET = "   "
    expect(getAdminSecret()).toBeNull()
  })

  it("returns the configured secret", () => {
    process.env.WAITLIST_ADMIN_SECRET = RIGHT
    expect(getAdminSecret()).toBe(RIGHT)
  })
})

describe("secretsMatch", () => {
  it("is true only for identical strings", () => {
    expect(secretsMatch(RIGHT, RIGHT)).toBe(true)
    expect(secretsMatch(RIGHT + "x", RIGHT)).toBe(false)
    expect(secretsMatch(RIGHT.slice(0, -1), RIGHT)).toBe(false)
    expect(secretsMatch("", RIGHT)).toBe(false)
    expect(secretsMatch(RIGHT.toUpperCase(), RIGHT)).toBe(false)
  })
})

describe("checkAdminSecret", () => {
  it("denies everyone with 503 when the secret is unset, even a matching empty value", () => {
    expect(checkAdminSecret(RIGHT)).toEqual({ ok: false, status: 503, error: expect.any(String) })
    expect(checkAdminSecret("")).toMatchObject({ ok: false, status: 503 })
    expect(checkAdminSecret(undefined)).toMatchObject({ ok: false, status: 503 })
    expect(checkAdminSecret(null)).toMatchObject({ ok: false, status: 503 })
  })

  it("denies everyone with 503 when the secret is blank", () => {
    process.env.WAITLIST_ADMIN_SECRET = "  "
    expect(checkAdminSecret("  ")).toMatchObject({ ok: false, status: 503 })
    expect(checkAdminSecret("")).toMatchObject({ ok: false, status: 503 })
  })

  it("denies a missing or wrong secret with 401", () => {
    process.env.WAITLIST_ADMIN_SECRET = RIGHT
    expect(checkAdminSecret(undefined)).toMatchObject({ ok: false, status: 401 })
    expect(checkAdminSecret("")).toMatchObject({ ok: false, status: 401 })
    expect(checkAdminSecret("wrong")).toMatchObject({ ok: false, status: 401 })
    expect(checkAdminSecret(12345)).toMatchObject({ ok: false, status: 401 })
    expect(checkAdminSecret({ secret: RIGHT })).toMatchObject({ ok: false, status: 401 })
  })

  it("allows the right secret, ignoring surrounding whitespace", () => {
    process.env.WAITLIST_ADMIN_SECRET = RIGHT
    expect(checkAdminSecret(RIGHT)).toEqual({ ok: true })
    expect(checkAdminSecret(`  ${RIGHT}\n`)).toEqual({ ok: true })
  })

  it("uses an explicit expected value when given one", () => {
    expect(checkAdminSecret("other", "other")).toEqual({ ok: true })
    expect(checkAdminSecret("other", null)).toMatchObject({ ok: false, status: 503 })
    expect(checkAdminSecret("x", "other")).toMatchObject({ ok: false, status: 401 })
  })
})

describe("adminSecretFromRequest", () => {
  it("reads the X-Admin-Secret header first", () => {
    const req = new Request("https://x.test/api?secret=fromquery", {
      headers: { [ADMIN_SECRET_HEADER]: "fromheader", authorization: "Bearer frombearer" },
    })
    expect(adminSecretFromRequest(req, { secret: "frombody" })).toBe("fromheader")
  })

  it("then Authorization Bearer, then body, then query", () => {
    const withBearer = new Request("https://x.test/api?secret=fromquery", {
      headers: { authorization: "Bearer frombearer" },
    })
    expect(adminSecretFromRequest(withBearer, { secret: "frombody" })).toBe("frombearer")

    const withBody = new Request("https://x.test/api?secret=fromquery")
    expect(adminSecretFromRequest(withBody, { secret: "frombody" })).toBe("frombody")

    const withQuery = new Request("https://x.test/api?secret=fromquery")
    expect(adminSecretFromRequest(withQuery, {})).toBe("fromquery")
  })

  it("returns null when nothing is supplied", () => {
    expect(adminSecretFromRequest(new Request("https://x.test/api"))).toBeNull()
    expect(adminSecretFromRequest(new Request("https://x.test/api"), { secret: 42 })).toBeNull()
  })
})

describe("requireAdmin", () => {
  it("returns 503 when unset, 401 when wrong, null when right", async () => {
    const req = (secret?: string) =>
      new Request("https://x.test/api", {
        headers: secret ? { [ADMIN_SECRET_HEADER]: secret } : {},
      })

    const unset = requireAdmin(req(RIGHT))
    expect(unset?.status).toBe(503)

    process.env.WAITLIST_ADMIN_SECRET = RIGHT
    const missing = requireAdmin(req())
    expect(missing?.status).toBe(401)
    const wrong = requireAdmin(req("wrong"))
    expect(wrong?.status).toBe(401)
    expect(await wrong?.json()).toEqual({ error: "Unauthorized" })

    expect(requireAdmin(req(RIGHT))).toBeNull()
  })
})

describe("readJsonBody", () => {
  it("returns {} for bad, empty or non-object JSON", async () => {
    const post = (body: string) =>
      new Request("https://x.test/api", { method: "POST", body })
    expect(await readJsonBody(post("not json"))).toEqual({})
    expect(await readJsonBody(post(""))).toEqual({})
    expect(await readJsonBody(post("[1,2]"))).toEqual({})
    expect(await readJsonBody(post('{"a":1}'))).toEqual({ a: 1 })
  })
})
