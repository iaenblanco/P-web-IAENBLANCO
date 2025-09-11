'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { WandSparklesIcon, LightbulbIcon, CodeIcon, MessageIcon, PaletteIcon, BrainCircuitIcon } from '@/components/icons';

export default function GeneradorIdeasPage() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');
  const [formData, setFormData] = useState({
    industry: '',
    objective: '',
    targetAudience: '',
    additionalInfo: ''
  });
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateIdeas = async () => {
    if (!formData.industry || !formData.objective) {
      alert('Por favor, selecciona al menos una industria y un objetivo.');
      return;
    }

    setIsGenerating(true);
    setGeneratedIdeas([]);

    try {
      // Construir el prompt detallado para Gemini
      const prompt = `Actúa como un estratega de negocios creativo especializado en IA. Genera 5 ideas de negocio innovadoras basadas en la siguiente información:

Industria: ${formData.industry}
Objetivo principal: ${formData.objective}
${formData.targetAudience ? `Audiencia objetivo: ${formData.targetAudience}` : ''}
${formData.additionalInfo ? `Información adicional: ${formData.additionalInfo}` : ''}

Cada idea debe:
1. Ser específica y accionable
2. Incorporar tecnologías de IA relevantes
3. Estar adaptada al contexto de la industria y objetivo
4. Incluir métricas o beneficios cuantificables cuando sea posible
5. Ser realista y viable de implementar

Genera exactamente 5 ideas, cada una como una frase completa y descriptiva.`;

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: formData.industry,
          objective: formData.objective,
          targetAudience: formData.targetAudience,
          additionalInfo: formData.additionalInfo,
          prompt: prompt
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Error del servidor (${response.status})`);
      }

      if (result.ideas && Array.isArray(result.ideas)) {
        // Si la respuesta tiene el formato estructurado del componente original
        const formattedIdeas = result.ideas.map((idea: any) => {
          if (typeof idea === 'object' && idea.summary) {
            return idea.summary;
          }
          return idea;
        });
        setGeneratedIdeas(formattedIdeas);
      } else if (result.generatedIdeas && Array.isArray(result.generatedIdeas)) {
        // Si viene en otro formato
        setGeneratedIdeas(result.generatedIdeas);
      } else {
        throw new Error('La respuesta no contiene ideas válidas');
      }

    } catch (err) {
      console.error("Error:", err);
      alert(err instanceof Error ? err.message : "No se pudieron generar ideas. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsGenerating(false);
    }
  };

  const industries = [
    'Tecnología', 'E-commerce', 'Salud', 'Educación', 'Finanzas',
    'Manufactura', 'Retail', 'Servicios', 'Marketing', 'Logística'
  ];

  const objectives = [
    'Aumentar ventas', 'Reducir costos', 'Mejorar experiencia cliente',
    'Optimizar procesos', 'Innovar productos', 'Expandir mercado',
    'Automatizar tareas', 'Analizar datos', 'Personalizar servicios'
  ];

  const features = [
    {
      icon: WandSparklesIcon,
      title: 'Generación Instantánea',
      description: 'Obtén ideas innovadoras en segundos usando algoritmos avanzados de IA.'
    },
    {
      icon: LightbulbIcon,
      title: 'Ideas Personalizadas',
      description: 'Cada sugerencia se adapta específicamente a tu industria y objetivos.'
    },
    {
      icon: CodeIcon,
      title: 'Implementables',
      description: 'Ideas prácticas y realistas que puedes poner en marcha inmediatamente.'
    },
    {
      icon: MessageIcon,
      title: 'Exportables',
      description: 'Descarga tus ideas en diferentes formatos para compartir con tu equipo.'
    }
  ];

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header onBackgroundChange={handleBackgroundChange} />

        {/* Hero Section */}
        <section className="pt-24 pb-12" aria-labelledby="generator-hero-heading">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-6" aria-hidden="true">
              <WandSparklesIcon className="h-20 w-20 mx-auto text-purple-400" />
            </div>
            <h1 id="generator-hero-heading" className="text-4xl md:text-6xl font-bold mb-6">
              Generador de <span className="text-purple-400">Ideas con IA</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Descubre oportunidades innovadoras para tu negocio. Nuestra IA analiza tu industria,
              objetivos y recursos para generar ideas personalizadas y accionables.
            </p>
            <Link
              href="#generator-form"
              className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
            >
              Generar Ideas Ahora
            </Link>
          </div>
        </section>

        {/* Características */}
        <section className="py-20 bg-black/20" aria-labelledby="generator-features-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 id="generator-features-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">¿Cómo funciona?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-center">
                      <IconComponent className="h-12 w-12 mx-auto text-purple-400 mb-4" />
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Formulario Generador */}
        <section id="generator-form" className="py-20" aria-labelledby="generator-form-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="generator-form-heading" className="text-3xl md:text-4xl font-bold mb-8 text-center">Configura tu Generador</h2>

              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-cyan-400 mb-2">
                        Industria/Sector
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors text-white"
                      >
                        <option value="" className="text-gray-400">Selecciona una industria</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry} className="text-white bg-gray-800">{industry}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-cyan-400 mb-2">
                        Objetivo Principal
                      </label>
                      <select
                        name="objective"
                        value={formData.objective}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors text-white"
                      >
                        <option value="" className="text-gray-400">Selecciona un objetivo</option>
                        {objectives.map(objective => (
                          <option key={objective} value={objective} className="text-white bg-gray-800">{objective}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-cyan-400 mb-2">
                        Audiencia Objetivo
                      </label>
                      <input
                        type="text"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        placeholder="Ej: Pequeñas empresas, consumidores finales..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>

                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      Información Adicional (Opcional)
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Describe cualquier detalle específico, limitaciones, o requisitos particulares..."
                      rows={4}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 resize-none"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleGenerateIdeas}
                      disabled={isGenerating || !formData.industry || !formData.objective}
                      className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                        isGenerating || !formData.industry || !formData.objective
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.6)] hover:scale-105'
                      }`}
                    >
                      {isGenerating ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generando Ideas...
                        </span>
                      ) : (
                        'Generar Ideas con IA'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Resultados */}
        {generatedIdeas.length > 0 && (
          <section className="py-20 bg-black/20" aria-labelledby="generator-results-heading">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 id="generator-results-heading" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  Tus Ideas Generadas
                </h2>

                <div className="space-y-4 mb-8">
                  {generatedIdeas.map((idea, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">{idea}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)] mr-4">
                    Descargar Ideas (PDF)
                  </button>
                  <button className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                    Compartir con Equipo
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20" aria-labelledby="generator-cta-heading">
          <div className="container mx-auto px-6 text-center">
            <h2 id="generator-cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              ¿Necesitas más ideas o una consultoría personalizada?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Nuestros expertos pueden profundizar en tus necesidades específicas y desarrollar
              estrategias personalizadas para implementar estas ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-4 px-10 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.6)] text-lg"
              >
                Consultar con un Experto
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
