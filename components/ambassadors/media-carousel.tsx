"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

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
    src: "/partners/media/osh26-sara-flightchops-mark-rv14-0413.jpg",
    alt: "Sara Wolfgang, Flight Chops, and Mark Wolfgang beside the yellow RV-14 with PlaneWX logos at Oshkosh",
    width: 1500,
    height: 2000,
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
    src: "/partners/media/osh26-mark-sara-flightchops-rv14-0411.jpg",
    alt: "Mark Wolfgang, Sara Wolfgang, and Flight Chops by the RV-14 at EAA AirVenture Oshkosh",
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

const AUTO_MS = 4500

export function AmbassadorsMediaCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const paused = hoverPaused || userPaused

  const scrollByCard = useCallback((dir: -1 | 1, wrap = false) => {
    const scroller = scrollerRef.current
    const card = scroller?.querySelector<HTMLElement>("[data-media-card]")
    if (!scroller || !card) return
    const styles = window.getComputedStyle(scroller)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "12") || 12
    const step = card.offsetWidth + gap
    const max = scroller.scrollWidth - scroller.clientWidth
    if (wrap && dir === 1 && scroller.scrollLeft + step >= max - 4) {
      // Instant wrap: bypass CSS scroll-smooth on the container
      const prev = scroller.style.scrollBehavior
      scroller.style.scrollBehavior = "auto"
      scroller.scrollLeft = 0
      scroller.style.scrollBehavior = prev
      return
    }
    scroller.scrollBy({
      left: dir * step,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (paused || media.matches) return
    const id = window.setInterval(() => {
      if (document.visibilityState === "hidden") return
      scrollByCard(1, true)
    }, AUTO_MS)
    const stopIfReduced = () => {
      if (media.matches) window.clearInterval(id)
    }
    media.addEventListener("change", stopIfReduced)
    return () => {
      window.clearInterval(id)
      media.removeEventListener("change", stopIfReduced)
    }
  }, [paused, scrollByCard])

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const videos = Array.from(root.querySelectorAll("video"))
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")

    const syncVideos = () => {
      for (const video of videos) {
        if (reduced.matches) {
          video.pause()
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.45 &&
            !reduced.matches
          ) {
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
    reduced.addEventListener("change", syncVideos)
    syncVideos()
    return () => {
      observer.disconnect()
      reduced.removeEventListener("change", syncVideos)
    }
  }, [])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="PlaneWX community at Oshkosh"
      className="relative w-full"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHoverPaused(false)
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
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() => setUserPaused((value) => !value)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Resume automatic scrolling" : "Pause automatic scrolling"}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors"
        >
          {userPaused ? (
            <Play className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <Pause className="h-3.5 w-3.5" aria-hidden />
          )}
          {userPaused ? "Resume" : "Pause"}
        </button>
      </div>
    </section>
  )
}
