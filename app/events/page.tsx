import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarDays, ExternalLink, MapPin } from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"
import { eventDateText, getUpcomingEvents } from "@/lib/events"

// Re-render daily so events drop off the list after their last day.
export const revalidate = 86400

const DESCRIPTION =
  "Upcoming aviation events with PlaneWX: conventions, chapter meetings, and safety summits."

export const metadata: Metadata = {
  title: "Events",
  description: DESCRIPTION,
  openGraph: {
    title: "Events | PlaneWX",
    description: DESCRIPTION,
    type: "website",
    url: "https://www.planewx.ai/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | PlaneWX",
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://www.planewx.ai/events",
  },
}

export default function EventsPage() {
  const events = getUpcomingEvents()

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0d1f3c] to-[#0a0f1a]" />
        <div
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-80"
          aria-hidden
        />
        <div className="absolute inset-x-0 top-2 h-px bg-[#3B82F6]/40" aria-hidden />
        <div className="absolute top-0 left-1/4 w-[520px] h-[520px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/5 w-[420px] h-[420px] bg-[#3B82F6]/10 rounded-full blur-[100px]" />
      </div>

      <nav className="border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="PlaneWX home">
            <BrandLogo
              variant="wordmarkTransparent"
              className="h-7 sm:h-8 w-auto max-w-[min(100%,11rem)]"
            />
            <span className="hidden sm:inline text-xs text-white/45 tracking-wide truncate">
              Pilot Decision Support
            </span>
          </Link>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/partners"
              className="hidden sm:inline text-sm text-white/50 hover:text-white transition-colors"
            >
              Partners
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-10 sm:space-y-12">
        <header className="space-y-4 text-center sm:text-left max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
            PlaneWX
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Events</h1>
          <p className="text-lg sm:text-xl text-white/65 leading-relaxed">
            Upcoming aviation events. Where PlaneWX has a booth or a talk, it is listed with the
            event.
          </p>
        </header>

        <section aria-labelledby="events-list-heading">
          <h2 id="events-list-heading" className="sr-only">
            Upcoming events
          </h2>
          <ul className="space-y-4" data-testid="events-list">
            {events.map((event) => (
              <li
                key={event.id}
                data-testid={`event-${event.id}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-3 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{event.name}</h3>
                    <div className="space-y-1.5 text-sm text-white/60">
                      <p className="flex items-start gap-2">
                        <CalendarDays className="h-4 w-4 mt-0.5 shrink-0 text-sky-400" aria-hidden />
                        <span>{eventDateText(event)}</span>
                      </p>
                      {event.location ? (
                        <p className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-sky-400" aria-hidden />
                          <span>{event.location}</span>
                        </p>
                      ) : null}
                    </div>
                    {event.planewx.length > 0 ? (
                      <ul className="space-y-1.5 text-sm text-white/80">
                        {event.planewx.map((line) => (
                          <li key={line} className="border-l-2 border-sky-500/60 pl-3">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {event.details?.length ? (
                      <ul className="space-y-1 text-sm text-white/50">
                        {event.details.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <a
                    href={event.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 shrink-0 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-sky-500/30 text-white/80 hover:text-white px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    {event.link.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {events.length === 0 ? (
            <p className="text-white/50">No upcoming events right now. Check back soon.</p>
          ) : null}
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
