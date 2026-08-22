'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { products, services, WHATSAPP_URL } from '@/lib/site'

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg className="mobile-navigation__chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
  const [openMenu, setOpenMenu] = useState<'services' | 'products' | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  /*
   * Estando ya en el inicio, tocar el logo o "Inicio" no hacia nada: Next ve
   * la misma ruta y no navega, asi que uno quedaba donde mismo, a mitad de
   * pagina, con la sensacion de que el boton esta pegado. Si ya estamos en
   * "/", el enlace sube al principio en vez de navegar.
   */
  function volverAlInicio(event: { preventDefault: () => void }) {
    forceCloseDesktopMenu()
    cerrarMenuMovil()
    if (pathname !== '/') return
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cerrarMenuMovil() {
    const caja = document.querySelector('.mobile-nav-shell')
    if (caja instanceof HTMLDetailsElement) caja.open = false
  }

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function openDesktopMenu(menu: 'services' | 'products') {
    clearCloseTimer()
    setOpenMenu(menu)
  }

  function closeDesktopMenu() {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setOpenMenu(null), 90)
  }

  function forceCloseDesktopMenu() {
    clearCloseTimer()
    setOpenMenu(null)
  }

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="/"
          prefetch={false}
          className="brand-mark"
          aria-label="IAenBlanco, ir al inicio"
          onClick={volverAlInicio}
        >
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
          <Link className="nav-link" href="/" prefetch={false} onClick={volverAlInicio}>
            Inicio
          </Link>

          <div
            className={`nav-menu services-nav${openMenu === 'services' ? ' is-open' : ''}`}
            onMouseEnter={() => openDesktopMenu('services')}
            onMouseLeave={closeDesktopMenu}
            onFocus={() => openDesktopMenu('services')}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget as Node | null
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) closeDesktopMenu()
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                forceCloseDesktopMenu()
                const activeElement = document.activeElement
                if (activeElement instanceof HTMLElement) activeElement.blur()
              }
            }}
          >
            <button
              type="button"
              className="nav-link"
              aria-controls="services-menu"
              aria-expanded={openMenu === 'services'}
              aria-haspopup="menu"
              onClick={() => openDesktopMenu('services')}
            >
              Servicios
              <span className={`nav-chevron${openMenu === 'services' ? ' is-open' : ''}`}>⌄</span>
            </button>

            <div
              id="services-menu"
              className="services-menu"
              role="menu"
            >
              <div className="services-menu__label">
                <span>Capacidades</span>
                <span>05 servicios</span>
              </div>
              <div className="services-menu__grid">
                {services.map((service) => (
                  <Link
                    href={`/servicios/${service.slug}`}
                    prefetch={false}
                    className="services-menu__item"
                    key={service.slug}
                    role="menuitem"
                    onClick={forceCloseDesktopMenu}
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
          </div>

          <div
            className={`nav-menu products-nav${openMenu === 'products' ? ' is-open' : ''}`}
            onMouseEnter={() => openDesktopMenu('products')}
            onMouseLeave={closeDesktopMenu}
            onFocus={() => openDesktopMenu('products')}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget as Node | null
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) closeDesktopMenu()
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                forceCloseDesktopMenu()
                const activeElement = document.activeElement
                if (activeElement instanceof HTMLElement) activeElement.blur()
              }
            }}
          >
            <button
              type="button"
              className="nav-link"
              aria-controls="products-menu"
              aria-expanded={openMenu === 'products'}
              aria-haspopup="menu"
              onClick={() => openDesktopMenu('products')}
            >
              Productos
              <span className={`nav-chevron${openMenu === 'products' ? ' is-open' : ''}`}>⌄</span>
            </button>

            <div
              id="products-menu"
              className="services-menu products-menu"
              role="menu"
            >
              <div className="services-menu__label">
                <span>Productos propios</span>
                <span>Muy pronto</span>
              </div>
              <div className="services-menu__grid products-menu__grid">
                {products.map((product, index) => (
                  <Link
                    href={`/productos#${product.id}`}
                    prefetch={false}
                    className="services-menu__item products-menu__item"
                    key={product.name}
                    role="menuitem"
                    onClick={forceCloseDesktopMenu}
                  >
                    <span className="services-menu__index">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.eyebrow}</small>
                    </span>
                    <ArrowUpRight className="services-menu__arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
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
          aria-label="Escribirnos por WhatsApp"
        >
          {/* En el telefono no hay hover que aclare a donde lleva, asi que el
              boton dice el canal por su nombre. */}
          <span className="header-cta__ancho">Hablemos</span>
          <span className="header-cta__angosto">WhatsApp</span>
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
              <Link
                href="/"
                prefetch={false}
                className="mobile-navigation__primary"
                onClick={volverAlInicio}
              >
                <span>01</span> Inicio
              </Link>
              {/* Servicios y Productos son plegables y arrancan cerrados: antes
                  Servicios se abria solo y el menu partia con seis renglones de
                  submenu antes de dejar ver Productos y Contacto. */}
              <details className="mobile-navigation__grupo">
                <summary>
                  <span>02</span>
                  Servicios
                  <ChevronDown />
                </summary>
                <div className="mobile-navigation__sub">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/servicios/${service.slug}`}
                      prefetch={false}
                      onClick={cerrarMenuMovil}
                    >
                      {service.shortTitle}
                      <ArrowUpRight />
                    </Link>
                  ))}
                </div>
              </details>

              <details className="mobile-navigation__grupo">
                <summary>
                  <span>03</span>
                  Productos
                  <ChevronDown />
                </summary>
                <div className="mobile-navigation__sub">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/productos#${product.id}`}
                      prefetch={false}
                      onClick={cerrarMenuMovil}
                    >
                      {product.name}
                      <ArrowUpRight />
                    </Link>
                  ))}
                </div>
              </details>
              <Link
                href="/contacto"
                prefetch={false}
                className="mobile-navigation__primary"
                onClick={cerrarMenuMovil}
              >
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
