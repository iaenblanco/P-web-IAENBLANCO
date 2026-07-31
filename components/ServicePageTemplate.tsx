import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'
import type { Service } from '@/lib/site'
import { getWhatsappUrl } from '@/lib/site'
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
    problems: 'Cuando una página se ve bien, pero no ayuda a vender.',
    builds: 'Convertimos la oferta en una experiencia comercial clara.',
    deliverables: 'Lo que queda listo para publicar, medir y mejorar.',
    useCases: 'Tres escenarios donde una web debe trabajar comercialmente.',
    process: 'De mensaje confuso a recorrido web preparado para convertir.',
  },
  'plataformas-software-medida': {
    problems: 'Cuando la operación ya superó las planillas.',
    builds: 'Construimos la herramienta que el proceso realmente necesita.',
    deliverables: 'Lo que queda instalado para operar con reglas y control.',
    useCases: 'Tres formas de ordenar una operación con software propio.',
    process: 'De proceso disperso a primera versión usable y escalable.',
  },
  automatizaciones: {
    problems: 'Cuando copiar, revisar y avisar consume al equipo.',
    builds: 'Conectamos entradas, reglas y salidas para reducir trabajo manual.',
    deliverables: 'Lo que queda funcionando para mover información con control.',
    useCases: 'Tres automatizaciones habituales cuando el proceso ya está definido.',
    process: 'De tarea repetida a flujo conectado, probado y monitoreado.',
  },
  'soluciones-ia-medida': {
    problems: 'Cuando una tarea necesita contexto, no solo una respuesta automática.',
    builds: 'Diseñamos IA con reglas, herramientas y derivación humana.',
    deliverables: 'Lo que queda preparado para usar IA de forma controlada.',
    useCases: 'Tres aplicaciones donde la IA se vuelve parte de la operación.',
    process: 'De idea abstracta a agente probado con casos reales.',
  },
  'prospeccion-b2b-gestionada': {
    problems: 'Cuando el equipo comercial no sabe por dónde comenzar.',
    builds: 'Ordenamos mercado, evidencia y seguimiento antes de contactar.',
    deliverables: 'Lo que queda listo para prospectar con criterio compartido.',
    useCases: 'Tres situaciones donde conviene operar prospección con método.',
    process: 'De mercado amplio a oportunidades priorizadas y trazables.',
  },
}

const appliedExamplesBySlug: Record<ServicePageContent['slug'], AppliedExample> = {
  'desarrollo-web-ia': {
    eyebrow: 'Ejemplo aplicado',
    title: 'Cómo una web deja de ser vitrina y empieza a guiar decisiones.',
    lead:
      'La prueba visual no debería ser solo una captura bonita: debe mostrar que el visitante entiende, confía y sabe qué hacer después.',
    items: [
      { title: 'Desktop', text: 'Jerarquía clara, oferta visible y CTA sin fricción.' },
      { title: 'Mobile', text: 'Lectura rápida, botones alcanzables y texto sin saturación.' },
      { title: 'Narrativa', text: 'Problema, solución, prueba y siguiente paso en orden.' },
      { title: 'Contacto', text: 'WhatsApp o formulario con contexto de la intención.' },
    ],
    note: 'Mostramos cada proyecto en escritorio y móvil para comprobar claridad, adaptación y recorrido comercial.',
  },
  'plataformas-software-medida': {
    eyebrow: 'Control de alcance',
    title: 'Cómo evitamos construir de más.',
    lead:
      'El software a medida no parte construyendo todo. Primero se reduce incertidumbre y se define una primera versión que pruebe el flujo crítico.',
    items: [
      { title: 'Priorización', text: 'Separar lo imprescindible de lo que puede esperar.' },
      { title: 'Prototipo', text: 'Validar pantallas, estados y reglas antes del desarrollo completo.' },
      { title: 'MVP', text: 'Lanzar una versión pequeña, usable y medible.' },
      { title: 'Evolución', text: 'Mejorar con uso real, no con supuestos infinitos.' },
    ],
    note: 'Esto ayuda a controlar costo, plazo y expectativas desde el inicio.',
  },
  automatizaciones: {
    eyebrow: 'Ejemplo aplicado',
    title: 'Un flujo automatizado se entiende por entrada, regla y salida.',
    lead:
      'Antes de automatizar, definimos qué dato entra, qué condición debe cumplirse, dónde se actualiza y qué pasa si algo falla.',
    items: [
      { title: 'Entrada', text: 'Formulario, pedido, planilla, WhatsApp, API o sistema interno.' },
      { title: 'Validación', text: 'Campos obligatorios, estados, montos, stock o reglas del negocio.' },
      { title: 'Salida', text: 'Actualización, alerta, documento, registro o dashboard.' },
      { title: 'Excepción', text: 'Derivación humana cuando el flujo no tiene información suficiente.' },
    ],
    note: 'No prometemos magia: prometemos un proceso definido, probado y visible.',
  },
  'soluciones-ia-medida': {
    eyebrow: 'Ejemplo aplicado',
    title: 'De una consulta por WhatsApp a una reserva confirmada.',
    lead:
      'La persona escribe o envía un audio. La IA identifica lo que necesita, consulta disponibilidad, propone un horario y deriva al equipo cuando falta información.',
    items: [
      { title: 'Consulta', text: 'Llega un mensaje o audio por WhatsApp.' },
      { title: 'Intención', text: 'El agente reconoce necesidad, servicio y urgencia.' },
      { title: 'Agenda', text: 'Revisa disponibilidad y reglas del negocio.' },
      { title: 'Confirmación', text: 'Propone horario, confirma o deriva a una persona.' },
    ],
    note: 'Cada paso opera con reglas, disponibilidad real y revisión humana cuando corresponde.',
  },
  'prospeccion-b2b-gestionada': {
    eyebrow: 'Operación comercial',
    title: 'La prospección mejora cuando todos entienden el criterio.',
    lead:
      'El objetivo no es inflar una base: es saber qué empresas calzan, por qué importan y qué acción comercial corresponde.',
    items: [
      { title: 'ICP', text: 'Tipo de empresa que realmente calza con tu oferta.' },
      { title: 'Scoring', text: 'Criterio para decidir a quién contactar primero.' },
      { title: 'Pipeline', text: 'Estado, contexto y próximo paso de cada oportunidad.' },
      { title: 'Seguimiento', text: 'Continuidad para que la oportunidad no se pierda.' },
    ],
    note: 'La venta sigue dependiendo de la oferta, la conversación y el cierre comercial.',
  },
}

const responsibilitiesBySlug: Partial<Record<ServicePageContent['slug'], { title: string; rows: { ia: string; client: string }[] }>> = {
  'prospeccion-b2b-gestionada': {
    title: 'Qué opera IAenBlanco y qué valida el cliente.',
    rows: [
      { ia: 'Define y busca mercado objetivo.', client: 'Valida oferta, rubro y tipo de cliente ideal.' },
      { ia: 'Organiza evidencia y señales comerciales.', client: 'Aprueba criterios de fit y descarte.' },
      { ia: 'Prioriza oportunidades y ordena seguimiento.', client: 'Atiende conversaciones y confirma interés real.' },
      { ia: 'Mantiene trazabilidad del pipeline.', client: 'Gestiona propuesta, negociación y cierre.' },
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
          <p className="eyebrow">Responsabilidades</p>
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
          <p className="eyebrow">Webs desarrolladas</p>
          <h2>Clientes reales donde IAenBlanco construyó la presencia digital.</h2>
        </div>
        <div className="services-web-proof-grid services-web-proof-grid--service-page">
          {websiteProofCases.map((item) => (
            <article key={item.client}>
              <div className="services-web-proof-grid__logo">
                <BrandLogo name={item.logo} alt={item.client} />
              </div>
              <span>{item.sector}</span>
              <h3>{item.client}</h3>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
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
                Ver entregables
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
            <p className="eyebrow">Problemas reconocibles</p>
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
            <p className="eyebrow">Qué construimos</p>
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
            <p className="eyebrow">Entregables</p>
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
          <p>Si esto se parece a tu problema, podemos revisar el alcance antes de proponer una solución.</p>
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
            <p className="eyebrow">Casos de uso</p>
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

      <section className="service-page-section">
        <div className="section-shell service-page-two-col">
          <div className="service-page-section__heading">
            <p className="eyebrow">Proceso</p>
            <h2>{sectionCopy.process}</h2>
          </div>
          <div className="service-process-list">
            {content.process.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-page-section service-page-section--modes">
        <div className="section-shell">
          <div className="service-page-section__heading service-page-section__heading--wide">
            <p className="eyebrow">Modalidades</p>
            <h2>El formato depende del problema y del nivel de operación que quieras activar.</h2>
          </div>
          <div className="service-mode-grid">
            {content.engagementModes.map((mode) => <span key={mode}>{mode}</span>)}
          </div>
        </div>
      </section>

      <section className="service-page-section service-page-section--faq">
        <div className="section-shell service-page-two-col">
          <div className="service-page-section__heading">
            <p className="eyebrow">FAQ</p>
            <h2>Preguntas útiles antes de cotizar.</h2>
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
            <p className="eyebrow">Siguiente paso</p>
            <h2>Conversemos con contexto, no con una solución prearmada.</h2>
            <p>
              Cuéntanos qué está pasando en tu operación y definimos si este servicio es el camino
              correcto o si conviene partir por otro frente.
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
