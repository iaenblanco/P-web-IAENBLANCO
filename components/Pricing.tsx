import React from 'react';
import { CheckCircleIcon } from './icons';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Planes para cada necesidad</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Elige el punto de partida perfecto para tu viaje hacia la inteligencia artificial.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Plan 1: Starter */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:border-cyan-400">
            <h3 className="text-2xl font-bold mb-2 text-cyan-300">Consultoría</h3>
            <p className="text-4xl font-bold mb-4">$150<span className="text-lg font-normal text-gray-400">/hr</span></p>
            <p className="text-gray-300 mb-6 h-16">Ideal para obtener dirección estratégica y resolver dudas puntuales.</p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Sesión estratégica de 1 hora</li>
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Análisis de viabilidad de IA</li>
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Recomendaciones de herramientas</li>
            </ul>
            <button className="w-full mt-auto bg-white/10 border border-white/20 text-white font-bold py-3 rounded-lg transition-colors hover:bg-white/20">Agendar Llamada</button>
          </div>
          {/* Plan 2: Professional (Most Popular) */}
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.4)] relative flex flex-col transition-transform duration-300 hover:scale-105">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 text-black text-xs font-bold px-4 py-1 rounded-full">MÁS POPULAR</div>
            <h3 className="text-3xl font-bold mb-2 text-cyan-300">Proyecto Piloto</h3>
            <p className="text-4xl font-bold mb-4">Desde $2,000</p>
            <p className="text-gray-300 mb-6 h-16">Perfecto para integrar una solución de IA específica y medir su impacto.</p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Todo en Consultoría, más:</li>
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Desarrollo de un Prototipo</li>
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Integración con tu sistema actual</li>
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Soporte prioritario</li>
            </ul>
            <button className="w-full mt-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-bold py-3 rounded-lg">Comenzar Proyecto</button>
          </div>
          {/* Plan 3: Enterprise */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:border-cyan-400">
            <h3 className="text-2xl font-bold mb-2 text-cyan-300">Empresarial</h3>
            <p className="text-4xl font-bold mb-4">A medida</p>
            <p className="text-gray-300 mb-6 h-16">Para transformaciones a gran escala y soluciones de IA personalizadas.</p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Todo en Proyecto Piloto, más:</li>
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Soluciones de IA ilimitadas</li>
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Entrenamiento para tu equipo</li>
              <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-cyan-400 mr-2 shrink-0"/>Soporte y mantenimiento dedicado</li>
            </ul>
            <button className="w-full mt-auto bg-white/10 border border-white/20 text-white font-bold py-3 rounded-lg transition-colors hover:bg-white/20">Contactar Ventas</button>
          </div>
        </div>
      </div>
    </section>
  );
};
