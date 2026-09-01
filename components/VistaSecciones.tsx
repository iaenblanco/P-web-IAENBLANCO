'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Cuenta que una seccion se vio de verdad. Hasta ahora el sitio sabia en que
 * paginas entraba la gente y en que enlaces hacia clic, pero no cuanto del
 * camino recorria: si nadie llega nunca a la rampa, cambiarle el texto a la
 * rampa no sirve de nada, y no habia como saberlo.
 *
 * No arma el objeto de la capa de datos. Avisa por el mismo puente de
 * CustomEvent que ya usan el formulario y el diagnostico, y el despachador de
 * app/layout.tsx lo empuja con el resto de las dimensiones -device_type,
 * traffic_source_raw- que se calculan alla. Duplicar aca esos calculos es como
 * se parte un embudo en dos: el mismo evento llega con dos formas distintas
 * segun quien lo mando.
 *
 * Marca las secciones quien las escribe, con data-section-view. El nombre
 * declarado manda por sobre el que deduciria el despachador solo: el bloque de
 * objeciones, por ejemplo, vive dentro de la seccion #empezar, asi que sin
 * nombre propio se contaria como "empezar" y se perderia justo la pregunta que
 * se quiere responder.
 */

/** La mitad, tanto de la seccion como de la pantalla. Ver el comentario de abajo. */
const MITAD = 0.5

export function VistaSecciones() {
  // La cabecera y el pie no se vuelven a montar al navegar dentro del sitio, y
  // este componente vive con ellos. Sin la ruta como dependencia, el observador
  // se armaria una sola vez -sobre las secciones de la primera pagina- y las de
  // todas las demas no se contarian nunca.
  const ruta = usePathname()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const bloques = Array.from(document.querySelectorAll<HTMLElement>('[data-section-view]'))
    if (bloques.length === 0) return

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue

          /* Medir solo el 50% de la seccion no alcanza: una seccion mas alta que
             la pantalla no puede llegar nunca a esa proporcion -a lo sumo se ve
             la parte que cabe-, asi que las mas largas no se contarian jamas y
             el embudo diria que nadie baja hasta ellas. Vale cualquiera de las
             dos: media seccion a la vista, o media pantalla ocupada por ella. */
          const mediaSeccion = entrada.intersectionRatio >= MITAD
          const mediaPantalla = entrada.intersectionRect.height >= window.innerHeight * MITAD
          if (!mediaSeccion && !mediaPantalla) continue

          observador.unobserve(entrada.target)
          const nombre = entrada.target.getAttribute('data-section-view')
          if (!nombre) continue
          document.dispatchEvent(
            new CustomEvent('iaenblanco:section_view', { detail: { section_name: nombre } }),
          )
        }
      },
      // Varios cortes, no uno: con un solo 0.5 el navegador no avisaria nunca de
      // las secciones largas, que son justo las que se revisan aca arriba.
      { threshold: [0, 0.1, 0.25, MITAD] },
    )

    bloques.forEach((bloque) => observador.observe(bloque))
    return () => observador.disconnect()
  }, [ruta])

  return null
}
