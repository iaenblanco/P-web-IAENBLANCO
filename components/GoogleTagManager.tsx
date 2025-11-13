'use client'

import { useEffect } from 'react'

interface GoogleTagManagerProps {
  gtmId: string
}

/**
 * Componente completo de Google Tag Manager
 * Inyecta el script en el <head> y el noscript en el <body>
 */
export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  // useEffect debe llamarse siempre, no después de un return condicional
  useEffect(() => {
    // Validar que el GTM ID tenga el formato correcto
    if (!gtmId || !gtmId.startsWith('GTM-')) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Google Tag Manager ID no válido o no configurado')
      }
      return
    }

    // Inyectar el script de GTM en el <head>
    const script = document.createElement('script')
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `
    script.id = 'google-tag-manager-head'
    
    // Solo agregar si no existe
    if (!document.getElementById('google-tag-manager-head')) {
      document.head.insertBefore(script, document.head.firstChild)
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Google Tag Manager cargado:', gtmId)
      }
    }

    // Limpiar al desmontar (aunque normalmente no se desmonta)
    return () => {
      const existingScript = document.getElementById('google-tag-manager-head')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [gtmId])

  // Validar para el noscript también
  if (!gtmId || !gtmId.startsWith('GTM-')) {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}

