"use client"

import { usePathname } from "next/navigation"

type JsonLdGraph = {
  "@context"?: string
  "@graph"?: Array<Record<string, unknown>>
  [key: string]: unknown
}

export function SiteJsonLd({ graph }: { graph: JsonLdGraph }) {
  const pathname = usePathname()
  const rendered =
    pathname === "/ga-customs" && Array.isArray(graph["@graph"])
      ? {
          ...graph,
          "@graph": graph["@graph"].filter((node) => node["@type"] !== "FAQPage"),
        }
      : graph

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rendered) }}
    />
  )
}
