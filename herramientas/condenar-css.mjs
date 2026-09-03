// Decide qué reglas de app/globals.css se pueden borrar, y arma los lotes.
// No mide nada: cruza lo que midió cobertura-css.mjs con dos sondeos estáticos.
//
//   node herramientas/condenar-css.mjs <salida> <cobertura.json> [más cobertura.json...]
//   node herramientas/condenar-css.mjs reports/poda-css-2026-09-03 D:/tmp/web-poda/cob-A/cobertura.json D:/tmp/web-poda/cob-B/cobertura.json D:/tmp/web-poda/cob-C/cobertura.json
//
// Una regla se CONDENA solo si pasa las cuatro pruebas a la vez:
//   1. el navegador nunca la aplicó, en ninguna ruta, ancho ni estado medido;
//   2. su selector sin pseudo-clases de estado nunca casó con ningún elemento
//      (así una regla :hover viva no se confunde con una muerta);
//   3. alguna de las clases que su selector EXIGE no aparece en ningún .tsx/.ts;
//   4. y esa misma clase tampoco aparece en ningún HTML de out/.
// Si falla la 3 o la 4 pero falla también la 1 y la 2, queda SOSPECHOSA: nadie
// la vio aplicarse, pero el marcado que necesita existe. Eso se revisa a mano,
// no se borra a ciegas: puede ser un estado que la medición no supo provocar.
//
// "Clase que el selector EXIGE": las que están fuera de :not(), :is() y :where().
// En `.a .b` hacen falta las dos, así que basta con que una sea huérfana para que
// la regla no pueda casar nunca. En `.a:not(.b)` solo hace falta .a: que .b esté
// muerta no mata la regla, la amplía. Y en `:is(.a, .b)` alcanza con que exista
// una de las dos, así que ninguna se exige.
//
// Las clases construidas por pedazos (`ad--${producto.id}`) no aparecen enteras
// en ningún fuente: se detecta el prefijo con la comilla y el ${ pegados, y se
// las da por vivas. La lista de LAS CONOCIDAS va abajo escrita a mano, salida
// del recorrido de components/ del 3-sep-2026, por si el detector falla.
//
// Deja en <salida>: condena.json (el veredicto de cada regla), LEEME.md (el
// resumen que se lee) y lotes/lote-NN.json para dárselos a podar-css.mjs. Los
// lotes agrupan por bloque BEM y cortan cerca de 50 clases: un bloque nunca
// queda partido entre dos lotes, porque se revisan de a uno.
//
// Trampas ya pagadas:
//  - out/ tiene que estar construido del MISMO commit que el CSS que se juzga:
//    si es viejo, una clase nueva parece huérfana. Se avisa comparando fechas.
//  - el minificador fusiona reglas vecinas con las mismas declaraciones, así que
//    una regla del build puede corresponder a varias del fuente; el veredicto se
//    arma por regla del FUENTE, juntando todas las del build que la nombran.
//  - una regla del fuente que ninguna corrida logró casar queda "sin datos" y no
//    se condena jamás.
import { readFileSync, readdirSync, mkdirSync, writeFileSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SALIDA = resolve(process.argv[2] || 'reports/poda-css')
const COBERTURAS = process.argv.slice(3)
if (!COBERTURAS.length) { console.log('uso: node herramientas/condenar-css.mjs <salida> <cobertura.json>...'); process.exit(2) }

// Clases que el código arma pegando pedazos, vistas al leer components/ el
// 3-sep-2026. El detector automático de prefijos debería encontrarlas solo;
// están acá para que un cambio en el detector no las condene por accidente.
const DINAMICAS_CONOCIDAS = [
  'brand-logo--', 'hero-logo--', 'ad--', 'repisa__ficha--', 'mu--', 'summary-orb--',
  'summary-platform--', 'summary-node--', 'summary-wire--', 'summary-circuit--',
  'summary-node-cluster--', 'concept-card--', 'connection-card--', 'service-flow--',
  'trabajo__logo--', 'carrusel-clientes__logo--', 'l2__punto--', 'esc__celda--',
  'esc__carta--', 'theme-',
]

function enmascarar(s) {
  let out = '', i = 0
  while (i < s.length) {
    const c = s[i]
    if (c === '/' && s[i + 1] === '*') { const f = s.indexOf('*/', i + 2); const t = s.slice(i, f === -1 ? s.length : f + 2); out += t.replace(/[^\n]/g, ' '); i += t.length; continue }
    if (c === '"' || c === "'") { let j = i + 1; while (j < s.length && s[j] !== c) { if (s[j] === '\\') j++; j++ } out += c + s.slice(i + 1, j).replace(/[^\n]/g, 'x') + (s[j] || ''); i = j + 1; continue }
    out += c; i++
  }
  return out
}
const esKf = (p) => /^@(-\w+-)?keyframes\b/i.test(p)
function reglasDe(texto) {
  const m = enmascarar(texto)
  const saltos = []; for (let i = 0; i < m.length; i++) if (m[i] === '\n') saltos.push(i)
  const lineaDe = (pos) => { let a = 0, b = saltos.length; while (a < b) { const md = (a + b) >> 1; if (saltos[md] < pos) a = md + 1; else b = md } return a + 1 }
  const reglas = []; const pila = []; let prelude = '', inicio = 0
  for (let i = 0; i < m.length; i++) {
    const c = m[i]
    if (c === '{') {
      const p = prelude.trim().replace(/\s+/g, ' ')
      if (p.startsWith('@')) pila.push({ p, regla: null })
      else if (pila.some(x => esKf(x.p))) pila.push({ p: '%', regla: null })
      else { const r = { sel: p, ctx: pila.filter(x => x.p !== '%').map(x => x.p).join(' | '), linea: lineaDe(inicio), inicio, fin: -1 }; reglas.push(r); pila.push({ p, regla: r }) }
      prelude = ''; continue
    }
    if (c === '}') { const t = pila.pop(); if (t && t.regla) t.regla.fin = i; prelude = ''; continue }
    if (c === ';') { prelude = ''; continue }
    if (!prelude) { if (/\s/.test(c)) continue; inicio = i }
    prelude += c
  }
  return reglas
}
const partes = (sel) => { const out = []; let n = 0, a = 0
  for (let i = 0; i < sel.length; i++) { const c = sel[i]; if (c === '(' || c === '[') n++; else if (c === ')' || c === ']') n--; else if (c === ',' && !n) { out.push(sel.slice(a, i)); a = i + 1 } }
  out.push(sel.slice(a)); return out }
// Quita el contenido de :not(), :is(), :where() y de [attr=...] antes de leer las
// clases: lo de adentro no es obligatorio para que el selector case.
const quitarOpcionales = (s) => { let t = s, antes
  do { antes = t; t = t.replace(/:(not|is|where|has)\([^()]*\)/g, '') } while (t !== antes)
  return t.replace(/\[[^\]]*\]/g, '') }
const clasesExigidas = (sel) => [...new Set([...quitarOpcionales(sel).matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(x => x[1]))]
const todasLasClases = (sel) => [...new Set([...sel.replace(/\[[^\]]*\]/g, '').matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(x => x[1]))]

// --- fuentes y HTML construido ---
function archivos(dir, re, acc = []) {
  if (!existsSync(dir)) return acc
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue
    const p = resolve(dir, e.name)
    if (e.isDirectory()) archivos(p, re, acc); else if (re.test(e.name)) acc.push(p)
  }
  return acc
}
const fuentes = ['app', 'components', 'lib'].flatMap(d => archivos(resolve(RAIZ, d), /\.(tsx?|jsx?|mjs)$/))
const src = fuentes.map(f => readFileSync(f, 'utf8')).join('\n')
const html = archivos(resolve(RAIZ, 'out'), /\.html$/)
const clasesHtml = new Set()
for (const f of html) for (const m of readFileSync(f, 'utf8').matchAll(/class="([^"]*)"/g)) for (const c of m[1].trim().split(/\s+/)) if (c) clasesHtml.add(c)
const cssFecha = statSync(resolve(RAIZ, 'app/globals.css')).mtime
const outFecha = html.length ? new Date(Math.max(...html.map(f => statSync(f).mtimeMs))) : null
const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const enFuentes = (c) => new RegExp('(^|[^\\w-])' + escapar(c) + '(?![\\w-])').test(src)
const esDinamica = (c) => {
  if (DINAMICAS_CONOCIDAS.some(p => c.startsWith(p) && c.length > p.length)) return true
  const ps = c.split(/(?=__|--)/)
  for (let k = ps.length - 1; k >= 1; k--) {
    const cabeza = ps.slice(0, k).join('')
    const pre = cabeza + (c.slice(cabeza.length).startsWith('__') ? '__' : '--')
    if (new RegExp('[\'"`]' + escapar(pre) + '(\\$\\{|[\'"`])').test(src)) return true
  }
  return false
}
const cache = new Map()
const viva = (c) => { if (cache.has(c)) return cache.get(c)
  const v = clasesHtml.has(c) ? 'html' : enFuentes(c) ? 'fuente' : esDinamica(c) ? 'dinamica' : ''
  cache.set(c, v); return v }

// --- cobertura: por línea del fuente, ¿alguna corrida la vio usarse o casar? ---
const usada = new Map(), alcanzable = new Map(), conDatos = new Set()
let estados = 0, rutas = new Set()
for (const f of COBERTURAS) {
  const c = JSON.parse(readFileSync(f, 'utf8'))
  estados += (c.estados || []).length; (c.rutas || []).forEach(r => rutas.add(r))
  for (const r of c.reglas) for (const l of (r.lineas && r.lineas.length ? r.lineas : (r.linea ? [r.linea] : []))) {
    conDatos.add(l)
    if (r.usada.length) usada.set(l, (usada.get(l) || 0) + r.usada.length)
    if (r.alcanzable.length) alcanzable.set(l, (alcanzable.get(l) || 0) + r.alcanzable.length)
  }
}

// --- veredicto por regla del fuente ---
const reglas = reglasDe(readFileSync(resolve(RAIZ, 'app/globals.css'), 'utf8'))
const veredicto = []
for (const r of reglas) {
  const cs = todasLasClases(r.sel)
  const base = { linea: r.linea, sel: r.sel, ctx: r.ctx, clases: cs, bloque: cs.length ? cs[0].split(/__|--/)[0] : '' }
  if (!conDatos.has(r.linea)) { veredicto.push({ ...base, juicio: 'sin-datos', razon: 'ninguna corrida logró casarla con el build' }); continue }
  if (usada.get(r.linea)) { veredicto.push({ ...base, juicio: 'viva', razon: `aplicada en ${usada.get(r.linea)} estados` }); continue }
  if (alcanzable.get(r.linea)) { veredicto.push({ ...base, juicio: 'viva', razon: `sin aplicarse, pero su base casó en ${alcanzable.get(r.linea)} estados` }); continue }
  // Ni usada ni alcanzable: ahora el sondeo estático decide condena o sospecha.
  const muertas = []
  const todasMuertas = partes(r.sel).every(p => {
    const ex = clasesExigidas(p)
    const m = ex.filter(c => !viva(c))
    if (!m.length) return false
    muertas.push(...m); return true
  })
  if (todasMuertas) veredicto.push({ ...base, juicio: 'condenada', razon: `nunca vista; exige ${[...new Set(muertas)].join(', ')}, que no está en ningún fuente ni en out/` })
  else veredicto.push({ ...base, juicio: 'sospechosa', razon: 'nunca vista, pero el marcado que exige existe' })
}

const cuenta = (j) => veredicto.filter(v => v.juicio === j).length
const condenadas = veredicto.filter(v => v.juicio === 'condenada')
const sospechosas = veredicto.filter(v => v.juicio === 'sospechosa')

// --- lotes: por bloque BEM, sin partir un bloque, cerca de 50 clases por lote ---
const porBloque = new Map()
for (const v of condenadas) { const b = v.bloque || '(sin clase)'; if (!porBloque.has(b)) porBloque.set(b, []); porBloque.get(b).push(v) }
const bloques = [...porBloque.entries()].map(([b, rs]) => ({ b, rs, clases: new Set(rs.flatMap(r => r.clases)) }))
  .sort((a, b) => b.rs.length - a.rs.length)
const lotes = []; let actual = null
for (const bl of bloques) {
  if (!actual || actual.clases.size + bl.clases.size > 50) { actual = { bloques: [], reglas: [], clases: new Set() }; lotes.push(actual) }
  actual.bloques.push(bl.b); actual.reglas.push(...bl.rs); bl.clases.forEach(c => actual.clases.add(c))
}

mkdirSync(SALIDA + '/lotes', { recursive: true })
writeFileSync(SALIDA + '/condena.json', JSON.stringify({ estados, rutas: [...rutas], coberturas: COBERTURAS, veredicto }, null, 1))
lotes.forEach((L, i) => {
  const n = String(i + 1).padStart(2, '0')
  L.reglas.sort((a, b) => a.linea - b.linea)
  writeFileSync(`${SALIDA}/lotes/lote-${n}.json`, JSON.stringify({ lote: n, bloques: L.bloques, clases: [...L.clases].sort(), reglas: L.reglas.map(r => ({ linea: r.linea, sel: r.sel })) }, null, 1))
})

const kb = (n) => (n / 1024).toFixed(1)
const bytesCond = condenadas.reduce((a, v) => a + v.sel.length + 40, 0)
let md = `# Poda de CSS: veredicto\n\n`
md += `Cobertura: ${COBERTURAS.length} corridas, ${estados} tomas, ${rutas.size} rutas.\n`
md += `HTML construido leído: ${html.length} archivos, ${clasesHtml.size} clases distintas en atributos class.\n`
if (outFecha && outFecha < cssFecha) md += `\n**Aviso**: out/ es más viejo que app/globals.css (${outFecha.toISOString().slice(0, 16)} contra ${cssFecha.toISOString().slice(0, 16)}). Reconstruir antes de fiarse.\n`
md += `\n| veredicto | reglas |\n|---|---|\n`
md += `| viva | ${cuenta('viva')} |\n| condenada | ${condenadas.length} |\n| sospechosa | ${sospechosas.length} |\n| sin datos | ${cuenta('sin-datos')} |\n`
md += `\n${lotes.length} lotes en \`lotes/\`, de a ${lotes.map(l => l.clases.size).join(', ')} clases.\n\n## Bloques con reglas condenadas

No son bloques muertos enteros: es cuantas reglas de cada bloque cayeron sobre el total del bloque.\n\n`
const totalBloque = {}; for (const v of veredicto) if (v.bloque) totalBloque[v.bloque] = (totalBloque[v.bloque] || 0) + 1
md += bloques.slice(0, 40).map(b => `- \`${b.b}\`: ${b.rs.length} de ${totalBloque[b.b] || b.rs.length} reglas, ${b.clases.size} clases`).join('\n')
md += `\n\n## Sospechosas: nadie las vio, pero su marcado existe\n\nSe revisan a mano. No entran en ningún lote.\n\n`
md += sospechosas.slice(0, 60).map(v => `- línea ${v.linea} \`${v.sel.slice(0, 90)}\`${v.ctx ? ' en ' + v.ctx.slice(0, 40) : ''}`).join('\n') + '\n'
writeFileSync(SALIDA + '/LEEME.md', md)

console.log(`viva ${cuenta('viva')}   condenada ${condenadas.length}   sospechosa ${sospechosas.length}   sin datos ${cuenta('sin-datos')}`)
console.log(`${lotes.length} lotes (${lotes.map(l => l.clases.size).join(', ')} clases), ~${kb(bytesCond)} KB de selectores condenados`)
console.log(`veredicto en ${SALIDA}/condena.json, resumen en ${SALIDA}/LEEME.md`)
if (outFecha && outFecha < cssFecha) console.log('!! out/ es más viejo que app/globals.css: reconstruir antes de fiarse')
