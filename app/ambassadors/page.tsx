import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Play } from "lucide-react"
import { AmbassadorsMediaCollage } from "@/components/ambassadors/media-collage"
import { AmbassadorInquiryForm } from "@/components/ambassadors/inquiry-form"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"

export const metadata: Metadata = {
  title: "Ambassadors",
  description:
    "Come be a part of our community. PlaneWX ambassadors, fly-ins, and community events.",
  openGraph: {
    title: "Ambassadors | PlaneWX",
    description:
      "Come be a part of our community. PlaneWX ambassadors, fly-ins, and community events.",
    type: "website",
    url: "https://www.planewx.ai/ambassadors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ambassadors | PlaneWX",
    description:
      "Come be a part of our community. PlaneWX ambassadors, fly-ins, and community events.",
  },
  alternates: {
    canonical: "https://www.planewx.ai/ambassadors",
  },
}

/**
 * Compact roster tiles (Round 2 i): square tile left; name + link + one-line
 * description right. One Don photo only (f/h). Sara asked for Sara/Mark/Don by
 * Don's SF50 on Don's tile; that file is not in the repo, so polo-1 is interim
 * (flagged in Round 2 report).
 */
const AMBASSADORS = [
  {
    name: "Don Medine",
    description: "SF50 Flight Support",
    tile: {
      src: "/ambassadors/don-medine-polo-1-web.jpg",
      alt: "Don Medine in a PlaneWX polo in the cockpit",
      width: 1600,
      height: 1200,
      objectFit: "cover" as const,
    },
  },
  {
    name: "Flight Chops",
    href: "https://flightchops.com",
    description:
      "Training and storytelling that put real pilot decision-making on camera.",
    tile: {
      src: "/ambassadors/flight-chops.png",
      alt: "Flight Chops logo",
      width: 800,
      height: 766,
      objectFit: "contain" as const,
      wellClassName: "bg-white/[0.04]",
    },
  },
  {
    name: "Kneeboard Pro",
    href: "https://kneeboardpro.imctvmedia.com/",
    description:
      "Free browser kneeboard sheets from your flight plan, one page per leg.",
    tile: {
      src: "/ambassadors/kneeboard-pro.png",
      alt: "Kneeboard Pro logo",
      width: 1120,
      height: 840,
      objectFit: "contain" as const,
      wellClassName: "bg-white/[0.04]",
    },
    featureVideo: {
      href: "https://youtu.be/XqYzuOc3Y4o",
      label: "Feature video",
    },
  },
] as const

const PROGRAM = [
  {
    title: "Community",
    body: "Clubs, owners groups, events.",
  },
  {
    title: "Co-marketing",
    body: "Pilot-to-pilot voice.",
  },
] as const

export default function AmbassadorsPage() {
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
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-6xl px-4 pt-4 sm:pt-5">
        <AmbassadorsMediaCollage />
      </div>

      <main className="container mx-auto max-w-5xl px-4 pt-10 sm:pt-12 pb-16 sm:pb-20 space-y-12 sm:space-y-14">
        <header className="space-y-4 text-center sm:text-left max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
            PlaneWX
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Ambassadors
          </h1>
        </header>

        {/* Round 2 l: WHO WE WORK WITH from PR #83 (ambassadors only) */}
        <section
          aria-labelledby="who-we-work-with"
          className="mx-auto max-w-3xl text-center space-y-5 sm:space-y-6"
        >
          <h2
            id="who-we-work-with"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[1.05] text-white"
          >
            Who we work with
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/60 leading-[1.7]">
            We work with people who use PlaneWX and can share that experience.
            Organizations, ambassadors, and content creators. We grow together.
            Real relationships. Meetups and community when the fit is there.
          </p>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/60 leading-[1.7]">
            If you&apos;re using PlaneWX and can see yourself working with us,
            let&apos;s connect.
          </p>
          <div className="pt-1">
            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Let&apos;s connect
            </a>
          </div>
        </section>

        {/* Round 2 m: Why partner + What a partnership is (ambassadors only) */}
        <section
          aria-labelledby="benefits-heading"
          className="space-y-3 max-w-2xl"
        >
          <h2
            id="benefits-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            Why partner with PlaneWX
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            We want to be around good people and good pilots. Organizations,
            ambassadors, creators. If it&apos;s a real win-win and we can stand
            behind the work, let&apos;s talk.
          </p>
        </section>

        <section aria-labelledby="program-heading" className="space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2
              id="program-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              What a PlaneWX partnership is
            </h2>
            <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-2xl">
              Community or co-marketing.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROGRAM.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-2"
              >
                <h3 className="font-semibold text-sky-300">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="join"
          aria-labelledby="join-heading"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-2">
            <h2
              id="join-heading"
              className="text-xl sm:text-2xl font-bold tracking-tight"
            >
              Come be a part of our community
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl">
              Send a short note. We&rsquo;ll take it from there.
            </p>
          </div>
          <AmbassadorInquiryForm />
        </section>

        <section aria-labelledby="roster-heading" className="space-y-5">
          <div className="space-y-2 text-center sm:text-left">
            <h2
              id="roster-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Ambassador roster
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AMBASSADORS.map((ambassador) => {
              const href = "href" in ambassador ? ambassador.href : undefined
              const featureVideo =
                "featureVideo" in ambassador
                  ? ambassador.featureVideo
                  : undefined
              const wellClass =
                "wellClassName" in ambassador.tile &&
                ambassador.tile.wellClassName
                  ? ambassador.tile.wellClassName
                  : "bg-black/40"
              const objectClass =
                ambassador.tile.objectFit === "contain"
                  ? "object-contain p-2"
                  : "object-cover"

              const tile = (
                <div
                  className={`relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 ${wellClass}`}
                >
                  <Image
                    src={ambassador.tile.src}
                    alt={ambassador.tile.alt}
                    fill
                    sizes="96px"
                    className={objectClass}
                  />
                </div>
              )

              return (
                <li key={ambassador.name} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-start gap-4">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                        >
                          {tile}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        tile
                      )}
                      <div className="min-w-0 flex-1 space-y-2">
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-semibold text-white group-hover:text-sky-300 transition-colors"
                          >
                            {ambassador.name}
                            <ExternalLink
                              className="h-4 w-4 shrink-0 text-white/30 group-hover:text-sky-400"
                              aria-hidden
                            />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <p className="font-semibold text-white">
                            {ambassador.name}
                          </p>
                        )}
                        <p className="text-sm text-white/50 leading-relaxed">
                          {ambassador.description}
                        </p>
                        {featureVideo ? (
                          <a
                            href={featureVideo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-sky-300/90 hover:text-sky-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          >
                            <Play
                              className="h-3.5 w-3.5 shrink-0"
                              aria-hidden
                            />
                            {featureVideo.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-8 space-y-3 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Built with pilots, for pilots
          </h2>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              href="https://app.planewx.ai"
              className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Get PlaneWX
            </Link>
            <Link
              href="/partners"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-sky-500/30 text-white/80 hover:text-white px-6 py-3 text-sm font-semibold transition-colors"
            >
              Partners
            </Link>
          </div>
        </section>

        {/* Round 2 j: fly-ins box last, just above the footer. Copy unchanged. */}
        <section
          aria-labelledby="fly-ins-heading"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-4 max-w-3xl"
        >
          <h2
            id="fly-ins-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            We&apos;re planning fun fly-ins. Want in?
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            We&apos;re looking for fun events to plan with the PlaneWX community.
            Open to suggestions. We want to meet you.
          </p>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            First idea: a{" "}
            <a
              href="https://wacosurf.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-300 hover:text-sky-200 underline underline-offset-4 decoration-sky-300/40"
            >
              Waco Surf
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            fly-in. Surf park in Waco, Texas, about 90 minutes from DFW or Austin.
          </p>
          <p className="text-sm sm:text-base text-white/50 leading-relaxed">
            Interested, or got an idea?{" "}
            <a
              href="#join"
              className="font-medium text-sky-300 hover:text-sky-200 underline underline-offset-4 decoration-sky-300/40"
            >
              Send a community inquiry
            </a>
            .
          </p>
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
