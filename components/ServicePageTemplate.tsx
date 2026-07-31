import Link from 'next/link'
import type { Service } from '@/lib/site'
import { getWhatsappUrl } from '@/lib/site'
import type { ServicePageContent } from '@/lib/services-content'

type ServicePageTemplateProps = {
  service: Service
  content: ServicePageContent
  nextService: Service
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

export function ServicePageTemplate({
  service,
  content,
  nextService,
}: ServicePageTemplateProps) {
  const whatsappUrl = getWhatsappUrl(content.whatsappMessage)

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
            <h2>Cuando esto pasa, la solucion no es agregar otra herramienta suelta.</h2>
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
            <h2>Una capa concreta para que el proceso avance con mas claridad.</h2>
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
            <h2>Lo que queda instalado, documentado o listo para operar.</h2>
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

      <section className="service-page-section service-page-section--diagram">
        <div className="section-shell">
          <div className="service-page-section__heading service-page-section__heading--wide">
            <p className="eyebrow">Diagrama funcional</p>
            <h2>{content.result}</h2>
          </div>
          <FunctionalDiagram content={content} />
        </div>
      </section>

      <section className="service-page-section">
        <div className="section-shell">
          <div className="service-page-section__heading service-page-section__heading--wide">
            <p className="eyebrow">Casos de uso</p>
            <h2>Tres formas concretas en que puede aplicarse.</h2>
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

      <section className="service-page-section service-page-section--case">
        <div className="section-shell service-case-card">
          <div>
            <p className="eyebrow">{content.caseStudy.label}</p>
            <h2>{content.caseStudy.title}</h2>
            <p>{content.caseStudy.text}</p>
          </div>
          <Link
            href="/servicios/#casos-relacionados"
            data-analytics-event="service_case_click"
            data-service-name={service.shortTitle}
          >
            <span>{content.caseStudy.client}</span>
            Ver casos relacionados
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      <section className="service-page-section">
        <div className="section-shell service-page-two-col">
          <div className="service-page-section__heading">
            <p className="eyebrow">Proceso</p>
            <h2>Etapas simples para pasar de problema a sistema funcionando.</h2>
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
