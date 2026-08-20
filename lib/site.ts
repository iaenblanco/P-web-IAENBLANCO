export const SITE_URL = 'https://iaenblanco.com'

export const WHATSAPP_URL =
  'https://wa.me/56977684800?text=Hola%20IAenBlanco%2C%20quiero%20conversar%20sobre%20un%20proyecto.'

export const CONTACT_EMAIL = 'contacto@iaenblanco.com'

/** Identidad legal. Ya viaja en el JSON-LD de cada página; el footer la muestra. */
export const COMPANY_LEGAL_NAME = 'IAenBlanco SpA'
export const COMPANY_ADDRESS = 'Badajoz 100 Of 1014 · Las Condes, Santiago'

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
    shortTitle: 'Sitio web y tienda online',
    title: 'Un sitio web que explique lo que haces y haga que te escriban',
    eyebrow: 'Para que te encuentren y te contacten',
    statement: 'Tu sitio tiene que contestar tres cosas en diez segundos: qué haces, por qué confiar en ti y cómo hablar contigo.',
    description:
      'Hacemos tu sitio web, tu página de venta o tu tienda online. Que se entienda al tiro, que se vea bien en el celular y que la persona sepa exactamente cómo contactarte.',
    capabilities: [
      'Ordenar qué dice tu sitio y en qué orden',
      'Diseño que se ve bien en computador y en celular',
      'Sitio de empresa, página de venta o tienda online',
      'Botón de WhatsApp, formulario o carro de compra',
      'Que cargue rápido y aparezca en Google',
      'Cambios y mejoras después de publicarlo',
    ],
    idealFor: [
      'Negocios que hoy solo tienen Instagram, o nada',
      'Empresas cuyo sitio se ve viejo y no genera consultas',
      'Quien quiere empezar a vender por internet',
    ],
    signals: ['Sitio web', 'Tienda online', 'Se ve bien en el celular', 'Botón de WhatsApp'],
    seoTitle: 'Sitios web y tiendas online para empresas',
    seoDescription:
      'Diseñamos y programamos sitios web, páginas de venta y tiendas online que explican tu oferta, se ven bien en el celular y hacen que te contacten.',
  },
  {
    slug: 'plataformas-software-medida',
    index: '02',
    shortTitle: 'Un programa a tu medida',
    title: 'Un programa hecho para la forma en que trabaja tu negocio',
    eyebrow: 'Cuando el Excel ya no da',
    statement: 'Cuando el negocio se lleva en planillas, cada persona termina con su propia versión y nadie sabe cuál es la buena.',
    description:
      'Si hoy trabajas con planillas de Excel, WhatsApp y memoria, te hacemos un programa propio: con tus reglas, tus usuarios y quién puede ver cada cosa. Todos miran la misma información.',
    capabilities: [
      'Entender cómo trabajas hoy, paso a paso',
      'Un programa con tus reglas, no con las de una plantilla',
      'Una cuenta por persona y permisos según el cargo',
      'Que la información quede guardada y ordenada',
      'Que converse con los programas que ya usas',
      'Soporte y mejoras por etapas',
    ],
    idealFor: [
      'Equipos que llevan el negocio en planillas',
      'Empresas con una forma de trabajar muy propia',
      'Negocios donde cada persona debería ver solo lo suyo',
    ],
    signals: ['Tus reglas', 'Cada uno ve lo suyo', 'Todo en un lugar', 'Adiós al Excel'],
    seoTitle: 'Programas y plataformas a la medida de tu empresa',
    seoDescription:
      'Desarrollamos programas a la medida para empresas que hoy llevan todo en planillas de Excel: con tus reglas, tus usuarios y tus permisos.',
  },
  {
    slug: 'automatizaciones',
    index: '03',
    shortTitle: 'Tareas que se hacen solas',
    title: 'Que el computador haga las tareas repetitivas de todos los días',
    eyebrow: 'Menos copiar y pegar',
    statement: 'Si alguien pasa los mismos datos de un lado a otro todas las mañanas, eso se puede hacer solo.',
    description:
      'Conectamos los programas que ya usas para que la información viaje sola: sin copiar y pegar, sin que se pierda un dato y avisándote cuando algo se sale de lo normal.',
    capabilities: [
      'Encontrar qué tareas se repiten y dónde se cometen errores',
      'Conectar los programas y planillas que ya usas',
      'Generar solos los documentos de siempre',
      'Avisos automáticos cuando algo falla o se atrasa',
      'Una pantalla simple para ver cómo va todo',
      'Revisión y ajustes cuando el negocio cambia',
    ],
    idealFor: [
      'Equipos que copian la misma información entre herramientas',
      'Negocios que pierden tiempo revisando en qué va cada cosa',
      'Quien necesita enterarse al tiro cuando algo se cae',
    ],
    signals: ['Conecta tus programas', 'Te avisa solo', 'Menos errores', 'Ahorra horas'],
    seoTitle: 'Automatizar tareas repetitivas en tu empresa',
    seoDescription:
      'Automatizamos las tareas repetitivas de tu equipo: conectamos tus programas, generamos documentos solos y te avisamos cuando algo falla.',
  },
  {
    slug: 'soluciones-ia-medida',
    index: '04',
    shortTitle: 'Un asistente con IA',
    title: 'Un asistente con inteligencia artificial que conoce tu negocio',
    eyebrow: 'Responde aunque no estés',
    statement: 'La inteligencia artificial sirve cuando sabe de tu negocio de verdad. Si no sabe, inventa.',
    description:
      'Un asistente que contesta las preguntas de siempre, revisa documentos o clasifica pedidos usando la información real de tu negocio. Cuando el caso es delicado, te lo pasa a ti.',
    capabilities: [
      'Definir para qué sí y para qué no lo vas a usar',
      'Un asistente que responde con tu información, no con inventos',
      'Chat que contesta en tu sitio o en WhatsApp',
      'Leer y ordenar correos, audios, documentos o pedidos',
      'Que converse con los programas que ya tienes',
      'Pruebas contigo antes de soltarlo con clientes',
    ],
    idealFor: [
      'Empresas que quieren usar IA en algo concreto, no de adorno',
      'Equipos que contestan las mismas preguntas todo el día',
      'Negocios con muchos documentos o mensajes por revisar',
    ],
    signals: ['Responde solo', 'Sabe de tu negocio', 'Disponible siempre', 'Te pasa lo difícil'],
    seoTitle: 'Asistentes con inteligencia artificial para empresas',
    seoDescription:
      'Creamos asistentes con inteligencia artificial que responden con la información real de tu negocio, atienden consultas y derivan a una persona cuando corresponde.',
  },
  {
    slug: 'prospeccion-b2b-gestionada',
    index: '05',
    shortTitle: 'Te buscamos clientes',
    title: 'Te armamos la lista de empresas a las que vale la pena venderle',
    eyebrow: 'Empresas reales, no listas compradas',
    statement: 'Una base de datos comprada no sirve. Lo que sirve es saber a quién llamar, por qué a esa empresa y qué decirle.',
    description:
      'Definimos juntos a qué tipo de empresa le quieres vender. Las buscamos una por una, revisamos que existan y que calcen contigo, y te las entregamos ordenadas por prioridad, con el contacto y qué decirles.',
    capabilities: [
      'Definir juntos a qué empresas les quieres vender',
      'Buscarlas una por una, por rubro y por zona',
      'Revisar que existan de verdad y que tengan cómo contactarlas',
      'Ordenarlas: primero las que más te calzan',
      'Un mensaje sugerido para cada una',
      'Un servicio mensual que operamos nosotros',
    ],
    idealFor: [
      'Empresas que le venden a otras empresas',
      'Equipos comerciales que necesitan abrir mercado nuevo',
      'Quien está cansado de listas compradas que no responden',
    ],
    signals: ['Empresas reales', 'Verificadas una a una', 'Ordenadas por prioridad', 'Con qué decirles'],
    seoTitle: 'Buscamos clientes nuevos para tu empresa',
    seoDescription:
      'Servicio mensual que busca empresas reales a las que venderle, revisa que existan y te las entrega ordenadas por prioridad con el contacto y un mensaje sugerido.',
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
    eyebrow: 'Para quien vende en varios lados',
    promise: 'Tu inventario, tus precios y tus boletas cuadran solos en todos lados.',
    description:
      'Si vendes en tu tienda online, en marketplaces y en el local, Unifícalo mantiene todo cuadrado: cada venta descuenta del inventario en todas partes, los precios no se cruzan y las boletas salen solas.',
    problems: [
      'Deja de vender lo que ya no tienes en bodega.',
      'El mismo precio en todas partes, sin listas desactualizadas.',
      'Boletas y notas de crédito que salen solas y quedan registradas.',
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
    eyebrow: 'Para negocios que atienden con hora',
    promise: 'Tu WhatsApp responde, entiende audios y agenda horas aunque estés atendiendo.',
    description:
      'Citaly contesta tu WhatsApp cuando estás atendiendo: entiende lo que te piden (incluso por audio), ofrece las horas que tienes libres de verdad, confirma la reserva y te pasa el caso cuando se complica.',
    problems: [
      'Agenda, cambia y cancela horas conversando, como lo haría una persona.',
      'Entiende los audios de WhatsApp y responde con tus horas libres reales.',
      'Manda recordatorios y guarda tus clientes, tu equipo y tus cobros en un lugar.',
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
    eyebrow: 'Para quien le vende a empresas',
    promise: 'Empresas reales y verificadas, en vez de mandar mensajes al voleo.',
    description:
      'Con Leads buscas empresas chilenas por rubro y por comuna, ves cuáles tienen cómo contactarlas, las ordenas por prioridad y llevas el seguimiento de cada una en el mismo lugar.',
    problems: [
      'Buscas por rubro y por comuna, no listas genéricas.',
      'Te dice cuáles están listas para contactar y cuáles hay que revisar.',
      'Llevas el seguimiento de cada empresa hasta la reunión o la venta.',
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
