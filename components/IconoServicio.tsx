import type { ReactNode } from 'react'

/**
 * Los mismos cuatro glifos que las fichas del circuito del heroe
 * (components/CircuitoHero.tsx, ICONOS): 20x20, trazo 1.5, sin relleno. La
 * estanteria de servicios los repite a proposito, para que quien acaba de ver
 * el circuito reconozca las cuatro piezas sin leer. Si cambia uno, cambian
 * los dos.
 */
const GLIFOS: Record<string, ReactNode> = {
  'desarrollo-web-ia': (
    <>
      <rect x="2.5" y="4" width="15" height="10" rx="1.5" />
      <path d="M7 17h6" />
    </>
  ),
  'plataformas-software-medida': (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </>
  ),
  automatizaciones: <path d="M3 7h11l-3-3M17 13H6l3 3" />,
  'soluciones-ia-medida': <path d="M4 4h12v9H8l-4 3z" />,
}

export function IconoServicio({ slug }: { slug: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLIFOS[slug] ?? null}
    </svg>
  )
}
