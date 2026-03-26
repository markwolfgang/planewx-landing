import { NextRequest, NextResponse } from "next/server"

const VARIANT_WEIGHTS: Record<string, number> = {
  a: 25,
  b: 25,
  c: 25,
  d: 25,
}

const COOKIE_NAME = "planewx-variant"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

const BRAND_AUTH_COOKIE = "planewx-brand-auth"
const BRAND_AUTH_MAX_AGE = 60 * 60 * 24 * 90 // 90 days

const BOT_UA_PATTERN =
  /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|Twitterbot|LinkedInBot/i

function pickVariant(): string {
  const active = Object.entries(VARIANT_WEIGHTS).filter(([, w]) => w > 0)
  const total = active.reduce((sum, [, w]) => sum + w, 0)
  let r = Math.random() * total
  for (const [variant, weight] of active) {
    r -= weight
    if (r <= 0) return variant
  }
  return active[active.length - 1][0]
}

function handleBrandAuth(request: NextRequest): NextResponse | null {
  const password = process.env.BRAND_PORTAL_PASSWORD
  if (!password) return null // no password set = no protection

  const authed = request.cookies.get(BRAND_AUTH_COOKIE)?.value
  if (authed === "true") return null // already authenticated

  // Check if this is a password submission
  if (request.method === "POST") return null // let the API route handle it

  // Redirect to the brand login page
  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = "/brand-login"
  loginUrl.searchParams.set("next", request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Brand portal password protection (skip the login page itself)
  if (pathname.startsWith("/brand") && !pathname.startsWith("/brand-login")) {
    const authResponse = handleBrandAuth(request)
    if (authResponse) return authResponse
  }

  // A/B variant routing (root path only)
  if (pathname !== "/") return NextResponse.next()

  const { searchParams } = request.nextUrl
  const ua = request.headers.get("user-agent") ?? ""

  // Admin override via query param
  const forced = searchParams.get("variant")
  if (forced && forced in VARIANT_WEIGHTS) {
    const url = request.nextUrl.clone()
    url.pathname = `/variants/${forced}`
    url.searchParams.delete("variant")
    const res = NextResponse.rewrite(url)
    res.cookies.set(COOKIE_NAME, forced, {
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      path: "/",
    })
    return res
  }

  // Pin bots/crawlers to variant A for consistent SEO
  if (BOT_UA_PATTERN.test(ua)) {
    const url = request.nextUrl.clone()
    url.pathname = "/variants/a"
    return NextResponse.rewrite(url)
  }

  // Existing cookie — honour it if the variant is still active
  const existing = request.cookies.get(COOKIE_NAME)?.value
  if (existing && VARIANT_WEIGHTS[existing] > 0) {
    const url = request.nextUrl.clone()
    url.pathname = `/variants/${existing}`
    return NextResponse.rewrite(url)
  }

  // No cookie (or stale variant) — assign randomly by weight
  const assigned = pickVariant()
  const url = request.nextUrl.clone()
  url.pathname = `/variants/${assigned}`
  const res = NextResponse.rewrite(url)
  res.cookies.set(COOKIE_NAME, assigned, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    path: "/",
  })
  return res
}

export const config = {
  matcher: ["/", "/brand/:path*"],
}
