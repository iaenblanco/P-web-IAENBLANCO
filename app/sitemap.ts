import type { MetadataRoute } from 'next'
import { FECHA_SERVICIOS, fechaDeRuta } from '@/lib/fechas-rutas'
import { services, SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

/*
 * El <lastmod> de cada URL sale del mapa a mano de lib/fechas-rutas.ts y
 * NUNCA de new Date(): con new Date() las once URLs dirian que se editaron el
 * dia del deploy, y es falso -/terminos/ no se toca desde el 9 de julio de
 * 2026-. Si una ruta no esta en el mapa, fechaDeRuta devuelve undefined y esa
 * URL sale sin <lastmod>, que es como salia el sitemap entero hasta hoy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: fechaDeRuta('/'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/productos/`,
      lastModified: fechaDeRuta('/productos/'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/servicios/`,
      lastModified: fechaDeRuta('/servicios/'),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/trabajos/`,
      lastModified: fechaDeRuta('/trabajos/'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacto/`,
      lastModified: fechaDeRuta('/contacto/'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacidad/`,
      lastModified: fechaDeRuta('/privacidad/'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terminos/`,
      lastModified: fechaDeRuta('/terminos/'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/servicios/${service.slug}/`,
    lastModified: FECHA_SERVICIOS,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
