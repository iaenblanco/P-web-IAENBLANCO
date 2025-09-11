'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer, SolutionCard } from '@/components';
import { BrainCircuitIcon, CodeIcon, WandSparklesIcon, MessageIcon, PaletteIcon, LightbulbIcon, CheckCircleIcon, StarIcon, TrendingUpIcon } from '@/components/icons';

export default function Home() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  const featuredSolutions = [
    {
      slug: 'paginas-web-ia',
      icon: CodeIcon,
      iconColor: 'text-fuchsia-400',
      iconAlt: 'Icono de código representando desarrollo web',
      title: 'Páginas Web con IA',
      description: 'Integramos IA para crear sitios web dinámicos, personalizados y eficientes que cautivan a tus usuarios.',
      targetAudience: 'Empresas que necesitan presencia digital moderna',
      benefits: ['Sitios web adaptativos', 'Optimización SEO automática', 'Contenido dinámico generado por IA'],
      href: '/soluciones/paginas-web-ia'
    },
    {
      slug: 'chatbots-asistentes',
      icon: MessageIcon,
      iconColor: 'text-green-400',
      iconAlt: 'Icono de mensaje representando chatbots',
      title: 'Chatbots Inteligentes',
      description: 'Implementamos chatbots avanzados que mejoran la experiencia del cliente y automatizan interacciones.',
      targetAudience: 'Empresas que buscan servicio 24/7',
      benefits: ['Atención al cliente 24/7', 'Automatización de procesos', 'Mejora de la experiencia del usuario'],
      href: '/soluciones/chatbots-asistentes'
    },
    {
      slug: 'soluciones-medida',
      icon: WandSparklesIcon,
      iconColor: 'text-blue-400',
      iconAlt: 'Icono de varita mágica representando soluciones personalizadas',
      title: 'Soluciones a Medida',
      description: 'Desarrollamos soluciones de IA personalizadas para resolver tus desafíos más complejos.',
      targetAudience: 'Empresas con necesidades específicas',
      benefits: ['Soluciones personalizadas', 'Optimización de procesos', 'Automatización inteligente'],
      href: '/soluciones/soluciones-medida'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'CEO',
      company: 'TechSolutions España',
      content: 'IAenBlanco transformó completamente nuestro servicio al cliente con un chatbot que maneja el 80% de las consultas automáticamente.',
      rating: 5,
      results: ['70% reducción tiempo respuesta', '40% aumento satisfacción cliente', '15.000€ ahorro anual']
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Director de Operaciones',
      company: 'ModaExpress',
      content: 'El sistema de inventario con IA nos permitió reducir el 50% de productos con sobrestock y aumentar un 25% la rotación.',
      rating: 5,
      results: ['50% menos sobrestock', '25% más rotación inventario', '15% margen beneficio mejorado']
    },
    {
      name: 'Ana Martínez',
      role: 'Directora Académica',
      company: 'EduTech Academy',
      content: 'La personalización del contenido educativo aumentó la finalización de cursos en un 35% y mejoró las calificaciones.',
      rating: 5,
      results: ['60% menos abandono', '35% más finalización cursos', '45% mejora calificaciones']
    }
  ];

  const stats = [
    { number: '50+', label: 'Proyectos Completados' },
    { number: '95%', label: 'Clientes Satisfechos' },
    { number: '2.5M€', label: 'Valor Generado' },
    { number: '300%', label: 'ROI Promedio' }
  ];

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header onBackgroundChange={handleBackgroundChange} />

        {/* Hero Section - Encabezado principal */}
        <section className="pt-24 pb-20" aria-labelledby="home-hero-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h1 id="home-hero-heading" className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Creamos el <span className="text-cyan-400">Futuro</span> con
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Inteligencia Artificial
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Transformamos negocios mediante soluciones innovadoras de IA.
                Desde chatbots inteligentes hasta sistemas de automatización predictiva,
                hacemos que la tecnología trabaje para ti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/soluciones"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 px-10 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)] text-lg"
                >
                  Explorar Soluciones
                </Link>
                <Link
                  href="/contacto"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 px-10 rounded-lg transition-all duration-300"
                >
                  Hablemos de tu Proyecto
                </Link>
              </div>

              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Introducción a las 6 soluciones */}
        <section className="py-20 bg-black/20" aria-labelledby="home-solutions-heading">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 id="home-solutions-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Nuestras Soluciones de IA
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Tecnología de vanguardia aplicada a desafíos reales de negocio.
                Descubre cómo podemos transformar tu empresa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredSolutions.map((solution, index) => (
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

            <div className="text-center">
              <Link
                href="/soluciones"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.6)]"
              >
                Ver Todas las Soluciones
              </Link>
            </div>
          </div>
        </section>

        {/* Acceso a Recursos */}
        <section className="py-20" aria-labelledby="home-resources-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="home-resources-heading" className="text-3xl md:text-4xl font-bold mb-4">
                  Recursos y Herramientas
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Aprende IA de forma práctica y genera ideas innovadoras con nuestras herramientas gratuitas.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ruta de Aprendizaje */}
                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-cyan-400 transition-colors group">
                  <div className="flex items-center mb-6">
                    <BrainCircuitIcon className="h-12 w-12 text-cyan-400 mr-4" />
                    <div>
                      <h3 className="text-2xl font-bold">Ruta de Aprendizaje IA</h3>
                      <p className="text-cyan-400">Curso completo • 12 semanas</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Conviértete en experto en IA con nuestro programa estructurado.
                    Desde conceptos básicos hasta implementación profesional.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">Proyectos reales</span>
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">Certificación</span>
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">Mentoría</span>
                  </div>
                  <Link
                    href="/recursos/ruta-aprendizaje"
                    className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
                  >
                    Comenzar Aprendizaje
                  </Link>
                </div>

                {/* Generador de Ideas */}
                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-purple-400 transition-colors group">
                  <div className="flex items-center mb-6">
                    <WandSparklesIcon className="h-12 w-12 text-purple-400 mr-4" />
                    <div>
                      <h3 className="text-2xl font-bold">Generador de Ideas IA</h3>
                      <p className="text-purple-400">Herramienta gratuita • Instantáneo</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Utiliza IA para generar ideas innovadoras personalizadas para tu negocio.
                    Solo describe tu desafío y obtén soluciones creativas.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Ideas personalizadas</span>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Multi-industria</span>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Exportable</span>
                  </div>
                  <Link
                    href="/recursos/generador-ideas"
                    className="inline-block bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
                  >
                    Generar Ideas Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios Destacados */}
        <section className="py-20 bg-black/20" aria-labelledby="home-testimonials-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="home-testimonials-heading" className="text-3xl md:text-4xl font-bold mb-4">
                  Lo que dicen nuestros clientes
                </h2>
                <p className="text-lg text-gray-400">
                  Resultados reales de proyectos exitosos con IA.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                    <div className="mb-4">
                      <div className="font-bold text-cyan-400">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</div>
                    </div>
                    <div className="space-y-2">
                      {testimonial.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center text-sm">
                          <TrendingUpIcon className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-gray-300">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/casos-exito"
                  className="inline-block bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                >
                  Ver Más Casos de Éxito
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20" aria-labelledby="home-final-cta-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-lg p-12 rounded-3xl border border-white/10">
              <h2 id="home-final-cta-heading" className="text-4xl md:text-5xl font-bold mb-6">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Únete a las empresas que ya están aprovechando el poder de la IA.
                Comienza tu transformación digital hoy mismo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-10 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.6)] text-lg"
                >
                  Empezar mi Proyecto
                </Link>
                <Link
                  href="/soluciones"
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-lg transition-all duration-300"
                >
                  Explorar Soluciones
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
