import Image from 'next/image'
import { Fragment, type CSSProperties } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { ContactBand } from '@/components/ContactBand'
import { Reveal } from '@/components/Reveal'
import { ServiceSystem } from '@/components/ServiceSystem'
import { TypingLine } from '@/components/TypingLine'
import { products, WHATSAPP_URL } from '@/lib/site'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

const heroSummaryServices = [
  { title: 'Sitios web', theme: 'web' },
  { title: 'Software', theme: 'software' },
  { title: 'Automatizaciones', theme: 'automation' },
  { title: 'IA a medida', theme: 'ai' },
]

const heroSummaryProducts = [
  { title: 'Unifícalo', theme: 'unificalo' },
  { title: 'Citaly', theme: 'citaly' },
  { title: 'Leads', theme: 'leads' },
]

const heroSummaryPlatforms = [
  { title: 'WhatsApp', theme: 'wa' },
  { title: 'Shopify', theme: 'shopify' },
  { title: 'Bsale', theme: 'bsale' },
  { title: 'Datos / CRM', theme: 'crm' },
]

const summaryMap = {
  width: 720,
  height: 560,
  core: { x: 360, y: 238, r: 85 },
  services: {
    label: { x: 46, y: 36, w: 180 },
    cluster: { x: 46, y: 104, w: 192, h: 240 },
    rows: [134, 194, 254, 314],
    branchStartX: 238,
    trunkX: 252,
    connectionY: 238,
  },
  products: {
    label: { x: 494, y: 36, w: 180 },
    cluster: { x: 494, y: 97, w: 180, h: 270 },
    rows: [142, 232, 322],
    trunkX: 468,
    branchEndX: 494,
  },
  platforms: {
    label: { x: 274, y: 336, w: 172, h: 48 },
    lineY: 384,
    itemTopY: 414,
    itemW: 96,
    centers: [148, 252, 468, 572],
  },
  flow: { x: 72, y: 510, w: 576, h: 48 },
}

function summaryPercent(value: number, axis: 'x' | 'y') {
  const size = axis === 'x' ? summaryMap.width : summaryMap.height
  return `${(value / size) * 100}%`
}

function summaryBoxStyle(box: { x: number; y: number; w?: number; h?: number }) {
  return {
    '--summary-x': summaryPercent(box.x, 'x'),
    '--summary-y': summaryPercent(box.y, 'y'),
    ...(box.w ? { '--summary-w': summaryPercent(box.w, 'x') } : {}),
    ...(box.h ? { '--summary-h': summaryPercent(box.h, 'y') } : {}),
  } as CSSProperties
}

function summaryPointStyle(x: number, y: number, w?: number) {
  return {
    '--summary-x': summaryPercent(x, 'x'),
    '--summary-y': summaryPercent(y, 'y'),
    ...(w ? { '--summary-w': summaryPercent(w, 'x') } : {}),
  } as CSSProperties
}

const clientProofs = [
  {
    client: 'Propinvest',
    href: 'https://propinvest.cl/',
    mark: 'Propinvest',
    logo: 'propinvest',
    sector: 'Inmobiliario',
    project: 'Plataforma inmobiliaria autoadministrable',
    system: 'Catálogo editable + contenido comercial + contacto',
    result: 'Un canal que el equipo puede actualizar sin depender de cambios manuales.',
    proof: 'Base desarrollada por IAenBlanco para mostrar propiedades, fichas y contenido comercial desde un sistema editable.',
  },
  {
    client: 'Granja Magdalena',
    href: 'https://granjamagdalena.cl/',
    mark: 'Granja Magdalena',
    logo: 'granja-magdalena',
    sector: 'E-commerce',
    project: 'E-commerce e integraciones',
    system: 'Canal digital + catálogo + operación comercial',
    result: 'Una presencia preparada para vender, ordenar oferta y sostener crecimiento.',
    proof: 'Canal trabajado por IAenBlanco para ordenar catálogo, venta online y operación comercial.',
  },
  {
    client: 'YoMeEncargo',
    href: 'https://yomeencargo.cl/',
    mark: 'YoMeEncargo',
    logo: 'yomercargo',
    sector: 'Servicios',
    project: 'Plataforma y experiencia comercial digital',
    system: 'Servicio explicado + flujo comercial + solicitud entrante',
    result: 'Una interfaz que convierte una oferta amplia en una experiencia fácil de entender.',
    proof: 'Experiencia creada por IAenBlanco para explicar servicios, ordenar flujo y facilitar conversión.',
  },
  {
    client: 'Granja Magdalena Pet',
    href: 'https://granjamagdalenapet.cl/',
    mark: 'GM Pet',
    logo: 'granjapet',
    logoTone: 'dark',
    sector: 'Mascotas',
    project: 'Canal digital especializado',
    system: 'Línea de negocio + canal propio + venta especializada',
    result: 'Un espacio diferenciado para comunicar y vender una categoría específica.',
    proof: 'Línea especializada con presencia propia para comunicar y vender una categoría específica.',
  },
  {
    client: 'Inasec Pets',
    href: 'https://inasecpets.cl/',
    mark: 'Inasec Pets',
    logo: 'inasec-pets',
    sector: 'Retail especializado',
    project: 'Presencia comercial digital',
    system: 'Oferta clara + captura de interés + contacto',
    result: 'Una base web para explicar oferta y abrir conversaciones comerciales.',
    proof: 'Presencia web enfocada en comunicar oferta y capturar interés comercial.',
  },
]

const trustSignals = [
  { value: '5 sitios', label: 'de clientes en linea hoy: puedes abrirlos y revisarlos uno por uno' },
  { value: '4 rubros', label: 'inmobiliario, e-commerce, servicios y retail especializado' },
  { value: '3 productos', label: 'Unificalo, Citaly y Leads, funcionando y contratables por separado' },
]

const problemCards = [
  {
    title: 'Procesos manuales',
    detail: 'La operación depende de planillas y tareas repetidas.',
    response: 'Automatizamos el flujo y dejamos trazabilidad.',
    icon: 'automation',
  },
  {
    title: 'Sistemas desconectados',
    detail: 'La información se copia entre herramientas.',
    response: 'Conectamos datos, APIs y canales comerciales.',
    icon: 'software',
  },
  {
    title: 'Poca visibilidad',
    detail: 'El equipo decide sin información centralizada.',
    response: 'Creamos paneles, reglas y estados claros.',
    icon: 'business',
  },
  {
    title: 'Web que no convierte',
    detail: 'La página no explica ni mueve al contacto.',
    response: 'Diseñamos experiencias que guían a conversar.',
    icon: 'web',
  },
  {
    title: 'IA sin operación',
    detail: 'La idea existe, pero no está conectada al negocio.',
    response: 'Construimos agentes conectados a contexto real.',
    icon: 'ai',
  },
]

const productRows = [
  {
    id: 'unificalo',
    theme: 'unificalo',
    name: 'Unifícalo',
    category: 'E-commerce multicanal',
    problem: 'Vendiste lo mismo dos veces. El reembolso y la disculpa los pones tú.',
    promise: 'Tu stock, precios y documentos se mantienen coordinados en todos tus canales.',
    steps: [
      { label: 'Recibe', title: 'Bsale o sistema principal', detail: 'Stock, precios y documentos', theme: 'bsale' },
      { label: 'Procesa', title: 'Sincroniza la operación', detail: 'Actualiza la información', theme: 'automation' },
      { label: 'Entrega', title: 'Canales coordinados', detail: 'Shopify y marketplaces', theme: 'shopify' },
    ],
    benefits: ['Menos sobreventas.', 'Precios consistentes.', 'Documentos centralizados.'],
    href: 'https://unificalo.cl',
  },
  {
    id: 'citaly',
    theme: 'citaly',
    name: 'Citaly',
    category: 'Agenda + agente IA',
    problem: 'El WhatsApp suena mientras tienes un cliente al frente. Uno de los dos espera.',
    promise: 'Tu WhatsApp responde y convierte consultas en reservas mientras tú atiendes.',
    steps: [
      { label: 'Recibe', title: 'Consultas por WhatsApp', detail: 'Texto y audios', theme: 'wa' },
      { label: 'Procesa', title: 'Entiende y revisa agenda', detail: 'Agente de IA', theme: 'ai' },
      { label: 'Entrega', title: 'Horario y reserva', detail: 'Agenda y confirmación', theme: 'software' },
    ],
    benefits: ['Entiende textos y audios.', 'Consulta disponibilidad real.', 'Confirma y recuerda reservas.'],
    href: 'https://citaly.cl',
  },
  {
    id: 'leads',
    theme: 'leads',
    name: 'Leads',
    category: 'Prospección B2B',
    problem: 'Buscar empresas a mano se come la mañana y no sabes cuáles valen la pena.',
    promise: 'Encuentra empresas reales y prioriza a quién contactar antes de iniciar el seguimiento.',
    steps: [
      { label: 'Recibe', title: 'Mercado objetivo', detail: 'Rubro, zona y perfil', theme: 'business' },
      { label: 'Procesa', title: 'Busca y prioriza', detail: 'Evidencia y scoring', theme: 'leads' },
      { label: 'Entrega', title: 'Empresas ordenadas', detail: 'Pipeline y seguimiento', theme: 'automation' },
    ],
    benefits: ['Evidencia pública.', 'Scoring comercial.', 'Pipeline ordenado.'],
    href: 'https://leads.iaenblanco.com',
  },
]

function HeroLogo({ theme }: { theme: string }) {
  if (theme === 'unificalo') {
    return <BrandLogo name="unificalo" className="hero-logo hero-logo--brand hero-logo--unificalo-real" sizes="64px" />
  }

  if (theme === 'citaly') {
    return <BrandLogo name="citaly-mark" className="hero-logo hero-logo--brand hero-logo--citaly-real" sizes="64px" />
  }

  if (theme === 'wa') {
    return (
      <svg className="hero-logo hero-logo--wa" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 51.5 20.6 42A20 20 0 1 1 29 46.1Z" />
        <path d="M25.5 23.2c.7-1.5 1.3-1.6 2.2-1.6h1.6c.5 0 1 .1 1.3 1 .4 1 .9 3 1 3.3.2.4.1.8-.2 1.2l-1.2 1.4c-.4.4-.7.8-.3 1.5a17 17 0 0 0 3.1 3.9 14 14 0 0 0 4.5 2.8c.7.3 1.1.2 1.5-.3l1.8-2.1c.4-.6.9-.5 1.5-.3l3.2 1.5c1 .4 1 .7.9 1.1-.2 1.5-1.5 3.6-3 4.1-1.6.6-7.4.5-13.1-5.1-5-5-6.1-9.3-5.7-11.1.2-.7.5-1.3.9-1.9Z" />
      </svg>
    )
  }

  if (theme === 'shopify') {
    return (
      <svg className="hero-logo hero-logo--shopify" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M20 21.5h29l-3.3 28.7L21.8 54Z" />
        <path d="M26.5 21.5c.9-7 4.3-11.2 8.8-11.2 4.4 0 7 4.1 6.6 11.2" />
        <path d="M31 35.8c1.2 1.1 2.8 1.7 4.6 1.7 2 0 3.4-.8 3.4-2.2 0-3.4-8.3-1.7-8.3-7.2 0-3 2.5-5 6.1-5 1.9 0 3.6.5 4.9 1.5" />
      </svg>
    )
  }

  if (theme === 'bsale') {
    return (
      <svg className="hero-logo hero-logo--bsale" viewBox="0 0 72 64" aria-hidden="true">
        <path d="M19 18h14c10.5 0 18.5 6.8 18.5 16.1S43.5 50 33 50H19Z" />
        <path d="M30 26h4.2c4.9 0 8 3.3 8 8s-3.1 8-8 8H30Z" />
      </svg>
    )
  }

  if (theme === 'meli') {
    return (
      <svg className="hero-logo hero-logo--meli" viewBox="0 0 72 64" aria-hidden="true">
        <ellipse cx="36" cy="27" rx="24" ry="15" />
        <path d="M22 27c5.5-5.8 9.9-6.2 14.4-1.1 4.8-5 9.4-4.7 13.6 1" />
        <path d="M25.5 30.8c4.7 4.3 9.4 4.7 14.2.1" />
      </svg>
    )
  }

  if (theme === 'unificalo') {
    return (
      <svg className="hero-logo hero-logo--unificalo" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 12v28c0 9.2 6.3 15.5 14 15.5S46 49.2 46 40V12" />
        <path d="M18 12h10v27.5c0 2.8 1.5 5.5 4 6.9 2.5-1.4 4-4.1 4-6.9V12h10" />
      </svg>
    )
  }

  if (theme === 'citaly') {
    return (
      <svg className="hero-logo hero-logo--citaly" viewBox="0 0 72 64" aria-hidden="true">
        <rect x="12" y="12" width="48" height="40" rx="12" />
        <path d="M43 24.5a10 10 0 1 0 0 15" />
      </svg>
    )
  }

  if (theme === 'leads') {
    return (
      <svg className="hero-logo hero-logo--leads" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 46V18" />
        <path d="M18 46h30" />
        <path d="M24 40 33 30l6 5 9-14" />
        <circle cx="24" cy="40" r="3" />
        <circle cx="33" cy="30" r="3" />
        <circle cx="39" cy="35" r="3" />
        <circle cx="48" cy="21" r="3" />
      </svg>
    )
  }

  if (theme === 'web') {
    return (
      <svg className="hero-logo hero-logo--web" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="13" y="16" width="38" height="30" rx="4" />
        <path d="M13 25h38" />
        <path d="M22 36h12" />
        <path d="M22 41h20" />
        <circle cx="21" cy="21" r="1.5" />
        <circle cx="27" cy="21" r="1.5" />
      </svg>
    )
  }

  if (theme === 'software') {
    return (
      <svg className="hero-logo hero-logo--software" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="14" y="16" width="15" height="15" rx="3" />
        <rect x="35" y="16" width="15" height="15" rx="3" />
        <rect x="14" y="37" width="15" height="15" rx="3" />
        <rect x="35" y="37" width="15" height="15" rx="3" />
        <path d="M29 23.5h6M29 44.5h6M21.5 31v6M42.5 31v6" />
      </svg>
    )
  }

  if (theme === 'automation') {
    return (
      <svg className="hero-logo hero-logo--automation" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 24h23" />
        <path d="m37 18 7 6-7 6" />
        <path d="M46 40H23" />
        <path d="m27 34-7 6 7 6" />
        <circle cx="18" cy="24" r="4" />
        <circle cx="46" cy="40" r="4" />
      </svg>
    )
  }

  if (theme === 'ai') {
    return (
      <svg className="hero-logo hero-logo--ai" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 13v38" />
        <path d="M18 24c5 0 9-4 9-9" />
        <path d="M46 24c-5 0-9-4-9-9" />
        <path d="M18 40c5 0 9 4 9 9" />
        <path d="M46 40c-5 0-9 4-9 9" />
        <circle cx="32" cy="32" r="9" />
        <circle cx="20" cy="24" r="3" />
        <circle cx="44" cy="24" r="3" />
        <circle cx="20" cy="40" r="3" />
        <circle cx="44" cy="40" r="3" />
      </svg>
    )
  }

  if (theme === 'magnet') {
    return (
      <svg className="hero-logo hero-logo--magnet" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M22 18v16c0 7 4 11 10 11s10-4 10-11V18" />
        <path d="M22 18h8v16c0 2 1 3 2 3s2-1 2-3V18h8" />
        <path d="M18 51h28" />
        <circle cx="49" cy="24" r="4" />
        <circle cx="15" cy="39" r="3" />
      </svg>
    )
  }

  if (theme === 'stock') {
    return (
      <svg className="hero-logo hero-logo--stock" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M16 26 32 16l16 10-16 10Z" />
        <path d="M16 26v16l16 10 16-10V26" />
        <path d="M32 36v16" />
      </svg>
    )
  }

  if (theme === 'price') {
    return (
      <svg className="hero-logo hero-logo--price" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 19h17l12 12-18 18-23-23Z" transform="translate(2)" />
        <circle cx="28" cy="27" r="3" />
        <path d="M38 36c-2.4-2.1-7.7-2.2-7.7 1.3 0 4.4 8.9 2.4 8.9 7 0 3.7-5.6 4.2-8.8 1.5" />
        <path d="M34.5 32.5v16" />
      </svg>
    )
  }

  if (theme === 'dte') {
    return (
      <svg className="hero-logo hero-logo--dte" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M20 12h18l10 10v30H20Z" />
        <path d="M38 12v11h10" />
        <path d="M26 31h16M26 38h16M26 45h10" />
      </svg>
    )
  }

  if (theme === 'crm') {
    return (
      <svg className="hero-logo hero-logo--crm" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="24" cy="24" r="7" />
        <circle cx="42" cy="25" r="6" />
        <path d="M12 49c2-9 7.4-13 12-13s10 4 12 13" />
        <path d="M34 47c1.4-6.8 5.4-10 9-10 4.3 0 8 3.8 9 10" />
      </svg>
    )
  }

  if (theme === 'business') {
    return (
      <svg className="hero-logo hero-logo--business" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M14 52V20h16v32" />
        <path d="M34 52V12h16v40" />
        <path d="M10 52h44" />
        <path d="M20 28h4M20 36h4M40 21h4M40 29h4M40 37h4" />
      </svg>
    )
  }

  if (theme === 'process') {
    return (
      <svg className="hero-logo hero-logo--process" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="24" cy="32" r="8" />
        <circle cx="42" cy="24" r="6" />
        <circle cx="43" cy="43" r="5" />
        <path d="M31 29 37 26M31 36l8 5" />
      </svg>
    )
  }

  if (theme === 'platforms') {
    return (
      <svg className="hero-logo hero-logo--platforms" viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="17" rx="15" ry="6" />
        <path d="M17 17v24c0 3.3 6.7 6 15 6s15-2.7 15-6V17" />
        <path d="M17 29c0 3.3 6.7 6 15 6s15-2.7 15-6" />
      </svg>
    )
  }

  if (theme === 'ai-system') {
    return (
      <svg className="hero-logo hero-logo--ai-system" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="17" y="17" width="30" height="30" rx="6" />
        <path d="M24 32h16M32 24v16" />
        <path d="M22 10v7M32 10v7M42 10v7M22 47v7M32 47v7M42 47v7M10 22h7M10 32h7M10 42h7M47 22h7M47 32h7M47 42h7" />
      </svg>
    )
  }

  return (
    <svg className="hero-logo hero-logo--services" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 14v36" />
      <path d="M14 32h36" />
      <path d="M20 20 44 44" />
      <path d="M44 20 20 44" />
      <circle cx="32" cy="32" r="8" />
      <circle cx="32" cy="14" r="4" />
      <circle cx="50" cy="32" r="4" />
      <circle cx="32" cy="50" r="4" />
      <circle cx="14" cy="32" r="4" />
    </svg>
  )
}

function HeroSummaryMap() {
  const serviceCoreX = summaryMap.core.x - summaryMap.core.r
  const productCoreX = summaryMap.core.x + summaryMap.core.r
  const coreBottomY = summaryMap.core.y + summaryMap.core.r
  const serviceRows = heroSummaryServices
  const productRows = heroSummaryProducts
  const platformRows = heroSummaryPlatforms.map((item, index) => ({
    ...item,
    x: summaryMap.platforms.centers[index],
  }))
  const lastServiceRow = summaryMap.services.rows[summaryMap.services.rows.length - 1]
  const lastProductRow = summaryMap.products.rows[summaryMap.products.rows.length - 1]
  const lastPlatformCenter = summaryMap.platforms.centers[summaryMap.platforms.centers.length - 1]

  return (
    <div className="hero-summary-map" aria-label="IAenBlanco conecta servicios, plataformas y productos">
      <svg className="hero-summary-map__wires" viewBox="0 0 720 560" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <circle className="summary-ring" cx={summaryMap.core.x} cy={summaryMap.core.y} r="105" />
        <circle className="summary-ring summary-ring--outer" cx={summaryMap.core.x} cy={summaryMap.core.y} r="132" />

        <path
          className="summary-wire summary-wire--services summary-wire--trunk"
          d={`M${summaryMap.services.trunkX} ${summaryMap.services.rows[0]}V${lastServiceRow}`}
        />
        {summaryMap.services.rows.map((y) => (
          <path
            key={`service-branch-${y}`}
            className="summary-wire summary-wire--services summary-wire--branch"
            d={`M${summaryMap.services.branchStartX} ${y}H${summaryMap.services.trunkX}`}
          />
        ))}
        <path
          className="summary-wire summary-wire--services summary-wire--core"
          d={`M${summaryMap.services.trunkX} ${summaryMap.services.connectionY}H${serviceCoreX}`}
        />

        <path
          className="summary-wire summary-wire--products summary-wire--trunk"
          d={`M${summaryMap.products.trunkX} ${summaryMap.products.rows[0]}V${lastProductRow}`}
        />
        {summaryMap.products.rows.map((y) => (
          <path
            key={`product-branch-${y}`}
            className="summary-wire summary-wire--products summary-wire--branch"
            d={`M${summaryMap.products.trunkX} ${y}H${summaryMap.products.branchEndX}`}
          />
        ))}
        <path
          className="summary-wire summary-wire--products summary-wire--core"
          d={`M${productCoreX} ${summaryMap.core.y}H${summaryMap.products.trunkX}`}
        />

        <path
          className="summary-wire summary-wire--connections summary-wire--core"
          d={`M${summaryMap.core.x} ${coreBottomY}V${summaryMap.platforms.label.y}`}
        />
        <path
          className="summary-wire summary-wire--connections summary-wire--trunk"
          d={`M${summaryMap.platforms.centers[0]} ${summaryMap.platforms.lineY}H${summaryMap.platforms.label.x}`}
        />
        <path
          className="summary-wire summary-wire--connections summary-wire--trunk"
          d={`M${summaryMap.platforms.label.x + summaryMap.platforms.label.w} ${summaryMap.platforms.lineY}H${lastPlatformCenter}`}
        />
        {summaryMap.platforms.centers.map((x) => (
          <path
            key={`platform-branch-${x}`}
            className="summary-wire summary-wire--connections summary-wire--branch"
            d={`M${x} ${summaryMap.platforms.lineY}V${summaryMap.platforms.itemTopY}`}
          />
        ))}

        <g className="summary-transfer-layer">
          <path
            className="summary-transfer summary-transfer--services summary-transfer--slow"
            d={`M${summaryMap.services.trunkX} ${summaryMap.services.rows[0]}V${lastServiceRow}`}
          />
          <path
            className="summary-transfer summary-transfer--services"
            d={`M${summaryMap.services.trunkX} ${summaryMap.services.connectionY}H${serviceCoreX}`}
          />
          {summaryMap.services.rows.map((y) => (
            <path
              key={`service-transfer-${y}`}
              className="summary-transfer summary-transfer--services"
              d={`M${summaryMap.services.branchStartX} ${y}H${summaryMap.services.trunkX}`}
            />
          ))}
          <path
            className="summary-transfer summary-transfer--products summary-transfer--slow"
            d={`M${summaryMap.products.trunkX} ${summaryMap.products.rows[0]}V${lastProductRow}`}
          />
          <path
            className="summary-transfer summary-transfer--products"
            d={`M${productCoreX} ${summaryMap.core.y}H${summaryMap.products.trunkX}`}
          />
          {summaryMap.products.rows.map((y) => (
            <path
              key={`product-transfer-${y}`}
              className="summary-transfer summary-transfer--products"
              d={`M${summaryMap.products.trunkX} ${y}H${summaryMap.products.branchEndX}`}
            />
          ))}
          <path
            className="summary-transfer summary-transfer--connections"
            d={`M${summaryMap.core.x} ${coreBottomY}V${summaryMap.platforms.label.y}`}
          />
          <path
            className="summary-transfer summary-transfer--connections summary-transfer--slow"
            d={`M${summaryMap.platforms.centers[0]} ${summaryMap.platforms.lineY}H${summaryMap.platforms.label.x}`}
          />
          <path
            className="summary-transfer summary-transfer--connections summary-transfer--slow"
            d={`M${summaryMap.platforms.label.x + summaryMap.platforms.label.w} ${summaryMap.platforms.lineY}H${lastPlatformCenter}`}
          />
        </g>

        <g className="summary-wire__nodes">
          <circle className="summary-node summary-node--services" cx={serviceCoreX} cy={summaryMap.services.connectionY} r="4" />
          <circle className="summary-node summary-node--products" cx={productCoreX} cy={summaryMap.core.y} r="4" />
          <circle className="summary-node summary-node--connections" cx={summaryMap.core.x} cy={coreBottomY} r="4" />
        </g>
      </svg>

      <div
        className="hero-summary-map__core"
        style={summaryPointStyle(summaryMap.core.x, summaryMap.core.y)}
      >
        <Image src="/logo-ui.webp" alt="" width={220} height={220} priority unoptimized />
      </div>

      <div
        className="summary-system-label summary-system-label--services"
        style={summaryBoxStyle(summaryMap.services.label)}
      >
        <span>Entrada</span>
        <strong>Servicios</strong>
      </div>
      <div
        className="summary-system-label summary-system-label--products"
        style={summaryBoxStyle(summaryMap.products.label)}
      >
        <span>Salida</span>
        <strong>Productos</strong>
      </div>
      <div
        className="summary-system-label summary-system-label--platforms"
        style={summaryBoxStyle(summaryMap.platforms.label)}
      >
        <span>Conecta</span>
        <strong>Plataformas</strong>
      </div>

      <div
        className="summary-node-cluster summary-node-cluster--services"
        style={summaryBoxStyle(summaryMap.services.cluster)}
      >
        {serviceRows.map((item, index) => (
          <div
            key={item.title}
            className={`summary-orb summary-orb--service summary-orb--${item.theme}`}
            style={{ '--node-index': index } as CSSProperties}
          >
            <span><HeroLogo theme={item.theme} /></span>
            <strong>{item.title}</strong>
          </div>
        ))}
      </div>

      <div
        className="summary-node-cluster summary-node-cluster--products"
        style={summaryBoxStyle(summaryMap.products.cluster)}
      >
        {productRows.map((item, index) => (
          <div
            key={item.title}
            className={`summary-orb summary-orb--product summary-orb--${item.theme}`}
            style={{ '--node-index': index } as CSSProperties}
          >
            <span><HeroLogo theme={item.theme} /></span>
            <strong>{item.title}</strong>
          </div>
        ))}
      </div>

      <div className="summary-platform-cluster">
        {platformRows.map((item, index) => (
          <div
            key={item.title}
            className={`summary-platform summary-platform--${item.theme}`}
            style={{
              ...summaryPointStyle(item.x, summaryMap.platforms.itemTopY, summaryMap.platforms.itemW),
              '--node-index': index,
            } as CSSProperties}
          >
            <span><HeroLogo theme={item.theme} /></span>
            <strong>{item.title}</strong>
          </div>
        ))}
      </div>

      <div className="summary-flow" style={summaryBoxStyle(summaryMap.flow)}>
        <span>Negocio</span>
        <i />
        <span>Procesos</span>
        <i />
        <span>Sistemas inteligentes</span>
      </div>

      <a href="#servicios" className="hero-summary-map__explore" data-cursor="Servicios">
        Ver capacidades
        <ArrowDown />
      </a>
    </div>
  )
}

function TrustProofSection() {
  return (
    <section className="trust-proof" aria-labelledby="trust-proof-heading">
      <div className="section-shell trust-proof__grid">
        <Reveal className="trust-proof__copy">
          <p className="eyebrow">Prueba real</p>
          <h2 id="trust-proof-heading">
            Empresas y operaciones que ya hemos ayudado a digitalizar.
          </h2>
          <p>
            Sitios y sistemas desarrollados por IAenBlanco alrededor de necesidades
            concretas de operación.
          </p>
        </Reveal>

        <Reveal className="trust-proof__proofs" delay={80}>
          {clientProofs.slice(0, 3).map((proof) => (
            <article className="trust-proof-card" key={proof.client}>
              <div
                className={`trust-proof-card__mark${proof.logoTone === 'dark' ? ' trust-proof-card__mark--dark' : ''}`}
              >
                {proof.logo ? (
                  <BrandLogo name={proof.logo} alt={proof.client} className="trust-proof-card__logo" />
                ) : (
                  <span>{proof.mark}</span>
                )}
              </div>
              <div className="trust-proof-card__body">
                <p className="trust-proof-card__sector">{proof.sector}</p>
                <h3>{proof.client}</h3>
                <strong>{proof.project}</strong>
                <div className="trust-proof-card__evidence">
                  <div>
                    <span>Sistema</span>
                    <p>{proof.system}</p>
                  </div>
                  <div>
                    <span>Desarrollo</span>
                    <p>{proof.proof}</p>
                  </div>
                </div>
                <a
                  href={proof.href}
                  target="_blank"
                  rel="noreferrer"
                  className="trust-proof-card__link"
                  data-cursor="Ver"
                  data-analytics-event="service_case_click"
                  data-case-name={proof.client}
                >
                  Ver el sitio de {proof.client}
                  <ArrowUpRight />
                </a>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className="trust-proof__logos" delay={120}>
          <p>También aplicado en líneas especializadas</p>
          <div>
            {clientProofs.slice(3).map((proof) => (
              <article key={proof.client}>
                <span
                  className={`trust-proof-card__mark${proof.logoTone === 'dark' ? ' trust-proof-card__mark--dark' : ''}`}
                >
                  {proof.logo ? (
                    <BrandLogo name={proof.logo} alt={proof.client} className="trust-proof-card__logo" />
                  ) : (
                    <span>{proof.mark}</span>
                  )}
                </span>
                <strong>{proof.client}</strong>
                <p>{proof.proof}</p>
                <a
                  href={proof.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Ver"
                  data-analytics-event="service_case_click"
                  data-case-name={proof.client}
                >
                  Ver sitio
                  <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="trust-proof__signals" delay={140}>
          {trustSignals.map((signal) => (
            <div key={signal.value}>
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="problem-strip" aria-labelledby="problem-strip-heading">
      <div className="section-shell problem-strip__inner">
        <Reveal className="problem-strip__heading">
          <p className="eyebrow">Problemas que resolvemos</p>
          <h2 id="problem-strip-heading">
            Cuando la operación crece, la tecnología tiene que ordenar.
          </h2>
        </Reveal>
        <div className="problem-strip__grid">
          {problemCards.map((problem, index) => (
            <Reveal key={problem.title} className="problem-card" delay={index * 60}>
              <div className="problem-card__top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true"><HeroLogo theme={problem.icon} /></i>
              </div>
              <strong>{problem.title}</strong>
              <p>{problem.detail}</p>
              <div className="problem-card__response">
                <span>Respuesta IAenBlanco</span>
                <p>{problem.response}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductFlowUnit({
  label,
  title,
  detail,
  theme,
}: {
  label: string
  title: string
  detail: string
  theme: string
}) {
  return (
    <div className="product-unified__unit">
      <span className="product-unified__unit-icon"><HeroLogo theme={theme} /></span>
      <div>
        <span>{label}</span>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
    </div>
  )
}

function FlowArrow() {
  return (
    <span className="product-unified__arrow" aria-hidden="true">
      <svg viewBox="0 0 34 12" fill="none">
        <path d="M1 6h30m-5-5 6 5-6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function ProductLabSection() {
  return (
    <section className="ecosystem-lab" aria-labelledby="ecosystem-heading">
      <div className="section-shell ecosystem-lab__intro">
        <Reveal>
          <p className="eyebrow">Productos propios</p>
        </Reveal>
        <Reveal className="ecosystem-lab__heading">
          <h2 id="ecosystem-heading">
            Productos que convierten operaciones reales en sistemas.
          </h2>
          <p>
            Unifícalo, Citaly y Leads resuelven tres operaciones distintas: sincronizar
            canales, atender y agendar, y encontrar oportunidades comerciales. Los tres
            están funcionando y los tres se contratan solos, sin pasar por nosotros.
          </p>
        </Reveal>
      </div>

      <div className="section-shell product-unified" aria-label="Productos propios y flujos operativos">
        {productRows.map((product, index) => {
          const commercial = products.find((item) => item.id === product.id)

          return (
          <Reveal
            key={product.id}
            className={`product-unified__row product-unified__row--${product.theme}`}
            delay={index * 90}
          >
            <article style={{ '--product-index': index } as CSSProperties}>
              <div className="product-unified__identity">
                <div className="product-unified__meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{product.category}</p>
                  <strong>{commercial?.status}</strong>
                </div>
                <div className="product-unified__brand">
                  <i><HeroLogo theme={product.theme} /></i>
                  <div>
                    <h3>{product.name}</h3>
                  </div>
                  <p>{product.problem}</p>
                </div>
              </div>

              <div className="product-unified__flow" aria-label={`${product.name}: entrada, proceso y salida`}>
                {product.steps.map((step, stepIndex) => (
                  <Fragment key={step.label}>
                    <ProductFlowUnit {...step} />
                    {stepIndex < product.steps.length - 1 ? <FlowArrow /> : null}
                  </Fragment>
                ))}
              </div>

              <div className="product-unified__result">
                <span>Resultado</span>
                <p className="product-unified__promise">{product.promise}</p>
                <ul className="product-unified__benefits" aria-label={`Beneficios de ${product.name}`}>
                  {product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                </ul>

                <p className="product-unified__status">
                  <span>{commercial?.status}</span>
                  {commercial?.statusMeaning}
                </p>
                <p className="product-unified__offer">{commercial?.offer}</p>

                <a
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="product-unified__cta"
                  data-cursor="Ver"
                  data-cursor-theme={product.theme}
                  data-product-id={product.id}
                  data-product-name={product.name}
                  data-section="Productos propios"
                >
                  {commercial?.ctaLabel}
                  <ArrowUpRight />
                </a>
              </div>
            </article>
          </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main id="contenido">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="section-shell home-hero__inner">
          <div className="home-hero__content">
            <p className="hero-kicker">
              <span />
              Sitios web · Software a medida · Automatización · IA · Prospección B2B
            </p>
            <h1 id="home-title">
              La IA deja de ser promesa.
              <em>Empieza a operar.</em>
            </h1>
            <p className="home-hero__summary">
              Construimos sitios web, software a medida, automatizaciones y agentes de
              IA para empresas en Chile. Y los dejamos funcionando.
            </p>
            <div className="home-hero__actions">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="button button--primary"
                data-cursor="WhatsApp"
                data-cursor-theme="signal"
              >
                Cuéntanos tu idea
                <ArrowUpRight />
              </a>
              <a href="#servicios" className="button button--text">
                Explorar capacidades
                <ArrowDown />
              </a>
            </div>
            <TypingLine />
          </div>

          <div className="home-hero__visual">
            <HeroSummaryMap />
          </div>
        </div>
        <div className="home-hero__index section-shell">
          <span>5 sitios de clientes en línea</span>
          <span>3 productos propios contratables</span>
          <span>Santiago · Chile</span>
        </div>
      </section>

      <TrustProofSection />

      <ProblemSection />

      <ServiceSystem />

      <ProductLabSection />

      <section className="operating-model" aria-labelledby="model-heading">
        <div className="section-shell">
          <Reveal className="operating-model__heading">
            <p className="eyebrow">Cómo trabajamos</p>
            <div>
              <h2 id="model-heading">De una necesidad abierta a un sistema funcionando.</h2>
              <p className="operating-model__copy">
                La tecnología importa. Lo que cambia tu operación, más. Por eso
                primero entendemos el problema, después construimos la capa exacta
                y finalmente acompañamos su puesta en marcha.
              </p>
            </div>
          </Reveal>

          <div className="operating-model__steps">
            {[
              {
                number: '01',
                title: 'Entender',
                text: 'Mapeamos el desafío, la operación y las restricciones antes de elegir una solución.',
                deliverable: 'Mapa de problema y alcance',
              },
              {
                number: '02',
                title: 'Construir',
                text: 'Diseñamos y desarrollamos la capa exacta: interfaz, backend, integración o IA.',
                deliverable: 'Prototipo, sistema y conexiones',
              },
              {
                number: '03',
                title: 'Operar',
                text: 'Ponemos el sistema en marcha y lo acompañamos con soporte o evolución continua.',
                deliverable: 'Puesta en marcha y mejora continua',
              },
            ].map((step, index) => (
              <Reveal key={step.number} className="operating-step" delay={index * 90}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <strong>{step.deliverable}</strong>
              </Reveal>
            ))}
          </div>

          <Reveal className="industry-line">
            <p>Experiencia aplicada en</p>
            <div>
              <span>E-commerce</span>
              <span>Logística</span>
              <span>Inmobiliario</span>
              <span>Negocios con agenda</span>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </main>
  )
}
