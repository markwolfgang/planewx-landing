"use client"

import { useEffect, useState } from "react"
import { getLocalStorage } from "@/lib/cookie-prefs"

type Props = {
  variant: string
  className?: string
  children: React.ReactNode
  /** Override the destination path. Default: `/auth/sign-up`. Use `/` for Log In. */
  path?: string
}

function buildBaseUrl(variant: string, path: string) {
  if (path === "/" || path === "") {
    return `https://app.planewx.ai?lp=${variant}`
  }
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `https://app.planewx.ai${normalized}?lp=${variant}`
}

export function SignUpButton({
  variant,
  className,
  children,
  path = "/auth/sign-up",
}: Props) {
  const baseUrl = buildBaseUrl(variant, path)
  const [href, setHref] = useState(baseUrl)

  useEffect(() => {
    const storage = getLocalStorage()
    const refParam = new URLSearchParams(window.location.search).get("ref")
    if (refParam) {
      const code = refParam.toUpperCase()
      try {
        storage?.setItem("planewx_referral", code)
      } catch {
        /* ignore blocked storage */
      }
      setHref(`${baseUrl}&ref=${code}`)
    } else {
      let stored: string | null = null
      try {
        stored = storage?.getItem("planewx_referral") ?? null
      } catch {
        stored = null
      }
      if (stored) setHref(`${baseUrl}&ref=${stored}`)
    }
  }, [baseUrl])

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
