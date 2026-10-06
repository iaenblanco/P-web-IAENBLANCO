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

6 de octubre de 2026, commit `aef9e15`, motor central `b55efe9`. Medida en el
preview de Cloudflare de la rama `fix/mobile-consent-whatsapp-overlap`
(deployment `3d383e0d`).

| Check | Resultado | Detalle |
|---|---|---|
| `contrast` | pasa (código 0) | 716 textos medidos, 716 pasan, 0 incumplen, 50 indeterminados |
| `sanity` | pasa (código 0) | 10 de 10 combinaciones |
| Fuentes | pasa | las dos requeridas aplicadas en todas las combinaciones |
| Overflow, fuera de viewport, solapes, errores JS, recursos | pasa | 0 en todo |

Sin fallos conocidos y sin excepciones declaradas en la spec.

El solape del botón de WhatsApp con el aviso de cookies en móvil, que tenía
`sanity` en código 1 hasta `203e54f`, ya no existe: bajo 768px el botón se
retira mientras el aviso está abierto y, bajo 900px, mientras el menú móvil
está abierto; vuelve solo cuando se cierran. De 768px para arriba sigue
subiéndose sobre el aviso. Las dos reglas dependen de CSS `:has()`
(`app/globals.css`, bloque de estados móviles); no hay fallback para
navegadores que no lo implementan.

Indeterminados (sin medición, no cuentan como que pasan):

- 32 son rótulos `<text>` de SVG del inicio (`circuito__*`, `ficha__*`): el
  motor no llega a aislar sus glifos.
- 18 son la última franja del pie (razón social, dirección, Privacidad,
  Términos) tapada por el aviso de cookies en `base`. En `aviso-rechazado` se
  miden y pasan.

Avisos esperados: en `aviso-rechazado`, `.consent-banner` ya no existe y los dos
solapes que lo nombran salen como selector sin coincidencias.

Local y producción hoy no son el mismo código: producción sirve `94c1e5e`
(`main`), anterior a `aef9e15`. La línea base de arriba es de la rama, medida
en su preview; no describe producción hasta que la rama se mezcle en `main` y
se despliegue.

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
