"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Download, Users, Mail, MapPin, Calendar } from "lucide-react"

interface WaitlistEntry {
  id: string
  email: string
  home_airport: string | null
  xc_flights_per_week: string | null
  created_at: string
  signed_up_at: string | null
  approval_token: string | null
  approval_token_expires_at: string | null
}

export default function WaitlistAdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adminSecret, setAdminSecret] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const fetchWaitlist = async (secret: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/waitlist/list?secret=${encodeURIComponent(secret)}`)
      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid admin secret")
          setAuthenticated(false)
          setLoading(false)
          return
        }
        const data = await response.json()
        setError(data.error || "Failed to fetch waitlist")
        setLoading(false)
        return
      }
      const data = await response.json()
      setEntries(data.entries || [])
      setAuthenticated(true)
    } catch (err) {
      console.error("[WaitlistAdmin] Error:", err)
      setError("Failed to fetch waitlist")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminSecret.trim()) {
      fetchWaitlist(adminSecret.trim())
    }
  }

  const handleExport = () => {
    const csv = [
      ["Email", "Home Airport", "XC Flights/Week", "Created At", "Signed Up At"].join(","),
      ...entries.map((entry) =>
        [
          entry.email,
          entry.home_airport || "",
          entry.xc_flights_per_week || "",
          new Date(entry.created_at).toLocaleString(),
          entry.signed_up_at ? new Date(entry.signed_up_at).toLocaleString() : "",
        ].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const formatXcFlights = (value: string | null) => {
    if (!value) return "Not specified"
    const map: Record<string, string> = {
      less_than_1: "Less than 1",
      "1_to_2": "1-2",
      "3_to_5": "3-5",
      more_than_5: "More than 5",
    }
    return map[value] || value
  }

  const pendingCount = entries.filter((e) => !e.signed_up_at).length
  const signedUpCount = entries.filter((e) => e.signed_up_at).length

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Waitlist Admin</CardTitle>
            <CardDescription>Enter admin secret to view waitlist entries</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Hidden username field for accessibility */}
              <input
                type="text"
                name="username"
                autoComplete="username"
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />
              <div className="space-y-2">
                <Label htmlFor="secret">Admin Secret</Label>
                <Input
                  id="secret"
                  type="password"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  placeholder="Enter admin secret"
                  autoComplete="new-password"
                  autoFocus
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full" disabled={!adminSecret.trim() || loading}>
                {loading ? "Loading..." : "Access Waitlist"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 p-4">
      <div className="container mx-auto max-w-6xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Waitlist Admin
                </CardTitle>
                <CardDescription className="mt-2">
                  {entries.length} total entries • {pendingCount} pending • {signedUpCount} signed up
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => fetchWaitlist(adminSecret)} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button variant="outline" onClick={handleExport} disabled={entries.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : entries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No waitlist entries found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">Email</th>
                      <th className="text-left p-2 font-semibold">Home Airport</th>
                      <th className="text-left p-2 font-semibold">XC Flights/Week</th>
                      <th className="text-left p-2 font-semibold">Created At</th>
                      <th className="text-left p-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {entry.email}
                          </div>
                        </td>
                        <td className="p-2">
                          {entry.home_airport ? (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {entry.home_airport}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="p-2">{formatXcFlights(entry.xc_flights_per_week)}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(entry.created_at).toLocaleString()}
                          </div>
                        </td>
                        <td className="p-2">
                          {entry.signed_up_at ? (
                            <span className="text-green-600 font-medium">Signed Up</span>
                          ) : (
                            <span className="text-blue-600 font-medium">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

