import Link from 'next/link';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { QuoteMark } from './icons';
import { IconBadge } from './IconBadge';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  chips: string[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'María González',
    role: 'CEO · TechSolutions Chile',
    quote:
      'IAenBlanco transformó completamente nuestro servicio al cliente con un chatbot que maneja el 80% de las consultas automáticamente.',
    chips: ['-70% tiempo de respuesta', '+40% satisfacción', '$14.250.000 ahorro anual'],
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Director de Operaciones · ModaExpress',
    quote:
      'El sistema de inventario con IA nos permitió reducir el 50% de productos con sobrestock y aumentar un 25% la rotación.',
    chips: ['-50% sobrestock', '+25% rotación', '+15% margen'],
  },
  {
    name: 'Ana Martínez',
    role: 'Directora Académica · EduTech Academy',
    quote:
      'La personalización del contenido educativo aumentó la finalización de cursos en un 35% y mejoró las calificaciones.',
    chips: ['-60% abandono', '+35% finalización', '+45% calificaciones'],
  },
];

const METRICS: { end: number; suffix: string; label: string }[] = [
  { end: 50, suffix: '+', label: 'Proyectos entregados' },
  { end: 95, suffix: '%', label: 'Clientes satisfechos' },
  { end: 300, suffix: '%', label: 'ROI promedio' },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#f4f3f0] text-neutral-900 py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Encabezado editorial, alineado a la izquierda */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--galaxy-accent)]" />
            Clientes
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03] mt-5">
            Resultados reales de clientes reales.
          </h2>
          <p className="text-neutral-500 text-lg mt-5 max-w-xl">
            No prometemos números: los entregamos. Esto es lo que logramos con ellos.
          </p>
        </div>

        {/* Grilla de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group flex flex-col rounded-2xl md:rounded-3xl bg-white border border-black/[0.07] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)]"
            >
              <IconBadge Icon={QuoteMark} />

              <p className="text-neutral-800 text-lg mt-5">“{testimonial.quote}”</p>

              <div className="mt-6">
                <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-neutral-500 text-sm">{testimonial.role}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {testimonial.chips.map((chip) => (
                  <span
                    key={chip}
                    className="bg-[color:var(--galaxy-accent)]/10 text-[color:var(--galaxy-accent)] border border-[color:var(--galaxy-accent)]/25 rounded-full px-3 py-1 text-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Franja de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-center">
          {METRICS.map((metric) => (
            <div key={metric.label}>
              <AnimatedCounter
                end={metric.end}
                suffix={metric.suffix}
                className="font-display text-4xl md:text-5xl font-semibold text-[color:var(--galaxy-accent)]"
              />
              <p className="text-neutral-500 mt-2">{metric.label}</p>
            </div>
          ))}
        </div>

        <p className="text-neutral-400 text-xs mt-6 text-center">
          Métricas de referencia sobre proyectos con resultados medidos.
        </p>

        {/* CTA de sección */}
        <div className="flex justify-center">
          <Link
            href="/casos-exito"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 text-neutral-900 px-7 py-3.5 font-medium hover:border-neutral-900 transition mt-12"
          >
            Ver todos los casos de éxito
          </Link>
        </div>
      </div>
    </section>
  );
}
