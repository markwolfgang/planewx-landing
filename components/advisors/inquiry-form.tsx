"use client"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"

import { ADVISOR_EXPERTISE_OPTIONS } from "@/lib/advisor-expertise"

type Status = "idle" | "loading" | "success" | "error"

export function AdvisorInquiryForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [background, setBackground] = useState("")
  const [expertise, setExpertise] = useState<string[]>([])
  const [why, setWhy] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  function toggleExpertise(option: string) {
    setExpertise((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (expertise.length === 0) {
      setStatus("error")
      setMessage("Select at least one area of expertise.")
      return
    }
    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/advisors/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          linkedin,
          background,
          expertise,
          why,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
      setMessage(data.message || "Thanks. We got your note and will reply soon.")
      setName("")
      setEmail("")
      setPhone("")
      setLinkedin("")
      setBackground("")
      setExpertise([])
      setWhy("")
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
          <span className="text-xs font-medium text-white/55">Name</span>
          <input
            name="name"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40"
          />
        </label>
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-white/55">
            Phone <span className="text-white/35">(optional)</span>
          </span>
          <input
            name="phone"
            type="tel"
            maxLength={40}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="Mobile or office"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-white/55">
            LinkedIn or website <span className="text-white/35">(optional)</span>
          </span>
          <input
            name="linkedin"
            type="text"
            inputMode="url"
            maxLength={400}
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            autoComplete="url"
            placeholder="https://"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40"
          />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-white/55">
          Aviation background
        </span>
        <textarea
          name="background"
          required
          maxLength={4000}
          rows={4}
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder="Ratings, aircraft, clubs, or ops experience."
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40 resize-y min-h-[6.5rem]"
        />
      </label>
      <fieldset className="space-y-2.5">
        <legend className="text-xs font-medium text-white/55">
          Areas of expertise
        </legend>
        <div className="space-y-2">
          {ADVISOR_EXPERTISE_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/85 hover:border-sky-500/30 cursor-pointer"
            >
              <input
                type="checkbox"
                name="expertise"
                value={option}
                checked={expertise.includes(option)}
                onChange={() => toggleExpertise(option)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-sky-400"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-white/55">Why PlaneWX</span>
        <textarea
          name="why"
          required
          maxLength={4000}
          rows={4}
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder="What draws you to advising PlaneWX."
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
            "Start the conversation"
          )}
        </button>
      </div>
    </form>
  )
}
