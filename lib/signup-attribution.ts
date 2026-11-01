/**
 * Attribution carried from www onto the app sign-up URL: utm_* and ref.
 *
 * Precedence:
 * 1. utm_*: the current URL wins as a set when it has any non-blank utm_* key,
 *    and is saved to sessionStorage for later pages in the same session.
 *    Otherwise the session copy is used (first tagged landing this session).
 * 2. ref: the current URL ?ref= wins and is saved to localStorage
 *    (planewx_referral, same key as before). Otherwise the stored ref is used.
 * 3. Keys the base URL already has (for example lp) are never overwritten.
 * 4. ref_logged=1 is added after ref only when this tab's session already
 *    logged a campaign visit for that same ref (VariantTracker session key).
 *    The app then skips its own lp=app visit, so one visit is counted.
 * Order on the link: base params, then utm_* in landing order, then ref, then ref_logged.
 */

export const REFERRAL_STORAGE_KEY = "planewx_referral"
export const UTM_SESSION_KEY = "planewx_utm"
/** Same prefix VariantTracker uses for its once per session visit key. */
export const VISIT_SESSION_PREFIX = "planewx_visit_fired_"
/** Query param the app reads to skip a second campaign visit. */
export const REF_LOGGED_PARAM = "ref_logged"
/** Window event VariantTracker fires right after it logs a visit. */
export const CAMPAIGN_VISIT_LOGGED_EVENT = "planewx:campaign-visit-logged"

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"]

export type SignupAttribution = {
  ref: string | null
  utm: [string, string][]
  /** www already logged a campaign visit for this ref in this session. */
  refLogged?: boolean
}

function safeGet(storage: Storage | null, key: string): string | null {
  try {
    return storage?.getItem(key) ?? null
  } catch {
    return null
  }
}

function safeSet(storage: Storage | null, key: string, value: string): void {
  try {
    storage?.setItem(key, value)
  } catch {
    /* blocked storage: attribution still rides on this page's link */
  }
}

function utmFromParams(params: URLSearchParams): [string, string][] {
  const out: [string, string][] = []
  for (const [key, value] of params) {
    const k = key.toLowerCase()
    if (UTM_KEYS.includes(k) && value.trim() && !out.some(([seen]) => seen === k)) {
      out.push([k, value.trim()])
    }
  }
  return out
}

function utmFromSession(session: Storage | null): [string, string][] {
  const raw = safeGet(session, UTM_SESSION_KEY)
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (p): p is [string, string] =>
        Array.isArray(p) && p.length === 2 && UTM_KEYS.includes(String(p[0])) && typeof p[1] === "string",
    )
  } catch {
    return []
  }
}

/** True when VariantTracker already logged a visit for this code in this session. */
export function wwwLoggedVisitThisSession(session: Storage | null, ref: string | null): boolean {
  if (!ref) return false
  return safeGet(session, `${VISIT_SESSION_PREFIX}${ref.trim().toUpperCase()}`) != null
}

/** Read (and persist) the attribution for this page view. */
export function resolveSignupAttribution(
  search: string,
  local: Storage | null,
  session: Storage | null,
): SignupAttribution {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)

  const urlRef = params.get("ref")?.trim().toUpperCase() || null
  if (urlRef) safeSet(local, REFERRAL_STORAGE_KEY, urlRef)
  const ref = urlRef ?? (safeGet(local, REFERRAL_STORAGE_KEY)?.trim() || null)

  const urlUtm = utmFromParams(params)
  if (urlUtm.length > 0) safeSet(session, UTM_SESSION_KEY, JSON.stringify(urlUtm))
  const utm = urlUtm.length > 0 ? urlUtm : utmFromSession(session)

  return { ref, utm }
}

/** Append utm_* then ref to a sign-up URL without overwriting keys it already has. */
export function appendSignupAttribution(baseUrl: string, a: SignupAttribution): string {
  const url = new URL(baseUrl)
  for (const [key, value] of a.utm) {
    if (!url.searchParams.has(key)) url.searchParams.append(key, value)
  }
  if (a.ref && !url.searchParams.has("ref")) url.searchParams.append("ref", a.ref)
  if (a.ref && a.refLogged && !url.searchParams.has(REF_LOGGED_PARAM)) {
    url.searchParams.append(REF_LOGGED_PARAM, "1")
  }
  return url.toString()
}

/** Browser helper for CTA components. */
export function signupHrefForCurrentPage(baseUrl: string): string {
  if (typeof window === "undefined") return baseUrl
  let local: Storage | null = null
  let session: Storage | null = null
  try {
    local = window.localStorage
  } catch {
    local = null
  }
  try {
    session = window.sessionStorage
  } catch {
    session = null
  }
  const a = resolveSignupAttribution(window.location.search, local, session)
  const refLogged = wwwLoggedVisitThisSession(session, a.ref)
  return appendSignupAttribution(baseUrl, refLogged ? { ...a, refLogged } : a)
}
