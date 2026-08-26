import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { BotonWhatsapp } from '@/components/BotonWhatsapp'
import { ConsentBanner } from '@/components/ConsentBanner'
import { Footer } from '@/components/Footer'
import { GoogleTagManager } from '@/components/GoogleTagManager'
import { Header } from '@/components/Header'
import {
  COMPANY_LEGAL_NAME,
  COMPANY_PHONE,
  CONTACT_EMAIL,
  products,
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
    default: 'IAenBlanco | Sitios web, programas a medida e IA para tu negocio',
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
    title: 'IAenBlanco | Sitios web, programas a medida e IA para tu negocio',
    description:
      'Hacemos sitios web, tiendas online, programas a la medida de tu negocio y asistentes con inteligencia artificial. En Chile.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'IAenBlanco: sitios web, tiendas online y programas a la medida de tu negocio.',
      },
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
  logo: `${SITE_URL}/logo.png`,
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5MNF9G4Z'
  const serviceTrackingCatalogJson = JSON.stringify(serviceTrackingCatalog).replace(/</g, '\\u003c')
  const productTrackingCatalogJson = JSON.stringify(productTrackingCatalog).replace(/</g, '\\u003c')
  const eventTrackingSnippet = `
    (function(w,d){
      if (w.__iaenblancoTracking) return;
      w.__iaenblancoTracking = true;
      var serviceCatalog = ${serviceTrackingCatalogJson};
      var productCatalog = ${productTrackingCatalogJson};
      function clean(text){ return (text || '').replace(/\\s+/g,' ').trim().slice(0,120); }
      function sectionFor(element){
        var section = element.closest ? element.closest('section') : null;
        if (!section) return '';
        return section.id || section.getAttribute('aria-label') || section.className || '';
      }
      function deviceType(){
        var width = w.innerWidth || d.documentElement.clientWidth || 0;
        if (width < 768) return 'mobile';
        if (width < 1100) return 'tablet';
        return 'desktop';
      }
      function trafficSourceRaw(){
        var params = new URLSearchParams(w.location.search);
        return params.get('utm_source') || params.get('source') || d.referrer || 'direct';
      }
      function pathFor(anchor){
        try { return new URL(anchor.href || anchor.getAttribute('href') || '', w.location.href).pathname; }
        catch (error) { return anchor.getAttribute('href') || ''; }
      }
      function serviceNameFrom(anchor){
        var explicit = anchor.getAttribute('data-service-name');
        if (explicit) return clean(explicit);
        return serviceMetaFromPath(pathFor(anchor)).name;
      }
      function serviceIdFrom(anchor){
        var explicit = anchor.getAttribute('data-service-id');
        if (explicit) return clean(explicit);
        return serviceMetaFromPath(pathFor(anchor)).id;
      }
      function serviceNameFromPath(path){
        return serviceMetaFromPath(path).name;
      }
      function serviceIdFromPath(path){
        return serviceMetaFromPath(path).id;
      }
      function serviceMetaFromPath(path){
        var slug = path.split('/servicios/')[1] || '';
        slug = slug.replace(/\\/$/, '');
        return serviceCatalog[slug] || { id: '', name: '' };
      }
      function productIdFrom(anchor){
        var explicit = anchor.getAttribute('data-product-id');
        if (explicit) return clean(explicit);
        return productMetaFrom(anchor).id;
      }
      function productNameFrom(anchor){
        return productMetaFrom(anchor).name;
      }
      function productMetaFrom(anchor){
        var explicitId = anchor.getAttribute('data-product-id');
        var explicitName = anchor.getAttribute('data-product-name');
        if (explicitId || explicitName) return { id: clean(explicitId), name: clean(explicitName) };
        var href = anchor.getAttribute('href') || '';
        var absolute = anchor.href || href;
        var anchorPath = pathFor(anchor);
        for (var index = 0; index < productCatalog.length; index += 1) {
          var product = productCatalog[index];
          if (product.href.charAt(0) === '/' && anchorPath.indexOf(product.href) === 0) return { id: product.id, name: product.name };
          if (product.href.charAt(0) !== '/' && absolute.indexOf(product.href) !== -1) return { id: product.id, name: product.name };
        }
        return { id: '', name: '' };
      }
      function eventNameFor(anchor){
        var explicitEvent = anchor.getAttribute('data-analytics-event');
        if (explicitEvent) return clean(explicitEvent);
        var href = anchor.getAttribute('href') || '';
        var absolute = anchor.href || href;
        if (href.indexOf('wa.me/') !== -1 || absolute.indexOf('wa.me/') !== -1) {
          return w.location.pathname.indexOf('/servicios') === 0 ? 'service_whatsapp_click' : 'cta_whatsapp_click';
        }
        if (href.indexOf('/servicios/') === 0 || absolute.indexOf('/servicios/') !== -1) return 'service_click';
        if (productMetaFrom(anchor).id) return 'product_click';
        if (href.indexOf('/contacto') === 0 || absolute.indexOf('/contacto') !== -1 || href.indexOf('mailto:') === 0) return 'contact_click';
        return '';
      }
      if (w.location.pathname.indexOf('/servicios') === 0) {
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'service_view',
          service_id: serviceIdFromPath(w.location.pathname),
          service_name: serviceNameFromPath(w.location.pathname),
          page_path: w.location.pathname,
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }
      d.addEventListener('click', function(event){
        var target = event.target;
        var anchor = target && target.closest ? target.closest('a[href]') : null;
        var caseElement = target && target.closest ? target.closest('.trust-proof-card, .featured-case__more article, .case-window') : null;
        if (!anchor && caseElement) {
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({
            event: 'case_click',
            case_name: clean(caseElement.textContent),
            page_path: w.location.pathname,
            section: sectionFor(caseElement),
            device_type: deviceType(),
            traffic_source_raw: trafficSourceRaw()
          });
          return;
        }
        if (!anchor) return;
        var eventName = eventNameFor(anchor);
        if (!eventName) return;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: eventName,
          cta_text: clean(anchor.textContent),
          link_text: clean(anchor.textContent),
          link_url: anchor.href,
          destination: anchor.href,
          page_path: w.location.pathname,
          section: sectionFor(anchor),
          service_id: serviceIdFrom(anchor),
          service_name: serviceNameFrom(anchor),
          source_service_id: clean(anchor.getAttribute('data-source-service-id')),
          source_service_name: clean(anchor.getAttribute('data-source-service-name')),
          target_service_id: clean(anchor.getAttribute('data-target-service-id')) || serviceIdFrom(anchor),
          target_service_name: clean(anchor.getAttribute('data-target-service-name')) || serviceNameFrom(anchor),
          product_id: productIdFrom(anchor),
          product_name: productNameFrom(anchor),
          case_name: clean(anchor.getAttribute('data-case-name')),
          entry_problem: clean(anchor.getAttribute('data-entry-problem')),
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }, { passive: true });
      d.addEventListener('toggle', function(event){
        var target = event.target;
        var detail = target && target.closest ? target.closest('details[data-service-faq]') : null;
        if (!detail || !detail.open) return;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'service_faq_open',
          service_id: clean(detail.getAttribute('data-service-id')) || serviceIdFromPath(w.location.pathname),
          service_name: clean(detail.getAttribute('data-service-name')) || serviceNameFromPath(w.location.pathname),
          faq_question: clean(detail.querySelector('summary') ? detail.querySelector('summary').textContent : ''),
          page_path: w.location.pathname,
          section: sectionFor(detail),
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }, true);
      d.addEventListener('focusin', function(event){
        var target = event.target;
        var field = target && target.closest ? target.closest('input, textarea, select, [contenteditable="true"]') : null;
        if (!field || field.__iaenblancoFormStarted) return;
        var form = field.closest ? field.closest('form') : null;
        if (!form) return;
        field.__iaenblancoFormStarted = true;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'form_start',
          form_name: form.getAttribute('name') || form.id || sectionFor(form) || 'form',
          page_path: w.location.pathname,
          section: sectionFor(form),
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }, { passive: true });
      d.addEventListener('submit', function(event){
        var form = event.target;
        if (!form || form.tagName !== 'FORM') return;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'form_submit',
          form_name: form.getAttribute('name') || form.id || sectionFor(form) || 'form',
          page_path: w.location.pathname,
          section: sectionFor(form),
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }, true);
      d.addEventListener('iaenblanco:generate_lead', function(event){
        var detail = event.detail || {};
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'generate_lead',
          form_name: clean(detail.form_name) || clean(detail.formName) || 'form',
          page_path: w.location.pathname,
          section: clean(detail.section) || '',
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      });
      d.addEventListener('iaenblanco:form_error', function(event){
        var detail = event.detail || {};
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'form_error',
          form_name: clean(detail.form_name) || clean(detail.formName) || 'form',
          error_type: clean(detail.error_type) || clean(detail.errorType) || 'unknown_error',
          page_path: w.location.pathname,
          section: clean(detail.section) || '',
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      });
    })(window,document);
  `

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
        <ConsentBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  )
}
