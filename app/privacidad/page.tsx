'use client';

import React, { useState } from 'react';
import { Header, Footer } from '@/components';

export default function PrivacidadPage() {
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
                Política de Privacidad
              </h1>
              
              <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Información que Recopilamos</h2>
                  <p>
                    En IAenBLANCO SpA, RUT 78.403.861-0, con domicilio en Magdalena 206, Dpto 102, Santiago, Chile, nos tomamos muy en serio su privacidad. Recopilamos información que usted nos proporciona directamente cuando completa formularios en nuestro sitio, se registra para servicios o se comunica con nosotros. Esto puede incluir su nombre, dirección de correo electrónico, número de teléfono e información de su empresa.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Uso de la Información</h2>
                  <p>
                    Utilizamos la información recopilada para:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
                    <li>Responder a sus consultas y proporcionar servicio al cliente.</li>
                    <li>Enviar comunicaciones técnicas, actualizaciones y mensajes administrativos.</li>
                    <li>Comunicarnos con usted sobre productos, servicios y eventos que puedan ser de su interés.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Protección de Datos</h2>
                  <p>
                    Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal. Utilizamos tecnologías de cifrado y firewalls para proteger contra el acceso no autorizado a nuestros sistemas.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies</h2>
                  <p>
                    Nuestro sitio web utiliza cookies propias y de terceros (como el Píxel de Meta y Google Analytics) para mejorar la experiencia del usuario, medir el rendimiento del sitio y optimizar nuestras campañas de marketing. Estas herramientas nos permiten entender cómo interactúan los visitantes con nuestro contenido de forma agregada y anónima. Usted puede configurar su navegador para rechazar todas o algunas cookies, aunque esto podría afectar la funcionalidad de ciertas partes del sitio.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Compartir Información con Terceros</h2>
                  <p>
                    No vendemos, comercializamos ni transferimos de otro modo a terceros su información de identificación personal sin su consentimiento, excepto para el propósito expreso de entregar el producto o servicio solicitado.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Sus Derechos</h2>
                  <p>
                    Usted tiene derecho a solicitar acceso a la información personal que tenemos sobre usted, así como a solicitar la corrección o eliminación de dicha información. Para ejercer estos derechos, por favor contáctenos a través de nicolas@iaenblanco.com.
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
