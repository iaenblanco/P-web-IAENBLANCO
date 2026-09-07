/* La geometria del circuito del heroe, sin JSX: la comparten el componente
   (components/CircuitoHero.tsx) y la prueba (herramientas/probar-circuito.mjs),
   que la importa con el type stripping de Node 22+.

   El principio: el nodo es un objeto solido. Ninguna traza entra al disco;
   toda la energia pasa POR DEBAJO del anillo, en un solo sentido, de las
   fichas de servicio a las de programa:

   - un servicio de arriba baja por el bus izquierdo, que es TANGENTE al
     anillo, y dobla sobre el anillo un cuarto de vuelta hasta el punto de
     abajo (cx, cy + R);
   - un servicio de abajo va por el bus hasta el riel de abajo (la tangente
     horizontal, y = cy + R) y sigue recto hasta ese mismo punto;
   - ahi se releva la energia: un programa de arriba sigue el anillo otro
     cuarto de vuelta y sale por el bus derecho; uno de abajo sigue por el
     riel y escalona hasta su ficha.

   Por que solo la mitad de abajo: si la energia rodeara el nodo por los dos
   lados, el bus tangente llevaria trafico en los dos sentidos, y el paquete
   que baja por el arco se cruzaba a 5 unidades del que sube por el bus:
   en pantalla se veian dos puntos fundidos en uno. Con un solo sentido
   ningun par de paquetes se cruza; a lo sumo van en fila.

   Todo se deriva de pocos numeros: el ancho del SVG, el ancho de la ficha,
   el radio del disco y las alturas de las fichas. Los buses, el riel, el
   centro y la columna derecha se calculan; antes eran cifras sueltas y en
   el telefono el bus quedo 5 px por DENTRO del disco (bus en 140 con el
   borde en 135), asi que cada paquete cruzaba 26 unidades por adentro del
   logo. */

export type Variante = 'desk' | 'tel'

export type Geo = {
  w: number
  h: number
  /* ancho de cada ficha; las de servicio van de 0 a cw, las de programa de
     w - cw a w */
  cw: number
  /* alturas (y) de las fichas de servicio y de programa */
  izq: number[]
  der: number[]
  cy: number
  /* radio del disco del nodo */
  r: number
  /* y del rotulo del pie */
  pie: number
  /* cuerpo de la letra de las fichas */
  letra: number
}

/* El anillo orbita fuera del disco, no pegado a el: a r + 9 el halo de trazo
   11 rozaba el borde y parecia pasar por encima del logo. */
export const ANILLO = 15

/* Trazo del halo del anillo (.anillo__luz en globals.css). Vive aca tambien
   para que la prueba sepa hasta donde llega el brillo de verdad. */
export const LUZ_ANILLO = 11

/* Radio del halo y del nucleo de cada paquete. En el telefono el disco es
   mas chico y un punto de 9 tapaba media orbita. */
export const PAQUETE: Record<Variante, { halo: number; nucleo: number }> = {
  desk: { halo: 9, nucleo: 4 },
  tel: { halo: 7.5, nucleo: 3.5 },
}

export const GEO: Record<Variante, Geo> = {
  desk: { w: 592, h: 420, cw: 150, izq: [70, 150, 230, 310], der: [110, 190, 270], cy: 190, r: 56, pie: 370, letra: 13 },
  /* 372 de ancho (no 358) para que quepan ficha + aire + bus + anillo sin
     achicar la ficha: en pantalla el SVG mide lo mismo y todo escala un 4 %,
     que la letra compensa con medio punto. */
  tel: { w: 372, h: 330, cw: 118, izq: [60, 120, 180, 240], der: [90, 150, 210], cy: 150, r: 43, pie: 270, letra: 12.5 },
}

export type Traza = {
  id: string
  d: string
  lado: 'izq' | 'der'
  /* indice global (servicios y despues programas), para el encendido */
  i: number
  /* si dobla sobre el anillo o va derecho por el riel de abajo */
  via: 'arco' | 'riel'
  /* largo del camino en unidades del viewBox, para que todos los paquetes
     vayan a la misma velocidad */
  largo: number
}

export type Derivada = {
  cx: number
  /* radio del anillo, y del corredor */
  R: number
  /* buses: la vertical tangente al anillo por cada lado */
  bi: number
  bd: number
  /* borde izquierdo de las fichas de programa */
  xd: number
  /* el riel: la horizontal tangente al anillo por abajo. Toca el anillo en
     (cx, riel), que es el punto de relevo de toda la energia */
  riel: number
}

export function derivar(g: Geo): Derivada {
  const R = g.r + ANILLO
  const cx = g.w / 2
  return { cx, R, bi: cx - R, bd: cx + R, xd: g.w - g.cw, riel: g.cy + R }
}

const f1 = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1))

/* Un arco del anillo entre dos angulos (grados, sentido horario en
   pantalla), para el anillo que gira. */
export function arco(cx: number, cy: number, radio: number, desde: number, hasta: number) {
  const a = (desde * Math.PI) / 180
  const b = (hasta * Math.PI) / 180
  return `M${f1(cx + radio * Math.cos(a))} ${f1(cy + radio * Math.sin(a))}A${radio} ${radio} 0 0 1 ${f1(cx + radio * Math.cos(b))} ${f1(cy + radio * Math.sin(b))}`
}

/* Las trazas. Un servicio a la altura del centro o mas arriba: ficha ->
   bus -> punto tangente (bi, cy) -> cuarto de anillo por abajo (sweep 0,
   antihorario en pantalla) hasta el relevo (cx, riel). Uno mas abajo:
   ficha -> bus -> riel -> relevo. Un programa a la altura del centro o mas
   arriba: relevo -> cuarto de anillo -> punto tangente (bd, cy) -> bus ->
   ficha (si esta justo al centro, dobla ahi). Uno mas abajo: relevo -> riel
   -> escalon en el bus derecho -> ficha.

   Cada traza es UN camino continuo, sin retrocesos y sin bajar y volver a
   subir: la x nunca decrece y la y no cambia de sentido. Recto, tangente
   al anillo, arco, tangente, recto: por eso el paquete no salta ni cambia
   de velocidad al entrar o salir del arco. */
export function trazas(g: Geo): Traza[] {
  const { cx, R, bi, bd, xd, riel } = derivar(g)
  const cuarto = (Math.PI / 2) * R
  const servicios: Traza[] = g.izq.map((y, i) => {
    const arco = y <= g.cy
    return {
      id: `a${i}`,
      d: arco ? `M${g.cw} ${y}H${bi}V${g.cy}A${R} ${R} 0 0 0 ${cx} ${riel}` : `M${g.cw} ${y}H${bi}V${riel}H${cx}`,
      lado: 'izq',
      i,
      via: arco ? 'arco' : 'riel',
      largo: bi - g.cw + (arco ? g.cy - y + cuarto : Math.abs(riel - y) + R),
    }
  })
  const programas: Traza[] = g.der.map((y, j) => {
    const arco = y <= g.cy
    const paso = (desde: number) => (y === desde ? '' : `V${y}`)
    return {
      id: `b${j}`,
      d: arco ? `M${cx} ${riel}A${R} ${R} 0 0 0 ${bd} ${g.cy}${paso(g.cy)}H${xd}` : `M${cx} ${riel}H${bd}${paso(riel)}H${xd}`,
      lado: 'der',
      i: g.izq.length + j,
      via: arco ? 'arco' : 'riel',
      largo: xd - bd + (arco ? cuarto + g.cy - y : R + Math.abs(y - riel)),
    }
  })
  return [...servicios, ...programas]
}

/* La corriente en bucle: un paquete por cable, con un periodo comun. Los
   begin son negativos para que TODOS los paquetes ya esten en su camino
   cuando la corriente se hace visible; un animateMotion que todavia no
   empezo deja al elemento en el origen del SVG, y eso se veria como un
   punto suelto en la esquina.

   Cada paquete recorre su cable a la MISMA velocidad (la del cable mas
   largo, que ocupa el periodo entero) y descansa apagado lo que le sobra:
   antes cada uno tardaba lo mismo y el corto iba a la mitad de la
   velocidad del largo. Se prende y se apaga con un fundido corto para que
   no aparezca ni desaparezca de golpe. */
export const CICLO = 2.4

/* Segundos entre que un paquete llega al relevo y sale el siguiente por el
   otro lado. */
export const RELEVO = 0.25

/* Largo del fundido al prender y al apagar, en unidades del viewBox. */
const FUNDIDO = 12

export type Cadencia = {
  begin: string
  /* fraccion del periodo en movimiento; el resto queda quieto y apagado */
  enMarcha: number
  keyTimes: string
  keyPoints: string
  opacidad: { values: string; keyTimes: string }
  /* segundos (dentro del periodo) en que sale y en que llega */
  sale: number
  llega: number
}

const mod = (n: number, m: number) => ((n % m) + m) % m

/* Los servicios LLEGAN al relevo repartidos parejo en el periodo, alternando
   arco y riel para que dos paquetes seguidos no vayan por el mismo carril;
   de la salida se despeja hacia atras. Cada programa SALE del relevo RELEVO
   segundos despues de una llegada, en orden: lo que se ve es que la energia
   entra, pasa por debajo del nodo y sigue hacia un programa. Como hay mas
   servicios que programas, la ultima llegada se queda en el nodo. */
export function cadencias(todas: Traza[]): Cadencia[] {
  const velocidad = Math.max(...todas.map((t) => t.largo)) / CICLO
  const izq = todas.filter((t) => t.lado === 'izq')
  const der = todas.filter((t) => t.lado === 'der')
  const arcos = izq.filter((t) => t.via === 'arco')
  const rieles = izq.filter((t) => t.via === 'riel')
  const orden: Traza[] = []
  for (let k = 0; k < Math.max(arcos.length, rieles.length); k++) {
    if (arcos[k]) orden.push(arcos[k])
    if (rieles[k]) orden.push(rieles[k])
  }
  const llega = new Map<string, number>()
  orden.forEach((t, k) => llega.set(t.id, (k * CICLO) / orden.length))
  const sale = new Map<string, number>()
  for (const t of izq) sale.set(t.id, mod(llega.get(t.id)! - t.largo / velocidad, CICLO))
  der.forEach((t, k) => sale.set(t.id, mod(llega.get(orden[k % orden.length].id)! + RELEVO, CICLO)))
  const f = (n: number) => n.toFixed(3)
  return todas.map((t) => {
    const s = sale.get(t.id)!
    const dura = t.largo / velocidad
    const enMarcha = Math.min(1, dura / CICLO)
    const fundido = Math.min(FUNDIDO / velocidad / CICLO, enMarcha / 3)
    const entero = enMarcha > 0.999
    return {
      begin: `${(s - CICLO).toFixed(2)}s`,
      enMarcha,
      keyTimes: entero ? '0;1' : `0;${f(enMarcha)};1`,
      keyPoints: entero ? '0;1' : '0;1;1',
      opacidad: entero
        ? { values: '0;1;1;0', keyTimes: `0;${f(fundido)};${f(1 - fundido)};1` }
        : { values: '0;1;1;0;0', keyTimes: `0;${f(fundido)};${f(enMarcha - fundido)};${f(enMarcha)};1` },
      sale: s,
      llega: mod(s + dura, CICLO),
    }
  })
}
