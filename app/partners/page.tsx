import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partners who help pilots fly safer. PlaneWX works with aviation organizations and companies that support general aviation decision support.",
  openGraph: {
    title: "Partners | PlaneWX",
    description:
      "Partners who help pilots fly safer. Meet the organizations working alongside PlaneWX for general aviation.",
    type: "website",
    url: "https://www.planewx.ai/partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners | PlaneWX",
    description:
      "Partners who help pilots fly safer. Meet the organizations working alongside PlaneWX for general aviation.",
  },
  alternates: {
    canonical: "https://www.planewx.ai/partners",
  },
}

const PARTNERS = [
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
      src: "/partners/vac.png",
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
] as const

export default function PartnersPage() {
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
            {/* Official SoT light wordmark for dark nav (transparent plate) */}
            <BrandLogo
              variant="wordmarkTransparent"
              className="h-7 sm:h-8 w-auto max-w-[min(100%,11rem)]"
            />
            <span className="hidden sm:inline text-xs text-white/45 tracking-wide truncate">
              Pilot Decision Support
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

      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-10 sm:space-y-12">
        <header className="space-y-4 text-center sm:text-left max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
            PlaneWX
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Partners
          </h1>
          <p className="text-lg sm:text-xl text-white/65 leading-relaxed">
            Partners who help pilots fly safer.
          </p>
          <p className="text-sm sm:text-base text-white/45 leading-relaxed">
            PlaneWX is built with the GA community: clubs, brands, and pilots who
            care about clearer go / no-go calls. Listing here means collaboration
            or shared community, not an endorsement of PlaneWX by any partner. The
            PIC still owns every decision.
          </p>
        </header>

        <section aria-labelledby="partners-grid-heading" className="space-y-5">
          <h2 id="partners-grid-heading" className="sr-only">
            Partner organizations
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="h-full">
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  <div className="flex min-h-[4.75rem] items-center justify-center rounded-xl bg-white/[0.04] px-4 py-4 mb-4">
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      className={partner.logo.className}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 mt-auto">
                    <div className="space-y-2 min-w-0">
                      <p className="font-semibold text-white group-hover:text-sky-300 transition-colors">
                        {partner.name}
                      </p>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {partner.blurb}
                      </p>
                    </div>
                    <ExternalLink
                      className="h-4 w-4 shrink-0 text-white/30 group-hover:text-sky-400 transition-colors mt-1"
                      aria-hidden
                    />
                  </div>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-8 space-y-3 text-center sm:text-left">
          {/* Sara lock: CTA heading must stay exactly this string. */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Built with pilots, for pilots
          </h2>
          {/*
            PLACEHOLDER for Sara swap (CoS): exact body paragraph not available yet.
            Do not treat this as final Sara copy. CoS will interrupt with her text.
          */}
          {/* PLACEHOLDER: Sara exact body pending */}
          <p className="text-white/55 leading-relaxed max-w-2xl">
            PlaneWX works with the pilots, clubs, and brands that make flying
            safer and more useful. More partners and ambassadors coming.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              href="https://app.planewx.ai"
              className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Get PlaneWX
            </Link>
            <a
              href="mailto:hello@planewx.ai?subject=Partnership%20inquiry"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-sky-500/30 text-white/80 hover:text-white px-6 py-3 text-sm font-semibold transition-colors"
            >
              Partnership inquiries
            </a>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">
            Want to talk partnerships? Email{" "}
            <a
              href="mailto:hello@planewx.ai?subject=Partnership%20inquiry"
              className="text-sky-300/90 hover:text-sky-300 underline underline-offset-2"
            >
              hello@planewx.ai
            </a>
            {" "}with subject &ldquo;Partnership inquiry.&rdquo;
          </p>
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
