import Link from "next/link"
import {
  getRelatedWeatherHubs,
  type WeatherHubLink,
} from "@/lib/weather-hub-links"

/**
 * Data-driven "Related weather guides" block for blog posts.
 * Matches hubs from the post slug/title/excerpt; falls back to a default set.
 */
export function RelatedWeatherGuides({
  slug,
  title,
  excerpt,
  hubs,
}: {
  slug: string
  title: string
  excerpt?: string
  hubs?: readonly WeatherHubLink[]
}) {
  const related =
    hubs ??
    getRelatedWeatherHubs({
      slug,
      title,
      excerpt,
      min: 2,
      max: 4,
    })

  if (related.length === 0) return null

  return (
    <aside
      className="mt-12 border-t border-white/10 pt-8"
      aria-labelledby="related-weather-guides-heading"
      data-testid="related-weather-guides"
    >
      <h2
        id="related-weather-guides-heading"
        className="mb-4 text-lg font-semibold text-white"
      >
        Related weather guides
      </h2>
      <ul className="flex flex-col gap-3">
        {related.map((hub) => (
          <li key={hub.href}>
            <Link
              href={hub.href}
              className="group block rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-sky-500/40 hover:bg-white/[0.06]"
            >
              <span className="text-sm font-medium text-sky-400 group-hover:text-sky-300 transition-colors">
                {hub.shortTitle}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-white/50 line-clamp-2">
                {hub.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4">
        <Link
          href="/learn"
          className="text-xs text-white/40 hover:text-sky-400 underline underline-offset-4 transition-colors"
        >
          More in the Learning Center
        </Link>
      </p>
    </aside>
  )
}
