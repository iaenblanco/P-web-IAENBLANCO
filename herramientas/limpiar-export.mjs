// Next exporta la pagina de error dos veces: out/404.html y out/404/index.html,
// identicos byte a byte. Cloudflare Pages sirve el primero como pagina de error
// con estado 404 de verdad, pero el segundo queda accesible en /404/ y responde
// 200: un soft 404 que Google indexa como una pagina mas y que duplica
// contenido. Este script borra el duplicado despues de cada build.
//
// Corre solo, como postbuild de npm. No hay que llamarlo a mano.
import { rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOBRAN = ['out/404']

let n = 0
for (const rel of SOBRAN) {
  const ruta = resolve(RAIZ, rel)
  if (!existsSync(ruta)) continue
  rmSync(ruta, { recursive: true, force: true })
  console.log(`  borrado ${rel}`)
  n++
}
console.log(n ? `limpiar-export: ${n} sobrante(s)` : 'limpiar-export: nada que borrar')
