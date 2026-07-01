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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/10 rounded-xl px-5 mb-3"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="text-left w-full flex justify-between items-center py-4 text-white font-medium"
                  >
                    <span>{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className={`ml-4 shrink-0 text-[color:var(--galaxy-accent)] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="text-white/70 pb-4"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
