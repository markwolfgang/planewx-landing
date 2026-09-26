"use client"

import Link from "next/link"
import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6"
import { BrandLogo } from "@/components/shared/brand-logo"

const SOCIAL_LINKS = [
  { icon: FaInstagram, href: "https://instagram.com/plane_wx", label: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com/planewxai", label: "Facebook" },
  { icon: FaXTwitter, href: "https://x.com/planewxai", label: "X" },
  { icon: FaTiktok, href: "https://tiktok.com/@planewx", label: "TikTok" },
  { icon: FaYoutube, href: "https://youtube.com/@planewx", label: "YouTube" },
]

export function SiteFooter({ variant }: { variant: string }) {
  return (
    <footer className="relative py-10 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-5xl flex flex-col items-center gap-6 text-sm text-white/30">
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/30 hover:text-white/70 transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 shrink-0 max-w-full">
            <Link href="/" className="shrink-0" aria-label="PlaneWX home">
              {/* Same light-on-dark wordmark as partners / dark DSS nav */}
              <BrandLogo
                variant="wordmarkTransparent"
                alt="PlaneWX"
                className="h-7 sm:h-8 w-auto"
              />
            </Link>
            <span className="text-center sm:text-left sm:whitespace-nowrap">
              · The Pilot&apos;s Decision Support System
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-6 max-w-full">
            <a href="/about" className="hover:text-white/60 transition-colors">About</a>
            <a href="/news" className="hover:text-white/60 transition-colors">News</a>
            <a href="/partners" className="hover:text-white/60 transition-colors">Partners</a>
            <a href="/ambassadors" className="hover:text-white/60 transition-colors">Ambassadors</a>
            <a href="/advisors" className="hover:text-white/60 transition-colors">Advisors</a>
            <a href="https://app.planewx.ai/help/faqs" className="hover:text-white/60 transition-colors">FAQ</a>
            <a href="/research/turbulence-safety" className="hover:text-white/60 transition-colors">Research</a>
            <a href="mailto:hello@planewx.ai" className="hover:text-white/60 transition-colors">Contact</a>
            <span className="whitespace-nowrap">© 2026 PlaneWX, LLC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
