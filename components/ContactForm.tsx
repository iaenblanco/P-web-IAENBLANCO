'use client'

import { useMemo, useState } from 'react'
import { getWhatsappUrl } from '@/lib/site'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// Los mismos nombres que usa el resto del sitio: quien llego leyendo
// "Tareas que se hacen solas" tiene que reconocer su opcion aca.
const temas = [
  'Sitio web y tienda online',
  'Un programa a tu medida',
  'Tareas que se hacen solas',
  'Un asistente con IA',
  'Todavía no lo tengo claro',
]

type Campos = {
  nombre: string
  empresa: string
  tema: string
  situacion: string
  objetivo: string
}

const VACIO: Campos = { nombre: '', empresa: '', tema: temas[0], situacion: '', objetivo: '' }

/**
 * El despachador de app/layout.tsx bautiza cada formulario asi -name, id, o la
 * seccion que lo contiene- para form_start y form_submit. Se repite el mismo
 * calculo en vez de escribir el nombre a mano: si no coinciden, el embudo de
 * este formulario queda partido en dos nombres distintos y no hay como seguir
 * a la misma persona desde form_start hasta generate_lead.
 */
function nombrarFormulario(form: HTMLFormElement) {
  const seccion = form.closest('section')
  const section = seccion
    ? seccion.id || seccion.getAttribute('aria-label') || seccion.className || ''
    : ''
  return { form_name: form.getAttribute('name') || form.id || section || 'form', section }
}

/**
 * Los dos eventos que app/layout.tsx escucha en `document` (:349 y :376) y que
 * hasta ahora no emitia nadie. El detail viaja con los nombres que ese
 * despachador lee; un campo con otro nombre llega vacio a la capa de datos.
 */
function avisar(nombre: string, detalle: Record<string, string>) {
  document.dispatchEvent(new CustomEvent(nombre, { detail: detalle }))
}

export function ContactForm() {
  const [campos, setCampos] = useState<Campos>(VACIO)
  const [tocado, setTocado] = useState(false)
  const [estado, setEstado] = useState<'inactivo' | 'abierto' | 'bloqueado'>('inactivo')

  const faltan = !campos.nombre.trim() || !campos.situacion.trim()

  function actualizar(campo: keyof Campos, valor: string) {
    setCampos((previo) => ({ ...previo, [campo]: valor }))
    // El aviso de envio habla del mensaje que se acaba de mandar; si el
    // visitante vuelve a escribir, ese mensaje ya es otro y el aviso mentiria.
    // El bloqueo, en cambio, ya no se toca aca: se borraba con la primera tecla
    // y se llevaba puesto el respaldo, o sea que el rescate desaparecia justo
    // cuando la persona iba a corregir algo. Sigue siendo cierto que la ventana
    // esta bloqueada por mas que se escriba, asi que el estado se queda; lo que
    // decide si el respaldo se ve es `mostrarRespaldo`, mas abajo.
    setEstado((previo) => (previo === 'abierto' ? 'inactivo' : previo))
  }

  const mensaje = useMemo(() => {
    const lineas = [
      'Hola IAenBlanco, quiero conversar sobre un proyecto.',
      '',
      `Nombre: ${campos.nombre.trim() || '—'}`,
    ]
    if (campos.empresa.trim()) lineas.push(`Empresa: ${campos.empresa.trim()}`)
    lineas.push(`Tema: ${campos.tema}`)
    lineas.push('', `Qué está pasando hoy: ${campos.situacion.trim() || '—'}`)
    if (campos.objetivo.trim()) lineas.push('', `Qué debería funcionar mejor: ${campos.objetivo.trim()}`)
    return lineas.join('\n')
  }, [campos])

  // El mismo destino que abre el boton, para poder ofrecerlo como enlace
  // cuando el navegador bloquea la ventana.
  const enlace = getWhatsappUrl(mensaje)

  // Un solo destino. Antes habia un boton "Enviar por correo" que abria un
  // mailto: en la misma pestana; si el visitante no tenia cliente de correo
  // configurado -en el telefono es lo normal- el formulario no hacia nada
  // visible y el mensaje se perdia sin que nadie se enterara. Mientras no
  // exista una recepcion real en el servidor, todo sale por WhatsApp, que es
  // el unico canal donde el mensaje se ve llegar.
  function enviar(form: HTMLFormElement) {
    setTocado(true)
    const { form_name, section } = nombrarFormulario(form)

    if (faltan) {
      avisar('iaenblanco:form_error', { form_name, section, error_type: 'missing_required_fields' })
      const primero = document.getElementById(!campos.nombre.trim() ? 'contacto-nombre' : 'contacto-situacion')
      primero?.focus()
      return
    }

    // Ojo con el tercer argumento: pedir 'noopener,noreferrer' obliga a
    // window.open a devolver null SIEMPRE -asi lo manda la especificacion-, o
    // sea que el exito y el bloqueo se veian identicos y no habia forma de
    // avisarle a nadie. Se abre sin features y se corta el opener a mano, que
    // deja la pestana igual de aislada y ademas permite distinguir los dos
    // casos: en el telefono el bloqueo de ventanas es lo normal, y hasta ahora
    // la persona se quedaba creyendo que habia enviado.
    let ventana: Window | null = null
    try {
      ventana = window.open(enlace, '_blank')
    } catch {
      ventana = null
    }
    if (ventana) {
      try {
        ventana.opener = null
      } catch {
        // Si el navegador no deja tocar opener, la pestana se abrio igual.
      }
    }

    if (!ventana) {
      setEstado('bloqueado')
      avisar('iaenblanco:form_error', { form_name, section, error_type: 'popup_blocked' })
      return
    }

    setEstado('abierto')
    avisar('iaenblanco:generate_lead', { form_name, section })
  }

  const errorNombre = tocado && !campos.nombre.trim()
  const errorSituacion = tocado && !campos.situacion.trim()

  /**
   * El respaldo del envio bloqueado se muestra mientras siga sirviendo, y sigue
   * sirviendo mientras haya un mensaje que mandar: su enlace se arma con lo que
   * hay escrito AHORA -de ahi que siga solo al texto que se corrige, sin que
   * haga falta volver a apretar Enviar-, y con los campos vacios ofreceria un
   * "Nombre: —". Se esconde en vez de olvidarse a proposito: borrar el estado
   * dejaria sin rescate a quien selecciona su nombre para reescribirlo, que es
   * el mismo tropiezo pero mas chico. Cuando el mensaje vuelve a estar
   * completo, el respaldo vuelve.
   */
  const mostrarRespaldo = estado === 'bloqueado' && !faltan

  return (
    <form
      className="contact-form"
      onSubmit={(evento) => {
        evento.preventDefault()
        enviar(evento.currentTarget)
      }}
      noValidate
    >
      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="contacto-nombre">
            Tu nombre <abbr title="obligatorio">*</abbr>
          </label>
          <input
            id="contacto-nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={campos.nombre}
            onChange={(evento) => actualizar('nombre', evento.target.value)}
            aria-invalid={errorNombre}
            aria-describedby={errorNombre ? 'error-nombre' : undefined}
          />
          {errorNombre ? (
            <p className="contact-form__error" id="error-nombre">
              Escribe tu nombre para saber con quién hablamos.
            </p>
          ) : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contacto-empresa">Empresa</label>
          <input
            id="contacto-empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            value={campos.empresa}
            onChange={(evento) => actualizar('empresa', evento.target.value)}
          />
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contacto-tema">Sobre qué quieres conversar</label>
          <select
            id="contacto-tema"
            name="tema"
            value={campos.tema}
            onChange={(evento) => actualizar('tema', evento.target.value)}
          >
            {temas.map((tema) => (
              <option key={tema} value={tema}>
                {tema}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contacto-situacion">
            Qué está pasando hoy <abbr title="obligatorio">*</abbr>
          </label>
          <textarea
            id="contacto-situacion"
            name="situacion"
            rows={3}
            value={campos.situacion}
            onChange={(evento) => actualizar('situacion', evento.target.value)}
            aria-invalid={errorSituacion}
            aria-describedby={errorSituacion ? 'error-situacion' : undefined}
          />
          {errorSituacion ? (
            <p className="contact-form__error" id="error-situacion">
              Cuéntanos aunque sea en una línea qué está pasando.
            </p>
          ) : null}
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contacto-objetivo">Qué debería funcionar mejor</label>
          <textarea
            id="contacto-objetivo"
            name="objetivo"
            rows={3}
            value={campos.objetivo}
            onChange={(evento) => actualizar('objetivo', evento.target.value)}
          />
        </div>
      </div>

      {mostrarRespaldo ? (
        <p className="contact-form__error" role="alert">
          Tu navegador bloqueó la ventana de WhatsApp, así que el mensaje no salió.
          Ábrelo tú con el enlace de aquí abajo: va con el texto ya escrito.
        </p>
      ) : null}

      {estado === 'abierto' ? (
        <p className="contact-form__note" role="status">
          Listo: WhatsApp se abrió aparte con el mensaje ya escrito. Solo falta que le
          des enviar.
        </p>
      ) : null}

      <div className="contact-form__actions">
        {/* Sin data-analytics-event: el despachador de app/layout.tsx lee ese
            atributo solo en los clics sobre <a href>, asi que en un <button>
            nunca midio nada. Lo que este envio reporta sale por los eventos
            iaenblanco:generate_lead y iaenblanco:form_error de enviar(). */}
        <button type="submit" className="button button--primary" data-cursor="WhatsApp">
          Enviar por WhatsApp
          <ArrowUpRight />
        </button>

        {/* El clic en este respaldo ES el envio de quien se quedo con la ventana
            bloqueada, asi que tiene que contarse igual que el camino feliz: el
            mismo iaenblanco:generate_lead, con el detail sacado del mismo
            <form> para que form_name y section no se despeguen del form_start y
            del form_submit de esta misma persona. Hasta ahora no contaba como
            lead: el despachador de app/layout.tsx lo veia como un enlace wa.me
            cualquiera y empujaba 'cta_whatsapp_click' con service_id
            'servicios', un servicio que nadie eligio.
            El aviso va en la fase de captura y corta ahi la propagacion, no en
            onClick: ese despachador escucha en document y quedo registrado
            antes de que React hidratara, o sea que en burbuja correria primero
            y ya no habria como callarlo. Cortando en captura el envio deja un
            solo evento -el mismo que deja enviar()- y la dimension de servicio
            no recibe nada. La navegacion no se toca: stopPropagation no es
            preventDefault, el enlace abre igual. */}
        {mostrarRespaldo ? (
          <a
            className="button button--text"
            href={enlace}
            target="_blank"
            rel="noreferrer"
            data-cursor="WhatsApp"
            onClickCapture={(evento) => {
              evento.stopPropagation()
              const form = evento.currentTarget.closest('form')
              if (!form) return
              const { form_name, section } = nombrarFormulario(form)
              avisar('iaenblanco:generate_lead', { form_name, section })
            }}
          >
            Abrir WhatsApp con el mensaje
            <ArrowUpRight />
          </a>
        ) : null}
      </div>

      <p className="contact-form__note">
        No guardamos nada en el sitio: al enviar se abre tu WhatsApp con el mensaje ya
        escrito, y tú decides si lo mandas.
      </p>
    </form>
  )
}
