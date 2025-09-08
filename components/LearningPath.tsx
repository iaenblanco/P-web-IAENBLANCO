'use client';

import React, { useState } from 'react';
import { GraduationCapIcon } from './icons';
import { LearningStep } from '@/lib/types';

export const LearningPath: React.FC = () => {
  const [learningLevel, setLearningLevel] = useState('Principiante');
  const [learningInterest, setLearningInterest] = useState('');
  const [learningPath, setLearningPath] = useState<LearningStep[]>([]);
  const [isPathLoading, setIsPathLoading] = useState(false);
  const [pathError, setPathError] = useState<string | null>(null);

  const handleGeneratePath = async () => {
    if (!learningInterest) {
      setPathError("Por favor, introduce tu área de interés.");
      return;
    }
    setIsPathLoading(true);
    setPathError(null);
    setLearningPath([]);

    try {
      const response = await fetch('/api/learning-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learningLevel, learningInterest })
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

      if (!result.learningPath) {
        throw new Error('La respuesta no contiene una ruta de aprendizaje válida');
      }

      setLearningPath(result.learningPath);
    } catch (err) {
      console.error("Error:", err);
      setPathError(err instanceof Error ? err.message : "No se pudo generar la ruta de aprendizaje. Inténtalo de nuevo.");
    } finally {
      setIsPathLoading(false);
    }
  };

  return (
    <section id="learning-path" className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/10 text-center">
          <GraduationCapIcon className="h-16 w-16 text-cyan-300 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Crea tu Ruta de Aprendizaje IA ✨</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">Dinos tu nivel y tus intereses, y Gemini diseñará un plan de estudios personalizado para ti.</p>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-300 mb-2">1. Elige tu nivel de experiencia:</label>
              <div className="grid grid-cols-3 gap-4">
                {['Principiante', 'Básico', 'Intermedio'].map(level => (
                  <button
                    key={level}
                    onClick={() => setLearningLevel(level)}
                    className={`p-3 rounded-lg border transition-colors ${learningLevel === level ? 'bg-cyan-500/30 border-cyan-400' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-left">
              <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">2. ¿Qué área de la IA te interesa?</label>
              <input
                id="interest"
                type="text"
                value={learningInterest}
                onChange={(e) => setLearningInterest(e.target.value)}
                placeholder="Ej: Machine Learning, IA en la web..."
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <button
              onClick={handleGeneratePath}
              disabled={isPathLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPathLoading ? 'Diseñando tu ruta...' : 'Generar Ruta de Aprendizaje ✨'}
            </button>
          </div>
          <div className="mt-12 text-left">
            {isPathLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
              </div>
            )}
            {pathError && <p className="text-center text-red-400">{pathError}</p>}
            {learningPath.length > 0 && (
              <div className="space-y-6">
                {learningPath.map((step, index) => (
                  <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10 animate-fade-in">
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">Paso {index + 1}: {step.title}</h3>
                    <p className="text-gray-300 mb-4">{step.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-200">Recursos Sugeridos:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-400">
                        {step.resources.map((resource, i) => <li key={i}>{resource}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
