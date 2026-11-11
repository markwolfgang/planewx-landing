/**
 * Consolidation for /learn/long-range-flight-weather-planning.
 * True duplicate blog hubs permanently redirect here. Distinct-angle posts
 * stay and get a contextual append link via BLOG_APPENDS.
 */

export const LONG_RANGE_HUB_HREF =
  "/learn/long-range-flight-weather-planning" as const

/** Blog slugs that are umbrella duplicates of the long-range hub. */
export const LONG_RANGE_REDIRECT_SLUGS = [
  "can-pilots-plan-trips-three-days-ahead",
  "general-aviation-weather-planning-guide",
  "guide-to-planning-flights-days-ahead",
  "how-to-brief-multi-day-flights",
  "how-to-plan-flights-before-tafs",
  "how-to-plan-flights-with-uncertain-weather",
  "long-range-aviation-weather-forecasts",
  "multi-day-flight-planning-that-holds-up",
] as const

export type LongRangeRedirectSlug = (typeof LONG_RANGE_REDIRECT_SLUGS)[number]

export function isLongRangeRedirectSlug(slug: string): boolean {
  return (LONG_RANGE_REDIRECT_SLUGS as readonly string[]).includes(slug)
}

/**
 * Kept long-range / multi-day planning posts that should point readers to the
 * hub. Excludes redirected slugs. Product, customs, and unrelated posts stay out.
 */
export const LONG_RANGE_KEEP_APPEND_SLUGS = [
  "advanced-pilot-weather-briefing",
  "area-forecast-discussion-vs-models",
  "area-forecast-discussion-vs-taf",
  "area-forecasts-vs-terminal-forecasts",
  "aviation-forecast-models-comparison",
  "best-ways-to-avoid-weather-surprises",
  "best-ways-to-spot-forecast-deterioration",
  "best-weather-resources-for-private-pilots",
  "business-flight-rerouting",
  "business-trip-weather-recovery",
  "cross-country-dispatch-decisions",
  "cross-country-flight-planning-weather-tips",
  "ensemble-versus-deterministic-forecasts-pilots",
  "family-trip-cancellation",
  "flight-cancellation-prediction-weather-ga",
  "flight-planning-uncertainty-before-tafs",
  "forecast-disagreement-across-route-segments",
  "general-aviation-weather-commitment-guide",
  "guide-to-route-based-weather-decisions",
  "guide-to-synoptic-intelligence-for-pilots",
  "how-pilots-manage-trip-commitments",
  "how-to-assess-convective-timing-risk",
  "how-to-assess-enroute-icing",
  "how-to-build-weather-buffers",
  "how-to-compare-departure-day-options",
  "how-to-customize-pilot-weather-thresholds",
  "how-to-evaluate-ceiling-probability-routes",
  "how-to-evaluate-changing-forecast-trends",
  "how-to-evaluate-weather-days-before-departure",
  "how-to-interpret-aviation-probability-forecasts",
  "how-to-plan-around-forecast-uncertainty",
  "how-to-plan-mountain-route-weather",
  "how-to-read-area-forecast-discussions",
  "how-to-reduce-preflight-weather-uncertainty",
  "how-to-set-weather-based-flight-thresholds",
  "how-to-use-forecast-ensembles-flying",
  "how-to-use-wx-score",
  "how-to-weigh-wind-uncertainty",
  "icing-forecast-for-small-aircraft",
  "ifr-business-trip-weather-planning-example",
  "nbm-probabilities-vs-tafs",
  "personal-minimums-weather-planning",
  "pilot-decision-making-weather-ga-flights",
  "pilot-guide-to-forecast-confidence",
  "pilot-guide-to-model-disagreement",
  "pilot-guide-to-weather-pattern-interpretation",
  "pilot-limits-versus-model-guidance",
  "pilot-weather-tools-comparison-real-trips",
  "probabilistic-weather-briefing-vs-deterministic-forecast",
  "probability-based-flight-planning",
  "probability-based-weather-planning-pilots",
  "route-outlook-vs-airport-forecast",
  "route-weather-planning-before-pressure-builds",
  "route-weather-synthesis-vs-single-airport-forecast",
  "top-weather-signals-for-route-viability",
  "trend-toward-probability-based-flight-planning",
  "using-model-probabilities-for-flight-decisions",
  "weather-commitment-planning-pilots",
  "weather-models-vs-pilot-minimums",
  "weather-probabilities-vs-deterministic-forecasts",
  "weather-risk-assessment-for-pilots",
  "weather-trend-analysis-aviation",
  "weather-windows-for-small-aircraft",
  "weekend-flying-weather-outlook",
  "what-causes-route-forecast-uncertainty",
  "what-forecast-confidence-means-for-pilots",
  // when-do-aviation-forecasts-stabilize already links the hub in its body override
  "when-should-pilots-delay-travel-commitments",
  "when-should-pilots-trust-long-range-forecasts",
  "will-winds-change-before-departure",
  "wx-score-planning-tool-review",
  "wx-score-review-cross-country-pilots",
  "wx-score-vs-raw-forecast-data",
  "wx-score-vs-rule-of-thumb",
] as const

export const LONG_RANGE_HUB_APPEND_HTML = `<p><strong>Related:</strong> For the full 3 to 14 day planning hub (TAF through CPC outlooks, confidence by lead time, day-by-day timeline, and WX Score), see <a href="${LONG_RANGE_HUB_HREF}">Long-Range Flight Weather Planning</a>.</p>`
