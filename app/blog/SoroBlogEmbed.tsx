"use client"

import { useEffect, useState } from "react"
import {
  COOKIE_PREFS_CHANGED_EVENT,
  readCookiePrefs,
  type CookiePrefs,
} from "@/lib/cookie-prefs"
import {
  allowsMarketing,
  hasGlobalPrivacyControl,
  readConsentModeFromDocument,
} from "@/lib/consent-region"

/**
 * Optional Soro embed. Not mounted on live blog routes today (blog uses server fetch).
 * If mounted, loads only after marketing consent (or an explicit click-to-load).
 */
export default function SoroBlogEmbed() {
  const [allowed, setAllowed] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const sync = (prefs?: CookiePrefs | null) => {
      const mode = readConsentModeFromDocument()
      const gpc = hasGlobalPrivacyControl()
      const resolved = prefs ?? readCookiePrefs()
      setAllowed(allowsMarketing({ mode, prefs: resolved, gpc }))
    }
    sync()
    const onPrefs = (event: Event) => {
      sync((event as CustomEvent<CookiePrefs>).detail ?? null)
    }
    window.addEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
    return () => window.removeEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
  }, [])

  useEffect(() => {
    if (!allowed && !clicked) return
    const existing = document.getElementById("soro-embed-script")
    if (existing) return

    const p = new URLSearchParams(window.location.search)
    let u = "https://app.trysoro.com/api/embed/732fc303-3b9b-4f2b-a629-ca12722565ce?theme=dark"
    if (p.get("post")) u += "&post=" + encodeURIComponent(p.get("post")!)

    const s = document.createElement("script")
    s.id = "soro-embed-script"
    s.src = u
    s.async = true

    const target = document.getElementById("soro-blog")
    if (target) target.after(s)
  }, [allowed, clicked])

  if (!allowed && !clicked) {
    return (
      <div
        id="soro-blog"
        className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70"
      >
        <p className="mb-3">This section loads a third-party blog embed (Soro).</p>
        <button
          type="button"
          onClick={() => setClicked(true)}
          className="rounded-md bg-sky-500 px-4 py-2 text-slate-950 font-medium hover:bg-sky-400"
        >
          Load embed
        </button>
      </div>
    )
  }

  return <div id="soro-blog" />
}
