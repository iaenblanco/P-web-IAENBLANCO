import type { Metadata } from 'next'
import { BrandLogo } from '@/components/BrandLogo'
import { ContactBand } from '@/components/ContactBand'
import { Reveal } from '@/components/Reveal'
import { products, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Productos',
  description:
    'Conoce Unifícalo, Citaly y Leads, productos propios de IAenBlanco para sincronizar canales, atender por WhatsApp y priorizar prospección B2B.',
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

function ProductName({ name }: { name: string }) {
  if (!name.includes('.')) return <>{name}</>

  const [prefix, rest] = name.split('.', 2)
  return (
    <>
      {prefix}.<wbr />
      {rest}
    </>
  )
}

function productWhatsAppUrl(productName: string) {
  return `https://wa.me/56977684800?text=${encodeURIComponent(
    `Hola IAenBlanco, quiero conversar sobre ${productName}.`,
  )}`
}

function LeadsMiniLogo() {
  return (
    <svg className="product-mini-mark__leads-logo" viewBox="0 0 64 64" fill="none">
      <path d="M18 48V16" />
      <path d="M18 48H48" />
      <path d="M24 40 34 30 41 36 50 22" />
      <path d="M46 22h4v4" />
    </svg>
  )
}

type ProductNetworkNode = {
  title: string
  detail: string
  color: string
  x: number
  y: number
}

function ProductNetworkVisual({
  theme,
  engine,
  status,
  brand,
  title,
  detail,
  outputLabel,
  outputText,
  nodes,
}: {
  theme: 'citaly' | 'leads'
  engine: string
  status: string
  brand?: 'citaly-mark'
  title: string
  detail: string
  outputLabel: string
  outputText: string
  nodes: ProductNetworkNode[]
}) {
  return (
    <div className={`product-visual product-visual--network product-visual--${theme}`} aria-hidden="true" data-cursor-theme={theme}>
      <div className="product-visual__status">
        <span>{engine}</span>
        <strong><i /> {status}</strong>
      </div>
      <div className="product-network-orbit">
        <svg viewBox="0 0 640 560" fill="none" className="product-network-orbit__wires">
          <circle className="product-network-orbit__ring" cx="320" cy="280" r="98" />
          <circle className="product-network-orbit__ring product-network-orbit__ring--wide" cx="320" cy="280" r="142" />
          {nodes.map((node) => (
            <g key={node.title}>
              <path className="product-network-orbit__wire" d={`M320 280 L${node.x} ${node.y}`} />
              <circle
                className="product-network-orbit__node"
                cx={node.x}
                cy={node.y}
                r="4.5"
                style={{ color: node.color }}
              />
            </g>
          ))}
        </svg>

        <div className="product-network-hub">
          <span>
            {brand ? <BrandLogo name={brand} /> : <LeadsMiniLogo />}
          </span>
          <strong>{title}</strong>
          <p>{detail}</p>
        </div>

        {nodes.map((node) => (
          <div
            key={node.title}
            className="product-network-node"
            style={{
              color: node.color,
              left: `${(node.x / 640) * 100}%`,
              top: `${(node.y / 560) * 100}%`,
            }}
          >
            <span>{node.title}</span>
            <strong>{node.detail}</strong>
          </div>
        ))}

        <div className="product-network-output">
          <span>{outputLabel}</span>
          <strong>{outputText}</strong>
        </div>
      </div>
    </div>
  )
}

function ProductVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="product-visual product-visual--network product-visual--unificalo" aria-hidden="true" data-cursor-theme="unificalo">
        <div className="product-visual__status">
          <span>sync.engine</span>
          <strong><i /> Piloto abierto</strong>
        </div>
        <div className="unify-orbit">
          <svg viewBox="0 0 640 560" fill="none">
            <circle className="unify-ring" cx="320" cy="280" r="98" />
            <circle className="unify-ring unify-ring--wide" cx="320" cy="280" r="142" />
            <path d="M320 280 128 118" />
            <path d="M320 280 108 312" />
            <path d="M320 280 176 442" />
            <path d="M320 280 486 118" />
            <path d="M320 280 522 318" />
            <path d="M320 280 438 450" />
          </svg>
          <div className="unify-hub">
            <span><BrandLogo name="unificalo" /></span>
            <strong>Unifícalo</strong>
            <p>stock · precios · DTE</p>
          </div>
          {[
            ['Shopify', 'ventas online', 'shopify', '15%', '13%'],
            ['Bsale', 'documentos', 'bsale', '13%', '47%'],
            ['Mercado Libre', 'marketplace', 'meli', '21%', '76%'],
            ['Stock', 'inventario vivo', 'stock', '76%', '13%'],
            ['Precios', 'reglas comerciales', 'price', '80%', '47%'],
            ['DTE', 'boletas + NC', 'dte', '68%', '76%'],
          ].map(([name, detail, theme, left, top]) => (
            <div key={name} className={`unify-node unify-node--${theme}`} style={{ left, top }}>
              <span>{name}</span>
              <strong>{detail}</strong>
            </div>
          ))}
          <div className="unify-output">
            <span>salida operativa</span>
            <strong>Todo en un solo flujo</strong>
          </div>
        </div>
      </div>
    )
  }

  if (index === 1) {
    return (
      <ProductNetworkVisual
        theme="citaly"
        engine="agenda.engine"
        status="Validación comercial"
        brand="citaly-mark"
        title="Citaly"
        detail="WhatsApp + agenda + IA"
        outputLabel="salida agenda"
        outputText="Reserva confirmada"
        nodes={[
          { title: 'WhatsApp', detail: 'entrada', color: '#7ac943', x: 128, y: 118 },
          { title: 'Audio', detail: 'comprende', color: '#8cc84b', x: 108, y: 312 },
          { title: 'Cliente', detail: 'mensaje', color: '#b5f26e', x: 176, y: 442 },
          { title: 'Agenda', detail: 'horas libres', color: '#8cc84b', x: 486, y: 118 },
          { title: 'Reserva', detail: 'confirma', color: '#b5f26e', x: 522, y: 318 },
          { title: 'Agente', detail: 'IA 24/7', color: '#28d9e5', x: 438, y: 450 },
        ]}
      />
    )
  }

  return (
    <ProductNetworkVisual
      theme="leads"
      engine="lead.engine"
      status="Acceso piloto"
      title="Leads"
      detail="Busca y prioriza"
      outputLabel="salida comercial"
      outputText="Oportunidad priorizada"
      nodes={[
        { title: 'Empresas', detail: 'mercado', color: '#ffcf4a', x: 128, y: 118 },
        { title: 'Filtro', detail: 'a quién sí', color: '#ffb13d', x: 108, y: 312 },
        { title: 'Contacto', detail: 'salida', color: '#ff8f3d', x: 176, y: 442 },
        { title: 'Evidencia', detail: 'datos', color: '#28d9e5', x: 486, y: 118 },
        { title: 'Scoring', detail: 'prioriza', color: '#ffb13d', x: 522, y: 318 },
        { title: 'Seguimiento', detail: 'en qué va', color: '#cf71ff', x: 438, y: 450 },
      ]}
    />
  )
}

export default function ProductsPage() {
  return (
    <main id="contenido">
      <section className="page-hero page-hero--products" data-cursor-theme="signal">
        <div className="section-shell">
          <p className="hero-kicker"><span /> Programas listos para usar</p>
          <h1>
            Tres programas nuestros{' '}
            <em>que puedes contratar hoy.</em>
          </h1>
          <p>
            Uno para que tus ventas y tu inventario cuadren solos, uno para que tu WhatsApp
            agende horas mientras atiendes, y uno para encontrar empresas a las que
            venderles. Los tres están funcionando, los tres se contratan directo y los tres
            parten sin compromiso.
          </p>
          <div className="page-hero__actions">
            <a href="#productos-propios" className="button button--primary">
              Ver productos
              <ArrowUpRight />
            </a>
            <a
              href={productWhatsAppUrl('productos propios')}
              target="_blank"
              rel="noreferrer"
              className="button button--text"
            >
              Conversar
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section id="productos-propios" className="products-section" aria-label="Productos de IAenBlanco">
        <div className="section-shell products-list">
          {products.map((product, index) => (
            <Reveal
              key={product.name}
              className={`product-panel product-panel--${index + 1}`}
              delay={index * 100}
            >
              <div
                className="product-panel__content"
                data-cursor-theme={index === 0 ? 'unificalo' : index === 1 ? 'citaly' : 'leads'}
              >
                <div className="product-panel__meta">
                  <span>0{index + 1}</span>
                  <span>{product.status}</span>
                </div>
                <p className="product-panel__eyebrow">{product.eyebrow}</p>
                <h2><ProductName name={product.name} /></h2>
                <p className="product-panel__promise">{product.promise}</p>
                <p className="product-panel__description">{product.description}</p>
                <ul>
                  {product.problems.map((problem) => <li key={problem}>{problem}</li>)}
                </ul>
                <div className="product-panel__integrations">
                  {product.integrations.map((integration) => (
                    <span key={integration}>{integration}</span>
                  ))}
                </div>
                <p className="product-panel__status">
                  <span>{product.status}</span>
                  {product.statusMeaning}
                </p>
                <p className="product-panel__offer">{product.offer}</p>
                <div className="product-panel__actions">
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--text"
                    data-cursor="Ver"
                    data-cursor-theme={index === 0 ? 'unificalo' : index === 1 ? 'citaly' : 'leads'}
                    data-product-id={product.id}
                    data-product-name={product.name}
                  >
                    {product.ctaLabel}
                    <ArrowUpRight />
                  </a>
                  <a
                    href={productWhatsAppUrl(product.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--ink"
                    data-cursor="WhatsApp"
                    data-cursor-theme={index === 0 ? 'unificalo' : index === 1 ? 'citaly' : 'leads'}
                  >
                    Conversar
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
              <ProductVisual index={index} />
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
