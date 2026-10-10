# QA visual

Mide contraste y sanidad de iaenblanco.com con criterios numéricos. La spec es
`visual.spec.json`; el motor no vive en este repo, sino en
`tools/qa/visual` de `iaenblanco-agent-system` (su README explica cada clave y
el JSON de salida).

No reemplaza a `herramientas/`: esas baterías miran cosas propias del sitio.
Esto es el control común a todos los proyectos.

## Correrlo

Hace falta el repo central clonado y `npm ci` en su `tools/runtime`.

```
npm run build
node <central>/tools/qa/visual/bin/sanity.mjs   --spec qa/visual.spec.json
node <central>/tools/qa/visual/bin/contrast.mjs --spec qa/visual.spec.json
```

Sale a `qa/.salida/` (ignorada). Código 0 pasa, 1 incumple un criterio, 2 error
de uso o de entorno. Tarda cerca de 40 s `sanity` y 110 s `contrast`.

El tercer check del motor, `screenshots`, no se corre en local: compara contra
una línea base de capturas hecha en Linux y en otra plataforma sale con código
2 a propósito. Se mira en CI (ver "Diff visual").

Contra producción: copiar la spec fuera del repo, cambiar `"dist": "../out"`
por `"url": "https://iaenblanco.com"`, quitar `"spa"` y correr igual. La copia
no se guarda acá.

## En CI

Los pull requests internos (rama en este mismo repo) corren `npm run build` y,
contra `out/`, los tres checks del motor central fijado al commit `23c7c13`.
Son dos jobs de `.github/workflows/ci.yml`, y arrancan solo si
`tipos y guardia` pasa:

- `visual QA`: `sanity` y `contrast`. Es obligatorio para mergear.
- `visual diff`: `screenshots`, el piloto de "Diff visual". No es obligatorio.

Los PR de forks no corren ninguno de los dos. En `main` corren después del
merge: avisan, no frenan el despliegue.

Necesitan el secreto de Actions `IAENBLANCO_AGENT_SYSTEM_TOKEN`: lectura del
repo central, nada más. Si `visual QA` falla, los dos JSON quedan como artifact
del run. Subir el motor de versión es cambiar ese SHA, una sola vez para todos
los jobs, y volver a medir la línea base.

## Qué cubre

| | |
|---|---|
| Rutas | `/`, `/servicios/`, `/contacto/` |
| Viewports | escritorio 1440x900, móvil 390x844 |
| Estados | `base`; `menu-movil` (móvil, en `/` y `/servicios/`); `aviso-rechazado` (en las tres rutas, para medir el pie sin el aviso de cookies encima) |
| Fuentes requeridas | Instrument Sans (principal), IBM Plex Mono (mono) |
| Contraste | todo texto de `#contenido`, `.site-header`, `.site-footer` y `.consent-banner`; sin exclusiones; 4.5 normal, 3 grande |
| Sanidad | overflow, fuera de viewport, tres solapes declarados, errores JS, recursos fallidos |
| Capturas | las 14 combinaciones, a página completa, contra `qa/baseline/`; tolerancia 0 (piloto) |
| Terceros bloqueados | `static.cloudflareinsights.com`, `cloudflareinsights.com`, `www.googletagmanager.com` |

Sin cubrir: `/productos/`, `/trabajos/`, `/servicios/[slug]/`, `/privacidad/`,
`/terminos/`, hover, focus, los desplegables de escritorio y el envío del
formulario.

## Cómo leer los indeterminados

Un indeterminado es un texto que en ese estado no se pudo medir. No cuenta como
que pasa, y tampoco quiere decir que ese texto no se validó nunca: el motor
cuenta por estado, y un texto tapado en uno puede estar medido en otro.

El caso de este sitio es la última franja del pie. En `base` el aviso de
cookies la tapa y sale indeterminada; en `aviso-rechazado`, que es el escenario
donde se ve, se mide. Por eso la cobertura se lee por escenario visible: un
texto está cubierto si se mide en algún estado declarado de su misma ruta y
viewport. El indeterminado de `base` no se esconde: describe lo que pasa en ese
estado.

El JSON no trae ese cruce. Se hace a mano: cada entrada de
`textosIndeterminados` se busca en `mediciones` de los otros estados de la
misma ruta y viewport, por selector y texto. Lo que no puede quedar es un texto
visible sin medición en ningún estado.

## Diff visual (piloto)

El check `screenshots` saca una captura de página completa de cada una de las
14 combinaciones de "Qué cubre" y la compara píxel por píxel con la que está
guardada en `qa/baseline/`. Tolerancia cero: un solo píxel distinto es un
fallo.

Es un piloto. Corre en cada pull request interno y en `main` como job
`visual diff`, se ve en el PR y **no es obligatorio para mergear**: no está
entre los checks requeridos de la protección de `main`. La idea es mirarlo un
tiempo en corridas reales antes de decidir si se exige.

| Código | Qué pasó |
|---|---|
| 0 | Las 14 capturas son iguales a la línea base |
| 1 | Alguna difiere, cambió de tamaño o se pintó sin una fuente requerida |
| 2 | No se pudo comparar: falta `qa/baseline/`, el manifiesto no vale o es de otra plataforma |

Un rojo quiere decir que el sitio se ve distinto, no que esté mal. Si el cambio
es el que se buscaba, se actualiza la línea base de capturas (más abajo). Si
no, es una regresión.

Cuando falla, el run deja el artifact `visual-diff-<sha>` (14 días) con
`screenshots.json`, la salida de consola (`screenshots.log`) y, solo de las
capturas que difieren, tres imágenes en `screenshots/`:
`<captura>.baseline.png`, `<captura>.candidate.png` y `<captura>.diff.png`. El
diff es la línea base en gris aclarado con los píxeles distintos en rojo y un
marco magenta en cada zona. Cuando pasa no sube nada.

### La línea base de capturas

`qa/baseline/` son 14 PNG y `baseline.json`, que anota la plataforma, la
versión de Chrome y el tamaño de cada captura. Está en Git a propósito, sin
LFS: pesa 13,7 MB.

Solo vale hecha en Linux. El texto se pinta distinto en cada sistema, y la
herramienta rechaza con código 2 una línea base de otra plataforma. Por eso
`screenshots` no se corre en Windows, y por eso la línea base **nunca** se
genera en local.

La vigente: 10 de octubre de 2026, sobre el commit `6ecb2e2` (el sitio de
`896e83e` sin cambios visuales), motor `23c7c13`, imagen `ubuntu-24.04`
`20261004.327.1`, Chrome `154.0.8037.97`. Recién generada se comparó en el
mismo job, sobre el mismo build: 14 de 14, 0 píxeles.

### Actualizar la línea base de capturas

Cuando un cambio visual es intencional:

1. En GitHub: Actions > CI > Run workflow, elegir la rama del cambio y marcar
   "Generar la linea base de capturas". Es el job `linea base visual`.
2. El job genera las 14 capturas, las compara contra sí mismas (tiene que dar
   0 píxeles) y deja el artifact `linea-base-visual-<sha>`. Es todo o nada: si
   una captura sale sin una fuente requerida o la página no se queda quieta, no
   escribe ninguna.
3. Bajar el artifact, borrar `qa/baseline/` y descomprimirlo dentro de `qa/`.
   Trae `baseline/` y los dos informes del job en `.salida-ci/`, que Git
   ignora.
4. Commit de `qa/baseline/` en esa misma rama. Entra a `main` por pull request
   como cualquier cambio, y ahí `visual diff` tiene que dar verde.

El workflow no escribe en el repo ni abre pull requests: generar no cambia
nada hasta que alguien hace ese commit. Ningún check normal (pull request o
push) actualiza la línea base; `--update-baseline` aparece una sola vez en
`.github/workflows/ci.yml`, en el job manual.

### Lo que se sabe que la va a mover

- **El año del pie.** El pie pinta el año en curso
  (`components/Footer.tsx`). Al cambiar el año, las capturas que incluyen el
  pie dejan de coincidir y hay que actualizar la línea base a propósito. No hay
  máscaras: durante el piloto se acepta.
- **Chrome.** No está fijado: es el estable que trae la imagen del runner. Si
  cambia respecto del de la línea base, el check avisa (`AVISO` en la consola)
  y compara igual. Con la misma imagen y el mismo Chrome el ruido medido es 0
  píxeles; entre versiones de Chrome no está medido, y el piloto sirve para
  verlo.
- **La imagen del runner.** `visual diff` y `linea base visual` corren en
  `ubuntu-24.04` y no en `ubuntu-latest`: cambiar de imagen es cambiar de línea
  base.

## Línea base

La línea base describe el árbol funcional que se midió. Un commit posterior
que solo toca documentación no la invalida ni obliga a actualizar el SHA en
cada línea de esta sección.

9 de octubre de 2026, motor central `700c12a`, sobre el commit que agrega
este bloque (padre `1b9fbf7`). Medida en local contra `out/`.

Ese `700c12a` es el registro de con qué se midió. El motor vigente es
`23c7c13` (10 de octubre de 2026): agrega el check `screenshots` y no toca
`sanity` ni `contrast`. Con ese motor y el sitio sin tocar, la tabla sale
igual.

| Check | Resultado | Detalle |
|---|---|---|
| `contrast` | pasa (código 0) | 826 textos medidos, 826 pasan, 0 incumplen, 18 indeterminados |
| `sanity` | pasa (código 0) | 14 de 14 combinaciones |
| Fuentes | pasa | las dos requeridas aplicadas en todas las combinaciones; ninguna del sistema |
| Overflow, fuera de viewport, solapes, errores JS, recursos | pasa | 0 en todo |

Sin fallos conocidos y sin excepciones declaradas en la spec.

Qué cambió contra la anterior (716 medidos, 50 indeterminados, 10
combinaciones):

- Los 32 rótulos `<text>` de SVG del inicio se miden y pasan: el motor ya aísla
  sus glifos. Con el motor nuevo y el sitio sin tocar, las 716 mediciones que
  ya había salieron iguales.
- `aviso-rechazado` corre en las tres rutas y no solo en `/`: cuatro
  combinaciones más, 80 mediciones del pie.
- Las dos flechas de la tira del héroe eran el carácter `→`, que IBM Plex Mono
  no trae: lo pintaba la fuente que tuviera el sistema (Arial en Windows, una
  serif en Linux), y en Linux una de las dos no llegaba al mínimo de píxeles
  para medirse. Ahora son un SVG y dejaron de ser texto: dos mediciones menos.

Indeterminados: 18, todos en `base`. Son la última franja del pie (razón
social, dirección, Privacidad, Términos) tapada por el aviso de cookies, en las
tres rutas. Los 18 se miden y pasan en `aviso-rechazado` de su misma ruta y
viewport: no queda ningún texto visible sin medición.

Avisos esperados: en `aviso-rechazado`, `.consent-banner` ya no existe y los dos
solapes que lo nombran salen como selector sin coincidencias. Son 12, dos por
cada una de las seis combinaciones de ese estado.

## Línea base anterior

Queda como registro: es la medición con la que se comparó la de arriba.

6 de octubre de 2026, commit `9551ac8`, motor central `b55efe9`. Medida en el
preview de Cloudflare de la rama `fix/whatsapp-visibility-policy`
(deployment `ac0df7c6`).

| Check | Resultado | Detalle |
|---|---|---|
| `contrast` | pasa (código 0) | 716 textos medidos, 716 pasan, 0 incumplen, 50 indeterminados |
| `sanity` | pasa (código 0) | 10 de 10 combinaciones |
| Fuentes | pasa | las dos requeridas aplicadas en todas las combinaciones |
| Overflow, fuera de viewport, solapes, errores JS, recursos | pasa | 0 en todo |

Sin fallos conocidos y sin excepciones declaradas en la spec.

El solape del botón de WhatsApp con el aviso de cookies en móvil, que tenía
`sanity` en código 1 hasta `203e54f`, ya no existe: el botón se retira según
la política descrita en "Botón flotante de WhatsApp: cuándo se ve". El aviso
ya no depende de CSS `:has()`; solo la regla del menú móvil lo usa, sin
fallback para navegadores que no lo implementan.

Indeterminados (sin medición, no cuentan como que pasan):

- 32 son rótulos `<text>` de SVG del inicio (`circuito__*`, `ficha__*`): el
  motor no llega a aislar sus glifos.
- 18 son la última franja del pie (razón social, dirección, Privacidad,
  Términos) tapada por el aviso de cookies en `base`. En `aviso-rechazado` se
  miden y pasan.

Avisos esperados: en `aviso-rechazado`, `.consent-banner` ya no existe y los dos
solapes que lo nombran salen como selector sin coincidencias.

Local y producción son el mismo código desde el 6 de octubre de 2026:
producción sirve `fb38bde` (`main`, deployment `4fbfb95b`), el merge de la rama
de la línea base, con el mismo árbol que `5f1fb16`. La línea base de arriba se
midió en el preview de la rama y se repitió contra `https://iaenblanco.com`
con el mismo resultado: `contrast` 716 / 716 / 0 / 50 y `sanity` 10 de 10.

Diferencias de entorno entre local y producción, aparte del código:

- Producción pide `static.cloudflareinsights.com/beacon.min.js` (lo inyecta
  Cloudflare; no está en el repo). Queda bloqueado, una vez por carga. En local
  no se pide.
- Producción reescribe los correos con la protección de Cloudflare
  (`/cdn-cgi/l/email-protection`). No cambió ninguna medición.
- Producción manda una CSP en modo report-only (`public/_headers`); el servidor
  local del QA no manda cabeceras. Ninguna violación en producción.

Google Tag Manager no se pidió en ninguna corrida: solo carga con el
consentimiento aceptado y el QA no lo acepta.

## Botón flotante de WhatsApp: cuándo se ve

En producción desde `fb38bde`; viene de la rama
`fix/whatsapp-visibility-policy`, la misma de la línea base de arriba.
Cambia lo que el QA va a encontrar en pantalla, así que conviene saberlo antes
de leer una captura. En corto, el botón se retira cuando:

- el aviso de cookies no está resuelto o está abierto, en móvil;
- el menú móvil está abierto;
- hay un CTA prioritario marcado a la vista;
- el pie está a la vista.

El botón es un CTA secundario. Se ve solo si no hay ninguna razón para
retirarlo, y las razones son estados con nombre, no medidas:

| Razón | Dónde se publica | Rige |
| --- | --- | --- |
| Todavía no se sabe si hay que mostrar el aviso | `<html>` sin `data-aviso` | bajo 768px |
| El aviso de cookies está abierto | `<html data-aviso="abierto">` | bajo 768px |
| El menú móvil está abierto | `<details class="mobile-nav-shell" open>` | hasta 900px |
| Hay una zona de CTA principal a la vista | botón con `data-zona="cta"` | hasta 900px |
| Aún no se sabe qué zona hay a la vista | botón con `data-zona="pendiente"` | hasta 900px |
| El pie está a la vista | botón con `data-zona="pie"` | siempre |

- Una zona de CTA principal es cualquier elemento con el atributo
  `data-zona-cta`. Hoy son dos: los botones del héroe de la portada y las
  tarjetas de WhatsApp y correo de `/contacto/`. Si una página nueva tiene un
  CTA que el botón tapa, se marca su contenedor; no se mueve el botón.
- En el teléfono el botón **no** aparece en la primera pantalla de `/` ni de
  `/contacto/`: es lo esperado, no un fallo. Aparece al pasar la zona marcada.
- `data-aviso` lo escribe `ConsentBanner` (el único que lee el storage) y
  `data-zona` lo escribe `BotonWhatsapp` con un solo `IntersectionObserver`.
- Sin JavaScript no hay aviso ni observador: el botón se ve siempre. Las reglas
  que lo retiran al cargar cuelgan de `html.con-js`.
- De 768px para arriba el botón sigue subiéndose sobre el aviso; en escritorio
  solo lo retira el pie, igual que antes.
- El aviso ya no depende de `:has()`; el menú móvil sí.
