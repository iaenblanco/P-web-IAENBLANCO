# Medicion de cierre de la fase 11 — 2026-09-03, commit 4fbca0d

## No leer "55 -> 69" como una mejora del sitio

La comparacion contra la apertura del 2026-09-02 da 9 rutas que mejoran, 2 dentro
del ruido y 0 que empeoran, asi que el criterio de cierre de la fase ("mejor o
igual que la medicion de apertura") queda cumplido. **Pero esa mejora no es del
sitio.** Los numeros que la explican:

| | apertura (ce6dcc5) | cierre (4fbca0d) |
|---|---|---|
| TBT sumando 11 rutas | 4.979 ms | **1.229 ms (−75 %)** |
| FCP, portada | 3.479 ms | 3.455 ms (−24 ms) |
| LCP, /servicios/ | 5.943 ms | 5.931 ms (−12 ms) |
| bytes, 11 rutas | 10,11 MiB | 10,12 MiB (**+5 KB**) |

Si el sitio hubiera adelgazado, bajarian los bytes y con ellos FCP y LCP. No se
movieron. Lo que se desplomo fue el TBT, que mide cuanto tiempo el hilo principal
estuvo bloqueado: es la metrica que se hunde cuando la maquina deja de estar
peleada por otros procesos. La apertura se tomo con el equipo compartido con 24
agentes; esta se tomo con la maquina tranquila. Se midieron dos maquinas
distintas, no dos versiones distintas del sitio.

Que la fase no haya movido la aguja de performance es lo esperado, no un fallo:
los 4,87 MB que salieron de `public/` (product-assets y logo.png) eran archivos
**huerfanos**, que ninguna pagina servida pedia. Sacarlos aliviana el repositorio
y el deploy, no la carga del visitante. Eso era el punto.

## Que si sirve de esta medicion

Estos numeros, y no los de la apertura, son la linea base utilizable de aca en
adelante: se tomaron con la maquina en condiciones normales y con el mismo
instrumento (Lighthouse 13.4.1 CLI, preset mobile, 3 pasadas, mediana).

- performance movil: entre 69 y 74 en las 11 rutas
- accesibilidad, buenas practicas y SEO: 1,00 en las 11 rutas, sin excepcion
- el techo esta en FCP/LCP (3,2 s y 5,5 s), no en el TBT

La apertura del 2026-09-02 **no sirve para comparar contra nada** y no conviene
citarla. No se puede repetir: el arbol ya cambio.
