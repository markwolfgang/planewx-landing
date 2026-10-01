# Component spec: density altitude calculator

**For:** Principal Software Engineer (port into the www Learning Center route)
**Page:** `/learn/aviation-weather/density-altitude`, section `#calculator` (mount comment in `drafts/density-altitude.html`)
**Status:** draft, September 30, 2026 (CT). Not shipped, not pushed.
**Reference code:** `drafts/src/calculator/density-altitude.js` (pure functions, no dependencies), tests in `drafts/src/calculator/density-altitude.test.js` (`node density-altitude.test.js`: 18 checks, 0 failed).

## 1. Purpose and limits

This is a simple client-side calculator for the "density altitude calculator" query (4,400/mo). It estimates the density altitude of the air from four surface observations. It does **not** estimate aircraft performance.

Hard product rules:
- **No precision claims beyond the formula.** Display density altitude rounded to the nearest 50 ft, labeled "about". Never show decimals.
- **The POH governs.** The note below must always be visible next to the result, not hidden behind a tooltip:
  > This is an estimate of the air, not of your airplane. The takeoff, climb, and landing performance charts in your AFM or POH govern. Check them for your actual pressure altitude, temperature, weight, wind, and runway.
- **The pilot decides.** No go/no-go wording, no colors that read as pass/fail, no "safe" or "unsafe" labels. The pilot makes the call as PIC.
- **Client-side only.** No network calls, no analytics events that include the input values, no cookies, no storage. It keeps working offline once the page has loaded.
- No em or en dashes in any UI string. Use "minus" or a plain hyphen-minus.

## 2. Inputs

| Field | Unit toggle | Required | Accepted range | Notes |
|---|---|---|---|---|
| Field elevation | ft | yes | -1,500 to 15,000 | Integer or decimal. |
| Altimeter setting | inHg | yes | 27.50 to 31.50 | The METAR `A` group or ATIS. Accept `2992` and treat it as 29.92: call `normalizeAltimeter()` (divides by 100 when the value is 2750 to 3150) before `validate()`. |
| Temperature | °C / °F (default °C) | yes | -60 to 60 °C (-76 to 140 °F) | Convert °F with (F - 32) × 5/9. |
| Dewpoint | same unit as temperature | no | -60 °C up to the temperature | If blank, compute dry air and say so. Reject dewpoint above temperature. |

Label copy: "Field elevation (ft)", "Altimeter setting (inHg)", "Temperature", "Dewpoint (optional)". Helper text under altimeter: "The altimeter setting from the METAR or ATIS, for example 29.92."

Validation messages are the strings in `validate()` in the reference code. Show them inline under the field (`aria-describedby`), not as alerts. Compute on input (debounced about 150 ms) and on submit. Do not compute until the three required fields are valid.

## 3. Formulas (exact, with sources)

All five steps are the NWS Weather Forecast Office El Paso "Density Altitude" calculator (Tim Brice and Todd Hall), transcribed from the inline JavaScript at https://www.weather.gov/epz/wxcalc_densityaltitude and https://www.weather.gov/epz/wxcalc_pressurealtitude, and from the formula notes at https://www.weather.gov/media/epz/wxcalc/stationPressure.pdf, densityAltitude.pdf, vaporPressure.pdf and virtualTemperature.pdf. The FAA PHAK (FAA-H-8083-25C, p. 4-5) sends pilots to this NWS calculator for humidity. Saved copies: `/workspace/library/nws/wxcalc/`.

The NWS density altitude page asks for station pressure: "Enter the actual station pressure (not the altimeter setting)". Our inputs are the altimeter setting and field elevation, so step 1 converts them with the NWS station pressure formula.

1. **Station pressure** (inHg), h in meters (h = 0.3048 × elevation ft), A = altimeter setting in inHg:
   `Pstn = A × ((288 - 0.0065 × h) / 288) ^ 5.2561`
2. **Pressure altitude** (ft), with `Pmb = 33.8639 × Pstn`:
   `PA = (1 - (Pmb / 1013.25) ^ 0.190284) × 145366.45`
3. **Vapor pressure** (mb), Td = dewpoint in °C:
   `e = 6.11 × 10 ^ (7.5 × Td / (237.3 + Td))`
4. **Virtual temperature** (K), T = temperature in K (°C + 273.15):
   `Tv = T / (1 - (e / Pmb) × (1 - 0.622))`. With no dewpoint, `e = 0` and `Tv = T` (dry air; our choice, the NWS page requires a dewpoint).
5. **Density altitude** (ft), with Tv converted to Rankine, `TvR = (Tv - 273.15) × 1.8 + 32 + 459.67`:
   `DA = 145366 × (1 - ((17.326 × Pstn) / TvR) ^ 0.235)`

**Cross-check shown beside the result (FAA rule of thumb):** FAA-H-8083-15B Instrument Flying Handbook, ch. 4, p. 4-6: "If a chart is not available, the density altitude can be estimated by adding 120 feet for every degree Celsius above the ISA." Standard temperature at the pressure altitude is 15 °C minus 2 °C per 1,000 ft (PHAK p. 11-2).
`ISA = 15 - 2 × (PA / 1000)`; `DA_rule = PA + 120 × (T°C - ISA)`

Note: the 120 ft rule and the Koch chart are in the IFH and FAA-P-8740-2, **not** in the PHAK. The PHAK gives the definition, the pressure altitude methods, the density altitude chart (Fig. 11-4), and the NWS calculator reference. Do not attribute the 120 ft rule to the PHAK in UI copy.

## 4. Outputs

Primary (large): **Density altitude: about 9,250\u00A0ft**
Secondary lines:
- "About 3,250\u00A0ft above the field" (DA minus field elevation, nearest 50 ft; say "below" when negative)
- "Pressure altitude: about 5,850\u00A0ft" (nearest 50 ft)
- "Standard temperature at that pressure altitude: 3\u00A0°C. You entered 32\u00A0°C, 29\u00A0°C warmer than standard."
- "Rule of thumb (120\u00A0ft per °C above standard): about 9,300\u00A0ft"
- With dewpoint: "Humidity adds about 200\u00A0ft." Without: "Dry-air estimate. Add a dewpoint to include humidity, which raises density altitude a little."
- Always: the POH note from section 1.

Non-breaking units: in every result string, join each number to its unit (ft, °C) with a no-break space, U+00A0 (written `\u00A0` above), so a value never wraps away from its unit on a phone. The validation messages in `calculator/density-altitude.js` follow the same rule.

Rounding: all displayed altitudes to the nearest 50 ft (`DISPLAY_STEP_FT`). Reason: METAR temperatures are whole degrees Celsius (a half degree is about 60 ft), the NWS formula runs about 20 ft high against the PHAK examples, and the FAA methods disagree by 100 to 300 ft. Showing 9,229 would claim precision that does not exist. Station pressure may be shown to 0.01 inHg in an optional "Show the math" disclosure that lists each step's value.

Do not add colored thresholds. The page does not publish them, and neither does PlaneWX's help center.

## 5. Test vectors (must pass)

From `density-altitude.test.js`. Tolerances describe the formula, not display rounding.

| # | Input | Expected | Source |
|---|---|---|---|
| V1 | Station pressure 22.22 inHg, 80 °F, dewpoint 75 °F | 11,564 ft ± 5 | PHAK p. 4-5 (NWS example) |
| V1b | Same, humid minus dry | about 450 to 500 ft | PHAK p. 4-5 ("almost 500 feet lower") |
| V2 | 5,048 ft, 29.92, 30 °C, dry | 7,855 ft ± 40 (formula gives 7,876) | PHAK p. 8-7 |
| V3 | 5,048 ft, 29.92, -25 °C, dry | 1,232 ft ± 40 (formula gives 1,253) | PHAK p. 8-7 |
| V4 | 0 ft, 29.92, 15 °C | 0 ft ± 30 (formula gives 18) | ISA |
| V5 | Rule of thumb, PA 3,000, 20 °C | 4,320 ft | IFH p. 4-6 |
| V6 | 0 ft, 30.10 inHg, PA | -165 ft ± 15 | PHAK Fig. 11-3 |
| V7 | 6,000 ft, 30.10, 32 °C, dewpoint 10 °C | PA 5,843; DA dry 9,046; DA 9,229; display 9,250 | Page worked example |
| V9 | PA 10,000, 20 °C | 12,700 ± 150 (formula 12,801) | AWH para. 8.4.1.5 |
| V10 | 6,000 ft, 29.92, 90 °F | 9,200 ± 100 (formula 9,261) | FAA-P-8740-2 rule-of-thumb chart |
| V8 | Dewpoint above temperature; raw altimeter 2992 before normalizing; missing temperature; `normalizeAltimeter(2992)` | field errors; 29.92 | Validation |

V9 and V10 are deliberately loose: they document that FAA charts and the NWS formula agree to within about 100 ft, which is why the display rounds to 50 ft.

## 6. Accessibility and layout

- Native `<form>` with `<label for>` on every input, `inputmode="decimal"`, and a visible unit on each field. The °C/°F toggle is a radio group with a `<fieldset>` and `<legend>`.
- Result region `aria-live="polite"`, announcing only the primary line.
- Keyboard: Tab order follows visual order. Enter computes. No focus traps.
- Works at 390, 620, 768 and 1280 px with no horizontal scroll. Inputs stack in one column below 600 px, two columns above. No tables in the component.
- Use existing hub.css tokens (colors, `.note`) where possible; any new CSS must be scoped to the component root.
- Without JavaScript, render nothing in the mount (the page text above the mount already explains the method), or a one-line `<noscript>` pointing to the worked example.

## 7. Non-goals

- No aircraft performance, runway length, or weight inputs. That is POH work.
- No airport lookup or live METAR fetch in v1 (would add a network call and a data-freshness claim). A later version could prefill from a METAR only if the page states the observation time.
- No density altitude color bands or "high/critical" labels.

## 8. JSON-LD and SEO

- No `SoftwareApplication` or `WebApplication` schema in v1; the page already carries Article, FAQPage and DefinedTermSet.
- Keep the `h2#calculator` text "Density altitude calculator" so the section can be linked as `#calculator`.
- If the component does not ship with the page, remove the `#calculator` h2 and paragraph (see the mount comment).

## 9. Porting checklist

1. Copy `density-altitude.js` into the www app as a module (it already exports via `module.exports` and `window.PWXDensityAltitude`).
2. Build the form around `compute()`; do not re-derive the math.
3. Run the test vectors in CI (port `density-altitude.test.js` to the repo's test runner).
4. Verify there are no network requests from the component (DevTools, offline mode).
5. Run the Learning Center layout check at 390/620/768/1280 with the component mounted.
