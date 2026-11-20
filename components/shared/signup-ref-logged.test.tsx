/**
 * @vitest-environment jsdom
 */
import { act, cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { SignUpButton } from "@/components/shared/sign-up-button"
import { VariantTracker } from "@/components/shared/variant-tracker"
import {
  CAMPAIGN_VISIT_LOGGED_EVENT,
  REF_LOGGED_PARAM,
  appendSignupAttribution,
  wwwLoggedVisitThisSession,
} from "@/lib/signup-attribution"

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

const TAGGED =
  "/flightfollower?utm_source=flightfollower&utm_medium=partner&utm_campaign=flightfollower-2026&ref=FLIGHTFOLLOWER"
const SIGNUP_LOGGED =
  "https://app.planewx.ai/auth/sign-up?lp=a&utm_source=flightfollower&utm_medium=partner&utm_campaign=flightfollower-2026&ref=FLIGHTFOLLOWER&ref_logged=1"

function go(path: string) {
  window.history.replaceState({}, "", path)
}

describe("sign-up link tells the app that www already logged this ref", () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("{}"))))
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    go("/")
  })

  it("adds ref_logged=1 when VariantTracker logs the visit after the button mounted", () => {
    go(TAGGED)
    render(
      <>
        <SignUpButton variant="a">Start</SignUpButton>
        <VariantTracker variant="a" />
      </>,
    )
    expect(screen.getByRole("link", { name: "Start" }).getAttribute("href")).toBe(SIGNUP_LOGGED)
  })

  it("adds ref_logged=1 when VariantTracker ran first", () => {
    go(TAGGED)
    render(
      <>
        <VariantTracker variant="a" />
        <SignUpButton variant="a">Start</SignUpButton>
      </>,
    )
    expect(screen.getByRole("link", { name: "Start" }).getAttribute("href")).toBe(SIGNUP_LOGGED)
  })

  it("adds the marker on a later page in the same session (visit already logged)", () => {
    sessionStorage.setItem("planewx_visit_fired_FLIGHTFOLLOWER", "1")
    localStorage.setItem("planewx_referral", "FLIGHTFOLLOWER")
    go("/pricing")
    render(<SignUpButton variant="a">Later</SignUpButton>)
    expect(screen.getByRole("link", { name: "Later" }).getAttribute("href")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=a&ref=FLIGHTFOLLOWER&ref_logged=1",
    )
  })

  it("no marker when www did not log this ref this session (stored ref from an old session)", () => {
    localStorage.setItem("planewx_referral", "FLIGHTFOLLOWER")
    go("/pricing")
    render(<SignUpButton variant="a">Old</SignUpButton>)
    expect(screen.getByRole("link", { name: "Old" }).getAttribute("href")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=a&ref=FLIGHTFOLLOWER",
    )
  })

  it("no marker when the logged visit was for a different code", () => {
    sessionStorage.setItem("planewx_visit_fired_FLIGHTCHOPS", "1")
    localStorage.setItem("planewx_referral", "FLIGHTFOLLOWER")
    go("/pricing")
    render(<SignUpButton variant="a">Other</SignUpButton>)
    expect(screen.getByRole("link", { name: "Other" }).getAttribute("href")).not.toContain(REF_LOGGED_PARAM)
  })

  it("updates an already mounted link when the visit logged event fires", () => {
    localStorage.setItem("planewx_referral", "FLIGHTFOLLOWER")
    go("/pricing")
    render(<SignUpButton variant="a">Ev</SignUpButton>)
    expect(screen.getByRole("link", { name: "Ev" }).getAttribute("href")).not.toContain(REF_LOGGED_PARAM)
    act(() => {
      sessionStorage.setItem("planewx_visit_fired_FLIGHTFOLLOWER", "1")
      window.dispatchEvent(new CustomEvent(CAMPAIGN_VISIT_LOGGED_EVENT, { detail: { code: "FLIGHTFOLLOWER" } }))
    })
    expect(screen.getByRole("link", { name: "Ev" }).getAttribute("href")).toContain("&ref_logged=1")
  })
})

describe("ref_logged helpers", () => {
  it("wwwLoggedVisitThisSession reads the VariantTracker session key and survives blocked storage", () => {
    sessionStorage.setItem("planewx_visit_fired_RUNWAY", "1")
    expect(wwwLoggedVisitThisSession(sessionStorage, "RUNWAY")).toBe(true)
    expect(wwwLoggedVisitThisSession(sessionStorage, "FLIGHTCHOPS")).toBe(false)
    expect(wwwLoggedVisitThisSession(null, "RUNWAY")).toBe(false)
    const blocked = { getItem: () => { throw new Error("blocked") } } as unknown as Storage
    expect(wwwLoggedVisitThisSession(blocked, "RUNWAY")).toBe(false)
  })

  it("appendSignupAttribution adds the marker only with a ref, after ref", () => {
    expect(
      appendSignupAttribution("https://app.planewx.ai/auth/sign-up?lp=a", { ref: "RUNWAY", utm: [], refLogged: true }),
    ).toBe("https://app.planewx.ai/auth/sign-up?lp=a&ref=RUNWAY&ref_logged=1")
    expect(
      appendSignupAttribution("https://app.planewx.ai/auth/sign-up?lp=a", { ref: null, utm: [], refLogged: true }),
    ).toBe("https://app.planewx.ai/auth/sign-up?lp=a")
  })
})
