import Link from "next/link"
import { Plane, Home, Compass, Mic2, Palette, BookOpen, MessageSquare } from "lucide-react"

const NAV_ITEMS = [
  { href: "/brand", label: "Overview", icon: Home },
  { href: "/brand/why", label: "Why PlaneWX", icon: Compass },
  { href: "/brand/voice", label: "Voice & Tone", icon: Mic2 },
  { href: "/brand/terminology", label: "Terminology", icon: BookOpen },
  { href: "/brand/social", label: "Social Media Playbook", icon: MessageSquare },
  { href: "/brand/assets", label: "Assets & Colors", icon: Palette },
]

export const metadata = {
  title: "Brand Portal | PlaneWX",
  description: "PlaneWX brand guidelines, voice, terminology, and assets for partners and creators.",
  robots: { index: false, follow: false },
}

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1120]/80 border-b border-white/10">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/brand" className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-sky-400" />
            <span className="font-semibold">PlaneWX</span>
            <span className="text-white/40 text-sm hidden sm:inline">Brand Portal</span>
          </Link>
          <Link
            href="https://app.planewx.ai"
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Open App
          </Link>
        </div>
      </nav>

      <div className="container mx-auto max-w-6xl px-4 py-8 flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/10 scrollbar-hide">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap shrink-0"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
          {children}
        </main>
      </div>

      <footer className="border-t border-white/5 py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-sky-400" />
            <span className="font-semibold text-white/50">PlaneWX</span>
            <span>· Brand Portal · Confidential</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:hello@planewx.ai" className="hover:text-white/60 transition-colors">Contact</a>
            <span>&copy; 2026 PlaneWX, LLC</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
