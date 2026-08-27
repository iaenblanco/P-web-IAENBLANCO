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

export function ContactForm() {
  const [campos, setCampos] = useState<Campos>(VACIO)
  const [tocado, setTocado] = useState(false)

  const faltan = !campos.nombre.trim() || !campos.situacion.trim()

  function actualizar(campo: keyof Campos, valor: string) {
    setCampos((previo) => ({ ...previo, [campo]: valor }))
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

  // Un solo destino. Antes habia un boton "Enviar por correo" que abria un
  // mailto: en la misma pestana; si el visitante no tenia cliente de correo
  // configurado -en el telefono es lo normal- el formulario no hacia nada
  // visible y el mensaje se perdia sin que nadie se enterara. Mientras no
  // exista una recepcion real en el servidor, todo sale por WhatsApp, que es
  // el unico canal donde el mensaje se ve llegar.
  function enviar() {
    setTocado(true)
    if (faltan) {
      const primero = document.getElementById(!campos.nombre.trim() ? 'contacto-nombre' : 'contacto-situacion')
      primero?.focus()
      return
    }

    window.open(getWhatsappUrl(mensaje), '_blank', 'noopener,noreferrer')
  }

  const errorNombre = tocado && !campos.nombre.trim()
  const errorSituacion = tocado && !campos.situacion.trim()

  return (
    <form
      className="contact-form"
      onSubmit={(evento) => {
        evento.preventDefault()
        enviar()
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

      <div className="contact-form__actions">
        <button
          type="submit"
          className="button button--primary"
          data-cursor="WhatsApp"
          data-analytics-event="contact_form_whatsapp"
        >
          Enviar por WhatsApp
          <ArrowUpRight />
        </button>
      </div>

      <p className="contact-form__note">
        No guardamos nada en el sitio: al enviar se abre tu WhatsApp con el mensaje ya
        escrito, y tú decides si lo mandas.
      </p>
    </form>
  )
}
