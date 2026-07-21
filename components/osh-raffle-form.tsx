"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import type { RaffleAttendance } from "@/lib/osh-admin"
import {
  googleCalendarUrl,
  icsHref,
  OSH_EVENTS,
  type OshCalendarEventId,
} from "@/lib/osh-calendar"

function CalendarLinks({ events }: { events: OshCalendarEventId[] }) {
  return (
    <div className="space-y-2 pt-1">
      <p className="text-sm text-white/55 font-medium">Add to calendar</p>
      {events.map((id) => {
        const event = OSH_EVENTS[id]
        const label = id === "meetup" ? "Meetup" : "Forum talk"
        return (
          <div key={id} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="text-white/70 font-medium">{label}:</span>
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-medium"
            >
              Google
            </a>
            <span className="text-white/25">·</span>
            <a
              href={icsHref(event)}
              className="text-sky-400 hover:text-sky-300 font-medium"
            >
              Apple / Outlook
            </a>
          </div>
        )
      })}
    </div>
  )
}

const EVENT_OPTIONS: { value: RaffleAttendance; label: string; detail: string }[] = [
  {
    value: "meetup",
    label: "Meetup",
    detail: "Wed 11 AM · Flyte Booth 337",
  },
  {
    value: "talk",
    label: "Forum talk",
    detail: "Wed 4 PM · Forum Stage 10",
  },
  {
    value: "both",
    label: "Both",
    detail: "Meetup + forum talk",
  },
]

export function OshRaffleForm() {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [eventAttendance, setEventAttendance] = useState<RaffleAttendance | "">("")
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!eventAttendance) {
      setStatus("error")
      setMessage("Please choose which event you'll attend.")
      return
    }
    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/osh/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          eventAttendance,
          marketingOptIn,
          source: "page",
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
      setMessage(data.message || "You're in!")
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  if (status === "success") {
    const calendarEvents: OshCalendarEventId[] =
      eventAttendance === "meetup"
        ? ["meetup"]
        : eventAttendance === "talk"
          ? ["talk"]
          : eventAttendance === "both"
            ? ["meetup", "talk"]
            : []

    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-emerald-300 font-semibold text-lg">
          <CheckCircle2 className="h-5 w-5" />
          You&apos;re entered
        </div>
        <p className="text-white/80">{message}</p>
        <p className="text-sm text-white/50">
          Must be present at your selected event to win
        </p>
        {calendarEvents.length > 0 && <CalendarLinks events={calendarEvents} />}
        <a
          href="https://app.planewx.ai/auth/sign-up?lp=osh"
          className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-medium text-sm pt-2"
          onClick={(e) => {
            try {
              const stored = localStorage.getItem("planewx_referral")
              const fromUrl = new URLSearchParams(window.location.search).get("ref")
              const code = stored || (fromUrl ? fromUrl.toUpperCase() : null)
              if (code) {
                e.currentTarget.href = `https://app.planewx.ai/auth/sign-up?lp=osh&ref=${encodeURIComponent(code)}`
              }
            } catch {
              /* ignore */
            }
          }}
        >
          Try PlaneWX free while you wait
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="osh-name" className="block text-sm text-white/60 mb-1.5">
            First name <span className="text-white/30">(optional)</span>
          </label>
          <input
            id="osh-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            placeholder="Mark"
          />
        </div>
        <div>
          <label htmlFor="osh-email" className="block text-sm text-white/60 mb-1.5">
            Email
          </label>
          <input
            id="osh-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            placeholder="you@email.com"
          />
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm text-white/60 mb-1.5">
          Which event will you be at? <span className="text-rose-400">*</span>
        </legend>
        <div className="grid gap-2">
          {EVENT_OPTIONS.map((opt) => {
            const selected = eventAttendance === opt.value
            return (
              <label
                key={opt.value}
                className={`flex items-start gap-3 cursor-pointer rounded-xl border px-4 py-3 transition-colors ${
                  selected
                    ? "border-sky-400 bg-sky-500/15"
                    : "border-white/10 bg-white/5 hover:bg-white/[0.07]"
                }`}
              >
                <input
                  type="radio"
                  name="eventAttendance"
                  value={opt.value}
                  checked={selected}
                  onChange={() => setEventAttendance(opt.value)}
                  className="mt-1 h-4 w-4 border-white/20 text-sky-500 focus:ring-sky-500/50"
                  required
                />
                <span>
                  <span className="block text-sm font-semibold text-white">{opt.label}</span>
                  <span className="block text-xs text-white/50 mt-0.5">{opt.detail}</span>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={marketingOptIn}
          onChange={(e) => setMarketingOptIn(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-sky-500 focus:ring-sky-500/50"
        />
        <span className="text-sm text-white/55 leading-snug">
          Also send me occasional PlaneWX updates. You can unsubscribe anytime.
        </span>
      </label>

      <p className="text-xs text-amber-300/90 font-medium">
        Must be present at your selected event to win · Drawings at meetup and forum talk
      </p>

      {status === "error" && (
        <p className="text-sm text-rose-400">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 disabled:opacity-60 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Entering…
          </>
        ) : (
          <>
            Enter the giveaway
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}
