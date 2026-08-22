import { getWhatsappUrl, services, SITE_URL } from '@/lib/site'

export type ServiceSlug =
  | 'desarrollo-web-ia'
  | 'plataformas-software-medida'
  | 'automatizaciones'
  | 'soluciones-ia-medida'
  | 'prospeccion-b2b-gestionada'

export type ServiceProblemEntry = {
  label: string
  detail: string
  href: string
  serviceSlug?: ServiceSlug
}

export type ServiceDiagramStep = {
  title: string
  detail: string
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
  result: string
  heroLead: string
  primaryCta: string
  whatsappMessage: string
  problems: string[]
  builds: { title: string; text: string }[]
  deliverables: string[]
  diagram: {
    label: string
    steps: ServiceDiagramStep[]
    exception?: {
      title: string
      detail: string
    }
  }
  useCases: { title: string; text: string }[]
  process: { title: string; text: string }[]
  engagementModes: string[]
  faqs: ServiceFaq[]
  nextSlug: ServiceSlug
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
    label: 'Llevo el negocio en planillas de Excel.',
    detail: 'Te hacemos un programa con tus reglas y tus permisos.',
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
    label: 'Necesito clientes nuevos y no sé por dónde partir.',
    detail: 'Te buscamos empresas reales a las que venderle.',
    href: '/servicios/prospeccion-b2b-gestionada/',
    serviceSlug: 'prospeccion-b2b-gestionada',
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
    result: 'Un sitio que se entiende rápido, se ve serio y hace que te escriban.',
    heroLead:
      'Ordenamos qué dice tu sitio, en qué orden y cómo se ve. La idea es simple: que quien entre entienda al tiro qué haces, sienta que puede confiar y sepa cómo escribirte. Que deje de ser un folleto y empiece a traerte consultas.',
    primaryCta: 'Quiero revisar mi sitio',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar un proyecto de sitio web o Shopify que convierta mejor.',
    problems: [
      'Tu sitio se ve bien, pero no explica en diez segundos por qué elegirte a ti.',
      'La gente lee y no sabe qué hacer después: no encuentra el botón ni el número.',
      'Tu trabajo es bueno, pero el sitio lo hace ver más chico de lo que es.',
      'Hay mucho texto y ningún camino claro hacia el WhatsApp o el carro de compra.',
      'En el celular se ve apretado, o se demora tanto que la gente se va.',
    ],
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
    deliverables: [
      'El plan de qué dice cada página, aprobado por ti.',
      'El diseño de todas las secciones, para computador y celular.',
      'El sitio programado, rápido y fácil de leer.',
      'Tu WhatsApp, tu formulario o tu carro de compra, funcionando.',
      'Lo necesario para que Google pueda encontrarte y mostrarte bien.',
      'La publicación hecha y los ajustes que salgan después.',
    ],
    diagram: {
      label: 'Cómo funciona',
      steps: [
        { title: 'Mensaje', detail: 'Qué vendes y por qué confiar.' },
        { title: 'Experiencia', detail: 'Recorrido claro y visual.' },
        { title: 'Conversión', detail: 'CTA en el momento correcto.' },
        { title: 'WhatsApp / compra', detail: 'Contacto o acción concreta.' },
        { title: 'Seguimiento', detail: 'Medición y mejora.' },
      ],
    },
    useCases: [
      {
        title: 'Empresa de servicios',
        text: 'Explicar una oferta compleja y transformarla en solicitudes por WhatsApp o formulario.',
      },
      {
        title: 'E-commerce o catálogo',
        text: 'Mostrar productos, ordenar categorías y preparar una experiencia de compra o contacto.',
      },
      {
        title: 'Nuevo producto',
        text: 'Crear una landing enfocada en comunicar valor, validar interés y abrir conversaciones.',
      },
    ],
    process: [
      { title: 'Entender qué vendes', text: 'Vemos a quién le vendes, qué ofreces y cómo decide comprar tu cliente.' },
      { title: 'Ordenar qué se dice', text: 'Definimos las páginas, qué va en cada una y dónde ponemos los botones.' },
      { title: 'Diseñarlo y programarlo', text: 'Lo diseñamos y lo programamos, cuidando que cargue rápido y se entienda.' },
      { title: 'Publicarlo y ver cómo va', text: 'Lo dejamos en línea, miramos cómo se comporta y ajustamos lo que haga falta.' },
    ],
    engagementModes: [
      'Una sola página, para una promoción o un servicio.',
      'El sitio completo de tu empresa.',
      'Una tienda online para vender por internet.',
      'Un plan mensual para ir mejorándolo.',
    ],
    faqs: [
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
    nextSlug: 'plataformas-software-medida',
  },
  'plataformas-software-medida': {
    slug: 'plataformas-software-medida',
    result: 'Un programa propio donde tu equipo trabaja con la misma información.',
    heroLead:
      'Llega un punto en que el Excel ya no da: se duplican archivos, alguien pisa el dato de otro y nadie sabe cuál es la versión buena. Te hacemos un programa con tus reglas, donde cada persona entra con su cuenta y ve solo lo que le toca.',
    primaryCta: 'Quiero salir del Excel',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar una plataforma o software a medida para ordenar mi operación.',
    problems: [
      'Hay tres versiones de la misma planilla y nadie sabe cuál es la buena.',
      'Se repite trabajo porque cada uno tiene su archivo aparte.',
      'Necesitas que cada persona vea solo lo suyo, y el Excel no sabe hacer eso.',
      'Para saber cómo va el mes hay que pedirle el reporte a alguien.',
    ],
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
        title: 'Crece de a poco',
        text: 'Hacemos primero lo que más te urge, y dejamos todo listo para agregar más después.',
      },
    ],
    deliverables: [
      'Un documento con cómo trabajas hoy, escrito y validado contigo.',
      'Quién puede ver y hacer qué, definido contigo.',
      'Las pantallas del programa, listas para usar.',
      'Toda tu información guardada y ordenada, con tus reglas aplicadas.',
      'Poder cargar, editar, buscar y revisar sin depender de nadie.',
      'Un instructivo simple y acompañamiento las primeras semanas.',
    ],
    diagram: {
      label: 'Cómo funciona por dentro',
      steps: [
        { title: 'Usuarios', detail: 'Equipo y roles.' },
        { title: 'Permisos', detail: 'Qué puede hacer cada perfil.' },
        { title: 'Reglas', detail: 'Validaciones y estados.' },
        { title: 'La información', detail: 'Guardada y ordenada.' },
        { title: 'Panel', detail: 'Operación visible.' },
      ],
    },
    useCases: [
      {
        title: 'Panel interno',
        text: 'Gestionar solicitudes, estados, responsables y archivos desde un solo lugar.',
      },
      {
        title: 'Catálogo administrable',
        text: 'Permitir que el equipo actualice contenido, fichas o disponibilidad sin pedir cambios manuales.',
      },
      {
        title: 'Operación con aprobaciones',
        text: 'Ordenar flujos donde una acción depende de permisos, revisión o cumplimiento de reglas.',
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
    process: [
      { title: 'Entender cómo trabajas', text: 'Vemos quién hace qué, con qué información y dónde se traba todo.' },
      { title: 'Acordar hasta dónde llega', text: 'Elegimos qué entra en la primera versión, para no gastar de más ni demorarnos de más.' },
      { title: 'Construirlo', text: 'Programamos las pantallas, las reglas y los permisos de cada persona.' },
      { title: 'Usarlo y mejorarlo', text: 'Te acompañamos mientras lo usan de verdad, y agregamos lo que vaya faltando.' },
    ],
    engagementModes: [
      'Una primera versión que ya puedes usar.',
      'El programa completo para todo tu equipo.',
      'Una pantalla conectada a los programas que ya usas.',
      'Un plan mensual de soporte y mejoras.',
    ],
    faqs: [
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
        question: '¿Cómo decidimos qué entra en la primera versión?',
        answer:
          'Partimos por lo que más te duele. Lo demás queda anotado para después, y te decimos con franqueza qué no vale la pena construir todavía.',
      },
      {
        question: '¿De qué depende el plazo?',
        answer:
          'De cuánta gente lo use, cuántas reglas tenga y con qué programas se conecte. Por eso lo hacemos por etapas: así ves resultados antes.',
      },
    ],
    nextSlug: 'automatizaciones',
  },
  automatizaciones: {
    slug: 'automatizaciones',
    result: 'Horas que dejas de perder copiando datos, y menos errores.',
    heroLead:
      'Si alguien de tu equipo hace la misma tarea todas las mañanas, esa tarea se puede hacer sola. Conectamos los programas que ya usas para que la información viaje sin que nadie la copie, y para que te avise cuando algo se sale de lo normal.',
    primaryCta: 'Quiero automatizar una tarea',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar un flujo manual que podría automatizarse.',
    problems: [
      'Alguien pasa los mismos datos de un programa a otro, todos los días.',
      'Se cuelan errores porque nadie alcanza a revisar antes de guardar.',
      'Algo queda pendiente y te enteras cuando ya es tarde.',
      'Armar el reporte del mes toma horas y siempre llega atrasado.',
    ],
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
    deliverables: [
      'Un dibujo de cómo se hace hoy y cómo va a quedar.',
      'Qué se revisa automáticamente y qué pasa cuando algo no calza.',
      'Tus programas y planillas conectados entre sí.',
      'Avisos automáticos cuando algo falla o queda pendiente.',
      'Una pantalla simple para ver cómo va todo.',
      'Un instructivo para que tu equipo lo entienda y lo pueda mantener.',
    ],
    diagram: {
      label: 'Cómo funciona',
      steps: [
        { title: 'Sistema A', detail: 'Entrada de datos.' },
        { title: 'Validación', detail: 'Campos y condiciones.' },
        { title: 'Reglas', detail: 'Decisión automática.' },
        { title: 'Sistema B', detail: 'Actualización.' },
        { title: 'Aviso', detail: 'Te enteras al tiro.' },
      ],
      exception: {
        title: 'Excepción',
        detail: 'Si algo no calza, se deriva a revisión humana antes de avanzar.',
      },
    },
    useCases: [
      {
        title: 'Ventas y operaciones',
        text: 'Mover una solicitud desde formulario o WhatsApp hacia seguimiento interno.',
      },
      {
        title: 'Documentos y estados',
        text: 'Actualizar registros, generar documentos o avisar cuando falta información.',
      },
      {
        title: 'Reportes recurrentes',
        text: 'Consolidar datos y preparar una vista de control sin trabajo manual diario.',
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
    process: [
      { title: 'Detectar repetición', text: 'Elegimos un flujo manual con volumen, error o impacto operativo.' },
      { title: 'Definir reglas', text: 'Acordamos qué se automatiza, qué se valida y qué debe revisar una persona.' },
      { title: 'Conectar y probar', text: 'Implementamos la integración y probamos casos reales antes de operar.' },
      { title: 'Monitorear', text: 'Dejamos alertas y visibilidad para detectar fallas o mejoras.' },
    ],
    engagementModes: [
      'Una tarea específica, resuelta.',
      'Varias tareas de un mismo proceso, en un paquete.',
      'Una pantalla donde ves el estado de todo.',
      'Mantención mensual y mejoras.',
    ],
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
    nextSlug: 'soluciones-ia-medida',
  },
  'soluciones-ia-medida': {
    slug: 'soluciones-ia-medida',
    result: 'Un asistente que responde de verdad, con la información de tu negocio.',
    heroLead:
      'La inteligencia artificial sirve cuando sabe de tu negocio. Si no sabe, inventa — y eso frente a un cliente sale caro. Le damos tu información real, definimos qué puede y qué no puede contestar, y cuando el caso es delicado te lo pasa a ti.',
    primaryCta: 'Quiero ver si me sirve',
    whatsappMessage:
      'Hola IAenBlanco, quiero evaluar una solución de IA aplicada a mi operación.',
    problems: [
      'Te dijeron que uses IA pero nadie te explicó para qué te serviría a ti.',
      'Contestas las mismas cinco preguntas todo el día.',
      'Tienes información repartida en muchas partes y cuesta sacarle provecho.',
      'Quieres que algo se haga solo, pero sin perder el control de lo importante.',
    ],
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
    deliverables: [
      'Qué va a hacer el asistente y qué no, por escrito.',
      'La información de tu negocio que el asistente va a usar.',
      'El asistente funcionando, donde lo necesitas.',
      'Conectado a WhatsApp, a tu sitio o a tu programa, según el caso.',
      'Pruebas con casos de verdad, no con ejemplos inventados.',
      'Cuándo te pasa el caso a ti, definido y probado.',
    ],
    diagram: {
      label: 'Cómo funciona',
      steps: [
        { title: 'Solicitud', detail: 'Pregunta o tarea.' },
        { title: 'Contexto', detail: 'Datos relevantes.' },
        { title: 'Agente / modelo', detail: 'Razonamiento guiado.' },
        { title: 'Herramientas', detail: 'Acciones conectadas.' },
        { title: 'Validación', detail: 'Reglas y límites.' },
        { title: 'Respuesta / acción', detail: 'Salida útil.' },
      ],
    },
    useCases: [
      {
        title: 'Atención por WhatsApp',
        text: 'Responder preguntas frecuentes, entender solicitudes y derivar cuando corresponde.',
      },
      {
        title: 'Análisis de información',
        text: 'Revisar textos, solicitudes, audios o datos para extraer criterios útiles.',
      },
      {
        title: 'Asistente interno',
        text: 'Ayudar al equipo a consultar información operativa y ejecutar pasos controlados.',
      },
    ],
    caseStudy: {
      client: 'Citaly',
      label: 'Un programa nuestro',
      title: 'El mismo tipo de asistente, lo estamos terminando como programa.',
      text: 'Citaly contesta el WhatsApp, entiende audios y agenda horas mirando la agenda real. Está por abrir, y es la mejor muestra de que esto lo sabemos construir: tu asistente sería a tu medida, con tus reglas.',
      href: 'https://citaly.cl/',
      actionLabel: 'Ver el sitio',
    },
    process: [
      { title: 'Elegir proceso', text: 'Buscamos una tarea donde la IA pueda aportar utilidad real.' },
      { title: 'Preparar contexto', text: 'Ordenamos información, reglas, tono y límites.' },
      { title: 'Construir agente', text: 'Creamos la experiencia y conectamos herramientas necesarias.' },
      { title: 'Probar y ajustar', text: 'Validamos respuestas, errores, derivaciones y casos límite.' },
    ],
    engagementModes: [
      'Una prueba chica para ver si te sirve.',
      'Un asistente conectado a tu WhatsApp o a tu sitio.',
      'Un asistente para uso interno del equipo.',
      'Mejoras y entrenamiento a medida que lo usan.',
    ],
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
    nextSlug: 'prospeccion-b2b-gestionada',
  },
  'prospeccion-b2b-gestionada': {
    slug: 'prospeccion-b2b-gestionada',
    result: 'Una lista de empresas ordenada por prioridad, con el contacto y qué decirles.',
    heroLead:
      'Esto no es una base de datos comprada. Definimos juntos a qué empresas les quieres vender, las buscamos una por una, revisamos que existan de verdad y que tengan cómo contactarlas, y te las pasamos ordenadas: primero las que más te calzan, cada una con un mensaje sugerido.',
    primaryCta: 'Quiero clientes nuevos',
    whatsappMessage:
      'Hola IAenBlanco, quiero que me ayuden a encontrar clientes nuevos para mi empresa.',
    problems: [
      'No saben a qué empresa llamar primero, así que llaman a cualquiera.',
      'Buscar empresas a mano se come la mañana entera.',
      'Se contacta a ciegas, sin saber si esa empresa siquiera calza.',
      'El seguimiento queda en cuadernos y notas sueltas, y se pierden ventas.',
    ],
    builds: [
      {
        title: 'A quién le queremos vender',
        text: 'Acordamos qué tipo de empresa te compra: rubro, tamaño, zona y qué señales mirar.',
      },
      {
        title: 'Buscarlas y revisarlas',
        text: 'Las buscamos una por una y revisamos que existan, que sigan operando y que tengan cómo contactarlas.',
      },
      {
        title: 'Cuáles van primero',
        text: 'Las ordenamos: arriba las que más te calzan, con el motivo anotado.',
      },
      {
        title: 'No perder el hilo',
        text: 'Dejamos anotado en qué va cada empresa, qué se conversó y cuál es el siguiente paso.',
      },
    ],
    deliverables: [
      'El perfil de empresa que buscamos, acordado contigo.',
      'La lista de empresas, ordenada por cuáles te calzan más.',
      'De cada empresa: qué encontramos, dónde y cómo contactarla.',
      'Con qué criterio ordenamos cuáles van primero.',
      'Un registro de a quién se contactó y en qué quedó.',
      'Qué decirle a cada una para partir la conversación.',
    ],
    diagram: {
      label: 'Cómo funciona',
      steps: [
        { title: 'El perfil', detail: 'A quién buscamos.' },
        { title: 'Búsqueda', detail: 'Empresas reales.' },
        { title: 'Evidencia', detail: 'Señales públicas.' },
        { title: 'El orden', detail: 'Cuáles primero.' },
        { title: 'Contacto', detail: 'Acción comercial.' },
        { title: 'El seguimiento', detail: 'En qué quedó cada una.' },
        { title: 'Oportunidad', detail: 'Próximo paso.' },
      ],
    },
    useCases: [
      {
        title: 'Abrir una nueva zona',
        text: 'Encontrar empresas por ubicación, rubro y señales comerciales visibles.',
      },
      {
        title: 'Priorizar cartera',
        text: 'Separar empresas con mejor fit de registros que no justifican contacto inmediato.',
      },
      {
        title: 'Ordenar seguimiento',
        text: 'Mantener contexto, estado y próximo paso para no depender de memoria o planillas sueltas.',
      },
    ],
    caseStudy: {
      client: 'Leads',
      label: 'Un programa nuestro',
      title: 'La búsqueda y el orden vienen de Leads, un programa nuestro.',
      text: 'Leads busca empresas reales y las ordena por cuál llamar primero. Está por abrir como programa; en este servicio lo operamos nosotros y le sumamos el criterio comercial y el seguimiento.',
      href: 'https://leads.iaenblanco.com/',
      actionLabel: 'Ver el sitio',
    },
    process: [
      { title: 'Definir a quién', text: 'Acordamos qué tipo de empresa, en qué rubro y en qué zona.' },
      { title: 'Levantar empresas', text: 'Buscamos registros reales y evidencia pública relevante.' },
      { title: 'Priorizar', text: 'Ordenamos por fit, señales y calidad de información.' },
      { title: 'Operar seguimiento', text: 'Estructuramos contacto, estados y próximos pasos comerciales.' },
    ],
    engagementModes: [
      'Un diagnóstico de a quién te conviene venderle.',
      'El servicio mensual completo, operado por nosotros.',
      'Solo la lista, ordenada, para que la trabaje tu equipo.',
      'Te acompañamos en el seguimiento de cada contacto.',
    ],
    faqs: [
      {
        question: '¿Esto es lo mismo que comprar una base de datos?',
        answer:
          'No. Una base comprada es un archivo con miles de nombres que no contestan. Acá revisamos empresa por empresa, te decimos cuáles van primero y por qué.',
      },
      {
        question: '¿Mandan mensajes masivos en mi nombre?',
        answer:
          'No. Nuestro trabajo es decirte a quién contactar, por qué y qué decirle. Quién manda el mensaje lo acordamos contigo: puedes ser tú o tu equipo.',
      },
      {
        question: '¿En qué se diferencia del programa Leads?',
        answer:
          'Leads va a ser un programa que uses tú mismo, y todavía no abre. Este servicio lo operamos nosotros desde ya: definimos el perfil contigo, revisamos empresa por empresa y te acompañamos en el seguimiento.',
      },
      {
        question: '¿De dónde salen esas empresas?',
        answer:
          'De fuentes públicas: sitios web, registros abiertos y directorios. No compramos bases de datos ni usamos información que la empresa no haya publicado ella misma.',
      },
      {
        question: '¿Qué debe hacer el cliente durante la operación?',
        answer:
          'El cliente valida oferta, criterios, mensajes y conversaciones reales. IAenBlanco ordena búsqueda, evidencia, prioridad y seguimiento, pero no reemplaza el cierre comercial.',
      },
      {
        question: '¿Garantizan reuniones o ventas?',
        answer:
          'No prometemos resultados cerrados. La prospección mejora foco, contexto y seguimiento; las reuniones o ventas dependen también de oferta, timing, conversación y cierre.',
      },
      {
        question: '¿Qué necesitan para darme un precio?',
        answer:
          'Saber qué vendes, a qué tipo de empresa, en qué zona, cuánto cobras más o menos y a cuántas empresas alcanza a contactar tu equipo al mes.',
      },
    ],
    nextSlug: 'desarrollo-web-ia',
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
