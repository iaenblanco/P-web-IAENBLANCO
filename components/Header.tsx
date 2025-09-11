'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeSelector } from './ThemeSelector';

interface HeaderProps {
  onBackgroundChange?: (bgClass: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onBackgroundChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Controlar el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;

      // Deshabilitar scroll del body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      // Restaurar el scroll del body
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';

      // Restaurar la posición del scroll
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    // El cleanup del scroll se maneja en el useEffect
  };

  const handleDropdownToggle = (label: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Pequeño delay para permitir movimiento del mouse
    setDropdownTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const navigationItems = [
    { href: '/', label: 'Inicio', ariaLabel: 'Ir a la página de inicio' },
    {
      href: '/soluciones',
      label: 'Soluciones IA',
      ariaLabel: 'Ir a las soluciones de Inteligencia Artificial',
      hasDropdown: true,
      dropdownItems: [
        { href: '/soluciones/paginas-web-ia', label: 'Páginas Web con IA' },
        { href: '/soluciones/diseno-shopify', label: 'Diseños/Códigos Personalizados en Shopify' },
        { href: '/soluciones/chatbots-asistentes', label: 'Chatbots Inteligentes y Asistentes Virtuales' },
        { href: '/soluciones/soluciones-medida', label: 'Soluciones a Medida' },
        { href: '/soluciones/generacion-contenidos', label: 'Generación de Contenidos con IA' },
        { href: '/soluciones/educacion-ia', label: 'Educación IA' },
      ]
    },
    {
      href: '/recursos',
      label: 'Recursos',
      ariaLabel: 'Ir a los recursos de IA',
      hasDropdown: true,
      dropdownItems: [
        { href: '/recursos/ruta-aprendizaje', label: 'Ruta de Aprendizaje IA' },
        { href: '/recursos/generador-ideas', label: 'Generador de Ideas con IA' },
      ]
    },
    { href: '/casos-exito', label: 'Casos de Éxito', ariaLabel: 'Ir a los casos de éxito' },
    { href: '/contacto', label: 'Contacto', ariaLabel: 'Ir a la página de contacto' },
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
          <Link
            href="/"
            aria-label="IAenBlanco - Página principal"
            className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          >
            {/* Logo Image */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="IAenBlanco Logo"
                fill
                className="object-contain"
                priority
                sizes="40px"
              />
            </div>

          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navegación principal">
          {navigationItems.map((item) => (
            item.hasDropdown ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleDropdownToggle(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1 flex items-center"
                  aria-label={item.ariaLabel}
                  aria-expanded={activeDropdown === item.label}
                >
                  {item.label}
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg py-2 z-50 transition-all duration-200 ${activeDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.dropdownItems?.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.href}
                      href={dropdownItem.href}
                      className="block px-4 py-2 text-sm hover:bg-cyan-400/10 hover:text-cyan-400 transition-colors"
                      onClick={() => {
                        setActiveDropdown(null);
                        if (dropdownTimeout) {
                          clearTimeout(dropdownTimeout);
                          setDropdownTimeout(null);
                        }
                      }}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1"
                aria-label={item.ariaLabel}
              >
                {item.label}
              </Link>
            )
          ))}
          <ThemeSelector onBackgroundChange={onBackgroundChange || (() => {})} />
        </nav>

        <Link
          href="/contacto"
          className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Empezar proyecto - Ir al formulario de contacto"
        >
          Empezar
        </Link>

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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="fixed top-0 left-0 right-0 bottom-0 z-50 md:hidden bg-black/95 backdrop-blur-lg pt-20"
          role="navigation"
          aria-label="Navegación móvil"
        >
          <div
            className="container mx-auto px-6 py-4 space-y-4 h-full overflow-y-auto relative"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors p-2"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {navigationItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.href} className="space-y-2">
                  <Link
                    href={item.href}
                    className="block text-white hover:text-cyan-400 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2"
                    aria-label={item.ariaLabel}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                  <div className="ml-4 space-y-1">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className="block text-gray-300 hover:text-cyan-400 transition-colors py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2"
                        onClick={closeMobileMenu}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white hover:text-cyan-400 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2"
                  aria-label={item.ariaLabel}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="border-t border-white/10 pt-4">
              <ThemeSelector onBackgroundChange={onBackgroundChange || (() => {})} isMobile={true} />
            </div>
            <Link
              href="/contacto"
              className="block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg text-center transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Empezar proyecto - Ir al formulario de contacto"
              onClick={closeMobileMenu}
            >
              Empezar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
