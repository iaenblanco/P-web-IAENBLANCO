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
  // Con Escape hay que devolver el foco al boton que abrio el panel; sin esto
  // el foco cae al <body> y hay que tabular de nuevo desde el principio.
  const serviciosBotonRef = useRef<HTMLButtonElement>(null)
  const productosBotonRef = useRef<HTMLButtonElement>(null)
  /*
   * Dos banderas para que el foco no pelee con el estado del panel. Van en refs
   * y no en estado porque se leen dentro del mismo evento que las escribe.
   *
   * restaurandoFoco: devolver el foco al boton con Escape dispara un focusin, y
   * React se lo entrega al onFocus del envoltorio. Como focusin es sincronico,
   * ese onFocus volveria a abrir el panel que Escape acaba de cerrar. Con la
   * bandera arriba durante ese unico focus, el onFocus se ignora.
   *
   * abiertoPorFoco: el focusin del propio boton es un evento discreto y se
   * despacha, con su render, ANTES del click. Cuando llega el onClick el estado
   * ya dice "abierto", asi que alternar cerraria un panel que la misma
   * interaccion acaba de abrir. La bandera recuerda ese caso para que el primer
   * click no haga nada.
   */
  const restaurandoFoco = useRef(false)
  const abiertoPorFoco = useRef(false)
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
    // Cualquier cierre termina la interaccion que habia abierto el panel por
    // foco: el proximo click vuelve a ser un toggle normal.
    abiertoPorFoco.current = false
    closeTimer.current = setTimeout(() => setOpenMenu(null), 90)
  }

  function forceCloseDesktopMenu() {
    clearCloseTimer()
    abiertoPorFoco.current = false
    setOpenMenu(null)
  }

  // En tactil no hay hover y el foco ya deja el panel abierto, asi que el boton
  // tiene que alternar: si solo abriera, el segundo toque no lo cerraria nunca.
  function toggleDesktopMenu(menu: 'services' | 'products') {
    // El foco de esta misma interaccion ya lo abrio: cerrarlo ahora seria abrir
    // y cerrar de un solo toque.
    if (abiertoPorFoco.current) {
      abiertoPorFoco.current = false
      return
    }
    if (openMenu === menu) {
      forceCloseDesktopMenu()
      return
    }
    openDesktopMenu(menu)
  }

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  /*
   * El menu del telefono es un <details> nativo: se abre y se cierra con su
   * propio boton y nada mas. No cierra con Escape ni al tocar fuera, que es lo
   * que cualquiera espera de un panel que ocupa toda la pantalla. Los dos
   * listeners van al document: el panel tapa la ventana entera y el teclado no
   * tiene el foco adentro, asi que no hay donde colgarlos mas cerca.
   */
  useEffect(() => {
    function alPresionarTecla(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      const caja = document.querySelector('.mobile-nav-shell')
      if (!(caja instanceof HTMLDetailsElement) || !caja.open) return
      // Si hay un subgrupo abierto (Servicios, Productos), Escape cierra ese
      // primero: llevarse el menu entero se come un paso que nadie pidio.
      const grupos = caja.querySelectorAll('details.mobile-navigation__grupo[open]')
      const ultimo = grupos[grupos.length - 1]
      if (ultimo instanceof HTMLDetailsElement) {
        ultimo.open = false
        return
      }
      cerrarMenuMovil()
    }

    function alTocarAfuera(event: PointerEvent) {
      const caja = document.querySelector('.mobile-nav-shell')
      if (!(caja instanceof HTMLDetailsElement) || !caja.open) return
      const destino = event.target
      if (!(destino instanceof Node)) return
      // El <summary> queda excluido a proposito: si cerramos en el pointerdown,
      // el toggle nativo lo vuelve a abrir en el click que viene enseguida.
      if (caja.querySelector('.mobile-toggle')?.contains(destino)) return
      // Todo lo navegable vive dentro de __inner; lo de afuera es el respaldo
      // del panel (la franja de arriba) o la cabecera, que se pinta por encima.
      if (caja.querySelector('.mobile-navigation__inner')?.contains(destino)) return
      cerrarMenuMovil()
    }

    document.addEventListener('keydown', alPresionarTecla)
    document.addEventListener('pointerdown', alTocarAfuera)
    return () => {
      document.removeEventListener('keydown', alPresionarTecla)
      document.removeEventListener('pointerdown', alTocarAfuera)
    }
    // cerrarMenuMovil solo consulta el DOM, no depende de estado: la referencia
    // del primer render sirve igual y evita re-registrar los listeners.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            onFocus={() => {
              if (restaurandoFoco.current) return
              if (openMenu !== 'services') abiertoPorFoco.current = true
              openDesktopMenu('services')
            }}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget as Node | null
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) closeDesktopMenu()
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                // Sin frenarlo aqui, el mismo Escape sigue hasta el listener de
                // document y de paso cierra el menu del telefono.
                event.stopPropagation()
                forceCloseDesktopMenu()
                // focusin es sincronico: el onFocus corre dentro de este focus()
                // y la bandera ya esta abajo en la linea siguiente.
                restaurandoFoco.current = true
                serviciosBotonRef.current?.focus()
                restaurandoFoco.current = false
              }
            }}
          >
            <button
              type="button"
              className="nav-link"
              ref={serviciosBotonRef}
              aria-controls="services-menu"
              aria-expanded={openMenu === 'services'}
              onClick={() => toggleDesktopMenu('services')}
            >
              Servicios
              <span className={`nav-chevron${openMenu === 'services' ? ' is-open' : ''}`}>⌄</span>
            </button>

            {/* Esto es un disclosure de enlaces, no un menubar: no hay flechas ni
                roving tabindex, y con Tab se recorre solo. Por eso no lleva
                role="menu"/"menuitem", que lo haria anunciarse como un menu que
                no responde a las teclas que ese rol promete. El boton tampoco
                lleva aria-haspopup: en ARIA el valor "true" es sinonimo exacto
                de "menu", asi que anunciaria lo mismo por otra puerta. Con
                aria-expanded y aria-controls, que si estan, alcanza. */}
            <div
              id="services-menu"
              className="services-menu"
            >
              <div className="services-menu__label">
                <span>Capacidades</span>
                <span>{String(services.length).padStart(2, '0')} servicios</span>
              </div>
              <div className="services-menu__grid">
                {services.map((service) => (
                  <Link
                    href={`/servicios/${service.slug}`}
                    prefetch={false}
                    className="services-menu__item"
                    key={service.slug}
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
            onFocus={() => {
              if (restaurandoFoco.current) return
              if (openMenu !== 'products') abiertoPorFoco.current = true
              openDesktopMenu('products')
            }}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget as Node | null
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) closeDesktopMenu()
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                // Igual que en Servicios: el listener de document que cierra el
                // menu movil escucha el mismo Escape.
                event.stopPropagation()
                forceCloseDesktopMenu()
                // Igual que en Servicios: la bandera tapa el focusin sincronico.
                restaurandoFoco.current = true
                productosBotonRef.current?.focus()
                restaurandoFoco.current = false
              }
            }}
          >
            <button
              type="button"
              className="nav-link"
              ref={productosBotonRef}
              aria-controls="products-menu"
              aria-expanded={openMenu === 'products'}
              onClick={() => toggleDesktopMenu('products')}
            >
              Productos
              <span className={`nav-chevron${openMenu === 'products' ? ' is-open' : ''}`}>⌄</span>
            </button>

            {/* Disclosure, no menubar: ver la nota del panel de Servicios. */}
            <div
              id="products-menu"
              className="services-menu products-menu"
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
            href="/trabajos/"
            prefetch={false}
          >
            Trabajos
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
          aria-label="Escribirnos por WhatsApp"
        >
          {/* En el telefono no hay hover que aclare a donde lleva, asi que el
              boton dice el canal por su nombre. */}
          <span className="header-cta__ancho">Hablemos</span>
          <span className="header-cta__angosto">WhatsApp</span>
          <ArrowUpRight className="header-cta__icon" />
        </a>

        <details className="mobile-nav-shell">
          {/* Nombre neutro: el estado abierto/cerrado ya lo anuncia el <details>
              nativo, y un "Abrir menu" fijo mentia con el panel abierto. */}
          <summary
            className="mobile-toggle"
            aria-controls="mobile-navigation"
            aria-label="Menú"
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
                href="/trabajos/"
                prefetch={false}
                className="mobile-navigation__primary"
                onClick={cerrarMenuMovil}
              >
                <span>04</span> Trabajos
              </Link>
              <Link
                href="/contacto"
                prefetch={false}
                className="mobile-navigation__primary"
                onClick={cerrarMenuMovil}
              >
                <span>05</span> Contacto
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
