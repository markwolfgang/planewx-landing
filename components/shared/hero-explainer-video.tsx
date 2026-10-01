"use client"

import { YouTubeFacade } from "./youtube-facade"
import { isGtagReady } from "@/lib/tracking-runtime"

export const HERO_EXPLAINER_VIDEO_ID = "KTuKDYVfmuk"
export const HERO_EXPLAINER_VIDEO_TITLE =
  "Brief, Assess, Decide, Debrief: The Risk Loop for Pilots Without a Dispatcher"
export const HERO_EXPLAINER_PLAY_LABEL = "Play the PlaneWX explainer video"

/**
 * GA4 event for a play click on the hero explainer.
 * Same gate as landing_variant_view: gtag is only ready after the visitor has
 * granted analytics consent, so nothing is sent without consent.
 */
export function trackHeroVideoPlay(variant: string): void {
  if (typeof window === "undefined") return
  if (!isGtagReady()) return
  if (typeof window.gtag !== "function") return
  window.gtag("event", "hero_video_play", {
    variant,
    video_id: HERO_EXPLAINER_VIDEO_ID,
  })
}

/** 16:9 click-to-load explainer for the homepage hero. Reserves its box up front (no CLS). */
export function HeroExplainerVideo({
  variant,
  className = "",
}: {
  variant: string
  className?: string
}) {
  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl shadow-black/50 ${className}`}
    >
      <YouTubeFacade
        videoId={HERO_EXPLAINER_VIDEO_ID}
        title={HERO_EXPLAINER_VIDEO_TITLE}
        ariaLabel={HERO_EXPLAINER_PLAY_LABEL}
        embedParams="autoplay=1&rel=0"
        priority
        sizes="(max-width: 1023px) 100vw, 576px"
        onPlay={() => trackHeroVideoPlay(variant)}
      />
    </div>
  )
}
