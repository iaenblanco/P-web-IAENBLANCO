'use client'

import { useEffect } from 'react'

interface GoogleTagManagerProps {
  gtmId: string
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  useEffect(() => {
    const productionHosts = new Set(['iaenblanco.com', 'www.iaenblanco.com'])
    const isProductionHost = productionHosts.has(window.location.hostname)

    if (!isProductionHost || !gtmId || !gtmId.startsWith('GTM-')) {
      return
    }

    const script = document.createElement('script')
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `
    script.id = 'google-tag-manager-head'
    
    if (!document.getElementById('google-tag-manager-head')) {
      document.head.insertBefore(script, document.head.firstChild)
    }

    return () => {
      const existingScript = document.getElementById('google-tag-manager-head')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [gtmId])

  return null
}

