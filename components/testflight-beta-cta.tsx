import { ArrowRight } from "lucide-react"

const BETA_SUPPORTING_LINE =
  "for people who want the next version before it hits the App Store." as const

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all" as const

type TestFlightBetaCtaProps = {
  href: string
  /** Match product-page outline CTAs or apps-hub compact buttons. */
  size?: "default" | "compact"
  align?: "start" | "center" | "stretch"
  className?: string
}

export function TestFlightBetaCta({
  href,
  size = "default",
  align = "start",
  className,
}: TestFlightBetaCtaProps) {
  const padding =
    size === "compact" ? "px-6 py-3.5 w-full sm:w-auto" : "px-8 py-3.5"
  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "stretch"
        ? "items-stretch"
        : "items-stretch sm:items-start"

  return (
    <div className={`flex flex-col gap-1.5 ${alignClass} ${className ?? ""}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${BUTTON_BASE} ${padding} border border-white/15 bg-white/5 hover:bg-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60`}
      >
        Test the beta
        <ArrowRight className="h-4 w-4" />
      </a>
      <p className="text-xs text-white/40 leading-relaxed max-w-xs">
        {BETA_SUPPORTING_LINE}
      </p>
    </div>
  )
}
