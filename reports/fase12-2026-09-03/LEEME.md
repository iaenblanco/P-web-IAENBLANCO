# Fase 12 — QA del sitio, 3-sep-2026

Todo lo de aquí está medido sobre el **sitio construido y servido**
(`npm run build` + `herramientas/servir.mjs out 3210`), nunca sobre el código
fuente ni sobre `next dev`. Commit medido: `454c21c`.

## Lo que pasa

| batería | alcance | resultado |
|---|---|---|
| `verificar.mjs` (12 criterios) | 12 rutas × 9 anchos = 108 cargas | 9 criterios en 0; 3 con deuda vieja (abajo) |
| `revisar-html.mjs` (15 criterios) | 12 páginas construidas | **0 fallas**, 5 avisos de texto |
| `huella-css.mjs` | 12 rutas × 9 anchos, podado contra prístino | **108 páginas, 0 distintas** |
| `guardia-css.mjs` | `globals.css` | pasa, línea base refijada |

La batería se corre partida en cinco tandas. No es capricho: las 108 cargas de
una vez mueren con `timeout Runtime.evaluate`, reproducido 3 de 3 el 30-ago.

## Deuda que ya estaba, y la prueba de que ya estaba

Las tres cifras que no son cero salen **idénticas** al correr la misma batería
contra el build prístino anterior a la poda (16 / 1 / 24 y 0 / 0 / 43). No las
trajo la poda de CSS: son de antes.

Todo se concentra en una sola pieza, la escena de agenda `esc__celda`, y en el
texto chico de dos secciones:

| ruta | ancho | qué |
|---|---|---|
| `/servicios/plataformas-software-medida/` | 390, 360 | `esc__celda` desborda su línea (6 casos cada uno) |
| `/servicios/plataformas-software-medida/` | 360 | además una celda queda encima de otra |
| `/servicios/plataformas-software-medida/` | 768, 620, 390, 360 | texto de 10 px en las cabeceras |
| `/servicios/automatizaciones/` | 768, 620, 390, 360 | texto de 10 px |
| `/productos/` | 768, 620 | texto de 10 px (6 casos) |
| `/servicios/` | 768 | texto de 10 px |

Nada de esto aparece de 899 px para arriba. La escena se juzga en el celular,
así que el desborde de 360/390 es lo primero que hay que mirar.

Los 5 avisos de `revisar-html` son texto, no código, y quedan para Nico: tres
títulos sobre 60 caracteres (`/`, `/servicios/soluciones-ia-medida/`,
`/trabajos/`) y dos descripciones cortas (`/404.html`, `/terminos/`).

## Navegación y export

Medido sobre `out/` construido, sin navegador — el HTML ya dice la verdad:

- **0 enlaces internos rotos** en las 12 páginas.
- **0 rutas enlazadas sin barra final**: ninguna redirección 308 nace adentro
  del sitio. `redirectCount` es 0 por construcción, no por suerte.
- **0 páginas huérfanas**: las 11 se alcanzan desde `/` siguiendo enlaces.
- `aria-current="page"` aparece dos veces por página (menú de escritorio y
  móvil) y en las cinco rutas de nivel uno apunta al enlace correcto.
- El sitemap lista 11 URLs — las 12 páginas menos el 404 — todas con barra
  final. `out/404/` lo borra el postbuild; `out/404.html` queda.

## Movimiento: la poda no se llevó ninguna animación

Esto es lo que la huella NO puede ver, porque mide el estado asentado. Se
corrió `mirar-motion.mjs` en modo `ambos` a 1440 y 390, contra el build
podado y contra el prístino, y se compararon los nombres de animación vivos:

| | podado | prístino |
|---|---|---|
| nombres en modo normal | 44 | 43 |
| nombres en modo `reduce` | 2 | 2 |
| animaciones avanzando al pie de página | **0** | **0** |

**Ni un nombre del prístino falta en el podado.** La única diferencia va al
revés: el podado muestra además `revela-entrada`, la animación de entrada que
dispara el IntersectionObserver. Que esté o no en `getAnimations()` depende de
hace cuánto disparó el observer — es el mismo temblor que dio el falso
positivo de los 16 px, no un cambio del sitio.

Con `prefers-reduced-motion` sobreviven dos nombres, los dos en 0 ms de
duración: el modo reducido apaga el movimiento de verdad.

## Lo que esta fase NO cubrió

- **PageSpeed / Lighthouse**: no se corrió. Necesita clave de API o una pasada
  local que compite por la memoria de la máquina.
- **GTM Preview y Search Console**: dependen de Nico; nadie más tiene acceso.
- **Diff visual**: las capturas están en `D:/tmp/web-poda/cap-antes` y
  `cap-06`, pero **no compare los PNG por bytes**: el mismo build servido dos
  veces da 19 de 36 distintos. Sirven para mirar, no para juzgar. Lo que
  prueba que nada se movió es la huella.
- **Estados intermedios de animación**: la huella mide el estado asentado.

## Las trampas de esta sesión

Están documentadas donde importan, en la cabecera de `huella-css.mjs`. Dos que
no son del sitio sino del entorno, y que hicieron perder tiempo:

1. Con `MSYS_NO_PATHCONV=1` exportado, nadie traduce `/dev/null` a `NUL` y
   `curl -o /dev/null` sale 23 aunque el servidor conteste perfecto. El
   descarte hay que hacerlo con `> /dev/null`, que lo resuelve el shell.
2. Escribir un `.sh` desde Python puede dejar un CR de verdad dentro de las
   comillas. `tr -d '<CR>'` funciona igual que `tr -d '\r'`, así que no falla:
   simplemente deja de leerse. Verificar con `od -c`, no con la vista.
