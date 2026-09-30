"use client"

import { useEffect, useId, useState, type FormEvent } from "react"
import {
  compute,
  fToC,
  normalizeAltimeter,
  type ComputeResult,
} from "./calculator/density-altitude"
import "./density-altitude-calculator.css"

const POH_NOTE =
  "This is an estimate of the air, not of your airplane. The takeoff, climb, and landing performance charts in your AFM or POH govern. Check them for your actual pressure altitude, temperature, weight, wind, and runway."

function fmtFt(n: number): string {
  return n.toLocaleString("en-US")
}

function parseOptionalNumber(raw: string): number | null | undefined {
  const t = raw.trim()
  if (t === "") return null
  const n = Number(t)
  return Number.isFinite(n) ? n : undefined
}

export function DensityAltitudeCalculator() {
  const baseId = useId()
  const [elevation, setElevation] = useState("")
  const [altimeter, setAltimeter] = useState("")
  const [temp, setTemp] = useState("")
  const [dewpoint, setDewpoint] = useState("")
  const [unit, setUnit] = useState<"C" | "F">("C")
  const [result, setResult] = useState<ComputeResult | null>(null)
  const [showMath, setShowMath] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      const elevN = parseOptionalNumber(elevation)
      let altN = parseOptionalNumber(altimeter)
      const tempN = parseOptionalNumber(temp)
      const dewN = parseOptionalNumber(dewpoint)

      if (elevN === null || elevN === undefined) {
        setResult(null)
        return
      }
      if (altN === null || altN === undefined) {
        setResult(null)
        return
      }
      if (tempN === null || tempN === undefined) {
        setResult(null)
        return
      }

      altN = normalizeAltimeter(altN)
      const tempC = unit === "F" ? fToC(tempN) : tempN
      let dewpointC: number | null = null
      if (dewN !== null && dewN !== undefined) {
        dewpointC = unit === "F" ? fToC(dewN) : dewN
      }

      setResult(
        compute({
          elevationFt: elevN,
          altimeterInHg: altN,
          tempC,
          dewpointC,
        })
      )
    }, 150)
    return () => clearTimeout(t)
  }, [elevation, altimeter, temp, dewpoint, unit])

  const fieldError = (field: string) =>
    result && !result.ok
      ? result.errors.find((e) => e.field === field)?.msg
      : undefined

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  const elevErrId = `${baseId}-elev-err`
  const altErrId = `${baseId}-alt-err`
  const tempErrId = `${baseId}-temp-err`
  const dewErrId = `${baseId}-dew-err`

  return (
    <div className="da-calc">
      <form className="da-calc-form" onSubmit={onSubmit} noValidate>
        <div className="da-calc-grid">
          <div className="da-calc-field">
            <label htmlFor={`${baseId}-elev`}>Field elevation (ft)</label>
            <input
              id={`${baseId}-elev`}
              name="elevation"
              inputMode="decimal"
              autoComplete="off"
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
              aria-invalid={!!fieldError("elevation")}
              aria-describedby={fieldError("elevation") ? elevErrId : undefined}
            />
            {fieldError("elevation") ? (
              <p id={elevErrId} className="da-calc-err">
                {fieldError("elevation")}
              </p>
            ) : null}
          </div>

          <div className="da-calc-field">
            <label htmlFor={`${baseId}-alt`}>Altimeter setting (inHg)</label>
            <input
              id={`${baseId}-alt`}
              name="altimeter"
              inputMode="decimal"
              autoComplete="off"
              value={altimeter}
              onChange={(e) => setAltimeter(e.target.value)}
              aria-invalid={!!fieldError("altimeter")}
              aria-describedby={
                fieldError("altimeter") ? altErrId : `${baseId}-alt-help`
              }
            />
            <p id={`${baseId}-alt-help`} className="da-calc-help">
              The altimeter setting from the METAR or ATIS, for example 29.92.
            </p>
            {fieldError("altimeter") ? (
              <p id={altErrId} className="da-calc-err">
                {fieldError("altimeter")}
              </p>
            ) : null}
          </div>

          <fieldset className="da-calc-units">
            <legend>Temperature unit</legend>
            <label>
              <input
                type="radio"
                name={`${baseId}-unit`}
                checked={unit === "C"}
                onChange={() => setUnit("C")}
              />{" "}
              °C
            </label>
            <label>
              <input
                type="radio"
                name={`${baseId}-unit`}
                checked={unit === "F"}
                onChange={() => setUnit("F")}
              />{" "}
              °F
            </label>
          </fieldset>

          <div className="da-calc-field">
            <label htmlFor={`${baseId}-temp`}>
              Temperature ({unit === "C" ? "°C" : "°F"})
            </label>
            <input
              id={`${baseId}-temp`}
              name="temperature"
              inputMode="decimal"
              autoComplete="off"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              aria-invalid={!!fieldError("temperature")}
              aria-describedby={
                fieldError("temperature") ? tempErrId : undefined
              }
            />
            {fieldError("temperature") ? (
              <p id={tempErrId} className="da-calc-err">
                {fieldError("temperature")}
              </p>
            ) : null}
          </div>

          <div className="da-calc-field">
            <label htmlFor={`${baseId}-dew`}>
              Dewpoint (optional, {unit === "C" ? "°C" : "°F"})
            </label>
            <input
              id={`${baseId}-dew`}
              name="dewpoint"
              inputMode="decimal"
              autoComplete="off"
              value={dewpoint}
              onChange={(e) => setDewpoint(e.target.value)}
              aria-invalid={!!fieldError("dewpoint")}
              aria-describedby={fieldError("dewpoint") ? dewErrId : undefined}
            />
            {fieldError("dewpoint") ? (
              <p id={dewErrId} className="da-calc-err">
                {fieldError("dewpoint")}
              </p>
            ) : null}
          </div>
        </div>
      </form>

      <div className="da-calc-result" aria-live="polite">
        {result?.ok ? (
          <>
            <p className="da-calc-primary">
              Density altitude: about {fmtFt(result.display.densityAltitudeFt)}{" "}
              ft
            </p>
            <ul className="da-calc-secondary">
              <li>
                About {fmtFt(Math.abs(result.display.aboveFieldFt))} ft{" "}
                {result.display.aboveFieldFt < 0 ? "below" : "above"} the field
              </li>
              <li>
                Pressure altitude: about{" "}
                {fmtFt(result.display.pressureAltitudeFt)} ft
              </li>
              <li>
                Standard temperature at that pressure altitude:{" "}
                {result.display.isaTempC} °C. You entered{" "}
                {unit === "F" ? `${temp.trim()} °F` : `${temp.trim()} °C`},{" "}
                {Math.abs(result.display.tempVsIsaC)} °C{" "}
                {result.display.tempVsIsaC < 0 ? "cooler" : "warmer"} than
                standard.
              </li>
              <li>
                Rule of thumb (120 ft per °C above standard): about{" "}
                {fmtFt(result.display.ruleOfThumbFt)} ft
              </li>
              <li>
                {result.display.usedDewpoint
                  ? `Humidity adds about ${fmtFt(result.display.humidityAddedFt ?? 0)} ft.`
                  : "Dry-air estimate. Add a dewpoint to include humidity, which raises density altitude a little."}
              </li>
            </ul>
            <p className="note da-calc-poh">{POH_NOTE}</p>
            <details
              className="da-calc-math"
              open={showMath}
              onToggle={(e) =>
                setShowMath((e.target as HTMLDetailsElement).open)
              }
            >
              <summary>Show the math</summary>
              <ul>
                <li>
                  Station pressure: {result.display.stationPressureInHg} inHg
                </li>
                <li>
                  Pressure altitude (raw):{" "}
                  {result.raw.pressureAltitudeFt.toFixed(1)} ft
                </li>
                <li>
                  Density altitude (raw):{" "}
                  {result.raw.densityAltitudeFt.toFixed(1)} ft
                </li>
              </ul>
            </details>
          </>
        ) : (
          <p className="da-calc-idle">
            Enter field elevation, altimeter setting, and temperature to
            estimate density altitude.
          </p>
        )}
      </div>

      <noscript>
        <p className="note">
          Enable JavaScript to use the calculator, or follow the worked example
          above.
        </p>
      </noscript>
    </div>
  )
}
