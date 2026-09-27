"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  COOKIE_DNS_CONFIRMED_EVENT,
  COOKIE_PREFS_CHANGED_EVENT,
  COOKIE_PREFS_OPEN_EVENT,
  COOKIE_PREFS_STORAGE_KEY,
  COOKIE_PREFS_VERSION,
  effectiveCookieToggleState,
  hasValidCookieChoice,
  notifyCookiePrefsChanged,
  optOutOfSaleOrSharing,
  parseCookiePrefs,
  readCookiePrefs,
  writeCookiePrefs,
  type CookiePrefs,
} from "@/lib/cookie-prefs"
import {
  hasGlobalPrivacyControl,
  readConsentModeFromDocument,
  showDoNotSellLink,
  type ConsentMode,
} from "@/lib/consent-region"

const CONSENT_BANNER_H_VAR = "--consent-banner-h"

function clearConsentBannerPad() {
  if (typeof document === "undefined") return
  document.documentElement.style.removeProperty(CONSENT_BANNER_H_VAR)
  document.body.style.removeProperty("padding-bottom")
}

function applyConsentBannerPad(heightPx: number) {
  if (typeof document === "undefined") return
  const h = Math.max(0, Math.round(heightPx))
  document.documentElement.style.setProperty(CONSENT_BANNER_H_VAR, `${h}px`)
  document.body.style.paddingBottom = `calc(var(${CONSENT_BANNER_H_VAR}) + env(safe-area-inset-bottom))`
}

/**
 * Cookie and tracking preference banner.
 * Opt-in everywhere. Region mode changes wording and Do not sell visibility.
 * GPC forces Marketing off. Manage dialog traps focus and restores it on close.
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState<ConsentMode>("strict")
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [gpcOn, setGpcOn] = useState(false)
  const [dnsConfirm, setDnsConfirm] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const manageButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const bannerRef = useRef<HTMLDivElement | null>(null)
  const titleId = useId()

  const syncTogglesFromEffective = (
    consentMode: ConsentMode,
    gpc: boolean,
    prefs: CookiePrefs | null = readCookiePrefs(),
  ) => {
    const next = effectiveCookieToggleState({ mode: consentMode, prefs, gpc })
    setAnalytics(next.analytics)
    setMarketing(next.marketing)
  }

  useEffect(() => {
    const consentMode = readConsentModeFromDocument()
    const gpc = hasGlobalPrivacyControl()
    setMode(consentMode)
    setGpcOn(gpc)

    const prefs = readCookiePrefs()
    syncTogglesFromEffective(consentMode, gpc, prefs)
    if (prefs && hasValidCookieChoice(prefs)) {
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
    setReady(true)

    const onOpen = () => {
      const current = readCookiePrefs()
      const gpcNow = hasGlobalPrivacyControl()
      const modeNow = readConsentModeFromDocument()
      setGpcOn(gpcNow)
      setMode(modeNow)
      syncTogglesFromEffective(modeNow, gpcNow, current)
      setShowBanner(true)
      setShowModal(false)
    }
    const onChanged = (event: Event) => {
      const detail = (event as CustomEvent<CookiePrefs>).detail
      const gpcNow = hasGlobalPrivacyControl()
      const modeNow = readConsentModeFromDocument()
      setGpcOn(gpcNow)
      setMode(modeNow)
      if (detail && hasValidCookieChoice(detail)) {
        syncTogglesFromEffective(modeNow, gpcNow, detail)
        setShowBanner(false)
        setShowModal(false)
      }
    }
    const onDnsConfirmed = (event: Event) => {
      const detail = (event as CustomEvent<CookiePrefs>).detail
      const msg =
        detail?.analytics === true
          ? "Sale or sharing is off. Marketing is off. Analytics stays on."
          : "Sale or sharing is off. Marketing is off. Analytics stays off."
      setDnsConfirm(msg)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== COOKIE_PREFS_STORAGE_KEY) return
      const next = parseCookiePrefs(event.newValue)
      const gpcNow = hasGlobalPrivacyControl()
      const modeNow = readConsentModeFromDocument()
      setGpcOn(gpcNow)
      setMode(modeNow)
      if (next && hasValidCookieChoice(next)) {
        syncTogglesFromEffective(modeNow, gpcNow, next)
        setShowBanner(false)
        setShowModal(false)
      } else {
        syncTogglesFromEffective(modeNow, gpcNow, null)
        setShowBanner(true)
      }
    }
    window.addEventListener(COOKIE_PREFS_OPEN_EVENT, onOpen)
    window.addEventListener(COOKIE_PREFS_CHANGED_EVENT, onChanged)
    window.addEventListener(COOKIE_DNS_CONFIRMED_EVENT, onDnsConfirmed)
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener(COOKIE_PREFS_OPEN_EVENT, onOpen)
      window.removeEventListener(COOKIE_PREFS_CHANGED_EVENT, onChanged)
      window.removeEventListener(COOKIE_DNS_CONFIRMED_EVENT, onDnsConfirmed)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  useEffect(() => {
    if (!dnsConfirm) return
    const t = window.setTimeout(() => setDnsConfirm(null), 5000)
    return () => window.clearTimeout(t)
  }, [dnsConfirm])

  useEffect(() => {
    if (!showBanner) {
      clearConsentBannerPad()
      return
    }

    let cancelled = false
    let ro: ResizeObserver | null = null
    let rafId = 0

    const attach = (): boolean => {
      const el = bannerRef.current
      if (!el || cancelled) return false

      const updatePad = () => {
        if (cancelled) return
        applyConsentBannerPad(el.getBoundingClientRect().height)
      }
      updatePad()

      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => {
          updatePad()
        })
        ro.observe(el)
      }
      return true
    }

    if (!attach()) {
      rafId = window.requestAnimationFrame(() => {
        attach()
      })
    }

    return () => {
      cancelled = true
      if (rafId) window.cancelAnimationFrame(rafId)
      ro?.disconnect()
      clearConsentBannerPad()
    }
  }, [showBanner])

  useEffect(() => {
    if (!showModal) return
    const dialog = dialogRef.current
    if (!dialog) return

    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1)

    const previouslyFocused = document.activeElement as HTMLElement | null
    const nodes = focusable()
    ;(nodes[0] ?? dialog).focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setShowModal(false)
        return
      }
      if (event.key !== "Tab") return
      const list = focusable()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      const tryFocus = (el: HTMLElement | null | undefined) => {
        if (el && el.isConnected && typeof el.focus === "function") {
          el.focus({ preventScroll: true })
          return true
        }
        return false
      }
      if (tryFocus(manageButtonRef.current) || tryFocus(previouslyFocused)) return
      const banner = document.querySelector(
        '[data-testid="cookie-consent-banner"]',
      ) as HTMLElement | null
      if (tryFocus(banner)) return
      const settings = document.querySelector(
        '[data-testid="cookie-settings-link"]',
      ) as HTMLElement | null
      tryFocus(settings)
    }
  }, [showModal])

  const savePrefs = (opts: { analytics: boolean; marketing: boolean }) => {
    const marketingValue = gpcOn || hasGlobalPrivacyControl() ? false : opts.marketing
    const prefs = writeCookiePrefs({
      analytics: opts.analytics,
      marketing: marketingValue,
    })
    if (!prefs) {
      // Storage blocked: dismiss for this page load only. Apply the in-memory choice
      // so tracking can run for this load; it will not persist across reloads.
      console.warn("[cookie-consent] failed to save prefs; applying in-memory for this page load")
      const ephemeral: CookiePrefs = {
        version: COOKIE_PREFS_VERSION,
        essential: true,
        analytics: opts.analytics,
        marketing: marketingValue,
        updatedAt: new Date().toISOString(),
      }
      setAnalytics(ephemeral.analytics)
      setMarketing(ephemeral.marketing)
      setShowBanner(false)
      setShowModal(false)
      notifyCookiePrefsChanged(ephemeral)
      return
    }
    setAnalytics(prefs.analytics)
    setMarketing(prefs.marketing)
    setShowBanner(false)
    setShowModal(false)
    notifyCookiePrefsChanged(prefs)
  }

  const openManage = () => {
    const modeNow = readConsentModeFromDocument()
    const gpcNow = hasGlobalPrivacyControl()
    setMode(modeNow)
    setGpcOn(gpcNow)
    syncTogglesFromEffective(modeNow, gpcNow, readCookiePrefs())
    setShowModal(true)
  }

  const onAcceptAll = () => savePrefs({ analytics: true, marketing: true })
  const onEssentialOnly = () => savePrefs({ analytics: false, marketing: false })
  const onSaveModal = () => savePrefs({ analytics, marketing })
  const onDoNotSell = () => {
    optOutOfSaleOrSharing()
  }

  if (!ready) return null
  if (!showBanner && !showModal && !dnsConfirm) return null

  const isStrict = mode === "strict"
  const showDns = showDoNotSellLink(mode)
  const bodyText = isStrict
    ? "We use cookies for essential site functions. Analytics and marketing run only if you allow them."
    : "We use cookies for essential site functions. Analytics and marketing run only if you allow them. You can change your choice anytime."

  return (
    <>
      {dnsConfirm && (
        <div
          role="status"
          data-testid="do-not-sell-confirmation"
          className="fixed inset-x-0 bottom-0 z-[70] flex justify-center px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pointer-events-none"
        >
          <p className="pointer-events-auto max-w-lg rounded-lg border border-sky-500/40 bg-[#0a0f1a] px-4 py-3 text-sm text-sky-100 shadow-lg">
            {dnsConfirm}
          </p>
        </div>
      )}

      {showBanner && (
        <div
          ref={bannerRef}
          role="region"
          aria-label="Cookies and Preferences"
          data-testid="cookie-consent-banner"
          data-consent-mode={mode}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0a0f1a]/95 text-white shadow-[0_-8px_24px_rgba(0,0,0,0.35)] pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 space-y-1 text-sm">
              <p className="font-medium">Cookies &amp; Preferences</p>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{bodyText}</p>
              {showDns && (
                <button
                  type="button"
                  onClick={onDoNotSell}
                  className="text-xs text-sky-400 hover:text-sky-300 underline underline-offset-2 text-left"
                  data-testid="banner-do-not-sell"
                >
                  Do not sell or share my personal information
                </button>
              )}
            </div>
            <div
              className="flex flex-wrap items-center gap-2 shrink-0"
              data-testid="cookie-banner-actions"
            >
              <Button
                ref={manageButtonRef}
                type="button"
                variant="outline"
                size="sm"
                className="border border-white/20 bg-white/5 text-white hover:bg-white/10"
                onClick={openManage}
                data-testid="cookie-manage-button"
              >
                Manage preferences
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 min-w-[7.5rem]"
                onClick={onEssentialOnly}
              >
                Essential only
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-sky-500 text-slate-950 hover:bg-sky-400 border-0 min-w-[7.5rem]"
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
          aria-labelledby={titleId}
          data-testid="cookie-manage-panel"
          ref={dialogRef}
        >
          <div className="w-full max-w-md max-h-[min(90vh,40rem)] overflow-y-auto rounded-xl border border-white/10 bg-[#0a0f1a] text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <h2 id={titleId} className="text-lg font-semibold">
                Manage preferences
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-white/70 hover:bg-white/10 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
            <div className="space-y-4 px-4 py-4 text-sm">
              {gpcOn && (
                <p
                  className="rounded-md border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs text-sky-200"
                  data-testid="gpc-note"
                >
                  Global Privacy Control is on. Marketing stays off.
                </p>
              )}
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1"
                  aria-label="Essential cookies, always on"
                  data-testid="toggle-essential"
                />
                <span>
                  <span className="font-medium">Essential</span>
                  <span className="block text-white/55 text-xs mt-0.5">
                    Required for login, security, and core functionality. Always on.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  aria-label="Analytics cookies"
                  data-testid="toggle-analytics"
                />
                <span>
                  <span className="font-medium">Analytics</span>
                  <span className="block text-white/55 text-xs mt-0.5">
                    Helps us understand usage to improve PlaneWX.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={marketing && !gpcOn}
                  disabled={gpcOn}
                  onChange={(e) => setMarketing(e.target.checked)}
                  aria-label="Marketing cookies"
                  data-testid="toggle-marketing"
                />
                <span>
                  <span className="font-medium">Marketing</span>
                  <span className="block text-white/55 text-xs mt-0.5">
                    Used for advertising measurement and remarketing (Google Ads, Meta, Reddit).
                    {gpcOn ? " Off while Global Privacy Control is on." : ""}
                  </span>
                </span>
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/10 px-4 py-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-white/70 hover:bg-white/10 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={onEssentialOnly}
              >
                Essential only
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10"
                onClick={onAcceptAll}
                data-testid="manage-accept-all"
              >
                Accept all
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-sky-500 text-slate-950 hover:bg-sky-400 border-0"
                onClick={onSaveModal}
                data-testid="manage-save"
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
