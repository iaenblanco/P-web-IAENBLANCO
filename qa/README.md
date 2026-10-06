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
de uso o de entorno. Tarda cerca de 30 s `sanity` y 90 s `contrast`.

Contra producción: copiar la spec fuera del repo, cambiar `"dist": "../out"`
por `"url": "https://iaenblanco.com"`, quitar `"spa"` y correr igual. La copia
no se guarda acá.

## Qué cubre

| | |
|---|---|
| Rutas | `/`, `/servicios/`, `/contacto/` |
| Viewports | escritorio 1440x900, móvil 390x844 |
| Estados | `base`; `menu-movil` (móvil, en `/` y `/servicios/`); `aviso-rechazado` (en `/`, para medir el pie sin el aviso de cookies encima) |
| Fuentes requeridas | Instrument Sans (principal), IBM Plex Mono (mono) |
| Contraste | todo texto de `#contenido`, `.site-header`, `.site-footer` y `.consent-banner`; sin exclusiones; 4.5 normal, 3 grande |
| Sanidad | overflow, fuera de viewport, tres solapes declarados, errores JS, recursos fallidos |
| Terceros bloqueados | `static.cloudflareinsights.com`, `cloudflareinsights.com`, `www.googletagmanager.com` |

Sin cubrir: `/productos/`, `/trabajos/`, `/servicios/[slug]/`, `/privacidad/`,
`/terminos/`, hover, focus, los desplegables de escritorio y el envío del
formulario.

## Línea base

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
