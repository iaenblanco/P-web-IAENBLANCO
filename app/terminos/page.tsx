'use client';

import React, { useState } from 'react';
import { Header, Footer } from '@/components';

export default function TerminosPage() {
  const [currentBgClass, setCurrentBgClass] = useState('from-[#000428] to-[#004e92]');

  const handleBackgroundChange = (bgClass: string) => {
    setCurrentBgClass(bgClass);
  };

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header onBackgroundChange={handleBackgroundChange} />

        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Términos y Condiciones
              </h1>
              
              <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introducción</h2>
                  <p>
                    Bienvenido a IAenBLANCO SpA, RUT 78.403.861-0, con domicilio en Magdalena 206, Dpto 102, Santiago, Chile. Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestro sitio web.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Uso del Sitio</h2>
                  <p>
                    El contenido de las páginas de este sitio web es para su información general y uso exclusivo. Está sujeto a cambios sin previo aviso. Ni nosotros ni terceros ofrecemos garantía alguna en cuanto a la exactitud, puntualidad, rendimiento, integridad o adecuación de la información y los materiales encontrados u ofrecidos en este sitio para cualquier propósito particular.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Propiedad Intelectual</h2>
                  <p>
                    Este sitio web contiene material que es propiedad nuestra o tiene licencia para nosotros. Este material incluye, pero no se limita a, el diseño, la disposición, el aspecto, la apariencia y los gráficos. La reproducción está prohibida salvo de conformidad con el aviso de copyright, que forma parte de estos términos y condiciones.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Limitación de Responsabilidad</h2>
                  <p>
                    El uso de cualquier información o material en este sitio web es bajo su propio riesgo, por lo que IAenBLANCO SpA no será responsable. Será su propia responsabilidad asegurarse de que cualquier producto, servicio o información disponible a través de este sitio web cumpla con sus requisitos específicos.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Modificaciones</h2>
                  <p>
                    IAenBLANCO SpA se reserva el derecho de revisar estos términos en cualquier momento sin previo aviso. Al utilizar este sitio web, usted acepta estar sujeto a la versión actual de estos términos y condiciones.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Ley Aplicable</h2>
                  <p>
                    El uso de este sitio web y cualquier disputa que surja de dicho uso están sujetos a las leyes de la República de Chile.
                  </p>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-400">
                Última actualización: 23 de abril de 2026
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
