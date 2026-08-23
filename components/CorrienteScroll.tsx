'use client'

import { useEffect } from 'react'

/*
 * La corriente sigue tu dedo.
 *
 * Hasta ahora el mapa era un bucle de 12 s que latia igual hicieras lo que
 * hicieras: la persona no tenia ninguna forma de tocarlo. Esto publica una
 * sola variable en la raiz del documento, --avance, con cuantas vueltas de
 * circuito llevas "empujadas" con el scroll. Las animaciones del mapa la
 * restan de su animation-delay, asi que bajar adelanta la corriente y
 * detenerse la detiene, sin dejar de correr sola si nadie toca nada.
 *
 * Es una sola propiedad, en un solo elemento, una vez por cuadro: el
 * navegador recalcula el arranque de las animaciones que la usan y nada mas.
 * No lee layout (scrollY no fuerza reflow), asi que no cuesta cuadros.
 */

/* Cuantos pixeles de scroll equivalen a una vuelta entera del circuito.
   Mas chico = la corriente responde mas fuerte; mas grande = mas sutil. */
const PIXELES_POR_VUELTA = 850

export function CorrienteScroll() {
  useEffect(() => {
    const raiz = document.documentElement

    /* Quien pidio menos movimiento no recibe ninguno: la variable no se
       publica y las animaciones se quedan con su fase de siempre. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let pedido = 0
    let ultimo = -1

    const publicar = () => {
      pedido = 0
      const avance = window.scrollY / PIXELES_POR_VUELTA
      /* Un umbral chico evita reescribir la variable cuando el scroll
         apenas se movio: menos recalculos de estilo por cuadro. */
      if (Math.abs(avance - ultimo) < 0.002) return
      ultimo = avance
      raiz.style.setProperty('--avance', avance.toFixed(3))
    }

    const alRodar = () => {
      if (pedido) return
      pedido = window.requestAnimationFrame(publicar)
    }

    publicar()
    window.addEventListener('scroll', alRodar, { passive: true })

    return () => {
      window.removeEventListener('scroll', alRodar)
      if (pedido) window.cancelAnimationFrame(pedido)
      raiz.style.removeProperty('--avance')
    }
  }, [])

  return null
}
