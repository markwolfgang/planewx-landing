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

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/partners", label: "Partners" },
  { href: "/ambassadors", label: "Ambassadors" },
  { href: "/advisors", label: "Advisors" },
  { href: "https://app.planewx.ai/help/faqs", label: "FAQ" },
  { href: "/research/turbulence-safety", label: "Research" },
  { href: "mailto:hello@planewx.ai", label: "Contact" },
] as const

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

        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 max-w-full">
          <Link href="/" className="shrink-0" aria-label="PlaneWX home">
            {/* Same light-on-dark wordmark as partners / dark DSS nav */}
            <BrandLogo
              variant="wordmarkTransparent"
              alt="PlaneWX"
              className="h-7 sm:h-8 w-auto"
            />
          </Link>
          <span className="text-center sm:text-left sm:whitespace-nowrap">
            <span className="hidden sm:inline" aria-hidden="true">
              ·{" "}
            </span>
            The Pilot&apos;s Decision Support System
          </span>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-6 max-w-full"
        >
          {FOOTER_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="hover:text-white/60 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <span className="whitespace-nowrap">© 2026 PlaneWX, LLC</span>
      </div>
    </footer>
  )
}
