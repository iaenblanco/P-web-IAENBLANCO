import { CarruselClientes } from '@/components/CarruselClientes'
import { CircuitoHero } from '@/components/CircuitoHero'
import { ContactBand } from '@/components/ContactBand'
import { IconoServicio } from '@/components/IconoServicio'
import { MarcaProducto } from '@/components/MarcaProducto'
import { Reveal } from '@/components/Reveal'
import { RevelaAlEntrar } from '@/components/RevelaAlEntrar'
import { RevelaEnCascada } from '@/components/RevelaEnCascada'
import { TypingLine } from '@/components/TypingLine'
import Link from 'next/link'
import { getWhatsappDesde, products, services } from '@/lib/site'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
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

function TrustProofSection() {
  return (
    <section
      className="trust-proof"
      aria-labelledby="trust-proof-heading"
      data-section-view="trust-proof"
    >
      <div className="section-shell trust-proof__inner">
        <Reveal className="trust-proof__copy">
          <p className="eyebrow">Trabajos reales</p>
          <h2 id="trust-proof-heading">Míralo tú mismo.</h2>
          {/* Aca iba una cifra de cartera. El dato era cierto, pero el visitante
              no tiene como comprobarlo, y una cifra sin respaldo pide confianza
              en vez de ganarla. La prueba de este bloque son los trabajos, que
              si se pueden abrir: por eso no hay ningun numero agregado, ni
              exacto ni aproximado. */}
          <p>
            Estos son algunos de los trabajos que hemos hecho: están tal como se ven
            hoy, así que ábrelos y revísalos antes de escribirnos.
          </p>
        </Reveal>

        {/* Aca estaban las siete fichas completas, con captura de escritorio y
            de celular cada una. En un telefono eran casi toda la pagina, y
            quien llegaba buscando que hacemos tenia que pasarlas todas antes de
            saberlo. Quedan los logos; el detalle vive en /trabajos/. */}
        {/* Envuelto para que la tira deje de girar cuando la seccion sale de
            pantalla. El envoltorio es display:contents: no agrega ninguna caja
            a .trust-proof__inner, solo cuelga la clase que lee el CSS. */}
        <RevelaAlEntrar className="revela--carrusel">
          <CarruselClientes />
        </RevelaAlEntrar>

        <Reveal className="trust-proof__accion" indice={1}>
          <Link href="/trabajos/" className="button button--text">
            Ver los trabajos uno por uno
            <ArrowRight />
          </Link>
          <Link href="/servicios/desarrollo-web-ia/" className="button button--text">
            Cómo hacemos un sitio así
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function ProductLabSection() {
  return (
    <section
      className="ecosystem-lab"
      aria-labelledby="ecosystem-heading"
      data-section-view="repisa-productos"
    >
      <div className="section-shell ecosystem-lab__intro">
        <Reveal>
          <p className="eyebrow">Nuestros productos</p>
        </Reveal>
        <Reveal className="ecosystem-lab__heading">
          <h2 id="ecosystem-heading">Tres programas propios, muy pronto.</h2>
        </Reveal>
      </div>

      {/* La repisa: tres fichas iguales para elegir de un vistazo. El detalle
          de cada una -el diptico de como esta hoy y como queda con el
          programa- vive en /productos. Antes el home repetia esa pagina
          entera, con sus diagramas de flujo, y se hacia larguisimo. */}
      <div className="section-shell repisa">
        {products.map((product, index) => (
          <Reveal key={product.id} className={`repisa__ficha repisa__ficha--${product.id}`} indice={index}>
            <Link href={`/productos/#${product.id}`} prefetch={false} data-cursor="Ver">
              <span className="repisa__cabecera">
                <span className="repisa__orden">{String(index + 1).padStart(2, '0')}</span>
                <span className="repisa__marca"><MarcaProducto id={product.id} /></span>
              </span>
              <span className="repisa__para">{product.paraQuien}</span>
              <strong className="repisa__nombre">{product.name}</strong>
              <span className="repisa__promesa">{product.promesaCorta}</span>
              <span className="repisa__pie">
                <span className="repisa__estado"><i aria-hidden="true" />{product.status}</span>
                <span className="repisa__mas">Ver cómo queda<ArrowUpRight /></span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}


/* La repisa de servicios: el eslabon que faltaba. Hasta aca, de los cuatro
   servicios solo desarrollo-web-ia tenia enlace en la portada; los otros tres
   aparecian cero veces, aunque el heroe los enumera en texto.

   No reutiliza .services-index-cards de /servicios/ a proposito. Alla la
   tarjeta lleva la descripcion entera (150-230 caracteres) y min-height 360px,
   que en el telefono son ~1.440px de alto metidos entre los logos y los tres
   pasos. Aca la linea es el eyebrow del servicio, que ya esta escrito como
   una linea, y la tarjeta mide lo que mide su texto. La descripcion completa
   sigue viviendo en /servicios/, que es justo a donde lleva cada tarjeta. */
function ServiciosShelfSection() {
  return (
    <section
      id="lo-que-construimos"
      className="home-servicios"
      aria-labelledby="home-servicios-heading"
      data-section-view="repisa-servicios"
    >
      <div className="section-shell">
        <Reveal className="home-servicios__encabezado">
          <p className="eyebrow">Lo que hacemos</p>
          <h2 id="home-servicios-heading">Cuatro cosas que hacemos para ti.</h2>
        </Reveal>
        <ul className="home-servicios__fila">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Reveal className="home-servicios__pieza" indice={index}>
                {/* La tarjeta entera es el enlace: en el telefono el objetivo
                    tactil pasa a ser la tarjeta y no un renglon de 12px. La
                    barra final tampoco es cosmetica, con trailingSlash:true la
                    version sin barra devuelve 308 y recarga el documento. */}
                <Link
                  href={`/servicios/${service.slug}/`}
                  prefetch={false}
                  data-analytics-event="service_cta_click"
                  data-service-id={service.slug}
                  data-service-name={service.shortTitle}
                >
                  <span className="home-servicios__cabecera">
                    <span className="home-servicios__num">{service.index}</span>
                    <span className="home-servicios__icono">
                      <IconoServicio slug={service.slug} />
                    </span>
                  </span>
                  <h3>{service.shortTitle}</h3>
                  <p>{service.eyebrow}</p>
                  <span className="home-servicios__ir">
                    Ver cómo lo hacemos
                    <ArrowRight />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main id="contenido">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="section-shell home-hero__inner">
          <div className="home-hero__content">
            {/* Cuatro piezas separadas y no una frase con puntos medios: en el
                telefono la frase caia en tres lineas con un punto medio colgando
                al final de la primera y "IA" solo en la tercera. Asi se cuadra
                en 2x2 sin huerfanos. */}
            <p className="hero-kicker hero-kicker--lista">
              <span className="hero-kicker__punto" aria-hidden="true" />
              <span className="hero-kicker__lista">
                <span>Sitios web</span>
                <span>Programas a medida</span>
                <span>Asistentes con IA</span>
              </span>
            </p>
            <h1 id="home-title">
              Te hacemos la parte tecnológica.
              <em>Tú sigue con lo tuyo.</em>
            </h1>
            {/* La segunda frase decia "los dejamos funcionando y te acompanamos
                despues", que es cierto pero lo repiten los tres pasos mas abajo.
                Aca va lo que no estaba dicho en ninguna parte del sitio: que lo
                que hacemos no es la pagina, es lo que trabaja detras de ella.
                La version larga vive en /servicios/desarrollo-web-ia/. */}
            <p className="home-hero__summary">
              Hacemos sitios web, programas a la medida de tu negocio y
              asistentes con inteligencia artificial. Y no solo lo que se ve: también el
              cotizador, la plataforma y el sistema que trabaja por detrás, que después
              administras tú.
            </p>
            <div className="home-hero__actions">
              <a
                href={getWhatsappDesde('portada')}
                target="_blank"
                rel="noreferrer"
                className="button button--primary"
                data-cursor="WhatsApp"
                data-whatsapp-origin="portada"
                data-cursor-theme="signal"
              >
                Cuéntanos tu idea
                <ArrowUpRight />
              </a>
              {/* Este rotulo fue "Como trabajamos" -> #empezar mientras la
                  portada no tenia donde aterrizar el "que hacemos": el ancla
                  caia en los tres pasos, que son otra cosa. Ahora existe la
                  repisa de servicios, asi que el rotulo vuelve a nombrar lo que
                  el ancla entrega de verdad. Si algun dia se borra la repisa,
                  este href se queda sin destino: van juntos. */}
              <a href="#lo-que-construimos" className="button button--text">
                Ver qué hacemos
                <ArrowDown />
              </a>
            </div>
            <TypingLine />
          </div>

          <div className="home-hero__visual">
            {/* Dos geometrias del mismo circuito: la de escritorio y la del
                telefono. El CSS muestra una por corte (900 px) y el propio
                componente pausa la que no se ve. En el telefono los hijos de
                esta columna se intercalan entre los de la columna de texto
                (display: contents + order en el CSS), sin mover el DOM. */}
            <CircuitoHero variante="desk" />
            <CircuitoHero variante="tel" />
            {/* El pie del circuito: va despues del marco, no flotando fuera
                de el. Antes apuntaba a #servicios igual que el boton "Ver que
                hacemos" de la columna de al lado: dos enlaces con la misma
                flecha y el mismo destino. Este lleva a la pagina completa. */}
            <Link href="/servicios/" prefetch={false} className="hero-summary-map__explore" data-cursor="Servicios">
              Ver todos los servicios
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <TrustProofSection />

      <ServiciosShelfSection />

      <ProductLabSection />

      {/* La rampa -la revision gratis del sitio- ya no es una seccion: es la
          segunda puerta de la banda de contacto. El evento sigue siendo
          rampa_revision_click, para que se cuente junto con la del diagnostico. */}
      <ContactBand rampa />
      {/* Un solo observador para toda la pagina: arma las piezas que todavia
          no se ven y las revela cuando entran. No pinta nada, asi que va al
          final. Sin el, los [data-revela] son divs comunes y todo se ve. */}
      <RevelaEnCascada />
    </main>
  )
}
