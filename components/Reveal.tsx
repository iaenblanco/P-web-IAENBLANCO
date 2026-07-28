import { CSSProperties, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <div
      className={`reveal is-visible ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
