import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { OshBanner } from "@/components/osh-banner"
import { PartnerGreetingBanner } from "@/components/partner-greeting-banner"
import "./globals.css"

// aopa native preview redeploy trigger (static /aopa closer CTA text)

const inter = Inter({ subsets: ["latin"] })

// Structured Data (JSON-LD) for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.planewx.ai/#website",
      "url": "https://www.planewx.ai",
      "name": "PlaneWX",
      "description": "PlaneWX is the decision support system for general aviation. Weather Briefing (WX Score), FRAT, Fly or Stay, and Self Debrief, with Mentor alongside. Fly like it's your job.",
      "publisher": {
        "@id": "https://www.planewx.ai/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.planewx.ai/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.planewx.ai/#organization",
      "name": "PlaneWX, LLC",
      "url": "https://www.planewx.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.planewx.ai/icon-512.png",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://twitter.com/planewx"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "hello@planewx.ai"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.planewx.ai/#app",
      "name": "PlaneWX",
      "description": "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. The risk-management loop for pilots who don't have a dispatcher.",
      "applicationCategory": "WeatherApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/ComingSoon"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "42",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "AI-powered weather briefings",
        "Multi-model icing and turbulence analysis (HRRR, GFS, ECMWF)",
        "14-day advance forecasting",
        "Personalized WX Score",
        "Synoptic Intelligence™ technology",
        "40+ automatic briefing updates",
        "Personal minimums tracking",
        "Aircraft-specific analysis",
        "PAVE risk assessment",
        "Peer mentoring system",
        "Trip Crew sharing"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is PlaneWX?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. The loop is Weather Briefing (WX Score), FRAT, Fly or Stay, and Self Debrief, with Mentor optional alongside. You make the call. PlaneWX informs."
          }
        },
        {
          "@type": "Question",
          "name": "How far in advance can PlaneWX predict flight weather?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PlaneWX provides weather intelligence from 14 days out through departure. Confidence improves as your flight approaches. We are transparent about uncertainty at every time horizon."
          }
        },
        {
          "@type": "Question",
          "name": "What is the WX Score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The WX Score is a personalized 0-100% metric calculated against YOUR personal minimums, not generic VFR/IFR categories. It tells you the probability that weather conditions will meet your specific standards for the flight."
          }
        },
        {
          "@type": "Question",
          "name": "What is Synoptic Intelligence™?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Synoptic Intelligence™ is PlaneWX's proprietary AI technology that synthesizes NWS forecaster narratives, METARs, TAFs, NBM data, and other weather products into regional summaries and actionable insights."
          }
        }
      ]
    }
  ]
}

export const metadata: Metadata = {
  title: {
    default: "PlaneWX | The Pilot's Decision Support System",
    template: "%s | PlaneWX",
  },
  description:
    "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. Fly like it's your job.",
  keywords: [
    "aviation weather",
    "flight planning",
    "general aviation",
    "weather briefing",
    "long range forecast",
    "aviation weather app",
    "pilot weather",
    "WX Score",
    "PAVE risk assessment",
    "cross country flight planning",
    "IFR weather",
    "VFR weather",
    "METAR",
    "TAF",
    "PIREP",
    "aviation weather intelligence",
    "flight weather app",
    "pilot app",
    "Synoptic Intelligence",
    "AI weather forecasting",
    "aviation AI",
    "pilot decision making",
    "weather risk assessment",
    "flight cancellation prediction",
    "personal minimums",
    "aircraft weather",
    "Cirrus weather",
    "Cessna weather",
    "Piper weather",
    "Bonanza weather",
    "Diamond DA40 weather",
    "SR22 weather planning",
    "aviation weather forecast",
    "pilot briefing app",
    "AIRMET SIGMET",
    "turbulence forecast",
    "icing forecast",
    "GA weather app",
    "pilot decision support",
    "FRAT",
    "flight risk assessment",
    "mentor network",
  ],
  category: "Weather",
  classification: "Pilot Decision Support System",
  authors: [{ name: "Mark Wolfgang", url: "https://www.planewx.ai" }],
  creator: "PlaneWX, LLC",
  publisher: "PlaneWX, LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.planewx.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.planewx.ai",
    siteName: "PlaneWX",
    title: "PlaneWX | The Pilot's Decision Support System",
    description:
      "PlaneWX is the decision support system for general aviation. Weather Briefing, FRAT, Fly or Stay, Self Debrief. Fly like it's your job.",
    // OG image is auto-generated from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaneWX | The Pilot's Decision Support System",
    description:
      "PlaneWX is the decision support system for general aviation. Weather Briefing, FRAT, Fly or Stay, Self Debrief. Fly like it's your job.",
    // Twitter image is auto-generated from app/twitter-image.tsx
    creator: "@planewx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0a0f1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PlaneWX" />
        
        {/* Preconnect/prefetch for third-party domains actually contacted at runtime.
            Note: fonts.googleapis.com is NOT needed — next/font self-hosts Inter at build time. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.redditstatic.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        
        {/* LLMs.txt for AI discovery */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FKM0TMPH4M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FKM0TMPH4M');
            gtag('config', 'AW-18011683791');
            gtag('config', 'AW-18016407179');
          `}
        </Script>

        {/* Meta Pixel — lazyOnload fires after page is fully loaded and idle */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1236857811920781');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:"none"}} src="https://www.facebook.com/tr?id=1236857811920781&ev=PageView&noscript=1" alt="" />
        </noscript>

        {/* Reddit Pixel — lazyOnload fires after page is fully loaded and idle */}
        <Script id="reddit-pixel" strategy="lazyOnload">
          {`
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?
            p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};
            p.callQueue=[];var t=d.createElement("script");
            t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_iy53y8iesnik";
            t.async=!0;var s=d.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(t,s)}}(window,document);
            rdt('init','a2_iy53y8iesnik');
            rdt('track', 'PageVisit');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <OshBanner />
        <PartnerGreetingBanner />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

