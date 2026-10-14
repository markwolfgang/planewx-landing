import { Caveat } from "next/font/google"

const caveat = Caveat({ subsets: ["latin"], weight: ["600"], display: "swap" })

interface FounderSignatureProps {
  closing?: string
  name?: string
  title?: string
}

/** Handwritten-style sign-off for founder letters (dark-theme friendly). */
export function FounderSignature({
  closing = "Blue skies,",
  name = "Mark",
  title = "Mark Wolfgang, Founder, PlaneWX",
}: FounderSignatureProps) {
  return (
    <div className="mt-10" data-testid="founder-signature">
      <p className="text-lg text-white/80">{closing}</p>
      <p className={`${caveat.className} mt-1 text-5xl leading-none text-sky-300`} aria-label={name}>
        {name}
      </p>
      <p className="mt-2 text-sm text-white/50">{title}</p>
    </div>
  )
}
