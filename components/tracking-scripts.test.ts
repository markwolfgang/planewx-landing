/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { applyTrackingTransition } from "@/components/tracking-scripts"
import {
  GA_MEASUREMENT_ID,
  GTAG_READY_EVENT,
  resetTrackingReadyFlags,
} from "@/lib/tracking-runtime"
import { planTrackingTransition } from "@/lib/tracking-runtime"

/**
 * Component-level tracking behavior is covered via planTrackingTransition and
 * applyTrackingTransition (gtag Arguments, mid-load choice, ready-after-config).
 */
describe("TrackingScripts transition contract", () => {
  it("loads gtag once across analytics-then-marketing", () => {
    const a = planTrackingTransition({
      prev: { ga: false, marketing: false },
      next: { ga: true, marketing: false },
      gtagAlreadyLoaded: false,
      debugMode: false,
    })
    const b = planTrackingTransition({
      prev: { ga: true, marketing: false },
      next: { ga: true, marketing: true },
      gtagAlreadyLoaded: true,
      debugMode: false,
    })
    expect(a.type).toBe("apply")
    expect(b.type).toBe("apply")
    if (a.type === "apply" && b.type === "apply") {
      expect(a.callGtagJs).toBe(true)
      expect(b.callGtagJs).toBe(false)
      expect(b.configAds).toBe(true)
    }
  })

  it("reloads on Accept all then Essential only", () => {
    const t = planTrackingTransition({
      prev: { ga: true, marketing: true },
      next: { ga: false, marketing: false },
      gtagAlreadyLoaded: true,
      debugMode: false,
    })
    expect(t.type).toBe("downgrade_reload")
  })
})

describe("applyTrackingTransition mid-load choice (NS2)", () => {
  beforeEach(() => {
    resetTrackingReadyFlags()
    delete window.gtag
    delete window.dataLayer
    document.head.innerHTML = ""
    vi.stubGlobal("location", { ...window.location, reload: vi.fn() })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    resetTrackingReadyFlags()
    delete window.gtag
    delete window.dataLayer
    document.head.innerHTML = ""
  })

  it("after delayed gtag load, uses latest Essential only and does not config GA", async () => {
    let releaseLoad!: () => void
    const loadGate = new Promise<void>((resolve) => {
      releaseLoad = resolve
    })

    const resultPromise = applyTrackingTransition(
      { ga: false, marketing: false },
      { ga: true, marketing: true },
      false,
      false,
      {
        loadGtagJs: async () => {
          await loadGate
        },
        readLatest: () => ({
          active: { ga: false, marketing: false },
          debugMode: false,
        }),
      },
    )

    await Promise.resolve()
    await Promise.resolve()
    releaseLoad()

    const result = await resultPromise
    expect(result.active).toEqual({ ga: false, marketing: false })
    // Script may be present, but js bootstrap never ran.
    expect(result.gtagLoaded).toBe(false)

    const layer = window.dataLayer ?? []
    const asArgs = layer.map((entry) => Array.from(entry as IArguments))
    expect(asArgs.some((a) => a[0] === "config" && a[1] === GA_MEASUREMENT_ID)).toBe(false)
    expect(asArgs.some((a) => a[0] === "consent" && a[1] === "update")).toBe(false)
  })

  it("fires gtag-ready after config, not before", async () => {
    const order: string[] = []
    window.addEventListener(GTAG_READY_EVENT, () => {
      order.push("ready")
    })

    await applyTrackingTransition(
      { ga: false, marketing: false },
      { ga: true, marketing: false },
      false,
      false,
      {
        loadGtagJs: async () => {
          order.push("loaded")
        },
        readLatest: () => ({
          active: { ga: true, marketing: false },
          debugMode: false,
        }),
      },
    )

    const layer = window.dataLayer ?? []
    const asArgs = layer.map((entry) => Array.from(entry as IArguments))
    const configIdx = asArgs.findIndex((a) => a[0] === "config" && a[1] === GA_MEASUREMENT_ID)
    const jsIdx = asArgs.findIndex((a) => a[0] === "js")
    expect(jsIdx).toBeGreaterThanOrEqual(0)
    expect(configIdx).toBeGreaterThan(jsIdx)
    expect(order).toEqual(["loaded", "ready"])
  })

  it("still loads Meta/Reddit when gtag.js fails (ad blocker)", async () => {
    await applyTrackingTransition(
      { ga: false, marketing: false },
      { ga: true, marketing: true },
      false,
      false,
      {
        loadGtagJs: async () => {
          throw new Error("blocked")
        },
        readLatest: () => ({
          active: { ga: true, marketing: true },
          debugMode: false,
        }),
      },
    )

    expect(document.getElementById("planewx-meta-pixel")).toBeTruthy()
    expect(document.getElementById("planewx-reddit-pixel")).toBeTruthy()
  })

  it("re-accept after mid-load deny still runs js then config", async () => {
    let releaseLoad!: () => void
    const loadGate = new Promise<void>((resolve) => {
      releaseLoad = resolve
    })

    const denyPromise = applyTrackingTransition(
      { ga: false, marketing: false },
      { ga: true, marketing: true },
      false,
      false,
      {
        loadGtagJs: async () => {
          await loadGate
        },
        readLatest: () => ({
          active: { ga: false, marketing: false },
          debugMode: false,
        }),
      },
    )
    await Promise.resolve()
    await Promise.resolve()
    releaseLoad()
    const denied = await denyPromise
    expect(denied.gtagLoaded).toBe(false)

    // Clear dataLayer noise from the deny path defaults, then re-accept.
    window.dataLayer = []
    const accepted = await applyTrackingTransition(
      denied.active,
      { ga: true, marketing: true },
      denied.gtagLoaded,
      false,
      {
        loadGtagJs: async () => {
          /* script may already be present; resolve immediately */
        },
        readLatest: () => ({
          active: { ga: true, marketing: true },
          debugMode: false,
        }),
      },
    )

    expect(accepted.gtagLoaded).toBe(true)
    const asArgs = (window.dataLayer ?? []).map((entry) => Array.from(entry as IArguments))
    const jsIdx = asArgs.findIndex((a) => a[0] === "js")
    const updateIdx = asArgs.findIndex((a) => a[0] === "consent" && a[1] === "update")
    const configIdx = asArgs.findIndex((a) => a[0] === "config" && a[1] === GA_MEASUREMENT_ID)
    expect(jsIdx).toBeGreaterThanOrEqual(0)
    expect(updateIdx).toBeGreaterThan(jsIdx)
    expect(configIdx).toBeGreaterThan(updateIdx)
  })
})
