// La batería completa: doce criterios, todas las rutas, todos los anchos.
// Cada uno es comprobable: o el número es cero, o sale la falla con su
// selector, su texto y cuánto se pasa. Nada es opinión.
//
//   node herramientas/verificar.mjs <carpeta-temporal> <base> <anchos> <rutas>
//
// Sirve tanto contra el build local como contra el dominio en vivo:
//   npm run build
//   node herramientas/servir.mjs out 3210
//   node herramientas/verificar.mjs .tmp/ver http://localhost:3210 1920,390 /
//   node herramientas/verificar.mjs .tmp/ver https://iaenblanco.com 1920,390 /
//
// La carpeta temporal se resuelve a ruta absoluta: Chrome 151 ya no acepta
// un --user-data-dir relativo y se niega a arrancar sin decir por que.
//
// Borra la carpeta temporal al terminar: cada pasada deja un perfil de Chrome
// de ~200 MB, y en Windows las rutas son tan largas que Remove-Item no puede
// con ellas (hay que vaciarlas antes con robocopy contra una carpeta vacia).
//
// Se juzga solo lo que está a la vista, pantalla por pantalla. Quedan fuera a
// propósito el enlace "Saltar al contenido", la capa de consentimiento y el
// contenido de un <details> cerrado. Si el servidor se cae, Chrome pinta su
// pantalla de error: el script lo detecta y termina con codigo 2.
import { spawn } from 'node:child_process'
import { setTimeout as espera } from 'node:timers/promises'
import { resolve } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PUERTO = 9371
const SALIDA = resolve(process.argv[2] || '.tmp/ver')
const BASE = process.argv[3] || 'http://localhost:3210'
const ANCHOS = (process.argv[4] || '1440,390').split(',').map(Number)
const RUTAS = (process.argv[5] || '/,/servicios/,/productos/,/trabajos/,/contacto/,/servicios/desarrollo-web-ia/,/privacidad/,/terminos/').split(',')

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

const REVISAR = String.raw`
(() => {
  const F = { contraste: [], fuera: [], sobreLinea: [], encima: [], toque: [], scrollH: [], imagenes: [], chico: [], partida: [], icono: [], cortado: [], pegados: [] };
  const nom = (e) => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).filter(c => c !== 'is-visible' && c !== 'reveal').slice(0, 3).join('.') : '');
  const ruta = (e) => [e.parentElement, e].filter(Boolean).map(nom).join(' > ');
  const movil = innerWidth < 800;

  // El navegador es quien sabe traducir cualquier notacion de color
  // (color-mix, color(srgb ...), oklch, rgb, nombres). Un lienzo de 1x1 lo
  // resuelve exacto; el parseo a mano se equivocaba con color-mix.
  const _cv = document.createElement('canvas'); _cv.width = _cv.height = 1;
  const _cx = _cv.getContext('2d', { willReadFrequently: true });
  const _cache = new Map();
  const rgb = (v) => {
    const k = String(v || '').trim();
    if (_cache.has(k)) return _cache.get(k);
    let out = null;
    if (k && k !== 'none') {
      // fillStyle conserva el valor anterior si el color no es valido:
      // se prueba con dos centinelas distintos para detectarlo.
      _cx.fillStyle = '#123456'; _cx.fillStyle = k; const a1 = _cx.fillStyle;
      _cx.fillStyle = '#654321'; _cx.fillStyle = k; const a2 = _cx.fillStyle;
      if (a1 === a2) {
        _cx.clearRect(0, 0, 1, 1);
        _cx.fillStyle = k;
        _cx.fillRect(0, 0, 1, 1);
        const d = _cx.getImageData(0, 0, 1, 1).data;
        out = { r: d[0], g: d[1], b: d[2], a: +(d[3] / 255).toFixed(4) };
      }
    }
    _cache.set(k, out);
    return out;
  };
  const sobre = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
  const lum = (c) => { const v = [c.r, c.g, c.b].map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4) }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2] };
  const razon = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05) };
  const fondoDe = (e) => {
    let n = e, acc = null;
    while (n && n !== document.documentElement) {
      const c = rgb(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) { acc = acc ? sobre(acc, c) : c; if (acc.a >= 0.999) return acc }
      n = n.parentElement;
    }
    const base = { r: 255, g: 255, b: 255, a: 1 };
    return acc ? sobre(acc, base) : base;
  };

  // Lo que no cuenta como falla y hay que descartar antes de medir:
  //  - el enlace "Saltar al contenido": vive fuera de pantalla a proposito
  //  - la capa de consentimiento: es una capa flotante, va encima por diseño
  //  - el contenido de un <details> cerrado: el navegador lo apila en el resumen
  const aLaVista = (e) => {
    const r = e.getBoundingClientRect();
    // Un elemento con display:none devuelve {0,0,0,0}, y sin este primer
    // filtro el rectangulo vacio pasaba por "esta arriba del todo, a la
    // vista". Asi se colaban dos logos ocultos como imagenes sin cargar:
    // el lazy-load nunca los pide porque no tienen caja.
    if (r.width < 1 || r.height < 1) return false;
    return r.bottom > -40 && r.top < innerHeight + 40;
  };
  const excluido = (e) => {
    if (e.closest('.skip-link, .consent-banner')) return true;
    // Con content-visibility:auto el navegador NO vuelve a maquetar el subarbol
    // mientras esta fuera de pantalla: conserva la maquetacion anterior. Si se
    // mide ahi, salen cortes de palabra de una maquetacion vieja y mas
    // estrecha, que en pantalla no existen. checkVisibility lo dice exacto.
    if (e.checkVisibility && !e.checkVisibility({ contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true })) return true;
    if (!aLaVista(e)) return true;
    const d = e.closest('details');
    if (d && !d.open && e !== d && !d.querySelector('summary')?.contains(e)) return true;
    let n = e;
    while (n && n !== document.body) {
      const pos = getComputedStyle(n).position;
      if (pos === 'fixed' || pos === 'sticky') return true;
      n = n.parentElement;
    }
    return false;
  };

  const hojas = [...document.querySelectorAll('*')].filter((e) => {
    if (e.closest('svg')) return false;
    if (excluido(e)) return false;
    const t = (e.textContent || '').trim();
    if (t.length < 2) return false;
    if ([...e.children].some((c) => (c.textContent || '').trim().length > 1)) return false;
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });

  // 1. contraste AA
  hojas.forEach((e) => {
    const cs = getComputedStyle(e);
    const f = rgb(cs.color); if (!f) return;
    const b = fondoDe(e);
    const col = f.a < 1 ? sobre(f, b) : f;
    const fs = parseFloat(cs.fontSize), pes = parseInt(cs.fontWeight) || 400;
    const grande = fs >= 24 || (fs >= 18.66 && pes >= 700);
    const min = grande ? 3 : 4.5;
    const r = razon(col, b);
    if (r < min - 0.02) F.contraste.push({ sel: ruta(e), r: +r.toFixed(2), min, fs, t: (e.textContent || '').trim().slice(0, 34) });
  });

  // 2. texto fuera de su caja  /  3. texto sobre una línea visible
  const lineas = [];
  const seVe = (e) => {
    let n = e;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n);
      if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.05) return false;
      n = n.parentElement;
    }
    return true;
  };
  document.querySelectorAll('*').forEach((e) => {
    if (e.closest('svg, header, nav') || excluido(e) || !seVe(e)) return;
    const cs = getComputedStyle(e), r = e.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    ['Top', 'Bottom'].forEach((l) => {
      const w = parseFloat(cs['border' + l + 'Width']);
      const c = rgb(cs['border' + l + 'Color']);
      if (w > 0 && c && c.a > 0.08) lineas.push({ y: l === 'Top' ? r.top : r.bottom, x1: r.left, x2: r.right, sel: nom(e) });
    });
    if (r.height <= 3 && r.width > 40) { const c = rgb(cs.backgroundColor); if (c && c.a > 0.08) lineas.push({ y: r.top + r.height / 2, x1: r.left, x2: r.right, sel: nom(e) }) }
  });

  // La caja de una linea de texto incluye el interlineado, que es aire.
  // Se descuenta para quedarse con la mancha real de las letras: si no, un
  // circulo que termina 3 px sobre la linea parecia estar encima del texto.
  // La mancha de tinta se mide sobre el texto SIN los espacios de los bordes:
  // un espacio final dentro del elemento hacia que su caja llegara hasta el
  // vecino y el criterio 'pegados' lo leyera como hueco cero, cuando en
  // pantalla el espacio esta y se ve.
  const tinta = (e) => {
    const rg = document.createRange();
    const n0 = e.firstChild, n1 = e.lastChild;
    if (n0 && n0.nodeType === 3 && n1 && n1.nodeType === 3) {
      const d0 = n0.data, d1 = n1.data;
      const i0 = d0.length - d0.replace(/^[\s ]+/, '').length;
      const i1 = d1.replace(/[\s ]+$/, '').length;
      if (i0 < d0.length && i1 > 0) { rg.setStart(n0, i0); rg.setEnd(n1, i1) }
      else rg.selectNodeContents(e);
    } else rg.selectNodeContents(e);
    const fs = parseFloat(getComputedStyle(e).fontSize) || 16;
    const rs = [...rg.getClientRects()].filter((r) => r.width > 0 && r.height > 0).map((r) => {
      const aire = Math.max(0, (r.height - fs) / 2);
      return { left: r.left, right: r.right, top: r.top + aire, bottom: r.bottom - aire };
    });
    rg.detach && rg.detach();
    if (!rs.length) return null;
    return { left: Math.min(...rs.map(r => r.left)), right: Math.max(...rs.map(r => r.right)), top: Math.min(...rs.map(r => r.top)), bottom: Math.max(...rs.map(r => r.bottom)), lineas: rs.length };
  };

  hojas.forEach((e) => {
    const t = tinta(e); if (!t) return;
    // fuera de su contenedor con caja
    let p = e.parentElement, caja = null;
    for (let i = 0; i < 4 && p; i++, p = p.parentElement) {
      const cs = getComputedStyle(p);
      const conBorde = ['Top','Right','Bottom','Left'].some((l) => parseFloat(cs['border' + l + 'Width']) > 0 && (rgb(cs['border' + l + 'Color']) || {a:0}).a > 0.08);
      const conFondo = (rgb(cs.backgroundColor) || { a: 0 }).a > 0.08;
      if ((conBorde || conFondo) && cs.overflow === 'visible') { caja = p; break }
    }
    if (caja) {
      const rc = caja.getBoundingClientRect();
      const d = Math.max(rc.left - t.left, t.right - rc.right, rc.top - t.top, t.bottom - rc.bottom);
      if (d > 2) F.fuera.push({ sel: ruta(e), d: Math.round(d), t: (e.textContent || '').trim().slice(0, 34) });
    }
    // encima de una línea
    for (const L of lineas) {
      if (L.y > t.top + 1.5 && L.y < t.bottom - 1.5 && L.x1 < t.right - 1.5 && L.x2 > t.left + 1.5) {
        F.sobreLinea.push({ sel: ruta(e), linea: L.sel, t: (e.textContent || '').trim().slice(0, 34) });
        break;
      }
    }
  });

  // 4. dos textos encima
  const cajas = hojas.map((e) => ({ e, t: tinta(e) })).filter((x) => x.t);
  for (let i = 0; i < cajas.length; i++) {
    for (let j = i + 1; j < cajas.length; j++) {
      const a = cajas[i], b = cajas[j];
      if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
      const ix = Math.min(a.t.right, b.t.right) - Math.max(a.t.left, b.t.left);
      const iy = Math.min(a.t.bottom, b.t.bottom) - Math.max(a.t.top, b.t.top);
      if (ix > 2 && iy > 2) F.encima.push({ a: ruta(a.e), b: ruta(b.e), ta: (a.e.textContent||'').trim().slice(0,24), tb: (b.e.textContent||'').trim().slice(0,24) });
    }
  }

  // 5. objetivo táctil (solo teléfono; los enlaces dentro de un párrafo están exentos)
  if (movil) {
    document.querySelectorAll('a,button,input,select,textarea,[role="button"]').forEach((e) => {
      if (excluido(e)) return;
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const r = e.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      if (cs.display === 'inline' && e.closest('p,li,dd')) return;
      if (r.height < 40 || r.width < 40) F.toque.push({ sel: ruta(e), w: Math.round(r.width), h: Math.round(r.height), t: (e.textContent||'').trim().slice(0,28) });
    });
  }

  // 6. barrido lateral
  if (document.documentElement.scrollWidth > innerWidth + 1) {
    const culpables = [];
    document.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > innerWidth + 2 && r.width > 20) culpables.push(nom(e) + ' +' + Math.round(r.right - innerWidth)) });
    F.scrollH.push({ doc: document.documentElement.scrollWidth, vp: innerWidth, culpables: culpables.slice(0, 6) });
  }

  // 7. imágenes que no cargaron
  document.querySelectorAll('img').forEach((im) => {
    // Solo cuenta lo que ya deberia verse: una imagen perezosa a tres
    // pantallas de distancia todavia no tiene por que haber cargado.
    if (!aLaVista(im)) return;
    if (!im.complete || im.naturalWidth === 0) F.imagenes.push({ src: (im.currentSrc || im.src || '').slice(-52), alt: im.alt ? 'con alt' : 'SIN ALT' });
    if (im.getAttribute('alt') === null) F.imagenes.push({ src: (im.currentSrc || im.src || '').slice(-52), alt: 'SIN ATRIBUTO ALT' });
  });

  // 8. piso de letra en el teléfono
  if (movil) {
    hojas.forEach((e) => {
      const t = (e.textContent || '').trim();
      if (t.length < 5) return;
      const fs = parseFloat(getComputedStyle(e).fontSize);
      if (fs < 12) F.chico.push({ sel: ruta(e), fs, t: t.slice(0, 30) });
    });
  }

  // 9. palabras cortadas a la mitad SIN guion.
  //    Partir con guion ("pla-nillas") es tipografia correcta en castellano y
  //    la hace el navegador con hyphens:auto. Lo que hay que cazar es el corte
  //    a lo bruto ("Automatiza / r"), que es el que se ve mal. Se distinguen
  //    midiendo: el corte con guion suma el ancho del guion; el otro no.
  const _anchoCache = new Map();
  const anchoNatural = (e, pal) => {
    const cs = getComputedStyle(e);
    const k = cs.font + '|' + cs.letterSpacing + '|' + pal;
    if (_anchoCache.has(k)) return _anchoCache.get(k);
    const clon = document.createElement('span');
    clon.textContent = pal;
    clon.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:pre;font:' + cs.font + ';letter-spacing:' + cs.letterSpacing;
    document.body.appendChild(clon);
    const w = clon.getBoundingClientRect().width;
    clon.remove();
    _anchoCache.set(k, w);
    return w;
  };

  document.querySelectorAll('*').forEach((e) => {
    if (e.closest('svg') || excluido(e)) return;
    // El corte de linea hay que medirlo con la caja ya asentada. En el borde
    // del viewport, con content-visibility y las animaciones de entrada, el
    // navegador reparte la palabra en varios rectangulos que en pantalla no
    // existen: comprobado que "planillas" da un solo rectangulo de 100 px en
    // cuanto la tarjeta esta entera a la vista.
    const rr = e.getBoundingClientRect();
    if (rr.top < 0 || rr.bottom > innerHeight) return;
    if (!e.childNodes.length || ![...e.childNodes].every((n) => n.nodeType === 3)) return;
    const nodo = e.firstChild;
    if (!nodo || nodo.nodeType !== 3) return;
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const re = /[^\s\u00A0]+/g;
    let m;
    while ((m = re.exec(nodo.data))) {
      const pal = m[0];
      if (pal.length < 6 || /[-\u2013\u2014/·]/.test(pal)) continue;
      const rg = document.createRange();
      rg.setStart(nodo, m.index); rg.setEnd(nodo, m.index + pal.length);
      const rs = [...rg.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
      rg.detach && rg.detach();
      // Una palabra esta partida solo si sus pedazos caen en LINEAS distintas.
      // getClientRects tambien devuelve varios rectangulos cuando el navegador
      // corta el texto en tramos por dentro (cambio de fuente, direccion,
      // maquetacion recien rehecha), y esos van todos en la misma linea: eso
      // no es una palabra partida. Comprobado a ojo en /: "planillas",
      // "preguntas" y "encuentra" salian marcadas y se ven enteras.
      const lineas = new Set(rs.map((r) => Math.round(r.top)));
      if (lineas.size > 1) {
        const suma = rs.reduce((a, r) => a + r.width, 0);
        const natural = anchoNatural(e, pal);
        // Si lo pintado mide mas que la palabra suelta, hay un guion de por
        // medio y el corte es correcto. Si mide lo mismo, la cortaron a secas.
        if (suma - natural < 2) F.partida.push({ sel: ruta(e), pal });
      }
    }
  });

  // 10. un icono pintado ENCIMA del texto
  //     No basta con que las cajas se crucen: el dibujo de fondo de un
  //     diagrama cruza todo y va por debajo. Lo que importa es quien pinta
  //     arriba, y eso lo contesta el propio navegador: se pregunta que hay
  //     en el punto donde estan las letras.
  cajas.forEach(({ e, t }) => {
    const puntos = [
      [(t.left + t.right) / 2, (t.top + t.bottom) / 2],
      [t.right - 3, (t.top + t.bottom) / 2],
      [t.left + 3, (t.top + t.bottom) / 2],
    ];
    for (const [x, y] of puntos) {
      if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) continue;
      const arriba = document.elementFromPoint(x, y);
      if (!arriba || arriba === e || e.contains(arriba) || arriba.contains(e)) continue;
      const sv = arriba.closest('svg');
      if (!sv || e.contains(sv)) continue;
      const c = getComputedStyle(sv);
      if (c.position !== 'absolute' && c.position !== 'fixed') continue;
      if (excluido(sv)) continue;
      F.icono.push({ sel: ruta(e), t: (e.textContent || '').trim().slice(0, 30) });
      return;
    }
  });

  // 11. texto recortado por el borde de la pantalla
  //     Distinto de "scrollH": cuando un antepasado tiene overflow hidden la
  //     pagina NO se desplaza de lado, simplemente se pierde el final de la
  //     frase. Es lo que se ve como "la seccion sale cortada".
  cajas.forEach(({ e, t }) => {
    //     Una tira que se desliza sola guarda fuera del borde, a proposito, todo
    //     lo que todavia no le toca pasar: medida asi da una falla por cada
    //     ficha que aun no entra, y son falsas todas. Solo quedan exentas de
    //     ESTE criterio y solo dentro de un contenedor marcado a mano con
    //     data-desliza; contraste, tamaño de letra y area de toque se les
    //     siguen midiendo igual que a cualquier otro texto.
    if (e.closest('[data-desliza]')) return;
    const d = Math.max(t.right - innerWidth, -t.left);
    if (d > 2) F.cortado.push({ sel: ruta(e), d: Math.round(d), t: (e.textContent || '').trim().slice(0, 30) });
  });

  // 12. dos textos de una misma fila sin aire entre ellos
  //     No llegan a pisarse, asi que el criterio 'encima' no los ve, pero se
  //     leen como una sola palabra: "01Para que te encuentren y te contacten".
  //     Solo cuenta dentro de una fila de maquetacion (flex o grid), nunca
  //     entre trozos de una misma frase.
  for (let i = 0; i < cajas.length; i++) {
    for (let j = i + 1; j < cajas.length; j++) {
      const a = cajas[i], b = cajas[j];
      if (a.e.parentElement !== b.e.parentElement) continue;
      const padre = a.e.parentElement;
      if (!padre) continue;
      const dp = getComputedStyle(padre).display;
      if (dp !== 'flex' && dp !== 'grid' && dp !== 'inline-flex' && dp !== 'inline-grid') continue;
      if (a.t.lineas !== 1 || b.t.lineas !== 1) continue;
      const iy = Math.min(a.t.bottom, b.t.bottom) - Math.max(a.t.top, b.t.top);
      if (iy < 3) continue;
      const hueco = a.t.left < b.t.left ? b.t.left - a.t.right : a.t.left - b.t.right;
      if (hueco >= -0.5 && hueco < 5) {
        F.pegados.push({ sel: ruta(a.e), hueco: Math.round(hueco), a: (a.e.textContent || '').trim().slice(0, 18), b: (b.e.textContent || '').trim().slice(0, 18) });
      }
    }
  }

  return F;
})()
`

const IMAGENES = String.raw`
(() => {
  const malas = [];
  document.querySelectorAll('img').forEach((im) => {
    const r = im.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    if (r.bottom < -40 || r.top > innerHeight + 40) return;
    if (im.getAttribute('alt') === null) { malas.push({ src: (im.currentSrc || im.src || '').slice(-52), alt: 'SIN ATRIBUTO ALT' }); return }
    if (!im.complete || im.naturalWidth === 0) malas.push({ src: (im.currentSrc || im.src || '').slice(-52), alt: 'no cargo' });
  });
  return malas;
})()
`

const ws = new WebSocket(await esperar())
await new Promise(ok => ws.addEventListener('open', ok))
const s = new S(ws)
const { targetId } = await s.e('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await s.e('Target.attachToTarget', { targetId, flatten: true })
await s.e('Page.enable', {}, sessionId); await s.e('Runtime.enable', {}, sessionId)

const CRIT = ['contraste', 'fuera', 'sobreLinea', 'encima', 'toque', 'scrollH', 'imagenes', 'chico', 'partida', 'icono', 'cortado', 'pegados']
const total = Object.fromEntries(CRIT.map(c => [c, 0]))
const detalle = []

for (const W of ANCHOS) {
  await s.e('Emulation.setDeviceMetricsOverride', { width: W, height: W < 800 ? 780 : 900, deviceScaleFactor: 1, mobile: W < 800 }, sessionId)
  for (const ruta of RUTAS) {
    await s.e('Page.navigate', { url: BASE + ruta }, sessionId)
    await espera(2100)
    await s.e('Runtime.evaluate', { expression: `(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}scrollTo(0,0);await new Promise(r=>setTimeout(r,900));return 1})()`, awaitPromise: true }, sessionId)
    // Si el servidor se cayo, Chrome pinta su propia pagina de error y medirla
    // devuelve basura con pinta de hallazgo. Mejor detenerse.
    const cargo = (await s.e('Runtime.evaluate', { expression: `(() => ({ error: document.body.className.includes('neterror'), header: !!document.querySelector('.site-header'), titulo: document.title }))()`, returnByValue: true }, sessionId)).result.value
    if (cargo.error || !cargo.header) {
      console.log(`
!! ${W}px ${ruta} NO CARGO (${cargo.titulo || 'sin titulo'}). Revisa que el servidor siga arriba.`)
      process.exitCode = 2
      continue
    }
    // Hay que esperar a que las tipografias esten cargadas. Con display:swap
    // el navegador pinta primero la de reserva, que es mas ancha, y midiendo
    // ahi aparecen cortes de palabra que desaparecen en cuanto llega la letra
    // de verdad. Era la causa de 36 "palabras partidas" que no existian.
    await s.e('Runtime.evaluate', { expression: '(async()=>{await document.fonts.ready;await new Promise(r=>setTimeout(r,250));return document.fonts.status})()', awaitPromise: true, returnByValue: true }, sessionId)
    const alto = (await s.e('Runtime.evaluate', { expression: 'document.body.scrollHeight', returnByValue: true }, sessionId)).result.value
    const paso = W < 800 ? 700 : 820
    const visto = Object.fromEntries(CRIT.map(c => [c, new Map()]))
    for (let y = 0; y < alto; y += paso) {
      await s.e('Runtime.evaluate', { expression: `(async()=>{scrollTo(0,${y});await new Promise(r=>setTimeout(r,260));return 1})()`, awaitPromise: true }, sessionId)
      const parcial = (await s.e('Runtime.evaluate', { expression: REVISAR, returnByValue: true }, sessionId)).result.value
      // Las imagenes perezosas que aun estaban en camino se vuelven a mirar
      // despues de una espera de verdad. Solo cuenta la que sigue sin cargar.
      if (parcial.imagenes.length) {
        await s.e('Runtime.evaluate', { expression: '(async()=>{await new Promise(r=>setTimeout(r,1500));return 1})()', awaitPromise: true }, sessionId)
        parcial.imagenes = (await s.e('Runtime.evaluate', { expression: IMAGENES, returnByValue: true }, sessionId)).result.value
      }
      CRIT.forEach(c => parcial[c].forEach(x => visto[c].set(JSON.stringify(x), x)))
    }
    const F = Object.fromEntries(CRIT.map(c => [c, [...visto[c].values()]]))
    CRIT.forEach(c => { total[c] += F[c].length })
    const conFalla = CRIT.filter(c => F[c].length)
    if (conFalla.length) detalle.push({ W, ruta, F: Object.fromEntries(conFalla.map(c => [c, F[c].slice(0, 6)])) })
  }
}

detalle.forEach(d => { console.log(`\n### ${d.W}px ${d.ruta}`); Object.entries(d.F).forEach(([c, v]) => { console.log(`  ${c}: ${v.length}`); v.forEach(x => console.log('    ' + JSON.stringify(x))) }) })
console.log('\n=== RESUMEN (' + ANCHOS.join('/') + 'px × ' + RUTAS.length + ' rutas) ===')
CRIT.forEach(c => console.log(`  ${c.padEnd(12)} ${total[c]}`))
ws.close(); chrome.kill(); process.exit(0)
