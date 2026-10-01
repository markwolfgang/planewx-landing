"use client"

import { useEffect, useMemo } from "react"
import { createRoot, type Root } from "react-dom/client"
import { HubHost } from "../hub-host"
import { DensityAltitudeCalculator } from "./density-altitude-calculator"

const CALC_MOUNT_RE = /<!--\s*CALCULATOR MOUNT:[\s\S]*?-->/

/**
 * Renders the density-altitude article via HubHost and mounts the client
 * calculator into the HTML comment slot under h2#calculator.
 */
export function DensityAltitudeBody({ html }: { html: string }) {
  const prepared = useMemo(
    () =>
      html.replace(
        CALC_MOUNT_RE,
        '<div id="pwx-da-calc-mount"></div>'
      ),
    [html]
  )

  useEffect(() => {
    const el = document.getElementById("pwx-da-calc-mount")
    if (!el) return
    let root: Root | null = createRoot(el)
    root.render(<DensityAltitudeCalculator />)
    return () => {
      root?.unmount()
      root = null
    }
  }, [prepared])

  return <HubHost html={prepared} />
}
