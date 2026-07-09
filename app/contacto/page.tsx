import type { Metadata } from 'next'
import { Reveal } from '@/components/Reveal'
import {
  CONTACT_EMAIL,
  SITE_URL,
  socialLinks,
  WHATSAPP_URL,
} from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Conversa con IAenBlanco sobre un sitio web, plataforma, automatización o solución de inteligencia artificial a medida.',
  alternates: {
    canonical: `${SITE_URL}/contacto/`,
  },
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function ContactPage() {
  return (
    <main id="contenido">
      <section className="contact-hero">
        <div className="contact-hero__grid" aria-hidden="true" />
        <div className="section-shell contact-hero__inner">
          <p className="hero-kicker"><span /> Canal directo</p>
          <h1>
            Cuéntanos qué quieres
            <em>poner en operación.</em>
          </h1>
          <p>
            Puede ser una web, una plataforma que todavía no existe, un proceso
            que necesita conectarse o una idea de IA difícil de encasillar.
          </p>
        </div>
      </section>

      <section className="contact-options" aria-label="Formas de contacto">
        <div className="section-shell contact-options__grid">
          <Reveal className="contact-option contact-option--primary">
            <div className="contact-option__top">
              <span>01</span>
              <span>Conversación directa</span>
            </div>
            <h2>WhatsApp</h2>
            <p>
              El canal principal para contarnos el contexto, compartir una idea y
              decidir juntos el siguiente paso.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor="Abrir"
            >
              +56 9 7768 4800
              <ArrowUpRight />
            </a>
          </Reveal>

          <Reveal className="contact-option" delay={100}>
            <div className="contact-option__top">
              <span>02</span>
              <span>Contexto por escrito</span>
            </div>
            <h2>Email</h2>
            <p>
              Para documentos, alcances más extensos o información que prefieres
              ordenar antes de conversar.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} data-cursor="Escribir">
              {CONTACT_EMAIL}
              <ArrowUpRight />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="contact-context">
        <div className="section-shell contact-context__grid">
          <Reveal>
            <p className="eyebrow">Para partir bien</p>
            <h2>No necesitas llegar con la solución resuelta.</h2>
          </Reveal>
          <Reveal className="contact-context__list" delay={100}>
            <p>Solo necesitamos entender:</p>
            <ol>
              <li><span>01</span> Qué está pasando hoy.</li>
              <li><span>02</span> Qué debería funcionar mejor.</li>
              <li><span>03</span> Qué sistemas o personas participan.</li>
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="social-strip">
        <div className="section-shell">
          <p>También puedes seguir lo que estamos construyendo.</p>
          <div>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              Instagram <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
