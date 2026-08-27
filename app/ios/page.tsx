import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CloudSun,
  Share2,
  Smartphone,
} from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { PLANEWX_IOS_TESTFLIGHT_URL } from "@/lib/planewx-family-apps"

export const metadata: Metadata = {
  title: "PlaneWX iOS → TestFlight | Pilot's Decision Support System",
  description:
    "PlaneWX for iPhone and iPad — TestFlight beta. Trips, WX Score, briefings, ForeFlight Send To import, and push notifications. Join the beta on TestFlight.",
  openGraph: {
    title: "PlaneWX iOS — join the TestFlight beta",
    description:
      "Native PlaneWX for iPhone and iPad. Same decision-support weather, plus ForeFlight import and push alerts.",
    type: "website",
    url: "https://www.planewx.ai/ios",
  },
  alternates: {
    canonical: "https://www.planewx.ai/ios",
  },
}

const FEATURES = [
  {
    icon: CloudSun,
    title: "Trips, WX Score & briefings",
    body: "Same Pilot's Decision Support System you use on the web — personal minimums, multi-model weather, and a clear picture days before you fly.",
  },
  {
    icon: Share2,
    title: "ForeFlight → PlaneWX",
    body: "Send To → PlaneWX from ForeFlight to import a route and jump straight into Watch a New Trip.",
  },
  {
    icon: Bell,
    title: "Push notifications",
    body: "Score changes, Auto-Brief alerts, and pre-flight reminders — opt in under notification settings after you sign in.",
  },
  {
    icon: Smartphone,
    title: "Built for iPhone & iPad",
    body: "Native shell tuned for mobile briefings. Sign in with the same account you use at app.planewx.ai.",
  },
] as const

export default function PlaneWxIosPage() {
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
        <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/5 w-[420px] h-[420px] bg-[#3B82F6]/10 rounded-full blur-[100px]" />
      </div>

      <nav className="border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="PlaneWX home">
            <BrandLogo variant="wordmarkTransparent" className="h-8 w-auto" />
          </Link>
          <Link
            href="/apps"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All apps
          </Link>
        </div>
      </nav>

      <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-14 sm:space-y-20">
        <header className="relative space-y-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <div className="mx-auto sm:mx-0 shrink-0">
              <Image
                src="/brand/planewx-icon-light.png"
                alt="PlaneWX"
                width={128}
                height={128}
                className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-[1.35rem]"
                priority
              />
            </div>

            <div className="space-y-4 min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
                TestFlight beta
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                PlaneWX for iOS
              </h1>
              <p className="text-lg sm:text-xl text-white/65 max-w-xl leading-relaxed">
                The Pilot&apos;s Decision Support System on iPhone and iPad — trips,
                WX Score, briefings, ForeFlight import, and push alerts.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <a
              href={PLANEWX_IOS_TESTFLIGHT_URL}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Join the TestFlight beta
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://app.planewx.ai"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 font-semibold transition-all"
            >
              Open in browser
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="text-sm text-white/40 max-w-xl leading-relaxed">
            Available on TestFlight — Apple&apos;s free app for installing iOS apps
            before they are on the App Store. Open the invite on iPhone or iPad and
            TestFlight installs it.
          </p>
        </header>

        <section className="space-y-8" aria-labelledby="planewx-ios-features">
          <div className="space-y-2 max-w-2xl">
            <h2 id="planewx-ios-features" className="text-2xl sm:text-3xl font-bold tracking-tight">
              What you get
            </h2>
            <p className="text-white/55 leading-relaxed">
              Native shell around the same PlaneWX account — built for the hangar,
              the couch, and the day-before call with your passengers.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <li
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-3"
              >
                <feature.icon className="h-6 w-6 text-[#3B82F6]" aria-hidden />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{feature.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-10 space-y-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">More free apps from PlaneWX</h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            TBM Boldface and GA Customs are also on TestFlight — memory items for TBM
            pilots and U.S. Airport of Entry hours &amp; fees.
          </p>
          <Link
            href="/apps"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all"
          >
            See all apps
            <ArrowRight className="h-4 w-4" />
          </Link>
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
            <Link href="/apps" className="hover:text-white/60 transition-colors">
              Apps
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
