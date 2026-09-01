import type { Metadata } from 'next'
import { AnclaAlCargar } from '@/components/AnclaAlCargar'
import { EscenaAbanico } from '@/components/EscenaBanda'
import { EscenaProducto } from '@/components/EscenaProducto'
import { FichaLeadsEjemplo } from '@/components/FichaLeadsEjemplo'
import { MarcaProducto } from '@/components/MarcaProducto'
import { Reveal } from '@/components/Reveal'
import { RevelaAlEntrar } from '@/components/RevelaAlEntrar'
import { getWhatsappDesde, OG_IMAGE, products, SITE_URL } from '@/lib/site'

/* La misma bajada sirve para la metadata y para la tarjeta social. Una sola
   fuente, para que no quede una de las dos vieja. */
const DESCRIPCION =
  'Unifícalo, Citaly y Leads: tres programas propios de IAenBlanco, muy pronto. Mira lo que hace cada uno y conversemos.'

export const metadata: Metadata = {
  title: 'Productos',
  description: DESCRIPCION,
  alternates: {
    canonical: `${SITE_URL}/productos/`,
  },
  openGraph: {
    title: 'Productos | IAenBlanco',
    description: DESCRIPCION,
    url: `${SITE_URL}/productos/`,
    siteName: 'IAenBlanco',
    type: 'website',
    locale: 'es_CL',
    images: [
      OG_IMAGE,
    ],
  },
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* El tic que aparece en cada fila del lado resuelto. Es el mismo dibujo en
   los tres productos: lo único que cambia es el color heredado. */
function Tic() {
  return (
    <svg className="ad__tic" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3 8.5 3.4 3.4L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

export default function ProductsPage() {
  return (
    <main id="contenido">
      <AnclaAlCargar />
      <section className="page-hero page-hero--products" data-cursor-theme="signal">
        <div className="section-shell banda-apertura">
          <div className="banda-apertura__texto">
            <p className="hero-kicker"><span className="hero-kicker__punto" aria-hidden="true" /> Nuestros productos</p>
            <h1>
              Tres programas nuestros,{' '}
              <em>muy pronto.</em>
            </h1>
            <p>
              Uno para cada desorden que vimos repetirse. Los estamos terminando con
              los primeros negocios: mira cuál se parece a lo tuyo y conversemos.
            </p>
            {/* El primer boton de la pagina. Sin data-analytics-event a proposito:
                el despachador de layout.tsx ya reconoce los enlaces a wa.me y,
                fuera de /servicios/, los cuenta como cta_whatsapp_click. */}
            <div className="banda-apertura__accion">
              <a
                href={getWhatsappDesde('productos')}
                target="_blank"
                rel="noreferrer"
                className="button button--text"
                data-cursor="Escribir"
                data-whatsapp-origin="productos"
              >
                Cuéntanos cuál se parece a lo tuyo
                <ArrowUpRight />
              </a>
            </div>
          </div>
          {/* La escena es aria-hidden y los tres nombres que muestra estan
              escritos completos en las fichas de mas abajo. */}
          <div className="banda-apertura__visual">
            <RevelaAlEntrar className="revela--escena">
              <EscenaAbanico />
            </RevelaAlEntrar>
          </div>
        </div>
      </section>

      <section id="productos-propios" className="products-section" aria-label="Productos de IAenBlanco">
        <div className="section-shell ad-lista">
          {products.map((product, index) => (
            <Reveal
              key={product.id}
              id={product.id}
              className={`ad ad--${product.id}`}
              delay={index * 90}
            >
              <article>
                <header className="ad__cabecera">
                  <div>
                    <p className="ad__etiqueta">
                      {String(index + 1).padStart(2, '0')} · {product.paraQuien}
                    </p>
                    <h2>{product.name}</h2>
                    <p className="ad__promesa">{product.promesaCorta}</p>
                  </div>
                  <div className="ad__marca">
                    <span className="ad__marca-caja"><MarcaProducto id={product.id} className="ad__marca-svg" /></span>
                    <span className="ad__estado"><i aria-hidden="true" />{product.status}</span>
                  </div>
                </header>

                {/* Contenedor con nombre propio para la escena de la ficha:
                    el Paso 6 muda el bloque de celular de .esc a @container
                    escena, y sin esto estas tres se quedarian sin el. */}
                <div className="ad__escena">
                  <RevelaAlEntrar className="revela--escena">
                    <EscenaProducto id={product.id} />
                  </RevelaAlEntrar>
                </div>

                <p className="ad__pie-escena">{product.diptico.remateDespues}</p>

                {/* Solo Leads: su escena es un mapa y unas filas sin texto,
                    y era el unico de los tres del que no se entendia que
                    llega. Esto lo traduce a la ficha que se ve adentro. */}
                {product.id === 'leads' ? <FichaLeadsEjemplo /> : null}

                <footer className="ad__pie">
                  <div className="ad__pie-texto">
                    <p>{product.statusMeaning}</p>
                    {product.id === 'unificalo' ? (
                      <p className="ad__tambien">
                        Pensado para conectarse con {product.integrations.join(', ')}.
                      </p>
                    ) : null}
                    {/* El sitio del producto existe y se puede mirar: esconderlo
                        era guardarse una prueba. Enlace discreto, no boton: el
                        camino principal sigue siendo conversar. */}
                    <a
                      href={product.sitio}
                      target="_blank"
                      rel="noreferrer"
                      className="ad__sitio"
                      data-product-id={product.id}
                    >
                      {product.sitio.replace('https://', '')}
                    </a>
                  </div>
                  <div className="ad__pie-accion">
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                      className="ad__boton"
                      data-cursor="WhatsApp"
                      data-product-id={product.id}
                      data-product-name={product.name}
                    >
                      {product.ctaLabel}
                      <ArrowUpRight />
                    </a>
                    <p className="ad__oferta">{product.offer}</p>
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
