'use client'

import { useEffect, useRef } from 'react'

/* El circuito del heroe «Neón»: cuatro servicios a medida entran por la
   izquierda, pasan por el nodo (el simbolo de IAenBlanco) y salen tres
   programas propios por la derecha.

   Todo lo que se ve esta en el HTML estatico: el SVG, las trazas, la
   corriente y los paquetes (SMIL). El JavaScript de aca abajo no dibuja
   nada; solo pausa el circuito cuando no se ve (fuera de pantalla, pestaña
   oculta, o la variante que el corte de 900 px esconde) y avisa a la
   cabecera cuando el heroe se fue de la pantalla (html.hero-fuera).

   Se renderiza dos veces -desk y tel- con geometrias distintas; el CSS
   muestra una por corte. Los ids llevan la variante de prefijo porque los
   <mpath href="#..."> chocarian si se repitieran. */

type Variante = 'desk' | 'tel'

type Geo = {
  w: number
  h: number
  cw: number
  izq: number[]
  der: number[]
  xd: number
  bi: number
  bd: number
  cx: number
  cy: number
  r: number
  pie: number
  letra: number
}

const GEO: Record<Variante, Geo> = {
  desk: { w: 592, h: 420, cw: 150, izq: [70, 150, 230, 310], der: [110, 190, 270], xd: 442, bi: 190, bd: 402, cx: 296, cy: 190, r: 56, pie: 370, letra: 13 },
  tel: { w: 358, h: 330, cw: 118, izq: [60, 120, 180, 240], der: [90, 150, 210], xd: 240, bi: 140, bd: 218, cx: 179, cy: 150, r: 44, pie: 270, letra: 12 },
}

const ALTO_FICHA = 34
const RADIO_FICHA = 10

/* Iconos de 20x20 (trazo 1.5), se pintan a 14 px con scale(0.7). */
const ICONOS = {
  web: (
    <>
      <rect x="2.5" y="4" width="15" height="10" rx="1.5" />
      <path d="M7 17h6" />
    </>
  ),
  prog: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </>
  ),
  auto: <path d="M3 7h11l-3-3M17 13H6l3 3" />,
  ia: <path d="M4 4h12v9H8l-4 3z" />,
}

const SERVICIOS: { nombre: string; icono: keyof typeof ICONOS }[] = [
  { nombre: 'Sitios web', icono: 'web' },
  { nombre: 'Programas', icono: 'prog' },
  { nombre: 'Automatizar', icono: 'auto' },
  { nombre: 'Asistentes IA', icono: 'ia' },
]

const PRODUCTOS: { nombre: string; letra: string }[] = [
  { nombre: 'Unifícalo', letra: 'U' },
  { nombre: 'Citaly', letra: 'C' },
  { nombre: 'Leads', letra: 'L' },
]

/* Cadencia del encendido (segundos). Las trazas se dibujan primero, las
   fichas aparecen una a una, el nodo prende a los 0.9 y la corriente
   arranca a los 1.3. Los valores viven aca y no en el CSS porque cada pieza
   lleva su propio retraso: el CSS solo sabe la duracion. */
const RETRASO_TRAZA = 0.07
const RETRASO_FICHA = 0.4
const PASO_FICHA = 0.15
/* La corriente en bucle: un paquete por cable, por turnos. Los begin son
   negativos para que TODOS los paquetes ya esten en su camino cuando la
   corriente se hace visible; un animateMotion que todavia no empezo deja al
   elemento en el origen del SVG, y eso se veria como un punto suelto en la
   esquina. */
const CICLO = 2.4

function arco(cx: number, cy: number, radio: number, desde: number, hasta: number) {
  const a = (desde * Math.PI) / 180
  const b = (hasta * Math.PI) / 180
  const x1 = (cx + radio * Math.cos(a)).toFixed(1)
  const y1 = (cy + radio * Math.sin(a)).toFixed(1)
  const x2 = (cx + radio * Math.cos(b)).toFixed(1)
  const y2 = (cy + radio * Math.sin(b)).toFixed(1)
  return `M${x1} ${y1}A${radio} ${radio} 0 0 1 ${x2} ${y2}`
}

export function CircuitoHero({ variante }: { variante: Variante }) {
  const raiz = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nodo = raiz.current
    const svg = nodo?.querySelector('svg')
    if (!nodo || !svg) return
    const hero = nodo.closest('.home-hero')
    const html = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const corte = window.matchMedia('(max-width: 900px)')
    let enPantalla = true

    const evaluar = () => {
      /* La variante que el CSS esconde no tiene cajas; sus SMIL correrian
         igual sobre la linea de tiempo del documento. */
      const pintado = svg.getClientRects().length > 0
      const correr = pintado && enPantalla && !document.hidden && !reduce.matches
      if (correr) {
        svg.unpauseAnimations()
        nodo.classList.remove('esta-quieto')
        return
      }
      /* Con menos movimiento el circuito queda encendido y quieto: el anillo
         detenido en un instante fijo y los paquetes los esconde el CSS. */
      if (reduce.matches) svg.setCurrentTime(1.2)
      svg.pauseAnimations()
      nodo.classList.add('esta-quieto')
    }

    /* Los 88 px de arriba son la cabecera pegajosa: cuando el heroe solo
       asoma por debajo de ella, para la cabecera ya se fue. */
    const observador = new IntersectionObserver(
      ([entrada]) => {
        enPantalla = entrada.isIntersecting
        html.classList.toggle('hero-fuera', !enPantalla)
        evaluar()
      },
      { rootMargin: '-88px 0px 0px 0px' },
    )
    if (hero) observador.observe(hero)
    document.addEventListener('visibilitychange', evaluar)
    corte.addEventListener('change', evaluar)
    reduce.addEventListener('change', evaluar)
    evaluar()

    return () => {
      observador.disconnect()
      document.removeEventListener('visibilitychange', evaluar)
      corte.removeEventListener('change', evaluar)
      reduce.removeEventListener('change', evaluar)
      html.classList.remove('hero-fuera')
    }
  }, [])

  const g = GEO[variante]
  const p = `neon-${variante}-`
  const mitad = ALTO_FICHA / 2
  // El anillo orbita fuera del disco, no pegado a el: a r + 9 el halo de
  // trazo 11 rozaba el borde y parecia pasar por encima del logo.
  const radioAnillo = g.r + 15
  const anchoLogo = Math.round(g.r * 1.2)
  const altoLogo = Math.round((anchoLogo * 128) / 199)
  const trazas = [
    ...g.izq.map((y, i) => ({ id: `${p}a${i}`, d: `M${g.cw} ${y}H${g.bi}V${g.cy}H${g.cx - g.r}`, lado: 'izq' as const, i })),
    ...g.der.map((y, j) => ({ id: `${p}b${j}`, d: `M${g.cx + g.r} ${g.cy}H${g.bd}V${y}H${g.xd}`, lado: 'der' as const, i: g.izq.length + j })),
  ]
  const corrienteIzq = trazas.filter((t) => t.lado === 'izq').map((t) => t.d).join('')
  const corrienteDer = trazas.filter((t) => t.lado === 'der').map((t) => t.d).join('')

  return (
    <div ref={raiz} className={`circuito circuito--${variante}`}>
      <span className="circuito__tag" aria-hidden="true">
        el circuito
      </span>
      <svg
        className="circuito__svg"
        viewBox={`0 0 ${g.w} ${g.h}`}
        width={g.w}
        height={g.h}
        role="img"
        aria-labelledby={`${p}titulo`}
      >
        <title id={`${p}titulo`}>
          El circuito de IAenBlanco: sitios web, programas, automatizaciones y asistentes con IA a tu medida entran al
          nodo, y de ahí salen nuestros programas Unifícalo, Citaly y Leads. Se conecta con WhatsApp, Shopify, Bsale y
          planillas.
        </title>
        <defs>
          <radialGradient id={`${p}g-nodo`}>
            <stop offset="0" stopColor="#40b0d0" stopOpacity="0.45" />
            <stop offset="1" stopColor="#40b0d0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${p}g-paq-izq`}>
            <stop offset="0" stopColor="#40b0d0" stopOpacity="0.7" />
            <stop offset="1" stopColor="#40b0d0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${p}g-paq-der`}>
            <stop offset="0" stopColor="#7c5cff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${p}g-anillo`}
            gradientUnits="userSpaceOnUse"
            x1={g.cx}
            y1={g.cy - radioAnillo}
            x2={g.cx + radioAnillo}
            y2={g.cy + radioAnillo * 0.5}
          >
            <stop offset="0" stopColor="#40b0d0" />
            <stop offset="1" stopColor="#7c5cff" />
          </linearGradient>
        </defs>

        <g aria-hidden="true">
          {/* Rotulos de columna y pie */}
          <text className="circuito__rotulo" x="0" y={mitad - 3}>
            <tspan x="0">Te hacemos</tspan>
            <tspan x="0" dy="14" className="circuito__rotulo--c1">
              a tu medida
            </tspan>
          </text>
          <text className="circuito__rotulo" x={g.xd} y={mitad - 3}>
            <tspan x={g.xd}>Muy pronto</tspan>
            <tspan x={g.xd} dy="14" className="circuito__rotulo--c2">
              los nuestros
            </tspan>
          </text>
          <text className="circuito__rotulo" x="0" y={g.pie + 10}>
            Se conecta con lo que ya usas
          </text>
          <text className="circuito__pie" x="0" y={g.pie + 30}>
            WhatsApp · Shopify · Bsale · Planillas
          </text>

          {/* Trazas: se dibujan una a una al cargar (pathLength=1) */}
          {trazas.map((t) => (
            <path
              key={t.id}
              id={t.id}
              className="traza"
              d={t.d}
              pathLength={1}
              style={{ animationDelay: `${(t.i * RETRASO_TRAZA).toFixed(2)}s` }}
            />
          ))}

          {/* Corriente: un camino por lado, con guiones que avanzan. Debajo
              de cada uno va un gemelo ancho y tenue que hace de brillo (nada
              de filtros). El grupo aparece a los 1.3 s, desde el CSS. */}
          <g className="corrientes">
            <path className="corriente corriente--izq corriente--brillo" d={corrienteIzq} />
            <path className="corriente corriente--der corriente--brillo" d={corrienteDer} />
            <path className="corriente corriente--izq" d={corrienteIzq} />
            <path className="corriente corriente--der" d={corrienteDer} />
          </g>

          {/* Nodo */}
          <g className="nodo">
            <circle className="nodo__halo" cx={g.cx} cy={g.cy} r={g.r * 1.9} fill={`url(#${p}g-nodo)`} />
            <g className="anillo">
              <path className="anillo__luz" d={arco(g.cx, g.cy, radioAnillo, -90, 30)} stroke={`url(#${p}g-anillo)`} />
              <path className="anillo__arco" d={arco(g.cx, g.cy, radioAnillo, -90, 30)} stroke={`url(#${p}g-anillo)`} />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${g.cx} ${g.cy}`}
                to={`360 ${g.cx} ${g.cy}`}
                dur="2.6s"
                repeatCount="indefinite"
              />
            </g>
            <circle className="nodo__aire" cx={g.cx} cy={g.cy} r={g.r + 5} />
            <circle className="nodo__disco" cx={g.cx} cy={g.cy} r={g.r} />
            <image
              href="/logo-simbolo.webp"
              x={g.cx - anchoLogo / 2}
              y={g.cy - altoLogo / 2}
              width={anchoLogo}
              height={altoLogo}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>

          {/* Fichas: servicios a la izquierda, programas a la derecha */}
          {SERVICIOS.map((s, i) => {
            const y = g.izq[i]
            const prende = `${(i * 0.6).toFixed(1)}s`
            return (
              <g
                key={s.nombre}
                className="ficha ficha--servicio"
                style={{ animationDelay: `${(RETRASO_FICHA + i * PASO_FICHA).toFixed(2)}s` }}
              >
                <rect className="ficha__halo" x="0" y={y - mitad} width={g.cw} height={ALTO_FICHA} rx={RADIO_FICHA} style={{ animationDelay: prende }} />
                <rect className="ficha__caja" x="0" y={y - mitad} width={g.cw} height={ALTO_FICHA} rx={RADIO_FICHA} />
                <rect className="ficha__borde" x="0" y={y - mitad} width={g.cw} height={ALTO_FICHA} rx={RADIO_FICHA} style={{ animationDelay: prende }} />
                <g className="ficha__icono" transform={`translate(10 ${y - 7}) scale(0.7)`}>
                  {ICONOS[s.icono]}
                </g>
                <text className="ficha__texto" x="32" y={y} fontSize={g.letra}>
                  {s.nombre}
                </text>
              </g>
            )
          })}
          {PRODUCTOS.map((pr, j) => {
            const y = g.der[j]
            const x = g.xd
            const prende = `${(2.3 + j * 0.8).toFixed(1)}s`
            return (
              <g
                key={pr.nombre}
                className="ficha ficha--programa"
                style={{ animationDelay: `${(RETRASO_FICHA + (SERVICIOS.length + j) * PASO_FICHA).toFixed(2)}s` }}
              >
                <rect className="ficha__halo" x={x} y={y - mitad} width={g.cw} height={ALTO_FICHA} rx={RADIO_FICHA} style={{ animationDelay: prende }} />
                <rect className="ficha__caja" x={x} y={y - mitad} width={g.cw} height={ALTO_FICHA} rx={RADIO_FICHA} />
                <rect className="ficha__borde" x={x} y={y - mitad} width={g.cw} height={ALTO_FICHA} rx={RADIO_FICHA} style={{ animationDelay: prende }} />
                <circle className="ficha__sello" cx={x + 20} cy={y} r="10" />
                <text className="ficha__letra" x={x + 20} y={y}>
                  {pr.letra}
                </text>
                <text className="ficha__texto" x={x + 38} y={y} fontSize={g.letra}>
                  {pr.nombre}
                </text>
              </g>
            )
          })}

          {/* Paquetes: uno por cable, por turnos. Van en un grupo para que la
              aparicion a los 1.3 s sea una sola animacion. */}
          <g className="paquetes">
            {trazas.map((t) => {
              const comienzo = t.lado === 'izq' ? t.i * 0.6 : 0.3 + (t.i - g.izq.length) * 0.8
              return (
                <g key={`p-${t.id}`} className="paquete">
                  <circle r="9" fill={`url(#${p}g-paq-${t.lado})`} />
                  <circle r="4" fill="#fff" />
                  <animateMotion dur={`${CICLO}s`} repeatCount="indefinite" begin={`${(comienzo - CICLO).toFixed(1)}s`}>
                    <mpath href={`#${t.id}`} />
                  </animateMotion>
                </g>
              )
            })}
          </g>
        </g>
      </svg>
      {variante === 'tel' && (
        <p className="circuito__tira">
          Te cotizamos <i aria-hidden="true">→</i> lo construimos <i aria-hidden="true">→</i> lo dejamos andando
        </p>
      )}
    </div>
  )
}
