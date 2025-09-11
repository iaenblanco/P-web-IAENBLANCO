import React from 'react';
import { BrainCircuitIcon, CodeIcon, WandSparklesIcon, MessageIcon, PaletteIcon, TrendingUpIcon } from './icons';

export const Services: React.FC = () => {
  const services = [
    {
      icon: BrainCircuitIcon,
      iconColor: 'text-cyan-400',
      iconAlt: 'Icono de circuito cerebral representando educación en IA',
      title: 'Educación IA',
      description: 'Aprende los fundamentos y las aplicaciones avanzadas de la IA con cursos diseñados por expertos para todos los niveles.',
      ariaLabel: 'Servicio de educación en Inteligencia Artificial'
    },
    {
      icon: CodeIcon,
      iconColor: 'text-fuchsia-400',
      iconAlt: 'Icono de código representando desarrollo web',
      title: 'Páginas Web con IA',
      description: 'Integramos IA para crear sitios web dinámicos, personalizados y eficientes que cautivan a tus usuarios.',
      ariaLabel: 'Servicio de desarrollo web con Inteligencia Artificial'
    },
    {
      icon: PaletteIcon,
      iconColor: 'text-purple-400',
      iconAlt: 'Icono de paleta representando diseños y códigos personalizados',
      title: 'Diseños/Códigos Personalizados en Shopify',
      description: 'Creamos diseños únicos y códigos personalizados para tu tienda Shopify, optimizando la conversión y experiencia de usuario.',
      ariaLabel: 'Servicio de diseños y códigos personalizados para Shopify'
    },
    {
      icon: MessageIcon,
      iconColor: 'text-green-400',
      iconAlt: 'Icono de mensaje representando chatbots y asistentes virtuales',
      title: 'Chatbots Inteligentes y Asistentes Virtuales',
      description: 'Implementamos chatbots avanzados y asistentes virtuales que mejoran la experiencia del cliente y automatizan interacciones.',
      ariaLabel: 'Servicio de chatbots inteligentes y asistentes virtuales con IA'
    },
    {
      icon: WandSparklesIcon,
      iconColor: 'text-blue-400',
      iconAlt: 'Icono de varita mágica con chispas representando soluciones personalizadas',
      title: 'Soluciones a Medida',
      description: 'Desarrollamos soluciones de IA personalizadas para resolver tus desafíos más complejos y optimizar tus procesos.',
      ariaLabel: 'Servicio de soluciones personalizadas con Inteligencia Artificial'
    },
    {
      icon: TrendingUpIcon,
      iconColor: 'text-green-400',
      iconAlt: 'Icono de tendencias ascendentes representando análisis y métricas de auditoría de sitios web',
      title: 'Auditoría de Sitios Personalizada con IA',
      description: 'Detectamos errores críticos en UX, UI, SEO y rendimiento para entregarte un plan claro y accionable adaptado a tu industria.',
      ariaLabel: 'Servicio de auditoría personalizada de sitios web con Inteligencia Artificial'
    }
  ];

  return (
    <section id="services" className="py-20" aria-labelledby="services-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-2">Nuestras Soluciones de IA</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Transformamos ideas en realidad con tecnología de vanguardia.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <article
                key={index}
                className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-cyan-400 hover:scale-105 group hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                role="listitem"
                aria-labelledby={`service-title-${index}`}
                aria-describedby={`service-desc-${index}`}
              >
                <div className="mb-4" aria-hidden="true">
                  <IconComponent
                    className={`h-12 w-12 ${service.iconColor} transition-transform duration-300 group-hover:rotate-12`}
                    aria-label={service.iconAlt}
                  />
                </div>
                <h3 id={`service-title-${index}`} className="text-2xl font-bold mb-2">{service.title}</h3>
                <p id={`service-desc-${index}`} className="text-gray-300">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
