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

  it("has a honeypot field hidden from people and assistive tech, sent as website", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "ok" }),
    })
    vi.stubGlobal("fetch", fetchSpy)
    render(<SpeakingInquiryForm />)
    const trap = screen.getByTestId("speaking-website") as HTMLInputElement
    expect(trap.name).toBe("website")
    expect(trap.tabIndex).toBe(-1)
    expect(trap.getAttribute("autocomplete")).toBe("off")
    expect(trap.closest("[aria-hidden='true']")).not.toBeNull()
    const fill: Record<string, string> = {
      name: "Pat Pilot",
      email: "pat@example.com",
      org: "Example Pilots Association",
      eventName: "Example Safety Day",
      eventDates: "Mar 12-14, 2027",
      location: "Lakeland, FL",
    }
    for (const [k, v] of Object.entries(fill)) {
      fireEvent.change(screen.getByTestId(`speaking-${k}`), { target: { value: v } })
    }
    fireEvent.change(screen.getByTestId("speaking-message"), { target: { value: "Hello" } })
    fireEvent.change(trap, { target: { value: "bot" } })
    fireEvent.submit(screen.getByTestId("speaking-inquiry-form"))
    await vi.waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))
    expect(JSON.parse(fetchSpy.mock.calls[0][1].body).website).toBe("bot")
  })
})
