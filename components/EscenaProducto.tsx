/*
 * Las tres escenas de la pagina de productos, segunda version.
 *
 * Guiadas por el sitio real de cada producto (visitados el 21-ago-2026):
 * - unificalo.cl abre con un "Canal maestro" del que bajan pistas de
 *   circuito hacia los canales de venta. La escena reproduce eso: la
 *   venta cae por las pistas y los cuatro stocks se cuadran.
 * - citaly.cl muestra un audio de WhatsApp con su forma de onda y, al
 *   lado, la agenda donde la hora queda tomada. La escena hace ese
 *   recorrido: audio -> lo escucha -> responde -> la agenda se llena.
 * - leads.iaenblanco.com abre con un mapa de puntos encendidos sobre
 *   Chile. La escena parte de ese mapa: los puntos que calzan se
 *   encienden y forman la lista, ordenada por cual llamar primero.
 *
 * Mismas reglas de siempre: solo CSS, solo opacidad/transform/scale,
 * ciclo de 11 s, detenida hasta entrar en pantalla, y lo que dice la
 * escena esta escrito ademas en el pie para quien no la ve.
 */

const CANALES = [
  { nombre: 'Tu local', detalle: 'Bsale' },
  { nombre: 'Tienda online', detalle: 'Shopify' },
  { nombre: 'Mercado Libre', detalle: 'Publicación' },
  { nombre: 'Uber Eats', detalle: 'Carta del día' },
]

function EscenaUnificalo() {
  return (
    <div className="esc esc--u2" aria-hidden="true">
      <div className="u2__maestro">
        <span className="u2__maestro-etiqueta">Tu operación</span>
        <span className="u2__maestro-nombre">Canal maestro</span>
        <span className="u2__venta">
          <i className="u2__venta-punto" />
          Se vendió 1 · Polera negra M
        </span>
      </div>

      <div className="u2__canales">
        {CANALES.map((canal, i) => (
          <span className="u2__columna" style={{ ['--i' as string]: i }} key={canal.nombre}>
            {/* La pista de circuito por la que baja la venta. */}
            <span className="u2__traza"><i /></span>
            <span className="u2__canal">
              <span className="u2__canal-nombre">{canal.nombre}</span>
              <span className="u2__canal-detalle">{canal.detalle}</span>
              <span className="u2__cifra">
                <span className="u2__cifra-antes">4</span>
                <span className="u2__cifra-despues">3</span>
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* La forma de onda del audio, como en citaly.cl. Alturas fijas para que
   el dibujo sea siempre el mismo; el pulso lo pone scaleY. */
const ONDA = [5, 9, 14, 8, 12, 16, 7, 11, 15, 9, 13, 6, 10, 5]

function EscenaCitaly() {
  return (
    <div className="esc esc--c2" aria-hidden="true">
      <div className="c2__chat">
        <span className="c2__hora">21:41</span>

        <span className="c2__audio">
          <i className="c2__audio-play" />
          <span className="c2__onda">
            {ONDA.map((h, i) => (
              <i key={i} style={{ ['--h' as string]: `${h}px`, ['--i' as string]: i }} />
            ))}
          </span>
          <span className="c2__audio-dur">0:06</span>
        </span>

        <span className="c2__estado">escuchando el audio…</span>

        <span className="c2__respuesta">Sí: mañana tengo 11:30, 15:00 o 17:00</span>
      </div>

      <div className="c2__agenda">
        <span className="c2__agenda-titulo">Agenda · mañana</span>
        {[
          { hora: '11:30', toma: true },
          { hora: '15:00', toma: false },
          { hora: '17:00', toma: false },
        ].map((slot) => (
          <span className="c2__slot" key={slot.hora}>
            <span className="c2__slot-hora">{slot.hora}</span>
            {slot.toma ? (
              <span className="c2__slot-caja c2__slot-caja--toma">
                <span className="c2__slot-libre">libre</span>
                <span className="c2__slot-tomada"><i />Tomada</span>
              </span>
            ) : (
              <span className="c2__slot-caja">
                <span className="c2__slot-libre">libre</span>
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Los puntos del mapa: posiciones fijas, dibujadas a mano para que se
   repartan sin parecer una grilla. Cuatro se encienden: son las que
   calzan con la busqueda, y cada una forma su fila en la lista. */
const PUNTOS = [
  { x: 12, y: 18 }, { x: 30, y: 8 }, { x: 52, y: 20 }, { x: 74, y: 10 },
  { x: 88, y: 30 }, { x: 22, y: 42 }, { x: 44, y: 52 }, { x: 64, y: 38 },
  { x: 8, y: 68 }, { x: 34, y: 78 }, { x: 58, y: 72 }, { x: 82, y: 62 },
  { x: 70, y: 88 }, { x: 18, y: 90 },
]
const ENCENDIDOS = [2, 5, 10, 12]

function EscenaLeads() {
  return (
    <div className="esc esc--l2" aria-hidden="true">
      <div className="l2__mapa">
        <span className="l2__busqueda">Rubro · comuna</span>
        <span className="l2__campo">
          {PUNTOS.map((p, i) => {
            const orden = ENCENDIDOS.indexOf(i)
            return (
              <i
                key={i}
                className={orden >= 0 ? 'l2__punto l2__punto--calza' : 'l2__punto'}
                style={{
                  ['--x' as string]: `${p.x}%`,
                  ['--y' as string]: `${p.y}%`,
                  ['--o' as string]: orden >= 0 ? orden : 0,
                }}
              />
            )
          })}
        </span>
      </div>

      <div className="l2__lista">
        {['Con teléfono', 'Con teléfono', 'Con email', 'Con teléfono'].map((evidencia, i) => (
          <span
            className="l2__fila"
            style={{ ['--o' as string]: i, ['--ancho' as string]: `${94 - i * 9}%` }}
            key={i}
          >
            <span className="l2__orden">{i + 1}</span>
            <span className="l2__barra"><i /></span>
            <span className="l2__evidencia">{evidencia}</span>
          </span>
        ))}
        <span className="l2__cierre">Ordenadas por cuál llamar primero</span>
      </div>
    </div>
  )
}

export function EscenaProducto({ id }: { id: string }) {
  if (id === 'unificalo') return <EscenaUnificalo />
  if (id === 'citaly') return <EscenaCitaly />
  return <EscenaLeads />
}
