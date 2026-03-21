import Image from "next/image"

type BrandLogoProps = {
  variant?: "wordmark" | "icon"
  className?: string
  alt?: string
  priority?: boolean
}

const brandAssets = {
  wordmark: {
    src: "/brand/planewx-wordmark.svg",
    width: 720,
    height: 140,
    alt: "PlaneWX",
  },
  icon: {
    src: "/brand/planewx-icon.svg",
    width: 512,
    height: 512,
    alt: "PlaneWX icon",
  },
} as const

export function BrandLogo({
  variant = "wordmark",
  className,
  alt,
  priority = false,
}: BrandLogoProps) {
  const asset = brandAssets[variant]

  return (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={className}
    />
  )
}
