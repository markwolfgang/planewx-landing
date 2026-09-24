type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

/**
 * Simple in-process rate limit for inquiry POSTs.
 * Best-effort on serverless (per-instance); still blocks naive flood loops.
 */
export function takeInquiryRateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
  const existing = buckets.get(key)
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }
  if (existing.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    }
  }
  existing.count += 1
  return { ok: true }
}

export function inquiryClientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() || "unknown"
  return `${scope}:${ip}`
}
