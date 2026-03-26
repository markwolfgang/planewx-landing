"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

type Props = {
  hoverColor?: "sky" | "emerald"
}

const SRC = "/screenshots/foreflight.jpeg"

export function FounderImageModal({ hoverColor = "sky" }: Props) {
  const [zoomed, setZoomed] = useState(false)
  const hoverBorder =
    hoverColor === "emerald"
      ? "hover:border-emerald-500/50"
      : "hover:border-sky-500/50"

  return (
    <>
      <div
        className={`rounded-2xl border border-white/10 overflow-hidden shadow-2xl cursor-pointer ${hoverBorder} transition-colors`}
        onClick={() => setZoomed(true)}
      >
        <Image
          src={SRC}
          alt="Mark's flight log showing extensive cross-country flying"
          width={800}
          height={1000}
          sizes="(max-width: 768px) 100vw, 40vw"
          className="w-full h-auto"
        />
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <button className="absolute top-4 right-4 text-white/60 hover:text-white">
            <X className="h-8 w-8" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SRC} alt="Screenshot" className="max-w-full max-h-full rounded-xl" />
        </div>
      )}
    </>
  )
}
