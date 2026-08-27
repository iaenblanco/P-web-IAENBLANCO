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
 * Se detiene al pasar el mouse y al enfocar con teclado, y con
 * prefers-reduced-motion se queda quieto y pasa a ser una tira que se arrastra
 * a mano: el movimiento se apaga, pero ningun logo queda inalcanzable.
 *
 * Es el unico elemento con movimiento perpetuo del sitio. El 25 de agosto se
 * apagaron las 34 animaciones infinitas que habia; esta vuelve a poner una, a
 * proposito y sola.
 *
 * El data-desliza no es decorativo: la bateria de verificacion marca como
 * "texto cortado" todo lo que asome fuera del borde de la pantalla, y aca eso
 * pasa con cada ficha que todavia no le toca entrar. Ese atributo la exime de
 * ese criterio -solo de ese- y esta explicado en verificar.mjs.
 */
function Tira({ copia }: { copia?: boolean }) {
  return (
    <ul
      className="carrusel-clientes__tira"
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
  return (
    <div className="carrusel-clientes" data-desliza>
      <div className="carrusel-clientes__carril">
        <Tira />
        <Tira copia />
        <Tira copia />
      </div>
    </div>
  )
}
