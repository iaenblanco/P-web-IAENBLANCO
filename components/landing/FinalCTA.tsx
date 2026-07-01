import { CalButton } from '@/components/CalButton';

export function FinalCTA() {
  return (
    <section className="bg-[#f4f3f0] text-neutral-900 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950 text-white px-8 py-16 md:px-16 md:py-24 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, var(--galaxy-glow), transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.03] text-white">
              Conversemos 15 minutos. Sin costo, sin compromiso.
            </h2>
            <p className="text-white/70 text-lg mt-4">
              Te decimos con honestidad si la IA puede ayudarte y cómo. Si no aplica a tu caso,
              también te lo diremos.
            </p>

            <div className="mt-10">
              <CalButton
                calLink="iaenblanco/15min"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--galaxy-accent)] text-[color:var(--galaxy-on-accent)] px-9 py-4 font-semibold text-lg hover:brightness-110 transition"
              >
                Agendar mi reunión gratis
              </CalButton>
            </div>

            <div className="mt-6">
              <a
                href="mailto:contacto@iaenblanco.com"
                className="text-white/60 hover:text-white text-sm"
              >
                O escríbenos a contacto@iaenblanco.com
              </a>
            </div>

            <p className="text-white/50 text-xs mt-6">
              15 min · Por videollamada · Respuesta el mismo día hábil · Lun a Vie 09:00-18:00 · +56
              9 7768 4800
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
