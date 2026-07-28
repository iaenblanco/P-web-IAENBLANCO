import Link from 'next/link'
import { services, WHATSAPP_URL } from '@/lib/site'

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <span className="menu-icon" aria-hidden="true">
      <span className="menu-line menu-line--top" />
      <span className="menu-line menu-line--bottom" />
    </span>
  )
}

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" prefetch={false} className="brand-mark" aria-label="IAenBlanco, ir al inicio">
          <span className="brand-mark__plate">
            {/* eslint-disable-next-line @next/next/no-img-element -- The header logo is the local LCP element; a plain eager image avoids extra runtime work. */}
            <img
              src="/logo-ui.webp"
              alt="IAenBlanco"
              width={256}
              height={256}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="brand-mark__image"
            />
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link className="nav-link" href="/" prefetch={false}>
            Inicio
          </Link>

          <details className="services-nav">
            <summary className="nav-link" aria-controls="services-menu">
              Servicios
              <span className="nav-chevron">⌄</span>
            </summary>

            <div
              id="services-menu"
              className="services-menu"
            >
              <div className="services-menu__label">
                <span>Capacidades</span>
                <span>05 sistemas</span>
              </div>
              <div className="services-menu__grid">
                {services.map((service) => (
                  <Link
                    href={`/servicios/${service.slug}`}
                    prefetch={false}
                    className="services-menu__item"
                    key={service.slug}
                  >
                    <span className="services-menu__index">{service.index}</span>
                    <span>
                      <strong>{service.shortTitle}</strong>
                      <small>{service.eyebrow}</small>
                    </span>
                    <ArrowUpRight className="services-menu__arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </details>

          <Link
            className="nav-link"
            href="/productos"
            prefetch={false}
          >
            Productos
          </Link>
          <Link
            className="nav-link"
            href="/contacto"
            prefetch={false}
          >
            Contacto
          </Link>
        </nav>

        <a
          href={WHATSAPP_URL}
          className="header-cta"
          target="_blank"
          rel="noreferrer"
          data-cursor="WhatsApp"
        >
          Hablemos
          <ArrowUpRight className="header-cta__icon" />
        </a>

        <details className="mobile-nav-shell">
          <summary
            className="mobile-toggle"
            aria-controls="mobile-navigation"
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </summary>

          <div id="mobile-navigation" className="mobile-navigation">
            <nav aria-label="Navegación móvil" className="mobile-navigation__inner">
              <Link href="/" prefetch={false} className="mobile-navigation__primary">
                <span>01</span> Inicio
              </Link>
              <div className="mobile-navigation__services">
                <p><span>02</span> Servicios</p>
                {services.map((service) => (
                  <Link key={service.slug} href={`/servicios/${service.slug}`} prefetch={false}>
                    {service.shortTitle}
                    <ArrowUpRight />
                  </Link>
                ))}
              </div>
              <Link href="/productos" prefetch={false} className="mobile-navigation__primary">
                <span>03</span> Productos
              </Link>
              <Link href="/contacto" prefetch={false} className="mobile-navigation__primary">
                <span>04</span> Contacto
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mobile-navigation__cta"
              >
                Iniciar conversación
                <ArrowUpRight />
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}
