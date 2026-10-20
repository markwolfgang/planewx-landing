import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarDays, ExternalLink, MapPin } from "lucide-react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SiteFooter } from "@/components/shared/site-footer"
import { SpeakingInquiryForm } from "@/components/events/speaking-inquiry-form"
import { eventCalendarLinks } from "@/lib/event-calendar"
import {
  EVENTS_PAGE_DESCRIPTION,
  SPEAKING_FORM_HREF,
  eventAttendLinks,
  eventDateText,
  getUpcomingEvents,
  type PlaneWxEvent,
} from "@/lib/events"
import { BOOTH_VOLUNTEER_INTENT } from "@/lib/speaking-inquiry"

// Re-render hourly so events drop off the list soon after their last day.
export const revalidate = 3600

const DESCRIPTION = EVENTS_PAGE_DESCRIPTION

const BOOTH_HELP_HREF = `/events?intent=${BOOTH_VOLUNTEER_INTENT}#speaking`

const PAGE_CTAS = [
  { label: "Invite Mark to speak", href: SPEAKING_FORM_HREF },
  { label: "Tell us about your fly-in", href: SPEAKING_FORM_HREF },
  { label: "Host an event with us", href: SPEAKING_FORM_HREF },
  { label: "Help at our booth", href: BOOTH_HELP_HREF },
] as const

const ATTEND_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-1.5 shrink-0 rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-4 py-2 text-sm font-semibold transition-colors"

const CTA_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-white px-4 py-2 text-sm font-semibold transition-colors"

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

function AddToCalendar({ event }: { event: PlaneWxEvent }) {
  const links = eventCalendarLinks(event)
  if (!links) return null
  return (
    <details className="text-sm" data-testid={`add-to-calendar-${event.id}`}>
      <summary className="cursor-pointer w-fit text-sky-300 hover:text-sky-200">
        Add to calendar
      </summary>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
        <a
          href={links.googleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-300 hover:text-sky-200 underline underline-offset-2"
        >
          Google Calendar
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          href={links.icsHref}
          download={links.icsFilename}
          className="text-sky-300 hover:text-sky-200 underline underline-offset-2"
        >
          Download .ics
        </a>
      </div>
    </details>
  )
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
        <header className="space-y-4 text-center sm:text-left max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
            PlaneWX
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Events</h1>
          <p className="text-lg sm:text-xl text-white/65 leading-relaxed">
            Upcoming aviation events. Where PlaneWX has a booth or a talk, it is listed with the
            event.
          </p>
          <div className="space-y-3 pt-1">
            <p className="text-base text-white/80">
              Want PlaneWX at your chapter, fly-in, or event?
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {PAGE_CTAS.map((cta) => (
                <a key={cta.label} href={cta.href} className={CTA_BUTTON_CLASS}>
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
        </header>

        <section aria-labelledby="events-list-heading">
          <h2 id="events-list-heading" className="sr-only">
            Upcoming events
          </h2>
          {events.length > 0 ? (
            <ul className="space-y-4" data-testid="events-list">
              {events.map((event) => {
                const attendLinks = eventAttendLinks(event)
                return (
                  <li
                    key={event.id}
                    data-testid={`event-${event.id}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="space-y-3 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-white">{event.name}</h3>
                          {event.invitationOnly ? (
                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/70">
                              Private event, invitation only
                            </span>
                          ) : null}
                        </div>
                        <div className="space-y-1.5 text-sm text-white/60">
                          <p className="flex items-start gap-2">
                            <CalendarDays
                              className="h-4 w-4 mt-0.5 shrink-0 text-sky-400"
                              aria-hidden
                            />
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
                        {event.boothVolunteer ? (
                          <a
                            href={BOOTH_HELP_HREF}
                            className="inline-block text-sm text-sky-300 hover:text-sky-200 underline underline-offset-2"
                          >
                            Want to help at our booth? Let us know.
                          </a>
                        ) : null}
                        <AddToCalendar event={event} />
                      </div>
                      {attendLinks.length > 0 ? (
                        <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                          {attendLinks.map((action) => (
                            <a
                              key={`${action.label}:${action.href}`}
                              href={action.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={ATTEND_BUTTON_CLASS}
                            >
                              {action.label}
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-white/50">No upcoming events right now. Check back soon.</p>
          )}
        </section>

        <section
          id="speaking"
          aria-labelledby="speaking-heading"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-2">
            <h2 id="speaking-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
              Interested in Mark coming to speak at your conference? Get in touch
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl">
              Tell us about your event. Audience size is optional; every other field is required.
            </p>
          </div>
          <SpeakingInquiryForm />
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  )
}
