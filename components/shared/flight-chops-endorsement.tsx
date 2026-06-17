"use client"

import Image from "next/image"

export function FlightChopsEndorsement() {
  return (
    <section className="relative py-12 sm:py-16 px-4 border-y border-sky-500/15 overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/40 via-transparent to-sky-950/40 pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative">
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">

          {/* FC badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <Image
              src="/logos/fc-endorsed.png"
              alt="Recommended by Flight Chops"
              width={96}
              height={96}
              className="w-20 h-20 sm:w-24 sm:h-24"
            />
            <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest whitespace-nowrap">
              Recommended by
            </span>
          </div>

          {/* divider (desktop only) */}
          <div className="hidden sm:block w-px self-stretch bg-white/10" />

          {/* Quote + attribution */}
          <div className="flex-1 text-center sm:text-left">
            <svg
              className="w-7 h-7 text-sky-400/30 mb-3 mx-auto sm:mx-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>

            <blockquote className="text-lg sm:text-xl font-medium text-white/85 italic leading-relaxed mb-4">
              "The window from two days to two weeks out has always been very
              nebulous and difficult to plan a cross-country flight."
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-semibold text-white text-sm">Steve Thorne</span>
              <span className="hidden sm:inline text-white/20">·</span>
              <span className="text-xs text-white/40">
                Flight Chops &nbsp;·&nbsp; 20+ years GA &nbsp;·&nbsp; 1M+ subscribers
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
