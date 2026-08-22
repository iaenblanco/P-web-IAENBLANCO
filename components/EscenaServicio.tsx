/*
 * La pieza central de las cuatro paginas de servicio que no tienen
 * portafolio que mostrar.
 *
 * La de sitios web abre con "Trabajos reales", que es lo que mas convence:
 * cinco negocios chilenos con su captura y su enlace. Las otras cuatro no
 * tienen todavia un trabajo de cliente que ensenar, y en vez de dejar el
 * hueco -o peor, de inventar un caso- muestran un momento del servicio
 * andando: la planilla que se vuelve pantalla, el pedido que se registra
 * solo, la bandeja que se vacia, la lista que se trabaja.
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

/* 04 · Prospeccion — la lista que se trabaja empresa por empresa. */
function EscenaSeguimiento() {
  const ESTADOS = ['Revisada', 'Contactada', 'Respondió', 'Revisada']
  return (
    <div className="esc esc--servicio esc--seguimiento" aria-hidden="true">
      <div className="esc__fichas">
        {ESTADOS.map((estado, i) => (
          <span className="esc__ficha" style={{ ['--i' as string]: i }} key={i}>
            <span className="esc__ficha-barra" />
            <span className="esc__ficha-estado">{estado}</span>
          </span>
        ))}
      </div>
      <span className="esc__nota">Y a cuál volver la próxima semana</span>
    </div>
  )
}

function EscenaPorSlug({ slug }: { slug: Slug }) {
  if (slug === 'plataformas-software-medida') return <EscenaPlanilla />
  if (slug === 'automatizaciones') return <EscenaTuberia />
  if (slug === 'soluciones-ia-medida') return <EscenaBandeja />
  return <EscenaSeguimiento />
}

export function EscenaServicio({ slug }: { slug: Slug }) {
  return <EscenaPorSlug slug={slug} />
}

export function textoEscena(slug: Slug) {
  return TITULOS[slug]
}
