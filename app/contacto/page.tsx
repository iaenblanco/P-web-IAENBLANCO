import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { EscenaHilo } from '@/components/EscenaBanda'
import { RevelaAlEntrar } from '@/components/RevelaAlEntrar'
import { Reveal } from '@/components/Reveal'
import { RevelaEnCascada } from '@/components/RevelaEnCascada'
import {
  COMPANY_PHONE,
  CONTACT_EMAIL,
  getWhatsappDesde,
  OG_IMAGE,
  SITE_URL,
  socialLinks,
} from '@/lib/site'

/* La misma bajada sirve para la metadata y para la tarjeta social. Una sola
   fuente, para que no quede una de las dos vieja. */
const DESCRIPCION =
  'Cuéntanos qué necesitas: un sitio web, una tienda online, un programa a la medida de tu negocio, o algo que hoy haces a mano y quieres que se haga solo.'

export const metadata: Metadata = {
  title: 'Contacto',
  description: DESCRIPCION,
  alternates: {
    canonical: `${SITE_URL}/contacto/`,
  },
  openGraph: {
    title: 'Contacto | IAenBlanco',
    description: DESCRIPCION,
    url: `${SITE_URL}/contacto/`,
    siteName: 'IAenBlanco',
    type: 'website',
    locale: 'es_CL',
    images: [
      OG_IMAGE,
    ],
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
        <div className="section-shell contact-hero__inner banda-apertura">
          <div className="banda-apertura__texto">
            <p className="hero-kicker"><span className="hero-kicker__punto" aria-hidden="true" /> Canal directo</p>
            <h1>
              Cuéntanos qué quieres
              <em>poner en operación.</em>
            </h1>
            <p>
              Puede ser un sitio web, una tienda online, un programa que todavía no
              existe, o algo que hoy haces a mano y quieres que se haga solo. No hace
              falta que sepas cómo se llama.
            </p>
          </div>
          {/* Es la pagina mas muda del sitio y es donde la persona decide escribir.
              La escena no dice nada que el parrafo de al lado no diga ya. */}
          <div className="banda-apertura__visual">
            <RevelaAlEntrar className="revela--escena">
              <EscenaHilo />
            </RevelaAlEntrar>
          </div>
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
              Es por donde contestamos más rápido. Cuéntanos qué está pasando y vemos
              juntos por dónde partir.
            </p>
            <a
              href={getWhatsappDesde('contacto')}
              target="_blank"
              rel="noreferrer"
              data-cursor="Abrir"
              data-whatsapp-origin="contacto"
            >
              {COMPANY_PHONE}
              <ArrowUpRight />
            </a>
          </Reveal>

          <Reveal className="contact-option" indice={1}>
            <div className="contact-option__top">
              <span>02</span>
              <span>Si prefieres escribir</span>
            </div>
            <h2>Email</h2>
            <p>
              Si tienes archivos que mandarnos, o prefieres dejar todo escrito y
              ordenado antes de hablar.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} data-cursor="Escribir">
              {CONTACT_EMAIL}
              <ArrowUpRight />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="contact-context" id="escribenos">
        <div className="section-shell contact-context__grid">
          <Reveal>
            <p className="eyebrow">Para partir bien</p>
            <h2>No necesitas llegar con la solución resuelta.</h2>
            <p className="contact-context__lead">
              Con esto nos basta para preparar la conversación. Te toma un minuto y
              llegamos sabiendo de qué hablar.
            </p>
          </Reveal>
          <Reveal className="contact-context__form" indice={1}>
            <ContactForm />
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
      {/* Un solo observador para toda la pagina: arma las piezas que todavia
          no se ven y las revela cuando entran. No pinta nada, asi que va al
          final. Sin el, los [data-revela] son divs comunes y todo se ve. */}
      <RevelaEnCascada />
    </main>
  )
}
