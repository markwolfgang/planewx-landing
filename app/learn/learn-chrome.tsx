"use client"

import { usePathname } from "next/navigation"
import { NewsNav } from "@/components/news-nav"
import { SiteFooter } from "@/components/shared/site-footer"

/**
 * Shared Learning Center chrome: same NewsNav header and SiteFooter as other
 * public marketing pages. Pathname picks hub vs nested back link and width.
 */
export function LearnChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHub = pathname === "/learn"
  // /learn/[slug] stays max-w-3xl; deeper hubs (e.g. /learn/aviation-weather/taf) match 1120 content.
  const isSlugArticle = /^\/learn\/[^/]+$/.test(pathname)
  const maxWidthClass = isHub
    ? "max-w-5xl"
    : isSlugArticle
      ? "max-w-3xl"
      : "max-w-[1120px]"

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
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
