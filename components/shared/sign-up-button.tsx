"use client"

import { useEffect, useState } from "react"

type Props = {
  variant: string
  className?: string
  children: React.ReactNode
}

export function SignUpButton({ variant, className, children }: Props) {
  const baseUrl = `https://app.planewx.ai/auth/sign-up?lp=${variant}`
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
