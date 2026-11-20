/**
 * The 6 standard GA4 utm keys. Only these count as a visitor's own UTMs, in the
 * partner redirect and on sign-up links. Other utm_* keys (utm_foo) ride along
 * untouched but never block partner tags.
 */
export const STANDARD_UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
] as const

export function isStandardUtmKey(key: string): boolean {
  return (STANDARD_UTM_KEYS as readonly string[]).includes(key.toLowerCase())
}
