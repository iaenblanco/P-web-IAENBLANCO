'use client';

import Link from 'next/link';
import { AuditFrame, AssistantWave, Storefront, AutomationFlow, WebGrowth, NodeNetwork, SparkCheck } from './icons';
import { CalButton } from '@/components/CalButton';
import { IconBadge } from './IconBadge';
import { useUF, formatCLP, formatUF, ufToCLP } from '@/lib/uf';

type Service = {
  Icon: typeof AuditFrame;
  label: string;
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
    Icon: AuditFrame,
    label: 'Auditoría',
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
    Icon: AssistantWave,
    label: 'Chatbots',
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
    Icon: Storefront,
    label: 'Shopify',
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
    Icon: AutomationFlow,
    label: 'Automatización',
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
    Icon: WebGrowth,
    label: 'Web',
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
    Icon: NodeNetwork,
    label: 'A medida',
    title: 'Soluciones a Medida',
    description: '¿Tu desafío no entra en una caja? Lo diseñamos contigo.',
    ideal: 'Empresas con necesidades específicas',
    benefits: ['100% a tu medida', 'Escalable', 'Ventaja competitiva'],
    priceUF: 120,
    cta: 'cal',
    ctaLabel: 'Hablemos',
  },
];

function Arrow() {
  return (
    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ServicesSection() {
  const { uf, loading, isFallback, fecha } = useUF();

  return (
    <section id="servicios" className="bg-[#f4f3f0] text-neutral-900 py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Encabezado editorial, alineado a la izquierda */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--galaxy-accent)]" />
            Servicios
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03] mt-5">
            Servicios y precios claros. Sin sorpresas.
          </h2>
          <p className="text-neutral-500 text-lg mt-5 max-w-xl">
            Precios de referencia en UF, la unidad estable de Chile. El valor final se confirma en tu
            reunión, según el alcance real de tu proyecto.
          </p>
          <p className="text-neutral-400 text-sm mt-4">
            El equivalente en pesos se calcula con la UF de hoy
            {loading ? '…' : ': ' + formatCLP(uf)}
            {isFallback ? ' (aprox.)' : fecha ? ' (al ' + fecha.slice(0, 10) + ')' : ''}. Valores
            referenciales.
          </p>
        </div>

        {/* Grilla de servicios */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-14">
          {SERVICES.map((service) => {
            const { Icon } = service;
            const clp = ufToCLP(service.priceUF, uf);
            return (
              <div
                key={service.title}
                className={
                  'group relative flex flex-col rounded-3xl bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] ' +
                  (service.featured
                    ? 'ring-1 ring-[color:var(--galaxy-accent)] shadow-[0_8px_40px_rgba(0,0,0,0.06)]'
                    : 'border border-black/[0.07]')
                }
              >
                {service.featured && (
                  <span className="absolute right-6 top-6 text-[color:var(--galaxy-accent)] text-[11px] font-semibold tracking-[0.12em] uppercase">
                    Más solicitado
                  </span>
                )}

                <IconBadge Icon={Icon} />
                <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  {service.label}
                </span>
                <h3 className="font-display text-xl font-semibold mt-1">{service.title}</h3>
                <p className="text-neutral-500 text-sm mt-2">{service.description}</p>
                <p className="text-neutral-400 text-xs mt-3">Ideal para: {service.ideal}</p>

                <ul className="mt-5 space-y-2 flex-1">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-neutral-700">
                      <SparkCheck className="h-4 w-4 text-[color:var(--galaxy-accent)] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-black/[0.07] flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl font-semibold leading-none">
                      desde {formatUF(service.priceUF)}
                    </p>
                    <p className="text-neutral-400 text-sm mt-1.5">
                      ≈ {loading ? '…' : formatCLP(clp)} hoy
                    </p>
                  </div>
                  {service.cta === 'cal' ? (
                    <CalButton
                      calLink="iaenblanco/15min"
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-700 transition-colors"
                    >
                      {service.ctaLabel}
                      <Arrow />
                    </CalButton>
                  ) : (
                    <Link
                      href={service.href!}
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-700 transition-colors"
                    >
                      {service.ctaLabel}
                      <Arrow />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA de sección */}
        <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="text-neutral-600 text-lg max-w-md">
            ¿No sabes cuál necesitas? Agenda 15 minutos y te orientamos, sin compromiso.
          </p>
          <CalButton
            calLink="iaenblanco/15min"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[var(--galaxy-accent)] text-[color:var(--galaxy-on-accent)] px-7 py-3.5 font-medium hover:brightness-110 transition"
          >
            Agendar reunión gratis
            <Arrow />
          </CalButton>
        </div>
      </div>
    </section>
  );
}
