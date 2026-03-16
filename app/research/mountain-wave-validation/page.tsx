import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft, Wind, Shield, AlertTriangle, CheckCircle,
  Layers, Zap, BarChart3, Mountain, BookOpen,
  MessageSquare, FlaskConical, ArrowRight, ExternalLink,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Adversarial AI Validation of Mountain Wave Detection | PlaneWX Research",
  description:
    "How PlaneWX used a structured multi-AI debate to validate and improve mountain wave and rotor turbulence detection for general aviation pilots — producing six algorithmic improvements backed by published meteorological literature.",
  openGraph: {
    title: "Adversarial AI Validation of Mountain Wave Detection",
    description:
      "A structured debate between four frontier AI models produced six concrete improvements to mountain wave detection — including a Scorer parameter gate, relief-scaled thresholds, and a perpendicular projection bug fix.",
    type: "article",
  },
}

export default function MountainWaveValidation() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1120]/80 border-b border-white/10">
        <div className="container mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to PlaneWX
          </Link>
          <Link
            href="https://app.planewx.ai"
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl px-4 py-16 space-y-20">
        {/* Hero */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-sm text-white/40">
            <FlaskConical className="h-4 w-4" />
            <span>PlaneWX Research</span>
            <span className="text-white/20">|</span>
            <span>March 2026</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            We Put Our Mountain Wave Detection<br />
            <span className="text-sky-400">On Trial.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
            Mountain wave and rotor turbulence are among the most dangerous phenomena for
            general aviation. We needed to know if our detection system was good enough to stake
            a pilot&rsquo;s safety on. So we didn&rsquo;t ask one AI to review it &mdash; we put
            four frontier AI models in a room and let them argue about it for 20 rounds.
          </p>
          <p className="text-white/40 text-sm">
            By Mark Wolfgang, Founder &amp; CEO, PlaneWX
          </p>
        </section>

        {/* The Problem */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-400" />
            The Problem
          </h2>
          <p className="text-white/70 leading-relaxed">
            PlaneWX analyzes wind flow relative to terrain ridges along a pilot&rsquo;s filed route.
            We decompose model sounding winds into perpendicular-to-ridge components, compute Froude
            numbers, estimate Brunt-V&auml;is&auml;l&auml; frequency, and classify mountain wave and rotor
            severity &mdash; all in real time, for every briefing.
          </p>
          <p className="text-white/70 leading-relaxed">
            But mountain meteorology is hard. The literature spans decades of research by Durran, Vosper,
            Reinecke, Sharman, and others. The algorithms involve physical constants, threshold values,
            and edge cases that interact in non-obvious ways. Getting it wrong means either false alarms
            that erode pilot trust, or &mdash; far worse &mdash; missing a real hazard.
          </p>
          <p className="text-white/70 leading-relaxed">
            I needed a rigorous methodology review that would challenge every assumption, check every
            threshold against published science, and probe every edge case. Hiring a panel of mountain
            meteorology consultants would cost thousands of dollars and take weeks. I needed answers today.
          </p>
        </section>

        {/* The Approach */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-sky-400" />
            The Approach: Adversarial AI Debate
          </h2>
          <p className="text-white/70 leading-relaxed">
            I used{" "}
            <a href="https://www.asknestr.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 underline-offset-2">
              Nestr
            </a>
            , a platform that structures debates between multiple AI models. Instead of asking one
            AI &ldquo;is this right?&rdquo; (and getting a polite, agreeable answer), I configured a
            four-model adversarial debate: one proposer defending the methodology, three challengers
            probing for weaknesses, and a synthesizer delivering the final verdict.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-blue-400 font-mono uppercase tracking-wider mb-1">Proposer</p>
              <p className="font-semibold text-white">o3</p>
              <p className="text-xs text-white/40 mt-1">Defended the methodology against FAA standards</p>
            </div>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-xs text-red-400 font-mono uppercase tracking-wider mb-1">Challenger</p>
              <p className="font-semibold text-white">Grok 4.1 Fast</p>
              <p className="text-xs text-white/40 mt-1">Probed edge cases and under-represented terrain</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">Challenger</p>
              <p className="font-semibold text-white">Claude Sonnet 4.6</p>
              <p className="text-xs text-white/40 mt-1">Demanded evidence for every claim</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-xs text-purple-400 font-mono uppercase tracking-wider mb-1">Challenger</p>
              <p className="font-semibold text-white">Grok 3</p>
              <p className="text-xs text-white/40 mt-1">Pressure-tested real-world applicability</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-sky-400">4</p>
                <p className="text-xs text-white/40">AI models</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400">20</p>
                <p className="text-xs text-white/40">rounds of debate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400">1.3M</p>
                <p className="text-xs text-white/40">tokens analyzed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400">20 min</p>
                <p className="text-xs text-white/40">start to finish</p>
              </div>
            </div>
          </div>
        </section>

        {/* What They Found */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Zap className="h-6 w-6 text-amber-400" />
            What They Found
          </h2>
          <p className="text-white/70 leading-relaxed">
            The debate started as a validation exercise and evolved into a deep collaborative research
            session. By round 5, the models weren&rsquo;t just finding problems &mdash; they were proposing
            solutions, debating implementation details, and holding each other accountable for unsupported
            claims. Six concrete improvements emerged.
          </p>

          <div className="space-y-4">
            {/* Improvement 1 */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-sky-500/10 to-sky-500/5 border border-sky-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-sky-500/20 rounded-lg p-2 shrink-0">
                  <span className="text-sm font-bold text-sky-400">01</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Scorer Parameter Gate</h3>
                  <p className="text-sm text-white/60">
                    Not all blocked-flow conditions produce rotors. Rotor turbulence requires
                    <em> trapped</em> lee waves, which only form when the atmospheric profile supports
                    wave trapping. The debate identified that our system was missing the Scorer parameter
                    (l&sup2;) &mdash; a critical diagnostic for whether waves trap near the surface or
                    propagate harmlessly upward. We now compute l&sup2; from model soundings between
                    ridge crest and ~4 km above crest. When waves aren&rsquo;t trapped (l&sup2; &lt; 0.25),
                    rotor alerts are suppressed &mdash; preventing false alarms in common winter jet-stream scenarios.
                  </p>
                  <p className="text-xs text-white/30 mt-2">
                    References: Scorer (1949), Durran (1990), Reinecke &amp; Durran (2008)
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement 2 */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 rounded-lg p-2 shrink-0">
                  <span className="text-sm font-bold text-amber-400">02</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Relief-Scaled Wind Thresholds</h3>
                  <p className="text-sm text-white/60">
                    Our original thresholds (25/30/40 kt for light/moderate/severe) were calibrated for
                    major barriers like the Rockies and Sierra Nevada. Grok 4.1 immediately challenged:
                    <em> &ldquo;How do they hold for lower-relief terrain like the Appalachians, where PIREPs
                    often show waves at &lt;25 kt perpendicular flow?&rdquo;</em> The answer: they don&rsquo;t.
                    We now scale thresholds dynamically based on terrain relief &mdash; lower-relief terrain
                    gets lower thresholds, preventing under-detection in the Appalachians, Ozarks, and coastal ranges.
                  </p>
                  <p className="text-xs text-white/30 mt-2">
                    Formula: base = 18 + (relief_ft / 1,000) &times; 4 kt, clamped to [15, 40]
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement 3 */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500/20 rounded-lg p-2 shrink-0">
                  <span className="text-sm font-bold text-emerald-400">03</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Complex Terrain Modifier</h3>
                  <p className="text-sm text-white/60">
                    Simple 2D Froude analysis can over-predict rotor severity in complex 3D terrain
                    where multiple ridge orientations exist &mdash; sinuous valleys, overlapping ridges,
                    convergent flows. Grok 3 pushed on Colorado Front Range scenarios where real
                    conditions are less severe than 2D theory predicts. We now compute the circular
                    variance of ridge orientations and inflate the Froude number by 25% when terrain
                    is complex, except in deeply blocked flows (Fr &lt; 0.35) where confined valleys
                    can amplify hazards.
                  </p>
                  <p className="text-xs text-white/30 mt-2">
                    References: Vosper (2004), Smith (1989)
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement 4 */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-violet-500/10 to-violet-500/5 border border-violet-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-violet-500/20 rounded-lg p-2 shrink-0">
                  <span className="text-sm font-bold text-violet-400">04</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Sub-2,000 ft Terrain Promotion</h3>
                  <p className="text-sm text-white/60">
                    Lower-relief terrain was being systematically under-detected. When the Froude number
                    indicates blocked flow (Fr &lt; 0.60) and cross-ridge winds are 25+ kt, severity
                    is now promoted by one level &mdash; even over modest 1,500 ft ridges. A pilot
                    crossing the Blue Ridge or Ozarks in strong flow deserves the same quality of
                    hazard detection as someone crossing the Continental Divide.
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement 5 */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-rose-500/10 to-rose-500/5 border border-rose-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-rose-500/20 rounded-lg p-2 shrink-0">
                  <span className="text-sm font-bold text-rose-400">05</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Low-Confidence Ridge Fallback</h3>
                  <p className="text-sm text-white/60">
                    When terrain gradient is weak or ridge orientation can&rsquo;t be determined with
                    confidence, our v1 system used 100% of wind speed as a worst-case perpendicular
                    estimate. This over-alerted constantly. The debate established that the RMS value
                    of |sin(&theta;)| over all possible ridge orientations is ~0.707, so we now use
                    70% of total wind speed as a statistically grounded fallback &mdash; honest about
                    uncertainty without crying wolf.
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement 6 */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-red-500/20 rounded-lg p-2 shrink-0">
                  <span className="text-sm font-bold text-red-400">06</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Perpendicular Projection Bug Fix</h3>
                  <p className="text-sm text-white/60">
                    The unit tests written to verify the Scorer parameter uncovered a real bug: the
                    perpendicular wind projection formula was computing the <em>along-ridge</em> component
                    instead of the <em>cross-ridge</em> component (sin/cos vs. cos/sin). For a N-S ridge
                    with westerly flow, the formula returned zero instead of full wind speed. This
                    wasn&rsquo;t caught in manual testing because typical wind/ridge combinations still
                    produced reasonable-looking numbers. Only the physics-aware test fixture &mdash;
                    designed to verify that westerly wind is fully perpendicular to a N-S ridge &mdash;
                    exposed it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Debate Beats Solo Review */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Layers className="h-6 w-6 text-sky-400" />
            Why Debate Beats Solo Review
          </h2>
          <p className="text-white/70 leading-relaxed">
            Ask a single AI to &ldquo;validate my mountain wave detection methodology&rdquo; and
            you&rsquo;ll get a helpful but agreeable review. It might flag a few issues, but it won&rsquo;t
            spend 20 rounds holding your feet to the fire.
          </p>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <p className="text-white/70 leading-relaxed">
              The power of the adversarial format is that <strong className="text-white">the models challenge
              each other</strong>, not just the input. When o3 cited the perpendicular wind thresholds
              from AC 00-57, Grok 4.1 immediately asked about Appalachian under-detection. When o3
              proposed the Scorer parameter, Claude Sonnet challenged the ceiling limit and pushed it
              from crest+2km to crest+4km. When improvements were proposed, Claude Sonnet demanded
              end-to-end integrated validation before any could be released.
            </p>
            <p className="text-white/70 leading-relaxed">
              By round 19, all three challengers independently converged on the same conclusion: the
              methodology was sound in principle, but couldn&rsquo;t be released without an integrated
              end-to-end validation run. That consensus &mdash; from three independent reasoning systems
              across two providers &mdash; carries more weight than any single model&rsquo;s rubber stamp.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-sky-500/5 border border-sky-500/20">
            <p className="text-sm text-white/60">
              <strong className="text-sky-400">Read the full 20-round debate:</strong>{" "}
              <a
                href="https://www.asknestr.com/case-studies/mountain-wave-detection"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 underline-offset-2 inline-flex items-center gap-1"
              >
                Mountain Wave Detection Case Study on Nestr <ExternalLink className="h-3 w-3" />
              </a>
              {" "}&mdash; all 80 messages and 1.3 million tokens of mountain meteorology debate, unedited.
            </p>
          </div>
        </section>

        {/* Validation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Shield className="h-6 w-6 text-emerald-400" />
            Validation
          </h2>
          <p className="text-white/70 leading-relaxed">
            The debate produced the improvements. But the debate isn&rsquo;t the validation &mdash; the
            testing is. Every improvement was implemented, tested, and verified before deployment.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-3xl font-bold text-emerald-400 mb-2">59</p>
              <p className="font-semibold text-white mb-1">Unit Tests</p>
              <p className="text-xs text-white/50">
                Covering Scorer parameter, relief-scaled thresholds, terrain complexity, Froude
                number, Brunt-V&auml;is&auml;l&auml; frequency, severity promotion, and full
                integration tests via the analysis pipeline.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <p className="text-3xl font-bold text-sky-400 mb-2">6</p>
              <p className="font-semibold text-white mb-1">Regression Routes</p>
              <p className="text-xs text-white/50">
                Rocky Mountain crossing (KSUS-KSLC), Sierra Nevada (KOAK-KRNO), Colorado Front Range
                (KDEN-KASE), Appalachians (KJFK-KLEX), Cascades (KBFI-KELN), and a flat negative
                control (KDFW-KIAH).
              </p>
            </div>
            <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-3xl font-bold text-amber-400 mb-2">v1&#8202;&harr;&#8202;v2</p>
              <p className="font-semibold text-white mb-1">Side-by-Side Comparison</p>
              <p className="text-xs text-white/50">
                Automated comparison of v1 fixed thresholds vs. v2 relief-scaled thresholds on every
                regression route, tracking escalations, de-escalations, and Scorer gate suppressions.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-3">First Regression Run Results</h3>
            <p className="text-sm text-white/60 mb-4">
              March 16, 2026 &mdash; all 6 routes against local dev server with live weather data:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-3 text-white/60">Route</th>
                    <th className="text-center py-2 px-3 text-white/60">Terrain</th>
                    <th className="text-center py-2 px-3 text-white/60">Wave</th>
                    <th className="text-center py-2 px-3 text-white/60">Hazards</th>
                    <th className="text-center py-2 px-3 text-white/60">v1&rarr;v2 Changes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-2 px-3 text-white/70">KSUS&rarr;KSLC</td>
                    <td className="py-2 px-3 text-center text-sky-400">high-mountain</td>
                    <td className="py-2 px-3 text-center text-amber-400">moderate</td>
                    <td className="py-2 px-3 text-center text-white">6</td>
                    <td className="py-2 px-3 text-center text-emerald-400">3 de-escalations</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-white/70">KDEN&rarr;KASE</td>
                    <td className="py-2 px-3 text-center text-sky-400">high-mountain</td>
                    <td className="py-2 px-3 text-center text-amber-400">moderate</td>
                    <td className="py-2 px-3 text-center text-white">3</td>
                    <td className="py-2 px-3 text-center text-white/40">&mdash;</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-white/70">KOAK&rarr;KRNO</td>
                    <td className="py-2 px-3 text-center text-sky-400">mountainous</td>
                    <td className="py-2 px-3 text-center text-white/40">none</td>
                    <td className="py-2 px-3 text-center text-white">0</td>
                    <td className="py-2 px-3 text-center text-white/40">&mdash;</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-white/70">KJFK&rarr;KLEX</td>
                    <td className="py-2 px-3 text-center text-sky-400">hilly</td>
                    <td className="py-2 px-3 text-center text-white/40">none</td>
                    <td className="py-2 px-3 text-center text-white">0</td>
                    <td className="py-2 px-3 text-center text-white/40">&mdash;</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-white/70">KBFI&rarr;KELN</td>
                    <td className="py-2 px-3 text-center text-sky-400">mountainous</td>
                    <td className="py-2 px-3 text-center text-white/40">none</td>
                    <td className="py-2 px-3 text-center text-white">0</td>
                    <td className="py-2 px-3 text-center text-white/40">&mdash;</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-white/70">KDFW&rarr;KIAH</td>
                    <td className="py-2 px-3 text-center text-emerald-400">flat</td>
                    <td className="py-2 px-3 text-center text-white/40">none</td>
                    <td className="py-2 px-3 text-center text-white">0</td>
                    <td className="py-2 px-3 text-center text-emerald-400/60">control passed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/30 mt-3">
              The 3 de-escalations on KSUS&rarr;KSLC are expected: v2&rsquo;s relief-scaled thresholds
              correctly raise the bar for high-relief Rocky Mountain terrain, where stronger winds
              are needed to generate the same severity level. Light-weather conditions on the March 16
              test date meant the Scorer gate and complex-terrain modifier weren&rsquo;t exercised
              in production &mdash; they are fully covered by unit tests.
            </p>
          </div>
        </section>

        {/* What This Means for Pilots */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Wind className="h-6 w-6 text-sky-400" />
            What This Means for You
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Fewer false alarms</h3>
                  <p className="text-sm text-white/60">
                    The Scorer parameter gate prevents rotor alerts when the atmosphere doesn&rsquo;t actually
                    support trapped lee waves. Strong upper-level winds in common winter jet-stream
                    patterns will no longer trigger unnecessary rotor warnings.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Better detection in lower terrain</h3>
                  <p className="text-sm text-white/60">
                    If you fly the Appalachians, Ozarks, or coastal ranges, the relief-scaled thresholds
                    and sub-2,000 ft promotion mean PlaneWX will flag mountain wave conditions that v1
                    would have missed. Your briefing reflects the terrain you&rsquo;re actually flying over.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Transparent methodology</h3>
                  <p className="text-sm text-white/60">
                    Every algorithm, every threshold, every physical constant is documented in our
                    help center. We publish the science behind the system because you deserve to know
                    how your safety decisions are being informed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-white/60" />
            References
          </h2>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/50 space-y-2">
            <p>Durran, D. R. (1990). <em>Mountain waves and downslope winds.</em> Atmospheric Processes over Complex Terrain, Meteor. Monogr. 23(45), 59&ndash;81.</p>
            <p>FAA Advisory Circular AC 00-57, <em>Hazardous Mountain Winds and Their Visual Indicators.</em></p>
            <p>Reinecke, P. A., &amp; Durran, D. R. (2008). <em>Estimating topographic blocking using a Froude number when the static stability is nonuniform.</em> J. Atmos. Sci., 65(4), 1035&ndash;1048.</p>
            <p>Scorer, R. S. (1949). <em>Theory of waves in the lee of mountains.</em> Quart. J. Roy. Meteor. Soc., 75, 41&ndash;56.</p>
            <p>Sharman, R. D., Tebaldi, C., Wiener, G., &amp; Wolff, J. (2006). <em>An integrated approach to mid- and upper-level turbulence forecasting.</em> Wea. Forecasting, 21, 268&ndash;287.</p>
            <p>Smith, R. B. (1989). <em>Hydrostatic airflow over mountains.</em> Advances in Geophysics, 31, 1&ndash;41.</p>
            <p>Vosper, S. B. (2004). <em>Inversion effects on mountain lee waves.</em> Quart. J. Roy. Meteor. Soc., 130, 1723&ndash;1748.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold">
            See Mountain Wave Detection<br />
            <span className="text-sky-400">In Your Next Briefing</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Create a free briefing for any mountain route. You&rsquo;ll see terrain classification,
            cross-barrier wind analysis, Froude number rotor detection, and Scorer parameter gate
            diagnostics &mdash; all explained in plain English.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://app.planewx.ai"
              className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
            >
              Back to PlaneWX
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto max-w-4xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">&copy; {new Date().getFullYear()} PlaneWX, LLC &mdash; Weather Intelligence for Pilots. All rights reserved.</p>
          <p className="text-xs text-white/30">
            The pilot in command makes the final go/no-go decision per 14 CFR 91.3.
          </p>
        </div>
      </footer>
    </div>
  )
}
