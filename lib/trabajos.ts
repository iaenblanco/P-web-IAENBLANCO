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
    velocidad: 'menos de 1 s',
    peso: '572 KB',
    system: 'Sitio con fichas de propiedades, textos editables y formulario de contacto.',
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
    velocidad: 'menos de 1,5 s',
    peso: '770 KB',
    system: 'Cada servicio explicado por separado y un camino claro hasta pedir la cotización.',
    proof: 'Ofrecen muchas cosas distintas. El sitio las ordena para que cada visitante encuentre la suya.',
  },
  {
    client: 'Granja Magdalena',
    href: 'https://granjamagdalena.cl/',
    captura: 'granjamagdalena',
    logo: 'granja-magdalena',
    sector: 'Venta de alimentos',
    project: 'Su tienda online',
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
    velocidad: 'menos de 2 s',
    peso: '3,2 MB',
    system: 'Oferta explicada de forma simple y una vía directa de contacto.',
    proof: 'Quien los encuentra entiende qué venden y sabe cómo escribirles.',
  },
]
