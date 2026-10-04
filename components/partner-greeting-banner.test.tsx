/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { PartnerGreetingBanner } from "@/components/partner-greeting-banner"

const SESSION_KEY = "planewx_greeting_TESTCODE"

function setRef(code: string) {
  window.history.replaceState({}, "", `/?ref=${code}`)
}

describe("PartnerGreetingBanner sessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
    setRef("TESTCODE")
  })

  afterEach(() => {
    cleanup()
    sessionStorage.clear()
    localStorage.clear()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("writes nothing to sessionStorage when the greeting is empty", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({ greeting: null }),
      ),
    )

    render(<PartnerGreetingBanner />)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/campaign-greeting?code=TESTCODE")
    })
    await waitFor(() => {
      expect(sessionStorage.getItem(SESSION_KEY)).toBeNull()
    })
    expect(screen.queryByText(/Welcome/)).toBeNull()
  })

  it("treats a legacy empty-string entry as a miss and fetches again", async () => {
    sessionStorage.setItem(SESSION_KEY, "")
    const fetchMock = vi.fn(async () =>
      Response.json({ greeting: "Welcome back, TESTCODE." }),
    )
    vi.stubGlobal("fetch", fetchMock)

    render(<PartnerGreetingBanner />)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/campaign-greeting?code=TESTCODE")
    })
    await waitFor(() => {
      expect(screen.getByText("Welcome back, TESTCODE.")).toBeTruthy()
    })
    expect(sessionStorage.getItem(SESSION_KEY)).toBe("Welcome back, TESTCODE.")
  })

  it("caches a real greeting and reuses it without a second fetch", async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({ greeting: "Hello from TESTCODE." }),
    )
    vi.stubGlobal("fetch", fetchMock)

    const first = render(<PartnerGreetingBanner />)
    await waitFor(() => {
      expect(screen.getByText("Hello from TESTCODE.")).toBeTruthy()
    })
    expect(sessionStorage.getItem(SESSION_KEY)).toBe("Hello from TESTCODE.")
    expect(fetchMock).toHaveBeenCalledTimes(1)
    first.unmount()

    render(<PartnerGreetingBanner />)
    await waitFor(() => {
      expect(screen.getByText("Hello from TESTCODE.")).toBeTruthy()
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
