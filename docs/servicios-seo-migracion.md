# SEO y migracion Servicios

## Estado actual

El proyecto usa Next con `output: export`, por lo que el sitio se genera como estatico.

Consecuencia:

- Las redirecciones 301 no se pueden depender exclusivamente de `next.config.js`.
- El repo ya usa `public/_redirects`, probablemente para el hosting estatico.
- Cualquier redireccion nueva debe agregarse ahi y, si el proveedor final no lee `_redirects`, replicarse en su configuracion de hosting.

## Rutas nuevas recomendadas

- `/servicios/`
- `/servicios/desarrollo-web-ia/`
- `/servicios/plataformas-software-medida/`
- `/servicios/automatizaciones/`
- `/servicios/soluciones-ia-medida/`
- `/servicios/prospeccion-b2b-gestionada/`

## URL historica a retirar

- `/servicios/leads-magnet/`

Accion:

- Redirigir 301 a `/servicios/prospeccion-b2b-gestionada/`.
- Eliminar "Leads Magnet" de menu, Home, metadata, footer y analitica visible.

## Redirecciones antiguas ya existentes

- `/soluciones/paginas-web-ia/` -> `/servicios/desarrollo-web-ia/`
- `/soluciones/diseno-shopify/` -> `/servicios/desarrollo-web-ia/`
- `/soluciones/chatbots-asistentes/` -> `/servicios/soluciones-ia-medida/`
- `/soluciones/soluciones-medida/` -> `/servicios/soluciones-ia-medida/`
- `/soluciones/automatizaciones/` -> `/servicios/automatizaciones/`
- `/soluciones/auditoria-sitios-personalizada/` -> `/#servicios`
- `/soluciones/` -> `/#servicios`

## Redirecciones a agregar

- `/servicios/leads-magnet/` -> `/servicios/prospeccion-b2b-gestionada/`
- `/soluciones/leads-magnet/` -> `/servicios/prospeccion-b2b-gestionada/`
- `/soluciones/prospeccion-b2b/` -> `/servicios/prospeccion-b2b-gestionada/`

## Sitemap

Agregar:

- `/servicios/`
- `/servicios/prospeccion-b2b-gestionada/`

Eliminar del sitemap:

- `/servicios/leads-magnet/`

## Metadata por pagina

Cada servicio debe tener:

- title unico.
- description unica.
- H1 unico.
- canonical.
- Open Graph.
- enlaces internos hacia servicios relacionados.
- FAQ schema basado solo en preguntas visibles.

## Titles recomendados

- Servicios de IA, software, automatizacion y web | IAenBlanco
- Sitios web y Shopify que convierten | IAenBlanco
- Plataformas y software a medida | IAenBlanco
- Automatizaciones e integraciones para empresas | IAenBlanco
- Soluciones de IA a medida | IAenBlanco
- Prospeccion B2B gestionada | IAenBlanco

## Descripciones recomendadas

Servicios:

- Servicios para transformar operaciones reales en sistemas digitales: sitios web, software, automatizaciones, soluciones de IA y prospeccion B2B gestionada.

Sitios web:

- Disenamos sitios web, landing pages y Shopify con narrativa clara, experiencia premium, rendimiento y foco en conversion comercial.

Software:

- Construimos plataformas, paneles y software a medida para operaciones que necesitan permisos, reglas, datos e integraciones propias.

Automatizaciones:

- Automatizamos procesos e integraciones para reducir trabajo manual, conectar sistemas, validar datos y activar alertas operativas.

IA:

- Creamos soluciones de IA aplicadas a atencion, analisis y operacion interna, conectadas a contexto real y con control humano.

Prospeccion B2B:

- Servicio gestionado de prospeccion B2B para definir ICP, encontrar empresas, revisar evidencia, priorizar oportunidades y ordenar seguimiento.

## Contenido prohibido sin aprobacion

- Precios.
- Resultados numericos.
- Porcentajes.
- ROI.
- Testimonios textuales.
- Clientes no confirmados.
- Tecnologias especificas no confirmadas.

## Eventos SEO/medicion relacionados

Eventos a emitir sin datos personales:

- `service_view`
- `service_case_click`
- `service_cta_click`
- `service_faq_open`
- `service_next_click`
- `service_whatsapp_click`

## Validacion final

Antes de publicar:

- `npm run lint -- --max-warnings=0`
- `npm run build`
- revisar rutas generadas en `out/`
- probar desktop y mobile en:
  - 1440 x 900
  - 1366 x 768
  - 1024 x 768
  - 768 x 1024
  - 390 x 844
