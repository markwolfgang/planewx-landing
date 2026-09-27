"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { BrandLogo } from "@/components/shared/brand-logo"
import { SignUpButton } from "./shared"
import { Menu, X } from "lucide-react"

const BASE_NAV_LINKS = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/research/turbulence-safety", label: "Research" },
] as const

type Props = {
  variant: string
}

function navLinksForVariant(variant: string) {
  const useHomeHowItWorks = variant === "v2" || variant === "v3"
  return BASE_NAV_LINKS.map((link) =>
    link.href === "#how-it-works" && useHomeHowItWorks
      ? { ...link, href: "/#how-it-works" }
      : { ...link }
  )
}

export function LandingVariantANav({ variant }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const navLinks = navLinksForVariant(variant)

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    )
    focusables?.[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
        buttonRef.current?.focus()
      }
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (navRef.current?.contains(target)) return
      close()
      buttonRef.current?.focus()
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
    }
  }, [open, close])

  const handleCloseFromLink = () => {
    close()
    // Defer so navigation/hash update can proceed, then restore focus.
    requestAnimationFrame(() => {
      buttonRef.current?.focus()
    })
  }

  return (
    <nav ref={navRef} className="relative z-20 border-b border-white/5">
      <div className="container mx-auto pl-4 pr-5 sm:px-4 py-4 flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <BrandLogo className="h-5 min-[390px]:h-6 sm:h-9 w-auto max-w-none shrink-0" priority />
          <span className="hidden xl:inline text-xs text-white/40 font-medium tracking-wide ml-1 whitespace-nowrap">
            The Pilot&apos;s Decision Support System
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 min-w-0 shrink">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden lg:inline text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          <SignUpButton
            variant={variant}
            path="/"
            className="text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Log In
          </SignUpButton>
          <SignUpButton
            variant={variant}
            className="inline-flex items-center justify-center rounded-md text-xs font-semibold px-3 py-1.5 sm:h-9 sm:px-4 bg-sky-500 hover:bg-sky-400 text-white transition-colors whitespace-nowrap shrink-0"
          >
            Start Free 14-Day Trial
          </SignUpButton>

          <button
            ref={buttonRef}
            type="button"
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md text-white/80 hover:text-white hover:bg-white/5 transition-colors shrink-0"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => {
              setOpen((prev) => {
                const next = !prev
                if (!next) {
                  requestAnimationFrame(() => buttonRef.current?.focus())
                }
                return next
              })
            }}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Absolute panel avoids pushing the hero (no layout shift). */}
      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="lg:hidden absolute left-0 right-0 top-full z-30 border-b border-white/10 bg-[#0a1628]/95 backdrop-blur-md shadow-lg shadow-black/40"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              onClick={handleCloseFromLink}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-2">
            <SignUpButton
              variant={variant}
              path="/"
              className="rounded-md px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              Log In
            </SignUpButton>
            <SignUpButton
              variant={variant}
              className="inline-flex items-center justify-center rounded-md text-sm font-semibold px-3 py-2.5 bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Start Free 14-Day Trial
            </SignUpButton>
          </div>
        </div>
      </div>
    </nav>
  )
}
