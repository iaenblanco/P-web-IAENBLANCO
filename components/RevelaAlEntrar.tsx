'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/* En el servidor no hay layout que medir, asi que useLayoutEffect avisaria en
   consola. Se usa el de layout solo en el navegador, que es donde importa:
   tiene que esconder las piezas ANTES del primer pintado, o se alcanza a ver
   el mapa completo por un cuadro y despues desaparecer. */
const efectoAntesDePintar = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Deja que un bloque se arme cuando entra en pantalla, en vez de llegar ya
 * dibujado. La regla de oro es que NUNCA puede esconder contenido:
 *
 * - Sin JavaScript, el envoltorio no lleva ninguna clase y todo se ve tal cual.
 * - La clase que esconde las piezas ("revela--armado") se agrega recien en el
 *   efecto, o sea solo cuando el JavaScript ya corrio y va a poder mostrarlas.
 * - Si el navegador no trae IntersectionObserver, se muestra de inmediato.
 * - Y hay una red de seguridad: pase lo que pase, a los dos segundos se
 *   muestra igual.
 *
 * El envoltorio es display:contents, asi que no agrega ninguna caja a la
 * maquetacion; solo existe para colgar las clases.
 */
export function RevelaAlEntrar({ children, className = '' }: { children: ReactNode; className?: string }) {
  const caja = useRef<HTMLDivElement>(null)
  const [armado, setArmado] = useState(false)
  const [visible, setVisible] = useState(false)

  efectoAntesDePintar(() => {
    const el = caja.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    setArmado(true)

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          setVisible(true)
          observador.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )
    observador.observe(el)

    const red = window.setTimeout(() => setVisible(true), 1200)

    return () => {
      observador.disconnect()
      window.clearTimeout(red)
    }
  }, [])

  const clases = ['revela', className, armado ? 'revela--armado' : '', visible ? 'es-visible' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={caja} className={clases}>
      {children}
    </div>
  )
}
