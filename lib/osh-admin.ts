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

export function assertAdminSecret(secret: string | null | undefined): boolean {
  const expected = process.env.WAITLIST_ADMIN_SECRET
  if (!expected) return true // allow if unset (local/dev), same as waitlist admin
  return !!secret && secret === expected
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type RafflePrize = "sunglasses" | "merch"

export function isRafflePrize(value: unknown): value is RafflePrize {
  return value === "sunglasses" || value === "merch"
}
