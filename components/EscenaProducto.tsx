/*
 * Las tres escenas de la pagina de productos.
 *
 * No son diagramas del mecanismo: son una escena corta que se repite y que
 * cuenta, sin leer, que hace el programa. Una venta que se reparte a cuatro
 * canales, una conversacion que termina con la hora tomada, una lista larga
 * que se acorta y se ordena.
 *
 * Todo es CSS: nada de imagenes, nada de video, nada de JavaScript. Solo se
 * animan opacidad y transform, que corren en el compositor y no obligan al
 * navegador a recalcular la maquetacion en cada cuadro. Cada ciclo dura 11
 * segundos y las tres escenas arrancan desfasadas, para que la pagina no
 * lata al mismo tiempo de arriba abajo.
 *
 * Las escenas son decorativas: van con aria-hidden y lo que dicen esta
 * escrito ademas en el pie, que si lee un lector de pantalla.
 */

const CANALES = ['Tu local', 'Tienda online', 'Mercado Libre', 'Uber Eats']

function EscenaUnificalo() {
  return (
    <div className="esc esc--sync" aria-hidden="true">
      <span className="esc__aviso">
        <i className="esc__punto" />
        Se vendió 1 · Polera negra M
      </span>

      <div className="esc__canales">
        {CANALES.map((canal, i) => (
          <span className="esc__canal" style={{ ['--i' as string]: i }} key={canal}>
            <span className="esc__canal-nombre">{canal}</span>
            <span className="esc__cifra">
              <span className="esc__cifra-antes">4</span>
              <span className="esc__cifra-despues">3</span>
            </span>
          </span>
        ))}
      </div>

      <span className="esc__riel" />
    </div>
  )
}

function EscenaCitaly() {
  return (
    <div className="esc esc--chat" aria-hidden="true">
      <span className="esc__hora">21:41</span>

      <span className="esc__burbuja esc__burbuja--cliente">¿Tienen hora mañana?</span>

      <span className="esc__escribiendo">
        <i /><i /><i />
      </span>

      <span className="esc__burbuja esc__burbuja--bot">
        Sí: 11:30, 15:00 o 17:00
      </span>

      <span className="esc__agenda">
        <span className="esc__agenda-tic" />
        Mañana 11:30 · tomada
      </span>
    </div>
  )
}

const QUEDAN = [1, 3, 4, 6]

function EscenaLeads() {
  let orden = 0
  return (
    <div className="esc esc--filtro" aria-hidden="true">
      <span className="esc__lupa">Rubro · comuna</span>

      <div className="esc__lista">
        {Array.from({ length: 7 }, (_, i) => {
          const queda = QUEDAN.includes(i)
          if (queda) orden += 1
          return (
            <span
              className={`esc__linea${queda ? ' esc__linea--queda' : ''}`}
              style={{ ['--i' as string]: i, ['--ancho' as string]: `${58 + ((i * 37) % 34)}%` }}
              key={i}
            >
              <span className="esc__linea-orden">{queda ? orden : ''}</span>
              <span className="esc__linea-barra" />
              <span className="esc__linea-tel">teléfono</span>
            </span>
          )
        })}
      </div>

      <span className="esc__barrido" />
    </div>
  )
}

export function EscenaProducto({ id }: { id: string }) {
  if (id === 'unificalo') return <EscenaUnificalo />
  if (id === 'citaly') return <EscenaCitaly />
  return <EscenaLeads />
}
