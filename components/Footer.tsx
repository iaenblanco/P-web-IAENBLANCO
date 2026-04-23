import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 mt-12 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Columna Izquierda: Identidad y Datos Legales */}
          <div className="text-left space-y-4">
            <address className="not-italic text-gray-400 space-y-1">
              <p className="text-white font-bold text-lg mb-2">IAenBLANCO SpA</p>
              <p>Magdalena 206, Dpto 102,</p>
              <p>Las Condes, Santiago, Chile.</p>
              <p className="text-cyan-400/80 font-mono text-sm mt-2">RUT: 78.403.861-0</p>
            </address>
          </div>

          {/* Columna Derecha: Navegación Legal y Contacto */}
          <div className="md:text-right flex flex-col md:items-end space-y-4">
            <nav className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
              <a href="/terminos" className="text-gray-400 hover:text-cyan-400 transition-colors">Términos y Condiciones</a>
              <a href="/privacidad" className="text-gray-400 hover:text-cyan-400 transition-colors">Política de Privacidad</a>
            </nav>
            
            <p className="text-sm">
              <a href="mailto:nicolas@iaenblanco.com" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center md:justify-end gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                nicolas@iaenblanco.com
              </a>
            </p>
          </div>
        </div>

        {/* Copyright Inferior */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} IAenBLANCO SpA. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2 italic">
            Construyendo el futuro, una línea de código a la vez.
          </p>
        </div>
      </div>
    </footer>
  );
};
