'use client';

import React, { useState } from 'react';
import { LightbulbIcon } from './icons';
import { BusinessIdea } from '@/lib/types';

export const GeminiGenerator: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [isIdeasLoading, setIsIdeasLoading] = useState(false);
  const [ideasError, setIdeasError] = useState<string | null>(null);

  const handleGenerateIdeas = async () => {
    if (!industry) {
      setIdeasError("Por favor, introduce una industria para generar ideas.");
      return;
    }
    setIsIdeasLoading(true);
    setIdeasError(null);
    setIdeas([]);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry })
      });

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        // Si la respuesta no es JSON válido, crear un objeto de error
        result = { error: 'Respuesta del servidor inválida' };
      }

      if (!response.ok) {
        const errorMessage = result?.error || `Error del servidor (${response.status}): ${response.statusText}`;
        throw new Error(errorMessage);
      }

      if (!result.ideas) {
        throw new Error('La respuesta no contiene ideas válidas');
      }

      setIdeas(result.ideas);
    } catch (err) {
      console.error("Error:", err);
      setIdeasError(err instanceof Error ? err.message : "No se pudieron generar ideas. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsIdeasLoading(false);
    }
  };

  return (
    <section id="gemini-generator" className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/10 text-center">
          <LightbulbIcon className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Generador de Ideas con IA ✨</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">¿Atascado? Describe tu industria y deja que Gemini encienda la chispa de la innovación.</p>
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Ej: e-commerce, fitness, educación..."
              className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 flex-grow"
            />
            <button
              onClick={handleGenerateIdeas}
              disabled={isIdeasLoading}
              className="bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,0,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isIdeasLoading ? 'Generando...' : 'Generar Ideas ✨'}
            </button>
          </div>
          <div className="mt-12 text-left">
            {isIdeasLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
              </div>
            )}
            {ideasError && <p className="text-center text-red-400">{ideasError}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ideas.map((idea, index) => (
                <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col animate-fade-in">
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">{idea.name}</h4>
                  <p className="text-gray-300 text-sm mb-4 flex-grow">{idea.summary}</p>
                  <div>
                    <h5 className="font-semibold mb-2 text-gray-200">Características IA:</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                      {idea.features.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
