import Link from 'next/link'
import { services, WHATSAPP_URL } from '@/lib/site'

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
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
  'desarrollo-web-ia': 'Una web clara, rápida y preparada para convertir visitas en conversaciones.',
  'plataformas-software-medida': 'Un sistema propio para ordenar procesos que una herramienta estándar no resuelve.',
  automatizaciones: 'Menos tareas manuales, menos errores y más visibilidad para decidir.',
  'soluciones-ia-medida': 'IA conectada a datos, reglas y herramientas reales del negocio.',
  'leads-magnet': 'Prospección B2B operada con criterio, seguimiento y oportunidades priorizadas.',
}

export function ServiceSystem() {
  const coreServices = services.filter((service) => service.slug !== 'leads-magnet')
  const commercialService = services.find((service) => service.slug === 'leads-magnet')

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
            Cuatro capacidades construyen la base digital. La prospección B2B queda separada
            como una operación comercial gestionada, para evitar mezclar servicio con producto.
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
                >
                  Ver capacidad
                  <Arrow />
                </Link>
              </article>
            ))}
            {commercialService ? (
              <article className="service-entry service-entry--commercial">
                <div className="service-entry__heading">
                  <span>{commercialService.index}</span>
                  <p>{commercialService.eyebrow}</p>
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
                <div className="service-entry__signals">
                  {commercialService.signals.map((signal) => <span key={signal}>{signal}</span>)}
                </div>
                <Link
                  href={`/servicios/${commercialService.slug}`}
                  prefetch={false}
                  className="service-entry__link"
                  data-cursor="Abrir"
                  data-cursor-theme="signal"
                >
                  Ver operación B2B
                  <Arrow />
                </Link>
              </article>
            ) : null}
          </div>
        </div>

        <div className="services-system__cta">
          <p>Cuéntanos qué debería funcionar mejor en tu negocio.</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-cursor="WhatsApp"
            data-cursor-theme="signal"
          >
            Conversar por WhatsApp
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
