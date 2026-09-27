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
  parseCookiePrefs,
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
  CONSENT_DEFAULT_DENIED,
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_IDS,
  GTAG_SCRIPT_DOM_ID,
  META_PIXEL_ID,
  REDDIT_PIXEL_ID,
  planTrackingTransition,
  signalGtagReady,
  type ActiveTrackers,
  type ConsentUpdatePayload,
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

function planToActive(prefs: CookiePrefs | null): {
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

function ensureGtagStub(): void {
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
  }
}

function pushConsentDefault(): void {
  ensureGtagStub()
  window.gtag!("consent", "default", CONSENT_DEFAULT_DENIED)
}

function pushConsentUpdate(payload: ConsentUpdatePayload): void {
  ensureGtagStub()
  window.gtag!("consent", "update", payload)
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
}

async function applyTransition(
  prev: ActiveTrackers,
  next: ActiveTrackers,
  gtagLoaded: boolean,
  debugMode: boolean,
): Promise<{ active: ActiveTrackers; gtagLoaded: boolean }> {
  const transition = planTrackingTransition({
    prev,
    next,
    gtagAlreadyLoaded: gtagLoaded,
    debugMode,
  })

  if (transition.type === "noop") {
    return { active: prev, gtagLoaded }
  }

  if (transition.type === "downgrade_reload") {
    pushConsentUpdate(transition.consent)
    window.location.reload()
    return { active: next, gtagLoaded }
  }

  if (transition.callGtagJs) {
    pushConsentDefault()
  }
  if (transition.ensureGtag) {
    await loadGtagJsOnce(transition.gtagId)
  }
  if (transition.callGtagJs) {
    ensureGtagStub()
    window.gtag!("js", new Date())
    signalGtagReady()
  }
  pushConsentUpdate(transition.consent)
  if (transition.configGa) configGa(transition.debugMode)
  if (transition.configAds) configAds()
  if (transition.loadMetaReddit) loadMetaRedditOnce()

  return { active: transition.active, gtagLoaded: true }
}

export function TrackingScripts() {
  const activeRef = useRef<ActiveTrackers>(emptyActive())
  const gtagLoadedRef = useRef(false)
  const applyingRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    const sync = async (prefs?: CookiePrefs | null) => {
      if (applyingRef.current) return
      applyingRef.current = true
      try {
        const resolved = prefs === undefined ? readCookiePrefs() : prefs
        const { active: next, debugMode } = planToActive(resolved)
        if (cancelled) return
        const result = await applyTransition(
          activeRef.current,
          next,
          gtagLoadedRef.current,
          debugMode,
        )
        if (cancelled) return
        activeRef.current = result.active
        gtagLoadedRef.current = result.gtagLoaded
      } catch (err) {
        console.warn("[tracking-scripts] apply failed", err)
      } finally {
        applyingRef.current = false
      }
    }

    void sync()

    const onPrefs = (event: Event) => {
      const detail = (event as CustomEvent<CookiePrefs>).detail
      void sync(detail ?? readCookiePrefs())
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== COOKIE_PREFS_STORAGE_KEY) return
      const next = parseCookiePrefs(event.newValue)
      void sync(next)
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
