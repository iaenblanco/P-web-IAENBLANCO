import Image from 'next/image'
import { Fragment, type CSSProperties } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { ContactBand } from '@/components/ContactBand'
import { Reveal } from '@/components/Reveal'
import { ServiceSystem } from '@/components/ServiceSystem'
import { TypingLine } from '@/components/TypingLine'
import { WHATSAPP_URL } from '@/lib/site'

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

const heroServiceNodes = [
  { name: 'Sitios web', theme: 'web', x: '18%', y: '22%', point: [112, 122] },
  { name: 'Software', theme: 'software', x: '18%', y: '41%', point: [112, 228] },
  { name: 'Automatizacion', theme: 'automation', x: '18%', y: '60%', point: [112, 334] },
  { name: 'IA a medida', theme: 'ai', x: '18%', y: '79%', point: [112, 440] },
]

const heroPlatformNodes = [
  { name: 'Shopify', theme: 'shopify', x: '39%', y: '30%', point: [242, 166] },
  { name: 'Mercado Libre', theme: 'meli', x: '61%', y: '30%', point: [378, 166] },
  { name: 'Bsale', theme: 'bsale', x: '39%', y: '70%', point: [242, 394] },
  { name: 'WhatsApp', theme: 'wa', x: '61%', y: '70%', point: [378, 394] },
]

const heroProductNodes = [
  { name: 'Unificalo', theme: 'unificalo', x: '82%', y: '25%', point: [508, 138] },
  { name: 'Citaly', theme: 'citaly', x: '82%', y: '50%', point: [508, 280] },
  { name: 'Leads', theme: 'leads', x: '82%', y: '75%', point: [508, 422] },
]

const heroFlowPaths = [
  { id: 'service-web', lane: 'service', d: 'M112 122 C176 122 218 202 286 258' },
  { id: 'service-software', lane: 'service', d: 'M112 228 C178 228 222 248 286 272' },
  { id: 'service-automation', lane: 'service', d: 'M112 334 C178 334 222 312 286 288' },
  { id: 'service-ai', lane: 'service', d: 'M112 440 C176 440 218 358 286 302' },
  { id: 'platform-shopify', lane: 'platform', d: 'M242 166 C278 190 298 224 305 252' },
  { id: 'platform-meli', lane: 'platform', d: 'M378 166 C342 190 322 224 315 252' },
  { id: 'platform-bsale', lane: 'platform', d: 'M242 394 C278 370 298 336 305 308' },
  { id: 'platform-wa', lane: 'platform', d: 'M378 394 C342 370 322 336 315 308' },
  { id: 'product-unificalo', lane: 'product', d: 'M334 258 C402 202 438 138 508 138' },
  { id: 'product-citaly', lane: 'product', d: 'M342 280 C410 280 450 280 508 280' },
  { id: 'product-leads', lane: 'product', d: 'M334 302 C402 358 438 422 508 422' },
]

const heroServiceCards = [
  { title: 'Sitios web', detail: 'E-commerce y vitrinas', theme: 'web' },
  { title: 'Software', detail: 'Sistemas a medida', theme: 'software' },
  { title: 'Automatizaciones', detail: 'Flujos operativos', theme: 'automation' },
  { title: 'IA a medida', detail: 'Agentes y modelos', theme: 'ai' },
  { title: 'Prospección B2B', detail: 'Servicio gestionado', theme: 'magnet' },
]

const heroProductCards = [
  { title: 'Unifícalo', detail: 'Stock, precios, boletas y canales', theme: 'unificalo' },
  { title: 'Citaly', detail: 'WhatsApp, audios, agenda y reservas', theme: 'citaly' },
  { title: 'Leads', detail: 'Fuentes públicas, evidencia y pipeline', theme: 'leads' },
]

const heroConnectionCards = [
  { title: 'WhatsApp', theme: 'wa' },
  { title: 'Shopify', theme: 'shopify' },
  { title: 'Bsale', theme: 'bsale' },
  { title: 'Mercado Libre', theme: 'meli' },
  { title: 'Stock', theme: 'stock' },
  { title: 'Precios', theme: 'price' },
  { title: 'DTE', theme: 'dte' },
  { title: 'CRM / Datos', theme: 'crm' },
]

const heroProcessSteps = [
  { title: 'Negocio', detail: 'Operaciones reales', theme: 'business' },
  { title: 'Procesos', detail: 'Eficientes y escalables', theme: 'process' },
  { title: 'Plataformas', detail: 'Datos conectados', theme: 'platforms' },
  { title: 'Sistemas inteligentes', detail: 'Automatizan y venden', theme: 'ai-system' },
]

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
    mark: 'Propinvest',
    logo: 'propinvest',
    sector: 'Inmobiliario',
    project: 'Plataforma inmobiliaria autoadministrable',
    system: 'Catálogo editable + contenido comercial + contacto',
    result: 'Un canal que el equipo puede actualizar sin depender de cambios manuales.',
    proof: 'Propiedades, fichas y contenido comercial gestionados desde un sistema editable.',
  },
  {
    client: 'Granja Magdalena',
    mark: 'Granja Magdalena',
    logo: 'granja-magdalena',
    sector: 'E-commerce',
    project: 'E-commerce e integraciones',
    system: 'Canal digital + catálogo + operación comercial',
    result: 'Una presencia preparada para vender, ordenar oferta y sostener crecimiento.',
    proof: 'Catálogo, venta online y operación comercial ordenados en un canal digital.',
  },
  {
    client: 'YoMeEncargo',
    mark: 'YoMeEncargo',
    logo: 'yomercargo',
    sector: 'Servicios',
    project: 'Plataforma y experiencia comercial digital',
    system: 'Servicio explicado + flujo comercial + solicitud entrante',
    result: 'Una interfaz que convierte una oferta amplia en una experiencia fácil de entender.',
    proof: 'Interfaz comercial para explicar servicios, ordenar flujo y facilitar conversión.',
  },
  {
    client: 'Granja Magdalena Pet',
    mark: 'GM Pet',
    logo: 'granjapet',
    logoTone: 'dark',
    sector: 'Mascotas',
    project: 'Canal digital especializado',
    system: 'Línea de negocio + canal propio + venta especializada',
    result: 'Un espacio diferenciado para comunicar y vender una categoría específica.',
    proof: 'Presencia y venta orientada a una línea de negocio específica.',
  },
  {
    client: 'Inasec Pets',
    mark: 'Inasec Pets',
    logo: 'inasec-pets',
    sector: 'Retail especializado',
    project: 'Presencia comercial digital',
    system: 'Oferta clara + captura de interés + contacto',
    result: 'Una base web para explicar oferta y abrir conversaciones comerciales.',
    proof: 'Estructura web para comunicar oferta y capturar interés.',
  },
]

const trustSignals = [
  { value: 'Clientes reales', label: 'proyectos públicos, no solo conceptos internos' },
  { value: 'Sistemas propios', label: 'Unifícalo, Citaly y Leads como laboratorio operativo' },
  { value: 'Operación aplicada', label: 'web, software, automatización e IA conectados' },
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

const systemMapSteps = [
  { title: 'Problema', detail: 'Detectamos la fricción operativa.' },
  { title: 'Conexión', detail: 'Unimos herramientas, datos y canales.' },
  { title: 'Sistema', detail: 'Dejamos una operación funcionando.' },
]

const productRows = [
  {
    id: 'unificalo',
    theme: 'unificalo',
    name: 'Unifícalo',
    category: 'E-commerce multicanal',
    status: 'Piloto abierto',
    problem: 'Vender por varios canales puede desordenar stock, precios y documentos.',
    promise: 'Tu stock, precios y documentos se mantienen coordinados en todos tus canales.',
    steps: [
      { label: 'Recibe', title: 'Bsale o sistema principal', detail: 'Stock, precios y documentos', theme: 'bsale' },
      { label: 'Procesa', title: 'Sincroniza la operación', detail: 'Actualiza la información', theme: 'automation' },
      { label: 'Entrega', title: 'Canales coordinados', detail: 'Shopify y marketplaces', theme: 'shopify' },
    ],
    benefits: ['Menos sobreventas.', 'Precios consistentes.', 'Documentos centralizados.'],
    cta: 'Ver Unifícalo',
    href: 'https://unificalo.cl',
  },
  {
    id: 'citaly',
    theme: 'citaly',
    name: 'Citaly',
    category: 'Agenda + agente IA',
    status: 'Validación comercial',
    problem: 'Responder WhatsApp y coordinar reservas consume tiempo mientras el negocio está atendiendo.',
    promise: 'Tu WhatsApp responde y convierte consultas en reservas mientras tú atiendes.',
    steps: [
      { label: 'Recibe', title: 'Consultas por WhatsApp', detail: 'Texto y audios', theme: 'wa' },
      { label: 'Procesa', title: 'Entiende y revisa agenda', detail: 'Agente de IA', theme: 'ai' },
      { label: 'Entrega', title: 'Horario y reserva', detail: 'Agenda y confirmación', theme: 'software' },
    ],
    benefits: ['Entiende textos y audios.', 'Consulta disponibilidad real.', 'Confirma y recuerda reservas.'],
    cta: 'Ver Citaly',
    href: 'https://citaly.cl',
  },
  {
    id: 'leads',
    theme: 'leads',
    name: 'Leads',
    category: 'Prospección B2B',
    status: 'Acceso piloto',
    problem: 'Encontrar empresas reales y decidir a quién contactar exige demasiada búsqueda manual.',
    promise: 'Encuentra empresas reales y prioriza a quién contactar antes de iniciar el seguimiento.',
    steps: [
      { label: 'Recibe', title: 'Mercado objetivo', detail: 'Rubro, zona y perfil', theme: 'business' },
      { label: 'Procesa', title: 'Busca y prioriza', detail: 'Evidencia y scoring', theme: 'leads' },
      { label: 'Entrega', title: 'Empresas ordenadas', detail: 'Pipeline y seguimiento', theme: 'automation' },
    ],
    benefits: ['Evidencia pública.', 'Scoring comercial.', 'Pipeline ordenado.'],
    cta: 'Ver Leads',
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

function HeroNetwork({ animated = true }: { animated?: boolean }) {
  return (
    <div
      className={`hero-network hero-network--system ${animated ? '' : 'hero-network--static'}`}
      aria-hidden="true"
    >
      <div className="hero-network__stage hero-network__stage--services" />
      <div className="hero-network__stage hero-network__stage--platforms" />
      <div className="hero-network__stage hero-network__stage--products" />
      <div className="hero-network__rings">
        <span />
        <span />
        <span />
      </div>
      <svg className="hero-network__paths" viewBox="0 0 620 560" fill="none">
        <path className="hero-network__bus hero-network__bus--services" d="M112 122V440" />
        <path className="hero-network__bus hero-network__bus--platforms" d="M242 166H378M242 394H378" />
        <path className="hero-network__bus hero-network__bus--products" d="M508 138V422" />
        <path className="hero-network__halo" d="M230 280C230 236 266 200 310 200S390 236 390 280 354 360 310 360 230 324 230 280Z" />
        {heroFlowPaths.map((path, index) => (
          <path
            key={path.id}
            className={`hero-network__flow hero-network__flow--${path.lane}`}
            d={path.d}
            style={{ animationDelay: `${index * -0.42}s` }}
          />
        ))}
        {animated && heroFlowPaths.map((path, index) => (
          <circle
            key={`${path.id}-pulse`}
            className={`hero-network__pulse hero-network__pulse--${path.lane}`}
            r="4.5"
          >
            <animateMotion dur="5.8s" begin={`${index * 0.35}s`} repeatCount="indefinite" path={path.d} />
          </circle>
        ))}
      </svg>
      <div className="hero-network__core">
        <Image src="/logo-ui.webp" alt="" width={256} height={256} priority unoptimized />
      </div>
      <div className="hero-system-label hero-system-label--services">
        <span>Entrada</span>
        <strong>Servicios</strong>
      </div>
      <div className="hero-system-label hero-system-label--platforms">
        <span>Conecta</span>
        <strong>Plataformas</strong>
      </div>
      <div className="hero-system-label hero-system-label--core">
        <span>Convierte</span>
      </div>
      <div className="hero-system-label hero-system-label--products">
        <span>Salida</span>
        <strong>Productos</strong>
      </div>
      {heroServiceNodes.map((node) => (
        <span
          key={node.name}
          className={`hero-node hero-node--service hero-node--${node.theme}`}
          style={{ left: node.x, top: node.y }}
        >
          <span className="hero-node__orb">
            <HeroLogo theme={node.theme} />
          </span>
        </span>
      ))}
      {heroPlatformNodes.map((node) => (
        <span
          key={node.name}
          className={`hero-node hero-node--platform hero-node--${node.theme}`}
          style={{ left: node.x, top: node.y }}
        >
          <span className="hero-node__orb">
            <HeroLogo theme={node.theme} />
          </span>
        </span>
      ))}
      {heroProductNodes.map((node) => (
        <span
          key={node.name}
          className={`hero-node hero-node--product hero-node--${node.theme}`}
          style={{ left: node.x, top: node.y }}
        >
          <span className="hero-node__orb">
            <HeroLogo theme={node.theme} />
          </span>
        </span>
      ))}
    </div>
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

function HeroConceptMap() {
  return (
    <div
      className="hero-concept-map"
      role="img"
      aria-label="Mapa completo de IAenBlanco: servicios, núcleo, productos y conexiones operativas."
    >
      <svg className="hero-concept-map__wires hero-concept-map__wires--desktop" viewBox="0 0 1280 480" fill="none" preserveAspectRatio="none">
        <path className="concept-wire concept-wire--service concept-wire--trunk" d="M388 78V278" />
        {[78, 128, 178, 228, 278].map((y) => (
          <path key={`service-branch-${y}`} className="concept-wire concept-wire--service" d={`M338 ${y}H388`} />
        ))}
        <path className="concept-wire concept-wire--service" d="M388 178H532" />
        <path className="concept-wire concept-wire--product concept-wire--trunk" d="M892 112V252" />
        {[112, 182, 252].map((y) => (
          <path key={`product-branch-${y}`} className="concept-wire concept-wire--product" d={`M942 ${y}H892`} />
        ))}
        <path className="concept-wire concept-wire--product" d="M892 182H748" />
        <path className="concept-wire concept-wire--connection concept-wire--spine" d="M640 282V326" />
        <path className="concept-wire concept-wire--connection" d="M114 326H1166" />
        {[114, 264, 414, 564, 716, 866, 1016, 1166].map((x) => (
          <path key={`connection-branch-${x}`} className="concept-wire concept-wire--connection" d={`M${x} 326V332`} />
        ))}
        <g className="concept-wire-nodes">
          {[78, 128, 178, 228, 278].map((y) => (
            <circle key={`service-card-${y}`} className="concept-wire-node concept-wire-node--service" cx="338" cy={y} r="5" />
          ))}
          {[78, 128, 178, 228, 278].map((y) => (
            <circle key={`service-trunk-${y}`} className="concept-wire-node concept-wire-node--service" cx="388" cy={y} r="4" />
          ))}
          <circle className="concept-wire-node concept-wire-node--service" cx="532" cy="178" r="5" />
          {[112, 182, 252].map((y) => (
            <circle key={`product-card-${y}`} className="concept-wire-node concept-wire-node--product" cx="942" cy={y} r="5" />
          ))}
          {[112, 182, 252].map((y) => (
            <circle key={`product-trunk-${y}`} className="concept-wire-node concept-wire-node--product" cx="892" cy={y} r="4" />
          ))}
          <circle className="concept-wire-node concept-wire-node--product" cx="748" cy="182" r="5" />
          <circle className="concept-wire-node concept-wire-node--connection" cx="640" cy="282" r="5" />
          <circle className="concept-wire-node concept-wire-node--connection" cx="640" cy="326" r="5" />
          {[114, 264, 414, 564, 716, 866, 1016, 1166].map((x) => (
            <circle key={`connection-card-${x}`} className="concept-wire-node concept-wire-node--connection" cx={x} cy="332" r="4.5" />
          ))}
        </g>
      </svg>

      <div className="hero-concept-group hero-concept-group--services">
        <div className="hero-concept-title hero-concept-title--services">
          <strong>Servicios</strong>
        </div>
        {heroServiceCards.map((item) => (
          <div key={item.title} className={`concept-card concept-card--service concept-card--${item.theme}`}>
            <span className="concept-card__icon"><HeroLogo theme={item.theme} /></span>
            <span>
              <strong>{item.title}</strong>
            </span>
          </div>
        ))}
      </div>

      <div className="hero-concept-core">
        <Image src="/logo-ui.webp" alt="" width={256} height={256} priority unoptimized />
      </div>

      <div className="hero-concept-group hero-concept-group--products">
        <div className="hero-concept-title hero-concept-title--products">
          <strong>Productos</strong>
        </div>
        {heroProductCards.map((item) => (
          <div key={item.title} className={`concept-card concept-card--product concept-card--${item.theme}`}>
            <span className="concept-card__icon"><HeroLogo theme={item.theme} /></span>
            <span>
              <strong>{item.title}</strong>
            </span>
          </div>
        ))}
      </div>

      <div className="hero-concept-connections">
        <div className="hero-concept-title hero-concept-title--connections">
          <strong>Conexiones</strong>
        </div>
        <div className="hero-concept-connections__grid">
          {heroConnectionCards.map((item) => (
            <div key={item.title} className={`connection-card connection-card--${item.theme}`}>
              <span><HeroLogo theme={item.theme} /></span>
              <strong>{item.title}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-concept-process">
        {heroProcessSteps.map((step, index) => (
          <div key={step.title} className="process-step">
            <strong>{step.title}</strong>
            {index < heroProcessSteps.length - 1 ? <i /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniCircuit({ theme, logo }: { theme: string; logo: string }) {
  return (
    <div className={`mini-circuit mini-circuit--${theme}`} aria-hidden="true">
      <svg viewBox="0 0 260 130" fill="none">
        <path d="M28 66h58c18 0 18-34 38-34h18" />
        <path d="M130 66h42c16 0 16 32 34 32h26" />
        <path d="M130 66h94" />
      </svg>
      <span className="mini-circuit__core">{logo}</span>
      <i className="mini-circuit__node mini-circuit__node--one" />
      <i className="mini-circuit__node mini-circuit__node--two" />
      <i className="mini-circuit__node mini-circuit__node--three" />
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
            Proyectos reales, clientes reales y sistemas construidos alrededor de
            necesidades concretas de operación.
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
                    <span>Resultado</span>
                    <p>{proof.result}</p>
                  </div>
                </div>
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
                <p>{proof.result}</p>
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

function SystemMapSection() {
  return (
    <section className="system-map-section" id="sistema" aria-labelledby="system-map-heading">
      <div className="section-shell system-map-section__intro">
        <Reveal>
          <p className="eyebrow">Sistema IAenBlanco</p>
        </Reveal>
        <Reveal className="system-map-section__copy">
          <h2 id="system-map-heading">Todo conectado en un mismo sistema.</h2>
          <p>
            Servicios, plataformas y productos construidos alrededor de la operación real
            de tu negocio: menos piezas sueltas, más flujo útil.
          </p>
        </Reveal>
        <Reveal className="system-map-section__steps" delay={80}>
          {systemMapSteps.map((step, index) => (
            <div key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
            </div>
          ))}
        </Reveal>
      </div>
      <Reveal className="section-shell system-map-section__map" delay={120}>
        <HeroConceptMap />
      </Reveal>
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
            Unifícalo, Citaly y Leads resuelven tres operaciones distintas:
            sincronizar canales, atender y agendar, y encontrar oportunidades comerciales.
          </p>
        </Reveal>
      </div>

      <div className="section-shell product-unified" aria-label="Productos propios y flujos operativos">
        {productRows.map((product, index) => (
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
                  <strong>{product.status}</strong>
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

                <a
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="product-unified__cta"
                  data-cursor="Ver"
                  data-cursor-theme={product.theme}
                  data-product-name={product.name}
                  data-section="Productos propios"
                >
                  {product.cta}
                  <ArrowUpRight />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
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
              Inteligencia artificial en operación
            </p>
            <h1 id="home-title">
              La IA deja de ser promesa.
              <em>Empieza a operar.</em>
            </h1>
            <p className="home-hero__summary">
              Diseñamos sitios, plataformas, automatizaciones y soluciones de IA
              conectadas con la realidad de tu negocio.
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
          <span>IAenBlanco / 2026</span>
          <span>Chile → Latinoamérica</span>
          <span>Scroll para descubrir</span>
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
