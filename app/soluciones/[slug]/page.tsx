import React from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { BrainCircuitIcon, CodeIcon, WandSparklesIcon, MessageIcon, PaletteIcon, LightbulbIcon, CheckCircleIcon } from '@/components/icons';

interface SolutionDetail {
  slug: string;
  icon: React.ComponentType<{ className?: string; 'aria-label'?: string }>;
  iconColor: string;
  iconAlt: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  targetAudience: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  pricing: {
    plan: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
  }[];
  faq: { question: string; answer: string }[];
  ctaText: string;
}

export async function generateStaticParams() {
  return [
    { slug: 'paginas-web-ia' },
    { slug: 'diseno-shopify' },
    { slug: 'chatbots-asistentes' },
    { slug: 'soluciones-medida' },
    { slug: 'generacion-contenidos' },
    { slug: 'educacion-ia' },
  ];
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const currentBgClass = 'from-[#000428] to-[#004e92]';

  const solutions: Record<string, SolutionDetail> = {
    'paginas-web-ia': {
      slug: 'paginas-web-ia',
      icon: CodeIcon,
      iconColor: 'text-fuchsia-400',
      iconAlt: 'Icono de código representando desarrollo web',
      title: 'Páginas Web con IA',
      shortDescription: 'Integramos IA para crear sitios web dinámicos, personalizados y eficientes.',
      fullDescription: 'Nuestras páginas web potenciadas con IA no solo son visualmente atractivas, sino que aprenden de tus usuarios para ofrecer experiencias personalizadas. Utilizamos algoritmos de machine learning para optimizar el contenido, mejorar la navegación y aumentar las conversiones de forma automática.',
      targetAudience: 'Empresas que necesitan presencia digital moderna y optimizada, desde startups hasta empresas establecidas que buscan destacar en el mercado digital.',
      benefits: [
        'Contenido dinámico que se adapta a cada usuario',
        'Optimización SEO automática con IA',
        'Mejora continua del rendimiento basada en datos',
        'Experiencia de usuario personalizada',
        'Reducción de costos de mantenimiento'
      ],
      process: [
        { step: 1, title: 'Análisis y Estrategia', description: 'Analizamos tu negocio, objetivos y público objetivo para diseñar la estrategia de IA perfecta.' },
        { step: 2, title: 'Diseño con IA', description: 'Utilizamos herramientas de IA para crear diseños únicos y optimizados para conversión.' },
        { step: 3, title: 'Desarrollo e Integración', description: 'Desarrollamos el sitio web e integramos las funcionalidades de IA de forma transparente.' },
        { step: 4, title: 'Optimización Continua', description: 'Monitoreamos el rendimiento y utilizamos IA para mejoras continuas.' }
      ],
      pricing: [
        {
          plan: 'Básico',
          price: 'Desde 1.500€',
          description: 'Ideal para pequeñas empresas o startups',
          features: [
            'Sitio web responsive de hasta 5 páginas',
            'Integración básica de IA para optimización SEO',
            'Contenido dinámico básico',
            '1 mes de soporte incluido'
          ]
        },
        {
          plan: 'Profesional',
          price: 'Desde 3.500€',
          description: 'Para empresas en crecimiento',
          features: [
            'Sitio web completo de hasta 15 páginas',
            'IA avanzada para personalización de contenido',
            'Integración con CRM y herramientas de marketing',
            'Optimización automática de conversiones',
            '3 meses de soporte incluido'
          ],
          popular: true
        },
        {
          plan: 'Empresarial',
          price: 'Desde 8.000€',
          description: 'Para grandes empresas con necesidades complejas',
          features: [
            'Sitio web personalizado sin límites de páginas',
            'IA de última generación con machine learning',
            'Integraciones avanzadas con sistemas empresariales',
            'Dashboard de analytics en tiempo real',
            'Soporte prioritario y mantenimiento continuo'
          ]
        }
      ],
      faq: [
        {
          question: '¿Cuánto tiempo toma desarrollar una página web con IA?',
          answer: 'El tiempo de desarrollo varía según la complejidad, pero típicamente entre 2-6 semanas para un proyecto completo.'
        },
        {
          question: '¿Necesito conocimientos técnicos para mantener el sitio?',
          answer: 'No, nuestros sitios están diseñados para ser fácilmente administrables. Te proporcionamos capacitación completa.'
        },
        {
          question: '¿Qué tipo de IA se integra en las páginas web?',
          answer: 'Integramos IA para optimización SEO, personalización de contenido, chatbots, análisis de comportamiento de usuarios, entre otros.'
        }
      ],
      ctaText: 'Solicitar Desarrollo Web con IA'
    },
    'diseno-shopify': {
      slug: 'diseno-shopify',
      icon: PaletteIcon,
      iconColor: 'text-purple-400',
      iconAlt: 'Icono de paleta representando diseños y códigos personalizados',
      title: 'Diseños/Códigos Personalizados en Shopify',
      shortDescription: 'Creamos diseños únicos y códigos personalizados para tu tienda Shopify.',
      fullDescription: 'Transformamos tu tienda Shopify en una experiencia de compra única y memorable. Nuestros diseños personalizados no solo son visualmente impactantes, sino que están optimizados para aumentar las conversiones y mejorar la experiencia del usuario.',
      targetAudience: 'Tiendas online en Shopify que buscan destacar de la competencia y mejorar sus tasas de conversión.',
      benefits: [
        'Diseños únicos que reflejan tu marca',
        'Optimización especializada para e-commerce',
        'Mejora significativa en las tasas de conversión',
        'Funcionalidades personalizadas avanzadas',
        'Experiencia de compra fluida y moderna'
      ],
      process: [
        { step: 1, title: 'Auditoría de tu tienda actual', description: 'Analizamos tu tienda actual, ventas y público objetivo.' },
        { step: 2, title: 'Diseño conceptual', description: 'Creamos conceptos de diseño únicos adaptados a tu marca.' },
        { step: 3, title: 'Desarrollo e implementación', description: 'Desarrollamos y aplicamos el diseño con códigos personalizados.' },
        { step: 4, title: 'Optimización y testing', description: 'Optimizamos el rendimiento y testeamos todas las funcionalidades.' }
      ],
      pricing: [
        {
          plan: 'Rediseño Básico',
          price: 'Desde 800€',
          description: 'Mejora visual de tu tienda existente',
          features: [
            'Rediseño de tema Shopify',
            'Optimización de páginas de producto',
            'Mejora de la experiencia móvil',
            '1 mes de soporte'
          ]
        },
        {
          plan: 'Personalización Completa',
          price: 'Desde 2.200€',
          description: 'Transformación completa de tu tienda',
          features: [
            'Diseño completamente personalizado',
            'Códigos personalizados avanzados',
            'Integración de funcionalidades únicas',
            'Optimización SEO especializada',
            '3 meses de soporte incluido'
          ],
          popular: true
        },
        {
          plan: 'Tienda Premium',
          price: 'Desde 5.000€',
          description: 'Solución completa para grandes marcas',
          features: [
            'Diseño premium personalizado',
            'Desarrollo de apps privadas',
            'Integraciones avanzadas (ERP, CRM)',
            'Estrategia de conversión incluida',
            'Soporte prioritario 6 meses'
          ]
        }
      ],
      faq: [
        {
          question: '¿Puedo mantener mi tema actual mientras mejoro el diseño?',
          answer: 'Sí, podemos trabajar sobre tu tema existente o crear uno completamente nuevo según tus preferencias.'
        },
        {
          question: '¿Cuánto tiempo toma el proceso de rediseño?',
          answer: 'Los proyectos básicos toman 1-2 semanas, mientras que las personalizaciones completas pueden tomar 3-6 semanas.'
        },
        {
          question: '¿Incluyen optimización para móviles?',
          answer: 'Absolutamente, todos nuestros diseños son completamente responsivos y optimizados para móviles.'
        }
      ],
      ctaText: 'Personalizar mi Tienda Shopify'
    },
    'chatbots-asistentes': {
      slug: 'chatbots-asistentes',
      icon: MessageIcon,
      iconColor: 'text-green-400',
      iconAlt: 'Icono de mensaje representando chatbots y asistentes virtuales',
      title: 'Chatbots Inteligentes y Asistentes Virtuales',
      shortDescription: 'Implementamos chatbots avanzados que mejoran la experiencia del cliente.',
      fullDescription: 'Nuestros chatbots y asistentes virtuales van más allá de respuestas automáticas. Utilizan IA avanzada para entender el contexto, aprender de cada interacción y proporcionar respuestas cada vez más precisas y útiles.',
      targetAudience: 'Empresas que buscan mejorar el servicio al cliente, reducir costos operativos y ofrecer atención 24/7.',
      benefits: [
        'Atención al cliente disponible 24/7',
        'Reducción significativa de costos operativos',
        'Respuestas consistentes y precisas',
        'Aprendizaje continuo de interacciones',
        'Integración perfecta con tus sistemas'
      ],
      process: [
        { step: 1, title: 'Análisis de necesidades', description: 'Identificamos los casos de uso más importantes para tu negocio.' },
        { step: 2, title: 'Diseño de conversaciones', description: 'Creamos flujos de conversación naturales y efectivos.' },
        { step: 3, title: 'Desarrollo e integración', description: 'Desarrollamos el chatbot e integramos con tus sistemas.' },
        { step: 4, title: 'Entrenamiento y optimización', description: 'Entrenamos el modelo y optimizamos el rendimiento.' }
      ],
      pricing: [
        {
          plan: 'Básico',
          price: 'Desde 500€',
          description: 'Para pequeñas empresas con necesidades simples',
          features: [
            'Chatbot con respuestas predefinidas',
            'Integración con WhatsApp o web',
            'Hasta 5 flujos de conversación',
            '1 mes de soporte'
          ]
        },
        {
          plan: 'Avanzado',
          price: 'Desde 1.500€',
          description: 'IA conversacional para empresas en crecimiento',
          features: [
            'Chatbot con IA generativa',
            'Aprendizaje automático',
            'Integración con CRM y base de datos',
            'Análisis de conversaciones',
            '3 meses de soporte'
          ],
          popular: true
        },
        {
          plan: 'Empresarial',
          price: 'Desde 4.000€',
          description: 'Solución completa para grandes empresas',
          features: [
            'Asistente virtual multi-canal',
            'IA avanzada con comprensión contextual',
            'Integración completa con sistemas empresariales',
            'Dashboard de analytics avanzado',
            'Soporte técnico prioritario'
          ]
        }
      ],
      faq: [
        {
          question: '¿En qué plataformas puedo integrar el chatbot?',
          answer: 'Podemos integrar en tu sitio web, WhatsApp, Facebook Messenger, Telegram y otras plataformas populares.'
        },
        {
          question: '¿El chatbot puede manejar quejas o problemas complejos?',
          answer: 'Sí, nuestros chatbots avanzados pueden escalar conversaciones complejas a agentes humanos cuando es necesario.'
        },
        {
          question: '¿Cuánto tiempo toma implementar un chatbot?',
          answer: 'Los chatbots básicos pueden estar listos en 1 semana, mientras que las soluciones avanzadas toman 2-4 semanas.'
        }
      ],
      ctaText: 'Implementar Chatbot Inteligente'
    },
    'soluciones-medida': {
      slug: 'soluciones-medida',
      icon: WandSparklesIcon,
      iconColor: 'text-blue-400',
      iconAlt: 'Icono de varita mágica con chispas representando soluciones personalizadas',
      title: 'Soluciones a Medida',
      shortDescription: 'Desarrollamos soluciones de IA personalizadas para tus desafíos más complejos.',
      fullDescription: 'Cada negocio es único, por eso creamos soluciones de IA completamente personalizadas. Desde automatización de procesos específicos hasta sistemas de análisis predictivo, desarrollamos la tecnología exacta que necesitas.',
      targetAudience: 'Empresas con desafíos específicos que requieren soluciones tecnológicas personalizadas y no estándar.',
      benefits: [
        'Soluciones completamente adaptadas a tus necesidades',
        'Tecnología de vanguardia aplicada a tus procesos',
        'ROI garantizado con enfoque personalizado',
        'Escalabilidad y flexibilidad total',
        'Ventaja competitiva significativa'
      ],
      process: [
        { step: 1, title: 'Descubrimiento y análisis', description: 'Entendemos profundamente tu negocio y desafíos específicos.' },
        { step: 2, title: 'Diseño de solución', description: 'Creamos la arquitectura técnica y estrategia de implementación.' },
        { step: 3, title: 'Desarrollo iterativo', description: 'Desarrollamos la solución con entregas incrementales.' },
        { step: 4, title: 'Implementación y soporte', description: 'Implementamos y proporcionamos soporte continuo.' }
      ],
      pricing: [
        {
          plan: 'Proyecto Específico',
          price: 'Desde 5.000€',
          description: 'Para desafíos concretos y bien definidos',
          features: [
            'Análisis detallado del problema',
            'Desarrollo de solución específica',
            'Implementación completa',
            'Documentación técnica',
            '2 meses de soporte'
          ]
        },
        {
          plan: 'Transformación Digital',
          price: 'Desde 15.000€',
          description: 'Transformación completa de procesos',
          features: [
            'Análisis completo de la organización',
            'Múltiples soluciones integradas',
            'Implementación por fases',
            'Capacitación del equipo',
            '6 meses de soporte incluido'
          ],
          popular: true
        },
        {
          plan: 'Solución Empresarial',
          price: 'Consultar precio',
          description: 'Para grandes empresas con necesidades complejas',
          features: [
            'Equipo dedicado de desarrollo',
            'Soluciones a medida escalables',
            'Integración con sistemas legacy',
            'Soporte técnico 24/7',
            'Mantenimiento y evolución continua'
          ]
        }
      ],
      faq: [
        {
          question: '¿Cómo determinan el precio de una solución personalizada?',
          answer: 'El precio se basa en la complejidad técnica, alcance del proyecto, tiempo estimado y valor esperado para tu negocio.'
        },
        {
          question: '¿Pueden trabajar con nuestros sistemas existentes?',
          answer: 'Sí, somos expertos en integración con sistemas legacy y plataformas empresariales existentes.'
        },
        {
          question: '¿Qué garantías ofrecen en las soluciones personalizadas?',
          answer: 'Ofrecemos garantías de funcionamiento, soporte técnico y garantizamos que la solución cumpla con tus objetivos.'
        }
      ],
      ctaText: 'Desarrollar Solución Personalizada'
    },
    'generacion-contenidos': {
      slug: 'generacion-contenidos',
      icon: LightbulbIcon,
      iconColor: 'text-yellow-400',
      iconAlt: 'Icono de bombilla representando generación de contenidos con IA',
      title: 'Generación de Contenidos con IA',
      shortDescription: 'Utilizamos IA para crear contenido atractivo y optimizado.',
      fullDescription: 'Nuestra plataforma de generación de contenidos con IA crea textos, imágenes, videos y más, todo optimizado para SEO y adaptado a tu marca. Produce contenido de calidad profesional a escala, ahorrando tiempo y recursos.',
      targetAudience: 'Empresas y creadores de contenido que necesitan producir material de calidad de forma eficiente y consistente.',
      benefits: [
        'Producción de contenido a escala',
        'Optimización SEO automática',
        'Consistencia en el tono de marca',
        'Ahorro significativo de tiempo y costos',
        'Contenido adaptado a múltiples formatos'
      ],
      process: [
        { step: 1, title: 'Análisis de marca y objetivos', description: 'Entendemos tu marca, voz y objetivos de contenido.' },
        { step: 2, title: 'Configuración de IA', description: 'Entrenamos los modelos de IA con tu estilo y preferencias.' },
        { step: 3, title: 'Implementación de flujos', description: 'Creamos flujos automatizados de generación de contenido.' },
        { step: 4, title: 'Optimización y escalado', description: 'Optimizamos el rendimiento y escalamos la producción.' }
      ],
      pricing: [
        {
          plan: 'Starter',
          price: 'Desde 200€/mes',
          description: 'Para pequeñas empresas o blogs',
          features: [
            'Hasta 50 piezas de contenido al mes',
            'Generación de artículos y posts',
            'Optimización SEO básica',
            '2 tipos de contenido'
          ]
        },
        {
          plan: 'Profesional',
          price: 'Desde 500€/mes',
          description: 'Para empresas con necesidades regulares',
          features: [
            'Hasta 200 piezas de contenido al mes',
            'Múltiples formatos (artículos, social media, emails)',
            'Análisis de rendimiento incluido',
            'Integración con CMS',
            'Soporte prioritario'
          ],
          popular: true
        },
        {
          plan: 'Enterprise',
          price: 'Desde 1.500€/mes',
          description: 'Para grandes organizaciones',
          features: [
            'Contenido ilimitado',
            'Todos los formatos disponibles',
            'API personalizada',
            'Equipo dedicado de contenido',
            'Integración completa con sistemas'
          ]
        }
      ],
      faq: [
        {
          question: '¿El contenido generado es original y único?',
          answer: 'Sí, nuestros modelos de IA generan contenido completamente original, evitando problemas de duplicación.'
        },
        {
          question: '¿Puedo editar el contenido generado?',
          answer: 'Absolutamente, todo el contenido se puede editar y personalizar según tus necesidades específicas.'
        },
        {
          question: '¿Qué tipos de contenido pueden generar?',
          answer: 'Artículos de blog, posts de redes sociales, emails marketing, descripciones de producto, guiones de video, y más.'
        }
      ],
      ctaText: 'Comenzar con Generación de Contenido IA'
    },
    'educacion-ia': {
      slug: 'educacion-ia',
      icon: BrainCircuitIcon,
      iconColor: 'text-cyan-400',
      iconAlt: 'Icono de circuito cerebral representando educación en IA',
      title: 'Educación IA',
      shortDescription: 'Aprende los fundamentos y aplicaciones avanzadas de la IA.',
      fullDescription: 'Nuestro programa de educación en IA está diseñado para llevarte desde cero hasta convertirte en un experto. Cursos prácticos, proyectos reales y mentoría personalizada para que domines la inteligencia artificial.',
      targetAudience: 'Profesionales, emprendedores y empresas que quieren adquirir conocimientos en IA para aplicar en sus negocios.',
      benefits: [
        'Aprendizaje práctico con proyectos reales',
        'Certificación reconocida en el sector',
        'Mentoría personalizada por expertos',
        'Comunidad activa de estudiantes',
        'Actualización continua con las últimas tendencias'
      ],
      process: [
        { step: 1, title: 'Evaluación inicial', description: 'Evaluamos tu nivel actual y objetivos de aprendizaje.' },
        { step: 2, title: 'Plan de aprendizaje personalizado', description: 'Creamos un plan adaptado a tus necesidades específicas.' },
        { step: 3, 'title': 'Aprendizaje guiado', description: 'Cursos interactivos con práctica constante.' },
        { step: 4, title: 'Proyecto final y certificación', description: 'Aplicación práctica y obtención de certificación.' }
      ],
      pricing: [
        {
          plan: 'Curso Individual',
          price: 'Desde 150€',
          description: 'Aprendizaje flexible a tu ritmo',
          features: [
            'Acceso a curso específico',
            'Materiales descargables',
            'Foro de estudiantes',
            'Certificado de finalización'
          ]
        },
        {
          plan: 'Programa Completo',
          price: 'Desde 800€',
          description: 'Formación completa en IA',
          features: [
            'Todos los cursos incluidos',
            'Mentoría personalizada',
            'Proyecto final guiado',
            'Certificación profesional',
            'Acceso a comunidad premium'
          ],
          popular: true
        },
        {
          plan: 'Formación Empresarial',
          price: 'Consultar precio',
          description: 'Capacitación para equipos completos',
          features: [
            'Cursos personalizados para tu empresa',
            'Formación in-house',
            'Seguimiento de progreso del equipo',
            'Certificaciones grupales',
            'Soporte continuo post-formación'
          ]
        }
      ],
      faq: [
        {
          question: '¿Necesito conocimientos previos de programación?',
          answer: 'No es necesario, tenemos cursos desde nivel principiante hasta avanzado para diferentes niveles de conocimiento.'
        },
        {
          question: '¿Los cursos son online o presenciales?',
          answer: 'Ofrecemos tanto formato online flexible como sesiones presenciales para empresas.'
        },
        {
          question: '¿Qué certificación obtengo al finalizar?',
          answer: 'Otorgamos certificaciones reconocidas en IA, válidas para tu CV profesional y desarrollo de carrera.'
        }
      ],
      ctaText: 'Comenzar Aprendizaje en IA'
    }
  };

  const solution = solutions[params.slug];

  if (!solution) {
    return (
      <div className={`min-h-screen w-full text-white font-sans bg-gradient-to-br ${currentBgClass}`}>
        <Header onBackgroundChange={handleBackgroundChange} />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Solución no encontrada</h1>
          <p className="text-gray-300 mb-8">La solución que buscas no existe.</p>
          <Link
            href="/soluciones"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            Ver todas las soluciones
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = solution.icon;

  return (
    <div className={`min-h-screen w-full text-white font-sans transition-all duration-500 bg-gradient-to-br ${currentBgClass}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 isolate">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-12" aria-labelledby="solution-hero-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6" aria-hidden="true">
                <IconComponent
                  className={`h-16 w-16 mx-auto ${solution.iconColor} mb-4`}
                  aria-label={solution.iconAlt}
                />
              </div>
              <h1 id="solution-hero-heading" className="text-4xl md:text-6xl font-bold mb-6">
                {solution.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8">{solution.shortDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                >
                  {solution.ctaText}
                </Link>
                <Link
                  href="/casos-exito"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  Ver Casos de Éxito
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Descripción completa */}
        <section className="py-20" aria-labelledby="solution-description-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="solution-description-heading" className="text-3xl md:text-4xl font-bold mb-8 text-center">¿Qué es {solution.title}?</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-12">{solution.fullDescription}</p>

              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">¿Para quién es esta solución?</h3>
                <p className="text-gray-300 text-lg">{solution.targetAudience}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-black/20" aria-labelledby="solution-benefits-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="solution-benefits-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">Beneficios Clave</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solution.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                    <div className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="py-20" aria-labelledby="solution-process-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="solution-process-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">¿Cómo funciona?</h2>
              <div className="space-y-8">
                {solution.process.map((step, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start md:items-center bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                    <div className="flex-shrink-0 w-16 h-16 bg-cyan-500 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4 md:mb-0 md:mr-6">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Precios */}
        <section className="py-20 bg-black/20" aria-labelledby="solution-pricing-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 id="solution-pricing-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">Planes y Precios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solution.pricing.map((plan, index) => (
                  <div key={index} className={`bg-white/5 backdrop-blur-lg p-8 rounded-2xl border ${plan.popular ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.3)]' : 'border-white/10'} relative`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                        Más Popular
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.plan}</h3>
                      <div className="text-3xl font-bold text-cyan-400 mb-2">{plan.price}</div>
                      <p className="text-gray-400">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contacto"
                      className={`block text-center py-3 px-6 rounded-lg font-bold transition-transform duration-300 hover:scale-105 ${plan.popular ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      {plan.plan === 'Consultar precio' ? 'Consultar' : 'Elegir Plan'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20" aria-labelledby="solution-faq-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="solution-faq-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center">Preguntas Frecuentes</h2>
              <div className="space-y-6">
                {solution.faq.map((faq, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold mb-3 text-cyan-400">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-black/20" aria-labelledby="solution-final-cta-heading">
          <div className="container mx-auto px-6 text-center">
            <h2 id="solution-final-cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para transformar tu negocio con {solution.title}?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Comienza hoy mismo y descubre todo el potencial que la IA puede ofrecer a tu empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-10 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.6)] text-lg"
              >
                {solution.ctaText}
              </Link>
              <Link
                href="/soluciones"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 px-10 rounded-lg transition-all duration-300"
              >
                Ver Otras Soluciones
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
