// Quita de app/globals.css las reglas de un lote, por línea y selector, y
// limpia lo que queda hueco: @media vacíos y encabezados de sección sin reglas.
// No decide nada: el lote lo arma condenar-css.mjs y lo revisa una persona.
//
//   node herramientas/podar-css.mjs <lote.json>            (ensayo: cuenta y no escribe)
//   node herramientas/podar-css.mjs <lote.json> --aplicar  (escribe globals.css)
//
//   node herramientas/podar-css.mjs reports/poda-css-2026-09-03/lotes/lote-01.json --aplicar
//   node herramientas/guardia-css.mjs && npm run build && node herramientas/servir.mjs out 3210
//
// El lote es {"reglas":[{"linea":N,"sel":"..."}]}. Cada regla se busca por su
// línea de inicio Y su selector: si el archivo cambió desde que se armó el lote
// (por ejemplo, porque otro lote ya se aplicó), las líneas ya no calzan y el
// podador se niega entero, sin escribir. Rearmar el lote es barato; deshacer
// una poda equivocada, no.
//
// Lo quitado queda en <lote>.quitado.css, con la línea original de cada regla,
// para poder leerlo, citarlo en el informe o volver a pegarlo.
//
// Trampas ya pagadas:
//  - una regla puede compartir línea con otra (varias en una línea): se borra
//    por posición, y solo se come el salto de línea si la línea quedó vacía.
//  - los @media anidados: al vaciar el de adentro puede vaciarse el de afuera;
//    se repite hasta que no cambie nada.
//  - los encabezados de sección son comentarios a columna cero con una línea en
//    blanco antes; se quitan solo cuando lo siguiente es otro encabezado igual
//    o el fin del archivo. Un comentario pegado a una regla que sobrevive se queda.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const LOTE = process.argv[2]
const APLICAR = process.argv.includes('--aplicar')
if (!LOTE) { console.log('uso: node herramientas/podar-css.mjs <lote.json> [--aplicar]'); process.exit(2) }
const FUENTE = resolve(dirname(fileURLToPath(import.meta.url)), '../app/globals.css')
const css = readFileSync(FUENTE, 'utf8')
const lote = JSON.parse(readFileSync(LOTE, 'utf8'))

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
      else { const r = { sel: p, linea: lineaDe(inicio), inicio, fin: -1 }; reglas.push(r); pila.push({ p, regla: r }) }
      prelude = ''; continue
    }
    if (c === '}') { const t = pila.pop(); if (t && t.regla) t.regla.fin = i; prelude = ''; continue }
    if (c === ';') { prelude = ''; continue }
    if (!prelude) { if (/\s/.test(c)) continue; inicio = i }
    prelude += c
  }
  return reglas
}
const normal = (sel) => sel.toLowerCase().replace(/\s*([>+~,])\s*/g, '$1').replace(/\s+/g, ' ').trim()

const reglas = reglasDe(css)
const porLinea = new Map(); for (const r of reglas) { if (!porLinea.has(r.linea)) porLinea.set(r.linea, []); porLinea.get(r.linea).push(r) }
const encontradas = [], perdidas = []
for (const q of lote.reglas) {
  const r = (porLinea.get(q.linea) || []).find(r => normal(r.sel) === normal(q.sel))
  if (r) encontradas.push(r); else perdidas.push(q)
}
if (perdidas.length) {
  console.log(`!! ${perdidas.length} de ${lote.reglas.length} reglas del lote no están donde el lote dice. No se escribe nada.`)
  perdidas.slice(0, 10).forEach(q => console.log(`   línea ${q.linea}: ${q.sel}`))
  process.exit(1)
}

// Borra rangos de atrás hacia adelante; si la línea queda en blanco, se la come entera.
let texto = css
const rangos = encontradas.map(r => [r.inicio, r.fin + 1]).sort((a, b) => b[0] - a[0])
const quitado = encontradas.slice().sort((a, b) => a.inicio - b.inicio).map(r => `/* línea ${r.linea} */\n${css.slice(r.inicio, r.fin + 1)}\n`).join('\n')
for (let [a, b] of rangos) {
  let ia = texto.lastIndexOf('\n', a - 1) + 1, ib = texto.indexOf('\n', b); if (ib === -1) ib = texto.length
  if (!texto.slice(ia, a).trim() && !texto.slice(b, ib).trim()) { a = ia; b = Math.min(ib + 1, texto.length) }
  texto = texto.slice(0, a) + texto.slice(b)
}
// @media (o cualquier @regla con bloque) que quedó vacía, hasta que no cambie nada.
let vacias = 0
for (;;) {
  const antes = texto
  texto = texto.replace(/^[ \t]*@[^{};\n]+\{\s*\}[ \t]*\n?/gm, () => { vacias++; return '' })
  if (texto === antes) break
}
// Encabezado de sección (comentario a columna cero tras línea en blanco) seguido
// solo de blanco y de otro encabezado o del fin.
let encabezados = 0
for (;;) {
  const antes = texto
  texto = texto.replace(/(^|\n)\n(\/\*[\s\S]*?\*\/)[ \t]*\n(?=\s*(\n\/\*|$))/g, (m, pre) => { encabezados++; return pre })
  if (texto === antes) break
}
texto = texto.replace(/\n{4,}/g, '\n\n\n')

const lineas = (t) => t.split('\n').length
console.log(`${APLICAR ? 'PODADO' : 'ENSAYO'}: ${encontradas.length} reglas del lote ${LOTE}`)
console.log(`  líneas ${lineas(css)} → ${lineas(texto)}   bytes ${css.length} → ${texto.length}`)
console.log(`  @reglas vaciadas ${vacias}   encabezados sin sección ${encabezados}`)
if (APLICAR) {
  writeFileSync(FUENTE, texto)
  writeFileSync(LOTE.replace(/\.json$/, '') + '.quitado.css', quitado)
  console.log(`  escrito ${FUENTE} y ${LOTE.replace(/\.json$/, '')}.quitado.css`)
}
