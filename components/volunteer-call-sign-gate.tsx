"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ArrowRight, Check, Loader2, Lock, Unlock } from "lucide-react"
import {
  buildVolunteerSignupHref,
} from "@/components/volunteer-campaign-tracker"
import {
  buildVolunteerUnlockedSignupControl,
  normalizeVolunteerCallSignForOrg,
  resolveVolunteerOrg,
  VOLUNTEER_CAMPAIGN_CODE,
  VOLUNTEER_LP,
  VOLUNTEER_PREVIEW_SIGNUP_NOTICE,
  type VolunteerOrgCallSignConfig,
} from "@/lib/volunteer-landing"

const UNLOCKED_SIGNUP_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white px-8 py-3.5 font-semibold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"

/**
 * Call-sign gate for /volunteer.
 * Server/client format validation stays internal. User-facing copy must not
 * reveal the letter prefix, digit pattern, or any working call-sign example.
 *
 * Pass orgRef="SKYHOPE" for the SkyHope SYH gate; default is ACA/CMF.
 * Pass allowSignup / allowNetworkWrites from the server (VERCEL_ENV === "production").
 */
export function VolunteerCallSignGate({
  orgRef = VOLUNTEER_CAMPAIGN_CODE,
  allowSignup = true,
  allowNetworkWrites = true,
}: {
  orgRef?: string
  /** When false, unlocked Sign up is not a link (preview guard). */
  allowSignup?: boolean
  /** When false, skip POST /api/volunteer/call-sign. */
  allowNetworkWrites?: boolean
}) {
  const org: VolunteerOrgCallSignConfig = resolveVolunteerOrg(orgRef)
  const [input, setInput] = useState("")
  const [callSign, setCallSign] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [storedRemotely, setStoredRemotely] = useState(false)

  useEffect(() => {
    setInput("")
    setCallSign(null)
    setError(null)
    setStoredRemotely(false)
    try {
      const saved = localStorage.getItem(org.storageKey)
      if (saved && normalizeVolunteerCallSignForOrg(saved, org)) {
        setCallSign(saved)
        setInput(saved)
      }
    } catch {
      /* ignore */
    }
  }, [org.ref, org.storageKey])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const normalized = normalizeVolunteerCallSignForOrg(input, org)
    if (!normalized) {
      setError(org.error)
      setCallSign(null)
      return
    }

    setSubmitting(true)
    try {
      localStorage.setItem(org.storageKey, normalized)
    } catch {
      /* still continue with in-memory + signup query param */
    }

    let remoteOk = false
    if (allowNetworkWrites) {
      try {
        const fromUrl = new URLSearchParams(window.location.search).get("ref")?.trim()
        const storedRef = localStorage.getItem("planewx_referral")
        const ref =
          (fromUrl ? fromUrl.toUpperCase() : null) ||
          storedRef ||
          org.ref

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
              localStorage.setItem(org.storageKey, data.callSign)
            } catch {
              /* ignore */
            }
          }
        }
      } catch (err) {
        console.warn("[volunteer] call-sign API failed:", err)
      }
    }

    setSubmitting(false)
    setStoredRemotely(remoteOk)
    setCallSign(normalized)
  }

  const unlocked = Boolean(callSign)
  const unlockedControl =
    unlocked && callSign
      ? allowSignup
        ? {
            kind: "link" as const,
            href: buildVolunteerSignupHref(callSign, org.ref),
          }
        : buildVolunteerUnlockedSignupControl({
            isProduction: false,
            ref: org.ref,
            callSign,
            gateOrg: org,
          })
      : null

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
            {org.label}
          </label>
          <p className="text-sm text-white/50 leading-relaxed">
            {org.hint}
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
            placeholder={org.placeholder}
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
          {org.srHint}
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
              {org.acceptedLead}
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
              <span className="text-white/45">{org.lockedHint}</span>
            </>
          )}
        </div>

        <h3 className="text-xl font-bold tracking-tight">
          Sign up for a 2-week Pro Plus trial
        </h3>
        <p className="text-white/60 leading-relaxed text-sm sm:text-base">
          {org.unlockBody}
        </p>

        {unlockedControl?.kind === "link" ? (
          <a
            href={unlockedControl.href}
            className={UNLOCKED_SIGNUP_CLASS}
            onClick={(e) => {
              e.currentTarget.href = buildVolunteerSignupHref(callSign, org.ref)
            }}
          >
            Sign up for PlaneWX
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : unlockedControl?.kind === "preview" ? (
          <div className="space-y-2">
            <button
              type="button"
              className={`${UNLOCKED_SIGNUP_CLASS} cursor-default hover:bg-sky-500 hover:scale-100 active:scale-100`}
              aria-disabled="true"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              Sign up for PlaneWX
              <ArrowRight className="h-4 w-4" />
            </button>
            <p
              id="volunteer-preview-signup-notice"
              className="text-sm text-amber-200/90 leading-relaxed"
            >
              {unlockedControl.notice || VOLUNTEER_PREVIEW_SIGNUP_NOTICE}
            </p>
          </div>
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
