import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { SORO_ARTICLE_CONTENT_TAG, SORO_ARTICLES_TAG } from "@/lib/soro"

/**
 * On-demand ISR purge for Soro-backed blog pages.
 *
 * Auth: Authorization: Bearer <REVALIDATE_SECRET>
 *   or  ?secret=<REVALIDATE_SECRET>
 * Falls back to WAITLIST_ADMIN_SECRET if REVALIDATE_SECRET is unset.
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
function getExpectedSecret(): string | undefined {
  return process.env.REVALIDATE_SECRET || process.env.WAITLIST_ADMIN_SECRET
}

function extractSecret(request: NextRequest, body: Record<string, unknown> | null): string | null {
  const auth = request.headers.get("authorization")
  if (auth?.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim() || null
  }
  const fromQuery = request.nextUrl.searchParams.get("secret")
  if (fromQuery) return fromQuery
  if (body && typeof body.secret === "string") return body.secret
  return null
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
      { status: 500 }
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

  const secret = extractSecret(request, body)
  if (!secret || secret !== expected) {
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
