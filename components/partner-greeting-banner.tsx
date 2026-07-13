"use client"

import { useState, useEffect } from "react"
import { Handshake } from "lucide-react"

const SESSION_KEY_PREFIX = "planewx_greeting_"

export function PartnerGreetingBanner() {
  const [greeting, setGreeting] = useState<string | null>(null)

  useEffect(() => {
    // Resolve the campaign code: URL param takes priority, then localStorage.
    let code: string | null = null
    try {
      const urlCode = new URLSearchParams(window.location.search).get("ref")?.trim().toUpperCase()
      code = urlCode || localStorage.getItem("planewx_referral")
    } catch {
      return
    }

    if (!code || code.length < 2 || code.length > 32) return

    // Check sessionStorage cache to avoid a network round-trip on every navigation.
    const sessionKey = `${SESSION_KEY_PREFIX}${code}`
    try {
      const cached = sessionStorage.getItem(sessionKey)
      if (cached !== null) {
        setGreeting(cached || null) // empty string == "no greeting" sentinel
        return
      }
    } catch {}

    fetch(`/api/campaign-greeting?code=${encodeURIComponent(code)}`)
      .then((r) => r.json())
      .then(({ greeting: g }: { greeting: string | null }) => {
        setGreeting(g ?? null)
        try {
          // Cache the result (including null → "") so subsequent navigations are instant.
          sessionStorage.setItem(sessionKey, g ?? "")
        } catch {}
      })
      .catch(() => {})
  }, [])

  if (!greeting) return null

  return (
    <div className="relative z-50 bg-gradient-to-r from-sky-700 to-indigo-700 text-white text-sm">
      <div className="container mx-auto max-w-5xl px-4 py-2.5 flex items-center justify-center gap-2.5">
        <Handshake className="h-4 w-4 shrink-0 text-sky-200" aria-hidden="true" />
        <span className="font-medium text-center">{greeting}</span>
      </div>
    </div>
  )
}
