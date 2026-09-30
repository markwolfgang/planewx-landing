import { describe, expect, it } from "vitest"
import * as D from "./density-altitude"

function near(got: number, want: number, tol: number) {
  expect(Math.abs(got - want)).toBeLessThanOrEqual(tol)
}

describe("density altitude calculator (18 checks from hub-source)", () => {
  it("V1 PHAK humid example DA (station 22.22 inHg, 80F/75F)", () => {
    const p1 = 22.22
    const tv1 = D.virtualTemperatureK(D.fToC(80), p1, D.fToC(75))
    near(D.densityAltitudeFromStation(p1, tv1), 11564, 5)
  })

  it("V1b PHAK example, humidity effect (DA humid minus dry)", () => {
    const p1 = 22.22
    const tv1 = D.virtualTemperatureK(D.fToC(80), p1, D.fToC(75))
    const dry1 = D.densityAltitudeFromStation(p1, D.fToC(80) + 273.15)
    near(D.densityAltitudeFromStation(p1, tv1) - dry1, 450, 60)
  })

  it("V2 PHAK 5,048 ft, 29.92, 30 C (PHAK 7,855)", () => {
    const r = D.compute({
      elevationFt: 5048,
      altimeterInHg: 29.92,
      tempC: 30,
      dewpointC: null,
    })
    expect(r.ok).toBe(true)
    if (r.ok) near(r.raw.densityAltitudeFt, 7855, 40)
  })

  it("V3 PHAK 5,048 ft, 29.92, -25 C (PHAK 1,232)", () => {
    const r = D.compute({
      elevationFt: 5048,
      altimeterInHg: 29.92,
      tempC: -25,
      dewpointC: null,
    })
    expect(r.ok).toBe(true)
    if (r.ok) near(r.raw.densityAltitudeFt, 1232, 40)
  })

  it("V4 sea level ISA", () => {
    const r = D.compute({
      elevationFt: 0,
      altimeterInHg: 29.92,
      tempC: 15,
      dewpointC: null,
    })
    expect(r.ok).toBe(true)
    if (r.ok) near(r.raw.densityAltitudeFt, 0, 30)
  })

  it("V5 IFH 120 ft rule example", () => {
    near(D.ruleOfThumbFt(3000, 20), 4320, 0.5)
  })

  it("V6 PA correction at 30.10 inHg (PHAK table -165)", () => {
    const r = D.compute({
      elevationFt: 0,
      altimeterInHg: 30.1,
      tempC: 15,
      dewpointC: null,
    })
    expect(r.ok).toBe(true)
    if (r.ok) near(r.raw.pressureAltitudeFt, -165, 15)
  })

  it("V7 worked example PA", () => {
    const w = D.compute({
      elevationFt: 6000,
      altimeterInHg: 30.1,
      tempC: 32,
      dewpointC: 10,
    })
    expect(w.ok).toBe(true)
    if (w.ok) near(w.raw.pressureAltitudeFt, 5843, 5)
  })

  it("V7 worked example DA dry", () => {
    const w = D.compute({
      elevationFt: 6000,
      altimeterInHg: 30.1,
      tempC: 32,
      dewpointC: 10,
    })
    expect(w.ok).toBe(true)
    if (w.ok) near(w.raw.densityAltitudeDryFt, 9046, 5)
  })

  it("V7 worked example DA with dewpoint", () => {
    const w = D.compute({
      elevationFt: 6000,
      altimeterInHg: 30.1,
      tempC: 32,
      dewpointC: 10,
    })
    expect(w.ok).toBe(true)
    if (w.ok) near(w.raw.densityAltitudeFt, 9229, 5)
  })

  it("V7 display DA rounded to 50 ft", () => {
    const w = D.compute({
      elevationFt: 6000,
      altimeterInHg: 30.1,
      tempC: 32,
      dewpointC: 10,
    })
    expect(w.ok).toBe(true)
    if (w.ok) expect(w.display.densityAltitudeFt).toBe(9250)
  })

  it("V9 AWH 10,000 ft PA, 20 C (AWH 12,700)", () => {
    const stn10k =
      (1013.25 * Math.pow(1 - 10000 / 145366.45, 1 / 0.190284)) / 33.8639
    near(D.densityAltitudeFromStation(stn10k, 293.15), 12700, 150)
  })

  it("V10 pamphlet chart 6,000 ft, 90 F (chart 9,200)", () => {
    const r = D.compute({
      elevationFt: 6000,
      altimeterInHg: 29.92,
      tempC: D.fToC(90),
      dewpointC: null,
    })
    expect(r.ok).toBe(true)
    if (r.ok) near(r.raw.densityAltitudeFt, 9200, 100)
  })

  it("V8 dewpoint above temp rejected", () => {
    expect(
      D.validate({
        elevationFt: 1000,
        altimeterInHg: 29.92,
        tempC: 20,
        dewpointC: 25,
      }).map((e) => e.field)
    ).toEqual(["dewpoint"])
  })

  it("V8 altimeter out of range rejected", () => {
    expect(
      D.validate({
        elevationFt: 1000,
        altimeterInHg: 2992,
        tempC: 20,
      }).map((e) => e.field)
    ).toEqual(["altimeter"])
  })

  it("V8 missing temperature rejected", () => {
    expect(
      D.validate({
        elevationFt: 1000,
        altimeterInHg: 29.92,
        tempC: NaN,
      }).map((e) => e.field)
    ).toEqual(["temperature"])
  })

  it("V8 normalizeAltimeter 2992 -> 29.92", () => {
    expect(D.normalizeAltimeter(2992)).toBe(29.92)
  })

  it("V8 normalizeAltimeter 29.92 unchanged", () => {
    expect(D.normalizeAltimeter(29.92)).toBe(29.92)
  })
})
