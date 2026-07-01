'use client';

import { useState } from 'react';

const faqs = [
  {
    q: '¿Necesito saber de IA para trabajar con ustedes?',
    a: 'No. Nosotros traducimos la tecnología a resultados de negocio. Tú pones el problema, nosotros la solución.',
  },
  {
    q: '¿Cuánto demora un proyecto?',
    a: 'Depende del alcance. Una auditoría o chatbot puede estar en 1-3 semanas; los proyectos a medida se definen en la propuesta.',
  },
  {
    q: '¿Por qué muestran precios en UF?',
    a: 'La UF es estable en el tiempo. Te damos el equivalente en pesos del día para que sepas exactamente cuánto es hoy.',
  },
  {
    q: '¿El precio es final?',
    a: 'Los valores son de referencia. El precio definitivo se confirma por escrito en la propuesta, según tu caso real.',
  },
  {
    q: '¿Emiten factura o boleta?',
    a: 'Sí. Somos una SpA registrada en Chile y emitimos documento tributario siempre.',
  },
  {
    q: '¿Qué pasa si la IA no me sirve?',
    a: 'Te lo decimos en la reunión gratis. Preferimos no venderte algo que no necesitas.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#f4f3f0] text-neutral-900 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Columna izquierda: título editorial (sticky en desktop) */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--galaxy-accent)]" />
              Preguntas frecuentes
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03] mt-5">
              Preguntas frecuentes.
            </h2>
            <p className="text-neutral-500 text-lg mt-5 max-w-md">
              Lo que casi todos preguntan antes de empezar.
            </p>
          </div>

          {/* Columna derecha: acordeón */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div
                  key={index}
                  className="bg-white border border-black/[0.07] rounded-xl px-5"
                >
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center gap-4 py-5 text-left font-medium text-neutral-900"
                  >
                    <span>{faq.q}</span>
                    <svg
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-[color:var(--galaxy-accent)] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="text-neutral-500 pb-5 -mt-1"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
