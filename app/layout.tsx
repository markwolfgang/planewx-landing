import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
  ],
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
    title: "PlaneWX - AI-Powered Aviation Weather Intelligence",
    description: "The confidence to go, or the courage to stay™. AI-powered long-range weather forecasting for general aviation pilots.",
    images: [
      {
        url: "/screenshots/planeWX-dashboard.png",
        width: 1200,
        height: 800,
        alt: "PlaneWX Dashboard showing trip overview and GO Scores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaneWX - AI-Powered Aviation Weather Intelligence",
    description: "The confidence to go, or the courage to stay™. Get weather briefings days in advance with GO Score probability metrics.",
    images: ["/screenshots/planeWX-dashboard.png"],
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}

