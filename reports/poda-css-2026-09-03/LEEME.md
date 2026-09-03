# Poda de CSS: veredicto

Cobertura: 3 corridas, 714 tomas, 12 rutas.
HTML construido leído: 13 archivos, 445 clases distintas en atributos class.

| veredicto | reglas |
|---|---|
| viva | 1352 |
| condenada | 811 |
| sospechosa | 71 |
| sin datos | 38 |

6 lotes en `lotes/`, de a 47, 45, 49, 47, 50, 23 clases.

## Bloques con reglas condenadas

No son bloques muertos enteros: es cuantas reglas de cada bloque cayeron sobre el total del bloque.

- `ad`: 51 de 105 reglas, 15 clases
- `trust-proof-card`: 33 de 48 reglas, 8 clases
- `product-flow-card`: 31 de 33 reglas, 9 clases
- `service-flow`: 29 de 31 reglas, 7 clases
- `problem-strip`: 25 de 44 reglas, 8 clases
- `product-visual`: 24 de 24 reglas, 9 clases
- `system-map-section`: 23 de 24 reglas, 5 clases
- `product-showcase`: 23 de 24 reglas, 6 clases
- `unify-node`: 23 de 23 reglas, 6 clases
- `case-window`: 21 de 25 reglas, 5 clases
- `featured-case`: 19 de 26 reglas, 8 clases
- `hero-product-chip`: 18 de 18 reglas, 4 clases
- `problem-card`: 17 de 17 reglas, 4 clases
- `system-diagram`: 16 de 16 reglas, 8 clases
- `positioning-section`: 14 de 18 reglas, 4 clases
- `connection-card`: 13 de 16 reglas, 2 clases
- `process-step`: 13 de 14 reglas, 1 clases
- `sync-map`: 13 de 13 reglas, 8 clases
- `product-mini-mark`: 13 de 14 reglas, 6 clases
- `concept-card`: 12 de 24 reglas, 4 clases
- `operational-field`: 12 de 12 reglas, 4 clases
- `conversation-card`: 12 de 12 reglas, 3 clases
- `services-problem-router`: 11 de 15 reglas, 5 clases
- `service-applied-example`: 11 de 11 reglas, 5 clases
- `capability-graphic`: 11 de 11 reglas, 7 clases
- `service-responsibility-grid`: 10 de 10 reglas, 1 clases
- `client-rail`: 10 de 10 reglas, 3 clases
- `ecosystem-lab`: 10 de 24 reglas, 3 clases
- `product-flow-panel`: 10 de 10 reglas, 2 clases
- `product-flow-node`: 10 de 10 reglas, 3 clases
- `unify-hub`: 10 de 10 reglas, 2 clases
- `hero-readout`: 9 de 9 reglas, 3 clases
- `lead-flow`: 9 de 9 reglas, 2 clases
- `citaly-brand-card`: 9 de 9 reglas, 7 clases
- `next-service`: 9 de 9 reglas, 1 clases
- `services-case-grid`: 8 de 8 reglas, 4 clases
- `product-flow-output`: 8 de 8 reglas, 3 clases
- `unify-core`: 8 de 8 reglas, 1 clases
- `services-matrix`: 7 de 7 reglas, 1 clases
- `service-deliverables`: 7 de 7 reglas, 2 clases

## Sospechosas: nadie las vio, pero su marcado existe

Se revisan a mano. No entran en ningún lote.

- línea 43 `hr`
- línea 68 `code, kbd, samp, pre`
- línea 80 `sub, sup`
- línea 87 `sub`
- línea 90 `sup`
- línea 93 `table`
- línea 126 `:-moz-focusring`
- línea 129 `:-moz-ui-invalid`
- línea 132 `progress`
- línea 135 `::-webkit-inner-spin-button, ::-webkit-outer-spin-button`
- línea 143 `::-webkit-search-decoration`
- línea 146 `::-webkit-file-upload-button`
- línea 168 `fieldset`
- línea 182 `dialog`
- línea 197 `:disabled`
- línea 1069 `.custom-cursor.theme-citaly`
- línea 1073 `.custom-cursor.theme-leads`
- línea 1077 `.custom-cursor.theme-dark`
- línea 1082 `.custom-cursor.theme-dark span`
- línea 1429 `.summary-wire--thin`
- línea 1449 `.summary-wire--flow, .summary-node--flow`
- línea 1454 `.summary-wire--flow`
- línea 1820 `.concept-card--product`
- línea 1848 `.concept-card--product .hero-logo`
- línea 1865 `.concept-card--ai, .concept-card--magnet`
- línea 1870 `.connection-card--wa, .connection-card--shopify, .connection-card--stock, .connection-card`
- línea 1877 `.connection-card--bsale`
- línea 1881 `.connection-card--meli, .connection-card--price, .connection-card--dte`
- línea 1887 `.concept-card--citaly`
- línea 1891 `.concept-card--unificalo`
- línea 1895 `.concept-card--leads`
- línea 1990 `.concept-card--product` en @media (max-width: 900px)
- línea 2014 `.concept-card--product .hero-logo` en @media (max-width: 900px)
- línea 2045 `.concept-card, .concept-card--product` en @media (max-width: 620px)
- línea 2064 `.concept-card .hero-logo, .concept-card--product .hero-logo` en @media (max-width: 620px)
- línea 2644 `.service-flow--soluciones-ia-medida`
- línea 3088 `.service-faq-list summary::-webkit-details-marker`
- línea 3935 `.trust-proof-card`
- línea 3946 `.trust-proof-card:first-child`
- línea 4020 `.trust-proof-card h3`
- línea 4028 `.trust-proof-card strong`
- línea 4037 `.trust-proof-card p`
- línea 4297 `.featured-case__more`
- línea 4304 `.featured-case__more article`
- línea 4325 `.featured-case__more span`
- línea 4334 `.featured-case__more strong`
- línea 4343 `.featured-case__more p`
- línea 4354 `.case-window`
- línea 4367 `.case-window::before`
- línea 4378 `.case-window::after`
- línea 4553 `.ecosystem-lab__heading h2 span`
- línea 4558 `.ecosystem-lab__heading p`
- línea 6179 `.hero-logo text`
- línea 6188 `.hero-logo--bsale text, .hero-logo--meli text, .hero-logo--citaly text`
- línea 6196 `.hero-logo--meli text`
- línea 7524 `.mobile-nav-shell > summary::-webkit-details-marker` en @media (max-width: 900px)
- línea 8276 `.ecosystem-lab__heading p` en @media (max-width: 620px)
- línea 8859 `.trust-proof-card:first-child` en @media (max-width: 900px)
- línea 8931 `.trust-proof-card` en @media (max-width: 620px)
- línea 9105 `.case-window` en @media (max-width: 900px)

## Ejecutado el 3-sep-2026

Los seis lotes se aplicaron en cadena. Cada uno parte de una copia prístina de
`globals.css` y aplica la unión acumulada de los lotes 1..N (el podador casa por
número de línea exacto, así que aplicar un lote desplazaría los siguientes).
Cada paso se construyó de verdad y se comparó contra la huella del sitio
prístino, servido aparte desde una copia congelada del build.

| | antes | después |
|---|---|---|
| reglas | 2.272 | 1.461 |
| fuente | 483.545 B / 18.238 líneas | 375.084 B / 13.628 líneas |
| CSS construido | 254.802 B | 169.787 B (−33 %) |

Los seis lotes: **36 páginas (12 rutas × 3 anchos), 0 distintas**. Las 71 reglas
sospechosas y las 38 sin datos quedaron intactas.

### Lo que la compuerta tuvo mal, y cómo se supo

Nada de esto habría salido comparando la herramienta consigo misma: salió de
correrla dos veces sobre el mismo sitio sin tocar nada.

1. **El orden de las propiedades personalizadas no es estable entre procesos de
   Chrome.** Dos corridas del sitio intacto daban hashes distintos en el 85 % de
   los elementos; los 534 valores eran idénticos y solo cambiaba el orden a
   partir del índice 483. Se ordena antes de resumir.
2. **Pausar las animaciones en `currentTime 0` las rebobinaba.**
   `revela-entrada` arranca en `translateY(16px)` con relleno `backwards`: si ya
   había terminado, Chrome la había descartado y el elemento estaba en su sitio;
   si acababa de dispararse, la sonda lo devolvía 16 px abajo. Dos corridas del
   mismo build diferían en lo revelado al final del recorrido. Ahora se terminan
   las finitas y solo se pausan en 0 las infinitas.
3. **La huella no medía `html` ni `body`.** Una regla podada que solo tocara el
   fondo o el tipo de la página no la habría visto nadie. Ahora entran los dos.
4. **Comparar las capturas por bytes no prueba nada.** El mismo build servido
   dos veces da 19 de 36 PNG distintos sin que ni un elemento cambie de caja ni
   de estilo. La prueba la da la huella; los PNG sirven para mirar.

### Lo que esta compuerta sigue sin ver

Mide el **estado asentado**. Una regla que solo cambie un cuadro intermedio de
una animación pasaría sin que la huella lo note. No afecta a esta poda, porque
una regla que el navegador llegó a aplicar en alguno de los estados medidos no
se condena, pero conviene tenerlo presente si se reusa la herramienta.
