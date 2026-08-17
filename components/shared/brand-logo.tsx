type BrandLogoProps = {
  variant?: "wordmark" | "wordmarkTransparent" | "icon"
  className?: string
  alt?: string
  priority?: boolean
}

const brandAssets = {
  wordmark: {
    src: "/logos/planewx-wordmark.svg",
    alt: "PlaneWX",
  },
  // The same gradient wordmark with the baked-in #0b0b0e background plate
  // removed. Use on any surface that isn't near-black, where the plate would
  // otherwise read as a visible dark rectangle.
  wordmarkTransparent: {
    src: "/logos/planewx-wordmark-transparent.svg",
    alt: "PlaneWX",
  },
  icon: {
    src: "/logos/planewx-icon.svg",
    alt: "PlaneWX icon",
  },
} as const

export function BrandLogo({
  variant = "wordmark",
  className,
  alt,
}: BrandLogoProps) {
  const asset = brandAssets[variant]

  // SVGs don't benefit from Next.js Image optimization; use a plain img tag
  // so the optimization API never interferes with SVG rendering.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={asset.src}
      alt={alt ?? asset.alt}
      className={className}
      loading="eager"
    />
  )
}
