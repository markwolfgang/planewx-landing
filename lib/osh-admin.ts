import { createClient, type SupabaseClient } from "@supabase/supabase-js"

export function getOshSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseServiceKey) return null

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Admin auth for the OSH routes lives in lib/admin-auth.ts (server only, fails closed).
// This file is also imported by the /osh/admin client page, so keep it free of node imports.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type RafflePrize = "sunglasses" | "merch"
export type RaffleAttendance = "meetup" | "talk" | "both"
export type RaffleDrawEvent = "meetup" | "talk"

export function isRafflePrize(value: unknown): value is RafflePrize {
  return value === "sunglasses" || value === "merch"
}

export function isRaffleAttendance(value: unknown): value is RaffleAttendance {
  return value === "meetup" || value === "talk" || value === "both"
}

export function isRaffleDrawEvent(value: unknown): value is RaffleDrawEvent {
  return value === "meetup" || value === "talk"
}

export function attendanceEligibleForEvent(
  attendance: string | null | undefined,
  event: RaffleDrawEvent,
): boolean {
  const a = attendance || "both"
  return a === "both" || a === event
}

export function attendanceLabel(attendance: string | null | undefined): string {
  switch (attendance) {
    case "meetup":
      return "Meetup"
    case "talk":
      return "Forum talk"
    case "both":
      return "Both"
    default:
      return "Both"
  }
}

export function drawEventLabel(event: string | null | undefined): string {
  return event === "talk" ? "Forum talk" : "Meetup"
}
