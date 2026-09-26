"use client"

import { useState } from "react"
import Image from "next/image"

type YouTubeFacadeProps = {
  videoId: string
  title: string
  className?: string
}

/**
 * Click-to-load YouTube embed.
 * Thumbnail is first-party next/image (img.youtube.com is image-only).
 * Iframe uses youtube-nocookie.com and loads only after an explicit click,
 * so strict-region visitors are not contacted by YouTube until they choose to play.
 */
export function YouTubeFacade({ videoId, title, className = "" }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className={`absolute inset-0 w-full h-full ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=0`}
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
      onClick={() => setPlaying(true)}
      className={`absolute inset-0 w-full h-full group cursor-pointer ${className}`}
      aria-label={`Play video (loads YouTube): ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 896px"
        className="object-cover"
        loading="lazy"
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
