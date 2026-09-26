import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AdvisorInquiryForm } from "@/components/advisors/inquiry-form"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"

export const metadata: Metadata = {
  title: "Board of Advisors",
  description:
    "We're building a small group of advisors to help shape the future of PlaneWX, the decision support system for general aviation.",
  openGraph: {
    title: "Board of Advisors | PlaneWX",
    description:
      "We're building a small group of advisors to help shape the future of PlaneWX, the decision support system for general aviation.",
    type: "website",
    url: "https://www.planewx.ai/advisors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Board of Advisors | PlaneWX",
    description:
      "We're building a small group of advisors to help shape the future of PlaneWX, the decision support system for general aviation.",
  },
  alternates: {
    canonical: "https://www.planewx.ai/advisors",
  },
}

const LOOKING_FOR = [
  "General aviation experience (pilots, CFIs, owners, type club and OPA leaders)",
  "Weather and flight operations know-how",
  "Aviation industry relationships (avionics, insurance, flight schools, FBOs, media, organizations)",
  "Company-building experience (SaaS, subscriptions, marketing, fundraising)",
  "A safety and training perspective",
] as const

const ADVISOR_LOOKS_LIKE = [
  "A few conversations a quarter with Sara and Mark",
  "Honest feedback on product, messaging, and partnerships",
  "Introductions when it makes sense",
  "Early looks at new features",
  "Flexible terms discussed one on one",
] as const

export default function AdvisorsPage() {
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
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 min-w-0"
            aria-label="PlaneWX home"
          >
            <BrandLogo
              variant="wordmarkTransparent"
              className="h-7 sm:h-8 w-auto max-w-[min(100%,11rem)]"
            />
            <span className="hidden sm:inline text-xs text-white/45 tracking-wide truncate">
              Pilot Decision Support
            </span>
          </Link>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/partners"
              className="hidden sm:inline text-sm text-white/50 hover:text-white transition-colors"
            >
              Partners
            </Link>
            <Link
              href="/ambassadors"
              className="hidden sm:inline text-sm text-white/50 hover:text-white transition-colors"
            >
              Ambassadors
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-10 sm:space-y-12">
        <header className="space-y-4 text-center sm:text-left max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
            PlaneWX
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            PlaneWX Board of Advisors
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            We&apos;re building a small group of advisors to help shape the
            future of PlaneWX, the decision support system for general aviation.
            Our board isn&apos;t formed yet, and we&apos;re open to the
            conversation.
          </p>
        </header>

        <section
          aria-labelledby="why-board-heading"
          className="space-y-3 max-w-3xl"
        >
          <h2
            id="why-board-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            Why we&apos;re building a board
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            PlaneWX was built by pilots, for pilots. As we grow, we want
            experienced voices around the table: people who know general
            aviation, know how pilots make decisions, and know how to build a
            company that lasts.
          </p>
        </section>

        <section
          aria-labelledby="looking-for-heading"
          className="space-y-4 max-w-3xl"
        >
          <h2
            id="looking-for-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            What we&apos;re looking for
          </h2>
          <ul className="space-y-3">
            {LOOKING_FOR.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm sm:text-base text-white/65 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="looks-like-heading"
          className="space-y-4 max-w-3xl"
        >
          <h2
            id="looks-like-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            What being an advisor looks like
          </h2>
          <ul className="space-y-3">
            {ADVISOR_LOOKS_LIKE.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm sm:text-base text-white/65 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-8 space-y-4 text-center sm:text-left max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Interested in joining our Board of Advisors?
          </h2>
          <p className="text-white/55 leading-relaxed max-w-2xl">
            Let&apos;s talk.
          </p>
          <div className="pt-1">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Start the conversation
            </a>
          </div>
        </section>

        <section
          id="apply"
          aria-labelledby="apply-heading"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-2">
            <h2
              id="apply-heading"
              className="text-xl sm:text-2xl font-bold tracking-tight"
            >
              Start the conversation
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl">
              Tell us a little about yourself. We&rsquo;ll take it from there.
            </p>
          </div>
          <AdvisorInquiryForm />
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
