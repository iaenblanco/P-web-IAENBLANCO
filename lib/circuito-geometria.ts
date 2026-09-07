/* La geometria del circuito del heroe, sin JSX: la comparten el componente
   (components/CircuitoHero.tsx) y la prueba (herramientas/probar-circuito.mjs),
   que la importa con el type stripping de Node 22+.

   La forma, que es la que Nico dibujo: a cada lado hay UNA linea vertical
   (el bus) entre las fichas y el anillo. Cada ficha se engancha al bus con
   un tramo corto horizontal; desde la mitad del bus, a la altura del
   centro, sale un tramo horizontal que toca la circunferencia del anillo
   justo en su punto medio, (cx - R, cy) a la izquierda y (cx + R, cy) a la
   derecha. Nada entra al disco: la energia de los servicios llega al borde
   del nodo y ahi se apaga; la de los programas nace en el borde opuesto y
   sale hacia su ficha.

   Todo se deriva de pocos numeros: el ancho del SVG, el ancho de la ficha,
   el radio del disco y las alturas de las fichas. El anillo, los puntos de
   contacto, el bus (a mitad de camino entre la ficha y el anillo) y la
   columna derecha se calculan; antes eran cifras sueltas y en el telefono
   el bus quedo 5 px por DENTRO del disco, asi que cada paquete cruzaba 26
   unidades por adentro del logo.

   El bus lleva paquetes en los dos sentidos (los de arriba bajan, los de
   abajo suben). Para que dos no se crucen ni se vean como uno solo, la
   cadencia alterna una ficha de arriba y una de abajo y separa las
   llegadas; la prueba recorre el periodo entero y mide la distancia entre
   paquetes encendidos. */

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
  /* 400 de ancho para que entre ficha + tramo + bus + tramo + anillo sin
     achicar la ficha: entre la ficha y el anillo quedan 24 unidades, 12 de
     tramo y 12 de bus a anillo. En un telefono de 390 el SVG se muestra a
     378 px, asi que todo escala un 5 % hacia abajo; la letra sube medio
     punto para compensar. */
  tel: { w: 400, h: 330, cw: 118, izq: [60, 120, 180, 240], der: [90, 150, 210], cy: 150, r: 43, pie: 270, letra: 13 },
}

export type Traza = {
  id: string
  d: string
  lado: 'izq' | 'der'
  /* indice global (servicios y despues programas), para el encendido */
  i: number
  /* de que lado del centro esta la ficha: decide el sentido en el bus */
  via: 'arriba' | 'abajo' | 'centro'
  /* largo del camino en unidades del viewBox, para que todos los paquetes
     vayan a la misma velocidad */
  largo: number
}

export type Derivada = {
  cx: number
  /* radio del anillo */
  R: number
  /* los puntos de contacto: donde el tramo horizontal toca el anillo, a la
     altura del centro, por cada lado */
  ai: number
  ad: number
  /* los buses: la vertical a mitad de camino entre la ficha y el anillo */
  bi: number
  bd: number
  /* borde izquierdo de las fichas de programa */
  xd: number
}

export function derivar(g: Geo): Derivada {
  const R = g.r + ANILLO
  const cx = g.w / 2
  const ai = cx - R
  const ad = cx + R
  const xd = g.w - g.cw
  return { cx, R, ai, ad, bi: Math.round((g.cw + ai) / 2), bd: Math.round((ad + xd) / 2), xd }
}

const f1 = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1))

/* Un arco del anillo entre dos angulos (grados, sentido horario en
   pantalla), para el anillo que gira. */
export function arco(cx: number, cy: number, radio: number, desde: number, hasta: number) {
  const a = (desde * Math.PI) / 180
  const b = (hasta * Math.PI) / 180
  return `M${f1(cx + radio * Math.cos(a))} ${f1(cy + radio * Math.sin(a))}A${radio} ${radio} 0 0 1 ${f1(cx + radio * Math.cos(b))} ${f1(cy + radio * Math.sin(b))}`
}

/* Las trazas. Un servicio: ficha -> tramo hasta el bus -> por el bus hasta
   la altura del centro -> tramo hasta el punto de contacto (ai, cy). Un
   programa: punto de contacto (ad, cy) -> tramo hasta el bus -> por el bus
   hasta la altura de su ficha -> tramo hasta la ficha. La ficha que esta
   justo a la altura del centro va derecho.

   Cada traza es UN camino continuo de tres rectas en angulo recto, sin
   retrocesos: la x nunca decrece y la y no cambia de sentido. */
export function trazas(g: Geo): Traza[] {
  const { ai, ad, bi, bd, xd } = derivar(g)
  const via = (y: number): Traza['via'] => (y < g.cy ? 'arriba' : y > g.cy ? 'abajo' : 'centro')
  const servicios: Traza[] = g.izq.map((y, i) => ({
    id: `a${i}`,
    d: y === g.cy ? `M${g.cw} ${y}H${ai}` : `M${g.cw} ${y}H${bi}V${g.cy}H${ai}`,
    lado: 'izq',
    i,
    via: via(y),
    largo: ai - g.cw + Math.abs(y - g.cy),
  }))
  const programas: Traza[] = g.der.map((y, j) => ({
    id: `b${j}`,
    d: y === g.cy ? `M${ad} ${y}H${xd}` : `M${ad} ${g.cy}H${bd}V${y}H${xd}`,
    lado: 'der',
    i: g.izq.length + j,
    via: via(y),
    largo: xd - ad + Math.abs(y - g.cy),
  }))
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

/* Segundos entre que un paquete llega al borde izquierdo del nodo y sale
   el siguiente por el borde derecho. */
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

/* Los servicios LLEGAN al nodo repartidos parejo en el periodo, alternando
   una ficha de arriba y una de abajo: dos seguidas van en sentidos
   opuestos por el bus y solo se acercan en el tramo final, donde van en
   fila; de la llegada se despeja hacia atras la salida. Cada programa SALE
   del nodo RELEVO segundos despues de una llegada, en orden: lo que se ve
   es que la energia entra por un lado, pasa por el nodo y sigue hacia un
   programa por el otro. Como hay mas servicios que programas, la ultima
   llegada se queda en el nodo. */
export function cadencias(todas: Traza[]): Cadencia[] {
  const velocidad = Math.max(...todas.map((t) => t.largo)) / CICLO
  const izq = todas.filter((t) => t.lado === 'izq')
  const der = todas.filter((t) => t.lado === 'der')
  const arriba = izq.filter((t) => t.via === 'arriba')
  const abajo = izq.filter((t) => t.via === 'abajo')
  const orden: Traza[] = []
  for (let k = 0; k < Math.max(arriba.length, abajo.length); k++) {
    if (arriba[k]) orden.push(arriba[k])
    if (abajo[k]) orden.push(abajo[k])
  }
  orden.push(...izq.filter((t) => t.via === 'centro'))
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
