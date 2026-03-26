"use client"

import { Plane } from "lucide-react"
import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6"

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
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-sky-400" />
            <span className="font-semibold text-white/50">PlaneWX</span>
            <span>· The Pilot&apos;s Decision Support System</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://app.planewx.ai/help/faqs" className="hover:text-white/60 transition-colors">FAQ</a>
            <a href="/research/turbulence-safety" className="hover:text-white/60 transition-colors">Research</a>
            <a href="mailto:hello@planewx.ai" className="hover:text-white/60 transition-colors">Contact</a>
            <span>© 2026 PlaneWX, LLC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
