import React from 'react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Confían en Nosotros</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Historias de éxito de empresas que transformaron su futuro con IA.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col">
            <p className="text-gray-300 mb-6 italic flex-grow">&ldquo;IAenBlanco no solo nos entregó una solución, nos dieron una nueva perspectiva. Nuestro engagement aumentó un 40%.&rdquo;</p>
            <div>
              <p className="font-bold">Ana García</p>
              <p className="text-sm text-cyan-400">CEO de Innovatech</p>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col">
            <p className="text-gray-300 mb-6 italic flex-grow">&ldquo;El proceso fue increíblemente fluido y los resultados superaron nuestras expectativas. Son verdaderos expertos en IA.&rdquo;</p>
            <div>
              <p className="font-bold">Carlos Rodríguez</p>
              <p className="text-sm text-cyan-400">Director de Marketing en Creativos Digitales</p>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 flex flex-col">
            <p className="text-gray-300 mb-6 italic flex-grow">&ldquo;La ruta de aprendizaje que me crearon fue el punto de partida que necesitaba para reorientar mi carrera hacia la IA. ¡Totalmente recomendado!&rdquo;</p>
            <div>
              <p className="font-bold">Laura Martinez</p>
              <p className="text-sm text-cyan-400">Desarrolladora de Software</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
