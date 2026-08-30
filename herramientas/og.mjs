// La tarjeta que se ve cuando alguien pega el enlace en WhatsApp, LinkedIn o
// un chat cualquiera. Se genera, no se dibuja a mano: la version anterior
// llevaba cinco nombres de cliente escritos dentro del PNG, asi que cada vez
// que la cartera cambiaba la imagen mentia y nadie se enteraba.
//
//   node herramientas/og.mjs                 -> escribe public/og.png
//   node herramientas/og.mjs .tmp/og.png     -> lo escribe en otra parte
//
// Que lleva y que no. Marca y lema, nada mas. Sin nombres de cliente, sin
// cifras agregadas, sin nada que insinue que hay un producto abierto. Si
// manana el lema cambia, se cambia LEMA aqui abajo y se vuelve a correr.
//
// Como se dibuja. Papel y tinta, la misma gramatica del sitio: fondo --paper,
// texto --ink, la mitad operativa del lema en --signal-ink igual que el <em>
// del heroe, y el logo dentro del mismo disco de tinta que la cabecera
// (.brand-mark__plate). El interletrado NO copia el -0.07em del H1: a este
// tamano funde las palabras, que es justo el defecto que la Fase 3 vino a
// corregir.
//
// Las tipografias se bajan de Google en el momento de renderizar, que es la
// misma fuente de la que next/font las toma en el build. Hace falta red una
// vez; el PNG que queda no depende de nada.
//
// El logo va incrustado en base64 dentro del HTML: asi la pagina se abre como
// data: URL y no hay que dejar un archivo temporal dentro de public/.
import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as espera } from 'node:timers/promises'

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PUERTO = 9379
const PERFIL = resolve(RAIZ, '.tmp/og-perfil')
const DESTINO = resolve(process.argv[2] || 'public/og.png')

// El lema gobernante, partido en sus dos oraciones para poder pintar la
// segunda con el acento. La version entera vive en lib/site.ts como LEMA:
// este archivo es JavaScript suelto y no puede importar TypeScript, asi que en
// vez de confiar en que las dos copias sigan iguales se lee el fuente y se
// comparan. Si alguien cambia el lema en un solo sitio, la tarjeta no se
// genera y dice cual de los dos quedo atras.
const LEMA_FIJO = 'Trabajamos con negocios chilenos'
const LEMA_ACENTO = 'que ya están funcionando.'
const DOMINIO = 'iaenblanco.com'

const fuenteSite = readFileSync(resolve(RAIZ, 'lib/site.ts'), 'utf8')
const declarado = /export const LEMA = '([^']*)'/.exec(fuenteSite)
if (!declarado) throw new Error('lib/site.ts ya no declara LEMA como literal: revisa el regex de aqui arriba')
if (declarado[1] !== `${LEMA_FIJO} ${LEMA_ACENTO}`) {
  throw new Error(`el lema difiere.
  lib/site.ts: ${declarado[1]}
  og.mjs     : ${LEMA_FIJO} ${LEMA_ACENTO}`)
}

const logo = readFileSync(resolve(RAIZ, 'public/logo-ui.webp')).toString('base64')

const HTML = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400..700&display=swap" rel="stylesheet">
<style>
  :root {
    --paper: #f4f2ec;
    --ink: #070a0f;
    --signal-ink: #1b6a80;
    --graphite: #4a545f;
    --line: rgba(7, 10, 15, 0.14);
    --line-soft: rgba(7, 10, 15, 0.08);
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: "Instrument Sans", "Segoe UI", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 84px 96px;
  }
  /* La retícula del heroe, a la misma opacidad que --line-soft y sin llegar a
     los bordes: en la miniatura que arma WhatsApp se lee como textura de
     papel, no como una tabla. */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background:
      repeating-linear-gradient(to right, var(--line-soft) 0 1px, transparent 1px 120px),
      repeating-linear-gradient(to bottom, var(--line-soft) 0 1px, transparent 1px 120px);
    -webkit-mask-image: radial-gradient(120% 100% at 78% 22%, #000 0%, transparent 72%);
  }
  .marca, .lema, .pie { position: relative; }
  .disco {
    display: grid;
    place-items: center;
    width: 132px;
    height: 132px;
    border-radius: 50%;
    background: var(--ink);
    overflow: hidden;
  }
  .disco img { width: 92%; height: 92%; object-fit: contain; }
  /* Dos lineas exactas, una por oracion, y ninguna se parte sola: con salto
     automatico la primera dejaba "chilenos" huerfano en una linea propia. El
     nowrap obliga a que el tamano sea el correcto en vez de esconder el
     problema partiendo la frase; si manana el lema crece, la medicion de mas
     abajo detiene la tarjeta en vez de dejarla cortada. */
  .lema {
    font-size: 66px;
    font-weight: 550;
    letter-spacing: -0.035em;
    line-height: 1.12;
  }
  .lema span, .lema em { display: block; white-space: nowrap; }
  .lema em { color: var(--signal-ink); font-style: normal; }
  .pie {
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--graphite);
    font-family: "IBM Plex Mono", Consolas, monospace;
    font-size: 21px;
    font-weight: 500;
    letter-spacing: 0.06em;
  }
  .pie span { flex: 1; height: 1px; background: var(--line); }
</style></head>
<body>
  <div class="marca"><div class="disco"><img src="data:image/webp;base64,${logo}" alt=""></div></div>
  <h1 class="lema"><span>${LEMA_FIJO}</span><em>${LEMA_ACENTO}</em></h1>
  <div class="pie"><span></span>${DOMINIO}</div>
</body></html>`

const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PUERTO}`, '--window-size=1200,630',
  '--user-data-dir=' + PERFIL, 'about:blank'], { stdio: 'ignore' })

async function esperarChrome() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PUERTO}/json/version`); if (r.ok) return (await r.json()).webSocketDebuggerUrl } catch {}
    await espera(500)
  }
  throw new Error('Chrome no arranca')
}

class S {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.p = new Map()
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data)
      if (m.id && this.p.has(m.id)) {
        const { ok, mal } = this.p.get(m.id); this.p.delete(m.id)
        m.error ? mal(new Error(JSON.stringify(m.error))) : ok(m.result)
      }
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

try {
  const url = await esperarChrome()
  const ws = new WebSocket(url)
  await new Promise((ok) => ws.addEventListener('open', ok))
  const s = new S(ws)
  const { targetId } = await s.e('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await s.e('Target.attachToTarget', { targetId, flatten: true })
  await s.e('Page.enable', {}, sessionId)
  await s.e('Emulation.setDeviceMetricsOverride',
    { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false }, sessionId)

  // data: URL en vez de un archivo temporal. Se navega y se espera a que las
  // caras esten cargadas: sin document.fonts.ready la captura sale con la
  // tipografia de respaldo y el interletrado no es el que se ajusto.
  const data = 'data:text/html;charset=utf-8,' + encodeURIComponent(HTML)
  await s.e('Page.navigate', { url: data }, sessionId)
  await espera(1200)
  for (let i = 0; i < 40; i++) {
    const { result } = await s.e('Runtime.evaluate',
      { expression: 'document.fonts.ready.then(() => document.fonts.check("550 76px \'Instrument Sans\'"))', awaitPromise: true, returnByValue: true }, sessionId)
    if (result.value) break
    await espera(250)
  }
  // Un fotograma mas: la mascara radial de la reticula se compone despues de
  // que las caras cambian el layout.
  await espera(400)

  // Se mide lo que quedo dibujado, no lo que se penso. Las dos lineas del lema
  // van en nowrap: si una se pasa de la columna la tarjeta sale cortada, y eso
  // no se nota hasta que alguien la pega en un chat. Aqui se detiene antes.
  const { result: medida } = await s.e('Runtime.evaluate', { expression: `(() => {
    const col = 1200 - 96 * 2;
    // Con un Range, no con el rect del nodo: span y em son de bloque y su caja
    // mide la columna entera, asi que el rect diria 1008 siempre y el limite
    // no saltaria nunca. El Range mide la tinta.
    const l = [...document.querySelectorAll('.lema span, .lema em')].map((n) => {
      const r = document.createRange(); r.selectNodeContents(n);
      return { t: n.textContent, w: +r.getBoundingClientRect().width.toFixed(1) };
    });
    const caja = document.querySelector('.lema').getBoundingClientRect();
    return JSON.stringify({ col, l, alto: +caja.height.toFixed(1) });
  })()`, returnByValue: true }, sessionId)
  const m = JSON.parse(medida.value)
  for (const linea of m.l) {
    if (linea.w > m.col) throw new Error(`la linea "${linea.t}" mide ${linea.w}px y la columna son ${m.col}px`)
  }
  console.log('lema ' + m.l.map((x) => x.w).join(' / ') + ' de ' + m.col + ' px, alto ' + m.alto)

  const { data: png } = await s.e('Page.captureScreenshot',
    { format: 'png', captureBeyondViewport: false }, sessionId)
  const bytes = Buffer.from(png, 'base64')
  writeFileSync(DESTINO, bytes)
  console.log(`escrito ${DESTINO} (${bytes.length} bytes, 1200x630)`)
  ws.close()
} finally {
  chrome.kill()
}
