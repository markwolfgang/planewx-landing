/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest"
import { GTAG_READY_EVENT } from "./tracking-runtime"

describe("landing_variant_view gtag-ready queue", () => {
  it("fires once after GTAG_READY_EVENT when gtag was missing on mount", () => {
    const gtag = vi.fn()
    // Simulate mount with no gtag, then ready signal.
    let fired = false
    const fire = () => {
      if (fired) return
      if (typeof (window as Window & { gtag?: unknown }).gtag !== "function") return
      fired = true
      ;(window as Window & { gtag: (...a: unknown[]) => void }).gtag(
        "event",
        "landing_variant_view",
        { variant: "a" },
      )
    }
    window.addEventListener(GTAG_READY_EVENT, fire)
    fire()
    expect(gtag).not.toHaveBeenCalled()

    ;(window as Window & { gtag: (...a: unknown[]) => void }).gtag = gtag
    window.dispatchEvent(new CustomEvent(GTAG_READY_EVENT))
    window.dispatchEvent(new CustomEvent(GTAG_READY_EVENT))
    expect(gtag).toHaveBeenCalledTimes(1)
    expect(gtag).toHaveBeenCalledWith("event", "landing_variant_view", { variant: "a" })
    window.removeEventListener(GTAG_READY_EVENT, fire)
  })
})
