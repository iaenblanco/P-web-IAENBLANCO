import { WHATSAPP_URL } from '@/lib/site'

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
}: {
  eyebrow?: string
  title?: string
}) {
  return (
    <section className="contact-band">
      <div className="section-shell contact-band__inner">
        <p className="eyebrow">{eyebrow}</p>
        <div>
          <h2>{title}</h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="contact-band__link"
            data-cursor="WhatsApp"
          >
            Hablemos por WhatsApp
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}
