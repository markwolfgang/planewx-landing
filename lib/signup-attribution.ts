// MF-1 SCRATCH STUB (never merge): no-op so tests fail on assertions, not imports.
export const REFERRAL_STORAGE_KEY = "planewx_referral"
export const UTM_SESSION_KEY = "planewx_utm"
export type SignupAttribution = { ref: string | null; utm: [string, string][] }
export function resolveSignupAttribution(..._args: unknown[]): SignupAttribution {
  return { ref: null, utm: [] }
}
export function appendSignupAttribution(baseUrl: string, _a: SignupAttribution): string {
  return baseUrl
}
export function signupHrefForCurrentPage(baseUrl: string): string {
  return baseUrl
}
