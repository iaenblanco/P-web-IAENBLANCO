# Fase 10 — Motion · bitácora de ejecución (1-sep-2026)

Sobrevive a un `/clear`. Lo que está acá está **medido**, no leído.

## Punto de partida

- `origin/main` == `main` == `ff28c51` (fases 8 y 9 en vivo). Árbol limpio.
- **`npm run build` volvió a funcionar** (exit 0). En la fase 9 moría con exit 134 cuatro
  veces por presión de *commit* del sistema; el día de esta fase había 6,5 GB de commit
  libre y **cero procesos de Chrome vivos**. La palanca no es `--max-old-space-size`:
  es cerrar Chrome y sesiones. Ver [[equipo-limite-sesiones]].
- El `out/` reconstruido sirve en `localhost:3210` y su CSS es `b3394a02b92a6fa1.css`,
  **el mismo hash que producción**. Por primera vez desde la fase 8 se puede medir en
  local sin publicar primero.

## Instrumento nuevo

`herramientas/mirar-motion.mjs` — lee `document.getAnimations()` en las 11 rutas × 2
anchos, **arriba y después de recorrer la página**, sin tocar el DOM. Deja el crudo en
`.tmp/mot/motion.json`.

```bash
node herramientas/servir.mjs out 3210
MSYS_NO_PATHCONV=1 node herramientas/mirar-motion.mjs .tmp/mot http://localhost:3210 1440,390
```

Esquiva cuatro trampas ya pagadas: no usa `requestAnimationFrame` (con la pestaña oculta
no dispara y cuelga la llamada 45 s), no muta el DOM (en la fase 9 un script que mutaba
reportó «13 animaciones corriendo» donde una sonda de solo lectura veía las 13 pausadas),
mide dos veces porque las revelaciones por scroll no existen antes del scroll, y emula el
ancho antes de navegar porque `innerWidth` da 0 sin emulación activa.

## Línea base medida (antes de tocar nada)

**Batería**, 9 anchos × 8 rutas, en tres corridas: `chico 18`, y `imagenes/partida/icono/
cortado/pegados` en 0. Reproduce exactamente la línea base registrada. (Ojo: el `tail -6`
de la corrida se comió los seis primeros criterios; para el cierre usar `tail -14`.)

**Motion**, 45 nombres de animación vivos en las 11 rutas.

1. **El Home no revela nada.** A `scrollY 0` los **15/15** elementos `.reveal` ya están
   `.is-visible`, en un documento de 5.209 px con visor de 900. Los `delay={index * 90}`
   escalonan algo que ya está puesto: el «escalonamiento fantasma» del criterio de cierre
   queda **confirmado midiendo**.
2. **El carrusel es lo único que nunca para.** Abajo del todo quedan 3 animaciones:
   `nucleo-late` **pausada** (el mapa sí se apaga fuera de cámara, vía `revela--fuera`),
   `consent-in` terminada, y `carrusel-clientes-desliza` **corriendo, infinita, 42 s**.
   El mecanismo para apagarlo ya existe y funciona en el mapa.
3. **El caret no es infinito.** `typing-cursor` corre **4 iteraciones de 760 ms** y se
   detiene. Parpadea ~3 s y se queda quieto. Eso cambia cómo se formula la pregunta.
4. La guardia estática reporta **0 keyframes huérfanos**. Los «7 ya identificados» del
   plan, si existen, están muertos por **pisado**, no por ausencia de referencia — que es
   justo lo que un grep no ve y por lo que el plan pide medir con navegador.
5. Rutas mudas: `/trabajos/` tiene 1 animación y 8 bloques `.reveal`; `/privacidad/` y
   `/terminos/` tienen esa sola.

Home @1440 a `scrollY 0`: 12 transiciones del mapa (1.600-2.000 ms), 18 × `corriente-viaja`
(4.500 ms, 1 iteración), `nucleo-late` (5.200 ms), `typing-cursor`, y el carrusel.


## Segunda línea base: reduced-motion (1-sep-2026)

El instrumento tenía cuatro defectos y le faltaba lo que el criterio de cierre
exige. Corregidos los cinco:

| qué | por qué importaba |
| --- | --- |
| contaba `.revela--armado` y no `.revela-armado` | quedaba ciego al componente que esta fase porta |
| no leía `currentTime` | `running` con duración 0 se contaba como movimiento |
| la curva de una `CSSTransition` la leía de `animationTimingFunction` | reportaba la curva de otra cosa |
| recorría de 400 px cada 90 ms contra `scroll-behavior: smooth` | medía una página todavía en viaje |
| nadie emulaba `prefers-reduced-motion` | el criterio de cierre lo pide por escrito |

Además puerto propio (9374; `mirar-escenas` e `inventario-mono` también usaban
el 9373) y `className` de SVG por `getAttribute`, que destapó dos animaciones
vivas que antes salían como `path` a secas: `mapa-traza` y `mapa-traza-luz`.

**Resultado, 11 rutas × 2 anchos × 2 modos:**

- **`prefers-reduced-motion: reduce` → 0 animaciones en todo el sitio.** Las 22
  filas dan `animaciones 0 · corriendo 0 · avanzando 0`. Esa mitad del criterio
  de cierre ya estaba satisfecha antes de tocar nada, y hay que no romperla.
- Modo normal: **46 nombres vivos**, y al pie de la portada **2 animaciones
  avanzando**. `carrusel-clientes-desliza` es la única infinita (42 s).

```bash
node herramientas/servir.mjs out 3210
MSYS_NO_PATHCONV=1 node herramientas/mirar-motion.mjs .tmp/mot2 http://localhost:3210 1440,390 "" ambos
```

## Tandas hechas

**Tanda 1 — el carrusel deja de girar a solas.** `<CarruselClientes>` envuelto
en `RevelaAlEntrar className="revela--carrusel"` y una regla que apaga el carril
con `revela--fuera`. Es la misma cuenta que ya hacía el mapa del hero y no
agrega ni un observador ni una línea de JS. El envoltorio es `display: contents`:
no toca la maquetación de `.trust-proof__inner`.

**Tanda 2 — tokens de movimiento.** `--dur-micro`, `--dur-entrada` y
`--curva-casa` en `:root`. **Los valores no son los del plan.** El plan pedía
`--dur-micro: 200ms`; lo medido es que la casa usa **260 ms en 40 declaraciones
contra 16 de 200 ms**, y adoptar el número del plan cambiaría 86 velocidades. Se
nombró lo que ya se pinta. Adopción: solo donde el valor ya coincidía exacto
(`revela-entrada`), o sea cero cambio visual.

**Tanda 3 — la portada revela de verdad.** El cambio de mayor riesgo del plan.

- `Reveal.tsx` **no se borró: se volvió honesto.** Emite `[data-revela]` y `--i`
  en vez de `reveal is-visible` horneado desde el servidor. El plan pedía
  retirarlo; medido, retirarlo costaba más de lo que decía: el div es item de
  rejilla en `.trabajos`, `.repisa` y `.ad-lista`, lleva el `data-section-view`
  del que cuelga el evento de analítica de «objeciones», y disolverlo son 18
  divs repetidos. Se cumplió el objetivo del plan —un solo vocabulario, la
  transición huérfana muerta— sin pagar ese precio. **Queda dicho como
  desviación del plan, no como cumplimiento.**
- `RevelaEnCascada` pasó de `main.service-page` a `main`, y se montó en la
  portada, contacto, trabajos, productos y el índice de servicios. Las cuatro
  páginas de servicio no cambian: `main` resuelve al mismo elemento.
- Los 8 `delay={…}` en milisegundos pasaron a `indice={…}`, que la hoja
  multiplica por 70 ms. Un solo número para todo el sitio.
- Sale del CSS todo el vocabulario `.reveal`: la transición huérfana, el
  `opacity: 1` que 3.500 líneas más abajo la pisaba y clavaba 13 de los 15
  nodos de la portada, su corte de reduced-motion, y las dos reglas de
  `.problem-strip__grid > .reveal` — esa clase y `.problem-card` tienen **cero
  apariciones en el TSX**, o sea que ya estaban muertas antes de esta fase.


## Verificación de las tandas 1-3 (medida, no leída)

Reconstruido y servido el sitio, la misma matriz de 11 rutas × 2 anchos × 2
modos que la línea base. `.tmp/mot3/motion.json`.

**La portada revela de verdad.** Antes: 15 de 15 piezas ya visibles a scrollY 0.
Ahora:

| | armadas | ya visibles arriba | visibles al pie | **varadas** |
| --- | --- | --- | --- | --- |
| `/` @1440 | 15 | 1 | 17 | 0 |
| `/` @390 | 15 | **0** | 17 | 0 |
| `/servicios/` | 7 | 1 | 8 | 0 |
| `/trabajos/` | 7 | 0 | 7 | 0 |
| `/contacto/` @390 | 4 | 1 | 5 | 0 |

«Varadas» es la columna que importa y es la que la batería no puede mirar:
cuenta piezas que quedaron con la clase que las esconde y sin la que las
muestra. Cero en las 44 filas. Un revelado mal escrito deja campos invisibles
para siempre y la batería lo aprueba en silencio porque descarta lo que está a
`opacity: 0` (`herramientas/verificar.mjs:141-149`). Por eso el contador se
agregó al instrumento.

**El carrusel se detiene.** Al pie de la portada, `carrusel-clientes-desliza`
pasa de `[running] INFINITA` a `[paused]`, en 1440 y en 390. Y el total de
animaciones avanzando al pie baja de **2 a 0** en las 11 rutas.

**Reduced-motion intacto.** 22 filas, `animaciones 0 · corriendo 0 · avanzando 0`.
0 nombres vivos. No se rompió lo que ya estaba bien.

## Lo que la tanda 5 iba a romper

El plan manda «`document.getAnimations()` en las 11 rutas, retirar keyframes que
no aparezcan en ninguna». Ejecutado al pie de la letra borra animaciones vivas.
Medido: **14 nombres no aparecen nunca, y 3 están vivos.**

| nombre | por qué el navegador no lo ve | dónde vive |
| --- | --- | --- |
| `faq-respuesta` | pide un clic en un `<details>` | `globals.css:3311`, y el mapa lo llama «la única entrada del sitio para texto que se revela» |
| `page-enter` | pide navegar entre rutas, no cargar una | `app/template.tsx:21` lo pone condicional |
| `esc-captura` | escena que el recorrido no llegó a activar | `ServicePageTemplate.tsx:146` |

Y hay una prueba más dura de que el método solo no alcanza: **`mapa-traza` y
`mapa-traza-luz` aparecieron vivas en la primera corrida y mudas en la segunda,
sin que nadie tocara el mapa entremedio.** Es varianza de muestreo, no un
cambio.

La regla honesta es la intersección: un keyframe muere solo si el navegador no
lo ve **y** el análisis estático da una razón por la que no puede correr
(referencia pisada, o marcado que no existe). Esa intersección da exactamente
los **11** del mapa —ni los 7 del plan ni los 14 del navegador—, y son los que
quedan propuestos.

**Pero borrar los 11 `@keyframes` a secas deja 11 referencias apuntando a nada**,
que es la deuda opuesta a la que se venía a pagar y que la guardia mide. La
limpieza limpia toca también las reglas, y cuatro de esas reglas todavía
declaran `stroke-width`, `opacity`, `background` y `content` que sí pintan. Por
eso la tanda 5 no se ejecuta sin decidir el alcance.

## Batería, 9 anchos × 8 rutas

| tramo | resultado |
| --- | --- |
| 360 / 390 / 414 | los doce criterios en **0** |
| 768 / 834 / 1024 | `chico 18` · `toque 1` |
| 1280 / 1440 / 1920 | los doce criterios en **0** |

`chico 18` es idéntico a la línea base: son las declaraciones intermedias de
`font-size` que quedaron diferidas al dueño y no se tocaron acá.

`toque 1` es `a.diagnostico__saltar` («Ver los cuatro servicios»), 174 × 13 px,
en `/servicios/` a 768 px: un enlace de texto que no llega al area minima. No
sale de esta fase —`<DiagnosticoServicios />` se monta pelado en
`app/servicios/page.tsx:182`, sin `Reveal` alrededor, asi que ninguna de las
tres tandas lo toca— y cae dentro de la tanda 4, que esta trabada. Queda como
sexto punto de esa tanda.



## Preguntas al dueño (ninguna se inventó)

1. **El caret de `typing-line`.** Medido: no es infinito, parpadea 4 × 760 ms y
   se detiene. ¿Se escribe la frase de verdad o se quita el `<i>`?
2. **`is-scrolled`.** El plan lo justifica diciendo que «recupera altura en
   móvil». **Es falso**: bajo 900 px el header ya mide 66 px sin la clase, así
   que recupera **0 px en móvil** y 6 px en escritorio. Y de sus 5 bloques, 3
   están muertos o son no-op aun activando la clase. ¿Gesto de escritorio, o se
   borran las reglas y se cierra el limbo?
3. **El cursor personalizado.** 23 atributos `data-cursor` en 13 archivos y 15
   bloques de CSS esperando un componente que ninguna página monta. ¿Revivir o
   enterrar? (El plan lo ata a la fase 11.)
4. **El rótulo del FAB móvil** («Hablemos» vs. el «WhatsApp» de hoy) sigue
   bloqueado desde la fase 9 y la fase 10 no puede cerrar sin esa respuesta.

## Estado

- [x] Reconstruir y servir el build local a paridad con producción
- [x] Instrumento de medición de motion — **corregido y con reduced-motion**
- [x] Línea base de batería y de motion, normal y reducida
- [x] Mapa de los 8 frentes contra el código real (`FASE-10-MAPA.md`)
- [x] Tanda 1 · carrusel fuera de pantalla
- [x] Tanda 2 · tokens de movimiento
- [x] Tanda 3 · revelado real en portada, contacto, trabajos, productos, servicios
- [ ] Tanda 4 · movimiento de pasos del diagnóstico
- [ ] Tanda 5 · poda de keyframes guiada por navegador
- [ ] Preguntas al dueño respondidas (caret, `is-scrolled`, cursor, FAB)

## Respuestas del dueño (2-sep-2026)

Las cuatro preguntas que tenían trabada la fase quedaron contestadas. Se anotan
aquí porque la conversación en que se dieron no sobrevive a la sesión.

| frente | decisión | qué implica |
| --- | --- | --- |
| caret de `typing-line` | **quitar el `<i>`** | se borra el cursor y su keyframe `typing-cursor`; la línea queda como texto. Cero JS nuevo. |
| `is-scrolled` | **borrar las reglas** | se van los 5 bloques y el atributo. Los 6 px de escritorio no pagan la clase. Cierra el limbo. |
| cursor personalizado | **revivirlo** | *no* era la recomendación: se monta el componente y los 23 `data-cursor` de 13 archivos pasan a pintar. Es cambio visible en todo el escritorio. |
| rótulo del FAB móvil | **dejar «WhatsApp»** | no se unifica a «Hablemos». Nombrar el canal se considera información útil en móvil. Cierra el pendiente de la fase 9. |

Tres de las cuatro son poda; la del cursor es la única que **agrega** superficie
y es la que hay que medir con más cuidado: toca el escritorio entero, no una
sección.

## Alcance decidido para las tandas 4 y 5 (2-sep-2026)

| punto | decisión |
| --- | --- |
| tanda 4, movimiento | **movimiento completo**: la pregunta también entra animada, con `key` propia, no sólo las opciones. Es el máximo movimiento y el máximo riesgo: hay que revisar que el foco no se mueva bajo el lector de pantalla. |
| tanda 4, alto de la tarjeta | incluido en «completo»: la tarjeta encoge animada en vez de saltar 284 px. Se acepta que el suavizado de alto sólo corra bien en Chromium. |
| enlace «Ver los cuatro servicios» | **agrandarlo** a 44 px de área táctil con padding, sin cambiar cómo se ve el texto. Es el único criterio de la batería que hoy no da cero. |
| tanda 5, alcance | **poda limpia de los 11**: se borran los keyframes *y* las referencias que los invocan, conservando las declaraciones que sí pintan (`stroke-width`, `opacity`, `background`, `content`). El díptico de `/productos/` y `.product-flow-*` **no** se tocan. |
| despliegue | **un solo push al final**, con permiso pedido explícitamente: mapa + tandas + las cuatro decisiones, verificados con la batería completa. El commit `e9a8058` viaja en ese mismo push. |

## El mapa del hero volvió entero al teléfono (2-sep-2026)

El dueño reportó con captura que «el mapa conceptual antes estaba completo y
adaptado al celular, ahora está cortado». **No estaba cortado: estaba amputado, y
lo amputó la fase 9.**

`ff28c51` («Fase 9: el mapa se recorta en el telefono…», 1-sep, ya en producción)
agregó `display: none` a `.summary-group--platforms` y `.summary-group--products`
dentro del `@media (max-width: 900px)`. Quedaba el núcleo con su anillo, **un solo
cable de 20 px** (`.summary-group::before`) y la tarjeta de los cuatro servicios.
Eso es exactamente la captura.

La medición descartó la hipótesis obvia antes de tocar nada: en producción y en el
build, a 360/390/414/480/768, `scrollWidth == clientWidth`, `clip-path: none` y
**cero descendientes visibles fuera de la caja**. No había recorte geométrico que
descorrer; faltaban dos tercios del dibujo.

**Revertido**: se quitaron las dos palabras. Nada más — ni un color, ni un
keyframe, ni una línea de marcado. Las reglas que visten esos dos grupos ya
estaban escritas y volvieron a aplicar solas, como el propio comentario de la
fase 9 anticipaba («vuelven solas si se saca esta palabra»). El comentario se
reescribió en pasado y dice quién lo rechazó y cuándo.

| medida | fase 9 | ahora |
| --- | --- | --- |
| alto del mapa @390 | 333,4 px | **669 px** |
| módulos visibles | 1 de 3 | **3 de 3** |
| cables | 1 | **3** |
| desborde horizontal @360 | — | **0 elementos** |
| guardia CSS | — | **pasa, ninguna marca nueva** |

**Lo que este parche NO trae de vuelta, y hay que decirlo.** El SVG entero
(`.hero-summary-map__wires, .summary-flow`) está en `display: none` bajo 900 px
desde `ec969c0` (**28-jul-2026**) — dos anillos punteados, 18 trazas, 3 nodos, 18
paquetes de corriente y la barra «Te cotizamos / Lo construimos / Lo dejamos
andando». Eso es línea base, más de un mes anterior a la queja, no regresión.
Encender esa regla tal cual **deforma** el dibujo: el SVG lleva
`preserveAspectRatio="none"` sobre una caja sin `aspect-ratio`.

Si algún día se quiere, hay un número medido a favor: a 1440 el `getBBox` real es
`{x:148, y:106, w:424, h:308}` contra un `viewBox` de 720×560 — el dibujo usa el
**58,9% × 55,0%** del lienzo. Ajustando el `viewBox` al bbox, el mismo dibujo
entra **~1,7× más grande** en la misma caja. Fase aparte, con su propia medición.


## Tandas 4 y 5 y los cuatro frentes trabados (2-sep-2026)

Entraron las cinco tandas de parches, en este orden y por separado, con
`aplicar.mjs` (aborta el lote entero si un solo anclaje no calza):

| tanda | archivos | qué |
| --- | --- | --- |
| poda (18) | `globals.css` | los 11 keyframes muertos **y sus referencias** |
| `is-scrolled` (5) | `globals.css` | fuera las reglas; el gesto de escritorio queda |
| caret (3) | `TypingLine.tsx`, `globals.css` | fuera el `<i>` que parpadeaba 4 veces |
| toque (1) | `globals.css` | «Ver los cuatro servicios» de 13 a 45 px de alto |
| cursor (2) | `layout.tsx` | se monta `CustomCursor` |
| tanda 4 (4 + archivo) | `globals.css`, `DiagnosticoServicios.tsx` | el paso se mueve al cambiar |

### Lo que se midió, no lo que se leyó

- **Guardia:** 383/0/0/5/0/22. Pasa sin marcas nuevas y la línea base bajó de
  385 a 383 (los dos duplicados que `is-scrolled` se llevó). Re-fijada.
- **Batería, 9 anchos × 8 rutas:** idéntica a la línea base salvo `toque`, que
  pasa de **1 a 0**. `chico 18` sigue igual: son las declaraciones de
  `font-size` diferidas al dueño, que no se tocaron.
- **`is-scrolled`:** a 1440 la barra mide **72 px en reposo, 66 con el menú
  abierto y 72 al cerrar**. A 390 queda plana en 66, que es exactamente lo que
  decía el diagnóstico: en teléfono no recuperaba nada. El header ya no lleva
  la clase en ninguna parte.
- **Cursor:** montado a 1440 y a 390 en modo normal; **no se monta bajo
  `prefers-reduced-motion`** (el `matchMedia` del componente devuelve `null`).
  `z-index` del cursor 1000, el del «Saltar al contenido» **1001** — se subió a
  propósito, porque el rótulo del cursor podía tapar justo el ángulo donde
  aparece el salto al apretar Tab. No hay `cursor: none` en ninguna parte: el
  anillo se suma al puntero del sistema, no lo reemplaza.
- **Caret:** cero `typing-cursor` en la hoja y en el componente.

### La tanda 4 necesitó un instrumento nuevo

`mirar-motion.mjs` **nunca hace clic**, así que sobre el diagnóstico su criterio
de cierre pasaba en vacío: medía una pieza que nadie había usado. Se agregó
`herramientas/mirar-diagnostico.mjs`, que contesta los tres pasos y filma cada
uno a 40, 150, 400 y 900 ms.

Encontró un defecto real antes de que llegara a producción: **el recorte
funcionaba solo en la primera respuesta.** Los eventos de animación no se
despachan en el acto, se encolan hasta el próximo repintado, así que el orden
verdadero era: se cancela la animación vieja (evento encolado), el efecto nuevo
enciende `data-animando` y arranca la suya, y recién ahí llega el `cancel` de la
vieja y con el mismo `soltar` apaga el recorte de la que estaba corriendo.
Faltaba justo en el clic 3, que es el que **crece de 496 a 1146 px**. Se arregló
quitando los dos listeners en la limpieza, antes de cancelar.

Medido después, a 390 y en modo normal:

| clic | alto | recorte |
| --- | --- | --- |
| 1 | 800 → 653 → 628 | `clip` a los 40 y 150 ms, suelto a los 400 |
| 2 | 628 → 592 → 500 → 496 | ídem |
| 3 | 496 → 1108 → 1146 | ídem |

Foco en `h3.diagnostico__pregunta` en los tres. Rayas de la barra: 1, 2, 3.

**Bajo `prefers-reduced-motion`, en los 6 casos (2 anchos × 3 clics): `corriendo
0 · avanzando 0`,** y el alto salta de una vez sin recorrido. Esa mitad del
criterio de cierre ahora está medida *con la pieza en uso*, que es lo que
faltaba.

### Una cosa cambió respecto de la línea base, y no es un empeoramiento

Bajo `prefers-reduced-motion` el sitio ya no da 0 animaciones: da **4, en una
sola fila** (`/` a 390 px). Son `circuito2-pulso` y `circuito2-nodo` sobre
`--platforms` y `--products`, todas `paused`, con **duración 0,01 ms** y
atrapadas dentro de un retraso de 1600/3200 ms que nunca llegan a agotar.
`corriendo 0 · avanzando 0` sigue en pie: no se mueven un píxel.

Aparecieron porque **el mapa volvió**. Esos dos módulos estaban en
`display: none` bajo 900 px y no tenían animaciones que registrar. Hacer que el
contador vuelva a 0 significaría volver a esconder el mapa. Queda dicho como
efecto del arreglo que se pidió, no como deuda.

Y el mapa volvió **con sus efectos**: a 390 los tres módulos llevan las mismas
tres animaciones cada uno (`circuito2-pulso`, `circuito2-riel`,
`circuito2-nodo`). La poda solo se llevó la generación anterior, `circuito-*`,
que ya no referenciaba nadie.

### Las dos advertencias del control de calidad, resueltas

1. **Los 8 parches que rozan las zonas «intocables»** (el díptico de
   `/productos/` y `.product-flow-*`) borran reglas cuyo marcado no existe:
   `ad__costura`, `ad__mitad`, `ad__valor` y `product-flow-card` dan **cero
   apariciones en TS/TSX**. Tocan esas zonas por nombre, no por efecto.
2. **El cursor tiene 6 temas y 4 no los emite nadie.** `default` vive porque es
   el respaldo y `signal` se emite en 2 lugares (`app/page.tsx:891` y
   `app/productos/page.tsx:58`). `unificalo`, `citaly`, `leads` y `dark` quedan
   escritos en la hoja sin nadie que los pida. **Decisión del dueño**, no mía:
   se pueden podar, o dejarlos hasta que las páginas de producto los usen.

### Estado

- [x] Tanda 4 · movimiento de pasos del diagnóstico
- [x] Tanda 5 · poda de keyframes guiada por navegador
- [x] Preguntas al dueño respondidas (caret, `is-scrolled`, cursor, FAB)
- [ ] Un solo push a `main` con todo (el push **es** el despliegue)
