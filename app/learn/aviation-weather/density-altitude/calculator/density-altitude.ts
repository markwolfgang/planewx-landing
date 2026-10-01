/* Density altitude reference implementation for the PlaneWX density altitude calculator component.
 * Pure functions, no network, no dependencies. Spec: hub-source/density-altitude-calculator.spec.md
 * Formulas are the NWS WFO El Paso Weather Calculator formulas (Brice and Hall).
 */
export const FT_PER_M = 1 / 0.3048
export const MB_PER_INHG = 33.8639 // NWS: mb = 33.8639 * inHg
export const DISPLAY_STEP_FT = 50

export const LIMITS = {
  elevationFt: [-1500, 15000] as const,
  altimeterInHg: [27.5, 31.5] as const,
  tempC: [-60, 60] as const,
}

export function fToC(f: number): number {
  return ((f - 32) * 5) / 9
}

/** Station pressure from altimeter setting and station elevation (NWS stationPressure.pdf). */
export function stationPressureInHg(
  altimeterInHg: number,
  elevationFt: number
): number {
  const hM = 0.3048 * elevationFt
  return altimeterInHg * Math.pow((288 - 0.0065 * hM) / 288, 5.2561)
}

/** Pressure altitude from station pressure (NWS pressure altitude calculator script). */
export function pressureAltitudeFt(stationInHg: number): number {
  const mb = MB_PER_INHG * stationInHg
  return (1 - Math.pow(mb / 1013.25, 0.190284)) * 145366.45
}

/** Vapor pressure in mb from dewpoint in C. */
export function vaporPressureMb(dewpointC: number): number {
  return 6.11 * Math.pow(10, (7.5 * dewpointC) / (237.3 + dewpointC))
}

/** Virtual temperature in K. With no dewpoint, e = 0 (dry air) and Tv = T. */
export function virtualTemperatureK(
  tempC: number,
  stationInHg: number,
  dewpointC: number | null | undefined
): number {
  const tK = tempC + 273.15
  if (dewpointC === null || dewpointC === undefined) return tK
  const e = vaporPressureMb(dewpointC)
  const pMb = MB_PER_INHG * stationInHg
  return tK / (1 - (e / pMb) * (1 - 0.622))
}

/** Density altitude in ft from station pressure and virtual temperature in K. */
export function densityAltitudeFromStation(
  stationInHg: number,
  tvK: number
): number {
  const tvR = (tvK - 273.15) * 1.8 + 32 + 459.67
  return 145366 * (1 - Math.pow((17.326 * stationInHg) / tvR, 0.235))
}

/** IFH rule of thumb: ISA at PA is 15 C minus 2 C per 1,000 ft; add 120 ft per C above. */
export function ruleOfThumbFt(pressureAltFt: number, tempC: number): number {
  const isaC = 15 - 2 * (pressureAltFt / 1000)
  return pressureAltFt + 120 * (tempC - isaC)
}

export type DensityAltitudeInput = {
  elevationFt: number
  altimeterInHg: number
  tempC: number
  dewpointC?: number | null
}

export type FieldError = { field: string; msg: string }

export function validate(inp: DensityAltitudeInput): FieldError[] {
  const errs: FieldError[] = []
  const num = (v: unknown): v is number =>
    typeof v === "number" && Number.isFinite(v)
  if (!num(inp.elevationFt))
    errs.push({ field: "elevation", msg: "Enter the field elevation in feet." })
  else if (
    inp.elevationFt < LIMITS.elevationFt[0] ||
    inp.elevationFt > LIMITS.elevationFt[1]
  )
    errs.push({
      field: "elevation",
      msg: "Field elevation must be between -1,500 and 15,000\u00A0ft.",
    })
  if (!num(inp.altimeterInHg))
    errs.push({
      field: "altimeter",
      msg: "Enter the altimeter setting in inches of mercury, for example 29.92.",
    })
  else if (
    inp.altimeterInHg < LIMITS.altimeterInHg[0] ||
    inp.altimeterInHg > LIMITS.altimeterInHg[1]
  )
    errs.push({
      field: "altimeter",
      msg: "Altimeter setting must be between 27.50 and 31.50\u00A0inHg.",
    })
  if (!num(inp.tempC))
    errs.push({ field: "temperature", msg: "Enter the temperature." })
  else if (inp.tempC < LIMITS.tempC[0] || inp.tempC > LIMITS.tempC[1])
    errs.push({
      field: "temperature",
      msg: "Temperature must be between -60 and 60\u00A0C (-76 and 140\u00A0F).",
    })
  if (inp.dewpointC !== null && inp.dewpointC !== undefined) {
    if (!num(inp.dewpointC))
      errs.push({
        field: "dewpoint",
        msg: "Dewpoint must be a number, or leave it blank.",
      })
    else if (num(inp.tempC) && inp.dewpointC > inp.tempC)
      errs.push({
        field: "dewpoint",
        msg: "Dewpoint cannot be higher than the temperature.",
      })
    else if (inp.dewpointC < LIMITS.tempC[0])
      errs.push({
        field: "dewpoint",
        msg: "Dewpoint must be -60\u00A0C (-76\u00A0F) or higher.",
      })
  }
  return errs
}

/** Accept a METAR-style altimeter entry such as 2992 and return 29.92. */
export function normalizeAltimeter(v: number): number {
  return typeof v === "number" && v >= 2750 && v <= 3150 ? v / 100 : v
}

function round(x: number, step: number): number {
  return Math.round(x / step) * step
}

export type ComputeResult =
  | { ok: false; errors: FieldError[] }
  | {
      ok: true
      raw: {
        stationPressureInHg: number
        pressureAltitudeFt: number
        virtualTempK: number
        densityAltitudeFt: number
        densityAltitudeDryFt: number
        isaTempC: number
        ruleOfThumbFt: number
      }
      display: {
        densityAltitudeFt: number
        aboveFieldFt: number
        pressureAltitudeFt: number
        stationPressureInHg: number
        isaTempC: number
        tempVsIsaC: number
        ruleOfThumbFt: number
        humidityAddedFt: number | null
        usedDewpoint: boolean
      }
    }

export function compute(inp: DensityAltitudeInput): ComputeResult {
  const errors = validate(inp)
  if (errors.length) return { ok: false, errors }
  const pStn = stationPressureInHg(inp.altimeterInHg, inp.elevationFt)
  const pa = pressureAltitudeFt(pStn)
  const tv = virtualTemperatureK(inp.tempC, pStn, inp.dewpointC)
  const da = densityAltitudeFromStation(pStn, tv)
  const daDry = densityAltitudeFromStation(pStn, inp.tempC + 273.15)
  const isaC = 15 - 2 * (pa / 1000)
  const rot = ruleOfThumbFt(pa, inp.tempC)
  return {
    ok: true,
    raw: {
      stationPressureInHg: pStn,
      pressureAltitudeFt: pa,
      virtualTempK: tv,
      densityAltitudeFt: da,
      densityAltitudeDryFt: daDry,
      isaTempC: isaC,
      ruleOfThumbFt: rot,
    },
    display: {
      densityAltitudeFt: round(da, DISPLAY_STEP_FT),
      aboveFieldFt: round(da - inp.elevationFt, DISPLAY_STEP_FT),
      pressureAltitudeFt: round(pa, DISPLAY_STEP_FT),
      stationPressureInHg: Math.round(pStn * 100) / 100,
      isaTempC: Math.round(isaC),
      tempVsIsaC: Math.round(inp.tempC - isaC),
      ruleOfThumbFt: round(rot, DISPLAY_STEP_FT),
      humidityAddedFt:
        inp.dewpointC === null || inp.dewpointC === undefined
          ? null
          : round(da - daDry, DISPLAY_STEP_FT),
      usedDewpoint: !(
        inp.dewpointC === null || inp.dewpointC === undefined
      ),
    },
  }
}
