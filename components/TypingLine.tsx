import { trabajos } from '@/lib/trabajos'

/*
 * La linea del heroe. El numero de sitios sale de la lista de trabajos y no
 * escrito a mano: decia 5 despues de que ya eran 7.
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
        {trabajos.length} sitios de clientes en línea · 3 programas propios en camino ·
        Santiago, Chile
      </strong>
      <i aria-hidden="true" />
    </p>
  )
}
