// ¿Cambió algo de lo que el visitante ve después de tocar el CSS?
// Toma una huella por elemento (estilos computados, ::before/::after y caja)
// en cada ruta y ancho, y compara dos huellas. Es la compuerta de la poda:
// si la huella de después no es idéntica a la de antes, el lote no pasa.
//
//   node herramientas/huella-css.mjs <tmp> <base> <anchos> <rutas> <salida.json> [carpeta-capturas]
//   node herramientas/huella-css.mjs --comparar antes.json despues.json [max-por-pagina]
//   node herramientas/huella-css.mjs --capturas-iguales <carpetaA> <carpetaB>
//
//   node herramientas/servir.mjs out 3210 &
//   node herramientas/huella-css.mjs D:/tmp/web-poda/hu http://localhost:3210 1440,1280,1024,375 / D:/tmp/web-poda/antes.json D:/tmp/web-poda/cap-antes
//
// Con carpeta de capturas, además guarda un PNG de página completa por ruta y
// ancho (sirven para mirar con los ojos, no para juzgar). CUIDADO con
// --capturas-iguales: compara BYTES, y eso no sirve como prueba. Medido el
// 3-sep-2026 sobre el mismo build servido dos veces: 19 de 36 capturas
// distintas sin que ni un elemento cambiara de caja ni de estilo computado.
// La prueba de que nada se movió la da la huella, no el PNG.
//
// Sale 0 si las huellas son idénticas, 1 si difieren, 2 si una página no cargó.
//
// Trampas ya pagadas:
//  - getComputedStyle enumera las propiedades personalizadas al final, y ese
//    orden NO es estable entre procesos de Chrome: dentro de una misma ventana
//    dos lecturas coinciden, pero dos corridas distintas del mismo sitio sin
//    tocar dan hashes distintos en el 85% de los elementos. Los 534 valores
//    eran idénticos; lo único que cambiaba era el orden. Por eso se ordena
//    antes de resumir. Sin esto la compuerta grita en cada lote y no sirve.
//  - las animaciones hacen que dos tomas nunca coincidan: se recorre la página
//    (para que las revelaciones por IntersectionObserver ya hayan pasado) y se
//    LLEVA AL FINAL todo lo que anima antes de medir. Es una mutación, pero la
//    misma en las dos tomas; una regla que solo cambia un cuadro intermedio no
//    la ve.
//  - pausar en currentTime 0 en vez de terminar parecía más neutral y era la
//    trampa: "revela-entrada" arranca en translateY(16px) y rellena backwards,
//    así que al terminar Chrome la descarta de getAnimations() y el elemento
//    queda en su sitio, pero si acababa de dispararse seguía en la lista y la
//    sonda la devolvía a su primer cuadro. Dos corridas del mismo build daban
//    16 px de diferencia en lo revelado al final del recorrido. Ahora se
//    terminan las finitas y solo se pausan en 0 las infinitas, que no acaban
//    nunca. Se pasa dos veces porque una animación puede encadenar otra.
//  - display:swap: sin esperar document.fonts.ready la primera toma mide con
//    la fuente de reserva y todo "cambia".
//  - el perfil de Chrome es nuevo en cada corrida, así que el cartel de
//    consentimiento está puesto en las dos tomas: cuenta, y está bien que cuente.
//  - la huella medía solo "body *", así que html y body quedaban fuera: una
//    regla podada que solo tocara el fondo o el tipo de la página no la veía
//    nadie. Ahora los dos entran primero en el recorrido.
//  - la huella crece rápido (1.500 elementos x rutas x anchos): va a <tmp>, no
//    a reports/. En reports/ va el resumen que imprime --comparar.
//  - lo que NO cubre: :hover, :focus y los estados que dependen de interactuar.
//    Para eso están cobertura-css.mjs (qué reglas aplican en cada estado) y la
//    batería de verificar.mjs. La huella mide el estado de reposo.
//  - captureBeyondViewport estira la página: la captura se toma después de la
//    huella, nunca antes.
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PUERTO = 9376
const espera = (ms) => new Promise(r => setTimeout(r, ms))

if (process.argv[2] === '--comparar') {
  const [a, b] = [process.argv[3], process.argv[4]].map(f => JSON.parse(readFileSync(f, 'utf8')))
  const MAX = Number(process.argv[5] || 8)
  let paginas = 0, distintas = 0
  for (const clave of Object.keys(a.paginas)) {
    paginas++
    const A = a.paginas[clave], B = b.paginas[clave]
    if (!B) { distintas++; console.log(`### ${clave}  falta en la segunda huella`); continue }
    if (A.n !== B.n) { distintas++; console.log(`### ${clave}  ${A.n} elementos antes, ${B.n} después`) }
    const mapaB = new Map(B.elementos.map(e => [e[0], e]))
    const difs = []
    for (const e of A.elementos) { const f = mapaB.get(e[0]); if (!f) { difs.push(`${e[0]}  desapareció`); continue }
      const que = [e[1] !== f[1] ? `caja ${e[1]} → ${f[1]}` : '', e[2] !== f[2] ? 'estilo' : '', e[3] !== f[3] ? 'pseudo' : ''].filter(Boolean)
      if (que.length) difs.push(`${e[0]}  ${que.join(', ')}`) }
    if (difs.length) { if (A.n === B.n) distintas++; console.log(`### ${clave}  ${difs.length} elementos distintos`); difs.slice(0, MAX).forEach(d => console.log('  ' + d)) }
  }
  for (const clave of Object.keys(b.paginas)) if (!a.paginas[clave]) { paginas++; distintas++; console.log(`### ${clave}  solo en la segunda huella`) }
  console.log(`\n=== HUELLA: ${paginas} páginas, ${distintas} distintas ===`)
  process.exit(distintas ? 1 : 0)
}
if (process.argv[2] === '--capturas-iguales') {
  const [A, B] = [process.argv[3], process.argv[4]]
  let n = 0, dif = 0
  for (const f of readdirSync(A).filter(f => f.endsWith('.png'))) { n++
    if (!existsSync(resolve(B, f))) { dif++; console.log(`  ${f}  falta en ${B}`); continue }
    if (!readFileSync(resolve(A, f)).equals(readFileSync(resolve(B, f)))) { dif++; console.log(`  ${f}  distinta`) } }
  console.log(`=== CAPTURAS: ${n} archivos, ${dif} distintos ===`)
  process.exit(dif ? 1 : 0)
}

const SALIDA = resolve(process.argv[2] || '.tmp/hu')
const BASE = process.argv[3] || 'http://localhost:3210'
const ANCHOS = (process.argv[4] || '1440,390').split(',').map(Number)
const RUTAS = (process.argv[5] || '/').split(',').filter(Boolean)
const ARCHIVO = resolve(process.argv[6] || SALIDA + '/huella.json')
const CAPTURAS = process.argv[7] ? resolve(process.argv[7]) : ''

async function esperar() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PUERTO}/json/version`); if (r.ok) return (await r.json()).webSocketDebuggerUrl } catch {}
    await espera(500)
  }
  throw new Error('no arranca')
}
class S {
  constructor(ws) { this.ws = ws; this.id = 0; this.p = new Map()
    ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && this.p.has(m.id)) { const { ok, mal } = this.p.get(m.id); this.p.delete(m.id); m.error ? mal(new Error(JSON.stringify(m.error))) : ok(m.result) } }) }
  e(method, params = {}, sid) { const id = ++this.id; return new Promise((ok, mal) => { this.p.set(id, { ok, mal })
    this.ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) }))
    setTimeout(() => { if (this.p.has(id)) { this.p.delete(id); mal(new Error('timeout ' + method)) } }, 60000) }) }
}

// Corre dentro de la página. Devuelve [clave, caja, hashEstilo, hashPseudo] por elemento.
const SONDA = `(async()=>{
  await new Promise(r=>setTimeout(r,1200));
  const asentar=()=>{for(const a of document.getAnimations()){try{const t=a.effect&&a.effect.getComputedTiming?a.effect.getComputedTiming():null;if(t&&t.iterations===Infinity){a.pause();a.currentTime=0}else a.finish()}catch{}}};
  asentar();await new Promise(r=>setTimeout(r,150));asentar();
  await new Promise(r=>setTimeout(r,200));
  const fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(16)};
  const estilo=(el,ps)=>{const cs=getComputedStyle(el,ps);if(ps&&cs.content==='none')return '';const a=[];for(let i=0;i<cs.length;i++){const p=cs[i];a.push(p+':'+cs.getPropertyValue(p))}return a.sort().join(';')+';'};
  const r4=x=>Math.round(x*4)/4;
  const out=[];let i=0;
  for(const el of [document.documentElement,document.body,...document.querySelectorAll('body *')]){
    if(el.tagName==='SCRIPT'||el.tagName==='STYLE')continue;
    const b=el.getBoundingClientRect();
    const clave=(i++)+':'+el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\\s+/).join('.'):'');
    out.push([clave,[r4(b.x),r4(b.y+scrollY),r4(b.width),r4(b.height)].join(','),fnv(estilo(el)),fnv(estilo(el,'::before')+'|'+estilo(el,'::after'))]);
  }
  return {n:out.length,alto:document.documentElement.scrollHeight,elementos:out};
})()`

try { rmSync(SALIDA + '/perfil', { recursive: true, force: true, maxRetries: 5 }) } catch {}
mkdirSync(SALIDA, { recursive: true }); if (CAPTURAS) mkdirSync(CAPTURAS, { recursive: true })
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PUERTO}`, '--window-size=1440,900',
  '--user-data-dir=' + SALIDA + '/perfil', 'about:blank'], { stdio: 'ignore' })
const ws = new WebSocket(await esperar())
await new Promise(ok => ws.addEventListener('open', ok))
const s = new S(ws)
const { targetId } = await s.e('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await s.e('Target.attachToTarget', { targetId, flatten: true })
await s.e('Page.enable', {}, sessionId); await s.e('Runtime.enable', {}, sessionId)
const ev = async (expression, awaitPromise = false) => (await s.e('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }, sessionId)).result.value

const huella = { base: BASE, anchos: ANCHOS, rutas: RUTAS, paginas: {} }
for (const W of ANCHOS) for (const ruta of RUTAS) {
  await s.e('Emulation.setDeviceMetricsOverride', { width: W, height: W < 800 ? 780 : 900, deviceScaleFactor: 1, mobile: W < 800 }, sessionId)
  await s.e('Page.navigate', { url: BASE + ruta }, sessionId)
  await espera(1200)
  await ev('(async()=>{await document.fonts.ready;await new Promise(r=>setTimeout(r,250));return document.fonts.status})()', true)
  const cargo = await ev('(() => ({ error: document.body.className.includes("neterror"), header: !!document.querySelector(".site-header") }))()')
  if (cargo.error || !cargo.header) { console.log(`!! ${W}px ${ruta} NO CARGO. Revisa que el servidor siga arriba.`); process.exitCode = 2; continue }
  await ev(`(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,90))}scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,700));return 1})()`, true)
  const h = await ev(SONDA, true)
  huella.paginas[`${ruta}@${W}`] = h
  let cap = ''
  if (CAPTURAS) {
    const { data } = await s.e('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true }, sessionId)
    const nombre = (ruta === '/' ? 'inicio' : ruta.replace(/^\/|\/$/g, '').replace(/[\/.]/g, '-')) + `-${W}.png`
    writeFileSync(resolve(CAPTURAS, nombre), Buffer.from(data, 'base64')); cap = '  captura ' + nombre
  }
  console.log(`  ${ruta} @${W}  ${h.n} elementos, alto ${h.alto}${cap}`)
}
writeFileSync(ARCHIVO, JSON.stringify(huella))
console.log(`\n=== HUELLA: ${Object.keys(huella.paginas).length} páginas en ${ARCHIVO} ===`)
s.e('Target.closeTarget', { targetId }).catch(() => {})
await espera(300); ws.close(); chrome.kill()
process.exit(process.exitCode || 0)
