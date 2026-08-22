import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'
import type { Service } from '@/lib/site'
import { getWhatsappUrl } from '@/lib/site'
import Image from 'next/image'
import { EscenaServicio, textoEscena } from '@/components/EscenaServicio'
import { RevelaAlEntrar } from '@/components/RevelaAlEntrar'
import { websiteProofCases, type ServicePageContent } from '@/lib/services-content'

type ServicePageTemplateProps = {
  service: Service
  content: ServicePageContent
  nextService: Service
}

type SectionCopy = {
  problems: string
  builds: string
  deliverables: string
  useCases: string
  process: string
}

const sectionCopyBySlug: Record<ServicePageContent['slug'], SectionCopy> = {
  'desarrollo-web-ia': {
    problems: 'Si te pasa alguna de estas, tu sitio no está trabajando.',
    builds: 'Esto es lo que hacemos, paso a paso.',
    deliverables: 'Esto es lo que recibes al final.',
    useCases: 'Tres casos típicos.',
    process: 'Cómo llegamos de una idea vaga a un sitio publicado.',
  },
  'plataformas-software-medida': {
    problems: 'Si te pasa alguna de estas, el Excel ya no da.',
    builds: 'Esto es lo que hacemos, paso a paso.',
    deliverables: 'Esto es lo que recibes al final.',
    useCases: 'Tres casos típicos.',
    process: 'Cómo llegamos de un proceso desordenado a un programa que funciona.',
  },
  automatizaciones: {
    problems: 'Si te pasa alguna de estas, hay horas que estás perdiendo.',
    builds: 'Esto es lo que hacemos, paso a paso.',
    deliverables: 'Esto es lo que recibes al final.',
    useCases: 'Tres casos típicos.',
    process: 'Cómo llegamos de una tarea repetida a algo que corre solo.',
  },
  'soluciones-ia-medida': {
    problems: 'Si te pasa alguna de estas, un asistente te sirve.',
    builds: 'Esto es lo que hacemos, paso a paso.',
    deliverables: 'Esto es lo que recibes al final.',
    useCases: 'Tres casos típicos.',
    process: 'Cómo llegamos de una idea a un asistente probado con casos reales.',
  },
  'prospeccion-b2b-gestionada': {
    problems: 'Si te pasa alguna de estas, te sirve que lo hagamos nosotros.',
    builds: 'Esto es lo que hacemos, mes a mes.',
    deliverables: 'Esto es lo que recibes cada mes.',
    useCases: 'Tres casos típicos.',
    process: 'Cómo llegamos de "quiero vender más" a una lista con nombre y apellido.',
  },
}

const responsibilitiesBySlug: Partial<Record<ServicePageContent['slug'], { title: string; rows: { ia: string; client: string }[] }>> = {
  'prospeccion-b2b-gestionada': {
    title: 'Qué opera IAenBlanco y qué valida el cliente.',
    rows: [
      { ia: 'Define y busca mercado objetivo.', client: 'Valida oferta, rubro y tipo de cliente ideal.' },
      { ia: 'Organiza evidencia y señales comerciales.', client: 'Aprueba criterios de fit y descarte.' },
      { ia: 'Prioriza oportunidades y ordena seguimiento.', client: 'Atiende conversaciones y confirma interés real.' },
      { ia: 'Deja registrado en qué va cada empresa.', client: 'Gestiona la propuesta, la negociación y el cierre.' },
    ],
  },
}

function EscenaServicioSeccion({ slug }: { slug: ServicePageContent['slug'] }) {
  const copy = textoEscena(slug)
  if (!copy) return null

  return (
    <section className="service-page-section service-page-section--escena">
      <div className="section-shell">
        <div className="service-page-section__heading service-page-section__heading--wide">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.titulo}</h2>
        </div>
        <RevelaAlEntrar className="revela--escena">
          <EscenaServicio slug={slug} />
        </RevelaAlEntrar>
        <p className="service-escena__pie">{copy.pie}</p>
      </div>
    </section>
  )
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

function FunctionalDiagram({ content }: { content: ServicePageContent }) {
  return (
    <div className={`service-flow service-flow--${content.slug}`} aria-label={content.diagram.label}>
      <div className="service-flow__header">
        <span>{content.diagram.label}</span>
        <strong>{String(content.diagram.steps.length).padStart(2, '0')} etapas</strong>
      </div>
      <div className="service-flow__track">
        {content.diagram.steps.map((step, index) => (
          <div className="service-flow__step" key={`${content.slug}-${step.title}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.title}</strong>
            <p>{step.detail}</p>
            {index < content.diagram.steps.length - 1 ? <i aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
      {content.diagram.exception ? (
        <div className="service-flow__exception">
          <span>{content.diagram.exception.title}</span>
          <p>{content.diagram.exception.detail}</p>
        </div>
      ) : null}
    </div>
  )
}

function ResponsibilityGrid({
  title,
  rows,
}: {
  title: string
  rows: { ia: string; client: string }[]
}) {
  return (
    <section className="service-page-section service-page-section--responsibilities">
      <div className="section-shell">
        <div className="service-page-section__heading service-page-section__heading--wide">
          <p className="eyebrow">Quién hace qué</p>
          <h2>{title}</h2>
        </div>
        <div className="service-responsibility-grid">
          <div>
            <span>IAenBlanco</span>
            <span>Cliente</span>
          </div>
          {rows.map((row) => (
            <div key={`${row.ia}-${row.client}`}>
              <p>{row.ia}</p>
              <p>{row.client}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsiteProofGrid() {
  return (
    <section className="service-page-section service-page-section--website-proof">
      <div className="section-shell">
        <div className="service-page-section__heading service-page-section__heading--wide">
          <p className="eyebrow">Trabajos reales</p>
          <h2>Negocios chilenos para los que ya hicimos esto.</h2>
        </div>
        <div className="services-web-proof-grid services-web-proof-grid--service-page">
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
                Ver sitio
                <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicePageTemplate({
  service,
  content,
  nextService,
}: ServicePageTemplateProps) {
  const whatsappUrl = getWhatsappUrl(content.whatsappMessage)
  const sectionCopy = sectionCopyBySlug[content.slug]
  const responsibilities = responsibilitiesBySlug[content.slug]
  const showWebsiteProofs = content.slug === 'desarrollo-web-ia'
  const caseStudy = showWebsiteProofs ? undefined : content.caseStudy

  return (
    <main id="contenido" className="service-page">
      <section className="service-page-hero">
        <div className="section-shell service-page-hero__inner">
          <div className="service-page-hero__copy">
            <div className="service-page-hero__meta">
              <span>{service.index} / 05</span>
              <span>{service.eyebrow}</span>
            </div>
            <h1>{service.title}</h1>
            <p>{content.heroLead}</p>
            <div className="service-page-hero__signals">
              {service.signals.map((signal) => <span key={signal}>{signal}</span>)}
            </div>
            <p className="service-page-hero__plazo">
              <span>Cuánto suele demorar</span>
              {service.plazo}
            </p>
            <p className="service-page-hero__precio">
              El precio depende de lo que necesites. Te lo damos por escrito antes de
              empezar y ese número no se mueve: si después quieres sumar algo que no
              estaba, se cotiza aparte y decides tú.
            </p>
            <div className="service-page-hero__actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="button button--primary"
                data-analytics-event="service_whatsapp_click"
                data-service-id={service.slug}
                data-service-name={service.shortTitle}
              >
                {content.primaryCta}
                <ArrowUpRight />
              </a>
              <a
                href="#entregables"
                className="button button--text"
                data-analytics-event="service_cta_click"
                data-service-id={service.slug}
                data-service-name={service.shortTitle}
              >
                Ver qué recibes
                <ArrowRight />
              </a>
            </div>
          </div>
          <div className="service-page-hero__visual">
            <FunctionalDiagram content={content} />
          </div>
        </div>
      </section>

      {/* La prueba va segunda, no enterrada: es lo que mas convence y es lo
          primero que alguien quiere ver antes de creernos nada. */}
      {showWebsiteProofs ? <WebsiteProofGrid /> : <EscenaServicioSeccion slug={content.slug} />}

      <section className="service-page-section">
        <div className="section-shell">
          <div className="service-page-section__heading service-page-section__heading--wide">
            <p className="eyebrow">Cómo lo hacemos</p>
            <h2>{sectionCopy.builds}</h2>
          </div>
          <div className="service-build-grid">
            {content.builds.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-page-section service-page-section--deliverables" id="entregables">
        <div className="section-shell service-page-two-col">
          <div className="service-page-section__heading">
            <p className="eyebrow">Qué recibes</p>
            <h2>{sectionCopy.deliverables}</h2>
          </div>
          <div className="service-deliverables">
            {content.deliverables.map((deliverable) => (
              <div key={deliverable}>
                <span />
                <p>{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-page-mid-cta">
        <div className="section-shell service-page-mid-cta__inner">
          <p>¿Se parece a lo que te pasa? Escríbenos y lo revisamos antes de proponerte nada.</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--text"
            data-analytics-event="service_whatsapp_click"
            data-service-id={service.slug}
            data-service-name={service.shortTitle}
          >
            {content.primaryCta}
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="service-page-section">
        <div className="section-shell">
          <div className="service-page-section__heading service-page-section__heading--wide">
            <p className="eyebrow">Ejemplos</p>
            <h2>{sectionCopy.useCases}</h2>
          </div>
          <div className="service-use-grid">
            {content.useCases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {caseStudy ? (
        <section className="service-page-section service-page-section--case">
          <div className="section-shell service-case-card">
            <div>
              <p className="eyebrow">{caseStudy.label}</p>
              <h2>{caseStudy.title}</h2>
              <p>{caseStudy.text}</p>
            </div>
            <a
              href={caseStudy.href}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="service_case_click"
              data-service-id={service.slug}
              data-service-name={service.shortTitle}
              data-case-name={caseStudy.client}
            >
              <span>{caseStudy.client}</span>
              <strong>{caseStudy.actionLabel}</strong>
              <ArrowUpRight />
            </a>
          </div>
        </section>
      ) : null}

      {responsibilities ? <ResponsibilityGrid title={responsibilities.title} rows={responsibilities.rows} /> : null}

      <section className="service-page-section service-page-section--faq">
        <div className="section-shell service-page-two-col">
          <div className="service-page-section__heading">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Lo que nos preguntan siempre.</h2>
          </div>
          <div className="service-faq-list">
            {content.faqs.map((faq) => (
              <details
                key={faq.question}
                data-service-faq
                data-service-id={service.slug}
                data-service-name={service.shortTitle}
              >
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="service-page-cta">
        <div className="section-shell service-page-cta__inner">
          <div>
            <p className="eyebrow">El siguiente paso</p>
            <h2>Cuéntanos tu caso antes de que te propongamos algo.</h2>
            <p>
              Nos cuentas qué te está costando y te decimos con franqueza si este servicio es lo
              que necesitas o si te conviene partir por otro lado. La conversación no cuesta nada.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-analytics-event="service_whatsapp_click"
            data-service-id={service.slug}
            data-service-name={service.shortTitle}
          >
            {content.primaryCta}
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="service-next-link">
        <div className="section-shell">
          <p>Siguiente servicio</p>
          <Link
            href={`/servicios/${nextService.slug}`}
            prefetch={false}
            data-analytics-event="service_next_click"
            data-service-id={nextService.slug}
            data-service-name={nextService.shortTitle}
            data-source-service-id={service.slug}
            data-source-service-name={service.shortTitle}
            data-target-service-id={nextService.slug}
            data-target-service-name={nextService.shortTitle}
          >
            <span>{nextService.index}</span>
            {nextService.title}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  )
}
