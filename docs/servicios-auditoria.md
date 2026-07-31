# Auditoria Servicios IAenBlanco

Fecha base: 2026-07-30

## Alcance revisado

Se revisaron los elementos actuales relacionados con Servicios:

- Datos comerciales en `lib/site.ts`.
- Pagina generica de servicio en `app/servicios/[slug]/page.tsx`.
- Bloque de Home en `components/ServiceSystem.tsx`.
- Navegacion desktop/mobile en `components/Header.tsx`.
- Footer en `components/Footer.tsx`.
- Metadata global y eventos en `app/layout.tsx`.
- Sitemap en `app/sitemap.ts`.
- Redirecciones estaticas en `public/_redirects`.
- CSS relevante en `app/globals.css`.

No se encontraron paginas locales bajo `app/soluciones/`.

## Rutas actuales

- `/servicios/desarrollo-web-ia/`
- `/servicios/plataformas-software-medida/`
- `/servicios/automatizaciones/`
- `/servicios/soluciones-ia-medida/`
- `/servicios/leads-magnet/`

No existe pagina indice `/servicios/`.

## Componentes actuales

`components/ServiceSystem.tsx`

- Renderiza la seccion Servicios del Home.
- Separa cuatro servicios base y un quinto servicio comercial usando el slug `leads-magnet`.
- Usa un diagrama generico `SystemDiagram`.
- Usa los mismos datos simples de `lib/site.ts`.

`app/servicios/[slug]/page.tsx`

- Renderiza las cinco paginas desde una misma estructura generica.
- Tiene metadata por servicio desde `lib/site.ts`.
- Usa un grafico generico `CapabilityGraphic`.
- No incluye problemas, entregables, casos de uso, FAQ, caso real ni diagrama propio por servicio.

`components/Header.tsx` y `components/Footer.tsx`

- Listan `services` directamente.
- El texto visible ya muestra `Prospeccion B2B`, pero el slug sigue siendo `leads-magnet`.

## Datos actuales

`lib/site.ts` contiene una estructura `Service` simple:

- `slug`
- `index`
- `shortTitle`
- `title`
- `eyebrow`
- `statement`
- `description`
- `capabilities`
- `idealFor`
- `signals`
- `seoTitle`
- `seoDescription`

Fortaleza: fuente unica de navegacion y SEO basico.

Debilidad: la data no alcanza para paginas comerciales especificas. Las paginas quedan descriptivas y parecidas entre si.

## Nomenclatura

Problema encontrado:

- `leads-magnet` sigue presente como slug y llave tecnica.
- El texto visible no usa "Leads Magnet", pero la URL, analitica y logica interna siguen asociadas a ese nombre.

Decision recomendada:

- Producto: `Leads`.
- Servicio: `Prospeccion B2B gestionada`.
- Nueva URL recomendada: `/servicios/prospeccion-b2b-gestionada/`.
- Redireccion 301 desde `/servicios/leads-magnet/`.

## Metadata y SEO actual

Fortalezas:

- Cada servicio tiene title y description propios.
- Cada servicio declara canonical y Open Graph.
- Sitemap incluye rutas de servicios.
- Hay redirecciones desde rutas antiguas de `/soluciones/`.

Debilidades:

- No existe `/servicios/`.
- No hay FAQ schema.
- No hay Open Graph enriquecido por servicio.
- No existe migracion para `/servicios/leads-magnet/`.
- La arquitectura no diferencia claramente producto Leads vs servicio de prospeccion.

## Redirecciones actuales

`public/_redirects` ya contiene:

- `/soluciones/paginas-web-ia/` -> `/servicios/desarrollo-web-ia/`
- `/soluciones/diseno-shopify/` -> `/servicios/desarrollo-web-ia/`
- `/soluciones/chatbots-asistentes/` -> `/servicios/soluciones-ia-medida/`
- `/soluciones/soluciones-medida/` -> `/servicios/soluciones-ia-medida/`
- `/soluciones/automatizaciones/` -> `/servicios/automatizaciones/`
- `/soluciones/auditoria-sitios-personalizada/` -> `/#servicios`
- `/soluciones/` -> `/#servicios`

No se detectaron paginas antiguas locales con precios, metricas o testimonios antiguos dentro de `app/soluciones/`.

## CTAs actuales

Patrones encontrados:

- Header y footer apuntan a WhatsApp general.
- Home Servicios tiene CTA general a WhatsApp.
- Paginas de servicio cierran con `ContactBand`.
- Links de servicios internos apuntan a `/servicios/${slug}`.

Debilidad:

- Falta contexto prellenado por problema o servicio.
- Los CTAs no distinguen intencion comercial: diagnostico, cotizar web, revisar operacion, automatizar flujo, aplicar IA, abrir prospeccion.

## Analitica actual

Eventos detectados:

- `case_click`
- `cta_whatsapp_click`
- `service_click`
- `product_click`
- `contact_click`
- `form_start`
- `form_submit`
- `generate_lead`
- `form_error`

Gap frente al requisito:

- Falta `service_view`.
- Falta `service_case_click`.
- Falta `service_cta_click`.
- Falta `service_faq_open`.
- Falta `service_next_click`.
- Falta `service_whatsapp_click`.

## CSS actual

Fortalezas:

- Identidad clara: fondo claro, grilla, bordes tecnicos, acentos celeste/naranjo/verde.
- Existe sistema visual para hero, trust proof, productos y servicios.
- Hay responsive ya trabajado para Home.

Debilidades:

- Mucho CSS historico acumulado.
- La pagina de servicio usa clases simples y genericas.
- Los diagramas por servicio no existen como sistema modular.

## Riesgos comerciales

- Las paginas actuales explican capacidades, pero no ayudan lo suficiente a que un cliente se reconozca en un problema.
- La repeticion visual hace que los cinco servicios parezcan variantes de una misma pagina.
- "Prospeccion B2B" como servicio puede confundirse con el producto `Leads` si no se separa como operacion gestionada.
- Los CTAs no llevan suficiente contexto para venta por WhatsApp.

## Criterio para avanzar

Se puede reconstruir Servicios sin tocar hero principal, Productos ni Contacto:

1. Crear data comercial especifica por servicio.
2. Crear `/servicios/`.
3. Reemplazar la pagina generica por `ServicePageTemplate`.
4. Actualizar Home Servicios con entrada por problemas y bloque separado de operacion gestionada.
5. Agregar eventos especificos de servicio.
6. Agregar redireccion del slug historico `leads-magnet`.
