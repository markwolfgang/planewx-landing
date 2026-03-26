"use client"

import { useState } from "react"
import Image from "next/image"

type YouTubeFacadeProps = {
  videoId: string
  title: string
  className?: string
}

export function YouTubeFacade({ videoId, title, className = "" }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className={`absolute inset-0 w-full h-full ${className}`}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&si=MnoooX_Fu66IxwRg`}
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
      onClick={() => setPlaying(true)}
      className={`absolute inset-0 w-full h-full group cursor-pointer ${className}`}
      aria-label={`Play: ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 896px"
        className="object-cover"
        loading="lazy"
      />
      {/* Dark overlay */}
      <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      {/* Play button */}
      <span className="absolute inset-0 flex items-center justify-center">
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
      </span>
    </button>
  )
}
