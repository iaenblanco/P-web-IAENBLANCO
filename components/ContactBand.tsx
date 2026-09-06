import { getWhatsappDesde, getWhatsappUrl } from '@/lib/site'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function ContactBand({
  eyebrow = 'La primera conversación no cuesta nada',
  title = 'Cuéntanos qué te está costando hoy.',
  rampa = false,
}: {
  eyebrow?: string
  title?: string
  /**
   * La segunda puerta: la revision gratis del sitio, que en la portada fue
   * una seccion entera (#rampa) hasta el 06-sep-2026. Misma copia y misma
   * clase que la version del diagnostico en /servicios, y el mismo evento,
   * para que las dos se cuenten juntas.
   */
  rampa?: boolean
}) {
  return (
    <section className="contact-band">
      <div className="section-shell contact-band__inner">
        <p className="eyebrow">{eyebrow}</p>
        <div>
          <h2>{title}</h2>
          <a
            href={getWhatsappDesde('banda')}
            target="_blank"
            rel="noreferrer"
            className="contact-band__link"
            data-cursor="WhatsApp"
            data-whatsapp-origin="banda"
          >
            Hablemos por WhatsApp
            <ArrowUpRight />
          </a>
        </div>
        {rampa ? (
          <a
            href={getWhatsappUrl(
              'Hola IAenBlanco, quiero que revisen mi sitio y me digan qué le falta. El link es: ',
            )}
            target="_blank"
            rel="noreferrer"
            className="rampa__pie contact-band__rampa"
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
      </div>
    </section>
  )
}
