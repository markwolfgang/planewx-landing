"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Download,
  Gift,
  Loader2,
  Mic2,
  PlaneTakeoff,
  RefreshCw,
  Shirt,
  Sparkles,
  Users,
} from "lucide-react"
import {
  attendanceLabel,
  drawEventLabel,
  type RaffleDrawEvent,
} from "@/lib/osh-admin"

import type { PilotProfile } from "@/app/api/osh/list/route"

type Entry = {
  id: string
  email: string
  first_name: string | null
  marketing_opt_in: boolean
  source: string
  event_attendance: string | null
  created_at: string
  flew_to_osh: boolean | null
  pilot: PilotProfile | null
}

type Draw = {
  id: string
  entry_id: string
  prize: "sunglasses" | "merch"
  event: string | null
  status: "won" | "skipped_not_present"
  created_at: string
}

type Winner = {
  id: string
  email: string
  firstName: string | null
  eventAttendance?: string | null
}

type Prize = "sunglasses" | "merch"

export default function OshAdminPage() {
  const [secret, setSecret] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [draws, setDraws] = useState<Draw[]>([])
  const [eligibleMeetup, setEligibleMeetup] = useState(0)
  const [eligibleTalk, setEligibleTalk] = useState(0)
  const [marketingOptInCount, setMarketingOptInCount] = useState(0)
  const [attendanceCounts, setAttendanceCounts] = useState({
    meetup: 0,
    talk: 0,
    both: 0,
  })
  const [oshPilotCount, setOshPilotCount] = useState<number | null>(null)
  const [raffleOshPilotCount, setRaffleOshPilotCount] = useState(0)
  const [prize, setPrize] = useState<Prize>("sunglasses")
  const [drawEvent, setDrawEvent] = useState<RaffleDrawEvent>("meetup")
  const [winner, setWinner] = useState<Winner | null>(null)
  const [lastDraw, setLastDraw] = useState<Draw | null>(null)

  const eligibleForSelected = drawEvent === "meetup" ? eligibleMeetup : eligibleTalk

  async function fetchList(adminSecret: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/osh/list?secret=${encodeURIComponent(adminSecret)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to load entries")
        if (res.status === 401) setAuthenticated(false)
        return
      }
      setEntries(data.entries || [])
      setDraws(data.draws || [])
      setEligibleMeetup(data.eligibleMeetup ?? 0)
      setEligibleTalk(data.eligibleTalk ?? 0)
      setMarketingOptInCount(data.marketingOptInCount ?? 0)
      setAttendanceCounts(
        data.attendanceCounts || { meetup: 0, talk: 0, both: 0 },
      )
      setOshPilotCount(data.oshPilotCount ?? null)
      setRaffleOshPilotCount(data.raffleOshPilotCount ?? 0)
      setAuthenticated(true)
    } catch {
      setError("Network error loading entries")
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (secret.trim()) await fetchList(secret.trim())
  }

  async function pickWinner() {
    setDrawing(true)
    setError(null)
    try {
      const res = await fetch("/api/osh/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, prize, event: drawEvent }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Draw failed")
        return
      }
      setWinner(data.winner)
      setLastDraw(data.draw)
      await fetchList(secret)
    } catch {
      setError("Network error during draw")
    } finally {
      setDrawing(false)
    }
  }

  async function skipNotPresent() {
    if (!lastDraw) return
    setDrawing(true)
    setError(null)
    try {
      const res = await fetch("/api/osh/skip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, drawId: lastDraw.id }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Skip failed")
        return
      }
      setWinner(null)
      setLastDraw(null)
      await fetchList(secret)
    } catch {
      setError("Network error skipping winner")
    } finally {
      setDrawing(false)
    }
  }

  function exportCsv() {
    const header =
      "first_name,email,event_attendance,marketing_opt_in,source,created_at\n"
    const rows = entries
      .map((e) =>
        [
          csvEscape(e.first_name || ""),
          csvEscape(e.email),
          csvEscape(e.event_attendance || "both"),
          e.marketing_opt_in ? "yes" : "no",
          csvEscape(e.source),
          e.created_at,
        ].join(","),
      )
      .join("\n")
    const blob = new Blob([header + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `oshkosh-raffle-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const confirmedWins = useMemo(
    () => draws.filter((d) => d.status === "won"),
    [draws],
  )

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] text-white flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h1 className="text-xl font-bold">Oshkosh raffle admin</h1>
          <p className="text-sm text-white/50">
            Enter the same admin secret used for the waitlist admin.
          </p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={!secret.trim() || loading}
            className="w-full rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 py-3 font-semibold"
          >
            {loading ? "Checking…" : "Open admin"}
          </button>
          <Link href="/osh" className="block text-center text-sm text-white/40 hover:text-white">
            ← Back to /osh
          </Link>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="container mx-auto max-w-3xl px-4 py-8 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link
              href="/osh"
              className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white mb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              /osh
            </Link>
            <h1 className="text-2xl font-bold">Oshkosh raffle</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchList(secret)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
            >
              <Download className="h-3.5 w-3.5" />
              CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat icon={<Users className="h-4 w-4" />} label="Entries" value={entries.length} />
          <Stat icon={<Gift className="h-4 w-4" />} label="Meetup pool" value={eligibleMeetup} />
          <Stat icon={<Mic2 className="h-4 w-4" />} label="Talk pool" value={eligibleTalk} />
          <Stat icon={<Sparkles className="h-4 w-4" />} label="Marketing" value={marketingOptInCount} />
        </div>
        <p className="text-xs text-white/40 -mt-4">
          Attendance: {attendanceCounts.meetup} meetup · {attendanceCounts.talk} talk ·{" "}
          {attendanceCounts.both} both
        </p>

        {/* PlaneWX pilots at Oshkosh */}
        {oshPilotCount !== null && (
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
              <PlaneTakeoff className="h-4 w-4 text-sky-400" />
              PlaneWX pilots at Oshkosh 2026
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Stat
                icon={<PlaneTakeoff className="h-4 w-4" />}
                label="Flew to OSH area"
                value={oshPilotCount}
              />
              <Stat
                icon={<Users className="h-4 w-4" />}
                label="Also in raffle"
                value={raffleOshPilotCount}
              />
              <Stat
                icon={<Gift className="h-4 w-4" />}
                label="Raffle conversion"
                value={
                  oshPilotCount > 0
                    ? `${((entries.length / oshPilotCount) * 100).toFixed(1)}%`
                    : "—"
                }
                isText
              />
            </div>
            <p className="text-xs text-white/40">
              OSH area airports: KOSH · KATW · KFLD · KGRB · KRYV · KMSN · KUES · KLNR · KSBM ·
              arrival window Jul 14–28
            </p>
          </section>
        )}

        <section className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-6 space-y-5">
          <h2 className="text-lg font-semibold">Pick a winner</h2>

          <div>
            <p className="text-xs text-white/50 mb-2 uppercase tracking-wide font-semibold">
              Event draw
            </p>
            <div className="flex flex-wrap gap-2">
              <PrizeButton
                active={drawEvent === "meetup"}
                onClick={() => setDrawEvent("meetup")}
                icon={<Gift className="h-4 w-4" />}
                label={`Meetup (${eligibleMeetup})`}
              />
              <PrizeButton
                active={drawEvent === "talk"}
                onClick={() => setDrawEvent("talk")}
                icon={<Mic2 className="h-4 w-4" />}
                label={`Forum talk (${eligibleTalk})`}
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-white/50 mb-2 uppercase tracking-wide font-semibold">
              Prize
            </p>
            <div className="flex flex-wrap gap-2">
              <PrizeButton
                active={prize === "sunglasses"}
                onClick={() => setPrize("sunglasses")}
                icon={<Gift className="h-4 w-4" />}
                label="Sunglasses"
              />
              <PrizeButton
                active={prize === "merch"}
                onClick={() => setPrize("merch")}
                icon={<Shirt className="h-4 w-4" />}
                label="Hat / t-shirt"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={pickWinner}
            disabled={drawing || eligibleForSelected === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 disabled:opacity-50 px-8 py-4 text-lg font-bold shadow-lg shadow-sky-500/25"
          >
            {drawing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Drawing…
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Pick {drawEventLabel(drawEvent)} winner
              </>
            )}
          </button>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          {winner && lastDraw && (
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-6 sm:p-8 text-center space-y-3">
              <p className="text-emerald-300/80 text-sm font-medium uppercase tracking-wider">
                Winner — {drawEventLabel(lastDraw.event)} ·{" "}
                {lastDraw.prize === "sunglasses" ? "Sunglasses" : "Merch"}
              </p>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                {winner.firstName || "Pilot"}
              </p>
              <p className="text-lg text-white/70 break-all">{winner.email}</p>
              <p className="text-sm text-white/40">
                Signed up for: {attendanceLabel(winner.eventAttendance)}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setWinner(null)
                    setLastDraw(null)
                  }}
                  className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 font-semibold text-[#0a0f1a]"
                >
                  Confirmed present ✓
                </button>
                <button
                  type="button"
                  onClick={skipNotPresent}
                  disabled={drawing}
                  className="rounded-xl border border-white/20 hover:bg-white/5 px-6 py-3 font-semibold"
                >
                  Not present — redraw
                </button>
              </div>
            </div>
          )}
        </section>

        {confirmedWins.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Confirmed winners</h2>
            <ul className="space-y-2">
              {confirmedWins.map((d) => {
                const entry = entries.find((e) => e.id === d.entry_id)
                return (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {entry?.first_name || "—"} · {entry?.email || d.entry_id}
                      </p>
                      <p className="text-white/40 text-xs">
                        {drawEventLabel(d.event)} ·{" "}
                        {d.prize === "sunglasses" ? "Sunglasses" : "Merch"} ·{" "}
                        {new Date(d.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">All entries ({entries.length})</h2>
          <ul className="space-y-2">
            {entries.map((e) => {
              const wins = confirmedWins.filter((d) => d.entry_id === e.id)
              return (
                <li
                  key={e.id}
                  className={`rounded-xl border text-sm ${
                    wins.length > 0
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className={`truncate font-medium ${wins.length > 0 ? "text-emerald-200" : "text-white/90"}`}>
                      {e.first_name ? `${e.first_name} · ` : ""}
                      {e.email}
                      <span className="text-white/40 font-normal">
                        {" · "}{attendanceLabel(e.event_attendance)}
                      </span>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {e.flew_to_osh === true && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-1.5 py-0.5 text-xs font-medium text-sky-300 border border-sky-500/20">
                          <PlaneTakeoff className="h-3 w-3" />
                          flew in
                        </span>
                      )}
                      {e.pilot && (
                        <TierBadge tier={e.pilot.subscription_tier} isTrial={e.pilot.is_trial} />
                      )}
                      {wins.length > 0 && (
                        <span className="text-xs font-semibold text-emerald-300">
                          WON {wins.map((w) => drawEventLabel(w.event)).join(", ")}
                        </span>
                      )}
                      {e.marketing_opt_in && (
                        <span className="text-xs text-white/40">email ✓</span>
                      )}
                    </div>
                  </div>

                  {/* Pilot profile card */}
                  {e.pilot && (
                    <div className="border-t border-white/[0.06] px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-xs">
                      <div>
                        <p className="text-white/40 mb-0.5">Certificate</p>
                        <p className="font-medium">
                          {certLabel(e.pilot.pilot_certificate)}
                          {e.pilot.instrument_rating && <span className="ml-1 text-sky-300">IFR</span>}
                          {e.pilot.multi_engine_rating && <span className="ml-1 text-violet-300">ME</span>}
                          {e.pilot.cfi && <span className="ml-1 text-amber-300">CFI</span>}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/40 mb-0.5">Total hours</p>
                        <p className="font-medium">
                          {e.pilot.total_hours.toLocaleString()}h
                          <span className="text-white/40 font-normal ml-1">
                            ({e.pilot.last_30_days}h last 30d)
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-white/40 mb-0.5">PlaneWX trips</p>
                        <p className="font-medium">{e.pilot.total_trips}</p>
                      </div>
                      <div>
                        <p className="text-white/40 mb-0.5">Member since</p>
                        <p className="font-medium">{memberSince(e.pilot.member_since)}</p>
                      </div>
                      {e.pilot.home_airport && (
                        <div>
                          <p className="text-white/40 mb-0.5">Home airport</p>
                          <p className="font-medium">{e.pilot.home_airport}</p>
                        </div>
                      )}
                      {e.pilot.badges.length > 0 && (
                        <div className="col-span-2 sm:col-span-3">
                          <p className="text-white/40 mb-0.5">Badges</p>
                          <p className="font-medium text-white/60">{e.pilot.badges.join(" · ")}</p>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              )
            })}
            {entries.length === 0 && (
              <li className="text-white/40 text-sm py-6 text-center">No entries yet</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  )
}

function TierBadge({ tier, isTrial }: { tier: string | null; isTrial: boolean }) {
  if (isTrial)
    return (
      <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-xs font-medium text-amber-300 border border-amber-500/20">
        trial
      </span>
    )
  if (tier === "pro" || tier === "professional")
    return (
      <span className="rounded-md bg-violet-500/15 px-1.5 py-0.5 text-xs font-medium text-violet-300 border border-violet-500/20">
        pro
      </span>
    )
  if (tier === "casual")
    return (
      <span className="rounded-md bg-teal-500/15 px-1.5 py-0.5 text-xs font-medium text-teal-300 border border-teal-500/20">
        casual
      </span>
    )
  return (
    <span className="rounded-md bg-white/8 px-1.5 py-0.5 text-xs font-medium text-white/50 border border-white/10">
      free
    </span>
  )
}

function certLabel(cert: string | null): string {
  switch (cert?.toUpperCase()) {
    case "STUDENT":    return "Student"
    case "SPORT":      return "Sport"
    case "PRIVATE":    return "PPL"
    case "COMMERCIAL": return "CPL"
    case "ATP":        return "ATP"
    default:           return cert ?? "—"
  }
}

function memberSince(iso: string): string {
  if (!iso) return "—"
  const d = new Date(iso)
  const now = new Date()
  const months =
    (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
  if (months < 1) return "< 1 mo"
  if (months < 12) return `${months} mo`
  const yrs = Math.floor(months / 12)
  const rem = months % 12
  return rem > 0 ? `${yrs}y ${rem}mo` : `${yrs}y`
}

function Stat({
  icon,
  label,
  value,
  isText = false,
}: {
  icon: React.ReactNode
  label: string
  value: number | string
  isText?: boolean
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
        {icon}
        {label}
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function PrizeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border transition-colors ${
        active
          ? "bg-sky-500 border-sky-400 text-white"
          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}
