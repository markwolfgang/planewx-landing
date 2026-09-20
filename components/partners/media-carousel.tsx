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

export type PartnerMediaSlide = PhotoSlide | VideoSlide

const SLIDES: PartnerMediaSlide[] = [
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

const AUTO_MS = 5500

export function PartnersMediaCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  const go = useCallback((next: number) => {
    setIndex((current) => {
      const total = SLIDES.length
      return ((next % total) + total) % total
    })
  }, [])

  useEffect(() => {
    if (paused || reduceMotion.current) return
    const id = window.setInterval(() => go(index + 1), AUTO_MS)
    return () => window.clearInterval(id)
  }, [index, paused, go])

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === index) {
        const play = video.play()
        if (play) play.catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [index])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Partners at Oshkosh"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <figure
              key={slide.type === "photo" ? slide.src : slide.src}
              className="relative w-full shrink-0 aspect-[16/10] sm:aspect-[16/9]"
              aria-hidden={i !== index}
            >
              {slide.type === "photo" ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  priority={i === 0}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={
                    slide.objectPosition
                      ? { objectPosition: slide.objectPosition }
                      : undefined
                  }
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el
                  }}
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
              <figcaption className="sr-only">{slide.alt}</figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo or video"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/55 hover:bg-black/75 border border-white/15 text-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo or video"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/55 hover:bg-black/75 border border-white/15 text-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pt-3">
        {SLIDES.map((slide, i) => (
          <button
            key={`dot-${slide.type === "photo" ? slide.src : slide.src}`}
            type="button"
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-sky-400" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {SLIDES.length}
      </p>
    </section>
  )
}
