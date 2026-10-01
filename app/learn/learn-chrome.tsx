"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { NewsNav } from "@/components/news-nav"
import { SiteFooter } from "@/components/shared/site-footer"

/**
 * Shared Learning Center chrome: same NewsNav header and SiteFooter as other
 * public marketing pages. Pathname picks hub vs nested back link and width.
 * Measures the site header into --learn-header-height for sticky sidebars.
 * Keep overflow visible so position:sticky descendants are not clipped.
 */
export function LearnChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const rootRef = useRef<HTMLDivElement>(null)
  const isHub = pathname === "/learn"
  // /learn/[slug] stays max-w-3xl; deeper hubs (e.g. /learn/aviation-weather/taf) match 1120 content.
  const isSlugArticle = /^\/learn\/[^/]+$/.test(pathname)
  const maxWidthClass = isHub
    ? "max-w-5xl"
    : isSlugArticle
      ? "max-w-3xl"
      : "max-w-[1120px]"

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const header = root.querySelector("header")
    if (!header) return
    const apply = () => {
      const h = Math.round(header.getBoundingClientRect().height)
      root.style.setProperty("--learn-header-height", `${h}px`)
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(header)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="min-h-screen overflow-visible bg-[#0a0f1a] text-white">
      <NewsNav
        maxWidthClass={maxWidthClass}
        back={
          isHub
            ? { href: "/", label: "Home" }
            : { href: "/learn", label: "Learning Center" }
        }
      />
      {children}
      <SiteFooter variant="dark" />
    </div>
  )
}
