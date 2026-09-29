"use client"

/**
 * GA4, Google Ads, Meta Pixel, and Reddit Pixel.
 * Loads gtag.js at most once. On preference changes, updates Consent Mode and
 * configs newly granted tags. On any downgrade, updates consent to denied and
 * reloads (next/script cannot unload pixels).
 */

import { useEffect, useRef } from "react"
import {
  COOKIE_PREFS_CHANGED_EVENT,
  COOKIE_PREFS_STORAGE_KEY,
  getSessionStorage,
  hasValidCookieChoice,
  readCookiePrefs,
  type CookiePrefs,
} from "@/lib/cookie-prefs"
import {
  allowsAnalytics,
  allowsMarketing,
  hasGlobalPrivacyControl,
  readConsentModeFromDocument,
} from "@/lib/consent-region"
import { resolveGaDebugOptIn, resolveTrackingLoad } from "@/lib/tracking-host"
import {
  applyAdsDataRedaction,
  CONSENT_DEFAULT_DENIED,
  ensureGtagStub,
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_IDS,
  GTAG_SCRIPT_DOM_ID,
  META_PIXEL_ID,
  REDDIT_PIXEL_ID,
  planTrackingTransition,
  signalGtagReady,
  signalMetaReady,
  type ActiveTrackers,
  type ConsentUpdatePayload,
  type TrackingTransition,
} from "@/lib/tracking-runtime"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
    rdt?: (...args: unknown[]) => void
  }
}

function emptyActive(): ActiveTrackers {
  return { ga: false, marketing: false }
}

export function planToActive(prefs: CookiePrefs | null): {
  active: ActiveTrackers
  debugMode: boolean
} {
  if (typeof window === "undefined") {
    return { active: emptyActive(), debugMode: false }
  }
  const mode = readConsentModeFromDocument()
  const gpc = hasGlobalPrivacyControl()
  const session = getSessionStorage()
  const gaDebug = resolveGaDebugOptIn(window.location.search, session)
  const plan = resolveTrackingLoad({
    hostname: window.location.hostname,
    gaDebug,
    analytics: allowsAnalytics({ mode, prefs }),
    marketing: allowsMarketing({ mode, prefs, gpc }),
    hasChoice: hasValidCookieChoice(prefs),
  })
  return {
    active: { ga: plan.loadGa, marketing: plan.loadMarketing },
    debugMode: plan.debugMode,
  }
}

function pushConsentDefault(): void {
  ensureGtagStub()
  window.gtag!("consent", "default", CONSENT_DEFAULT_DENIED)
  applyAdsDataRedaction("denied")
}

function pushConsentUpdate(payload: ConsentUpdatePayload): void {
  ensureGtagStub()
  window.gtag!("consent", "update", payload)
  applyAdsDataRedaction(payload.ad_storage)
}

function loadGtagJsOnce(gtagId: string): Promise<void> {
  ensureGtagStub()
  if (document.getElementById(GTAG_SCRIPT_DOM_ID)) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement("script")
    s.id = GTAG_SCRIPT_DOM_ID
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("gtag.js failed to load"))
    document.head.appendChild(s)
  })
}

function configGa(debugMode: boolean): void {
  ensureGtagStub()
  if (debugMode) {
    window.gtag!("config", GA_MEASUREMENT_ID, { debug_mode: true })
  } else {
    window.gtag!("config", GA_MEASUREMENT_ID)
  }
}

function configAds(): void {
  ensureGtagStub()
  window.gtag!("config", GOOGLE_ADS_IDS[0])
  window.gtag!("config", GOOGLE_ADS_IDS[1])
}

function loadMetaRedditOnce(): void {
  if (!document.getElementById("planewx-meta-pixel")) {
    const meta = document.createElement("script")
    meta.id = "planewx-meta-pixel"
    meta.async = true
    meta.text = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${META_PIXEL_ID}');
      fbq('track', 'PageView');
    `
    document.head.appendChild(meta)
  } else if (typeof window.fbq === "function") {
    window.fbq("init", META_PIXEL_ID)
    window.fbq("track", "PageView")
  }

  if (!document.getElementById("planewx-reddit-pixel")) {
    const reddit = document.createElement("script")
    reddit.id = "planewx-reddit-pixel"
    reddit.async = true
    reddit.text = `
      !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?
      p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};
      p.callQueue=[];var t=d.createElement("script");
      t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=${REDDIT_PIXEL_ID}";
      t.async=!0;var s=d.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(t,s)}}(window,document);
      rdt('init','${REDDIT_PIXEL_ID}');
      rdt('track', 'PageVisit');
    `
    document.head.appendChild(reddit)
  } else if (typeof window.rdt === "function") {
    window.rdt("init", REDDIT_PIXEL_ID)
    window.rdt("track", "PageVisit")
  }

  signalMetaReady()
}

function gtagScriptPresent(): boolean {
  return typeof document !== "undefined" && !!document.getElementById(GTAG_SCRIPT_DOM_ID)
}

/**
 * Apply a planned transition. After awaiting gtag.js, re-reads the latest stored
 * choice so a mid-load Essential only / Do not sell is not overwritten by a stale
 * Accept all plan. If gtag.js is blocked, Meta and Reddit can still load.
 */
export async function applyTrackingTransition(
  prev: ActiveTrackers,
  next: ActiveTrackers,
  gtagLoaded: boolean,
  debugMode: boolean,
  deps: {
    loadGtagJs?: (gtagId: string) => Promise<void>
    readLatest?: () => { active: ActiveTrackers; debugMode: boolean }
  } = {},
): Promise<{ active: ActiveTrackers; gtagLoaded: boolean }> {
  const loadGtagJs = deps.loadGtagJs ?? loadGtagJsOnce
  const readLatest = deps.readLatest ?? (() => planToActive(readCookiePrefs()))

  const initial: TrackingTransition = planTrackingTransition({
    prev,
    next,
    gtagAlreadyLoaded: gtagLoaded,
    debugMode,
  })

  if (initial.type === "noop") {
    return { active: prev, gtagLoaded }
  }

  if (initial.type === "downgrade_reload") {
    pushConsentUpdate(initial.consent)
    window.location.reload()
    return { active: next, gtagLoaded }
  }

  const needsJsBootstrap = initial.callGtagJs
  let gtagAvailable = gtagLoaded

  if (needsJsBootstrap) {
    pushConsentDefault()
  }

  if (initial.ensureGtag) {
    try {
      await loadGtagJs(initial.gtagId)
      gtagAvailable = true
    } catch {
      // Ad blockers can reject gtag.js; Meta/Reddit may still load below.
      gtagAvailable = gtagScriptPresent() || gtagLoaded
    }
  }

  // NS2: choice may have changed while gtag.js was loading.
  const latest = readLatest()
  let transition: TrackingTransition = planTrackingTransition({
    prev,
    next: latest.active,
    gtagAlreadyLoaded: gtagAvailable,
    debugMode: latest.debugMode,
  })

  if (transition.type === "apply" && needsJsBootstrap) {
    transition = { ...transition, callGtagJs: true }
  }

  if (transition.type === "noop") {
    // Mid-load deny: the script tag may be in the DOM but gtag('js') never ran.
    // Keep gtagLoaded false so a later Accept all in this tab still runs js + config.
    return {
      active: prev,
      gtagLoaded: needsJsBootstrap ? false : gtagAvailable,
    }
  }

  if (transition.type === "downgrade_reload") {
    if (gtagAvailable) {
      pushConsentUpdate(transition.consent)
    }
    window.location.reload()
    return { active: latest.active, gtagLoaded: gtagAvailable }
  }

  let jsBootstrapped = false
  if (gtagAvailable) {
    if (transition.callGtagJs) {
      ensureGtagStub()
      window.gtag!("js", new Date())
      jsBootstrapped = true
    }
    pushConsentUpdate(transition.consent)
    if (transition.configGa) configGa(transition.debugMode)
    if (transition.configAds) configAds()
    // S1: fire ready after consent update and config so landing_variant_view is not lost.
    if (transition.callGtagJs || transition.configGa || transition.configAds) {
      signalGtagReady()
    }
  }

  if (transition.loadMetaReddit) {
    loadMetaRedditOnce()
  }

  return {
    active: transition.active,
    // Only mark bootstrapped when gtag('js') ran, or when an earlier load already had it.
    gtagLoaded: gtagAvailable && (jsBootstrapped || !transition.callGtagJs),
  }
}

export function TrackingScripts() {
  const activeRef = useRef<ActiveTrackers>(emptyActive())
  const gtagLoadedRef = useRef(false)
  const applyingRef = useRef(false)
  const pendingRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    const sync = async () => {
      if (applyingRef.current) {
        pendingRef.current = true
        return
      }
      applyingRef.current = true
      try {
        do {
          pendingRef.current = false
          const { active: next, debugMode } = planToActive(readCookiePrefs())
          if (cancelled) return
          const result = await applyTrackingTransition(
            activeRef.current,
            next,
            gtagLoadedRef.current,
            debugMode,
          )
          if (cancelled) return
          activeRef.current = result.active
          gtagLoadedRef.current = result.gtagLoaded
        } while (pendingRef.current && !cancelled)
      } catch (err) {
        console.warn("[tracking-scripts] apply failed", err)
      } finally {
        applyingRef.current = false
        if (pendingRef.current && !cancelled) {
          pendingRef.current = false
          void sync()
        }
      }
    }

    void sync()

    const onPrefs = () => {
      void sync()
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== COOKIE_PREFS_STORAGE_KEY) return
      void sync()
    }

    window.addEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
    window.addEventListener("storage", onStorage)
    return () => {
      cancelled = true
      window.removeEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  return null
}
