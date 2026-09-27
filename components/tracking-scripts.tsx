"use client"

/**
 * GA4, Google Ads, Meta Pixel, and Reddit Pixel.
 * Loads only on the production hostname allowlist (or ?ga_debug=1 for GA only),
 * and only after opt-in cookie prefs (and GPC blocks marketing).
 * Consent Mode v2 defaults all denied before any Google config.
 * gtag('js') runs once even when both analytics and marketing are on.
 */

import { useEffect, useState } from "react"
import Script from "next/script"
import {
  COOKIE_PREFS_CHANGED_EVENT,
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
import {
  resolveGaDebugOptIn,
  resolveTrackingLoad,
  type TrackingLoadPlan,
} from "@/lib/tracking-host"

const GA_ID = "G-FKM0TMPH4M"
const ADS_IDS = ["AW-18011683791", "AW-18016407179"] as const
const META_PIXEL_ID = "1236857811920781"
const REDDIT_PIXEL_ID = "a2_iy53y8iesnik"

const DENIED = "denied"
const GRANTED = "granted"

function emptyPlan(): TrackingLoadPlan {
  return {
    loadGa: false,
    loadMarketing: false,
    debugMode: false,
    hostAllowed: false,
    gaDebug: false,
  }
}

function planFromPrefs(prefs: CookiePrefs | null): TrackingLoadPlan {
  if (typeof window === "undefined") return emptyPlan()
  const mode = readConsentModeFromDocument()
  const gpc = hasGlobalPrivacyControl()
  const gaDebug = resolveGaDebugOptIn(window.location.search, window.sessionStorage)
  return resolveTrackingLoad({
    hostname: window.location.hostname,
    gaDebug,
    analytics: allowsAnalytics({ mode, prefs }),
    marketing: allowsMarketing({ mode, prefs, gpc }),
    hasChoice: hasValidCookieChoice(prefs),
  })
}

/**
 * Google Consent Mode v2 defaults (all denied) plus an update from prefs.
 * Must run before any Google tag config. gtag('js') once only.
 */
function consentBootstrapScript(
  prefs: CookiePrefs,
  debugMode: boolean,
  loadGa: boolean,
  loadMarketing: boolean,
): string {
  const analyticsStorage = prefs.analytics ? GRANTED : DENIED
  const adState = prefs.marketing ? GRANTED : DENIED
  const lines: string[] = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    `gtag('consent', 'default', {`,
    `  ad_storage: '${DENIED}',`,
    `  ad_user_data: '${DENIED}',`,
    `  ad_personalization: '${DENIED}',`,
    `  analytics_storage: '${DENIED}',`,
    `  wait_for_update: 500`,
    `});`,
    `gtag('consent', 'update', {`,
    `  analytics_storage: '${analyticsStorage}',`,
    `  ad_storage: '${adState}',`,
    `  ad_user_data: '${adState}',`,
    `  ad_personalization: '${adState}'`,
    `});`,
    `gtag('js', new Date());`,
  ]
  if (loadGa) {
    lines.push(
      debugMode
        ? `gtag('config', '${GA_ID}', { debug_mode: true });`
        : `gtag('config', '${GA_ID}');`,
    )
  }
  if (loadMarketing) {
    lines.push(`gtag('config', '${ADS_IDS[0]}');`)
    lines.push(`gtag('config', '${ADS_IDS[1]}');`)
  }
  return lines.join("\n")
}

export function TrackingScripts() {
  const [plan, setPlan] = useState<TrackingLoadPlan>(emptyPlan)
  const [prefs, setPrefs] = useState<CookiePrefs | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const sync = (next?: CookiePrefs | null) => {
      const resolved = next === undefined ? readCookiePrefs() : next
      setPrefs(resolved)
      setPlan(planFromPrefs(resolved))
    }

    sync()
    setMounted(true)

    const onPrefs = (event: Event) => {
      const detail = (event as CustomEvent<CookiePrefs>).detail
      sync(detail ?? readCookiePrefs())
    }
    window.addEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
    return () => window.removeEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
  }, [])

  if (!mounted || !prefs) return null
  if (!plan.loadGa && !plan.loadMarketing) return null

  const gtagId = plan.loadGa ? GA_ID : ADS_IDS[0]

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-consent-and-config" strategy="afterInteractive">
        {consentBootstrapScript(prefs, plan.debugMode, plan.loadGa, plan.loadMarketing)}
      </Script>

      {plan.loadMarketing && (
        <>
          <Script id="meta-pixel" strategy="lazyOnload">
            {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
          <Script id="reddit-pixel" strategy="lazyOnload">
            {`
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?
            p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};
            p.callQueue=[];var t=d.createElement("script");
            t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=${REDDIT_PIXEL_ID}";
            t.async=!0;var s=d.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(t,s)}}(window,document);
            rdt('init','${REDDIT_PIXEL_ID}');
            rdt('track', 'PageVisit');
          `}
          </Script>
        </>
      )}
    </>
  )
}
