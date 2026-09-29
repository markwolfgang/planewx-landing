/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { VariantTracker } from "@/components/shared/variant-tracker"
import { applyTrackingTransition } from "@/components/tracking-scripts"
import {
  GA_MEASUREMENT_ID,
  GTAG_READY_EVENT,
  META_READY_EVENT,
  isGtagReady,
  resetTrackingReadyFlags,
  signalGtagReady,
  signalMetaReady,
} from "@/lib/tracking-runtime"

describe("landing_variant_view gtag-ready queue", () => {
  beforeEach(() => {
    resetTrackingReadyFlags()
    delete window.gtag
    delete window.fbq
    delete window.dataLayer
  })

  afterEach(() => {
    cleanup()
    resetTrackingReadyFlags()
    delete window.gtag
    delete window.fbq
    delete window.dataLayer
  })

  it("does not fire while only the gtag stub exists (before ready)", () => {
    const gtag = vi.fn()
    window.gtag = gtag
    window.dataLayer = []
    render(<VariantTracker variant="a" />)
    expect(gtag).not.toHaveBeenCalled()
    expect(isGtagReady()).toBe(false)
  })

  it("fires once after GTAG_READY_EVENT, not on the stub alone", () => {
    const gtag = vi.fn()
    window.gtag = gtag
    render(<VariantTracker variant="a" />)
    expect(gtag).not.toHaveBeenCalled()

    signalGtagReady()
    signalGtagReady()
    expect(gtag).toHaveBeenCalledTimes(1)
    expect(gtag).toHaveBeenCalledWith("event", "landing_variant_view", { variant: "a" })
  })

  it("fires Meta LandingVariantView only after META_READY_EVENT", () => {
    const fbq = vi.fn()
    window.fbq = fbq
    render(<VariantTracker variant="b" />)
    expect(fbq).not.toHaveBeenCalled()

    signalMetaReady()
    signalMetaReady()
    expect(fbq).toHaveBeenCalledTimes(1)
    expect(fbq).toHaveBeenCalledWith("trackCustom", "LandingVariantView", { variant: "b" })
  })

  it("returning visitor: js, update, and config come before landing_variant_view", async () => {
    resetTrackingReadyFlags()
    delete window.gtag
    delete window.dataLayer
    document.head.innerHTML = ""

    const events: string[] = []
    window.addEventListener(GTAG_READY_EVENT, () => {
      events.push("ready")
    })

    // Mount tracker before tracking applies (returning visitor with stored consent path).
    render(<VariantTracker variant="a" />)

    await applyTrackingTransition(
      { ga: false, marketing: false },
      { ga: true, marketing: false },
      false,
      false,
      {
        loadGtagJs: async () => {
          events.push("loaded")
        },
        readLatest: () => ({
          active: { ga: true, marketing: false },
          debugMode: false,
        }),
      },
    )

    const layer = (window.dataLayer ?? []).map((entry) => Array.from(entry as IArguments))
    const jsIdx = layer.findIndex((a) => a[0] === "js")
    const updateIdx = layer.findIndex((a) => a[0] === "consent" && a[1] === "update")
    const configIdx = layer.findIndex((a) => a[0] === "config" && a[1] === GA_MEASUREMENT_ID)
    const eventIdx = layer.findIndex(
      (a) => a[0] === "event" && a[1] === "landing_variant_view",
    )

    expect(jsIdx).toBeGreaterThanOrEqual(0)
    expect(updateIdx).toBeGreaterThan(jsIdx)
    expect(configIdx).toBeGreaterThan(updateIdx)
    expect(eventIdx).toBeGreaterThan(configIdx)
    expect(events).toContain("ready")
    void META_READY_EVENT
  })
})
