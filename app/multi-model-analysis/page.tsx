import type { Metadata } from "next"
import Link from "next/link"
import { 
  Snowflake, Wind, Layers, BarChart3, Shield, AlertTriangle,
  Thermometer, Droplets, CheckCircle, Gauge, Eye, Plane,
  ArrowRight, ArrowLeft, Zap, Radio, TrendingUp, Info
} from "lucide-react"

export const metadata: Metadata = {
  title: "Multi-Model Icing & Turbulence Analysis | PlaneWX — Weather Intelligence for Pilots",
  description: "PlaneWX queries three independent weather models (HRRR, GFS, ECMWF), builds consensus with confidence scoring, and corroborates with PIREPs and AIRMETs — giving pilots altitude-specific icing and turbulence intelligence no other tool provides.",
}

export default function MultiModelAnalysis() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1120]/80 border-b border-white/10">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
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

      <div className="container mx-auto max-w-5xl px-4 py-16 space-y-24">

        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium">
            <Layers className="h-4 w-4" />
            Nobody else does this
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Three Models.<br />
            <span className="text-sky-400">One Confident Answer.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            PlaneWX queries three independent weather models at multiple points along your route, 
            builds consensus with confidence scoring, and corroborates with real-world pilot reports 
            and government advisories — giving you altitude-specific icing and turbulence intelligence 
            that no other tool provides to general aviation pilots.
          </p>
        </section>

        {/* The Problem */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">The Problem with Traditional Icing &amp; Turbulence Information</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Pilots today rely on two sources that were never designed for route-specific, altitude-specific decision-making.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">G-AIRMETs: Too Broad</h3>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Cover hundreds of thousands of square miles with a single severity rating</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>No information about which specific altitudes within the range are worst</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Don't tell you where the clouds actually are</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Updated every 3 hours — conditions change faster</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">PIREPs: Too Sparse</h3>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Depend on other pilots filing reports — huge coverage gaps at night and in rural areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Subjective severity — &ldquo;moderate&rdquo; in a 737 feels very different than in a Cirrus</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Often hours old by the time you see them</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Absence of PIREPs doesn&rsquo;t mean smooth air — it may mean nobody filed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20 text-center">
            <p className="text-white/80 text-lg">
              <strong className="text-white">PlaneWX&rsquo;s approach:</strong> Instead of relying on broad products or sparse reports,
              we query three independent numerical weather models at multiple points along <em>your specific route</em> — 
              then corroborate the model output with real-world observations.
            </p>
          </div>
        </section>

        {/* The Three Models */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">The Three Models</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Two from NOAA, one from Europe. Each has different strengths — 
              and comparing them gives us confidence scoring that no single model can provide.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-blue-500/20 rounded-xl p-4 shrink-0">
                  <span className="text-2xl font-bold text-blue-400">HRRR</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">High-Resolution Rapid Refresh</h3>
                  <p className="text-white/50 text-sm mb-4">NOAA&rsquo;s highest-resolution hourly model — the gold standard for short-range icing and turbulence forecasts.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">Resolution</span>
                      <p className="text-white font-semibold text-lg">3 km</p>
                    </div>
                    <div>
                      <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">Updates</span>
                      <p className="text-white font-semibold text-lg">Every hour</p>
                    </div>
                    <div>
                      <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">Range</span>
                      <p className="text-white font-semibold text-lg">0–18 hours</p>
                    </div>
                    <div>
                      <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">Best for</span>
                      <p className="text-white/70">Terrain effects, cloud layers, convection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-purple-500/20 rounded-xl p-4 shrink-0">
                  <span className="text-2xl font-bold text-purple-400">GFS</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Global Forecast System</h3>
                  <p className="text-white/50 text-sm mb-4">NOAA&rsquo;s primary global model — the backbone of most weather predictions worldwide.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400 text-xs font-mono uppercase tracking-wider">Resolution</span>
                      <p className="text-white font-semibold text-lg">~13 km</p>
                    </div>
                    <div>
                      <span className="text-purple-400 text-xs font-mono uppercase tracking-wider">Updates</span>
                      <p className="text-white font-semibold text-lg">4× daily</p>
                    </div>
                    <div>
                      <span className="text-purple-400 text-xs font-mono uppercase tracking-wider">Range</span>
                      <p className="text-white font-semibold text-lg">0–16 days</p>
                    </div>
                    <div>
                      <span className="text-purple-400 text-xs font-mono uppercase tracking-wider">Best for</span>
                      <p className="text-white/70">Big-picture trends, jet stream, extended range</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-amber-500/20 rounded-xl p-4 shrink-0">
                  <span className="text-2xl font-bold text-amber-400">ECMWF</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">European Centre for Medium-Range Weather Forecasts</h3>
                  <p className="text-white/50 text-sm mb-4">Widely regarded as the world&rsquo;s most accurate global forecast model.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Resolution</span>
                      <p className="text-white font-semibold text-lg">~9 km</p>
                    </div>
                    <div>
                      <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Updates</span>
                      <p className="text-white font-semibold text-lg">4× daily</p>
                    </div>
                    <div>
                      <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Range</span>
                      <p className="text-white font-semibold text-lg">0–10 days</p>
                    </div>
                    <div>
                      <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Best for</span>
                      <p className="text-white/70">Overall accuracy, moisture, jet stream dynamics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Three Models */}
        <section className="space-y-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-950/60 to-indigo-950/60 border border-sky-500/20">
            <h2 className="text-2xl font-bold mb-4">Why Three Models?</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              No single model is always right. By comparing three independent models, PlaneWX determines 
              <strong className="text-white"> how much to trust the forecast</strong>. When all three agree, you can fly with 
              high confidence. When they disagree, that disagreement is itself valuable intelligence — it tells 
              you the atmosphere is uncertain and conditions could go either way.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-green-400 font-bold text-lg mb-1">HIGH Confidence</p>
                <p className="text-xs text-green-400/60 mb-2">Unanimous</p>
                <p className="text-sm text-white/60">All three models agree. Trust the forecast.</p>
              </div>
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                <p className="text-yellow-400 font-bold text-lg mb-1">MODERATE Confidence</p>
                <p className="text-xs text-yellow-400/60 mb-2">Majority</p>
                <p className="text-sm text-white/60">Most models agree, one differs. Likely correct, but uncertainty exists.</p>
              </div>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                <p className="text-orange-400 font-bold text-lg mb-1">LOW Confidence</p>
                <p className="text-xs text-orange-400/60 mb-2">Split</p>
                <p className="text-sm text-white/60">Models disagree. The atmosphere is uncertain. Plan conservatively.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Route Sampling */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Route-Specific Sampling</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              PlaneWX doesn&rsquo;t show you a colored polygon on a map. We sample your exact route.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-sky-400 mb-2">3–7</p>
                <p className="text-white/60 text-sm">Sample points along your route</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sky-400 mb-2">8</p>
                <p className="text-white/60 text-sm">Pressure levels at each point (925–200 hPa)</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sky-400 mb-2">~120</p>
                <p className="text-white/60 text-sm">Data points per flight (300 NM typical)</p>
              </div>
            </div>
            <div className="mt-8 p-4 rounded-xl bg-sky-500/5 border border-sky-500/10">
              <p className="text-sm text-white/60 text-center">
                At each sample point, all three models provide temperature, humidity, wind speed, wind direction, 
                cloud cover, and freezing level. PlaneWX computes icing probability, severity, turbulence severity, 
                wind shear, and Richardson number — then builds consensus across models.
              </p>
            </div>
          </div>
        </section>

        {/* Icing Deep Dive */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
              <Snowflake className="h-6 w-6 text-sky-400" />
            </div>
            <h2 className="text-3xl font-bold">Multi-Model Icing Analysis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">How We Detect Icing</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Icing requires two ingredients simultaneously: subfreezing temperatures (0°C to -20°C) and visible 
                moisture (relative humidity ≥ 80%). PlaneWX checks both at each of 8 altitude levels along your route, 
                from each of three models.
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm"><strong className="text-blue-400">0°C to -10°C:</strong> <span className="text-white/60">Maximum icing risk — supercooled water droplets most common</span></p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm"><strong className="text-blue-400">-10°C to -20°C:</strong> <span className="text-white/60">Decreasing risk — mixed phase (some ice crystals, some liquid)</span></p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm"><strong className="text-blue-400">Below -20°C:</strong> <span className="text-white/60">Glaciated — ice crystals predominate, minimal airframe icing</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What You Get in Your Briefing</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Icing layer boundaries</strong> — exact entry/exit altitudes for climb and descent</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Freezing level</strong> from each model — shown side by side</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Ice type at cruise</strong> — clear, rime, or mixed based on temperature</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">SLD / warm nose detection</strong> — supercooled large droplet risk from vertical temperature profile scanning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Total icing exposure</strong> — minutes in icing broken down by climb, cruise, and descent (for TKS fluid planning)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Confidence &amp; agreement</strong> — HIGH / MODERATE / LOW with unanimous, majority, or split</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300 mb-1">Safety-First Consensus</p>
                <p className="text-sm text-white/60">
                  For icing, PlaneWX uses <strong className="text-white">worst-case</strong> across models. If any model predicts 
                  moderate icing at your cruise altitude, the consensus reflects moderate icing — even if the other two models 
                  show light. Missing icing has severe consequences; we err on the side of caution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Turbulence Deep Dive */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Wind className="h-6 w-6 text-amber-400" />
            </div>
            <h2 className="text-3xl font-bold">Multi-Model Turbulence Analysis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Physics</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                PlaneWX derives Clear Air Turbulence from two fundamental atmospheric quantities computed 
                at every altitude level from each model&rsquo;s wind and temperature fields.
              </p>
              <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h4 className="font-semibold text-amber-400 mb-2">Vertical Wind Shear</h4>
                <p className="text-sm text-white/60 mb-3">
                  The change in wind speed between two altitude levels (kt/1000ft). When wind speed changes 
                  rapidly with altitude — near jet streams, fronts, or inversions — the resulting shear generates turbulence.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                    <p className="font-bold text-yellow-400">≥12</p>
                    <p className="text-white/50">Light</p>
                  </div>
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                    <p className="font-bold text-amber-400">≥20</p>
                    <p className="text-white/50">Moderate</p>
                  </div>
                  <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                    <p className="font-bold text-red-400">≥30</p>
                    <p className="text-white/50">Severe</p>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-2">kt/1000ft — calibrated for bulk-layer model resolution</p>
              </div>
              <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h4 className="font-semibold text-amber-400 mb-2">Richardson Number (Ri)</h4>
                <p className="text-sm text-white/60 mb-3">
                  The stability gate. Ri measures the balance between thermal stability (which suppresses turbulence) and 
                  wind shear (which generates it). Think of it as the door — it must be open for turbulence to occur.
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="text-white/70"><strong className="text-white">Ri &lt; 0.25:</strong> Dynamically unstable — turbulence likely</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-white/70"><strong className="text-white">Ri 0.25–1.0:</strong> Transitional — turbulence possible, capped at moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="text-white/70"><strong className="text-white">Ri &gt; 1.0:</strong> Stable — turbulence suppressed regardless of shear</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Median-Based Consensus</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Unlike icing (where we use worst-case), turbulence consensus uses the <strong className="text-white">median</strong> across 
                models. Wind field differences can cause one model to see moderate shear where others see none — using the maximum 
                would produce too many false alarms.
              </p>
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-semibold mb-3">Why median, not worst-case?</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                    <span><strong className="text-white">Icing is binary</strong> — you&rsquo;re in it or you&rsquo;re not. Missing it has severe consequences.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                    <span><strong className="text-white">Turbulence is a spectrum</strong> — model noise can dominate worst-case logic.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                    <span><strong className="text-white">Per-model columns</strong> — you can still see each model&rsquo;s individual assessment and make your own judgment.</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-6">What We Detect</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-semibold text-green-400 text-sm mb-1">Model Analysis</p>
                  <ul className="text-xs text-white/60 space-y-1">
                    <li>• Jet stream CAT</li>
                    <li>• Upper-level wind shear</li>
                    <li>• Frontal zone turbulence</li>
                    <li>• Tropopause-level shear</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-semibold text-amber-400 text-sm mb-1">PIREPs &amp; G-AIRMETs</p>
                  <ul className="text-xs text-white/60 space-y-1">
                    <li>• Convective turbulence</li>
                    <li>• Mountain wave</li>
                    <li>• Mechanical turbulence</li>
                    <li>• Low-level wind shear</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-white/40">
                Together, model analysis and observation data cover the full spectrum of turbulence types.
              </p>
            </div>
          </div>
        </section>

        {/* Observation Corroboration */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Corroborated by Real-World Observations</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Model predictions are powerful, but they&rsquo;re forecasts — not observations. PlaneWX fuses model output 
              with PIREPs, AIRMETs, G-AIRMETs, and SIGMETs to produce a single, coherent assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold">PIREP Fusion</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">PIREPs confirm model</strong> → Confidence boosted</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Negative PIREPs in model zone</strong> → Confidence lowered</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">PIREPs where model says none</strong> → PIREP severity adopted, layer bounds updated</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">PIREPs exceed model</strong> → Prioritized as ground truth</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 space-y-4">
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-violet-400" />
                <h3 className="text-lg font-semibold">AIRMET &amp; SIGMET Fusion</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Active G-AIRMET + model agreement</strong> → Corroborated, confidence boosted</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Active AIRMET, model shows none</strong> → Model upgraded to trace</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">G-AIRMET freezing level</strong> → Caps or corrects model freezing levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">SIGMETs</strong> → Always override model predictions for severe conditions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20 text-center">
            <p className="text-white/80">
              <strong className="text-sky-400">This corroboration loop is unique to PlaneWX.</strong> Traditional tools show 
              model overlays, G-AIRMETs, and PIREPs as separate layers. PlaneWX synthesizes them into a single, coherent 
              assessment with transparent confidence — so you know not just <em>what</em> to expect, but <em>how much to trust it</em>.
            </p>
          </div>
        </section>

        {/* Full Transparency */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Full Transparency</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Most weather apps present conclusions without evidence. PlaneWX shows you everything.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
              <Eye className="h-8 w-8 text-sky-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Raw Data Tables</h3>
              <p className="text-sm text-white/50">Temperature, RH, wind, shear, Ri at every sample point and altitude — per model</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
              <BarChart3 className="h-8 w-8 text-sky-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Per-Model Columns</h3>
              <p className="text-sm text-white/50">See each model&rsquo;s individual assessment. Disagree with the consensus? The data is there.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
              <Info className="h-8 w-8 text-sky-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Section Sources</h3>
              <p className="text-sm text-white/50">Tap &ldquo;Sources&rdquo; on any briefing section to see exactly which products contributed</p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">How This Compares</h2>
            <p className="text-white/60">PlaneWX vs. what pilots have today</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-semibold">Capability</th>
                  <th className="text-center py-3 px-3 text-sky-400 font-semibold">PlaneWX</th>
                  <th className="text-center py-3 px-3 text-white/40 font-semibold">Traditional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ["Multi-model comparison", "3 independent models", "Single product"],
                  ["Confidence scoring", "Unanimous / Majority / Split", "Not available"],
                  ["Route-specific sampling", "3–7 points along YOUR route", "Broad geographic areas"],
                  ["Altitude-specific assessment", "8 pressure levels per point", "Altitude range only"],
                  ["Cloud layer boundaries", "RH-derived at each sample point", "Not provided"],
                  ["Ice type prediction", "Clear / rime / mixed", "Not provided"],
                  ["SLD / warm nose detection", "Temperature profile scanning", "SLD AIRMETs only"],
                  ["Total icing exposure", "Climb / cruise / descent minutes", "Not calculated"],
                  ["Turbulence physics", "Wind shear + Richardson number", "Not available to pilots"],
                  ["PIREP / AIRMET corroboration", "Fused with model output", "Displayed separately"],
                  ["Personal minimums", "Soft + hard limits per aircraft", "Generic severity"],
                  ["Raw data access", "Full transparency", "Conclusions only"],
                ].map(([capability, planewx, traditional]) => (
                  <tr key={capability}>
                    <td className="py-3 px-4 text-white/70">{capability}</td>
                    <td className="py-3 px-3 text-center text-emerald-400 font-medium">{planewx}</td>
                    <td className="py-3 px-3 text-center text-white/30">{traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Personal Minimums */}
        <section className="space-y-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-teal-950/50 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-emerald-400" />
              <h2 className="text-2xl font-bold">Tailored to Your Aircraft</h2>
            </div>
            <p className="text-white/70 mb-6">
              The same icing conditions produce very different WX Scores for different pilots — and that&rsquo;s by design. 
              PlaneWX applies your personal minimums and aircraft capabilities to every analysis.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <h3 className="font-semibold text-amber-400 mb-2">Comfort (Soft Limit)</h3>
                <p className="text-sm text-white/60">
                  The severity you&rsquo;re comfortable with. Exceeding this enters the caution zone with graduated deductions.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-red-400 mb-2">Limit (Hard Limit)</h3>
                <p className="text-sm text-white/60">
                  Your absolute maximum. Exceeding this is unfavorable — WX Score drops to 0%. 
                  Non-FIKI aircraft are always unfavorable for any icing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold">
            See It in Your Next Briefing
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Start a free trial and create a briefing for your next flight. You&rsquo;ll see multi-model icing and turbulence 
            analysis, confidence scoring, and full data transparency — all tailored to your aircraft and minimums.
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
        <div className="container mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">© {new Date().getFullYear()} PlaneWX, LLC — Weather Intelligence for Pilots. All rights reserved.</p>
          <p className="text-xs text-white/30">
            Weather data sourced from NOAA (HRRR, GFS), ECMWF, and FAA. 
            The pilot in command makes the final go/no-go decision.
          </p>
        </div>
      </footer>
    </div>
  )
}
