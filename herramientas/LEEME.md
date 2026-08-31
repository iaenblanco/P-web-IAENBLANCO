# Herramientas de revisión

## `verificar.mjs`

Revisa el sitio ya construido y mide doce cosas que un visitante nota aunque no
sepa nombrarlas. Cada una da un número: si es cero, está bien; si no, sale la
falla con su selector, su texto y cuánto se pasa.

| Criterio | Qué mide |
|---|---|
| `contraste` | Textos que no llegan al mínimo AA (4,5:1, o 3:1 si son grandes), midiendo el color real contra el fondo compuesto. |
| `fuera` | Texto pintado por fuera de la caja con borde o fondo que lo contiene. |
| `sobreLinea` | Texto encima de una línea o un borde visible. |
| `encima` | Dos textos pisándose. |
| `toque` | En pantalla táctil, botones o enlaces por debajo de 40 px (los enlaces dentro de un párrafo están exentos). |
| `scrollH` | Si la página obliga a desplazar de lado. |
| `imagenes` | Imágenes a la vista que no cargaron, o sin atributo `alt`. |
| `chico` | En el teléfono, texto por debajo de 12 px. |
| `partida` | Palabras cortadas a la mitad **sin guion**. Partir con guion («pla-nillas») es correcto en castellano y no cuenta; se distinguen midiendo, porque el guion suma ancho. |
| `cortado` | Texto que el borde de la pantalla recorta sin que aparezca barra de scroll. |
| `icono` | Un icono anclado pintado encima del texto. |
| `pegados` | Dos textos de una misma fila sin aire entre ellos («01Para que te encuentren»). |

### Cómo se corre

```bash
npm run build
node herramientas/servir.mjs out 3210
node herramientas/verificar.mjs .tmp/ver http://localhost:3210 \
  1920,1440,1280,1201,1024,768,430,390,360 \
  /,/servicios/,/productos/,/trabajos/,/contacto/,/servicios/desarrollo-web-ia/,/privacidad/,/terminos/
```

Necesita Chrome instalado (habla CDP directo, sin dependencias) y Node 20 o
más nuevo. La ruta de Chrome está en la constante `CHROME`, arriba del
archivo.

### Qué no mide

No mide si el texto convence, si el precio es el correcto ni si la foto es
bonita. Mide lo que es comprobable con un número. Lo demás sigue siendo
criterio, y hay que mirarlo.

## `servir.mjs`

Servidor estático mínimo para medir el sitio construido. `npx serve` se caía
cuando varios Chrome medían en paralelo; este aguanta porque ignora los cortes
de conexión en vez de morirse con ellos.

```bash
node herramientas/servir.mjs out 3210
```

## `medir-trabajos.mjs`

`lib/trabajos.ts` publica diez cifras —la velocidad y el peso de los cinco
sitios de clientes— y nada las volvía a medir: envejecían en silencio, que es
el mismo camino por el que hubo que podar doce frases que ya no se sostenían.
Este script lee esas cifras del fuente y las va a comprobar al sitio publicado.

Carga cada sitio **tres veces** con la caché apagada y se queda con la
**mediana**: suma el `encodedDataLength` de cada recurso hasta el evento load
(el peso real) y lee `loadEventEnd` del navegador (la velocidad). Así una red
mala en un momento no tumba la batería.

```bash
npm run medir
node herramientas/medir-trabajos.mjs --fijar   # guarda la línea base
```

| Cifra | Margen |
|---|---|
| velocidad | El techo publicado **tal cual**, sin margen extra: el «menos de» que decimos ya *es* el margen. |
| peso | Un **15 %** por encima de lo publicado. Es una cifra exacta y necesita banda: un banner nuevo que subió el cliente no puede ser una falla nuestra; que el sitio pese el doble, sí. |

Si la realidad quedó más de un 25 % **por debajo**, no falla: avisa que la cifra
se quedó corta y conviene bajarla, igual que la guardia del CSS avisa cuando se
limpiaron deudas.

Sale 1 si alguna cifra publicada ya no se sostiene (nombrando cliente, lo
publicado y lo medido), 2 si algún sitio no cargó y 0 si todas se sostienen.

`medir-trabajos.json` es opcional: guarda la fecha y las medianas de la última
pasada fijada. Sirve para distinguir «el cliente engordó su sitio» de «hoy la
red anda mal»: si la cifra se rompe pero **todos** los sitios empeoraron parejo
contra esa línea base, es la red. Sin ella el script mide igual, solo pierde esa
distinción.

### Qué no mide

No juzga si el sitio del cliente está bien hecho: no mira su contraste, ni su
maquetación, ni si el peso es razonable para lo que muestra. Solo contesta una
pregunta, la única que nos compromete: si la cifra que publicamos sigue siendo
cierta.

Y no entra en `verificar.mjs` a propósito. Aquel recorre anchos por rutas del
sitio propio ya construido; esto es una medición de red contra dominios ajenos.
Mezclarlos mediría cinco veces lo mismo, una por ancho.

## `guardia-css.mjs`

La regla de la casa —«nada se corrige agregando una regla al final»— hecha
comprobable. `globals.css` llegó a 20.119 líneas y 46 `!important` de a un
parche por vez, y ningún parche se veía mal por sí solo. Este script no juzga
estilo: cuenta las cinco marcas que deja esa costumbre y las compara con una
línea base.

| Marca | Qué es |
|---|---|
| mismo selector, dos reglas | El mismo selector abre dos reglas en el mismo contexto. Es la huella exacta de arreglar agregando en vez de editar. |
| dos @keyframes, un nombre | Gana el último y el otro es una trampa: quien edite el de arriba no ve ningún cambio. |
| @keyframes que no usa nadie | Definido y huérfano. |
| var() sin definir | Se pide una variable que nadie declara, ni el CSS ni el JSX. Así quedó `.unify-channel i` pidiendo un `--signal-deep` inexistente. |
| reglas debajo del corte | Hay CSS debajo de la marca del final de `globals.css`. |

Aparte, los `!important`: el número no puede subir.

### Cómo se corre

```bash
node herramientas/guardia-css.mjs
```

Sale 0 si no hay ninguna marca nueva y 1 si la hay, con la línea y el
selector. No necesita que el sitio esté construido ni levantado: lee el
fuente. No entra en `npm run build` a propósito —una falla acá no tiene por
qué tumbar un despliegue en Cloudflare—, y no instala nada: cualquier
dependencia nueva la instalaría Cloudflare en cada build.

### La línea base

`guardia-css.json` es la lista de las deudas que el archivo YA tiene: hoy 385
selectores repetidos, 5 `var()` sin definir y 22 `!important`. No es una lista
de cosas correctas, es lo que todavía está mal y hoy no se arregla. El script
solo falla cuando algo empeora, y avisa cuando algo mejora para que la línea
base se vuelva a fijar:

```bash
node herramientas/guardia-css.mjs --fijar
```

Así el número solo puede bajar. Fijarla después de empeorar sería hacer
trampa, y es la única manera de hacerla.

### Qué no mide

Nada sobre cómo se ve el sitio: para eso está `verificar.mjs`. Y la cuenta de
`@keyframes` huérfanos es conservadora a propósito —si el nombre coincide con
una clase, no lo marca—, porque una falsa alarma vuelve inservible a la
guardia.

## `mirar-escenas.mjs`

Las escenas animadas de los servicios, juzgadas como se juzgan de verdad: en
375 px de ancho y viendo la pasada entera, no una foto suelta. `verificar.mjs`
mide una pantalla quieta; esto mide lo que se mueve.

| Falla | Qué es |
|---|---|
| `QUIETA` | Después de la pasada quedó algo moviéndose: animaciones que a los 3 s siguen `running`, o declaradas `infinite`. |
| `ESPERA` | Con la escena debajo del pliegue la pasada ya había avanzado. La función se dio en una sala vacía. |
| `RECORTE` | La caja terminó recortada por su propio `clip-path` en vez de abierta. |

```bash
npm run dev
node herramientas/mirar-escenas.mjs .tmp/escenas http://localhost:3000
node herramientas/mirar-escenas.mjs .tmp/escenas http://localhost:3000 560 planilla
```

El tercer argumento es el alto del visor (560 por defecto, el único en el que
la espera se puede comprobar) y el cuarto acota la corrida a las escenas cuyo
nombre lo contenga, para mirar una sola sin pagar las siete rutas.

Además de los números deja la película: la caja recortada a su rectángulo en
ocho momentos de la pasada. El último cuadro es el que más importa, porque es
el que el visitante va a estar mirando el resto del tiempo. Sale 1 si hay
fallas y 2 si alguna ruta no cargó.

Como `verificar.mjs`, cada pasada deja un perfil de Chrome de ~200 MB en la
carpeta temporal: hay que vaciarla con `robocopy` contra una carpeta vacía
antes de borrarla.
