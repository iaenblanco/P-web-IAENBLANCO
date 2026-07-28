# Guia especifica de medicion IAenBlanco: GTM, GA4 y Meta Pixel

Esta guia reemplaza la configuracion generica anterior. Su objetivo es evitar eventos duplicados, no confundir clics con conversiones reales y dejar una arquitectura clara para medir `iaenblanco.com` en produccion.

Estado actual del sitio:
- Dominio objetivo: `https://iaenblanco.com`
- Contenedor GTM configurado en el codigo: `GTM-5MNF9G4Z`
- La web ya empuja eventos propios a `window.dataLayer`
- La medicion se considera preparada, no cerrada, hasta validar GTM, GA4 y Meta en produccion

## 1. Verificacion correcta de GTM

Ver `window.dataLayer` en consola no demuestra por si solo que GTM este funcionando. La web puede crear `dataLayer` aunque el contenedor no haya cargado.

Validacion minima:

1. Abrir `https://iaenblanco.com` en produccion.
2. Confirmar en Network que se solicite:
   `https://www.googletagmanager.com/gtm.js?id=GTM-5MNF9G4Z`
3. Confirmar en consola o en Tag Assistant que exista el evento `gtm.js`.
4. Abrir [Tag Assistant](https://tagassistant.google.com/) o el modo Preview de GTM.
5. Confirmar que el contenedor aparece conectado.
6. Ejecutar clics reales y verificar que cada evento active una sola etiqueta.

No usar Tag Assistant Legacy como referencia principal. Usar el Tag Assistant actual y el modo Preview de Google Tag Manager.

## 2. Principio de arquitectura

La web ya comunica interacciones estructuradas mediante `dataLayer`. Por lo tanto, GTM no debe depender de textos de botones como "Agendar", "Hablemos" o "Ver producto".

No crear activadores de este tipo:
- `Click Text contains Agendar`
- `Click Text contains WhatsApp`
- `Click URL contains contacto`

Crear activadores de tipo Custom Event con los nombres exactos que envia el sitio.

## 3. Estado de eventos

| Evento dataLayer | Estado | Uso recomendado |
| --- | --- | --- |
| `cta_whatsapp_click` | Implementado y verificado localmente | Microconversion |
| `service_click` | Implementado; pendiente de validar en GTM Preview | Interes |
| `product_click` | Implementado; pendiente de validar en GTM Preview | Interes |
| `contact_click` | Implementado; pendiente de validar en GTM Preview | Microconversion |
| `case_click` | Implementado; pendiente de validar en GTM Preview | Confianza |
| `form_start` | Implementado; pendiente de validar con formulario real | Interaccion |
| `form_submit` | Implementado como intento HTML | Diagnostico tecnico, no conversion |
| `generate_lead` | Preparado en la capa tecnica; pendiente de conectarse a exito real | Conversion principal |
| `form_error` | Preparado como convencion tecnica | Diagnostico sin datos personales |

Importante:
- `form_submit` no debe marcarse como conversion.
- `generate_lead` solo debe enviarse cuando el envio se confirme exitosamente desde la interfaz o el backend.
- Abrir WhatsApp no debe registrarse como `Lead`; es una senal de intencion, no un lead confirmado.
- `form_error` no debe incluir nombres, correos, telefonos, mensajes ni otros datos personales.

## 4. Parametros disponibles

Eventos de clic:

```js
{
  event: 'cta_whatsapp_click',
  cta_text: 'Texto visible del enlace',
  link_text: 'Texto visible del enlace',
  link_url: 'URL de destino',
  destination: 'URL de destino',
  page_path: '/ruta-actual/',
  section: 'Seccion de origen',
  service_name: 'Servicio, si aplica',
  product_name: 'Producto, si aplica',
  device_type: 'mobile | tablet | desktop',
  traffic_source_raw: 'utm_source, source, referrer o direct'
}
```

Eventos de formulario:

```js
{
  event: 'form_start',
  form_name: 'Nombre tecnico del formulario',
  page_path: '/ruta-actual/',
  section: 'Seccion de origen',
  device_type: 'mobile | tablet | desktop',
  traffic_source_raw: 'utm_source, source, referrer o direct'
}
```

`generate_lead` debe mantener al menos:

```js
{
  event: 'generate_lead',
  form_name: 'Nombre tecnico del formulario',
  page_path: '/ruta-actual/',
  section: 'Seccion de origen',
  device_type: 'mobile | tablet | desktop',
  traffic_source_raw: 'utm_source, source, referrer o direct'
}
```

`form_error` debe ser tecnico y no sensible:

```js
{
  event: 'form_error',
  form_name: 'contact_form',
  error_type: 'network_error',
  page_path: '/ruta-actual/',
  section: 'contacto',
  device_type: 'mobile | tablet | desktop',
  traffic_source_raw: 'utm_source, source, referrer o direct'
}
```

`traffic_source_raw` puede servir para diagnostico, pero no debe usarse como fuente oficial de atribucion. Para informes comerciales usar dimensiones nativas de GA4:
- Session source / medium.
- First user source / medium.
- Campaign.
- Default channel group.

## 5. Variables de capa de datos en GTM

Crear variables de tipo Data Layer Variable segun se necesiten en las etiquetas:

| Variable GTM | Nombre en dataLayer |
| --- | --- |
| `DLV - cta_text` | `cta_text` |
| `DLV - link_text` | `link_text` |
| `DLV - link_url` | `link_url` |
| `DLV - destination` | `destination` |
| `DLV - page_path` | `page_path` |
| `DLV - section` | `section` |
| `DLV - service_name` | `service_name` |
| `DLV - product_name` | `product_name` |
| `DLV - form_name` | `form_name` |
| `DLV - error_type` | `error_type` |
| `DLV - device_type` | `device_type` |
| `DLV - traffic_source_raw` | `traffic_source_raw` |

Agregar parametros solo cuando correspondan al evento. No reutilizar una plantilla que mande parametros vacios o parametros de eventos anteriores.

Dimensiones personalizadas recomendadas en GA4:
- `section`
- `service_name`
- `product_name`
- `form_name`

Opcional:
- `cta_text`
- `error_type`, solo si se va a analizar diagnostico de formularios.

No crear dimensiones personalizadas para:
- `device_type`
- `traffic_source_raw`
- `page_path`
- `link_url`

GA4 ya ofrece dimensiones predefinidas para dispositivo, fuente/medio, campana, pagina y URLs. Usar dimensiones predefinidas siempre que exista una equivalente.

## 6. Configuracion recomendada en GTM

### Etiqueta base

Nombre:
`Google Tag - IAenBlanco`

Tipo:
`Google Tag`

Tag ID:
`G-XXXXXXXXXX`

Trigger:
`Initialization - All Pages`

La etiqueta de consentimiento o CMP debe usar:
`Consent Initialization - All Pages`

No usar `Consent Initialization - All Pages` para la etiqueta normal de GA4. Ese activador queda reservado para etiquetas que definen o actualizan el estado de consentimiento.

### Activadores Custom Event

Crear estos activadores:

| Nombre del activador | Event name |
| --- | --- |
| `CE - cta_whatsapp_click` | `cta_whatsapp_click` |
| `CE - service_click` | `service_click` |
| `CE - product_click` | `product_click` |
| `CE - contact_click` | `contact_click` |
| `CE - case_click` | `case_click` |
| `CE - form_start` | `form_start` |
| `CE - generate_lead` | `generate_lead` |

Activadores opcionales de diagnostico:

| Nombre del activador | Event name |
| --- | --- |
| `CE - form_submit` | `form_submit` |
| `CE - form_error` | `form_error` |

### Etiquetas GA4

| Etiqueta | Evento GA4 | Trigger |
| --- | --- | --- |
| `GA4 - WhatsApp Click` | `cta_whatsapp_click` | `CE - cta_whatsapp_click` |
| `GA4 - Service Click` | `service_click` | `CE - service_click` |
| `GA4 - Product Click` | `product_click` | `CE - product_click` |
| `GA4 - Contact Click` | `contact_click` | `CE - contact_click` |
| `GA4 - Case Click` | `case_click` | `CE - case_click` |
| `GA4 - Form Start` | `form_start` | `CE - form_start` |
| `GA4 - Generate Lead` | `generate_lead` | `CE - generate_lead` |

No crear inicialmente una etiqueta GA4 para `form_submit`. Mantenerlo en `dataLayer` y GTM Preview como diagnostico tecnico. Si mas adelante se necesita reportar errores, usar `form_error` con parametros no sensibles.

Parametros sugeridos por etiqueta:
- WhatsApp: `section`, `cta_text`, `destination`, `page_path`.
- Service Click: `section`, `service_name`, `page_path`.
- Product Click: `section`, `product_name`, `destination`, `page_path`.
- Contact Click: `section`, `cta_text`, `destination`, `page_path`.
- Case Click: `section`, `page_path`.
- Form Start: `section`, `form_name`, `page_path`.
- Generate Lead: `section`, `form_name`, `page_path`.

Marcar como evento clave principal:
- `generate_lead`

No marcar inicialmente como evento clave:
- `service_click`
- `product_click`
- `case_click`
- `form_start`

`cta_whatsapp_click` puede ser evento clave secundario o microconversion, pero debe diferenciarse del lead confirmado.

## 7. Formularios y duplicacion

GA4 puede medir `form_start` y `form_submit` mediante Medicion mejorada. Si esa opcion queda activa y la web tambien envia eventos manuales, pueden aparecer duplicados.

Recomendacion para IAenBlanco:

1. Desactivar las interacciones automaticas de formularios en Medicion mejorada de GA4.
2. Mantener la instrumentacion propia del sitio.
3. Usar `form_start` como senal de interaccion.
4. Usar `form_submit` solo como diagnostico local/Preview.
5. Enviar `generate_lead` solo cuando el envio termine correctamente.
6. Enviar `form_error` solo con informacion tecnica no sensible cuando falle el envio.

Flujo esperado:

```text
form_start
  -> intento de envio
  -> respuesta exitosa
  -> generate_lead
```

Si hay fallo:

```text
form_start
  -> intento de envio
  -> form_error
```

No mapear `form_submit` a `generate_lead`.

## 8. Meta Pixel

Usar el nombre actual Meta Pixel. "Facebook Pixel" sigue siendo entendible, pero no debe ser el nombre principal de la guia.

Configuracion minima:

| Evento del sitio | Evento Meta | Trigger |
| --- | --- | --- |
| Carga de pagina | `PageView` | `All Pages` |
| `generate_lead` | `Lead` | `CE - generate_lead` |
| `cta_whatsapp_click` | Evento personalizado `WhatsAppClick` | `CE - cta_whatsapp_click` |
| Pagina individual de producto | `ViewContent` | Solo cuando exista una pagina de producto relevante |

Ejemplo de evento personalizado WhatsApp:

```html
<script>
fbq("trackCustom", "WhatsAppClick", {
  section: "{{DLV - section}}",
  destination: "{{DLV - destination}}"
});
</script>
```

No usar:
- `Schedule`, salvo que exista una reserva confirmada dentro del sitio.
- `Lead` por un simple clic en WhatsApp.
- Bloques `<noscript>` dentro de una etiqueta HTML personalizada de GTM. Si JavaScript esta desactivado, GTM no ejecuta esa etiqueta, por lo que ese respaldo no aporta valor real ahi.

Verificar Meta con Test Events de Events Manager antes de publicar cambios definitivos.

## 9. Validacion en produccion

La validacion debe ocurrir en cuatro niveles.

### GTM Preview

Confirmar:
- Se recibe el evento en `dataLayer`.
- Se activa el trigger correcto.
- Se dispara una sola etiqueta.
- No hay duplicados.
- `form_submit` no dispara `generate_lead`.

### GA4 DebugView

Confirmar:
- Nombre del evento.
- Parametros.
- Pagina.
- Dispositivo mediante dimensiones nativas.
- Atribucion mediante dimensiones nativas.
- `generate_lead` aparece una sola vez cuando corresponde.

### GA4 Tiempo real

Confirmar:
- El evento llega a la propiedad correcta.
- La sesion aparece en la ruta esperada.
- Los eventos no se duplican.

### Meta Events Manager

Confirmar:
- Recepcion del evento.
- Pixel ID correcto.
- URL correcta.
- Ausencia de duplicados.
- Diagnosticos sin alertas criticas.

No declarar la medicion completa hasta pasar estos cuatro niveles en produccion.

## 10. Privacidad, cookies y consentimiento

IAenBlanco opera desde Chile, por lo que la guia no debe limitarse a GDPR o CCPA.

La publicacion definitiva debe considerar:
- Politica de privacidad.
- Finalidad de Analytics y Meta Pixel.
- Terceros que reciben informacion.
- Plazo de conservacion.
- Transferencias internacionales.
- Mecanismo para ejercer derechos.
- Consentimiento para medicion publicitaria cuando corresponda.
- Google Consent Mode.
- Bloqueo o adaptacion de Meta Pixel segun la decision del usuario.

Consent Mode debe contemplar, al menos:
- `analytics_storage`
- `ad_storage`
- `ad_user_data`
- `ad_personalization`

La Ley chilena 21.719 incorpora derechos de los titulares y reglas relevantes para tratamiento automatizado, perfilamiento, finalidad, transparencia y ejercicio de derechos. Esta seccion requiere revision legal antes de publicarse como politica definitiva.

## 11. Fuentes oficiales usadas para esta guia

- Google Tag Manager Data Layer: https://developers.google.com/tag-platform/tag-manager/datalayer
- Tag Assistant: https://tagassistant.google.com/
- GTM Custom Event trigger: https://support.google.com/tagmanager/answer/7679219
- GTM Consent Mode support: https://support.google.com/tagmanager/answer/10718549
- GA4 Custom dimensions and metrics: https://support.google.com/analytics/answer/14240153
- GA4 Enhanced Measurement: https://support.google.com/analytics/answer/9216061
- GA4 Recommended Events: https://developers.google.com/analytics/devguides/collection/ga4/reference/events
- Meta Pixel conversion tracking: https://developers.facebook.com/documentation/meta-pixel/implementation/conversion-tracking
- Meta Test Events: https://www.facebook.com/business/help/2040882565969969
- Ley Chile 21.719: https://www.bcn.cl/leychile/navegar?idNorma=1209272

## 12. Cierre correcto

La capa de medicion del sitio esta preparada. La implementacion se considerara completa despues de validar GTM, GA4 y Meta en produccion, confirmar que no existen duplicaciones y verificar que los eventos comerciales aparecen correctamente en los reportes.
