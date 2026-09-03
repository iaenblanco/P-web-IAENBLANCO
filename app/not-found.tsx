import type { Metadata } from 'next'
import Link from 'next/link'

/* El 404 heredaba entero el metadata de la portada: title y description de
   app/layout.tsx (:51-58), el canonical a "/" (:79-81) y un robots
   "index, follow" (:100-110) que peleaba con el "noindex" que Next inyecta
   solo en /404. Next resuelve ESTE bloque al final de la cadena (lo empuja
   como errorMetadataItem), asi que pisa al layout.
   El "noindex" que inyecta Next no se puede quitar desde aca: van a quedar
   dos metas robots, pero ya no contradictorias. */
export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o cambió de dirección.',
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
}

export default function NotFound() {
  return (
    <main id="contenido" className="not-found">
      <div className="section-shell">
        <p className="hero-kicker"><span className="hero-kicker__punto" aria-hidden="true" /> Error 404</p>
        <h1>Esta ruta ya no forma parte del sistema.</h1>
        <p>Vuelve al inicio para explorar las capacidades actuales de IAenBlanco.</p>
        <Link href="/" prefetch={false} className="button button--primary">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
