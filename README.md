# IAenBlanco

Sitio corporativo de IAenBlanco construido con Next.js, TypeScript y Tailwind CSS.
El proyecto genera una exportación completamente estática para Cloudflare Pages.

## Rutas

- `/` — Inicio
- `/productos/` — Unifícalo, Citaly y Leads.IAenBlanco
- `/contacto/` — WhatsApp y correo
- `/servicios/[slug]/` — cinco páginas de servicio
- `/privacidad/`
- `/terminos/`

Los servicios, productos, clientes y datos de contacto se administran desde
`lib/site.ts`.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Verificación y exportación

```bash
npx tsc --noEmit
npm run build
```

El build estático se genera en `out/`.

## Analytics

Google Tag Manager solo se carga en builds de producción. El contenedor por
defecto es `GTM-5MNF9G4Z` y puede reemplazarse con:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX
```

## Diseño y accesibilidad

- WebGL propio y liviano, sin librerías 3D externas.
- Fallback visual inmediato cuando WebGL no está disponible.
- Experiencia alternativa para `prefers-reduced-motion`.
- Navegación por teclado y enlaces de salto.
- Fuentes optimizadas con `next/font`.
