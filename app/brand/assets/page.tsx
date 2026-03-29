import Image from "next/image"

export const metadata = {
  title: "Assets & Colors | PlaneWX Brand Portal",
  description: "PlaneWX brand assets, color palette, typography, and usage guidelines.",
}

export default function AssetsPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section>
        <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2">
          Brand Assets
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Assets & Colors
        </h1>
        <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
          Color palette, typography, logo usage, and image guidelines for the
          PlaneWX brand.
        </p>
      </section>

      {/* Color Palette */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          Color Palette
        </h2>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div
              className="w-24 h-24 rounded-xl bg-[#3b82f6] shrink-0"
              aria-hidden
            />
            <div>
              <p className="font-semibold text-white">Primary — Sky Blue</p>
              <p className="text-sky-400 font-mono text-sm">#3b82f6 (sky-500)</p>
              <p className="text-white/70 leading-relaxed mt-1">
                Brand color, links, accents
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div
              className="w-24 h-24 rounded-xl bg-[#0B1120] border border-white/10 shrink-0"
              aria-hidden
            />
            <div>
              <p className="font-semibold text-white">Background — Deep Navy</p>
              <p className="text-sky-400 font-mono text-sm">#0B1120</p>
              <p className="text-white/70 leading-relaxed mt-1">
                All dark-theme surfaces
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div
              className="w-24 h-24 rounded-xl bg-white/[0.03] border border-white/10 shrink-0"
              aria-hidden
            />
            <div>
              <p className="font-semibold text-white">Card Surface</p>
              <p className="text-sky-400 font-mono text-sm">white at 3% opacity — bg-white/[0.03]</p>
              <p className="text-white/70 leading-relaxed mt-1">
                Cards, panels, elevated surfaces
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div
              className="w-24 h-24 rounded-xl border-2 border-white/10 shrink-0"
              aria-hidden
            />
            <div>
              <p className="font-semibold text-white">Border</p>
              <p className="text-sky-400 font-mono text-sm">white at 10% opacity — border-white/10</p>
              <p className="text-white/70 leading-relaxed mt-1">
                Dividers, card borders, UI boundaries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Colors */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          Scoring Colors
        </h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Critical — used in the product for WX Score and decision states.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div
              className="w-full h-16 rounded-xl bg-[#22c55e] mb-4"
              aria-hidden
            />
            <p className="font-semibold text-white">GO / Favorable</p>
            <p className="text-sky-400 font-mono text-sm">#22c55e (green-500)</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div
              className="w-full h-16 rounded-xl bg-[#f59e0b] mb-4"
              aria-hidden
            />
            <p className="font-semibold text-white">CAUTION / Marginal</p>
            <p className="text-sky-400 font-mono text-sm">#f59e0b (amber-500)</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div
              className="w-full h-16 rounded-xl bg-[#ef4444] mb-4"
              aria-hidden
            />
            <p className="font-semibold text-white">NO-GO / Unfavorable</p>
            <p className="text-sky-400 font-mono text-sm">#ef4444 (red-500)</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          Typography
        </h2>
        <div className="space-y-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-1">
              Label example
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Font: Inter (Google Fonts). Headings: font-bold, tracking-tight.
              Body: text-white/70, leading-relaxed. Labels: text-xs uppercase
              tracking-[0.2em] text-sky-400.
            </p>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">
            Heading example
          </h3>
          <p className="text-white/70 leading-relaxed">
            Body text uses leading-relaxed for readability. Inter is the primary
            typeface across the brand.
          </p>
        </div>
      </section>

      {/* Logo */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          Logo
        </h2>
        <p className="text-white/60 mb-8 leading-relaxed">
          Always use the official files below. Do not recreate, distort, recolor,
          or alter the logo in any way.
        </p>

        {/* Wordmark — dark background */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Wordmark</h3>

          <div className="rounded-2xl bg-[#0a0f1a] border border-white/10 p-10 flex items-center justify-center">
            <Image
              src="/brand/planewx-og-wordmark.png"
              alt="PlaneWX wordmark — dark background"
              width={400}
              height={80}
              className="max-w-full h-auto"
            />
          </div>

          <div className="rounded-2xl bg-white border border-white/10 p-10 flex items-center justify-center">
            <Image
              src="/brand/planewx-og-wordmark.png"
              alt="PlaneWX wordmark — light background"
              width={400}
              height={80}
              className="max-w-full h-auto"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="/brand/planewx-og-wordmark.png"
              download="planewx-wordmark.png"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium hover:bg-sky-500/20 transition-colors"
            >
              ↓ Download PNG
            </a>
            <a
              href="/brand/planewx-wordmark.svg"
              download="planewx-wordmark.svg"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              ↓ Download SVG
            </a>
          </div>
        </div>

        {/* Icon */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Icon mark</h3>

          <div className="flex gap-4">
            <div className="rounded-2xl bg-[#0a0f1a] border border-white/10 p-8 flex items-center justify-center flex-1">
              <Image
                src="/brand/planewx-icon.svg"
                alt="PlaneWX icon — dark background"
                width={80}
                height={80}
                className="h-16 w-auto"
              />
            </div>
            <div className="rounded-2xl bg-white border border-white/10 p-8 flex items-center justify-center flex-1">
              <Image
                src="/brand/planewx-icon.svg"
                alt="PlaneWX icon — light background"
                width={80}
                height={80}
                className="h-16 w-auto"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="/brand/planewx-icon.svg"
              download="planewx-icon.svg"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              ↓ Download SVG
            </a>
          </div>
        </div>

        {/* Usage rules */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <p className="text-sm font-semibold text-white">Usage rules</p>
          <ul className="space-y-2 text-sm text-white/60">
            <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Use the wordmark on dark navy or white backgrounds only</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Maintain clear space equal to the height of the &ldquo;P&rdquo; on all sides</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Use SVG files for print and large-format digital</li>
            <li className="flex items-start gap-2"><span className="text-rose-400 mt-0.5">✗</span> Do not recolor, stretch, rotate, or add effects</li>
            <li className="flex items-start gap-2"><span className="text-rose-400 mt-0.5">✗</span> Do not place on busy photographic backgrounds</li>
            <li className="flex items-start gap-2"><span className="text-rose-400 mt-0.5">✗</span> Do not use the wordmark at sizes below 120px wide</li>
          </ul>
          <p className="text-xs text-white/30 pt-2">
            Questions?{" "}
            <a href="mailto:hello@planewx.ai" className="text-sky-400 hover:text-sky-300 transition-colors">
              hello@planewx.ai
            </a>
          </p>
        </div>
      </section>

      {/* Image Guidelines */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          Image Guidelines
        </h2>
        <div className="space-y-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <div>
            <p className="font-semibold text-white mb-1">Photography</p>
            <p className="text-white/70 leading-relaxed">
              Aviation-focused, real flying scenarios. Avoid stock photo
              corporate jets.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">Emoji</p>
            <p className="text-white/70 leading-relaxed">
              Never in the product UI or formal marketing. Permitted in email
              subjects for inbox visibility. Selective aviation-related only in
              social posts.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Format */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          Brand Format
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2">
              Full
            </p>
            <p className="text-white font-medium">
              PlaneWX — The Pilot&apos;s Decision Support System
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2">
              With tagline
            </p>
            <p className="text-white font-medium">
              The confidence to go, or the courage to stay™
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2">
              Contact
            </p>
            <a
              href="mailto:hello@planewx.ai"
              className="text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              hello@planewx.ai
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
