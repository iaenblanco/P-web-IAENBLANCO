'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { services, WHATSAPP_URL } from '@/lib/site'

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="menu-icon" aria-hidden="true">
      <span className={open ? 'menu-line menu-line--top is-open' : 'menu-line menu-line--top'} />
      <span className={open ? 'menu-line menu-line--bottom is-open' : 'menu-line menu-line--bottom'} />
    </span>
  )
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="site-header__inner">
        <Link href="/" className="brand-mark" aria-label="IAenBlanco, ir al inicio">
          <span className="brand-mark__plate">
            <Image
              src="/logo.png"
              alt="IAenBlanco"
              width={1024}
              height={1024}
              priority
              className="brand-mark__image"
            />
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link className={isActive('/') ? 'nav-link is-active' : 'nav-link'} href="/">
            Inicio
          </Link>

          <div
            className="services-nav"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <button
              className={isActive('/servicios') ? 'nav-link is-active' : 'nav-link'}
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen(true)}
            >
              Servicios
              <span className={servicesOpen ? 'nav-chevron is-open' : 'nav-chevron'}>⌄</span>
            </button>

            <div
              id="services-menu"
              className={servicesOpen ? 'services-menu is-open' : 'services-menu'}
              onMouseEnter={openServices}
              onMouseLeave={scheduleClose}
            >
              <div className="services-menu__label">
                <span>Capacidades</span>
                <span>05 sistemas</span>
              </div>
              <div className="services-menu__grid">
                {services.map((service) => (
                  <Link
                    href={`/servicios/${service.slug}`}
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
          </div>

          <Link
            className={isActive('/productos') ? 'nav-link is-active' : 'nav-link'}
            href="/productos"
          >
            Productos
          </Link>
          <Link
            className={isActive('/contacto') ? 'nav-link is-active' : 'nav-link'}
            href="/contacto"
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

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={mobileOpen ? 'mobile-navigation is-open' : 'mobile-navigation'}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Navegación móvil" className="mobile-navigation__inner">
          <Link href="/" className="mobile-navigation__primary">
            <span>01</span> Inicio
          </Link>
          <div className="mobile-navigation__services">
            <p><span>02</span> Servicios</p>
            {services.map((service) => (
              <Link key={service.slug} href={`/servicios/${service.slug}`}>
                {service.shortTitle}
                <ArrowUpRight />
              </Link>
            ))}
          </div>
          <Link href="/productos" className="mobile-navigation__primary">
            <span>03</span> Productos
          </Link>
          <Link href="/contacto" className="mobile-navigation__primary">
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
    </header>
  )
}
