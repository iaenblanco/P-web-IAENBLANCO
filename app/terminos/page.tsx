import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Términos y condiciones de uso del sitio web de IAenBlanco SpA.',
  alternates: {
    canonical: `${SITE_URL}/terminos/`,
  },
}

const sections = [
  {
    title: 'Identificación',
    body:
      'Este sitio es operado por IAenBlanco SpA, RUT 78.403.861-0, con domicilio en Badajoz 100 Of 1014, Las Condes, Santiago de Chile.',
  },
  {
    title: 'Objeto del sitio',
    body:
      'El sitio presenta información general sobre IAenBlanco, sus servicios y productos. Su contenido no constituye una oferta contractual definitiva ni reemplaza una propuesta comercial acordada para un proyecto específico.',
  },
  {
    title: 'Uso permitido',
    body:
      'Puedes navegar y utilizar este sitio con fines informativos y comerciales legítimos. No está permitido intentar afectar su seguridad, disponibilidad o funcionamiento, extraer contenido de forma abusiva ni utilizar la identidad de IAenBlanco sin autorización.',
  },
  {
    title: 'Propiedad intelectual',
    body:
      'El diseño, código, identidad, textos y demás materiales propios de este sitio pertenecen a IAenBlanco o se utilizan con autorización. Las marcas de clientes y terceros pertenecen a sus respectivos titulares.',
  },
  {
    title: 'Enlaces externos',
    body:
      'El sitio puede enlazar a WhatsApp, redes sociales y dominios de productos. IAenBlanco no controla la disponibilidad, seguridad o políticas de esas plataformas externas.',
  },
  {
    title: 'Disponibilidad y exactitud',
    body:
      'Trabajamos para mantener la información actualizada y el sitio disponible, pero el contenido puede cambiar y no garantizamos funcionamiento ininterrumpido. Los alcances, precios y condiciones de cada servicio se definen en su propuesta o contrato correspondiente.',
  },
  {
    title: 'Ley aplicable',
    body:
      'Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia se someterá a los tribunales competentes conforme a la normativa aplicable.',
  },
]

export default function TermsPage() {
  return (
    <main id="contenido" className="legal-page">
      <div className="section-shell legal-page__layout">
        <aside>
          <p className="eyebrow">Documento legal</p>
          <h1>Términos y condiciones</h1>
          <p>Última actualización<br />9 de julio de 2026</p>
        </aside>
        <article>
          <p className="legal-page__intro">
            Al navegar por iaenblanco.com aceptas estas condiciones de uso.
          </p>
          {sections.map((section, index) => (
            <section key={section.title}>
              <span>0{index + 1}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}
