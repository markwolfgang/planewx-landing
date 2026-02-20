"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle, Plane } from "lucide-react"

function InviteContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "expired" | "used">("loading")
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setStatus("invalid")
      return
    }

    // Validate the token
    const validateToken = async () => {
      try {
        const response = await fetch(`/api/waitlist/validate-invite?token=${encodeURIComponent(token)}`)
        const data = await response.json()

        if (!response.ok) {
          if (data.reason === "expired") {
            setStatus("expired")
          } else if (data.reason === "used") {
            setStatus("used")
          } else {
            setStatus("invalid")
          }
          return
        }

        setEmail(data.email)
        setStatus("valid")
      } catch (err) {
        console.error("[Invite] Validation error:", err)
        setStatus("invalid")
      }
    }

    validateToken()
  }, [token])

  const handleContinue = () => {
    // Redirect to the main PlaneWX app with the invite token
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.planewx.ai"
    window.location.href = `${appUrl}/auth/sign-up?invite=${token}`
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-900/80 border-slate-700">
          <CardContent className="py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-sky-400 mx-auto mb-4" />
            <p className="text-white/60">Validating your invite...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "invalid") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-900/80 border-slate-700">
          <CardHeader className="text-center">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <CardTitle className="text-white">Invalid Invite</CardTitle>
            <CardDescription className="text-white/60">
              This invite link is not valid. Please check your email for the correct link.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/"}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "expired") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-900/80 border-slate-700">
          <CardHeader className="text-center">
            <XCircle className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <CardTitle className="text-white">Invite Expired</CardTitle>
            <CardDescription className="text-white/60">
              This invite link has expired. Please contact us to request a new invite.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/"}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "used") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-900/80 border-slate-700">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-white">Already Joined!</CardTitle>
            <CardDescription className="text-white/60">
              You&apos;ve already created your account. Head to the app to log in.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => window.location.href = "https://app.planewx.ai"}
              className="bg-sky-600 hover:bg-sky-700"
            >
              Go to PlaneWX →
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Valid invite
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950 to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-slate-900/80 border-slate-700">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Plane className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Welcome to PlaneWX!</CardTitle>
          <CardDescription className="text-white/60 text-base mt-2">
            AI-powered trip planning and weather intelligence for pilots. Your 14-day Pro trial starts when you create your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {email && (
            <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-center">
              <p className="text-sm text-sky-300">
                Invite for: <strong className="text-white">{email}</strong>
              </p>
            </div>
          )}
          
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Trip Planner — weather-aware planning for flexible and fixed trips</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Multi-City Optimizer — best departure sequence for multi-leg trips</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Personalized GO Score — 0-100% metric against your personal minimums</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Corridor Watch — route-specific weather along your flight path</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Trip Watchers — keep stakeholders informed, reduce external pressure</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>PAVE Risk Assessment — integrated checklist pre-filled from your trip</span>
            </div>
          </div>

          {/* Pro Trial Info */}
          <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="text-base font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <span>🎁</span> 14-Day Pro Trial
            </h3>
            <p className="text-white/70 text-sm mb-3">
              Full access to everything — auto-refresh briefings, unlimited trips, Trip Planner, Multi-City Optimizer, email alerts, and more.
            </p>
            <p className="text-white/50 text-xs">
              After your trial, stay on the Free plan or subscribe to Pro ($11.99/mo or $99/yr).
            </p>
          </div>

          <Button 
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-6"
            size="lg"
          >
            Create Your Account →
          </Button>
          
          <p className="text-xs text-center text-white/40">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function InvitePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-900/80 border-slate-700">
          <CardContent className="py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-sky-400 mx-auto mb-4" />
            <p className="text-white/60">Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <InviteContent />
    </Suspense>
  )
}

