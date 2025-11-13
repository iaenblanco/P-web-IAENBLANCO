import type { Metadata } from 'next'
import './globals.css'
import { GoogleTagManager } from '@/components/GoogleTagManager'

export const metadata: Metadata = {
  title: 'IAenBlanco | Soluciones y Desarrollo con Inteligencia Artificial',
  description: 'Creamos soluciones web a medida, ofrecemos consultoría y te enseñamos sobre el poder de la IA para transformar tu negocio.',
  keywords: 'inteligencia artificial, IA, desarrollo web, consultoría IA, machine learning, automatización, transformación digital',
  authors: [{ name: 'IAenBlanco' }],
  creator: 'IAenBlanco',
  publisher: 'IAenBlanco',
  openGraph: {
    title: 'IAenBlanco | Soluciones y Desarrollo con Inteligencia Artificial',
    description: 'Creamos soluciones web a medida, ofrecemos consultoría y te enseñamos sobre el poder de la IA para transformar tu negocio.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com',
    siteName: 'IAenBlanco',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IAenBlanco | Soluciones y Desarrollo con Inteligencia Artificial',
    description: 'Creamos soluciones web a medida, ofrecemos consultoría y te enseñamos sobre el poder de la IA para transformar tu negocio.',
    creator: '@iaenblanco',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-de-verificacion-google-search-console',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com'}/#organization`,
        name: 'IAenBlanco',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com',
        logo: {
          '@type': 'ImageObject',
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com'}/logo.png`,
          width: 512,
          height: 512,
        },
        description: 'Especialistas en soluciones de Inteligencia Artificial para transformación digital de negocios.',
        foundingDate: '2024',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+56-9-XXXX-XXXX',
          contactType: 'customer service',
          email: 'nicolas@iaenblanco.com',
          availableLanguage: 'Spanish',
        },
        sameAs: [
          'https://linkedin.com/company/iaenblanco',
          'https://twitter.com/iaenblanco',
          process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com'}/#website`,
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com',
        name: 'IAenBlanco - Soluciones con IA',
        description: 'Creamos soluciones web a medida con Inteligencia Artificial',
        publisher: {
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com'}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com'}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Service',
        name: 'Desarrollo Web con IA',
        description: 'Integramos IA para crear sitios web dinámicos y personalizados',
        provider: {
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com'}/#organization`,
        },
        serviceType: 'Web Development',
        category: 'Inteligencia Artificial',
      },
      {
        '@type': 'Service',
        name: 'Consultoría IA',
        description: 'Análisis estratégico y recomendaciones de implementación de IA',
        provider: {
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com'}/#organization`,
        },
        serviceType: 'Consulting',
        category: 'Inteligencia Artificial',
      },
      {
        '@type': 'Service',
        name: 'Automatizaciones',
        description: 'Automatización de procesos empresariales para reducir costos y aumentar eficiencia. Diseñadas con IA.',
        provider: {
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iaenblanco.com'}/#organization`,
        },
        serviceType: 'Automation',
        category: 'Inteligencia Artificial',
      },
    ],
  }

  // Obtener GTM ID de variables de entorno o usar valor por defecto
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5MNF9G4Z'

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="font-sans">
        {/* Google Tag Manager - Se inyecta automáticamente en el head */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {children}
      </body>
    </html>
  )
}
