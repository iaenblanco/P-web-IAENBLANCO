'use client';

import React, { useState } from 'react';
import { PaletteIcon } from './icons';
import { Background } from '@/lib/types';

interface BackgroundSwitcherProps {
  onBackgroundChange: (bgClass: string) => void;
}

export const BackgroundSwitcher: React.FC<BackgroundSwitcherProps> = ({ onBackgroundChange }) => {
  const [activeBg, setActiveBg] = useState('bg-theme-1');

  const backgrounds: Background[] = [
    { id: 'bg-theme-1', name: 'Nebulosa', class: 'from-[#000428] to-[#004e92]' },
    { id: 'bg-theme-2', name: 'Circuito', class: 'from-[#141E30] to-[#243B55]' },
    { id: 'bg-theme-3', name: 'Cuántico', class: 'from-[#1D2B64] to-[#F8CDDA]' },
    { id: 'bg-theme-4', name: 'Aurora', class: 'from-[#0f0c29] via-[#302b63] to-[#24243e]' },
  ];

  const handleBackgroundChange = (bgId: string) => {
    setActiveBg(bgId);
    const bgClass = backgrounds.find(bg => bg.id === bgId)?.class || '';
    onBackgroundChange(bgClass);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 group">
      <button className="bg-white/10 backdrop-blur-lg p-3 rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-colors">
        <PaletteIcon className="h-6 w-6 text-white" />
      </button>
      <div className="absolute bottom-full right-0 mb-3 w-48 p-2 bg-black/60 backdrop-blur-xl rounded-lg border border-white/10 scale-0 group-hover:scale-100 transition-transform origin-bottom-right duration-300">
        <p className="text-xs text-gray-300 px-2 pb-2">Temas de Fondo</p>
        {backgrounds.map(bg => (
          <button
            key={bg.id}
            onClick={() => handleBackgroundChange(bg.id)}
            className={`w-full text-left text-sm px-3 py-1.5 my-1 rounded-md transition-colors ${activeBg === bg.id ? 'bg-cyan-500/50' : 'hover:bg-white/10'}`}
          >
            {bg.name}
          </button>
        ))}
      </div>
    </div>
  );
};
