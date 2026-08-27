import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"

export const metadata: Metadata = {
  title: "Free apps → PlaneWX | TBM Boldface & GA Customs",
  description:
    "Free tools for GA pilots from the PlaneWX family — TBM Boldface for TBM memory items, and GA Customs for U.S. Airport of Entry hours & fees. Brought to you by PlaneWX.",
  openGraph: {
    title: "Free apps from the PlaneWX family",
    description:
      "TBM Boldface and GA Customs — free apps for GA pilots, brought to you by PlaneWX.",
    type: "website",
    url: "https://www.planewx.ai/apps",
  },
  alternates: {
    canonical: "https://www.planewx.ai/apps",
  },
}

const APPS = [
  {
    href: "/boldface",
    name: "TBM Boldface",
    subtitle: "TBM memory items on iPhone & iPad",
    body: "Free iOS app for chair-flying memory items — study, test, and keep serial-aware procedures ready before the airplane asks.",
    cta: "Open TBM Boldface",
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
            Free apps
          </h1>
          <p className="text-lg sm:text-xl text-white/[0.72] leading-relaxed animate-fade-in-up [animation-delay:120ms]">
            Free tools for GA pilots, brought to you by PlaneWX.
          </p>
        </header>

        <section
          className="grid gap-5 sm:gap-6 md:grid-cols-2"
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
                  priority
                />
                <span className="shrink-0 rounded-md border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#3B82F6]">
                  Free
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
            Weather for the same trip
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            PlaneWX is the Pilot&apos;s Decision Support System — personal minimums,
            multi-model weather, and a clear picture days before you fly.
          </p>
          <a
            href="https://www.planewx.ai"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Open PlaneWX
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
