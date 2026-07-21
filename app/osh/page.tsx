import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Gift,
  MapPin,
  Mic2,
  PartyPopper,
  GlassWater,
} from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { OshRaffleForm } from "@/components/osh-raffle-form"

export const metadata: Metadata = {
  title: "PlaneWX at Oshkosh 2026",
  description:
    "Meet PlaneWX at AirVenture — Wed 11 AM meetup at Flyte Booth 337 with giveaways, plus Mark Wolfgang's Forum Stage 10 talk on Advanced Aviation Risk Management at 4 PM.",
  openGraph: {
    title: "PlaneWX at Oshkosh — Meetup, Giveaway & Forum Talk",
    description:
      "Wed 11 AM at Flyte Booth 337. Enter for Flyte sunglasses + PlaneWX merch. Must be present to win. Forum talk 4 PM Stage 10.",
    type: "website",
    url: "https://www.planewx.ai/osh",
  },
  alternates: {
    canonical: "https://www.planewx.ai/osh",
  },
}

const TALK_URL = "https://events.rdmobile.com/Sessions/Details/3567392"
const SIGNUP_URL = "https://app.planewx.ai/auth/sign-up?lp=osh"

export default function OshkoshPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a0f1a]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <nav className="border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
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

      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* Hero */}
        <header className="space-y-5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold tracking-wide uppercase">
            EAA AirVenture Oshkosh 2026
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Meet PlaneWX at{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Oshkosh
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/65 max-w-2xl leading-relaxed">
            Join us Wednesday for a meetup at the Flyte booth — drinks, giveaways,
            and a chance to meet founder Mark. Then catch his forum talk on
            Advanced Aviation Risk Management.
          </p>
        </header>

        {/* Giveaway */}
        <section
          id="giveaway"
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
              <Image
                src="/osh/flyte-giveaway.jpg"
                alt="Flyte sunglasses display and PlaneWX hat"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-semibold uppercase tracking-wide">
                <Gift className="h-4 w-4" />
                Giveaway entry
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Enter for Flyte shades + PlaneWX merch
              </h2>
              <ul className="space-y-2 text-white/70 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <PartyPopper className="h-4 w-4 text-sky-400 mt-1 shrink-0" />
                  2× Flyte sunglasses + PlaneWX hats &amp; t-shirts
                </li>
                <li className="flex items-start gap-2">
                  <GlassWater className="h-4 w-4 text-sky-400 mt-1 shrink-0" />
                  Booth drinks provided by Flyte
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-sky-400 mt-1 shrink-0" />
                  Drawing at the meetup — must be present to win
                </li>
              </ul>
              <OshRaffleForm />
            </div>
          </div>
        </section>

        {/* Two events */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Wednesday schedule</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Meetup card */}
            <article className="relative rounded-xl bg-[#e8f1f8] overflow-hidden border border-sky-200/40">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-sky-400" />
              <div className="pl-5 pr-5 py-5 sm:pl-6 space-y-3">
                <p className="text-sky-500 text-xs font-bold uppercase tracking-wider">
                  Meetup
                </p>
                <h3 className="text-[#0c2d4a] font-bold text-lg sm:text-xl leading-snug">
                  11 AM PlaneWX Meetup @ Flyte
                </h3>
                <p className="text-[#3d5a73] text-sm leading-relaxed">
                  We want to meet you. Come meet founder Mark, try on some cool
                  shades, grab a drink, and enter the giveaway.
                </p>
                <dl className="space-y-1.5 text-sm text-[#0c2d4a]/80">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-sky-500" />
                    <dd>Wednesday · 11:00 AM</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-sky-500" />
                    <dd>Flyte Booth 337</dd>
                  </div>
                </dl>
                <a
                  href="#giveaway"
                  className="inline-flex items-center text-sky-500 hover:text-sky-600 font-semibold text-sm pt-1"
                >
                  Enter the giveaway →
                </a>
              </div>
            </article>

            {/* Talk card */}
            <article className="relative rounded-xl bg-[#e8f1f8] overflow-hidden border border-sky-200/40">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-sky-400" />
              <div className="pl-5 pr-5 py-5 sm:pl-6 space-y-3">
                <p className="text-sky-500 text-xs font-bold uppercase tracking-wider">
                  Forum talk
                </p>
                <h3 className="text-[#0c2d4a] font-bold text-lg sm:text-xl leading-snug">
                  Advanced Aviation Risk Management
                </h3>
                <p className="text-[#3d5a73] text-sm leading-relaxed">
                  How automation (and a little AI) aggregates weather products
                  against your personal minimums — and turns that into a
                  personalized WX Score inside a PAVE risk assessment.
                </p>
                <dl className="space-y-1.5 text-sm text-[#0c2d4a]/80">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-sky-500" />
                    <dd>Wednesday · 4:00–5:15 PM CDT</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic2 className="h-3.5 w-3.5 text-sky-500" />
                    <dd>Forum Stage 10 · Mark Wolfgang</dd>
                  </div>
                </dl>
                <a
                  href={TALK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sky-500 hover:text-sky-600 font-semibold text-sm pt-1"
                >
                  View on EAA schedule →
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Flyer + stage photos */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/osh/meetup-flyer.jpg"
              alt="PlaneWX × Flyte meetup flyer"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/osh/forum-stage.jpg"
              alt="Mark Wolfgang pointing to his Forum Stage 10 talk on the AirVenture schedule"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">
            The confidence to go, or the courage to stay™
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            PlaneWX is the Pilot&apos;s Decision Support System — personal minimums,
            multi-model weather, and a WX Score that helps you decide days earlier.
          </p>
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all"
          >
            Start free 14-day trial
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        <footer className="text-center text-xs text-white/30 pb-8">
          Partnered with{" "}
          <a
            href="https://flyte.aero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/45 hover:text-white/70 underline underline-offset-2"
          >
            Flyte
          </a>
          {" · "}
          <Link href="/privacy" className="hover:text-white/50">
            Privacy
          </Link>
        </footer>
      </main>
    </div>
  )
}
