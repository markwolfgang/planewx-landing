"use client"

import { Analytics } from "@vercel/analytics/react"
import { useEffect, useState } from "react"
import {
  COOKIE_PREFS_CHANGED_EVENT,
  readCookiePrefs,
  type CookiePrefs,
} from "@/lib/cookie-prefs"
import {
  allowsAnalytics,
  readConsentModeFromDocument,
} from "@/lib/consent-region"

/** Vercel Analytics only when analytics consent is granted (opt-in). */
export function WebVercelMetrics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const sync = (prefs?: CookiePrefs | null) => {
      const mode = readConsentModeFromDocument()
      const resolved = prefs ?? readCookiePrefs()
      setEnabled(allowsAnalytics({ mode, prefs: resolved }))
    }
    sync()

    const onPrefs = (event: Event) => {
      sync((event as CustomEvent<CookiePrefs>).detail ?? null)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== "cookie_prefs_v1") return
      sync(readCookiePrefs())
    }
    window.addEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  if (!enabled) return null
  return <Analytics />
}
