import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  Flame,
  Plane,
  Settings2,
} from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import {
  BoldfaceCampaignTracker,
  BoldfacePlaneWxLink,
} from "@/components/boldface-campaign-tracker"

export const metadata: Metadata = {
  title: "TBM Boldface → PlaneWX | Memory items for TBM pilots",
  description:
    "TBM Boldface is a free iPhone/iPad TestFlight app for TBM memory items — brought to you by PlaneWX. Study and test emergency procedures for TBM 700 A/B through 980.",
  openGraph: {
    title: "TBM Boldface — brought to you by PlaneWX",
    description:
      "Free TestFlight app for TBM memory items. Study, test, and keep go / no-go weather with PlaneWX.",
    type: "website",
    url: "https://www.planewx.ai/boldface",
  },
  alternates: {
    canonical: "https://www.planewx.ai/boldface",
  },
}

const TESTFLIGHT_URL = "https://testflight.apple.com/join/T5VnWRgb"

const FEATURES = [
  {
    icon: Plane,
    title: "Your TBM, your serial",
    body: "Pick TBM 700 A/B through 980, then serial and MOD so the pack matches your airplane.",
  },
  {
    icon: BookOpen,
    title: "Study & Test",
    body: "Study shows every step on one page. Test: write or recite the whole procedure, then reveal.",
  },
  {
    icon: ClipboardList,
    title: "One card a day + Keep going",
    body: "Daily card keeps the streak honest. Keep going when you want the rest of the pack — optional reminder included.",
  },
  {
    icon: Flame,
    title: "Quick Ref & progress",
    body: "Sec 2 limits, V-speeds, and exceedance notes for 700–940. Streaks, mastery, and badges stay on device / iCloud.",
  },
  {
    icon: Settings2,
    title: "Multi-aircraft ready",
    body: "Add more than one TBM — switch between airframes without losing your place.",
  },
] as const

const SCREENSHOTS = [
  {
    src: "/boldface/01-home.png",
    alt: "TBM Boldface Home — today’s card, streak, and Keep going",
    label: "Home",
  },
  {
    src: "/boldface/02-study.png",
    alt: "Daily Study — Engine regulation discrepancy / MAN OVRD with all steps visible",
    label: "Daily Study",
  },
  {
    src: "/boldface/03-test.png",
    alt: "Daily Test — write or reveal one step at a time",
    label: "Daily Test",
  },
  {
    src: "/boldface/04-quickref.png",
    alt: "Quick Ref — V-speeds at MTOW/MLW",
    label: "Quick Ref",
  },
  {
    src: "/boldface/05-progress.png",
    alt: "Progress — streak, mastery, cards seen, badges",
    label: "Progress",
  },
  {
    src: "/boldface/06-settings.png",
    alt: "Settings — multiple aircraft and practice mode",
    label: "Settings",
  },
] as const

export default function BoldfacePage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/*
        Campaign code: BOLDFACE (see migrations/20260826_boldface_campaign_code.sql).
        Apply that SQL in Supabase if the row is not live yet — visit recording
        validates against campaign_codes.active.
      */}
      <BoldfaceCampaignTracker />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0d1f3c] to-[#0a0f1a]" />
        <div
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-80"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-2 h-px bg-[#3b82f6]/40"
          aria-hidden
        />
        <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-sky-500/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-1/5 w-[420px] h-[420px] bg-[#3b82f6]/10 rounded-full blur-[100px]" />
      </div>

      <nav className="border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="PlaneWX home">
            <BrandLogo className="h-8 w-auto" />
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
        {/* Hero — brand first */}
        <header className="relative space-y-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-8">
            <div className="space-y-4 min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3b82f6]">
                From the PlaneWX family
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="block text-[#3b82f6] text-lg sm:text-xl font-semibold tracking-[0.18em] uppercase mb-2">
                  TBM
                </span>
                Boldface
              </h1>
              <p className="text-lg sm:text-xl text-white/65 max-w-xl leading-relaxed">
                Free iPhone/iPad app for TBM memory items — study, test, and chair-fly
                before the airplane asks.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <a
              href={TESTFLIGHT_URL}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3b82f6] hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Join the TestFlight beta
              <ArrowRight className="h-4 w-4" />
            </a>
            <BoldfacePlaneWxLink className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 font-semibold transition-all">
              Get PlaneWX
              <ArrowRight className="h-4 w-4" />
            </BoldfacePlaneWxLink>
          </div>
          <p className="text-sm text-white/40 max-w-lg">
            Brought to you by PlaneWX — not a sponsored product. Weather decision
            support lives on planewx.ai.
          </p>
        </header>

        {/* Screenshots */}
        <section className="space-y-6" aria-labelledby="boldface-shots">
          <div className="space-y-2 max-w-2xl">
            <h2 id="boldface-shots" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Inside the app
            </h2>
            <p className="text-white/55 leading-relaxed">
              Home through Settings — the same screens you&apos;ll open on TestFlight.
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

        {/* Features */}
        <section className="space-y-6" aria-labelledby="boldface-features">
          <div className="space-y-2 max-w-2xl">
            <h2 id="boldface-features" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Built for TBM memory items
            </h2>
            <p className="text-white/55 leading-relaxed">
              Daher prints memory items (grey box on 900–940, bold type on 960/980).
              We treat those as boldface — short, accurate, serial-aware.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15 text-[#3b82f6]">
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

        {/* CTA */}
        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-10 space-y-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Chair-fly the procedure. Brief the weather.
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            Install TBM Boldface on TestFlight, then open PlaneWX for personal-minimums
            weather intelligence on the same trip.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={TESTFLIGHT_URL}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3b82f6] hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Join the TestFlight beta
              <ArrowRight className="h-4 w-4" />
            </a>
            <BoldfacePlaneWxLink className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 font-semibold transition-all">
              Get PlaneWX
              <ArrowRight className="h-4 w-4" />
            </BoldfacePlaneWxLink>
          </div>
          <div className="pt-4 flex flex-col items-center gap-3">
            <p className="text-xs text-white/40 uppercase tracking-wider">Brought to you by</p>
            <BrandLogo className="h-7 w-auto opacity-90" />
          </div>
        </section>

        <p className="text-xs text-white/35 leading-relaxed max-w-3xl mx-auto text-center">
          Training aid only. Not a substitute for the official Pilot&apos;s Information
          Manual (PIM), AFM/POH, or current aircraft documentation. Verify every
          procedure against your serial-specific manuals before flight. We do not ship
          the manual. Sourced from Daher Technical Documentation (MyTBM) memory items —
          verify in your PIM.
        </p>

        <footer className="border-t border-white/5 pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© {new Date().getFullYear()} PlaneWX, LLC</p>
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
