"use client"

import { useEffect, useState } from "react"
import { signupHrefForCurrentPage } from "@/lib/signup-attribution"
import {
  APP_ORIGIN,
  APP_SIGN_UP_PATH,
  buildAppSignupUrlWithLp,
} from "@/lib/app-signup-url"

type Props = {
  variant: string
  className?: string
  children: React.ReactNode
  /** Override the destination path. Default: `/auth/sign-up`. Use `/` for Log In. */
  path?: string
}

function buildBaseUrl(variant: string, path: string) {
  if (path === "/" || path === "") {
    // Log In: app root is intentional (307 to /auth/login for logged-out users).
    return `${APP_ORIGIN}?lp=${variant}`
  }
  const normalized = path.startsWith("/") ? path : `/${path}`
  if (normalized === APP_SIGN_UP_PATH) {
    return buildAppSignupUrlWithLp(variant)
  }
  return `${APP_ORIGIN}${normalized}?lp=${variant}`
}

export function SignUpButton({
  variant,
  className,
  children,
  path = APP_SIGN_UP_PATH,
}: Props) {
  const baseUrl = buildBaseUrl(variant, path)
  const [href, setHref] = useState(baseUrl)

  useEffect(() => {
    setHref(signupHrefForCurrentPage(baseUrl))
  }, [baseUrl])

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
