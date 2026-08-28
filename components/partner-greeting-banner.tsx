"use client"

import { useState, useEffect } from "react"
import { Handshake } from "lucide-react"
import { FiveX5SeesNote } from "@/components/shared/five-x-five-sees-note"

const SESSION_KEY_PREFIX = "planewx_greeting_"

/** Per-campaign banner colors; everything else keeps the default sky→indigo gradient. */
const BANNER_COLORS: Record<string, string> = {
  "5X5": "#FF7300",
}

export function PartnerGreetingBanner() {
  const [greeting, setGreeting] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    // Resolve the campaign code: URL param takes priority, then localStorage.
    let resolved: string | null = null
    try {
      const urlCode = new URLSearchParams(window.location.search).get("ref")?.trim().toUpperCase()
      resolved = urlCode || localStorage.getItem("planewx_referral")
    } catch {
      return
    }

    if (!resolved || resolved.length < 2 || resolved.length > 32) return
    setCode(resolved)

    // Check sessionStorage cache to avoid a network round-trip on every navigation.
    const sessionKey = `${SESSION_KEY_PREFIX}${resolved}`
    try {
      const cached = sessionStorage.getItem(sessionKey)
      if (cached !== null) {
        setGreeting(cached || null) // empty string == "no greeting" sentinel
        return
      }
    } catch {}

    fetch(`/api/campaign-greeting?code=${encodeURIComponent(resolved)}`)
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

  const customColor = code ? BANNER_COLORS[code] : undefined
  const showFiveX5Note = code === "5X5"

  return (
    <div
      className={
        customColor
          ? "relative z-50 text-white text-sm"
          : "relative z-50 bg-gradient-to-r from-sky-700 to-indigo-700 text-white text-sm"
      }
      style={customColor ? { backgroundColor: customColor } : undefined}
    >
      <div
        className={`container mx-auto max-w-5xl px-4 py-2.5 flex ${
          showFiveX5Note
            ? "flex-col items-center gap-1 text-center"
            : "items-center justify-center gap-2.5"
        }`}
      >
        <div className="flex items-center justify-center gap-2.5">
          <Handshake
            className={`h-4 w-4 shrink-0 ${customColor ? "text-white/80" : "text-sky-200"}`}
            aria-hidden="true"
          />
          <span className="font-medium text-center">{greeting}</span>
        </div>
        {showFiveX5Note ? (
          <FiveX5SeesNote className="text-xs text-white/85 leading-snug [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-white" />
        ) : null}
      </div>
    </div>
  )
}
