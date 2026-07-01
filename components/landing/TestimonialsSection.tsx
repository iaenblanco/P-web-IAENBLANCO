import Link from 'next/link';
import { StarIcon } from '@/components/icons';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const testimonials = [
  {
    author: 'María González',
    role: 'CEO · TechSolutions Chile',
    quote:
      'IAenBlanco transformó completamente nuestro servicio al cliente con un chatbot que maneja el 80% de las consultas automáticamente.',
    chips: ['-70% tiempo de respuesta', '+40% satisfacción', '$14.250.000 ahorro anual'],
  },
  {
    author: 'Carlos Rodríguez',
    role: 'Director de Operaciones · ModaExpress',
    quote:
      'El sistema de inventario con IA nos permitió reducir el 50% de productos con sobrestock y aumentar un 25% la rotación.',
    chips: ['-50% sobrestock', '+25% rotación', '+15% margen'],
  },
  {
    author: 'Ana Martínez',
    role: 'Directora Académica · EduTech Academy',
    quote:
      'La personalización del contenido educativo aumentó la finalización de cursos en un 35% y mejoró las calificaciones.',
    chips: ['-60% abandono', '+35% finalización', '+45% calificaciones'],
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Resultados reales de clientes reales.
          </h2>
          <p className="text-white/70 text-lg mt-4">
            No prometemos números: los entregamos. Esto es lo que logramos con ellos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:border-white/20 transition-colors flex flex-col"
            >
              <StarIcon className="h-7 w-7 text-[color:var(--galaxy-accent)]" />
              <p className="text-lg text-white/90 mt-4">“{t.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-white">{t.author}</p>
                <p className="text-white/60 text-sm">{t.role}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {t.chips.map((chip) => (
                  <span
                    key={chip}
                    className="bg-[color:var(--galaxy-accent)]/10 text-[color:var(--galaxy-accent)] border border-[color:var(--galaxy-accent)]/30 rounded-full px-3 py-1 text-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-center">
          <div>
            <AnimatedCounter
              end={50}
              suffix="+"
              className="text-3xl md:text-4xl font-bold text-[color:var(--galaxy-accent)]"
            />
            <p className="text-white/60 mt-2">Proyectos entregados</p>
          </div>
          <div>
            <AnimatedCounter
              end={95}
              suffix="%"
              className="text-3xl md:text-4xl font-bold text-[color:var(--galaxy-accent)]"
            />
            <p className="text-white/60 mt-2">Clientes satisfechos</p>
          </div>
          <div>
            <AnimatedCounter
              end={300}
              suffix="%"
              className="text-3xl md:text-4xl font-bold text-[color:var(--galaxy-accent)]"
            />
            <p className="text-white/60 mt-2">ROI promedio</p>
          </div>
        </div>
        <p className="text-white/50 text-xs text-center mt-6">
          Métricas de referencia sobre proyectos con resultados medidos.
        </p>

        <div className="text-center mt-12">
          <Link
            href="/casos-exito"
            className="border border-[color:var(--galaxy-accent)] text-white hover:bg-[color:var(--galaxy-accent)]/10 rounded-xl px-8 py-3 inline-block"
          >
            Ver todos los casos de éxito
          </Link>
        </div>
      </div>
    </section>
  );
}
