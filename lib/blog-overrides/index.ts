import * as forecastsStabilize from "./when-do-aviation-forecasts-stabilize"
import * as paveRiskAssessmentWeather from "./pave-risk-assessment-weather"

export interface BlogOverride {
  html: string
  faqJsonLd?: unknown
  dateModified?: string
}

/** Slug to repo-owned body. Slugs not listed render Soro content unchanged. */
export const BLOG_OVERRIDES: Record<string, BlogOverride> = {
  "when-do-aviation-forecasts-stabilize": forecastsStabilize,
  "pave-risk-assessment-weather": paveRiskAssessmentWeather,
}

/**
 * Slug to HTML appended after the Soro body, for cross-links that should not
 * replace or retune the original post.
 */
export const BLOG_APPENDS: Record<string, string> = {
  "advanced-pilot-weather-briefing":
    '<p><strong>Related:</strong> <a href="/blog/cross-check-pilot-weather-briefing">Why and how to cross-check your pilot weather briefing</a></p>',
}
