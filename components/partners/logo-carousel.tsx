"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type PartnerLogoSlide = {
  name: string
  href: string
  src: string
  alt: string
  width: number
  height: number
  onLight?: boolean
}

export function PartnersLogoCarousel({ items }: { items: PartnerLogoSlide[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(dir: -1 | 1) {
    const scroller = scrollerRef.current
    const card = scroller?.querySelector<HTMLElement>("[data-logo-card]")
    if (!scroller || !card) return
    const styles = window.getComputedStyle(scroller)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "12") || 12
    scroller.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: "smooth",
    })
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Partner logos"
      className="relative"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous partners"
          className="shrink-0 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <a
              key={item.name}
              data-logo-card
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-[80%] sm:w-[calc(50%-0.375rem)] lg:w-[calc((100%-1.5rem)/3)] rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 sm:px-5 sm:py-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              <div
                className={`flex min-h-[6.5rem] sm:min-h-[7.5rem] items-center justify-center rounded-xl px-3 py-4 ${
                  item.onLight ? "bg-white" : "bg-black/25"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-14 sm:h-16 w-auto max-w-[11rem] object-contain"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-white/70 truncate">
                {item.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </p>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next partners"
          className="shrink-0 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </section>
  )
}
