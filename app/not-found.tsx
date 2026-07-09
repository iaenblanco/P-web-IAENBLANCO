import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="contenido" className="not-found">
      <div className="section-shell">
        <p className="hero-kicker"><span /> Error 404</p>
        <h1>Esta ruta ya no forma parte del sistema.</h1>
        <p>Vuelve al inicio para explorar las capacidades actuales de IAenBlanco.</p>
        <Link href="/" className="button button--primary">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
