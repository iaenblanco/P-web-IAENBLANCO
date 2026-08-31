import type { Metadata } from 'next'
import Link from 'next/link'
import { DiagnosticoServicios } from '@/components/DiagnosticoServicios'
import { EscenaIndice } from '@/components/EscenaBanda'
import { RevelaAlEntrar } from '@/components/RevelaAlEntrar'
import { Trabajos } from '@/components/Trabajos'
import { OG_IMAGE, services, SITE_URL, getWhatsappUrl } from '@/lib/site'

/* El <title> cambio el 31-ago-2026. El anterior -"Todo lo que hacemos,
   explicado sin tecnicismos"- describia el TONO del texto y no nombraba
   ninguna de las cuatro cosas que vendemos: no tenia una sola palabra por la
   que alguien pudiera buscarnos. Leer Search Console pasadas unas semanas; si
   el cambio hunde la ruta, el titulo viejo esta escrito aca. */
export const metadata: Metadata = {
  title: 'Servicios: sitios web, programas a medida e IA',
  description:
    'Sitios web y tiendas online, programas a la medida de tu negocio, tareas que se hacen solas y asistentes con inteligencia artificial.',
  alternates: {
    canonical: `${SITE_URL}/servicios/`,
  },
  openGraph: {
    title: 'Servicios de IAenBlanco: sitios web, programas a medida e IA',
    description:
      'Sitios web, programas a medida, tareas automáticas y asistentes con inteligencia artificial para empresas chilenas.',
    url: `${SITE_URL}/servicios/`,
    siteName: 'IAenBlanco',
    type: 'website',
    locale: 'es_CL',
    images: [
      OG_IMAGE,
    ],
  },
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

export default function ServicesIndexPage() {
  /* Antes habia un quinto servicio -buscar clientes- que se filtraba de la
     grilla para mostrarlo aparte, en su propia tarjeta, porque era el unico
     que operabamos nosotros mes a mes. Ese servicio ya no existe: buscar
     clientes ahora es Leads, un programa, y vive en /productos/. Sin el
     filtro, la grilla muestra los cuatro servicios que quedan. */
  const coreServices = services
  const diagnosticUrl = getWhatsappUrl('Hola IAenBlanco, quiero diagnosticar qué servicio necesita mi negocio.')

  return (
    <main id="contenido" className="services-index">
      <section className="services-index-hero">
        <div className="section-shell services-index-hero__inner banda-apertura">
          <div className="banda-apertura__texto">
            {/* "Sin tecnicismos" bajo del h1 al rotulo: es una promesa sobre
                COMO esta escrita la pagina, no sobre lo que hacemos, y estaba
                ocupando el titular entero. El titular lo toma ahora la tesis
                que ya estaba publicada una linea mas abajo. */}
            <p className="eyebrow">Servicios · explicados sin tecnicismos</p>
            <h1>Casi nunca es una sola cosa.</h1>
            {/* El remate anterior era "y si lo que necesitas son clientes nuevos,
                eso lo operamos nosotros": ese servicio se fue. En su lugar va lo
                que de verdad separa estas cuatro cosas de contratar una pagina,
                dicho con otras palabras que en la portada para no repetirla.
                Sin "Casi nunca es una sola", que subio al h1. */}
            <p>
              Hacemos sitios web y tiendas online, programas a la medida de tu negocio, tareas que
              se hacen solas y asistentes con inteligencia artificial. Lo normal es que el sitio
              necesite un programa detrás, y que ese programa lo termines administrando tú.
            </p>
            {/* La apertura no tenia ni un enlace ni un boton: la primera
                pantalla de la pagina no llevaba a ninguna parte. Va al
                diagnostico y no al catalogo porque el catalogo ya quedo justo
                debajo, a un scroll de distancia. */}
            <div className="banda-apertura__accion">
              <Link
                href="/servicios/#diagnostico"
                prefetch={false}
                className="button button--text"
                data-analytics-event="service_cta_click"
                data-service-id="diagnostico"
                data-service-name="Diagnóstico"
              >
                Responde tres preguntas y te decimos por dónde partir
                <ArrowRight />
              </Link>
            </div>
          </div>
          {/* La escena es aria-hidden y lo que muestra -los cuatro servicios- esta
              escrito en el parrafo de al lado y en las tarjetas de mas abajo. */}
          <div className="banda-apertura__visual">
            <RevelaAlEntrar className="revela--escena">
              <EscenaIndice />
            </RevelaAlEntrar>
          </div>
        </div>
      </section>

      {/* EL ORDEN DE ESTA PAGINA, y por que es este.
          Hasta el 31-ago-2026 iba: heroe, TRABAJOS REALES, diagnostico y
          recien al final los cuatro servicios. Medido en 1440, la lista de lo
          que vendemos empezaba en el pixel 4.647 de un documento de 6.843: mas
          de cuatro pantallas de scroll -y 3.069 px de sitios de OTRAS
          empresas- antes de decir que hacemos. Quien hace clic en "Servicios"
          viene a ver los servicios. Ahora el catalogo va primero, el
          diagnostico segundo -ya sabe que hay para elegir- y la prueba
          tercera. */}
      <section id="lo-que-construimos" className="services-index-section">
        <div className="section-shell">
          <div className="services-index-heading">
            <div>
              <p className="eyebrow">Lo que construimos</p>
              <h2>Cuatro cosas que hacemos para ti, y que después quedan tuyas.</h2>
            </div>
            <p className="services-index-heading__lead">
              Tuyas de verdad: el dominio, las cuentas y los datos quedan a tu nombre. Si
              mañana quieres que lo siga otro, se lo entregas y listo.
            </p>
          </div>
          <div className="services-index-cards">
            {coreServices.map((service) => (
              <article key={service.slug}>
                <div>
                  <span>{service.index}</span>
                  <p>{service.eyebrow}</p>
                </div>
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                {/* La barra final no es cosmetica: con trailingSlash:true la version
                    sin barra devuelve un 308 y el navegador recarga el documento
                    entero, perdiendo la navegacion cliente de Next. Ademas es la
                    forma que ya publica serviceCanonical, asi que enlazamos al
                    canonical en vez de a la URL que redirige hacia el. */}
                <Link
                  href={`/servicios/${service.slug}/`}
                  prefetch={false}
                  data-analytics-event="service_cta_click"
                  data-service-id={service.slug}
                  data-service-name={service.shortTitle}
                >
                  Ver cómo lo hacemos
                  <ArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* El id no existia y esta es la unica pieza de la pagina a la que se
          puede querer llegar desde afuera: la usan el CTA de la apertura y la
          rampa de la portada. */}
      <section id="diagnostico" className="services-index-section">
        <div className="section-shell">
          <div className="services-index-heading">
            <div>
              <p className="eyebrow">Empieza por acá</p>
              <h2>Tres preguntas y te decimos por dónde partiríamos.</h2>
            </div>
            <p className="services-index-heading__lead">
              La primera es la misma de siempre: elige la frase que más se parece a lo que te
              pasa, y de ahí sale la recomendación. Las otras dos no la cambian: viajan dentro
              del mensaje, para saber de dónde partes antes de la primera conversación. Al final
              te dejamos ese mensaje escrito, con tus tres respuestas adentro.
            </p>
          </div>
          {/* Antes aca vivian seis enlaces planos: la frase y, al tocarla, la
              pagina del servicio. Las seis frases siguen siendo el paso 1 del
              diagnostico -son las que la gente reconoce-, pero ahora terminan
              en una recomendacion y en el mensaje ya escrito. */}
          <DiagnosticoServicios />
          <div className="services-index-editorial-note">
            <span />
            <p>
              No necesitas saber cómo se llama la solución. Para eso está la primera conversación:
              tú cuentas qué te está costando y nosotros te decimos qué haríamos.
            </p>
          </div>
        </div>
      </section>

      <section className="services-index-section services-index-section--web-proof">
        <div className="section-shell">
          <div className="services-index-heading">
            <div>
              <p className="eyebrow">Trabajos reales</p>
              <h2>Negocios chilenos para los que ya hicimos esto.</h2>
            </div>
            <p className="services-index-heading__lead">
              No son maquetas. Son los sitios que están atendiendo clientes hoy: ábrelos,
              míralos en tu celular y decide antes de escribirnos.
            </p>
          </div>
          {/* Resumida a proposito: la ficha larga -que le hicimos, para que le
              sirve, velocidad y peso- era identica a la de /trabajos/, y esta
              pagina tiene mas enlaces, asi que le ganaba a su propia copia. Aca
              queda la muestra y el detalle se lee alla, con este enlace. */}
          <Trabajos resumido />
          <div className="pagina-trabajos__acciones">
            <Link href="/trabajos/" prefetch={false} className="button button--text">
              Ver los trabajos uno por uno
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="services-index-final">
        <div className="section-shell services-index-final__inner">
          <div>
            <p className="eyebrow">Sin compromiso</p>
            <h2>No necesitas saber qué pedir.</h2>
            <p>
              Llega con el problema, no con la solución. Nosotros te decimos qué conviene hacer
              primero, qué puede esperar y qué directamente no vale la pena.
            </p>
          </div>
          <a
            href={diagnosticUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-analytics-event="service_whatsapp_click"
            data-service-id="diagnostico"
            data-service-name="Diagnóstico"
          >
            Conversemos, sin costo
            <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  )
}
