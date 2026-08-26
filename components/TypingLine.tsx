import { trabajos } from '@/lib/trabajos'

/*
 * La linea del heroe. El numero de sitios sale de la lista de trabajos y no
 * escrito a mano: decia 5 despues de que ya eran 7.
 */
export function TypingLine() {
  return (
    <p className="typing-line" aria-label="Qué ofrece IAenBlanco">
      <span aria-hidden="true">system /{' '}</span>
      <strong>
        {trabajos.length} sitios de clientes en línea · 3 programas propios en camino ·
        Santiago, Chile
      </strong>
      <i aria-hidden="true" />
    </p>
  )
}
