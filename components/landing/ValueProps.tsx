import { WandSparklesIcon, MessageIcon, CodeIcon } from '@/components/icons';

const props = [
  {
    Icon: WandSparklesIcon,
    title: 'Automatiza lo repetitivo',
    body: 'Cotizaciones, respuestas, reportes, carga de datos. Recuperas horas cada semana para lo que de verdad importa.',
  },
  {
    Icon: MessageIcon,
    title: 'Atiende 24/7 sin contratar más gente',
    body: 'Chatbots y asistentes que responden al instante, califican clientes y agendan por ti — de día y de noche.',
  },
  {
    Icon: CodeIcon,
    title: 'Vende más con tu web',
    body: 'Sitios y tiendas optimizados con IA para que quien entra, compre. Rápidos, claros y hechos para convertir.',
  },
];

export function ValueProps() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            La IA no es magia. Es tiempo y dinero que hoy estás perdiendo.
          </h2>
          <p className="text-white/70 text-lg mt-4">
            Te ayudamos en las tres cosas que más impacto tienen en un negocio hoy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {props.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <Icon className="h-8 w-8 text-[color:var(--galaxy-accent)]" />
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">{title}</h3>
              <p className="text-white/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
