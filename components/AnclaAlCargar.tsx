'use client'

import { useEffect } from 'react'

/*
 * Chrome no salta al #ancla cuando la pagina viene recien cargada. Se
 * comprobo el 31-ago-2026 abriendo en frio /trabajos/#inasec-pets y tambien
 * /productos/#citaly -que ya estaba publicado desde antes-: las dos quedan en
 * scrollY 0, con :target apuntando bien a la ficha correcta. Hecho el mismo
 * salto despues, con la pagina quieta, funciona. La causa es la mezcla de
 * "scroll-behavior: smooth" en html con la hidratacion de Next: la animacion
 * arranca y algo la cancela antes de llegar.
 *
 * Esto lo rehace una sola vez, ya cargado todo -las capturas de las fichas
 * pesan y corren el contenido hacia abajo mientras entran- y sin animacion.
 * Solo actua si el visitante sigue arriba de todo: si el navegador si salto,
 * o si la persona ya se puso a bajar sola, no le movemos la pagina.
 */
export function AnclaAlCargar() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    const saltar = () => {
      if (window.scrollY !== 0) return
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }

    if (document.readyState === 'complete') {
      saltar()
      return
    }
    window.addEventListener('load', saltar, { once: true })
    return () => window.removeEventListener('load', saltar)
  }, [])

  return null
}
