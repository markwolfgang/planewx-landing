import Image from "next/image"
import Link from "next/link"

/**
 * Dark-safe partner marks from main `/partners` (whitened or dark-bg variants).
 * Excludes FLYTE, Runway to Oshkosh, TBMOPA, and placeholders.
 */
const HOMEPAGE_PARTNER_LOGOS = [
  {
    name: "5X5 Aviation Insurance",
    src: "/partners/5x5-white.png",
    width: 2500,
    height: 613,
  },
  {
    name: "Air Care Alliance",
    src: "/partners/aca-white.svg",
    width: 369,
    height: 133,
  },
  {
    name: "Veterans Airlift Command",
    src: "/partners/vac-white.png",
    width: 712,
    height: 232,
  },
  {
    name: "AOPA",
    src: "/partners/aopa-white.svg",
    width: 96,
    height: 51,
  },
  {
    name: "COPA",
    src: "/partners/copa-white.png",
    width: 394,
    height: 96,
  },
  {
    name: "EAA",
    src: "/partners/eaa-white.png",
    width: 861,
    height: 492,
  },
  {
    name: "Flight Chops",
    src: "/partners/flight-chops.png",
    width: 800,
    height: 766,
  },
] as const

export function HomepagePartnerLogos() {
  return (
    <div className="mt-10 pt-8 border-t border-white/5">
      <Link
        href="/partners"
        className="group flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 sm:gap-y-7"
        aria-label="View PlaneWX partners"
      >
        {HOMEPAGE_PARTNER_LOGOS.map((logo) => (
          <span
            key={logo.name}
            className="inline-flex h-8 sm:h-9 items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="h-full w-auto max-w-[7.5rem] sm:max-w-[9rem] object-contain"
            />
          </span>
        ))}
      </Link>
    </div>
  )
}
