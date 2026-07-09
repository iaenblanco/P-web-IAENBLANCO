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
    shortTitle: 'Sitios web',
    title: 'Sitios web comerciales y Shopify',
    eyebrow: 'Presencia digital que trabaja',
    statement: 'Una web puede ser tu mejor argumento comercial y una herramienta real de operación.',
    description:
      'Diseñamos y desarrollamos sitios corporativos, comerciales y tiendas Shopify con una experiencia cuidada, una base técnica sólida y las integraciones que el negocio realmente necesita. La IA se incorpora cuando mejora el resultado, no como adorno.',
    capabilities: [
      'Estrategia, arquitectura y experiencia de usuario',
      'Diseño y desarrollo responsive a medida',
      'Desarrollo y personalización avanzada en Shopify',
      'Integraciones con herramientas comerciales y operativas',
      'Fundamentos técnicos de rendimiento y SEO',
      'Soporte y evolución posterior al lanzamiento',
    ],
    idealFor: [
      'Empresas que necesitan elevar su presencia digital',
      'Marcas que venden o quieren vender mediante Shopify',
      'Negocios que requieren más que una plantilla genérica',
    ],
    signals: ['Diseño', 'Desarrollo', 'Shopify', 'Integraciones'],
    seoTitle: 'Desarrollo web con IA y Shopify',
    seoDescription:
      'Diseño y desarrollo de sitios web comerciales, corporativos y Shopify con integraciones y tecnología aplicada a objetivos reales de negocio.',
  },
  {
    slug: 'plataformas-software-medida',
    index: '02',
    shortTitle: 'Plataformas',
    title: 'Plataformas y software a medida',
    eyebrow: 'El sistema que todavía no existe',
    statement: 'Cuando una landing no basta, construimos la infraestructura digital que tu operación necesita.',
    description:
      'Creamos plataformas web con backend, reglas de negocio, paneles de administración y flujos propios. Desde rutificadores de despacho hasta portales inmobiliarios autoadministrables: el producto se diseña alrededor de la operación, no al revés.',
    capabilities: [
      'Arquitectura de producto y definición funcional',
      'Backends, APIs y bases de datos',
      'Paneles de administración y permisos',
      'Flujos operativos y reglas de negocio',
      'Integración con sistemas existentes',
      'Evolución continua mediante soporte o retainer',
    ],
    idealFor: [
      'Operaciones que dependen de planillas o procesos fragmentados',
      'Empresas con una necesidad que el software estándar no resuelve',
      'Equipos que quieren convertir un proceso interno en una plataforma',
    ],
    signals: ['Backend', 'Operación', 'Datos', 'Escala'],
    seoTitle: 'Desarrollo de software y plataformas a medida',
    seoDescription:
      'Diseñamos plataformas, backends y software a medida para operaciones que necesitan flujos, datos e integraciones propias.',
  },
  {
    slug: 'automatizaciones',
    index: '03',
    shortTitle: 'Automatizaciones',
    title: 'Automatizaciones e integraciones',
    eyebrow: 'Menos fricción. Más operación.',
    statement: 'Conectamos las piezas para que la información avance sin depender de tareas manuales.',
    description:
      'Analizamos el proceso, identificamos los puntos de fricción y construimos automatizaciones que conectan herramientas, datos y equipos. Cuando hace falta visibilidad, incorporamos dashboards como parte de la misma solución.',
    capabilities: [
      'Mapeo de procesos y detección de fricciones',
      'Integraciones entre plataformas y APIs',
      'Flujos automáticos de datos y documentos',
      'Dashboards operativos y comerciales',
      'Alertas, validaciones y manejo de excepciones',
      'Monitoreo, soporte y optimización',
    ],
    idealFor: [
      'Equipos que repiten tareas manuales entre sistemas',
      'Operaciones con errores por duplicación o traspaso de datos',
      'Negocios que necesitan información centralizada para decidir',
    ],
    signals: ['Flujos', 'APIs', 'Dashboards', 'Control'],
    seoTitle: 'Automatización de procesos empresariales',
    seoDescription:
      'Automatizamos procesos e integramos herramientas, datos y dashboards para reducir tareas manuales y dar visibilidad a la operación.',
  },
  {
    slug: 'soluciones-ia-medida',
    index: '04',
    shortTitle: 'IA a medida',
    title: 'Soluciones de IA a medida',
    eyebrow: 'De la idea a la operación',
    statement: 'Si puedes imaginar una mejor forma de operar, evaluamos cómo convertirla en un sistema real.',
    description:
      'Diseñamos e implementamos soluciones de inteligencia artificial conectadas a la operación existente. Agentes, asistentes, chatbots o herramientas internas: primero validamos el caso de uso y después construimos lo que aporta valor.',
    capabilities: [
      'Evaluación de factibilidad y definición del caso de uso',
      'Agentes y asistentes especializados',
      'Chatbots conectados con información y sistemas reales',
      'Automatización con modelos de lenguaje',
      'Integración con APIs, datos y software existente',
      'Pruebas, puesta en marcha y evolución',
    ],
    idealFor: [
      'Empresas con una oportunidad concreta para aplicar IA',
      'Equipos que necesitan conectar IA con sistemas existentes',
      'Negocios que no encuentran una solución estándar adecuada',
    ],
    signals: ['Agentes', 'Modelos', 'Contexto', 'Integración'],
    seoTitle: 'Soluciones de inteligencia artificial a medida',
    seoDescription:
      'Diseñamos agentes, asistentes y soluciones de IA a medida, integrados con los datos y sistemas reales de tu empresa.',
  },
  {
    slug: 'leads-magnet',
    index: '05',
    shortTitle: 'Leads Magnet',
    title: 'Leads Magnet para ventas B2B',
    eyebrow: 'Prospección que sigue avanzando',
    statement: 'Un programa mensual que encuentra, contacta y trabaja oportunidades B2B de forma automatizada.',
    description:
      'Leads Magnet se conecta con tu negocio, identifica prospectos alineados con el perfil objetivo y automatiza el contacto y seguimiento hasta cerrar una venta o agendar una reunión. No es un SaaS: es un servicio gestionado por IAenBlanco.',
    capabilities: [
      'Definición del perfil de cliente objetivo',
      'Búsqueda y clasificación de prospectos B2B',
      'Contacto automatizado y personalizado',
      'Seguimiento continuo de oportunidades',
      'Cierre de ventas o agendamiento de reuniones',
      'Operación mensual administrada',
    ],
    idealFor: [
      'Empresas B2B con una oferta y cliente objetivo definidos',
      'Equipos comerciales que necesitan ampliar prospección',
      'Negocios que quieren mantener seguimiento sin sumar tareas manuales',
    ],
    signals: ['B2B', 'Prospección', 'Contacto', 'Seguimiento'],
    seoTitle: 'Leads Magnet: prospección B2B automatizada',
    seoDescription:
      'Programa mensual de prospección B2B que identifica, contacta y trabaja oportunidades de forma automatizada.',
  },
]

export const products = [
  {
    name: 'Unifícalo',
    status: 'Prelanzamiento',
    description:
      'Conecta Bsale con tus canales de venta para que stock, precios y documentos tributarios dejen de operar a ciegas.',
    problems: [
      'Detecta dónde y desde cuándo falló una sincronización.',
      'Reduce el riesgo de vender el mismo stock más de una vez.',
      'Ordena boletas y notas de crédito entre canales.',
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
    available: true,
  },
  {
    name: 'Citaly',
    status: 'Próximamente',
    description:
      'Una agenda para negocios de belleza cuyo punto de entrada es un agente de IA especializado en WhatsApp.',
    problems: [
      'Agenda, reagenda y cancela mediante conversación.',
      'Comprende audios y responde consultas de clientes.',
      'Gestiona recordatorios, cobros, profesionales y métricas.',
    ],
    integrations: ['WhatsApp', 'Agenda', 'Cobros', 'Clientes'],
    href: 'https://citaly.cl',
    available: false,
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
