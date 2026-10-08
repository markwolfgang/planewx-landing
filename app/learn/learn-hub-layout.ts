/**
 * How the Learning Center index groups its pages. Pure layout config: every
 * page still lives in learn-data.ts (articles, hub page lists, tips). A page
 * that is not listed in any group below falls into "More" so nothing published
 * ever disappears from the index.
 */

export type HubGroup = {
  id: string
  title: string
  description: string
  /** Hub hrefs ("/learn/aviation-weather/taf") or article hrefs ("/learn/<slug>"). */
  hrefs: string[]
}

export const START_HERE_HREFS: string[] = [
  "/learn/aviation-weather/weather-briefings",
  "/learn/flight-risk-assessment-tool",
  "/learn/risk-stacking",
]

export const WEATHER_GROUPS: HubGroup[] = [
  {
    id: "reports-and-forecasts",
    title: "Aviation weather reports and forecasts: METAR, TAF, PIREP",
    description: "How to read the products you pull before every flight.",
    hrefs: [
      "/learn/aviation-weather/metar",
      "/learn/aviation-weather/taf",
      "/learn/aviation-weather/pirep",
      "/learn/aviation-weather/airmet-sigmet",
      "/learn/aviation-weather/winds-aloft",
      "/learn/aviation-weather/weather-radar",
      "/learn/mos-vs-nbm-vs-taf",
      "/learn/tcf-vs-ecfp",
    ],
  },
  {
    id: "hazards",
    title: "Weather hazards for pilots: thunderstorms, icing, turbulence, fog",
    description: "What each hazard does to an airplane, and how it is forecast.",
    hrefs: [
      "/learn/aviation-weather/thunderstorms",
      "/learn/aviation-weather/icing",
      "/learn/aviation-weather/turbulence",
      "/learn/aviation-weather/wind-shear-microburst",
      "/learn/aviation-weather/ceiling-visibility",
      "/learn/aviation-weather/fog",
      "/learn/aviation-weather/mountain-wave",
    ],
  },
  {
    id: "big-picture",
    title: "Big-picture weather: fronts, stability, and surface charts",
    description: "Air masses, fronts, stability and the weather map.",
    hrefs: [
      "/learn/aviation-weather/fronts-troughs-drylines",
      "/learn/aviation-weather/atmospheric-stability",
      "/learn/aviation-weather/surface-analysis-prog-charts",
    ],
  },
  {
    id: "planning-and-performance",
    title: "Preflight planning: briefings, weather risk, density altitude",
    description: "Briefing types, weather risk and what heat and altitude do to climb.",
    hrefs: [
      "/learn/aviation-weather/weather-briefings",
      "/learn/aviation-weather/weather-risk",
      "/learn/aviation-weather/density-altitude",
    ],
  },
]

export const DECISION_GROUP: HubGroup = {
  id: "decision-making",
  title: "Aeronautical decision making: FRAT and risk stacking",
  description:
    "ADM habits from FAA risk management material that keep the PIC in command.",
  hrefs: ["/learn/flight-risk-assessment-tool", "/learn/risk-stacking"],
}

export type CaseStudyTag =
  | "VFR into IMC"
  | "Icing"
  | "Thunderstorms"
  | "Performance and terrain"
  | "Fuel and planning"
  | "IFR and night"

export const CASE_STUDY_TAG_ORDER: CaseStudyTag[] = [
  "VFR into IMC",
  "Icing",
  "Thunderstorms",
  "Performance and terrain",
  "Fuel and planning",
  "IFR and night",
]

/** Slugs of accident case studies, with the tags a pilot can filter on. */
export const CASE_STUDY_TAGS: Record<string, CaseStudyTag[]> = {
  "fair-weather-flier": ["VFR into IMC"],
  "trapped-in-ice": ["Icing"],
  "blind-over-bakersfield": ["VFR into IMC", "Thunderstorms"],
  "delayed-reaction": ["Icing"],
  "hazardous-attitudes": ["VFR into IMC"],
  "night-falls-on-final": ["IFR and night"],
  "in-too-deep": ["VFR into IMC"],
  "cross-country-crisis": ["Fuel and planning"],
  "time-lapse": ["Thunderstorms"],
  "into-thin-air": ["Performance and terrain"],
  "high-aspirations": ["Performance and terrain"],
  "deadly-disorientation": ["IFR and night"],
  "faulty-assumptions": ["Fuel and planning"],
}
