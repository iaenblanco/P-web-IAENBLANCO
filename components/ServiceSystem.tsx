import Link from 'next/link'
import { getWhatsappUrl, services } from '@/lib/site'
import { serviceProblemEntries } from '@/lib/services-content'

function Arrow() {
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

function SystemDiagram() {
  const points = [
    [62, 136],
    [146, 72],
    [242, 116],
    [336, 58],
    [420, 132],
  ]

  return (
    <div className="system-diagram" aria-hidden="true">
      <div className="system-diagram__status">
        <span>system.map</span>
        <span>05 / 05</span>
      </div>
      <svg viewBox="0 0 480 230" fill="none">
        <path
          className="system-diagram__base"
          d="M62 136 146 72l96 44 94-58 84 74"
        />
        <path
          className="system-diagram__active-path"
          d={`M62 136 ${points.slice(1).map(([x, y]) => `L${x} ${y}`).join(' ')}`}
        />
        {points.map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`} className="is-active">
            <circle className="system-diagram__pulse" cx={cx} cy={cy} r="14" />
            <circle className="system-diagram__node" cx={cx} cy={cy} r="5" />
          </g>
        ))}
      </svg>
      <div className="system-diagram__readout">
        <span>Entrada</span>
        <strong>Problema</strong>
        <span>Salida</span>
        <strong>Sistema</strong>
      </div>
    </div>
  )
}

const serviceResults: Record<string, string> = {
  'desarrollo-web-ia': 'Una experiencia que se entiende rápido, proyecta confianza y lleva al visitante a conversar.',
  'plataformas-software-medida': 'Un panel o plataforma propia para ordenar permisos, datos y procesos internos.',
  automatizaciones: 'Flujos conectados que reducen copia manual, errores y tiempos muertos.',
  'soluciones-ia-medida': 'Un agente o herramienta de IA usable, conectado al contexto real del negocio.',
  'prospeccion-b2b-gestionada': 'Una cartera priorizada de empresas con evidencia y próximos pasos comerciales.',
}

const serviceLinkLabels: Record<string, string> = {
  'desarrollo-web-ia': 'Ver sitios web y Shopify',
  'plataformas-software-medida': 'Ver software',
  automatizaciones: 'Ver automatizaciones',
  'soluciones-ia-medida': 'Ver soluciones de IA',
  'prospeccion-b2b-gestionada': 'Ver prospección B2B',
}

export function ServiceSystem() {
  const coreServices = services.filter((service) => service.slug !== 'prospeccion-b2b-gestionada')
  const commercialService = services.find((service) => service.slug === 'prospeccion-b2b-gestionada')
  const diagnosticUrl = getWhatsappUrl('Hola IAenBlanco, quiero revisar qué servicio calza mejor con mi negocio.')

  return (
    <section
      className="services-system"
      id="servicios"
      aria-labelledby="services-heading"
      data-cursor-theme="signal"
    >
      <div className="section-shell">
        <div className="services-system__intro">
          <p className="eyebrow">Sistema de capacidades</p>
          <h2 id="services-heading">
            Una operación conectada necesita más que una herramienta aislada.
          </h2>
          <p>
            Trabajamos de dos formas. Construimos a medida lo que tu operación necesita, con las
            cuatro capacidades de abajo. Y si el problema es comercial, operamos nosotros la
            prospección B2B mes a mes. Aparte tenemos tres productos propios que puedes contratar
            directo, sin proyecto de por medio.
          </p>
        </div>

        <div className="services-problem-router" aria-label="Entradas por problema">
          {serviceProblemEntries.map((entry) => {
            const isExternal = entry.href.startsWith('http')
            const serviceId = entry.serviceSlug || 'diagnostico'
            const serviceName = serviceNameForSlug(entry.serviceSlug)
            const className = entry.serviceSlug
              ? 'services-problem-router__item'
              : 'services-problem-router__item services-problem-router__item--diagnostic'
            const body = (
              <>
                <strong>{entry.label}</strong>
                <span>{entry.detail}</span>
                <Arrow />
              </>
            )

            return isExternal ? (
              <a
                key={entry.label}
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className={className}
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
                className={className}
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
        <div className="services-problem-router__note">
          <span />
          <p>
            No tienes que elegir perfecto. Si el problema cruza web, software, automatización o IA,
            partimos ordenando el alcance antes de construir.
          </p>
        </div>

        <div className="services-system__layout">
          <div className="services-system__sticky">
            <SystemDiagram />
          </div>

          <div className="services-system__list">
            {coreServices.map((service, index) => (
              <article
                key={service.slug}
                className={index === 0 ? 'service-entry is-active' : 'service-entry'}
              >
                <div className="service-entry__heading">
                  <span>{service.index}</span>
                  <p>{service.eyebrow}</p>
                </div>
                <h3>{service.title}</h3>
                <p className="service-entry__description">{service.description}</p>
                <p className="service-entry__result">
                  <span>Resultado</span>
                  {serviceResults[service.slug]}
                </p>
                <div className="service-entry__signals">
                  {service.signals.map((signal) => <span key={signal}>{signal}</span>)}
                </div>
                <Link
                  href={`/servicios/${service.slug}`}
                  prefetch={false}
                  className="service-entry__link"
                  data-cursor="Abrir"
                  data-cursor-theme="signal"
                  data-analytics-event="service_cta_click"
                  data-service-id={service.slug}
                  data-service-name={service.shortTitle}
                >
                  {serviceLinkLabels[service.slug]}
                  <Arrow />
                </Link>
              </article>
            ))}
            {commercialService ? (
              <article className="service-entry service-entry--commercial">
                <div className="service-entry__heading">
                  <span>{commercialService.index}</span>
                  <p>Operación gestionada</p>
                </div>
                <div className="service-entry--commercial__grid">
                  <div>
                    <h3>{commercialService.title}</h3>
                    <p className="service-entry__description">{commercialService.description}</p>
                    <p className="service-entry__result">
                      <span>Resultado</span>
                      {serviceResults[commercialService.slug]}
                    </p>
                  </div>
                  <div className="service-entry__pipeline" aria-label="Flujo comercial de prospección B2B">
                    <span>ICP</span>
                    <i />
                    <span>Evidencia</span>
                    <i />
                    <span>Contacto</span>
                    <i />
                    <span>Seguimiento</span>
                  </div>
                </div>
                <Link
                  href={`/servicios/${commercialService.slug}`}
                  prefetch={false}
                  className="service-entry__link"
                  data-cursor="Abrir"
                  data-cursor-theme="signal"
                  data-analytics-event="service_cta_click"
                  data-service-id={commercialService.slug}
                  data-service-name={commercialService.shortTitle}
                >
                  {serviceLinkLabels[commercialService.slug]}
                  <Arrow />
                </Link>
              </article>
            ) : null}
          </div>
        </div>

        <div className="services-system__cta">
          <p>Cuéntanos qué debería funcionar mejor en tu negocio.</p>
          <a
            href={diagnosticUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-cursor="WhatsApp"
            data-cursor-theme="signal"
            data-analytics-event="service_whatsapp_click"
            data-service-id="diagnostico"
            data-service-name="Diagnóstico"
          >
            Conversar por WhatsApp
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
