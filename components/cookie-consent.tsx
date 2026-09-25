"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  COOKIE_PREFS_OPEN_EVENT,
  hasValidCookieChoice,
  notifyCookiePrefsChanged,
  readCookiePrefs,
  writeCookiePrefs,
  type CookiePrefs,
} from "@/lib/cookie-prefs"
import {
  hasGlobalPrivacyControl,
  readConsentModeFromDocument,
  type ConsentMode,
} from "@/lib/consent-region"

/**
 * Cookie / tracking preference banner.
 * Strict regions (EU/UK/EEA/CH, or unknown geo): block non-essential until opt-in.
 * Notice regions: show a notice; marketing respects GPC and Do not sell.
 * Labels match the app: Manage, Essential only, Accept all.
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState<ConsentMode>("strict")
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const consentMode = readConsentModeFromDocument()
    setMode(consentMode)

    const prefs = readCookiePrefs()
    if (prefs && hasValidCookieChoice(prefs)) {
      setAnalytics(prefs.analytics)
      setMarketing(prefs.marketing)
      setShowBanner(false)
    } else {
      // Missing or unknown/stale value: show banner. Do not migrate unknowns.
      setShowBanner(true)
      // Notice mode + GPC: treat as marketing opt-out even before a stored choice.
      if (consentMode === "notice" && hasGlobalPrivacyControl()) {
        setMarketing(false)
      }
    }

    const onOpen = () => {
      const current = readCookiePrefs()
      if (current) {
        setAnalytics(current.analytics)
        setMarketing(current.marketing)
      }
      setShowBanner(true)
      setShowModal(false)
    }
    window.addEventListener(COOKIE_PREFS_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(COOKIE_PREFS_OPEN_EVENT, onOpen)
  }, [])

  const savePrefs = (opts: { analytics: boolean; marketing: boolean }) => {
    if (typeof window === "undefined") return
    const prefs: CookiePrefs | null = writeCookiePrefs(opts)
    if (!prefs) {
      console.warn("[cookie-consent] failed to save prefs")
      // Keep banner visible so the user knows the choice did not stick.
      return
    }
    setAnalytics(prefs.analytics)
    setMarketing(prefs.marketing)
    setShowBanner(false)
    setShowModal(false)
    notifyCookiePrefsChanged(prefs)
  }

  const onAcceptAll = () => savePrefs({ analytics: true, marketing: true })
  const onEssentialOnly = () => savePrefs({ analytics: false, marketing: false })
  const onSaveModal = () => savePrefs({ analytics, marketing })
  const onDoNotSell = () => savePrefs({ analytics: true, marketing: false })

  if (!showBanner && !showModal) return null

  const isStrict = mode === "strict"
  const bodyText = isStrict
    ? "We use cookies for essential site functions. Analytics and marketing run only if you allow them."
    : "We use cookies for essential site functions, analytics, and marketing. You can change your choice anytime."

  return (
    <>
      {showBanner && (
        <div
          data-testid="cookie-consent-banner"
          data-consent-mode={mode}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-900/95 text-slate-100 shadow-lg pb-[env(safe-area-inset-bottom)]"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm">
              <p className="font-medium">Cookies & Preferences</p>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{bodyText}</p>
              {!isStrict && (
                <button
                  type="button"
                  onClick={onDoNotSell}
                  className="text-xs text-sky-400 hover:text-sky-300 underline underline-offset-2 text-left"
                >
                  Do not sell or share my personal information
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700"
                onClick={() => setShowModal(true)}
              >
                Manage
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-slate-400 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white min-w-[7.5rem]"
                onClick={onEssentialOnly}
              >
                Essential only
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-slate-400 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white min-w-[7.5rem]"
                onClick={onAcceptAll}
              >
                Accept all
              </Button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-prefs-title"
        >
          <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 text-slate-100 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <h2 id="cookie-prefs-title" className="text-xl font-semibold">
                Manage preferences
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:bg-slate-800 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
            <div className="space-y-4 px-4 py-4 text-sm">
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-1" />
                <span>
                  <span className="font-medium">Essential</span>
                  <span className="block text-slate-400 text-xs mt-0.5">
                    Required for the site to work (security, variant assignment, consent storage).
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span>
                  <span className="font-medium">Analytics</span>
                  <span className="block text-slate-400 text-xs mt-0.5">
                    Helps us understand site usage (Google Analytics, Vercel Analytics).
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                <span>
                  <span className="font-medium">Marketing</span>
                  <span className="block text-slate-400 text-xs mt-0.5">
                    Ad measurement and remarketing (Google Ads, Meta Pixel, Reddit Pixel).
                  </span>
                </span>
              </label>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-slate-800 px-4 py-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:bg-slate-800 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800 hover:text-white"
                onClick={onEssentialOnly}
              >
                Essential only
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-sky-500 text-slate-950 hover:bg-sky-400 border-0"
                onClick={onSaveModal}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
