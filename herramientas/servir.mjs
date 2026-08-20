// Servidor estático mínimo para medir el sitio construido.
// `npx serve` se caía con varios Chrome midiendo en paralelo; este aguanta
// porque ignora los cortes de conexión en vez de morirse con ellos.
import { createServer } from 'node:http'
import { createReadStream, statSync, existsSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const RAIZ = process.argv[2]
const PUERTO = parseInt(process.argv[3] || '3210')

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
}

function resolver(url) {
  const limpio = decodeURIComponent(url.split('?')[0].split('#')[0])
  let ruta = normalize(join(RAIZ, limpio)).replace(/\\/g, '/')
  if (!ruta.startsWith(RAIZ.replace(/\\/g, '/'))) return null
  if (existsSync(ruta) && statSync(ruta).isDirectory()) ruta = join(ruta, 'index.html')
  if (existsSync(ruta) && statSync(ruta).isFile()) return ruta
  const conHtml = ruta.replace(/\/$/, '') + '.html'
  if (existsSync(conHtml)) return conHtml
  return null
}

const servidor = createServer((pet, res) => {
  const archivo = resolver(pet.url || '/')
  if (!archivo) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('no está')
    return
  }
  res.writeHead(200, {
    'content-type': TIPOS[extname(archivo).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store',
  })
  const flujo = createReadStream(archivo)
  flujo.on('error', () => res.destroy())
  flujo.pipe(res)
})

// Que un cliente que corta la conexión no tumbe el proceso entero.
servidor.on('clientError', (_e, socket) => { try { socket.destroy() } catch {} })
servidor.on('error', (e) => { console.error('error del servidor:', e.message) })
process.on('uncaughtException', (e) => { console.error('excepción ignorada:', e.message) })

servidor.maxConnections = 512
servidor.keepAliveTimeout = 5000
servidor.listen(PUERTO, () => console.log(`sirviendo ${RAIZ} en http://localhost:${PUERTO}`))
