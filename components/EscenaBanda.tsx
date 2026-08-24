import { products, services } from '@/lib/site'

/*
 * Las dos escenas que no cuelgan de un slug de servicio: la del indice de
 * servicios y la de contacto.
 *
 * Mismo criterio que las cuatro de EscenaServicio: solo CSS, solo opacidad y
 * transform, una pasada de 1,6 s, quieta hasta que entra en pantalla, aria-hidden y
 * sin un keyframe nuevo. La de contacto reusa piezas ya escritas -.esc__mensaje
 * con sus animaciones- y solo agrega reglas de caja; la del indice dibuja sus
 * cinco marcas, pero tambien con keyframes que ya existian.
 */

/* El indice: un muestrario, no un menu.
 *
 * Antes eran cinco filas iguales, cada una con el nombre entero de su
 * servicio: el mismo texto que esta en el parrafo de al lado y en las cinco
 * tarjetas de mas abajo, repetido en cinco cajas identicas. Repetir el menu
 * de la pagina no es una escena, y ademas eran veinte palabras para una
 * figura que dispone de dos segundos.
 *
 * Ahora cada servicio es una marca distinta, y cada marca es una miniatura
 * de la escena que abre esa pagina: la ventana de plataformas, los bloques
 * a medida, las tres estaciones de automatizaciones, los globos del
 * asistente, los puntos del mapa de prospeccion. Detenida, lo que se lee no
 * es una lista sino la variedad -cinco cosas que no se parecen entre si-,
 * que es exactamente lo que dice el titulo de la pagina. Cinco palabras en
 * total, una por marca.
 *
 * El orden y la cantidad los sigue mandando `services`, igual que antes: si
 * manana entra un sexto servicio, la escena lo muestra sola. Lo que si va
 * escrito aca es la palabra corta y las piezas del dibujo, porque `Service`
 * no tiene un campo de una palabra ni sabe dibujar. El mapa es por slug: si
 * un slug cambia, ese servicio se queda sin tile y se nota al mirar.
 *
 * Las cinco marcas encienden con el mismo acento y no una cada una, por lo
 * mismo de siempre: los tres acentos de la paleta estan tomados por los tres
 * productos y pintar servicios con ellos afirmaria un parentesco que no
 * existe. */
const MARCAS: Record<string, { clave: string; palabra: string; piezas: number }> = {
  'desarrollo-web-ia': { clave: 'ventana', palabra: 'Web', piezas: 2 },
  'plataformas-software-medida': { clave: 'bloques', palabra: 'Programa', piezas: 3 },
  automatizaciones: { clave: 'pasos', palabra: 'Tareas', piezas: 3 },
  'soluciones-ia-medida': { clave: 'globos', palabra: 'Asistente', piezas: 2 },
  'prospeccion-b2b-gestionada': { clave: 'puntos', palabra: 'Clientes', piezas: 5 },
}

export function EscenaIndice() {
  return (
    <div className="esc esc--servicio esc--indice" aria-hidden="true">
      {services.map((servicio, i) => {
        const marca = MARCAS[servicio.slug]
        if (!marca) return null
        return (
          <span
            className={`mu mu--${marca.clave}`}
            style={{ ['--i' as string]: i }}
            key={servicio.slug}
          >
            <span className="mu__marca">
              {Array.from({ length: marca.piezas }, (_, pieza) => (
                <i key={pieza} />
              ))}
            </span>
            <span className="mu__palabra">{marca.palabra}</span>
          </span>
        )
      })}
    </div>
  )
}

/* Contacto: sale el globo de quien escribe, le llega el tic, y vuelve la
   respuesta. El orden lo da el --i, que es el retardo en medios segundos:
   0 para el que sale, 3 para el que vuelve. No hay animacion nueva, solo
   dos numeros distintos.

   Los globos decian, textuales, el parrafo de al lado y el h2 de mas abajo:
   21 palabras que tardan seis segundos en leerse, en una escena que tiene
   dos, y que ademas repetian lo que ya esta escrito a un dedo de distancia.
   Ahora son nueve palabras y lo que cuenta la escena es la FORMA: uno
   escribe, le llega el tic, del otro lado contestan. Eso es la pagina. */
export function EscenaHilo() {
  return (
    <div className="esc esc--servicio esc--hilo" aria-hidden="true">
      <span className="esc__mensaje esc__mensaje--sale" style={{ ['--i' as string]: 0 }}>
        <span className="esc__mensaje-texto">Esto lo hago a mano</span>
        <span className="esc__mensaje-tic" />
      </span>

      <span className="esc__mensaje esc__mensaje--vuelve" style={{ ['--i' as string]: 3 }}>
        <span className="esc__mensaje-texto">Cuéntame</span>
      </span>

      <span className="esc__nota">WhatsApp · email · formulario</span>
    </div>
  )
}

/* /productos/: las tres tarjetas en abanico, cada una con el acento que su
   producto ya tiene declarado. Las clases .ad--unificalo / .ad--citaly /
   .ad--leads son una linea cada una y lo unico que hacen es fijar --acento y
   --acento-tinta: reusarlas evita escribir los tres colores otra vez y evita
   que manana queden distintos de los de las fichas de mas abajo, que es la
   pagina entera a la que esta escena le sirve de indice.

   Se turnan levantandose. El reparto lo hace el margen y no un transform,
   para que el bloque de movimiento reducido -que apaga todo transform de la
   escena- deje las tres cartas donde estan en vez de apilarlas en el mismo
   punto. Al transform le queda solo el giro de reposo, que la animacion
   vuelve a componer entero en cada cuadro: un transform no se suma al
   anterior, lo reemplaza. */
export function EscenaAbanico() {
  return (
    <div className="esc esc--servicio esc--abanico" aria-hidden="true">
      <div className="esc__abanico">
        {products.map((producto, i) => (
          <span
            className={`esc__carta ad--${producto.id}`}
            style={{ ['--i' as string]: i }}
            key={producto.id}
          >
            <span className="esc__carta-nombre">{producto.name}</span>
            <span className="esc__carta-linea" />
            <span className="esc__carta-linea esc__carta-linea--corta" />
          </span>
        ))}
      </div>
    </div>
  )
}
