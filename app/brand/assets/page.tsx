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
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
          Logo
        </h2>
        <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 border-dashed">
          <p className="text-lg font-medium text-white/80 mb-2">
            Logo files coming soon
          </p>
          <p className="text-white/70 leading-relaxed">
            Contact{" "}
            <a
              href="mailto:hello@planewx.ai"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              hello@planewx.ai
            </a>{" "}
            for current logo assets.
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
