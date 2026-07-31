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
  logo?: string
  href?: string
  actionLabel?: string
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

export type ServicePageContent = {
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
  caseStudy: ServiceCase
  process: { title: string; text: string }[]
  engagementModes: string[]
  faqs: ServiceFaq[]
  nextSlug: ServiceSlug
}

const diagnosticMessage =
  'Hola IAenBlanco, quiero revisar que servicio calza mejor con mi negocio.'

export const serviceProblemEntries: ServiceProblemEntry[] = [
  {
    label: 'Necesito una web que convierta.',
    detail: 'Oferta clara, confianza visual y contacto mejor guiado.',
    href: '/servicios/desarrollo-web-ia/',
    serviceSlug: 'desarrollo-web-ia',
  },
  {
    label: 'Mi operacion depende de planillas.',
    detail: 'Paneles, permisos, datos y reglas en una plataforma propia.',
    href: '/servicios/plataformas-software-medida/',
    serviceSlug: 'plataformas-software-medida',
  },
  {
    label: 'Mis herramientas no estan conectadas.',
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
    detail: 'ICP, busqueda, evidencia, priorizacion y seguimiento.',
    href: '/servicios/prospeccion-b2b-gestionada/',
    serviceSlug: 'prospeccion-b2b-gestionada',
  },
  {
    label: 'No se que solucion necesito.',
    detail: 'Partimos por diagnosticar la friccion y ordenar el siguiente paso.',
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
    title: 'Canal digital y catalogo comercial',
    text: 'E-commerce y catalogo comercial desarrollado para comunicar la oferta y sostener la operacion de venta.',
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
    title: 'Canal propio para linea especializada',
    text: 'Canal propio para separar una categoria de negocio y darle presencia comercial con identidad independiente.',
    href: 'https://granjamagdalenapet.cl/',
  },
  {
    client: 'Inasec Pets',
    logo: 'inasec-pets',
    sector: 'Retail especializado',
    title: 'Presencia web para capturar interes',
    text: 'Presencia web enfocada en ordenar la comunicacion de oferta y abrir conversaciones comerciales.',
    href: 'https://inasecpets.cl/',
  },
]

export const servicePageContent: Record<ServiceSlug, ServicePageContent> = {
  'desarrollo-web-ia': {
    slug: 'desarrollo-web-ia',
    result: 'Una web que explica, genera confianza y empuja al contacto.',
    heroLead:
      'Convertimos tu oferta en una experiencia web clara: mensaje, estructura, diseno, velocidad, medicion y contacto. La pagina deja de ser vitrina pasiva y empieza a trabajar como parte del sistema comercial.',
    primaryCta: 'Diagnosticar mi web',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar un proyecto de sitio web o Shopify que convierta mejor.',
    problems: [
      'La web se ve correcta, pero no explica rapido por que elegir tu empresa.',
      'El visitante no entiende que hacer despues de leer la oferta.',
      'El diseno no transmite el nivel real del servicio o producto.',
      'La pagina depende de textos largos y no guia hacia WhatsApp, compra o formulario.',
      'El sitio carga lento o se siente poco cuidado en celular.',
    ],
    builds: [
      {
        title: 'Arquitectura comercial',
        text: 'Ordenamos mensaje, secciones, jerarquia y CTAs para que la pagina venda sin sentirse forzada.',
      },
      {
        title: 'Interfaz premium y responsive',
        text: 'Disenamos una experiencia coherente con la marca, legible y preparada para desktop y mobile.',
      },
      {
        title: 'Sitio, landing o Shopify',
        text: 'Construimos el canal que corresponde: corporativo, landing de venta, catalogo o tienda online.',
      },
      {
        title: 'Conversion y seguimiento',
        text: 'Conectamos WhatsApp, formularios, eventos basicos y rutas para que el contacto no se pierda.',
      },
    ],
    deliverables: [
      'Mapa de contenido y narrativa comercial.',
      'Diseno responsive de las secciones principales.',
      'Desarrollo web optimizado para carga y lectura.',
      'Integracion con WhatsApp, formulario o flujo de compra.',
      'Base SEO tecnica: metadata, estructura y sitemap cuando corresponda.',
      'Checklist de publicacion y ajustes posteriores.',
    ],
    diagram: {
      label: 'Flujo web comercial',
      steps: [
        { title: 'Mensaje', detail: 'Que vendes y por que confiar.' },
        { title: 'Experiencia', detail: 'Recorrido claro y visual.' },
        { title: 'Conversion', detail: 'CTA en el momento correcto.' },
        { title: 'WhatsApp / compra', detail: 'Contacto o accion concreta.' },
        { title: 'Seguimiento', detail: 'Medicion y mejora.' },
      ],
    },
    useCases: [
      {
        title: 'Empresa de servicios',
        text: 'Explicar una oferta compleja y transformarla en solicitudes por WhatsApp o formulario.',
      },
      {
        title: 'E-commerce o catalogo',
        text: 'Mostrar productos, ordenar categorias y preparar una experiencia de compra o contacto.',
      },
      {
        title: 'Nuevo producto',
        text: 'Crear una landing enfocada en comunicar valor, validar interes y abrir conversaciones.',
      },
    ],
    caseStudy: {
      client: 'Granja Magdalena',
      label: 'Sitio desarrollado por IAenBlanco',
      title: 'Canal digital preparado para vender.',
      text: 'La experiencia se penso como un canal comercial desarrollado por IAenBlanco: catalogo, narrativa de oferta, estructura visual y una operacion digital mas clara para sostener crecimiento.',
      href: 'https://granjamagdalena.cl/',
      actionLabel: 'Ver sitio',
    },
    process: [
      { title: 'Entender oferta', text: 'Revisamos publico, propuesta, servicios, productos y decision de compra.' },
      { title: 'Ordenar narrativa', text: 'Definimos paginas, bloques, mensajes y llamados a la accion.' },
      { title: 'Disenar y construir', text: 'Creamos la interfaz y la implementamos con foco en velocidad y claridad.' },
      { title: 'Publicar y medir', text: 'Dejamos el sitio listo para operar, revisar comportamiento y ajustar.' },
    ],
    engagementModes: [
      'Landing comercial puntual.',
      'Sitio corporativo completo.',
      'Shopify o catalogo de venta.',
      'Evolucion mensual de contenido y conversion.',
    ],
    faqs: [
      {
        question: 'Sirve si todavia no tengo todo el contenido listo?',
        answer:
          'Si. Podemos partir ordenando la narrativa y definir que contenido falta antes de disenar o desarrollar.',
      },
      {
        question: 'Pueden conectar la web con WhatsApp?',
        answer:
          'Si. El flujo puede llevar a WhatsApp con contexto, formularios o rutas de contacto segun la intencion del visitante.',
      },
      {
        question: 'Tambien trabajan Shopify?',
        answer:
          'Si. Shopify entra dentro del servicio cuando la necesidad es vender, ordenar catalogo o mejorar la experiencia de compra.',
      },
      {
        question: 'Que necesitan para cotizar una web?',
        answer:
          'Necesitamos entender oferta, publico, objetivo comercial, paginas necesarias, referencias visuales, integraciones y si existe contenido base o hay que construirlo.',
      },
      {
        question: 'De que depende el plazo?',
        answer:
          'Depende del tamano del sitio, contenido disponible, nivel de diseno, integraciones y rondas de revision. Lo definimos por etapas para evitar crecer sin control.',
      },
      {
        question: 'Que pasa despues de lanzar?',
        answer:
          'Podemos dejar una etapa de ajustes, medicion basica y evolucion mensual para mejorar contenido, conversion o nuevas secciones.',
      },
    ],
    nextSlug: 'plataformas-software-medida',
  },
  'plataformas-software-medida': {
    slug: 'plataformas-software-medida',
    result: 'Una herramienta propia para operar con reglas, datos y control.',
    heroLead:
      'Cuando la operacion crece, las planillas y herramientas genericas empiezan a romperse. Construimos plataformas internas, paneles y software a medida para que el equipo trabaje con un flujo claro.',
    primaryCta: 'Revisar mi operacion',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar una plataforma o software a medida para ordenar mi operacion.',
    problems: [
      'La informacion vive en varias planillas y nadie sabe cual es la version correcta.',
      'El equipo repite tareas porque el proceso no esta centralizado.',
      'Hay permisos, estados o reglas que una herramienta generica no entiende.',
      'La gerencia necesita visibilidad sin pedir reportes manuales todo el tiempo.',
    ],
    builds: [
      {
        title: 'Modelo operativo',
        text: 'Traducimos el proceso real a usuarios, permisos, reglas, estados y datos.',
      },
      {
        title: 'Paneles de trabajo',
        text: 'Creamos interfaces para cargar, revisar, aprobar, consultar o controlar informacion.',
      },
      {
        title: 'Backend y datos',
        text: 'Ordenamos la logica que sostiene el sistema: registros, relaciones, validaciones y seguridad.',
      },
      {
        title: 'Evolucion por etapas',
        text: 'Construimos lo necesario primero y dejamos una base preparada para crecer.',
      },
    ],
    deliverables: [
      'Levantamiento funcional del proceso.',
      'Mapa de roles, permisos y estados.',
      'Interfaz de panel o plataforma.',
      'Base de datos y reglas operativas.',
      'Flujos de carga, edicion, busqueda y control.',
      'Documentacion de uso y soporte inicial.',
    ],
    diagram: {
      label: 'Arquitectura operativa',
      steps: [
        { title: 'Usuarios', detail: 'Equipo y roles.' },
        { title: 'Permisos', detail: 'Que puede hacer cada perfil.' },
        { title: 'Reglas', detail: 'Validaciones y estados.' },
        { title: 'Backend / datos', detail: 'Fuente ordenada.' },
        { title: 'Panel', detail: 'Operacion visible.' },
      ],
    },
    useCases: [
      {
        title: 'Panel interno',
        text: 'Gestionar solicitudes, estados, responsables y archivos desde un solo lugar.',
      },
      {
        title: 'Catalogo administrable',
        text: 'Permitir que el equipo actualice contenido, fichas o disponibilidad sin pedir cambios manuales.',
      },
      {
        title: 'Operacion con aprobaciones',
        text: 'Ordenar flujos donde una accion depende de permisos, revision o cumplimiento de reglas.',
      },
    ],
    caseStudy: {
      client: 'Propinvest',
      label: 'Sitio desarrollado por IAenBlanco',
      title: 'Catalogo inmobiliario editable.',
      text: 'IAenBlanco construyo una base digital para administrar propiedades, comunicar fichas y mantener contenido comercial sin depender de cambios manuales externos.',
      href: 'https://propinvest.cl/',
      actionLabel: 'Ver sitio',
    },
    process: [
      { title: 'Mapear operacion', text: 'Detectamos usuarios, informacion, reglas y puntos de friccion.' },
      { title: 'Definir alcance', text: 'Priorizamos la primera version para resolver lo critico sin sobredimensionar.' },
      { title: 'Construir sistema', text: 'Implementamos paneles, datos, permisos y flujos internos.' },
      { title: 'Operar y evolucionar', text: 'Acompanamos uso real, ajustes y nuevas etapas.' },
    ],
    engagementModes: [
      'MVP funcional.',
      'Plataforma interna completa.',
      'Panel conectado a sistemas existentes.',
      'Retainer de soporte y evolucion.',
    ],
    faqs: [
      {
        question: 'Conviene hacer software a medida o usar una herramienta existente?',
        answer:
          'Depende del proceso. Si la herramienta existente obliga a cambiar demasiado la operacion o genera trabajo manual, puede hacer sentido construir una capa propia.',
      },
      {
        question: 'Se puede partir pequeno?',
        answer:
          'Si. Lo recomendable es partir por el flujo que mas impacto tiene y luego evolucionar con uso real.',
      },
      {
        question: 'Incluye usuarios y permisos?',
        answer:
          'Si, cuando el proceso lo requiere. Es parte central de una plataforma operativa.',
      },
      {
        question: 'Que necesitan para cotizar una plataforma?',
        answer:
          'Necesitamos entender usuarios, roles, datos, estados, reglas, reportes, herramientas existentes y que parte del proceso duele mas hoy.',
      },
      {
        question: 'Como se define el alcance inicial?',
        answer:
          'Priorizamos el flujo critico y separamos MVP, mejoras posteriores y funcionalidades que no conviene construir todavia.',
      },
      {
        question: 'De que depende el plazo?',
        answer:
          'Depende de cantidad de usuarios, reglas, integraciones, volumen de datos y nivel de administracion requerido. Por eso lo cerramos por etapas.',
      },
    ],
    nextSlug: 'automatizaciones',
  },
  automatizaciones: {
    slug: 'automatizaciones',
    result: 'Menos copia manual, menos errores y mas visibilidad operativa.',
    heroLead:
      'Conectamos sistemas y tareas repetidas para que la informacion se mueva con reglas claras. La automatizacion no es magia: es un flujo bien definido, validado y monitoreado.',
    primaryCta: 'Automatizar un flujo',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar un flujo manual que podria automatizarse.',
    problems: [
      'El equipo copia datos entre sistemas, planillas o correos.',
      'Los errores aparecen porque falta validacion antes de actualizar informacion.',
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
        text: 'Conectamos herramientas existentes para evitar doble digitacion y tareas repetidas.',
      },
      {
        title: 'Validaciones y alertas',
        text: 'Agregamos controles para detectar datos incompletos, errores o situaciones que requieren revision.',
      },
      {
        title: 'Tablero de seguimiento',
        text: 'Dejamos visibilidad sobre estados, pendientes y resultados operativos.',
      },
    ],
    deliverables: [
      'Mapa del flujo actual y flujo objetivo.',
      'Reglas de validacion y excepciones.',
      'Integracion entre sistemas o fuentes de datos.',
      'Alertas operativas.',
      'Dashboard o registro de seguimiento.',
      'Documentacion para operar y mantener el flujo.',
    ],
    diagram: {
      label: 'Flujo automatizado',
      steps: [
        { title: 'Sistema A', detail: 'Entrada de datos.' },
        { title: 'Validacion', detail: 'Campos y condiciones.' },
        { title: 'Reglas', detail: 'Decision automatica.' },
        { title: 'Sistema B', detail: 'Actualizacion.' },
        { title: 'Alerta / dashboard', detail: 'Visibilidad.' },
      ],
      exception: {
        title: 'Excepcion',
        detail: 'Si algo no calza, se deriva a revision humana antes de avanzar.',
      },
    },
    useCases: [
      {
        title: 'Ventas y operaciones',
        text: 'Mover una solicitud desde formulario o WhatsApp hacia seguimiento interno.',
      },
      {
        title: 'Documentos y estados',
        text: 'Actualizar registros, generar documentos o avisar cuando falta informacion.',
      },
      {
        title: 'Reportes recurrentes',
        text: 'Consolidar datos y preparar una vista de control sin trabajo manual diario.',
      },
    ],
    caseStudy: {
      client: 'Granja Magdalena',
      label: 'Sitio desarrollado por IAenBlanco',
      title: 'E-commerce e integraciones operativas.',
      text: 'La evidencia se usa como referencia de operacion conectada desarrollada por IAenBlanco: canal digital, catalogo, venta e integraciones pensadas para reducir friccion entre oferta y gestion.',
      href: 'https://granjamagdalena.cl/',
      actionLabel: 'Ver sitio',
    },
    process: [
      { title: 'Detectar repeticion', text: 'Elegimos un flujo manual con volumen, error o impacto operativo.' },
      { title: 'Definir reglas', text: 'Acordamos que se automatiza, que se valida y que debe revisar una persona.' },
      { title: 'Conectar y probar', text: 'Implementamos la integracion y probamos casos reales antes de operar.' },
      { title: 'Monitorear', text: 'Dejamos alertas y visibilidad para detectar fallas o mejoras.' },
    ],
    engagementModes: [
      'Automatizacion puntual.',
      'Paquete de integraciones por proceso.',
      'Dashboard operativo conectado.',
      'Mantencion y mejora continua.',
    ],
    faqs: [
      {
        question: 'Todo se debe automatizar?',
        answer:
          'No. Primero se automatizan tareas repetidas y reglas claras. Las excepciones importantes deben quedar con revision humana.',
      },
      {
        question: 'Pueden conectar herramientas que ya usamos?',
        answer:
          'Si, cuando las herramientas permiten integracion o existe una forma segura de trabajar con sus datos.',
      },
      {
        question: 'Como evitamos que una automatizacion falle sin que nadie se entere?',
        answer:
          'El flujo debe incluir alertas, registros y estados visibles. Eso es parte del diseno operativo.',
      },
      {
        question: 'Que herramientas se pueden conectar?',
        answer:
          'Depende del caso, pero normalmente revisamos APIs, planillas, formularios, WhatsApp, email, CRM, e-commerce, dashboards y sistemas administrativos.',
      },
      {
        question: 'Que necesitan para cotizar una automatizacion?',
        answer:
          'Necesitamos conocer entrada, salida esperada, reglas, frecuencia, excepciones, herramientas involucradas y quien debe revisar cuando algo no calza.',
      },
      {
        question: 'De que depende el plazo?',
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
      'La IA aporta valor cuando entiende el contexto del negocio y opera dentro de un flujo. Disenamos agentes, asistentes y modelos aplicados a atencion, analisis o tareas internas.',
    primaryCta: 'Evaluar uso de IA',
    whatsappMessage:
      'Hola IAenBlanco, quiero evaluar una solucion de IA aplicada a mi operacion.',
    problems: [
      'La empresa quiere usar IA, pero no tiene claro en que proceso aplicarla.',
      'Las consultas repetidas consumen tiempo del equipo.',
      'Hay informacion dispersa que podria responderse o analizarse mejor.',
      'Se necesita automatizar una tarea, pero manteniendo control humano.',
    ],
    builds: [
      {
        title: 'Caso de uso claro',
        text: 'Definimos que debe resolver la IA, donde se detiene y cuando deriva a una persona.',
      },
      {
        title: 'Contexto y datos',
        text: 'Preparamos la informacion que el agente o asistente necesita para responder con criterio.',
      },
      {
        title: 'Agente o asistente',
        text: 'Construimos la experiencia de uso y la conectamos con herramientas reales cuando corresponde.',
      },
      {
        title: 'Validacion y control',
        text: 'Probamos respuestas, limites, tono, seguridad y casos donde debe pedir revision humana.',
      },
    ],
    deliverables: [
      'Definicion del caso de uso y limites.',
      'Mapa de informacion y contexto.',
      'Agente, asistente o flujo con IA.',
      'Conexion con herramientas o canales cuando corresponde.',
      'Pruebas con casos reales.',
      'Reglas de derivacion y control humano.',
    ],
    diagram: {
      label: 'Agente con contexto',
      steps: [
        { title: 'Solicitud', detail: 'Pregunta o tarea.' },
        { title: 'Contexto', detail: 'Datos relevantes.' },
        { title: 'Agente / modelo', detail: 'Razonamiento guiado.' },
        { title: 'Herramientas', detail: 'Acciones conectadas.' },
        { title: 'Validacion', detail: 'Reglas y limites.' },
        { title: 'Respuesta / accion', detail: 'Salida util.' },
      ],
    },
    useCases: [
      {
        title: 'Atencion por WhatsApp',
        text: 'Responder preguntas frecuentes, entender solicitudes y derivar cuando corresponde.',
      },
      {
        title: 'Analisis de informacion',
        text: 'Revisar textos, solicitudes, audios o datos para extraer criterios utiles.',
      },
      {
        title: 'Asistente interno',
        text: 'Ayudar al equipo a consultar informacion operativa y ejecutar pasos controlados.',
      },
    ],
    caseStudy: {
      client: 'Citaly',
      label: 'Producto propio',
      title: 'Agenda y atencion por WhatsApp con IA.',
      text: 'Citaly sirve como evidencia interna de una logica aplicada: entender consultas, revisar disponibilidad y apoyar reservas sin perder control operativo.',
      href: 'https://citaly.cl/',
      actionLabel: 'Ver producto',
    },
    process: [
      { title: 'Elegir proceso', text: 'Buscamos una tarea donde la IA pueda aportar utilidad real.' },
      { title: 'Preparar contexto', text: 'Ordenamos informacion, reglas, tono y limites.' },
      { title: 'Construir agente', text: 'Creamos la experiencia y conectamos herramientas necesarias.' },
      { title: 'Probar y ajustar', text: 'Validamos respuestas, errores, derivaciones y casos limite.' },
    ],
    engagementModes: [
      'Prototipo de IA validable.',
      'Agente conectado a canal o sistema.',
      'Asistente interno.',
      'Evolucion y entrenamiento operativo.',
    ],
    faqs: [
      {
        question: 'La IA reemplaza al equipo?',
        answer:
          'No necesariamente. La usamos para reducir carga repetitiva, mejorar respuesta o apoyar decisiones, manteniendo control humano donde hace falta.',
      },
      {
        question: 'Que pasa si la IA no sabe responder?',
        answer:
          'Debe existir una regla de derivacion o solicitud de mas contexto. Eso se define antes de operar.',
      },
      {
        question: 'Necesito tener datos perfectos para empezar?',
        answer:
          'No, pero si necesitamos ordenar el contexto minimo para que la solucion sea confiable y util.',
      },
      {
        question: 'En que se diferencia de usar ChatGPT directamente?',
        answer:
          'Una solucion a medida trabaja con informacion, reglas, permisos, herramientas y flujos propios de tu empresa. No es solamente una conversacion aislada.',
      },
      {
        question: 'Que necesitan para cotizar una solucion de IA?',
        answer:
          'Necesitamos entender la tarea, el canal, la informacion disponible, los limites de respuesta, las herramientas a conectar y los casos donde debe intervenir una persona.',
      },
      {
        question: 'Conviene partir con un prototipo?',
        answer:
          'Si. En IA suele ser mejor validar un caso acotado, probar respuestas con situaciones reales y luego ampliar el alcance.',
      },
    ],
    nextSlug: 'prospeccion-b2b-gestionada',
  },
  'prospeccion-b2b-gestionada': {
    slug: 'prospeccion-b2b-gestionada',
    result: 'Una operacion comercial para decidir a quien contactar y por que.',
    heroLead:
      'Prospeccion B2B gestionada no es una lista fria. Es un flujo operado con cliente ideal, busqueda, evidencia, priorizacion, contacto y seguimiento para abrir conversaciones con mejor contexto.',
    primaryCta: 'Ordenar mi prospeccion',
    whatsappMessage:
      'Hola IAenBlanco, quiero revisar una operacion de prospeccion B2B gestionada.',
    problems: [
      'El equipo comercial no sabe a que empresas priorizar primero.',
      'La busqueda de prospectos consume demasiado tiempo manual.',
      'Los contactos se hacen sin evidencia suficiente ni criterio compartido.',
      'El seguimiento queda disperso y se pierden oportunidades.',
    ],
    builds: [
      {
        title: 'ICP y mercado objetivo',
        text: 'Definimos el cliente ideal: rubros, zonas, perfiles y senales para buscar empresas con mejor fit.',
      },
      {
        title: 'Busqueda y evidencia',
        text: 'Levantamos empresas reales y contexto publico util para decidir si vale la pena contactar.',
      },
      {
        title: 'Scoring y priorizacion',
        text: 'Aplicamos criterios de prioridad para decidir a quien contactar primero y por que.',
      },
      {
        title: 'Seguimiento comercial',
        text: 'Estructuramos pipeline: estado, contexto, proximos pasos y continuidad comercial.',
      },
    ],
    deliverables: [
      'Definicion de ICP y criterios de busqueda.',
      'Base priorizada de empresas objetivo.',
      'Evidencia publica organizada.',
      'Criterios de scoring y fit comercial.',
      'Pipeline de contacto y seguimiento.',
      'Recomendaciones de accion comercial.',
    ],
    diagram: {
      label: 'Operacion de prospeccion',
      steps: [
        { title: 'ICP', detail: 'Cliente ideal.' },
        { title: 'Busqueda', detail: 'Empresas reales.' },
        { title: 'Evidencia', detail: 'Senales publicas.' },
        { title: 'Scoring', detail: 'Prioridad.' },
        { title: 'Contacto', detail: 'Accion comercial.' },
        { title: 'Seguimiento', detail: 'Pipeline.' },
        { title: 'Oportunidad', detail: 'Proximo paso.' },
      ],
    },
    useCases: [
      {
        title: 'Abrir una nueva zona',
        text: 'Encontrar empresas por ubicacion, rubro y senales comerciales visibles.',
      },
      {
        title: 'Priorizar cartera',
        text: 'Separar empresas con mejor fit de registros que no justifican contacto inmediato.',
      },
      {
        title: 'Ordenar seguimiento',
        text: 'Mantener contexto, estado y proximo paso para no depender de memoria o planillas sueltas.',
      },
    ],
    caseStudy: {
      client: 'Leads',
      label: 'Producto propio',
      title: 'Prospeccion con evidencia y pipeline.',
      text: 'Leads es el producto propio que materializa parte de esta logica: busqueda, evidencia, score y seguimiento en un mismo flujo.',
      href: 'https://leads.iaenblanco.com/',
      actionLabel: 'Ver producto',
    },
    process: [
      { title: 'Definir mercado', text: 'Acordamos ICP, zonas, rubros y criterios de oportunidad.' },
      { title: 'Levantar empresas', text: 'Buscamos registros reales y evidencia publica relevante.' },
      { title: 'Priorizar', text: 'Ordenamos por fit, senales y calidad de informacion.' },
      { title: 'Operar seguimiento', text: 'Estructuramos contacto, estados y proximos pasos comerciales.' },
    ],
    engagementModes: [
      'Diagnostico de mercado objetivo.',
      'Operacion mensual gestionada.',
      'Base priorizada para equipo comercial.',
      'Acompanamiento de pipeline y seguimiento.',
    ],
    faqs: [
      {
        question: 'Esto es lo mismo que comprar una base de datos?',
        answer:
          'No. La base sola no resuelve priorizacion ni seguimiento. La propuesta es una operacion gestionada con criterios y evidencia.',
      },
      {
        question: 'Ustedes envian mensajes masivos?',
        answer:
          'El foco es ordenar a quien contactar, por que y con que contexto. La ejecucion del contacto se define segun la estrategia comercial.',
      },
      {
        question: 'Como se diferencia del producto Leads?',
        answer:
          'Leads es un producto propio. Prospeccion B2B gestionada es el servicio operativo que puede apoyarse en esa logica, pero incluye criterio, configuracion y seguimiento.',
      },
      {
        question: 'Que significan ICP, scoring y pipeline?',
        answer:
          'ICP es el tipo de cliente ideal. Scoring es la prioridad comercial de cada empresa. Pipeline es el estado y proximo paso de cada oportunidad.',
      },
      {
        question: 'Que debe hacer el cliente durante la operacion?',
        answer:
          'El cliente valida oferta, criterios, mensajes y conversaciones reales. IAenBlanco ordena busqueda, evidencia, prioridad y seguimiento, pero no reemplaza el cierre comercial.',
      },
      {
        question: 'Garantizan reuniones o ventas?',
        answer:
          'No prometemos resultados cerrados. La prospeccion mejora foco, contexto y seguimiento; las reuniones o ventas dependen tambien de oferta, timing, conversacion y cierre.',
      },
      {
        question: 'Que necesitan para cotizar este servicio?',
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
