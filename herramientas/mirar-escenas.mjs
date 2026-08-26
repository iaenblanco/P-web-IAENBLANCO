// Las once escenas, juzgadas como se juzgan de verdad: en 375 de ancho y
// viendo la pasada entera, no una foto suelta.
//
//   node herramientas/mirar-escenas.mjs <carpeta> <base> [alto]
//
//   npm run dev
//   node herramientas/mirar-escenas.mjs .tmp/escenas http://localhost:3000
//
// Mide dos cosas, y las dos con un numero, no con una opinion:
//
//   QUIETA   despues de la pasada no puede quedar NADA moviendose. Se
//            pregunta al navegador por document.getAnimations() dentro de
//            la caja: cualquiera que siga "running" -o que declare
//            iteraciones infinitas- es una falla con nombre y apellido.
//   ESPERA   con la escena debajo del pliegue, la pasada no puede haber
//            empezado. Se mira currentTime: si avanzo sin que nadie la
//            haya visto, la funcion se dio en una sala vacia.
//
// Y deja la pelicula: la caja recortada a su rectangulo en ocho momentos
// de la pasada, para mirarla con los ojos despues de que los numeros
// pasaron. El ultimo cuadro es el que importa mas: es el que el visitante
// va a estar mirando los ocho segundos que le quedan.
//
// Borra el perfil de Chrome al terminar: cada pasada deja unos 200 MB.
import { spawn } from 'node:child_process'
import { setTimeout as espera } from 'node:timers/promises'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PUERTO = 9373
const SALIDA = resolve(process.argv[2] || '.tmp/escenas')
const BASE = process.argv[3] || 'http://localhost:3000'
// 560 y no 660 a proposito: la caja arranca en y ~574, asi que con la barra
// del navegador de un telefono real queda DEBAJO del pliegue. Es el unico
// alto en el que la espera se puede comprobar.
const ALTO = Number(process.argv[4] || 560)

// Los momentos de la pasada, contados desde que la escena entra en pantalla.
const CUADROS = [0, 300, 600, 900, 1200, 1600, 2200, 3000]

// Un quinto argumento acota la corrida a las rutas cuyo nombre lo contenga:
// util para mirar una sola escena sin pagar las once.
const FILTRO = process.argv[5] || ''

const RUTAS = [
  ['/servicios/plataformas-software-medida/', 'planilla'],
  ['/servicios/automatizaciones/', 'tuberia'],
  ['/servicios/soluciones-ia-medida/', 'bandeja'],
  ['/servicios/desarrollo-web-ia/', 'captura'],
  ['/servicios/', 'indice'],
  ['/contacto/', 'hilo'],
  ['/productos/', 'productos'],
].filter(([, n]) => n.includes(FILTRO))

mkdirSync(SALIDA, { recursive: true })

const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PUERTO}`, '--window-size=375,' + ALTO,
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

// El estado de cada caja, tal como lo ve el navegador. Nada de esto es
// opinion: son rectangulos y relojes de animacion.
const ESTADO = String.raw`
(() => {
  return Array.from(document.querySelectorAll('.esc')).map((esc, n) => {
    const r = esc.getBoundingClientRect();
    const env = esc.closest('.revela') || esc.parentElement;
    // getAnimations({subtree:true}) trae tambien las del propio elemento
    // -el barrido de entrada- y las de todos sus hijos de una sola vez.
    // Cuanto de la caja usa el dibujo y cuanto es aire. Se mide en el estado
    // final -el que el visitante mira los ocho segundos que le quedan-.
    //
    // Solo cuentan las cajas que PINTAN algo. Un envoltorio que no pinta nada
    // miente: .esc__carga de la tuberia es una pista de 140 px de alto con un
    // punto de 10 px adentro, y como la pasada la baja entera, su caja
    // terminaba 41 px debajo del borde y el informe cantaba un desborde que
    // nadie ve. Pinta el punto, no la pista.
    const pinta = (nodo, cs) => {
      if (cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
      const fondo = cs.backgroundColor;
      if (fondo && fondo !== 'transparent' && !/,\s*0\)$/.test(fondo)) return true;
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
      for (const lado of ['Top', 'Right', 'Bottom', 'Left']) {
        if (parseFloat(cs['border' + lado + 'Width']) > 0 && cs['border' + lado + 'Style'] !== 'none') return true;
      }
      if (cs.boxShadow && cs.boxShadow !== 'none') return true;
      for (const t of nodo.childNodes) if (t.nodeType === 3 && t.textContent.trim()) return true;
      // Una hoja sin hijos pinta por definicion -un punto, un tic, una barra-,
      // aunque lo dibuje un ::before que aca no se puede consultar.
      return nodo.children.length === 0;
    };
    let _t = Infinity, _b = -Infinity, _l = Infinity, _d = -Infinity;
    esc.querySelectorAll('*').forEach(nodo => {
      const q = nodo.getBoundingClientRect();
      if (!q.width || !q.height) return;
      if (!pinta(nodo, getComputedStyle(nodo))) return;
      _t = Math.min(_t, q.top); _b = Math.max(_b, q.bottom);
      _l = Math.min(_l, q.left); _d = Math.max(_d, q.right);
    });
    const aire = _b === -Infinity ? null : {
      arriba: Math.round(_t - r.top), abajo: Math.round(r.bottom - _b),
      izq: Math.round(_l - r.left), der: Math.round(r.right - _d),
      lleno: Math.round(((Math.min(_b, r.bottom) - Math.max(_t, r.top)) / r.height) * 100),
    };
    const anim = esc.getAnimations({ subtree: true });
    const corriendo = anim.filter(a => a.playState === 'running');
    const infinitas = anim.filter(a => {
      const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : null;
      return t && t.iterations === Infinity;
    });
    const avance = Math.max(0, ...anim.map(a => Number(a.currentTime) || 0));
    return {
      n,
      clase: esc.className.replace('esc esc--', '').replace(/\s+/g, ' ').trim(),
      envoltorio: (env && env.className) || '',
      top: Math.round(r.top), alto: Math.round(r.height), ancho: Math.round(r.width),
      bajoElPliegue: r.top >= innerHeight,
      animaciones: anim.length,
      corriendo: corriendo.length,
      infinitas: infinitas.length,
      nombresCorriendo: [...new Set(corriendo.map(a => a.animationName))].slice(0, 6),
      avance: Math.round(avance),
      estados: anim.reduce((a, x) => (a[x.playState] = (a[x.playState] || 0) + 1, a), {}),
      aire,
      recorte: getComputedStyle(esc).clipPath,
      visor: innerHeight,
      desplazamiento: Math.round(scrollY),
    };
  });
})()
`

const ws = new WebSocket(await esperar())
await new Promise(ok => ws.addEventListener('open', ok))
const s = new S(ws)
const { targetId } = await s.e('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await s.e('Target.attachToTarget', { targetId, flatten: true })
await s.e('Page.enable', {}, sessionId); await s.e('Runtime.enable', {}, sessionId)
await s.e('Emulation.setDeviceMetricsOverride', { width: 375, height: ALTO, deviceScaleFactor: 2, mobile: true }, sessionId)

const ev = async (expression, awaitPromise = false) =>
  (await s.e('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }, sessionId)).result.value

const fallas = []
const filas = []

for (const [ruta, nombre] of RUTAS) {
  await s.e('Page.navigate', { url: BASE + ruta }, sessionId)
  await espera(1400)
  await ev('(async()=>{await document.fonts.ready;return 1})()', true)
  // El cartel de cookies es fixed, negro y de 173px: en un visor de 560 se
  // sienta encima del ultimo tercio de la escena. La foto salia con una
  // banda negra abajo y parecia que el dibujo se cortaba -de ahi la nota
  // de la Tanda A sobre Unificalo, Citaly y Leads, que era falsa-. Es un
  // perfil nuevo en cada corrida, asi que el cartel aparece siempre.
  await ev(`(() => {
    const e = document.createElement('style');
    e.textContent = '.consent-banner{display:none !important}';
    document.head.appendChild(e);
    return 1;
  })()`)
  const cargo = await ev('(() => ({ error: document.body.className.includes("neterror"), header: !!document.querySelector(".site-header") }))()')
  if (cargo.error || !cargo.header) { console.log(`!! ${ruta} NO CARGO`); process.exitCode = 2; continue }

  // --- ESPERA: sin haber scrolleado, lo que esta debajo del pliegue
  //     tiene que seguir en cero. -----------------------------------
  await espera(1600)
  const quietas = await ev(ESTADO)
  for (const e of quietas) {
    if (!e.bajoElPliegue) continue
    if (e.avance > 60) {
      fallas.push(`ESPERA · ${ruta} · .esc--${e.clase}: la pasada avanzo ${e.avance} ms con la caja a ${e.top} px, debajo de un visor de ${e.visor}`)
    }
  }

  // --- QUIETA + pelicula, una caja por vez -----------------------
  for (const objetivo of quietas) {
    const etiqueta = `${nombre}-${objetivo.clase.replace(/[^a-z0-9]+/gi, '-')}`

    // Se recarga para cada caja: asi cada pasada arranca de cero y el
    // reloj del cuadro 0 es el reloj de verdad, no el de una escena que
    // ya corrio mientras se miraba la de al lado.
    await s.e('Page.navigate', { url: BASE + ruta }, sessionId)
    await espera(1400)
    // La hoja pone scroll-behavior: smooth, asi que scrollIntoView tarda
    // segundos en llegar y se medía la escena todavia en viaje. Se apaga
    // para esta corrida: lo que se mide es la escena, no el scroll.
    await ev(`(async()=>{
      document.documentElement.style.scrollBehavior = 'auto';
      // La recarga se lleva el estilo que tapaba el cartel de cookies: va de
      // nuevo, o la pelicula sale con la banda negra sobre el ultimo tercio.
      const capa = document.createElement('style');
      capa.textContent = '.consent-banner{display:none !important}';
      document.head.appendChild(capa);
      const e = document.querySelectorAll('.esc')[${objetivo.n}];
      e.scrollIntoView({ block: 'center' });
      await new Promise(r => setTimeout(r, 120));
      return 1;
    })()`, true)

    // El reloj lo lleva la pagina, no el guion. Cada cuadro cuesta unos 250 ms
    // entre la consulta y el PNG, asi que contando solo las esperas el cuadro
    // rotulado "600 ms" caia en realidad cerca de los 1.400 y la pelicula
    // mostraba ocho veces el estado final. Antes de cada foto se pregunta
    // cuanto falta de verdad, y el nombre del archivo lleva el avance medido
    // de la pasada, que es el unico numero que no se puede desfasar.
    const arranque = await ev('performance.now()')
    for (const t of CUADROS) {
      const falta = t - ((await ev('performance.now()')) - arranque)
      if (falta > 0) await espera(falta)
      const caja = await ev(`(() => { const r = document.querySelectorAll('.esc')[${objetivo.n}].getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height } })()`)
      // Sin captureBeyondViewport: medido, esa opcion deja la pagina en el
      // fondo -Chrome estira el visor a todo el documento y no lo devuelve-,
      // la escena se sale de pantalla, le entra .revela--fuera y la pelicula
      // termina siendo ocho fotos de una escena en pausa. La escena ya esta
      // a la vista, asi que el recorte cae dentro del visor igual.
      const { data } = await s.e('Page.captureScreenshot', {
        format: 'png',
        clip: { x: caja.x, y: caja.y, width: caja.w, height: caja.h, scale: 2 },
      }, sessionId)
      const avance = await ev(`(() => { const a = document.querySelectorAll('.esc')[${objetivo.n}].getAnimations({ subtree: true }); return Math.round(Math.max(0, ...a.map(x => Number(x.currentTime) || 0))) })()`)
      writeFileSync(`${SALIDA}/${etiqueta}-${String(t).padStart(4, '0')}ms-pasada${String(avance).padStart(4, '0')}.png`, Buffer.from(data, 'base64'))
    }

    const fin = (await ev(ESTADO))[objetivo.n]
    filas.push({ ruta, clase: fin.clase, ancho: fin.ancho, alto: fin.alto,
      animaciones: fin.animaciones, corriendo: fin.corriendo, infinitas: fin.infinitas,
      nombres: fin.nombresCorriendo.join(', '), recorte: fin.recorte,
      estados: JSON.stringify(fin.estados), envoltorio: fin.envoltorio.replace('revela revela--escena', '~'),
      top: fin.top, desplazamiento: fin.desplazamiento, aire: fin.aire })
    if (fin.infinitas > 0) fallas.push(`QUIETA · ${ruta} · .esc--${fin.clase}: ${fin.infinitas} animaciones declaradas infinite`)
    if (fin.corriendo > 0) fallas.push(`QUIETA · ${ruta} · .esc--${fin.clase}: a los 3 s siguen corriendo ${fin.corriendo} (${fin.nombresCorriendo.join(', ')})`)
    // "inset(0px 0% 0px 0px)" es la caja entera igual que "inset(0px 0px 0px 0px)":
    // un cero en porcentaje sigue siendo cero. Se miran los numeros, no el texto.
    const abierta = fin.recorte === 'none' || /^inset\((?:\s*0(?:px|%)?){1,4}\s*\)$/.test(fin.recorte)
    if (!abierta) fallas.push(`RECORTE · ${ruta} · .esc--${fin.clase}: la caja quedo recortada en ${fin.recorte}`)
  }
}

console.log(`\n=== ${filas.length} escenas, 375 x ${ALTO} ===`)
for (const f of filas) {
  console.log(`  ${(f.ruta + ' · ' + f.clase).padEnd(52)} ${String(f.ancho).padStart(4)}x${f.alto}  anim ${String(f.animaciones).padStart(3)}  infinite ${String(f.infinitas).padStart(3)}  ${f.estados}`)
  console.log(`  ${''.padEnd(52)} y=${f.top} scroll=${f.desplazamiento} env="${f.envoltorio}"${f.nombres ? ' <- ' + f.nombres : ''}`)
  const a = f.aire
  if (a) console.log(`  ${''.padEnd(52)} aire arriba=${String(a.arriba).padStart(3)} abajo=${String(a.abajo).padStart(3)} izq=${String(a.izq).padStart(3)} der=${String(a.der).padStart(3)}  lleno ${a.lleno}%`)
}
console.log(`\n=== ${fallas.length} fallas ===`)
for (const f of fallas) console.log('  ' + f)
console.log(`\nLa pelicula quedo en ${SALIDA}`)
if (fallas.length) process.exitCode = 1

ws.close(); chrome.kill()
await espera(400)
try { rmSync(SALIDA + '/perfil', { recursive: true, force: true, maxRetries: 5 }) } catch {}
