# Medición de iaenblanco.com: GTM, GA4 y Meta

Este documento describe lo que el sitio **emite de verdad**, no lo que se pensaba emitir.
Cada nombre de aquí está copiado del código; si un nombre no aparece en esta lista, el
sitio no lo manda.

- Dominio medido: `https://iaenblanco.com`
- Contenedor GTM: `GTM-5MNF9G4Z` (`app/layout.tsx`, variable `NEXT_PUBLIC_GTM_ID`)
- Toda la medición propia vive en **un solo lugar**: el script en línea de
  `app/layout.tsx`, que escucha en `document` y empuja a `window.dataLayer`.
- Última revisión contra el código: **1 de septiembre de 2026**, fase 8 del plan de
  clase mundial (`herramientas/PLAN-CLASE-MUNDIAL.md`).

---

## 1. Cómo llega un evento al contenedor

Hay tres caminos, y conviene tenerlos claros porque explican por qué algunos eventos
llevan campos que otros no:

1. **Clic en un `<a href>`.** Un solo escucha delegado en `document` mira cada clic,
   busca el enlace más cercano y decide el nombre del evento. Primero respeta el atributo
   `data-analytics-event` si el enlace lo trae; si no, deduce por el destino (WhatsApp,
   `/servicios/`, un producto del catálogo, `/contacto`). **Los `<button>` no pasan por
   aquí**: este escucha solo mira enlaces.
2. **Un evento del navegador.** `focusin` sobre un campo dentro de un `<form>`, `toggle`
   sobre un `<details data-service-faq>`, y la carga de una página bajo `/servicios/`.
3. **Un `CustomEvent` `iaenblanco:*` que dispara un componente de React.** Es el puente
   para todo lo que el DOM no permite ver desde fuera: si el formulario era válido, en
   qué paso va el diagnóstico, qué sección se vio. El componente **solo avisa**; el objeto
   de la capa de datos lo arma siempre `app/layout.tsx`, para que un mismo evento no
   llegue con dos formas distintas según quién lo mandó.

### Consentimiento

`components/GoogleTagManager.tsx` no inyecta el contenedor hasta que se cumplen **tres**
condiciones:

- el visitante aceptó (`localStorage['iaenblanco.consent.v1'] === 'granted'`),
- el `hostname` es `iaenblanco.com` o `www.iaenblanco.com`,
- el id empieza con `GTM-`.

Consecuencias prácticas, las dos importantes:

- **En una preview de Cloudflare Pages (`*.pages.dev`) y en local, GTM nunca carga.**
  Cualquier prueba de disparadores y etiquetas hay que hacerla contra el dominio real.
- **La capa de datos sí se llena antes del consentimiento.** El script de medición corre
  siempre en producción; lo que espera al consentimiento es el contenedor. Nadie manda un
  solo dato a un tercero sin aceptación, pero si alguien acepta a mitad de la visita, GTM
  procesa al cargar la cola que ya estaba escrita. Es la razón por la que un `generate_lead`
  puede aparecer con eventos anteriores de la misma sesión.

---

## 2. Los eventos que el sitio emite

Veinte nombres. La columna «de dónde sale» dice qué línea del código lo produce.

| Evento | Qué significa | De dónde sale |
| --- | --- | --- |
| `cta_whatsapp_click` | Clic en cualquier enlace a `wa.me` **fuera** de `/servicios/` | deducido por destino |
| `service_whatsapp_click` | Clic en `wa.me` **dentro** de `/servicios/` | deducido por destino + `data-analytics-event` en 5 enlaces |
| `floating_whatsapp_click` | Clic en el botón flotante que acompaña las once rutas | `data-analytics-event` |
| `service_click` | Clic hacia una página de servicio | deducido por destino |
| `product_click` | Clic hacia un producto del catálogo | deducido por destino |
| `contact_click` | Clic hacia `/contacto` o a un `mailto:` | deducido por destino |
| `client_logo_click` | Clic en un logo de cliente de la vitrina | `data-analytics-event` |
| `service_cta_click` | Clic en el botón principal de una página de servicio | `data-analytics-event` |
| `service_case_click` | Clic en una tarjeta de trabajo | `data-analytics-event` |
| `service_skip_click` | Clic en el atajo que salta el diagnóstico | `data-analytics-event` |
| `rampa_revision_click` | Clic en «pedir una revisión» de la rampa | `data-analytics-event` |
| `rampa_sin_sitio_click` | Clic en la salida de la rampa para quien no tiene sitio | `data-analytics-event` |
| `service_view` | Se cargó una página `/servicios/…` | al cargar, por ruta |
| `service_faq_open` | Se abrió una pregunta frecuente de un servicio | evento `toggle` |
| `section_view` | Una sección marcada se vio de verdad | `iaenblanco:section_view` |
| `form_start` | Alguien puso el cursor por primera vez en el formulario | evento `focusin` |
| `form_submit` | Se apretó Enviar **y el formulario estaba completo** | `iaenblanco:form_submit` |
| `generate_lead` | WhatsApp se abrió con el mensaje escrito | `iaenblanco:generate_lead` |
| `form_error` | El envío no salió | `iaenblanco:form_error` |
| `diagnostico_step` | Se contestó un paso del diagnóstico de servicios | `iaenblanco:diagnostico_paso` |

### Cuatro trampas de nombres

1. **`diagnostico_paso` no es un evento de la capa de datos.** Es el nombre del
   `CustomEvent` interno. Lo que llega al contenedor se llama **`diagnostico_step`**. Un
   disparador escrito sobre `diagnostico_paso` no calza nunca y no da error: simplemente
   no dispara. Lo mismo con los campos: el componente manda `paso_id`, `paso_numero`,
   `respuesta` y `completado`, y el despachador los renombra a `step_id`, `step_number`,
   `answer` y `diagnostico_completado`. **Los nombres válidos en GTM son los segundos.**
2. **`case_click` no existe.** La versión anterior de este documento lo declaraba. El
   código lo tuvo y no podía dispararse nunca; se borró, con el motivo escrito en
   `app/layout.tsx`. El clic en una tarjeta de trabajo llega como `service_case_click`.
3. **`service_whatsapp_click` llega por dos vías** —el atributo explícito y la deducción
   por destino— y es a propósito: da igual cuál gane, el nombre es el mismo.
4. **Todos los campos se empujan siempre**, vacíos cuando no aplican. En GTM hay que leer
   la cadena vacía como «no aplica», no como un dato perdido.

---

## 3. Campos de la capa de datos

Variables «Variable de capa de datos» a crear en GTM. Versión 2, sin valor
predeterminado salvo donde se diga.

**En los doce eventos de clic:**

`cta_text`, `link_text`, `link_url`, `destination`, `page_path`, `section`, `service_id`,
`service_name`, `source_service_id`, `source_service_name`, `target_service_id`,
`target_service_name`, `product_id`, `product_name`, `case_name`, `entry_problem`,
`whatsapp_origin`, `device_type`, `traffic_source_raw`.

**En el resto:**

| Evento | Campos propios |
| --- | --- |
| `service_view` | `service_id`, `service_name` |
| `service_faq_open` | `service_id`, `service_name`, `faq_question`, `section` |
| `section_view` | `section`, `section_name` |
| `form_start` · `form_submit` · `generate_lead` | `form_name`, `section` |
| `form_error` | `form_name`, `section`, `error_type` |
| `diagnostico_step` | `step_id`, `step_number`, `answer`, `entry_problem`, `diagnostico_completado` |

Los tres que van en todos: `page_path`, `device_type` (`mobile` / `tablet` / `desktop`,
por ancho) y `traffic_source_raw` (el `document.referrer`, crudo).

### Valores que conviene conocer de antemano

- `whatsapp_origin`: `portada`, `cabecera`, `menu`, `productos`, `contacto`, `banda`,
  `pie`, `pie-datos`, `flotante`. Solo lo llevan los nueve botones generales de WhatsApp;
  los demás enlaces a `wa.me` del sitio llegan con el campo vacío. El texto que el visitante
  encuentra escrito en WhatsApp también nombra el origen (`lib/site.ts`, `MENSAJES_WHATSAPP`).
- `section_name`: `trust-proof`, `repisa-servicios`, `repisa-productos`, `objeciones`,
  `rampa` (portada) y `ficha-leads` (`/productos`). Se cuenta una sola vez por carga y solo
  cuando se ve de verdad: media sección a la vista, o media pantalla ocupada por ella.
- `error_type`: `missing_required_fields` (faltaban nombre o situación) o `popup_blocked`
  (el navegador no dejó abrir WhatsApp). Cualquier otro valor sería un error nuevo sin
  nombrar y llegaría como `unknown_error`.
- `diagnostico_completado`: `si` o `no`.
- `form_name`: hoy siempre resuelve a la sección que contiene el único formulario del
  sitio, porque ese `<form>` no tiene `name` ni `id`.

---

## 4. Disparadores

Todos «Evento personalizado», con el nombre exacto de la tabla de la sección 2, sin
expresiones regulares.

Mínimos para que la medición sirva de algo:

1. `generate_lead`
2. `form_submit`
3. `form_error`
4. `form_start`
5. `cta_whatsapp_click`
6. `service_whatsapp_click`
7. `floating_whatsapp_click`
8. `section_view`
9. `diagnostico_step`

Útiles después, cuando haya volumen: `service_view`, `service_click`, `product_click`,
`contact_click`, `service_faq_open`, `service_cta_click`, `service_case_click`,
`service_skip_click`, `client_logo_click`, `rampa_revision_click`, `rampa_sin_sitio_click`.

---

## 5. Etiquetas GA4

Una etiqueta «GA4 Event» por disparador, con el mismo nombre de evento y los campos de la
sección 3 como parámetros. Sin duplicar: **un evento del sitio, una etiqueta**.

El id de medición de GA4 **no está en el código** —vive dentro del contenedor, que es
justo lo que permite no cargar nada sin consentimiento—. Antes de configurar nada hay que
leerlo en la propia cuenta de GA4 y dejarlo escrito en una variable constante de GTM. La
versión anterior de este documento traía el marcador `G-XXXXXXXXXX`, que no configura nada.

---

## 6. Conversiones

Solo dos cosas de este sitio son una conversión. Marcar de más es la forma más rápida de
no poder responder si el sitio sirve.

| Evento | Por qué | Cómo se marca |
| --- | --- | --- |
| `generate_lead` | WhatsApp se abrió con el mensaje escrito: es lo más cerca de un contacto real que el sitio puede saber | Evento clave en GA4 |
| `diagnostico_step` con `diagnostico_completado = si` | Alguien recorrió el diagnóstico entero y llegó a una recomendación | Evento clave en GA4, condicionado por el campo |

Lo que **no** es conversión, y hay que dejarlo escrito porque la tentación vuelve:

- `form_submit` es el paso anterior. Marcarlo como conversión cuenta dos veces a la misma
  persona, y además cuenta a quien no llegó a abrir WhatsApp.
- Los clics de WhatsApp (`cta_whatsapp_click` y sus hermanos) son micro-conversiones: dicen
  que alguien salió del sitio hacia WhatsApp, no que haya escrito. Sirven para comparar qué
  botón trae gente —para eso está `whatsapp_origin`—, no para contar clientes.
- `section_view` mide lectura, nunca intención.

---

## 7. Meta

Cuatro eventos, todos desde GTM, ninguno desde el código del sitio (no hay un solo `fbq(`
en el repositorio, y así debe seguir):

| Disparador del sitio | Evento de Meta |
| --- | --- |
| `generate_lead` | `Lead` |
| `cta_whatsapp_click` · `service_whatsapp_click` · `floating_whatsapp_click` | `Contact` |
| `service_view` | `ViewContent` |
| `diagnostico_step` con `diagnostico_completado = si` | `CompleteRegistration` |

El id del píxel, igual que el de GA4, se lee en la cuenta de Meta y se guarda en una
variable constante de GTM. No se escribe en el código.

---

## 8. Lo que falta, y por qué no lo puede cerrar el código

Estas tres cosas necesitan las consolas de Google y de Meta. No hay forma de hacerlas
desde el repositorio, y hasta que se hagan la medición está preparada, no funcionando.

1. **Validar de punta a punta en producción.** Abrir `https://iaenblanco.com` (el dominio
   real, no una preview), aceptar la medición, y con Vista Previa de GTM comprobar en una
   sola pasada: que se pida `gtm.js?id=GTM-5MNF9G4Z`; que llenar el formulario y enviarlo
   deje `form_start`, `form_submit` y `generate_lead`, en ese orden y una vez cada uno; que
   enviarlo incompleto deje `form_error` con `error_type = missing_required_fields` **y
   ningún `form_submit`**; que bajar la portada deje los cinco `section_view`; y que en
   DebugView de GA4 aparezca lo mismo. Si algún evento de la sección 2 no aparece nunca en
   una semana de tráfico, sobra en este documento.
2. **Escribir los dos identificadores** (GA4 y Meta) en variables constantes de GTM.
3. **Medir cuánta gente se pierde por el consentimiento.** Comparar, para el mismo período,
   las visitas de Cloudflare Pages Analytics —que cuenta en el borde, sin cookies ni
   consentimiento— contra las sesiones de GA4. La diferencia es el precio de la postura de
   privacidad del sitio. **No se cambia la postura por lo que dé este número**; se mide para
   saber por cuánto hay que multiplicar lo que GA4 muestra.

---

## 9. Dónde tocar cada cosa

| Quiero cambiar | Archivo |
| --- | --- |
| Cómo se arma cualquier evento | `app/layout.tsx` (el script en línea) |
| Qué mide el formulario | `components/ContactForm.tsx` |
| Qué secciones se cuentan | el atributo `data-section-view` donde toque, y `components/VistaSecciones.tsx` |
| El diagnóstico | `components/DiagnosticoServicios.tsx` |
| El consentimiento | `components/ConsentBanner.tsx` y `components/GoogleTagManager.tsx` |
| Los mensajes de WhatsApp por origen | `lib/site.ts`, `MENSAJES_WHATSAPP` |

Un evento nuevo se agrega en el archivo que corresponda **y en la tabla de la sección 2**.
Un documento de medición que no coincide con el código es peor que no tenerlo: hace perder
la tarde configurando disparadores que no van a dispararse.
