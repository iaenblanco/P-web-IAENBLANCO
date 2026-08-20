export const SITE_URL = 'https://iaenblanco.com'

export const WHATSAPP_URL =
  'https://wa.me/56977684800?text=Hola%20IAenBlanco%2C%20quiero%20conversar%20sobre%20un%20proyecto.'

export const CONTACT_EMAIL = 'contacto@iaenblanco.com'

export const socialLinks = {
  linkedin: 'https://cl.linkedin.com/in/iaenblanco',
  instagram: 'https://www.instagram.com/iaenblanco/',
}

export const clients = [
  'YoMeEncargo',
  'Granja Magdalena',
  'Propinvest',
  'Granja Magdalena Pet',
  'Inasec Pets',
]

export type Service = {
  slug: string
  index: string
  shortTitle: string
  title: string
  eyebrow: string
  statement: string
  description: string
  capabilities: string[]
  idealFor: string[]
  signals: string[]
  seoTitle: string
  seoDescription: string
}

export const services: Service[] = [
  {
    slug: 'desarrollo-web-ia',
    index: '01',
    shortTitle: 'Sitios web y Shopify',
    title: 'Sitios web y Shopify que convierten visitas en conversaciones',
    eyebrow: 'Presencia que convierte',
    statement: 'Tu web tiene que explicar por qué confiar, qué ofreces y cómo iniciar una conversación.',
    description:
      'Construimos sitios corporativos, landings comerciales y tiendas Shopify con narrativa, diseño y base técnica: una experiencia que ordena tu oferta, carga rápido y empuja al contacto.',
    capabilities: [
      'Narrativa comercial y arquitectura de contenido',
      'Diseño responsive con identidad premium',
      'Desarrollo web, landing pages y Shopify',
      'Integración con WhatsApp, formularios y CRM',
      'Rendimiento, SEO técnico y medición básica',
      'Evolución posterior al lanzamiento',
    ],
    idealFor: [
      'Empresas que necesitan verse más confiables',
      'Negocios que venden servicios, productos o proyectos',
      'Marcas que quieren dejar atrás una web genérica',
    ],
    signals: ['Narrativa', 'UX', 'Shopify', 'Conversión'],
    seoTitle: 'Sitios web y Shopify que convierten',
    seoDescription:
      'Diseñamos y desarrollamos sitios web comerciales, corporativos, landing pages y Shopify con foco en confianza, conversión y rendimiento.',
  },
  {
    slug: 'plataformas-software-medida',
    index: '02',
    shortTitle: 'Plataformas y software',
    title: 'Software a medida para operaciones que no caben en una plantilla',
    eyebrow: 'Sistema propio',
    statement: 'Cuando el negocio depende de planillas, permisos y reglas internas, conviene construir la herramienta exacta.',
    description:
      'Diseñamos plataformas con backend, paneles, usuarios, permisos y datos conectados para que el equipo opere desde un flujo claro en vez de adaptar su proceso a un software genérico.',
    capabilities: [
      'Definición funcional y arquitectura de producto',
      'Backends, bases de datos y APIs',
      'Paneles internos, roles y permisos',
      'Reglas de negocio y estados operativos',
      'Integración con herramientas existentes',
      'Soporte y evolución por etapas',
    ],
    idealFor: [
      'Equipos que gestionan operación con planillas',
      'Empresas con procesos propios o muchas excepciones',
      'Negocios que necesitan un panel interno a medida',
    ],
    signals: ['Paneles', 'Backends', 'Permisos', 'Datos'],
    seoTitle: 'Desarrollo de software y plataformas a medida',
    seoDescription:
      'Diseñamos software, paneles internos, backends y plataformas a medida para operaciones que necesitan reglas, datos e integraciones propias.',
  },
  {
    slug: 'automatizaciones',
    index: '03',
    shortTitle: 'Automatizaciones e integraciones',
    title: 'Automatizaciones e integraciones que sacan trabajo manual del equipo',
    eyebrow: 'Flujos que avanzan solos',
    statement: 'Conectamos sistemas para que la información se mueva, se valide y avise sin copiar y pegar.',
    description:
      'Mapeamos tareas repetidas y creamos integraciones, alertas, documentos y dashboards que reducen errores, evitan doble digitación y dan visibilidad operacional.',
    capabilities: [
      'Mapeo de tareas repetidas y puntos de error',
      'Integraciones entre APIs, planillas y sistemas',
      'Generación automática de datos o documentos',
      'Alertas, validaciones y derivaciones',
      'Dashboards de control y seguimiento',
      'Monitoreo y mejora continua',
    ],
    idealFor: [
      'Equipos que copian información entre herramientas',
      'Operaciones que pierden tiempo revisando estados',
      'Negocios que necesitan alertas y control diario',
    ],
    signals: ['APIs', 'Alertas', 'Documentos', 'Dashboards'],
    seoTitle: 'Automatizaciones e integraciones para empresas',
    seoDescription:
      'Automatizamos procesos empresariales con integraciones, alertas, documentos y dashboards para reducir trabajo manual y errores operativos.',
  },
  {
    slug: 'soluciones-ia-medida',
    index: '04',
    shortTitle: 'Soluciones de IA',
    title: 'IA aplicada a atención, análisis y operación interna',
    eyebrow: 'Agentes conectados',
    statement: 'La IA sirve cuando entiende contexto, toma información real y ejecuta dentro del flujo de trabajo.',
    description:
      'Construimos agentes, asistentes y modelos conectados a datos, conversaciones y sistemas existentes para responder, analizar o automatizar tareas con control humano.',
    capabilities: [
      'Definición del caso de uso y límites de la IA',
      'Agentes y asistentes especializados',
      'Chatbots conectados a información real',
      'Análisis de texto, audios, datos o solicitudes',
      'Integración con APIs y software existente',
      'Pruebas, control humano y evolución',
    ],
    idealFor: [
      'Empresas que quieren IA útil, no una demo aislada',
      'Equipos que reciben consultas, documentos o datos repetidos',
      'Negocios que necesitan automatizar decisiones con contexto',
    ],
    signals: ['Agentes', 'Contexto', 'Modelos', 'Integración'],
    seoTitle: 'Soluciones de inteligencia artificial a medida',
    seoDescription:
      'Diseñamos agentes, asistentes y soluciones de inteligencia artificial a medida, conectados a datos, conversaciones y sistemas reales.',
  },
  {
    slug: 'prospeccion-b2b-gestionada',
    index: '05',
    shortTitle: 'Prospección B2B gestionada',
    title: 'Prospección B2B operada con datos y seguimiento',
    eyebrow: 'Crecimiento comercial',
    statement: 'No es una base de datos suelta: es una operación para decidir a quién contactar, por qué y cuándo insistir.',
    description:
      'Definimos ICP, buscamos empresas reales, levantamos evidencia pública, priorizamos oportunidades y ordenamos el seguimiento para que el contacto comercial tenga contexto.',
    capabilities: [
      'Definición de ICP, rubros y zonas objetivo',
      'Búsqueda y clasificación de empresas reales',
      'Evidencia pública y señales comerciales',
      'Priorización por oportunidad y fit',
      'Contacto, seguimiento y próximos pasos',
      'Operación mensual administrada',
    ],
    idealFor: [
      'Empresas B2B que saben a quién quieren venderle',
      'Equipos comerciales que necesitan abrir mercado',
      'Negocios que quieren prospectar con método y evidencia',
    ],
    signals: ['ICP', 'Evidencia', 'Scoring', 'Seguimiento'],
    seoTitle: 'Prospección B2B gestionada',
    seoDescription:
      'Servicio mensual de prospección B2B que identifica empresas reales, prioriza oportunidades y ordena seguimiento comercial con datos y evidencia.',
  },
]

export type Product = {
  id: string
  name: string
  status: string
  /** Qué significa ese estado para quien compra, en su idioma. */
  statusMeaning: string
  /** Condiciones comerciales publicadas hoy en el sitio del producto. */
  offer: string
  eyebrow: string
  promise: string
  description: string
  problems: string[]
  integrations: string[]
  href: string
  ctaLabel: string
  /** true cuando cualquiera puede contratarlo solo, sin hablar con nosotros. */
  selfServe: boolean
}

export const products: Product[] = [
  {
    id: 'unificalo',
    name: 'Unifícalo',
    status: 'Piloto abierto',
    statusMeaning: 'Ya está operando con clientes y puedes sumarte hoy.',
    offer: 'Desde 1 UF + IVA al mes · 14 días gratis · sin tarjeta para partir',
    ctaLabel: 'Probar 14 días gratis',
    selfServe: true,
    eyebrow: 'E-commerce multicanal',
    promise: 'Tu stock, precios y boletas cuadran solos en todos tus canales.',
    description:
      'Unifícalo conecta la plataforma que manda tu operación con tus canales de venta para que cada venta descuente stock, cada precio se respete y cada documento salga desde una sola fuente de verdad.',
    problems: [
      'Evita sobreventas entre tienda online, marketplaces, POS y delivery.',
      'Reduce precios cruzados y listas desactualizadas por canal.',
      'Automatiza boletas, notas de crédito y trazabilidad operativa.',
    ],
    integrations: [
      'Bsale',
      'Shopify',
      'Uber Eats',
      'PedidosYa',
      'Mercado Libre',
      'Falabella',
      'WooCommerce',
      'Paris',
    ],
    href: 'https://unificalo.cl',
  },
  {
    id: 'citaly',
    name: 'Citaly',
    status: 'Abierto en validación',
    statusMeaning: 'Funciona y puedes crear tu cuenta; seguimos ajustando el producto con los primeros negocios.',
    offer: 'Planes desde 0,6 UF al mes · sin permanencia · hecho en Chile',
    ctaLabel: 'Crear cuenta en Citaly',
    selfServe: true,
    eyebrow: 'Agenda + agente IA',
    promise: 'Tu WhatsApp responde, entiende audios y agenda horas aunque estés atendiendo.',
    description:
      'Citaly conecta WhatsApp con una agenda real: el agente entiende solicitudes, ofrece horarios disponibles, confirma reservas y deriva a un humano cuando corresponde.',
    problems: [
      'Agenda, reagenda y cancela horas por conversación.',
      'Transcribe audios y responde con disponibilidad real.',
      'Centraliza recordatorios, clientes, equipo, cobros y reportes.',
    ],
    integrations: ['WhatsApp', 'Agenda', 'Audios', 'Reservas', 'Recordatorios', 'CRM'],
    href: 'https://citaly.cl',
  },
  {
    id: 'leads',
    name: 'Leads',
    status: 'Cuenta gratis',
    statusMeaning: 'Puedes crear una cuenta gratis y revisar la demo antes de decidir nada.',
    offer: 'Cuenta gratis · demo abierta · revisión de calidad sin cobro',
    ctaLabel: 'Crear cuenta gratis',
    selfServe: true,
    eyebrow: 'Prospección B2B',
    promise: 'Empresas reales, evidencia pública y seguimiento comercial antes que mensajes masivos.',
    description:
      'Leads permite buscar empresas chilenas por rubro y ubicación, revisar evidencia disponible, priorizar contactos con canal directo y trabajar el pipeline desde un solo espacio.',
    problems: [
      'Define mercados concretos por rubro, comuna y zona.',
      'Distingue leads listos de registros que requieren revisión.',
      'Ordena contacto, seguimiento y avance hacia reunión o venta.',
    ],
    integrations: ['Fuentes públicas', 'Evidencia', 'Score', 'Pipeline', 'WhatsApp', 'CRM'],
    href: 'https://leads.iaenblanco.com',
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function getWhatsappUrl(message: string) {
  return `https://wa.me/56977684800?text=${encodeURIComponent(message)}`
}
