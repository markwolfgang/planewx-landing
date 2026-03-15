"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plane, Lock, AlertCircle } from "lucide-react"

function LoginForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const next = searchParams.get("next") || "/brand"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/brand-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push(next)
        router.refresh()
      } else {
        setError("Incorrect password. Contact hello@planewx.ai for access.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white/60 mb-2"
        >
          <Lock className="h-3.5 w-3.5 inline mr-1.5" />
          Portal Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          autoFocus
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40 transition-colors"
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full px-4 py-3 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
      >
        {loading ? "Verifying..." : "Enter Portal"}
      </button>
    </form>
  )
}

export default function BrandLoginPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-6">
            <Plane className="h-8 w-8 text-sky-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            PlaneWX Brand Portal
          </h1>
          <p className="text-white/50 text-sm">
            This portal is for PlaneWX partners and content creators.
          </p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-white/30 text-xs mt-8">
          Need access?{" "}
          <a
            href="mailto:hello@planewx.ai"
            className="text-sky-400/70 hover:text-sky-400 transition-colors"
          >
            hello@planewx.ai
          </a>
        </p>
      </div>
    </div>
  )
}
