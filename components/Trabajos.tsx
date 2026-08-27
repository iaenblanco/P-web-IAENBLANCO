import { BrandLogo } from '@/components/BrandLogo'
import { Reveal } from '@/components/Reveal'
import { trabajos } from '@/lib/trabajos'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/*
 * La grilla de trabajos hechos para clientes.
 *
 * Vive en un solo lugar porque el sitio la muestra en tres: el inicio,
 * /servicios y la pagina de sitios web. Antes habia dos componentes
 * distintos con datos distintos, y por eso la misma prueba se veia de dos
 * formas -y en servicios las cinco tarjetas caian 3 + 2, con un hueco en la
 * segunda fila-. Aca la destacada ocupa la fila entera y las otras cuatro
 * van de a dos: cinco tarjetas, ninguna fila coja.
 *
 * "omitirDestacado" lo usa la pagina de sitios web, que desde hoy muestra la
 * destacada arriba, en la columna derecha de su banda de apertura, y aca deja
 * solo las otras cuatro -que caen 2 + 2, sin fila coja tampoco-. El indice se
 * saca ANTES de filtrar a proposito: el orden que se pinta ("02 / 05") es la
 * posicion en la lista completa, asi que las cuatro de abajo siguen desde el
 * 02 y el 01 es el de arriba. Si se numeraran despues de filtrar, la pagina
 * diria "01 / 05" dos veces.
 *
 * "resumido" existe porque /servicios y /trabajos mostraban la misma ficha
 * palabra por palabra, y la pagina nueva no puede posicionar contra su propia
 * copia. En /servicios la tarjeta queda con captura, logo, sector, cliente,
 * proyecto y CTA, y el detalle largo solo vive en /trabajos.
 *
 * "nivelTitulo" existe porque /trabajos usa esta grilla justo debajo de su h1
 * y el h3 fijo dejaba un salto de encabezados. Las reglas CSS que pintan el
 * titulo lo seleccionan por :is(h2, h3), asi que el estilo no depende del nivel.
 */
export function Trabajos({
  omitirDestacado = false,
  resumido = false,
  nivelTitulo = 3,
}: { omitirDestacado?: boolean; resumido?: boolean; nivelTitulo?: 2 | 3 } = {}) {
  const TituloCliente = nivelTitulo === 2 ? 'h2' : 'h3'
  const lista = trabajos
    .map((proof, index) => ({ proof, index }))
    .filter(({ proof }) => !(omitirDestacado && proof.destacado))

  return (
    <div className="trabajos">
      {lista.map(({ proof, index }) => (
        <Reveal
          key={proof.client}
          className={`trabajo${proof.destacado ? ' trabajo--destacado' : ''}`}
          delay={index * 60}
        >
          <a
            href={proof.href}
            target="_blank"
            rel="noreferrer"
            className="trabajo__enlace"
            data-cursor="Abrir"
            data-analytics-event="service_case_click"
            data-case-name={proof.client}
          >
            <figure className="trabajo__captura">
              {/* Bajo 620 px la tarjeta ocupa una sola columna y mide entre
                  350 y 590 px: la captura de 1120 px pesaba tres veces lo
                  necesario. Se sirve una de 760 px, que sigue dando el doble
                  de resolucion en un telefono. El export estatico no genera
                  srcset, asi que la eleccion va escrita a mano. */}
              <picture>
                <source
                  media="(max-width: 540px)"
                  srcSet={`/trabajos/${proof.captura}-sm.webp`}
                  width={760}
                  height={475}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/trabajos/${proof.captura}.webp`}
                  alt={`Portada del sitio de ${proof.client} en computador`}
                  width={1120}
                  height={700}
                  loading={proof.destacado ? 'eager' : 'lazy'}
                  decoding="async"
                  {...(proof.destacado ? { fetchPriority: 'high' as const } : {})}
                />
              </picture>
              <span className="trabajo__movil">
                <picture>
                  <source
                    media="(max-width: 540px)"
                    srcSet={`/trabajos/${proof.captura}-movil-sm.webp`}
                    width={220}
                    height={440}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/trabajos/${proof.captura}-movil.webp`}
                    alt={`El mismo sitio de ${proof.client} visto en celular`}
                    width={420}
                    height={840}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </span>
            </figure>

            <div className="trabajo__ficha">
              <div className="trabajo__meta">
                <span
                  className={`trabajo__logo${proof.logoTone === 'dark' ? ' trabajo__logo--dark' : ''}`}
                >
                  <BrandLogo name={proof.logo} alt={proof.client} loading={proof.destacado ? 'eager' : 'lazy'} sizes="44px" />
                </span>
                <p>{proof.sector}</p>
                <span className="trabajo__orden" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                  <i />
                  {String(trabajos.length).padStart(2, '0')}
                </span>
              </div>

              <TituloCliente>{proof.client}</TituloCliente>
              <strong>{proof.project}</strong>

              {/* Aca iba tambien la velocidad y el peso de cada sitio. Se
                  quitaron: al medirlos contra los sitios en vivo, 5 de los 10
                  numeros publicados ya no se sostenian -Granja Magdalena decia
                  "menos de 1,5 s" y cargaba en 13- y la ficha invitaba al
                  visitante a comprobarlo. Las cifras siguen en lib/trabajos.ts
                  como objetivo interno, no como afirmacion publica.

                  .trabajo__ficha es un grid con gap: al sacar la lista la
                  tarjeta se cierra sola y no hay hueco que compensar por CSS. */}
              {!resumido && (
                <dl className="trabajo__detalle">
                  <div>
                    <dt>Qué le hicimos</dt>
                    <dd>{proof.system}</dd>
                  </div>
                  <div>
                    <dt>Para qué le sirve</dt>
                    <dd>{proof.proof}</dd>
                  </div>
                </dl>
              )}

              <span className="trabajo__cta">
                Abrir el sitio
                <ArrowUpRight />
              </span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  )
}
