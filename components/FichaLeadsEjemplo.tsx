/*
 * La ficha de ejemplo de Leads, en /productos/.
 *
 * La escena de arriba (EscenaProducto id="leads") muestra el mapa y unas
 * filas con los campos que trae cada empresa, pero es aria-hidden y
 * abstracta: se ve "Telefono, Email, Web" y nada mas. Esto es la version
 * legible de lo mismo, con la misma busqueda de la escena para que se lea
 * como una continuacion y no como otro ejemplo distinto.
 *
 * Regla que no se toca: el nombre de la empresa y los datos de contacto
 * van en blanco. El producto mismo hace esto con sus muestras (mockLeads
 * deja telefono, email y web vacios y rotula "No representa una empresa
 * real"), asi que la pagina no puede ser menos prolija que el producto.
 * Los rotulos de evidencia son los que Leads escribe de verdad.
 *
 * Tampoco decimos aca cuanto cuesta cada ficha: el precio esta en sonda y
 * la regla de creditos no esta cerrada. Lo que se muestra es lo que se ve
 * en la aplicacion: los campos, el score y en que cola cae.
 */

const CAMPOS = [
  { campo: 'Rubro', valor: 'Ferretería' },
  { campo: 'Dónde', valor: 'Maipú, Región Metropolitana' },
  { campo: 'Contacto', valor: 'Teléfono · Email · WhatsApp · Sitio' },
  { campo: 'Por qué está arriba', valor: 'Verificación fuerte · WhatsApp válido · Email disponible' },
  { campo: 'Por dónde escribirle', valor: 'WhatsApp' },
  { campo: 'De dónde salió', valor: 'Google Places y sitio web público' },
]

export function FichaLeadsEjemplo() {
  return (
    <figure className="ficha-leads">
      <figcaption className="ficha-leads__intro">
        <p className="eyebrow">Así llega una ficha</p>
        <p>
          Esto es lo que aparece por cada empresa que Leads encuentra. Los campos son los que
          trae de verdad. El nombre y los datos de contacto van en blanco a propósito: acá no
          publicamos empresas reales.
        </p>
      </figcaption>

      <div className="ficha-leads__tarjeta">
        <div className="ficha-leads__cabecera">
          <div className="ficha-leads__identidad">
            <span className="ficha-leads__busqueda">Ferreterías · Maipú</span>
            <strong className="ficha-leads__empresa">El nombre de la empresa</strong>
            <span className="ficha-leads__reserva">Acá va el nombre. No lo mostramos.</span>
          </div>
          <span className="ficha-leads__marca">
            <b>8/10</b>
            <i>Listo</i>
          </span>
        </div>

        <dl className="ficha-leads__campos">
          {CAMPOS.map((fila) => (
            <div key={fila.campo}>
              <dt>{fila.campo}</dt>
              <dd>{fila.valor}</dd>
            </div>
          ))}
        </dl>

        <p className="ficha-leads__cola">
          Las que no llegan así quedan en la otra cola, marcadas <b>Revisar</b>, y dicen qué
          falta confirmar antes de llamar. Preferimos avisarte que un dato está flojo a que lo
          descubras en la llamada.
        </p>
      </div>
    </figure>
  )
}
