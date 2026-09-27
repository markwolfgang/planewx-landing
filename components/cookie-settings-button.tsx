"use client"

import { openCookieSettings } from "@/lib/cookie-prefs"

/** Footer control that reopens the cookie preference banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openCookieSettings()}
      className={className}
      data-testid="cookie-settings-link"
    >
      Cookie settings
    </button>
  )
}
