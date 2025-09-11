'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer, CaseStudyCard } from '@/components';
import { WandSparklesIcon, TrendingUpIcon } from '@/components/icons';

export default function CasosExitoPage() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  const caseStudies = [
    {
      title: 'Automatización de Atención al Cliente 24/7',
      client: 'TechSolutions Chile',
      industry: 'Tecnología',
      problem: 'La empresa recibía cientos de consultas diarias que no podía atender fuera del horario laboral, causando insatisfacción en los clientes.',
      solution: 'Implementamos un chatbot inteligente con IA que maneja el 80% de las consultas automáticamente, escalando solo los casos complejos a agentes humanos.',
      results: [
        'Reducción del 70% en tiempo de respuesta',
        'Aumento del 40% en satisfacción del cliente',
        'Ahorro de $14.250.000 anuales en costos operativos',
        'Disponibilidad 24/7 sin costos adicionales'
      ],
      testimonial: 'El chatbot de IAenBlanco ha revolucionado nuestra atención al cliente. Ahora podemos ofrecer soporte de calidad las 24 horas sin aumentar nuestra plantilla.',
      testimonialAuthor: 'María González',
      testimonialRole: 'Directora de Operaciones',
      href: '/casos-exito/techsolutions-chatbot',
      featured: true
    },
    {
      title: 'Optimización de Inventario con IA',
      client: 'ModaExpress',
      industry: 'E-commerce',
      problem: 'El e-commerce tenía problemas constantes de sobrestock y faltantes, afectando las ventas y la rentabilidad.',
      solution: 'Desarrollamos un sistema de análisis predictivo que optimiza los niveles de inventario basándose en tendencias,季节alidad y comportamiento del cliente.',
      results: [
        'Reducción del 50% en productos con sobrestock',
        'Aumento del 25% en rotación de inventario',
        'Incremento del 15% en margen de beneficio',
        'Predicción precisa de demanda con 85% de accuracy'
      ],
      testimonial: 'Gracias a la IA predictiva, hemos optimizado completamente nuestro inventario. Ya no tenemos productos parados ni faltantes críticos.',
      testimonialAuthor: 'Carlos Rodríguez',
      testimonialRole: 'CEO',
      href: '/casos-exito/modaexpress-inventario'
    },
    {
      title: 'Personalización de Contenido Educativo',
      client: 'EduTech Academy',
      industry: 'Educación',
      problem: 'La plataforma educativa tenía una tasa de abandono del 40% porque el contenido no se adaptaba al ritmo de aprendizaje de cada estudiante.',
      solution: 'Integramos IA para crear rutas de aprendizaje personalizadas que se adaptan en tiempo real al progreso y estilo de aprendizaje de cada estudiante.',
      results: [
        'Reducción del 60% en tasa de abandono',
        'Aumento del 35% en finalización de cursos',
        'Mejora del 45% en puntuaciones de evaluación',
        'Personalización automática para 10.000+ estudiantes'
      ],
      testimonial: 'La IA ha transformado completamente nuestra plataforma educativa. Cada estudiante ahora tiene un camino personalizado que maximiza su aprendizaje.',
      testimonialAuthor: 'Ana Martínez',
      testimonialRole: 'Directora Académica',
      href: '/casos-exito/edutech-personalizacion'
    },
    {
      title: 'Detección Automática de Fraudes',
      client: 'BancoDigital Plus',
      industry: 'Finanzas',
      problem: 'El banco procesaba miles de transacciones diarias y tenía dificultades para detectar fraudes en tiempo real.',
      solution: 'Implementamos un sistema de IA que analiza patrones de comportamiento y detecta anomalías en tiempo real, bloqueando transacciones fraudulentas automáticamente.',
      results: [
        'Reducción del 85% en fraudes exitosos',
        'Detección en tiempo real de transacciones sospechosas',
        'Ahorro de $2.195 millones en pérdidas por fraude',
        'Precisión del 95% en detección de fraudes'
      ],
      testimonial: 'El sistema de detección de fraudes con IA nos ha dado una tranquilidad que antes no teníamos. Hemos reducido drásticamente las pérdidas por fraude.',
      testimonialAuthor: 'Luis Fernández',
      testimonialRole: 'Director de Seguridad',
      href: '/casos-exito/bancodigital-fraudes'
    },
    {
      title: 'Optimización de Procesos de Manufactura',
      client: 'IndustriaPro S.A.',
      industry: 'Manufactura',
      problem: 'La fábrica tenía cuellos de botella en la línea de producción y altos costos por mantenimiento reactivo.',
      solution: 'Instalamos sensores IoT combinados con IA para monitoreo predictivo, optimizando la producción y prediciendo fallos en maquinaria.',
      results: [
        'Aumento del 30% en eficiencia de producción',
        'Reducción del 40% en tiempo de inactividad',
        'Ahorro del 25% en costos de mantenimiento',
        'Predicción de fallos con 7 días de anticipación'
      ],
      testimonial: 'La IA predictiva ha transformado nuestra operación. Ahora podemos anticipar problemas antes de que ocurran, maximizando nuestra productividad.',
      testimonialAuthor: 'Roberto Silva',
      testimonialRole: 'Gerente de Producción',
      href: '/casos-exito/industriapro-manufactura'
    },
    {
      title: 'Auditoría Web que Triplicó Conversiones',
      client: 'FashionOnline',
      industry: 'E-commerce',
      problem: 'La tienda online tenía un sitio web lento, con problemas de navegación y formularios que no convertían, resultando en una tasa de abandono del carrito del 85%.',
      solution: 'Realizamos una auditoría completa del sitio identificando 47 errores críticos en UX/UI, SEO y rendimiento. Implementamos las mejoras priorizadas según nuestro roadmap personalizado.',
      results: [
        'Aumento del 180% en tasa de conversión',
        'Reducción del 65% en tiempo de carga de páginas',
        'Mejora del 40% en posicionamiento SEO',
        'Incremento del 25% en valor promedio de pedido'
      ],
      testimonial: 'La auditoría de IAenBlanco transformó completamente nuestro sitio web. Pasamos de tener un sitio que ahuyentaba clientes a uno que los convierte en compradores fieles.',
      testimonialAuthor: 'Sofia Ramírez',
      testimonialRole: 'CEO',
      href: '/casos-exito/fashiononline-auditoria',
      featured: true
    },
    {
      title: 'Optimización SEO para Clínica Dental',
      client: 'SonrisaPerfecta',
      industry: 'Salud',
      problem: 'La clínica dental tenía un sitio web con buena presencia pero problemas técnicos que impedían que apareciera en los primeros resultados de búsqueda.',
      solution: 'Nuestra auditoría identificó problemas críticos de SEO técnico, accesibilidad y rendimiento móvil. Implementamos correcciones específicas para el sector salud.',
      results: [
        'Aumento del 300% en consultas desde Google',
        'Mejora del 85% en puntuación de accesibilidad',
        'Incremento del 60% en citas agendadas online',
        'Posicionamiento en top 3 para palabras clave locales'
      ],
      testimonial: 'La auditoría nos mostró exactamente qué estaba mal con nuestro sitio. Las mejoras implementadas han revolucionado nuestra captación de pacientes.',
      testimonialAuthor: 'Dr. Miguel Torres',
      testimonialRole: 'Director Médico',
      href: '/casos-exito/sonrisaperfecta-seo'
    },
    {
      title: 'Marketing Personalizado con IA',
      client: 'RetailMax',
      industry: 'Retail',
      problem: 'La cadena de retail tenía campañas de marketing genéricas que no conectaban con los clientes individuales.',
      solution: 'Desarrollamos un sistema de marketing personalizado que utiliza IA para segmentar clientes y crear campañas específicas basadas en comportamiento de compra.',
      results: [
        'Aumento del 50% en tasa de apertura de emails',
        'Incremento del 35% en conversiones de campañas',
        'Aumento del 25% en valor promedio de pedido',
        'ROI de marketing mejorado en un 200%'
      ],
      testimonial: 'El marketing personalizado con IA nos ha permitido conectar realmente con nuestros clientes. Las campañas ahora son mucho más efectivas.',
      testimonialAuthor: 'Patricia López',
      testimonialRole: 'Directora de Marketing',
      href: '/casos-exito/retailmax-marketing'
    }
  ];

  const stats = [
    { number: '50+', label: 'Proyectos Exitosos' },
    { number: '95%', label: 'Satisfacción Cliente' },
    { number: '$2.375MM', label: 'Ahorro Total Clientes' },
    { number: '300%', label: 'ROI Promedio' }
  ];

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header onBackgroundChange={handleBackgroundChange} />

        {/* Hero Section */}
        <section className="pt-24 pb-12" aria-labelledby="casos-hero-heading">
          <div className="container mx-auto px-6 text-center">
            <h1 id="casos-hero-heading" className="text-4xl md:text-6xl font-bold mb-6">
              Casos de <span className="text-cyan-400">Éxito</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Descubre cómo hemos transformado negocios de diferentes sectores con soluciones de IA.
              Resultados reales, métricas concretas y testimonios de nuestros clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
              >
                Quiero mi Caso de Éxito
              </Link>
              <Link
                href="/soluciones"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Ver Soluciones
              </Link>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="py-20 bg-black/20" aria-labelledby="casos-stats-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 id="casos-stats-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">Nuestros Números</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Casos de Estudio */}
        <section className="py-20" aria-labelledby="casos-grid-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 id="casos-grid-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">Casos Destacados</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {caseStudies.map((caseStudy, index) => (
                  <CaseStudyCard
                    key={index}
                    title={caseStudy.title}
                    client={caseStudy.client}
                    industry={caseStudy.industry}
                    problem={caseStudy.problem}
                    solution={caseStudy.solution}
                    results={caseStudy.results}
                    testimonial={caseStudy.testimonial}
                    testimonialAuthor={caseStudy.testimonialAuthor}
                    testimonialRole={caseStudy.testimonialRole}
                    href={caseStudy.href}
                    featured={caseStudy.featured}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sectores */}
        <section className="py-20 bg-black/20" aria-labelledby="casos-sectors-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="casos-sectors-heading" className="text-3xl md:text-4xl font-bold mb-8">Sectores que Hemos Transformado</h2>
              <p className="text-lg text-gray-300 mb-12">
                Nuestra experiencia abarca múltiples industrias, adaptando soluciones de IA
                a las necesidades específicas de cada sector.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {['Tecnología', 'E-commerce', 'Salud', 'Educación', 'Finanzas', 'Manufactura', 'Retail', 'Servicios', 'Marketing', 'Logística'].map((sector, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg p-4 rounded-lg border border-white/10 text-center">
                    <div className="text-cyan-400 font-semibold">{sector}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" aria-labelledby="casos-cta-heading">
          <div className="container mx-auto px-6 text-center">
            <h2 id="casos-cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              ¿Quieres ser nuestro próximo caso de éxito?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Hablemos de tu proyecto y descubre cómo la IA puede transformar tu negocio
              con resultados medibles y duraderos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-10 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.6)] text-lg"
              >
                Comenzar mi Transformación
              </Link>
              <Link
                href="/soluciones"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 px-10 rounded-lg transition-all duration-300"
              >
                Explorar Soluciones
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
