// Inventario de pesos de la monoespaciada sobre el sitio CONSTRUIDO.
//
// Por que existe. `next/font` carga la IBM Plex Mono con weight ['400','500']
// y nada mas. Cuando el CSS pide 600, 640 o 700 sobre un nodo mono, el
// navegador no tiene esa cara: la sintetiza engordando los trazos. El
// resultado es un negro falso, y a esas alturas 600, 640 y 700 rinden todos
// igual. La sans no tiene el problema —es variable y sus pesos intermedios
// son instancias reales—, asi que mirar `font-weight` a secas no sirve: hay
// que cruzarlo con la familia REALMENTE computada, y eso solo lo sabe el DOM.
//
// El plan lo dice de la unica forma que vale (riesgo de regresion nº 1):
// globals.css miente, 387 selectores repetidos y capas apendizadas. Un grep
// de `font-weight` da 42 bloques y no dice cuales aterrizan en mono.
//
// Uso:
//   node herramientas/servir.mjs out 3210
//   node herramientas/inventario-mono.mjs .tmp/mono http://localhost:3210
import { spawn } from 'node:child_process'
import { setTimeout as espera } from 'node:timers/promises'
import { resolve } from 'node:path'
import { mkdirSync, writeFileSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PUERTO = 9373
const SALIDA = resolve(process.argv[2] || '.tmp/mono')
const BASE = process.argv[3] || 'http://localhost:3210'
const ANCHOS = (process.argv[4] || '1440,390').split(',').map(Number)
const RUTAS = (process.argv[5] || '/,/servicios/,/productos/,/trabajos/,/contacto/,/servicios/desarrollo-web-ia/,/privacidad/,/terminos/').split(',')

mkdirSync(SALIDA, { recursive: true })
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
  constructor(ws) { this.ws = ws; this.id = 0; this.p = new Map()
    ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && this.p.has(m.id)) { const { ok, mal } = this.p.get(m.id); this.p.delete(m.id); m.error ? mal(new Error(JSON.stringify(m.error))) : ok(m.result) } }) }
  e(method, params = {}, sid) { const id = ++this.id; return new Promise((ok, mal) => { this.p.set(id, { ok, mal })
    this.ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) }))
    setTimeout(() => { if (this.p.has(id)) { this.p.delete(id); mal(new Error('timeout ' + method)) } }, 60000) }) }
}

// Recorre TODO el arbol, no solo lo visible: un peso sintetico no depende de
// estar en pantalla, y filtrar por viewport dejaria fuera media pagina.
const MEDIR = String.raw`
(() => {
  const raiz = getComputedStyle(document.documentElement);
  // El nombre real de la familia lo genera next/font (__IBM_Plex_Mono_abc123).
  // Se lee del token en vez de escribirlo a mano para que no se desincronice.
  const monoTok = raiz.getPropertyValue('--font-mono').trim();
  const primera = (f) => (f || '').split(',')[0].trim().replace(/^["']|["']$/g, '');
  const monoNom = primera(monoTok);
  const nom = (e) => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim()
    ? '.' + e.className.trim().split(/\s+/).filter(c => c !== 'is-visible' && c !== 'reveal' && c !== 'es-visible' && !c.startsWith('revela')).slice(0, 3).join('.')
    : '');
  const ruta = (e) => [e.parentElement && e.parentElement.parentElement, e.parentElement, e].filter(Boolean).map(nom).join(' > ');
  const hallazgos = [];
  for (const el of document.querySelectorAll('*')) {
    // Solo nodos que de verdad pintan texto propio.
    const propio = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim());
    if (!propio) continue;
    const cs = getComputedStyle(el);
    if (primera(cs.fontFamily) !== monoNom) continue;
    const w = parseInt(cs.fontWeight, 10);
    if (!(w > 500)) continue;
    hallazgos.push({
      w,
      sel: nom(el),
      ruta: ruta(el),
      texto: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 42),
      px: Math.round(parseFloat(cs.fontSize) * 100) / 100,
    });
  }
  return { monoNom, hallazgos };
})()
`

const ws = new WebSocket(await esperar())
await new Promise(ok => ws.addEventListener('open', ok))
const s = new S(ws)
const { targetId } = await s.e('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await s.e('Target.attachToTarget', { targetId, flatten: true })
await s.e('Page.enable', {}, sessionId); await s.e('Runtime.enable', {}, sessionId)

const porSelector = new Map()
const porPeso = new Map()
let familia = ''
let nodos = 0
const lineas = []

for (const A of ANCHOS) {
  await s.e('Emulation.setDeviceMetricsOverride', { width: A, height: A < 800 ? 780 : 900, deviceScaleFactor: 1, mobile: A < 800 }, sessionId)
  for (const ruta of RUTAS) {
    await s.e('Page.navigate', { url: BASE + ruta }, sessionId)
    await espera(1500)
    const cargo = (await s.e('Runtime.evaluate', { expression: `(() => ({ error: document.body.className.includes('neterror'), header: !!document.querySelector('.site-header') }))()`, returnByValue: true }, sessionId)).result.value
    if (cargo.error || !cargo.header) { console.log(`!! ${A}px ${ruta} NO CARGO`); process.exitCode = 2; continue }
    // Sin esperar a las fuentes, la familia computada es la de reserva y el
    // cruce con la mono da cero por un artefacto de carga, no por estar bien.
    await s.e('Runtime.evaluate', { expression: '(async()=>{await document.fonts.ready;await new Promise(r=>setTimeout(r,250));return 1})()', awaitPromise: true, returnByValue: true }, sessionId)
    const r = (await s.e('Runtime.evaluate', { expression: MEDIR, returnByValue: true }, sessionId)).result.value
    familia = r.monoNom
    for (const h of r.hallazgos) {
      nodos++
      const clave = h.sel + '  @' + h.w
      if (!porSelector.has(clave)) porSelector.set(clave, { ...h, veces: 0, donde: new Set() })
      const e = porSelector.get(clave); e.veces++; e.donde.add(`${A}px ${ruta}`)
      porPeso.set(h.w, (porPeso.get(h.w) || 0) + 1)
    }
    lineas.push(`${String(A).padStart(4)}px ${ruta.padEnd(34)} ${String(r.hallazgos.length).padStart(3)} nodos mono > 500`)
  }
}

console.log('\n=== INVENTARIO DE PESOS DE LA MONO ===')
console.log('familia computada: ' + familia)
console.log('caras cargadas por next/font: 400, 500\n')
console.log(lineas.join('\n'))
console.log('\n--- por peso (apariciones, sumando anchos y rutas) ---')
for (const [w, n] of [...porPeso].sort((a, b) => b[1] - a[1])) console.log(`  ${w}: ${n}`)
console.log(`\n--- por selector (${porSelector.size} distintos, ${nodos} apariciones) ---`)
for (const [clave, e] of [...porSelector].sort((a, b) => b[1].veces - a[1].veces)) {
  console.log(`  w${e.w}  ${e.px}px  ${e.sel}`)
  console.log(`        ruta: ${e.ruta}`)
  console.log(`        texto: «${e.texto}»`)
  console.log(`        en: ${[...e.donde].slice(0, 4).join(' · ')}${e.donde.size > 4 ? ` (+${e.donde.size - 4})` : ''}`)
}
console.log(`\nTOTAL: ${porSelector.size} selectores, ${nodos} apariciones.`)
console.log(porSelector.size === 0 ? 'CRITERIO CUMPLIDO: ningun nodo mono por encima de las caras cargadas.' : 'CRITERIO NO CUMPLIDO.')
writeFileSync(SALIDA + '/inventario.json', JSON.stringify({ familia, porPeso: [...porPeso], selectores: [...porSelector].map(([k, v]) => ({ ...v, donde: [...v.donde] })) }, null, 2))
ws.close(); chrome.kill(); process.exit(process.exitCode || 0)
