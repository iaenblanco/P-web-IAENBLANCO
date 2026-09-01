import { CSSProperties, ReactNode } from 'react'

/*
 * Una pieza que entra cuando le toca.
 *
 * Hasta el 1-sep-2026 este componente no revelaba nada: emitia las dos clases
 * juntas desde el servidor -"reveal is-visible"- asi que la transicion que las
 * acompañaba en la hoja no podia dispararse nunca, porque no habia ningun
 * cuadro en el que el elemento estuviera en el estado inicial. La medicion lo
 * confirmo: a scrollY 0 los 15 de 15 elementos de la portada ya estaban
 * visibles, en un documento de 5.209 px con un visor de 900. Los `delay` del
 * JSX escalonaban algo que ya estaba puesto.
 *
 * Ahora la pieza solo se marca con [data-revela] y quien la esconde y la
 * muestra es RevelaEnCascada, con UN observador por pagina. De ahi salen dos
 * reglas de la casa que este componente hereda:
 *
 * 1. Sin JavaScript no se esconde nada. Este div no lleva ninguna clase que
 *    lo oculte: la que lo hace ("revela-armado") la agrega el efecto, o sea
 *    solo cuando ya hay quien la vaya a sacar.
 * 2. Lo que ya se ve al cargar no se arma. El observador filtra por el 85 %
 *    del visor antes de tocar nada.
 *
 * El escalonamiento va en --i y no en milisegundos: es la misma variable que
 * usan las paginas de servicio y el mismo paso de 70 ms, asi que el sitio
 * entero escalona igual y hay un solo numero que cambiar. Ver
 * "revela-armado.es-visible" en globals.css.
 *
 * El componente sigue existiendo -y no se disolvio en 18 divs sueltos- por
 * tres razones medidas: el div es item de rejilla en .trabajos, .repisa y
 * .ad-lista, asi que no se puede quitar sin mover la clase hacia adentro;
 * lleva el data-section-view del que cuelga el evento de analitica de las
 * objeciones, que se apagaria en silencio; y concentrar el vocabulario en un
 * archivo es justamente lo que evita que vuelva a haber dos.
 */
type RevealProps = {
  children: ReactNode
  className?: string
  /**
   * Posicion en el escalonado. Es un ordinal, no milisegundos: la hoja lo
   * multiplica por 70 ms. Cero -el valor por defecto- entra sin espera.
   */
  indice?: number
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

export function Reveal({ children, className = '', indice = 0, id, seccionVista }: RevealProps) {
  return (
    <div
      id={id}
      className={className || undefined}
      data-revela=""
      style={indice ? ({ '--i': indice } as CSSProperties) : undefined}
      data-section-view={seccionVista}
    >
      {children}
    </div>
  )
}
