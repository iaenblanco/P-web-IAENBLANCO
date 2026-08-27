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
   * los cinco sitios: asi las tiras se comparan de un vistazo. Se pueden dejar
   * dos si el tercero no se pudo verificar; con cero la tira no se pinta.
   * Se revisan cuando un cliente rediseña: un rasgo tambien es una afirmacion
   * y tambien caduca. Verificados abriendo los cinco sitios el 27-ago-2026.
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
  /* Aca estuvieron Amparo Vega y Dovar, los dos que entraron el 26-ago con la
     vitrina. Salieron al dia siguiente por revision del socio: uno de los dos
     no existe como cliente y el otro quedo en pausa hasta que el tenga o haga
     el logo. Sus capturas y logos siguen en public/ a proposito, para que
     volver a ponerlos sea agregar la entrada aca y nada mas. */
]
