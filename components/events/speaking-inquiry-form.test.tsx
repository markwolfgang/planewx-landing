import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { SpeakingInquiryForm } from "./speaking-inquiry-form"

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("SpeakingInquiryForm", () => {
  it("shows client-side errors and never calls fetch when required fields are empty", () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal("fetch", fetchSpy)
    render(<SpeakingInquiryForm />)
    fireEvent.submit(screen.getByTestId("speaking-inquiry-form"))
    expect(screen.getByRole("alert").textContent).toBe("Please fix the highlighted fields.")
    for (const text of [
      "Name is required",
      "Email is required",
      "Organization is required",
      "Event name is required",
      "Event date(s) is required",
      "Location is required",
      "Message is required",
    ]) {
      expect(screen.getByText(text)).toBeTruthy()
    }
    expect(screen.queryByText("Audience size is required")).toBeNull()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it("marks audience size optional and the rest required", () => {
    render(<SpeakingInquiryForm />)
    expect(screen.getByText("Audience size (optional)")).toBeTruthy()
    expect(screen.getByTestId("speaking-audienceSize").getAttribute("aria-required")).toBe("false")
    expect(screen.getByTestId("speaking-name").getAttribute("aria-required")).toBe("true")
  })
})
