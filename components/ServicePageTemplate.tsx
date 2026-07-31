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
    problems: 'Cuando una pagina se ve bien, pero no ayuda a vender.',
    builds: 'Convertimos la oferta en una experiencia comercial clara.',
    deliverables: 'Lo que queda listo para publicar, medir y mejorar.',
    useCases: 'Tres escenarios donde una web debe trabajar comercialmente.',
    process: 'De mensaje confuso a recorrido web preparado para convertir.',
  },
  'plataformas-software-medida': {
    problems: 'Cuando la operacion ya supero las planillas.',
    builds: 'Construimos la herramienta que el proceso realmente necesita.',
    deliverables: 'Lo que queda instalado para operar con reglas y control.',
    useCases: 'Tres formas de ordenar una operacion con software propio.',
    process: 'De proceso disperso a primera version usable y escalable.',
  },
  automatizaciones: {
    problems: 'Cuando copiar, revisar y avisar consume al equipo.',
    builds: 'Conectamos entradas, reglas y salidas para reducir trabajo manual.',
    deliverables: 'Lo que queda funcionando para mover informacion con control.',
    useCases: 'Tres automatizaciones habituales cuando el proceso ya esta definido.',
    process: 'De tarea repetida a flujo conectado, probado y monitoreado.',
  },
  'soluciones-ia-medida': {
    problems: 'Cuando una tarea necesita contexto, no solo una respuesta automatica.',
    builds: 'Disenamos IA con reglas, herramientas y derivacion humana.',
    deliverables: 'Lo que queda preparado para usar IA de forma controlada.',
    useCases: 'Tres aplicaciones donde la IA se vuelve parte de la operacion.',
    process: 'De idea abstracta a agente probado con casos reales.',
  },
  'prospeccion-b2b-gestionada': {
    problems: 'Cuando el equipo comercial no sabe por donde comenzar.',
    builds: 'Ordenamos mercado, evidencia y seguimiento antes de contactar.',
    deliverables: 'Lo que queda listo para prospectar con criterio compartido.',
    useCases: 'Tres situaciones donde conviene operar prospeccion con metodo.',
    process: 'De mercado amplio a oportunidades priorizadas y trazables.',
  },
}

const appliedExamplesBySlug: Record<ServicePageContent['slug'], AppliedExample> = {
  'desarrollo-web-ia': {
    eyebrow: 'Ejemplo aplicado',
    title: 'Como una web deja de ser vitrina y empieza a guiar decisiones.',
    lead:
      'La prueba visual no deberia ser solo una captura bonita: debe mostrar que el visitante entiende, confia y sabe que hacer despues.',
    items: [
      { title: 'Desktop', text: 'Jerarquia clara, oferta visible y CTA sin friccion.' },
      { title: 'Mobile', text: 'Lectura rapida, botones alcanzables y texto sin saturacion.' },
      { title: 'Narrativa', text: 'Problema, solucion, prueba y siguiente paso en orden.' },
      { title: 'Contacto', text: 'WhatsApp o formulario con contexto de la intencion.' },
    ],
    note: 'Para proyectos web, la evidencia ideal es desktop + mobile + cambio de narrativa.',
  },
  'plataformas-software-medida': {
    eyebrow: 'Control de alcance',
    title: 'Como evitamos construir de mas.',
    lead:
      'El software a medida no parte construyendo todo. Primero se reduce incertidumbre y se define una primera version que pruebe el flujo critico.',
    items: [
      { title: 'Priorizacion', text: 'Separar lo imprescindible de lo que puede esperar.' },
      { title: 'Prototipo', text: 'Validar pantallas, estados y reglas antes del desarrollo completo.' },
      { title: 'MVP', text: 'Lanzar una version pequena, usable y medible.' },
      { title: 'Evolucion', text: 'Mejorar con uso real, no con supuestos infinitos.' },
    ],
    note: 'Esto ayuda a controlar costo, plazo y expectativas desde el inicio.',
  },
  automatizaciones: {
    eyebrow: 'Ejemplo aplicado',
    title: 'Un flujo automatizado se entiende por entrada, regla y salida.',
    lead:
      'Antes de automatizar, definimos que dato entra, que condicion debe cumplirse, donde se actualiza y que pasa si algo falla.',
    items: [
      { title: 'Entrada', text: 'Formulario, pedido, planilla, WhatsApp, API o sistema interno.' },
      { title: 'Validacion', text: 'Campos obligatorios, estados, montos, stock o reglas del negocio.' },
      { title: 'Salida', text: 'Actualizacion, alerta, documento, registro o dashboard.' },
      { title: 'Excepcion', text: 'Derivacion humana cuando el flujo no tiene informacion suficiente.' },
    ],
    note: 'No prometemos magia: prometemos un proceso definido, probado y visible.',
  },
  'soluciones-ia-medida': {
    eyebrow: 'IA aplicada',
    title: 'La diferencia esta en el contexto y las acciones conectadas.',
    lead:
      'Una solucion de IA no vive aislada. Debe saber que puede responder, que herramienta consultar, cuando actuar y cuando pedir ayuda.',
    items: [
      { title: 'Contexto', text: 'Informacion, reglas, tono y limites del negocio.' },
      { title: 'Canal', text: 'WhatsApp, panel interno, formulario o sistema existente.' },
      { title: 'Herramientas', text: 'Agenda, base de datos, documentos, CRM o APIs.' },
      { title: 'Control', text: 'Pruebas, derivacion humana y registro de casos sensibles.' },
    ],
    note: 'La IA sirve mas cuando opera dentro de un sistema, no como conversacion suelta.',
  },
  'prospeccion-b2b-gestionada': {
    eyebrow: 'Operacion comercial',
    title: 'La prospeccion mejora cuando todos entienden el criterio.',
    lead:
      'El objetivo no es inflar una base: es saber que empresas calzan, por que importan y que accion comercial corresponde.',
    items: [
      { title: 'ICP', text: 'Tipo de empresa que realmente calza con tu oferta.' },
      { title: 'Scoring', text: 'Criterio para decidir a quien contactar primero.' },
      { title: 'Pipeline', text: 'Estado, contexto y proximo paso de cada oportunidad.' },
      { title: 'Seguimiento', text: 'Continuidad para que la oportunidad no se pierda.' },
    ],
    note: 'La venta sigue dependiendo de la oferta, la conversacion y el cierre comercial.',
  },
}

const responsibilitiesBySlug: Partial<Record<ServicePageContent['slug'], { title: string; rows: { ia: string; client: string }[] }>> = {
  'prospeccion-b2b-gestionada': {
    title: 'Que opera IAenBlanco y que valida el cliente.',
    rows: [
      { ia: 'Define y busca mercado objetivo.', client: 'Valida oferta, rubro y tipo de cliente ideal.' },
      { ia: 'Organiza evidencia y senales comerciales.', client: 'Aprueba criterios de fit y descarte.' },
      { ia: 'Prioriza oportunidades y ordena seguimiento.', client: 'Atiende conversaciones y confirma interes real.' },
      { ia: 'Mantiene trazabilidad del pipeline.', client: 'Gestiona propuesta, negociacion y cierre.' },
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
          <h2>Clientes reales donde IAenBlanco construyo la presencia digital.</h2>
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
                data-service-name={item.client}
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
  const showCaseStudy = !showWebsiteProofs

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
                data-service-name={service.shortTitle}
              >
                {content.primaryCta}
                <ArrowUpRight />
              </a>
              <a
                href="#entregables"
                className="button button--text"
                data-analytics-event="service_cta_click"
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
            <p className="eyebrow">Que construimos</p>
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
          <p>Si esto se parece a tu problema, podemos revisar el alcance antes de proponer una solucion.</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--text"
            data-analytics-event="service_whatsapp_click"
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

      {showCaseStudy ? (
        <section className="service-page-section service-page-section--case">
          <div className="section-shell service-case-card">
            <div>
              <p className="eyebrow">{content.caseStudy.label}</p>
              <h2>{content.caseStudy.title}</h2>
              <p>{content.caseStudy.text}</p>
            </div>
            <a
              href={content.caseStudy.href}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="service_case_click"
              data-service-name={service.shortTitle}
            >
              <span>{content.caseStudy.client}</span>
              <strong>{content.caseStudy.actionLabel}</strong>
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
            <h2>El formato depende del problema y del nivel de operacion que quieras activar.</h2>
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
            <h2>Preguntas utiles antes de cotizar.</h2>
          </div>
          <div className="service-faq-list">
            {content.faqs.map((faq) => (
              <details
                key={faq.question}
                data-service-faq
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
            <h2>Conversemos con contexto, no con una solucion prearmada.</h2>
            <p>
              Cuentanos que esta pasando en tu operacion y definimos si este servicio es el camino
              correcto o si conviene partir por otro frente.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-analytics-event="service_whatsapp_click"
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
            data-service-name={service.shortTitle}
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
