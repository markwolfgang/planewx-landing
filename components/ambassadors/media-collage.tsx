"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

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

/**
 * Round 2 collage: about 8 tiles visible, arrows page to the next set.
 * One Don polo only (duplicate selfie removed).
 */
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
    type: "photo",
    src: "/ambassadors/don-medine-polo-1-web.jpg",
    alt: "Don Medine in a PlaneWX polo in the cockpit, looking toward the camera",
    width: 1600,
    height: 1200,
  },
]

const PAGE_SIZE = 8

export function AmbassadorsMediaCollage() {
  const [page, setPage] = useState(0)
  const [playing, setPlaying] = useState<Record<string, boolean>>({})
  // Prefer muted autoplay when a page of tiles appears (Sara Round 2 g).
  useEffect(() => {
    const next: Record<string, boolean> = {}
    for (const slide of SLIDES.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)) {
      if (slide.type === "video") next[slide.src] = true
    }
    setPlaying(next)
  }, [page])
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const pageCount = Math.max(1, Math.ceil(SLIDES.length / PAGE_SIZE))
  const start = page * PAGE_SIZE
  const visible = SLIDES.slice(start, start + PAGE_SIZE)

  const go = useCallback(
    (dir: -1 | 1) => {
      setPage((p) => (p + dir + pageCount) % pageCount)
      setPlaying({})
    },
    [pageCount]
  )

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    for (const slide of visible) {
      if (slide.type !== "video") continue
      const el = videoRefs.current[slide.src]
      if (!el) continue
      if (reduced.matches || !playing[slide.src]) {
        el.pause()
      } else {
        const play = el.play()
        if (play) play.catch(() => {})
      }
    }
  }, [visible, playing])

  return (
    <section
      aria-label="PlaneWX community photos and videos"
      className="relative w-full"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous collage page"
          className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <ul className="min-w-0 flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {visible.map((slide) => (
            <li key={slide.src}>
              <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                <div className="relative w-full aspect-[4/3]">
                  {slide.type === "photo" ? (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                      style={
                        slide.objectPosition
                          ? { objectPosition: slide.objectPosition }
                          : undefined
                      }
                    />
                  ) : (
                    <>
                      <video
                        ref={(el) => {
                          videoRefs.current[slide.src] = el
                        }}
                        className="absolute inset-0 h-full w-full bg-black object-cover"
                        poster={slide.poster}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={slide.alt}
                      >
                        <source src={slide.src} type="video/mp4" />
                      </video>
                      {!playing[slide.src] ? (
                        <button
                          type="button"
                          onClick={() =>
                            setPlaying((prev) => ({
                              ...prev,
                              [slide.src]: true,
                            }))
                          }
                          aria-label={`Play video: ${slide.alt}`}
                          className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/25 transition-colors"
                        >
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0B1120] shadow-lg">
                            <Play className="h-5 w-5 ml-0.5" aria-hidden />
                          </span>
                        </button>
                      ) : null}
                    </>
                  )}
                </div>
                <figcaption className="sr-only">{slide.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next collage page"
          className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
      {pageCount > 1 ? (
        <p className="mt-3 text-center text-xs text-white/40" aria-live="polite">
          {page + 1} / {pageCount}
        </p>
      ) : null}
    </section>
  )
}
