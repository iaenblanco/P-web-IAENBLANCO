'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer, SolutionCard } from '@/components';
import { BrainCircuitIcon, CodeIcon, WandSparklesIcon, MessageIcon, PaletteIcon, TrendingUpIcon } from '@/components/icons';

export default function SolucionesPage() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  const solutions = [
    {
      slug: 'paginas-web-ia',
      icon: CodeIcon,
      iconColor: 'text-fuchsia-400',
      iconAlt: 'Icono de código representando desarrollo web',
      title: 'Páginas Web con IA',
      description: 'Integramos IA para crear sitios web dinámicos, personalizados y eficientes que cautivan a tus usuarios.',
      targetAudience: 'Empresas que necesitan presencia digital moderna y optimizada',
      benefits: ['Sitios web adaptativos', 'Optimización SEO automática', 'Contenido dinámico generado por IA'],
      href: '/soluciones/paginas-web-ia'
    },
    {
      slug: 'diseno-shopify',
      icon: PaletteIcon,
      iconColor: 'text-purple-400',
      iconAlt: 'Icono de paleta representando diseños y códigos personalizados',
      title: 'Diseños/Códigos Personalizados en Shopify',
      description: 'Creamos diseños únicos y códigos personalizados para tu tienda Shopify, optimizando la conversión y experiencia de usuario.',
      targetAudience: 'E-commerce y tiendas online en Shopify',
      benefits: ['Diseños personalizados únicos', 'Optimización de conversión', 'Códigos personalizados avanzados'],
      href: '/soluciones/diseno-shopify'
    },
    {
      slug: 'chatbots-asistentes',
      icon: MessageIcon,
      iconColor: 'text-green-400',
      iconAlt: 'Icono de mensaje representando chatbots y asistentes virtuales',
      title: 'Chatbots Inteligentes y Asistentes Virtuales',
      description: 'Implementamos chatbots avanzados y asistentes virtuales que mejoran la experiencia del cliente y automatizan interacciones.',
      targetAudience: 'Empresas que buscan mejorar el servicio al cliente 24/7',
      benefits: ['Atención al cliente 24/7', 'Automatización de procesos', 'Mejora de la experiencia del usuario'],
      href: '/soluciones/chatbots-asistentes'
    },
    {
      slug: 'soluciones-medida',
      icon: WandSparklesIcon,
      iconColor: 'text-blue-400',
      iconAlt: 'Icono de varita mágica con chispas representando soluciones personalizadas',
      title: 'Soluciones a Medida',
      description: 'Desarrollamos soluciones de IA personalizadas para resolver tus desafíos más complejos y optimizar tus procesos.',
      targetAudience: 'Empresas con necesidades específicas de automatización',
      benefits: ['Soluciones personalizadas', 'Optimización de procesos', 'Automatización inteligente'],
      href: '/soluciones/soluciones-medida'
    },
    {
      slug: 'auditoria-sitios-personalizada',
      icon: TrendingUpIcon,
      iconColor: 'text-green-400',
      iconAlt: 'Icono de tendencias ascendentes representando análisis y métricas de auditoría de sitios web',
      title: 'Auditoría de Sitios Personalizada con IA',
      description: 'Detectamos errores críticos en UX, UI, SEO y rendimiento para entregarte un plan claro y accionable adaptado a tu industria.',
      targetAudience: 'Empresas que buscan optimizar su presencia digital',
      benefits: ['Aumento de conversiones', 'Mejor SEO técnico', 'Plan de mejora accionable'],
      href: '/soluciones/auditoria-sitios-personalizada'
    },
    {
      slug: 'automatizaciones',
      icon: WandSparklesIcon,
      iconColor: 'text-cyan-400',
      iconAlt: 'Icono de varita mágica representando automatizaciones',
      title: 'Automatizaciones',
      description: 'Automatiza tus procesos repetitivos y ahorra hasta 30 horas semanales. Usamos IA para identificar oportunidades y diseñamos la mejor solución para tu caso.',
      targetAudience: 'Empresas que buscan optimizar procesos y reducir costos operativos',
      benefits: ['Ahorro de hasta 30h semanales', 'Reducción de costos hasta 60%', 'ROI visible en 3 meses'],
      href: '/soluciones/automatizaciones'
    }
  ];

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header onBackgroundChange={handleBackgroundChange} />

        {/* Hero Section */}
        <section className="pt-24 pb-12" aria-labelledby="solutions-hero-heading">
          <div className="container mx-auto px-6 text-center">
            <h1 id="solutions-hero-heading" className="text-4xl md:text-6xl font-bold mb-6">
              Nuestras <span className="text-cyan-400">Soluciones IA</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transformamos tu negocio con tecnología de vanguardia. Descubre cómo la Inteligencia Artificial
              puede revolucionar tus procesos y llevarte al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Solicitar Consulta Gratuita
              </Link>
              <Link
                href="/casos-exito"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Ver Casos de Éxito
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20" aria-labelledby="solutions-grid-heading">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="solutions-grid-heading" className="text-3xl md:text-4xl font-bold mb-2">Elige tu Solución</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Cada solución está diseñada para resolver desafíos específicos de tu negocio.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
              {solutions.map((solution, index) => (
                <SolutionCard
                  key={index}
                  slug={solution.slug}
                  icon={solution.icon}
                  iconColor={solution.iconColor}
                  iconAlt={solution.iconAlt}
                  title={solution.title}
                  description={solution.description}
                  targetAudience={solution.targetAudience}
                  benefits={solution.benefits}
                  href={solution.href}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black/20" aria-labelledby="solutions-cta-heading">
          <div className="container mx-auto px-6 text-center">
            <h2 id="solutions-cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Podemos desarrollar una solución personalizada que se adapte perfectamente a tus necesidades específicas.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-10 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.6)] text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Hablemos de tu Proyecto
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
