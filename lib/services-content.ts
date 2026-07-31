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

export type WebsiteProofCase = {
  client: string
  logo: string
  sector: string
  title: string
  text: string
  href: string
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

const diagnosticMessage =
  'Hola IAenBlanco, quiero revisar qué servicio calza mejor con mi negocio.'

export const serviceProblemEntries: ServiceProblemEntry[] = [
  {
    label: 'Necesito una web que convierta.',
    detail: 'Oferta clara, confianza visual y contacto mejor guiado.',
    href: '/servicios/desarrollo-web-ia/',
    serviceSlug: 'desarrollo-web-ia',
  },
  {
    label: 'Mi operación depende de planillas.',
    detail: 'Paneles, permisos, datos y reglas en una plataforma propia.',
    href: '/servicios/plataformas-software-medida/',
    serviceSlug: 'plataformas-software-medida',
  },
  {
    label: 'Mis herramientas no están conectadas.',
    detail: 'Flujos entre sistemas, validaciones, alertas y reportes.',
    href: '/servicios/automatizaciones/',
    serviceSlug: 'automatizaciones',
  },
  {
    label: 'Quiero aplicar IA.',
    detail: 'Agentes y asistentes conectados al contexto real.',
    href: '/servicios/soluciones-ia-medida/',
    serviceSlug: 'soluciones-ia-medida',
  },
  {
    label: 'Necesito oportunidades B2B.',
    detail: 'ICP, búsqueda, evidencia, priorización y seguimiento.',
    href: '/servicios/prospeccion-b2b-gestionada/',
    serviceSlug: 'prospeccion-b2b-gestionada',
  },
  {
    label: 'No sé qué solución necesito.',
    detail: 'Partimos por diagnosticar la fricción y ordenar el siguiente paso.',
    href: getWhatsappUrl(diagnosticMessage),
  },
]

export const websiteProofCases: WebsiteProofCase[] = [
  {
    client: 'Propinvest',
    logo: 'propinvest',
    sector: 'Inmobiliario',
    title: 'Plataforma inmobiliaria editable',
    text: 'Presencia autoadministrable para presentar propiedades, editar contenido comercial y ordenar solicitudes.',
    href: 'https://propinvest.cl/',
  },
  {
    client: 'Granja Magdalena',
    logo: 'granja-magdalena',
    sector: 'E-commerce',
    title: 'Canal digital y catálogo comercial',
    text: 'E-commerce y catálogo comercial desarrollado para comunicar la oferta y sostener la operación de venta.',
    href: 'https://granjamagdalena.cl/',
  },
  {
    client: 'YoMeEncargo',
    logo: 'yomercargo',
    sector: 'Servicios',
    title: 'Experiencia comercial digital',
    text: 'Experiencia de servicios creada para explicar una oferta amplia y guiar al usuario hacia una solicitud concreta.',
    href: 'https://yomeencargo.cl/',
  },
  {
    client: 'Granja Magdalena Pet',
    logo: 'granjapet',
    sector: 'Mascotas',
    title: 'Canal propio para línea especializada',
    text: 'Canal propio para separar una categoría de negocio y darle presencia comercial con identidad independiente.',
    href: 'https://granjamagdalenapet.cl/',
  },
  {
    client: 'Inasec Pets',
    logo: 'inasec-pets',
    sector: 'Retail especializado',
    title: 'Presencia web para capturar interés',
    text: 'Presencia web enfocada en ordenar la comunicación de oferta y abrir conversaciones comerciales.',
    href: 'https://inasecpets.cl/',
  },
]

export const servicePageContent: Record<ServiceSlug, ServicePageContent> = {
  'desarrollo-web-ia': {
    slug: 'desarrollo-web-ia',
    result: 'Una web que explica, genera confianza y empuja al contacto.',
    heroLead:
      'Convertimos tu oferta en una experiencia web clara: mensaje, estructura, diseño, velocidad, medición y contacto. La página deja de ser vitrina pasiva y empieza a trabajar como parte del sistema comercial.',
    primaryCta: 'Diagnosticar mi web',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar un proyecto de sitio web o Shopify que convierta mejor.',
    problems: [
      'La web se ve correcta, pero no explica rápido por qué elegir tu empresa.',
      'El visitante no entiende qué hacer después de leer la oferta.',
      'El diseño no transmite el nivel real del servicio o producto.',
      'La página depende de textos largos y no guía hacia WhatsApp, compra o formulario.',
      'El sitio carga lento o se siente poco cuidado en celular.',
    ],
    builds: [
      {
        title: 'Arquitectura comercial',
        text: 'Ordenamos mensaje, secciones, jerarquía y CTAs para que la página venda sin sentirse forzada.',
      },
      {
        title: 'Interfaz premium y responsive',
        text: 'Diseñamos una experiencia coherente con la marca, legible y preparada para desktop y mobile.',
      },
      {
        title: 'Sitio, landing o Shopify',
        text: 'Construimos el canal que corresponde: corporativo, landing de venta, catálogo o tienda online.',
      },
      {
        title: 'Conversión y seguimiento',
        text: 'Conectamos WhatsApp, formularios, eventos básicos y rutas para que el contacto no se pierda.',
      },
    ],
    deliverables: [
      'Mapa de contenido y narrativa comercial.',
      'Diseño responsive de las secciones principales.',
      'Desarrollo web optimizado para carga y lectura.',
      'Integración con WhatsApp, formulario o flujo de compra.',
      'Base SEO técnica: metadata, estructura y sitemap cuando corresponda.',
      'Checklist de publicación y ajustes posteriores.',
    ],
    diagram: {
      label: 'Flujo web comercial',
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
      { title: 'Entender oferta', text: 'Revisamos público, propuesta, servicios, productos y decisión de compra.' },
      { title: 'Ordenar narrativa', text: 'Definimos páginas, bloques, mensajes y llamados a la acción.' },
      { title: 'Diseñar y construir', text: 'Creamos la interfaz y la implementamos con foco en velocidad y claridad.' },
      { title: 'Publicar y medir', text: 'Dejamos el sitio listo para operar, revisar comportamiento y ajustar.' },
    ],
    engagementModes: [
      'Landing comercial puntual.',
      'Sitio corporativo completo.',
      'Shopify o catálogo de venta.',
      'Evolución mensual de contenido y conversión.',
    ],
    faqs: [
      {
        question: '¿Sirve si todavía no tengo todo el contenido listo?',
        answer:
          'Sí. Podemos partir ordenando la narrativa y definir qué contenido falta antes de diseñar o desarrollar.',
      },
      {
        question: '¿Pueden conectar la web con WhatsApp?',
        answer:
          'Sí. El flujo puede llevar a WhatsApp con contexto, formularios o rutas de contacto según la intención del visitante.',
      },
      {
        question: '¿También trabajan Shopify?',
        answer:
          'Sí. Shopify entra dentro del servicio cuando la necesidad es vender, ordenar catálogo o mejorar la experiencia de compra.',
      },
      {
        question: '¿Qué necesitan para cotizar una web?',
        answer:
          'Necesitamos entender oferta, público, objetivo comercial, páginas necesarias, referencias visuales, integraciones y si existe contenido base o hay que construirlo.',
      },
      {
        question: '¿De qué depende el plazo?',
        answer:
          'Depende del tamaño del sitio, contenido disponible, nivel de diseño, integraciones y rondas de revisión. Lo definimos por etapas para evitar crecer sin control.',
      },
      {
        question: '¿Qué pasa después de lanzar?',
        answer:
          'Podemos dejar una etapa de ajustes, medición básica y evolución mensual para mejorar contenido, conversión o nuevas secciones.',
      },
    ],
    nextSlug: 'plataformas-software-medida',
  },
  'plataformas-software-medida': {
    slug: 'plataformas-software-medida',
    result: 'Una herramienta propia para operar con reglas, datos y control.',
    heroLead:
      'Cuando la operación crece, las planillas y herramientas genéricas empiezan a romperse. Construimos plataformas internas, paneles y software a medida para que el equipo trabaje con un flujo claro.',
    primaryCta: 'Revisar mi operación',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar una plataforma o software a medida para ordenar mi operación.',
    problems: [
      'La información vive en varias planillas y nadie sabe cuál es la versión correcta.',
      'El equipo repite tareas porque el proceso no está centralizado.',
      'Hay permisos, estados o reglas que una herramienta genérica no entiende.',
      'La gerencia necesita visibilidad sin pedir reportes manuales todo el tiempo.',
    ],
    builds: [
      {
        title: 'Modelo operativo',
        text: 'Traducimos el proceso real a usuarios, permisos, reglas, estados y datos.',
      },
      {
        title: 'Paneles de trabajo',
        text: 'Creamos interfaces para cargar, revisar, aprobar, consultar o controlar información.',
      },
      {
        title: 'Backend y datos',
        text: 'Ordenamos la lógica que sostiene el sistema: registros, relaciones, validaciones y seguridad.',
      },
      {
        title: 'Evolución por etapas',
        text: 'Construimos lo necesario primero y dejamos una base preparada para crecer.',
      },
    ],
    deliverables: [
      'Levantamiento funcional del proceso.',
      'Mapa de roles, permisos y estados.',
      'Interfaz de panel o plataforma.',
      'Base de datos y reglas operativas.',
      'Flujos de carga, edición, búsqueda y control.',
      'Documentación de uso y soporte inicial.',
    ],
    diagram: {
      label: 'Arquitectura operativa',
      steps: [
        { title: 'Usuarios', detail: 'Equipo y roles.' },
        { title: 'Permisos', detail: 'Qué puede hacer cada perfil.' },
        { title: 'Reglas', detail: 'Validaciones y estados.' },
        { title: 'Backend / datos', detail: 'Fuente ordenada.' },
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
      label: 'Plataforma desarrollada por IAenBlanco',
      title: 'Catálogo inmobiliario editable.',
      text: 'IAenBlanco construyó una base digital para administrar propiedades, comunicar fichas y mantener contenido comercial sin depender de cambios manuales externos. La administración interna no es pública.',
      href: 'https://propinvest.cl/',
      actionLabel: 'Ver sitio público',
    },
    process: [
      { title: 'Mapear operación', text: 'Detectamos usuarios, información, reglas y puntos de fricción.' },
      { title: 'Definir alcance', text: 'Priorizamos la primera versión para resolver lo crítico sin sobredimensionar.' },
      { title: 'Construir sistema', text: 'Implementamos paneles, datos, permisos y flujos internos.' },
      { title: 'Operar y evolucionar', text: 'Acompañamos uso real, ajustes y nuevas etapas.' },
    ],
    engagementModes: [
      'MVP funcional.',
      'Plataforma interna completa.',
      'Panel conectado a sistemas existentes.',
      'Retainer de soporte y evolución.',
    ],
    faqs: [
      {
        question: '¿Conviene hacer software a medida o usar una herramienta existente?',
        answer:
          'Depende del proceso. Si la herramienta existente obliga a cambiar demasiado la operación o genera trabajo manual, puede hacer sentido construir una capa propia.',
      },
      {
        question: '¿Se puede partir pequeño?',
        answer:
          'Sí. Lo recomendable es partir por el flujo que más impacto tiene y luego evolucionar con uso real.',
      },
      {
        question: '¿Incluye usuarios y permisos?',
        answer:
          'Sí, cuando el proceso lo requiere. Es parte central de una plataforma operativa.',
      },
      {
        question: '¿Qué necesitan para cotizar una plataforma?',
        answer:
          'Necesitamos entender usuarios, roles, datos, estados, reglas, reportes, herramientas existentes y qué parte del proceso duele más hoy.',
      },
      {
        question: '¿Cómo se define el alcance inicial?',
        answer:
          'Priorizamos el flujo crítico y separamos MVP, mejoras posteriores y funcionalidades que no conviene construir todavía.',
      },
      {
        question: '¿De qué depende el plazo?',
        answer:
          'Depende de cantidad de usuarios, reglas, integraciones, volumen de datos y nivel de administración requerido. Por eso lo cerramos por etapas.',
      },
    ],
    nextSlug: 'automatizaciones',
  },
  automatizaciones: {
    slug: 'automatizaciones',
    result: 'Menos copia manual, menos errores y más visibilidad operativa.',
    heroLead:
      'Conectamos sistemas y tareas repetidas para que la información se mueva con reglas claras. La automatización no es magia: es un flujo bien definido, validado y monitoreado.',
    primaryCta: 'Automatizar un flujo',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar un flujo manual que podría automatizarse.',
    problems: [
      'El equipo copia datos entre sistemas, planillas o correos.',
      'Los errores aparecen porque falta validación antes de actualizar información.',
      'Nadie recibe alerta cuando un estado cambia o algo queda pendiente.',
      'Los reportes se preparan manualmente y llegan tarde.',
    ],
    builds: [
      {
        title: 'Mapa de flujo',
        text: 'Identificamos entrada, reglas, validaciones, excepciones y salida esperada.',
      },
      {
        title: 'Integraciones',
        text: 'Conectamos herramientas existentes para evitar doble digitación y tareas repetidas.',
      },
      {
        title: 'Validaciones y alertas',
        text: 'Agregamos controles para detectar datos incompletos, errores o situaciones que requieren revisión.',
      },
      {
        title: 'Tablero de seguimiento',
        text: 'Dejamos visibilidad sobre estados, pendientes y resultados operativos.',
      },
    ],
    deliverables: [
      'Mapa del flujo actual y flujo objetivo.',
      'Reglas de validación y excepciones.',
      'Integración entre sistemas o fuentes de datos.',
      'Alertas operativas.',
      'Dashboard o registro de seguimiento.',
      'Documentación para operar y mantener el flujo.',
    ],
    diagram: {
      label: 'Flujo automatizado',
      steps: [
        { title: 'Sistema A', detail: 'Entrada de datos.' },
        { title: 'Validación', detail: 'Campos y condiciones.' },
        { title: 'Reglas', detail: 'Decisión automática.' },
        { title: 'Sistema B', detail: 'Actualización.' },
        { title: 'Alerta / dashboard', detail: 'Visibilidad.' },
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
      label: 'Contexto de aplicación',
      title: 'Un canal comercial con procesos por detrás.',
      text: 'El sitio público permite entender el tipo de operación donde trabajamos flujos: catálogo, consultas, pedidos y seguimiento. Las automatizaciones internas se documentan con capturas o dashboards privados cuando el cliente lo autoriza.',
      href: 'https://granjamagdalena.cl/',
      actionLabel: 'Ver contexto público',
    },
    process: [
      { title: 'Detectar repetición', text: 'Elegimos un flujo manual con volumen, error o impacto operativo.' },
      { title: 'Definir reglas', text: 'Acordamos qué se automatiza, qué se valida y qué debe revisar una persona.' },
      { title: 'Conectar y probar', text: 'Implementamos la integración y probamos casos reales antes de operar.' },
      { title: 'Monitorear', text: 'Dejamos alertas y visibilidad para detectar fallas o mejoras.' },
    ],
    engagementModes: [
      'Automatización puntual.',
      'Paquete de integraciones por proceso.',
      'Dashboard operativo conectado.',
      'Mantención y mejora continua.',
    ],
    faqs: [
      {
        question: '¿Todo se debe automatizar?',
        answer:
          'No. Primero se automatizan tareas repetidas y reglas claras. Las excepciones importantes deben quedar con revisión humana.',
      },
      {
        question: '¿Pueden conectar herramientas que ya usamos?',
        answer:
          'Sí, cuando las herramientas permiten integración o existe una forma segura de trabajar con sus datos.',
      },
      {
        question: '¿Cómo evitamos que una automatización falle sin que nadie se entere?',
        answer:
          'El flujo debe incluir alertas, registros y estados visibles. Eso es parte del diseño operativo.',
      },
      {
        question: '¿Qué herramientas se pueden conectar?',
        answer:
          'Depende del caso, pero normalmente revisamos APIs, planillas, formularios, WhatsApp, email, CRM, e-commerce, dashboards y sistemas administrativos.',
      },
      {
        question: '¿Qué necesitan para cotizar una automatización?',
        answer:
          'Necesitamos conocer entrada, salida esperada, reglas, frecuencia, excepciones, herramientas involucradas y quién debe revisar cuando algo no calza.',
      },
      {
        question: '¿De qué depende el plazo?',
        answer:
          'Depende de la claridad del flujo, disponibilidad de integraciones, pruebas necesarias y cantidad de excepciones que deban quedar controladas.',
      },
    ],
    nextSlug: 'soluciones-ia-medida',
  },
  'soluciones-ia-medida': {
    slug: 'soluciones-ia-medida',
    result: 'IA conectada al contexto real, con control y utilidad operativa.',
    heroLead:
      'La IA aporta valor cuando entiende el contexto del negocio y opera dentro de un flujo. Diseñamos agentes, asistentes y modelos aplicados a atención, análisis o tareas internas.',
    primaryCta: 'Evaluar uso de IA',
    whatsappMessage:
      'Hola IAenBlanco, quiero evaluar una solución de IA aplicada a mi operación.',
    problems: [
      'La empresa quiere usar IA, pero no tiene claro en qué proceso aplicarla.',
      'Las consultas repetidas consumen tiempo del equipo.',
      'Hay información dispersa que podría responderse o analizarse mejor.',
      'Se necesita automatizar una tarea, pero manteniendo control humano.',
    ],
    builds: [
      {
        title: 'Caso de uso claro',
        text: 'Definimos qué debe resolver la IA, dónde se detiene y cuándo deriva a una persona.',
      },
      {
        title: 'Contexto y datos',
        text: 'Preparamos la información que el agente o asistente necesita para responder con criterio.',
      },
      {
        title: 'Agente o asistente',
        text: 'Construimos la experiencia de uso y la conectamos con herramientas reales cuando corresponde.',
      },
      {
        title: 'Validación y control',
        text: 'Probamos respuestas, límites, tono, seguridad y casos donde debe pedir revisión humana.',
      },
    ],
    deliverables: [
      'Definición del caso de uso y límites.',
      'Mapa de información y contexto.',
      'Agente, asistente o flujo con IA.',
      'Conexión con herramientas o canales cuando corresponde.',
      'Pruebas con casos reales.',
      'Reglas de derivación y control humano.',
    ],
    diagram: {
      label: 'Agente con contexto',
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
      label: 'Producto con IA desarrollado por IAenBlanco',
      title: 'Agenda y atención por WhatsApp con IA.',
      text: 'Citaly sirve como evidencia interna de una lógica aplicada: entender consultas, revisar disponibilidad y apoyar reservas sin perder control operativo.',
      href: 'https://citaly.cl/',
      actionLabel: 'Ver producto',
    },
    process: [
      { title: 'Elegir proceso', text: 'Buscamos una tarea donde la IA pueda aportar utilidad real.' },
      { title: 'Preparar contexto', text: 'Ordenamos información, reglas, tono y límites.' },
      { title: 'Construir agente', text: 'Creamos la experiencia y conectamos herramientas necesarias.' },
      { title: 'Probar y ajustar', text: 'Validamos respuestas, errores, derivaciones y casos límite.' },
    ],
    engagementModes: [
      'Prototipo de IA validable.',
      'Agente conectado a canal o sistema.',
      'Asistente interno.',
      'Evolución y entrenamiento operativo.',
    ],
    faqs: [
      {
        question: '¿La IA reemplaza al equipo?',
        answer:
          'No necesariamente. La usamos para reducir carga repetitiva, mejorar respuesta o apoyar decisiones, manteniendo control humano donde hace falta.',
      },
      {
        question: '¿Qué pasa si la IA no sabe responder?',
        answer:
          'Debe existir una regla de derivación o solicitud de más contexto. Eso se define antes de operar.',
      },
      {
        question: '¿Necesito tener datos perfectos para empezar?',
        answer:
          'No, pero sí necesitamos ordenar el contexto mínimo para que la solución sea confiable y útil.',
      },
      {
        question: '¿En qué se diferencia de usar ChatGPT directamente?',
        answer:
          'Una solución a medida trabaja con información, reglas, permisos, herramientas y flujos propios de tu empresa. No es solamente una conversación aislada.',
      },
      {
        question: '¿Qué necesitan para cotizar una solución de IA?',
        answer:
          'Necesitamos entender la tarea, el canal, la información disponible, los límites de respuesta, las herramientas a conectar y los casos donde debe intervenir una persona.',
      },
      {
        question: '¿Conviene partir con un prototipo?',
        answer:
          'Sí. En IA suele ser mejor validar un caso acotado, probar respuestas con situaciones reales y luego ampliar el alcance.',
      },
    ],
    nextSlug: 'prospeccion-b2b-gestionada',
  },
  'prospeccion-b2b-gestionada': {
    slug: 'prospeccion-b2b-gestionada',
    result: 'Una operación comercial para decidir a quién contactar y por qué.',
    heroLead:
      'Prospección B2B gestionada no es una lista fría. Es un flujo operado con cliente ideal, búsqueda, evidencia, priorización, contacto y seguimiento para abrir conversaciones con mejor contexto.',
    primaryCta: 'Ordenar mi prospección',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar una operación de prospección B2B gestionada.',
    problems: [
      'El equipo comercial no sabe a qué empresas priorizar primero.',
      'La búsqueda de prospectos consume demasiado tiempo manual.',
      'Los contactos se hacen sin evidencia suficiente ni criterio compartido.',
      'El seguimiento queda disperso y se pierden oportunidades.',
    ],
    builds: [
      {
        title: 'ICP y mercado objetivo',
        text: 'Definimos el cliente ideal: rubros, zonas, perfiles y señales para buscar empresas con mejor fit.',
      },
      {
        title: 'Búsqueda y evidencia',
        text: 'Levantamos empresas reales y contexto público útil para decidir si vale la pena contactar.',
      },
      {
        title: 'Scoring y priorización',
        text: 'Aplicamos criterios de prioridad para decidir a quién contactar primero y por qué.',
      },
      {
        title: 'Seguimiento comercial',
        text: 'Estructuramos pipeline: estado, contexto, próximos pasos y continuidad comercial.',
      },
    ],
    deliverables: [
      'Definición de ICP y criterios de búsqueda.',
      'Base priorizada de empresas objetivo.',
      'Evidencia pública organizada.',
      'Criterios de scoring y fit comercial.',
      'Pipeline de contacto y seguimiento.',
      'Recomendaciones de acción comercial.',
    ],
    diagram: {
      label: 'Operación de prospección',
      steps: [
        { title: 'ICP', detail: 'Cliente ideal.' },
        { title: 'Búsqueda', detail: 'Empresas reales.' },
        { title: 'Evidencia', detail: 'Señales públicas.' },
        { title: 'Scoring', detail: 'Prioridad.' },
        { title: 'Contacto', detail: 'Acción comercial.' },
        { title: 'Seguimiento', detail: 'Pipeline.' },
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
      label: 'Tecnología propia que apoya la operación gestionada',
      title: 'Prospección con evidencia y pipeline.',
      text: 'Leads es tecnología propia de IAenBlanco para ordenar búsqueda, evidencia, score y seguimiento. El servicio gestionado agrega criterio comercial, configuración y operación sobre esa base.',
      href: 'https://leads.iaenblanco.com/',
      actionLabel: 'Ver producto',
    },
    process: [
      { title: 'Definir mercado', text: 'Acordamos ICP, zonas, rubros y criterios de oportunidad.' },
      { title: 'Levantar empresas', text: 'Buscamos registros reales y evidencia pública relevante.' },
      { title: 'Priorizar', text: 'Ordenamos por fit, señales y calidad de información.' },
      { title: 'Operar seguimiento', text: 'Estructuramos contacto, estados y próximos pasos comerciales.' },
    ],
    engagementModes: [
      'Diagnóstico de mercado objetivo.',
      'Operación mensual gestionada.',
      'Base priorizada para equipo comercial.',
      'Acompañamiento de pipeline y seguimiento.',
    ],
    faqs: [
      {
        question: '¿Esto es lo mismo que comprar una base de datos?',
        answer:
          'No. La base sola no resuelve priorización ni seguimiento. La propuesta es una operación gestionada con criterios y evidencia.',
      },
      {
        question: '¿Ustedes envían mensajes masivos?',
        answer:
          'El foco es ordenar a quién contactar, por qué y con qué contexto. La ejecución del contacto se define según la estrategia comercial.',
      },
      {
        question: '¿Cómo se diferencia del producto Leads?',
        answer:
          'Leads es un producto propio. Prospección B2B gestionada es el servicio operativo que puede apoyarse en esa lógica, pero incluye criterio, configuración y seguimiento.',
      },
      {
        question: '¿Qué significan ICP, scoring y pipeline?',
        answer:
          'ICP es el tipo de cliente ideal. Scoring es la prioridad comercial de cada empresa. Pipeline es el estado y próximo paso de cada oportunidad.',
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
        question: '¿Qué necesitan para cotizar este servicio?',
        answer:
          'Necesitamos entender oferta, mercado objetivo, ticket, zona, capacidad comercial, criterios de descarte y si el cliente ya tiene bases o historial de contactos.',
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
