import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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
      "description": "AI-powered aviation weather intelligence for general aviation pilots",
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
        "url": "https://www.planewx.ai/icon.svg",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://twitter.com/planewx"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "contact@planewx.ai"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.planewx.ai/#app",
      "name": "PlaneWX",
      "description": "AI-powered aviation weather intelligence that synthesizes expert meteorological insights into actionable briefings. Know if your flight is a GO, days in advance.",
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
        "14-day advance forecasting",
        "Personalized GO Score",
        "Synoptic Intelligence™ technology",
        "40+ automatic briefing updates",
        "Personal minimums tracking",
        "Aircraft-specific analysis",
        "PAVE risk assessment",
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
            "text": "PlaneWX is an AI-powered aviation weather intelligence platform for general aviation pilots. It synthesizes multiple weather data sources to provide actionable briefings and GO Score probability metrics, helping you know if your flight will happen days in advance."
          }
        },
        {
          "@type": "Question",
          "name": "How far in advance can PlaneWX predict flight weather?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PlaneWX provides reliable weather intelligence from 14 days out to departure time. The accuracy improves as your flight approaches, with 76% accuracy at 24 hours, 70% at 48 hours, and 61% at 72 hours."
          }
        },
        {
          "@type": "Question",
          "name": "What is the GO Score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The GO Score is a personalized 0-100% metric calculated against YOUR personal minimums, not generic VFR/IFR categories. It tells you the probability that weather conditions will meet your specific standards for the flight."
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
    default: "PlaneWX - AI-Powered Aviation Weather Intelligence for General Aviation",
    template: "%s | PlaneWX",
  },
  description: "The confidence to go, or the courage to stay™. PlaneWX provides AI-powered long-range aviation weather forecasting for general aviation pilots. Get weather briefings days in advance with GO Score probability metrics.",
  keywords: [
    "aviation weather",
    "flight planning",
    "general aviation",
    "weather briefing",
    "long range forecast",
    "aviation weather app",
    "pilot weather",
    "GO Score",
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
    "ForeFlight alternative",
    "aviation weather forecast",
    "pilot briefing app",
    "AIRMET SIGMET",
    "turbulence forecast",
    "icing forecast",
    "GA weather app",
  ],
  category: "Weather",
  classification: "Aviation Weather Intelligence",
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
    title: "PlaneWX - AI-Powered Aviation Weather Intelligence for General Aviation",
    description: "The confidence to go, or the courage to stay™. AI-powered long-range weather forecasting for general aviation pilots.",
    // OG image is auto-generated from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaneWX - AI-Powered Aviation Weather Intelligence for General Aviation",
    description: "The confidence to go, or the courage to stay™. Get weather briefings days in advance with GO Score probability metrics.",
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
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PlaneWX" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

