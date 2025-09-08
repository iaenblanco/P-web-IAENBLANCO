'use client';

import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { href: '#services', label: 'Servicios', ariaLabel: 'Ir a la sección de servicios' },
    { href: '#pricing', label: 'Planes', ariaLabel: 'Ir a la sección de planes y precios' },
    { href: '#learning-path', label: 'Aprende IA', ariaLabel: 'Ir a la sección de aprendizaje de IA' },
    { href: '#gemini-generator', label: 'Generador Ideas', ariaLabel: 'Ir al generador de ideas con IA' },
    { href: '#testimonials', label: 'Testimonios', ariaLabel: 'Ir a la sección de testimonios' },
    { href: '#contact', label: 'Contacto', ariaLabel: 'Ir a la sección de contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">
          <a
            href="/"
            aria-label="IAenBlanco - Página principal"
            className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          >
            <span className="text-cyan-400">IA</span>enBlanco
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navegación principal">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1"
              aria-label={item.ariaLabel}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Empezar proyecto - Ir al formulario de contacto"
        >
          Empezar
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded p-1"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Abrir menú de navegación"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10"
          role="navigation"
          aria-label="Navegación móvil"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-white hover:text-cyan-400 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2"
                aria-label={item.ariaLabel}
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg text-center transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Empezar proyecto - Ir al formulario de contacto"
              onClick={closeMobileMenu}
            >
              Empezar
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
