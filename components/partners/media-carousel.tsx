"use client"

import { useEffect, useRef } from "react"
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

type MediaSlide = PhotoSlide | VideoSlide

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
]

export function PartnersMediaCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(dir: -1 | 1) {
    const scroller = scrollerRef.current
    const card = scroller?.querySelector<HTMLElement>("[data-media-card]")
    if (!scroller || !card) return
    const styles = window.getComputedStyle(scroller)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "12") || 12
    scroller.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: "smooth",
    })
  }

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
      className="relative"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous photo or video"
          className="shrink-0 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((slide) => (
            <figure
              key={slide.src}
              data-media-card
              className="snap-start shrink-0 w-[80%] sm:w-[calc(50%-0.375rem)] lg:w-[calc((100%-1.5rem)/3)] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                {slide.type === "photo" ? (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={
                      slide.objectPosition
                        ? { objectPosition: slide.objectPosition }
                        : undefined
                    }
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
          className="shrink-0 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </section>
  )
}
