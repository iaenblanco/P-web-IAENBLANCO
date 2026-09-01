import { CSSProperties, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
  /**
   * Nombre con el que este bloque se cuenta en section_view, si es que se
   * cuenta. Existe porque algunos tramos que importan para el embudo -las
   * objeciones de la portada- no son una <section> propia sino un Reveal
   * dentro de otra, y sin nombre se contarian con el de la seccion que los
   * envuelve. Ver components/VistaSecciones.tsx.
   */
  seccionVista?: string
}

export function Reveal({ children, className = '', delay = 0, id, seccionVista }: RevealProps) {
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <div
      id={id}
      className={`reveal is-visible ${className}`}
      style={style}
      data-section-view={seccionVista}
    >
      {children}
    </div>
  )
}
