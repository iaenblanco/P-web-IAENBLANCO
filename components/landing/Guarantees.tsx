import { CheckCircleIcon, MapPinIcon, TrendingUpIcon, MessageIcon } from '@/components/icons';

export function Guarantees() {
  const items = [
    {
      Icon: CheckCircleIcon,
      title: 'Sin compromiso',
      body: 'La primera reunión es gratis y honesta. Si la IA no te sirve, te lo decimos.',
    },
    {
      Icon: MapPinIcon,
      title: 'Empresa formal chilena',
      body: 'IAenBlanco SpA, RUT 78.403.861-0, Las Condes. Contrato, boleta y factura.',
    },
    {
      Icon: TrendingUpIcon,
      title: 'Foco en resultados',
      body: 'Definimos qué vas a mejorar antes de empezar. Te mostramos números, no promesas.',
    },
    {
      Icon: MessageIcon,
      title: 'Acompañamiento real',
      body: 'No desaparecemos tras entregar. Respondemos en menos de 24 h hábiles.',
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Por qué las empresas confían en nosotros.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <Icon className="h-7 w-7 text-[color:var(--galaxy-accent)]" />
              <h3 className="text-base font-semibold text-white mt-3 mb-1">{title}</h3>
              <p className="text-white/70 text-sm">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
