"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ArrowRight, Check, Loader2, Lock, Unlock } from "lucide-react"
import {
  buildVolunteerSignupHref,
} from "@/components/volunteer-campaign-tracker"
import {
  normalizeVolunteerCallSign,
  VOLUNTEER_CALL_SIGN_FORMAT_ERROR,
  VOLUNTEER_CALL_SIGN_FORMAT_HINT,
  VOLUNTEER_CALL_SIGN_PLACEHOLDER,
  VOLUNTEER_CALL_SIGN_STORAGE_KEY,
  VOLUNTEER_CAMPAIGN_CODE,
  VOLUNTEER_LP,
} from "@/lib/volunteer-landing"

/**
 * Call-sign gate for /volunteer.
 * Server/client format validation stays internal. User-facing copy must not
 * reveal the letter prefix, digit pattern, or any working call-sign example.
 */
export function VolunteerCallSignGate() {
  const [input, setInput] = useState("")
  const [callSign, setCallSign] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [storedRemotely, setStoredRemotely] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VOLUNTEER_CALL_SIGN_STORAGE_KEY)
      if (saved && normalizeVolunteerCallSign(saved)) {
        setCallSign(saved)
        setInput(saved)
      }
    } catch {
      /* ignore */
    }
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const normalized = normalizeVolunteerCallSign(input)
    if (!normalized) {
      setError(VOLUNTEER_CALL_SIGN_FORMAT_ERROR)
      setCallSign(null)
      return
    }

    setSubmitting(true)
    try {
      localStorage.setItem(VOLUNTEER_CALL_SIGN_STORAGE_KEY, normalized)
    } catch {
      /* still continue with in-memory + signup query param */
    }

    let remoteOk = false
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("ref")?.trim()
      const storedRef = localStorage.getItem("planewx_referral")
      const ref =
        (fromUrl ? fromUrl.toUpperCase() : null) ||
        storedRef ||
        VOLUNTEER_CAMPAIGN_CODE

      const res = await fetch("/api/volunteer/call-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callSign: normalized,
          ref,
          lp: VOLUNTEER_LP,
        }),
      })
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; callSign?: string; stored?: boolean; error?: string }
        | null

      if (!res.ok || !data?.ok) {
        console.warn("[volunteer] call-sign API:", data?.error || res.status)
      } else {
        remoteOk = Boolean(data.stored)
        if (data.callSign) {
          try {
            localStorage.setItem(VOLUNTEER_CALL_SIGN_STORAGE_KEY, data.callSign)
          } catch {
            /* ignore */
          }
        }
      }
    } catch (err) {
      console.warn("[volunteer] call-sign API failed:", err)
    } finally {
      setSubmitting(false)
    }

    setStoredRemotely(remoteOk)
    setCallSign(normalized)
  }

  const unlocked = Boolean(callSign)
  const signupHref = buildVolunteerSignupHref(callSign)

  return (
    <div className="space-y-6">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-4"
        noValidate
      >
        <div className="space-y-2">
          <label
            htmlFor="volunteer-call-sign"
            className="block text-sm font-semibold text-white"
          >
            Your Compassion Flight call sign
          </label>
          <p className="text-sm text-white/50 leading-relaxed">
            {VOLUNTEER_CALL_SIGN_FORMAT_HINT}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="volunteer-call-sign"
            name="callSign"
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            placeholder={VOLUNTEER_CALL_SIGN_PLACEHOLDER}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              if (error) setError(null)
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "volunteer-call-sign-error" : "volunteer-call-sign-hint"
            }
            className="flex-1 rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500/40"
          />
          <button
            type="submit"
            disabled={submitting || !input.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 disabled:pointer-events-none text-white px-6 py-3 font-semibold transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Checking
              </>
            ) : unlocked ? (
              "Update"
            ) : (
              "Continue"
            )}
          </button>
        </div>

        <p id="volunteer-call-sign-hint" className="sr-only">
          Enter your Compassion Flight call sign.
        </p>

        {error ? (
          <p
            id="volunteer-call-sign-error"
            role="alert"
            className="text-sm text-rose-300 leading-relaxed"
          >
            {error}
          </p>
        ) : null}

        {unlocked ? (
          <p className="inline-flex items-start gap-2 text-sm text-emerald-300 leading-relaxed">
            <Check className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
            <span>
              Call sign accepted. Sign up below for your 2-week Pro Plus trial. At
              purchase, PlaneWX applies the volunteer discount from the call sign you
              entered
              {storedRemotely ? "." : " (saved for signup on this device)."}
            </span>
          </p>
        ) : null}
      </form>

      <div
        className={`rounded-2xl border p-5 sm:p-6 space-y-4 transition-all ${
          unlocked
            ? "border-sky-500/30 bg-sky-500/10"
            : "border-white/10 bg-white/[0.02] opacity-70"
        }`}
        aria-disabled={!unlocked}
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          {unlocked ? (
            <>
              <Unlock className="h-4 w-4 text-sky-300" aria-hidden />
              <span className="text-sky-200">Sign up unlocked</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 text-white/40" aria-hidden />
              <span className="text-white/45">
                Enter your Compassion Flight call sign to unlock signup
              </span>
            </>
          )}
        </div>

        <h3 className="text-xl font-bold tracking-tight">
          Sign up for a 2-week Pro Plus trial
        </h3>
        <p className="text-white/60 leading-relaxed text-sm sm:text-base">
          Full access to Pro Plus, our highest tier. No credit card required to
          start the trial. When you continue after the trial, PlaneWX applies a
          30% volunteer discount at purchase from the call sign you entered here.
          You do not type a separate coupon code.
        </p>

        {unlocked && callSign ? (
          <a
            href={signupHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={(e) => {
              e.currentTarget.href = buildVolunteerSignupHref(callSign)
            }}
          >
            Sign up for PlaneWX
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500/40 text-white/70 px-8 py-3.5 font-semibold cursor-not-allowed"
          >
            Sign up for PlaneWX
            <Lock className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  )
}
