import { CSSProperties, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

export function Reveal({ children, className = '', delay = 0, id }: RevealProps) {
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <div
      id={id}
      className={`reveal is-visible ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
