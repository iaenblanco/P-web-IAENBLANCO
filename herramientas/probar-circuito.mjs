#!/usr/bin/env node
/* Prueba de invariantes del circuito del heroe (components/CircuitoHero.tsx).

   Muestrea cada traza de cada variante -300 puntos por camino, repartidos
   por largo- y comprueba que la energia NUNCA entra al logo: la distancia
   de cada punto al centro del nodo tiene que superar el radio del disco mas
   el halo del paquete mas una holgura. Ademas verifica que cada lado tiene
   UN solo bus vertical, entre las fichas y el anillo (cada punto de cada
   camino esta en el tramo de su ficha, en el bus o en el tronco), que cada
   camino toca el anillo solo en su punto medio -a la altura del centro- y
   ahi termina o nace, que el brillo del anillo no pisa las fichas, que
   ningun camino retrocede, que los largos declarados coinciden con los
   muestreados (de eso depende la velocidad constante), que en los puntos de
   contacto no coinciden dos eventos y -recorriendo el periodo entero en el
   tiempo- que nunca hay dos paquetes encendidos tan cerca que se vean como
   uno solo.

   Uso:  node herramientas/probar-circuito.mjs        (sale con 1 si falla)
   Importa lib/circuito-geometria.ts directamente: Node 22+ pela los tipos. */

import { ANILLO, CICLO, GEO, LUZ_ANILLO, PAQUETE, cadencias, derivar, trazas } from '../lib/circuito-geometria.ts'

const MUESTRAS = 300
/* aire minimo entre el borde del halo del paquete y el borde del disco */
const HOLGURA = 4
/* aire minimo entre el brillo del anillo y las fichas */
const AIRE_FICHA = 3
/* dos eventos en los puntos de contacto tienen que estar al menos asi de lejos */
const SEPARACION = 0.2
/* paso del recorrido en el tiempo, en segundos */
const PASO = 0.02
/* un paquete cuenta como encendido a partir de esta opacidad */
const ENCENDIDO = 0.25
/* aire minimo entre los halos de dos paquetes encendidos */
const AIRE_PAQUETES = 4

let fallas = 0
const falla = (msg) => {
  fallas++
  console.log(`  FALLA  ${msg}`)
}
const ok = (msg) => console.log(`  ok     ${msg}`)

/* --- Muestreo de un path (M, H, V, L, A absolutos, que es lo que generamos) */
function segmentos(d) {
  const tokens = d.match(/[MHVLA]|-?\d*\.?\d+/g)
  let i = 0
  let x = 0
  let y = 0
  const segs = []
  const num = () => Number(tokens[i++])
  while (i < tokens.length) {
    const c = tokens[i++]
    if (c === 'M') {
      x = num()
      y = num()
    } else if (c === 'H') {
      const nx = num()
      segs.push({ tipo: 'L', x0: x, y0: y, x1: nx, y1: y, largo: Math.abs(nx - x) })
      x = nx
    } else if (c === 'V') {
      const ny = num()
      segs.push({ tipo: 'L', x0: x, y0: y, x1: x, y1: ny, largo: Math.abs(ny - y) })
      y = ny
    } else if (c === 'L') {
      const nx = num()
      const ny = num()
      segs.push({ tipo: 'L', x0: x, y0: y, x1: nx, y1: ny, largo: Math.hypot(nx - x, ny - y) })
      x = nx
      y = ny
    } else if (c === 'A') {
      const rx = num()
      const ry = num()
      num() // rotacion
      const grande = num()
      const barrido = num()
      const nx = num()
      const ny = num()
      if (rx !== ry) throw new Error('arco no circular')
      /* SVG F.6.5: del par de extremos al centro */
      const dx = (x - nx) / 2
      const dy = (y - ny) / 2
      let r = rx
      const lambda = (dx * dx + dy * dy) / (r * r)
      if (lambda > 1) r *= Math.sqrt(lambda)
      const signo = grande === barrido ? -1 : 1
      const raiz = Math.sqrt(Math.max(0, (r * r - dx * dx - dy * dy) / (dx * dx + dy * dy)))
      const cxp = signo * raiz * dy
      const cyp = signo * raiz * -dx
      const cx = cxp + (x + nx) / 2
      const cy = cyp + (y + ny) / 2
      const a1 = Math.atan2((dy - cyp) / r, (dx - cxp) / r)
      let delta = Math.atan2((-dy - cyp) / r, (-dx - cxp) / r) - a1
      if (barrido === 0 && delta > 0) delta -= 2 * Math.PI
      if (barrido === 1 && delta < 0) delta += 2 * Math.PI
      segs.push({ tipo: 'A', cx, cy, r, a1, delta, largo: Math.abs(delta) * r })
      x = nx
      y = ny
    } else {
      throw new Error(`comando no soportado: ${c}`)
    }
  }
  return segs
}

function punto(s, t) {
  if (s.tipo === 'L') return { x: s.x0 + (s.x1 - s.x0) * t, y: s.y0 + (s.y1 - s.y0) * t, arco: false }
  const a = s.a1 + s.delta * t
  return { x: s.cx + s.r * Math.cos(a), y: s.cy + s.r * Math.sin(a), arco: true }
}

function muestrear(segs, n) {
  const total = segs.reduce((s, x) => s + x.largo, 0)
  const puntos = []
  for (const s of segs) {
    const k = Math.max(2, Math.round((n * s.largo) / total))
    for (let j = 0; j <= k; j++) puntos.push(punto(s, j / k))
  }
  return { puntos, total }
}

/* El punto a una distancia d del arranque, siguiendo el camino. */
function posicion(segs, d) {
  let acc = 0
  for (const s of segs) {
    if (d <= acc + s.largo + 1e-9) return punto(s, s.largo ? (d - acc) / s.largo : 1)
    acc += s.largo
  }
  return punto(segs[segs.length - 1], 1)
}

/* Lo mismo que hace el navegador con calcMode="linear": interpola values
   entre keyTimes. */
function interpolar(keyTimes, values, f) {
  const kt = keyTimes.split(';').map(Number)
  const vs = values.split(';').map(Number)
  for (let i = 1; i < kt.length; i++) {
    if (f <= kt[i]) {
      const tramo = kt[i] - kt[i - 1]
      return tramo ? vs[i - 1] + ((vs[i] - vs[i - 1]) * (f - kt[i - 1])) / tramo : vs[i]
    }
  }
  return vs[vs.length - 1]
}

const mod = (n, m) => ((n % m) + m) % m

for (const variante of Object.keys(GEO)) {
  const g = GEO[variante]
  const { cx, R, ai, ad, bi, bd, xd } = derivar(g)
  const paq = PAQUETE[variante]
  const exclusion = g.r + paq.halo + HOLGURA
  console.log(`\n${variante}: disco r=${g.r}, anillo R=${R}, contacto en ${ai}/${ad}, buses ${bi}/${bd}, centro del paquete a >= ${exclusion} del centro`)

  if (R !== g.r + ANILLO) falla('el anillo no esta a ANILLO del disco')
  if (Math.abs(ai - (cx - R)) > 1e-9 || Math.abs(ad - (cx + R)) > 1e-9) falla(`los puntos de contacto (${ai}/${ad}) no estan sobre el anillo (${cx - R}/${cx + R})`)
  if (!(g.cw < bi && bi < ai)) falla(`el bus izquierdo (${bi}) no esta entre la ficha (${g.cw}) y el anillo (${ai})`)
  if (!(ad < bd && bd < xd)) falla(`el bus derecho (${bd}) no esta entre el anillo (${ad}) y la ficha (${xd})`)
  ok(`contacto en el punto medio del anillo, (${ai}, ${g.cy}) y (${ad}, ${g.cy}); un bus por lado, en ${bi} y ${bd}, entre ficha y anillo`)

  const brilloIzq = cx - R - LUZ_ANILLO / 2 - g.cw
  const brilloDer = xd - (cx + R + LUZ_ANILLO / 2)
  if (brilloIzq < AIRE_FICHA) falla(`el brillo del anillo pisa las fichas de servicio (aire ${brilloIzq.toFixed(1)})`)
  else ok(`brillo del anillo a ${brilloIzq.toFixed(1)} de las fichas de servicio`)
  if (brilloDer < AIRE_FICHA) falla(`el brillo del anillo pisa las fichas de programa (aire ${brilloDer.toFixed(1)})`)
  else ok(`brillo del anillo a ${brilloDer.toFixed(1)} de las fichas de programa`)

  const todas = trazas(g)
  const ritmo = cadencias(todas)
  const velocidad = Math.max(...todas.map((t) => t.largo)) / CICLO
  const eventos = []
  const caminos = []

  todas.forEach((t, k) => {
    const segs = segmentos(t.d)
    caminos.push(segs)
    const { puntos, total } = muestrear(segs, MUESTRAS)
    let min = Infinity
    let peor = null
    const izq = t.lado === 'izq'
    const bus = izq ? bi : bd
    const contacto = izq ? ai : ad
    const ficha = izq ? g.cw : xd
    const yFicha = izq ? g.izq[t.i] : g.der[t.i - g.izq.length]
    const entre = (v, a, b) => v >= Math.min(a, b) - 0.01 && v <= Math.max(a, b) + 0.01
    let dentroAnillo = 0
    let fueraDeForma = 0
    let retrocede = false
    let sentidoY = 0
    for (let n = 0; n < puntos.length; n++) {
      const q = puntos[n]
      const dist = Math.hypot(q.x - cx, q.y - g.cy)
      if (dist < min) {
        min = dist
        peor = q
      }
      if (dist < R - 0.01) dentroAnillo++
      const enBus = Math.abs(q.x - bus) < 0.01
      const enTronco = Math.abs(q.y - g.cy) < 0.01 && entre(q.x, contacto, bus)
      const enTramo = Math.abs(q.y - yFicha) < 0.01 && entre(q.x, ficha, bus)
      if (!enBus && !enTronco && !enTramo) fueraDeForma++
      if (n) {
        const dx = q.x - puntos[n - 1].x
        const dy = q.y - puntos[n - 1].y
        if (dx < -1e-6) retrocede = true
        if (Math.abs(dy) > 1e-6) {
          const s = Math.sign(dy)
          if (sentidoY && s !== sentidoY) retrocede = true
          sentidoY = s
        }
      }
    }
    const etiqueta = `${t.id} (${t.lado}, ${t.via}, ${puntos.length} puntos, min ${min.toFixed(1)} en ${peor.x.toFixed(1)},${peor.y.toFixed(1)})`
    if (min < exclusion) falla(`${etiqueta}: el halo del paquete entra al disco`)
    else ok(etiqueta)
    if (dentroAnillo) falla(`${t.id}: ${dentroAnillo} puntos por dentro del anillo`)
    if (fueraDeForma) falla(`${t.id}: ${fueraDeForma} puntos fuera del tramo, del bus o del tronco (mas de una linea por lado)`)
    if (retrocede) falla(`${t.id}: el camino retrocede (la x baja o la y cambia de sentido)`)
    if (Math.abs(total - t.largo) > 0.01 * t.largo) falla(`${t.id}: largo declarado ${t.largo.toFixed(1)} vs muestreado ${total.toFixed(1)}`)

    const c = ritmo[k]
    const kt = c.keyTimes.split(';').map(Number)
    const kp = c.keyPoints.split(';').map(Number)
    const ko = c.opacidad.keyTimes.split(';').map(Number)
    const monotono = (a) => a.every((v, i) => i === 0 || v >= a[i - 1]) && a[0] === 0 && a[a.length - 1] === 1
    if (kt.length !== kp.length || !monotono(kt)) falla(`${t.id}: keyTimes/keyPoints invalidos (${c.keyTimes} / ${c.keyPoints})`)
    if (!monotono(ko) || ko.length !== c.opacidad.values.split(';').length) falla(`${t.id}: keyTimes de opacidad invalidos (${c.opacidad.keyTimes})`)
    const recorrido = c.enMarcha * CICLO * velocidad
    if (Math.abs(recorrido - t.largo) > 0.01 * t.largo) falla(`${t.id}: a ${velocidad.toFixed(1)} u/s recorreria ${recorrido.toFixed(1)}, no ${t.largo.toFixed(1)}`)
    /* extremos: un servicio va de su ficha al punto medio izquierdo del
       anillo; un programa nace en el punto medio derecho y va a su ficha */
    const fin = puntos[puntos.length - 1]
    const ini = puntos[0]
    const enFicha = (q) => Math.abs(q.x - ficha) < 0.01 && Math.abs(q.y - yFicha) < 0.01
    const enContacto = (q) => Math.abs(q.x - contacto) < 0.01 && Math.abs(q.y - g.cy) < 0.01
    if (izq && !(enFicha(ini) && enContacto(fin))) falla(`${t.id}: no va de la ficha (${ficha}, ${yFicha}) al anillo (${contacto}, ${g.cy})`)
    if (!izq && !(enContacto(ini) && enFicha(fin))) falla(`${t.id}: no va del anillo (${contacto}, ${g.cy}) a la ficha (${ficha}, ${yFicha})`)
    eventos.push({ id: t.id, t: t.lado === 'izq' ? c.llega : c.sale, que: t.lado === 'izq' ? 'llega' : 'sale' })
  })

  const orden = [...eventos].sort((a, b) => a.t - b.t)
  for (let i = 0; i < orden.length; i++) {
    const a = orden[i]
    const b = orden[(i + 1) % orden.length]
    const gap = i + 1 < orden.length ? b.t - a.t : b.t + CICLO - a.t
    if (gap < SEPARACION - 1e-9) falla(`contacto: ${a.id} ${a.que} a ${a.t.toFixed(2)} y ${b.id} ${b.que} a ${b.t.toFixed(2)}`)
  }
  ok(`contacto: ${orden.map((e) => `${e.id} ${e.que} ${e.t.toFixed(2)}s`).join(', ')}`)
  ok(`velocidad comun ${velocidad.toFixed(1)} u/s; el cable mas largo ocupa el periodo de ${CICLO}s`)

  /* --- El periodo entero en el tiempo: donde esta cada paquete encendido */
  const umbral = 2 * paq.halo + AIRE_PAQUETES
  let minPar = Infinity
  let peorPar = ''
  let encendidos = 0
  let instantes = 0
  for (let t = 0; t < CICLO; t += PASO) {
    const vivos = []
    todas.forEach((tr, k) => {
      const c = ritmo[k]
      const f = mod(t - c.sale, CICLO) / CICLO
      const op = interpolar(c.opacidad.keyTimes, c.opacidad.values, f)
      if (op < ENCENDIDO) return
      const d = interpolar(c.keyTimes, c.keyPoints, f) * tr.largo
      vivos.push({ id: tr.id, ...posicion(caminos[k], d) })
    })
    encendidos += vivos.length
    instantes++
    for (let i = 0; i < vivos.length; i++) {
      for (let j = i + 1; j < vivos.length; j++) {
        const dist = Math.hypot(vivos[i].x - vivos[j].x, vivos[i].y - vivos[j].y)
        if (dist < minPar) {
          minPar = dist
          peorPar = `${vivos[i].id} (${vivos[i].x.toFixed(0)},${vivos[i].y.toFixed(0)}) y ${vivos[j].id} (${vivos[j].x.toFixed(0)},${vivos[j].y.toFixed(0)}) a los ${t.toFixed(2)}s`
        }
      }
    }
  }
  const media = (encendidos / instantes).toFixed(1)
  if (minPar < umbral) falla(`dos paquetes encendidos a ${minPar.toFixed(1)} (minimo ${umbral}): ${peorPar}`)
  else ok(`ningun par de paquetes encendidos a menos de ${minPar.toFixed(1)} (minimo ${umbral}); ${media} encendidos en promedio`)
}

console.log(fallas ? `\n${fallas} falla(s)` : '\nTodo en orden: ningun camino entra al logo y ningun paquete se funde con otro.')
process.exit(fallas ? 1 : 0)
