'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/* En el servidor no hay layout que medir, asi que useLayoutEffect avisaria en
   consola. Se usa el de layout solo en el navegador, que es donde importa:
   tiene que esconder las piezas ANTES del primer pintado, o se alcanza a ver
   el mapa completo por un cuadro y despues desaparecer. */
const efectoAntesDePintar = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Deja que un bloque se arme cuando entra en pantalla, en vez de llegar ya
 * dibujado. La regla de oro es que NUNCA puede esconder contenido:
 *
 * - Sin JavaScript, el envoltorio no lleva ninguna clase y todo se ve tal cual.
 * - La clase que esconde las piezas ("revela--armado") se agrega recien en el
 *   efecto, o sea solo cuando el JavaScript ya corrio y va a poder mostrarlas.
 * - Si el navegador no trae IntersectionObserver, se muestra de inmediato.
 * - Y hay una red de seguridad: si a los 1,2 segundos el observador no
 *   contesto nada, se muestra igual. Si contesto -aunque haya contestado
 *   que el bloque no esta a la vista- esta vivo y la red se retira: es el
 *   mismo trato que hace RevelaEnCascada.
 *
 * La entrada y los bucles son dos cosas distintas y van en dos clases
 * distintas. "es-visible" es de ida: se pone una vez y no se saca, para que
 * el bloque no vuelva a armarse cada vez que se pasa por encima. Las
 * animaciones que se repiten para siempre si tienen que parar cuando el
 * bloque se va de la pantalla, y de eso se ocupa "revela--fuera".
 *
 * El envoltorio es display:contents, asi que no agrega ninguna caja a la
 * maquetacion; solo existe para colgar las clases. Por eso mismo el que se
 * observa no es el envoltorio sino sus hijos: un elemento sin caja mide 0x0
 * y el navegador no lo da por visible nunca.
 */
export function RevelaAlEntrar({ children, className = '' }: { children: ReactNode; className?: string }) {
  const caja = useRef<HTMLDivElement>(null)
  const [armado, setArmado] = useState(false)
  const [visible, setVisible] = useState(false)
  // Arranca en true a proposito: mientras no se sepa nada, no se detiene nada.
  const [enPantalla, setEnPantalla] = useState(true)

  efectoAntesDePintar(() => {
    const el = caja.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    // Lo que ya se ve al cargar no se arma escondido: es la regla que escribio
    // RevelaEnCascada -su comentario, «si se armara, el encabezado y el diagrama
    // del hero parpadearian»- y que aca faltaba. Sin ella el mapa del hero se
    // pinta, desaparece al hidratar y vuelve a entrar mucho despues.
    //
    // Se miden los HIJOS y no el envoltorio: el envoltorio es display:contents,
    // no genera caja, su rect es 0x0 en el origen y el filtro no filtraria nada.
    // Primero se lee todo y despues se escribe.
    //
    // Un visor sin alto -una pestana que nunca llego a pintarse- daria "esta
    // abajo" para todo, incluido el hero: ahi no se filtra y se arma como antes.
    const alto = window.innerHeight
    const yaSeVe =
      alto > 0 &&
      Array.from(el.children).some((hijo) => hijo.getBoundingClientRect().top < alto * 0.85)

    // "revela--armado" se pone SIEMPRE, tambien cuando la pieza ya se ve: de esa
    // clase cuelgan el pausado de los bucles del mapa y el acelerador de las
    // escenas. Devolver temprano sin ponerla las dejaria congeladas con JS
    // activo. Las dos clases salen en el mismo commit del efecto, asi que el
    // navegador nunca computa el estado escondido y no hay transicion que ver.
    setArmado(true)
    if (yaSeVe) setVisible(true)

    // Se observan los hijos y no el envoltorio: el envoltorio es
    // display:contents, o sea que no genera caja, el navegador lo mide 0x0 y
    // nunca lo da por visible. Observandolo a el, el observador no servia
    // para nada y lo unico que mostraba el bloque era la red de seguridad.
    const aLaVista = new Set<Element>()
    // Si el observador contesto -aunque sea para decir "no esta a la vista"-
    // esta vivo, y la red de seguridad sobra. Sin esta marca la red mostraba
    // el bloque a los 1,2 s pasara lo que pasara, incluso con la escena tres
    // pantallas mas abajo: la entrada se daba sin nadie mirando.
    let respondio = false

    const observador = new IntersectionObserver(
      (entradas) => {
        respondio = true
        for (const entrada of entradas) {
          if (entrada.isIntersecting) aLaVista.add(entrada.target)
          else aLaVista.delete(entrada.target)
        }
        const dentro = aLaVista.size > 0
        // La entrada es de ida y no se desarma.
        if (dentro) setVisible(true)
        // Los bucles si van y vienen: por eso el observador queda conectado.
        setEnPantalla(dentro)
      },
      // Sin umbral: alcanza con que asome. Un bloque mas alto que la pantalla
      // -el mapa en celular- nunca llega a estar visible en un 12%.
      { rootMargin: '0px 0px -10% 0px' },
    )
    for (const hijo of Array.from(el.children)) observador.observe(hijo)

    const red = window.setTimeout(() => {
      if (respondio) return
      setVisible(true)
    }, 1200)

    return () => {
      observador.disconnect()
      window.clearTimeout(red)
    }
  }, [])

  const clases = [
    'revela',
    className,
    armado ? 'revela--armado' : '',
    visible ? 'es-visible' : '',
    enPantalla ? '' : 'revela--fuera',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={caja} className={clases}>
      {children}
    </div>
  )
}
