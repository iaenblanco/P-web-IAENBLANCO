// Las cifras de los trabajos, contrastadas contra los sitios de verdad.
//
// lib/trabajos.ts publica diez numeros -la velocidad y el peso de los cinco
// sitios de clientes- y hasta hoy nadie los volvia a medir: envejecian en
// silencio. Es el mismo camino por el que hubo que podar doce frases que ya no
// se sostenian. Este script los lee del fuente y los va a comprobar al sitio
// publicado, para que la cifra tenga quien la contradiga.
//
//   node herramientas/medir-trabajos.mjs           mide y da el veredicto
//   node herramientas/medir-trabajos.mjs --fijar   guarda la linea base
//
// Ojo con QUE mide: cinco sitios AJENOS, por internet. No es el build propio ni
// una pagina servida en localhost, asi que la red del momento entra en la
// medicion. Por eso cada sitio se carga TRES veces y manda la mediana, y por
// eso los dos margenes son distintos:
//
//   velocidad  se juzga contra el techo publicado tal cual, sin margen extra,
//              porque el "menos de" que decimos YA es el margen.
//   peso       admite un 15% por encima de lo publicado: es una cifra exacta y
//              necesita banda. Un banner nuevo que subio el cliente no puede
//              ser una falla nuestra; que el sitio pese el doble, si.
//
// Cuando la realidad quedo mas de un 25% POR DEBAJO de lo publicado tampoco
// falla, pero avisa: la cifra se quedo corta y conviene bajarla.
//
// Codigos de salida, los mismos de la bateria: 1 si alguna cifra publicada ya
// no se sostiene, 2 si algun sitio no cargo (el codigo que verificar.mjs ya
// reserva para eso), 0 si todas se sostienen. Si pasan las dos cosas a la vez
// gana el 1: un sitio caido es un problema de la medicion, una cifra rota es un
// problema de lo que estamos publicando.
//
// Borra la carpeta temporal al terminar: cada pasada deja un perfil de Chrome
// de ~200 MB, y en Windows las rutas son tan largas que Remove-Item no puede
// con ellas (hay que vaciarlas antes con robocopy contra una carpeta vacia).
//
// Sin dependencias a proposito, como el resto de la bateria: habla CDP directo
// contra el Chrome del sistema, porque todo lo que entre en package.json lo
// instala Cloudflare en cada build.
import { spawn } from 'node:child_process'
import { setTimeout as espera } from 'node:timers/promises'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
// 9371 lo usa verificar.mjs y 9373 mirar-escenas.mjs: este es el hueco de en
// medio, para que las tres se puedan correr a la vez sin pelearse el puerto.
const PUERTO = 9372
const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FUENTE = resolve(RAIZ, 'lib/trabajos.ts')
const BASE = resolve(RAIZ, 'herramientas/medir-trabajos.json')
const FIJAR = process.argv.includes('--fijar')
const SALIDA = resolve(process.argv.slice(2).filter((a) => !a.startsWith('--'))[0] || '.tmp/medir')

const CARGAS = 3
const MARGEN_PESO = 1.15
const SOBRA = 0.75 // por debajo de esto la cifra publicada se quedo corta
const TOPE_CARGA = 30000 // mas de esto y el sitio cuenta como no cargado

// --- Lo que publicamos -----------------------------------------------------
// Se lee el fuente y no el modulo compilado: asi no hace falta construir el
// sitio ni arrastrar TypeScript. El bloque de cada trabajo no tiene llaves
// adentro, de modo que cada {...} del archivo es una entrada; la declaracion
// del type tambien cae en la red, pero sus campos no llevan comillas y se
// descarta sola al pedirle client, href, velocidad y peso.
const fuente = readFileSync(FUENTE, 'utf8')
const campo = (bloque, nombre) => (bloque.match(new RegExp(nombre + String.raw`:\s*['"]([^'"]*)['"]`)) || [])[1]
const publicados = [...fuente.matchAll(/\{([^{}]*)\}/g)]
  .map((m) => ({
    client: campo(m[1], 'client'),
    href: campo(m[1], 'href'),
    velocidad: campo(m[1], 'velocidad'),
    peso: campo(m[1], 'peso'),
  }))
  .filter((t) => t.client && t.href && t.velocidad && t.peso)

if (!publicados.length) {
  console.log('No se pudo leer ningun trabajo de lib/trabajos.ts. Cambio el formato del archivo?')
  process.exit(2)
}

// "menos de 1,5 s" -> 1500 ms con techo. "4,6 MB" -> bytes, sin techo.
// La coma decimal es la que se publica en castellano; el punto se acepta
// igual por si alguna vez alguien escribe 1.5.
const UNIDAD_TIEMPO = { ms: 1, s: 1000 }
// KB binario (1024). La diferencia con el KB de mil son 2,4 puntos, muy por
// dentro de la banda del 15%, asi que la eleccion no cambia ningun veredicto.
const UNIDAD_PESO = { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 ** 3 }
function cifra(texto, unidades) {
  const m = String(texto).trim().match(/^(menos de\s+)?([\d.,]+)\s*([a-z]+)$/i)
  if (!m) return null
  const u = unidades[m[3].toLowerCase()]
  if (!u) return null
  return { valor: Number(m[2].replace(',', '.')) * u, techo: Boolean(m[1]), texto }
}

const comoTiempo = (ms) => (ms >= 1000 ? (ms / 1000).toFixed(2).replace('.', ',') + ' s' : Math.round(ms) + ' ms')
const comoPeso = (b) => (b >= 1024 * 1024 ? (b / 1024 / 1024).toFixed(2).replace('.', ',') + ' MB' : Math.round(b / 1024) + ' KB')
// Mediana de verdad: con tres cargas es la del medio, pero si una se cayo y
// quedaron dos, promediar las dos es mas honesto que quedarse con la peor.
const mediana = (xs) => {
  const o = [...xs].sort((a, b) => a - b)
  const m = Math.floor(o.length / 2)
  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2
}

// --- Chrome ----------------------------------------------------------------
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PUERTO}`, '--window-size=1440,900',
  '--user-data-dir=' + SALIDA + '/perfil', 'about:blank'], { stdio: 'ignore' })

async function esperar() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PUERTO}/json/version`); if (r.ok) return (await r.json()).webSocketDebuggerUrl } catch {}
    await espera(500)
  }
  throw new Error('no arranca')
}
class S {
  constructor(ws) { this.ws = ws; this.id = 0; this.p = new Map(); this.oyentes = new Map()
    ws.addEventListener('message', e => { const m = JSON.parse(e.data)
      // Aca los eventos si importan, a diferencia de verificar.mjs: el peso
      // real solo llega por Network.loadingFinished, uno por cada recurso.
      if (m.method) { (this.oyentes.get(m.method) || []).forEach(f => f(m.params)); return }
      if (m.id && this.p.has(m.id)) { const { ok, mal } = this.p.get(m.id); this.p.delete(m.id); m.error ? mal(new Error(JSON.stringify(m.error))) : ok(m.result) } }) }
  e(method, params = {}, sid) { const id = ++this.id; return new Promise((ok, mal) => { this.p.set(id, { ok, mal })
    this.ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) }))
    setTimeout(() => { if (this.p.has(id)) { this.p.delete(id); mal(new Error('timeout ' + method)) } }, 60000) }) }
  al(method, f) { if (!this.oyentes.has(method)) this.oyentes.set(method, []); this.oyentes.get(method).push(f) }
}

const ESTADO = String.raw`
(() => {
  const n = performance.getEntriesByType('navigation')[0];
  return {
    fin: n ? n.loadEventEnd : 0,
    error: document.body ? document.body.className.includes('neterror') : true,
    titulo: document.title,
    alto: document.body ? document.body.scrollHeight : 0,
  };
})()
`

const ws = new WebSocket(await esperar())
await new Promise(ok => ws.addEventListener('open', ok))
const s = new S(ws)
const { targetId } = await s.e('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await s.e('Target.attachToTarget', { targetId, flatten: true })
await s.e('Page.enable', {}, sessionId)
await s.e('Runtime.enable', {}, sessionId)
await s.e('Network.enable', {}, sessionId)

// La bolsa de la carga en curso. Los oyentes se registran una sola vez -si se
// registraran por carga se irian apilando- y escriben siempre en la bolsa
// vigente. Se deja de sumar en cuanto llega el evento load: lo que baje
// despues ya no es lo que el visitante espero para ver la pagina.
let bolsa = null
s.al('Network.loadingFinished', (p) => { if (bolsa && !bolsa.cerrada) bolsa.bytes += p.encodedDataLength || 0 })
s.al('Page.loadEventFired', () => { if (bolsa && !bolsa.cerrada) { bolsa.cerrada = true; bolsa.avisar() } })

async function unaCarga(url) {
  const mia = { bytes: 0, cerrada: false, avisar: () => {} }
  const cargo = new Promise((ok) => { mia.avisar = ok })
  bolsa = mia
  // Sin cache: la segunda y la tercera carga medirian un peso que ningun
  // visitante nuevo llega a pagar.
  await s.e('Network.setCacheDisabled', { cacheDisabled: true }, sessionId)
  const nav = await s.e('Page.navigate', { url }, sessionId).catch((e) => ({ errorText: String(e.message) }))
  if (nav.errorText) { mia.cerrada = true; return { fallo: nav.errorText } }
  const aTiempo = await Promise.race([cargo.then(() => true), espera(TOPE_CARGA).then(() => false)])
  mia.cerrada = true
  if (!aTiempo) return { fallo: 'no termino de cargar en ' + TOPE_CARGA / 1000 + ' s' }
  // Un respiro para que loadEventEnd quede escrito: leido en el mismo instante
  // del evento todavia vale 0.
  await espera(250)
  const est = (await s.e('Runtime.evaluate', { expression: ESTADO, returnByValue: true }, sessionId)).result.value
  if (est.error || !est.alto) return { fallo: 'Chrome pinto su pagina de error (' + (est.titulo || 'sin titulo') + ')' }
  if (!est.fin) return { fallo: 'el navegador no reporto loadEventEnd' }
  return { ms: est.fin, bytes: mia.bytes }
}

// --- La medicion -----------------------------------------------------------
const medidos = []
for (const t of publicados) {
  const buenas = []
  const fallos = []
  for (let i = 0; i < CARGAS; i++) {
    const r = await unaCarga(t.href)
    r.fallo ? fallos.push(r.fallo) : buenas.push(r)
    // about:blank entre carga y carga: si no, la siguiente hereda las
    // conexiones ya abiertas y mide mas rapido de lo que mide un visitante.
    await s.e('Page.navigate', { url: 'about:blank' }, sessionId)
    await espera(400)
  }
  medidos.push({
    ...t,
    buenas,
    fallos,
    ms: buenas.length ? mediana(buenas.map((b) => b.ms)) : null,
    bytes: buenas.length ? mediana(buenas.map((b) => b.bytes)) : null,
  })
}
ws.close(); chrome.kill()

// --- La linea base ---------------------------------------------------------
// No juzga nada: guarda lo que se midio hoy. Sirve para distinguir "el cliente
// engordo su sitio" de "hoy la red anda mal": si la cifra publicada se rompe
// pero TODOS los sitios empeoraron parejo contra la linea base, es la red. Sin
// linea base el script mide igual, solo pierde esa distincion.
if (FIJAR) {
  const sitios = {}
  for (const m of medidos) if (m.ms !== null) sitios[m.client] = { peso: Math.round(m.bytes), velocidad: Math.round(m.ms) }
  writeFileSync(BASE, JSON.stringify({
    lee: 'Lo que midieron los sitios de clientes el dia que se fijo. No es lo que publicamos: es la referencia para saber si una falla es del sitio o de la red. La reescribe: node herramientas/medir-trabajos.mjs --fijar',
    fecha: new Date().toISOString().slice(0, 10),
    cargas: CARGAS,
    sitios,
  }, null, 2) + '\n')
  console.log('Linea base fijada en herramientas/medir-trabajos.json')
  for (const m of medidos) {
    console.log(`  ${m.client.padEnd(24)} ${m.ms === null ? 'NO CARGO' : comoTiempo(m.ms).padStart(9) + '  ' + comoPeso(m.bytes).padStart(9)}`)
  }
  process.exit(0)
}

let base = null
try { base = JSON.parse(readFileSync(BASE, 'utf8')) } catch {}

// --- El veredicto ----------------------------------------------------------
const fallas = []
const avisos = []
const noCargaron = []
let cifras = 0

for (const m of medidos) {
  console.log(`\n### ${m.client}  ${m.href}`)
  if (m.ms === null) {
    noCargaron.push(m)
    console.log(`  NO CARGO en ${CARGAS} intentos: ${m.fallos[0]}`)
    continue
  }
  if (m.fallos.length) console.log(`  (solo ${m.buenas.length} de ${CARGAS} cargas: ${m.fallos[0]})`)

  const juzgar = (nombre, dicho, medido, formato, limite) => {
    cifras++
    const detalle = m.buenas.map((b) => formato(nombre === 'velocidad' ? b.ms : b.bytes)).join(' / ')
    console.log(`  ${nombre.padEnd(10)} publicado ${dicho.texto.padEnd(14)} medido ${formato(medido).padStart(9)}   (${detalle})`)
    if (medido > limite) {
      fallas.push({ ...m, nombre, dicho: dicho.texto, medido: formato(medido) })
      console.log(`    NO SE SOSTIENE: se publica ${dicho.texto} y mide ${formato(medido)}`)
      return
    }
    if (medido < dicho.valor * SOBRA) {
      avisos.push({ ...m, nombre, dicho: dicho.texto, medido: formato(medido) })
      console.log(`    se quedo corta: mide ${formato(medido)} y publicamos ${dicho.texto}`)
    }
  }

  const vel = cifra(m.velocidad, UNIDAD_TIEMPO)
  const pes = cifra(m.peso, UNIDAD_PESO)
  // El techo publicado se juzga tal cual: el "menos de" ya es el margen.
  if (vel) juzgar('velocidad', vel, m.ms, comoTiempo, vel.valor)
  else console.log(`  velocidad  no se pudo leer la cifra publicada: "${m.velocidad}"`)
  // El peso es una cifra exacta y necesita banda.
  if (pes) juzgar('peso', pes, m.bytes, comoPeso, pes.valor * (pes.techo ? 1 : MARGEN_PESO))
  else console.log(`  peso       no se pudo leer la cifra publicada: "${m.peso}"`)

  const ref = base && base.sitios && base.sitios[m.client]
  if (ref) console.log(`    linea base ${base.fecha}: ${comoTiempo(ref.velocidad)} y ${comoPeso(ref.peso)}`)
}

// La sospecha de red: se mira cuanto se movio TODO contra la linea base. Si la
// mediana de los sitios empeoro parejo, la culpa no es de los sitios.
let sospechaRed = null
if (base && base.sitios) {
  const razones = medidos.filter((m) => m.ms !== null && base.sitios[m.client]).map((m) => m.ms / base.sitios[m.client].velocidad)
  if (razones.length >= 3) {
    const r = mediana(razones)
    if (r > 1.25) sospechaRed = r
  }
}

console.log(`\n=== RESUMEN (${medidos.length} sitios x ${CARGAS} cargas, ${cifras} cifras publicadas) ===`)
for (const m of medidos) {
  console.log(`  ${m.client.padEnd(24)} ${m.ms === null ? 'NO CARGO' : comoTiempo(m.ms).padStart(9) + '  ' + comoPeso(m.bytes).padStart(9)}`)
}
if (!base) console.log('\n  (sin linea base. Fijala una vez: node herramientas/medir-trabajos.mjs --fijar)')
if (sospechaRed) {
  console.log(`\nOJO: contra la linea base del ${base.fecha} TODOS los sitios estan x${sospechaRed.toFixed(2).replace('.', ',')} mas lentos.`)
  console.log('  Empeoraron parejo, asi que lo mas probable es que sea la red y no los sitios. Repite la medicion antes de tocar lib/trabajos.ts.')
}

if (fallas.length) {
  console.log(`\nNO PASA: ${fallas.length} cifra(s) publicada(s) ya no se sostiene(n).`)
  for (const f of fallas) console.log(`  ${f.client}: publica ${f.nombre} ${f.dicho} y mide ${f.medido}`)
  console.log('  Se corrige midiendo y bajando la cifra en lib/trabajos.ts, no dejandola como esta.')
  process.exit(1)
}
if (noCargaron.length) {
  console.log(`\nNO SE PUDO MEDIR: ${noCargaron.length} sitio(s) no cargaron (${noCargaron.map((m) => m.client).join(', ')}).`)
  process.exit(2)
}
if (avisos.length) {
  console.log(`\nPASA, y ademas ${avisos.length} cifra(s) se quedaron mas de un 25% por debajo de la realidad: conviene bajarlas en lib/trabajos.ts.`)
  for (const a of avisos) console.log(`  ${a.client}: publica ${a.nombre} ${a.dicho} y mide ${a.medido}`)
  process.exit(0)
}
console.log(`\nPASA: las ${cifras} cifras publicadas se sostienen.`)
process.exit(0)
