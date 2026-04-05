/**
 * Public API route — exposes KLAL outlook JSON for external consumers.
 * The server component (page.tsx) calls fetchKlalOutlook() directly
 * from lib/klal-outlook.ts to avoid self-referential HTTP fetches.
 */

import { NextResponse } from "next/server"
import { fetchKlalOutlook } from "@/lib/klal-outlook"

export async function GET(): Promise<NextResponse> {
  try {
    const data = await fetchKlalOutlook()
    if (data.dataQuality === "unavailable") {
      return NextResponse.json(data, {
        status: 503,
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
      })
    }
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600" },
    })
  } catch (err) {
    console.error("[KLAL Outlook API]", err)
    return NextResponse.json(
      { error: "Internal error", dataQuality: "unavailable" },
      { status: 500 },
    )
  }
}
