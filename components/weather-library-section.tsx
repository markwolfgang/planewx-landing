import Link from "next/link"
import {
  WEATHER_HUB_LINKS,
  type WeatherHubLink,
} from "@/lib/weather-hub-links"

type Variant = "homepage" | "blog-index"

const COPY: Record<
  Variant,
  { heading: string; intro: string; learnLabel: string }
> = {
  homepage: {
    heading: "Aviation weather library",
    intro:
      "Plain-language guides to the weather products, hazards, and decision tools in the PlaneWX Learning Center.",
    learnLabel: "Browse the Learning Center",
  },
  "blog-index": {
    heading: "Aviation weather library",
    intro:
      "Related Learning Center guides on METARs, TAFs, icing, turbulence, briefings, and more.",
    learnLabel: "All Learning Center guides",
  },
}

function HubLink({
  hub,
  compact,
}: {
  hub: WeatherHubLink
  compact?: boolean
}) {
  if (compact) {
    return (
      <Link
        href={hub.href}
        className="text-sm text-sky-400 hover:text-sky-300 underline-offset-4 hover:underline transition-colors"
      >
        {hub.shortTitle}
      </Link>
    )
  }

  return (
    <Link
      href={hub.href}
      className="group flex h-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-sky-500/40 hover:bg-white/[0.06]"
    >
      <span className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
        {hub.shortTitle}
      </span>
      <span className="line-clamp-2 text-xs leading-relaxed text-white/50">
        {hub.description}
      </span>
    </Link>
  )
}

/**
 * Internal links into Learning Center weather hubs for crawl discovery.
 * Homepage: grid. Blog index: compact wrap list.
 */
export function WeatherLibrarySection({
  variant,
  hubs = WEATHER_HUB_LINKS,
}: {
  variant: Variant
  hubs?: readonly WeatherHubLink[]
}) {
  const copy = COPY[variant]
  const isCompact = variant === "blog-index"

  return (
    <section
      id="aviation-weather-library"
      aria-labelledby="aviation-weather-library-heading"
      className={
        isCompact
          ? "border-t border-white/10 pt-10"
          : "relative py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/15 to-transparent"
      }
      data-testid="weather-library-section"
    >
      <div className={isCompact ? "" : "container mx-auto max-w-5xl"}>
        <div className={isCompact ? "mb-5" : "text-center mb-12"}>
          <h2
            id="aviation-weather-library-heading"
            className={
              isCompact
                ? "text-xl font-semibold text-white mb-2"
                : "text-3xl md:text-4xl font-bold mb-4"
            }
          >
            {isCompact ? (
              copy.heading
            ) : (
              <>
                Aviation weather{" "}
                <span className="text-sky-400">library</span>
              </>
            )}
          </h2>
          <p
            className={
              isCompact
                ? "text-sm text-white/55 max-w-2xl"
                : "text-base md:text-lg text-white/60 max-w-2xl mx-auto"
            }
          >
            {copy.intro}
          </p>
        </div>

        {isCompact ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {hubs.map((hub) => (
              <li key={hub.href}>
                <HubLink hub={hub} compact />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((hub) => (
              <li key={hub.href}>
                <HubLink hub={hub} />
              </li>
            ))}
          </ul>
        )}

        <p className={isCompact ? "mt-5" : "mt-10 text-center"}>
          <Link
            href="/learn"
            className="text-sm text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
          >
            {copy.learnLabel}
          </Link>
        </p>
      </div>
    </section>
  )
}
