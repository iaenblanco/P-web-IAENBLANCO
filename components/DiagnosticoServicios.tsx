'use client'

import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { getWhatsappUrl } from '@/lib/site'
import {
  diagnosticoMensaje,
  diagnosticoPasos,
  diagnosticoRecomendacion,
  type DiagnosticoOpcion,
} from '@/lib/services-content'

/* Mismo apano que RevelaAlEntrar: en el servidor no hay layout que medir y
   useLayoutEffect avisaria en consola. Aca el de layout no es un lujo: el alto
   nuevo hay que medirlo ANTES del primer pintado. Si se mide despues, el salto
   de 284 px ya se vio y animarlo llega tarde. */
const efectoAntesDePintar = typeof window === 'undefined' ? useEffect : useLayoutEffect

/* Los dos valores de la fase 10, copiados solo como respaldo por si la hoja no
   llego: la fuente es :root en app/globals.css, y se lee de ahi. */
const MICRO_POR_OMISION = 260
const CURVA_POR_OMISION = 'cubic-bezier(0.22, 1, 0.36, 1)'

/* getPropertyValue devuelve el texto tal cual esta escrito en la hoja
   ("260ms"), no un numero. */
function msDelToken(valor: string, porOmision: number) {
  const limpio = valor.trim()
  if (limpio.endsWith('ms')) return Number.parseFloat(limpio) || porOmision
  if (limpio.endsWith('s')) return Number.parseFloat(limpio) * 1000 || porOmision
  return porOmision
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* Los atributos con los que el clic viaja a la medicion. El despachador de
   layout.tsx escucha clics en <a href> -no en <button>-, asi que el boton
   final del diagnostico ES un enlace a wa.me y no un boton que abre una
   ventana: asi se cuenta solo, sin agregar un evento nuevo a GTM. */
function atributosDeDestino(destino: string, nombre: string) {
  if (destino === 'leads') return { 'data-product-id': 'leads', 'data-product-name': nombre }
  if (destino === 'conversar') return { 'data-service-id': 'diagnostico', 'data-service-name': 'Diagnóstico' }
  return { 'data-service-id': destino, 'data-service-name': nombre }
}

export function DiagnosticoServicios() {
  const [elegidas, setElegidas] = useState<DiagnosticoOpcion[]>([])
  /* Sin esta bandera el foco saltaria al titulo apenas carga la pagina, y el
     navegador se llevaria el scroll con el. Solo se mueve el foco despues de
     que la persona toco algo. Desde la tanda 4 hace un segundo trabajo: es lo
     que enciende data-animado, para que la tarjeta tampoco entre animada al
     cargar. El movimiento es la respuesta a un clic, no una entrada mas. */
  const [interactuado, setInteractuado] = useState(false)
  /* Al volver atras, el paso reaparece con la respuesta que ya se habia dado
     marcada: sin esto se vuelve a una pantalla identica a la primera vez y no
     hay forma de saber cual se eligio. Guarda una sola -la del paso que se
     esta mostrando-, que es siempre la que hace falta: volver dos veces deja
     marcada la del segundo paso, no la del tercero. */
  const [ultimaQuitada, setUltimaQuitada] = useState<DiagnosticoOpcion | null>(null)
  const focoRef = useRef<HTMLHeadingElement>(null)
  const tarjetaRef = useRef<HTMLDivElement>(null)
  /* El alto de la tarjeta ANTES del cambio. Se anota en el manejador del clic,
     cuando el DOM todavia es el del paso viejo: despues de renderizar ya no hay
     de donde sacarlo. null quiere decir "este render no viene de un clic" -el
     primero, o cualquier otro- y entonces no se anima nada. */
  const altoPrevio = useRef<number | null>(null)

  /* El foco es lo que sostiene todo esto. Con key el <h3> viejo se desmonta y
     el navegador manda el foco a <body>: quien navega con teclado o con lector
     perderia el lugar en la pagina. Este efecto lo devuelve al enunciado nuevo,
     que por eso lleva tabIndex={-1} -no es interactivo, pero tiene que poder
     recibir foco- y scroll-margin-top: 120px en la hoja, para que la cabecera
     fija no lo tape. Sigue en useEffect y no en el de layout a proposito: el
     scroll que dispara focus() esta medido asi (a 375, con el header en 74). */
  useEffect(() => {
    if (!interactuado) return
    focoRef.current?.focus()
  }, [elegidas.length, interactuado])

  /* El paso 1 tiene seis opciones, el 2 cuatro y el 3 tres: entre el primero y
     el tercero la tarjeta encoge 284 px a 375 de ancho, y todo lo que hay
     debajo salta de una vez. Aca ese alto se recorre en --dur-micro.

     Se anima desde JavaScript y no con una transition porque no hay ninguna
     declaracion que cambie: el alto sigue siendo "auto" antes y despues, lo que
     cambio es el contenido. Una transition solo arranca si cambia el valor
     computado, asi que auto -> auto no dispara nada, ni siquiera con
     interpolate-size. Medir y animar de pixel a pixel es lo unico que funciona,
     y de paso funciona igual en Safari y en Firefox. */
  efectoAntesDePintar(() => {
    const tarjeta = tarjetaRef.current
    const desde = altoPrevio.current
    altoPrevio.current = null
    if (!tarjeta || desde === null) return
    /* Se pregunta aca y no una vez al montar: el sistema puede cambiar la
       preferencia con la pagina abierta. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hasta = tarjeta.getBoundingClientRect().height
    /* Un pixel no es un movimiento, es ruido de redondeo: animarlo solo agrega
       una animacion mas a la pagina. */
    if (Math.abs(hasta - desde) < 2) return

    const estilos = getComputedStyle(tarjeta)
    const animacion = tarjeta.animate(
      [{ height: `${desde}px` }, { height: `${hasta}px` }],
      {
        duration: msDelToken(estilos.getPropertyValue('--dur-micro'), MICRO_POR_OMISION),
        easing: estilos.getPropertyValue('--curva-casa').trim() || CURVA_POR_OMISION,
      },
    )

    /* Al crecer -volver del paso 3 al 1- la caja arranca mas baja que el
       contenido nuevo y ese contenido se dibujaria encima del pie. Se recorta
       solo mientras dura el viaje: en reposo el recorte se comeria el anillo de
       foco de las opciones, que sale 6 px de la caja. */
    tarjeta.dataset.animando = 'si'
    const soltar = () => {
      delete tarjeta.dataset.animando
    }
    animacion.addEventListener('finish', soltar)
    animacion.addEventListener('cancel', soltar)
    /* React corre esta limpieza ANTES del proximo efecto: si alguien contesta
       dos veces seguidas, la animacion vieja se cancela y el alto vuelve a
       auto, asi que la medicion de la siguiente es la buena. El "desde" de esa
       siguiente ya se anoto en el clic, con la animacion todavia corriendo, o
       sea en el punto exacto donde se veia.

       Los dos removeEventListener no son higiene: son el arreglo. Los eventos
       de animacion no se despachan en el acto, se encolan hasta el proximo
       repintado. Sin esto el orden real era: se cancela la vieja -evento
       encolado-, el efecto nuevo enciende data-animando y arranca la suya, y
       recien ahi se despacha el 'cancel' de la vieja, que con el mismo soltar
       apagaba el recorte de la que estaba corriendo. Medido con
       mirar-diagnostico.mjs: el recorte solo entraba en la primera respuesta,
       y faltaba justo en la tercera, que es la que crece de 496 a 1146 px. */
    return () => {
      animacion.removeEventListener('finish', soltar)
      animacion.removeEventListener('cancel', soltar)
      animacion.cancel()
    }
  }, [elegidas.length])

  const terminado = elegidas.length >= diagnosticoPasos.length
  const paso = terminado ? null : diagnosticoPasos[elegidas.length]
  const destino = elegidas[0]?.destino || 'conversar'
  const recomendacion = useMemo(() => diagnosticoRecomendacion(destino), [destino])
  const mensaje = useMemo(
    () => diagnosticoMensaje(elegidas.map((opcion) => opcion.resumen), recomendacion),
    [elegidas, recomendacion],
  )

  /* Hay que leerlo con el DOM viejo todavia en pantalla: es el unico momento
     en que el alto de donde venimos existe. */
  function anotarAlto() {
    altoPrevio.current = tarjetaRef.current?.getBoundingClientRect().height ?? null
  }

  function elegir(opcion: DiagnosticoOpcion) {
    anotarAlto()
    const siguientes = [...elegidas, opcion]
    setInteractuado(true)
    setUltimaQuitada(null)
    setElegidas(siguientes)
    /* Antes cada frase del paso 1 era un enlace y el clic se medía solo. Ahora
       son botones, y el despachador de layout.tsx solo escucha <a href>: sin
       este aviso, quien contesta una pregunta y se va no deja rastro, y no hay
       forma de saber en qué paso se cae la gente. */
    document.dispatchEvent(
      new CustomEvent('iaenblanco:diagnostico_paso', {
        detail: {
          paso_id: diagnosticoPasos[elegidas.length]?.id || '',
          paso_numero: siguientes.length,
          respuesta: opcion.resumen,
          entry_problem: (elegidas[0] || opcion).resumen,
          completado: siguientes.length >= diagnosticoPasos.length ? 'si' : 'no',
        },
      }),
    )
  }

  function volver() {
    anotarAlto()
    setInteractuado(true)
    setUltimaQuitada(elegidas[elegidas.length - 1] || null)
    setElegidas((previas) => previas.slice(0, -1))
  }

  function reiniciar() {
    anotarAlto()
    setInteractuado(true)
    setUltimaQuitada(null)
    setElegidas([])
  }

  const numeroPaso = Math.min(elegidas.length + 1, diagnosticoPasos.length)

  return (
    <div
      className="diagnostico"
      ref={tarjetaRef}
      /* Solo despues del primer clic. Sin esto la tarjeta entraria animada al
         cargar la pagina, sin que nadie haya tocado nada, y /servicios/ sumaria
         siete animaciones nuevas a la cuenta de la fase 10. */
      data-animado={interactuado ? 'si' : undefined}
    >
      <div className="diagnostico__cabecera">
        {/* La unica region viva de la pieza, y esta afuera del key a proposito:
            un aria-live solo anuncia si el nodo ya estaba en el DOM antes del
            cambio. Dice lo unico que el foco no dice -en que paso estamos-,
            asi que no se pisa con el anuncio del <h3>: primero se lee la
            pregunta nueva, y detras, en cola, "Paso 2 de 3". */}
        <p className="diagnostico__paso" role="status">
          {terminado ? 'Listo' : `Paso ${numeroPaso} de ${diagnosticoPasos.length}`}
        </p>
        <span className="diagnostico__barra" aria-hidden="true">
          {diagnosticoPasos.map((item, indice) => (
            <i key={item.id} data-hecho={indice < elegidas.length ? 'si' : 'no'} />
          ))}
        </span>
      </div>

      {paso ? (
        /* Este key es toda la tanda 4. Sin el, React ve un <div> en la misma
           posicion y lo reusa: solo cambia el texto, el nodo nunca se vuelve a
           montar y una animacion declarada no se dispara mas que una vez. Va en
           el Fragment y no en cada hijo por dos razones: un Fragment no genera
           DOM -los hijos siguen siendo hijos directos del grid .diagnostico, el
           gap de 22px no cambia- y un solo key remonta el enunciado, las
           opciones y tambien la rama del resultado. Los key={opcion.label} de
           los botones se quedan: son los de una lista, no los del paso. */
        <Fragment key={paso.id}>
          <div className="diagnostico__enunciado">
            <h3 className="diagnostico__pregunta" ref={focoRef} tabIndex={-1}>
              {paso.pregunta}
            </h3>
            <p className="diagnostico__ayuda">{paso.ayuda}</p>
          </div>

          <div className="diagnostico__opciones">
            {paso.opciones.map((opcion, indice) => (
              <button
                key={opcion.label}
                type="button"
                className="diagnostico__opcion"
                style={{ ['--i' as string]: indice }}
                data-cursor="Elegir"
                data-elegida={ultimaQuitada?.label === opcion.label ? 'si' : undefined}
                aria-current={ultimaQuitada?.label === opcion.label ? 'true' : undefined}
                onClick={() => elegir(opcion)}
              >
                <span>{opcion.label}</span>
                <ArrowRight />
              </button>
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment key="resultado">
          <div className="diagnostico__resultado" style={{ ['--i' as string]: 0 }}>
            <p className="eyebrow">Por dónde partiríamos</p>
            <h3 className="diagnostico__pregunta" ref={focoRef} tabIndex={-1}>
              {recomendacion.nombre}
            </h3>
            <p className="diagnostico__ayuda">{recomendacion.cuerpo}</p>
            {recomendacion.nota ? <p className="diagnostico__nota">{recomendacion.nota}</p> : null}
            {recomendacion.senales.length ? (
              <ul className="diagnostico__senales">
                {recomendacion.senales.map((senal) => (
                  <li key={senal}>{senal}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <ul className="diagnostico__respuestas" style={{ ['--i' as string]: 1 }}>
            {elegidas.map((opcion, indice) => (
              <li key={opcion.label}>
                <span>{diagnosticoPasos[indice].rotulo}</span>
                {opcion.resumen}
              </li>
            ))}
          </ul>

          {/* El mensaje se muestra antes de mandarlo. Es la misma promesa del
              formulario de /contacto/: aca no se guarda nada, y lo unico que
              viaja es este texto, cuando la persona decide mandarlo. */}
          <details className="diagnostico__mensaje" style={{ ['--i' as string]: 2 }}>
            <summary>Ver el mensaje que se envía</summary>
            <p>{mensaje}</p>
          </details>

          <div className="diagnostico__acciones" style={{ ['--i' as string]: 3 }}>
            <a
              href={getWhatsappUrl(mensaje)}
              target="_blank"
              rel="noreferrer"
              className="button button--primary"
              data-cursor="WhatsApp"
              data-analytics-event="service_whatsapp_click"
              data-entry-problem={elegidas[0]?.label}
              {...atributosDeDestino(recomendacion.destino, recomendacion.nombre)}
            >
              Enviar esto por WhatsApp
              <ArrowUpRight />
            </a>
            <Link
              href={recomendacion.href}
              prefetch={false}
              className="button button--text"
              data-analytics-event={recomendacion.destino === 'leads' ? 'product_click' : 'service_cta_click'}
              data-entry-problem={elegidas[0]?.label}
              {...atributosDeDestino(recomendacion.destino, recomendacion.nombre)}
            >
              {recomendacion.hrefLabel}
              <ArrowRight />
            </Link>
          </div>

          {/* La misma rampa de la portada, en el unico caso en que aplica: si
              lo que falta es el sitio, hay una puerta mas barata que pedir una
              cotizacion. Copia y clase son las de la portada -no se estrena
              nada aca- y viaja con rampa_revision_click, para que las dos
              puertas de la revision gratis se cuenten juntas. */}
          {recomendacion.destino === 'desarrollo-web-ia' ? (
            <a
              href={getWhatsappUrl(
                'Hola IAenBlanco, quiero que revisen mi sitio y me digan qué le falta. El link es: ',
              )}
              target="_blank"
              rel="noreferrer"
              className="rampa__pie"
              style={{ ['--i' as string]: 4 }}
              data-cursor="WhatsApp"
              data-analytics-event="rampa_revision_click"
            >
              <strong>¿Prefieres partir por algo chico?</strong>
              <span>
                Mándanos el link de tu sitio y te decimos qué encontramos. Sin costo y sin que
                tengas que contratar nada.
              </span>
              <ArrowUpRight />
            </a>
          ) : null}
        </Fragment>
      )}

      <div className="diagnostico__pie">
        {/* Terminado, las dos salidas no son la misma: cambiar la ultima
            respuesta conserva las otras dos, empezar de nuevo las borra. Hasta
            ahora solo estaba la segunda, asi que corregir un clic costaba
            contestar las tres preguntas de nuevo. */}
        {elegidas.length ? (
          <div className="diagnostico__vueltas">
            <button type="button" className="diagnostico__volver" onClick={volver}>
              {terminado ? 'Cambiar la última respuesta' : 'Volver a la pregunta anterior'}
            </button>
            {terminado ? (
              <button type="button" className="diagnostico__volver" onClick={reiniciar}>
                Empezar de nuevo
              </button>
            ) : null}
          </div>
        ) : null}
        {/* La salida para quien no quiere contestar nada. Desde el 31-ago-2026
            las cuatro tarjetas quedaron ARRIBA de esta pieza, asi que el
            enlace sube en vez de bajar: por eso ya no dice "prefiero". */}
        <a className="diagnostico__saltar" href="#lo-que-construimos" data-analytics-event="service_skip_click">
          Ver los cuatro servicios
        </a>
      </div>
    </div>
  )
}
