/*
 * La pieza central de las cuatro paginas de servicio que no tienen
 * portafolio que mostrar.
 *
 * La de sitios web abre con "Trabajos reales", que es lo que mas convence:
 * cinco negocios chilenos con su captura y su enlace. Las otras cuatro no
 * tienen todavia un trabajo de cliente que ensenar, y en vez de dejar el
 * hueco -o peor, de inventar un caso- muestran un momento del servicio
 * andando: la planilla que se vuelve pantalla, el pedido que se registra
 * solo, la bandeja que se vacia, el mapa de empresas que se enciende.
 *
 * Mismo criterio que las escenas de productos: solo CSS, solo opacidad y
 * transform, ciclo de 11 s, detenida hasta que entra en pantalla. Y lo que
 * dice la escena esta escrito ademas en el pie, para quien no la ve.
 */

type Slug = string

const TITULOS: Record<string, { eyebrow: string; titulo: string; pie: string }> = {
  'plataformas-software-medida': {
    eyebrow: 'Cómo se ve andando',
    titulo: 'La planilla que todos tocan, convertida en una pantalla.',
    pie: 'La misma información, pero con campos, reglas y un botón. Deja de depender de que nadie borre una celda.',
  },
  automatizaciones: {
    eyebrow: 'Cómo se ve andando',
    titulo: 'Entra un pedido y queda registrado, sin que nadie lo copie.',
    pie: 'Lo que antes eran tres pasos a mano ahora pasa solo. Y si algo no calza, te avisa en vez de seguir.',
  },
  'soluciones-ia-medida': {
    eyebrow: 'Cómo se ve andando',
    titulo: 'Los mensajes que llegan mientras tú estás atendiendo.',
    pie: 'Contesta lo que sabe contestar y te pasa lo que necesita a una persona. Tú abres el teléfono sin la pila acumulada.',
  },
  'prospeccion-b2b-gestionada': {
    eyebrow: 'Cómo se ve andando',
    titulo: 'La lista, ya revisada y con el siguiente paso anotado.',
    pie: 'No te llega un archivo con mil nombres. Te llega en qué va cada empresa y a cuál corresponde volver.',
  },
}

/* 01 · Programa a medida — una planilla que se ordena en pantalla. */
function EscenaPlanilla() {
  return (
    <div className="esc esc--servicio esc--planilla" aria-hidden="true">
      <div className="esc__celdas">
        {Array.from({ length: 18 }, (_, i) => (
          <span className="esc__celda" style={{ ['--i' as string]: i }} key={i} />
        ))}
      </div>

      <div className="esc__pantalla">
        <span className="esc__pantalla-barra" />
        {['Cliente', 'Servicio', 'Fecha'].map((campo, i) => (
          <span className="esc__campo" style={{ ['--i' as string]: i }} key={campo}>
            <span className="esc__campo-nombre">{campo}</span>
            <span className="esc__campo-caja" />
          </span>
        ))}
        <span className="esc__boton">Guardar</span>
      </div>
    </div>
  )
}

/* 02 · Automatizaciones — un pedido que recorre las tres estaciones. */
function EscenaTuberia() {
  return (
    <div className="esc esc--servicio esc--tuberia" aria-hidden="true">
      <div className="esc__estaciones">
        {[
          { t: 'Entra', d: 'Un pedido' },
          { t: 'Se revisa', d: 'Que cuadre' },
          { t: 'Queda', d: 'Registrado' },
        ].map((e, i) => (
          <span className="esc__estacion" style={{ ['--i' as string]: i }} key={e.t}>
            <span className="esc__estacion-nombre">{e.t}</span>
            <span className="esc__estacion-detalle">{e.d}</span>
          </span>
        ))}
      </div>
      <span className="esc__cable" />
      <span className="esc__carga"><i /></span>
      <span className="esc__listo">Listo, sin que nadie lo copie</span>
    </div>
  )
}

/* 03 · Asistente con IA — la bandeja que se vacia sola. */
function EscenaBandeja() {
  return (
    <div className="esc esc--servicio esc--bandeja" aria-hidden="true">
      <span className="esc__contador">
        <span className="esc__contador-antes">4 sin responder</span>
        <span className="esc__contador-despues">0 sin responder</span>
      </span>

      <div className="esc__mensajes">
        {['¿A qué hora abren?', '¿Tienen despacho a Ñuñoa?', '¿Cuánto sale el plan?', '¿Puedo pagar en cuotas?'].map((m, i) => (
          <span className="esc__mensaje" style={{ ['--i' as string]: i }} key={m}>
            <span className="esc__mensaje-texto">{m}</span>
            <span className="esc__mensaje-tic" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* 04 · Prospeccion — el campo de empresas y a cuales llamar.
 *
 * Antes eran cuatro barras grises al 14% de tinta que se encendian por
 * turno. Quietas se leen como el esqueleto de carga de una tabla, que es
 * exactamente lo que NO queremos decir en la pagina que vende busqueda de
 * empresas.
 *
 * Reusa entero el mapa de .esc--l2, la ficha de Leads en /productos/:
 * .l2__busqueda, .l2__campo, .l2__punto y el keyframe l2-punto, con el
 * mismo patron de --x/--y/--o. El parecido es a proposito: este servicio
 * ES Leads operado por nosotros, asi que tiene que dibujarse igual. Lo
 * unico propio de aca es el numero de llamada, que es lo que se compra
 * cuando lo gestionamos nosotros en vez de que el cliente lo opere.
 */

/* Catorce empresas repartidas a mano y no en grilla: en grilla se lee como
 * un tablero y aca la idea es un mapa. Ninguna pasa de 88% en x ni de 82%
 * en y porque el punto se posiciona por su esquina y mide 6 px, y las que
 * se encienden ademas llevan su numero 11 px a la derecha, asi que esas
 * cuatro se quedan bajo el 76%.
 */
const PROSPECCION_PUNTOS = [
  { x: 12, y: 16 }, { x: 31, y: 8 }, { x: 52, y: 20 }, { x: 71, y: 11 },
  { x: 88, y: 26 }, { x: 7, y: 42 }, { x: 27, y: 36 }, { x: 45, y: 48 },
  { x: 64, y: 38 }, { x: 85, y: 51 }, { x: 16, y: 64 }, { x: 37, y: 74 },
  { x: 57, y: 62 }, { x: 78, y: 78 },
]

/* En orden de llamada, no de posicion: el indice es la empresa y el lugar
 * en esta lista es el turno. Ese turno es el que reparte --o entre el punto
 * y su numero, asi que los dos encienden juntos. */
const PROSPECCION_LLAMAR = [6, 3, 12, 10]

function EscenaProspeccion() {
  return (
    <div className="esc esc--servicio esc--prospeccion" aria-hidden="true">
      <span className="l2__busqueda">Rubro · comuna</span>
      <span className="l2__campo">
        {PROSPECCION_PUNTOS.map((p, i) => (
          <i
            key={i}
            className={PROSPECCION_LLAMAR.includes(i) ? 'l2__punto l2__punto--calza' : 'l2__punto'}
            style={{
              ['--x' as string]: `${p.x}%`,
              ['--y' as string]: `${p.y}%`,
              ['--o' as string]: Math.max(PROSPECCION_LLAMAR.indexOf(i), 0),
            }}
          />
        ))}
        {PROSPECCION_LLAMAR.map((indice, orden) => (
          <b
            key={orden}
            className="esc__orden"
            style={{
              ['--x' as string]: `${PROSPECCION_PUNTOS[indice].x}%`,
              ['--y' as string]: `${PROSPECCION_PUNTOS[indice].y}%`,
              ['--o' as string]: orden,
            }}
          >
            {orden + 1}
          </b>
        ))}
      </span>
      <span className="esc__nota">Y a cuál llamar primero</span>
    </div>
  )
}

/* Cada slug nombra la suya y no hay caida por omision: un slug sin escena
   devuelve null y la apertura queda con la columna vacia, que se ve. Con un
   return suelto al final, el slug nuevo se llevaba la escena de prospeccion
   -otra historia, otro pie- y no habia error que lo delatara. */
function EscenaPorSlug({ slug }: { slug: Slug }) {
  if (slug === 'plataformas-software-medida') return <EscenaPlanilla />
  if (slug === 'automatizaciones') return <EscenaTuberia />
  if (slug === 'soluciones-ia-medida') return <EscenaBandeja />
  if (slug === 'prospeccion-b2b-gestionada') return <EscenaProspeccion />
  return null
}

export function EscenaServicio({ slug }: { slug: Slug }) {
  return <EscenaPorSlug slug={slug} />
}

export function textoEscena(slug: Slug) {
  return TITULOS[slug]
}
