import { getWhatsappUrl, services, SITE_URL } from '@/lib/site'

export type ServiceSlug =
  | 'desarrollo-web-ia'
  | 'plataformas-software-medida'
  | 'automatizaciones'
  | 'soluciones-ia-medida'

export type ServiceProblemEntry = {
  label: string
  detail: string
  href: string
  serviceSlug?: ServiceSlug
}

export type ServiceCase = {
  client: string
  label: string
  title: string
  text: string
  href: string
  actionLabel: string
  logo?: string
}


export type ServiceFaq = {
  question: string
  answer: string
}

type BaseServicePageContent = {
  slug: ServiceSlug
  primaryCta: string
  whatsappMessage: string
  builds: { title: string; text: string }[]
  faqs: ServiceFaq[]
}

export type WebsiteServicePageContent = BaseServicePageContent & {
  slug: 'desarrollo-web-ia'
  caseStudy?: never
}

export type ServicePageContentWithCase = BaseServicePageContent & {
  slug: Exclude<ServiceSlug, 'desarrollo-web-ia'>
  caseStudy: ServiceCase
}

export type ServicePageContent = WebsiteServicePageContent | ServicePageContentWithCase

export type ServicePageContentMap = {
  'desarrollo-web-ia': WebsiteServicePageContent
} & {
  [K in Exclude<ServiceSlug, 'desarrollo-web-ia'>]: ServicePageContentWithCase & { slug: K }
}

const diagnosticMessage =
  'Hola IAenBlanco, quiero revisar qué servicio calza mejor con mi negocio.'

export const serviceProblemEntries: ServiceProblemEntry[] = [
  {
    label: 'No tengo sitio web, o el que tengo da vergüenza.',
    detail: 'Te hacemos el sitio o la tienda online.',
    href: '/servicios/desarrollo-web-ia/',
    serviceSlug: 'desarrollo-web-ia',
  },
  {
    label: 'Necesito un programa que no existe, o lo llevo en Excel.',
    detail: 'Te lo armamos a tu medida, y después lo administras tú.',
    href: '/servicios/plataformas-software-medida/',
    serviceSlug: 'plataformas-software-medida',
  },
  {
    label: 'Paso el día copiando datos de un lado a otro.',
    detail: 'Hacemos que esas tareas se hagan solas.',
    href: '/servicios/automatizaciones/',
    serviceSlug: 'automatizaciones',
  },
  {
    label: 'Contesto las mismas preguntas todo el día.',
    detail: 'Te armamos un asistente que responde por ti.',
    href: '/servicios/soluciones-ia-medida/',
    serviceSlug: 'soluciones-ia-medida',
  },
  {
    /* Buscar clientes dejo de ser un servicio que operamos nosotros. El
       problema sigue siendo real, asi que la entrada se queda: lo que cambia
       es la respuesta, que ahora es Leads, el programa, y no un servicio
       mensual. Sin serviceSlug a proposito: ya no apunta a una pagina de
       servicio. */
    label: 'Necesito clientes nuevos y no sé por dónde partir.',
    detail: 'Leads, nuestro programa, te arma la lista de empresas.',
    href: '/productos/#leads',
  },
  {
    label: 'Sé que algo se puede mejorar, pero no sé qué.',
    detail: 'Conversemos y lo ordenamos juntos, sin costo.',
    href: getWhatsappUrl(diagnosticMessage),
  },
]


export const servicePageContent: ServicePageContentMap = {
  'desarrollo-web-ia': {
    slug: 'desarrollo-web-ia',
    primaryCta: 'Quiero revisar mi sitio',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar un proyecto de sitio web o Shopify que convierta mejor.',
    builds: [
      {
        title: 'Ordenar qué dice y en qué orden',
        text: 'Definimos qué dice cada parte del sitio y en qué orden, para que se lea solo.',
      },
      {
        title: 'Diseño que se ve bien en cualquier pantalla',
        text: 'Un diseño que va con tu marca, que se lee fácil y que se ve igual de bien en el computador y en el celular.',
      },
      {
        title: 'El tipo de sitio que te conviene',
        text: 'Puede ser el sitio de tu empresa, una página para una promoción, un catálogo o una tienda online. Vemos cuál te sirve.',
      },
      {
        title: 'Que te puedan contactar fácil',
        text: 'Botón de WhatsApp, formulario o carro de compra, puestos donde la persona los va a buscar.',
      },
    ],
    faqs: [
      {
        question: '¿Es lo mismo una página web que un sitio web?',
        answer:
          'En el día a día se usan como sinónimos, y nosotros hacemos las dos cosas. Si hay que hilar fino: una página web es una sola pantalla, como una página de venta; un sitio web es el conjunto de varias, con inicio, servicios y contacto. Cuéntanos qué necesitas mostrar y te decimos cuál te conviene.',
      },
      {
        question: '¿Sirve si todavía no tengo todo el contenido listo?',
        answer:
          'Sí, es lo más normal. Partimos ordenando qué hay que decir y te vamos pidiendo lo que falta: fotos, textos, precios.',
      },
      {
        question: '¿Pueden conectar la web con WhatsApp?',
        answer:
          'Sí, y es lo que más recomendamos. El botón abre tu WhatsApp con el mensaje ya escrito, así sabes de qué página viene la persona.',
      },
      {
        question: '¿Y si quiero vender por internet?',
        answer:
          'Sí. Hacemos tiendas online, con catálogo, carro de compra y medios de pago. Te decimos qué plataforma conviene según lo que vendas.',
      },
      {
        question: '¿Qué necesitan para darme un precio?',
        answer:
          'Saber qué vendes, a quién, cuántas páginas necesitas, si ya tienes fotos y textos, y algún sitio que te guste como referencia.',
      },
      {
        question: '¿De qué depende el plazo?',
        answer:
          'De cuántas páginas sean, de si tienes el contenido listo y de cuántas vueltas de revisión quieras. Un sitio simple puede estar en pocas semanas.',
      },
      {
        question: '¿Qué pasa después de lanzar?',
        answer:
          'Quedamos disponibles para los ajustes que salgan. Y si quieres, seguimos mes a mes agregando contenido y mejorando lo que no esté funcionando.',
      },
    ],
  },
  'plataformas-software-medida': {
    slug: 'plataformas-software-medida',
    primaryCta: 'Quiero contarles mi idea',
    whatsappMessage:
      'Hola IAenBlanco, tengo una idea de un programa a medida y quiero saber si se puede hacer.',
    builds: [
      {
        title: 'Cómo trabajas hoy',
        text: 'Miramos cómo trabajas de verdad y lo convertimos en las reglas del programa.',
      },
      {
        title: 'Las pantallas donde trabaja tu equipo',
        text: 'Pantallas simples para cargar, revisar, aprobar y buscar lo que necesiten.',
      },
      {
        title: 'Dónde se guarda la información',
        text: 'Dejamos la información guardada, ordenada y protegida, sin archivos sueltos.',
      },
      {
        title: 'Lo administras tú',
        text: 'Precios, textos, usuarios y permisos los cambias desde adentro, sin escribirnos. Y crece por etapas: primero lo que más te urge.',
      },
    ],
    caseStudy: {
      client: 'Propinvest',
      label: 'Un trabajo nuestro',
      title: 'Catálogo inmobiliario editable.',
      text: 'IAenBlanco construyó una base digital para administrar propiedades, comunicar fichas y mantener contenido comercial sin depender de cambios manuales externos. La administración interna no es pública.',
      href: 'https://propinvest.cl/',
      actionLabel: 'Abrir el sitio',
    },
    faqs: [
      {
        question: '¿Y si lo que quiero no se puede hacer?',
        answer:
          'Casi siempre se puede. Si de verdad no se puede, te lo decimos al tiro y por qué, no después de cobrarte. Lo que pasa más seguido es lo contrario: que se puede resolver más simple de lo que imaginabas, y eso también te lo decimos.',
      },
      {
        question: '¿Tengo que llamarlos cada vez que quiero cambiar algo?',
        answer:
          'No. El programa queda autoadministrable: los textos, los precios, los usuarios y los permisos los cambias tú desde adentro. Nos escribes cuando quieras algo nuevo, no para lo del día a día.',
      },
      {
        question: '¿No me conviene mejor comprar un programa ya hecho?',
        answer:
          'A veces sí, y te lo vamos a decir. Un programa a medida se justifica cuando el que existe te obliga a cambiar cómo trabajas, o cuando igual terminas usando Excel al lado.',
      },
      {
        question: '¿Se puede partir pequeño?',
        answer:
          'Sí, y es lo que recomendamos. Partimos por lo que más te duele hoy. El resto lo agregamos después, cuando ya lo estés usando.',
      },
      {
        question: '¿Puedo controlar quién ve qué?',
        answer:
          'Sí. Cada persona entra con su cuenta y ve solo lo que le corresponde. Es una de las razones principales para dejar el Excel.',
      },
      {
        question: '¿Qué necesitan para darme un precio?',
        answer:
          'Saber cuántas personas lo van a usar, qué hace cada una, qué información manejan y qué parte del proceso te duele más hoy. Una conversación suele bastar.',
      },
      {
        question: '¿De qué depende el plazo?',
        answer:
          'De cuánta gente lo use, cuántas reglas tenga y con qué programas se conecte. Por eso lo hacemos por etapas: así ves resultados antes.',
      },
    ],
  },
  automatizaciones: {
    slug: 'automatizaciones',
    primaryCta: 'Quiero automatizar una tarea',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar un flujo manual que podría automatizarse.',
    builds: [
      {
        title: 'Dibujar la tarea',
        text: 'Anotamos qué entra, qué hay que revisar, qué pasa si algo falla y qué tiene que salir.',
      },
      {
        title: 'Conectar tus programas',
        text: 'Que los programas que ya usas se hablen entre ellos, para no escribir lo mismo dos veces.',
      },
      {
        title: 'Revisiones y avisos',
        text: 'El programa revisa que no falte nada y te avisa cuando algo necesita tu ojo.',
      },
      {
        title: 'Una pantalla para ver cómo va',
        text: 'Entras y ves en qué va todo, qué está pendiente y qué ya se hizo.',
      },
    ],
    caseStudy: {
      client: 'Granja Magdalena',
      label: 'Un ejemplo del tipo de negocio',
      title: 'Dónde este trabajo rinde: un negocio que vende, despacha y responde todos los días.',
      text: 'Su tienda es de las que hicimos nosotros. La usamos acá como ejemplo del tipo de operación donde estas automatizaciones rinden —catálogo, pedidos, boletas y seguimiento—, no como un trabajo de automatización que le hayamos hecho.',
      href: 'https://granjamagdalena.cl/',
      actionLabel: 'Abrir el sitio',
    },
    faqs: [
      {
        question: '¿Todo se debe automatizar?',
        answer:
          'No, y te lo vamos a decir de frente. Se automatiza lo repetido y lo que tiene reglas claras. Lo que necesita criterio, mejor que lo siga viendo una persona.',
      },
      {
        question: '¿Sirve con los programas que ya tengo?',
        answer:
          'Casi siempre sí. Lo revisamos antes de prometerte nada: si un programa no se deja conectar, te lo decimos al tiro.',
      },
      {
        question: '¿Y si falla y nadie se da cuenta?',
        answer:
          'Por eso siempre incluimos avisos: si algo se cae o queda a medias, te llega un aviso en vez de quedar escondido. Y te dejamos una pantalla donde puedes revisar el estado cuando quieras.',
      },
      {
        question: '¿Qué se puede conectar?',
        answer:
          'Depende del caso, pero lo habitual es conectar planillas, formularios, WhatsApp, correo, tu tienda online y los programas administrativos que ya usas.',
      },
      {
        question: '¿Qué necesitan para darme un precio?',
        answer:
          'Que nos cuentes la tarea: qué haces hoy paso a paso, cada cuánto, con qué programas y qué pasa cuando algo sale raro.',
      },
      {
        question: '¿De qué depende el plazo?',
        answer:
          'De qué tan clara esté la tarea y de cuántos casos raros haya que cubrir. Una automatización simple puede estar en días.',
      },
    ],
  },
  'soluciones-ia-medida': {
    slug: 'soluciones-ia-medida',
    primaryCta: 'Quiero ver si me sirve',
    whatsappMessage:
      'Hola IAenBlanco, quiero evaluar una solución de IA aplicada a mi operación.',
    builds: [
      {
        title: 'Para qué lo vas a usar',
        text: 'Acordamos qué puede contestar el asistente, qué no, y cuándo te tiene que pasar el caso.',
      },
      {
        title: 'Enseñarle sobre tu negocio',
        text: 'Le damos tu información real: precios, horarios, servicios, lo que sea que necesite saber.',
      },
      {
        title: 'Armar el asistente',
        text: 'Lo dejamos andando donde lo necesitas: en tu sitio, en WhatsApp o adentro de tu programa.',
      },
      {
        title: 'Probarlo antes de soltarlo',
        text: 'Lo probamos contigo hasta que responda bien, con tu tono y sin decir cosas que no debe.',
      },
    ],
    caseStudy: {
      client: 'Citaly',
      label: 'Un programa nuestro',
      title: 'El mismo tipo de asistente, lo estamos terminando como programa.',
      text: 'Citaly se hace cargo del calendario de un negocio: toma las horas, las mueve, las cancela y contesta por él, escrito o por audio. Está por abrir, y es la mejor muestra de que esto lo sabemos construir: tu asistente sería a tu medida, con tus reglas.',
      href: 'https://citaly.cl/',
      actionLabel: 'Ver el sitio',
    },
    faqs: [
      {
        question: '¿Esto reemplaza a mi gente?',
        answer:
          'No. Sirve para sacarle de encima lo repetitivo a tu equipo, no para reemplazarlo. Lo que necesita criterio sigue siendo de una persona.',
      },
      {
        question: '¿Y si le preguntan algo que no sabe?',
        answer:
          'Lo dejamos configurado para que diga que no sabe y te pase el caso, en vez de inventar. Eso se define contigo antes de soltarlo.',
      },
      {
        question: '¿Necesito tener todo ordenado para empezar?',
        answer:
          'No. Pero sí hay que juntar lo mínimo: tus servicios, tus precios, tus horarios. Sin eso, el asistente inventa, y eso no le sirve a nadie.',
      },
      {
        question: '¿En qué se diferencia de usar ChatGPT?',
        answer:
          'ChatGPT no sabe tus precios, tus horarios ni tu stock. Este asistente sí, porque le damos tu información y le ponemos límites de qué puede decir.',
      },
      {
        question: '¿Qué necesitan para darme un precio?',
        answer:
          'Saber qué quieres que haga, dónde va a estar (WhatsApp, tu sitio), qué información tiene disponible y en qué casos debe pasarte el caso a ti.',
      },
      {
        question: '¿Puedo probarlo antes de comprometerme?',
        answer:
          'Sí, y es lo que recomendamos. Partimos con algo chico, lo pruebas con casos reales de tu negocio, y si funciona lo ampliamos.',
      },
    ],
  },
}

export function getServicePageContent(slug: string) {
  return servicePageContent[slug as ServiceSlug]
}

export function getServiceByContentSlug(slug: ServiceSlug) {
  return services.find((service) => service.slug === slug)
}

export function serviceCanonical(slug: ServiceSlug) {
  return `${SITE_URL}/servicios/${slug}/`
}
