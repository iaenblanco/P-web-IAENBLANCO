'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const position = useRef({ x: -100, y: -100 })
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    const syncEnabled = () => setEnabled(media.matches)
    syncEnabled()
    media.addEventListener('change', syncEnabled)
    return () => media.removeEventListener('change', syncEnabled)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const update = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`
      }
      frameRef.current = null
    }

    const onMove = (event: MouseEvent) => {
      position.current = { x: event.clientX, y: event.clientY }
      setVisible(true)
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-cursor]')
        : null
      setLabel(target?.dataset.cursor || '')
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      className={[
        'custom-cursor',
        visible ? 'is-visible' : '',
        label ? 'has-label' : '',
      ].join(' ')}
      aria-hidden="true"
    >
      <span>{label}</span>
    </div>
  )
}
