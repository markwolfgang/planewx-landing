import Image from "next/image"
import Link from "next/link"

/**
 * Dark-safe partner marks from main `/partners` (whitened or dark-bg variants).
 * Homepage row: 5X5, ACA, VAC, AOPA, COPA, EAA, TBMOPA (Flight Chops endorsement stays separate).
 */
const HOMEPAGE_PARTNER_LOGOS = [
  {
    name: "5X5 Aviation Insurance",
    alt: "5X5 Aviation Insurance logo",
    src: "/partners/5x5-white.png",
    width: 2500,
    height: 613,
  },
  {
    name: "Air Care Alliance",
    alt: "Air Care Alliance logo",
    src: "/partners/aca-white.svg",
    width: 369,
    height: 133,
  },
  {
    name: "Veterans Airlift Command",
    alt: "Veterans Airlift Command logo",
    src: "/partners/vac-white.png",
    width: 712,
    height: 232,
  },
  {
    name: "AOPA",
    alt: "AOPA logo",
    src: "/partners/aopa-white.svg",
    width: 96,
    height: 51,
  },
  {
    name: "COPA",
    alt: "COPA logo",
    src: "/partners/copa-white.png",
    width: 394,
    height: 96,
  },
  {
    name: "EAA",
    alt: "EAA logo",
    src: "/partners/eaa-white.png",
    width: 861,
    height: 492,
  },
  {
    name: "TBMOPA",
    alt: "TBMOPA logo",
    src: "/partners/tbmopa-white.png",
    width: 800,
    height: 377,
    // Wider ~2.1:1 mark with two-line subtitle; taller box so the wordmark matches peers.
    boxClassName: "h-9 sm:h-11",
    imageClassName: "h-full w-auto max-w-[10rem] sm:max-w-[12.5rem] object-contain",
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
            className={`inline-flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity ${
              "boxClassName" in logo && logo.boxClassName
                ? logo.boxClassName
                : "h-8 sm:h-9"
            }`}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={
                "imageClassName" in logo && logo.imageClassName
                  ? logo.imageClassName
                  : "h-full w-auto max-w-[7.5rem] sm:max-w-[9rem] object-contain"
              }
            />
          </span>
        ))}
      </Link>
    </div>
  )
}
