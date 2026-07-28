import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactBand } from '@/components/ContactBand'
import { Reveal } from '@/components/Reveal'
import {
  getService,
  services,
  SITE_URL,
} from '@/lib/site'

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: `${SITE_URL}/servicios/${service.slug}/`,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: `${SITE_URL}/servicios/${service.slug}/`,
    },
  }
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function CapabilityGraphic({ index }: { index: number }) {
  const pointSets = [
    [[70, 175], [142, 84], [235, 138], [334, 64], [420, 152]],
    [[58, 82], [158, 154], [245, 68], [340, 148], [435, 78]],
    [[65, 148], [154, 64], [244, 154], [334, 72], [426, 142]],
    [[62, 72], [150, 148], [244, 78], [336, 160], [428, 90]],
    [[64, 144], [148, 82], [240, 136], [336, 66], [430, 146]],
  ]
  const points = pointSets[index] || pointSets[0]
  const path = points.map(([x, y], pointIndex) => `${pointIndex ? 'L' : 'M'}${x} ${y}`).join(' ')

  return (
    <div className="capability-graphic" aria-hidden="true">
      <div className="capability-graphic__bar">
        <span>operation.flow</span>
        <span>live</span>
      </div>
      <svg viewBox="0 0 500 230" fill="none">
        <path className="capability-graphic__gridline" d="M30 42h440M30 92h440M30 142h440M30 192h440" />
        <path className="capability-graphic__path" d={path} />
        {points.map(([cx, cy], pointIndex) => (
          <g key={`${cx}-${cy}`}>
            <circle className="capability-graphic__halo" cx={cx} cy={cy} r="15" />
            <circle className="capability-graphic__point" cx={cx} cy={cy} r="5" />
            <text x={cx} y={cy - 22}>0{pointIndex + 1}</text>
          </g>
        ))}
      </svg>
      <div className="capability-graphic__footer">
        <span>Entrada validada</span>
        <span>Flujo conectado</span>
        <span>Salida operativa</span>
      </div>
    </div>
  )
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const serviceIndex = services.findIndex((item) => item.slug === service.slug)
  const nextService = services[(serviceIndex + 1) % services.length]
  const contactSubject = service.shortTitle === 'IA a medida'
    ? service.shortTitle
    : service.shortTitle.toLowerCase()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    url: `${SITE_URL}/servicios/${service.slug}/`,
    provider: {
      '@type': 'Organization',
      name: 'IAenBlanco SpA',
      url: SITE_URL,
    },
    areaServed: 'Latin America',
  }

  return (
    <main id="contenido">
      <section className="service-hero">
        <div className="service-hero__grid" aria-hidden="true" />
        <div className="section-shell">
          <div className="service-hero__meta">
            <span>{service.index} / 05</span>
            <span>{service.eyebrow}</span>
          </div>
          <h1>{service.title}</h1>
          <p className="service-hero__statement">{service.statement}</p>
          <div className="service-hero__signals">
            {service.signals.map((signal) => <span key={signal}>{signal}</span>)}
          </div>
        </div>
      </section>

      <section className="service-overview">
        <div className="section-shell service-overview__grid">
          <Reveal className="service-overview__copy">
            <p className="eyebrow">Qué construimos</p>
            <h2>La solución se adapta al proceso, no el proceso a la herramienta.</h2>
            <p>{service.description}</p>
          </Reveal>
          <Reveal className="service-overview__visual" delay={120}>
            <CapabilityGraphic index={serviceIndex} />
          </Reveal>
        </div>
      </section>

      <section className="capabilities-section">
        <div className="section-shell">
          <Reveal className="capabilities-section__heading">
            <p className="eyebrow">Capacidades</p>
            <h2>Lo que puede formar parte del sistema.</h2>
          </Reveal>
          <div className="capability-list">
            {service.capabilities.map((capability, index) => (
              <Reveal key={capability} className="capability-item" delay={(index % 3) * 70}>
                <span>0{index + 1}</span>
                <p>{capability}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-fit">
        <div className="section-shell service-fit__grid">
          <Reveal>
            <p className="eyebrow">Cuándo hace sentido</p>
            <h2>Una buena implementación parte por un problema reconocible.</h2>
          </Reveal>
          <div className="service-fit__items">
            {service.idealFor.map((item, index) => (
              <Reveal key={item} className="service-fit__item" delay={index * 80}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="engagement-strip">
        <div className="section-shell">
          <p>Formas de trabajo</p>
          <div>
            <span>Proyecto con alcance definido</span>
            <span>Soporte posterior</span>
            <span>Evolución mediante retainer</span>
          </div>
        </div>
      </section>

      <section className="next-service">
        <div className="section-shell">
          <p>Siguiente capacidad</p>
          <Link href={`/servicios/${nextService.slug}`} prefetch={false} data-cursor="Siguiente">
            <span>{nextService.index}</span>
            {nextService.title}
            <Arrow />
          </Link>
        </div>
      </section>

      <ContactBand
        eyebrow={`¿Necesitas ${contactSubject}?`}
        title="Conversemos sobre el contexto antes de decidir la solución."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  )
}
