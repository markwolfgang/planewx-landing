"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import {
  BOOTH_VOLUNTEER_INTENT,
  BOOTH_VOLUNTEER_PREFILL,
  SPEAKING_INQUIRY_FIELDS,
  SPEAKING_INQUIRY_HONEYPOT,
  validateSpeakingInquiry,
  type SpeakingInquiry,
  type SpeakingInquiryField,
} from "@/lib/speaking-inquiry"

type Status = "idle" | "loading" | "success" | "error"

const EMPTY: SpeakingInquiry = {
  name: "",
  email: "",
  org: "",
  eventName: "",
  eventDates: "",
  location: "",
  audienceSize: "",
  message: "",
}

const INPUT_CLASS =
  "w-full rounded-xl border bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/40"

type InputProps = {
  field: SpeakingInquiryField
  type?: string
  autoComplete?: string
  placeholder?: string
}

/**
 * Parse a JSON response body without throwing. A platform error page (502,
 * 504, 413, timeout) is HTML, not JSON; treat that as an empty object so the
 * caller can report the HTTP status instead of a network error.
 */
async function readJsonBody(res: Response): Promise<{ success?: unknown; error?: unknown; message?: unknown }> {
  try {
    const data: unknown = await res.json()
    return data && typeof data === "object" ? (data as { success?: unknown; error?: unknown; message?: unknown }) : {}
  } catch {
    return {}
  }
}

export function SpeakingInquiryForm() {
  const [values, setValues] = useState<SpeakingInquiry>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<SpeakingInquiryField, string>>>({})
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  // Honeypot: hidden from people and assistive tech. Bots that fill it are
  // dropped silently by the API.
  const [website, setWebsite] = useState("")

  // Booth-help links land on /events?intent=booth-volunteer#speaking. Fill
  // Message only when it is still empty so a typed note is left alone.
  // This does not add a field or change where the form submits.
  useEffect(() => {
    const intent = new URLSearchParams(window.location.search).get("intent")
    if (intent !== BOOTH_VOLUNTEER_INTENT) return
    setValues((prev) => {
      if (prev.message.trim()) return prev
      return { ...prev, message: BOOTH_VOLUNTEER_PREFILL }
    })
  }, [])

  function update(field: SpeakingInquiryField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage("")

    // Client-side check with the same rules the server uses. Nothing is sent
    // until every required field passes.
    const check = validateSpeakingInquiry(values)
    if (!check.ok) {
      setErrors(check.errors)
      setStatus("error")
      setMessage("Please fix the highlighted fields.")
      return
    }
    setErrors({})
    setStatus("loading")

    try {
      const res = await fetch("/api/events/speaking-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...check.data, [SPEAKING_INQUIRY_HONEYPOT]: website }),
      })
      if (!res.ok) {
        const data = await readJsonBody(res)
        setStatus("error")
        setMessage(
          typeof data.error === "string" && data.error
            ? data.error
            : `Something went wrong (HTTP ${res.status}). Please try again.`,
        )
        return
      }
      const data = await readJsonBody(res)
      // Only confirm when the API itself says so. A 2xx HTML page or malformed
      // body does not prove the request was accepted, so keep the values.
      if (data.success !== true) {
        setStatus("error")
        setMessage(`We could not confirm your request was received (HTTP ${res.status}). Please try again.`)
        return
      }
      setStatus("success")
      setMessage(
        typeof data.message === "string" && data.message
          ? data.message
          : "Thanks. We got your request and will reply soon.",
      )
      setValues(EMPTY)
      setWebsite("")
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
          Request sent
        </div>
        <p className="text-sm text-white/70 leading-relaxed">{message}</p>
      </div>
    )
  }

  function labelText(field: SpeakingInquiryField) {
    const spec = SPEAKING_INQUIRY_FIELDS[field]
    return spec.required ? spec.label : `${spec.label} (optional)`
  }

  function Input({ field, type = "text", autoComplete, placeholder }: InputProps) {
    const spec = SPEAKING_INQUIRY_FIELDS[field]
    const error = errors[field]
    const errorId = `speaking-${field}-error`
    return (
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-white/55">{labelText(field)}</span>
        <input
          name={field}
          type={type}
          required={spec.required}
          aria-required={spec.required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          maxLength={spec.max}
          value={values[field]}
          onChange={(e) => update(field, e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          data-testid={`speaking-${field}`}
          className={`${INPUT_CLASS} ${error ? "border-rose-400/70" : "border-white/10"}`}
        />
        {error ? (
          <span id={errorId} className="block text-xs text-rose-400">
            {error}
          </span>
        ) : null}
      </label>
    )
  }

  const messageError = errors.message

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative space-y-4 text-left"
      data-testid="speaking-inquiry-form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Input({ field: "name", autoComplete: "name" })}
        {Input({ field: "email", type: "email", autoComplete: "email", placeholder: "you@email.com" })}
        {Input({ field: "org", autoComplete: "organization" })}
        {Input({ field: "eventName" })}
        {Input({ field: "eventDates", placeholder: "For example, Mar 12-14, 2027" })}
        {Input({ field: "location", placeholder: "City, state or venue" })}
        {Input({ field: "audienceSize", placeholder: "Approximate number" })}
      </div>
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name={SPEAKING_INQUIRY_HONEYPOT}
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            data-testid="speaking-website"
          />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-white/55">{labelText("message")}</span>
        <textarea
          name="message"
          required
          aria-required
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? "speaking-message-error" : undefined}
          maxLength={SPEAKING_INQUIRY_FIELDS.message.max}
          rows={4}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          data-testid="speaking-message"
          className={`${INPUT_CLASS} ${messageError ? "border-rose-400/70" : "border-white/10"} resize-y min-h-[6.5rem]`}
        />
        {messageError ? (
          <span id="speaking-message-error" className="block text-xs text-rose-400">
            {messageError}
          </span>
        ) : null}
      </label>
      {status === "error" && message ? (
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
              Sending...
            </>
          ) : (
            "Send speaking request"
          )}
        </button>
      </div>
    </form>
  )
}
