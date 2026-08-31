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

/* La flecha de los desplegables de escritorio. Antes era el caracter U+2304
   escrito en el JSX: un glifo, o sea que su grosor lo decidia la fuente y no
   el diseño, se desalineaba de la linea base del rotulo de al lado -habia un
   translateY(-2px) puesto solo para taparlo- y el navegador que no tuviera
   ese glifo pintaba un cuadro. Dibujada, mide siempre lo mismo y el trazo es
   el del sistema. 1,5 y no los 1,6 de la version de telefono porque aqui va a
   14 px y alla a 22: a menor tamaño, menor grosor para el mismo peso optico. */
function ChevronNav() {
  return (
    <svg className="nav-chevron__glifo" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

/*
 * Con trailingSlash: true la misma pagina se escribe de dos formas segun quien
 * arme el enlace, y comparando en crudo "/trabajos" y "/trabajos/" quedaban
 * como rutas distintas: ninguna se marcaba. Se compara sin la barra final,
 * salvo la raiz, que es solo esa barra.
 */
function normalizarRuta(ruta: string) {
  return ruta.length > 1 ? ruta.replace(/\/+$/, '') : ruta
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
   * Los dos grupos plegables del panel del telefono. Antes esto era un
   * <details> nativo y no hacia falta estado, pero el renglon ahora tiene dos
   * destinos -el rotulo navega, la flecha despliega- y un enlace no puede vivir
   * dentro de un <summary> sin anidar dos cosas activables una dentro de otra.
   * Se guardan los dos por separado, como estaban: abrir Productos no cierra
   * Servicios.
   *
   * El ref va al lado del estado porque el listener de Escape se registra una
   * sola vez, con [] de dependencias, y leeria para siempre el arreglo del
   * primer render.
   */
  const [gruposAbiertos, setGruposAbiertos] = useState<string[]>([])
  const gruposAbiertosRef = useRef<string[]>([])

  function fijarGrupos(abiertos: string[]) {
    gruposAbiertosRef.current = abiertos
    setGruposAbiertos(abiertos)
  }

  const grupoAbierto = (id: string) => gruposAbiertos.includes(id)

  function alternarGrupo(id: string) {
    const abiertos = gruposAbiertosRef.current
    fijarGrupos(abiertos.includes(id) ? abiertos.filter((otro) => otro !== id) : [...abiertos, id])
  }

  /*
   * Decir en que pagina estamos. aria-current="page" va solo en la ruta exacta,
   * que es lo unico que el lector de pantalla puede anunciar sin mentir; la
   * clase .is-active es la parte visual y el CSS ya la dibuja como subrayado
   * fijo (.nav-link.is-active::after). Los disparadores "Servicios" y
   * "Productos" llevan solo la clase: dentro de una ficha de detalle el
   * desplegable no es la pagina actual, pero la cabecera igual tiene que
   * mostrar en que rama estamos parados.
   */
  const rutaActual = normalizarRuta(pathname)
  const esRutaActual = (href: string) => rutaActual === normalizarRuta(href)
  const enSeccion = (seccion: string) =>
    rutaActual === seccion || rutaActual.startsWith(`${seccion}/`)

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
      const abiertos = gruposAbiertosRef.current
      if (abiertos.length > 0) {
        fijarGrupos(abiertos.slice(0, -1))
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
          {/* El simbolo suelto, no el logotipo entero. `logo-ui.webp` trae la
              palabra dibujada dentro, y a los 40 px de la chapa «en Blanco»
              queda en 8 px de mancha ilegible. Aca el nombre lo pone el texto
              -que se lee, se selecciona, se busca y escala- y la imagen se
              queda solo con la marca. El alt va vacio a proposito: el nombre
              esta al lado en texto real y repetirlo lo diria dos veces. */}
          <span className="brand-mark__plate">
            {/* eslint-disable-next-line @next/next/no-img-element -- The header logo is the local LCP element; a plain eager image avoids extra runtime work. */}
            <img
              src="/logo-simbolo.webp"
              alt=""
              width={199}
              height={128}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="brand-mark__image"
            />
          </span>
          <span className="brand-mark__nombre">IAenBlanco</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link
            className={`nav-link${esRutaActual('/') ? ' is-active' : ''}`}
            href="/"
            prefetch={false}
            aria-current={esRutaActual('/') ? 'page' : undefined}
            onClick={volverAlInicio}
          >
            Inicio
          </Link>

          <div
            className={`nav-menu services-nav${openMenu === 'services' ? ' is-open' : ''}`}
            onMouseEnter={() => openDesktopMenu('services')}
            onMouseLeave={closeDesktopMenu}
            onFocus={(event) => {
              if (restaurandoFoco.current) return
              // La bandera solo tiene sentido si el foco cayo en la flecha: es
              // lo unico cuyo click alterna el panel. Desde que el rotulo es un
              // enlace aparte, ponerla tambien cuando el foco llega al rotulo
              // dejaba muerto el primer click de la flecha.
              const enLaFlecha = serviciosBotonRef.current?.contains(event.target as Node) ?? false
              if (openMenu !== 'services' && enLaFlecha) abiertoPorFoco.current = true
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
            {/* El rotulo navega y la flecha despliega. Antes "Servicios" era un
                boton y nada mas: desde la cabecera no habia manera de llegar a
                /servicios/, y por eso el desplegable llevaba una fila extra
                -"Ver los cuatro servicios"- que decia lo mismo que el renglon de
                arriba. Partido en dos, el rotulo hace lo que promete y esa fila
                sobra. El aria-expanded y el aria-controls viajan con la flecha,
                que es la que manda sobre el panel. */}
            <Link
              href="/servicios/"
              prefetch={false}
              className={`nav-link${enSeccion('/servicios') ? ' is-active' : ''}`}
              aria-current={esRutaActual('/servicios/') ? 'page' : undefined}
              onClick={forceCloseDesktopMenu}
            >
              Servicios
            </Link>
            <button
              type="button"
              className="nav-desplegar"
              ref={serviciosBotonRef}
              aria-controls="services-menu"
              aria-expanded={openMenu === 'services'}
              aria-label="Desplegar servicios"
              onClick={() => toggleDesktopMenu('services')}
            >
              <span className={`nav-chevron${openMenu === 'services' ? ' is-open' : ''}`}>
                <ChevronNav />
              </span>
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
                    href={`/servicios/${service.slug}/`}
                    prefetch={false}
                    className="services-menu__item"
                    key={service.slug}
                    aria-current={esRutaActual(`/servicios/${service.slug}/`) ? 'page' : undefined}
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
            onFocus={(event) => {
              if (restaurandoFoco.current) return
              // Igual que en Servicios: ver la nota del otro desplegable.
              const enLaFlecha = productosBotonRef.current?.contains(event.target as Node) ?? false
              if (openMenu !== 'products' && enLaFlecha) abiertoPorFoco.current = true
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
            {/* Mismo reparto que en Servicios: ver la nota del otro
                desplegable. */}
            <Link
              href="/productos/"
              prefetch={false}
              className={`nav-link${enSeccion('/productos') ? ' is-active' : ''}`}
              aria-current={esRutaActual('/productos/') ? 'page' : undefined}
              onClick={forceCloseDesktopMenu}
            >
              Productos
            </Link>
            <button
              type="button"
              className="nav-desplegar"
              ref={productosBotonRef}
              aria-controls="products-menu"
              aria-expanded={openMenu === 'products'}
              aria-label="Desplegar productos"
              onClick={() => toggleDesktopMenu('products')}
            >
              <span className={`nav-chevron${openMenu === 'products' ? ' is-open' : ''}`}>
                <ChevronNav />
              </span>
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
              {/* Las tres fichas son anclas de esta misma pagina, asi que no
                  llevan aria-current: serian tres "pagina actual" a la vez
                  estando en /productos/. El rotulo "Productos" de arriba si lo
                  lleva, y es el que corresponde. */}
              <div className="services-menu__grid products-menu__grid">
                {products.map((product, index) => (
                  <Link
                    href={`/productos/#${product.id}`}
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
            className={`nav-link${enSeccion('/trabajos') ? ' is-active' : ''}`}
            href="/trabajos/"
            prefetch={false}
            aria-current={esRutaActual('/trabajos/') ? 'page' : undefined}
          >
            Trabajos
          </Link>
          <Link
            className={`nav-link${esRutaActual('/contacto/') ? ' is-active' : ''}`}
            href="/contacto/"
            prefetch={false}
            aria-current={esRutaActual('/contacto/') ? 'page' : undefined}
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
                className={`mobile-navigation__primary${esRutaActual('/') ? ' is-active' : ''}`}
                aria-current={esRutaActual('/') ? 'page' : undefined}
                onClick={volverAlInicio}
              >
                {/* El rotulo va en su propia caja para que el subrayado de
                    "estas aqui" caiga solo debajo de la palabra. Suelto como
                    nodo de texto, la decoracion se originaba en el renglon
                    entero y bajaba tambien al numero: quedaba una rayita en
                    tinta plena bajo un numero gris, 26 px mas arriba que la del
                    rotulo -cada uno toma su desplazamiento de su propia linea
                    base- y se leia como dos marcas sueltas, no como una. */}
                <span className="mobile-navigation__numero">01</span>
                <span className="mobile-navigation__texto">Inicio</span>
              </Link>
              {/* Servicios y Productos son plegables y arrancan cerrados: antes
                  Servicios se abria solo y el menu partia con seis renglones de
                  submenu antes de dejar ver Productos y Contacto.
                  El renglon tiene dos destinos: el rotulo lleva a la pagina de
                  la seccion y la flecha abre las fichas. Antes el renglon entero
                  solo desplegaba, y la pagina de la seccion se alcanzaba con una
                  fila extra dentro del acordeon que repetia el rotulo. Era un
                  <details> nativo, que no admite un enlace dentro del <summary>
                  sin anidar dos cosas activables una dentro de otra, asi que el
                  estado pasa a React -ver gruposAbiertos, mas arriba-. */}
              <div className="mobile-navigation__grupo">
                <div className="mobile-navigation__fila">
                  <Link
                    href="/servicios/"
                    prefetch={false}
                    className={`mobile-navigation__primary${enSeccion('/servicios') ? ' is-active' : ''}`}
                    aria-current={esRutaActual('/servicios/') ? 'page' : undefined}
                    onClick={cerrarMenuMovil}
                  >
                    <span className="mobile-navigation__numero">02</span>
                    <span className="mobile-navigation__texto">Servicios</span>
                  </Link>
                  <button
                    type="button"
                    className="mobile-navigation__disparador"
                    aria-controls="mobile-servicios"
                    aria-expanded={grupoAbierto('servicios')}
                    aria-label="Desplegar servicios"
                    onClick={() => alternarGrupo('servicios')}
                  >
                    <ChevronDown />
                  </button>
                </div>
                <div
                  id="mobile-servicios"
                  className="mobile-navigation__sub"
                  hidden={!grupoAbierto('servicios')}
                >
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/servicios/${service.slug}/`}
                      prefetch={false}
                      aria-current={esRutaActual(`/servicios/${service.slug}/`) ? 'page' : undefined}
                      onClick={cerrarMenuMovil}
                    >
                      {service.shortTitle}
                      <ArrowUpRight />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mismo reparto que en Servicios: ver la nota de arriba. Las tres
                  fichas son anclas de /productos/, asi que no llevan
                  aria-current; el rotulo si. */}
              <div className="mobile-navigation__grupo">
                <div className="mobile-navigation__fila">
                  <Link
                    href="/productos/"
                    prefetch={false}
                    className={`mobile-navigation__primary${enSeccion('/productos') ? ' is-active' : ''}`}
                    aria-current={esRutaActual('/productos/') ? 'page' : undefined}
                    onClick={cerrarMenuMovil}
                  >
                    <span className="mobile-navigation__numero">03</span>
                    <span className="mobile-navigation__texto">Productos</span>
                  </Link>
                  <button
                    type="button"
                    className="mobile-navigation__disparador"
                    aria-controls="mobile-productos"
                    aria-expanded={grupoAbierto('productos')}
                    aria-label="Desplegar productos"
                    onClick={() => alternarGrupo('productos')}
                  >
                    <ChevronDown />
                  </button>
                </div>
                <div
                  id="mobile-productos"
                  className="mobile-navigation__sub"
                  hidden={!grupoAbierto('productos')}
                >
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/productos/#${product.id}`}
                      prefetch={false}
                      onClick={cerrarMenuMovil}
                    >
                      {product.name}
                      <ArrowUpRight />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/trabajos/"
                prefetch={false}
                className={`mobile-navigation__primary${enSeccion('/trabajos') ? ' is-active' : ''}`}
                aria-current={esRutaActual('/trabajos/') ? 'page' : undefined}
                onClick={cerrarMenuMovil}
              >
                <span className="mobile-navigation__numero">04</span>
                <span className="mobile-navigation__texto">Trabajos</span>
              </Link>
              <Link
                href="/contacto/"
                prefetch={false}
                className={`mobile-navigation__primary${esRutaActual('/contacto/') ? ' is-active' : ''}`}
                aria-current={esRutaActual('/contacto/') ? 'page' : undefined}
                onClick={cerrarMenuMovil}
              >
                <span className="mobile-navigation__numero">05</span>
                <span className="mobile-navigation__texto">Contacto</span>
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
