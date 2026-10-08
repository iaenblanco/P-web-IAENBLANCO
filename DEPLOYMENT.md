# Despliegue en Cloudflare Pages

El proyecto usa `output: 'export'`; no requiere un servidor Node ni funciones.

## Configuración del proyecto

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: `/`

## Variable de entorno

Configura el contenedor de Google Tag Manager en producción:

```text
NEXT_PUBLIC_GTM_ID=GTM-5MNF9G4Z
```

No se requieren otras variables.

## Flujo recomendado

1. Ejecutar `npm install`.
2. Ejecutar `npx tsc --noEmit`.
3. Ejecutar `npm run build`.
4. Revisar el contenido de `out/` localmente.
5. Publicar solo después de validar diseño, contenido, enlaces y Analytics.

Los PRs desde forks no reciben secretos de Actions y `visual QA` queda
skipped, lo que GitHub cuenta como verde. Por eso un PR de fork no se mergea
directo: si un cambio externo se quiere integrar, primero se traslada a una
rama de este repo y se valida mediante un PR interno.

## Dominio

En Cloudflare Pages, agrega `iaenblanco.com` en **Custom domains** y conserva los
registros DNS indicados por Cloudflare.

## Verificación posterior

- Confirmar que `/sitemap.xml` y `/robots.txt` respondan correctamente.
- Verificar el contenedor `GTM-5MNF9G4Z` en modo Preview.
- Probar WhatsApp, correo, LinkedIn, Instagram, Unifícalo y todas las rutas.
- Revisar el sitio en escritorio y móvil antes de dirigir tráfico.
