/**
 * @vitest-environment jsdom
 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  HeroExplainerVideo,
  HERO_EXPLAINER_VIDEO_ID,
  trackHeroVideoPlay,
} from "@/components/shared/hero-explainer-video"
import { resetTrackingReadyFlags, signalGtagReady } from "@/lib/tracking-runtime"

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, preload: _preload, fetchPriority: _fp, ...rest } = props
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />
  },
}))

describe("HeroExplainerVideo", () => {
  beforeEach(() => {
    resetTrackingReadyFlags()
    delete (window as { gtag?: unknown }).gtag
  })
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it("renders a labeled play button and no iframe before the click", () => {
    const { container } = render(<HeroExplainerVideo variant="a" />)
    const btn = screen.getByRole("button", { name: "Play the PlaneWX explainer video" })
    expect(btn).toBeTruthy()
    expect(container.querySelector("iframe")).toBeNull()
    const img = container.querySelector("img")
    expect(img?.getAttribute("src")).toContain(`/vi/${HERO_EXPLAINER_VIDEO_ID}/`)
    expect(img?.getAttribute("src")).not.toContain("youtube-nocookie")
  })

  it("swaps in the nocookie iframe with autoplay and rel=0 on click", () => {
    const { container } = render(<HeroExplainerVideo variant="a" />)
    fireEvent.click(screen.getByRole("button", { name: "Play the PlaneWX explainer video" }))
    const iframe = container.querySelector("iframe")
    expect(iframe).not.toBeNull()
    expect(iframe!.getAttribute("src")).toBe(
      `https://www.youtube-nocookie.com/embed/${HERO_EXPLAINER_VIDEO_ID}?autoplay=1&rel=0`,
    )
    expect(iframe!.getAttribute("title")).toBeTruthy()
    expect(iframe!.getAttribute("allow")).toContain("autoplay")
    expect(screen.queryByRole("button", { name: "Play the PlaneWX explainer video" })).toBeNull()
  })

  it("does not send an analytics event before gtag is ready (no consent)", () => {
    const gtag = vi.fn()
    window.gtag = gtag
    render(<HeroExplainerVideo variant="a" />)
    fireEvent.click(screen.getByRole("button", { name: "Play the PlaneWX explainer video" }))
    expect(gtag).not.toHaveBeenCalled()
  })

  it("sends hero_video_play once gtag is ready (analytics consent granted)", () => {
    const gtag = vi.fn()
    window.gtag = gtag
    signalGtagReady()
    render(<HeroExplainerVideo variant="a" />)
    fireEvent.click(screen.getByRole("button", { name: "Play the PlaneWX explainer video" }))
    expect(gtag).toHaveBeenCalledWith("event", "hero_video_play", {
      variant: "a",
      video_id: HERO_EXPLAINER_VIDEO_ID,
    })
  })

  it("still plays when the analytics call throws", () => {
    window.gtag = () => {
      throw new Error("blocked")
    }
    signalGtagReady()
    expect(() => trackHeroVideoPlay("a")).toThrow()
    const { container } = render(<HeroExplainerVideo variant="a" />)
    fireEvent.click(screen.getByRole("button", { name: "Play the PlaneWX explainer video" }))
    expect(container.querySelector("iframe")).not.toBeNull()
  })
})
