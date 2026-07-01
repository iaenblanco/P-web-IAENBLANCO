import { AutomationFlow, AssistantWave, WebGrowth } from './icons';
import { IconBadge } from './IconBadge';

const props = [
  {
    Icon: AutomationFlow,
    title: 'Automatiza lo repetitivo',
    body: 'Cotizaciones, respuestas, reportes, carga de datos. Recuperas horas cada semana para lo que de verdad importa.',
  },
  {
    Icon: AssistantWave,
    title: 'Atiende 24/7 sin contratar más gente',
    body: 'Chatbots y asistentes que responden al instante, califican clientes y agendan por ti — de día y de noche.',
  },
  {
    Icon: WebGrowth,
    title: 'Vende más con tu web',
    body: 'Sitios y tiendas optimizados con IA para que quien entra, compre. Rápidos, claros y hechos para convertir.',
  },
];

export function ValueProps() {
  return (
    <section className="bg-[#f4f3f0] text-neutral-900 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--galaxy-accent)]" />
          Qué resolvemos
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03] mt-5 max-w-2xl">
          La IA no es magia. Es tiempo y dinero que hoy estás perdiendo.
        </h2>
        <p className="text-neutral-500 text-lg mt-5 max-w-xl">
          Te ayudamos en las tres cosas que más impacto tienen en un negocio hoy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {props.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl md:rounded-3xl border border-black/[0.07] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)]"
            >
              <IconBadge Icon={Icon} />
              <h3 className="font-display text-xl font-semibold mt-5 mb-2 text-neutral-900">
                {title}
              </h3>
              <p className="text-neutral-500">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
