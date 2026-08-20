'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (readStoredConsent() === null) setVisible(true)
  }, [])

  if (!visible) return null

  function decidir(valor: ConsentValue) {
    storeConsent(valor)
    setVisible(false)
  }

  return (
    <div className="consent-banner" role="region" aria-labelledby="consent-title">
      <div className="consent-banner__inner">
        <div className="consent-banner__copy">
          <p className="eyebrow eyebrow--dark" id="consent-title">
            Medición
          </p>
          <p>
            Usamos Google Analytics y Meta para entender cómo se usa el sitio. No se carga
            nada hasta que decidas, y puedes cambiar de opinión borrando los datos del sitio
            en tu navegador. Detalles en{' '}
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
