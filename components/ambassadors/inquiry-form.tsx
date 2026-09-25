"use client"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"

type Status = "idle" | "loading" | "success" | "error"

export function AmbassadorInquiryForm() {
  const [org, setOrg] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/ambassadors/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ org, name, email, note }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
      setMessage(data.message || "Thanks. We got your note and will reply soon.")
      setOrg("")
      setName("")
      setEmail("")
      setNote("")
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6 space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-300 font-semibold">
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
          Inquiry sent
        </div>
        <p className="text-sm text-white/70 leading-relaxed">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-white/55">
            Organization or club
          </span>
          <input
            name="org"
            required
            maxLength={200}
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            autoComplete="organization"
            placeholder="Club, brand, or owners group"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-white/55">Your name</span>
          <input
            name="name"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Who should we reply to"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40"
          />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-white/55">Email</span>
        <input
          name="email"
          type="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="you@email.com"
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-white/55">
          How do you want to get involved?
        </span>
        <textarea
          name="note"
          required
          maxLength={4000}
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="A short note on fly-ins, events, or community ideas."
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40 resize-y min-h-[6.5rem]"
        />
      </label>
      {status === "error" ? (
        <p className="text-sm text-rose-400" role="alert">
          {message}
        </p>
      ) : null}
      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B82F6] hover:bg-sky-400 disabled:opacity-60 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send community inquiry"
          )}
        </button>
      </div>
    </form>
  )
}
