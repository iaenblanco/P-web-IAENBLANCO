# Arquitectura propuesta para Servicios

## Objetivo comercial

Servicios debe responder tres preguntas en pocos segundos:

1. Que problema tengo.
2. Que construye IAenBlanco para resolverlo.
3. Que accion puedo tomar ahora.

La arquitectura debe evitar una lista generica de capacidades. Cada servicio debe sentirse como una solucion comercial concreta.

## Nombres oficiales

Capacidades principales:

- Sitios web y Shopify.
- Plataformas y software.
- Automatizaciones e integraciones.
- Soluciones de IA.

Operacion gestionada:

- Prospeccion B2B gestionada.

Producto separado:

- Leads.

## Home - bloque Servicios

Estructura recomendada dentro del Home:

1. Introduccion corta:
   - Servicios como capacidades para construir sistemas.
   - Prospeccion B2B separada como operacion gestionada.

2. Selector por problema:
   - Necesito una web que convierta.
   - Mi operacion depende de planillas.
   - Mis herramientas no estan conectadas.
   - Quiero aplicar IA.
   - Necesito oportunidades B2B.
   - No se que solucion necesito.

3. Cuatro capacidades:
   - Sitios web y Shopify.
   - Plataformas y software.
   - Automatizaciones e integraciones.
   - Soluciones de IA.

4. Bloque diferenciado:
   - Operacion gestionada.
   - Prospeccion B2B gestionada.

5. CTA:
   - Diagnostico por WhatsApp con contexto.

## Pagina indice `/servicios/`

Debe funcionar como una puerta comercial clara:

- Hero orientado al diagnostico.
- Selector por problema.
- Cuatro capacidades.
- Operacion B2B gestionada.
- Matriz necesidad / servicio / resultado.
- Casos relacionados.
- CTA de diagnostico.

Esta pagina debe ser enlazada desde menu, footer y Home.

## Plantilla reutilizable

Crear `ServicePageTemplate` con secciones configurables:

1. Hero orientado al resultado.
2. Problemas reconocibles.
3. Que construimos.
4. Entregables.
5. Diagrama funcional propio.
6. Casos de uso.
7. Caso real o evidencia.
8. Proceso y etapas.
9. Modalidades de contratacion.
10. FAQ.
11. CTA contextual.
12. Siguiente servicio.

## Diagramas por servicio

No usar el mismo grafico generico en todas las paginas.

Sitios web y Shopify:

- Mensaje -> experiencia -> conversion -> WhatsApp/compra -> seguimiento.

Plataformas y software:

- Usuarios -> permisos -> reglas -> backend/datos -> panel.

Automatizaciones e integraciones:

- Sistema A -> validacion -> reglas -> Sistema B -> alerta/dashboard.
- Ruta secundaria: excepcion -> revision humana.

Soluciones de IA:

- Solicitud -> contexto -> agente/modelo -> herramientas -> validacion -> respuesta/accion.

Prospeccion B2B gestionada:

- ICP -> busqueda -> evidencia -> scoring -> contacto -> seguimiento -> oportunidad.

## Copy por servicio

Cada pagina debe tener:

- 3 a 5 problemas reales.
- Entregables concretos.
- 3 casos de uso.
- Caso o evidencia real cuando exista.
- Proceso propio.
- FAQ propio.
- CTA especifico.
- Lenguaje no tecnico.

No inventar:

- Metricas.
- Clientes.
- Testimonios.
- Tiempos.
- Precios.
- Resultados no verificados.
- Tecnologias no confirmadas.

## Casos y evidencia permitida

Se pueden mencionar como evidencia real, sin metricas inventadas:

- Propinvest: plataforma inmobiliaria editable.
- Granja Magdalena: canal digital/e-commerce e integraciones.
- YoMeEncargo: plataforma y experiencia comercial digital.
- Granja Magdalena Pet: canal digital especializado.
- Inasec Pets: presencia comercial digital.
- Productos propios: Unificalo, Citaly y Leads como sistemas en piloto o validacion, segun textos existentes.

## Responsive

Desktop:

- Secciones anchas, max-width 1200 a 1400 px.
- Diagramas horizontales por servicio.
- Matrices y listas con buena densidad, sin microtexto.

Mobile:

- Diagramas verticales.
- Texto minimo 14 px.
- CTAs de ancho completo.
- Sin overflow horizontal.
- Tarjetas sin compresion excesiva.

## Analitica requerida

Agregar o mantener:

- `service_view`
- `service_case_click`
- `service_cta_click`
- `service_faq_open`
- `service_next_click`
- `service_whatsapp_click`

No enviar datos personales. Usar solo:

- pagina
- servicio
- texto del CTA
- destino
- seccion
- dispositivo
- fuente cruda no identificable

## Implementacion progresiva

Orden recomendado:

1. Data comercial y nomenclatura.
2. `/servicios/`.
3. Template reusable.
4. Home Servicios.
5. Cinco paginas.
6. SEO, sitemap, redirecciones.
7. Analitica.
8. Responsive y build.
