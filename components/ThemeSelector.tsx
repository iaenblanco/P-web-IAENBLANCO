'use client';

import React, { useState } from 'react';
import { Background } from '@/lib/types';

interface ThemeSelectorProps {
  onBackgroundChange: (bgClass: string) => void;
  isMobile?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  onBackgroundChange,
  isMobile = false
}) => {
  const [activeBg, setActiveBg] = useState('bg-theme-1');
  const [isOpen, setIsOpen] = useState(false);

  const backgrounds: Background[] = [
    {
      id: 'bg-theme-1',
      name: 'Nebulosa',
      class: 'from-[#000428] to-[#004e92]',
      previewColor: '#000428'
    },
    {
      id: 'bg-theme-2',
      name: 'Circuito',
      class: 'from-[#141E30] to-[#243B55]',
      previewColor: '#141E30'
    },
    {
      id: 'bg-theme-3',
      name: 'Cuántico',
      class: 'from-[#1D2B64] to-[#F8CDDA]',
      previewColor: '#1D2B64'
    },
    {
      id: 'bg-theme-4',
      name: 'Aurora',
      class: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
      previewColor: '#0f0c29'
    },
  ];

  const handleBackgroundChange = (bgId: string) => {
    setActiveBg(bgId);
    const bgClass = backgrounds.find(bg => bg.id === bgId)?.class || '';
    onBackgroundChange(bgClass);
    setIsOpen(false); // Cerrar el menú después de seleccionar
  };

  const activeTheme = backgrounds.find(bg => bg.id === activeBg);

  if (isMobile) {
    // Versión móvil: selector expandible
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors py-2 px-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          aria-label="Cambiar tema de fondo"
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full border border-white/30"
              style={{ backgroundColor: activeTheme?.previewColor }}
              aria-hidden="true"
            />
            <span className="text-sm">Tema</span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-2 bg-black/90 backdrop-blur-lg rounded-lg border border-white/10 p-3 space-y-2">
            <p className="text-xs text-gray-400 mb-3">Elige un tema</p>
            {backgrounds.map(bg => (
              <button
                key={bg.id}
                onClick={() => handleBackgroundChange(bg.id)}
                className={`w-full flex items-center space-x-3 p-2 rounded-md transition-colors ${
                  activeBg === bg.id
                    ? 'bg-cyan-500/20 border border-cyan-400/50'
                    : 'hover:bg-white/10'
                }`}
                aria-label={`Seleccionar tema ${bg.name}`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-white/30 flex-shrink-0"
                  style={{ backgroundColor: bg.previewColor }}
                  aria-hidden="true"
                />
                <span className="text-sm text-left">{bg.name}</span>
                {activeBg === bg.id && (
                  <svg className="w-4 h-4 text-cyan-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Versión desktop: selector horizontal compacto
  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1"
        aria-label="Cambiar tema de fondo"
      >
        <div className="flex items-center space-x-1">
          <div
            className="w-3 h-3 rounded-full border border-white/30"
            style={{ backgroundColor: activeTheme?.previewColor }}
            aria-hidden="true"
          />
          <span className="text-sm">Tema</span>
        </div>
      </button>

      {/* Dropdown para desktop */}
      <div className="absolute top-full right-0 mt-2 w-48 p-3 bg-black/90 backdrop-blur-xl rounded-lg border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
        <p className="text-xs text-gray-400 mb-3">Elige un tema</p>
        {backgrounds.map(bg => (
          <button
            key={bg.id}
            onClick={() => handleBackgroundChange(bg.id)}
            className={`w-full flex items-center space-x-3 p-2 rounded-md transition-colors mb-1 ${
              activeBg === bg.id
                ? 'bg-cyan-500/20 border border-cyan-400/50'
                : 'hover:bg-white/10'
            }`}
            aria-label={`Seleccionar tema ${bg.name}`}
          >
            <div
              className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0"
              style={{ backgroundColor: bg.previewColor }}
              aria-hidden="true"
            />
            <span className="text-sm text-left">{bg.name}</span>
            {activeBg === bg.id && (
              <svg className="w-4 h-4 text-cyan-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
