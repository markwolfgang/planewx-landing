"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { BrandLogo } from "@/components/shared/brand-logo"

type NewsNavProps = {
  /** Server-known embed=1 from the URL. Authoritative when true. */
  embed?: boolean
  /** Max-width utility for the inner row (matches each news page). */
  maxWidthClass: string
  /**
   * Left-side control. Homepage exits (href="/") are hidden when embedded.
   * In-news backs (e.g. All news -> /news) stay visible.
   */
  back: { href: string; label: string }
}

function isHomepageExit(href: string) {
  return href === "/"
}

export function NewsNav({ embed = false, maxWidthClass, back }: NewsNavProps) {
  const [inIframe, setInIframe] = useState(false)

  useEffect(() => {
    try {
      setInIframe(window.self !== window.top)
    } catch {
      // Cross-origin frames can throw on window.top access; treat as embedded.
      setInIframe(true)
    }
  }, [])

  const isEmbedded = embed || inIframe
  const showBack = !(isEmbedded && isHomepageExit(back.href))

  const logo = (
    <BrandLogo
      variant="wordmarkTransparent"
      className="h-5 w-auto"
      alt="PlaneWX"
    />
  )

  return (
    <header className="border-b border-white/10 px-6 py-4">
      <div
        className={`mx-auto flex items-center ${showBack ? "justify-between" : "justify-end"} ${maxWidthClass}`}
      >
        {showBack ? (
          <Link
            href={back.href}
            className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {back.label}
          </Link>
        ) : null}
        {isEmbedded ? (
          logo
        ) : (
          <Link href="/" aria-label="PlaneWX home">
            {logo}
          </Link>
        )}
      </div>
    </header>
  )
}
