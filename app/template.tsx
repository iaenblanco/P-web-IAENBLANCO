'use client'

import { useState } from 'react'

// La animacion de entrada es para la navegacion dentro del sitio, no para el
// primer cargue: en el primer cargue el HTML ya esta pintado cuando React
// hidrata, asi que aplicarla ahi borra lo que el visitante ya estaba viendo.
// El guardia de `window` importa porque la exportacion estatica dibuja todas
// las paginas en un mismo proceso de Node: sin el, la bandera quedaria en true
// y la clase se hornearia en el HTML de todas las paginas menos la primera.
let yaMonto = false

export default function Template({ children }: { children: React.ReactNode }) {
  const [anima] = useState(() => {
    if (typeof window === 'undefined') return false
    const previa = yaMonto
    yaMonto = true
    return previa
  })

  return <div className={anima ? 'page-transition' : undefined}>{children}</div>
}
