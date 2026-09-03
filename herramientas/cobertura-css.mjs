// Qué reglas del CSS aplican de verdad, ruta por ruta y estado por estado.
// Leer el CSS no lo contesta: app/globals.css tiene cientos de selectores
// repetidos y clases que ningún .tsx emite. Quien sabe es el navegador, con
// CSS.startRuleUsageTracking (lo mismo que la pestaña Coverage de DevTools).
//
//   node herramientas/cobertura-css.mjs <tmp> <base> <anchos> <rutas> [extras]
//   node herramientas/cobertura-css.mjs .tmp/cob http://localhost:3210 1440,390 / 1440,390
//
// <extras>: anchos (por defecto 1440,390) en los que además se hacen las pasadas
// caras por ruta: consentimiento rechazado, navegación cliente, reduced-motion,
// hover:none, esquema oscuro, print y JS apagado. Sin extras: "" .
//
// Por cada ancho x ruta pasa por estos estados y anota en cuál se usó cada regla:
//   carga      recién cargada, arriba, con el cartel de consentimiento puesto
//   scroll     recorrida entera y de vuelta arriba (revelaciones, is-scrolled)
//   abiertos   todos los <details> abiertos y cada botón con aria-expanded pulsado
//   foco       cada elemento enfocable recibió el foco (:focus, :focus-visible)
//   formulario enviado vacío (errores) y enviado con datos de prueba
//   interacciones cursor propio, menús de escritorio, carrusel en pausa, el
//              cuestionario de diagnóstico entero (ida, volver y reiniciar) y el
//              formulario enviado lleno (el navegador bloquea el window.open sin
//              gesto real, y eso enciende el respaldo)
//   consent-si aceptado el consentimiento
// y en los anchos de <extras>, además, por ruta:
//   consent-no  rechazado el consentimiento en una carga limpia
//   nav-cliente llegada por clic en el header desde otra ruta (page-enter)
//   reduce · hover-none · oscuro · print · sin-js
//
// Deja <tmp>/cobertura.json con todo lo crudo: cada regla de la hoja construida,
// mapeada a su línea en app/globals.css, y la lista de estados donde se usó.
// Sale 0 siempre: esto informa, no reprueba. Quien condena es condenar-css.mjs,
// cruzando esto con el sondeo estático; una regla que nunca se vio aplicar no
// está muerta hasta que además ningún fuente pueda producir sus clases.
//
// Trampas ya pagadas:
//  - el rastreo se enciende ANTES de navegar: si se enciende después, las reglas
//    del primer pintado no se registran hasta la próxima recomputación.
//  - los styleSheetId cambian en cada carga; la hoja se reconoce por su texto
//    (largo y primeros caracteres), no por id ni por URL.
//  - CSS.takeCoverageDelta solo trae lo usado desde la toma anterior; el mapa
//    de reglas sale de recorrer el texto minificado con el mismo caminador de
//    llaves que guardia-css.mjs, y se casa con el fuente por selector
//    normalizado en orden: el minificador conserva orden y duplicados.
//  - "base alcanzable": aparte del rastreo, en cada estado se pregunta si el
//    selector sin sus pseudo-clases de estado (:hover, :focus...) casa con algún
//    elemento. Una regla :hover sobre una clase que está en el DOM no se usa
//    hasta que alguien pasa el ratón, pero no está muerta.
//  - 8 rutas x 9 anchos en una corrida se colgaron en verificar.mjs; acá se
//    aplica la misma receta: partir en corridas y unir los JSON en condenar-css.
//
// Necesita Chrome instalado; habla CDP directo, sin dependencias, como el resto
// de herramientas/. La carpeta temporal se resuelve a ruta absoluta porque
// Chrome 151 se niega a arrancar con un --user-data-dir relativo.
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PUERTO = 9375
const SALIDA = resolve(process.argv[2] || '.tmp/cob')
const BASE = process.argv[3] || 'http://localhost:3210'
const ANCHOS = (process.argv[4] || '1440,390').split(',').map(Number)
const RUTAS = (process.argv[5] || '/').split(',').filter(Boolean)
const EXTRAS = (process.argv[6] === undefined ? '1440,390' : process.argv[6]).split(',').filter(Boolean).map(Number)
const FUENTE = resolve(dirname(fileURLToPath(import.meta.url)), '../app/globals.css')

const espera = (ms) => new Promise(r => setTimeout(r, ms))
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
  e(method, params = {}, sid, ms) { const id = ++this.id; return new Promise((ok, mal) => { this.p.set(id, { ok, mal })
    this.ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) }))
    setTimeout(() => { if (this.p.has(id)) { this.p.delete(id); mal(new Error('timeout ' + method)) } }, ms || 150000) }) }
}

// --- el mismo caminador de llaves que guardia-css.mjs, sobre fuente y sobre minificado ---
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
// Devuelve las reglas de estilo (no las @, no el interior de keyframes) con
// selector, contexto (@media que las envuelve), posicion de inicio y de cierre.
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
// El minificador reescribe el selector (quita espacios, comillas, ::->:) y
// ORDENA alfabéticamente las listas separadas por coma: se normalizan los dos
// lados a la misma forma, lista partida por comas de primer nivel y ordenada.
const partes = (sel) => { const out = []; let n = 0, a = 0
  for (let i = 0; i < sel.length; i++) { const c = sel[i]; if (c === '(' || c === '[') n++; else if (c === ')' || c === ']') n--; else if (c === ',' && !n) { out.push(sel.slice(a, i)); a = i + 1 } }
  out.push(sel.slice(a)); return out }
const normal = (sel) => partes(sel.toLowerCase().replace(/::(before|after|placeholder|selection|marker)/g, ':$1')
  .replace(/\s*([>+~,])\s*/g, '$1').replace(/\s+/g, ' ').replace(/"([\w-]+)"|'([\w-]+)'/g, '$1$2').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')'))
  .map(p => p.trim()).sort().join(',')
const normalCtx = (ctx) => ctx.toLowerCase().replace(/\s*:\s*/g, ':').replace(/\s*\(\s*/g, '(').replace(/\s*\)\s*/g, ')').replace(/\s+/g, ' ').trim()
// Selector sin las pseudo-clases de estado, para preguntarle al DOM si "casa".
const base = (sel) => sel.replace(/:(hover|focus-visible|focus-within|focus|active|visited|target|checked|disabled|enabled|invalid|valid|user-invalid|placeholder-shown|autofill|link)\b/g, '')
  .replace(/::?(before|after|placeholder|selection|marker|backdrop|first-line|first-letter)\b/g, '').replace(/:not\(\s*\)/g, '').trim()

const fuente = reglasDe(readFileSync(FUENTE, 'utf8'))
const FUENTE_LARGO = fuente.length

// Casa cada regla del minificado con la siguiente del fuente que tenga el mismo
// selector y contexto normalizados. Orden y duplicados se conservan, así que un
// puntero que avanza alcanza; si no encuentra en las próximas 40, se declara
// sin par y sigue (autoprefixer puede agregar reglas que el fuente no tiene).
// Segundo intento: cssnano FUSIONA reglas vecinas con las mismas declaraciones
// (.a{x} .b{x} -> .a,.b{x}); entonces una regla del build puede corresponder a
// varias del fuente cuyos selectores, juntos, forman el suyo. Se anotan todas.
function casar(min) {
  let j = 0, sinPar = 0
  for (const r of min) {
    const ns = normal(r.sel), nc = normalCtx(r.ctx); let k = -1
    for (let t = j; t < Math.min(fuente.length, j + 40); t++) if (normal(fuente[t].sel) === ns && normalCtx(fuente[t].ctx) === nc) { k = t; break }
    if (k >= 0) { r.linea = fuente[k].linea; r.lineas = [r.linea]; r.selFuente = fuente[k].sel; j = k + 1; continue }
    const P = new Set(ns.split(',')); const faltan = new Set(P); const varias = []
    for (let t = j; t < Math.min(fuente.length, j + 40) && faltan.size; t++) {
      if (normalCtx(fuente[t].ctx) !== nc) continue
      const ps = normal(fuente[t].sel).split(',')
      if (ps.every(p => P.has(p))) { varias.push(t); ps.forEach(p => faltan.delete(p)) }
    }
    if (varias.length && !faltan.size) { r.linea = fuente[varias[0]].linea; r.lineas = varias.map(t => fuente[t].linea); r.selFuente = varias.map(t => fuente[t].sel).join(' ++ '); j = varias[varias.length - 1] + 1; continue }
    r.linea = 0; r.lineas = []; sinPar++
  }
  return sinPar
}

const todo = { base: BASE, anchos: ANCHOS, rutas: RUTAS, extras: EXTRAS, hoja: null, reglas: [], estados: [] }
let reglasMin = null; const porInicio = []
const textos = new Map() // styleSheetId -> texto (o null si no es la hoja)
const usadas = new Map() // idx regla -> Set(estado)
const alcanzables = new Map() // idx regla -> Set(estado)
const marcar = (mapa, idx, tag) => { if (!mapa.has(idx)) mapa.set(idx, new Set()); mapa.get(idx).add(tag) }

// Perfil nuevo en cada corrida: si queda el de la anterior, el consentimiento ya
// está aceptado y el cartel no aparece (pasó en la prueba de humo).
try { rmSync(SALIDA + '/perfil', { recursive: true, force: true, maxRetries: 5 }) } catch {}
mkdirSync(SALIDA, { recursive: true })
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PUERTO}`, '--window-size=1440,900',
  '--user-data-dir=' + SALIDA + '/perfil', 'about:blank'], { stdio: 'ignore' })
const ws = new WebSocket(await esperar())
await new Promise(ok => ws.addEventListener('open', ok))
const s = new S(ws)
const { targetId } = await s.e('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await s.e('Target.attachToTarget', { targetId, flatten: true })
await s.e('Page.enable', {}, sessionId); await s.e('Runtime.enable', {}, sessionId)
await s.e('DOM.enable', {}, sessionId); await s.e('CSS.enable', {}, sessionId)
// El aviso de consentimiento solo se pinta si localStorage no tiene respuesta.
// Sin esto, la primera ruta lo ve y ninguna otra: las reglas del aviso dentro
// de las media queries angostas nunca se ejercitarian y se condenarian por
// error. Se borra la llave en cada documento nuevo, antes de que corra React.
await s.e('Page.addScriptToEvaluateOnNewDocument', { source: "try{localStorage.removeItem('iaenblanco.consent.v1')}catch{}" }, sessionId)
await s.e('CSS.startRuleUsageTracking', {}, sessionId)
const ev = async (expression, awaitPromise = false, ms) =>
  (await s.e('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }, sessionId, ms)).result.value

// Reconoce la hoja de globals entre las que Chrome reporta: la más larga que
// no sea la de @font-face. La primera vez arma el mapa de reglas del minificado.
async function hojaDe(id) {
  if (textos.has(id)) return textos.get(id)
  let t = null
  try { t = (await s.e('CSS.getStyleSheetText', { styleSheetId: id }, sessionId)).text } catch { t = null }
  const es = t && t.length > 20000 && !/^@font-face/.test(t)
  if (es && !reglasMin) {
    reglasMin = reglasDe(t)
    const sinPar = casar(reglasMin)
    reglasMin.forEach((r, i) => { r.i = i; porInicio.push([r.inicio, r.fin, i]) })
    todo.hoja = { largo: t.length, reglas: reglasMin.length, sinPar, reglasFuente: FUENTE_LARGO }
    console.log(`hoja reconocida: ${t.length} bytes, ${reglasMin.length} reglas en el build, ${FUENTE_LARGO} en el fuente, ${sinPar} sin par`)
  }
  textos.set(id, es ? t : null)
  return textos.get(id)
}
const idxDe = (pos) => { let a = 0, b = porInicio.length - 1
  while (a <= b) { const m = (a + b) >> 1; const [ini, fin, i] = porInicio[m]; if (pos < ini) b = m - 1; else if (pos > fin) a = m + 1; else return i }
  return -1 }

// Una toma: fuerza recomputación, pide el delta de uso y pregunta qué bases casan.
let selectoresBase = null
async function toma(tag, sinJs = false) {
  if (sinJs) { const { coverage } = await s.e('CSS.takeCoverageDelta', {}, sessionId)
    for (const c of coverage) { if (!c.used) continue; const t = await hojaDe(c.styleSheetId); if (!t) continue
      const i = idxDe(c.startOffset); if (i >= 0) marcar(usadas, i, tag) }
    if (!todo.estados.includes(tag)) todo.estados.push(tag); return }
  await ev('document.body.offsetHeight')
  const { coverage } = await s.e('CSS.takeCoverageDelta', {}, sessionId)
  for (const c of coverage) { if (!c.used) continue; const t = await hojaDe(c.styleSheetId); if (!t) continue
    const i = idxDe(c.startOffset); if (i >= 0) marcar(usadas, i, tag) }
  if (!reglasMin) return
  if (!selectoresBase) selectoresBase = reglasMin.map(r => base(r.sel))
  const casan = await ev(`(()=>{const L=${JSON.stringify(selectoresBase)};const out=[];for(let i=0;i<L.length;i++){if(!L[i])continue;try{if(document.querySelector(L[i]))out.push(i)}catch{}}return out})()`)
  for (const i of casan) marcar(alcanzables, i, tag)
  if (!todo.estados.includes(tag)) todo.estados.push(tag)
}

async function cargar(ruta, W, opciones = {}) {
  const sinJs = !!opciones.sinJs
  await s.e('Emulation.setDeviceMetricsOverride', { width: W, height: W < 800 ? 780 : 900, deviceScaleFactor: 1, mobile: W < 800 }, sessionId)
  await s.e('Emulation.setEmulatedMedia', opciones.media || { media: '', features: [] }, sessionId)
  await s.e('Emulation.setScriptExecutionDisabled', { value: !!opciones.sinJs }, sessionId)
  await s.e('Page.navigate', { url: BASE + ruta }, sessionId)
  await espera(sinJs ? 2000 : 1200)
  if (sinJs) return true
  await ev('(async()=>{await document.fonts.ready;await new Promise(r=>setTimeout(r,250));return document.fonts.status})()', true)
  const cargo = await ev('(() => ({ error: document.body.className.includes("neterror"), header: !!document.querySelector(".site-header") }))()')
  if (cargo.error || !cargo.header) { console.log(`!! ${W}px ${ruta} NO CARGO. Revisa que el servidor siga arriba.`); process.exitCode = 2; return false }
  return true
}
const recorrer = () => ev(`(async()=>{const alto=document.body.scrollHeight;const paso=Math.max(400,Math.ceil(alto/60));for(let y=0;y<alto;y+=paso){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,90))}scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,700));return alto})()`, true, 30000)
const consentir = (si) => ev(`(()=>{const caja=[...document.querySelectorAll('[class*="consent"],[class*="cookie"],[class*="aviso"]')].find(e=>e.querySelector('button'));if(!caja)return 'sin cartel';const bs=[...caja.querySelectorAll('button')];const b=bs.find(b=>${si ? '/acept|permit|entend|ok/i' : '/rechaz|necesari|no /i'}.test(b.textContent))||(${si ? 'bs[0]' : 'bs[bs.length-1]'});if(!b)return 'sin boton';b.click();return b.textContent.trim()})()`)

const fallas = []
for (const W of ANCHOS) for (const ruta of RUTAS) { try {
  const t0 = Date.now()
  if (!await cargar(ruta, W)) continue
  const R = `${ruta}@${W}`
  await toma(`carga|${R}`)
  await recorrer(); await toma(`scroll|${R}`)
  await ev(`(async()=>{document.querySelectorAll('details').forEach(d=>d.open=true);const bs=[...document.querySelectorAll('button[aria-expanded],button[aria-controls],[aria-haspopup]')];for(const b of bs){b.click();await new Promise(r=>setTimeout(r,120))}await new Promise(r=>setTimeout(r,400));return bs.length})()`, true)
  await toma(`abiertos|${R}`)
  await ev(`(async()=>{const fs=[...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].slice(0,400);for(const f of fs){f.focus({preventScroll:true});await new Promise(r=>setTimeout(r,8))}return fs.length})()`, true)
  await toma(`foco|${R}`)
  const form = await ev(`(async()=>{const f=document.querySelector('form');if(!f)return 'sin formulario';const antes=location.href;f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));await new Promise(r=>setTimeout(r,500));f.querySelectorAll('input:not([type=checkbox]):not([type=radio]),textarea').forEach(i=>{i.value=i.type==='email'?'prueba@ejemplo.cl':i.type==='tel'?'+56911111111':'Prueba de cobertura';i.dispatchEvent(new Event('input',{bubbles:true}))});f.querySelectorAll('input[type=checkbox]').forEach(c=>{c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}))});f.querySelectorAll('select').forEach(s=>{if(s.options.length>1){s.selectedIndex=1;s.dispatchEvent(new Event('change',{bubbles:true}))}});await new Promise(r=>setTimeout(r,300));return 'lleno'})()`, true)
  if (form === 'lleno') await toma(`formulario|${R}`)
  // Los estados que solo existen si alguien interactúa y que ADEMÁS agregan nodos
  // o clases al DOM. Los que solo cambian :hover no hacen falta: para esos vale
  // la "base alcanzable". El delta de cobertura registra todo lo usado desde la
  // toma anterior, así que los estados fugaces (un menú que se abre y se cierra)
  // también quedan contados.
  const inter = await ev(`(async()=>{
    const esp=ms=>new Promise(r=>setTimeout(r,ms)); const hecho=[];
    const disparar=(el,tipos,x,y)=>{for(const t of tipos)el.dispatchEvent(new MouseEvent(t,{bubbles:t!=='mouseenter'&&t!=='mouseleave',clientX:x,clientY:y}))};
    disparar(document,['mousemove'],innerWidth/2,innerHeight/2); await esp(200);
    const cs=[...document.querySelectorAll('[data-cursor]')].slice(0,12);
    for(const el of cs){const b=el.getBoundingClientRect();disparar(el,['pointerover','mouseover','mousemove'],b.x+b.width/2,b.y+b.height/2);await esp(60)}
    hecho.push('cursor:'+cs.length);
    const nav=[...document.querySelectorAll('.site-header [aria-haspopup], .site-header .nav-item, .site-header .nav-link, .site-header .nav-chevron')].slice(0,12);
    for(const el of nav){disparar(el,['mouseenter','mouseover']);await esp(140)}
    hecho.push('nav:'+nav.length);
    const p=document.querySelector('.carrusel-clientes__pausa, [class*=pausa]'); if(p){p.click();await esp(200);hecho.push('pausa')}
    if(document.querySelector('.diagnostico')){
      for(let i=0;i<12;i++){const o=document.querySelector('.diagnostico__opcion');if(!o)break;o.click();await esp(260)}
      hecho.push('diag-pasos');
      for(const b of [...document.querySelectorAll('.diagnostico__vueltas button, .diagnostico__acciones button')].slice(0,3)){b.click();await esp(300)}
      hecho.push('diag-vueltas');
    }
    const fo=document.querySelector('form'); if(fo){const b=fo.querySelector('button[type=submit],button:not([type])'); if(b){b.click();await esp(900);hecho.push('envio')}}
    return hecho.join(' ');
  })()`, true)
  await toma(`interacciones|${R}`)
  const c = await consentir(true); await espera(400); await toma(`consent-si|${R}`)
  const n = [...usadas.values()].length
  console.log(`  ${ruta} @${W}  ${((Date.now() - t0) / 1000).toFixed(1)}s  form: ${form}  inter: ${inter}  consent: ${c}  reglas usadas hasta ahora: ${n}`)

  if (!EXTRAS.includes(W)) continue
  // consentimiento rechazado en una carga limpia (el perfil ya lo aceptó: se borra)
  await ev('localStorage.clear();sessionStorage.clear()')
  if (await cargar(ruta, W)) { await consentir(false); await espera(400); await toma(`consent-no|${R}`) }
  // navegación cliente: llegar a esta ruta por clic desde otra
  const otra = RUTAS.find(r => r !== ruta) || (ruta === '/' ? '/servicios/' : '/')
  if (await cargar(otra, W)) {
    const fue = await ev(`(async()=>{const a=[...document.querySelectorAll('.site-header a[href]')].find(a=>new URL(a.href).pathname===${JSON.stringify(ruta)});if(!a)return 'sin enlace';a.click();await new Promise(r=>setTimeout(r,1500));return location.pathname})()`, true)
    if (fue === ruta) { await toma(`nav-cliente|${R}`); await recorrer(); await toma(`nav-cliente-scroll|${R}`) }
    else console.log(`  nav-cliente hacia ${ruta}: ${fue}`)
  }
  const medios = [
    ['reduce', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }],
    ['hover-none', { features: [{ name: 'hover', value: 'none' }, { name: 'pointer', value: 'coarse' }] }],
    ['oscuro', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] }],
    ['print', { media: 'print' }],
  ]
  for (const [tag, media] of medios) if (await cargar(ruta, W, { media })) { await toma(`${tag}|${R}`); await recorrer(); await toma(`${tag}-scroll|${R}`) }
  if (await cargar(ruta, W, { sinJs: true })) await toma(`sin-js|${R}`, true)
  await s.e('Emulation.setScriptExecutionDisabled', { value: false }, sessionId)
  await s.e('Emulation.setEmulatedMedia', { media: '', features: [] }, sessionId)
  console.log(`  ${ruta} @${W}  extras listas  reglas usadas hasta ahora: ${[...usadas.values()].length}`)
} catch (e) { fallas.push(`${ruta}@${W}: ${e.message}`); console.log(`  !! ${ruta} @${W} falló: ${e.message}`); process.exitCode = 1 } }

if (fallas.length) console.log(`
!! ${fallas.length} estados fallaron: ${fallas.join(' ; ')}`)
todo.fallas = fallas
if (reglasMin) {
  todo.reglas = reglasMin.map(r => ({ i: r.i, sel: r.sel, ctx: r.ctx, linea: r.linea, lineas: r.lineas || [], selFuente: r.selFuente || '', usada: [...(usadas.get(r.i) || [])], alcanzable: [...(alcanzables.get(r.i) || [])] }))
  const nUs = todo.reglas.filter(r => r.usada.length).length, nAl = todo.reglas.filter(r => !r.usada.length && r.alcanzable.length).length
  const nNo = todo.reglas.length - nUs - nAl
  console.log(`\n=== RESUMEN (${ANCHOS.join('/')}px × ${RUTAS.length} rutas, ${todo.estados.length} tomas) ===`)
  console.log(`  reglas en el build      ${todo.reglas.length}`)
  console.log(`  usadas en alguna toma   ${nUs}`)
  console.log(`  no usadas, base casa    ${nAl}   (viva pero sin estado: :hover, :focus... sobre algo que sí está)`)
  console.log(`  nunca vistas            ${nNo}`)
  console.log(`  sin par en el fuente    ${todo.hoja.sinPar}`)
} else console.log('!! no se reconoció la hoja de globals en ninguna carga')
writeFileSync(SALIDA + '/cobertura.json', JSON.stringify(todo, null, 1))
console.log(`crudo en ${SALIDA}/cobertura.json`)
// Target.closeTarget a veces no contesta y se come el timeout entero: no se espera.
s.e('Target.closeTarget', { targetId }).catch(() => {})
await espera(300); ws.close(); chrome.kill()
// Cada llamada CDP deja un temporizador de 60 s: sin esto el proceso tarda un
// minuto más en morir (verificar.mjs hace lo mismo).
process.exit(process.exitCode || 0)
