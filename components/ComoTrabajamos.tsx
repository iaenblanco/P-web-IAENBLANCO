import { Reveal } from '@/components/Reveal'

/**
 * Los tres pasos, las preguntas de siempre y los rubros con los que ya se
 * trabajo. Vivieron en la portada hasta el 06-sep-2026; se mudaron a
 * /servicios porque la portada quedo para captar -cuatro servicios, tres
 * productos, una conversacion- y esto es lo que lee quien ya quiere saber
 * como es trabajar con nosotros. El id "empezar" se conserva por si algun
 * enlace viejo lo busca.
 */
export function ComoTrabajamos() {
  return (
    <section className="problem-strip" id="empezar" aria-labelledby="model-heading">
      <div className="section-shell problem-strip__inner">
        <div className="problem-strip__proceso operating-model">

          <Reveal className="operating-model__heading">
            {/* Decia "Y desde aca, como trabajamos": daba por hecho que venias
                bajando desde el bloque anterior. Pero el boton del hero salta
                directo hasta aca, asi que el rotulo tiene que sostenerse solo
                para quien aterriza sin haber leido nada de lo de arriba. */}
            <p className="eyebrow">Así trabajamos</p>
            <div>
              <h2 id="model-heading">Tres pasos, y en ninguno te dejamos solo.</h2>
              <p className="operating-model__copy">
                No partimos vendiéndote algo. Partimos entendiendo qué te está costando
                hoy. Recién ahí sabemos qué hay que construir, y te decimos qué es y
                cuánto vale antes de empezar.
              </p>
            </div>
          </Reveal>

          <div className="operating-model__steps">
            <span className="operating-model__carril" aria-hidden="true" />
            {[
              /* El paso 02 decia "Avances desde el primer viernes". Suena a una
                 cadencia semanal fija que no existe, y nadie la habia prometido:
                 lo que si es cierto es que nada arranca hasta que la cotizacion
                 esta aceptada, y que el plazo depende del tamano. Eso es lo que
                 dicen ahora los tres pasos. */
              {
                number: '01',
                title: 'Conversamos y te cotizamos',
                text: 'Nos cuentas cómo trabajas hoy y qué te está costando. Te decimos qué haríamos y cuánto vale, sin costo y sin compromiso.',
                deliverable: 'Qué haríamos y cuánto vale, por escrito',
                cuando: 'Apenas nos escribes',
              },
              {
                number: '02',
                title: 'Lo construimos',
                text: 'Con la cotización aceptada empezamos, y te vamos mostrando cómo va para que no haya sorpresas al final.',
                deliverable: 'Tu sitio, tu programa o tu asistente, funcionando',
                cuando: 'Apenas confirmas',
              },
              {
                number: '03',
                title: 'Lo dejamos andando',
                text: 'Lo publicamos, te enseñamos a usarlo y quedamos disponibles para los ajustes que salgan.',
                deliverable: 'Puesta en marcha, y nosotros ahí después',
                cuando: 'Según el tamaño del proyecto',
              },
            ].map((step, index) => (
              <Reveal key={step.number} className="operating-step" indice={index}>
                <span className="operating-step__placa" aria-hidden="true">{step.number}</span>
                <p className="operating-step__cuando">{step.cuando}</p>
                <h3>{step.title}</h3>
                <p className="operating-step__texto">{step.text}</p>
                <strong className="operating-step__entrega">
                  <span>Te queda</span>
                  {step.deliverable}
                </strong>
              </Reveal>
            ))}
          </div>

          <Reveal className="objeciones" indice={1} seccionVista="objeciones">
            <p className="objeciones__titulo">Lo que se pregunta todo el mundo antes de escribir</p>
            <div className="objeciones__precio">
              <h3>¿Cuánto cuesta?</h3>
              <p>
                Depende de lo que necesites, y por eso no ponemos un precio en la web
                que después no calce. Lo que sí te garantizamos: el precio de lo acordado
                te lo damos por escrito antes de empezar y ese número no se mueve. Si a
                mitad de camino quieres sumar algo que no estaba, te lo cotizamos aparte
                y decides tú antes de que lo hagamos.
              </p>
            </div>
            <div>
              <h3>¿Y si a mitad de camino no me gusta?</h3>
              <p>
                No trabajamos meses a puerta cerrada. Te vamos mostrando avances y
                decides sobre cosas que se ven, así que cualquier cosa que no te cuadre
                la corregimos cuando todavía es barato corregirla.
              </p>
            </div>
            <div>
              <h3>¿Después quedo amarrado con ustedes?</h3>
              <p>
                No. Lo que construimos queda tuyo: tu dominio, tus cuentas, tus datos.
                Si más adelante quieres que lo siga otro, se lo entregas y listo.
              </p>
            </div>
          </Reveal>

          <Reveal className="industry-line">
            <p>Ya trabajamos con negocios de</p>
            <div>
              <span>Venta de productos</span>
              <span>Propiedades</span>
              <span>Servicios a empresas</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
