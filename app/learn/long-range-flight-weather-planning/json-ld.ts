export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Long-Range Flight Weather Planning: 3 to 14 Days Out",
  name: "Long-Range Flight Weather Planning (3 to 14 Days)",
  description:
    "Plan a GA flight 3 to 14 days out: TAF, MOS, LAMP, NBM, GFS/ECMWF, CPC outlooks, confidence by lead time, a day-by-day timeline, and PlaneWX WX Score.",
  mainEntityOfPage:
    "https://www.planewx.ai/learn/long-range-flight-weather-planning",
  url: "https://www.planewx.ai/learn/long-range-flight-weather-planning",
  dateModified: "2026-11-11",
  datePublished: "2026-11-11",
  author: {
    "@type": "Organization",
    name: "PlaneWX",
    url: "https://www.planewx.ai",
  },
  publisher: {
    "@type": "Organization",
    name: "PlaneWX",
    url: "https://www.planewx.ai",
  },
  about: [
    "Long-range flight weather planning",
    "Aviation weather forecasts",
    "TAF MOS LAMP NBM",
    "Personal minimums",
    "WX Score",
  ],
  citation: [
    "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf",
    "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf",
    "https://aviationweather.gov/help/data/",
    "https://www.cpc.ncep.noaa.gov/products/forecasts/extended_range_outlooks.shtml",
    "https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_91-92_Ed_Upd_(3-19-25).pdf",
  ],
  isPartOf: {
    "@type": "CollectionPage",
    name: "PlaneWX Learning Center",
    url: "https://www.planewx.ai/learn",
  },
} as const

export const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Learning Center",
      item: "https://www.planewx.ai/learn",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Long-Range Flight Weather Planning",
      item: "https://www.planewx.ai/learn/long-range-flight-weather-planning",
    },
  ],
} as const
