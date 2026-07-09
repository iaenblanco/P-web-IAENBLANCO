import type { Metadata } from 'next'
import { ContactBand } from '@/components/ContactBand'
import { Reveal } from '@/components/Reveal'
import { products, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Productos',
  description:
    'Conoce Unifícalo y Citaly, productos de IAenBlanco diseñados para conectar canales de venta y automatizar la gestión de agendas.',
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

function ProductVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="product-visual product-visual--unificalo" aria-hidden="true">
        <div className="product-visual__status">
          <span>sync.status</span>
          <strong><i /> Conectado</strong>
        </div>
        <div className="sync-map">
          <span className="sync-map__core">U</span>
          {['BS', 'SH', 'ML', 'WU', 'FA'].map((channel, channelIndex) => (
            <span key={channel} className={`sync-map__node sync-map__node--${channelIndex + 1}`}>
              {channel}
            </span>
          ))}
          <svg viewBox="0 0 440 250" fill="none">
            <path d="M220 125 82 56M220 125 356 54M220 125 398 166M220 125 224 224M220 125 52 172" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="product-visual product-visual--citaly" aria-hidden="true">
      <div className="conversation-card conversation-card--one">
        <span>Cliente · 10:42</span>
        <p>¿Tienen hora mañana en la tarde?</p>
      </div>
      <div className="conversation-card conversation-card--two">
        <span>Citaly · ahora</span>
        <p>Sí. Encontré dos horarios disponibles.</p>
        <div><i /> 16:30 <i /> 18:00</div>
      </div>
      <div className="audio-wave">
        {[12, 22, 8, 30, 18, 38, 16, 27, 10, 20, 14].map((height, waveIndex) => (
          <i key={`${height}-${waveIndex}`} style={{ height }} />
        ))}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <main id="contenido">
      <section className="page-hero page-hero--products">
        <div className="section-shell">
          <p className="hero-kicker"><span /> Productos propios</p>
          <h1>
            Software que nace de
            <em>problemas operativos reales.</em>
          </h1>
          <p>
            Convertimos necesidades recurrentes en productos enfocados, conectados
            y listos para trabajar dentro del negocio.
          </p>
        </div>
      </section>

      <section className="products-section" aria-label="Productos de IAenBlanco">
        <div className="section-shell products-list">
          {products.map((product, index) => (
            <Reveal
              key={product.name}
              className={`product-panel product-panel--${index + 1}`}
              delay={index * 100}
            >
              <div className="product-panel__content">
                <div className="product-panel__meta">
                  <span>0{index + 1}</span>
                  <span>{product.status}</span>
                </div>
                <h2>{product.name}</h2>
                <p className="product-panel__description">{product.description}</p>
                <ul>
                  {product.problems.map((problem) => <li key={problem}>{problem}</li>)}
                </ul>
                <div className="product-panel__integrations">
                  {product.integrations.map((integration) => (
                    <span key={integration}>{integration}</span>
                  ))}
                </div>
                {product.available ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--ink"
                    data-cursor="Visitar"
                  >
                    {`Ir a ${product.name.toLowerCase()}.cl`}
                    <ArrowUpRight />
                  </a>
                ) : (
                  <span className="button button--disabled" aria-disabled="true">
                    Próximamente
                  </span>
                )}
              </div>
              <ProductVisual index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactBand
        eyebrow="Productos + implementación"
        title="¿Necesitas conectar un producto con tu operación?"
      />
    </main>
  )
}
