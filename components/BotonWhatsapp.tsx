'use client'

import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '@/lib/site'

/**
 * El unico atajo que acompaña al visitante en las once rutas. Sale del mismo
 * WHATSAPP_URL que el resto del sitio, asi que cambiar el numero en lib/site
 * lo cambia tambien aca.
 *
 * Nunca se esconde por codigo. Mientras el aviso de medicion esta arriba, el
 * boton se sube lo que mida el aviso para no quedar tapado; el alto lo publica
 * el propio aviso en la custom property --aviso-alto, que el CSS lee con 0px
 * de fallback para cuando no hay aviso.
 *
 * Bajo 768px esa subida no se aplica -ver app/globals.css, el bloque del
 * @media (max-width: 767px)-: en un telefono el boton levantado aterriza sobre
 * los CTA del heroe y les roba el toque, que es peor. Ahi el aviso lo tapa
 * mientras esta abierto, y el contacto no se pierde porque la cabecera es
 * sticky y lleva su propio boton de WhatsApp en las once rutas.
 */
export function BotonWhatsapp() {
  const [alPie, setAlPie] = useState(false)

  // Mientras se baja, que el boton tape un trozo de lo que pasa por debajo es
  // lo normal: dura lo que dura el scroll. En el pie no: ahi la pagina se
  // detiene y el boton se queda parado encima de cosas que se tocan.
  //
  // Son DOS zonas, no una. La franja de abajo tiene la direccion y los enlaces
  // legales -medido, 52x17 px de texto tapado en 390 y 24x13 en 1280-, pero
  // mas arriba esta la navegacion del pie, y ahi el estorbo es peor que tapar:
  // el boton se lleva el toque. Medido en 390, el ultimo tercio de "Servicios"
  // y de "Trabajos" caia dentro del boton, asi que tocarlos abria WhatsApp en
  // una pestaña nueva en vez de navegar. Se observan las dos y el boton se
  // retira mientras cualquiera de ellas este a la vista. No se pierde nada: el
  // pie tiene sus propios enlaces de contacto.
  useEffect(() => {
    const zonas = ['.site-footer__nav', '.site-footer__bottom']
      .map((selector) => document.querySelector(selector))
      .filter((nodo): nodo is Element => nodo !== null)
    if (zonas.length === 0) return

    const aLaVista = new Set<Element>()
    const ojo = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) aLaVista.add(entrada.target)
        else aLaVista.delete(entrada.target)
      }
      setAlPie(aLaVista.size > 0)
    })
    zonas.forEach((zona) => ojo.observe(zona))
    return () => ojo.disconnect()
  }, [])

  const clases = ['boton-whatsapp', alPie ? 'boton-whatsapp--al-pie' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <a
      className={clases}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      data-cursor="WhatsApp"
      data-analytics-event="floating_whatsapp_click"
    >
      {/* El glifo de WhatsApp dibujado, no una imagen: son 700 bytes que van en
          el HTML y no cuestan una peticion mas. */}
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
    </a>
  )
}
