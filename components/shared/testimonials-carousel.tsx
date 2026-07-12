"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Quote, Mic, Play } from "lucide-react"
import { TESTIMONIALS } from "@/components/shared/landing-data"
import { YouTubeFacade } from "@/components/shared/youtube-facade"

const PODCASTS = [
  {
    type: "podcast" as const,
    videoId: "qu7ppznhcGM",
    title: "Pilots: Meet PlaneWX — The AI Tool That Scores Your Flight Risk",
    channel: "Your Vision Jet Pilot",
    duration: "10 min",
    date: "2026",
    description: "See how PlaneWX synthesizes METARs, TAFs, AIRMETs, SIGMETs, NOTAMs, and more into a single actionable WX Score for your flight.",
    badge: "video" as const,
  },
  {
    type: "podcast" as const,
    videoId: "Kwcun9N03Qs",
    title: "PlaneWX: Better Weather Decisions, Safer Flights",
    channel: "AeroExploration",
    duration: "1 hr 4 min",
    date: "Jul 1, 2026",
    description: "Mark Wolfgang on how PlaneWX was built, why aviation weather is hard, and how AI changes the go/no-go decision.",
  },
  {
    type: "podcast" as const,
    videoId: "187vVsdRErE",
    title: "The Future in Flight — AirVenture 2026 & PlaneWX",
    channel: "AviNation USA",
    duration: "25 min",
    date: "Jul 2, 2026",
    description: "AirVenture 2026 preview episode featuring Mark Wolfgang on AI-powered weather planning and smarter pilot decisions.",
  },
]

type PodcastItem = (typeof PODCASTS)[number]
type TestimonialItem = (typeof TESTIMONIALS)[number] & { type: "testimonial" }
type CarouselItem = PodcastItem | TestimonialItem

const ITEMS: CarouselItem[] = [
  ...PODCASTS,
  ...TESTIMONIALS.map((t) => ({ ...t, type: "testimonial" as const })),
]

function PodcastCard({ item }: { item: PodcastItem }) {
  return (
    <div className="h-full flex flex-col rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full shrink-0">
        <YouTubeFacade videoId={item.videoId} title={item.title} />
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          {item.badge === "video" ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
              <Play className="h-3 w-3 text-sky-400" />
              <span className="text-xs text-sky-400 font-medium">Video</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
              <Mic className="h-3 w-3 text-red-400" />
              <span className="text-xs text-red-400 font-medium">Podcast</span>
            </div>
          )}
          <span className="text-xs text-white/30">{item.duration}</span>
          <span className="text-xs text-white/30">·</span>
          <span className="text-xs text-white/30">{item.date}</span>
        </div>
        <p className="text-sm font-semibold text-white leading-snug mb-2">{item.title}</p>
        <p className="text-xs text-white/50 leading-relaxed flex-1">{item.description}</p>
        <p className="text-xs text-white/30 mt-3 font-medium">{item.channel}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const isFeatured = item.featured
  return (
    <div
      className={`h-full flex flex-col p-5 rounded-2xl border ${
        isFeatured
          ? "bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border-sky-500/30"
          : "bg-white/[0.03] border-white/10"
      }`}
    >
      <Quote
        className={`h-5 w-5 mb-3 shrink-0 ${isFeatured ? "text-sky-400/40" : "text-white/20"}`}
      />
      <p className="text-sm text-white/75 leading-relaxed italic flex-1">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            isFeatured ? "bg-sky-500/20 text-sky-400" : "bg-white/10 text-white/60"
          }`}
        >
          {item.name[0]}
        </div>
        <div>
          <p className="text-xs font-medium text-white/80">{item.name}</p>
          <p className="text-xs text-white/30">{item.cert}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector("[data-card]") as HTMLElement | null
    const cardWidth = (card?.offsetWidth ?? 340) + 16
    el.scrollBy({ left: dir === "next" ? cardWidth : -cardWidth, behavior: "smooth" })
  }

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={i}
            data-card
            className="snap-start shrink-0 w-[85vw] sm:w-[340px]"
            style={{ height: "auto" }}
          >
            {item.type === "podcast" ? (
              <PodcastCard item={item as PodcastItem} />
            ) : (
              <TestimonialCard item={item as TestimonialItem} />
            )}
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={() => scroll("prev")}
          aria-label="Previous"
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-white/70" />
        </button>
        <span className="text-xs text-white/30 px-2">
          Scroll or use arrows
        </span>
        <button
          onClick={() => scroll("next")}
          aria-label="Next"
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-white/70" />
        </button>
      </div>
    </div>
  )
}
