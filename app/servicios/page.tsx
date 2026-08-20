import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'
import { services, SITE_URL, getWhatsappUrl } from '@/lib/site'
import {
  serviceProblemEntries,
  websiteProofCases,
} from '@/lib/services-content'

export const metadata: Metadata = {
  title: 'Todo lo que hacemos, explicado sin tecnicismos',
  description:
    'Sitios web y tiendas online, programas a la medida de tu negocio, tareas que se hacen solas, asistentes con inteligencia artificial y búsqueda de clientes nuevos.',
  alternates: {
    canonical: `${SITE_URL}/servicios/`,
  },
  openGraph: {
    title: 'Todo lo que hacemos, explicado sin tecnicismos | IAenBlanco',
    description:
      'Sitios web, programas a medida, tareas automáticas, asistentes con IA y búsqueda de clientes nuevos para empresas chilenas.',
    url: `${SITE_URL}/servicios/`,
    siteName: 'IAenBlanco',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'IAenBlanco: sitios web, tiendas online y programas a la medida de tu negocio.',
      },
    ],
  },
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function serviceNameForSlug(slug?: string) {
  if (!slug) return 'Diagnóstico'
  return services.find((service) => service.slug === slug)?.shortTitle || 'Servicios'
}

export default function ServicesIndexPage() {
  const coreServices = services.filter((service) => service.slug !== 'prospeccion-b2b-gestionada')
  const managedService = services.find((service) => service.slug === 'prospeccion-b2b-gestionada')
  const diagnosticUrl = getWhatsappUrl('Hola IAenBlanco, quiero diagnosticar qué servicio necesita mi negocio.')

  return (
    <main id="contenido" className="services-index">
      <section className="services-index-hero">
        <div className="section-shell services-index-hero__inner">
          <div>
            <p className="eyebrow">Servicios IAenBlanco</p>
            <h1>Todo lo que hacemos, explicado sin tecnicismos.</h1>
          </div>
          <p>
            Hacemos sitios web y tiendas online, programas a la medida de tu negocio, tareas que
            se hacen solas y asistentes con inteligencia artificial. Y si lo que necesitas son
            clientes nuevos, eso lo operamos nosotros mes a mes.
          </p>
        </div>
      </section>

      <section className="services-index-section">
        <div className="section-shell">
          <div className="services-index-heading">
            <p className="eyebrow">Empieza por acá</p>
            <h2>Elige la frase que más se parece a lo que te pasa.</h2>
          </div>
          <div className="services-index-problems">
            {serviceProblemEntries.map((entry) => {
              const isExternal = entry.href.startsWith('http')
              const serviceId = entry.serviceSlug || 'diagnostico'
              const serviceName = serviceNameForSlug(entry.serviceSlug)
              const body = (
                <>
                  <strong>{entry.label}</strong>
                  <span>{entry.detail}</span>
                  <ArrowUpRight />
                </>
              )

              return isExternal ? (
                <a
                  key={entry.label}
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="service_whatsapp_click"
                  data-service-id={serviceId}
                  data-service-name={serviceName}
                  data-entry-problem={entry.label}
                >
                  {body}
                </a>
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  prefetch={false}
                  data-analytics-event="service_cta_click"
                  data-service-id={serviceId}
                  data-service-name={serviceName}
                  data-entry-problem={entry.label}
                >
                  {body}
                </Link>
              )
            })}
          </div>
          <div className="services-index-editorial-note">
            <span />
            <p>
              No necesitas saber cómo se llama la solución. Para eso está la primera conversación:
              tú cuentas qué te está costando y nosotros te decimos qué haríamos.
            </p>
          </div>
        </div>
      </section>

      <section className="services-index-section">
        <div className="section-shell">
          <div className="services-index-heading">
            <p className="eyebrow">Lo que construimos</p>
            <h2>Cuatro cosas que hacemos para ti, y que después quedan tuyas.</h2>
          </div>
          <div className="services-index-cards">
            {coreServices.map((service) => (
              <article key={service.slug}>
                <div>
                  <span>{service.index}</span>
                  <p>{service.eyebrow}</p>
                </div>
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                <Link
                  href={`/servicios/${service.slug}`}
                  prefetch={false}
                  data-analytics-event="service_cta_click"
                  data-service-id={service.slug}
                  data-service-name={service.shortTitle}
                >
                  Ver cómo lo hacemos
                  <ArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {managedService ? (
        <section className="services-index-section services-index-section--managed">
          <div className="section-shell services-managed-card">
            <div>
              <p className="eyebrow">Este lo operamos nosotros</p>
              <h2>{managedService.title}</h2>
              <p>{managedService.description}</p>
            </div>
            <div className="services-managed-card__flow" aria-label="Cómo trabajamos la búsqueda de clientes">
              {managedService.signals.map((signal) => <span key={signal}>{signal}</span>)}
            </div>
            <Link
              href={`/servicios/${managedService.slug}`}
              prefetch={false}
              data-analytics-event="service_cta_click"
              data-service-id={managedService.slug}
              data-service-name={managedService.shortTitle}
            >
              Ver cómo funciona
              <ArrowRight />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="services-index-section services-index-section--web-proof">
        <div className="section-shell">
          <div className="services-index-heading">
            <p className="eyebrow">Trabajos reales</p>
            <h2>Negocios chilenos para los que ya trabajamos. Ábrelos y revisa.</h2>
          </div>
          <div className="services-web-proof-grid">
            {websiteProofCases.map((item) => (
              <article key={item.client}>
                <figure className="services-web-proof-grid__captura">
                  <Image
                    src={`/trabajos/${item.captura}.webp`}
                    alt={`Portada del sitio de ${item.client}`}
                    width={1120}
                    height={700}
                    sizes="(max-width: 900px) 100vw, 380px"
                    quality={78}
                  />
                </figure>
                <div className="services-web-proof-grid__logo">
                  <BrandLogo name={item.logo} alt={item.client} loading="eager" sizes="40px" />
                </div>
                <span>{item.sector}</span>
                <h3>{item.client}</h3>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <p className="services-web-proof-grid__medida">
                  <span>Se ve en</span>
                  {item.velocidad}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="services-web-proof-grid__link"
                  data-analytics-event="service_case_click"
                  data-service-id="desarrollo-web-ia"
                  data-service-name="Sitios web y Shopify"
                  data-case-name={item.client}
                >
                  Abrir el sitio
                  <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-index-final">
        <div className="section-shell services-index-final__inner">
          <div>
            <p className="eyebrow">Sin compromiso</p>
            <h2>No necesitas saber qué pedir.</h2>
            <p>
              Llega con el problema, no con la solución. Nosotros te decimos qué conviene hacer
              primero, qué puede esperar y qué directamente no vale la pena.
            </p>
          </div>
          <a
            href={diagnosticUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-analytics-event="service_whatsapp_click"
            data-service-id="diagnostico"
            data-service-name="Diagnóstico"
          >
            Conversemos, sin costo
            <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  )
}
