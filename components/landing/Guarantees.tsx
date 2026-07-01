import { SparkCheck, Building, GrowthBars, AssistantWave } from './icons';
import { IconBadge } from './IconBadge';

const guarantees = [
  {
    Icon: SparkCheck,
    title: 'Sin compromiso',
    description: 'La primera reunión es gratis y honesta. Si la IA no te sirve, te lo decimos.',
  },
  {
    Icon: Building,
    title: 'Empresa formal chilena',
    description: 'IAenBlanco SpA, RUT 78.403.861-0, Las Condes. Contrato, boleta y factura.',
  },
  {
    Icon: GrowthBars,
    title: 'Foco en resultados',
    description: 'Definimos qué vas a mejorar antes de empezar. Te mostramos números, no promesas.',
  },
  {
    Icon: AssistantWave,
    title: 'Acompañamiento real',
    description: 'No desaparecemos tras entregar. Respondemos en menos de 24 h hábiles.',
  },
];

export function Guarantees() {
  return (
    <section className="bg-[#f4f3f0] text-neutral-900 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--galaxy-accent)]" />
            Confianza
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03] mt-5">
            Por qué las empresas confían en nosotros.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {guarantees.map((item) => {
            const { Icon } = item;
            return (
              <div
                key={item.title}
                className="group bg-white rounded-2xl md:rounded-3xl border border-black/[0.07] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)]"
              >
                <IconBadge Icon={Icon} />
                <h3 className="font-display text-base font-semibold mt-5 mb-1.5 text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
