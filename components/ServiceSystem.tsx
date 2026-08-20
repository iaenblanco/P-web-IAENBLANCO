import Link from 'next/link'
import { getWhatsappUrl, services } from '@/lib/site'

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
  'desarrollo-web-ia': 'Un sitio que se entiende rápido, se ve serio y hace que te escriban.',
  'plataformas-software-medida': 'Un programa propio donde tu equipo trabaja con la misma información.',
  automatizaciones: 'Horas que dejas de perder copiando datos, y menos errores.',
  'soluciones-ia-medida': 'Un asistente que responde de verdad, con la información de tu negocio.',
  'prospeccion-b2b-gestionada': 'Una lista de empresas ordenada por prioridad, con el contacto y qué decirles.',
}

const serviceLinkLabels: Record<string, string> = {
  'desarrollo-web-ia': 'Ver cómo lo hacemos',
  'plataformas-software-medida': 'Ver cómo lo hacemos',
  automatizaciones: 'Ver cómo lo hacemos',
  'soluciones-ia-medida': 'Ver cómo lo hacemos',
  'prospeccion-b2b-gestionada': 'Ver cómo funciona',
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
          <p className="eyebrow">Qué hacemos</p>
          <h2 id="services-heading">
            Cinco servicios, explicados sin tecnicismos.
          </h2>
          <p>
            Los cuatro primeros son cosas que construimos para ti y quedan tuyas. El quinto es
            distinto: lo operamos nosotros todos los meses. Si no sabes cuál te sirve, no importa
            — eso lo resolvemos conversando.
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
                  <p>Lo operamos nosotros</p>
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
          <p>¿No tienes claro cuál te sirve? Cuéntanos qué te está costando y lo vemos juntos.</p>
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
