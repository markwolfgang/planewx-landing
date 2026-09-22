import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  HeartHandshake,
  Plane,
  Shield,
  Ticket,
} from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { YouTubeFacade } from "@/components/shared/youtube-facade"
import { VolunteerCallSignGate } from "@/components/volunteer-call-sign-gate"
import { VolunteerCampaignTracker } from "@/components/volunteer-campaign-tracker"
import {
  VOLUNTEER_COUPON_SCREENSHOT_SRC,
  VOLUNTEER_FOUNDER_VIDEO_ID,
  VOLUNTEER_FOUNDER_VIDEO_TITLE,
} from "@/lib/volunteer-landing"

export const metadata: Metadata = {
  title: "Volunteer Pilots | PlaneWX",
  description:
    "PlaneWX supports pilots who fly volunteer missions for people and animals in need. Enter your Compassion Flight call sign, start a 2-week Pro Plus trial, and get 30% off at purchase.",
  openGraph: {
    title: "Welcome volunteer pilots | PlaneWX",
    description:
      "Decision support for volunteer missions moving people and animals. Highest discount PlaneWX has offered. Enter your Compassion Flight call sign and start a 2-week Pro Plus trial.",
    type: "website",
    url: "https://www.planewx.ai/volunteer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome volunteer pilots | PlaneWX",
    description:
      "Decision support for volunteer missions moving people and animals. Highest discount PlaneWX has offered. Enter your Compassion Flight call sign and start a 2-week Pro Plus trial.",
  },
  alternates: {
    canonical: "https://www.planewx.ai/volunteer",
  },
}

function FounderWelcomeVideo() {
  if (VOLUNTEER_FOUNDER_VIDEO_ID) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10"
        style={{ paddingBottom: "56.25%" }}
      >
        <YouTubeFacade
          videoId={VOLUNTEER_FOUNDER_VIDEO_ID}
          title={VOLUNTEER_FOUNDER_VIDEO_TITLE}
        />
      </div>
    )
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-[#0d1f3c] to-[#0a0f1a]"
      style={{ paddingBottom: "56.25%" }}
      role="img"
      aria-label="Founder welcome video coming soon"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border border-white/15"
          aria-hidden
        >
          <svg
            className="h-7 w-7 text-white/70 ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <div className="space-y-1.5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300/90">
            Founder welcome video
          </p>
          <p className="text-lg sm:text-xl font-semibold text-white/90">
            Coming soon
          </p>
          <p className="text-sm text-white/45 max-w-sm mx-auto leading-relaxed">
            Mark will share a short welcome for volunteer pilots. Drop the YouTube
            ID in when it is ready.
          </p>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.35) 3px)",
        }}
        aria-hidden
      />
    </div>
  )
}

function CheckoutScreenshotSlot() {
  if (VOLUNTEER_COUPON_SCREENSHOT_SRC) {
    return (
      <figure className="rounded-2xl border border-white/10 bg-black/30 p-3 sm:p-4 overflow-hidden">
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0B1120]">
          <Image
            src={VOLUNTEER_COUPON_SCREENSHOT_SRC}
            alt="PlaneWX checkout applying the volunteer discount from a Compassion Flight call sign"
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
        <figcaption className="mt-3 text-center text-xs text-white/40">
          At purchase, PlaneWX applies 30% from the call sign you entered
        </figcaption>
      </figure>
    )
  }

  return (
    <div
      className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 sm:py-14 text-center space-y-2"
      aria-label="Checkout screenshot coming soon"
    >
      <Ticket className="h-8 w-8 text-sky-400/70 mx-auto" aria-hidden />
      <p className="text-sm font-semibold text-white/70">Screenshot coming soon</p>
      <p className="text-xs text-white/40 max-w-xs mx-auto leading-relaxed">
        We will drop a checkout image here showing the volunteer discount applied
        from your call sign.
      </p>
    </div>
  )
}

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
      {/*
        Campaign code: CMF (see migrations/20260922_cmf_volunteer_campaign_code.sql).
        Call signs: migrations/20260922_volunteer_call_signs.sql
        Format only (CMF + 1-4 digits). No ACA membership list lookup.
      */}
      <VolunteerCampaignTracker />

      <div
        className="fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 600px 600px at 20% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)",
            "radial-gradient(ellipse 500px 500px at 80% 100%, rgba(16,185,129,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 400px 400px at 50% 45%, rgba(6,182,212,0.05) 0%, transparent 70%)",
            "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a0f1a 100%)",
          ].join(", "),
        }}
      />

      <nav className="relative z-10 border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="PlaneWX home">
            <BrandLogo className="h-8 w-auto" priority />
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

      <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Hero */}
        <header className="space-y-7 text-center sm:text-left max-w-3xl mx-auto sm:mx-0 animate-fade-in-up">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <HeartHandshake className="h-3.5 w-3.5" aria-hidden />
            For volunteer pilots
          </p>
          <div className="space-y-4">
            <p className="text-sm sm:text-base font-semibold tracking-wide text-sky-300/90">
              PlaneWX
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Welcome volunteer pilots
            </h1>
            <p className="text-lg sm:text-xl text-white/65 max-w-2xl leading-relaxed">
              Welcome pilots who fly volunteer missions for people and animals in need.
              PlaneWX is proud to support you with clear weather intelligence and honest
              decision support.
            </p>
          </div>
        </header>

        {/* Decision support */}
        <section className="space-y-5 max-w-3xl" aria-labelledby="dss-heading">
          <div className="flex items-center gap-3 text-sky-400">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15">
              <Shield className="h-5 w-5" aria-hidden />
            </span>
            <h2 id="dss-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Decision support, not a go/no-go oracle
            </h2>
          </div>
          <p className="text-white/65 leading-relaxed text-base sm:text-lg">
            PlaneWX is a <strong className="text-white font-semibold">decision support system</strong>.
            It helps you see the weather against your airplane and your personal minimums,
            surface risk early, and make a better call. It does not invent mission
            probability. It does not tell you to go or stay. You remain PIC.
          </p>
          <p className="text-white/55 leading-relaxed">
            Volunteer routes often run through busy corridors, weather that shifts mid-leg,
            and fixes or waypoints you have not flown lately. Better information before you
            fire up is how you protect the people and animals who need that ride.
          </p>
        </section>

        {/* Pressure and discount */}
        <section
          className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6 sm:p-10 space-y-4 max-w-3xl"
          aria-labelledby="pressure-heading"
        >
          <h2 id="pressure-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
            These missions cost you more than fuel
          </h2>
          <p className="text-white/70 leading-relaxed">
            Volunteer flying for people and animals carries external pressure and personal
            cost. Someone is waiting on the ground. The schedule is not yours alone. The
            money and the time come out of your pocket and your weekend.
          </p>
          <p className="text-white/70 leading-relaxed">
            That is why this is the highest discount PlaneWX has ever given:{" "}
            <strong className="text-white font-semibold">30% at purchase</strong> from the
            Compassion Flight call sign you enter below. We are glad to do it. Safer
            decisions on missions like yours are exactly why we built this.
          </p>
        </section>

        {/* Founder note + video */}
        <section className="space-y-8" aria-labelledby="founder-heading">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sky-400">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15">
                  <Plane className="h-5 w-5" aria-hidden />
                </span>
                <h2 id="founder-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
                  A note from Mark
                </h2>
              </div>
              <p className="text-white/65 leading-relaxed">
                I am a volunteer pilot myself. I fly Veterans Airlift Command (VAC) missions,
                and I find real fulfillment transporting people who need the airplane more than
                I do.
              </p>
              <p className="text-white/65 leading-relaxed">
                PlaneWX started as the tool I wanted in the left seat before a long leg with
                someone who matters in the right seat. If it helps you carry your missions with
                a clearer picture, that means something to me.
              </p>
              <p className="text-sm text-white/40 pt-1">
                Mark Wolfgang · Founder, PlaneWX · VAC volunteer pilot
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                Founder welcome video
              </p>
              <FounderWelcomeVideo />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="space-y-8 scroll-mt-24"
          aria-labelledby="how-heading"
        >
          <div className="space-y-3 max-w-3xl">
            <h2 id="how-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
              How the offer works
            </h2>
            <p className="text-white/55 leading-relaxed">
              Enter your Compassion Flight call sign. We&apos;ll validate it, then unlock
              signup for your Pro Plus trial and volunteer discount.
            </p>
          </div>

          <ol className="grid gap-5 sm:gap-6">
            <li className="flex gap-4 sm:gap-5 items-start rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white font-bold text-sm">
                1
              </span>
              <div className="space-y-2 min-w-0">
                <h3 className="text-lg font-semibold">Enter your Compassion Flight call sign</h3>
                <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                  Enter your Compassion Flight call sign. We&apos;ll validate it, then unlock
                  signup.
                </p>
              </div>
            </li>

            <li className="flex gap-4 sm:gap-5 items-start rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white font-bold text-sm">
                2
              </span>
              <div className="space-y-2 min-w-0">
                <h3 className="text-lg font-semibold">Sign up for a 2-week Pro Plus trial</h3>
                <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                  After we validate your call sign, signup unlocks. You get full access to{" "}
                  <strong className="text-white font-semibold">Pro Plus</strong>, our highest
                  tier, for two weeks. No credit card required to start the trial.
                </p>
              </div>
            </li>

            <li className="flex gap-4 sm:gap-5 items-start rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white font-bold text-sm">
                3
              </span>
              <div className="space-y-3 min-w-0 flex-1">
                <h3 className="text-lg font-semibold">
                  30% volunteer discount at purchase
                </h3>
                <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                  If you continue after the trial, PlaneWX applies{" "}
                  <strong className="text-white font-semibold">30% off</strong> at purchase
                  from the call sign you entered on this page. You do not type a separate
                  coupon code at checkout.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden />
                    Call sign is saved with this visit and passed into signup
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden />
                    Discount is applied at purchase from that stored call sign
                  </li>
                </ul>
                <CheckoutScreenshotSlot />
              </div>
            </li>
          </ol>
        </section>

        {/* Call sign + signup gate */}
        <section
          id="get-started"
          className="space-y-6 scroll-mt-24 max-w-3xl"
          aria-labelledby="get-started-heading"
        >
          <div className="space-y-3">
            <h2
              id="get-started-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Get started
            </h2>
            <p className="text-white/55 leading-relaxed">
              Enter your Compassion Flight call sign. We&apos;ll validate it, then unlock
              signup.
            </p>
          </div>
          <VolunteerCallSignGate />
        </section>

        <footer className="border-t border-white/5 pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <BrandLogo className="h-5 w-auto opacity-70" />
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
