/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { CookiePrefsLinks } from "@/components/cookie-prefs-links"

describe("CookiePrefsLinks", () => {
  beforeEach(() => {
    document.cookie = "pw_consent_region=notice; path=/"
  })

  afterEach(() => {
    cleanup()
  })

  it("joins Cookie settings and Do not sell with joinWith for inline prose", async () => {
    const { container } = render(
      <CookiePrefsLinks className="text-sky-400" showDoNotSell joinWith=" or " />,
    )
    await screen.findByTestId("cookie-settings-link")
    await screen.findByTestId("do-not-sell-link")
    expect(container.textContent).toBe("Cookie settings or Do not sell or share")
  })

  it("omits join text when joinWith is not set (footer gap spacing)", async () => {
    const { container } = render(<CookiePrefsLinks showDoNotSell />)
    await screen.findByTestId("do-not-sell-link")
    expect(container.textContent).toBe("Cookie settingsDo not sell or share")
  })
})
