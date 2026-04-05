"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Plane } from "lucide-react"

const DISMISS_KEY = "snf2026_banner_dismissed"
const EVENT_END = new Date("2026-04-21T00:00:00-04:00") // hide after Apr 20

export function SnfBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Don't show after the event ends
    if (Date.now() > EVENT_END.getTime()) return
    // Don't show if already dismissed
    if (localStorage.getItem(DISMISS_KEY)) return
    setVisible(true)
  }, [])

  if (!visible) return null

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1")
    setVisible(false)
  }

  return (
    <div className="relative z-50 bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-sm">
      <div className="container mx-auto max-w-5xl px-4 py-2.5 flex items-center justify-between gap-4">
        <Link
          href="/events/sun-n-fun-2026"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity flex-1 min-w-0"
        >
          <Plane className="h-4 w-4 shrink-0" />
          <span className="font-medium truncate">
            Flying to Sun &apos;n Fun 2026?
          </span>
          <span className="text-sky-100 hidden sm:inline truncate">
            Live KLAL weather outlook — Apr 14–20 · Updated every 6 hours
          </span>
          <span className="shrink-0 font-semibold underline underline-offset-2 whitespace-nowrap">
            View forecast →
          </span>
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
