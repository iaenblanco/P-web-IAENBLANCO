'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { getWhatsappUrl } from '@/lib/site'
import {
  diagnosticoMensaje,
  diagnosticoPasos,
  diagnosticoRecomendacion,
  type DiagnosticoOpcion,
} from '@/lib/services-content'

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
     que la persona toco algo. */
  const [interactuado, setInteractuado] = useState(false)
  const focoRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!interactuado) return
    focoRef.current?.focus()
  }, [elegidas.length, interactuado])

  const terminado = elegidas.length >= diagnosticoPasos.length
  const paso = terminado ? null : diagnosticoPasos[elegidas.length]
  const destino = elegidas[0]?.destino || 'conversar'
  const recomendacion = useMemo(() => diagnosticoRecomendacion(destino), [destino])
  const mensaje = useMemo(
    () => diagnosticoMensaje(elegidas.map((opcion) => opcion.resumen), recomendacion),
    [elegidas, recomendacion],
  )

  function elegir(opcion: DiagnosticoOpcion) {
    const siguientes = [...elegidas, opcion]
    setInteractuado(true)
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
    setInteractuado(true)
    setElegidas((previas) => previas.slice(0, -1))
  }

  function reiniciar() {
    setInteractuado(true)
    setElegidas([])
  }

  const numeroPaso = Math.min(elegidas.length + 1, diagnosticoPasos.length)

  return (
    <div className="diagnostico">
      <div className="diagnostico__cabecera">
        <p className="diagnostico__paso">
          {terminado ? 'Listo' : `Paso ${numeroPaso} de ${diagnosticoPasos.length}`}
        </p>
        <span className="diagnostico__barra" aria-hidden="true">
          {diagnosticoPasos.map((item, indice) => (
            <i key={item.id} data-hecho={indice < elegidas.length ? 'si' : 'no'} />
          ))}
        </span>
      </div>

      {paso ? (
        <>
          <div className="diagnostico__enunciado">
            <h3 className="diagnostico__pregunta" ref={focoRef} tabIndex={-1}>
              {paso.pregunta}
            </h3>
            <p className="diagnostico__ayuda">{paso.ayuda}</p>
          </div>

          <div className="diagnostico__opciones">
            {paso.opciones.map((opcion) => (
              <button
                key={opcion.label}
                type="button"
                className="diagnostico__opcion"
                data-cursor="Elegir"
                onClick={() => elegir(opcion)}
              >
                <span>{opcion.label}</span>
                <ArrowRight />
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="diagnostico__resultado">
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

          <ul className="diagnostico__respuestas">
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
          <details className="diagnostico__mensaje">
            <summary>Ver el mensaje que se envía</summary>
            <p>{mensaje}</p>
          </details>

          <div className="diagnostico__acciones">
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
        </>
      )}

      <div className="diagnostico__pie">
        {elegidas.length ? (
          <button type="button" className="diagnostico__volver" onClick={terminado ? reiniciar : volver}>
            {terminado ? 'Empezar de nuevo' : 'Volver a la pregunta anterior'}
          </button>
        ) : null}
        {/* La salida para quien no quiere contestar nada: las cuatro tarjetas
            estan mas abajo en esta misma pagina. */}
        <a className="diagnostico__saltar" href="#lo-que-construimos" data-analytics-event="service_skip_click">
          Prefiero ver los cuatro servicios
        </a>
      </div>
    </div>
  )
}
