"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalButton } from '@/components/CalButton';
import { GALAXY_THEMES } from '@/components/theme/galaxy-theme';
import { useGalaxyTheme } from '@/components/theme/GalaxyThemeProvider';

const Spline = lazy(() => import('@splinetool/react-spline'));

const CAL_LINK = 'iaenblanco/15min';

const solucionesItems = [
  { href: '/soluciones/paginas-web-ia', label: 'Páginas Web con IA' },
  { href: '/soluciones/diseno-shopify', label: 'Diseños/Códigos en Shopify' },
  { href: '/soluciones/chatbots-asistentes', label: 'Chatbots y Asistentes Virtuales' },
  { href: '/soluciones/soluciones-medida', label: 'Soluciones a Medida' },
  { href: '/soluciones/auditoria-sitios-personalizada', label: 'Auditoría de Sitios con IA' },
  { href: '/soluciones/automatizaciones', label: 'Automatizaciones' },
];

const recursosItems = [
  { href: '/recursos/ruta-aprendizaje', label: 'Ruta de Aprendizaje IA' },
  { href: '/recursos/generador-ideas', label: 'Generador de Ideas con IA' },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function HeroSplineBackground() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      <div style={{ width: '100%', height: '100vh', filter: 'var(--galaxy-filter, none)', transition: 'filter 0.6s ease' }}>
        <Suspense fallback={<div style={{ width: '100%', height: '100vh', background: '#000' }} />}>
          <Spline
            style={{
              width: '100%',
              height: '100vh',
              pointerEvents: 'auto',
            }}
            scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
          />
        </Suspense>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9))
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function GalaxyThemeSelector({ themeId, setThemeId, variant }: { themeId: string; setThemeId: (id: string) => void; variant: 'desktop' | 'mobile' }) {
  const [open, setOpen] = useState(false);
  const active = GALAXY_THEMES.find(t => t.id === themeId) ?? GALAXY_THEMES[0];

  if (variant === 'mobile') {
    return (
      <div className="relative">
        <button className="text-gray-300 hover:text-gray-100 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: active.dot }} aria-hidden="true" />
            <span>Tema (color de la animación)</span>
          </span>
          <svg className={`ml-2 w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[240px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          {GALAXY_THEMES.map(t => (
            <button key={t.id} onClick={() => setThemeId(t.id)} className="w-full flex items-center space-x-3 text-sm py-1 text-left text-gray-300 hover:text-gray-100 transition duration-150">
              <span className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0" style={{ backgroundColor: t.dot }} aria-hidden="true" />
              <span>{t.name}</span>
              {themeId === t.id && <CheckIcon className="w-4 h-4 text-[color:var(--galaxy-accent)] ml-auto" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group hidden lg:block">
      <button className="flex items-center space-x-1.5 text-gray-300 hover:text-white text-sm transition duration-150" aria-label="Cambiar el color de la animación">
        <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: active.dot }} aria-hidden="true" />
        <span>Tema</span>
        <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className="absolute right-0 mt-2 w-44 bg-black bg-opacity-50 rounded-md shadow-lg py-2 border border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <p className="px-4 pb-1 text-xs text-gray-400">Color de la animación</p>
        {GALAXY_THEMES.map(t => (
          <button key={t.id} onClick={() => setThemeId(t.id)} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">
            <span className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0" style={{ backgroundColor: t.dot }} aria-hidden="true" />
            <span className="text-left">{t.name}</span>
            {themeId === t.id && <CheckIcon className="w-4 h-4 text-[color:var(--galaxy-accent)] ml-auto" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-4 max-w-3xl">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-wide">
        Creamos el futuro <br className="sm:hidden" />de tu negocio<br className="sm:hidden" /> con Inteligencia Artificial.
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-xl">
        Transformamos empresas con soluciones innovadoras de IA: desde automatizaciones inteligentes y chatbots hasta páginas web a medida. Hacemos que la tecnología trabaje para ti.
      </p>
      <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
        <CalButton
          calLink={CAL_LINK}
          className="bg-[#8200DB29] hover:bg-black/50 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 w-full sm:w-auto border border-[#322D36] text-center"
        >
          Agenda tu reunión gratuita
        </CalButton>
        <Link href="/soluciones" className="pointer-events-auto bg-[#0009] border border-gray-600 hover:border-gray-400 text-gray-200 hover:text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 flex items-center justify-center w-full sm:w-auto">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Ver soluciones
        </Link>
      </div>
    </div>
  );
}

function Navbar({ themeId, setThemeId }: { themeId: string; setThemeId: (id: string) => void }) {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    soluciones: false,
    recursos: false,
  });

  const handleMouseEnterNavItem = (item: string) => setHoveredNavItem(item);
  const handleMouseLeaveNavItem = () => setHoveredNavItem(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setMobileDropdowns({ soluciones: false, recursos: false });
    }
  };

  const toggleMobileDropdown = (key: keyof typeof mobileDropdowns) => {
    setMobileDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navLinkClass = (itemName: string, extraClasses = '') => {
    const isCurrentItemHovered = hoveredNavItem === itemName;
    const isAnotherItemHovered = hoveredNavItem !== null && !isCurrentItemHovered;

    const colorClass = isCurrentItemHovered
      ? 'text-white'
      : isAnotherItemHovered
        ? 'text-gray-500'
        : 'text-gray-300';

     return `text-sm transition duration-150 ${colorClass} ${extraClasses}`;
  };

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
         setMobileDropdowns({ soluciones: false, recursos: false });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20" style={{ backgroundColor: 'rgba(13, 13, 24, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: '0 0 15px 15px' }}>
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Link href="/" aria-label="IAenBlanco - Inicio" className="block">
            <span className="relative block w-9 h-9">
              <Image src="/logo.png" alt="IAenBlanco" fill className="object-contain" priority sizes="36px" />
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className={navLinkClass('inicio')} onMouseEnter={() => handleMouseEnterNavItem('inicio')} onMouseLeave={handleMouseLeaveNavItem}>
              Inicio
            </Link>

            <div className="relative group" onMouseEnter={() => handleMouseEnterNavItem('soluciones')} onMouseLeave={handleMouseLeaveNavItem}>
              <Link href="/soluciones" className={navLinkClass('soluciones', 'flex items-center')}>
                Soluciones IA
                <svg className="ml-1 w-3 h-3 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </Link>
              <div className="absolute left-0 mt-2 w-72 bg-black bg-opacity-50 rounded-md shadow-lg py-2 border border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
                {solucionesItems.map((item) => (
                  <Link key={item.href} href={item.href} className="block px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">{item.label}</Link>
                ))}
              </div>
            </div>

            <div className="relative group" onMouseEnter={() => handleMouseEnterNavItem('recursos')} onMouseLeave={handleMouseLeaveNavItem}>
              <Link href="/recursos" className={navLinkClass('recursos', 'flex items-center')}>
                Recursos
                 <svg className="ml-1 w-3 h-3 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </Link>
              <div className="absolute left-0 mt-2 w-64 bg-black bg-opacity-50 rounded-md shadow-lg py-2 border border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
                {recursosItems.map((item) => (
                  <Link key={item.href} href={item.href} className="block px-4 py-2 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800/30 transition duration-150">{item.label}</Link>
                ))}
              </div>
            </div>

            <Link href="/casos-exito" className={navLinkClass('casos')} onMouseEnter={() => handleMouseEnterNavItem('casos')} onMouseLeave={handleMouseLeaveNavItem}>
                Casos de Éxito
            </Link>

            <Link href="/contacto" className={navLinkClass('contacto')} onMouseEnter={() => handleMouseEnterNavItem('contacto')} onMouseLeave={handleMouseLeaveNavItem}>
                Contacto
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <GalaxyThemeSelector themeId={themeId} setThemeId={setThemeId} variant="desktop" />
          <CalButton calLink={CAL_LINK} className="bg-[#8200DB29] hover:bg-black/50 text-white font-semibold py-2 px-5 rounded-full text-sm md:text-base border border-[#322D36]">Agenda tu reunión</CalButton>
          <button className="lg:hidden text-white p-2" onClick={toggleMobileMenu} aria-label="Abrir menú de navegación">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>

      <div className={`lg:hidden bg-black bg-opacity-50 border-t border-gray-700/30 absolute top-full left-0 right-0 z-30
           overflow-hidden transition-all duration-300 ease-in-out
           ${isMobileMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}
           `}
           style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      >
        <div className="px-4 py-6 flex flex-col space-y-4">
          <Link href="/" className="text-gray-300 hover:text-gray-100 text-sm py-2 transition duration-150" onClick={toggleMobileMenu}>Inicio</Link>

          <div className="relative">
            <button className="text-gray-300 hover:text-gray-100 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => toggleMobileDropdown('soluciones')} aria-expanded={mobileDropdowns.soluciones}>
              Soluciones IA
              <svg className={`ml-2 w-3 h-3 transition-transform duration-200 ${mobileDropdowns.soluciones ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdowns.soluciones ? 'max-h-[400px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              {solucionesItems.map((item) => (
                <Link key={item.href} href={item.href} className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>{item.label}</Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <button className="text-gray-300 hover:text-gray-100 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => toggleMobileDropdown('recursos')} aria-expanded={mobileDropdowns.recursos}>
              Recursos
              <svg className={`ml-2 w-3 h-3 transition-transform duration-200 ${mobileDropdowns.recursos ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
             <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdowns.recursos ? 'max-h-[200px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              {recursosItems.map((item) => (
                <Link key={item.href} href={item.href} className="block text-gray-300 hover:text-gray-100 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>{item.label}</Link>
              ))}
            </div>
          </div>

          <Link href="/casos-exito" className="text-gray-300 hover:text-gray-100 text-sm py-2 transition duration-150" onClick={toggleMobileMenu}>Casos de Éxito</Link>
          <Link href="/contacto" className="text-gray-300 hover:text-gray-100 text-sm py-2 transition duration-150" onClick={toggleMobileMenu}>Contacto</Link>

          <div className="border-t border-gray-700/30 pt-2">
            <GalaxyThemeSelector themeId={themeId} setThemeId={setThemeId} variant="mobile" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export const HeroSection = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const { themeId, setThemeId } = useGalaxyTheme();

  // Fade-out del contenido del hero al hacer scroll.
  useEffect(() => {
    const handleScroll = () => {
      if (heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navbar themeId={themeId} setThemeId={setThemeId} />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <div className="container mx-auto">
            <HeroContent />
          </div>
        </div>
      </div>
    </div>
  );
};
