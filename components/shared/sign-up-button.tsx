"use client"

import { useEffect, useState } from "react"

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
    const refParam = new URLSearchParams(window.location.search).get("ref")
    if (refParam) {
      const code = refParam.toUpperCase()
      localStorage.setItem("planewx_referral", code)
      setHref(`${baseUrl}&ref=${code}`)
    } else {
      const stored = localStorage.getItem("planewx_referral")
      if (stored) setHref(`${baseUrl}&ref=${stored}`)
    }
  }, [baseUrl])

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
