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
  /,/servicios/,/productos/,/contacto/,/servicios/desarrollo-web-ia/,/privacidad/,/terminos/
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
