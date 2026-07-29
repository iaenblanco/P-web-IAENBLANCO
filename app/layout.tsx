import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/Footer'
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
  const gtmSnippet = `
    (function(w,d,s,l,i){
      var productionHosts = ['iaenblanco.com','www.iaenblanco.com'];
      if (productionHosts.indexOf(w.location.hostname) === -1 || !i || i.indexOf('GTM-') !== 0) return;
      w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `
  const eventTrackingSnippet = `
    (function(w,d){
      if (w.__iaenblancoTracking) return;
      w.__iaenblancoTracking = true;
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
        var path = pathFor(anchor);
        var slug = path.split('/servicios/')[1] || '';
        slug = slug.replace(/\\/$/, '');
        var services = {
          'desarrollo-web-ia': 'Sitios web',
          'plataformas-software-medida': 'Software',
          automatizaciones: 'Automatizaciones',
          'soluciones-ia-medida': 'IA a medida',
          'leads-magnet': 'Prospeccion B2B'
        };
        return services[slug] || '';
      }
      function productNameFrom(anchor){
        var href = anchor.getAttribute('href') || '';
        var absolute = anchor.href || href;
        if (absolute.indexOf('unificalo.cl') !== -1) return 'Unificalo';
        if (absolute.indexOf('citaly.cl') !== -1) return 'Citaly';
        if (absolute.indexOf('leads.iaenblanco.com') !== -1) return 'Leads';
        if (pathFor(anchor).indexOf('/productos') === 0) return 'Productos';
        return '';
      }
      function eventNameFor(anchor){
        var href = anchor.getAttribute('href') || '';
        var absolute = anchor.href || href;
        if (href.indexOf('wa.me/') !== -1 || absolute.indexOf('wa.me/') !== -1) return 'cta_whatsapp_click';
        if (href.indexOf('/servicios/') === 0 || absolute.indexOf('/servicios/') !== -1) return 'service_click';
        if (href.indexOf('/productos') === 0 || absolute.indexOf('/productos') !== -1) return 'product_click';
        if (
          absolute.indexOf('unificalo.cl') !== -1 ||
          absolute.indexOf('citaly.cl') !== -1 ||
          absolute.indexOf('leads.iaenblanco.com') !== -1
        ) return 'product_click';
        if (href.indexOf('/contacto') === 0 || absolute.indexOf('/contacto') !== -1 || href.indexOf('mailto:') === 0) return 'contact_click';
        return '';
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
          service_name: serviceNameFrom(anchor),
          product_name: productNameFrom(anchor),
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }, { passive: true });
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
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {process.env.NODE_ENV === 'production' ? (
          <>
            <script dangerouslySetInnerHTML={{ __html: eventTrackingSnippet }} />
            <script dangerouslySetInnerHTML={{ __html: gtmSnippet }} />
          </>
        ) : null}
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  )
}
