// @vitest-environment node
import fs from "node:fs"
import path from "node:path"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

/**
 * Every admin API route must deny when WAITLIST_ADMIN_SECRET is unset (503),
 * deny a missing or wrong secret (401), and only reach the database when the
 * secret is right. Supabase is mocked, so no real data is touched.
 */

const mocks = vi.hoisted(() => {
  // Module level env reads in the waitlist routes happen at import time.
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.test"
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key"

  const result = { data: null, error: { message: "mock db" } }
  // Chainable stand in for a supabase client: any call or property returns
  // itself, and awaiting it yields a db error so routes stop right after auth.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chain: any = new Proxy(function () {}, {
    get(_target, prop) {
      if (prop === "then") return (resolve: (v: unknown) => void) => resolve(result)
      return chain
    },
    apply() {
      return chain
    },
  })
  return { chain }
})

const createClient = vi.fn(() => mocks.chain)
const revalidateTag = vi.fn()
const revalidatePath = vi.fn()

vi.mock("@supabase/supabase-js", () => ({ createClient: (...args: unknown[]) => createClient(...(args as [])) }))
vi.mock("next/cache", () => ({
  revalidateTag: (...args: unknown[]) => revalidateTag(...(args as [])),
  revalidatePath: (...args: unknown[]) => revalidatePath(...(args as [])),
}))

// Dummy values for tests only. Not real secrets.
const RIGHT = "test-only-admin-secret-0123456789"
const WRONG = "test-only-wrong-secret"

type Method = "GET" | "POST"
type AdminRoute = {
  file: string
  method: Method
  /** How the admin page sends the secret today: query for GETs, JSON body for POSTs. */
  legacy: "query" | "body"
  load: () => Promise<Record<string, unknown>>
  /** Did the handler get past auth? */
  reachedHandler: () => boolean
}

const usedDb = () => createClient.mock.calls.length > 0

const ADMIN_ROUTES: AdminRoute[] = [
  { file: "app/api/waitlist/list/route.ts", method: "GET", legacy: "query", load: () => import("@/app/api/waitlist/list/route"), reachedHandler: usedDb },
  { file: "app/api/waitlist/action/route.ts", method: "POST", legacy: "body", load: () => import("@/app/api/waitlist/action/route"), reachedHandler: usedDb },
  { file: "app/api/waitlist/invite/route.ts", method: "POST", legacy: "body", load: () => import("@/app/api/waitlist/invite/route"), reachedHandler: usedDb },
  { file: "app/api/waitlist/mark-joined/route.ts", method: "POST", legacy: "body", load: () => import("@/app/api/waitlist/mark-joined/route"), reachedHandler: usedDb },
  { file: "app/api/waitlist/sync-joined/route.ts", method: "POST", legacy: "body", load: () => import("@/app/api/waitlist/sync-joined/route"), reachedHandler: usedDb },
  { file: "app/api/osh/list/route.ts", method: "GET", legacy: "query", load: () => import("@/app/api/osh/list/route"), reachedHandler: usedDb },
  { file: "app/api/osh/draw/route.ts", method: "POST", legacy: "body", load: () => import("@/app/api/osh/draw/route"), reachedHandler: usedDb },
  { file: "app/api/osh/skip/route.ts", method: "POST", legacy: "body", load: () => import("@/app/api/osh/skip/route"), reachedHandler: usedDb },
  { file: "app/api/revalidate/route.ts", method: "GET", legacy: "query", load: () => import("@/app/api/revalidate/route"), reachedHandler: () => revalidateTag.mock.calls.length > 0 },
  { file: "app/api/revalidate/route.ts", method: "POST", legacy: "body", load: () => import("@/app/api/revalidate/route"), reachedHandler: () => revalidateTag.mock.calls.length > 0 },
]

/** Request body for each POST route that would pass validation after auth. */
const VALID_BODY: Record<string, Record<string, unknown>> = {
  "app/api/waitlist/action/route.ts": { ids: ["id-1"], action: "approve" },
  "app/api/waitlist/invite/route.ts": { ids: ["id-1"] },
  "app/api/waitlist/mark-joined/route.ts": { email: "person@example.test" },
  "app/api/waitlist/sync-joined/route.ts": {},
  "app/api/osh/draw/route.ts": { prize: "sunglasses", event: "meetup" },
  "app/api/osh/skip/route.ts": { drawId: "draw-1" },
  "app/api/revalidate/route.ts": {},
}

type Supply = { via: "none" } | { via: "header" | "bearer" | "query" | "body"; value: string }

function buildRequest(route: AdminRoute, supply: Supply): NextRequest {
  const url = new URL(`https://landing.test/${route.file.replace(/^app\//, "").replace(/\/route\.ts$/, "")}`)
  const headers: Record<string, string> = {}
  const body: Record<string, unknown> = { ...(VALID_BODY[route.file] ?? {}) }
  if (supply.via === "header") headers["x-admin-secret"] = supply.value
  if (supply.via === "bearer") headers.authorization = `Bearer ${supply.value}`
  if (supply.via === "query") url.searchParams.set("secret", supply.value)
  if (supply.via === "body") body.secret = supply.value
  if (route.method === "GET") return new NextRequest(url, { method: "GET", headers })
  headers["content-type"] = "application/json"
  return new NextRequest(url, { method: "POST", headers, body: JSON.stringify(body) })
}

async function call(route: AdminRoute, supply: Supply): Promise<Response> {
  const mod = await route.load()
  const handler = mod[route.method] as (req: NextRequest) => Promise<Response>
  expect(typeof handler).toBe("function")
  return handler(buildRequest(route, supply))
}

const ORIGINAL_ADMIN = process.env.WAITLIST_ADMIN_SECRET
const ORIGINAL_REVALIDATE = process.env.REVALIDATE_SECRET

beforeEach(() => {
  createClient.mockClear()
  revalidateTag.mockClear()
  revalidatePath.mockClear()
  delete process.env.WAITLIST_ADMIN_SECRET
  delete process.env.REVALIDATE_SECRET
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 500 })))
  vi.spyOn(console, "error").mockImplementation(() => {})
  vi.spyOn(console, "log").mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  if (ORIGINAL_ADMIN === undefined) delete process.env.WAITLIST_ADMIN_SECRET
  else process.env.WAITLIST_ADMIN_SECRET = ORIGINAL_ADMIN
  if (ORIGINAL_REVALIDATE === undefined) delete process.env.REVALIDATE_SECRET
  else process.env.REVALIDATE_SECRET = ORIGINAL_REVALIDATE
})

describe.each(ADMIN_ROUTES.map((r) => [`${r.method} ${r.file}`, r] as const))("%s", (_name, route) => {
  it("unset secret denies everyone with 503 and never reaches the handler", async () => {
    for (const supply of [
      { via: "none" },
      { via: "header", value: RIGHT },
      { via: route.legacy, value: RIGHT },
      { via: route.legacy, value: "" },
    ] as Supply[]) {
      const res = await call(route, supply)
      expect(res.status).toBe(503)
    }
    expect(route.reachedHandler()).toBe(false)
  })

  it("blank secret denies everyone with 503", async () => {
    process.env.WAITLIST_ADMIN_SECRET = "   "
    const res = await call(route, { via: "header", value: "   " })
    expect(res.status).toBe(503)
    expect(route.reachedHandler()).toBe(false)
  })

  it("missing or wrong secret is denied with 401 and never reaches the handler", async () => {
    process.env.WAITLIST_ADMIN_SECRET = RIGHT
    for (const supply of [
      { via: "none" },
      { via: "header", value: WRONG },
      { via: "bearer", value: WRONG },
      { via: route.legacy, value: WRONG },
      { via: route.legacy, value: RIGHT.slice(0, -1) },
    ] as Supply[]) {
      const res = await call(route, supply)
      expect(res.status).toBe(401)
    }
    expect(route.reachedHandler()).toBe(false)
  })

  it("right secret in the X-Admin-Secret header is allowed", async () => {
    process.env.WAITLIST_ADMIN_SECRET = RIGHT
    const res = await call(route, { via: "header", value: RIGHT })
    expect([401, 503]).not.toContain(res.status)
    expect(route.reachedHandler()).toBe(true)
  })

  it(`right secret sent the way the admin page sends it (${route.legacy}) is allowed`, async () => {
    process.env.WAITLIST_ADMIN_SECRET = RIGHT
    const res = await call(route, { via: route.legacy, value: RIGHT })
    expect([401, 503]).not.toContain(res.status)
    expect(route.reachedHandler()).toBe(true)
  })
})

describe("revalidate keeps REVALIDATE_SECRET first", () => {
  const route = ADMIN_ROUTES.find((r) => r.file === "app/api/revalidate/route.ts")!

  it("accepts REVALIDATE_SECRET and rejects the admin secret when both are set", async () => {
    process.env.WAITLIST_ADMIN_SECRET = RIGHT
    process.env.REVALIDATE_SECRET = "test-only-revalidate-secret"
    expect((await call(route, { via: "bearer", value: "test-only-revalidate-secret" })).status).toBe(200)
    expect((await call(route, { via: "bearer", value: RIGHT })).status).toBe(401)
  })
})

describe("admin route wiring", () => {
  const root = path.resolve(__dirname, "..")
  const apiDir = path.join(root, "app/api")

  function routeFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return routeFiles(full)
      return entry.name === "route.ts" ? [path.relative(root, full)] : []
    })
  }

  it("every route that uses the admin helper is covered by the tests above, and vice versa", () => {
    const usingHelper = routeFiles(apiDir)
      .filter((file) => /from "@\/lib\/admin-auth"/.test(fs.readFileSync(path.join(root, file), "utf8")))
      .sort()
    const tested = [...new Set(ADMIN_ROUTES.map((r) => r.file))].sort()
    expect(usingHelper).toEqual(tested)
  })

  it("no route reads WAITLIST_ADMIN_SECRET or compares a secret on its own", () => {
    for (const file of routeFiles(apiDir)) {
      const src = fs.readFileSync(path.join(root, file), "utf8")
      expect(src, file).not.toMatch(/process\.env\.WAITLIST_ADMIN_SECRET/)
      expect(src, file).not.toMatch(/secret\s*[!=]==/i)
      expect(src, file).not.toMatch(/[!=]==\s*expected/i)
    }
  })

  it("every route that reads a secret field goes through the admin helper", () => {
    for (const file of routeFiles(apiDir)) {
      const src = fs.readFileSync(path.join(root, file), "utf8")
      const readsSecret = /\bsecret\b/i.test(src.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, ""))
      if (readsSecret) {
        expect(src, file).toMatch(/from "@\/lib\/admin-auth"/)
      }
    }
  })

  it("lib/osh-admin stays client safe (no node:crypto, no admin secret)", () => {
    const src = fs.readFileSync(path.join(root, "lib/osh-admin.ts"), "utf8")
    expect(src).not.toMatch(/node:crypto|from "crypto"/)
    expect(src).not.toMatch(/process\.env\.WAITLIST_ADMIN_SECRET/)
  })
})
