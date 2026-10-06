'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export const CONSENT_STORAGE_KEY = 'iaenblanco.consent.v1'
export const CONSENT_EVENT = 'iaenblanco:consent'

export type ConsentValue = 'granted' | 'denied'

export function readStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const guardado = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return guardado === 'granted' || guardado === 'denied' ? guardado : null
  } catch {
    return null
  }
}

function storeConsent(valor: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, valor)
  } catch {
    /* modo privado o storage bloqueado: la decisión vale solo para esta visita */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: valor }))
}

/**
 * Lo que la app sabe del aviso, publicado en <html data-aviso>:
 *   sin atributo  todavia no se sabe (HTML recien servido, React sin hidratar)
 *   "abierto"     se leyo el storage y hay que preguntar: el aviso esta en pantalla
 *   "cerrado"     ya hay respuesta, de esta visita o de una anterior
 * Lo lee el CSS del boton flotante de WhatsApp, que en el telefono no se
 * muestra hasta ver "cerrado". Antes dependia de :has(.consent-banner), que no
 * distingue "no hay aviso" de "todavia no se sabe si hay": el boton venia en el
 * HTML, se veia, y se escondia recien cuando React montaba el aviso.
 * El storage se lee una sola vez, aca; nadie mas tiene que volver a leerlo.
 */
function publicarAviso(estado: 'abierto' | 'cerrado') {
  document.documentElement.dataset.aviso = estado
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const nodo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const falta = readStoredConsent() === null
    if (falta) setVisible(true)
    publicarAviso(falta ? 'abierto' : 'cerrado')
    return () => {
      delete document.documentElement.dataset.aviso
    }
  }, [])

  // De 768px para arriba el boton de WhatsApp se apoya encima de este aviso, y
  // para eso necesita saber cuanto mide; el menu del telefono y el heroe leen
  // el mismo alto. En el telefono el boton no lo usa: se retira mientras el
  // aviso esta abierto. El alto no es un numero fijo: cambia
  // con el ancho -el copy salta de una linea a tres- y con el tamano de letra
  // del navegador, asi que lo mide el navegador y se publica aca. Se limpia al
  // desmontar porque una vez respondido el aviso el boton vuelve a su sitio.
  // Depende de `visible` porque el nodo no existe hasta que el aviso se pinta.
  useEffect(() => {
    const aviso = nodo.current
    if (!aviso) return

    const ojo = new ResizeObserver(([entrada]) => {
      const alto = entrada.target.getBoundingClientRect().height
      document.documentElement.style.setProperty('--aviso-alto', `${alto}px`)
    })
    ojo.observe(aviso)

    return () => {
      ojo.disconnect()
      document.documentElement.style.removeProperty('--aviso-alto')
    }
  }, [visible])

  if (!visible) return null

  function decidir(valor: ConsentValue) {
    storeConsent(valor)
    setVisible(false)
    publicarAviso('cerrado')
  }

  return (
    <div className="consent-banner" role="region" aria-labelledby="consent-title" ref={nodo}>
      <div className="consent-banner__inner">
        <div className="consent-banner__copy">
          <p className="eyebrow eyebrow--dark" id="consent-title">
            Medición
          </p>
          {/* Lo esencial en dos lineas: en un telefono el aviso se comia media
              pantalla antes de que el visitante viera nada del sitio. El resto
              (que se puede cambiar de opinion, que se puede borrar) esta en la
              pagina de privacidad, enlazada aqui mismo. */}
          <p>
            Usamos Google Analytics y Meta para saber cómo se usa el sitio. No se carga nada
            hasta que decidas. Detalles en{' '}
            <Link href="/privacidad/" prefetch={false}>
              privacidad
            </Link>
            .
          </p>
        </div>
        <div className="consent-banner__actions">
          <button type="button" className="consent-banner__deny" onClick={() => decidir('denied')}>
            Solo lo necesario
          </button>
          <button type="button" className="consent-banner__accept" onClick={() => decidir('granted')}>
            Aceptar medición
          </button>
        </div>
      </div>
    </div>
  )
}
