import type { Metadata } from 'next'
import { BrandLogo } from '@/components/BrandLogo'
import { ContactBand } from '@/components/ContactBand'
import { Reveal } from '@/components/Reveal'
import { products, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Productos',
  description:
    'Unifícalo, Citaly y Leads: tres programas propios de IAenBlanco. Cómo está tu negocio hoy y cómo queda con cada uno.',
  alternates: {
    canonical: `${SITE_URL}/productos/`,
  },
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* La marca de cada producto, al mismo tamaño y con el mismo encuadre en los
   tres. Leads no tiene logo propio, así que usa el glifo de la casa. */
function MarcaProducto({ id }: { id: string }) {
  if (id === 'unificalo') return <BrandLogo name="unificalo" className="ad__marca-img" sizes="52px" />
  if (id === 'citaly') return <BrandLogo name="citaly-mark" className="ad__marca-img" sizes="52px" />
  return (
    <svg className="ad__marca-svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M18 48V16M18 48H48M24 40 34 30l7 6 9-14M46 22h4v4" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
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
      <section className="page-hero page-hero--products" data-cursor-theme="signal">
        <div className="section-shell">
          <p className="hero-kicker"><span className="hero-kicker__punto" aria-hidden="true" /> Nuestros productos</p>
          <h1>
            Así está hoy.{' '}
            <em>Así queda después.</em>
          </h1>
          <p>
            Tres programas nuestros, uno para cada desorden que vimos repetirse. Los
            estamos terminando con los primeros negocios: mira cuál se parece a lo tuyo
            y conversemos.
          </p>
          <div className="page-hero__actions">
            <a href="#productos-propios" className="button button--primary">
              Ver los tres
              <ArrowUpRight />
            </a>
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
                    <span className="ad__marca-caja"><MarcaProducto id={product.id} /></span>
                    <span className="ad__estado"><i aria-hidden="true" />{product.status}</span>
                  </div>
                </header>

                <div className="ad__diptico">
                  <div className="ad__mitad ad__mitad--hoy">
                    <p className="ad__mitad-titulo">Hoy</p>
                    <ul className="ad__filas">
                      {product.diptico.filas.map((fila, i) => (
                        <li key={fila.etiqueta} style={{ ['--fila' as string]: i }}>
                          <span className="ad__glifo" aria-hidden="true" />
                          <span className="ad__texto">
                            <strong>{fila.etiqueta}</strong>
                            <em>{fila.detalle}</em>
                          </span>
                          <span className={`ad__valor${fila.alarma ? ' ad__valor--alarma' : ''}`}>
                            {fila.hoy}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="ad__remate ad__remate--hoy">{product.diptico.remateHoy}</p>
                  </div>

                  <span className="ad__costura" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 12h15m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </span>

                  <div className="ad__mitad ad__mitad--despues">
                    <p className="ad__mitad-titulo">{product.diptico.despuesLabel}</p>
                    <ul className="ad__filas">
                      {product.diptico.filas.map((fila, i) => (
                        <li key={fila.etiqueta} style={{ ['--fila' as string]: i }}>
                          <span className="ad__glifo" aria-hidden="true"><Tic /></span>
                          <span className="ad__texto">
                            <strong>{fila.etiqueta}</strong>
                            <em>{fila.detalle}</em>
                          </span>
                          <span className="ad__valor">{fila.despues}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="ad__remate">{product.diptico.remateDespues}</p>
                    <p className="ad__ejemplo">Ejemplo</p>
                  </div>
                </div>

                <footer className="ad__pie">
                  <div className="ad__pie-texto">
                    <p>{product.statusMeaning}</p>
                    {product.id === 'unificalo' ? (
                      <p className="ad__tambien">
                        Se conecta con {product.integrations.join(', ')}.
                      </p>
                    ) : null}
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

      <ContactBand
        eyebrow="Productos propios"
        title="¿No sabes cuál te sirve? Escríbenos y lo vemos."
      />
    </main>
  )
}
