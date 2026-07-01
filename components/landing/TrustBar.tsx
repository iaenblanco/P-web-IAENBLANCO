import { MapPinIcon, CheckCircleIcon, StarIcon, ClockIcon } from '@/components/icons';

export function TrustBar() {
  const items = [
    {
      Icono: MapPinIcon,
      texto: 'Empresa chilena registrada · Las Condes, Santiago',
    },
    {
      Icono: CheckCircleIcon,
      texto: '+50 proyectos entregados',
    },
    {
      Icono: StarIcon,
      texto: 'Clientes reales con resultados verificables',
    },
    {
      Icono: ClockIcon,
      texto: 'Respuesta en menos de 24 h hábiles',
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="border-t border-white/10 pt-12 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            {items.map(({ Icono, texto }) => (
              <div
                key={texto}
                className="flex flex-col items-center gap-3 md:flex-row md:items-start"
              >
                <Icono className="h-7 w-7 shrink-0 text-[color:var(--galaxy-accent)]" />
                <p className="text-sm text-white/80">{texto}</p>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm mt-10 text-center">
            IAenBlanco SpA · RUT 78.403.861-0 · Emitimos boleta y factura
          </p>
        </div>
      </div>
    </section>
  );
}
