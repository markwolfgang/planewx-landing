import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Play } from "lucide-react"
import { AmbassadorsMediaCarousel } from "@/components/ambassadors/media-carousel"
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

const AMBASSADORS = [
  {
    name: "Don Medine",
    org: "SF50 Flight Support",
    logo: {
      src: "/ambassadors/sf50-fs-flight-support-logo.png",
      alt: "SF50 FS Flight Support logo",
      width: 1254,
      height: 1254,
      className: "h-20 sm:h-24 w-auto max-w-[9rem] object-contain",
      wellClassName: "bg-white",
    },
    photos: [
      {
        src: "/ambassadors/don-medine-polo-1-web.jpg",
        alt: "Don Medine in a PlaneWX polo in the cockpit",
        width: 1600,
        height: 1200,
      },
      {
        src: "/ambassadors/don-medine-polo-2-web.jpg",
        alt: "Don Medine wearing a PlaneWX polo on the flight deck",
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    name: "Flight Chops",
    href: "https://flightchops.com",
    logo: {
      src: "/ambassadors/flight-chops.png",
      alt: "Flight Chops logo",
      width: 800,
      height: 766,
      className: "h-14 sm:h-16 w-auto max-w-[9rem] object-contain",
    },
    blurb:
      "Training and storytelling that put real pilot decision-making on camera. A PlaneWX partner helping more pilots brief with intent.",
  },
  {
    name: "Kneeboard Pro",
    href: "https://kneeboardpro.imctvmedia.com/",
    logo: {
      src: "/ambassadors/kneeboard-pro.png",
      alt: "Kneeboard Pro logo",
      width: 1120,
      height: 840,
      className: "h-14 sm:h-16 w-auto max-w-[10rem] object-contain",
    },
    blurb:
      "Free browser tool that turns your flight plan into printable kneeboard sheets, one page per leg with frequencies and cockpit note fields. Built by IMC TV Media for VFR and IFR pilots.",
    featureVideo: {
      href: "https://youtu.be/XqYzuOc3Y4o",
      label: "Feature video",
    },
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
        <AmbassadorsMediaCarousel />
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
          <ul className="grid grid-cols-1 gap-4">
            {AMBASSADORS.map((ambassador) => {
              const featureVideo =
                "featureVideo" in ambassador ? ambassador.featureVideo : undefined
              const photos =
                "photos" in ambassador ? ambassador.photos : undefined
              const href = "href" in ambassador ? ambassador.href : undefined
              const blurb = "blurb" in ambassador ? ambassador.blurb : undefined
              const org = "org" in ambassador ? ambassador.org : undefined
              const logoWellClass =
                "wellClassName" in ambassador.logo && ambassador.logo.wellClassName
                  ? ambassador.logo.wellClassName
                  : "bg-white/[0.04]"

              return (
                <li key={ambassador.name} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors">
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                      <div
                        className={`flex min-h-[5rem] shrink-0 items-center justify-center rounded-xl px-4 py-4 ${logoWellClass}`}
                      >
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          >
                            <Image
                              src={ambassador.logo.src}
                              alt={ambassador.logo.alt}
                              width={ambassador.logo.width}
                              height={ambassador.logo.height}
                              className={ambassador.logo.className}
                            />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <Image
                            src={ambassador.logo.src}
                            alt={ambassador.logo.alt}
                            width={ambassador.logo.width}
                            height={ambassador.logo.height}
                            className={ambassador.logo.className}
                          />
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-3">
                        <div className="space-y-1">
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
                          {org ? (
                            <p className="text-sm font-medium text-sky-300/90">
                              {org}
                            </p>
                          ) : null}
                          {blurb ? (
                            <p className="text-sm text-white/50 leading-relaxed">
                              {blurb}
                            </p>
                          ) : null}
                        </div>
                        {featureVideo ? (
                          <a
                            href={featureVideo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-sky-300/90 hover:text-sky-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          >
                            <Play className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            {featureVideo.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                    {photos ? (
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {photos.map((photo) => (
                          <div
                            key={photo.src}
                            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black/40"
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(min-width: 640px) 50vw, 100vw"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
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
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
