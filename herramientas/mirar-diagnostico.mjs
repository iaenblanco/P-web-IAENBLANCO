// Que se mueve cuando alguien CONTESTA. `mirar-motion.mjs` no puede decirlo:
// no hace clic, asi que sobre el diagnostico de /servicios/ su criterio de
// cierre pasa en vacio -mide una pieza que nunca se uso-. Esta sonda contesta
// los tres pasos y mide en cada uno.
//
//   node herramientas/mirar-diagnostico.mjs <tmp> <base> <anchos> <modo>
//   node herramientas/mirar-diagnostico.mjs .tmp/diag http://localhost:3210 1440,390 ambos
//
// Dos trampas propias, ademas de las que ya paga mirar-motion.mjs:
//  - una pestana oculta congela el reloj del documento: getAnimations() dice
//    `running` con currentTime clavado en 0 para siempre, y el alto medido
//    desde ahi es el de arranque, no el de llegada. Por eso esto habla CDP con
//    un Chrome propio y no reusa la pestana de nadie.
//  - el clic tiene que ser el de React: se usa .click() sobre el boton, que es
//    lo que dispara el onClick real.
import { spawn } from 'node:child_process'
import { setTimeout as espera } from 'node:timers/promises'
import { resolve } from 'node:path'
import { mkdirSync, writeFileSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PUERTO = 9375
const SALIDA = resolve(process.argv[2] || '.tmp/diag')
const BASE = process.argv[3] || 'http://localhost:3210'
const ANCHOS = (process.argv[4] || '1440,390').split(',').map(Number)
const MODOS = (process.argv[5] || 'ambos') === 'ambos' ? ['normal', 'reduce'] : [process.argv[5] || 'normal']

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
  constructor(ws) {
    this.ws = ws; this.id = 0; this.p = new Map()
    ws.addEventListener('message', e => {
      const m = JSON.parse(e.data)
      if (m.id && this.p.has(m.id)) { const { ok, mal } = this.p.get(m.id); this.p.delete(m.id); m.error ? mal(new Error(JSON.stringify(m.error))) : ok(m.result) }
    })
  }
  e(method, params = {}, sid) {
    const id = ++this.id
    return new Promise((ok, mal) => {
      this.p.set(id, { ok, mal })
      this.ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) }))
      setTimeout(() => { if (this.p.has(id)) { this.p.delete(id); mal(new Error('timeout ' + method)) } }, 60000)
    })
  }
}

// Contesta una opcion y filma el viaje. Devuelve la tira de muestras.
const CONTESTAR = String.raw`
(async () => {
  const d = document.querySelector('.diagnostico');
  if (!d) return { falta: true };
  d.scrollIntoView({ block: 'center', behavior: 'instant' });
  await new Promise(r => setTimeout(r, 200));

  const mirar = () => {
    const anim = document.getAnimations().filter(a => {
      const t = a.effect && a.effect.target;
      return t && (d === t || d.contains(t));
    });
    const alto = anim.filter(a => !a.animationName && !a.transitionProperty);
    return {
      alto: Math.round(d.getBoundingClientRect().height),
      animando: d.dataset.animando || null,
      overflow: getComputedStyle(d).overflow,
      corriendo: anim.filter(a => a.playState === 'running').length,
      // 'running' no dice que avance: con el reloj congelado, o con la
      // duracion en 0 del corte de reduced-motion, tambien lo dice.
      avanzando: anim.filter(a => a.playState === 'running' && Number(a.currentTime) > 0 &&
        (a.effect.getComputedTiming().duration || 0) > 1).length,
      nombres: anim.filter(a => a.playState === 'running').map(a => a.animationName || '(alto por JS)'),
      altoJS: alto.map(a => ({ estado: a.playState, t: Math.round(Number(a.currentTime) || 0), dur: a.effect.getComputedTiming().duration })),
    };
  };

  const botones = d.querySelectorAll('.diagnostico__opcion');
  const tira = [{ ms: 'antes', ...mirar(), opciones: botones.length, paso: d.querySelector('.diagnostico__paso').textContent }];
  if (!botones.length) return { tira, terminado: true };

  const t0 = performance.now();
  botones[0].click();
  for (const ms of [40, 150, 400, 900]) {
    await new Promise(r => setTimeout(r, Math.max(0, ms - (performance.now() - t0))));
    tira.push({ ms, ...mirar() });
  }
  const ult = tira[tira.length - 1];
  ult.opciones = d.querySelectorAll('.diagnostico__opcion').length;
  ult.paso = d.querySelector('.diagnostico__paso').textContent;
  ult.foco = document.activeElement.tagName.toLowerCase() + '.' + (document.activeElement.className || '');
  ult.rayas = d.querySelectorAll('.diagnostico__barra i[data-hecho="si"]').length;
  return { tira };
})()`

const ws = new WebSocket(await esperar())
await new Promise(r => ws.addEventListener('open', r))
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
    // Navegar DESPUES de emular: el componente lee el modo al montar.
    await s.e('Page.navigate', { url: BASE + '/servicios/' }, sessionId)
    await espera(2200)
    await s.e('Runtime.evaluate', { expression: '(async()=>{await document.fonts.ready;await new Promise(r=>setTimeout(r,500));return 1})()', awaitPromise: true, returnByValue: true }, sessionId)
    for (const paso of [1, 2, 3]) {
      const r = (await s.e('Runtime.evaluate', { expression: CONTESTAR, awaitPromise: true, returnByValue: true }, sessionId)).result.value
      todo.push({ modo, ancho: W, clic: paso, ...r })
    }
  }
}

writeFileSync(SALIDA + '/diagnostico.json', JSON.stringify(todo, null, 1))
for (const f of todo) {
  if (!f.tira) { console.log(`${f.modo} ${f.ancho} clic ${f.clic}: sin tarjeta`); continue }
  const a = f.tira[0], z = f.tira[f.tira.length - 1]
  console.log(`\n=== ${f.modo} · ${f.ancho}px · clic ${f.clic} · ${a.paso} -> ${z.paso} (${a.opciones} -> ${z.opciones} opciones)`)
  for (const m of f.tira) {
    console.log(`  ${String(m.ms).padStart(6)}  alto ${String(m.alto).padStart(4)}  animando ${m.animando || '-'}  overflow ${m.overflow.padEnd(7)}  corriendo ${m.corriendo}  avanzando ${m.avanzando}  ${m.nombres.slice(0, 5).join(' ')}`)
  }
  if (z.foco) console.log(`  foco: ${z.foco} · rayas hechas: ${z.rayas}`)
}
const pegados = todo.flatMap(f => (f.tira || []).filter(m => m.ms === 900 && m.animando))
console.log(`\n${pegados.length ? 'OJO: ' + pegados.length + ' muestra(s) siguen con data-animando a los 900 ms' : 'A los 900 ms ninguna muestra queda con data-animando: el recorte se suelta solo.'}`)
const reduce = todo.filter(f => f.modo === 'reduce').flatMap(f => (f.tira || []).map(m => m.avanzando))
if (reduce.length) console.log(`reduced-motion: ${Math.max(...reduce)} animaciones avanzando como maximo dentro de la tarjeta (tiene que ser 0)`)
ws.close(); chrome.kill(); process.exit(0)
