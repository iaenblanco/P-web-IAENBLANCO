'use client'

import { useEffect, useState } from 'react'

const phrases = [
  'sincronizando canales y stock',
  'construyendo sistemas a medida',
  'automatizando operaciones',
  'conectando IA con negocios reales',
]

export function TypingLine() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setLength(phrases[0].length)
      return
    }

    const phrase = phrases[phraseIndex]
    let delay = deleting ? 24 : 42

    if (!deleting && length === phrase.length) delay = 1500
    if (deleting && length === 0) delay = 280

    const timer = window.setTimeout(() => {
      if (!deleting && length === phrase.length) {
        setDeleting(true)
        return
      }
      if (deleting && length === 0) {
        setDeleting(false)
        setPhraseIndex((current) => (current + 1) % phrases.length)
        return
      }
      setLength((current) => current + (deleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, length, phraseIndex, reducedMotion])

  const content = phrases[phraseIndex].slice(0, length)

  return (
    <p className="typing-line" aria-label="IAenBlanco en operación">
      <span aria-hidden="true">system / </span>
      <strong>{content}</strong>
      <i aria-hidden="true" />
    </p>
  )
}
