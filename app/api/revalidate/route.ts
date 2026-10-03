import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { SORO_ARTICLE_CONTENT_TAG, SORO_ARTICLES_TAG } from "@/lib/soro"
import { adminSecretFromRequest, checkAdminSecret, getAdminSecret } from "@/lib/admin-auth"

/**
 * On-demand ISR purge for Soro-backed blog pages.
 *
 * Auth: Authorization: Bearer <REVALIDATE_SECRET>
 *   or  X-Admin-Secret header, "secret" in the JSON body, or ?secret=
 * Falls back to WAITLIST_ADMIN_SECRET if REVALIDATE_SECRET is unset.
 * Fails closed (503) when neither is set. Compare is constant time (lib/admin-auth).
 *
 * Optional body/query:
 *   slug — also revalidate /blog/<slug> specifically
 *
 * Examples:
 *   POST /api/revalidate?secret=...
 *   POST /api/revalidate?secret=...&slug=flight-weather-briefer
 *   curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" \
 *     -H "Content-Type: application/json" \
 *     -d '{"slug":"flight-weather-briefer"}' \
 *     https://www.planewx.ai/api/revalidate
 */
function getExpectedSecret(): string | null {
  const revalidate = process.env.REVALIDATE_SECRET?.trim()
  return revalidate || getAdminSecret()
}

function extractSlug(request: NextRequest, body: Record<string, unknown> | null): string | null {
  const fromQuery = request.nextUrl.searchParams.get("slug")
  if (fromQuery) return fromQuery
  if (body && typeof body.slug === "string" && body.slug.trim()) return body.slug.trim()
  return null
}

async function handle(request: NextRequest) {
  const expected = getExpectedSecret()
  if (!expected) {
    return NextResponse.json(
      { error: "Not configured: set REVALIDATE_SECRET (or WAITLIST_ADMIN_SECRET)" },
      { status: 503 }
    )
  }

  let body: Record<string, unknown> | null = null
  if (request.method === "POST") {
    try {
      const text = await request.text()
      if (text) body = JSON.parse(text) as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }
  }

  const secret = adminSecretFromRequest(request, body)
  if (!checkAdminSecret(secret, expected).ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const slug = extractSlug(request, body)

  // Immediate expire so the next request blocks on fresh Soro data (webhook-style).
  revalidateTag(SORO_ARTICLES_TAG, { expire: 0 })
  revalidateTag(SORO_ARTICLE_CONTENT_TAG, { expire: 0 })

  revalidatePath("/blog")
  // Dynamic segment pattern — clears cached slug pages (including sticky 404s).
  revalidatePath("/blog/[slug]", "page")
  if (slug) {
    revalidatePath(`/blog/${slug}`)
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    paths: ["/blog", "/blog/[slug]", ...(slug ? [`/blog/${slug}`] : [])],
    tags: [SORO_ARTICLES_TAG, SORO_ARTICLE_CONTENT_TAG],
  })
}

export async function POST(request: NextRequest) {
  return handle(request)
}

export async function GET(request: NextRequest) {
  // Convenience for browser/cron with ?secret=
  return handle(request)
}
