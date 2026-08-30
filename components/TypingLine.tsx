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
      </strong>
      <i aria-hidden="true" />
    </p>
  )
}
