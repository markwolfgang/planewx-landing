"use client"

import { useState } from "react"
import Image from "next/image"

type YouTubeFacadeProps = {
  videoId: string
  title: string
  className?: string
  /** Accessible name for the play button. Defaults to a generic label built from title. */
  ariaLabel?: string
  /** Query string for the nocookie embed (no leading "?"). */
  embedParams?: string
  /** Above the fold: load the thumbnail eagerly with a preload hint (LCP). */
  priority?: boolean
  /** next/image sizes hint for the thumbnail. */
  sizes?: string
  /** Called once when the visitor presses play, before the iframe mounts. */
  onPlay?: () => void
}

/**
 * Click-to-load YouTube embed.
 * Thumbnail is first-party next/image (img.youtube.com is image-only and fetched
 * by the image optimizer, so the browser does not contact YouTube for it).
 * Iframe uses youtube-nocookie.com and loads only after an explicit click,
 * so visitors are not contacted by YouTube until they choose to play.
 */
export function YouTubeFacade({
  videoId,
  title,
  className = "",
  ariaLabel,
  embedParams = "autoplay=1&start=0",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 896px",
  onPlay,
}: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false)
  // Not every video has a maxresdefault.jpg (YouTube only makes one for HD uploads).
  // hqdefault.jpg always exists, so fall back to it if the large thumbnail 404s.
  const [thumb, setThumb] = useState<"maxresdefault" | "hqdefault">("maxresdefault")

  if (playing) {
    return (
      <iframe
        className={`absolute inset-0 w-full h-full ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${embedParams}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        try {
          onPlay?.()
        } catch {
          /* analytics must never block playback */
        }
        setPlaying(true)
      }}
      className={`absolute inset-0 w-full h-full group cursor-pointer ${className}`}
      aria-label={ariaLabel ?? `Play video (loads YouTube): ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/${thumb}.jpg`}
        alt={title}
        onError={() => setThumb((t) => (t === "maxresdefault" ? "hqdefault" : t))}
        fill
        sizes={sizes}
        className="object-cover"
        {...(priority ? { preload: true, fetchPriority: "high" as const } : { loading: "lazy" as const })}
      />
      <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
        <span className="flex items-center justify-center w-20 h-20 rounded-full bg-red-600 group-hover:bg-red-500 shadow-2xl transition-colors">
          <svg
            className="w-8 h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="rounded bg-black/70 px-3 py-1 text-xs text-white/90">
          Loads YouTube when you press play
        </span>
      </span>
    </button>
  )
}
