import { Caveat } from "next/font/google"
import { SOCIAL_LINKS } from "@/components/shared/social-links"

const caveat = Caveat({ subsets: ["latin"], weight: ["600"], display: "swap" })

interface FounderSignatureProps {
  closing?: string
  name?: string
  title?: string
  link?: { href: string; label: string }
  showSocial?: boolean
}

/** Handwritten-style sign-off for founder letters (dark-theme friendly). */
export function FounderSignature({
  closing = "Blue skies,",
  name = "Mark",
  title = "Mark Wolfgang, Founder, PlaneWX",
  link,
  showSocial = true,
}: FounderSignatureProps) {
  return (
    <div className="mt-10" data-testid="founder-signature">
      <p className="text-lg text-white/80">{closing}</p>
      <p className={`${caveat.className} mt-1 text-5xl leading-none text-sky-300`} aria-label={name}>
        {name}
      </p>
      <p className="mt-2 text-sm text-white/50">{title}</p>
      {link && (
        <p className="mt-3 text-sm">
          <a href={link.href} className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </p>
      )}
      {showSocial && (
        <div className="mt-4 flex items-center gap-4" data-testid="founder-signature-social">
          <span className="text-xs uppercase tracking-wide text-white/40">Follow PlaneWX</span>
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/40 transition-colors hover:text-white/80"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
