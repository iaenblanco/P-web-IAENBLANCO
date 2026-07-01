import { CalButton } from '@/components/CalButton';

const steps = [
  {
    number: '01',
    title: 'Reunión gratis (15 min)',
    description: 'Nos cuentas tu problema. Te decimos con honestidad si la IA te conviene y cómo.',
  },
  {
    number: '02',
    title: 'Propuesta escrita',
    description: 'Recibes alcance, plazos y precio en UF por escrito. Sin letra chica.',
  },
  {
    number: '03',
    title: 'Desarrollo con avances',
    description: 'Construimos, integramos con tus herramientas actuales y te mostramos avances reales.',
  },
  {
    number: '04',
    title: 'Entrega y acompañamiento',
    description: 'Lo dejamos funcionando y te acompañamos para que rinda de verdad.',
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-[#f4f3f0] text-neutral-900 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Columna izquierda: título editorial (sticky en desktop) */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--galaxy-accent)]" />
              Proceso
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03] mt-5">
              Cómo trabajamos, del primer &quot;hola&quot; a los resultados.
            </h2>
            <p className="text-neutral-500 text-lg mt-5 max-w-md">
              Sin tecnicismos ni compromisos iniciales. Empezamos por entender tu negocio.
            </p>
            <div className="mt-8">
              <CalButton
                calLink="iaenblanco/15min"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--galaxy-accent)] text-[color:var(--galaxy-on-accent)] px-7 py-3.5 font-medium hover:brightness-110 transition"
              >
                Agendar mi diagnóstico gratis
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </CalButton>
            </div>
          </div>

          {/* Columna derecha: pasos numerados */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex items-start gap-5 rounded-2xl bg-white border border-black/[0.07] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 font-display text-sm font-semibold text-white transition-all duration-300 group-hover:bg-[var(--galaxy-accent)] group-hover:text-[color:var(--galaxy-on-accent)] group-hover:-translate-y-0.5">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="text-neutral-500 mt-1.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
