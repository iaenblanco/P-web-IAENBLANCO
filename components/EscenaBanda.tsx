import { services } from '@/lib/site'

/*
 * Las dos escenas que no cuelgan de un slug de servicio: la del indice de
 * servicios y la de contacto.
 *
 * Mismo criterio que las cuatro de EscenaServicio: solo CSS, solo opacidad y
 * transform, ciclo de 11 s, quieta hasta que entra en pantalla, aria-hidden y
 * sin un keyframe nuevo. Las dos reusan piezas ya escritas -.esc__ficha y
 * .esc__mensaje con sus animaciones- y solo agregan reglas de caja.
 */

/* El indice: las cinco filas son los cinco servicios, y se encienden por
   turno. Los nombres salen de `services`, la misma lista que arma las
   tarjetas de mas abajo: si manana cambia uno, cambia aca tambien. Escribirlos
   a mano era la forma segura de que la escena quedara diciendo un nombre que
   la pagina ya no usa.

   Los cinco encienden con el mismo acento y no uno cada uno: la paleta declara
   tres acentos y los tres estan tomados por los tres productos -unificalo,
   citaly, leads-. Pintar servicios con ellos afirmaria un parentesco que no
   existe. */
export function EscenaIndice() {
  return (
    <div className="esc esc--servicio esc--indice" aria-hidden="true">
      <div className="esc__fichas">
        {services.map((servicio, i) => (
          <span className="esc__ficha" style={{ ['--i' as string]: i }} key={servicio.slug}>
            <span className="esc__ficha-nombre">{servicio.shortTitle}</span>
            <span className="esc__mensaje-tic" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* Contacto: sale el globo de quien escribe, le llega el tic, y vuelve la
   respuesta. El orden lo da el --i, que es el retardo en medios segundos:
   0 para el que sale, 3 para el que vuelve. No hay animacion nueva, solo
   dos numeros distintos.

   Lo que dicen los globos no lo inventamos: el de arriba es el parrafo que
   esta al lado -algo que hoy haces a mano y quieres que se haga solo- y el
   de abajo es textual el h2 de mas abajo en esta misma pagina. */
export function EscenaHilo() {
  return (
    <div className="esc esc--servicio esc--hilo" aria-hidden="true">
      <span className="esc__mensaje esc__mensaje--sale" style={{ ['--i' as string]: 0 }}>
        <span className="esc__mensaje-texto">Hoy esto lo hago a mano y quiero que se haga solo</span>
        <span className="esc__mensaje-tic" />
      </span>

      <span className="esc__mensaje esc__mensaje--vuelve" style={{ ['--i' as string]: 3 }}>
        <span className="esc__mensaje-texto">No necesitas llegar con la solución resuelta</span>
      </span>

      <span className="esc__nota">WhatsApp, email o el formulario</span>
    </div>
  )
}
