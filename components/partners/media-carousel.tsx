"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PhotoSlide = {
  type: "photo"
  src: string
  alt: string
  width: number
  height: number
  objectPosition?: string
}

type VideoSlide = {
  type: "video"
  src: string
  poster: string
  alt: string
}

type BadgeSlide = {
  type: "badge"
  src: string
  alt: string
  width: number
  height: number
}

type MediaSlide = PhotoSlide | VideoSlide | BadgeSlide

const SLIDES: MediaSlide[] = [
  {
    type: "photo",
    src: "/partners/media/mark-diamond-osh.jpg",
    alt: "Mark Wolfgang of PlaneWX with Paul Koch of the Diamond Pilots Association at EAA AirVenture Oshkosh",
    width: 2000,
    height: 1500,
  },
  {
    type: "photo",
    src: "/partners/media/flyte-hat.jpg",
    alt: "FLYTE sunglass stand and a PlaneWX hat at an outdoor booth",
    width: 1200,
    height: 1600,
  },
  {
    type: "video",
    src: "/partners/media/flightline-aerobatics.mp4",
    poster: "/partners/media/flightline-aerobatics-poster.jpg",
    alt: "PlaneWX on a yellow aerobatic ship at Oshkosh, then smoke in the box",
  },
  {
    type: "photo",
    src: "/partners/media/rv14-logo.jpg",
    alt: "Yellow Flight Chops RV-14 at Oshkosh with the PlaneWX wordmark on the fuselage",
    width: 1200,
    height: 1600,
    objectPosition: "center 70%",
  },
  {
    type: "video",
    src: "/partners/media/copper-mark.mp4",
    poster: "/partners/media/copper-mark-poster.jpg",
    alt: "Mark at EAA pointing to PlaneWX on the Copper Supporters board",
  },
  {
    type: "photo",
    src: "/partners/media/osh26-sara-flightchops-mark-rv14-0413.jpg",
    alt: "Sara Wolfgang, Flight Chops, and Mark Wolfgang beside the yellow RV-14 with PlaneWX logos at Oshkosh",
    width: 1500,
    height: 2000,
  },
  {
    type: "photo",
    src: "/partners/media/osh26-mark-sara-flightchops-rv14-0411.jpg",
    alt: "Mark Wolfgang, Sara Wolfgang, and Flight Chops by the RV-14 at EAA AirVenture Oshkosh",
    width: 1500,
    height: 2000,
  },
  {
    type: "photo",
    src: "/partners/media/osh26-mark-sara-flightchops-rv14-0410.jpg",
    alt: "Mark Wolfgang, Sara Wolfgang, and Flight Chops with the PlaneWX RV-14 at Oshkosh",
    width: 1500,
    height: 2000,
  },
  {
    type: "badge",
    src: "/partners/media/eaa-proud-supporter-2026-white.png",
    alt: "Proud Supporter of EAA AirVenture Oshkosh 2026, Copper sponsor",
    width: 1200,
    height: 1200,
  },
]

const AUTO_MS = 5000

export function PartnersMediaCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  const scrollByCard = useCallback((dir: -1 | 1, wrap = false) => {
    const scroller = scrollerRef.current
    const card = scroller?.querySelector<HTMLElement>("[data-media-card]")
    if (!scroller || !card) return
    const styles = window.getComputedStyle(scroller)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "12") || 12
    const step = card.offsetWidth + gap
    const max = scroller.scrollWidth - scroller.clientWidth
    if (wrap && dir === 1 && scroller.scrollLeft + step >= max - 4) {
      scroller.scrollTo({ left: 0, behavior: "smooth" })
      return
    }
    scroller.scrollBy({
      left: dir * step,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    if (paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => scrollByCard(1, true), AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused, scrollByCard])

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const videos = Array.from(root.querySelectorAll("video"))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            const play = video.play()
            if (play) play.catch(() => {})
          } else {
            video.pause()
          }
        }
      },
      { root, threshold: [0.45] }
    )
    videos.forEach((video) => observer.observe(video))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Partners at Oshkosh"
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous photo or video"
          className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          className="flex min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((slide, i) => (
            <figure
              key={slide.src}
              data-media-card
              className="snap-start shrink-0 w-[min(80vw,22rem)] sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.5rem)/3)] overflow-hidden rounded-2xl border border-white/10 bg-black/50"
            >
              <div className="relative w-full aspect-[4/3] min-h-[14rem] sm:min-h-[16rem] lg:min-h-[18rem]">
                {slide.type === "photo" ? (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
                    priority={i === 0}
                    className="object-cover"
                    style={
                      slide.objectPosition
                        ? { objectPosition: slide.objectPosition }
                        : undefined
                    }
                  />
                ) : slide.type === "badge" ? (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
                    className="object-contain p-6 sm:p-8"
                  />
                ) : (
                  <video
                    className="absolute inset-0 h-full w-full bg-black object-cover"
                    poster={slide.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls
                    aria-label={slide.alt}
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                )}
              </div>
              <figcaption className="sr-only">{slide.alt}</figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next photo or video"
          className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </section>
  )
}
