import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Map,
  FileText,
  HeartHandshake,
} from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import {
  GaCustomsCampaignTracker,
  GaCustomsSignUpLink,
} from "@/components/ga-customs-campaign-tracker"

export const metadata: Metadata = {
  title: "GA Customs → PlaneWX | Airport of Entry hours & fees",
  description:
    "GA Customs is a free iOS app for U.S. Airport of Entry hours and fees — brought to you by PlaneWX. Open PlaneWX for flight weather intelligence built for GA pilots.",
  openGraph: {
    title: "GA Customs — brought to you by PlaneWX",
    description:
      "U.S. Airport of Entry hours & fees for GA pilots. Free app from the PlaneWX family. Get PlaneWX for decision-support weather.",
    type: "website",
    url: "https://www.planewx.ai/ga-customs",
  },
  alternates: {
    canonical: "https://www.planewx.ai/ga-customs",
  },
}

const BULLETS = [
  {
    icon: Map,
    title: "Map of U.S. Airports of Entry",
    body: "Find AOEs across the country without digging through scattered CBP pages.",
  },
  {
    icon: Clock,
    title: "Hours, fees & notice requirements",
    body: "See operating hours, user fees, and advance-notice rules before you plan the crossing.",
  },
  {
    icon: FileText,
    title: "Offline fact sheets",
    body: "Pull airport details even when you are off grid — saved for the flight, not just the lounge Wi-Fi.",
  },
  {
    icon: HeartHandshake,
    title: "Free — brought to you by PlaneWX",
    body: "GA Customs is free for GA pilots. PlaneWX builds the weather decision support behind your go / no-go.",
  },
] as const

const SCREENSHOTS = [
  {
    src: "/ga-customs/01-map-kprs.png",
    alt: "GA Customs Map — Presidio Lely International (KPRS) selected",
    label: "Map (KPRS)",
  },
  {
    src: "/ga-customs/02-kprs-hours.png",
    alt: "KPRS detail — operating hours and permission to land",
    label: "Hours",
  },
  {
    src: "/ga-customs/03-kprs-process-reviews.png",
    alt: "KPRS — inspection process, pilot reviews, offline PDF",
    label: "Process & reviews",
  },
  {
    src: "/ga-customs/04-favorites.png",
    alt: "Favorites — saved Airports of Entry",
    label: "Favorites",
  },
  {
    src: "/ga-customs/05-about.png",
    alt: "About — appearance and data freshness",
    label: "About",
  },
] as const

export default function GaCustomsPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/*
        Campaign code: GACUSTOMS (see migrations/20260826_ga_customs_campaign_code.sql).
        Apply that SQL in Supabase if the row is not live yet — visit recording
        validates against campaign_codes.active.
      */}
      <GaCustomsCampaignTracker />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0d1f3c] to-[#0a0f1a]" />
        {/* Sky threshold bars — evoke the GA Customs / PlaneWX family mark */}
        <div
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-80"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-2 h-px bg-[#3B82F6]/40"
          aria-hidden
        />
        <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-sky-500/10 rounded-full blur-[120px]" />
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

      <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-14 sm:space-y-20">
        {/* Hero — short-final AppIcon + GA Customs wordmark */}
        <header className="relative space-y-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <div className="mx-auto sm:mx-0 shrink-0">
              <Image
                src="/ga-customs/app-icon.png"
                alt="GA Customs"
                width={128}
                height={128}
                className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-[1.35rem]"
                priority
              />
            </div>

            <div className="space-y-4 min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
                From the PlaneWX family
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                GA Customs
              </h1>
              <p className="text-lg sm:text-xl text-white/65 max-w-xl leading-relaxed">
                U.S. Airport of Entry hours &amp; fees — a free iOS app for GA pilots,
                brought to you by PlaneWX.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <GaCustomsSignUpLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Open PlaneWX
              <ArrowRight className="h-4 w-4" />
            </GaCustomsSignUpLink>
            <p className="text-sm text-white/40 sm:max-w-xs">
              Start a free trial of PlaneWX — flight weather intelligence for the same
              pilots who use GA Customs.
            </p>
          </div>
        </header>

        {/* Screenshots */}
        <section className="space-y-6" aria-labelledby="ga-customs-shots">
          <div className="space-y-2 max-w-2xl">
            <h2 id="ga-customs-shots" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Inside the app
            </h2>
            <p className="text-white/55 leading-relaxed">
              Map through About — the screens pilots open when planning a crossing.
            </p>
          </div>

          <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-thin">
            {SCREENSHOTS.map((shot, i) => (
              <figure
                key={shot.src}
                className="snap-center shrink-0 w-[220px] sm:w-[240px] animate-fade-in-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="rounded-[1.75rem] border border-white/10 bg-black/40 p-2 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)]">
                  <div className="relative overflow-hidden rounded-[1.35rem] bg-[#0B1120] aspect-[9/19.5]">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      className="object-cover object-top"
                      sizes="240px"
                      priority={i < 2}
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-center text-xs font-medium tracking-wide uppercase text-white/45">
                  {shot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* What GA Customs gives you */}
        <section className="space-y-6" aria-labelledby="ga-customs-features">
          <div className="space-y-2 max-w-2xl">
            <h2 id="ga-customs-features" className="text-2xl sm:text-3xl font-bold tracking-tight">
              What pilots get in GA Customs
            </h2>
            <p className="text-white/55 leading-relaxed">
              Built for border crossings and AOE planning — then come to PlaneWX when
              weather is the hard part of the go / no-go.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {BULLETS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#3B82F6]">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="space-y-1 min-w-0">
                  <p className="font-semibold text-white flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 sm:hidden" aria-hidden />
                    {title}
                  </p>
                  <p className="text-sm text-white/55 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA + App Store note */}
        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-10 space-y-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready for the weather half of the trip?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            PlaneWX is the Pilot&apos;s Decision Support System — personal minimums,
            multi-model weather, and a clear picture days before you fly.
          </p>
          <GaCustomsSignUpLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all">
            Get PlaneWX
            <ArrowRight className="h-4 w-4" />
          </GaCustomsSignUpLink>
          <p className="text-sm text-white/40 pt-2 max-w-xl mx-auto leading-relaxed">
            GA Customs is available on TestFlight — Apple&apos;s free app for installing
            iOS apps before they are on the App Store. Open the invite on iPhone or
            iPad and TestFlight installs it. App Store listing coming soon.
          </p>
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
