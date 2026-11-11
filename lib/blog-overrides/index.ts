import * as forecastsStabilize from "./when-do-aviation-forecasts-stabilize"
import * as paveRiskAssessmentWeather from "./pave-risk-assessment-weather"
import * as bestPilotWeatherApps from "./best-pilot-weather-apps"

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
export const BLOG_APPENDS: Record<string, string> = {
  "advanced-pilot-weather-briefing":
    '<p><strong>Related:</strong> <a href="/blog/cross-check-pilot-weather-briefing">Why and how to cross-check your pilot weather briefing</a></p>',
}

export interface BlogMetaOverride {
  /** Full <title>, rendered as-is (no " | PlaneWX" template suffix). Max 60 chars. */
  title: string
  /** Meta description. Target 150 to 160 chars. */
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
  // GSC Oct 13 to Nov 9, 2026: title/meta CTR pass (pos ≤12, ≥100 imp, CTR <2%).
  "wx-score-planning-tool-review": {
    title: "PlaneWX WX Score: Flight Planning Tool Review",
    description:
      "See how the PlaneWX WX Score rates a trip up to 14 days out against your personal minimums, what drives the number, and how pilots use it before TAFs exist.",
  },
  "flight-weather-editor": {
    title: "Flight Weather Editor: Score Trip Windows Early",
    description:
      "A flight weather editor lets you revise route and timing while options remain. Score candidate windows to your aircraft and personal minimums, then you decide.",
  },
  "eapis-general-aviation-how-to": {
    title: "eAPIS for General Aviation: How to File",
    description:
      "What eAPIS is for private aircraft, what to prep before you file a border crossing, and how GA pilots avoid common delays. Verify with CBP; not legal advice.",
  },
  "best-weather-resources-for-private-pilots": {
    title: "Best Weather Resources for Private Pilots",
    description:
      "METARs, TAFs, AFDs and models each answer a different question. Build a private-pilot weather stack that works days out and hours out, then decide for yourself.",
  },
  "aviation-forecast-models-comparison": {
    title: "Aviation Forecast Models Compared for GA Pilots",
    description:
      "Compare HRRR, NBM and forecast discussions for GA planning: where each model helps, where they disagree, and where pilot judgment still owns the call.",
  },
}
