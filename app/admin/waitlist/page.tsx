"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Download, Users, Mail, MapPin, Calendar, Send, CheckCircle, Clock, UserCheck, Trash2, RotateCcw, XCircle, ChevronDown, Link } from "lucide-react"

interface WaitlistEntry {
  id: string
  email: string
  home_airport: string | null
  xc_flights_per_week: string | null
  created_at: string
  status: 'pending' | 'invited' | 'joined' | 'revoked'
  invited_at: string | null
  signed_up_at: string | null
  approval_token: string | null
  approval_token_expires_at: string | null
  referral_code: string | null
}

type ActionType = 'invite' | 'resend' | 'reset' | 'revoke' | 'delete' | 'mark_joined'

export default function WaitlistAdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [actionInProgress, setActionInProgress] = useState<ActionType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [adminSecret, setAdminSecret] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showActionsMenu, setShowActionsMenu] = useState(false)
  const actionsMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target as Node)) {
        setShowActionsMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
      setSelectedIds(new Set()) // Clear selections on refresh
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

  const handleAction = async (action: ActionType) => {
    if (selectedIds.size === 0) return

    // Confirm destructive actions
    if (action === 'delete') {
      if (!confirm(`Are you sure you want to delete ${selectedIds.size} user(s)? This cannot be undone.`)) {
        return
      }
    }
    if (action === 'revoke') {
      if (!confirm(`Are you sure you want to revoke invites for ${selectedIds.size} user(s)?`)) {
        return
      }
    }

    setActionInProgress(action)
    setError(null)
    setSuccessMessage(null)
    setShowActionsMenu(false)

    try {
      const response = await fetch("/api/waitlist/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: Array.from(selectedIds),
          action,
          secret: adminSecret,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || `Failed to ${action}`)
        return
      }

      setSuccessMessage(data.message)
      setSelectedIds(new Set())
      
      // Refresh the list to show updated statuses
      await fetchWaitlist(adminSecret)
    } catch (err) {
      console.error(`[WaitlistAdmin] ${action} error:`, err)
      setError(`Failed to ${action}`)
    } finally {
      setActionInProgress(null)
    }
  }

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === entries.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(entries.map(e => e.id)))
    }
  }

  const handleExport = () => {
    const csv = [
      ["Email", "Home Airport", "XC Flights/Week", "Referred By", "Status", "Created At", "Invited At", "Signed Up At"].join(","),
      ...entries.map((entry) =>
        [
          entry.email,
          entry.home_airport || "",
          entry.xc_flights_per_week || "",
          entry.referral_code || "",
          entry.status || "pending",
          new Date(entry.created_at).toLocaleString(),
          entry.invited_at ? new Date(entry.invited_at).toLocaleString() : "",
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

  const [syncing, setSyncing] = useState(false)

  const handleSyncJoined = async () => {
    setSyncing(true)
    setError(null)
    setSuccessMessage(null)
    try {
      const response = await fetch("/api/waitlist/sync-joined", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: adminSecret })
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || "Failed to sync")
        return
      }
      if (data.synced > 0) {
        setSuccessMessage(`Synced ${data.synced} user(s) as joined: ${data.emails?.join(", ")}`)
        // Refresh the list
        await fetchWaitlist(adminSecret)
      } else {
        setSuccessMessage(data.message || "No users to sync")
      }
    } catch (err) {
      console.error("[SyncJoined] Error:", err)
      setError("Failed to sync joined users")
    } finally {
      setSyncing(false)
    }
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

  const getStatusBadge = (entry: WaitlistEntry) => {
    const status = entry.status || (entry.signed_up_at ? 'joined' : 'pending')
    
    switch (status) {
      case 'joined':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <UserCheck className="h-3 w-3" />
            Joined
          </span>
        )
      case 'invited':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Send className="h-3 w-3" />
            Invited
          </span>
        )
      case 'revoked':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="h-3 w-3" />
            Revoked
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        )
    }
  }

  const pendingCount = entries.filter((e) => !e.status || e.status === 'pending').length
  const invitedCount = entries.filter((e) => e.status === 'invited').length
  const joinedCount = entries.filter((e) => e.status === 'joined' || e.signed_up_at).length
  const revokedCount = entries.filter((e) => e.status === 'revoked').length

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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Waitlist Admin
                </CardTitle>
                <CardDescription className="mt-2 flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4 text-amber-500" />
                    {pendingCount} pending
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Send className="h-4 w-4 text-blue-500" />
                    {invitedCount} invited
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    {joinedCount} joined
                  </span>
                  {revokedCount > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-500" />
                      {revokedCount} revoked
                    </span>
                  )}
                </CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                {selectedIds.size > 0 && (
                  <div className="relative" ref={actionsMenuRef}>
                    <Button 
                      onClick={() => setShowActionsMenu(!showActionsMenu)}
                      disabled={actionInProgress !== null}
                      className="bg-sky-600 hover:bg-sky-700"
                    >
                      {actionInProgress ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Actions ({selectedIds.size})
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    {showActionsMenu && !actionInProgress && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleAction('invite')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            <Send className="h-4 w-4 text-blue-500" />
                            Send Invite
                          </button>
                          <button
                            onClick={() => handleAction('resend')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            <Send className="h-4 w-4 text-blue-500" />
                            Resend Invite
                          </button>
                          <button
                            onClick={() => handleAction('reset')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            <RotateCcw className="h-4 w-4 text-amber-500" />
                            Reset to Pending
                          </button>
                          <button
                            onClick={() => handleAction('mark_joined')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            <UserCheck className="h-4 w-4 text-green-500" />
                            Mark as Joined
                          </button>
                          <hr className="my-1 border-gray-200 dark:border-slate-700" />
                          <button
                            onClick={() => handleAction('revoke')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 text-orange-600"
                          >
                            <XCircle className="h-4 w-4" />
                            Revoke Invite
                          </button>
                          <button
                            onClick={() => handleAction('delete')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete User(s)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Button variant="outline" onClick={() => fetchWaitlist(adminSecret)} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button variant="outline" onClick={handleExport} disabled={entries.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" onClick={handleSyncJoined} disabled={syncing}>
                  <UserCheck className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
                  Sync Joined
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {successMessage}
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : entries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No waitlist entries found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 w-10">
                        <input
                          type="checkbox"
                          checked={entries.length > 0 && selectedIds.size === entries.length}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 rounded border-gray-300"
                          title="Select all"
                        />
                      </th>
                      <th className="text-left p-2 font-semibold">Email</th>
                      <th className="text-left p-2 font-semibold">Home Airport</th>
                      <th className="text-left p-2 font-semibold">XC Flights/Week</th>
                      <th className="text-left p-2 font-semibold">Referred By</th>
                      <th className="text-left p-2 font-semibold">Created At</th>
                      <th className="text-left p-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => {
                      return (
                        <tr 
                          key={entry.id} 
                          className={`border-b hover:bg-muted/50 ${selectedIds.has(entry.id) ? 'bg-sky-50 dark:bg-sky-900/20' : ''}`}
                        >
                          <td className="p-2">
                            <input
                              type="checkbox"
                              checked={selectedIds.has(entry.id)}
                              onChange={() => toggleSelection(entry.id)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          </td>
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
                            {entry.referral_code ? (
                              <div className="flex items-center gap-2">
                                <Link className="h-4 w-4 text-emerald-500" />
                                <span className="font-mono text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded">
                                  {entry.referral_code}
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div>{new Date(entry.created_at).toLocaleDateString()}</div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            {getStatusBadge(entry)}
                            {entry.invited_at && entry.status === 'invited' && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Sent {new Date(entry.invited_at).toLocaleDateString()} {new Date(entry.invited_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    })}
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
