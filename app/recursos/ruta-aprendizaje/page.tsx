'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { BrainCircuitIcon, CheckCircleIcon, GraduationCapIcon, LightbulbIcon, CodeIcon, MessageIcon } from '@/components/icons';

export default function RutaAprendizajePage() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  const learningPath = [
    {
      level: 'Principiante',
      title: 'Fundamentos de IA',
      description: 'Aprende los conceptos básicos y terminología esencial de la Inteligencia Artificial.',
      duration: '2 semanas',
      modules: [
        { title: '¿Qué es la IA?', duration: '2h', completed: false },
        { title: 'Tipos de Inteligencia Artificial', duration: '3h', completed: false },
        { title: 'Machine Learning Básico', duration: '4h', completed: false },
        { title: 'Deep Learning Introducción', duration: '3h', completed: false }
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      level: 'Intermedio',
      title: 'Aplicaciones Prácticas',
      description: 'Descubre cómo aplicar la IA en diferentes industrias y casos de uso reales.',
      duration: '4 semanas',
      modules: [
        { title: 'IA en Negocios', duration: '3h', completed: false },
        { title: 'Automatización con IA', duration: '4h', completed: false },
        { title: 'Procesamiento de Lenguaje Natural', duration: '5h', completed: false },
        { title: 'Visión Artificial', duration: '4h', completed: false },
        { title: 'IA en Marketing Digital', duration: '3h', completed: false }
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      level: 'Avanzado',
      title: 'Implementación y Desarrollo',
      description: 'Aprende a implementar soluciones de IA y desarrollar tus propios modelos.',
      duration: '6 semanas',
      modules: [
        { title: 'Herramientas de Desarrollo IA', duration: '6h', completed: false },
        { title: 'APIs de IA', duration: '5h', completed: false },
        { title: 'Desarrollo de Chatbots', duration: '8h', completed: false },
        { title: 'Modelos de Machine Learning', duration: '6h', completed: false },
        { title: 'Proyecto Final: Solución IA Completa', duration: '10h', completed: false }
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const benefits = [
    {
      icon: BrainCircuitIcon,
      title: 'Aprendizaje Estructurado',
      description: 'Ruta de aprendizaje diseñada por expertos con progresión lógica.'
    },
    {
      icon: GraduationCapIcon,
      title: 'Certificación Profesional',
      description: 'Obtén una certificación reconocida al completar toda la ruta.'
    },
    {
      icon: LightbulbIcon,
      title: 'Proyectos Prácticos',
      description: 'Aplica lo aprendido en proyectos reales del mundo empresarial.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Seguimiento Personalizado',
      description: 'Monitorea tu progreso y recibe feedback personalizado.'
    }
  ];

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header onBackgroundChange={handleBackgroundChange} />

        {/* Hero Section */}
        <section className="pt-24 pb-12" aria-labelledby="learning-hero-heading">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-6" aria-hidden="true">
              <BrainCircuitIcon className="h-20 w-20 mx-auto text-cyan-400" />
            </div>
            <h1 id="learning-hero-heading" className="text-4xl md:text-6xl font-bold mb-6">
              Ruta de <span className="text-cyan-400">Aprendizaje IA</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Conviértete en un experto en Inteligencia Artificial con nuestra ruta de aprendizaje estructurada,
              diseñada para llevarte desde cero hasta la implementación profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#learning-path"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
              >
                Comenzar Ruta de Aprendizaje
              </Link>
              <Link
                href="/contacto"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Consultar Programa
              </Link>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-black/20" aria-labelledby="learning-benefits-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 id="learning-benefits-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">¿Por qué elegir nuestra ruta?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-center">
                      <IconComponent className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                      <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                      <p className="text-gray-300 text-sm">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ruta de Aprendizaje */}
        <section id="learning-path" className="py-20" aria-labelledby="learning-path-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 id="learning-path-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">La Ruta Completa</h2>

              <div className="space-y-8">
                {learningPath.map((level, levelIndex) => (
                  <div key={levelIndex} className="relative">
                    {/* Conector entre niveles */}
                    {levelIndex < learningPath.length - 1 && (
                      <div className="absolute left-8 top-full w-0.5 h-8 bg-cyan-400/30"></div>
                    )}

                    <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                      <div className="flex flex-col lg:flex-row lg:items-center mb-6">
                        <div className="flex items-center mb-4 lg:mb-0 lg:mr-6">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center text-white font-bold text-xl mr-4`}>
                            {levelIndex + 1}
                          </div>
                          <div>
                            <div className="text-sm text-cyan-400 font-semibold mb-1">{level.level}</div>
                            <h3 className="text-2xl font-bold">{level.title}</h3>
                          </div>
                        </div>
                        <div className="lg:ml-auto text-center lg:text-right">
                          <div className="text-cyan-400 font-semibold">{level.duration}</div>
                          <div className="text-sm text-gray-400">{level.modules.length} módulos</div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6">{level.description}</p>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-cyan-400">Módulos incluidos:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {level.modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-cyan-400 mr-3"></div>
                                <span className="text-sm">{module.title}</span>
                              </div>
                              <span className="text-xs text-gray-400">{module.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Información del programa */}
        <section className="py-20 bg-black/20" aria-labelledby="program-info-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="program-info-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">Información del Programa</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">💰 Inversión</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Programa completo:</span>
                      <span className="font-bold">599€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pago mensual:</span>
                      <span className="font-bold">150€/mes</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-3">
                      Incluye acceso vitalicio a materiales y actualizaciones
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">⏰ Duración y Ritmo</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Duración total:</span>
                      <span className="font-bold">12 semanas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ritmo recomendado:</span>
                      <span className="font-bold">5-7h/semana</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-3">
                      Aprendizaje flexible que se adapta a tu horario
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">🎓 Certificación</h3>
                  <div className="space-y-2">
                    <div>Certificado profesional de IAenBlanco</div>
                    <div>Proyecto final evaluado por expertos</div>
                    <div>Reconocimiento en LinkedIn</div>
                    <div className="text-sm text-gray-400 mt-3">
                      Valido para tu desarrollo profesional
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">📚 Recursos Incluidos</h3>
                  <div className="space-y-2">
                    <div>Videos explicativos HD</div>
                    <div>Materiales descargables</div>
                    <div>Comunidad de estudiantes</div>
                    <div className="text-sm text-gray-400 mt-3">
                      Acceso 24/7 desde cualquier dispositivo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" aria-labelledby="learning-cta-heading">
          <div className="container mx-auto px-6 text-center">
            <h2 id="learning-cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comenzar tu viaje en IA?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Únete a cientos de profesionales que ya están transformando sus carreras con nuestro programa de aprendizaje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-10 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.6)] text-lg"
              >
                Inscribirme Ahora
              </Link>
              <Link
                href="/recursos"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 px-10 rounded-lg transition-all duration-300"
              >
                Ver Otros Recursos
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
