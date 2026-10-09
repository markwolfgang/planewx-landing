import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("pricing-section two-year offer removal", () => {
  it("does not contain Lock 2 years, two years, or TWO_YEAR", () => {
    const src = readFileSync(
      join(process.cwd(), "components/shared/pricing-section.tsx"),
      "utf8",
    )
    expect(src).not.toContain("Lock 2 years")
    expect(src).not.toContain("two years")
    expect(src).not.toContain("TWO_YEAR")
  })
})
