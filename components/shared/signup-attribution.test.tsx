/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { SignUpButton } from "@/components/shared/sign-up-button"
import { FooterCTA } from "@/components/shared/footer-cta"
import { PricingSection } from "@/components/shared/pricing-section"
import {
  REFERRAL_STORAGE_KEY,
  UTM_SESSION_KEY,
  appendSignupAttribution,
  resolveSignupAttribution,
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
const SIGNUP_TAGGED =
  "https://app.planewx.ai/auth/sign-up?lp=a&utm_source=flightfollower&utm_medium=partner&utm_campaign=flightfollower-2026&ref=FLIGHTFOLLOWER"

function go(path: string) {
  window.history.replaceState({}, "", path)
}

describe("sign-up links carry UTMs and ref to the app", () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
  afterEach(() => {
    cleanup()
    go("/")
  })

  it("SignUpButton href carries the partner UTMs and ref, in that order", () => {
    go(TAGGED)
    render(<SignUpButton variant="a">Start</SignUpButton>)
    expect(screen.getByRole("link", { name: "Start" }).getAttribute("href")).toBe(SIGNUP_TAGGED)
    expect(localStorage.getItem(REFERRAL_STORAGE_KEY)).toBe("FLIGHTFOLLOWER")
  })

  it("FooterCTA and PricingSection trial links carry the same attribution", () => {
    go(TAGGED)
    render(<FooterCTA variant="a" />)
    render(<PricingSection variant="a" />)
    const trial = screen.getAllByRole("link", { name: /Start Free 14-Day Trial/ })
    expect(trial.length).toBeGreaterThan(1)
    for (const a of trial) expect(a.getAttribute("href")).toBe(SIGNUP_TAGGED)
  })

  it("keeps UTMs and ref after an in-session navigation to a page without them", () => {
    go(TAGGED)
    render(<SignUpButton variant="a">First</SignUpButton>)
    cleanup()
    go("/pricing")
    render(<SignUpButton variant="a">Later</SignUpButton>)
    expect(screen.getByRole("link", { name: "Later" }).getAttribute("href")).toBe(SIGNUP_TAGGED)
  })

  it("a visitor's own UTMs win over stored ones and are passed through untouched", () => {
    sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify([["utm_source", "flightfollower"]]))
    go("/flightfollower?utm_source=newsletter&utm_medium=email&ref=FLIGHTFOLLOWER")
    render(<SignUpButton variant="a">Go</SignUpButton>)
    expect(screen.getByRole("link", { name: "Go" }).getAttribute("href")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=a&utm_source=newsletter&utm_medium=email&ref=FLIGHTFOLLOWER",
    )
  })

  it("still carries a stored ref when there are no UTMs (old behavior)", () => {
    localStorage.setItem(REFERRAL_STORAGE_KEY, "FLIGHTCHOPS")
    go("/")
    render(<SignUpButton variant="a">Ref</SignUpButton>)
    expect(screen.getByRole("link", { name: "Ref" }).getAttribute("href")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=a&ref=FLIGHTCHOPS",
    )
  })

  it("leaves the link bare when there is nothing to carry", () => {
    go("/")
    render(<SignUpButton variant="a">Bare</SignUpButton>)
    expect(screen.getByRole("link", { name: "Bare" }).getAttribute("href")).toBe(
      "https://app.planewx.ai/auth/sign-up?lp=a",
    )
  })
})

describe("signup attribution helpers", () => {
  it("ignores blank UTMs and uppercases ref", () => {
    const a = resolveSignupAttribution("?utm_source=&ref=flightfollower", null, null)
    expect(a).toEqual({ ref: "FLIGHTFOLLOWER", utm: [] })
  })

  it("does not duplicate keys the base URL already has", () => {
    const out = appendSignupAttribution("https://app.planewx.ai/auth/sign-up?lp=a&ref=X", {
      ref: "FLIGHTFOLLOWER",
      utm: [["utm_source", "youtube"]],
    })
    expect(out).toBe("https://app.planewx.ai/auth/sign-up?lp=a&ref=X&utm_source=youtube")
  })

  it("survives blocked storage", () => {
    const blocked = {
      getItem: () => {
        throw new Error("blocked")
      },
      setItem: () => {
        throw new Error("blocked")
      },
    } as unknown as Storage
    expect(resolveSignupAttribution("?utm_source=yt&ref=A1", blocked, blocked)).toEqual({
      ref: "A1",
      utm: [["utm_source", "yt"]],
    })
  })

  it("Log In links carry no utm or ref, so returning users are not counted as partner traffic", () => {
    go(TAGGED)
    render(
      <SignUpButton variant="a" path="/">
        Log In
      </SignUpButton>,
    )
    expect(screen.getByText("Log In").getAttribute("href")).toBe("https://app.planewx.ai?lp=a")
  })
})
