'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { BrainCircuitIcon, LightbulbIcon, GraduationCapIcon, WandSparklesIcon } from '@/components/icons';

export default function RecursosPage() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  const resources = [
    {
      slug: 'ruta-aprendizaje',
      icon: BrainCircuitIcon,
      iconColor: 'text-cyan-400',
      iconAlt: 'Icono de circuito cerebral representando aprendizaje',
      title: 'Ruta de Aprendizaje IA',
      description: 'Un camino completo para dominar la Inteligencia Artificial, desde conceptos básicos hasta aplicaciones avanzadas.',
      features: [
        'Cursos estructurados por niveles',
        'Proyectos prácticos reales',
        'Certificación al finalizar',
        'Comunidad de aprendizaje'
      ],
      href: '/recursos/ruta-aprendizaje',
      buttonText: 'Comenzar Ruta de Aprendizaje'
    },
    {
      slug: 'generador-ideas',
      icon: WandSparklesIcon,
      iconColor: 'text-purple-400',
      iconAlt: 'Icono de varita mágica representando generación de ideas',
      title: 'Generador de Ideas con IA',
      description: 'Herramienta interactiva que utiliza IA para generar ideas innovadoras, soluciones creativas y conceptos únicos.',
      features: [
        'Generación instantánea de ideas',
        'Personalización por industria',
        'Ideas adaptadas a tus objetivos',
        'Resultados exportables'
      ],
      href: '/recursos/generador-ideas',
      buttonText: 'Probar Generador de Ideas'
    }
  ];

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header onBackgroundChange={handleBackgroundChange} />

        {/* Hero Section */}
        <section className="pt-24 pb-12" aria-labelledby="recursos-hero-heading">
          <div className="container mx-auto px-6 text-center">
            <h1 id="recursos-hero-heading" className="text-4xl md:text-6xl font-bold mb-6">
              Recursos <span className="text-cyan-400">IA</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Potencia tu conocimiento y creatividad con nuestras herramientas y recursos especializados en Inteligencia Artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/recursos/ruta-aprendizaje"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
              >
                <GraduationCapIcon className="inline h-5 w-5 mr-2" />
                Comenzar Aprendizaje
              </Link>
              <Link
                href="/recursos/generador-ideas"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                <WandSparklesIcon className="inline h-5 w-5 mr-2" />
                Generar Ideas
              </Link>
            </div>
          </div>
        </section>

        {/* Recursos Grid */}
        <section className="py-20" aria-labelledby="recursos-grid-heading">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="recursos-grid-heading" className="text-3xl md:text-4xl font-bold mb-2">Nuestros Recursos</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Herramientas prácticas y contenido educativo para potenciar tu uso de la IA.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <article
                    key={index}
                    className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-cyan-400 hover:scale-105 group hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                    role="listitem"
                    aria-labelledby={`resource-title-${index}`}
                    aria-describedby={`resource-desc-${index}`}
                  >
                    <div className="mb-6" aria-hidden="true">
                      <IconComponent
                        className={`h-16 w-16 ${resource.iconColor} transition-transform duration-300 group-hover:rotate-12`}
                        aria-label={resource.iconAlt}
                      />
                    </div>
                    <h3 id={`resource-title-${index}`} className="text-3xl font-bold mb-4">{resource.title}</h3>
                    <p id={`resource-desc-${index}`} className="text-gray-300 mb-6 text-lg">{resource.description}</p>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-4">Características principales:</h4>
                      <ul className="space-y-2">
                        {resource.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${resource.iconColor.replace('text-', 'bg-')} mr-3`}></div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={resource.href}
                      className={`inline-block ${resource.iconColor === 'text-cyan-400' ? 'bg-cyan-500 hover:bg-cyan-400 text-black' : 'bg-purple-500 hover:bg-purple-400 text-white'} font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)]`}
                    >
                      {resource.buttonText}
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Beneficios de usar los recursos */}
        <section className="py-20 bg-black/20" aria-labelledby="recursos-benefits-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="recursos-benefits-heading" className="text-3xl md:text-4xl font-bold mb-12">
                ¿Por qué usar nuestros recursos?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold mb-2">Aprendizaje Acelerado</h3>
                  <p className="text-gray-300">Contenido estructurado que te lleva de principiante a experto en IA de forma eficiente.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-bold mb-2">Creatividad Potenciada</h3>
                  <p className="text-gray-300">Herramientas que multiplican tu capacidad de generar ideas innovadoras y soluciones creativas.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2">Resultados Prácticos</h3>
                  <p className="text-gray-300">Enfoque práctico con proyectos reales que puedes aplicar inmediatamente en tu negocio.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" aria-labelledby="recursos-cta-heading">
          <div className="container mx-auto px-6 text-center">
            <h2 id="recursos-cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              ¿Necesitas ayuda personalizada?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Nuestros expertos pueden guiarte en tu camino de adopción de IA y resolver tus dudas específicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-10 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.6)] text-lg"
              >
                Consultar con un Experto
              </Link>
              <Link
                href="/soluciones/educacion-ia"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 px-10 rounded-lg transition-all duration-300"
              >
                Ver Cursos de IA
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
