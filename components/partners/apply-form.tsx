"use client"

import { useState } from "react"

const APPLY_MAILTO = "sara@planewx.ai"

export function PartnerApplyForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const org = String(data.get("org") ?? "").trim()
    const name = String(data.get("name") ?? "").trim()
    const note = String(data.get("note") ?? "").trim()
    const subject = encodeURIComponent(
      org ? `Partnership inquiry: ${org}` : "Partnership inquiry"
    )
    const body = encodeURIComponent(
      [`Organization: ${org || "(not listed)"}`, `Name: ${name || "(not listed)"}`, "", note]
        .join("\n")
    )
    window.location.href = `mailto:${APPLY_MAILTO}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-white/55">Organization</span>
          <input
            name="org"
            required
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
            autoComplete="name"
            placeholder="Who should we reply to"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40"
          />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-white/55">What do you want to do together?</span>
        <textarea
          name="note"
          required
          rows={4}
          placeholder="A short note on the work, your site, and why the fit."
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40 resize-y min-h-[6.5rem]"
        />
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-sky-400 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all"
        >
          Email partnership inquiry
        </button>
        <a
          href={`mailto:${APPLY_MAILTO}?subject=${encodeURIComponent("Partnership inquiry")}`}
          className="text-sm text-sky-300 hover:text-sky-200 transition-colors"
        >
          Or write {APPLY_MAILTO} directly
        </a>
      </div>
      {sent ? (
        <p className="text-xs text-white/40">
          Your mail app should open with the note addressed to Sara. If it does not, email {APPLY_MAILTO}.
        </p>
      ) : null}
    </form>
  )
}
