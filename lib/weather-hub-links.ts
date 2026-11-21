/**
 * Crawlable Learning Center weather-hub links for homepage, blog, and llms.txt.
 * Sourced from shipped hub registries so we only link pages that exist.
 */
import {
  AVIATION_WEATHER_HUB_PAGES,
  DECISION_MAKING_HUB_PAGES,
  getLearnArticle,
  type AviationWeatherHubPage,
} from "@/app/learn/learn-data"

export const WEATHER_HUB_ORIGIN = "https://www.planewx.ai" as const

export type WeatherHubLink = {
  href: string
  /** Full page title from the Learning Center registry. */
  title: string
  /** Shorter label for dense grids (portion before ": " or "? "). */
  shortTitle: string
  /** One-line description for llms.txt and compact blurbs. */
  description: string
  /** Keywords used to match blog posts to related hubs. */
  keywords: readonly string[]
}

/** Card-friendly title: text before the first ": " or "? ". */
export function hubShortTitle(title: string): string {
  const colon = title.indexOf(": ")
  if (colon > 0) return title.slice(0, colon)
  const q = title.indexOf("? ")
  if (q > 0) return title.slice(0, q + 1)
  return title
}

export function weatherHubCanonicalUrl(href: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) return href
  return `${WEATHER_HUB_ORIGIN}${href}`
}

/** Indexable weather article hubs that are not under /learn/aviation-weather/. */
const WEATHER_ARTICLE_HUBS: readonly AviationWeatherHubPage[] = (() => {
  const mos = getLearnArticle("mos-vs-nbm-vs-taf")
  if (!mos || mos.draft) return []
  return [
    {
      href: `/learn/${mos.slug}`,
      title: mos.title,
      summary: mos.summary,
      lastReviewed: mos.lastReviewed,
    },
  ]
})()

/** Keyword map keyed by hub href. Keep terms specific enough to avoid noise. */
const HUB_KEYWORDS: Record<string, readonly string[]> = {
  "/learn/aviation-weather/taf": ["taf", "terminal aerodrome forecast", "tempo", "prob30"],
  "/learn/aviation-weather/metar": ["metar", "speci", "airport weather report"],
  "/learn/aviation-weather/airmet-sigmet": [
    "airmet",
    "sigmet",
    "g-airmet",
    "gairmet",
    "cwa",
    "advisory",
  ],
  "/learn/aviation-weather/pirep": ["pirep", "pilot report", "ua ", "uua"],
  "/learn/aviation-weather/winds-aloft": ["winds aloft", "fb winds", "temperatures aloft"],
  "/learn/aviation-weather/icing": ["icing", "cip", "fip", "freezing level", "sld"],
  "/learn/aviation-weather/turbulence": ["turbulence", "gtg", "edr"],
  "/learn/aviation-weather/weather-radar": ["radar", "nexrad", "tdwr", "datalink"],
  "/learn/aviation-weather/density-altitude": [
    "density altitude",
    "performance",
    "hot and high",
    "koch",
  ],
  "/learn/aviation-weather/thunderstorms": [
    "thunderstorm",
    "convective",
    "lightning",
    "tcf",
    "ecfp",
  ],
  "/learn/aviation-weather/ceiling-visibility": [
    "ceiling",
    "visibility",
    "mvfr",
    "lifr",
    "flight category",
  ],
  "/learn/aviation-weather/fog": ["fog", "radiation fog", "advection fog", "freezing fog"],
  "/learn/aviation-weather/wind-shear-microburst": [
    "wind shear",
    "microburst",
    "llwas",
    "low-level wind",
  ],
  "/learn/aviation-weather/mountain-wave": [
    "mountain",
    "lee wave",
    "rotor",
    "downslope",
    "mountain wave",
  ],
  "/learn/aviation-weather/fronts-troughs-drylines": [
    "front",
    "trough",
    "dryline",
    "air mass",
    "cold front",
    "warm front",
  ],
  "/learn/aviation-weather/atmospheric-stability": [
    "stability",
    "lapse rate",
    "inversion",
    "cape",
    "lifted index",
  ],
  "/learn/aviation-weather/surface-analysis-prog-charts": [
    "surface analysis",
    "prog chart",
    "weather map",
    "surface prog",
  ],
  "/learn/aviation-weather/weather-briefings": [
    "briefing",
    "self-brief",
    "outlook briefing",
    "standard briefing",
    "abbreviated briefing",
  ],
  "/learn/aviation-weather/weather-risk": [
    "weather risk",
    "personal minimums",
    "pave",
    "hazard",
  ],
  "/learn/mos-vs-nbm-vs-taf": ["mos", "lamp", "nbm", "guidance", "model output"],
  "/learn/risk-management-loop": [
    "risk management",
    "risk loop",
    "brief assess decide",
    "debrief",
    "go / no-go",
    "go/no-go",
  ],
  "/learn/flight-risk-assessment-tool": ["frat", "flight risk assessment", "faas team"],
  "/learn/imsafe-checklist": ["imsafe", "fitness", "medication", "fatigue"],
  "/learn/controlled-flight-into-terrain": ["cfit", "terrain", "controlled flight into"],
}

function toLink(page: AviationWeatherHubPage): WeatherHubLink {
  return {
    href: page.href,
    title: page.title,
    shortTitle: hubShortTitle(page.title),
    description: page.summary,
    keywords: HUB_KEYWORDS[page.href] ?? [hubShortTitle(page.title).toLowerCase()],
  }
}

/**
 * Every shipped weather / decision hub we want crawl paths into.
 * Order: aviation-weather hubs, MOS article, then decision-making hubs.
 */
export const WEATHER_HUB_LINKS: readonly WeatherHubLink[] = [
  ...AVIATION_WEATHER_HUB_PAGES.map(toLink),
  ...WEATHER_ARTICLE_HUBS.map(toLink),
  ...DECISION_MAKING_HUB_PAGES.map(toLink),
]

/** Sensible defaults when a blog post has no keyword matches. */
export const DEFAULT_RELATED_WEATHER_HUB_HREFS = [
  "/learn/aviation-weather/taf",
  "/learn/aviation-weather/metar",
  "/learn/aviation-weather/weather-briefings",
  "/learn/risk-management-loop",
] as const

function scoreHub(haystack: string, hub: WeatherHubLink): number {
  let score = 0
  for (const raw of hub.keywords) {
    const term = raw.toLowerCase()
    if (!term) continue
    if (haystack.includes(term)) {
      // Longer phrases rank higher than short tokens.
      score += Math.max(1, Math.min(term.length, 24))
    }
  }
  return score
}

/**
 * Pick 2 to 4 related weather hubs for a blog post from its slug/title/excerpt.
 * Falls back to DEFAULT_RELATED_WEATHER_HUB_HREFS when nothing matches.
 */
export function getRelatedWeatherHubs(input: {
  slug?: string
  title?: string
  excerpt?: string
  min?: number
  max?: number
}): WeatherHubLink[] {
  const min = input.min ?? 2
  const max = input.max ?? 4
  const haystack = [input.slug, input.title, input.excerpt]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  const scored = WEATHER_HUB_LINKS.map((hub) => ({
    hub,
    score: scoreHub(haystack, hub),
  }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.hub.href.localeCompare(b.hub.href))

  if (scored.length >= min) {
    return scored.slice(0, max).map((row) => row.hub)
  }

  const byHref = new Map(WEATHER_HUB_LINKS.map((hub) => [hub.href, hub]))
  const defaults = DEFAULT_RELATED_WEATHER_HUB_HREFS.map((href) => byHref.get(href)).filter(
    (hub): hub is WeatherHubLink => Boolean(hub),
  )
  return defaults.slice(0, max)
}

/** Markdown bullet list for llms.txt (canonical www URLs, no trailing slash). */
export function formatWeatherHubsForLlms(
  hubs: readonly WeatherHubLink[] = WEATHER_HUB_LINKS,
): string {
  return hubs
    .map((hub) => `- ${weatherHubCanonicalUrl(hub.href)}: ${hub.description}`)
    .join("\n")
}
