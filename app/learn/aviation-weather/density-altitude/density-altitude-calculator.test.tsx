/**
 * @vitest-environment jsdom
 */
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { DensityAltitudeCalculator } from "./density-altitude-calculator"

afterEach(() => {
  cleanup()
})

describe("DensityAltitudeCalculator idle copy", () => {
  it("keeps the original placeholder when inputs are empty", () => {
    render(<DensityAltitudeCalculator />)
    expect(
      screen.getByText(
        "Enter field elevation, altimeter setting, and temperature to estimate density altitude."
      )
    ).toBeTruthy()
  })

  it("shows neutral fix copy when a field fails validation", async () => {
    render(<DensityAltitudeCalculator />)
    fireEvent.change(screen.getByLabelText("Field elevation (ft)"), {
      target: { value: "5000" },
    })
    fireEvent.change(screen.getByLabelText("Altimeter setting (inHg)"), {
      target: { value: "26" },
    })
    fireEvent.change(screen.getByLabelText(/Temperature/), {
      target: { value: "20" },
    })
    await waitFor(() => {
      expect(
        screen.getByText("Fix the highlighted field to see density altitude.")
      ).toBeTruthy()
    })
    expect(
      screen.queryByText(
        "Enter field elevation, altimeter setting, and temperature to estimate density altitude."
      )
    ).toBeNull()
  })
})
