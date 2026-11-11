import * as forecastsStabilize from "./when-do-aviation-forecasts-stabilize"
import * as paveRiskAssessmentWeather from "./pave-risk-assessment-weather"
import * as bestPilotWeatherApps from "./best-pilot-weather-apps"
import {
  LONG_RANGE_HUB_APPEND_HTML,
  LONG_RANGE_KEEP_APPEND_SLUGS,
} from "@/lib/long-range-planning-consolidation"

export interface BlogOverride {
  html: string
  faqJsonLd?: unknown
  dateModified?: string
}

/** Slug to repo-owned body. Slugs not listed render Soro content unchanged. */
export const BLOG_OVERRIDES: Record<string, BlogOverride> = {
  "when-do-aviation-forecasts-stabilize": forecastsStabilize,
  "pave-risk-assessment-weather": paveRiskAssessmentWeather,
  "best-pilot-weather-apps": bestPilotWeatherApps,
}

/**
 * Slug to HTML appended after the Soro body, for cross-links that should not
 * replace or retune the original post.
 */
const MANUAL_BLOG_APPENDS: Record<string, string> = {
  "advanced-pilot-weather-briefing":
    '<p><strong>Related:</strong> <a href="/blog/cross-check-pilot-weather-briefing">Why and how to cross-check your pilot weather briefing</a></p>',
}

function buildBlogAppends(): Record<string, string> {
  const appends: Record<string, string> = {}
  for (const slug of LONG_RANGE_KEEP_APPEND_SLUGS) {
    appends[slug] = LONG_RANGE_HUB_APPEND_HTML
  }
  for (const [slug, html] of Object.entries(MANUAL_BLOG_APPENDS)) {
    appends[slug] = appends[slug] ? `${html}\n${appends[slug]}` : html
  }
  return appends
}

export const BLOG_APPENDS: Record<string, string> = buildBlogAppends()

export interface BlogMetaOverride {
  /** Full <title>, rendered as-is (no " | PlaneWX" template suffix). Max 60 chars. */
  title: string
  /** Meta description. Max 155 chars. */
  description: string
}

/**
 * Slug to repo-owned <title> and meta description, for Soro posts whose body
 * stays in Soro but whose SERP snippet needs tuning. Only the title tag, meta
 * description, and Open Graph title/description change; the on-page H1 and
 * body are untouched.
 */
export const BLOG_META_OVERRIDES: Record<string, BlogMetaOverride> = {
  // GSC Sep 20 to Oct 17, 2026: 92 impressions, 0 clicks, avg position 2.6.
  // Top query is the navigational "plane wx", so lead with the brand.
  "flight-decision-support-software-review": {
    title: "PlaneWX Review: Flight Decision Support for GA Pilots",
    description:
      "See how PlaneWX scores GA trips days before TAFs exist: a personalized WX Score from route AFDs and NBM. Works alongside your EFB. Completely free plan.",
  },
}
