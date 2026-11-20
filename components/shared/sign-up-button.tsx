"use client"

import { useSignupHref } from "@/lib/use-signup-href"
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

function isLogInPath(path: string) {
  return path === "/" || path === ""
}

export function SignUpButton({
  variant,
  className,
  children,
  path = APP_SIGN_UP_PATH,
}: Props) {
  const baseUrl = buildBaseUrl(variant, path)
  const attributed = useSignupHref(baseUrl)
  // Log In carries no utm or ref: a returning user is not partner acquisition,
  // and tagging the app session would credit the partner in GA4 and could log
  // an extra lp=app campaign visit.
  const href = isLogInPath(path) ? baseUrl : attributed


  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
