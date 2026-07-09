import Link from 'next/link'
import { ContactBand } from '@/components/ContactBand'
import { OperationalField } from '@/components/OperationalField'
import { Reveal } from '@/components/Reveal'
import { ServiceSystem } from '@/components/ServiceSystem'
import { TypingLine } from '@/components/TypingLine'
import { clients, WHATSAPP_URL } from '@/lib/site'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <main id="contenido">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="section-shell home-hero__inner">
          <div className="home-hero__content">
            <p className="hero-kicker">
              <span />
              Inteligencia artificial en operación
            </p>
            <h1 id="home-title">
              La IA deja de ser promesa.
              <em>Empieza a operar.</em>
            </h1>
            <p className="home-hero__summary">
              Diseñamos sitios, plataformas, automatizaciones y soluciones de IA
              conectadas con la realidad de tu negocio.
            </p>
            <div className="home-hero__actions">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="button button--primary"
                data-cursor="WhatsApp"
              >
                Cuéntanos tu idea
                <ArrowUpRight />
              </a>
              <Link href="#servicios" className="button button--text">
                Explorar capacidades
                <ArrowDown />
              </Link>
            </div>
            <TypingLine />
          </div>

          <div className="home-hero__visual">
            <OperationalField />
            <div className="hero-readout hero-readout--top">
              <span>Estado</span>
              <strong><i /> Operativo</strong>
            </div>
            <div className="hero-readout hero-readout--bottom">
              <span>Señal</span>
              <strong>Negocio → Sistema</strong>
            </div>
          </div>
        </div>
        <div className="home-hero__index section-shell">
          <span>IAenBlanco / 2026</span>
          <span>Chile → Latinoamérica</span>
          <span>Scroll para descubrir</span>
        </div>
      </section>

      <section className="client-rail" aria-label="Clientes de IAenBlanco">
        <div className="section-shell">
          <p>Han trabajado con nosotros</p>
          <div className="client-rail__names">
            {clients.map((client) => <span key={client}>{client}</span>)}
          </div>
        </div>
      </section>

      <section className="positioning-section">
        <div className="section-shell positioning-section__grid">
          <Reveal>
            <p className="eyebrow">Nuestro enfoque</p>
          </Reveal>
          <Reveal className="positioning-section__statement">
            <h2>
              La tecnología importa.
              <span>Lo que cambia tu operación, más.</span>
            </h2>
            <p>
              Partimos por entender el problema, no por imponer una herramienta.
              Después diseñamos el sistema, conectamos las piezas y lo dejamos
              funcionando dentro del negocio.
            </p>
          </Reveal>
          <Reveal className="positioning-section__aside" delay={120}>
            <span>Web</span>
            <span>Backend</span>
            <span>Automatización</span>
            <span>Inteligencia</span>
          </Reveal>
        </div>
      </section>

      <ServiceSystem />

      <section className="operating-model" aria-labelledby="model-heading">
        <div className="section-shell">
          <Reveal className="operating-model__heading">
            <p className="eyebrow">Cómo trabajamos</p>
            <h2 id="model-heading">De una necesidad abierta a un sistema funcionando.</h2>
          </Reveal>

          <div className="operating-model__steps">
            {[
              {
                number: '01',
                title: 'Entender',
                text: 'Mapeamos el desafío, la operación y las restricciones antes de elegir una solución.',
              },
              {
                number: '02',
                title: 'Construir',
                text: 'Diseñamos y desarrollamos la capa exacta: interfaz, backend, integración o IA.',
              },
              {
                number: '03',
                title: 'Operar',
                text: 'Ponemos el sistema en marcha y lo acompañamos con soporte o evolución continua.',
              },
            ].map((step, index) => (
              <Reveal key={step.number} className="operating-step" delay={index * 90}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="industry-line">
            <p>Experiencia aplicada en</p>
            <div>
              <span>E-commerce</span>
              <span>Logística</span>
              <span>Inmobiliario</span>
              <span>Negocios con agenda</span>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </main>
  )
}
