"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plane, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Brain, 
  Route, 
  Target, 
  Users, 
  Clock, 
  Shield, 
  Sparkles, 
  MapPin, 
  TrendingUp,
  Gauge,
  Check,
  ArrowRight,
  Zap,
  RefreshCw,
  ChevronDown,
  CloudSun,
  Compass,
  Settings2,
  BarChart3
} from "lucide-react"

// Base count for social proof
const WAITLIST_BASE_COUNT = 42

export function LandingPageV2() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [homeAirport, setHomeAirport] = useState("")
  const [xcFlightsPerWeek, setXcFlightsPerWeek] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)

  // Capture referral code from URL
  useEffect(() => {
    const refParam = searchParams.get("ref")
    if (refParam) {
      localStorage.setItem("planewx_referral", refParam.toUpperCase())
      setReferralCode(refParam.toUpperCase())
    } else {
      const storedRef = localStorage.getItem("planewx_referral")
      if (storedRef) {
        setReferralCode(storedRef)
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          homeAirport: homeAirport.trim() || null,
          xcFlightsPerWeek: xcFlightsPerWeek || null,
          referralCode: referralCode || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setErrorMessage(data.error || "Failed to join waitlist. Please try again.")
        return
      }

      setStatus("success")
      setEmail("")
      setHomeAirport("")
      setXcFlightsPerWeek("")
      fetchWaitlistCount()
    } catch (error) {
      console.error("[LandingPage] Error submitting:", error)
      setStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchWaitlistCount = async () => {
    try {
      const response = await fetch("/api/waitlist/count")
      if (response.ok) {
        const data = await response.json()
        setWaitlistCount(WAITLIST_BASE_COUNT + (data.count || 0))
      }
    } catch (error) {
      console.error("[LandingPage] Error fetching waitlist count:", error)
    }
  }

  useEffect(() => {
    fetchWaitlistCount()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/30 via-slate-950 to-slate-950" />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">PlaneWX</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => document.getElementById('founder')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              About
            </button>
          </div>
          <Button 
            size="sm" 
            className="bg-white text-slate-950 hover:bg-white/90 font-medium"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Early Access
          </Button>
        </div>
      </nav>

      {/* Hero Section - Minimal & Bold */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/70">First & only AI-powered aviation weather</span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95]">
              Know if your flight
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent">
                will happen
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              AI synthesizes 15+ weather sources into one personalized GO Score. 
              Plan trips up to 14 days out with 40+ automatic updates.
            </p>
            
            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-white text-slate-950 hover:bg-white/90 px-8 py-6 text-lg font-semibold"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join {waitlistCount?.toLocaleString()}+ Pilots
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem / Solution */}
      <section id="how-it-works" className="relative py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Problem */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                The Problem
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                "We'll know the night before."
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Sound familiar? You plan a trip a week out. You check METARs, TAFs, prog charts. 
                But TAFs only go 24 hours. Everything beyond that is guesswork.
              </p>
              <ul className="space-y-3 text-white/50">
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-rose-400 mt-0.5" />
                  <span>TAFs expire at 24 hours — useless for planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-rose-400 mt-0.5" />
                  <span>Raw data everywhere, no synthesis or explanation</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-rose-400 mt-0.5" />
                  <span>Generic thresholds that don't know your aircraft</span>
                </li>
              </ul>
            </div>
            
            {/* Solution */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                The Solution
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Synoptic Intelligence™
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Our AI ingests 15+ weather products—including NWS forecaster narratives—and synthesizes 
                them into plain-language briefings calibrated to <em>your</em> minimums.
              </p>
              <ul className="space-y-3 text-white/50">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span><strong className="text-white">14-day horizon</strong> with 71% accuracy at 72h</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span><strong className="text-white">Explains the why</strong>, not just the data</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span><strong className="text-white">Per-aircraft minimums</strong> for turbulence, icing, crosswind</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Works - Simple */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              How We Use AI
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Intelligence that helps you decide — not AI that decides for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Ingest */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <CloudSun className="h-6 w-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold">Ingest & Synthesize</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                METARs, TAFs, NBM, GFS MOS, AFDs, PIREPs, AIRMETs, SIGMETs — 15+ sources unified into 
                actionable intelligence with plain-language explanations.
              </p>
            </div>

            {/* Personalize */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Settings2 className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold">Personalize Per Aircraft</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Each aircraft gets its own minimums: ceilings, visibility, crosswind, turbulence tolerance, 
                icing tolerance. Your SR22T is different from that rental 172.
              </p>
            </div>

            {/* Analyze */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Gauge className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold">Calculate Your GO Score</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                A clear 0-100% metric that evolves with every update. Transparent breakdown shows exactly 
                what's impacting your flight. <strong className="text-white">You</strong> make the final call.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <p className="text-amber-200 text-sm">
              <strong>Important:</strong> PlaneWX does NOT make the GO/NO-GO decision for you. 
              We provide intelligence — you provide the judgment. Always file a flight plan and obtain an official briefing.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section id="features" className="relative py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Everything You Need
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 14-Day Planning */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <Clock className="h-8 w-8 text-sky-400" />
              <h3 className="font-semibold">14-Day Horizon</h3>
              <p className="text-sm text-white/50">
                Plan weeks ahead. Confidence levels honestly reflect uncertainty at each stage.
              </p>
            </div>

            {/* 40+ Updates */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <RefreshCw className="h-8 w-8 text-emerald-400" />
              <h3 className="font-semibold">40+ Auto-Updates</h3>
              <p className="text-sm text-white/50">
                Every new TAF, METAR, or AIRMET triggers a briefing refresh. Zero manual effort.
              </p>
            </div>

            {/* Weather Watch */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <MapPin className="h-8 w-8 text-violet-400" />
              <h3 className="font-semibold">Weather Watch</h3>
              <p className="text-sm text-white/50">
                National, Regional, and Corridor views powered by Synoptic Intelligence™.
              </p>
            </div>

            {/* Trip Wizard */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <Sparkles className="h-8 w-8 text-amber-400" />
              <h3 className="font-semibold">Trip Wizard</h3>
              <p className="text-sm text-white/50">
                "I just want to fly" or "I need to be somewhere" — weather picks optimal windows.
              </p>
            </div>

            {/* Trip Crew */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <Users className="h-8 w-8 text-rose-400" />
              <h3 className="font-semibold">Trip Crew</h3>
              <p className="text-sm text-white/50">
                Share updates with family and mentors. They get alerts as departure approaches.
              </p>
            </div>

            {/* PAVE Integration */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <Shield className="h-8 w-8 text-teal-400" />
              <h3 className="font-semibold">PAVE Integration</h3>
              <p className="text-sm text-white/50">
                Risk assessment framework pre-filled from your trip context.
              </p>
            </div>

            {/* Alternative Suggestions */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <Compass className="h-8 w-8 text-orange-400" />
              <h3 className="font-semibold">Smart Alternatives</h3>
              <p className="text-sm text-white/50">
                Marginal conditions? We suggest better departure times and routing options.
              </p>
            </div>

            {/* Email Alerts */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <Zap className="h-8 w-8 text-cyan-400" />
              <h3 className="font-semibold">Smart Alerts</h3>
              <p className="text-sm text-white/50">
                Email when GO score changes or new hazards appear. No constant app checking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Minimums Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Your Minimums. Your Aircraft.
            </h2>
            <p className="text-lg text-white/50">
              Different aircraft, different limits — PlaneWX understands that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-violet-400" />
                Per-Aircraft Minimums
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-violet-400 mt-1" />
                  <div>
                    <strong className="text-white">Departure Ceilings & Visibility</strong>
                    <p className="text-white/50">Set different values for each aircraft</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-violet-400 mt-1" />
                  <div>
                    <strong className="text-white">Arrival Ceilings & Visibility</strong>
                    <p className="text-white/50">Comfortable vs. hard limits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-violet-400 mt-1" />
                  <div>
                    <strong className="text-white">Crosswind Component</strong>
                    <p className="text-white/50">Your comfort level + POH limits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-violet-400 mt-1" />
                  <div>
                    <strong className="text-white">Turbulence Tolerance</strong>
                    <p className="text-white/50">None / Light / Moderate per aircraft</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-violet-400 mt-1" />
                  <div>
                    <strong className="text-white">Icing Tolerance</strong>
                    <p className="text-white/50">Matched to FIKI equipment</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-teal-950/50 border border-emerald-500/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Plane className="h-5 w-5 text-emerald-400" />
                Aircraft-Aware Analysis
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-400 mt-1" />
                  <div>
                    <strong className="text-white">FIKI Capability</strong>
                    <p className="text-white/50">Known ice changes the risk calculation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-400 mt-1" />
                  <div>
                    <strong className="text-white">True Airspeed</strong>
                    <p className="text-white/50">Affects exposure time and fuel planning</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-400 mt-1" />
                  <div>
                    <strong className="text-white">Service Ceiling</strong>
                    <p className="text-white/50">High-altitude jets vs. piston singles</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-400 mt-1" />
                  <div>
                    <strong className="text-white">Equipment</strong>
                    <p className="text-white/50">Autopilot, weather radar, datalink</p>
                  </div>
                </li>
              </ul>
              <p className="text-xs text-white/40 mt-6 italic">
                Flying your SR22T with FIKI? Set tighter minimums. Renting a basic 172? Different aircraft, different limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accuracy Stats */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
              <BarChart3 className="h-4 w-4" />
              Backtested & Validated
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              71% Accuracy at 72 Hours
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              286 predictions tested against actual METAR observations. 
              Correctly predicts VFR-legal vs IFR-required — the distinction that matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">76%</div>
              <div className="text-sm text-white/60">24 Hours Out</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-4xl font-bold text-sky-400 mb-2">70%</div>
              <div className="text-sm text-white/60">48 Hours Out</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">61%</div>
              <div className="text-sm text-white/60">72 Hours Out</div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="relative py-24 px-6 bg-gradient-to-b from-transparent via-sky-950/20 to-transparent">
        <div className="container mx-auto max-w-md">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Get Early Access</CardTitle>
              <CardDescription className="text-white/60">
                Join {waitlistCount?.toLocaleString()}+ pilots on the waitlist
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-emerald-400">You're on the list!</p>
                      <p className="text-sm text-white/60">
                        We'll send you an email when access is available.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setStatus("idle")}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/5"
                  >
                    Add Another Email
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="pilot@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="homeAirport" className="text-white/80">Home Airport</Label>
                    <Input
                      id="homeAirport"
                      type="text"
                      placeholder="KABC"
                      value={homeAirport}
                      onChange={(e) => setHomeAirport(e.target.value.toUpperCase())}
                      maxLength={4}
                      disabled={isSubmitting}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/30 uppercase"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/20 border border-rose-500/30">
                      <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                      <p className="text-sm text-rose-400">{errorMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-white text-slate-950 hover:bg-white/90 font-semibold"
                    disabled={isSubmitting || !email.trim()}
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="relative py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Built by a Pilot, for Pilots</h2>
          <p className="text-lg text-white/60 leading-relaxed mb-6">
            PlaneWX was founded by <strong className="text-white">Mark Wolfgang</strong>, a commercially rated 
            instrument pilot with 800+ hours — including 620 hours of cross-country PIC in 18 months. 
            He built PlaneWX to solve his own frustration: knowing if the flight will happen, days in advance.
          </p>
          <p className="text-sm text-white/40 italic">
            "I got tired of telling my wife 'we'll know the night before.' Now I plan with confidence."
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Plane className="h-6 w-6 text-sky-400" />
              <span className="font-bold">PlaneWX</span>
            </div>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} PlaneWX, LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
              <a href="mailto:contact@planewx.ai?subject=PlaneWX%20Inquiry" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={zoomedImage || ""}
              alt="Zoomed view"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
