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
