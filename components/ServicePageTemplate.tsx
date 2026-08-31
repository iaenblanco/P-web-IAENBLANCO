import { type CSSProperties } from 'react'
import Link from 'next/link'
import type { Service } from '@/lib/site'
import { getWhatsappUrl, services } from '@/lib/site'
import { EscenaServicio, textoEscena } from '@/components/EscenaServicio'
import { RevelaAlEntrar } from '@/components/RevelaAlEntrar'
import { RevelaEnCascada } from '@/components/RevelaEnCascada'
import { Trabajos } from '@/components/Trabajos'
import { trabajos } from '@/lib/trabajos'
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
 *   1. Apertura   el titulo y la prueba. En sitios web, los siete negocios
 *                 chilenos; en las otras cuatro, la escena del servicio
 *                 andando, que ahora es grande y abre la pagina.
 *   2. Pasos      cuatro, numerados, con una linea que se dibuja al entrar.
 *   3. Escribenos una sola frase.
 *   4. Caso       un trabajo nuestro (sitios web ya abrio con los siete).
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

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* --- 1. La apertura ------------------------------------------------------
   Una sola forma para las cinco paginas: el titulo a la izquierda y la prueba
   a la derecha, que es como lo pidio Nico. Lo unico que cambia entre ellas es
   QUE hay a la derecha. Las cuatro que todavia no tienen un cliente que
   ensenar dibujan un momento del servicio andando; sitios web tiene la
   portada de un sitio de verdad, y una captura real le gana a cualquier
   dibujo.

   Antes la prueba era HERMANA del titular y la apertura quedaba en dos pisos:
   un h1 topado a 900 px con unos 340 px de aire muerto al lado, y debajo una
   tira de 1240x288 -4,3:1- que se lee como banner y no como ilustracion. */

/* REGLA DURA, y es la razon de que esta sea la unica apertura sin
   RevelaAlEntrar: el <img> de la captura es el elemento LCP de esta ruta.
   RevelaAlEntrar recorta lo que envuelve con clip-path y solo lo suelta
   cuando su observador -o sea JavaScript, ya descargado y corriendo- dice
   que entro en pantalla. Meter la captura ahi adentro deja la mayor pintura
   de la pagina esperando un bundle. Queda fuera, con loading=eager.

   De ahi se sigue lo otro: tampoco puede llevar un bucle infinito. Las otras
   cuatro escenas se detienen fuera de pantalla porque ese mismo envoltorio
   les pone animation-play-state; esta no tendria quien se lo ponga, y una
   animacion eterna sobre una imagen de 1120 px es exactamente lo que hubo
   que sacar de /productos/. Se mueve una sola vez, al entrar, y se queda
   quieta. Y lo unico que se anima es transform del <img>: nunca opacity ni
   clip-path, que retrasan el pintado del elemento que mide el LCP. */
function AperturaWeb({ service, content }: { service: Service; content: ServicePageContent }) {
  const destacado = trabajos.find((trabajo) => trabajo.destacado) ?? trabajos[0]
  const dominio = destacado.href.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <section
      id="apertura"
      className="service-page-section service-page-section--apertura"
    >
      <div className="section-shell banda-apertura">
        <div className="banda-apertura__texto">
          <p className="eyebrow">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          {/* El plazo. Hasta hoy esta era la unica de las cinco paginas que no
              lo pintaba, y con los precios en cero es el unico dato duro que
              trae la apertura. */}
          <p className="service-apertura__plazo">{service.plazo}</p>
          {/* Sin palabra de direccion a proposito: de 899 para abajo la banda
              se apila y la captura queda DEBAJO de este parrafo, asi que "a la
              derecha" era falso en celular y en tablet. */}
          <p className="service-escena__pie">
            {/* El numero sale de la lista y no escrito a mano: decia "cuatro"
                cuando ya eran seis, porque nadie se acuerda de este parrafo al
                agregar un cliente. */}
            Es la portada de {dominio} tal como está hoy, no una maqueta. Más
            abajo hay {trabajos.length - 1} sitios más, todos andando hoy.
          </p>
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
          <a
            href={destacado.href}
            target="_blank"
            rel="noreferrer"
            className="esc esc--servicio esc--captura"
            data-cursor="Abrir"
            data-analytics-event="service_case_click"
            data-case-name={destacado.client}
          >
            <span className="esc__captura-barra" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{dominio}</span>
            </span>
            {/* El mismo par de archivos que usan las tarjetas de abajo: bajo
                540 px la caja mide menos de 400 y la captura de 1120 pesaba
                tres veces lo necesario. El export estatico no genera srcset,
                asi que la eleccion va escrita a mano. */}
            <picture>
              <source
                media="(max-width: 540px)"
                srcSet={`/trabajos/${destacado.captura}-sm.webp`}
                width={760}
                height={475}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/trabajos/${destacado.captura}.webp`}
                alt={`Portada del sitio de ${destacado.client} en computador`}
                width={1120}
                height={700}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <span className="esc__captura-pie">
              {/* Aqui iba "Carga en X · Y". Fuera por lo mismo que en la ficha
                  de /trabajos/: la cifra publicada no aguantaba la medicion. */}
              <strong>{destacado.client}</strong>
              <span className="esc__captura-abrir">
                Abrir el sitio
                <ArrowUpRight />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* Los otros cuatro trabajos, en seccion propia. El titular que antes estaba
   pegado al h1 -"Negocios chilenos para los que ya hicimos esto"- baja aca y
   vuelve a ser el titulo de su seccion, con la ropa que llevan todos los
   demas: ya no tiene que competir en tamano con el h1, asi que
   .service-apertura__subtitulo se fue del proyecto. */
function TrabajosWeb() {
  return (
    <section className="service-page-section service-page-section--website-proof">
      <div className="section-shell">
        <div className="service-page-section__heading service-page-section__heading--wide">
          <p className="eyebrow">Trabajos reales</p>
          <h2>Negocios chilenos para los que ya hicimos esto.</h2>
          <p className="service-apertura__lead">
            No son maquetas. Son páginas web y tiendas online que están atendiendo
            clientes hoy: ábrelas, míralas en tu celular y decide antes de escribirnos.
          </p>
        </div>
        {/* Resumida a proposito, igual que en /servicios/: la ficha larga -que
            le hicimos, para que le sirve, velocidad y peso- era identica a la
            de /trabajos/, y esta pagina le ganaba a su propia copia. Aca queda
            la muestra y el detalle se lee alla, con este enlace, que ademas era
            el unico que faltaba: la pagina no llevaba a /trabajos/ por ningun
            lado. */}
        <Trabajos omitirDestacado resumido />
        <div className="pagina-trabajos__acciones">
          <Link href="/trabajos/" prefetch={false} className="button button--text">
            Ver los trabajos uno por uno
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* Lo que nos distingue no estaba escrito en ninguna parte del sitio. Estaba a
   medias en una capacidad suelta -"boton de WhatsApp, formulario o carro de
   compra"-, en una pregunta frecuente y en una linea perdida de la ficha de
   Propinvest. Lo que hacemos no es la pagina: es lo que trabaja detras de ella.

   Va antes de los ejemplos a proposito. Quien llega quiere saber que hacemos
   antes de ver a quien se lo hicimos.

   Usa .service-build-grid tal cual, sin el modificador --pasos: son cuatro
   tarjetas sin numerar y esa ropa ya existe, asi que no suma CSS nuevo. */
const sistemaDetras = [
  {
    titulo: 'Cotizadores en línea',
    texto: 'El cliente arma lo que necesita y le sale el precio ahí mismo, con tus reglas y tus tramos. A ti te llega la consulta ya cuadrada.',
  },
  {
    titulo: 'El programa de atrás',
    texto: 'Reservas, fichas, pedidos, usuarios: cuando el sitio necesita un programa propio se lo construimos, y queda conectado, no pegado al lado.',
  },
  {
    titulo: 'Lo administras tú',
    texto: 'Los textos, los precios, las fotos y los productos los cambias desde adentro. No dependes de nosotros para publicar un cambio.',
  },
  {
    titulo: 'Conectado a lo que usas',
    texto: 'Tu WhatsApp, tu sistema de boletas, tu tienda: el sitio conversa con ellos en vez de obligarte a copiar los mismos datos dos veces.',
  },
]

function SistemaDetras() {
  return (
    <section className="service-page-section">
      <div className="section-shell">
        <div className="service-page-section__heading service-page-section__heading--wide" data-revela="">
          <p className="eyebrow">No es solo la página</p>
          <h2>Lo que trabaja por detrás.</h2>
          <p className="service-apertura__lead">
            Una página que se vea bien la hace mucha gente. Lo nuestro es lo que va
            detrás: la parte que cotiza, que agenda, que guarda y que después
            administras tú sin pedirle permiso a nadie.
          </p>
        </div>
        <div className="service-build-grid" data-revela="">
          {sistemaDetras.map((pieza, index) => (
            <article key={pieza.titulo} style={desfase(index)}>
              <h3>{pieza.titulo}</h3>
              <p>{pieza.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AperturaEscena({ service, content }: { service: Service; content: ServicePageContent }) {
  const escena = textoEscena(content.slug)

  return (
    <section
      id="apertura"
      className="service-page-section service-page-section--apertura"
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

/* --- 3. La fila de los otros tres servicios ------------------------------
   Aca vivia Escribenos, un tercer boton de WhatsApp a mitad de pagina que
   repetia palabra por palabra el de la apertura y el del cierre. Tres botones
   con la misma frase no son tres oportunidades: son la misma, dicha tres
   veces. Se retiro el 31-ago-2026 y quedan dos, con frases distintas.

   En su lugar, el problema que si estaba sin resolver: desde una pagina de
   servicio no habia forma de llegar a las otras tres sin volver atras. Los
   parametros source/target del despachador de app/layout.tsx existian desde
   siempre y no los usaba nadie; ahora dicen desde donde salio el clic.

   El CSS de .service-next-link ya existia y no lo usaba ningun componente:
   era el bloque de "siguiente servicio" que se retiro cuando las cinco
   paginas se unificaron. Vuelve con los tres que faltan en vez de uno. */

function OtrosServicios({ service }: { service: Service }) {
  const otros = services.filter((otro) => otro.slug !== service.slug)
  return (
    <section className="service-next-link service-next-link--tres">
      <div className="section-shell" data-revela="">
        <p>Los otros tres servicios</p>
        {otros.map((otro) => (
          <Link
            key={otro.slug}
            href={`/servicios/${otro.slug}/`}
            prefetch={false}
            data-analytics-event="service_cta_click"
            data-source-service-id={service.slug}
            data-source-service-name={service.shortTitle}
            data-target-service-id={otro.slug}
            data-target-service-name={otro.shortTitle}
          >
            <span>{otro.index}</span>
            {otro.shortTitle}
            <ArrowRight />
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ServicePageTemplate({ service, content }: ServicePageTemplateProps) {
  const whatsappUrl = getWhatsappUrl(content.whatsappMessage)
  const esWeb = content.slug === 'desarrollo-web-ia'
  /* Ya no alcanza con preguntar por esWeb: automatizaciones tampoco lleva caso
     desde el 31-ago-2026, y el motivo esta escrito en lib/services-content.ts.
     Se lee el campo y el que no lo tenga no pinta la seccion. */
  const caseStudy = content.caseStudy
  const pasos = esWeb
    ? pasosWeb
    : content.builds.map((build) => ({ titulo: build.title, texto: build.text }))

  return (
    <main id="contenido" className="service-page">
      {/* La pagina de web abria con el ejemplo y recien despues contaba que
          hacemos: quien llegaba sin saber quienes somos veia primero el sitio
          de otro. Ahora el orden es que hacemos, como lo hacemos y al final a
          quien se lo hicimos. La rama es exclusiva de web, asi que las otras
          cuatro paginas quedan igual que siempre -por eso AsiTrabajamos se
          repite en las dos ramas en vez de ir suelto abajo-. La imagen de
          apertura sigue siendo la primera del documento, asi que la marca de
          eager/fetchPriority se queda donde esta. */}
      {esWeb ? (
        <>
          <AperturaWeb service={service} content={content} />
          <SistemaDetras />
          <AsiTrabajamos pasos={pasos} />
          <TrabajosWeb />
        </>
      ) : (
        <>
          <AperturaEscena service={service} content={content} />
          <AsiTrabajamos pasos={pasos} />
        </>
      )}

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
            {content.closingCta ?? content.primaryCta}
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <OtrosServicios service={service} />

      {/* Un solo observador para toda la pagina: arma las piezas cuando se
          baja y apaga el bucle de la escena cuando deja de verse. No pinta
          nada, asi que va al final y no estorba. */}
      <RevelaEnCascada />
    </main>
  )
}
