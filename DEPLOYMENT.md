# 🚀 Despliegue en Cloudflare Pages

## 📋 Requisitos previos

1. **Cuenta en Cloudflare**: https://dash.cloudflare.com/
2. **API Key de Gemini**: https://aistudio.google.com/app/apikey
3. **Git instalado** (opcional pero recomendado)

## 🔐 Configuración de Variables de Entorno

### Paso 1: Preparar tu API Key
1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crea una nueva API Key (o usa una existente)
3. **IMPORTANTE**: Copia la API Key y guárdala en un lugar seguro

### Paso 2: Configurar variables en Cloudflare
1. Ve a tu [Dashboard de Cloudflare](https://dash.cloudflare.com/)
2. Selecciona tu sitio web (Pages)
3. Ve a **Settings** → **Environment variables**
4. Añade la siguiente variable:

```
Name: GEMINI_API_KEY
Value: [tu_api_key_aqui_sin_comillas]
Type: Encrypted
```

⚠️ **IMPORTANTE**: Usa "Encrypted" para que tu API Key esté protegida.

## 📦 Despliegue

### Opción 1: Despliegue desde GitHub (Recomendado)

1. **Sube tu código a GitHub**:
   ```bash
   git add .
   git commit -m "Preparar para despliegue en Cloudflare"
   git push origin main
   ```

2. **Conecta Cloudflare Pages con GitHub**:
   - Ve a [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
   - Haz clic en "Create a project"
   - Selecciona "Connect to Git"
   - Elige tu repositorio de GitHub

3. **Configuración del build**:
   ```
   Production branch: main
   Build command: npm run build
   Build output directory: .next
   Root directory: /
   ```

4. **Variables de entorno**: Asegúrate de configurar `GEMINI_API_KEY` como se explicó arriba

5. **Deploy**: Haz clic en "Save and Deploy"

### Opción 2: Despliegue directo desde archivos

1. **Construye el proyecto localmente**:
   ```bash
   npm run build
   ```

2. **Sube la carpeta `.next`** a Cloudflare Pages usando su interfaz web

## 🔒 Seguridad

- ✅ Las variables de entorno están encriptadas en Cloudflare
- ✅ El archivo `.env.local` está en `.gitignore`
- ✅ Tu API Key nunca se expone en el código fuente
- ✅ Las APIs están protegidas con validaciones

## 🌐 Configuración del dominio

Si quieres usar tu propio dominio:

1. Ve a **Settings** → **Custom domains**
2. Añade tu dominio
3. Configura los registros DNS según las instrucciones de Cloudflare

## 📊 Monitoreo

Después del despliegue, puedes:
- Ver logs en tiempo real en Cloudflare Dashboard
- Configurar analytics
- Monitorear el rendimiento

## 🚨 Solución de problemas

### Error 500 en las APIs
- Verifica que `GEMINI_API_KEY` esté configurada correctamente
- Asegúrate de que la API Key tenga permisos adecuados

### Build fallando
- Verifica que todas las dependencias estén instaladas: `npm install`
- Asegúrate de que el build funciona localmente: `npm run build`

### Problemas con el dominio
- Espera a que se propague el DNS (puede tardar hasta 24 horas)
- Verifica que los registros CNAME estén configurados correctamente

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Cloudflare Dashboard
2. Verifica la configuración de variables de entorno
3. Asegúrate de que tu API Key de Gemini sea válida

¡Tu sitio debería estar funcionando en minutos! 🎉