/*
 * La pieza central de las tres paginas de servicio que no tienen
 * portafolio que mostrar.
 *
 * La de sitios web abre con "Trabajos reales", que es lo que mas convence:
 * siete negocios chilenos con su captura y su enlace. Las otras tres no
 * tienen todavia un trabajo de cliente que ensenar, y en vez de dejar el
 * hueco -o peor, de inventar un caso- muestran un momento del servicio
 * andando: la planilla que se vuelve pantalla, el pedido que se registra
 * solo, la bandeja que se vacia.
 *
 * Mismo criterio que las escenas de productos: solo CSS, solo opacidad y
 * transform, una pasada de 1,6 s, detenida hasta que entra en pantalla. Y lo que
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
}

/* 01 · Programa a medida — una planilla que se ordena en pantalla.
   La hoja y la pantalla dicen lo mismo con los mismos datos: es la misma
   informacion, mirada de las dos maneras. Vacias -como estaban- las dos
   mitades eran un esqueleto de carga, y detenida la escena no decia nada. */
const HOJA = [
  ['Cliente', 'Plan', 'Fecha'],
  ['Ñuñoa', 'Mensual', '12 sep'],
  ['Maipú', 'Puntual', '12 sep'],
  ['Macul', 'Mensual', '13 sep'],
]

const CAMPOS = [
  { campo: 'Cliente', valor: 'Comercial Ñuñoa' },
  { campo: 'Plan', valor: 'Mensual' },
  { campo: 'Fecha', valor: '12 sep' },
]

function EscenaPlanilla() {
  return (
    <div className="esc esc--servicio esc--planilla" aria-hidden="true">
      <div className="esc__celdas">
        {HOJA.flatMap((fila, f) =>
          fila.map((texto, c) => (
            <span
              className={f === 0 ? 'esc__celda esc__celda--cabecera' : 'esc__celda'}
              style={{ ['--i' as string]: f * 3 + c }}
              key={`${f}-${c}`}
            >
              {texto}
            </span>
          )),
        )}
      </div>

      <div className="esc__pantalla">
        <span className="esc__pantalla-barra" />
        {CAMPOS.map((f, i) => (
          <span className="esc__campo" style={{ ['--i' as string]: i }} key={f.campo}>
            <span className="esc__campo-nombre">{f.campo}</span>
            <span className="esc__campo-caja">{f.valor}</span>
          </span>
        ))}
        <span className="esc__boton">Guardar</span>
      </div>
    </div>
  )
}

/* 02 · Automatizaciones — dos programas y el dato que cruza solo.
 *
 * La version anterior eran tres tarjetas en fila -Entra / Se revisa / Queda-
 * con un punto que las recorria: una lista de pasos escrita, no un dibujo.
 * Y le faltaba entera la mitad que vende. La pagina promete que la
 * informacion viaja sola «avisandote cuando algo se sale de lo normal», y
 * eso -que si algo no calza te avisa en vez de seguir- no estaba dibujado en
 * ninguna parte.
 *
 * Ahora hay dos superficies con nombre y algo que cruza entre ellas: las
 * mismas filas aparecen del otro lado sin que nadie las copie. La tercera no
 * cruza, y en su lugar queda la marca de que no cuadra. Ocho palabras en
 * total, dos de ellas los nombres de los dos programas.
 */
const CRUZAN = ['#1042', '#1043']

function EscenaTuberia() {
  return (
    <div className="esc esc--servicio esc--tuberia" aria-hidden="true">
      <div className="tu__app tu__app--origen">
        <span className="tu__app-nombre">Pedidos</span>
        {[...CRUZAN, '#1044'].map((n) => (
          <span className="tu__fila" key={n}>
            {n}
          </span>
        ))}
      </div>

      {/* El canal y lo que va por el. El absoluto lo coloca la grilla: su
          caja es la columna del medio, asi que el recorrido mide lo que mide
          el hueco entre los dos programas y no hay numeros a mano. */}
      <span className="tu__cable" />
      <span className="tu__carga">
        <i />
      </span>

      <div className="tu__app tu__app--destino">
        <span className="tu__app-nombre">Contabilidad</span>
        {CRUZAN.map((n, i) => (
          <span className="tu__fila tu__fila--llega" style={{ ['--i' as string]: i }} key={n}>
            {n}
          </span>
        ))}
        <span className="tu__falla">
          <span className="tu__falla-fila">#1044</span>
          <i className="tu__falla-marca">!</i>
        </span>
      </div>

      <span className="tu__aviso">Te avisa en vez de seguir</span>
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

/* Aca vivia una cuarta escena, la de prospeccion: un mapa de catorce
   empresas con cuatro encendidas y numeradas por orden de llamada. Se fue
   con el servicio. El dibujo no se pierde: era el mismo mapa de .esc--l2,
   la ficha de Leads en /productos/, que sigue en pie y es donde ahora vive
   buscar clientes. */

/* Cada slug nombra la suya y no hay caida por omision: un slug sin escena
   devuelve null y la apertura queda con la columna vacia, que se ve. Con un
   return suelto al final, el slug nuevo se llevaba la escena de otro
   -otra historia, otro pie- y no habia error que lo delatara. */
function EscenaPorSlug({ slug }: { slug: Slug }) {
  if (slug === 'plataformas-software-medida') return <EscenaPlanilla />
  if (slug === 'automatizaciones') return <EscenaTuberia />
  if (slug === 'soluciones-ia-medida') return <EscenaBandeja />
  return null
}

export function EscenaServicio({ slug }: { slug: Slug }) {
  return <EscenaPorSlug slug={slug} />
}

export function textoEscena(slug: Slug) {
  return TITULOS[slug]
}
