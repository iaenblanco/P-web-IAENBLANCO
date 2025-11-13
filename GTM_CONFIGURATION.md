# 🎯 Guía de Configuración: Google Analytics 4 y Facebook Pixel en GTM

Esta guía te ayudará a configurar Google Analytics 4 (GA4) y Facebook Pixel dentro de Google Tag Manager para tu sitio web **iaenblanco.com**.

---

## ✅ Paso 1: Verificar que GTM está instalado

1. Abre tu sitio web: https://iaenblanco.com
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña **Console**
4. Escribe: `dataLayer` y presiona Enter
5. Si ves un array `[]`, ¡GTM está funcionando correctamente! ✅

**O usa la extensión de Chrome:**
- Instala [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- Visita tu sitio y verifica que aparezca el tag GTM

---

## 📊 Paso 2: Configurar Google Analytics 4 (GA4) en GTM

### 2.1 Crear una propiedad de GA4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Si no tienes cuenta, créala
3. Crea una nueva **Propiedad** → **GA4**
4. Configura:
   - **Nombre de la propiedad**: IAenBlanco Web
   - **Zona horaria**: Tu zona horaria
   - **Moneda**: Tu moneda
5. **IMPORTANTE**: Copia tu **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 2.2 Crear el Tag de GA4 en GTM

**⚠️ IMPORTANTE:** Google ha actualizado GTM. Ahora usa "Etiqueta de Google" (Google Tag) en lugar de "GA4 Configuration".

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Selecciona tu contenedor: **GTM-5MNF9G4Z**
3. Ve a **Tags** → **Nuevo**
4. Configura el tag:
   - **Nombre**: `GA4 - Configuración`
   - **Tipo de tag**: Busca y selecciona **`Etiqueta de Google`** o **`Google Tag`** (es la nueva opción unificada)
   - **ID de etiqueta**: Pega tu Measurement ID (`G-XXXXXXXXXX`)
   - **Triggering**: Selecciona `All Pages` (Todas las páginas) o `Initialization - All Pages`

5. Haz clic en **Guardar**

**Nota:** Si no encuentras "Etiqueta de Google", busca "Google Tag" o simplemente escribe "Google" en el buscador y selecciona la opción que tenga el logo de Google Analytics.

### 2.3 Configurar eventos personalizados (Opcional pero recomendado)

#### Evento: Clic en botón "Agendar"
1. **Tags** → **Nuevo**
2. **Nombre**: `GA4 - Evento Agendar`
3. **Tipo**: `Google Analytics: GA4 Event`
4. **ID de configuración**: Selecciona tu tag de configuración GA4
5. **Nombre del evento**: `agendar_click`
6. **Triggering**: Crea un nuevo trigger:
   - **Tipo**: `Click - All Elements`
   - **Condición**: `Click Text` `contains` `Agendar` (o el texto de tu botón)
7. **Guardar**

#### Evento: Envío de formulario de contacto
1. **Tags** → **Nuevo**
2. **Nombre**: `GA4 - Evento Contacto`
3. **Tipo**: `Google Analytics: GA4 Event`
4. **ID de configuración**: Selecciona tu tag de configuración GA4
5. **Nombre del evento**: `form_contact_submit`
6. **Triggering**: Crea un nuevo trigger:
   - **Tipo**: `Form Submission`
   - **Condición**: `Form URL` `contains` `contacto` (o la URL de tu formulario)
7. **Guardar**

### 2.4 Publicar los cambios

1. Haz clic en **Enviar** (arriba a la derecha)
2. **Nombre de versión**: `Configuración inicial GA4`
3. **Descripción**: `Agregar Google Analytics 4`
4. Haz clic en **Publicar**

---

## 📱 Paso 3: Configurar Facebook Pixel en GTM

### 3.1 Crear un Pixel de Facebook

1. Ve a [Meta Business Suite](https://business.facebook.com/)
2. Ve a **Eventos** → **Píxeles**
3. Haz clic en **Crear píxel**
4. **Nombre**: `IAenBlanco Web Pixel`
5. **IMPORTANTE**: Copia tu **ID de píxel** (número de 15-16 dígitos, ejemplo: `123456789012345`)

### 3.2 Crear el Tag Base de Facebook Pixel en GTM

1. En GTM, ve a **Tags** → **Nuevo**
2. Configura el tag:
   - **Nombre**: `Facebook Pixel - Base`
   - **Tipo de tag**: `HTML personalizado`
   - **HTML**: Pega este código (reemplaza `TU_PIXEL_ID` con tu ID real):

```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TU_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=TU_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
```

3. **Triggering**: Selecciona `All Pages`
4. **Guardar**

### 3.3 Configurar eventos estándar de Facebook

#### Evento: Lead (Formulario de contacto)
1. **Tags** → **Nuevo**
2. **Nombre**: `Facebook Pixel - Lead`
3. **Tipo**: `HTML personalizado`
4. **HTML**: 

```html
<script>
fbq('track', 'Lead', {
  content_name: 'Formulario de Contacto',
  content_category: 'Contacto'
});
</script>
```

5. **Triggering**: Usa el mismo trigger del formulario que creaste para GA4
6. **Guardar**

#### Evento: Schedule (Clic en Agendar)
1. **Tags** → **Nuevo**
2. **Nombre**: `Facebook Pixel - Schedule`
3. **Tipo**: `HTML personalizado`
4. **HTML**:

```html
<script>
fbq('track', 'Schedule', {
  content_name: 'Botón Agendar',
  content_category: 'CTA'
});
</script>
```

5. **Triggering**: Usa el mismo trigger del botón Agendar
6. **Guardar**

### 3.4 Publicar los cambios

1. Haz clic en **Enviar**
2. **Nombre de versión**: `Configuración Facebook Pixel`
3. **Descripción**: `Agregar Facebook Pixel con eventos`
4. Haz clic en **Publicar**

---

## 🧪 Paso 4: Verificar que todo funciona

### Verificar GA4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad GA4
3. Ve a **Informes** → **Tiempo real**
4. Visita tu sitio web en otra pestaña
5. Deberías ver tu visita en tiempo real ✅

### Verificar Facebook Pixel

1. Instala la extensión [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Visita tu sitio web
3. Haz clic en el icono de la extensión
4. Deberías ver tu Pixel ID y eventos ✅

### Verificar en GTM Preview Mode

1. En GTM, haz clic en **Vista previa**
2. Ingresa tu URL: `https://iaenblanco.com`
3. Navega por tu sitio
4. Verifica que los tags se disparen correctamente

---

## 📈 Eventos Recomendados para Trackear

### Eventos de GA4 que puedes agregar:

1. **`page_view`** - Ya configurado automáticamente
2. **`agendar_click`** - Clic en botón de agendar
3. **`form_contact_submit`** - Envío de formulario de contacto
4. **`scroll_depth`** - Scroll profundo (90% de la página)
5. **`video_play`** - Si tienes videos
6. **`download`** - Descargas de recursos
7. **`search`** - Búsquedas en el sitio

### Eventos de Facebook Pixel:

1. **`PageView`** - Ya configurado
2. **`Lead`** - Formularios completados
3. **`Schedule`** - Agendamientos
4. **`ViewContent`** - Visualización de contenido importante
5. **`InitiateCheckout`** - Si tienes proceso de compra

---

## 🔒 Privacidad y Consentimiento (GDPR/CCPA)

Si tu sitio necesita cumplir con GDPR o CCPA, considera:

1. **Instalar un banner de cookies** (ej: Cookiebot, OneTrust)
2. **Configurar consentimiento en GTM**:
   - Ve a **Contenedor** → **Configuración** → **Consentimiento**
   - Habilita el modo de consentimiento
   - Configura los tags para requerir consentimiento

---

## 🚀 Próximos Pasos

1. ✅ Configura GA4 y Facebook Pixel siguiendo esta guía
2. ✅ Verifica que todo funciona
3. ✅ Espera 24-48 horas para ver datos en los dashboards
4. ✅ Configura conversiones y objetivos en GA4
5. ✅ Crea audiencias en Facebook para retargeting

---

## 📞 Soporte

Si tienes problemas:
- [Documentación oficial de GTM](https://support.google.com/tagmanager)
- [Documentación de GA4](https://support.google.com/analytics/answer/10089681)
- [Documentación de Facebook Pixel](https://www.facebook.com/business/help/952354354575702)

---

**¡Listo!** Tu sitio web ahora tiene tracking completo con Google Analytics 4 y Facebook Pixel a través de Google Tag Manager. 🎉

