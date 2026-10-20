import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { SpeakingInquiryForm } from "./speaking-inquiry-form"

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  window.history.replaceState({}, "", "/")
})

function fillValid() {
  const fill: Record<string, string> = {
    name: "Pat Pilot",
    email: "pat@example.com",
    org: "Example Pilots Association",
    eventName: "Example Safety Day",
    eventDates: "Mar 12-14, 2027",
    location: "Lakeland, FL",
    message: "Hello",
  }
  for (const [k, v] of Object.entries(fill)) {
    fireEvent.change(screen.getByTestId(`speaking-${k}`), { target: { value: v } })
  }
}

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

  it("reports the HTTP status, not a network error, when an error response is not JSON", async () => {
    const json = vi.fn(async () => {
      throw new SyntaxError("Unexpected token < in JSON")
    })
    const fetchSpy = vi.fn().mockResolvedValue({ ok: false, status: 502, json })
    vi.stubGlobal("fetch", fetchSpy)
    render(<SpeakingInquiryForm />)
    fillValid()
    fireEvent.submit(screen.getByTestId("speaking-inquiry-form"))
    await vi.waitFor(() => expect(screen.getByRole("alert").textContent).toContain("502"))
    expect(screen.getByRole("alert").textContent).toBe("Something went wrong (HTTP 502). Please try again.")
    expect(screen.queryByText("Network error. Please try again.")).toBeNull()
  })

  it("shows the server's error text for a JSON error response", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: "Too many requests. Please wait a minute." }),
    })
    vi.stubGlobal("fetch", fetchSpy)
    render(<SpeakingInquiryForm />)
    fillValid()
    fireEvent.submit(screen.getByTestId("speaking-inquiry-form"))
    await vi.waitFor(() =>
      expect(screen.getByRole("alert").textContent).toBe("Too many requests. Please wait a minute."),
    )
  })

  it("still shows a network error when the request itself fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")))
    render(<SpeakingInquiryForm />)
    fillValid()
    fireEvent.submit(screen.getByTestId("speaking-inquiry-form"))
    await vi.waitFor(() => expect(screen.getByRole("alert").textContent).toBe("Network error. Please try again."))
  })

  it("does not confirm or clear the form when a 2xx body is not a success response", async () => {
    const bodies = [
      vi.fn(async () => {
        throw new SyntaxError("Unexpected token < in JSON")
      }),
      vi.fn(async () => ({})),
      vi.fn(async () => ({ success: false })),
    ]
    for (const json of bodies) {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200, json }))
      render(<SpeakingInquiryForm />)
      fillValid()
      fireEvent.submit(screen.getByTestId("speaking-inquiry-form"))
      await vi.waitFor(() =>
        expect(screen.getByRole("alert").textContent).toBe(
          "We could not confirm your request was received (HTTP 200). Please try again.",
        ),
      )
      expect(screen.queryByText("Request sent")).toBeNull()
      expect((screen.getByTestId("speaking-name") as HTMLInputElement).value).toBe("Pat Pilot")
      expect((screen.getByTestId("speaking-message") as HTMLTextAreaElement).value).toBe("Hello")
      cleanup()
      vi.unstubAllGlobals()
    }
  })

  it("prefills Message for a booth volunteer visit and still posts to the speaking API", async () => {
    window.history.pushState({}, "", "/events?intent=booth-volunteer#speaking")
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, message: "Thanks." }),
    })
    vi.stubGlobal("fetch", fetchSpy)
    render(<SpeakingInquiryForm />)
    await vi.waitFor(() =>
      expect((screen.getByTestId("speaking-message") as HTMLTextAreaElement).value).toBe(
        "Booth volunteer",
      ),
    )
    fireEvent.change(screen.getByTestId("speaking-name"), { target: { value: "Pat Pilot" } })
    fireEvent.change(screen.getByTestId("speaking-email"), { target: { value: "pat@example.com" } })
    fireEvent.change(screen.getByTestId("speaking-org"), { target: { value: "Example Pilots Association" } })
    fireEvent.change(screen.getByTestId("speaking-eventName"), { target: { value: "SUN 'n FUN" } })
    fireEvent.change(screen.getByTestId("speaking-eventDates"), { target: { value: "Apr 6-11, 2027" } })
    fireEvent.change(screen.getByTestId("speaking-location"), { target: { value: "Lakeland, FL" } })
    fireEvent.submit(screen.getByTestId("speaking-inquiry-form"))
    await vi.waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))
    expect(fetchSpy.mock.calls[0][0]).toBe("/api/events/speaking-inquiry")
    expect(fetchSpy.mock.calls[0][1].method).toBe("POST")
    expect(JSON.parse(fetchSpy.mock.calls[0][1].body).message).toBe("Booth volunteer")
  })

  it("leaves Message empty when the visit is not a booth volunteer link", () => {
    window.history.pushState({}, "", "/events#speaking")
    render(<SpeakingInquiryForm />)
    expect((screen.getByTestId("speaking-message") as HTMLTextAreaElement).value).toBe("")
  })

  it("confirms the request when the API answers success true", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true, message: "Thanks." }) }),
    )
    render(<SpeakingInquiryForm />)
    fillValid()
    fireEvent.submit(screen.getByTestId("speaking-inquiry-form"))
    await vi.waitFor(() => expect(screen.getByText("Request sent")).toBeTruthy())
    expect(screen.getByText("Thanks.")).toBeTruthy()
  })
})
