'use client'

import { useCallback, useEffect, useState } from 'react'
import { CONSENT_EVENT, readStoredConsent, type ConsentValue } from './ConsentBanner'

interface GoogleTagManagerProps {
  gtmId: string
}

const SCRIPT_ID = 'google-tag-manager-head'

/**
 * GTM (que a su vez carga GA4 y el pixel de Meta) no se inyecta hasta que la
 * persona acepta. Sin aceptación no se pide un solo recurso de terceros.
 */
export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const [consent, setConsent] = useState<ConsentValue | null>(null)

  useEffect(() => {
    setConsent(readStoredConsent())

    function alDecidir(evento: Event) {
      setConsent((evento as CustomEvent<ConsentValue>).detail)
    }

    window.addEventListener(CONSENT_EVENT, alDecidir)
    return () => window.removeEventListener(CONSENT_EVENT, alDecidir)
  }, [])

  const cargar = useCallback(() => {
    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent','default',{
        ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied',
        analytics_storage:'denied', functionality_storage:'granted', security_storage:'granted'
      });
      gtag('consent','update',{
        ad_storage:'granted', ad_user_data:'granted', ad_personalization:'granted',
        analytics_storage:'granted'
      });
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `
    document.head.insertBefore(script, document.head.firstChild)
  }, [gtmId])

  useEffect(() => {
    const productionHosts = new Set(['iaenblanco.com', 'www.iaenblanco.com'])

    if (!productionHosts.has(window.location.hostname)) return
    if (!gtmId || !gtmId.startsWith('GTM-')) return
    if (consent !== 'granted') return

    cargar()
  }, [cargar, consent, gtmId])

  return null
}
