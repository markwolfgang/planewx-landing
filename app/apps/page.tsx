import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"

export const metadata: Metadata = {
  title: "iOS apps → PlaneWX | PlaneWX, TBM Boldface & GA Customs",
  description:
    "PlaneWX for iPhone and iPad on TestFlight, plus free companion apps — TBM Boldface for TBM memory items and GA Customs for U.S. Airport of Entry hours & fees.",
  openGraph: {
    title: "iOS apps from the PlaneWX family",
    description:
      "PlaneWX on TestFlight plus TBM Boldface and GA Customs — free companion apps for GA pilots.",
    type: "website",
    url: "https://www.planewx.ai/apps",
  },
  alternates: {
    canonical: "https://www.planewx.ai/apps",
  },
}

const APPS = [
  {
    href: "/ios",
    name: "PlaneWX",
    subtitle: "Weather decision support on iPhone & iPad",
    body: "Native app for trips, WX Score, and briefings — ForeFlight Send To import, push notifications, and the same account as app.planewx.ai.",
    cta: "Join PlaneWX TestFlight",
    badge: "Beta",
    badgeClassName:
      "border-amber-400/30 bg-amber-400/10 text-amber-300",
    icon: {
      src: "/brand/planewx-icon-light.png",
      alt: "PlaneWX",
      rounded: true,
    },
  },
  {
    href: "/boldface",
    name: "TBM Boldface",
    subtitle: "TBM memory items on iPhone & iPad",
    body: "Free iOS app for chair-flying memory items — study, test, and keep serial-aware procedures ready before the airplane asks.",
    cta: "Open TBM Boldface",
    badge: "Free",
    badgeClassName: "border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]",
    icon: {
      src: "/boldface/tbm-boldface-icon.png",
      alt: "TBM Boldface",
      rounded: false,
    },
  },
  {
    href: "/ga-customs",
    name: "GA Customs",
    subtitle: "U.S. Airport of Entry hours & fees",
    body: "Free iOS app for AOE hours, fees, and notice requirements — plan the crossing without digging through scattered pages.",
    cta: "Open GA Customs",
    badge: "Free",
    badgeClassName: "border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]",
    icon: {
      src: "/ga-customs/app-icon.png",
      alt: "GA Customs",
      rounded: true,
    },
  },
] as const

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0d1f3c] to-[#0a0f1a]" />
        <div
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-80"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-2 h-px bg-[#3B82F6]/40"
          aria-hidden
        />
        <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-sky-500/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-1/5 w-[420px] h-[420px] bg-[#3B82F6]/10 rounded-full blur-[100px]" />
      </div>

      <nav className="border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="PlaneWX home">
            <BrandLogo variant="wordmarkTransparent" className="h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
        </div>
      </nav>

      <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-12 sm:space-y-16">
        <header className="relative space-y-4 text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6] animate-fade-in-up">
            From the PlaneWX family
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] animate-fade-in-up [animation-delay:60ms]">
            iOS apps
          </h1>
          <p className="text-lg sm:text-xl text-white/[0.72] leading-relaxed animate-fade-in-up [animation-delay:120ms]">
            PlaneWX on TestFlight, plus free companion tools for GA pilots.
          </p>
        </header>

        <section
          className="grid gap-5 sm:gap-6 lg:grid-cols-3"
          aria-label="PlaneWX family apps"
        >
          {APPS.map((app, i) => (
            <Link
              key={app.href}
              href={app.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5 transition-colors hover:border-[#3B82F6]/35 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60 animate-fade-in-up"
              style={{ animationDelay: `${180 + i * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <Image
                  src={app.icon.src}
                  alt={app.icon.alt}
                  width={96}
                  height={96}
                  className={
                    app.icon.rounded
                      ? "h-20 w-20 sm:h-24 sm:w-24 rounded-[1.35rem] shadow-[0_12px_40px_-18px_rgba(59,130,246,0.55)]"
                      : "h-20 w-20 sm:h-24 sm:w-24 shadow-[0_12px_40px_-18px_rgba(59,130,246,0.55)]"
                  }
                  priority={i === 0}
                />
                <span
                  className={`shrink-0 rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${app.badgeClassName}`}
                >
                  {app.badge}
                </span>
              </div>

              <div className="space-y-2 min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {app.name}
                </h2>
                <p className="text-sm font-medium text-[#3B82F6]">{app.subtitle}</p>
                <p className="text-sm sm:text-base text-white/[0.72] leading-relaxed">
                  {app.body}
                </p>
              </div>

              <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#3B82F6] group-hover:bg-sky-400 text-white px-6 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all group-hover:scale-[1.02] group-active:scale-[0.98]">
                {app.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-10 space-y-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Prefer the browser?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            PlaneWX also runs at app.planewx.ai — same trips, WX Score, and
            briefings on desktop and mobile web.
          </p>
          <a
            href="https://app.planewx.ai"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Open PlaneWX in browser
            <ArrowRight className="h-4 w-4" />
          </a>
          <div className="pt-4 flex flex-col items-center gap-3">
            <p className="text-xs text-white/40 uppercase tracking-wider">Brought to you by</p>
            <BrandLogo variant="wordmarkTransparent" className="h-7 w-auto" />
          </div>
        </section>

        <footer className="border-t border-white/5 pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <BrandLogo variant="wordmarkTransparent" className="h-5 w-auto opacity-70" />
            <p>© {new Date().getFullYear()} PlaneWX, LLC</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Terms
            </Link>
            <Link href="/" className="hover:text-white/60 transition-colors">
              planewx.ai
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
