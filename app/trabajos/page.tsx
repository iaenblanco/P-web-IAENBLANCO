import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { Trabajos } from '@/components/Trabajos'
import { SITE_URL, getWhatsappUrl } from '@/lib/site'
import { trabajos } from '@/lib/trabajos'

export const metadata: Metadata = {
  title: 'Trabajos: los sitios que ya están atendiendo clientes',
  description:
    'Los sitios y tiendas que hicimos para negocios chilenos, con lo que le hicimos a cada uno, qué tiene por dentro y para qué le sirve. Ábrelos y revísalos.',
  alternates: {
    canonical: `${SITE_URL}/trabajos/`,
  },
  openGraph: {
    title: 'Trabajos: los sitios que ya están atendiendo clientes | IAenBlanco',
    description:
      'Los sitios y tiendas que hicimos para negocios chilenos. Están tal como se ven hoy: ábrelos y revisa el trabajo antes de escribirnos.',
    url: `${SITE_URL}/trabajos/`,
    siteName: 'IAenBlanco',
    type: 'website',
    locale: 'es_CL',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'IAenBlanco: sitios web, tiendas online y programas a la medida de tu negocio.',
      },
    ],
  },
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/*
 * El portafolio completo.
 *
 * OJO con lo que promete la apertura. Hasta hoy el metadata y la bajada decian
 * que de cada trabajo contamos "cuanto demora en abrir y cuanto pesa", y esas
 * dos cifras dejaron de pintarse en a75a6a8 -la medicion no las respaldaba- sin
 * que nadie tocara esta pagina: quedo prometiendo dos datos que la ficha ya no
 * tiene. Ahora dice lo que la ficha SI muestra: que le hicimos, que tiene por
 * dentro (los rasgos) y para que le sirve. Si algun dia vuelven las cifras,
 * esta frase vuelve con ellas y no antes.
 *
 * Antes estas fichas vivian en la home y ocupaban casi toda la pantalla de un
 * telefono: quien entraba buscando que hacemos tenia que pasar por siete
 * capturas de sitios ajenos antes de averiguarlo. La home quedo con la tira de
 * logos y el detalle se mudo aca, donde quien lo busca lo busca a proposito.
 */
export default function TrabajosPage() {
  const cuantos = trabajos.length
  const whatsappUrl = getWhatsappUrl('Hola IAenBlanco, vi sus trabajos y quiero uno para mi negocio.')

  /* El listado sale de la misma fuente que pinta las fichas, asi que agregar un
     trabajo en lib/trabajos.ts lo suma tambien aca y no hay dos listas que se
     puedan contradecir. El orden es el de la grilla.

     El href de cada trabajo es el sitio del CLIENTE, no una pagina nuestra, y
     no existe pagina de detalle por trabajo. Por eso el enlace externo va como
     el OBJETO del item -un WebSite ajeno- y no como la url del item: asi el
     marcado dice lo que la lista es de verdad, siete sitios de terceros que
     hicimos nosotros, en vez de declarar siete paginas de este dominio. */
  const listaSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: trabajos.map((trabajo, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebSite',
        name: trabajo.client,
        url: trabajo.href,
      },
    })),
  }

  return (
    <>
      <main id="contenido" className="pagina-trabajos">
        <section className="pagina-trabajos__apertura">
          <div className="section-shell pagina-trabajos__apertura-inner">
            <p className="eyebrow">Trabajos reales</p>
            {/* Antes decia "Miralo tu mismo", palabra por palabra el h2 de la
                portada: dos paginas del sitio peleando por la misma frase. Este
                titular es el de su propio metadata.title. */}
            <h1>Los sitios que ya están atendiendo clientes.</h1>
            <p className="pagina-trabajos__lead">
              Estos son {cuantos} de los sitios que hemos hecho, y no son maquetas: están
              atendiendo clientes hoy, tal como se ven acá. De cada uno contamos qué le
              hicimos, qué tiene por dentro y para qué le sirve al negocio. Ábrelos y
              revisa el trabajo antes de escribirnos.
            </p>
          </div>
        </section>

        <section className="pagina-trabajos__grilla" aria-label="Sitios que hicimos">
          <div className="section-shell">
            {/* Ficha completa -es la pagina del detalle- y titulo en h2 para que
                el documento vaya h1 -> h2 y no saltee un nivel. */}
            <Trabajos nivelTitulo={2} />
          </div>
        </section>

        <section className="pagina-trabajos__cierre">
          <div className="section-shell pagina-trabajos__cierre-inner">
            <Reveal>
              <h2>¿Quieres uno así?</h2>
              <p>
                Cuéntanos qué vendes y te decimos qué necesitas y cuánto cuesta. Si te
                interesa cómo llegamos hasta acá, el proceso está explicado paso a paso.
              </p>
              <div className="pagina-trabajos__acciones">
                <a className="button button--primary" href={whatsappUrl} target="_blank" rel="noreferrer" data-cursor="WhatsApp">
                  Escríbenos por WhatsApp
                </a>
                {/* Con barra final: sin ella trailingSlash:true responde un 308 y el
                    salto deja de ser navegacion cliente para volverse recarga completa.
                    Es tambien la URL que declara serviceCanonical para esta ficha. */}
                <Link href="/servicios/desarrollo-web-ia/" className="button button--text">
                  Cómo hacemos un sitio así
                  <ArrowRight />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listaSchema) }}
      />
    </>
  )
}
