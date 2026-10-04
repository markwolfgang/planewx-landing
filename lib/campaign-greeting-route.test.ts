// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

/**
 * Cache-Control for /api/campaign-greeting: null answers must be no-store so a
 * newly added code is not stuck behind a CDN-cached empty response. Real
 * greetings keep the long public cache header.
 */

type QueryResult = { data: { greeting: string | null } | null; error: null }

const mocks = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.test"
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key"

  let result: QueryResult = { data: null, error: null }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chain: any = {
    from: () => chain,
    select: () => chain,
    eq: () => chain,
    not: () => chain,
    maybeSingle: async () => result,
  }

  return {
    chain,
    setResult: (next: QueryResult) => {
      result = next
    },
  }
})

const createClient = vi.fn(() => mocks.chain)

vi.mock("@supabase/supabase-js", () => ({
  createClient: (...args: unknown[]) => createClient(...(args as [])),
}))

const ORIGINAL_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const ORIGINAL_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

beforeEach(() => {
  createClient.mockClear()
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.test"
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key"
  mocks.setResult({ data: null, error: null })
  vi.spyOn(console, "error").mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  if (ORIGINAL_URL === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL
  else process.env.NEXT_PUBLIC_SUPABASE_URL = ORIGINAL_URL
  if (ORIGINAL_KEY === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY
  else process.env.SUPABASE_SERVICE_ROLE_KEY = ORIGINAL_KEY
})

async function call(code: string | null): Promise<Response> {
  const { GET } = await import("@/app/api/campaign-greeting/route")
  const url = new URL("https://landing.test/api/campaign-greeting")
  if (code !== null) url.searchParams.set("code", code)
  return GET(new NextRequest(url))
}

describe("GET /api/campaign-greeting cache headers", () => {
  it("returns no-store for an invalid code", async () => {
    const res = await call("x")
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ greeting: null })
    expect(res.headers.get("Cache-Control")).toBe("no-store")
    expect(createClient).not.toHaveBeenCalled()
  })

  it("returns no-store for an unknown code with no row", async () => {
    mocks.setResult({ data: null, error: null })
    const res = await call("TESTCODE")
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ greeting: null })
    expect(res.headers.get("Cache-Control")).toBe("no-store")
    expect(createClient).toHaveBeenCalled()
  })

  it("returns no-store when the row has a null greeting", async () => {
    mocks.setResult({ data: { greeting: null }, error: null })
    const res = await call("TESTCODE")
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ greeting: null })
    expect(res.headers.get("Cache-Control")).toBe("no-store")
  })

  it("returns the 3600 cache header for a real greeting", async () => {
    mocks.setResult({ data: { greeting: "Welcome, TESTCODE pilots." }, error: null })
    const res = await call("TESTCODE")
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ greeting: "Welcome, TESTCODE pilots." })
    expect(res.headers.get("Cache-Control")).toBe(
      "public, s-maxage=3600, stale-while-revalidate=86400",
    )
  })

  it("returns no-store on the missing-env error path", async () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    const res = await call("TESTCODE")
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ greeting: null })
    expect(res.headers.get("Cache-Control")).toBe("no-store")
    expect(createClient).not.toHaveBeenCalled()
  })
})
