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

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const nodo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (readStoredConsent() === null) setVisible(true)
  }, [])

  // El boton de WhatsApp se apoya encima de este aviso en vez de esconderse, y
  // para eso necesita saber cuanto mide. El alto no es un numero fijo: cambia
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
            <Link href="/privacidad" prefetch={false}>
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
