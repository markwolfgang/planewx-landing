import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft, Wind, Shield, AlertTriangle, CheckCircle,
  Layers, Zap, BookOpen, RefreshCw,
  MessageSquare, FlaskConical, ExternalLink, TrendingUp,
  Gauge, BarChart3, ArrowRight, Target,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Iterative AI Validation of Turbulence Detection | PlaneWX Research",
  description:
    "How PlaneWX ran 8 adversarial AI debates across 3 days to validate and refine its shear guard and rotor detection systems — producing altitude-banded thresholds, KHI boost logic, and GA-specific PIREP normalization backed by Monte Carlo testing.",
  openGraph: {
    title: "8 Debates, 3 Days, 1 Safety-Critical Decision",
    description:
      "Iterative multi-AI debate refined PlaneWX's turbulence detection pipeline — shear guard protection, Froude number rotor detection, and Richardson number stability gating validated by 6 frontier AI models.",
    type: "article",
  },
}

export default function TurbulenceSafety() {
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
            8 Debates. 3 Days.<br />
            <span className="text-sky-400">One Safety-Critical Decision.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
            When you&rsquo;re building software that tells pilots whether it&rsquo;s safe to fly,
            &ldquo;good enough&rdquo; isn&rsquo;t good enough. We ran our turbulence detection
            methodology through 8 separate adversarial AI debates over 3 days &mdash; each one
            refining the approach based on what the previous panel uncovered.
          </p>
          <p className="text-white/40 text-sm">
            By Mark Wolfgang, Founder &amp; CEO, PlaneWX
          </p>
        </section>

        {/* The Stakes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-400" />
            The Stakes
          </h2>
          <p className="text-white/70 leading-relaxed">
            PlaneWX&rsquo;s turbulence detection pipeline analyzes data from three numerical weather
            prediction models &mdash; HRRR, GFS, and ECMWF &mdash; to warn pilots about dangerous
            conditions along their route. We compute vertical wind shear and Richardson number at
            every altitude level from each model, then build consensus to produce a single severity
            assessment: smooth, light, moderate, or severe.
          </p>
          <p className="text-white/70 leading-relaxed">
            Two planned safety improvements needed validation before shipping:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="text-lg font-semibold text-red-400 mb-2">The Shear Guard Problem</h3>
              <p className="text-sm text-white/60">
                Our Richardson number stability check was silently downgrading MODERATE and SEVERE
                turbulence warnings to LIGHT in cases where a thin shear layer existed inside a
                coarse model layer. The Ri calculation &mdash; which averages over thick pressure
                layers &mdash; was diluting the signal from concentrated shear zones, creating
                dangerous false-clear results for pilots.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">The Rotor Detection Gap</h3>
              <p className="text-sm text-white/60">
                Our mountain wave module reported severity based only on wind speed, with no ability
                to distinguish benign laminar waves from violent rotor turbulence &mdash; a leading
                cause of GA mountain fatalities per NTSB data. We needed Froude number analysis to
                separate the two.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-white/60 text-center">
              Getting the thresholds wrong in either direction was unacceptable: too permissive and
              pilots fly into danger, too aggressive and alert fatigue makes them ignore real warnings.
              This isn&rsquo;t the kind of problem you solve with one AI conversation.
            </p>
          </div>
        </section>

        {/* The Iteration */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <RefreshCw className="h-6 w-6 text-sky-400" />
            The Iteration
          </h2>
          <p className="text-white/70 leading-relaxed">
            Rather than running one big debate, I took an iterative approach using{" "}
            <a href="https://www.asknestr.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 underline-offset-2">
              Nestr
            </a>
            &rsquo;s multi-model debate platform. Run a debate, implement the feedback, then run
            again with the updated methodology. Each debate built on what the previous ones found.
            Over 3 days, 8 completed debates progressively refined both systems.
          </p>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-sky-400">8</p>
                <p className="text-xs text-white/40">total debates</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400">6</p>
                <p className="text-xs text-white/40">unique AI models</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400">64</p>
                <p className="text-xs text-white/40">total rounds</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400">3 days</p>
                <p className="text-xs text-white/40">iterate &amp; refine</p>
              </div>
            </div>
          </div>

          {/* Debate Timeline */}
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-xs font-bold text-sky-400">1</div>
                <div className="w-px h-full bg-white/10 mt-1" />
              </div>
              <div className="pb-4">
                <p className="font-semibold text-white text-sm">Initial Methodology Review</p>
                <p className="text-xs text-white/40 mb-1">o3, Claude Opus 4.6, Grok 4.1 Fast, Claude Sonnet 4.6</p>
                <p className="text-sm text-white/50">
                  Identified the Ri downgrade masking problem and the missing rotor detection gap.
                  Consensus score 72/100 &mdash; sound approach, specific calibration concerns.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-xs font-bold text-sky-400">2&ndash;3</div>
                <div className="w-px h-full bg-white/10 mt-1" />
              </div>
              <div className="pb-4">
                <p className="font-semibold text-white text-sm">Consistency Verification &amp; Deep-Dive</p>
                <p className="text-xs text-white/40 mb-1">Same panel &mdash; re-run to confirm findings weren&rsquo;t random</p>
                <p className="text-sm text-white/50">
                  Models converged on the same core issues across two independent runs, confirming the
                  Ri masking was a real problem. Third run surfaced the altitude-banding approach for
                  shear guard thresholds.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-400">4&ndash;5</div>
                <div className="w-px h-full bg-white/10 mt-1" />
              </div>
              <div className="pb-4">
                <p className="font-semibold text-white text-sm">Fresh Panel &amp; Refined Methodology</p>
                <p className="text-xs text-white/40 mb-1">Gemini 2.5 Pro replaced Claude Sonnet &mdash; new perspective</p>
                <p className="text-sm text-white/50">
                  Challenged assumptions the original panel had accepted. Evaluated refined altitude-banded
                  thresholds (18/14/12 kt/1000ft) and the proposed Froude number formulation.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400">6</div>
                <div className="w-px h-full bg-white/10 mt-1" />
              </div>
              <div className="pb-4">
                <p className="font-semibold text-white text-sm">The Definitive Run</p>
                <p className="text-xs text-white/40 mb-1">o3, Gemini 2.5 Pro, Grok 4.1 Fast, Claude Opus 4.6</p>
                <p className="text-sm text-white/50">
                  Focused on the interaction between both changes and priority assessment. Grok 4.1 demanded
                  Monte Carlo sensitivity testing and GA-specific PIREP validation. o3 provided detailed
                  statistical evidence including ROC curves and confidence intervals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-xs font-bold text-red-400">7</div>
                <div className="w-px h-full bg-white/10 mt-1" />
              </div>
              <div className="pb-4">
                <p className="font-semibold text-white text-sm">Bug Investigation</p>
                <p className="text-xs text-white/40 mb-1">Targeted spin-off debate</p>
                <p className="text-sm text-white/50">
                  A boundary layer shear over-classification bug discovered during implementation was
                  isolated and fixed using the debate format as a diagnostic tool.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400">8</div>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Mountain Wave Deep-Dive</p>
                <p className="text-xs text-white/40 mb-1">o3, Grok 4.1 Fast, Claude Sonnet 4.6, Grok 3</p>
                <p className="text-sm text-white/50">
                  Validated ridge bearing estimation and perpendicular wind decomposition &mdash; the
                  inputs that feed rotor detection. This debate became its own{" "}
                  <Link href="/research/mountain-wave-validation" className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 underline-offset-2">
                    research article
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Models */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-sky-400" />
            The Panel
          </h2>
          <p className="text-white/70 leading-relaxed">
            Six frontier AI models participated across the 8 debates. Rotating the panel composition
            between runs was deliberate &mdash; different models bring different biases, and swapping
            one out catches assumptions the previous lineup accepted unchallenged.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-blue-400 font-mono uppercase tracking-wider mb-1">Proposer</p>
              <p className="font-semibold text-white">o3</p>
              <p className="text-xs text-white/40 mt-1">Quantitative defense with validation statistics, ROC curves, confidence intervals</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">Challenger</p>
              <p className="font-semibold text-white">Grok 4.1 Fast</p>
              <p className="text-xs text-white/40 mt-1">Demanded Monte Carlo testing and caught the TAMDAR/GA data bias</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-xs text-purple-400 font-mono uppercase tracking-wider mb-1">Synthesizer</p>
              <p className="font-semibold text-white">Claude Opus 4.6</p>
              <p className="text-xs text-white/40 mt-1">Final verdict synthesis across all positions</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-400 font-mono uppercase tracking-wider mb-1">Challenger</p>
              <p className="font-semibold text-white">Claude Sonnet 4.6</p>
              <p className="text-xs text-white/40 mt-1">Precise accountability &mdash; every claim matched to evidence</p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">Challenger</p>
              <p className="font-semibold text-white">Gemini 2.5 Pro</p>
              <p className="text-xs text-white/40 mt-1">Fresh perspective that challenged panel consensus</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <p className="text-xs text-rose-400 font-mono uppercase tracking-wider mb-1">Challenger</p>
              <p className="font-semibold text-white">Grok 3</p>
              <p className="text-xs text-white/40 mt-1">Real-world applicability and pilot trust concerns</p>
            </div>
          </div>
        </section>

        {/* From the Transcript */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Layers className="h-6 w-6 text-white/60" />
            From the Transcript
          </h2>
          <p className="text-white/70 leading-relaxed">
            Here&rsquo;s what it sounds like when frontier AI models argue about turbulence
            thresholds for general aviation:
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-xs font-mono text-amber-400">GROK 4.1 FAST &mdash; CHALLENGER</p>
              </div>
              <p className="text-sm text-white/70 italic leading-relaxed">
                &ldquo;Your NASA TAMDAR 85th percentile rationale for 18/14/12 kt/1000ft thresholds
                assumes &lsquo;discomfort reports&rsquo; proxy for true MOD+ turbulence, but TAMDAR
                data (from airliners, not GA) correlates poorly with PIREPs below 12kt shear due to
                aircraft mass differences &mdash; GA light singles report discomfort at 8&ndash;10
                kt/1000ft per FAA AC 00-6B.&rdquo;
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <p className="text-xs font-mono text-blue-400">O3 &mdash; PROPOSER</p>
              </div>
              <p className="text-sm text-white/70 italic leading-relaxed">
                &ldquo;We perturbed every matched PIREP 10,000 times by random draws within the
                operational tolerances &mdash; temporal separation &plusmn;30 min, spatial separation
                &plusmn;0.25&deg;, altitude &plusmn;1 half-layer. HRRR 3-km hourly analyses supplied
                the local shear gradient tensor so that each offset translated into a physically
                consistent shear change. The guard trigger at 18 kt retains &ge;16 kt effective
                separation from the LIGHT threshold even under worst-case offsets.&rdquo;
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-xs font-mono text-amber-400">GROK 4.1 FAST &mdash; CHALLENGER, ROUND 4</p>
              </div>
              <p className="text-sm text-white/70 italic leading-relaxed">
                &ldquo;Your perturbations used HRRR analyses (near-truth), but PlaneWX ingests
                forecasts (HRRR up to 18h, GFS/ECMWF 0&ndash;120h) with 2&ndash;5x larger shear
                error per NOAA HRRRv4 RMSE stats: forecast shear error ~3kt/1000ft at t+12h vs
                analysis. Re-run the Monte Carlo on 2022 forecast ensembles matching your Open-Meteo
                pipeline.&rdquo;
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <p className="text-xs font-mono text-blue-400">O3 &mdash; PROPOSER, FINAL ROUND</p>
              </div>
              <p className="text-sm text-white/70 italic leading-relaxed">
                &ldquo;HRRR&rsquo;s documented low-bias in low-level shear actually widens, not
                shrinks, the guard&rsquo;s safety buffer. A 25% negative bias means that when the
                forecast shows 18 kt/1000ft the real atmosphere is closer to 22&ndash;24 kt &mdash;
                squarely in bona-fide MOD territory. The probability mass that lifts a true 10 kt
                LIGHT environment above the 18 kt trigger remains 1.6%, comfortably below our 2%
                operational false-alarm ceiling.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* What We Shipped */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Zap className="h-6 w-6 text-amber-400" />
            What We Shipped
          </h2>
          <p className="text-white/70 leading-relaxed">
            The 8 debates didn&rsquo;t just validate our approach &mdash; they reshaped it. Here are
            the concrete changes that made it into production, in the order the panels recommended
            we ship them.
          </p>

          <div className="space-y-4">
            {/* Shear Guard */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-red-500/20 rounded-lg p-2 shrink-0">
                  <Shield className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Shear Guard Protection</h3>
                  <p className="text-sm text-white/60 mb-3">
                    When resolved wind shear exceeds altitude-specific thresholds, the Richardson
                    number stability cap is bypassed &mdash; the shear itself is strong enough to
                    indicate real turbulence regardless of what bulk Ri says. Every panel independently
                    concluded this had higher safety impact than any other change.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                      <p className="text-lg font-bold text-red-400">18 kt</p>
                      <p className="text-xs text-white/40">Low altitude</p>
                      <p className="text-[10px] text-white/30">1000&ndash;750 hPa</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                      <p className="text-lg font-bold text-amber-400">14 kt</p>
                      <p className="text-xs text-white/40">Mid altitude</p>
                      <p className="text-[10px] text-white/30">750&ndash;500 hPa</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                      <p className="text-lg font-bold text-sky-400">12 kt</p>
                      <p className="text-xs text-white/40">Upper altitude</p>
                      <p className="text-[10px] text-white/30">500&ndash;100 hPa</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/30 mt-2">
                    kt/1000ft &mdash; validated via Monte Carlo (10,000 perturbations), 1,034
                    GA-only PIREP overlays, and ROC analysis (AUC 0.82 with Ri gating)
                  </p>
                </div>
              </div>
            </div>

            {/* KHI Boost */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 rounded-lg p-2 shrink-0">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Kelvin-Helmholtz Instability Boost</h3>
                  <p className="text-sm text-white/60">
                    When the Richardson number drops below 0.25 &mdash; the onset threshold for
                    Kelvin-Helmholtz instability &mdash; and shear exceeds 4 kt/1000ft, turbulence
                    severity is boosted by one level. KHI produces the rolling, breaking-wave
                    turbulence that can be particularly violent for GA aircraft. The boundary layer
                    is excluded to prevent false boosts from normal surface-layer shear.
                  </p>
                  <p className="text-xs text-white/30 mt-2">
                    Ri &lt; 0.25 = dynamically unstable &middot; Ri 0.25&ndash;0.5 = transitional
                    &middot; Ri &ge; 0.5 = stable (cap at LIGHT unless guard is active)
                  </p>
                </div>
              </div>
            </div>

            {/* GA PIREP Normalization */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500/20 rounded-lg p-2 shrink-0">
                  <Gauge className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">GA-Specific PIREP Normalization</h3>
                  <p className="text-sm text-white/60">
                    Grok 4.1 caught a blind spot we hadn&rsquo;t considered: the TAMDAR data used to
                    calibrate thresholds came from airliners, not GA aircraft. &ldquo;Moderate&rdquo;
                    turbulence in a 737 feels very different in a Cirrus. We now normalize PIREP
                    severity by aircraft weight class &mdash; heavy-aircraft reports are bumped up
                    a full category, medium aircraft half a step, and light GA aircraft are taken
                    at face value.
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                      <p className="text-xs font-semibold text-emerald-400">Light GA</p>
                      <p className="text-[10px] text-white/40">&lt; 15,500 lb</p>
                      <p className="text-xs text-white/50 mt-1">No adjustment</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                      <p className="text-xs font-semibold text-amber-400">Medium</p>
                      <p className="text-[10px] text-white/40">15,500&ndash;300,000 lb</p>
                      <p className="text-xs text-white/50 mt-1">+&frac12; step</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                      <p className="text-xs font-semibold text-red-400">Heavy</p>
                      <p className="text-[10px] text-white/40">&gt; 300,000 lb</p>
                      <p className="text-xs text-white/50 mt-1">+1 full step</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Froude Number Rotor */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-violet-500/10 to-violet-500/5 border border-violet-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-violet-500/20 rounded-lg p-2 shrink-0">
                  <Wind className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Froude Number Rotor Detection</h3>
                  <p className="text-sm text-white/60">
                    Fr = U<sub>perp</sub> / (N &times; h) &mdash; the ratio of cross-barrier wind
                    speed to the mountain&rsquo;s ability to block the flow. When Fr drops below
                    critical thresholds and wind is strong enough, rotor turbulence is likely on the
                    lee side. The debate validated our thresholds against Durran (1990) and Vosper
                    (2004), and confirmed the valley-to-crest stability layer is the correct
                    choice for computing Brunt-V&auml;is&auml;l&auml; frequency.
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                      <p className="text-sm font-bold text-red-400">Fr &lt; 0.60</p>
                      <p className="text-xs text-white/40">Severe rotor (wind &ge; 25 kt)</p>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                      <p className="text-sm font-bold text-amber-400">Fr 0.60&ndash;0.75</p>
                      <p className="text-xs text-white/40">Moderate rotor (wind &ge; 20 kt)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6% False Alarm */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-sky-500/10 to-sky-500/5 border border-sky-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-sky-500/20 rounded-lg p-2 shrink-0">
                  <BarChart3 className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">6% False Alarm Increase &mdash; Accepted</h3>
                  <p className="text-sm text-white/60">
                    The shear guard produces a 6% increase in false MODERATE alerts. Multiple panels
                    confirmed this tradeoff is appropriate: it&rsquo;s well inside the FAA-accepted
                    TIBS false-alarm tolerance of ~10%, and the alternative &mdash; missing real
                    moderate turbulence in the 8&ndash;12,000 ft cruise bands where GA pilots most
                    often encounter unanticipated shear &mdash; is unacceptable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Iteration, Not One Shot */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Target className="h-6 w-6 text-sky-400" />
            Why 8 Debates, Not 1
          </h2>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <p className="text-white/70 leading-relaxed">
              A single debate gives you a snapshot. Iteration gives you convergence.
            </p>
            <p className="text-white/70 leading-relaxed">
              The first three debates identified the problems. Debates 4&ndash;5 brought in a fresh
              model (Gemini 2.5 Pro) to challenge assumptions the original panel had accepted.
              Debate 6 synthesized everything into a final design that had survived adversarial
              scrutiny from <strong className="text-white">6 different frontier AI models</strong> across{" "}
              <strong className="text-white">3 days of refinement</strong>.
            </p>
            <p className="text-white/70 leading-relaxed">
              Debate 7 was unplanned &mdash; a bug surfaced during implementation, and the debate
              format turned out to be an effective diagnostic tool for isolating root causes. Debate 8
              validated the inputs to rotor detection and spawned{" "}
              <Link href="/research/mountain-wave-validation" className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 underline-offset-2">
                its own research article
              </Link>{" "}
              with six additional algorithmic improvements.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-sky-500/5 border border-sky-500/20">
            <div className="flex items-center gap-4 justify-center text-center">
              <div className="text-sm text-white/60">Debate</div>
              <ArrowRight className="h-4 w-4 text-sky-400" />
              <div className="text-sm text-white/60">Learn</div>
              <ArrowRight className="h-4 w-4 text-sky-400" />
              <div className="text-sm text-white/60">Refine</div>
              <ArrowRight className="h-4 w-4 text-sky-400" />
              <div className="text-sm text-white/60">Debate again</div>
            </div>
            <p className="text-xs text-white/40 text-center mt-3">
              Each cycle sharpens the methodology. Re-running with different model lineups catches
              blind spots that a single panel might miss.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-sky-500/5 border border-sky-500/20">
            <p className="text-sm text-white/60">
              <strong className="text-sky-400">Read the full debate series:</strong>{" "}
              <a
                href="https://www.asknestr.com/case-studies/turbulence-safety"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 underline-offset-2 inline-flex items-center gap-1"
              >
                Turbulence Safety Case Study on Nestr <ExternalLink className="h-3 w-3" />
              </a>
              {" "}&mdash; all 8 debates, 64 rounds, and 6 unique AI models.
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
                  <h3 className="font-semibold text-white mb-1">No more hidden shear</h3>
                  <p className="text-sm text-white/60">
                    The shear guard ensures that strong wind shear can&rsquo;t be masked by a
                    stable-looking Ri computed from a coarse model layer. If the shear is there,
                    you&rsquo;ll see it in your briefing &mdash; especially in the 8&ndash;12,000 ft
                    bands where GA pilots most often encounter unexpected turbulence.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">PIREPs calibrated for your aircraft</h3>
                  <p className="text-sm text-white/60">
                    When an airline crew files &ldquo;light chop&rdquo; in a 737, that&rsquo;s
                    likely light-to-moderate in your Bonanza. PlaneWX now normalizes PIREP severity
                    by weight class so the turbulence picture reflects what <em>you</em> would
                    experience in <em>your</em> airplane.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Rotor turbulence distinguished from mountain waves</h3>
                  <p className="text-sm text-white/60">
                    Not all mountain waves produce rotors. PlaneWX now uses Froude number analysis
                    to tell you when conditions support actual rotor turbulence on the lee side of
                    ridges &mdash; the kind that breaks airframes &mdash; versus laminar waves
                    you can ride through with a firm grip on the yoke.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Every threshold is documented</h3>
                  <p className="text-sm text-white/60">
                    We publish the shear thresholds, Richardson number bands, Froude number
                    criteria, and the complete derivation methodology in our{" "}
                    <a href="https://app.planewx.ai/help/turbulence-analysis" className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 underline-offset-2">
                      help center
                    </a>. You deserve to know exactly how your briefing&rsquo;s turbulence
                    assessment is computed.
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
            <p>FAA Advisory Circular AC 00-6B, <em>Aviation Weather.</em></p>
            <p>FAA Advisory Circular AC 00-57, <em>Hazardous Mountain Winds and Their Visual Indicators.</em></p>
            <p>Miles, J. W. (1961). <em>On the stability of heterogeneous shear flows.</em> J. Fluid Mech., 10(4), 496&ndash;508.</p>
            <p>Sharman, R. D., Tebaldi, C., Wiener, G., &amp; Wolff, J. (2006). <em>An integrated approach to mid- and upper-level turbulence forecasting.</em> Wea. Forecasting, 21, 268&ndash;287.</p>
            <p>Vosper, S. B. (2004). <em>Inversion effects on mountain lee waves.</em> Quart. J. Roy. Meteor. Soc., 130, 1723&ndash;1748.</p>
          </div>
        </section>

        {/* Related Research */}
        <section className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-r from-sky-500/10 to-violet-500/10 border border-sky-500/20">
            <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-2">Related Research</p>
            <Link href="/research/mountain-wave-validation" className="group block">
              <h3 className="font-semibold text-white group-hover:text-sky-400 transition-colors mb-1">
                Adversarial AI Validation of Mountain Wave Detection
              </h3>
              <p className="text-sm text-white/50">
                The 8th debate &mdash; validating ridge bearing estimation and perpendicular wind
                decomposition &mdash; produced six additional algorithmic improvements including the
                Scorer parameter gate and relief-scaled wind thresholds.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold">
            See Turbulence Analysis<br />
            <span className="text-sky-400">In Your Next Briefing</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Create a free briefing for any route. You&rsquo;ll see multi-model turbulence analysis
            with shear guard protection, Richardson number gating, GA-specific PIREP normalization,
            and full data transparency &mdash; all calibrated for your aircraft.
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
