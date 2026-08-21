import Image from 'next/image'
import { Fragment, type CSSProperties } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { ContactBand } from '@/components/ContactBand'
import { Reveal } from '@/components/Reveal'
import { TypingLine } from '@/components/TypingLine'
import Link from 'next/link'
import { getWhatsappUrl, products, WHATSAPP_URL } from '@/lib/site'

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
  { title: 'Programas', theme: 'software' },
  { title: 'Automatizar', theme: 'automation' },
  { title: 'Asistentes IA', theme: 'ai' },
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
  { title: 'Planillas', theme: 'crm' },
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
    ...(box.h ? { '--summary-b': `${100 - ((box.y + box.h) / summaryMap.height) * 100}%` } : {}),
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
    captura: 'propinvest',
    logo: 'propinvest',
    sector: 'Corredora de propiedades',
    project: 'Su catálogo de propiedades, que ellos mismos actualizan',
    velocidad: 'menos de 1 s',
    peso: '572 KB',
    system: 'Sitio con fichas de propiedades, textos editables y formulario de contacto.',
    proof: 'Lo que se ve al abrirlo es el catálogo. Lo que no se ve: el panel donde ellos mismos suben una propiedad y queda publicada, sin pedirnos ayuda.',
    destacado: true,
  },
  {
    client: 'YoMeEncargo',
    href: 'https://yomeencargo.cl/',
    captura: 'yomeencargo',
    logo: 'yomercargo',
    sector: 'Fletes y mudanzas',
    project: 'Su sitio de servicios, ordenado para que se entienda',
    velocidad: 'menos de 1,5 s',
    peso: '770 KB',
    system: 'Cada servicio explicado por separado y un camino claro hasta pedir la cotización.',
    proof: 'Ofrecen muchas cosas distintas. El sitio las ordena para que cada visitante encuentre la suya.',
  },
  {
    client: 'Granja Magdalena',
    href: 'https://granjamagdalena.cl/',
    captura: 'granjamagdalena',
    logo: 'granja-magdalena',
    sector: 'Venta de alimentos',
    project: 'Su tienda online',
    velocidad: 'menos de 1,5 s',
    peso: '4,6 MB',
    system: 'Catálogo, carro de compra y la venta ordenada en un solo lugar.',
    proof: 'Pasaron de mostrar sus productos a poder venderlos por internet.',
  },
  {
    client: 'Granja Magdalena Pet',
    href: 'https://granjamagdalenapet.cl/',
    captura: 'granjapet',
    logo: 'granjapet',
    logoTone: 'dark',
    sector: 'Alimento para mascotas',
    project: 'Una tienda aparte para su línea de mascotas',
    velocidad: 'menos de 2 s',
    peso: '2,1 MB',
    system: 'Sitio propio, separado del principal, con su propia cara.',
    proof: 'Su línea de mascotas tiene espacio propio en vez de perderse en el catálogo general.',
  },
  {
    client: 'Inasec Pets',
    href: 'https://inasecpets.cl/',
    captura: 'inasecpets',
    logo: 'inasec-pets',
    sector: 'Tienda especializada',
    project: 'Su sitio para mostrar lo que venden y recibir consultas',
    velocidad: 'menos de 2 s',
    peso: '3,2 MB',
    system: 'Oferta explicada de forma simple y una vía directa de contacto.',
    proof: 'Quien los encuentra entiende qué venden y sabe cómo escribirles.',
  },
]

const trustSignals = [
  { value: 'Menos de 2 segundos', label: 'es lo que demora en aparecer el contenido en los cinco sitios' },
  { value: 'Los cinco en celular', label: 'se ven completos sin desplazar de lado, y los cinco van por conexión segura' },
  { value: 'Tres rubros', label: 'mudanzas y carga, corretaje de propiedades, y venta de alimentos para personas y para mascotas' },
]

const problemCards = [
  {
    title: 'No tengo sitio web, o el que tengo da vergüenza',
    detail: 'La gente te busca en Google y no encuentra nada serio.',
    response: 'Te hacemos el sitio o la tienda online.',
    icon: 'web',
    href: '/servicios/desarrollo-web-ia/',
    slug: 'desarrollo-web-ia',
  },
  {
    title: 'Llevo el negocio en planillas de Excel',
    detail: 'Cada uno tiene su versión y nadie sabe cuál es la buena.',
    response: 'Te hacemos un programa con tus reglas.',
    icon: 'software',
    href: '/servicios/plataformas-software-medida/',
    slug: 'plataformas-software-medida',
  },
  {
    title: 'Paso el día copiando datos de un lado a otro',
    detail: 'Lo mismo, todas las mañanas, y a veces se escapa un error.',
    response: 'Hacemos que esas tareas se hagan solas.',
    icon: 'automation',
    href: '/servicios/automatizaciones/',
    slug: 'automatizaciones',
  },
  {
    title: 'Contesto las mismas preguntas todo el día',
    detail: 'Y cuando no alcanzas a responder, el cliente se va a otro lado.',
    response: 'Te armamos un asistente que responde por ti.',
    icon: 'ai',
    href: '/servicios/soluciones-ia-medida/',
    slug: 'soluciones-ia-medida',
  },
  {
    title: 'Necesito clientes nuevos y no sé por dónde partir',
    detail: 'Las listas compradas no contestan y salir a buscar toma semanas.',
    response: 'Te buscamos empresas reales a las que venderle.',
    icon: 'magnet',
    href: '/servicios/prospeccion-b2b-gestionada/',
    slug: 'prospeccion-b2b-gestionada',
  },
  {
    title: 'Sé que algo se puede mejorar, pero no sé qué',
    detail: 'Sabes dónde duele, no cómo se arregla. Eso es normal.',
    response: 'Conversemos y lo ordenamos juntos.',
    icon: 'business',
    href: 'whatsapp',
    slug: 'diagnostico',
  },
]

const productRows = [
  {
    id: 'unificalo',
    theme: 'unificalo',
    name: 'Unifícalo',
    category: 'Para quien vende en varios lados',
    problem: 'Vendiste lo mismo dos veces. El reembolso y la disculpa los pones tú.',
    promise: 'Tu inventario, tus precios y tus boletas cuadran solos en todos lados.',
    steps: [
      { label: 'Toma', title: 'Tu sistema de siempre', detail: 'Inventario, precios y boletas', theme: 'bsale' },
      { label: 'Ordena', title: 'Deja todo cuadrado', detail: 'Sin que nadie lo actualice', theme: 'automation' },
      { label: 'Actualiza', title: 'Todos tus canales', detail: 'Tienda online y marketplaces', theme: 'shopify' },
    ],
    benefits: [
      'Dejas de vender lo que ya no tienes.',
      'El mismo precio en todas partes.',
      'Las boletas salen solas.',
    ],
    href: 'https://unificalo.cl',
  },
  {
    id: 'citaly',
    theme: 'citaly',
    name: 'Citaly',
    category: 'Para negocios que atienden con hora',
    problem: 'El WhatsApp suena mientras tienes un cliente al frente. Uno de los dos espera.',
    promise: 'Tu WhatsApp contesta y agenda la hora mientras tú sigues atendiendo.',
    steps: [
      { label: 'Recibe', title: 'El mensaje del cliente', detail: 'Escrito o por audio', theme: 'wa' },
      { label: 'Entiende', title: 'Qué está pidiendo', detail: 'Y mira tu agenda real', theme: 'ai' },
      { label: 'Agenda', title: 'La hora y la confirma', detail: 'Sin que tú toques nada', theme: 'software' },
    ],
    benefits: [
      'Entiende también los audios.',
      'Solo ofrece horas que tienes libres.',
      'Confirma y recuerda la cita.',
    ],
    href: 'https://citaly.cl',
  },
  {
    id: 'leads',
    theme: 'leads',
    name: 'Leads',
    category: 'Para quien le vende a empresas',
    problem: 'Buscar empresas a mano se come la mañana y no sabes cuáles valen la pena.',
    promise: 'Encuentras empresas reales y sabes a cuáles llamar primero.',
    steps: [
      { label: 'Eliges', title: 'A quién quieres venderle', detail: 'Rubro y comuna', theme: 'business' },
      { label: 'Busca', title: 'Empresas de verdad', detail: 'Y revisa que existan', theme: 'leads' },
      { label: 'Ordena', title: 'Cuáles van primero', detail: 'Con su contacto', theme: 'automation' },
    ],
    benefits: [
      'Empresas que existen, no listas compradas.',
      'Ordenadas por cuáles te calzan más.',
      'Con el seguimiento en el mismo lugar.',
    ],
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

      <div className="summary-group summary-group--services">
        <div
          className="summary-system-label summary-system-label--services"
          style={summaryBoxStyle(summaryMap.services.label)}
        >
          <span>Te hacemos</span>
          <strong>A tu medida</strong>
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
      </div>

      <div className="summary-group summary-group--platforms">
        <div
          className="summary-system-label summary-system-label--platforms"
          style={summaryBoxStyle(summaryMap.platforms.label)}
        >
          <span>Se conecta con</span>
          <strong>Lo que ya usas</strong>
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
      </div>

      <div className="summary-group summary-group--products">
        <div
          className="summary-system-label summary-system-label--products"
          style={summaryBoxStyle(summaryMap.products.label)}
        >
          <span>Muy pronto</span>
          <strong>Los nuestros</strong>
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
      </div>

      <div className="summary-flow" style={summaryBoxStyle(summaryMap.flow)}>
        <span>Nos cuentas</span>
        <i />
        <span>Lo construimos</span>
        <i />
        <span>Queda funcionando</span>
      </div>

    </div>
  )
}

function TrustProofSection() {
  return (
    <section className="trust-proof" aria-labelledby="trust-proof-heading">
      <div className="section-shell trust-proof__inner">
        <Reveal className="trust-proof__copy">
          <p className="eyebrow">Trabajos reales</p>
          <h2 id="trust-proof-heading">Míralo tú mismo.</h2>
          <p>
            Cuatro negocios chilenos y cinco sitios: a Granja Magdalena le hicimos dos, uno
            para su tienda y otro aparte para su línea de mascotas. Están tal como se ven
            hoy: ábrelos y revisa el trabajo antes de escribirnos.
          </p>
        </Reveal>

        <div className="trabajos">
          {clientProofs.map((proof, index) => (
            <Reveal
              key={proof.client}
              className={`trabajo${proof.destacado ? ' trabajo--destacado' : ''}`}
              delay={index * 60}
            >
              <a
                href={proof.href}
                target="_blank"
                rel="noreferrer"
                className="trabajo__enlace"
                data-cursor="Abrir"
                data-analytics-event="service_case_click"
                data-case-name={proof.client}
              >
                <figure className="trabajo__captura">
                  {/* Bajo 620 px la tarjeta ocupa una sola columna y mide entre
                      350 y 590 px: la captura de 1120 px pesaba tres veces lo
                      necesario. Se sirve una de 760 px, que sigue dando el doble
                      de resolucion en un telefono. El export estatico no genera
                      srcset, asi que la eleccion va escrita a mano. */}
                  <picture>
                    <source
                      media="(max-width: 540px)"
                      srcSet={`/trabajos/${proof.captura}-sm.webp`}
                      width={760}
                      height={475}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/trabajos/${proof.captura}.webp`}
                      alt={`Portada del sitio de ${proof.client} en computador`}
                      width={1120}
                      height={700}
                      loading={proof.destacado ? 'eager' : 'lazy'}
                      decoding="async"
                      {...(proof.destacado ? { fetchPriority: 'high' as const } : {})}
                    />
                  </picture>
                  <span className="trabajo__movil">
                    <picture>
                      <source
                        media="(max-width: 540px)"
                        srcSet={`/trabajos/${proof.captura}-movil-sm.webp`}
                        width={220}
                        height={440}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/trabajos/${proof.captura}-movil.webp`}
                        alt={`El mismo sitio de ${proof.client} visto en celular`}
                        width={420}
                        height={840}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </span>
                </figure>

                <div className="trabajo__ficha">
                  <div className="trabajo__meta">
                    <span
                      className={`trabajo__logo${proof.logoTone === 'dark' ? ' trabajo__logo--dark' : ''}`}
                    >
                      <BrandLogo name={proof.logo} alt={proof.client} loading="eager" sizes="44px" />
                    </span>
                    <p>{proof.sector}</p>
                    <span className="trabajo__orden" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                      <i />
                      {String(clientProofs.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h3>{proof.client}</h3>
                  <strong>{proof.project}</strong>

                  <dl className="trabajo__detalle">
                    <div>
                      <dt>Qué le hicimos</dt>
                      <dd>{proof.system}</dd>
                    </div>
                    <div>
                      <dt>Para qué le sirve</dt>
                      <dd>{proof.proof}</dd>
                    </div>
                  </dl>

                  <span className="trabajo__cta">
                    Abrir el sitio
                    <ArrowUpRight />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}

function ProblemSection() {
  const diagnostico = getWhatsappUrl(
    'Hola IAenBlanco, sé que algo se puede mejorar en mi negocio pero no tengo claro qué. ¿Conversamos?',
  )

  return (
    <section className="problem-strip" id="empezar" aria-labelledby="problem-strip-heading">
      <div className="section-shell problem-strip__inner">
        <Reveal className="problem-strip__heading">
          <p className="eyebrow">Empieza por acá</p>
          <h2 id="problem-strip-heading">
            Así llega la mayoría. Y así trabajamos nosotros.
          </h2>
          <p className="problem-strip__lead">
            Elige la frase que más se parece a lo que te pasa. No necesitas saber cómo se
            llama la solución: para eso está la primera conversación.
          </p>
          <Link href="/servicios" prefetch={false} className="problem-strip__todos">
            O mira los cinco servicios, uno por uno
          </Link>
        </Reveal>
        <div className="problem-strip__grid">
          {problemCards.map((problem, index) => {
            const esWhatsapp = problem.href === 'whatsapp'
            const contenido = (
              <>
                <div className="problem-card__top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <i aria-hidden="true"><HeroLogo theme={problem.icon} /></i>
                </div>
                <strong>{problem.title}</strong>
                <p>{problem.detail}</p>
                <div className="problem-card__response">
                  <span>Lo que hacemos</span>
                  <p>{problem.response}</p>
                </div>
              </>
            )

            return (
              <Reveal key={problem.title} delay={index * 60}>
                {esWhatsapp ? (
                  <a
                    href={diagnostico}
                    target="_blank"
                    rel="noreferrer"
                    className="problem-card problem-card--diagnostic"
                    data-cursor="WhatsApp"
                    data-analytics-event="service_whatsapp_click"
                    data-service-id={problem.slug}
                  >
                    {contenido}
                  </a>
                ) : (
                  <Link
                    href={problem.href}
                    prefetch={false}
                    className="problem-card"
                    data-cursor="Ver"
                    data-analytics-event="service_cta_click"
                    data-service-id={problem.slug}
                  >
                    {contenido}
                  </Link>
                )}
              </Reveal>
            )
          })}
        </div>

        <div className="problem-strip__proceso operating-model">

          <Reveal className="operating-model__heading">
            <p className="eyebrow">Y desde acá, cómo trabajamos</p>
            <div>
              <h2 id="model-heading">Tres pasos, y en ninguno te dejamos solo.</h2>
              <p className="operating-model__copy">
                No partimos vendiéndote algo. Partimos entendiendo qué te está costando
                hoy. Recién ahí sabemos qué hay que construir, y te lo decimos antes de
                empezar.
              </p>
            </div>
          </Reveal>

          <div className="operating-model__steps">
            <span className="operating-model__carril" aria-hidden="true" />
            {[
              {
                number: '01',
                title: 'Conversamos',
                text: 'Nos cuentas cómo trabajas hoy y qué te está costando. Sin compromiso y sin costo.',
                deliverable: 'Qué haríamos y cuánto abarca, por escrito',
                cuando: 'La primera semana',
              },
              {
                number: '02',
                title: 'Lo construimos',
                text: 'Hacemos lo acordado y te vamos mostrando avances, para que no haya sorpresas al final.',
                deliverable: 'Tu sitio, tu programa o tu asistente, funcionando',
                cuando: 'Avances desde el primer viernes',
              },
              {
                number: '03',
                title: 'Lo dejamos andando',
                text: 'Lo publicamos, te enseñamos a usarlo y quedamos disponibles para los ajustes que salgan.',
                deliverable: 'Puesta en marcha, y nosotros ahí después',
                cuando: 'El día que sale a la calle',
              },
            ].map((step, index) => (
              <Reveal key={step.number} className="operating-step" delay={index * 90}>
                <span className="operating-step__placa" aria-hidden="true">{step.number}</span>
                <p className="operating-step__cuando">{step.cuando}</p>
                <h3>{step.title}</h3>
                <p className="operating-step__texto">{step.text}</p>
                <strong className="operating-step__entrega">
                  <span>Te queda</span>
                  {step.deliverable}
                </strong>
              </Reveal>
            ))}
          </div>

          <Reveal className="objeciones" delay={60}>
            <p className="objeciones__titulo">Lo que se pregunta todo el mundo antes de escribir</p>
            <div className="objeciones__precio">
              <h3>¿Cuánto cuesta?</h3>
              <p>
                Depende de lo que necesites, y por eso no ponemos un precio en la web
                que después no calce. Lo que sí te garantizamos: el precio de lo acordado
                te lo damos por escrito antes de empezar y ese número no se mueve. Si a
                mitad de camino quieres sumar algo que no estaba, te lo cotizamos aparte
                y decides tú antes de que lo hagamos.
              </p>
            </div>
            <div>
              <h3>¿Y si a mitad de camino no me gusta?</h3>
              <p>
                No trabajamos meses a puerta cerrada. Te vamos mostrando avances desde
                la primera semana, así que cualquier cosa que no te cuadre la corregimos
                cuando todavía es barato corregirla.
              </p>
            </div>
            <div>
              <h3>¿Después quedo amarrado con ustedes?</h3>
              <p>
                No. Lo que construimos queda tuyo: tu dominio, tus cuentas, tus datos.
                Si más adelante quieres que lo siga otro, se lo entregas y listo.
              </p>
            </div>
          </Reveal>

          <Reveal className="industry-line">
            <p>Ya trabajamos con negocios de</p>
            <div>
              <span>Venta de productos</span>
              <span>Propiedades</span>
              <span>Servicios a empresas</span>
            </div>
          </Reveal>
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
          <p className="eyebrow">Nuestros productos</p>
        </Reveal>
        <Reveal className="ecosystem-lab__heading">
          <h2 id="ecosystem-heading">Tres programas propios, muy pronto.</h2>
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
              Sitios web · Tiendas online · Programas a medida · Asistentes con IA
            </p>
            <h1 id="home-title">
              Te hacemos la parte tecnológica.
              <em>Tú sigue con lo tuyo.</em>
            </h1>
            <p className="home-hero__summary">
              Hacemos sitios web, tiendas online, programas a la medida de tu negocio y
              asistentes con inteligencia artificial. Los dejamos funcionando y te
              acompañamos después.
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
                Ver qué hacemos
                <ArrowDown />
              </a>
            </div>
            <TypingLine />
          </div>

          <div className="home-hero__visual">
            <HeroSummaryMap />
            {/* Va despues del mapa, no flotando fuera de su marco: es el pie
                del diagrama y asi se comporta en la maquetacion.
                Antes apuntaba a #servicios igual que el boton "Ver que
                hacemos" de la columna de al lado: dos enlaces con la misma
                flecha y el mismo destino. Este lleva a la pagina completa. */}
            <Link href="/servicios" prefetch={false} className="hero-summary-map__explore" data-cursor="Servicios">
              Ver los cinco servicios
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <TrustProofSection />

      <ProblemSection />

      <ProductLabSection />

      <section className="rampa" aria-labelledby="rampa-heading">
        <div className="section-shell rampa__inner">
          <Reveal className="rampa__copy">
            <p className="eyebrow">Antes de contratar nada</p>
            <h2 id="rampa-heading">¿Prefieres partir por algo chico?</h2>
            <p>
              Mándanos el link de tu sitio y te decimos qué encontramos: qué está
              frenando las consultas, qué se ve mal en el celular y qué le falta para
              que Google lo muestre bien. Sin costo y sin que tengas que contratar nada.
            </p>
            <p className="rampa__nota">
              Es lo mismo que revisamos antes de cotizar cualquier proyecto. Si después
              quieres trabajar con nosotros, perfecto. Si no, te quedas igual con el
              diagnóstico.
            </p>
          </Reveal>

          <Reveal className="rampa__accion" delay={90}>
            <ol className="rampa__pasos">
              <li>
                <span>01</span>
                <p>Nos mandas el link por WhatsApp</p>
              </li>
              <li>
                <span>02</span>
                <p>Lo revisamos en computador y en celular</p>
              </li>
              <li>
                <span>03</span>
                <p>Te contamos qué encontramos, punto por punto</p>
              </li>
            </ol>

            <a
              href={getWhatsappUrl(
                'Hola IAenBlanco, quiero que revisen mi sitio y me digan qué le falta. El link es: ',
              )}
              target="_blank"
              rel="noreferrer"
              className="button button--primary"
              data-cursor="WhatsApp"
              data-analytics-event="rampa_revision_click"
            >
              Mandar mi sitio a revisar
              <ArrowUpRight />
            </a>

            <a
              href={getWhatsappUrl(
                'Hola IAenBlanco, todavía no tengo sitio web. Vendo: ',
              )}
              target="_blank"
              rel="noreferrer"
              className="rampa__pie"
              data-cursor="WhatsApp"
              data-analytics-event="rampa_sin_sitio_click"
            >
              <strong>¿Todavía no tienes sitio?</strong>
              <span>Cuéntanos qué vendes y te decimos por dónde partir. Igual de gratis.</span>
              <ArrowUpRight />
            </a>
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </main>
  )
}
