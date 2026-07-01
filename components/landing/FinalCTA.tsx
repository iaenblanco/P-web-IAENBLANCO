import { CalButton } from '@/components/CalButton';

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 border-t border-[color:var(--galaxy-accent)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, var(--galaxy-glow), transparent 70%)' }}
      />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Conversemos 15 minutos. Sin costo, sin compromiso.
          </h2>
          <p className="text-white/70 text-lg mt-4">
            Te decimos con honestidad si la IA puede ayudarte y cómo. Si no aplica a tu caso, también te lo diremos.
          </p>
          <div className="mt-10">
            <CalButton
              calLink="iaenblanco/15min"
              className="bg-[var(--galaxy-accent)] text-[color:var(--galaxy-on-accent)] font-bold text-lg px-10 py-4 rounded-xl hover:brightness-110 shadow-[0_0_25px_var(--galaxy-glow)] inline-block"
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
          <p className="text-white/60 text-xs mt-6">
            15 min · Por videollamada · Respuesta el mismo día hábil · Lun a Vie 09:00-18:00 · +56 9 7768 4800
          </p>
        </div>
      </div>
    </section>
  );
}
