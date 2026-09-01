export const SITE_URL = 'https://iaenblanco.com'

/**
 * El unico lugar donde vive el numero. Estaba escrito a mano en ocho literales
 * repartidos en cuatro archivos, asi que cambiarlo obligaba a cazarlos uno por
 * uno y alcanzaba con olvidar uno para dejar mensajes cayendo en el viejo.
 * Todo lo demas -el link de WhatsApp, el telefono que se muestra, el JSON-LD-
 * se deriva de aca.
 */
export const WHATSAPP_NUMBER = '56986468029'

/**
 * Los nueve botones generales de WhatsApp mandaban el mismo texto -"quiero
 * conversar sobre un proyecto"- viniera el visitante de la portada, del pie o
 * del boton flotante. Eso dejaba dos cosas rotas a la vez: la FAQ de servicios
 * promete por escrito que "el boton abre tu WhatsApp con el mensaje ya escrito,
 * asi sabes de que pagina viene la persona" -services-content.ts-, y sin ese
 * dato no hay forma de saber, ni en la conversacion ni en la medicion, cual de
 * los nueve botones trae gente.
 *
 * Cada mensaje lo escribe el visitante, no nosotros: nombra el lugar como el
 * lo vio -"el boton de arriba", "el final del sitio"-, no como se llama el
 * componente. Los que estan en la cabecera, el pie, la banda y el boton
 * flotante viven en las once rutas, asi que nombran el lugar y no la pagina;
 * los tres que si son de una pagina la nombran.
 *
 * Los otros trece enlaces del sitio ya llamaban a getWhatsappUrl con su propio
 * mensaje; estos nueve eran los unicos que compartian uno solo.
 */
export const MENSAJES_WHATSAPP = {
  portada: 'Hola IAenBlanco. Vengo de la portada del sitio y quiero contarles una idea.',
  cabecera: 'Hola IAenBlanco. Escribo desde el botón de arriba del sitio para conversar sobre un proyecto.',
  menu: 'Hola IAenBlanco. Escribo desde el menú del sitio para conversar sobre un proyecto.',
  productos: 'Hola IAenBlanco. Estuve viendo la página de productos y quiero saber cuál me sirve.',
  contacto: 'Hola IAenBlanco. Los escribo desde la página de contacto para conversar sobre un proyecto.',
  banda: 'Hola IAenBlanco. Terminé de leer una página del sitio y quiero conversar sobre un proyecto.',
  pie: 'Hola IAenBlanco. Llegué hasta el final del sitio y quiero conversar sobre un proyecto.',
  'pie-datos': 'Hola IAenBlanco. Encontré este número en los datos de contacto del sitio.',
  flotante: 'Hola IAenBlanco. Escribo desde el botón flotante del sitio para conversar sobre un proyecto.',
} as const

export const CONTACT_EMAIL = 'contacto@iaenblanco.com'

/**
 * La linea gobernante de la marca. Vive aca porque la escriben tres sitios: el
 * pie del sitio, el texto alternativo de la tarjeta de enlace, y la tarjeta
 * misma -herramientas/og.mjs, que no puede importar TypeScript y la lleva
 * copiada con un comentario que apunta hasta aca-.
 */
export const LEMA = 'Trabajamos con negocios chilenos que ya están funcionando.'

/**
 * La tarjeta que se ve cuando alguien pega un enlace del sitio en un chat. Es
 * una sola imagen para las once rutas, y se genera con herramientas/og.mjs.
 *
 * El alt describe lo que dice la IMAGEN, no lo que dice la pagina. Estaba
 * escrito a mano en seis metadatas -cinco con el mismo texto y la de servicios
 * con uno propio-, asi que al cambiar la tarjeta los seis quedaron
 * describiendo un dibujo que ya no existe. Desde aca no puede volver a pasar.
 */
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: `IAenBlanco. ${LEMA}`,
}

/**
 * Identidad legal. El JSON-LD de cada página lleva nombre, correo, teléfono y
 * dirección, pero NO el RUT: el footer es el único lugar donde se publica.
 */
export const COMPANY_LEGAL_NAME = 'IAenBlanco SpA'
export const COMPANY_ADDRESS = 'Badajoz 100 Of 1014 · Las Condes, Santiago'
export const COMPANY_TAX_ID = 'RUT 78.403.861-0'
/** El mismo WHATSAPP_NUMBER de arriba, escrito como se lee. */
export const COMPANY_PHONE = '+56 9 8646 8029'

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
  /** Rango típico, no un compromiso. Se ajusta acá y cambia en todo el sitio. */
  plazo: string
  signals: string[]
  seoTitle: string
  seoDescription: string
}

export const services: Service[] = [
  {
    slug: 'desarrollo-web-ia',
    index: '01',
    shortTitle: 'Sitio web y tienda online',
    title: 'Una página web que explique lo que haces y haga que te escriban',
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
    plazo: 'Entre 2 y 6 semanas, según cuántas páginas sean',
    signals: ['Sitio web', 'Tienda online', 'Se ve bien en el celular', 'Botón de WhatsApp'],
    seoTitle: 'Sitios web y tiendas online para empresas',
    seoDescription:
      'Diseñamos y programamos páginas web, sitios web y tiendas online que explican tu oferta, se ven bien en el celular y hacen que te contacten.',
  },
  {
    slug: 'plataformas-software-medida',
    index: '02',
    shortTitle: 'Un programa a tu medida',
    /* Todo esto se contaba como "salir del Excel", y eso deja afuera a quien
       llega con una idea que cree que no se puede programar -que es la mayoria-.
       Dos cosas nuevas: que si sabes explicar como funciona se puede construir,
       y que despues lo administras tu, sin pedirnos permiso para cada cambio. */
    title: 'Armamos el programa que crees que no se puede hacer',
    eyebrow: 'Cuando no existe el programa que necesitas',
    statement: 'Casi nunca es que no se pueda hacer: es que nadie te ha dicho cómo. Si sabes explicar cómo funciona tu negocio, se puede construir.',
    description:
      'Te hacemos un programa propio, con tus reglas, tus usuarios y quién puede ver cada cosa. Y queda autoadministrable: los precios, los textos, los usuarios y los permisos los cambias tú desde adentro, sin escribirnos y sin esperar a nadie.',
    capabilities: [
      'Entender cómo trabajas hoy, paso a paso',
      'Un programa con tus reglas, no con las de una plantilla',
      'Que lo administres tú: cambiar cosas sin depender de nosotros',
      'Una cuenta por persona y permisos según el cargo',
      'Que la información quede guardada y ordenada',
      'Que converse con los programas que ya usas',
    ],
    idealFor: [
      'Quien tiene una idea y le han dicho que no se puede',
      'Equipos que llevan el negocio en planillas',
      'Empresas con una forma de trabajar muy propia',
    ],
    plazo: 'La primera versión, entre 6 y 12 semanas',
    signals: ['Tus reglas', 'Lo administras tú', 'Cada uno ve lo suyo', 'Todo en un lugar'],
    seoTitle: 'Programas y plataformas a la medida de tu empresa',
    seoDescription:
      'Desarrollamos programas a la medida para empresas: con tus reglas, tus usuarios y tus permisos, y autoadministrables para que los cambios los hagas tú.',
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
    plazo: 'Entre 1 y 3 semanas por tarea',
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
    plazo: 'Entre 3 y 6 semanas, con pruebas incluidas',
    signals: ['Responde solo', 'Sabe de tu negocio', 'Disponible siempre', 'Te pasa lo difícil'],
    seoTitle: 'Asistentes con inteligencia artificial para empresas',
    seoDescription:
      'Creamos asistentes con inteligencia artificial que responden con la información real de tu negocio, atienden consultas y derivan a una persona cuando corresponde.',
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
  /** El sitio del producto. Existe, aunque todavia no se venda desde ahi. */
  sitio: string
  ctaLabel: string
  /** true cuando cualquiera puede contratarlo solo, sin hablar con nosotros. */
  selfServe: boolean
  /** Para quien es, en cuatro o cinco palabras. Va en la micro-etiqueta. */
  paraQuien: string
  /** La promesa en una linea, escrita a la medida de la caja del titular. */
  promesaCorta: string
  /**
   * El diptico: la misma tabla del negocio mostrada como esta hoy y como
   * queda con el programa. Los valores son ILUSTRATIVOS y la pagina lo dice
   * con todas sus letras; no son resultados medidos de ningun cliente.
   */
  diptico: Diptico
}

export type DipticoFila = {
  etiqueta: string
  detalle: string
  hoy: string
  despues: string
  /** Marca en rojo el valor de hoy. Como maximo dos por producto. */
  alarma?: boolean
}

export type Diptico = {
  despuesLabel: string
  filas: DipticoFila[]
  remateHoy: string
  remateDespues: string
}

/*
 * El estado "en camino" en un solo lugar. Estaba escrito tres veces, y de el
 * depende el numero que la franja del heroe muestra: si una ficha cambia el
 * texto a mano, el conteo se despega de la lista sin que nadie se entere.
 */
export const ESTADO_EN_CAMINO = 'Próximamente'

export const products: Product[] = [
  {
    id: 'unificalo',
    name: 'Unifícalo',
    status: ESTADO_EN_CAMINO,
    statusMeaning: 'Lo estamos terminando con los primeros negocios. Todavía no está listo.',
    offer: 'Sin compromiso · lo vemos por WhatsApp',
    ctaLabel: 'Hablemos de Unifícalo',
    selfServe: false,
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
    href: getWhatsappUrl('Hola, vendo en varios lados y quiero saber cómo funciona Unifícalo.'),
    sitio: 'https://unificalo.cl',
    paraQuien: 'Si vendes en varios lados',
    promesaCorta: 'Vendes en cuatro partes y el stock es uno solo.',
    diptico: {
      despuesLabel: 'Con Unifícalo',
      filas: [
        { etiqueta: 'Tu local', detalle: 'Bsale', hoy: '4', despues: '4' },
        { etiqueta: 'Tu tienda online', detalle: 'Shopify', hoy: '12', despues: '4', alarma: true },
        { etiqueta: 'Mercado Libre', detalle: 'Publicación activa', hoy: '12', despues: '4', alarma: true },
        { etiqueta: 'Uber Eats', detalle: 'Carta del día', hoy: '0', despues: '4' },
      ],
      remateHoy: 'Vendiste dos veces lo mismo. El reembolso lo pones tú.',
      remateDespues: 'Una venta en cualquier parte y las otras tres se enteran.',
    },
  },
  {
    id: 'citaly',
    name: 'Citaly',
    status: ESTADO_EN_CAMINO,
    statusMeaning: 'Está en pruebas con negocios reales.',
    offer: 'Sin compromiso · lo vemos por WhatsApp',
    ctaLabel: 'Hablemos de Citaly',
    selfServe: false,
    eyebrow: 'Para negocios que atienden con hora',
    /* Citaly se contaba entera desde el WhatsApp y el calendario quedaba
       escondido, que es lo que de verdad hace. El sujeto ahora es la agenda:
       toma la hora, la mueve, la cancela, recomienda y contesta por ti. El
       WhatsApp es la puerta por donde entra el cliente, no el producto. */
    promise: 'Un agente de IA que se hace cargo de tu agenda: toma horas, las mueve, las cancela y contesta por ti.',
    description:
      'Citaly se hace cargo de tu calendario. Toma las horas, las mueve cuando el cliente no puede, las cancela, recomienda las que te quedan libres y contesta por ti mientras estás atendiendo. El cliente lo hace conversando por WhatsApp, escribiendo o por audio, y tú abres el teléfono con la agenda ya cuadrada.',
    problems: [
      'Toma, mueve y cancela horas conversando, como lo haría una persona.',
      'Recomienda las horas que tienes libres de verdad, no las que ya diste.',
      'Manda recordatorios y guarda tus clientes, tu equipo y tus cobros en un lugar.',
    ],
    integrations: ['Agenda', 'WhatsApp', 'Audios', 'Reservas', 'Recordatorios', 'CRM'],
    href: getWhatsappUrl('Hola, atiendo con hora y quiero saber cómo funciona Citaly.'),
    sitio: 'https://citaly.cl',
    paraQuien: 'Si atiendes con hora',
    promesaCorta: 'Se hace cargo de tu agenda: toma horas, las mueve y las cancela.',
    diptico: {
      despuesLabel: 'Con Citaly',
      filas: [
        { etiqueta: '21:40', detalle: 'Audio de 14 segundos', hoy: 'Sin abrir', despues: 'Entendido' },
        { etiqueta: '21:41', detalle: '«¿Tienen mañana?»', hoy: 'Sin responder', despues: 'Le ofrece tres horas', alarma: true },
        { etiqueta: '08:12', detalle: 'El cliente no volvió', hoy: 'Se fue a otra parte', despues: 'Hora tomada, 11:30', alarma: true },
        { etiqueta: '08:30', detalle: 'Abres el teléfono', hoy: 'Mensajes sin leer', despues: 'Nada pendiente' },
      ],
      remateHoy: 'El cliente no espera. Se va donde le contesten.',
      remateDespues: 'Ofreció horas a las 21:41 y dejó la cita tomada, contigo cerrado.',
    },
  },
  {
    id: 'leads',
    name: 'Leads',
    status: ESTADO_EN_CAMINO,
    statusMeaning: 'Lo estamos afinando con los primeros clientes.',
    offer: 'Sin compromiso · lo vemos por WhatsApp',
    ctaLabel: 'Hablemos de Leads',
    selfServe: false,
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
    href: getWhatsappUrl('Hola, le vendo a empresas y quiero saber cómo funciona Leads.'),
    sitio: 'https://leads.iaenblanco.com',
    paraQuien: 'Si le vendes a empresas',
    promesaCorta: 'Empresas que existen de verdad, ordenadas por cuál llamar primero.',
    diptico: {
      despuesLabel: 'Con Leads',
      filas: [
        { etiqueta: 'Rubro y comuna', detalle: 'Lo que buscaste', hoy: 'Una lista larga', despues: 'Solo las que calzan' },
        { etiqueta: 'Teléfono', detalle: 'Para llamar hoy', hoy: 'Hay que buscarlo', despues: 'Viene en la ficha', alarma: true },
        { etiqueta: '¿Sigue operando?', detalle: 'Antes de gastar la llamada', hoy: 'No lo sabes', despues: 'Revisado', alarma: true },
        { etiqueta: 'A cuál llamas primero', detalle: 'El orden del día', hoy: 'Al azar', despues: '1 · 2 · 3 · 4' },
      ],
      remateHoy: 'Se te va la mañana buscando a mano.',
      remateDespues: 'Partes por las que te calzan, no por las que salieron primero.',
    },
  },
]

/*
 * Cuantos programas propios siguen sin abrir. Sale de la lista y no escrito a
 * mano: la misma franja del heroe ya decia 5 sitios cuando ya eran 7.
 */
export const programasEnCamino = products.filter(
  (producto) => producto.status === ESTADO_EN_CAMINO,
).length

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export type OrigenWhatsapp = keyof typeof MENSAJES_WHATSAPP

/** El enlace de WhatsApp del lugar desde donde se hace clic. Ver MENSAJES_WHATSAPP. */
export function getWhatsappDesde(origen: OrigenWhatsapp) {
  return getWhatsappUrl(MENSAJES_WHATSAPP[origen])
}

export function getWhatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
