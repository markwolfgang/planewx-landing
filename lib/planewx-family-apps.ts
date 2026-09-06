/** Public TestFlight join links for PlaneWX family iOS apps. */
export const PLANEWX_IOS_TESTFLIGHT_URL =
  "https://testflight.apple.com/join/VvQvc7pm" as const

export const BOLDFACE_TESTFLIGHT_URL =
  "https://testflight.apple.com/join/T5VnWRgb" as const

export const GA_CUSTOMS_TESTFLIGHT_URL =
  "https://testflight.apple.com/join/WnAf8xTj" as const

/** Live App Store product pages (GA / Boldface). */
export const BOLDFACE_APP_STORE_URL =
  "https://apps.apple.com/us/app/tbm-boldface/id6804532133" as const

export const GA_CUSTOMS_APP_STORE_URL =
  "https://apps.apple.com/us/app/id6758804419" as const

/**
 * Optional Apple Campaign Link query params (App Analytics).
 * Generate real links in App Store Connect → App Analytics → Campaigns
 * (requires provider token `pt`, campaign token `ct`, media type `mt=8`).
 * Append as `?pt=…&ct=…&mt=8` when Mark/CoS creates ASC campaigns.
 * Do not invent `pt` — keep product URLs clean until ASC mints campaigns.
 *
 * Suggested ct tokens for these LPs:
 * - Boldface LP: ct=boldface_lp
 * - GA Customs LP: ct=gacus_lp
 */
export const APP_STORE_CAMPAIGN_HINTS = {
  boldface: { ct: "boldface_lp", mt: "8" },
  gaCustoms: { ct: "gacus_lp", mt: "8" },
} as const

/**
 * In-app → PlaneWX signup UTM shape (for companion apps later — not wired
 * on these landing pages). Documented here so CoS/Mark use one vocabulary.
 *
 * - GA Customs: utm_source=appstore&utm_medium=app&utm_campaign=ga-customs
 * - TBM Boldface: utm_source=appstore&utm_medium=app&utm_campaign=tbm-boldface
 */
export const IN_APP_PLANEWX_UTM_HINTS = {
  gaCustoms: {
    utm_source: "appstore",
    utm_medium: "app",
    utm_campaign: "ga-customs",
  },
  boldface: {
    utm_source: "appstore",
    utm_medium: "app",
    utm_campaign: "tbm-boldface",
  },
} as const
