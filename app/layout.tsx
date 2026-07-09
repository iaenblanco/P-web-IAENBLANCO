import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/CustomCursor'
import { Footer } from '@/components/Footer'
import { GoogleTagManager } from '@/components/GoogleTagManager'
import { Header } from '@/components/Header'
import {
  CONTACT_EMAIL,
  services,
  SITE_URL,
  socialLinks,
} from '@/lib/site'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IAenBlanco | Inteligencia artificial en operación',
    template: '%s | IAenBlanco',
  },
  description:
    'Diseñamos sitios web, plataformas, automatizaciones y soluciones de inteligencia artificial conectadas con operaciones reales.',
  keywords: [
    'inteligencia artificial para empresas',
    'soluciones de IA a medida',
    'desarrollo web con IA',
    'desarrollo Shopify',
    'software a medida',
    'automatización de procesos',
  ],
  authors: [{ name: 'IAenBlanco SpA', url: SITE_URL }],
  creator: 'IAenBlanco SpA',
  publisher: 'IAenBlanco SpA',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'IAenBlanco',
    title: 'IAenBlanco | Inteligencia artificial en operación',
    description:
      'Sistemas web, automatizaciones y soluciones de IA construidas alrededor de tu operación.',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'IAenBlanco',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'IAenBlanco | Inteligencia artificial en operación',
    description:
      'Sistemas web, automatizaciones y soluciones de IA construidas alrededor de tu operación.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f2ec',
  colorScheme: 'light',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'IAenBlanco SpA',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: CONTACT_EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+56 9 7768 4800',
    contactType: 'sales',
    availableLanguage: ['Spanish'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Badajoz 100 Of 1014',
    addressLocality: 'Las Condes',
    addressRegion: 'Santiago',
    addressCountry: 'CL',
  },
  areaServed: 'Latin America',
  sameAs: [socialLinks.linkedin, socialLinks.instagram],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de IAenBlanco',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.seoDescription,
        url: `${SITE_URL}/servicios/${service.slug}/`,
      },
    })),
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5MNF9G4Z'

  return (
    <html lang="es" className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {process.env.NODE_ENV === 'production' ? <GoogleTagManager gtmId={gtmId} /> : null}
        <Header />
        {children}
        <Footer />
        <CustomCursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  )
}
