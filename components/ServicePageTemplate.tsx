import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'
import type { Service } from '@/lib/site'
import { getWhatsappUrl } from '@/lib/site'
import Image from 'next/image'
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

type AppliedExample = {
  eyebrow: string
  title: string
  lead: string
  items: {
    title: string
    text: string
  }[]
  note?: string
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

const appliedExamplesBySlug: Record<ServicePageContent['slug'], AppliedExample> = {
  'desarrollo-web-ia': {
    eyebrow: 'Cómo lo revisamos',
    title: 'Cómo revisamos que el sitio de verdad funcione.',
    lead:
      'No basta con que se vea lindo. Antes de publicar revisamos que se entienda, que dé confianza y que la persona sepa qué hacer.',
    items: [
      { title: 'En computador', text: 'Se ve completo, ordenado y con el botón a la vista.' },
      { title: 'En celular', text: 'Se lee cómodo y los botones se alcanzan con el pulgar.' },
      { title: 'El orden', text: 'Problema, solución, prueba y qué hacer después.' },
      { title: 'El contacto', text: 'WhatsApp o formulario, listos y probados.' },
    ],
    note: 'Te mostramos cada avance en computador y en celular, para que veas exactamente cómo va quedando.',
  },
  'plataformas-software-medida': {
    eyebrow: 'Para que no te salga caro',
    title: 'Cómo evitamos construir cosas que no vas a usar.',
    lead:
      'Un programa a medida no se hace entero de una vez. Partimos por lo que más te duele, lo pruebas de verdad, y recién ahí seguimos.',
    items: [
      { title: 'Elegir', text: 'Separamos lo que no puede faltar de lo que puede esperar.' },
      { title: 'Mostrar', text: 'Te mostramos las pantallas antes de programarlas.' },
      { title: 'Probar', text: 'Sale una primera versión chica que tu equipo ya puede usar.' },
      { title: 'Mejorar', text: 'Agregamos lo que falte según cómo lo usen de verdad.' },
    ],
    note: 'Así sabes desde el principio cuánto cuesta, cuánto demora y qué vas a recibir.',
  },
  automatizaciones: {
    eyebrow: 'Cómo lo revisamos',
    title: 'Toda tarea automática tiene tres partes, y una cuarta por si algo falla.',
    lead:
      'Antes de automatizar nada, dejamos claro qué información entra, qué hay que revisar, dónde tiene que quedar y qué pasa si algo no calza.',
    items: [
      { title: 'Qué entra', text: 'Un formulario, un pedido, una planilla o un mensaje de WhatsApp.' },
      { title: 'Qué se revisa', text: 'Que no falten datos, que los montos cuadren, que haya inventario.' },
      { title: 'Qué sale', text: 'Un dato actualizado, un aviso, un documento o un registro.' },
      { title: 'Si algo falla', text: 'Te avisa a ti en vez de seguir con información incompleta.' },
    ],
    note: 'No prometemos magia. Prometemos algo definido, probado y que puedes revisar cuando quieras.',
  },
  'soluciones-ia-medida': {
    eyebrow: 'Cómo lo revisamos',
    title: 'De una consulta por WhatsApp a una reserva confirmada.',
    lead:
      'Un cliente escribe o manda un audio. El asistente entiende qué necesita, mira las horas libres de verdad, propone una y la confirma. Si el caso se complica, te lo pasa.',
    items: [
      { title: 'Llega', text: 'Un mensaje o un audio por WhatsApp.' },
      { title: 'Entiende', text: 'Qué necesita, para qué servicio y qué tan urgente es.' },
      { title: 'Revisa', text: 'Tus horas libres reales y tus reglas.' },
      { title: 'Responde', text: 'Propone la hora y la confirma, o te pasa el caso a ti.' },
    ],
    note: 'Cada paso usa tus reglas y tu agenda real. Y siempre hay un punto donde entra una persona.',
  },
  'prospeccion-b2b-gestionada': {
    eyebrow: 'Cómo decidimos',
    title: 'Antes de buscar, acordamos con qué criterio.',
    lead:
      'La gracia no es entregarte mil nombres. Es que sepas por qué esa empresa está en la lista y qué corresponde hacer con ella.',
    items: [
      { title: 'El perfil', text: 'Qué tipo de empresa te compra de verdad.' },
      { title: 'El orden', text: 'Con qué criterio decidimos a quién llamar primero.' },
      { title: 'El registro', text: 'En qué va cada empresa y cuál es el siguiente paso.' },
      { title: 'La insistencia', text: 'Volver a tocar la puerta sin que se pierda el hilo.' },
    ],
    note: 'Ojo: nosotros te abrimos la puerta. La venta la cierras tú, con tu oferta y tu conversación.',
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

function AppliedExample({ example }: { example: AppliedExample }) {
  return (
    <div className="service-applied-example">
      <div className="service-applied-example__copy">
        <p className="eyebrow">{example.eyebrow}</p>
        <h2>{example.title}</h2>
        <p>{example.lead}</p>
      </div>
      <div className="service-applied-example__grid">
        {example.items.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      {example.note ? <p className="service-applied-example__note">{example.note}</p> : null}
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
  const appliedExample = appliedExamplesBySlug[content.slug]
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
              <span>Cuánto demora</span>
              {service.plazo}
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

      <section className="service-page-section service-page-section--problems">
        <div className="section-shell service-page-two-col">
          <div className="service-page-section__heading">
            <p className="eyebrow">¿Te suena?</p>
            <h2>{sectionCopy.problems}</h2>
          </div>
          <div className="service-problem-list">
            {content.problems.map((problem, index) => (
              <article key={problem}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{problem}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section className="service-page-section service-page-section--applied">
        <div className="section-shell">
          <AppliedExample example={appliedExample} />
        </div>
      </section>

      {showWebsiteProofs ? <WebsiteProofGrid /> : null}

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

      <section className="service-page-section service-page-section--modes">
        <div className="section-shell">
          <div className="service-page-section__heading service-page-section__heading--wide">
            <p className="eyebrow">Formas de trabajar</p>
            <h2>Se puede hacer completo o por partes. Lo vemos según tu presupuesto.</h2>
          </div>
          <div className="service-mode-grid">
            {content.engagementModes.map((mode) => <span key={mode}>{mode}</span>)}
          </div>
        </div>
      </section>

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
