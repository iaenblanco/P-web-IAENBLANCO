import { CalButton } from '@/components/CalButton';

const steps = [
  {
    number: '01',
    title: 'Reunión gratis (15 min)',
    description:
      'Nos cuentas tu problema. Te decimos con honestidad si la IA te conviene y cómo.',
  },
  {
    number: '02',
    title: 'Propuesta escrita',
    description:
      'Recibes alcance, plazos y precio en UF por escrito. Sin letra chica.',
  },
  {
    number: '03',
    title: 'Desarrollo con avances',
    description:
      'Construimos, integramos con tus herramientas actuales y te mostramos avances reales.',
  },
  {
    number: '04',
    title: 'Entrega y acompañamiento',
    description:
      'Lo dejamos funcionando y te acompañamos para que rinda de verdad.',
  },
];

export function ProcessSteps() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Un proceso claro, del primer &quot;hola&quot; a los resultados.
          </h2>
          <p className="text-white/70 text-lg mt-4">
            Sin tecnicismos ni compromisos iniciales. Empezamos por entender tu
            negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="text-4xl font-bold text-[color:var(--galaxy-accent)]">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-white mt-3 mb-2">
                {step.title}
              </h3>
              <p className="text-white/70">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CalButton
            calLink="iaenblanco/15min"
            className="bg-[var(--galaxy-accent)] text-[color:var(--galaxy-on-accent)] font-semibold px-8 py-3 rounded-xl hover:brightness-110 inline-block"
          >
            Agendar mi diagnóstico gratis
          </CalButton>
        </div>
      </div>
    </section>
  );
}
