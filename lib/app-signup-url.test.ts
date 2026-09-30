import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import {
  APP_ORIGIN,
  APP_SIGN_UP_PATH,
  buildAppSignupUrl,
  buildAppSignupUrlWithLp,
} from "./app-signup-url"

describe("buildAppSignupUrl", () => {
  it("builds the sign-up path with no query", () => {
    expect(buildAppSignupUrl()).toBe(`${APP_ORIGIN}${APP_SIGN_UP_PATH}`)
  })

  it("keeps lp and other query params on /auth/sign-up", () => {
    expect(buildAppSignupUrl("lp=a")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=a",
    )
    expect(buildAppSignupUrl("?lp=b")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=b",
    )
    expect(buildAppSignupUrl({ lp: "c", utm_source: "web" })).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=c&utm_source=web",
    )
    expect(buildAppSignupUrl(new URLSearchParams({ lp: "d" }))).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=d",
    )
  })

  it("buildAppSignupUrlWithLp preserves the variant", () => {
    expect(buildAppSignupUrlWithLp("a")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=a",
    )
    expect(buildAppSignupUrlWithLp("osh")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=osh",
    )
  })
})

/**
 * Signup/trial CTA sources that must never point at the bare app root.
 * Log In / Open App / browser openers are intentionally excluded.
 */
const SIGNUP_CTA_SOURCES = [
  "components/shared/footer-cta.tsx",
  "components/shared/pricing-section.tsx",
  "app/multi-model-analysis/page.tsx",
  "app/research/turbulence-safety/page.tsx",
  "app/research/mountain-wave-validation/page.tsx",
  "app/learn/page.tsx",
  "app/learn/[slug]/page.tsx",
  "app/partners/page.tsx",
  "app/ambassadors/page.tsx",
] as const

/** Bare app root with optional trailing slash and optional query (no path). */
const BARE_APP_ROOT =
  /https:\/\/app\.planewx\.ai\/?(?:\?[^"'`\s]*)?["'`]/g

describe("signup CTA sources avoid bare app root", () => {
  it("does not use https://app.planewx.ai (root) as a href target in signup CTA files", () => {
    const root = process.cwd()
    const offenders: string[] = []

    for (const rel of SIGNUP_CTA_SOURCES) {
      const full = path.join(root, rel)
      const source = fs.readFileSync(full, "utf8")
      // pricing-section may still reference APP_ORIGIN for /help/* links only.
      if (rel === "components/shared/pricing-section.tsx") {
        const trialBase = source.match(
          /const baseUrl = ([^\n]+)/,
        )?.[1]
        expect(trialBase, "pricing trial baseUrl").toMatch(
          /buildAppSignupUrlWithLp/,
        )
        continue
      }
      if (rel === "components/shared/footer-cta.tsx") {
        expect(source).toMatch(/buildAppSignupUrlWithLp/)
        expect(source).not.toMatch(
          /https:\/\/app\.planewx\.ai\?lp=/,
        )
        continue
      }
      const matches = source.match(BARE_APP_ROOT) ?? []
      for (const m of matches) {
        offenders.push(`${rel}: ${m}`)
      }
    }

    expect(offenders).toEqual([])
  })
})
