import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Mail } from "lucide-react"
import { PartnerApplyForm } from "@/components/partners/apply-form"
import { PartnersMediaCarousel } from "@/components/partners/media-carousel"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"

const PARTNER_MAILTO = "mailto:sara@planewx.ai?subject=Partnership%20inquiry"

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["700", "800"],
})

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with PlaneWX to reach GA pilots who use a decision support system before they launch. Community listing and co-marketing. The PIC owns every go / no-go.",
  openGraph: {
    title: "Partners | PlaneWX",
    description:
      "Reach GA pilots who still own the go / no-go. Partner with PlaneWX through community listing and co-marketing.",
    type: "website",
    url: "https://www.planewx.ai/partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners | PlaneWX",
    description:
      "Reach GA pilots who still own the go / no-go. Partner with PlaneWX through community listing and co-marketing.",
  },
  alternates: {
    canonical: "https://www.planewx.ai/partners",
  },
}

type Partner = {
  name: string
  href: string
  logo: {
    src: string
    alt: string
    width: number
    height: number
    className: string
    wellClassName?: string
  }
  blurb: string
}

// Mark's current main partner logos/cards (PR #74 live roster). Do not swap for
// older polish-branch logos or drop ACA / COPA.
const PARTNERS: Partner[] = [
  {
    name: "5X5 Aviation Insurance",
    href: "https://www.5x5insurance.com",
    logo: {
      src: "/partners/5x5-white.png",
      alt: "5X5 Aviation Insurance logo",
      width: 2500,
      height: 613,
      className: "h-9 sm:h-10 w-auto max-w-[11rem] object-contain",
    },
    blurb:
      "Aviation insurance partner working with PlaneWX so pilots can keep their decision support and their coverage in the same flight picture.",
  },
  {
    name: "Air Care Alliance",
    href: "https://aircarealliance.org",
    logo: {
      // Official white wordmark from ACA site (aca_logo_tag_white.svg); color master at /partners/aca.svg
      src: "/partners/aca-white.svg",
      alt: "Air Care Alliance logo",
      width: 369,
      height: 133,
      className: "h-10 sm:h-11 w-auto max-w-[12rem] object-contain",
    },
    blurb:
      "Nationwide alliance of volunteer pilot groups flying compassion missions for people and animals in need. Kindred work with the volunteer spirit we support at planewx.ai/volunteer.",
  },
  {
    name: "COPA",
    href: "https://www.cirruspilots.org",
    logo: {
      // Official white footer mark from cirruspilots.org; blue header master at /partners/copa.png
      src: "/partners/copa-white.png",
      alt: "COPA (Cirrus Owners and Pilots Association) logo",
      width: 394,
      height: 96,
      className: "h-10 sm:h-11 w-auto max-w-[13rem] object-contain",
    },
    blurb:
      "Cirrus Owners and Pilots Association. Community for Cirrus owners and pilots focused on safety, training, and shared experience.",
  },
  {
    name: "Flight Chops",
    href: "https://flightchops.com",
    logo: {
      src: "/partners/flight-chops.png",
      alt: "Flight Chops logo",
      width: 800,
      height: 766,
      className: "h-14 sm:h-16 w-auto max-w-[9rem] object-contain",
    },
    blurb:
      "Training and storytelling that put real pilot decision-making on camera. A PlaneWX partner helping more pilots brief with intent.",
  },
  {
    name: "EAA",
    href: "https://www.eaa.org",
    logo: {
      // White mark for dark DSS background; color master also shipped at /partners/eaa.png
      src: "/partners/eaa-white.png",
      alt: "Experimental Aircraft Association (EAA) logo",
      width: 861,
      height: 492,
      className: "h-11 sm:h-12 w-auto max-w-[10rem] object-contain",
    },
    blurb:
      "Experimental Aircraft Association. Supporting the builders, restorers, and pilots who keep general aviation moving.",
  },
  {
    name: "AOPA",
    href: "https://www.aopa.org",
    logo: {
      // White SVG for dark navy cards; color master at /partners/aopa.png
      src: "/partners/aopa-white.svg",
      alt: "Aircraft Owners and Pilots Association (AOPA) logo",
      width: 96,
      height: 51,
      className: "h-11 sm:h-12 w-auto max-w-[10rem] object-contain",
    },
    blurb:
      "Aircraft Owners and Pilots Association. Advocating for GA pilots and the freedom to fly.",
  },
  {
    name: "Veterans Airlift Command",
    href: "https://www.veteransairlift.org",
    logo: {
      // White mark for dark DSS cards; color master retained at /partners/vac.png
      src: "/partners/vac-white.png",
      alt: "Veterans Airlift Command logo",
      width: 712,
      height: 232,
      className: "h-9 sm:h-10 w-auto max-w-[12rem] object-contain",
    },
    blurb:
      "Connecting wounded veterans and their families with free air transportation through volunteer pilots and aircraft owners.",
  },
  {
    name: "FLYTE",
    href: "https://www.planewx.ai/flyte",
    logo: {
      // PLACEHOLDER for Sara: Drive Partners Assets empty at launch; social share JPG is weak.
      src: "/partners/flyte-placeholder.svg",
      alt: "FLYTE logo placeholder",
      width: 320,
      height: 96,
      className: "h-10 sm:h-11 w-auto max-w-[12rem] object-contain",
    },
    blurb:
      "Flight sunglasses built for the cockpit: thin temples that play nicely with headsets, and lenses that keep instruments readable. A community partner helping pilots fly more comfortably.",
  },
  {
    name: "TBMOPA",
    href: "https://www.planewx.ai/talks/tbmopa",
    logo: {
      // PLACEHOLDER for Sara: official mark not in handoff; swap when Drive assets land.
      src: "/partners/tbmopa-placeholder.svg",
      alt: "TBMOPA logo placeholder",
      width: 320,
      height: 96,
      className: "h-10 sm:h-11 w-auto max-w-[12rem] object-contain",
    },
    blurb:
      "Owner and pilot organization for the TBM community. Events, education, and a place for TBM operators to learn and connect, including PlaneWX talks.",
  },
  {
    name: "Runway to Oshkosh",
    href: "https://www.planewx.ai/runway",
    logo: {
      // PLACEHOLDER for Sara: campaign mark not in handoff; keep despite Gleam hold. Not Creative Relay.
      src: "/partners/runway-placeholder.svg",
      alt: "Runway to Oshkosh logo placeholder",
      width: 360,
      height: 96,
      className: "h-10 sm:h-11 w-auto max-w-[14rem] object-contain",
    },
    blurb:
      "Campaign and community partner on the road to Oshkosh. Pilots, clubs, and shared events that keep GA connected.",
  },
]

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

function BecomePartnerButton() {
  return (
    <a
      href={PARTNER_MAILTO}
      className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
    >
      Let&apos;s connect
    </a>
  )
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 600px 600px at 25% 0%, rgba(14,165,233,0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 500px 500px at 75% 100%, rgba(99,102,241,0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 400px 400px at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)",
            "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a0f1a 100%)",
          ].join(", "),
        }}
      />

      <nav className="relative z-10 border-b border-white/5">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="PlaneWX home">
            <BrandLogo
              variant="wordmarkTransparent"
              className="h-9 w-auto bg-transparent"
            />
            <span className="hidden md:inline text-xs text-white/40 font-medium tracking-wide ml-1">
              The Pilot&apos;s Decision Support System
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
        </div>
      </nav>

      <div className="container mx-auto max-w-6xl px-4 pt-4 sm:pt-5">
        <PartnersMediaCarousel />
      </div>

      <main className="container mx-auto max-w-5xl px-4 pt-10 sm:pt-12 pb-16 sm:pb-20 space-y-14 sm:space-y-16">
        <header className="mx-auto max-w-3xl text-center space-y-5 sm:space-y-6">
          <h1
            id="who-we-work-with"
            className={`${display.className} text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[1.05] text-white`}
          >
            Who we work with
          </h1>
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
            <BecomePartnerButton />
          </div>
        </header>

        <section aria-labelledby="who-we-work-with" className="space-y-5">
          <p className="sr-only">The PIC owns every go / no-go.</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors">
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center rounded-xl mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                      partner.logo.wellClassName ??
                      "min-h-[4.75rem] px-4 py-4 bg-white/[0.04]"
                    }`}
                  >
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      className={partner.logo.className}
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <div className="flex items-start justify-between gap-3 mt-auto">
                    <div className="space-y-2 min-w-0">
                      <a
                        href={partner.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white group-hover:text-sky-300 transition-colors"
                      >
                        {partner.name}
                      </a>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {partner.blurb}
                      </p>
                    </div>
                    <ExternalLink
                      className="h-4 w-4 shrink-0 text-white/30 group-hover:text-sky-400 transition-colors mt-1"
                      aria-hidden
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="benefits-heading" className="space-y-3 max-w-2xl">
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
                <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

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
              href="#apply"
              className="font-medium text-sky-300 hover:text-sky-200 underline underline-offset-4 decoration-sky-300/40"
            >
              Send a partnership inquiry
            </a>
            .
          </p>
        </section>

        <section
          id="apply"
          aria-labelledby="apply-heading"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sky-300 text-sm font-medium">
              <Mail className="h-4 w-4" aria-hidden />
              Apply
            </div>
            <h2
              id="apply-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Tell us who you are
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl">
              Short note to sara@planewx.ai.
            </p>
          </div>
          <PartnerApplyForm />
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
