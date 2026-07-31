'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { products, services, WHATSAPP_URL } from '@/lib/site'

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
  const [openMenu, setOpenMenu] = useState<'services' | 'products' | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
              <Link
                href="/servicios"
                prefetch={false}
                className="products-menu__all"
                role="menuitem"
                onClick={forceCloseDesktopMenu}
              >
                Ver página de servicios
                <ArrowUpRight className="services-menu__arrow" />
              </Link>
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
                <span>03 sistemas</span>
              </div>
              <div className="services-menu__grid products-menu__grid">
                {products.map((product, index) => (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
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
                  </a>
                ))}
              </div>
              <Link
                href="/productos"
                prefetch={false}
                className="products-menu__all"
                role="menuitem"
                onClick={forceCloseDesktopMenu}
              >
                Ver página de productos
                <ArrowUpRight className="services-menu__arrow" />
              </Link>
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
                <Link href="/servicios" prefetch={false}>
                  Ver todos los servicios
                  <ArrowUpRight />
                </Link>
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
