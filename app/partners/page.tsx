import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"

export const metadata: Metadata = {
  title: "Partners",
  description:
    "PlaneWX is pilot decision support. Partners on this page collaborate with the community around that work. A listing is not an endorsement. The PIC owns every go / no-go.",
  openGraph: {
    title: "Partners | PlaneWX",
    description:
      "PlaneWX is pilot decision support. Partners collaborate with the community. A listing is not an endorsement. The PIC owns every go / no-go.",
    type: "website",
    url: "https://www.planewx.ai/partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners | PlaneWX",
    description:
      "PlaneWX is pilot decision support. Partners collaborate with the community. A listing is not an endorsement. The PIC owns every go / no-go.",
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
      "Direct aviation insurance for pilots and owners. Fast online quotes, coverage tailored to how you fly, and discounts that reward training and safety.",
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
      "Real-world cockpit video and training content that puts pilot decision-making on camera.",
  },
  {
    name: "EAA",
    href: "https://www.eaa.org",
    logo: {
      src: "/partners/eaa-white.png",
      alt: "Experimental Aircraft Association (EAA) logo",
      width: 861,
      height: 492,
      className: "h-11 sm:h-12 w-auto max-w-[10rem] object-contain",
    },
    blurb:
      "Experimental Aircraft Association. Home of AirVenture Oshkosh and the community that builds, restores, and flies experimental and light aircraft.",
  },
  {
    name: "AOPA",
    href: "https://www.aopa.org",
    logo: {
      src: "/partners/aopa-white.svg",
      alt: "Aircraft Owners and Pilots Association (AOPA) logo",
      width: 96,
      height: 51,
      className: "h-11 sm:h-12 w-auto max-w-[10rem] object-contain",
    },
    blurb:
      "Aircraft Owners and Pilots Association. Advocacy, training, and resources that protect and support GA pilots.",
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
      wellClassName: "bg-white",
    },
    blurb:
      "Volunteer pilots and aircraft owners providing free air transport for wounded veterans and their families.",
  },
  {
    name: "FLYTE",
    href: "https://www.flyte.aero",
    logo: {
      src: "/partners/flyte-white.png",
      alt: "FLYTE logo",
      width: 5758,
      height: 1182,
      className: "h-9 sm:h-10 w-auto max-w-[12rem] object-contain",
    },
    blurb:
      "Aviator sunglasses built for the cockpit. Thin temples for headsets. Non-polarized lenses so glass-cockpit displays stay readable.",
  },
  {
    name: "TBMOPA",
    href: "https://www.tbmowners.org",
    logo: {
      src: "/partners/tbmopa-placeholder.svg",
      alt: "TBMOPA logo",
      width: 320,
      height: 96,
      className: "h-10 sm:h-11 w-auto max-w-[12rem] object-contain",
    },
    blurb:
      "TBM Owners and Pilots Association for Daher TBM owners and operators. Safety, member forums, training and safety seminars, annual convention, and technical answers with Daher expertise.",
  },
  {
    name: "Runway to Oshkosh",
    href: "https://runwaytooshkosh.com",
    logo: {
      src: "/partners/runway-placeholder.svg",
      alt: "Runway to Oshkosh logo",
      width: 360,
      height: 96,
      className: "h-10 sm:h-11 w-auto max-w-[14rem] object-contain",
    },
    blurb:
      "A multi-aircraft flight from Tecnam's U.S. base at Sebring to AirVenture. Three days, 1,047 nautical miles, and the country in between.",
  },
]

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
            <BrandLogo className="h-9 w-auto" priority />
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

      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-10 sm:space-y-12">
        <header className="space-y-4 text-center sm:text-left max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Partners
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
            PlaneWX is pilot decision support.
          </p>
          <p className="text-sm sm:text-base text-white/45 leading-relaxed">
            Partners on this page collaborate with the community around that
            work. A listing is not an endorsement. The PIC owns every go / no-go.
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
                  <div
                    className={`flex min-h-[5rem] items-center justify-center rounded-xl px-4 py-5 mb-4 ${
                      partner.logo.wellClassName ?? "bg-black/25"
                    }`}
                  >
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
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Built with pilots, for pilots
          </h2>
          <p className="text-white/55 leading-relaxed max-w-2xl">
            PlaneWX is pilot decision support, built with the clubs, brands, and
            pilots who care about clearer go / no-go calls. Partners here
            collaborate with our community. Listing is not an endorsement. The
            PIC still owns every decision.
          </p>
          <div className="pt-2">
            <Link
              href="https://app.planewx.ai"
              className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
            >
              Get PlaneWX
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
