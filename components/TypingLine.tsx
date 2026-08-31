import { programasEnCamino } from '@/lib/site'
import { trabajos } from '@/lib/trabajos'

/*
 * La linea del heroe. Los DOS numeros salen de las listas y no escritos a
 * mano: el de sitios decia 5 despues de que ya eran 7, y el de programas se
 * cuenta sobre products[] filtrando los que siguen en camino.
 *
 * El plural va con guardia porque el dia que queden dos abiertos y uno en
 * camino, "1 programas propios" es justo el tipo de detalle que nadie mira.
 *
 * Sin aria-label: un p no tiene rol propio, asi que no hay garantia de que se
 * exponga, y ademas no nombraba nada. El contenido ya se lee solo -la frase
 * entera esta en el strong y los adornos van con aria-hidden-.
 */
export function TypingLine() {
  return (
    <p className="typing-line">
      <span aria-hidden="true">system /{' '}</span>
      <strong>
        {trabajos.length} sitios de clientes en línea · {programasEnCamino}{' '}
        {programasEnCamino === 1 ? 'programa propio' : 'programas propios'} en camino ·
        Santiago, Chile
        {/* El caret va DENTRO del strong, no como hermano. Como hermano era
            un item flex propio y en movil envolvia a una fila para el solo:
            medido a 390px, el texto terminaba en 60,5px y el cuadrado caia en
            62,5, pegado al margen izquierdo y a 16px por debajo de la frase.
            Dentro del strong fluye detras de "Chile", que es donde un cursor
            tiene sentido, y en escritorio queda exactamente donde ya estaba. */}
        <i aria-hidden="true" />
      </strong>
    </p>
  )
}
