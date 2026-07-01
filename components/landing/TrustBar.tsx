import { Building, SparkCheck, GrowthBars, Stopwatch } from './icons';
import { IconBadge } from './IconBadge';

const items = [
  {
    Icon: Building,
    text: 'Empresa chilena registrada · Las Condes, Santiago',
  },
  {
    Icon: SparkCheck,
    text: '+50 proyectos entregados',
  },
  {
    Icon: GrowthBars,
    text: 'Clientes reales con resultados verificables',
  },
  {
    Icon: Stopwatch,
    text: 'Respuesta en menos de 24 h hábiles',
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#f4f3f0] text-neutral-900 py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="border-t border-black/[0.08] pt-12 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {items.map((item) => {
              const { Icon } = item;
              return (
                <div key={item.text} className="group flex items-center gap-3">
                  <IconBadge Icon={Icon} />
                  <span className="text-sm text-neutral-700">{item.text}</span>
                </div>
              );
            })}
          </div>

          <p className="text-neutral-500 text-sm text-center mt-10">
            IAenBlanco SpA · RUT 78.403.861-0 · Emitimos boleta y factura
          </p>
        </div>
      </div>
    </section>
  );
}
