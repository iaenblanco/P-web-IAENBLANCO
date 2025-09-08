# IAenBlanco - Next.js 14+ Landing Page

Una landing page moderna y robusta para servicios de IA, construida con Next.js 14+, TypeScript y Tailwind CSS. Optimizada para SEO, rendimiento y accesibilidad.

## 🚀 Características

- **Next.js 14+** con App Router
- **TypeScript** para tipado fuerte
- **Tailwind CSS** para estilos
- **API Routes** seguras para Gemini AI
- **Componentes modulares** y reutilizables
- **SEO Optimizado** - Meta tags, Schema Markup, sitemap, robots.txt
- **Accesibilidad WCAG 2.1** - ARIA labels, navegación por teclado
- **Responsive design** con diseño móvil-first
- **Fondos dinámicos** con temas
- **Seguridad** - Headers de seguridad, validación de formularios
- **Rendimiento** - Optimización de imágenes y carga

## 📦 Instalación

1. Clona o copia esta estructura de carpetas a tu proyecto
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env.local` en la raíz del proyecto y agrega tu API key de Gemini:

```env
GEMINI_API_KEY=tu_api_key_de_gemini_aqui
```

> **IMPORTANTE**: Nunca subas tu API key real a Git. Mantén `.env.local` en tu `.gitignore`.

## 🏃‍♂️ Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del proyecto

```
iaenblanco-nextjs/
├── app/
│   ├── api/
│   │   ├── gemini/
│   │   │   └── route.ts          # API route para generador de ideas
│   │   └── learning-path/
│   │       └── route.ts          # API route para rutas de aprendizaje
│   ├── globals.css               # Estilos globales y Tailwind
│   ├── layout.tsx                # Layout principal con metadatos SEO
│   └── page.tsx                  # Página principal
├── components/
│   ├── icons/                    # Componentes de iconos SVG
│   │   ├── index.ts
│   │   └── [IconName].tsx
│   ├── index.ts                  # Exportaciones de componentes
│   ├── Header.tsx                # Header con navegación
│   ├── Hero.tsx                  # Sección hero
│   ├── Services.tsx              # Servicios ofrecidos
│   ├── Pricing.tsx               # Planes de precios
│   ├── LearningPath.tsx          # Generador de rutas de aprendizaje
│   ├── GeminiGenerator.tsx       # Generador de ideas de negocio
│   ├── Testimonials.tsx          # Testimonios de clientes
│   ├── Contact.tsx               # Formulario de contacto
│   ├── Footer.tsx                # Footer
│   └── BackgroundSwitcher.tsx    # Selector de temas de fondo
├── lib/
│   └── types.ts                  # Definiciones TypeScript
├── public/                       # Archivos estáticos
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 🔧 Configuración

### Variables de Entorno

Asegúrate de tener configurada tu API key de Gemini:

```env
GEMINI_API_KEY=tu_api_key_real_aqui
```

### SEO y Metadatos

Los metadatos SEO están configurados en `app/layout.tsx`. Puedes modificarlos según tus necesidades:

```tsx
export const metadata: Metadata = {
  title: 'IAenBlanco | Soluciones y Desarrollo con Inteligencia Artificial',
  description: 'Creamos soluciones web a medida, ofrecemos consultoría y te enseñamos sobre el poder de la IA para transformar tu negocio.',
}
```

## 🔒 Seguridad de API

Las llamadas a la API de Gemini se realizan de forma segura a través de API Routes de Next.js:

- La API key se mantiene en el servidor (variables de entorno)
- No se expone al cliente
- Las llamadas se validan en el backend

## 🎨 Personalización

### Colores y Tema

Los colores principales están definidos en Tailwind CSS. Puedes modificarlos en `tailwind.config.js` o directamente en los componentes.

### Contenido

Modifica el contenido de los componentes según tus necesidades. Todos los textos están en español.

### Iconos

Los iconos son componentes SVG inline para mejor rendimiento. Puedes reemplazarlos por tu librería de iconos favorita.

## 📱 Responsive

La aplicación está completamente optimizada para dispositivos móviles y tablets.

## 🚀 Despliegue

### Despliegue Local
```bash
npm run dev
```

### Despliegue en Producción

#### Con HTTPS (Recomendado)
1. **Configura variables de entorno para producción:**
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
GEMINI_API_KEY=tu_api_key_real_aqui
```

2. **Build y despliegue:**
```bash
npm run build
npm start
```

#### Plataformas Recomendadas

**Vercel (Recomendado):**
- HTTPS automático incluido
- Despliegue continuo desde Git
- Variables de entorno seguras
- Optimización automática de imágenes

**Netlify:**
- HTTPS automático incluido
- Despliegue continuo
- Formularios integrados
- CDN global

**Configuración HTTPS Manual:**
Si despliegas en un servidor propio:
1. Obtén un certificado SSL (Let's Encrypt es gratuito)
2. Configura tu servidor web (Nginx/Apache) para forzar HTTPS
3. Actualiza `NEXT_PUBLIC_SITE_URL` en las variables de entorno

## 🤝 Contribuir

Si encuentras algún problema o quieres mejorar algo, no dudes en hacer una contribución.

## ✅ Mejoras Implementadas

### 🔒 Seguridad
- Headers de seguridad HTTP configurados
- Validación de formularios del lado cliente
- API keys protegidas en variables de entorno
- Configuración preparada para HTTPS

### 🔍 SEO Optimizado
- Meta tags completos (title, description, keywords, Open Graph, Twitter Cards)
- Schema Markup (JSON-LD) para resultados enriquecidos
- Sitemap dinámico con App Router
- Robots.txt configurado
- URLs semánticas y navegación optimizada

### ♿ Accesibilidad
- ARIA labels y roles semánticos
- Navegación por teclado completa
- Indicadores visuales de foco
- Validación de formularios accesible
- Elementos semánticos HTML5
- Contraste de colores adecuado

### 📱 Rendimiento
- Optimización de imágenes preparada
- Componentes con lazy loading
- Fuentes optimizadas (Google Fonts)
- Bundle splitting automático
- Caché inteligente

## 🧪 Verificación de Implementación

### SEO
```bash
# Verificar sitemap
curl http://localhost:3002/sitemap.xml

# Verificar robots.txt
curl http://localhost:3002/robots.txt
```

### Accesibilidad
- Usa herramientas como WAVE, Lighthouse, o axe DevTools
- Verifica navegación con Tab
- Prueba con lector de pantalla

### Seguridad
```bash
# Verificar headers de seguridad
curl -I http://localhost:3002
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.
