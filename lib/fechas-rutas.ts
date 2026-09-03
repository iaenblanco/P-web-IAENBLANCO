/*
 * La fecha de ultima edicion de cada ruta, escrita a mano. HAY QUE ACTUALIZAR
 * ESTE MAPA CUANDO CAMBIA EL CONTENIDO DE UNA RUTA: si no, el <lastmod> del
 * sitemap se queda viejo.
 *
 * Van a mano y no salen de git log en tiempo de build porque el contenedor de
 * Cloudflare puede clonar en superficie: ahi git log no ve la historia del
 * archivo y devolveria la fecha de HEAD para las once URLs, que es new Date()
 * con pasos de mas. Una fecha que miente le ensena a Google a desconfiar del
 * sitemap entero, asi que la ruta sin fecha comprobada se queda sin <lastmod>
 * -es opcional por URL- en vez de llevar una inventada.
 *
 * Medidas el 2-sep-2026 con git log -1 --format=%cs sobre la pagina y su
 * modulo de contenido. El formato es ISO corto, que es el que Next pasa tal
 * cual al <lastmod>.
 */
export const FECHAS_RUTAS: Record<string, string | undefined> = {
  // app/page.tsx
  '/': '2026-09-01',
  // app/productos/page.tsx
  '/productos/': '2026-09-01',
  // app/servicios/page.tsx
  '/servicios/': '2026-09-01',
  // app/trabajos/page.tsx + lib/trabajos.ts
  '/trabajos/': '2026-09-01',
  // app/contacto/page.tsx + components/ContactForm.tsx
  '/contacto/': '2026-09-01',
  // app/privacidad/page.tsx
  '/privacidad/': '2026-08-20',
  // app/terminos/page.tsx
  '/terminos/': '2026-07-09',
}

/*
 * Los cuatro servicios comparten fecha a proposito: su contenido vive en un
 * solo archivo, lib/services-content.ts, y cambian juntos. Medida sobre
 * app/servicios/[slug]/page.tsx + lib/services-content.ts +
 * components/ServicePageTemplate.tsx.
 */
export const FECHA_SERVICIOS = '2026-08-31'

/*
 * Devuelve undefined si la ruta no esta en el mapa. Next omite la etiqueta
 * cuando lastModified es undefined, asi que la URL sale sin <lastmod> en vez
 * de con una fecha inventada.
 */
export function fechaDeRuta(ruta: string): string | undefined {
  return FECHAS_RUTAS[ruta]
}
