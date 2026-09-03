// Lo que la batería visual no mira: el HTML construido, leído como archivo.
// Títulos, canónicas, JSON-LD, alt, ids repetidos, enlaces internos rotos,
// sitemap y robots. Quince criterios, todos comprobables sin abrir Chrome.
//
//   node herramientas/revisar-html.mjs [carpeta-out] [--json salida.json]
//
// Sale 0 si no hay fallas, 1 si hay. Los avisos no hacen fallar: son cosas
// que conviene mirar pero que no rompen nada (un título largo, por ejemplo).
//
// No se pide rel="noopener": desde Chrome 88, Firefox 79 y Safari 12.1 el
// target="_blank" ya lo implica. Medirlo era contar un problema que no existe.
//
// Por qué se lee con expresiones regulares y no con un parser: el HTML de
// out/ lo escribe Next, no una persona. Es consistente y no tiene sorpresas.
// Un parser sería más correcto en general y aquí no compra nada, y traer una
// dependencia solo para esto es peor. Si algún día el HTML lo escribe alguien
// a mano, esto hay que cambiarlo.
//
// Trampas ya pagadas:
//  - trailingSlash: true, así que /servicios/ es out/servicios/index.html y
//    un enlace a /servicios (sin barra) es una redirección, no un acierto.
//  - el alt vacío es correcto cuando la imagen es decorativa; solo se exige
//    que exista el atributo, no que tenga texto.
//  - los ids repetidos no son cosmética: aria-controls y aria-labelledby
//    apuntan al primero y el resto de los controles quedan mudos.
//  - 404.html no va en el sitemap y no tiene por qué tener canónica propia.
//  - las páginas de Next traen ids autogenerados dentro del JSON de estado;
//    solo se miran los id= que están en el marcado visible, no en scripts.
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync } from 'node:fs'
import { resolve, relative, dirname, posix } from 'node:path'

const RAIZ = resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'out')
const iJson = process.argv.indexOf('--json')
const JSON_SALIDA = iJson > 0 ? resolve(process.argv[iJson + 1]) : ''
const DOMINIO = 'https://iaenblanco.com'

if (!existsSync(RAIZ)) { console.log(`No existe ${RAIZ}. Corre npm run build primero.`); process.exit(2) }

const fallas = [], avisos = []
const falla = (ruta, criterio, detalle) => fallas.push({ ruta, criterio, detalle })
const aviso = (ruta, criterio, detalle) => avisos.push({ ruta, criterio, detalle })

// --- recolectar las páginas ---
function archivos(dir, re, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = resolve(dir, e.name)
    if (e.isDirectory()) archivos(p, re, acc); else if (re.test(e.name)) acc.push(p)
  }
  return acc
}
const htmls = archivos(RAIZ, /\.html$/).sort()
// ruta pública de un archivo: out/servicios/index.html -> /servicios/
const rutaDe = (f) => {
  const r = '/' + relative(RAIZ, f).split('\\').join('/')
  return r.endsWith('/index.html') ? r.slice(0, -10) : r
}
const paginas = htmls.map(f => ({ f, ruta: rutaDe(f), html: readFileSync(f, 'utf8') }))
const rutasExistentes = new Set(paginas.map(p => p.ruta))

// --- ayudas de lectura ---
const meta = (h, prop) => {
  const re = new RegExp(`<meta[^>]+(?:name|property)="${prop}"[^>]*>`, 'i')
  const m = h.match(re); if (!m) return null
  const c = m[0].match(/content="([^"]*)"/i); return c ? c[1] : ''
}
const sinScripts = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<!--[\s\S]*?-->/g, '')
const desescapar = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ')

const titulos = new Map(), descripciones = new Map()

for (const p of paginas) {
  const { ruta, html } = p
  const es404 = ruta === '/404.html' || ruta === '/404/'
  const cuerpo = sinScripts(html)

  // 1. título
  const t = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]
  if (!t || !t.trim()) falla(ruta, 'titulo', 'no tiene <title> o está vacío')
  else {
    const tt = desescapar(t.trim())
    if (tt.length > 62) aviso(ruta, 'titulo', `${tt.length} caracteres, Google corta cerca de 60: "${tt.slice(0, 70)}"`)
    if (!es404) { if (titulos.has(tt)) falla(ruta, 'titulo', `repetido, igual que ${titulos.get(tt)}`); else titulos.set(tt, ruta) }
  }

  // 2. descripción
  const d = meta(html, 'description')
  if (d === null) falla(ruta, 'descripcion', 'no tiene meta description')
  else if (!d.trim()) falla(ruta, 'descripcion', 'meta description vacía')
  else {
    const dd = desescapar(d.trim())
    if (dd.length < 70) aviso(ruta, 'descripcion', `${dd.length} caracteres, corta para el fragmento de Google`)
    if (dd.length > 165) aviso(ruta, 'descripcion', `${dd.length} caracteres, se corta en el resultado`)
    if (!es404) { if (descripciones.has(dd)) falla(ruta, 'descripcion', `repetida, igual que ${descripciones.get(dd)}`); else descripciones.set(dd, ruta) }
  }

  // 3. canónica
  const can = (html.match(/<link[^>]+rel="canonical"[^>]*>/i) || [''])[0].match(/href="([^"]*)"/i)
  if (!es404) {
    if (!can) falla(ruta, 'canonica', 'no tiene <link rel="canonical">')
    else {
      const esperada = DOMINIO + ruta
      if (can[1] !== esperada) falla(ruta, 'canonica', `apunta a ${can[1]} y debería apuntar a ${esperada}`)
    }
  }

  // 4. compartir: og y twitter
  if (!es404) {
    for (const prop of ['og:title', 'og:description', 'og:image', 'og:url']) {
      const v = meta(html, prop)
      if (v === null || !v.trim()) { falla(ruta, 'compartir', `falta ${prop}`); continue }
      if (prop === 'og:url' && v !== DOMINIO + ruta) falla(ruta, 'compartir', `og:url es ${v} y debería ser ${DOMINIO + ruta}`)
      if (prop === 'og:image') {
        const rel = v.startsWith(DOMINIO) ? v.slice(DOMINIO.length) : v
        if (rel.startsWith('/')) {
          const f = resolve(RAIZ, rel.slice(1).split('?')[0])
          if (!existsSync(f)) falla(ruta, 'compartir', `og:image apunta a ${rel} y ese archivo no está en out/`)
          else if (statSync(f).size < 1024) falla(ruta, 'compartir', `og:image ${rel} pesa ${statSync(f).size} bytes: está rota`)
        }
      }
    }
  }

  // 5. JSON-LD
  for (const m of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const j = JSON.parse(m[1])
      const nodos = Array.isArray(j) ? j : (j['@graph'] || [j])
      for (const n of nodos) {
        if (!n['@type']) falla(ruta, 'datos-estructurados', 'un nodo del JSON-LD no tiene @type')
        for (const [k, v] of Object.entries(n)) if (v === '' || v === null) aviso(ruta, 'datos-estructurados', `${n['@type']}.${k} viene vacío`)
      }
    } catch (e) { falla(ruta, 'datos-estructurados', `JSON-LD no parsea: ${e.message}`) }
  }

  // 6. encabezados
  const hs = [...cuerpo.matchAll(/<h([1-6])[\s>]/gi)].map(m => Number(m[1]))
  const h1 = hs.filter(n => n === 1).length
  if (h1 === 0) falla(ruta, 'encabezados', 'no hay <h1>')
  else if (h1 > 1) falla(ruta, 'encabezados', `${h1} elementos <h1>, debe haber uno`)
  for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) falla(ruta, 'encabezados', `salta de h${hs[i - 1]} a h${hs[i]} sin pasar por el nivel del medio`)

  // 7. imágenes
  for (const m of cuerpo.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0]
    const src = (tag.match(/src="([^"]*)"/i) || [])[1] || '(sin src)'
    if (!/\salt="/i.test(tag)) falla(ruta, 'imagenes', `<img> sin alt: ${src}`)
    if (!/\swidth="/i.test(tag) || !/\sheight="/i.test(tag)) falla(ruta, 'imagenes', `<img> sin width/height, empuja el diseño al cargar: ${src}`)
    if (src.startsWith('/') && !src.startsWith('//')) {
      const f = resolve(RAIZ, src.slice(1).split('?')[0])
      if (!existsSync(f)) falla(ruta, 'imagenes', `src apunta a ${src} y ese archivo no está en out/`)
    }
  }

  // 8. enlaces internos
  for (const m of cuerpo.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/gi)) {
    const href = m[1]
    if (!href) { falla(ruta, 'enlaces', 'un <a> tiene href vacío'); continue }
    if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) {
      if (/^mailto:/i.test(href) && !/^mailto:[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(href)) falla(ruta, 'enlaces', `mailto mal formado: ${href}`)
      continue
    }
    const limpio = href.split('#')[0].split('?')[0]
    if (!limpio) continue
    const abs = limpio.startsWith('/') ? limpio : posix.normalize(posix.join(dirname(ruta).split('\\').join('/'), limpio))
    if (rutasExistentes.has(abs)) continue
    if (existsSync(resolve(RAIZ, abs.slice(1)))) continue
    if (!abs.endsWith('/') && rutasExistentes.has(abs + '/')) { falla(ruta, 'enlaces', `${href} le falta la barra final: es una redirección, no un acierto`); continue }
    falla(ruta, 'enlaces', `${href} no existe en out/`)
  }

  // 9. ids repetidos y aria colgando
  const ids = [...cuerpo.matchAll(/\sid="([^"]+)"/gi)].map(m => m[1])
  const vistos = new Set(), repes = new Set()
  for (const i of ids) { if (vistos.has(i)) repes.add(i); vistos.add(i) }
  for (const i of repes) falla(ruta, 'ids', `id="${i}" aparece más de una vez: aria y las anclas apuntan solo al primero`)
  for (const attr of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
    for (const m of cuerpo.matchAll(new RegExp(`\\s${attr}="([^"]+)"`, 'gi')))
      for (const ref of m[1].trim().split(/\s+/))
        if (!vistos.has(ref)) falla(ruta, 'aria', `${attr}="${ref}" no apunta a ningún id de la página`)
  }

  // 10. idioma
  const lang = (html.match(/<html[^>]+lang="([^"]*)"/i) || [])[1]
  if (!lang) falla(ruta, 'idioma', '<html> no declara lang')
  else if (!/^es(-|$)/i.test(lang)) falla(ruta, 'idioma', `lang="${lang}" y el sitio está en español`)
}

// --- 11. sitemap ---
const fSitemap = resolve(RAIZ, 'sitemap.xml')
if (!existsSync(fSitemap)) falla('/', 'sitemap', 'no hay sitemap.xml en out/')
else {
  const xml = readFileSync(fSitemap, 'utf8')
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
  if (!urls.length) falla('/', 'sitemap', 'el sitemap no lista ninguna URL')
  const enSitemap = new Set()
  for (const u of urls) {
    if (!u.startsWith(DOMINIO)) { falla('/', 'sitemap', `${u} no está en ${DOMINIO}`); continue }
    const r = u.slice(DOMINIO.length) || '/'
    enSitemap.add(r)
    if (!rutasExistentes.has(r)) falla('/', 'sitemap', `lista ${r} y esa página no existe en out/`)
  }
  for (const r of rutasExistentes) if (r !== '/404.html' && r !== '/404/' && !enSitemap.has(r)) falla(r, 'sitemap', 'la página existe y no está en el sitemap')
}

// --- 12. robots ---
const fRobots = resolve(RAIZ, 'robots.txt')
if (!existsSync(fRobots)) falla('/', 'robots', 'no hay robots.txt en out/')
else {
  const txt = readFileSync(fRobots, 'utf8')
  if (/^\s*Disallow:\s*\/\s*$/im.test(txt)) falla('/', 'robots', 'tiene "Disallow: /": esconde el sitio entero de los buscadores')
  if (!/sitemap:/i.test(txt)) aviso('/', 'robots', 'no menciona el sitemap')
}

// Next exporta la pantalla de error dos veces: 404.html, que es la que sirve
// Cloudflare, y 404/index.html, que queda como una URL normal que responde 200.
// A esa no se le piden canonica ni sitemap: se reporta el duplicado y basta.
if (rutasExistentes.has('/404/')) falla('/404/', '404', 'la pantalla de error tambien se exporta como /404/, que responde 200 y es indexable')

// --- 13. la 404 existe y es una página de verdad ---
if (!rutasExistentes.has('/404.html')) falla('/', '404', 'no hay 404.html en out/')
else { const h = paginas.find(p => p.ruta === '/404.html').html
  if (!h.includes('site-header')) falla('/404.html', '404', 'la página de error no trae la cabecera del sitio') }

// --- 15. redirecciones ---
// Cloudflare Pages resuelve _redirects de arriba abajo y gana la PRIMERA
// coincidencia. Una regla comodin puesta antes de una especifica deja a la
// especifica muerta sin avisar: el archivo ya cuenta que eso paso una vez con
// /soluciones/* tapando las variantes sin barra. Esto lo comprueba solo.
const fRed = resolve(RAIZ, '_redirects')
if (existsSync(fRed)) {
  const reglas = readFileSync(fRed, 'utf8').split('\n')
    .map((l, i) => ({ n: i + 1, t: l.trim() }))
    .filter(r => r.t && !r.t.startsWith('#'))
    .map(r => { const [de, a, cod] = r.t.split(/\s+/); return { ...r, de, a, cod: cod || '302' } })
  // Una regla queda muerta solo si otra ANTERIOR se lleva todo lo que ella
  // atendería. Ojo: que la anterior cubra el caso vacío de un comodín no basta.
  // /soluciones/ antes de /soluciones/* no mata a la segunda: la primera atiende
  // /soluciones/ y la segunda sigue atendiendo /soluciones/lo-que-sea. Un comodín
  // solo lo mata otro comodín cuyo prefijo sea prefijo del suyo.
  const tapa = (antes, despues) => {
    const anchoAntes = antes.endsWith('*'), anchoDespues = despues.endsWith('*')
    const pAntes = anchoAntes ? antes.slice(0, -1) : antes
    const pDespues = anchoDespues ? despues.slice(0, -1) : despues
    if (anchoDespues) return anchoAntes && pDespues.startsWith(pAntes)
    return anchoAntes ? pDespues.startsWith(pAntes) : pAntes === pDespues
  }
  for (let i = 0; i < reglas.length; i++) {
    const r = reglas[i]
    for (let j = 0; j < i; j++) {
      if (reglas[j].de === r.de) continue
      if (tapa(reglas[j].de, r.de)) {
        falla('/_redirects', 'redirecciones', `la linea ${r.n} (${r.de}) nunca se aplica: la ${reglas[j].n} (${reglas[j].de}) ya la cubre y gana la primera`)
        break
      }
    }
    if (!r.a || !r.a.startsWith('/') || r.a.includes(':splat')) continue
    const destino = r.a.split('#')[0].split('?')[0]
    if (rutasExistentes.has(destino)) continue
    if (existsSync(resolve(RAIZ, destino.slice(1)))) continue
    falla('/_redirects', 'redirecciones', `la linea ${r.n} manda a ${destino} y esa pagina no existe en out/`)
  }
  for (const r of reglas) if (r.cod.startsWith('3') && rutasExistentes.has(r.de))
    aviso('/_redirects', 'redirecciones', `la linea ${r.n} redirige ${r.de}, que ademas existe como pagina en out/`)
} else aviso('/', 'redirecciones', 'no hay _redirects en out/')

// --- 14. nada de rastros de desarrollo ---
for (const p of paginas) {
  for (const [re, que] of [[/localhost:\d+/g, 'una URL de localhost'], [/TODO:|FIXME:/g, 'un TODO o FIXME'], [/lorem ipsum/gi, 'texto de relleno']]) {
    const m = p.html.match(re); if (m) falla(p.ruta, 'rastros', `quedó ${que} en el HTML: ${m[0]}`)
  }
}

// --- informe ---
const porCriterio = {}
for (const f of fallas) porCriterio[f.criterio] = (porCriterio[f.criterio] || 0) + 1
console.log(`\n=== HTML CONSTRUIDO: ${paginas.length} páginas, ${fallas.length} fallas, ${avisos.length} avisos ===\n`)
if (fallas.length) {
  console.log('FALLAS')
  const porRuta = {}
  for (const f of fallas) (porRuta[f.ruta] ||= []).push(f)
  for (const [r, fs] of Object.entries(porRuta)) {
    console.log(`\n  ${r}`)
    for (const f of fs.slice(0, 12)) console.log(`    [${f.criterio}] ${f.detalle}`)
    if (fs.length > 12) console.log(`    ... y ${fs.length - 12} más`)
  }
  console.log('\n  por criterio: ' + Object.entries(porCriterio).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c} ${n}`).join(', '))
}
if (avisos.length) {
  console.log('\nAVISOS (no hacen fallar)')
  for (const a of avisos.slice(0, 25)) console.log(`  ${a.ruta} [${a.criterio}] ${a.detalle}`)
  if (avisos.length > 25) console.log(`  ... y ${avisos.length - 25} más`)
}
if (!fallas.length) console.log('Los quince criterios pasan.')
if (JSON_SALIDA) { writeFileSync(JSON_SALIDA, JSON.stringify({ paginas: paginas.length, fallas, avisos }, null, 2)); console.log(`\ncrudo en ${JSON_SALIDA}`) }
process.exit(fallas.length ? 1 : 0)
