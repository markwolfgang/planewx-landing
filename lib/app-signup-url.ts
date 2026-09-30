/**
 * App signup URL helpers.
 *
 * The app root (https://app.planewx.ai) 307-redirects logged-out users to
 * /auth/login. Signup and trial CTAs must use /auth/sign-up and keep the same
 * query string (lp, utm, ref, etc.).
 */

export const APP_ORIGIN = "https://app.planewx.ai"

/** Path that opens the sign-up form (not the app root). */
export const APP_SIGN_UP_PATH = "/auth/sign-up"

function queryToString(
  query?: string | URLSearchParams | Record<string, string>,
): string {
  if (!query) return ""
  if (typeof query === "string") {
    return query.startsWith("?") ? query.slice(1) : query
  }
  if (query instanceof URLSearchParams) {
    return query.toString()
  }
  return new URLSearchParams(query).toString()
}

/**
 * Build an app signup URL, preserving an existing query string.
 *
 * @example buildAppSignupUrl("lp=a") => "https://app.planewx.ai/auth/sign-up?lp=a"
 * @example buildAppSignupUrl({ lp: "b", utm_source: "x" })
 */
export function buildAppSignupUrl(
  query?: string | URLSearchParams | Record<string, string>,
): string {
  const base = `${APP_ORIGIN}${APP_SIGN_UP_PATH}`
  const q = queryToString(query)
  return q ? `${base}?${q}` : base
}

/** Landing signup/trial links that only need an lp variant. */
export function buildAppSignupUrlWithLp(variant: string): string {
  return buildAppSignupUrl({ lp: variant })
}
