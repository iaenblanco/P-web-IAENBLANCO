'use client'

import { useEffect } from 'react'

/**
 * El movimiento de todo el sitio. Nacio para las cuatro paginas de servicio y
 * desde el 1-sep-2026 es tambien el de la portada, contacto, trabajos,
 * productos y el indice de servicios: antes esas cinco usaban un segundo
 * vocabulario que emitia "reveal is-visible" junto desde el servidor y por eso
 * no revelaba nada. Un solo guion, un solo observador por pagina.
 *
 * Hace dos cosas y las dos con UN SOLO observador para toda la pagina, no uno
 * por tarjeta: son unas treinta piezas y treinta observadores se notan en la
 * memoria del telefono.
 *
 *   [data-revela]  la pieza entra cuando le toca. Se revela una vez y el
 *                  observador la suelta ahi mismo (unobserve), asi que al
 *                  llegar abajo no queda nada que observar.
 *   [data-bucle]   la pieza tiene una animacion infinita y hay que apagarla
 *                  mientras no se ve. Esa si se sigue observando: va y viene.
 *
 * Tres reglas de la casa que este componente respeta:
 *
 * 1. Sin JavaScript no hay una sola pieza escondida. La clase que esconde
 *    ("revela-armado") la pone este efecto, o sea solo cuando ya hay quien
 *    la vaya a sacar. La hoja de estilos por si sola no oculta nada.
 * 2. Lo que ya se ve al cargar no se arma nunca. Si se armara, el encabezado
 *    y el diagrama del hero parpadearian -se pintan, desaparecen y vuelven- y
 *    ademas retrasarian el primer pintado, que es justo lo que no queremos.
 * 3. Quien pidio menos movimiento no paga ni el observador: se sale antes de
 *    crearlo. La hoja tiene la misma regla por si el ajuste cambia despues.
 */
export function RevelaEnCascada() {
  useEffect(() => {
    // Cualquier <main>: hay exactamente uno por pagina y asi el componente no
    // necesita saber en cual esta montado. Antes pedia 'main.service-page' y
    // por eso montarlo en la portada -que es <main id="contenido">- no habria
    // hecho nada: salia por la puerta en la primera linea.
    const raiz = document.querySelector<HTMLElement>('main')
    if (!raiz) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    // Primero TODAS las lecturas y despues TODAS las escrituras. Al reves,
    // cada getBoundingClientRect despues de un classList.add obliga al
    // navegador a recalcular la maquetacion: treinta veces en vez de una.
    const candidatas = Array.from(raiz.querySelectorAll<HTMLElement>('[data-revela]'))
    const alto = window.innerHeight
    // Un visor sin alto (una pestana que nunca se pinto, un contenedor de 0 px)
    // haria que 'top >= alto * 0.85' fuera cierto para todo, incluido el hero:
    // la pagina entera arrancaria en opacity 0. Ahi no se arma nada y queda
    // como HTML plano, que es la regla de la casa.
    if (alto <= 0) return
    const piezas = candidatas.filter((el) => el.getBoundingClientRect().top >= alto * 0.85)
    for (const el of piezas) el.classList.add('revela-armado')

    const bucles = Array.from(raiz.querySelectorAll<HTMLElement>('[data-bucle]'))

    let respondio = false
    const observador = new IntersectionObserver(
      (entradas) => {
        respondio = true
        for (const entrada of entradas) {
          const el = entrada.target as HTMLElement
          if (el.dataset.bucle !== undefined) {
            el.classList.toggle('fuera-de-vista', !entrada.isIntersecting)
            continue
          }
          if (!entrada.isIntersecting) continue
          el.classList.add('es-visible')
          observador.unobserve(el)
        }
      },
      // Sin umbral y con el borde de abajo recogido un poco: la pieza entra
      // cuando ya asomo de verdad, no cuando toca el filo de la pantalla.
      { rootMargin: '0px 0px -12% 0px' },
    )

    for (const el of piezas) observador.observe(el)
    for (const el of bucles) observador.observe(el)

    // La red de seguridad. Un observador siempre contesta al menos una vez
    // por pieza; si a los dos segundos no contesto ninguna, algo lo rompio y
    // lo unico que no puede pasar es que el contenido quede escondido.
    const red = window.setTimeout(() => {
      if (respondio) return
      for (const el of piezas) el.classList.add('es-visible')
    }, 2000)

    return () => {
      observador.disconnect()
      window.clearTimeout(red)
    }
  }, [])

  return null
}
