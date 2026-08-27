'use client'

import { useRef, useState } from 'react'

import { BrandLogo } from '@/components/BrandLogo'
import { trabajos } from '@/lib/trabajos'

/*
 * La tira de logos de la home.
 *
 * Antes el inicio mostraba las fichas completas de todos los trabajos, y en un
 * telefono eso se comia casi la pagina entera: quien llegaba buscando que
 * hacemos tenia que pasar cinco capturas de sitios ajenos antes de saberlo.
 * Las fichas se fueron a /trabajos/ y aca queda solo la marca de cada cliente.
 *
 * El movimiento es continuo y no de a saltos: la lista se pinta tres veces y
 * el carril se corre exactamente un tercio -una tira-, asi que cuando termina
 * el recorrido la copia esta justo donde estaba el original y el salto de
 * vuelta no se ve. Son tres y no dos porque el bucle solo es continuo si lo
 * que queda detras del borde cubre el contenedor: con dos tiras de cinco
 * logos quedaba un hueco en pantallas anchas cada vez que el ciclo llegaba al
 * final; con tres, las dos tiras que respaldan (1500px como minimo) cubren
 * cualquier contenedor del sitio (1440px como maximo). Las copias llevan
 * aria-hidden -si no, un lector de pantalla leeria los clientes varias veces-
 * y sus enlaces salen del orden de tabulacion, porque nada oculto para
 * asistencia puede recibir el foco.
 *
 * Se detiene al pasar el mouse, pero el hover solo existe donde hay puntero:
 * en un telefono no habia ninguna forma de detenerlo, y algo que se mueve solo
 * y sin parar tiene que poder frenarse. De ahi el boton, y de ahi que vaya
 * ANTES del carrusel: quien navega con teclado necesita poder detenerlo antes
 * de entrar a los enlaces, no despues de perseguirlos. El boton no lleva
 * aria-pressed porque su propio texto ya dice en que estado esta; con los dos,
 * el lector lo anuncia dos veces.
 *
 * Al enfocar con teclado no alcanza con pausar. Pausado a secas el carril
 * queda congelado donde venia, y el enlace que acaba de recibir el foco puede
 * haber quedado bajo el degradado del borde o directamente fuera de la caja,
 * que recorta. Por eso el foco ademas devuelve el carril a cero -sin animacion
 * y sin transform- y vuelve la caja scrolleable: con desplazamiento real el
 * navegador se encarga de traer a la vista el enlace enfocado. Es la misma
 * receta de prefers-reduced-motion, que encima se queda quieto y pasa a ser
 * una tira que se arrastra a mano: el movimiento se apaga, pero ningun logo
 * queda inalcanzable.
 *
 * El estado del boton y del foco vive aca, asi que el componente es de
 * cliente; el CSS hace el resto leyendo data-pausado y data-foco.
 *
 * Es el unico elemento con movimiento perpetuo del sitio. El 25 de agosto se
 * apagaron las 34 animaciones infinitas que habia; esta vuelve a poner una, a
 * proposito y sola.
 *
 * El data-desliza no es decorativo: la bateria de verificacion marca como
 * "texto cortado" todo lo que asome fuera del borde de la pantalla, y aca eso
 * pasa con cada ficha que todavia no le toca entrar. Ese atributo la exime de
 * ese criterio -solo de ese- y esta explicado en verificar.mjs. Sigue en el div
 * de adentro, que es el que recorta: el marco que envuelve al boton no recorta
 * nada y moverlo ahi eximiria de mas.
 */
function Tira({ copia }: { copia?: boolean }) {
  // El role="list" explicito no sobra: con list-style none, Safari y VoiceOver
  // le sacan la semantica al ul y dejan de anunciar "lista, 5 elementos".
  return (
    <ul
      className="carrusel-clientes__tira"
      role="list"
      {...(copia ? { 'aria-hidden': true } : {})}
    >
      {trabajos.map((trabajo) => (
        <li key={trabajo.client} className="carrusel-clientes__item">
          <a
            className="carrusel-clientes__enlace"
            href={trabajo.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="Abrir"
            data-analytics-event="client_logo_click"
            data-case-name={trabajo.client}
            {...(copia ? { tabIndex: -1 } : {})}
          >
            <span
              className={`carrusel-clientes__logo${trabajo.logoTone === 'dark' ? ' carrusel-clientes__logo--dark' : ''}`}
            >
              {/* Sin carga perezosa a proposito. Un logo que hoy esta fuera del
                  borde derecho entra a pantalla en unos segundos por si solo, y
                  con lazy el navegador lo pedia recien en ese momento: se veia
                  el hueco y despues el logo. Son pocos archivos de pocos kB. */}
              <BrandLogo name={trabajo.logo} alt="" sizes="120px" loading="eager" />
            </span>
            <span className="carrusel-clientes__nombre">{trabajo.client}</span>
            <span className="carrusel-clientes__rubro">{trabajo.sector}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function CarruselClientes() {
  const [pausado, setPausado] = useState(false)
  const [hayFoco, setHayFoco] = useState(false)
  const caja = useRef<HTMLDivElement>(null)

  return (
    <div className="carrusel-clientes-marco">
      <button
        type="button"
        className="carrusel-clientes__pausa"
        onClick={() => setPausado((antes) => !antes)}
      >
        {pausado ? 'Reanudar' : 'Pausar'} los logos
      </button>
      {/* onFocus y onBlur van en el contenedor porque en React el foco burbujea:
          un solo par de manejadores cubre los enlaces de adentro. Las copias
          tienen tabIndex -1, asi que el foco siempre cae en la tira original. */}
      <div
        className="carrusel-clientes"
        ref={caja}
        data-desliza
        data-pausado={pausado || undefined}
        data-foco={hayFoco || undefined}
        onFocus={() => setHayFoco(true)}
        onBlur={() => {
          setHayFoco(false)
          // Mientras hubo foco la caja fue scrolleable y el navegador la
          // desplazo para traer a la vista el enlace enfocado. Volver a
          // overflow hidden no deshace eso: la caja sigue siendo contenedor de
          // scroll y conserva su scrollLeft, asi que el carril reinicia desde
          // 0% pero pintado corrido y deja una franja vacia a la derecha.
          if (caja.current) caja.current.scrollLeft = 0
        }}
      >
        <div className="carrusel-clientes__carril">
          <Tira />
          <Tira copia />
          <Tira copia />
        </div>
      </div>
    </div>
  )
}
