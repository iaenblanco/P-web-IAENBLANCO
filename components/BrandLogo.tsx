import Image from 'next/image'

const brandLogoAssets = {
  unificalo: {
    src: '/brand-assets/logo-unificalo.webp',
    width: 420,
    height: 420,
  },
  citaly: {
    src: '/brand-assets/logo-citaly.webp',
    width: 98,
    height: 30,
  },
  'citaly-mark': {
    src: '/brand-assets/logo-citaly-mark.webp',
    width: 180,
    height: 180,
  },
  propinvest: {
    src: '/brand-assets/logo-propinvest.webp',
    width: 520,
    height: 212,
  },
  'granja-magdalena': {
    src: '/brand-assets/logo-granja-magdalena.webp',
    width: 520,
    height: 316,
  },
  yomercargo: {
    src: '/brand-assets/logo-yomercargo.webp',
    width: 420,
    height: 311,
  },
  granjapet: {
    src: '/brand-assets/logo-granjapet.webp',
    width: 420,
    height: 218,
  },
  'inasec-pets': {
    src: '/brand-assets/inasec-pets-logo.webp',
    width: 185,
    height: 104,
  },
} as const

type BrandLogoProps = {
  name: string
  alt?: string
  className?: string
  priority?: boolean
  sizes?: string
  loading?: 'eager' | 'lazy'
}

export function BrandLogo({
  name,
  alt = '',
  className,
  priority = false,
  sizes = '(max-width: 768px) 120px, 220px',
  loading,
}: BrandLogoProps) {
  const asset = brandLogoAssets[name as keyof typeof brandLogoAssets]

  if (!asset) return null

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      className={className ? `brand-logo brand-logo--${name} ${className}` : `brand-logo brand-logo--${name}`}
      sizes={sizes}
      priority={priority}
      {...(loading && !priority ? { loading } : {})}
      unoptimized
    />
  )
}
