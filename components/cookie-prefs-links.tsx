"use client"

import { openCookieSettings } from "@/lib/cookie-prefs"

type Props = {
  className?: string
  showDoNotSell?: boolean
}

/** Footer controls to reopen the cookie banner / Do not sell flow. */
export function CookiePrefsLinks({ className = "", showDoNotSell = true }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={() => openCookieSettings()}
        className={className}
        data-testid="cookie-settings-link"
      >
        Cookie settings
      </button>
      {showDoNotSell ? (
        <button
          type="button"
          onClick={() => openCookieSettings()}
          className={className}
          data-testid="do-not-sell-link"
        >
          Do not sell or share
        </button>
      ) : null}
    </>
  )
}
