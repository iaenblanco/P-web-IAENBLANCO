'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircleIcon,
  MessageIcon,
  PaletteIcon,
  WandSparklesIcon,
  CodeIcon,
  BrainCircuitIcon,
} from '@/components/icons';
import { CalButton } from '@/components/CalButton';
import { useUF, formatCLP, formatUF, ufToCLP } from '@/lib/uf';

type Service = {
  Icon: typeof CheckCircleIcon;
  title: string;
  description: string;
  ideal: string;
  benefits: string[];
  priceUF: number;
  featured?: boolean;
  href?: string;
  cta: 'link' | 'cal';
  ctaLabel: string;
};

const SERVICES: Service[] = [
  {
    Icon: CheckCircleIcon,
    title: 'Auditoría de Sitios con IA',
    description: 'Encontramos qué frena tus ventas y te damos un plan claro para arreglarlo.',
    ideal: 'eCommerce, clínicas, servicios y startups',
    benefits: ['Más conversiones', 'SEO técnico', 'Reporte con quick wins'],
    priceUF: 7,
    href: '/soluciones/auditoria-sitios-personalizada',
    cta: 'link',
    ctaLabel: 'Ver detalle',
  },
  {
    Icon: MessageIcon,
    title: 'Chatbots y Asistentes Virtuales',
    description: 'Atención al cliente 24/7 que responde, califica y agenda por ti.',
    ideal: 'Empresas que quieren bajar costos de soporte',
    benefits: ['Soporte 24/7', 'Menos costos operativos', 'Integrado a tus sistemas'],
    priceUF: 12,
    href: '/soluciones/chatbots-asistentes',
    cta: 'link',
    ctaLabel: 'Ver detalle',
  },
  {
    Icon: PaletteIcon,
    title: 'Diseño y Código en Shopify',
    description: 'Tu tienda Shopify, más rápida y diseñada para vender.',
    ideal: 'Tiendas online que buscan más conversión',
    benefits: ['Diseño único de marca', 'Optimizada para e-commerce', 'Más conversión'],
    priceUF: 19,
    href: '/soluciones/diseno-shopify',
    cta: 'link',
    ctaLabel: 'Ver detalle',
  },
  {
    Icon: WandSparklesIcon,
    title: 'Automatizaciones',
    description: 'Recupera hasta 30 horas semanales eliminando tareas manuales.',
    ideal: 'Cualquier empresa con procesos repetitivos',
    benefits: ['Hasta 30 h/semana ahorradas', 'Hasta 60% menos costos', 'ROI en 1-3 meses'],
    priceUF: 24,
    featured: true,
    href: '/soluciones/automatizaciones',
    cta: 'link',
    ctaLabel: 'Ver detalle',
  },
  {
    Icon: CodeIcon,
    title: 'Páginas Web con IA',
    description: 'Un sitio que se adapta a cada visitante y trabaja por ti.',
    ideal: 'Empresas que necesitan presencia digital moderna',
    benefits: ['Contenido adaptado al usuario', 'SEO automático', 'Menos mantención'],
    priceUF: 36,
    href: '/soluciones/paginas-web-ia',
    cta: 'link',
    ctaLabel: 'Ver detalle',
  },
  {
    Icon: BrainCircuitIcon,
    title: 'Soluciones a Medida',
    description: '¿Tu desafío no entra en una caja? Lo diseñamos contigo.',
    ideal: 'Empresas con necesidades específicas',
    benefits: ['100% a tu medida', 'Escalable', 'Ventaja competitiva'],
    priceUF: 120,
    cta: 'cal',
    ctaLabel: 'Hablemos',
  },
];

export function ServicesSection() {
  const { uf, loading, isFallback, fecha } = useUF();
  const [unidad, setUnidad] = useState('UF');

  const notaEquivalente =
    'Equivalente en pesos con la UF de hoy: ' +
    (loading ? 'cargando…' : formatCLP(uf)) +
    (isFallback ? ' (aprox.)' : fecha ? ' (al ' + fecha.slice(0, 10) + ')' : '') +
    '. Precios referenciales, se confirman en tu reunión.';

  return (
    <section id="servicios" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Servicios y precios claros. Sin sorpresas.
          </h2>
          <p className="text-white/70 text-lg mt-4 max-w-2xl mx-auto">
            Precios de referencia en UF, la unidad estable de Chile. El valor final se confirma en
            tu reunión, según el alcance real de tu proyecto.
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <div className="inline-flex gap-1 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setUnidad('UF')}
              aria-pressed={unidad === 'UF'}
              className={
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ' +
                (unidad === 'UF'
                  ? 'bg-[var(--galaxy-accent)] text-[color:var(--galaxy-on-accent)]'
                  : 'border border-white/15 text-white/70')
              }
            >
              UF
            </button>
            <button
              type="button"
              onClick={() => setUnidad('CLP')}
              aria-pressed={unidad === 'CLP'}
              className={
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ' +
                (unidad === 'CLP'
                  ? 'bg-[var(--galaxy-accent)] text-[color:var(--galaxy-on-accent)]'
                  : 'border border-white/15 text-white/70')
              }
            >
              CLP
            </button>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-8">{notaEquivalente}</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const { Icon } = service;
            const clp = ufToCLP(service.priceUF, uf);
            return (
              <div
                key={service.title}
                className={
                  'relative flex flex-col bg-white/[0.03] border rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 transition-colors ' +
                  (service.featured ? 'border-[color:var(--galaxy-accent)]' : 'border-white/10')
                }
              >
                {service.featured && (
                  <span className="absolute -top-3 left-6 bg-[color:var(--galaxy-accent)]/10 text-[color:var(--galaxy-accent)] border border-[color:var(--galaxy-accent)]/30 rounded-full px-3 py-1 text-xs font-medium">
                    Más solicitado
                  </span>
                )}

                <Icon className="h-7 w-7 text-[color:var(--galaxy-accent)]" />
                <h3 className="text-lg font-semibold text-white mt-4">{service.title}</h3>
                <p className="text-white/70 text-sm mt-2">{service.description}</p>
                <p className="text-white/50 text-xs mt-2">Ideal para: {service.ideal}</p>

                <ul className="mt-4 space-y-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircleIcon className="h-4 w-4 text-[color:var(--galaxy-accent)] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {unidad === 'UF' ? (
                    <>
                      <p className="text-2xl font-bold text-[color:var(--galaxy-accent)]">
                        desde {formatUF(service.priceUF)}
                      </p>
                      <p className="text-white/50 text-sm mt-1">≈ {formatCLP(clp)}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-[color:var(--galaxy-accent)]">
                        desde {formatCLP(clp)}
                      </p>
                      <p className="text-white/50 text-sm mt-1">≈ {formatUF(service.priceUF)}</p>
                    </>
                  )}
                </div>

                <div className="mt-6">
                  {service.cta === 'cal' ? (
                    <CalButton
                      calLink="iaenblanco/15min"
                      className="border border-white/15 text-white hover:border-[color:var(--galaxy-accent)] rounded-lg px-4 py-2 text-sm inline-block transition-colors"
                    >
                      {service.ctaLabel}
                    </CalButton>
                  ) : (
                    <Link
                      href={service.href!}
                      className="border border-white/15 text-white hover:border-[color:var(--galaxy-accent)] rounded-lg px-4 py-2 text-sm inline-block transition-colors"
                    >
                      {service.ctaLabel}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-white/70 text-lg mb-6">
            ¿No sabes cuál necesitas? Agenda 15 min y te orientamos.
          </p>
          <CalButton
            calLink="iaenblanco/15min"
            className="bg-[var(--galaxy-accent)] text-[color:var(--galaxy-on-accent)] font-semibold px-8 py-3 rounded-xl hover:brightness-110 inline-block"
          >
            Agendar reunión gratis
          </CalButton>
        </div>
      </div>
    </section>
  );
}
