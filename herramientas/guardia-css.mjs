// La regla de la casa, hecha comprobable.
//
// globals.css llego a 20.119 lineas y 46 !important porque cada arreglo se
// hacia agregando una regla nueva al final en vez de editar la que ya estaba.
// Este script no opina sobre estilo ni sobre como se escribe CSS: cuenta las
// cinco marcas que deja esa costumbre y las compara con una linea base. Si
// aparece una marca nueva, falla y dice cual.
//
//   node herramientas/guardia-css.mjs           compara contra la linea base
//   node herramientas/guardia-css.mjs --fijar   vuelve a fijar la linea base
//
// La linea base (herramientas/guardia-css.json) es la lista de las deudas que
// YA tenemos: no es una lista de cosas correctas, es lo que todavia esta mal y
// hoy no se arregla. Cuando una se arregla, el script avisa que la linea base
// quedo grande y hay que volver a fijarla con --fijar. Asi el numero solo
// puede bajar.
//
// Sin dependencias a proposito: todo lo que entre en package.json lo instala
// Cloudflare en cada build.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CSS = resolve(RAIZ, 'app/globals.css')
const BASE = resolve(RAIZ, 'herramientas/guardia-css.json')
const FIJAR = process.argv.includes('--fijar')

// El corte: la ultima linea del archivo. Debajo no va nada. Quien abra
// globals.css y se vaya al final se lo encuentra escrito ahi mismo.
const CORTE = 'GUARDIA-CSS: aca se termina la hoja'

// --- Lectura ---------------------------------------------------------------
// Los comentarios se reemplazan por espacios y el contenido de las comillas
// por equis, conservando los saltos de linea: asi las llaves, los !important
// y los var() que viven dentro de un texto no se cuentan, y los numeros de
// linea siguen siendo los del archivo de verdad.
function enmascarar(css) {
  let out = ''
  let i = 0
  while (i < css.length) {
    const c = css[i]
    if (c === '/' && css[i + 1] === '*') {
      const fin = css.indexOf('*/', i + 2)
      const trozo = css.slice(i, fin === -1 ? css.length : fin + 2)
      out += trozo.replace(/[^\n]/g, ' ')
      i += trozo.length
      continue
    }
    if (c === '"' || c === "'") {
      let j = i + 1
      while (j < css.length && css[j] !== c) { if (css[j] === '\\') j++; j++ }
      out += c + css.slice(i + 1, j).replace(/[^\n]/g, 'x') + (css[j] || '')
      i = j + 1
      continue
    }
    out += c
    i++
  }
  return out
}

const bruto = readFileSync(CSS, 'utf8')
const m = enmascarar(bruto)

const saltos = []
for (let i = 0; i < m.length; i++) if (m[i] === '\n') saltos.push(i)
function lineaDe(pos) {
  let a = 0, b = saltos.length
  while (a < b) { const med = (a + b) >> 1; if (saltos[med] < pos) a = med + 1; else b = med }
  return a + 1
}

// --- El recorrido ----------------------------------------------------------
// Un paseo por las llaves, sin arbol ni gramatica: alcanza para saber que
// preludio abre cada bloque y dentro de que at-rules esta.
const esKeyframes = (p) => /^@(-\w+-)?keyframes\b/i.test(p)
const reglas = []
const keyframes = []
const pila = []
let prelude = ''
let inicio = 0

for (let i = 0; i < m.length; i++) {
  const c = m[i]
  if (c === '{') {
    const p = prelude.trim().replace(/\s+/g, ' ')
    if (p.startsWith('@')) {
      if (esKeyframes(p)) keyframes.push({ nombre: p.replace(/^@(-\w+-)?keyframes\s+/i, '').trim(), linea: lineaDe(inicio) })
      pila.push(p)
    } else if (pila.some(esKeyframes)) {
      pila.push('%') // 0%, from, to: no es un selector
    } else {
      reglas.push({ sel: p, ctx: pila.filter((x) => x !== '%').join(' | '), linea: lineaDe(inicio) })
      pila.push(p)
    }
    prelude = ''
    continue
  }
  if (c === '}') { pila.pop(); prelude = ''; continue }
  if (c === ';') { prelude = ''; continue }
  if (!prelude) { if (/\s/.test(c)) continue; inicio = i }
  prelude += c
}

// --- Las cinco marcas ------------------------------------------------------
const normal = (s) => s.trim().replace(/\s+/g, ' ').replace(/\s*([>+~])\s*/g, ' $1 ')

// Una lista de selectores se parte en comas, pero no en las comas que estan
// dentro de un :is(), un :not() o un [attr="a,b"].
function partir(lista) {
  const partes = []
  let hondo = 0, act = ''
  for (const c of lista) {
    if (c === '(' || c === '[') hondo++
    else if (c === ')' || c === ']') hondo--
    if (c === ',' && hondo === 0) { partes.push(act); act = '' } else act += c
  }
  partes.push(act)
  return partes.map(normal).filter(Boolean)
}

// 1. El mismo selector con dos reglas en el mismo contexto. Es la huella
//    exacta de "lo arreglo agregando otra regla" en vez de editar la que ya
//    estaba. No se juzga que hace cada una: se marca que son dos.
const porClave = new Map()
for (const r of reglas) {
  for (const sel of partir(r.sel)) {
    const clave = r.ctx ? r.ctx + ' >> ' + sel : sel
    if (!porClave.has(clave)) porClave.set(clave, [])
    porClave.get(clave).push(r.linea)
  }
}
// La cuenta importa: si .button ya tenia tres reglas, una cuarta tiene que
// avisar igual. Por eso la linea base guarda cuantas son y no solo el nombre.
const duplicados = [...porClave.entries()].filter(([, l]) => l.length > 1)
  .map(([clave, l]) => ({ clave, lineas: l, cuenta: l.length }))
  .sort((a, b) => a.lineas[0] - b.lineas[0])

// 2. Los !important. El numero no sube.
const importantes = [...m.matchAll(/!\s*important/gi)].map((x) => lineaDe(x.index))

// 3. Dos @keyframes con el mismo nombre. Gana el ultimo y el otro es una
//    trampa: el que edite el de arriba no va a ver ningun cambio.
const nombres = new Map()
for (const k of keyframes) {
  if (!nombres.has(k.nombre)) nombres.set(k.nombre, [])
  nombres.get(k.nombre).push(k.linea)
}
const keyframesDobles = [...nombres.entries()].filter(([, l]) => l.length > 1)
  .map(([n, l]) => ({ clave: n, lineas: l, cuenta: l.length }))

// 4. @keyframes que no usa nadie. Se busca el nombre como palabra en todo el
//    archivo: si solo aparece en su propia definicion, esta huerfano. Es una
//    cuenta conservadora a proposito -si el nombre coincide con una clase, no
//    lo marca- porque una falsa alarma vuelve inservible a la guardia.
const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const keyframesSolos = [...nombres.entries()].filter(([n, l]) => {
  const veces = (m.match(new RegExp('(^|[^\\w-])' + escapar(n) + '(?![\\w-])', 'g')) || []).length
  return veces <= l.length
}).map(([n, l]) => ({ clave: n, lineas: l }))

// 5. var(--x) sin ningun --x: que la defina. Asi es como .unify-channel i
//    quedo pidiendo un --signal-deep que no existe en ningun lado.
//    Hay variables que el CSS no declara nunca porque se las pone el JSX en
//    un style={{ '--i': 3 }} -el retardo de cada tarjeta, el tamano del logo,
//    las coordenadas del mapa-. Por eso tambien se miran los .tsx: si el
//    nombre aparece entre comillas ahi, esta definida y no es un error.
function fuentes(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue
    const p = resolve(dir, e.name)
    if (e.isDirectory()) fuentes(p, acc)
    else if (/\.(tsx?|jsx?)$/.test(e.name)) acc.push(p)
  }
  return acc
}
const definidas = new Set([...m.matchAll(/(?:^|[;{\s])(--[\w-]+)\s*:/g)].map((x) => x[1]))
for (const f of ['app', 'components', 'lib'].flatMap((d) => fuentes(resolve(RAIZ, d)))) {
  for (const x of readFileSync(f, 'utf8').matchAll(/['"`](--[\w-]+)['"`]/g)) definidas.add(x[1])
}
const usadas = new Map()
for (const x of m.matchAll(/var\(\s*(--[\w-]+)/g)) {
  if (definidas.has(x[1])) continue
  if (!usadas.has(x[1])) usadas.set(x[1], [])
  usadas.get(x[1]).push(lineaDe(x.index))
}
const sinDefinir = [...usadas.entries()].map(([n, l]) => ({ clave: n, lineas: l.slice(0, 4) }))

// 6. El corte. Debajo de la marca no va nada.
const pos = bruto.indexOf(CORTE)
const cola = []
if (pos === -1) {
  cola.push({ clave: 'falta la marca del corte al final del archivo', lineas: [] })
} else {
  const cierra = bruto.indexOf('*/', pos)
  const resto = bruto.slice(cierra === -1 ? pos + CORTE.length : cierra + 2)
  if (resto.trim()) cola.push({ clave: 'hay ' + resto.trim().split('\n').length + ' linea(s) debajo del corte', lineas: [lineaDe(cierra + 2)] })
}

// --- El veredicto ----------------------------------------------------------
const MARCAS = [
  ['duplicados', 'mismo selector, dos reglas', duplicados],
  ['keyframesDobles', 'dos @keyframes, un nombre', keyframesDobles],
  ['keyframesSolos', '@keyframes que no usa nadie', keyframesSolos],
  ['sinDefinir', 'var() sin definir', sinDefinir],
  ['cola', 'reglas debajo del corte', cola],
]

// Cada marca se guarda como nombre -> cuantas veces. Las que no tienen nada
// que contar -un var() sin definir, la cola- valen 1: o esta o no esta.
const hoy = { important: importantes.length }
for (const [id, , lista] of MARCAS) {
  hoy[id] = Object.fromEntries(lista.map((x) => [x.clave, x.cuenta || 1]).sort((a, b) => (a[0] < b[0] ? -1 : 1)))
}

if (FIJAR) {
  writeFileSync(BASE, JSON.stringify({
    lee: 'Las deudas que app/globals.css ya tiene. Esta lista solo puede achicarse. La reescribe: node herramientas/guardia-css.mjs --fijar',
    lineas: bruto.split('\n').length,
    ...hoy,
  }, null, 2) + '\n')
  console.log('Linea base fijada en herramientas/guardia-css.json')
  for (const [id, texto, lista] of MARCAS) console.log(`  ${texto.padEnd(30)} ${String(lista.length).padStart(4)}`)
  console.log(`  ${'!important'.padEnd(30)} ${String(importantes.length).padStart(4)}`)
  process.exit(0)
}

let base
try { base = JSON.parse(readFileSync(BASE, 'utf8')) } catch {
  console.log('No hay linea base. Fijala una sola vez:\n  node herramientas/guardia-css.mjs --fijar')
  process.exit(2)
}

let falla = 0
let sobra = 0

for (const [id, texto, lista] of MARCAS) {
  const antes = base[id] || {}
  const peor = lista.filter((x) => (x.cuenta || 1) > (antes[x.clave] || 0))
  const idas = Object.keys(antes).filter((c) => (hoy[id][c] || 0) < antes[c])
  if (peor.length) {
    falla += peor.length
    console.log(`\n### ${texto}: ${peor.length} sin permiso`)
    for (const x of peor.slice(0, 12)) {
      const habia = antes[x.clave] || 0
      console.log(`  linea ${x.lineas.slice(0, 5).join(', ') || '?'}: ${x.clave}` + (habia ? ` (eran ${habia}, ahora son ${x.cuenta})` : ''))
    }
    if (peor.length > 12) console.log(`  ... y ${peor.length - 12} mas`)
  }
  sobra += idas.length
}

if (importantes.length > base.important) {
  const cuantos = importantes.length - base.important
  falla += cuantos
  console.log(`\n### !important: ${cuantos} de mas (eran ${base.important} y hay ${importantes.length})`)
  console.log(`  todas las lineas: ${importantes.join(', ')}`)
}
if (importantes.length < base.important) sobra += base.important - importantes.length

console.log('\n=== RESUMEN (app/globals.css, ' + bruto.split('\n').length + ' lineas) ===')
for (const [id, texto, lista] of MARCAS) {
  console.log(`  ${texto.padEnd(30)} ${String(lista.length).padStart(4)} / ${String(Object.keys(base[id] || {}).length).padStart(4)} en la linea base`)
}
console.log(`  ${'!important'.padEnd(30)} ${String(importantes.length).padStart(4)} / ${String(base.important).padStart(4)} en la linea base`)

if (falla) {
  console.log(`\nNO PASA: ${falla} marca(s) nueva(s). La regla es editar la regla que ya existe, no agregar otra.`)
  process.exit(1)
}
if (sobra) {
  console.log(`\nPASA, y ademas se limpiaron ${sobra} deuda(s) de la linea base. Fijala de nuevo para que no puedan volver:\n  node herramientas/guardia-css.mjs --fijar`)
  process.exit(0)
}
console.log('\nPASA: ninguna marca nueva.')
process.exit(0)
