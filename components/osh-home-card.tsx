"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const DISMISS_KEY = "osh2026_home_card_dismissed"
const EVENT_END = new Date("2026-07-23T00:00:00-05:00")

/**
 * Light info card matching the "Meet the founder Mark at Oshkosh" style —
 * left accent bar, pale blue surface, Learn more link.
 */
export function OshHomeCard() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (Date.now() > EVENT_END.getTime()) return
    if (localStorage.getItem(DISMISS_KEY)) return
    setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="container mx-auto max-w-5xl px-4 pt-6">
      <div className="relative rounded-xl bg-[#e8f1f8] text-left overflow-hidden border border-sky-200/60">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-sky-400" />
        <div className="pl-5 pr-4 py-4 sm:pl-6 sm:pr-5 sm:py-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[#0c2d4a] font-bold text-base sm:text-lg leading-snug">
              Meet Mark and Sara at Oshkosh
            </h2>
            <p className="text-[#3d5a73] text-sm sm:text-[15px] mt-1 leading-relaxed">
              Wed 11 AM meetup at Flyte Booth 337 — giveaway, drinks, and Mark&apos;s
              Forum Stage 10 talk at 4 PM.
            </p>
            <Link
              href="/osh"
              className="inline-flex items-center mt-2.5 text-sky-500 hover:text-sky-600 font-semibold text-sm"
            >
              Learn more →
            </Link>
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => {
              localStorage.setItem(DISMISS_KEY, "1")
              setVisible(false)
            }}
            className="shrink-0 text-[#3d5a73]/50 hover:text-[#0c2d4a] text-lg leading-none px-1"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
