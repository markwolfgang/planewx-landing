import { createHash, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"

/**
 * Shared admin auth for every admin API route on the landing site.
 *
 * Fails closed: when WAITLIST_ADMIN_SECRET is unset or blank, every request
 * is denied with 503. A missing or wrong secret is denied with 401.
 *
 * Where the secret can come from (first one present wins):
 *   1. X-Admin-Secret header (what /osh/admin and /admin/waitlist send for GETs)
 *   2. Authorization: Bearer <secret> header
 *   3. "secret" field in the JSON body (what the admin pages send for POSTs)
 *   4. ?secret= query param (kept so older links and scripts still work)
 */

export const ADMIN_SECRET_HEADER = "x-admin-secret"

export type AdminAuthResult =
  | { ok: true }
  | { ok: false; status: 401 | 503; error: string }

/** The configured admin secret, or null when it is unset or blank. */
export function getAdminSecret(): string | null {
  const value = process.env.WAITLIST_ADMIN_SECRET
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

/** Constant-time string compare. Hashing first makes the lengths equal. */
export function secretsMatch(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided, "utf8").digest()
  const b = createHash("sha256").update(expected, "utf8").digest()
  return timingSafeEqual(a, b)
}

/**
 * Check a provided secret against the expected one.
 * `expected` defaults to WAITLIST_ADMIN_SECRET. Pass a value to reuse the
 * same fail closed logic for another secret (for example REVALIDATE_SECRET).
 */
export function checkAdminSecret(
  provided: unknown,
  expected: string | null | undefined = getAdminSecret(),
): AdminAuthResult {
  const expectedValue = typeof expected === "string" ? expected.trim() : ""
  if (!expectedValue) {
    return { ok: false, status: 503, error: "Admin access is not configured" }
  }
  const providedValue = typeof provided === "string" ? provided.trim() : ""
  if (!providedValue || !secretsMatch(providedValue, expectedValue)) {
    return { ok: false, status: 401, error: "Unauthorized" }
  }
  return { ok: true }
}

/** Pull the admin secret from a request, in the order listed at the top of this file. */
export function adminSecretFromRequest(
  request: Request,
  body?: unknown,
): string | null {
  const header = request.headers.get(ADMIN_SECRET_HEADER)
  if (header && header.trim()) return header.trim()

  const auth = request.headers.get("authorization")
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim()
    if (token) return token
  }

  if (body && typeof body === "object" && !Array.isArray(body)) {
    const fromBody = (body as Record<string, unknown>).secret
    if (typeof fromBody === "string" && fromBody.trim()) return fromBody.trim()
  }

  try {
    const fromQuery = new URL(request.url).searchParams.get("secret")
    if (fromQuery && fromQuery.trim()) return fromQuery.trim()
  } catch {
    // Relative or malformed URL: no query secret.
  }

  return null
}

/**
 * Route guard. Returns a 401 or 503 response when the request is not allowed,
 * or null when it is. Usage:
 *
 *   const denied = requireAdmin(request, body)
 *   if (denied) return denied
 */
export function requireAdmin(
  request: Request,
  body?: unknown,
  options: { expected?: string | null; headers?: Record<string, string> } = {},
): NextResponse | null {
  const expected = "expected" in options ? options.expected : getAdminSecret()
  const result = checkAdminSecret(adminSecretFromRequest(request, body), expected)
  if (result.ok) return null
  return NextResponse.json(
    { error: result.error },
    { status: result.status, headers: options.headers },
  )
}

/** Parse a JSON body without throwing. Bad or empty JSON becomes {}. */
export async function readJsonBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const parsed = await request.json()
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {}
  } catch {
    return {}
  }
}
