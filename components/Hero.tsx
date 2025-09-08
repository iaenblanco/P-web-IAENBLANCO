import React from 'react';

export const Hero: React.FC = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-16 md:pt-48 md:pb-24 text-center">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
        El Futuro es Inteligente. <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">Créalo Hoy.</span>
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
        Desbloquea el potencial de la Inteligencia Artificial para tu negocio, tu aprendizaje y tus ideas más ambiciosas.
      </p>
      <div className="flex justify-center items-center gap-4">
        <a href="#pricing" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 text-lg shadow-[0_0_20px_rgba(0,255,255,0.6)]">
          Ver Planes
        </a>
        <a href="#learning-path" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/20">
          Aprender Gratis
        </a>
      </div>
    </main>
  );
};
