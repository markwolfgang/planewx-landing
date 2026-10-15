import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { NotFoundContent } from "./not-found-content"

afterEach(cleanup)

describe("NotFoundContent", () => {
  it("renders branded 404 with Home, My Trips and Help links", () => {
    const { container } = render(<NotFoundContent />)
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeTruthy()
    expect(screen.getByAltText("PlaneWX")).toBeTruthy()
    expect(screen.getByTestId("not-found-home").getAttribute("href")).toBe("/")
    expect(screen.getByTestId("not-found-trips").getAttribute("href")).toBe("https://app.planewx.ai/?view=dashboard")
    expect(screen.getByTestId("not-found-help").getAttribute("href")).toBe("https://app.planewx.ai/help")
    expect(/^[\x00-\x7F]*$/.test(container.textContent ?? "")).toBe(true)
  })
})
