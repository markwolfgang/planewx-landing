"use client"

/**
 * Google Analytics / Google Ads / Meta Pixel / Reddit Pixel.
 * Load only after consent rules allow analytics and/or marketing.
 */

import { useEffect, useState } from "react"
import Script from "next/script"
import {
  COOKIE_PREFS_CHANGED_EVENT,
  readCookiePrefs,
  type CookiePrefs,
} from "@/lib/cookie-prefs"
import {
  allowsAnalytics,
  allowsMarketing,
  hasGlobalPrivacyControl,
  readConsentModeFromDocument,
} from "@/lib/consent-region"

const GA_ID = "G-FKM0TMPH4M"
const ADS_IDS = ["AW-18011683791", "AW-18016407179"] as const
const META_PIXEL_ID = "1236857811920781"
const REDDIT_PIXEL_ID = "a2_iy53y8iesnik"

export function WebTrackingScripts() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [marketingEnabled, setMarketingEnabled] = useState(false)

  useEffect(() => {
    const sync = (prefs?: CookiePrefs | null) => {
      const mode = readConsentModeFromDocument()
      const gpc = hasGlobalPrivacyControl()
      const resolved = prefs ?? readCookiePrefs()
      setAnalyticsEnabled(allowsAnalytics({ mode, prefs: resolved }))
      setMarketingEnabled(allowsMarketing({ mode, prefs: resolved, gpc }))
    }

    sync()

    const onPrefs = (event: Event) => {
      sync((event as CustomEvent<CookiePrefs>).detail ?? null)
    }
    window.addEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
    return () => window.removeEventListener(COOKIE_PREFS_CHANGED_EVENT, onPrefs)
  }, [])

  if (!analyticsEnabled && !marketingEnabled) return null

  const gtagId = analyticsEnabled ? GA_ID : ADS_IDS[0]

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        strategy="afterInteractive"
      />
      {analyticsEnabled && (
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      )}
      {marketingEnabled && (
        <>
          <Script id="google-ads" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ADS_IDS[0]}');
            gtag('config', '${ADS_IDS[1]}');
          `}
          </Script>
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
