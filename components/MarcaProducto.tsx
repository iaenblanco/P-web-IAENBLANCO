/*
 * Las tres marcas de producto, en un solo lugar.
 *
 * Hasta el 06-sep-2026 eran tres monogramas de trazo dibujados aca, iguales
 * de familia y sin nada del producto: la U, una C dentro de una caja y una
 * curva de grafico. Cada producto tiene su sitio y su identidad, y es esa la
 * que va: la U blanca sobre azul noche de unificalo.cl, el calendario-burbuja
 * teal de citaly.cl, y para Leads -que no tiene logo propio- la chispa sobre
 * ambar con la que se presenta leads.iaenblanco.com.
 *
 * Las dos calcomanias viven en public/brand-assets/marca-*.webp (160x160,
 * generadas con sharp desde los archivos que sirven los sitios; la de Citaly
 * con canal alfa, la de Unificalo con su propio fondo azul noche, que ES la
 * marca y llena la caja). La chispa de Leads es un glifo relleno; el color lo
 * pone quien la monta via currentColor.
 *
 * La clase `hero-logo` sigue viajando: es la que dimensiona el glifo en
 * cada superficie (.repisa__marca, .ad__marca-caja, .esc__carta-marca).
 */

import Image from 'next/image'

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
      <Image
        src="/brand-assets/marca-unificalo.webp"
        width={160}
        height={160}
        alt=""
        className={clases(id, className)}
      />
    )
  }

  if (id === 'citaly') {
    return (
      <Image
        src="/brand-assets/marca-citaly.webp"
        width={160}
        height={160}
        alt=""
        className={clases(id, className)}
      />
    )
  }

  if (id === 'leads') {
    return (
      <svg className={clases(id, className)} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 10c1.6 9.6 6.2 14.6 16 16.4-9.8 1.8-14.4 6.8-16 16.4-1.6-9.6-6.2-14.6-16-16.4 9.8-1.8 14.4-6.8 16-16.4Z" />
        <path d="M49 40c.8 4.6 3 7 7.5 7.8-4.5.8-6.7 3.2-7.5 7.8-.8-4.6-3-7-7.5-7.8 4.5-.8 6.7-3.2 7.5-7.8Z" />
        <path d="M15 44c.6 3.4 2.2 5.2 5.5 5.8-3.3.6-4.9 2.4-5.5 5.8-.6-3.4-2.2-5.2-5.5-5.8 3.3-.6 4.9-2.4 5.5-5.8Z" />
      </svg>
    )
  }

  return null
}
