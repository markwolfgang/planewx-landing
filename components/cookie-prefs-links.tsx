"use client"

import { useEffect, useState } from "react"
import { openCookieSettings, optOutOfSaleOrSharing } from "@/lib/cookie-prefs"
import {
  readConsentModeFromDocument,
  showDoNotSellLink,
} from "@/lib/consent-region"

type Props = {
  className?: string
  /** When omitted, Do not sell shows for notice (US) regions only. */
  showDoNotSell?: boolean
  /**
   * Text between Cookie settings and Do not sell (for inline prose).
   * Omit in footers that already space the controls with flex gap.
   */
  joinWith?: string
}

/** Footer controls: reopen Cookie settings, or apply Do not sell or share. */
export function CookiePrefsLinks({ className = "", showDoNotSell, joinWith }: Props) {
  const [dnsVisible, setDnsVisible] = useState(false)

  useEffect(() => {
    if (typeof showDoNotSell === "boolean") {
      setDnsVisible(showDoNotSell)
      return
    }
    setDnsVisible(showDoNotSellLink(readConsentModeFromDocument()))
  }, [showDoNotSell])

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
      {dnsVisible ? (
        <>
          {joinWith ? <span>{joinWith}</span> : null}
          <button
            type="button"
            onClick={() => {
              optOutOfSaleOrSharing()
            }}
            className={className}
            data-testid="do-not-sell-link"
          >
            Do not sell or share
          </button>
        </>
      ) : null}
    </>
  )
}
