"use client"

import { useEffect, useState } from "react"
import { Check, Link2, Mail, MessageSquare, Share2 } from "lucide-react"

type NewsShareBarProps = {
  url: string
  title: string
  excerpt: string
}

function shareButtonClass(extra = "") {
  return `inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-sky-500/40 hover:bg-white/[0.08] hover:text-white ${extra}`
}

function iconButtonClass() {
  return "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-sky-500/40 hover:bg-white/[0.08] hover:text-white"
}

export function NewsShareBar({ url, title, excerpt }: NewsShareBarProps) {
  const [canNativeShare, setCanNativeShare] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function")
  }, [])

  const text = `${title}\n${url}`
  const emailHref = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${excerpt}\n\n${url}`)}`
  const smsHref = `sms:?body=${encodeURIComponent(text)}`
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  async function onNativeShare() {
    try {
      await navigator.share({ title, text: excerpt, url })
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
    }
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      const field = document.createElement("textarea")
      field.value = url
      field.setAttribute("readonly", "")
      field.style.position = "absolute"
      field.style.left = "-9999px"
      document.body.appendChild(field)
      field.select()
      document.execCommand("copy")
      document.body.removeChild(field)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Share this article"
    >
      <span className="mr-1 text-xs uppercase tracking-widest text-white/35">Share</span>

      {canNativeShare && (
        <button type="button" onClick={onNativeShare} className={shareButtonClass()}>
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
          Share
        </button>
      )}

      <button
        type="button"
        onClick={onCopy}
        className={shareButtonClass()}
        aria-live="polite"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
        ) : (
          <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>

      <a href={emailHref} className={shareButtonClass()}>
        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
        Email
      </a>
      <a href={smsHref} className={shareButtonClass()}>
        <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
        Text
      </a>

      <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />

      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass()}
        aria-label="Share on X"
      >
        <XLogo />
      </a>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass()}
        aria-label="Share on LinkedIn"
      >
        <LinkedInLogo />
      </a>
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass()}
        aria-label="Share on Facebook"
      >
        <FacebookLogo />
      </a>
    </div>
  )
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.725-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.492 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}
