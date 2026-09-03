import fs from 'node:fs'
import path from 'node:path'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { BotonWhatsapp } from '@/components/BotonWhatsapp'
import { ConsentBanner } from '@/components/ConsentBanner'
import { CustomCursor } from '@/components/CustomCursor'
import { Footer } from '@/components/Footer'
import { GoogleTagManager } from '@/components/GoogleTagManager'
import { Header } from '@/components/Header'
import { VistaSecciones } from '@/components/VistaSecciones'
import {
  COMPANY_LEGAL_NAME,
  COMPANY_PHONE,
  CONTACT_EMAIL,
  products,
  services,
  OG_IMAGE,
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

/*
 * La bajada llana, escrita una sola vez. Metadata y organizationSchema la
 * tomaban por separado y por eso llegaron a divergir: una en jerga y la otra
 * llana, y la que Google mostraba era la jerga.
 */
const BAJADA =
  'Hacemos sitios web, tiendas online, programas a la medida de tu negocio y asistentes con inteligencia artificial. En Chile.'

/*
 * El lema gobernante, decidido por el dueño el 30-ago-2026. Vive tambien como
 * <h2> del pie (components/Footer.tsx:39); aca se declara para el schema.
 */
const LEMA = 'Trabajamos con negocios chilenos que ya están funcionando.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IAenBlanco | Sitios web, programas a medida e IA para tu negocio',
    template: '%s | IAenBlanco',
  },
  // La misma bajada que ya publicaba el bloque openGraph. Estaban divergidas:
  // una en jerga y la otra llana, y la que Google muestra era la jerga.
  // Cambiada el 30-ago-2026; leer Search Console pasadas unas semanas.
  description: BAJADA,
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
    title: 'IAenBlanco | Sitios web, programas a medida e IA para tu negocio',
    description: BAJADA,
    images: [
      OG_IMAGE,
    ],
  },
  /* Sin title ni description propios: los tenia congelados con la copia de la
     portada y salian iguales en todas las rutas, contradiciendo al og:title de
     cada pagina. Sin ellos, Next los deriva por ruta. */
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
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
  name: COMPANY_LEGAL_NAME,
  url: SITE_URL,
  // el logo del schema apunta al icono del manifest: es el mismo dibujo a
  // 512x512 y 84 KB, en vez del logo.png de 1,49 MB que se borro en la fase 11
  logo: `${SITE_URL}/icon-512x512.png`,
  email: CONTACT_EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: COMPANY_PHONE,
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
  // Sin areaServed: la PostalAddress de arriba ya declara addressCountry 'CL',
  // y 'Latin America' era territorio que el sitio no sostiene en ninguna parte.
  alternateName: 'IAenBlanco',
  slogan: LEMA,
  description: BAJADA,
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

const serviceTrackingCatalog = services.reduce<Record<string, { id: string; name: string }>>(
  (catalog, service) => {
    catalog[service.slug] = { id: service.slug, name: service.shortTitle }
    return catalog
  },
  {
    '': { id: 'servicios', name: 'Servicios' },
    /* 'leads-magnet' era el nombre viejo del servicio de buscar clientes y
       quedaba aca para que los enlaces antiguos siguieran midiendose con el
       nombre correcto. Ese servicio ya no existe, asi que la etiqueta apunta
       a Leads, el programa: quien llegue por un enlace viejo termina en
       /productos/ y ahi es donde queremos verlo contado. */
    'leads-magnet': { id: 'leads', name: 'Leads' },
  },
)

const productTrackingCatalog = [
  ...products.map((product) => ({
    id: product.id,
    name: product.name,
    href: product.href,
  })),
  { id: 'productos', name: 'Productos', href: '/productos' },
]


// El bloque de medicion vive en lib/analitica-eventos.js y no aca en linea: son
// 12.955 caracteres que se repetian identicos en las 13 paginas generadas, o sea
// 168 KB de HTML que ningun editor sabia colorear y ningun linter revisaba. Se
// lee en tiempo de build -esto es un Server Component, corre en node- y se sigue
// inyectando en linea, byte a byte igual que antes.
// Los saltos se normalizan a \n a proposito: el arbol esta en CRLF y un template
// literal de JavaScript ya los normalizaba solo, asi que sin esa linea el HTML
// servido cambiaria aunque el codigo fuera identico.
// El reemplazo va con funcion y no con string: los catalogos son JSON y un $& en
// el texto se interpretaria como patron de replace.
const plantillaAnalitica = fs
  .readFileSync(path.join(process.cwd(), 'lib', 'analitica-eventos.js'), 'utf8')
  .replace(/\r\n/g, '\n')

const serviceTrackingCatalogJson = JSON.stringify(serviceTrackingCatalog).replace(/</g, '\\u003c')
const productTrackingCatalogJson = JSON.stringify(productTrackingCatalog).replace(/</g, '\\u003c')

const eventTrackingSnippet = plantillaAnalitica
  .replace('__IAENBLANCO_SERVICE_CATALOG__', () => serviceTrackingCatalogJson)
  .replace('__IAENBLANCO_PRODUCT_CATALOG__', () => productTrackingCatalogJson)
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5MNF9G4Z'

  return (
    <html lang="es" className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        {/* Va primero de todo y a proposito: corre antes de que el navegador
            parsee una sola escena, o sea antes del primer pintado. Sin esto,
            las animaciones de las escenas arrancan al cargar y recien se
            detienen cuando React hidrata: medido, 1.100 ms de funcion dada
            en una sala vacia para las escenas que estan bajo el pliegue.
            La clase la pone el script y no el servidor porque si no hay
            JavaScript no hay quien las despierte: sin ella las escenas
            corren solas, como hasta ahora. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('con-js')",
          }}
        />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {process.env.NODE_ENV === 'production' ? (
          <>
            <script dangerouslySetInnerHTML={{ __html: eventTrackingSnippet }} />
            <GoogleTagManager gtmId={gtmId} />
          </>
        ) : null}
        <Header />
        {children}
        <Footer />
        <BotonWhatsapp />
        {/* Fuera del guardia de produccion de arriba a proposito: no pinta nada
            ni carga nada, solo avisa por CustomEvent, y el despachador que lo
            escucha si esta detras del guardia. Dejarlo suelto permite revisar
            en local que las seis secciones se cuentan cuando corresponde, que
            es lo unico de esta medicion que se puede comprobar sin publicar. */}
        <VistaSecciones />
        <ConsentBanner />
        {/* El cursor personalizado. Se monta aca, en el layout raiz, y no por
            pagina, porque los 23 data-cursor viven en 13 archivos repartidos
            por todas las rutas y el anillo es uno solo para el sitio entero.
            No pinta nada en el servidor ni en el primer render del cliente:
            arranca con enabled=false y recien se enciende dentro de un efecto,
            cuando el navegador confirma (pointer: fine) and
            (prefers-reduced-motion: no-preference). En tactil y con movimiento
            reducido devuelve null, asi que no hay nodo, ni escuchas, ni
            requestAnimationFrame. */}
        <CustomCursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  )
}
