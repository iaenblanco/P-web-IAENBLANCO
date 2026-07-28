'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const position = useRef({ x: -100, y: -100 })
  const visibleRef = useRef(false)
  const labelRef = useRef('')
  const themeRef = useRef('default')
  const [label, setLabel] = useState('')
  const [theme, setTheme] = useState('default')
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
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update)
    }

    const syncTarget = (element: Element | null) => {
      const target = element?.closest<HTMLElement>('[data-cursor]') || null
      const themed = element?.closest<HTMLElement>('[data-cursor-theme]') || null
      const nextLabel = target?.dataset.cursor || ''
      const nextTheme = target?.dataset.cursorTheme || themed?.dataset.cursorTheme || 'default'

      if (nextLabel !== labelRef.current) {
        labelRef.current = nextLabel
        setLabel(nextLabel)
      }

      if (nextTheme !== themeRef.current) {
        themeRef.current = nextTheme
        setTheme(nextTheme)
      }
    }

    const onPointerOver = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null
      syncTarget(element)
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }

    const onEnter = () => {
      visibleRef.current = true
      setVisible(true)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('pointerover', onPointerOver)
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
        `theme-${theme}`,
      ].join(' ')}
      aria-hidden="true"
    >
      <i />
      <span>{label}</span>
    </div>
  )
}
