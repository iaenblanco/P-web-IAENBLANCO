import type { Metadata } from 'next'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad y tratamiento de datos del sitio de IAenBlanco SpA.',
  alternates: {
    canonical: `${SITE_URL}/privacidad/`,
  },
}

const sections = [
  {
    title: 'Responsable del tratamiento',
    content: (
      <p>
        IAenBlanco SpA, RUT 78.403.861-0, con domicilio en Badajoz 100 Of 1014,
        Las Condes, Santiago de Chile, es responsable del tratamiento de los datos
        vinculados con este sitio.
      </p>
    ),
  },
  {
    title: 'Información que podemos recibir',
    content: (
      <p>
        En la página de contacto hay un formulario, pero este sitio no guarda ni envía
        nada por su cuenta: al apretar el botón se abre tu WhatsApp o tu correo con el
        mensaje ya escrito, y tú decides si lo mandas. Tampoco creamos cuentas de
        usuario. Podemos recibir los datos que decidas compartir voluntariamente al
        escribirnos por correo electrónico o WhatsApp, como tu nombre, datos de
        contacto, organización y antecedentes de un proyecto.
      </p>
    ),
  },
  {
    title: 'Uso de la información',
    content: (
      <>
        <p>Usamos esa información exclusivamente para:</p>
        <ul>
          <li>Responder consultas y evaluar posibles proyectos.</li>
          <li>Preparar propuestas o coordinar la prestación de servicios.</li>
          <li>Mantener comunicaciones vinculadas con una relación comercial.</li>
          <li>Cumplir obligaciones legales o contractuales aplicables.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Medición y cookies',
    content: (
      <>
        <p>
          Utilizamos Google Tag Manager, Google Analytics y herramientas de medición de
          Meta para comprender, de forma agregada, cómo se utiliza el sitio. Estas
          herramientas emplean cookies o tecnologías similares y registran información
          técnica como navegador, dispositivo, páginas visitadas y origen aproximado de
          la sesión.
        </p>
        <p>
          <strong>Nada de eso se carga hasta que lo autorizas.</strong> Al entrar por
          primera vez verás un aviso con dos opciones: aceptar la medición o continuar
          solo con lo necesario para que el sitio funcione. Si eliges lo segundo, no se
          descarga ningún script de terceros ni se instala ninguna cookie de medición.
        </p>
        <p>
          Tu decisión queda guardada en tu propio navegador. Para cambiarla, borra los
          datos del sitio desde la configuración de tu navegador y el aviso volverá a
          aparecer.
        </p>
      </>
    ),
  },
  {
    title: 'Servicios externos',
    content: (
      <p>
        Los enlaces a WhatsApp, LinkedIn, Instagram y sitios de productos conducen
        a servicios administrados por terceros. El tratamiento de datos que ocurra
        allí se rige por las políticas de cada plataforma.
      </p>
    ),
  },
  {
    title: 'Conservación y derechos',
    content: (
      <p>
        Conservamos la información durante el tiempo necesario para atender la
        consulta, mantener la relación comercial o cumplir obligaciones aplicables.
        Puedes solicitar acceso, corrección o eliminación escribiendo a{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <main id="contenido" className="legal-page">
      <div className="section-shell legal-page__layout">
        <aside>
          <p className="eyebrow">Documento legal</p>
          <h1>Política de privacidad</h1>
          <p>Última actualización<br />9 de julio de 2026</p>
        </aside>
        <article>
          <p className="legal-page__intro">
            Esta política explica qué información puede recibir IAenBlanco a través
            de su sitio y cómo la utiliza.
          </p>
          {sections.map((section, index) => (
            <section key={section.title}>
              <span>0{index + 1}</span>
              <div>
                <h2>{section.title}</h2>
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}
