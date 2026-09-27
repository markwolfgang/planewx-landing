import { NextRequest, NextResponse } from "next/server"
import { partnerCodeFromPathname } from "@/lib/partner-paths"
import {
  CONSENT_GPC_COOKIE,
  CONSENT_REGION_COOKIE,
  consentModeFromCountry,
} from "@/lib/consent-region"

// Phase 2 (Mark 2026-09-16): homepage is variant A only.
// B/C/D/E stay in the map so ?variant= override still works for QA.
const VARIANT_WEIGHTS: Record<string, number> = {
  a: 100,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
}

const COOKIE_NAME = "planewx-variant"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

const BRAND_AUTH_COOKIE = "planewx-brand-auth"
const BRAND_AUTH_MAX_AGE = 60 * 60 * 24 * 90 // 90 days

const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days; refreshed each request

// Pin social unfurl crawlers (Discord, Slack, iMessage/Apple) to variant A
// alongside classic search/social bots so partner short links emit consistent OG.
const BOT_UA_PATTERN =
  /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|Twitterbot|LinkedInBot|Discordbot|Slackbot|Applebot|SkypeUriPreview/i

/**
 * Attach consent-region and GPC cookies from Vercel geo / Sec-GPC.
 * Client scripts read these; HTML itself is not geo-branched, so HTML CDN cache stays safe.
 * Missing country defaults to strict (safest).
 * Vary and Set-Cookie can reduce CDN hit rate for matched routes; matcher skips /api and static assets.
 */
function applyConsentCookies(request: NextRequest, response: NextResponse): NextResponse {
  const country = request.headers.get("x-vercel-ip-country")
  const mode = consentModeFromCountry(country)
  response.cookies.set(CONSENT_REGION_COOKIE, mode, {
    maxAge: CONSENT_COOKIE_MAX_AGE,
    sameSite: "lax",
    path: "/",
  })

  const gpcHeader = request.headers.get("sec-gpc")
  if (gpcHeader === "1") {
    response.cookies.set(CONSENT_GPC_COOKIE, "1", {
      maxAge: CONSENT_COOKIE_MAX_AGE,
      sameSite: "lax",
      path: "/",
    })
  } else {
    response.cookies.set(CONSENT_GPC_COOKIE, "", {
      maxAge: 0,
      sameSite: "lax",
      path: "/",
    })
  }

  response.headers.append("Vary", "X-Vercel-IP-Country, Sec-GPC")
  return response
}

function pickVariant(): string {
  const active = Object.entries(VARIANT_WEIGHTS).filter(([, w]) => w > 0)
  const total = active.reduce((sum, [, w]) => sum + w, 0)
  let r = Math.random() * total
  for (const [variant, weight] of active) {
    r -= weight
    if (r < 0 || r === 0) return variant
  }
  return active[active.length - 1][0]
}

function handleBrandAuth(request: NextRequest): NextResponse | null {
  const password = process.env.BRAND_PORTAL_PASSWORD
  if (!password) return null

  const authed = request.cookies.get(BRAND_AUTH_COOKIE)?.value
  if (authed === "true") return null

  if (request.method === "POST") return null

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = "/brand-login"
  loginUrl.searchParams.set("next", request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

/**
 * A/B rewrite for the homepage funnel. Optionally set ref from a partner short link.
 * Preserves other query params. Only fills ref when the request has no non-blank ref
 * (explicit ?ref= wins over the path-derived partner code).
 */
function rewriteToVariant(
  request: NextRequest,
  variant: string,
  partnerCode?: string | null,
  setCookie?: boolean,
): NextResponse {
  const url = request.nextUrl.clone()
  url.pathname = `/variants/${variant}`
  const existingRef = url.searchParams.get("ref")?.trim()
  if (partnerCode && !existingRef) {
    url.searchParams.set("ref", partnerCode)
  }
  url.searchParams.delete("variant")
  const res = NextResponse.rewrite(url)
  if (setCookie) {
    res.cookies.set(COOKIE_NAME, variant, {
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      path: "/",
    })
  }
  return applyConsentCookies(request, res)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Brand portal password protection (skip the login page itself).
  // Static files under /public/brand (logos, etc.) must stay public. The talk
  // deck and marketing pages load them without the brand-portal cookie.
  if (pathname.startsWith("/brand") && !pathname.startsWith("/brand-login")) {
    const isStaticAsset =
      /\.(svg|png|jpe?g|webp|gif|ico|css|js|map|woff2?|ttf|otf)$/i.test(pathname)
    const isPublicPartnerOnePager =
      pathname === "/brand/planewx-partner-messaging.pdf" ||
      pathname.startsWith("/brand/partner-one-pager/")
    if (!isStaticAsset && !isPublicPartnerOnePager) {
      const authResponse = handleBrandAuth(request)
      if (authResponse) return applyConsentCookies(request, authResponse)
    }
  }

  // Partner short links (e.g. /runway -> homepage funnel with ref=RUNWAY).
  // Allowlist-only. Never steals reserved routes like /apps, /osh, /news.
  const partnerCode = partnerCodeFromPathname(pathname)
  const isHomepageFunnel = pathname === "/" || Boolean(partnerCode)

  if (!isHomepageFunnel) {
    return applyConsentCookies(request, NextResponse.next())
  }

  const { searchParams } = request.nextUrl
  const ua = request.headers.get("user-agent") ?? ""

  const forced = searchParams.get("variant")
  if (forced && forced in VARIANT_WEIGHTS) {
    return rewriteToVariant(request, forced, partnerCode, true)
  }

  if (BOT_UA_PATTERN.test(ua)) {
    return rewriteToVariant(request, "a", partnerCode, false)
  }

  const existing = request.cookies.get(COOKIE_NAME)?.value
  if (existing && VARIANT_WEIGHTS[existing] > 0) {
    return rewriteToVariant(request, existing, partnerCode, false)
  }

  const assigned = pickVariant()
  return rewriteToVariant(request, assigned, partnerCode, true)
}

// Matcher must be a static array (Next.js compile-time). When adding a partner
// slug to PARTNER_PATH_CODES in lib/partner-paths.ts, add /{slug} here too.
// Skips /api and static assets so consent Vary/Set-Cookie do not hit those paths.
export const config = {
  matcher: [
    "/",
    "/brand/:path*",
    "/runway",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff2?|ttf|otf|html)$).*)",
  ],
}
