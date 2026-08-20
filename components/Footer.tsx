import Image from 'next/image'
import Link from 'next/link'
import {
  COMPANY_ADDRESS,
  COMPANY_LEGAL_NAME,
  CONTACT_EMAIL,
  services,
  socialLinks,
  WHATSAPP_URL,
} from '@/lib/site'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__statement">
            <div className="footer-logo">
              <Image src="/logo-ui.webp" width={256} height={256} alt="IAenBlanco" />
            </div>
            <p className="eyebrow eyebrow--dark">Tecnología que se usa, no que se explica</p>
            <p className="site-footer__tagline">Sitios web, programas a medida y asistentes con IA.</p>
            <h2>Trabajamos con negocios chilenos que ya están funcionando.</h2>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="footer-primary-link"
              data-cursor="Hablemos"
            >
              Hablemos
              <ArrowUpRight />
            </a>
          </div>

          <div className="site-footer__nav">
            <div>
              <p>Navegación</p>
              <Link href="/" prefetch={false}>Inicio</Link>
              <Link href="/servicios" prefetch={false}>Servicios</Link>
              <Link href="/productos" prefetch={false}>Productos</Link>
              <Link href="/contacto" prefetch={false}>Contacto</Link>
            </div>
            <div>
              <p>Servicios</p>
              {services.map((service) => (
                <Link key={service.slug} href={`/servicios/${service.slug}`} prefetch={false}>
                  {service.shortTitle}
                </Link>
              ))}
            </div>
            <div>
              <p>Contacto</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {COMPANY_LEGAL_NAME}</p>
          <div>
            <Link href="/privacidad" prefetch={false}>Privacidad</Link>
            <Link href="/terminos" prefetch={false}>Términos</Link>
          </div>
          <p>{COMPANY_ADDRESS}</p>
        </div>
      </div>
    </footer>
  )
}
