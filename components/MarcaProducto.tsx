/*
 * Los tres monogramas de producto, en un solo lugar.
 *
 * Hasta el 31-ago-2026 esto estaba roto de dos maneras a la vez. Unificalo y
 * Citaly NUNCA se dibujaban: HeroLogo devolvia antes su calcomania .webp y los
 * monogramas de trazo quedaban inalcanzables mas abajo del mismo archivo
 * (app/page.tsx, dos ramas muertas). Y de Leads habia dos dibujos distintos:
 * el del mapa y la repisa llevaba cuatro puntos y trazo redondo; el de
 * /productos era otro path, trazo 3 y punta cuadrada.
 *
 * Las dos calcomanias no tienen canal alfa -chunk VP8 pelado, sin VP8X ni
 * ALPH-, asi que pintaban su propio fondo. En la repisa y en el mapa el CSS lo
 * tapaba recortandolas a circulo; en /productos no, y ahi quedaban crudas:
 * Unificalo un rectangulo casi negro (rgb 1,5,22 en las esquinas) y Citaly uno
 * casi blanco (rgb 245,236,235) que sobre el papel #f4f2ec no se distinguia de
 * su propia placa. Un logo que no se ve no es una marca, es un hueco.
 *
 * Con los tres en trazo el color lo pone quien los monta -graphite al 62 % en
 * el mapa, tinta en la repisa, el acento de cada tarjeta en /productos- y el
 * dibujo es el mismo en las tres superficies. La familia la hace el trazo, no
 * el color: los tres acentos de /productos ya visten la tarjeta entera.
 *
 * Mismo lienzo para los tres: viewBox 0 0 64 64. Citaly venia en 72x64, y
 * dentro de una caja cuadrada eso lo dibujaba un 11 % mas chico que sus
 * hermanos y con aire de sobra arriba y abajo. Se corrio 4 unidades a la
 * izquierda para que siga centrado en el lienzo nuevo.
 *
 * El grosor del trazo no va aca: lo pone `.hero-logo path, .hero-logo rect,
 * .hero-logo circle` en app/globals.css, que es lo que mantiene a todos los
 * glifos de la casa con el mismo peso. Por eso la clase `hero-logo` viaja
 * siempre, tambien en /productos.
 */

const MARCAS = ['unificalo', 'citaly', 'leads']

export function esMarcaProducto(id: string) {
  return MARCAS.includes(id)
}

function clases(id: string, extra?: string) {
  return ['hero-logo', `hero-logo--${id}`, extra].filter(Boolean).join(' ')
}

export function MarcaProducto({ id, className }: { id: string; className?: string }) {
  if (id === 'unificalo') {
    return (
      <svg className={clases(id, className)} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 12v28c0 9.2 6.3 15.5 14 15.5S46 49.2 46 40V12" />
        <path d="M18 12h10v27.5c0 2.8 1.5 5.5 4 6.9 2.5-1.4 4-4.1 4-6.9V12h10" />
      </svg>
    )
  }

  if (id === 'citaly') {
    return (
      <svg className={clases(id, className)} viewBox="0 0 64 64" aria-hidden="true">
        <rect x="8" y="12" width="48" height="40" rx="12" />
        <path d="M39 24.5a10 10 0 1 0 0 15" />
      </svg>
    )
  }

  if (id === 'leads') {
    return (
      <svg className={clases(id, className)} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 46V18" />
        <path d="M18 46h30" />
        <path d="M24 40 33 30l6 5 9-14" />
        <circle cx="24" cy="40" r="3" />
        <circle cx="33" cy="30" r="3" />
        <circle cx="39" cy="35" r="3" />
        <circle cx="48" cy="21" r="3" />
      </svg>
    )
  }

  return null
}
