/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import {
  BETA_SUPPORTING_LINE,
  TestFlightBetaCta,
} from "@/components/testflight-beta-cta"

describe("TestFlightBetaCta", () => {
  afterEach(() => cleanup())

  it("shows the supporting line by default", () => {
    render(<TestFlightBetaCta href="https://testflight.apple.com/join/x" />)
    expect(screen.getByRole("link", { name: "Test the beta" })).toBeTruthy()
    expect(screen.getByText(BETA_SUPPORTING_LINE)).toBeTruthy()
  })

  it("omits the supporting line when showSupportingLine is false", () => {
    const { container } = render(
      <TestFlightBetaCta href="https://testflight.apple.com/join/x" showSupportingLine={false} />,
    )
    expect(screen.getByRole("link", { name: "Test the beta" })).toBeTruthy()
    expect(container.textContent).not.toContain(BETA_SUPPORTING_LINE)
  })
})
