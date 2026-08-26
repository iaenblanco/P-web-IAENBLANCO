import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { Trabajos } from '@/components/Trabajos'
import { SITE_URL, getWhatsappUrl } from '@/lib/site'
import { trabajos } from '@/lib/trabajos'

export const metadata: Metadata = {
  title: 'Trabajos: los sitios que ya están atendiendo clientes',
  description:
    'Los sitios y tiendas que hicimos para negocios chilenos, con lo que le hicimos a cada uno, para qué le sirve y cuánto pesa y demora en abrir. Ábrelos y revísalos.',
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
 * Antes estas fichas vivian en la home y ocupaban casi toda la pantalla de un
 * telefono: quien entraba buscando que hacemos tenia que pasar por siete
 * capturas de sitios ajenos antes de averiguarlo. La home quedo con la tira de
 * logos y el detalle se mudo aca, donde quien lo busca lo busca a proposito.
 */
export default function TrabajosPage() {
  const cuantos = trabajos.length
  const whatsappUrl = getWhatsappUrl('Hola IAenBlanco, vi sus trabajos y quiero uno para mi negocio.')

  return (
    <main id="contenido" className="pagina-trabajos">
      <section className="pagina-trabajos__apertura">
        <div className="section-shell pagina-trabajos__apertura-inner">
          <p className="eyebrow">Trabajos reales</p>
          <h1>Míralo tú mismo.</h1>
          <p className="pagina-trabajos__lead">
            Estos son {cuantos} de los sitios que hemos hecho, y no son maquetas: están
            atendiendo clientes hoy, tal como se ven acá. De cada uno contamos qué le
            hicimos, para qué le sirve al negocio, cuánto demora en abrir y cuánto pesa.
            Ábrelos y revisa el trabajo antes de escribirnos.
          </p>
        </div>
      </section>

      <section className="pagina-trabajos__grilla" aria-label="Sitios que hicimos">
        <div className="section-shell">
          <Trabajos />
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
              <Link href="/servicios/desarrollo-web-ia" className="button button--text">
                Cómo hacemos un sitio así
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
