import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="container mx-auto px-6 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} IAenBlanco. Todos los derechos reservados.</p>
        <p className="text-sm mt-2">
          <a href="mailto:nicolas@iaenblanco.com" className="hover:text-cyan-400 transition-colors">
            nicolas@iaenblanco.com
          </a>
        </p>
        <p className="text-sm mt-2">Construyendo el futuro, una línea de código a la vez.</p>
      </div>
    </footer>
  );
};
