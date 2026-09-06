/*
 * Las tres escenas de la pagina de productos, tercera version (sep-2026).
 *
 * Una sola idea por escena y una sola gramatica para las tres:
 *   arriba, un chip mono con la situacion de hoy;
 *   en el centro, el producto haciendo su unica cosa;
 *   abajo, un sello oscuro con lo que queda hecho.
 *
 * Cada escena es UN svg de 360x280 (aspect-ratio fijo: no hay layout
 * shift y el dibujo escala entero, en el celular y en escritorio).
 * Toda la geometria vive aqui en atributos x/y; ningun elemento usa el
 * atributo transform porque el bloque generico de reduced-motion pone
 * `transform: none` a todo lo que cuelga de .esc. Las animaciones (solo
 * opacity y transform) viven en globals.css, seccion "LAS TRES ESCENAS
 * DE PRODUCTOS, TERCERA VERSION". Convencion de clases:
 *   - base = estado final; los keyframes solo cuentan el camino.
 *   - "antes": visible al principio, desaparece (base opacity 0).
 *   - "pasa": transitorio, aparece y se va (base opacity 0).
 *   - "llega": aparece y se queda (base opacity 1).
 * Sin movimiento, "antes" y "pasa" se esconden con display:none y queda
 * el estado resuelto como imagen fija.
 *
 * Mensajes tomados de lib/site.ts:
 *   Unificalo: una venta en cualquier parte y las otras tres se enteran.
 *   Citaly: ofrece horas a las 21:41 y deja la cita tomada y recordada.
 *   Leads: empresas que existen de verdad, ordenadas por cual llamar.
 */

import type { CSSProperties } from 'react'

type Props = {
  /* el id del producto en lib/site.ts; cualquier otro cae en Leads */
  id: string
}

/* Desplazamiento de las piezas que viajan (lo lee el keyframe esc3-viaja). */
function viaje(dx: number, dy: number): CSSProperties {
  return { '--dx': `${dx}px`, '--dy': `${dy}px` } as CSSProperties
}

/* Tic de 12px, sin transform: se dibuja donde lo pide cada escena. */
function Tic({ x, y, className }: { x: number; y: number; className?: string }) {
  return <path className={className} d={`M${x} ${y + 4} l3.5 3.5 l7 -7.5`} />
}

/* Sello inferior comun a las tres escenas: la franja oscura del "despues". */
function Sello({ texto, clase }: { texto: string; clase: string }) {
  return (
    <g className={`esc3__sello ${clase}`}>
      <rect x={0} y={240} width={360} height={32} rx={6} />
      <circle cx={17} cy={256} r={8.5} />
      <Tic x={11.5} y={252} className="esc3__sello-tic" />
      <text x={34} y={260.5}>
        {texto}
      </text>
    </g>
  )
}

/* El ancho sale del texto: mono de 10px con 0.04em de espaciado avanza
   ~6.4px por caracter, mas 10 de relleno por lado. Con un ancho fijo la
   pastilla de Unificalo se recortaba por la derecha. */
function Chip({ texto }: { texto: string }) {
  const ancho = Math.round(texto.length * 6.4 + 20)
  return (
    <g className="esc3__chip">
      <rect x={0} y={6} width={ancho} height={20} rx={4} />
      <text x={10} y={20}>
        {texto}
      </text>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* UNIFICALO: se vende uno en la tienda online y el stock baja en los   */
/* cuatro canales a la vez.                                            */
/* ------------------------------------------------------------------ */

const CANALES = [
  { x: 0, y: 44, nombre: 'Tu local', fuente: 'Bsale' },
  { x: 220, y: 44, nombre: 'Tienda online', fuente: 'Shopify' },
  { x: 0, y: 164, nombre: 'Mercado Libre', fuente: 'Publicación' },
  { x: 220, y: 164, nombre: 'Uber Eats', fuente: 'Carta del día' },
] as const

const HUB = { x: 180, y: 136, r: 36 }

function EscenaUnificalo() {
  const ancho = 140
  const alto = 64
  return (
    <svg className="esc3__svg" viewBox="0 0 360 280" role="img" aria-hidden="true" focusable="false">
      <Chip texto="4 CANALES · 1 STOCK" />

      {/* radios del centro a cada canal (van debajo de las cajas) */}
      <g className="u3__radios">
        <line x1={HUB.x} y1={HUB.y} x2={110} y2={92} />
        <line x1={HUB.x} y1={HUB.y} x2={250} y2={92} />
        <line x1={HUB.x} y1={HUB.y} x2={110} y2={180} />
        <line x1={HUB.x} y1={HUB.y} x2={250} y2={180} />
      </g>

      {/* los cuatro canales, cada uno con su numero de hoy y el de despues */}
      {CANALES.map((c) => (
        <g key={c.nombre} className="u3__canal">
          <rect x={c.x} y={c.y} width={ancho} height={alto} rx={8} />
          <text className="u3__nombre" x={c.x + 12} y={c.y + 24}>
            {c.nombre}
          </text>
          <text className="u3__fuente" x={c.x + 12} y={c.y + 42}>
            {c.fuente}
          </text>
        </g>
      ))}

      {/* la venta: chip sobre la tienda online */}
      <g className="u3__venta">
        <rect x={276} y={34} width={84} height={20} rx={10} />
        <text x={318} y={47.5} textAnchor="middle">
          −1 VENDIDA
        </text>
      </g>

      {/* numeros: el de la tienda cambia primero, los otros tres despues */}
      <text className="u3__cifra u3__cifra-tienda-antes" x={348} y={92} textAnchor="end">
        4
      </text>
      <text className="u3__cifra u3__cifra-tienda" x={348} y={92} textAnchor="end">
        3
      </text>
      <g className="u3__cifra u3__cifras-antes">
        <text x={128} y={92} textAnchor="end">
          4
        </text>
        <text x={128} y={212} textAnchor="end">
          4
        </text>
        <text x={348} y={212} textAnchor="end">
          4
        </text>
      </g>
      <g className="u3__cifra u3__cifras-despues">
        <text x={128} y={92} textAnchor="end">
          3
        </text>
        <text x={128} y={212} textAnchor="end">
          3
        </text>
        <text x={348} y={212} textAnchor="end">
          3
        </text>
      </g>

      {/* tics: los cuatro canales cuadrados */}
      <g className="u3__tics">
        <Tic x={98} y={80} />
        <Tic x={318} y={80} />
        <Tic x={98} y={200} />
        <Tic x={318} y={200} />
      </g>

      {/* el centro: un solo stock */}
      <g className="u3__hub">
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r} />
        <text className="u3__hub-rotulo" x={HUB.x} y={HUB.y - 12} textAnchor="middle">
          STOCK
        </text>
      </g>
      <text className="u3__hub-cifra u3__hub-antes" x={HUB.x} y={HUB.y + 18} textAnchor="middle">
        4
      </text>
      <text className="u3__hub-cifra u3__hub-despues" x={HUB.x} y={HUB.y + 18} textAnchor="middle">
        3
      </text>
      <circle className="u3__anillo" cx={HUB.x} cy={HUB.y} r={HUB.r} />

      {/* la venta viaja al centro y de ahi sale a los otros tres */}
      <circle className="u3__pulso u3__pulso-entra" cx={250} cy={92} r={5} style={viaje(-70, 44)} />
      <circle className="u3__pulso u3__pulso-sale" cx={HUB.x} cy={HUB.y} r={5} style={viaje(-70, -44)} />
      <circle className="u3__pulso u3__pulso-sale" cx={HUB.x} cy={HUB.y} r={5} style={viaje(-70, 44)} />
      <circle className="u3__pulso u3__pulso-sale" cx={HUB.x} cy={HUB.y} r={5} style={viaje(70, 44)} />

      <Sello clase="u3__sello" texto="Stock al día en los cuatro canales" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* CITALY: a las 21:41 alguien pregunta por hora; Citaly responde, deja */
/* la cita tomada en la agenda y programa el recordatorio.             */
/* ------------------------------------------------------------------ */

const HORAS = [
  { y: 84, hora: '10:00', estado: 'Ocupada' },
  { y: 128, hora: '11:30', estado: 'Libre' },
  { y: 172, hora: '15:00', estado: 'Libre' },
] as const

function EscenaCitaly() {
  return (
    <svg className="esc3__svg" viewBox="0 0 360 280" role="img" aria-hidden="true" focusable="false">
      <Chip texto="WHATSAPP · 21:41" />

      {/* el cliente escribe de noche */}
      <g className="c3__cliente">
        <rect x={0} y={44} width={152} height={36} rx={10} />
        <text x={12} y={67}>
          ¿Tienen hora mañana?
        </text>
      </g>

      {/* Citaly escribe... (transitorio) */}
      <g className="c3__escribe">
        <rect x={0} y={96} width={54} height={28} rx={10} />
        <circle cx={15} cy={110} r={3} />
        <circle cx={27} cy={110} r={3} />
        <circle cx={39} cy={110} r={3} />
      </g>

      {/* ...y responde con la hora ya tomada */}
      <g className="c3__respuesta">
        <rect x={0} y={96} width={176} height={50} rx={10} />
        <text className="c3__firma" x={12} y={112}>
          CITALY
        </text>
        <text className="c3__texto" x={12} y={134}>
          Sí, te dejé las 11:30
        </text>
        <Tic x={150} y={125} className="c3__tic" />
      </g>

      {/* la agenda de manana */}
      <g className="c3__agenda">
        <rect x={196} y={44} width={164} height={184} rx={8} />
        <text className="c3__rotulo" x={208} y={63}>
          MAÑANA
        </text>
        <line x1={204} y1={72} x2={352} y2={72} />
        {HORAS.map((h) => (
          <rect key={h.hora} className={h.estado === 'Ocupada' ? 'c3__fila c3__fila--ocupada' : 'c3__fila'} x={204} y={h.y} width={148} height={36} rx={6} />
        ))}
      </g>

      {/* la hora que se toma: la capa de color va debajo de los textos */}
      <rect className="c3__toma" x={204} y={128} width={148} height={36} rx={6} />
      <g className="c3__horas">
        {HORAS.map((h) => (
          <text key={h.hora} x={216} y={h.y + 23}>
            {h.hora}
          </text>
        ))}
      </g>
      <g className="c3__estados">
        <text className="c3__estado c3__estado--ocupada" x={342} y={107} textAnchor="end">
          Ocupada
        </text>
        <text className="c3__estado c3__estado--libre-antes" x={342} y={151} textAnchor="end">
          Libre
        </text>
        <text className="c3__estado c3__estado--tomada" x={342} y={151} textAnchor="end">
          Tomada
        </text>
        <text className="c3__estado" x={342} y={195} textAnchor="end">
          Libre
        </text>
      </g>

      {/* la respuesta viaja hasta la agenda */}
      <circle className="c3__pulso" cx={176} cy={121} r={5} style={viaje(28, 25)} />

      <Sello clase="c3__sello" texto="Cita tomada · recordatorio 1 h antes" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* LEADS: de todas las ferreterias de la comuna, las que existen y      */
/* calzan, ordenadas por cual llamar primero.                          */
/* ------------------------------------------------------------------ */

const PUNTOS: ReadonlyArray<readonly [number, number]> = [
  [22, 66], [86, 58], [138, 74], [30, 118], [96, 104], [146, 150],
  [18, 166], [58, 142], [124, 196], [40, 210], [100, 214], [148, 100],
]

const ELEGIDOS = [
  { x: 48, y: 84, n: '1', nombre: 'Ferretería Centro' },
  { x: 112, y: 132, n: '2', nombre: 'Ferretería Satélite' },
  { x: 72, y: 190, n: '3', nombre: 'Ferretería Rinconada' },
] as const

function EscenaLeads() {
  return (
    <svg className="esc3__svg" viewBox="0 0 360 280" role="img" aria-hidden="true" focusable="false">
      <Chip texto="FERRETERÍAS · MAIPÚ" />

      {/* el mapa de la comuna */}
      <g className="l3__mapa">
        <rect x={0} y={44} width={160} height={184} rx={8} />
        <line x1={0} y1={96} x2={160} y2={96} />
        <line x1={0} y1={160} x2={160} y2={160} />
        <line x1={64} y1={44} x2={64} y2={228} />
        <line x1={116} y1={44} x2={116} y2={228} />
      </g>
      <g className="l3__puntos">
        {PUNTOS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={3} />
        ))}
      </g>

      {/* el barrido que revisa la comuna (transitorio) */}
      <rect className="l3__barrido" x={0} y={44} width={3} height={184} style={viaje(157, 0)} />

      {/* las que calzan se encienden y reciben su numero */}
      <g className="l3__elegidos">
        {ELEGIDOS.map((e) => (
          <circle key={e.n} cx={e.x} cy={e.y} r={6} />
        ))}
      </g>
      <g className="l3__rangos">
        {ELEGIDOS.map((e) => (
          <text key={e.n} x={e.x + 9} y={e.y - 7}>
            {e.n}
          </text>
        ))}
      </g>

      {/* la lista para llamar */}
      <g className="l3__lista">
        <rect x={176} y={44} width={184} height={184} rx={8} />
        <text className="l3__rotulo" x={188} y={63}>
          PARA LLAMAR HOY
        </text>
        <line x1={184} y1={72} x2={352} y2={72} />
      </g>
      {ELEGIDOS.map((e, i) => {
        const y = 82 + i * 46
        return (
          <g key={e.n} className={`l3__fila l3__fila--${e.n}`}>
            <circle cx={198} cy={y + 18} r={9} />
            <text className="l3__num" x={198} y={y + 21.5} textAnchor="middle">
              {e.n}
            </text>
            <text className="l3__nombre" x={214} y={y + 15}>
              {e.nombre}
            </text>
            <text className="l3__datos" x={214} y={y + 31}>
              Tel · web · dirección
            </text>
            <Tic x={336} y={y + 8} className="l3__tic" />
          </g>
        )
      })}

      <Sello clase="l3__sello" texto="3 listas para llamar · datos verificados" />
    </svg>
  )
}

export function EscenaProducto({ id }: Props) {
  if (id === 'unificalo') {
    return (
      <div className="esc esc--u3" aria-hidden="true">
        <EscenaUnificalo />
      </div>
    )
  }
  if (id === 'citaly') {
    return (
      <div className="esc esc--c3" aria-hidden="true">
        <EscenaCitaly />
      </div>
    )
  }
  return (
    <div className="esc esc--l3" aria-hidden="true">
      <EscenaLeads />
    </div>
  )
}
