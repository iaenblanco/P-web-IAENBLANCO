'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { services } from '@/lib/site'

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SystemDiagram({ active }: { active: number }) {
  const points = [
    [62, 136],
    [146, 72],
    [242, 116],
    [336, 58],
    [420, 132],
  ]

  return (
    <div className="system-diagram" aria-hidden="true">
      <div className="system-diagram__status">
        <span>system.map</span>
        <span>0{active + 1} / 05</span>
      </div>
      <svg viewBox="0 0 480 230" fill="none">
        <path
          className="system-diagram__base"
          d="M62 136 146 72l96 44 94-58 84 74"
        />
        <path
          className="system-diagram__active-path"
          d={`M62 136 ${points.slice(1, active + 1).map(([x, y]) => `L${x} ${y}`).join(' ')}`}
        />
        {points.map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`} className={index <= active ? 'is-active' : ''}>
            <circle className="system-diagram__pulse" cx={cx} cy={cy} r="14" />
            <circle className="system-diagram__node" cx={cx} cy={cy} r="5" />
          </g>
        ))}
      </svg>
      <div className="system-diagram__readout">
        <span>Entrada</span>
        <strong>{services[active].signals[0]}</strong>
        <span>Salida</span>
        <strong>{services[active].signals[services[active].signals.length - 1]}</strong>
      </div>
    </div>
  )
}

export function ServiceSystem() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observers = itemRefs.current.map((element, index) => {
      if (!element) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index)
        },
        { rootMargin: '-38% 0px -38% 0px', threshold: 0 },
      )
      observer.observe(element)
      return observer
    })

    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  return (
    <section className="services-system" id="servicios" aria-labelledby="services-heading">
      <div className="section-shell">
        <div className="services-system__intro">
          <p className="eyebrow">Sistema de capacidades</p>
          <h2 id="services-heading">
            Una operación conectada necesita más que una herramienta aislada.
          </h2>
          <p>
            Diseñamos la capa que falta: desde la experiencia visible hasta el backend,
            las automatizaciones y la inteligencia que mueve el sistema.
          </p>
        </div>

        <div className="services-system__layout">
          <div className="services-system__sticky">
            <SystemDiagram active={active} />
          </div>

          <div className="services-system__list">
            {services.map((service, index) => (
              <article
                key={service.slug}
                ref={(element) => {
                  itemRefs.current[index] = element
                }}
                className={active === index ? 'service-entry is-active' : 'service-entry'}
                onMouseEnter={() => setActive(index)}
              >
                <div className="service-entry__heading">
                  <span>{service.index}</span>
                  <p>{service.eyebrow}</p>
                </div>
                <h3>{service.title}</h3>
                <p className="service-entry__description">{service.description}</p>
                <div className="service-entry__signals">
                  {service.signals.map((signal) => <span key={signal}>{signal}</span>)}
                </div>
                <Link
                  href={`/servicios/${service.slug}`}
                  className="service-entry__link"
                  data-cursor="Abrir"
                >
                  Ver capacidad
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
