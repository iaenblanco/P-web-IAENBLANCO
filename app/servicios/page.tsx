import type { Metadata } from 'next'
import Link from 'next/link'
import { services, SITE_URL, getWhatsappUrl } from '@/lib/site'
import {
  relatedServiceCases,
  serviceProblemEntries,
} from '@/lib/services-content'

export const metadata: Metadata = {
  title: 'Servicios de IA, software, automatización y web',
  description:
    'Servicios para transformar operaciones reales en sistemas digitales: sitios web, software, automatizaciones, soluciones de IA y prospección B2B gestionada.',
  alternates: {
    canonical: `${SITE_URL}/servicios/`,
  },
  openGraph: {
    title: 'Servicios de IA, software, automatización y web | IAenBlanco',
    description:
      'Sitios web, plataformas, automatizaciones, soluciones de IA y prospección B2B gestionada para operaciones reales.',
    url: `${SITE_URL}/servicios/`,
    siteName: 'IAenBlanco',
    type: 'website',
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

export default function ServicesIndexPage() {
  const coreServices = services.filter((service) => service.slug !== 'prospeccion-b2b-gestionada')
  const managedService = services.find((service) => service.slug === 'prospeccion-b2b-gestionada')
  const diagnosticUrl = getWhatsappUrl('Hola IAenBlanco, quiero diagnosticar que servicio necesita mi negocio.')

  return (
    <main id="contenido" className="services-index">
      <section className="services-index-hero">
        <div className="section-shell services-index-hero__inner">
          <div>
            <p className="eyebrow">Servicios IAenBlanco</p>
            <h1>De una necesidad abierta a un sistema funcionando.</h1>
          </div>
          <p>
            Disenamos y construimos sitios web, plataformas, automatizaciones y soluciones de IA
            alrededor de la operacion real de tu negocio. Si el problema es comercial, tambien
            podemos operar prospeccion B2B gestionada.
          </p>
        </div>
      </section>

      <section className="services-index-section">
        <div className="section-shell">
          <div className="services-index-heading">
            <p className="eyebrow">Entrada por problema</p>
            <h2>Elige la frase que mas se parece a lo que necesitas resolver.</h2>
          </div>
          <div className="services-index-problems">
            {serviceProblemEntries.map((entry) => {
              const isExternal = entry.href.startsWith('http')
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
                  data-service-name="Diagnóstico"
                >
                  {body}
                </a>
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  prefetch={false}
                  data-analytics-event="service_cta_click"
                  data-service-name={entry.label}
                >
                  {body}
                </Link>
              )
            })}
          </div>
          <div className="services-index-editorial-note">
            <span />
            <p>
              No necesitas saber si el problema requiere una web, automatizacion, software o IA.
              La primera conversacion sirve para definirlo con criterio y ordenar el siguiente paso.
            </p>
          </div>
        </div>
      </section>

      <section className="services-index-section">
        <div className="section-shell">
          <div className="services-index-heading">
            <p className="eyebrow">Capacidades principales</p>
            <h2>Cuatro formas de construir la base digital de tu operacion.</h2>
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
                  data-service-name={service.shortTitle}
                >
                  Ver servicio
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
              <p className="eyebrow">Operación gestionada</p>
              <h2>{managedService.title}</h2>
              <p>{managedService.description}</p>
            </div>
            <div className="services-managed-card__flow" aria-label="ICP, evidencia, scoring y seguimiento">
              {managedService.signals.map((signal) => <span key={signal}>{signal}</span>)}
            </div>
            <Link
              href={`/servicios/${managedService.slug}`}
              prefetch={false}
              data-analytics-event="service_cta_click"
              data-service-name={managedService.shortTitle}
            >
              Ver operación
              <ArrowRight />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="services-index-section" id="casos-relacionados">
        <div className="section-shell">
          <div className="services-index-heading">
            <p className="eyebrow">Casos relacionados</p>
            <h2>Trabajo real aplicado en operaciones y canales concretos.</h2>
          </div>
          <div className="services-case-grid">
            {relatedServiceCases.map((item) => (
              <article key={item.client}>
                <span>{item.label}</span>
                <h3>{item.client}</h3>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-index-final">
        <div className="section-shell services-index-final__inner">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2>No necesitas llegar con la solucion definida.</h2>
            <p>
              Puedes llegar con el problema, el proceso o la idea. Nosotros te ayudamos a ordenar
              que construir, que automatizar y que dejar para una siguiente etapa.
            </p>
          </div>
          <a
            href={diagnosticUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-analytics-event="service_whatsapp_click"
            data-service-name="Diagnóstico"
          >
            Pedir diagnóstico
            <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  )
}
