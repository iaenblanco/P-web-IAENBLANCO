// Qué se mueve de verdad, ruta por ruta. El CSS no sirve para contestarlo:
// app/globals.css tiene cientos de selectores declarados dos veces y solo gana
// el último, así que una regla con `animation:` puede estar pisada y no pintar
// nada. Quien sabe es el navegador, con document.getAnimations().
//
//   node herramientas/mirar-motion.mjs <tmp> <base> <anchos> <rutas> <modo>
//   node herramientas/mirar-motion.mjs .tmp/mot http://localhost:3210 1440,390 "" ambos
//
// <modo>: normal (por defecto) | reduce | ambos. Con reduce se emula
// prefers-reduced-motion, que el criterio de cierre de la fase 10 exige y que
// ninguna herramienta de la casa cubria.
//
// Deja un JSON con todo lo crudo en <carpeta-temporal>/motion.json y una tabla
// en pantalla. Sale 0 siempre: esto informa, no reprueba.
//
// Cuatro trampas ya pagadas, y cómo las esquiva:
//  - `requestAnimationFrame` no dispara con la pestaña oculta y cuelga la
//    llamada 45 s. Acá no se usa: todas las esperas son setTimeout.
//  - un script que muta el DOM no puede medir el observer en el mismo pase
//    (fase 9: un script reportó "13 animaciones corriendo" donde una sonda de
//    solo lectura veía las 13 pausadas). Esta sonda no escribe: ni clases, ni
//    estilos, ni `animation: none`. Solo hace scroll, que no es una mutación.
//  - las revelaciones por scroll no existen hasta que se hace scroll: se mide
//    dos veces, arriba (`arriba`) y después de recorrer la página (`abajo`).
//  - `innerWidth` da 0 sin emulación activa: se emula antes de navegar.
//  - `running` no quiere decir que avance: con reduced-motion las animaciones
//    siguen existiendo con duración 0. Por eso se lee `currentTime` y se cuenta
//    aparte cuántas *avanzan*.
//  - el recorrido usa `behavior: instant`: con `scroll-behavior: smooth` la
//    sonda medía una página todavía en viaje.
//
// Necesita Chrome instalado; habla CDP directo, sin dependencias, como el resto
// de herramientas/. La carpeta temporal se resuelve a ruta absoluta porque
// Chrome 151 se niega a arrancar con un --user-data-dir relativo.
import { spawn } from 'node:child_process'
import { setTimeout as espera } from 'node:timers/promises'
import { resolve } from 'node:path'
import { mkdirSync, writeFileSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PUERTO = 9374
const SALIDA = resolve(process.argv[2] || '.tmp/mot')
const BASE = process.argv[3] || 'http://localhost:3210'
const ANCHOS = (process.argv[4] || '1440,390').split(',').map(Number)
const RUTAS = (process.argv[5] || '/,/servicios/,/servicios/desarrollo-web-ia/,/servicios/plataformas-software-medida/,/servicios/automatizaciones/,/servicios/soluciones-ia-medida/,/productos/,/trabajos/,/contacto/,/privacidad/,/terminos/').split(',')
const MODOS = (process.argv[6] || 'normal') === 'ambos' ? ['normal', 'reduce'] : [process.argv[6] || 'normal']

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

// Lectura pura. No toca una sola propiedad del documento.
const LEER = String.raw`
(() => {
  const nom = (e) => {
    if (!e || !e.tagName) return '(sin nodo)';
    const crudo = typeof e.className === 'string' ? e.className : (e.getAttribute && e.getAttribute('class')) || '';
    const cls = crudo.trim() ? '.' + crudo.trim().split(/[ \t\n]+/).slice(0, 4).join('.') : '';
    return e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + cls;
  };
  const anim = [];
  for (const a of document.getAnimations()) {
    const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : {};
    const destino = a.effect && a.effect.target ? a.effect.target : null;
    const tipo = a.constructor.name;                  // CSSAnimation | CSSTransition | Animation
    const cs = getComputedStyle(destino || document.body);
    anim.push({
      tipo,
      nombre: a.animationName || a.transitionProperty || a.id || '(anonima)',
      estado: a.playState,                            // running | paused | finished | idle
      // 'running' no dice que avance: una animacion de duracion 0 (el corte
      // de reduced-motion) tambien lo dice. currentTime es lo unico que
      // distingue correr de estar congelada en el arranque.
      tiempo: Math.round(Number(a.currentTime) || 0),
      iteraciones: t.iterations === Infinity ? 'infinite' : t.iterations,
      duracion: t.duration,
      retraso: t.delay,
      // Cada tipo lee su propia propiedad: preguntarle animationTimingFunction
      // a una CSSTransition devuelve la curva de otra cosa.
      curva: tipo === 'CSSTransition' ? (cs.transitionTimingFunction || '') : (cs.animationTimingFunction || ''),
      pseudo: (a.effect && a.effect.pseudoElement) || '',
      destino: nom(destino),
    });
  }
  // Estado del sistema de revelado, sin tocarlo.
  const marca = (sel) => Array.from(document.querySelectorAll(sel)).map(nom);
  return {
    visible: document.visibilityState,
    reducido: matchMedia('(prefers-reduced-motion: reduce)').matches,
    scrollY: Math.round(scrollY),
    alto: document.body.scrollHeight,
    anim,
    revelado: {
      esVisible: document.querySelectorAll('.es-visible').length,
      revelaFuera: document.querySelectorAll('.revela--fuera').length,
      revelaArmado: document.querySelectorAll('.revela--armado').length,
      revelaArmadoGuion: document.querySelectorAll('.revela-armado').length,
      reveal: document.querySelectorAll('.reveal').length,
      revealVisible: document.querySelectorAll('.reveal.is-visible').length,
      sinRevelar: marca('.reveal:not(.is-visible)').slice(0, 12),
    },
    header: {
      clases: document.querySelector('.site-header') ? document.querySelector('.site-header').className : '(no hay)',
    },
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

const todo = []
for (const modo of MODOS) {
  await s.e('Emulation.setEmulatedMedia', modo === 'reduce'
    ? { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }
    : { features: [] }, sessionId)
for (const W of ANCHOS) {
  await s.e('Emulation.setDeviceMetricsOverride', { width: W, height: W < 800 ? 780 : 900, deviceScaleFactor: 1, mobile: W < 800 }, sessionId)
  for (const ruta of RUTAS) {
    await s.e('Page.navigate', { url: BASE + ruta }, sessionId)
    await espera(2100)
    const cargo = (await s.e('Runtime.evaluate', { expression: `(() => ({ error: document.body.className.includes('neterror'), header: !!document.querySelector('.site-header') }))()`, returnByValue: true }, sessionId)).result.value
    if (cargo.error || !cargo.header) { console.error(`  ${ruta} @${W}: no cargó`); continue }
    await s.e('Runtime.evaluate', { expression: '(async()=>{await document.fonts.ready;await new Promise(r=>setTimeout(r,600));return 1})()', awaitPromise: true, returnByValue: true }, sessionId)

    const arriba = (await s.e('Runtime.evaluate', { expression: LEER, returnByValue: true }, sessionId)).result.value

    // Recorrer entera y volver: las revelaciones por scroll no existen antes.
    await s.e('Runtime.evaluate', { expression: `(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=400){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,140))}scrollTo({top:h,behavior:'instant'});await new Promise(r=>setTimeout(r,1600));return 1})()`, awaitPromise: true }, sessionId)
    const abajo = (await s.e('Runtime.evaluate', { expression: LEER, returnByValue: true }, sessionId)).result.value

    todo.push({ modo, ancho: W, ruta, arriba, abajo })
    const corriendo = abajo.anim.filter(a => a.estado === 'running')
    const avanzando = corriendo.filter(a => a.duracion > 0)
    const infinitas = corriendo.filter(a => a.iteraciones === 'infinite')
    console.log(`  ${ruta} @${W}${modo === 'reduce' ? ' [reducido]' : ''}  animaciones ${abajo.anim.length} · corriendo ${corriendo.length} · avanzando ${avanzando.length} · infinitas ${infinitas.length} · sin revelar ${abajo.revelado.reveal - abajo.revelado.revealVisible}/${abajo.revelado.reveal}`)
    console.log(`  ${ruta} @${W}  animaciones ${abajo.anim.length} · corriendo ${corriendo.length} · infinitas ${infinitas.length} · sin revelar ${abajo.revelado.reveal - abajo.revelado.revealVisible}/${abajo.revelado.reveal}`)
  }
}
}

mkdirSync(SALIDA, { recursive: true })
writeFileSync(SALIDA + '/motion.json', JSON.stringify(todo, null, 1))

// Resumen: qué nombres de animación existen de verdad, y dónde. Se separa por
// modo porque bajo reduced-motion los nombres siguen existiendo: lo que cambia
// es que su duración cae a 0, y eso solo se ve mirando duracion y currentTime.
for (const modo of MODOS) {
  const filas = todo.filter((t) => t.modo === modo)
  if (!filas.length) continue
  const nombres = new Map()
  for (const t of filas) for (const donde of ['arriba', 'abajo']) for (const a of t[donde].anim) {
    if (a.tipo === 'CSSTransition') continue
    const k = a.nombre
    if (!nombres.has(k)) nombres.set(k, { rutas: new Set(), estados: new Set(), infinita: false, destinos: new Set(), dur: 0 })
    const v = nombres.get(k)
    v.rutas.add(t.ruta); v.estados.add(a.estado); v.destinos.add(a.destino)
    v.dur = Math.max(v.dur, a.duracion || 0)
    if (a.iteraciones === 'infinite') v.infinita = true
  }
  console.log(`\n=== animaciones CSS vivas · modo ${modo} (nombre · rutas · estados · dur · infinita) ===`)
  for (const [k, v] of [...nombres].sort((a, b) => b[1].rutas.size - a[1].rutas.size)) {
    console.log(`  ${k.padEnd(34)} ${String(v.rutas.size).padStart(2)} rutas  [${[...v.estados].join(',')}] ${String(Math.round(v.dur)).padStart(5)}ms${v.infinita ? '  INFINITA' : ''}  p.ej. ${[...v.destinos][0]}`)
  }
  const vivas = todo.filter((t) => t.modo === modo).flatMap((t) => t.abajo.anim).filter((a) => a.estado === 'running' && a.duracion > 0)
  console.log(`\n  ${nombres.size} nombres · ${vivas.length} animaciones avanzando al pie de página · crudo en ${SALIDA}/motion.json`)
}

await s.e('Target.closeTarget', { targetId })
ws.close(); chrome.kill()
