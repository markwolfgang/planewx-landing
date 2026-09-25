import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { OshBanner } from "@/components/osh-banner"
import { PartnerGreetingBanner } from "@/components/partner-greeting-banner"
import { CookieConsent } from "@/components/cookie-consent"
import { WebTrackingScripts } from "@/components/web-tracking-scripts"
import { WebVercelMetrics } from "@/components/web-vercel-metrics"
import { FAQS, faqAnswerToPlainText } from "@/components/shared/landing-data"
import "./globals.css"

// aopa native preview redeploy trigger (static /aopa closer CTA text)

const inter = Inter({ subsets: ["latin"] })

const faqPageMainEntity = FAQS.map((faq) => ({
  "@type": "Question",
  name: faq.q,
  acceptedAnswer: {
    "@type": "Answer",
    text: faqAnswerToPlainText(faq.a),
  },
}))

// Structured Data (JSON-LD) for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.planewx.ai/#website",
      "url": "https://www.planewx.ai",
      "name": "PlaneWX",
      "description": "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. The risk-management loop for pilots without a dispatcher. Beyond the weather briefing.",
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
      "description": "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. The risk-management loop for pilots without a dispatcher. Beyond the weather briefing.",
      "applicationCategory": "WeatherApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "AI-powered weather briefings",
        "Multi-model icing and turbulence analysis (HRRR, GFS, ECMWF)",
        "14-day advance forecasting",
        "Personalized WX Score",
        "Synoptic Intelligence™ technology",
        "40+ automatic briefing updates for monitored flights",
        "Personal minimums tracking",
        "Aircraft-specific analysis",
        "PAVE risk assessment",
        "Peer mentoring system",
        "Trip Crew sharing"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqPageMainEntity
    }
  ]
}

export const metadata: Metadata = {
  title: {
    default: "PlaneWX | Fly like it's your job.",
    template: "%s | PlaneWX",
  },
  description:
    "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. The risk-management loop for pilots without a dispatcher. Beyond the weather briefing.",
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
    title: "PlaneWX | Fly like it's your job.",
    description:
      "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. The risk-management loop for pilots without a dispatcher. Beyond the weather briefing.",
    // OG image is auto-generated from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaneWX | Fly like it's your job.",
    description:
      "PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer. The risk-management loop for pilots without a dispatcher. Beyond the weather briefing.",
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
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        
        {/* LLMs.txt for AI discovery */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        </head>
      <body className={inter.className}>
        <OshBanner />
        <PartnerGreetingBanner />
        {children}
        <CookieConsent />
        <WebTrackingScripts />
        <WebVercelMetrics />
      </body>
    </html>
  )
}

