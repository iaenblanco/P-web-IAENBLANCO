import { type CSSProperties } from 'react'
import type { Service } from '@/lib/site'
import { getWhatsappUrl } from '@/lib/site'
import { EscenaServicio, textoEscena } from '@/components/EscenaServicio'
import { RevelaAlEntrar } from '@/components/RevelaAlEntrar'
import { RevelaEnCascada } from '@/components/RevelaEnCascada'
import { Trabajos } from '@/components/Trabajos'
import { type ServicePageContent } from '@/lib/services-content'

/*
 * Las cinco paginas de servicio tienen la MISMA forma.
 *
 * Antes eran dos paginas distintas: la de sitios web con cinco secciones y
 * las otras cuatro con once -hero, escena, escribenos, como lo hacemos, tres
 * casos tipicos, que recibes, un trabajo nuestro, quien hace que, preguntas,
 * cierre y siguiente servicio-. Nico las miro en fila y pidio que todas se
 * parecieran a la de sitios web: "asi de simple y concreto debe ser cada
 * seccion, no tanto texto, veo muchos cuadrados".
 *
 * Quedan cinco tiempos, en este orden:
 *
 *   1. Apertura   el titulo y la prueba. En sitios web, los cinco negocios
 *                 chilenos; en las otras cuatro, la escena del servicio
 *                 andando, que ahora es grande y abre la pagina.
 *   2. Pasos      cuatro, numerados, con una linea que se dibuja al entrar.
 *   3. Escribenos una sola frase.
 *   4. Caso       un trabajo nuestro (sitios web ya abrio con cinco).
 *   5. Preguntas y cierre.
 *
 * Lo que se fue: el hero con sus cuatro chips y su parrafo de precio -el
 * precio ya estaba respondido en las preguntas-, el diagrama de etapas, los
 * tres casos tipicos, la lista de entregables, la tabla de quien hace que y
 * el enlace al siguiente servicio. Eran veinticuatro cajas por pagina; ahora
 * son once.
 */

type ServicePageTemplateProps = {
  service: Service
  content: ServicePageContent
}

type Paso = { titulo: string; texto: string }

/*
 * El puesto de cada pieza dentro de su grupo. La hoja lo convierte en 70 ms
 * de desfase (--i). Se corta en el sexto a proposito: la lista de preguntas
 * llega a siete y sin tope la ultima entraria casi un segundo tarde, que ya
 * no se lee como una cascada sino como una pagina que va lenta.
 */
function desfase(i: number): CSSProperties {
  return { ['--i' as string]: Math.min(i, 5) } as CSSProperties
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* --- 1. La apertura ------------------------------------------------------
   Dos versiones de la misma idea: arriba el titulo del servicio y debajo la
   prueba mas fuerte que tenemos. En sitios web esa prueba son cinco sitios
   que se pueden abrir; en las otras cuatro, la escena del servicio andando.

   La escena ya no es hermana del titular sino su columna derecha: titulo a
   la izquierda, dibujo a la derecha, que es la forma que pidio Nico. Como
   hermana quedaba una tira de 1240x288 -4,3:1- que se leia como banner, y
   dejaba 340 px de aire muerto a la derecha del h1. */

function AperturaWeb({ titulo }: { titulo: string }) {
  return (
    <section className="service-page-section service-page-section--website-proof service-page-section--apertura">
      <div className="section-shell">
        <div className="service-page-section__heading service-page-section__heading--wide">
          <p className="eyebrow">Trabajos reales</p>
          {/* Es la primera seccion de la pagina y lleva su titulo principal:
              Nico pidio abrir directo con los trabajos, sin hero. Como no hay
              hero, el titulo del servicio no aparecia en ningun encabezado de
              la pagina: ahora es el h1, y el titular de los trabajos baja a h2. */}
          <h1>{titulo}</h1>
          <h2 className="service-apertura__subtitulo">Negocios chilenos para los que ya hicimos esto.</h2>
          <p className="service-apertura__lead">
            No son maquetas. Son páginas web y tiendas online que están atendiendo
            clientes hoy: ábrelas, míralas en tu celular y decide antes de escribirnos.
          </p>
        </div>
        <Trabajos />
      </div>
    </section>
  )
}

function AperturaEscena({ service, content }: { service: Service; content: ServicePageContent }) {
  const escena = textoEscena(content.slug)

  return (
    <section
      id="apertura"
      className="service-page-section service-page-section--apertura service-page-section--escena"
    >
      <div className="section-shell banda-apertura">
        <div className="banda-apertura__texto">
          <p className="eyebrow">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p className="service-apertura__plazo">{service.plazo}</p>
          {/* La escena es aria-hidden: lo que muestra va escrito aca, y de paso
              es la unica linea de texto corrido que lleva la apertura. */}
          {escena ? <p className="service-escena__pie">{escena.pie}</p> : null}
          <div className="banda-apertura__accion">
            <a
              href={getWhatsappUrl(content.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="button button--text"
              data-analytics-event="service_whatsapp_click"
              data-service-id={service.slug}
              data-service-name={service.shortTitle}
            >
              {content.primaryCta}
              <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="banda-apertura__visual">
          <RevelaAlEntrar className="revela--escena">
            <EscenaServicio slug={content.slug} />
          </RevelaAlEntrar>
        </div>
      </div>
    </section>
  )
}

/* --- 2. Los cuatro pasos -------------------------------------------------
   Un solo bloque para las cinco paginas. El "data-revela" va en la tira y no
   en cada tarjeta: asi la tira entra como un grupo -una linea de acento que
   se dibuja sobre cada paso, y las tarjetas detras, una cada 90 ms- en vez
   de cuatro piezas sueltas que aparecen cuando a cada una le toca. */

const pasosWeb: Paso[] = [
  {
    titulo: 'Reunión contigo',
    texto: 'Nos cuentas qué necesitas y ordenamos juntos lo que nos dices.',
  },
  {
    titulo: 'Diseño coherente',
    texto: 'Con tu marca y con tus clientes: el sitio se tiene que ver como tu negocio.',
  },
  {
    titulo: 'Sugerencias y muestras',
    texto: 'Te vamos mostrando avances y propuestas, y decides sobre cosas que se ven.',
  },
  {
    titulo: 'Estructura final y cierre',
    texto: 'Cerramos la estructura, publicamos y te enseñamos a usarlo.',
  },
]

function AsiTrabajamos({ pasos }: { pasos: Paso[] }) {
  return (
    <section className="service-page-section">
      <div className="section-shell">
        <div className="service-page-section__heading service-page-section__heading--wide" data-revela="">
          <p className="eyebrow">Cómo lo hacemos</p>
          <h2>Así trabajamos.</h2>
        </div>
        <div className="service-build-grid service-build-grid--pasos" data-revela="">
          {pasos.map((paso, index) => (
            <article key={paso.titulo} style={desfase(index)}>
              <span className="service-paso__numero">{String(index + 1).padStart(2, '0')}</span>
              <h3>{paso.titulo}</h3>
              <p>{paso.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- 3. Escribenos ------------------------------------------------------- */

function Escribenos({ service, content }: { service: Service; content: ServicePageContent }) {
  return (
    <section id="escribenos" className="service-page-mid-cta">
      <div className="section-shell service-page-mid-cta__inner" data-revela="">
        <p>¿Se parece a lo que te pasa? Escríbenos y lo revisamos antes de proponerte nada.</p>
        <a
          href={getWhatsappUrl(content.whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          className="button button--text"
          data-analytics-event="service_whatsapp_click"
          data-service-id={service.slug}
          data-service-name={service.shortTitle}
        >
          {content.primaryCta}
          <ArrowUpRight />
        </a>
      </div>
    </section>
  )
}

export function ServicePageTemplate({ service, content }: ServicePageTemplateProps) {
  const whatsappUrl = getWhatsappUrl(content.whatsappMessage)
  const esWeb = content.slug === 'desarrollo-web-ia'
  const caseStudy = esWeb ? undefined : content.caseStudy
  const pasos = esWeb
    ? pasosWeb
    : content.builds.map((build) => ({ titulo: build.title, texto: build.text }))

  return (
    <main id="contenido" className="service-page">
      {esWeb ? (
        <AperturaWeb titulo={service.title} />
      ) : (
        <AperturaEscena service={service} content={content} />
      )}

      <AsiTrabajamos pasos={pasos} />

      <Escribenos service={service} content={content} />

      {caseStudy ? (
        <section className="service-page-section service-page-section--case">
          <div className="section-shell service-case-card" data-revela="">
            <div>
              <p className="eyebrow">{caseStudy.label}</p>
              <h2>{caseStudy.title}</h2>
              <p>{caseStudy.text}</p>
            </div>
            <a
              href={caseStudy.href}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="service_case_click"
              data-service-id={service.slug}
              data-service-name={service.shortTitle}
              data-case-name={caseStudy.client}
            >
              <span>{caseStudy.client}</span>
              <strong>{caseStudy.actionLabel}</strong>
              <ArrowUpRight />
            </a>
          </div>
        </section>
      ) : null}

      <section className="service-page-section service-page-section--faq">
        <div className="section-shell service-page-two-col">
          <div className="service-page-section__heading" data-revela="">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Lo que nos preguntan siempre.</h2>
          </div>
          <div className="service-faq-list">
            {content.faqs.map((faq, index) => (
              <details
                key={faq.question}
                data-service-faq
                data-service-id={service.slug}
                data-service-name={service.shortTitle}
                data-revela=""
                style={desfase(index)}
              >
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cierre" className="service-page-cta">
        <div className="section-shell service-page-cta__inner" data-revela="">
          <div>
            <p className="eyebrow">El siguiente paso</p>
            <h2>Cuéntanos tu caso antes de que te propongamos algo.</h2>
            <p>
              Nos cuentas qué te está costando y te decimos con franqueza si este servicio es lo
              que necesitas o si te conviene partir por otro lado. La conversación no cuesta nada.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-analytics-event="service_whatsapp_click"
            data-service-id={service.slug}
            data-service-name={service.shortTitle}
          >
            {content.primaryCta}
            <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* Un solo observador para toda la pagina: arma las piezas cuando se
          baja y apaga el bucle de la escena cuando deja de verse. No pinta
          nada, asi que va al final y no estorba. */}
      <RevelaEnCascada />
    </main>
  )
}
