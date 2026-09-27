import { describe, expect, it } from "vitest"
import {
  isProductionTrackingHost,
  resolveGaDebugOptIn,
  resolveTrackingLoad,
} from "./tracking-host"

describe("isProductionTrackingHost", () => {
  it("allows exact production hosts", () => {
    expect(isProductionTrackingHost("www.planewx.ai")).toBe(true)
    expect(isProductionTrackingHost("planewx.ai")).toBe(true)
  })

  it("rejects lookalikes, previews, local, app, and other planewx hosts", () => {
    expect(isProductionTrackingHost("www.planewx.ai.evil.com")).toBe(false)
    expect(isProductionTrackingHost("planewx-landing-git-x-planewx.vercel.app")).toBe(false)
    expect(isProductionTrackingHost("dev2.planewx.ai")).toBe(false)
    expect(isProductionTrackingHost("app.planewx.ai")).toBe(false)
    expect(isProductionTrackingHost("localhost")).toBe(false)
    expect(isProductionTrackingHost("127.0.0.1")).toBe(false)
    expect(isProductionTrackingHost("planewx.ai.attacker.test")).toBe(false)
    expect(isProductionTrackingHost("")).toBe(false)
  })
})

describe("resolveGaDebugOptIn", () => {
  it("persists ?ga_debug=1 into sessionStorage and reads it back", () => {
    const store = new Map<string, string>()
    const session = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v)
      },
      removeItem: (k: string) => {
        store.delete(k)
      },
    }

    expect(resolveGaDebugOptIn("?ga_debug=1", session)).toBe(true)
    expect(store.get("planewx_ga_debug")).toBe("1")
    expect(resolveGaDebugOptIn("", session)).toBe(true)
  })

  it("clears the session flag when ?ga_debug=0", () => {
    const store = new Map<string, string>([["planewx_ga_debug", "1"]])
    const session = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v)
      },
      removeItem: (k: string) => {
        store.delete(k)
      },
    }
    expect(resolveGaDebugOptIn("?ga_debug=0", session)).toBe(false)
    expect(store.has("planewx_ga_debug")).toBe(false)
    expect(resolveGaDebugOptIn("", session)).toBe(false)
  })

  it("is false when flag is absent and session is empty", () => {
    const store = new Map<string, string>()
    const session = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v)
      },
      removeItem: (k: string) => {
        store.delete(k)
      },
    }
    expect(resolveGaDebugOptIn("", session)).toBe(false)
    expect(resolveGaDebugOptIn("?ref=FOO", session)).toBe(false)
  })
})

describe("resolveTrackingLoad", () => {
  it("loads nothing before a cookie choice", () => {
    const plan = resolveTrackingLoad({
      hostname: "www.planewx.ai",
      gaDebug: false,
      analytics: true,
      marketing: true,
      hasChoice: false,
    })
    expect(plan.loadGa).toBe(false)
    expect(plan.loadMarketing).toBe(false)
  })

  it("loads GA and marketing on production after Accept all", () => {
    const plan = resolveTrackingLoad({
      hostname: "www.planewx.ai",
      gaDebug: false,
      analytics: true,
      marketing: true,
      hasChoice: true,
    })
    expect(plan.loadGa).toBe(true)
    expect(plan.loadMarketing).toBe(true)
    expect(plan.debugMode).toBe(false)
  })

  it("loads nothing on preview without ga_debug even after Accept all", () => {
    const plan = resolveTrackingLoad({
      hostname: "planewx-landing-git-x-planewx.vercel.app",
      gaDebug: false,
      analytics: true,
      marketing: true,
      hasChoice: true,
    })
    expect(plan.loadGa).toBe(false)
    expect(plan.loadMarketing).toBe(false)
  })

  it("with ga_debug on preview, loads GA with debug_mode only when analytics is granted", () => {
    const denied = resolveTrackingLoad({
      hostname: "localhost",
      gaDebug: true,
      analytics: false,
      marketing: true,
      hasChoice: true,
    })
    expect(denied.loadGa).toBe(false)
    expect(denied.loadMarketing).toBe(false)

    const allowed = resolveTrackingLoad({
      hostname: "localhost",
      gaDebug: true,
      analytics: true,
      marketing: true,
      hasChoice: true,
    })
    expect(allowed.loadGa).toBe(true)
    expect(allowed.debugMode).toBe(true)
    expect(allowed.loadMarketing).toBe(false)
  })

  it("Essential only loads no trackers on production", () => {
    const plan = resolveTrackingLoad({
      hostname: "planewx.ai",
      gaDebug: false,
      analytics: false,
      marketing: false,
      hasChoice: true,
    })
    expect(plan.loadGa).toBe(false)
    expect(plan.loadMarketing).toBe(false)
  })
})
