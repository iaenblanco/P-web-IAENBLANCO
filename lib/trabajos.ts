/*
 * Los trabajos hechos para clientes. Una sola fuente: antes vivian dos veces
 * -clientProofs en el home y websiteProofCases en servicios- con textos
 * distintos para los mismos cinco negocios, y por eso el sitio los mostraba
 * de dos formas diferentes.
 */
export type Trabajo = {
  client: string
  href: string
  captura: string
  logo: string
  logoTone?: 'dark'
  sector: string
  project: string
  /*
   * Lo que TIENE el sitio, en dos o tres palabras. La regla es una sola: si no
   * se comprueba abriendo el sitio del cliente, no va. Nada de cifras, plazos,
   * premios, comparaciones ni cantidades -eso fue exactamente lo que hundio a
   * velocidad y peso-. Tampoco va nada que viva detras de un login: el panel
   * donde Propinvest publica una propiedad existe, pero el visitante no lo
   * puede ver, asi que no puede ser un rasgo. Y nada que sea afirmacion del
   * cliente sobre si mismo ("+1000 clientes", "despacho gratis", "100% carga
   * asegurada"): eso lo dice su sitio, no lo respaldamos nosotros.
   * Tres como maximo, hasta 23 caracteres cada uno (van con white-space:
   * nowrap y a 13px en el telefono), y la misma palabra para la misma cosa en
   * los siete sitios: asi las tiras se comparan de un vistazo. Se pueden dejar
   * dos si el tercero no se pudo verificar; con cero la tira no se pinta.
   * Se revisan cuando un cliente rediseña: un rasgo tambien es una afirmacion
   * y tambien caduca. Verificados abriendo los siete sitios el 27-ago-2026.
   */
  rasgos: string[]
  /*
   * OJO: velocidad y peso YA NO SE PUBLICAN. Ningun componente los pinta.
   * Se quedan aqui como objetivo interno, que es lo unico que lee
   * herramientas/medir-trabajos.mjs: la herramienta compara cada sitio en vivo
   * contra estas cifras y avisa cuando uno se degrada. Fue asi como se
   * descubrio que Granja Magdalena habia pasado de 1,5 a 13 segundos.
   * Si vuelves a mostrarlos en la ficha, mide antes: 5 de los 10 no se
   * sostenian el 27-ago-2026.
   */
  velocidad: string
  peso: string
  system: string
  proof: string
  destacado?: boolean
}

export const trabajos: Trabajo[] = [
  {
    client: 'Propinvest',
    href: 'https://propinvest.cl/',
    captura: 'propinvest',
    logo: 'propinvest',
    sector: 'Corredora de propiedades',
    project: 'Su catálogo de propiedades, que ellos mismos actualizan',
    rasgos: ['Catálogo de propiedades', 'Filtro por comuna', 'WhatsApp por propiedad'],
    velocidad: 'menos de 1 s',
    peso: '572 KB',
    /* Decia "textos editables y formulario de contacto". Al abrir el sitio el
       27-ago-2026 para verificar los rasgos: no hay ningun <form> en
       propinvest.cl -ni en /contacto/ ni en /ofrece-tu-propiedad/, las dos
       muestran telefono, email, direccion y un boton "Llamar Ahora"-, y que
       los textos sean editables no se comprueba desde fuera. */
    system: 'Sitio con fichas de propiedades, filtros por comuna y por tipo, y WhatsApp en cada propiedad.',
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
    rasgos: ['Cotizador paso a paso', 'Agenda día y hora', 'WhatsApp directo'],
    velocidad: 'menos de 1,5 s',
    peso: '770 KB',
    /* Decia "cada servicio explicado por separado". Los cuatro servicios son
       secciones de una sola pagina -ancla #servicios-, no paginas propias, y
       los cuatro botones "Cotizar este servicio" llevan al mismo cotizador.
       No era falso del todo, pero prometia una separacion que no hay. */
    system: 'Los cuatro servicios explicados en una sola página y un cotizador de siete pasos para pedir precio.',
    proof: 'Ofrecen muchas cosas distintas. El sitio las ordena para que cada visitante encuentre la suya.',
  },
  {
    client: 'Granja Magdalena',
    href: 'https://granjamagdalena.cl/',
    captura: 'granjamagdalena',
    logo: 'granja-magdalena',
    sector: 'Venta de alimentos',
    project: 'Su tienda online',
    /* "Medios de pago visibles" es literal: los logos Visa, Mastercard,
       American Express y Diners en el pie, que se ven sin poner nada en el
       carro. No dice "Pago en linea", que exigiria abrir un checkout. Por eso
       ese rasgo NO esta en Pet ni en Inasec: esos dos pies no los muestran. */
    rasgos: ['Fichas de producto', 'Carro de compra', 'Medios de pago visibles'],
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
    rasgos: ['Carro de compra', 'Reseñas por producto', 'Artículos de blog'],
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
    rasgos: ['Fichas de producto', 'Carro de compra', 'WhatsApp directo'],
    velocidad: 'menos de 2 s',
    peso: '3,2 MB',
    system: 'Oferta explicada de forma simple y una vía directa de contacto.',
    proof: 'Quien los encuentra entiende qué venden y sabe cómo escribirles.',
  },
  /* Amparo Vega y Dovar entraron el 26-ago con la vitrina, salieron al dia
     siguiente por revision del socio y vuelven hoy, 27-ago, porque Nico los
     pidio de vuelta. Sus capturas y sus logos nunca se borraron de public/ ni
     del catalogo de BrandLogo -se dejaron a proposito para que volver a
     subirlos fuera agregar la entrada aca y nada mas-, asi que esto es
     exactamente eso. Los dos rasgos y las dos fichas se volvieron a verificar
     abriendo los sitios, porque el campo "rasgos" no existia cuando estuvieron
     la primera vez. */
  {
    client: 'Amparo Vega',
    href: 'https://amparovega.cl/',
    captura: 'amparovega',
    logo: 'amparo-vega',
    sector: 'Nutrición deportiva',
    project: 'Su sitio con la hora que se reserva sola',
    /* "Pago en linea" aca y "Medios de pago visibles" en Granja Magdalena no es
       una incoherencia: son dos cosas distintas. En Granja lo comprobable son
       los logos de tarjeta en el pie, y decir "pago en linea" habria exigido
       abrir un checkout. Aca la propia pagina de reserva lo dice en su texto
       -"para confirmar tu reserva se paga online un abono de $20.000 [...] tu
       hora queda tomada por 15 minutos mientras pagas"- y el sitio trae Webpay
       y /api/reservas en su codigo. Se comprueba leyendo, sin pagar nada.
       "Agenda dia y hora" se verifico entrando: en agosto no hay ningun dia
       elegible -atiende los martes y ya no quedan- pero al pasar a septiembre
       el 15, el 22 y el 29 quedan activos y al tocar el 15 aparecen las 10:00 y
       las 15:00. Si algun dia el calendario deja de ofrecer horas, este rasgo
       se cae con el. */
    rasgos: ['Agenda día y hora', 'Pago en línea', 'WhatsApp directo'],
    /* Objetivo interno remedido hoy con medir-trabajos.mjs: 497 ms y 313 KB. Las
       cifras que traia del 26-ago -2 s y 1,1 MB- venian sin medir y quedaban tan
       holgadas que el sitio podia triplicarse sin que la herramienta chistara. */
    velocidad: 'menos de 1 s',
    peso: '313 KB',
    system: 'Sitio con sus planes y sus precios a la vista, y la reserva de hora en línea.',
    proof: 'La paciente elige el plan, ve cuánto cuesta y toma la hora sin escribirle a nadie ni esperar respuesta.',
  },
  {
    client: 'Dovar',
    href: 'https://dovar.cl/',
    captura: 'dovar',
    logo: 'dovar',
    sector: 'Constructora industrial',
    project: 'Su sitio para presentarse ante empresas grandes',
    /* "Pagina por servicio" es literal y es justo lo contrario de YoMeEncargo,
       donde los cuatro servicios son secciones de una sola pagina: aca cada
       linea tiene su URL propia con contenido propio -/servicios/mineria,
       /obras-civiles, /infraestructura, /construccion-industrial-. "Preguntas
       frecuentes" es el desplegable de la portada. Lo que NO va, aunque el
       sitio lo diga en el pie, es "Todo Chile": esa es una afirmacion del
       cliente sobre si mismo, no un rasgo del sitio. */
    rasgos: ['Página por servicio', 'Preguntas frecuentes', 'WhatsApp directo'],
    /* Mismo caso que Amparo Vega: remedido hoy en 920 ms y 410 KB, contra los
       2 s y 1,4 MB sin medir que traia del 26-ago. */
    velocidad: 'menos de 1,5 s',
    peso: '410 KB',
    system: 'Cada área de obra explicada por separado y contacto directo por WhatsApp.',
    proof: 'Trabajan para industria, minería e infraestructura: el sitio los presenta a la altura de esos clientes.',
  },
]
