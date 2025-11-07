import React from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { BrainCircuitIcon, CodeIcon, WandSparklesIcon, MessageIcon, PaletteIcon, LightbulbIcon, TrendingUpIcon } from '@/components/icons';

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
    startingPrice: string;
    description: string;
    features: string[];
  };
  results: string[];
  faq: { question: string; answer: string }[];
  ctaText: string;
}

export async function generateStaticParams() {
  return [
    { slug: 'paginas-web-ia' },
    { slug: 'diseno-shopify' },
    { slug: 'chatbots-asistentes' },
    { slug: 'soluciones-medida' },
    { slug: 'auditoria-sitios-personalizada' },
    { slug: 'automatizaciones' },
  ];
}

// Forzar prerendering estático pero permitir hidratación del cliente
export const dynamic = 'force-static';

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
      pricing: {
        startingPrice: '$1.425.000',
        description: 'El precio final se ajusta según el alcance, complejidad y necesidades específicas de tu proyecto. En nuestra reunión inicial definiremos juntos la solución perfecta para ti.',
        features: [
          'Sitio web responsive y optimizado',
          'Integración de IA para SEO y personalización',
          'Contenido dinámico adaptativo',
          'Panel de administración intuitivo',
          'Capacitación completa incluida',
          'Soporte técnico post-lanzamiento'
        ]
      },
      results: [
        'Aumento promedio del 45% en conversiones',
        'Mejora del 60% en posicionamiento SEO',
        'Reducción del 30% en costos de mantenimiento',
        'ROI positivo en los primeros 3 meses'
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
      pricing: {
        startingPrice: '$760.000',
        description: 'El costo varía según la complejidad del diseño, funcionalidades requeridas y nivel de personalización. Agenda una reunión para recibir una cotización personalizada basada en tus objetivos de negocio.',
        features: [
          'Diseño personalizado de tu tienda Shopify',
          'Optimización completa para conversión',
          'Códigos personalizados avanzados',
          'Integración de funcionalidades únicas',
          'Optimización móvil y velocidad',
          'Soporte y mantenimiento incluido'
        ]
      },
      results: [
        'Incremento promedio del 50% en tasa de conversión',
        'Reducción del 40% en tasa de abandono',
        'Mejora del 35% en tiempo de permanencia',
        'Aumento del 55% en ventas mensuales'
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
      pricing: {
        startingPrice: '$475.000',
        description: 'El precio se define según el nivel de inteligencia del chatbot, cantidad de integraciones, volumen de conversaciones y complejidad de los flujos. Te presentaremos opciones adaptadas a tu presupuesto y necesidades.',
        features: [
          'Chatbot con IA conversacional',
          'Integración multi-plataforma',
          'Flujos de conversación personalizados',
          'Aprendizaje automático continuo',
          'Panel de análisis y métricas',
          'Soporte técnico especializado'
        ]
      },
      results: [
        'Reducción del 70% en tiempo de respuesta',
        'Atención 24/7 sin costos adicionales',
        'Ahorro del 60% en costos de atención',
        'Satisfacción del cliente sobre 90%'
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
      pricing: {
        startingPrice: '$4.750.000',
        description: 'Cada proyecto es único. El precio se calcula en base a la complejidad técnica, alcance, tiempo estimado y valor que aportará a tu negocio. En una reunión estratégica evaluaremos tu caso y diseñaremos la propuesta perfecta.',
        features: [
          'Análisis completo de tu desafío',
          'Solución de IA personalizada',
          'Desarrollo e implementación completa',
          'Integraciones con tus sistemas',
          'Capacitación de tu equipo',
          'Soporte y evolución continua'
        ]
      },
      results: [
        'ROI promedio del 400% en el primer año',
        'Reducción de hasta 70% en tiempos de proceso',
        'Mejora del 85% en precisión de datos',
        'Ventaja competitiva demostrable'
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
    'auditoria-sitios-personalizada': {
      slug: 'auditoria-sitios-personalizada',
      icon: TrendingUpIcon,
      iconColor: 'text-green-400',
      iconAlt: 'Icono de tendencias ascendentes representando análisis y métricas de auditoría de sitios web',
      title: 'Auditoría de Sitios Personalizada con IA',
      shortDescription: 'Detectamos errores críticos en UX, UI, SEO y rendimiento para entregarte un plan claro y accionable.',
      fullDescription: 'Una revisión integral de tu sitio web donde combinamos herramientas de inteligencia artificial y análisis experto para identificar oportunidades de mejora en diseño, contenidos, velocidad, accesibilidad y conversiones.',
      targetAudience: 'Empresas de eCommerce que buscan más ventas, clínicas y profesionales de salud que necesitan confianza y visibilidad, negocios de servicios que quieren generar más leads, y startups que requieren un sitio sólido desde el día uno.',
      benefits: [
        'Aumento de conversiones al optimizar la experiencia de usuario',
        'Mejor posicionamiento en Google con ajustes SEO técnicos',
        'Mayor confianza gracias a accesibilidad y diseño coherente',
        'Reporte accionable con quick wins y plan de mediano plazo'
      ],
      process: [
        { step: 1, title: 'Diagnóstico inicial', description: 'Revisión de navegación, CTAs, formularios y velocidad.' },
        { step: 2, title: 'Análisis por área', description: 'Evaluación detallada de UX/UI, SEO, contenidos y performance técnico.' },
        { step: 3, title: 'Informe completo', description: 'Entrega de reporte con errores, mejoras y recomendaciones priorizadas.' },
        { step: 4, title: 'Reunión de entrega', description: 'Explicamos hallazgos y próximos pasos.' }
      ],
      pricing: {
        startingPrice: '$285.000',
        description: 'El alcance de la auditoría se adapta a tu sitio web: número de páginas, complejidad técnica y profundidad del análisis. En una llamada inicial definiremos el paquete que mejor se ajuste a tus objetivos y presupuesto.',
        features: [
          'Auditoría completa de UX/UI y SEO',
          'Análisis de velocidad y rendimiento',
          'Informe detallado con mockups',
          'Roadmap de implementación priorizado',
          'Reunión de presentación de resultados',
          'Seguimiento y recomendaciones continuas'
        ]
      },
      results: [
        'Aumento promedio del 65% en conversiones',
        'Mejora del 80% en velocidad de carga',
        'Incremento del 120% en tráfico orgánico',
        'ROI visible en 2-4 meses'
      ],
      faq: [
        {
          question: '¿Qué incluye exactamente la auditoría?',
          answer: 'Análisis completo de UX/UI, SEO técnico, velocidad de carga, accesibilidad, contenido y rendimiento de conversiones.'
        },
        {
          question: '¿Cuánto demora el proceso?',
          answer: 'El análisis completo toma entre 3-5 días hábiles, más el tiempo para preparar el informe personalizado.'
        },
        {
          question: '¿Qué diferencia hay con un informe gratuito online?',
          answer: 'Los informes gratuitos son genéricos. Nuestra auditoría es personalizada, incluye análisis profundo con IA y recomendaciones específicas para tu industria.'
        },
        {
          question: '¿La auditoría incluye implementación de cambios?',
          answer: 'El plan Premium incluye acompañamiento en implementación. Los otros planes entregan el roadmap completo para que implementes tú mismo o con tu equipo.'
        }
      ],
      ctaText: 'Solicitar mi auditoría ahora'
    },
    'automatizaciones': {
      slug: 'automatizaciones',
      icon: WandSparklesIcon,
      iconColor: 'text-cyan-400',
      iconAlt: 'Icono de varita mágica representando automatizaciones',
      title: 'Automatizaciones',
      shortDescription: 'Elimina tareas repetitivas y ahorra hasta 30 horas semanales con automatizaciones a medida.',
      fullDescription: 'Transforma tu negocio con automatizaciones diseñadas específicamente para tus procesos. Usamos IA para identificar las mejores oportunidades de automatización en tu empresa y desarrollamos la solución perfecta, ya sea con inteligencia artificial, scripts personalizados o integraciones entre herramientas. El resultado: procesos que funcionan 24/7, reducción de errores humanos hasta un 95% y tu equipo enfocado en tareas de alto valor. Garantizamos un ROI medible desde el primer mes.',
      targetAudience: 'Empresas de todos los tamaños que buscan reducir costos operativos, mejorar eficiencia y escalar sin aumentar personal proporcionalmente. Ideal para e-commerce, servicios profesionales, manufacturing, logística y cualquier negocio con procesos repetitivos.',
      benefits: [
        'Ahorra hasta 30 horas semanales por empleado en tareas manuales',
        'Reduce costos operativos hasta un 60% en procesos automatizados',
        'Elimina el 95% de errores humanos en tareas repetitivas',
        'ROI visible entre 1-3 meses con retorno promedio de 400%',
        'Escala tu negocio sin aumentar headcount proporcionalmente',
        'Disponibilidad 24/7 sin descansos ni vacaciones',
        'Solución flexible: con IA o sin IA, según tu necesidad real',
        'Integración perfecta con tus sistemas y herramientas actuales'
      ],
      process: [
        { step: 1, title: 'Auditoría de Procesos (Gratuita)', description: 'Usamos IA para analizar y mapear tus procesos. Identificamos qué automatizar y calculamos el ahorro potencial específico para tu caso.' },
        { step: 2, title: 'Diseño de Solución a Medida', description: 'Diseñamos la mejor solución para cada proceso: puede incluir IA, scripts personalizados, APIs o integraciones. Lo que realmente funcione.' },
        { step: 3, title: 'Implementación Rápida', description: 'Desarrollamos e implementamos las automatizaciones en 2-4 semanas. Testing exhaustivo antes de producción.' },
        { step: 4, title: 'Optimización Continua', description: 'Monitoreamos rendimiento y agregamos mejoras basadas en datos reales de uso. Tu solución evoluciona contigo.' }
      ],
      pricing: {
        startingPrice: '$950.000',
        description: 'El precio final depende del número de procesos a automatizar, complejidad de las integraciones y nivel de personalización requerido. Ofrecemos una auditoría GRATUITA donde calcularemos el ROI esperado y definiremos el alcance exacto del proyecto.',
        features: [
          'Auditoría gratuita de procesos',
          'Automatización de procesos clave',
          'Integraciones con tus herramientas',
          'Dashboard de métricas y analytics',
          'Capacitación completa del equipo',
          'Soporte y optimización continua'
        ]
      },
      results: [
        'Ahorro de hasta 30 horas semanales por empleado',
        'Reducción del 60% en costos operativos',
        'Eliminación del 95% de errores manuales',
        'ROI promedio del 400% en 3-6 meses'
      ],
      faq: [
        {
          question: '¿Todas las automatizaciones usan IA?',
          answer: 'No necesariamente. Usamos IA para IDENTIFICAR y DISEÑAR las mejores oportunidades de automatización. La implementación puede incluir IA o no, dependiendo de qué solución funcione mejor para tu caso específico. Lo importante es el resultado: ahorro de tiempo y reducción de costos.'
        },
        {
          question: '¿Cuánto tiempo tardan en estar operativas las automatizaciones?',
          answer: 'Las automatizaciones básicas están funcionando en 1-2 semanas. Proyectos complejos toman 3-4 semanas. Comenzarás a ver ahorros desde el primer día de implementación.'
        },
        {
          question: '¿Qué procesos se pueden automatizar?',
          answer: 'Prácticamente cualquier tarea repetitiva: gestión de emails, procesamiento de datos, entrada de información, generación de reportes, atención al cliente, facturación, inventario, seguimiento de leads, social media, y mucho más. En la auditoría gratuita identificamos tus mejores oportunidades.'
        },
        {
          question: '¿Necesito cambiar mis sistemas actuales?',
          answer: 'No. Nuestras automatizaciones se integran con tus herramientas existentes (Excel, CRM, ERP, email, bases de datos, etc.) sin necesidad de cambiar tu stack tecnológico.'
        },
        {
          question: '¿Cómo garantizan el ROI?',
          answer: 'Medimos métricas específicas: horas ahorradas, errores eliminados, costos reducidos. El 94% de nuestros clientes recupera la inversión en menos de 4 meses. Ofrecemos garantía de satisfacción.'
        },
        {
          question: '¿Qué pasa si mi proceso cambia?',
          answer: 'Las automatizaciones son flexibles y fáciles de ajustar. Incluimos capacitación para que puedas hacer cambios menores, y nuestro soporte te ayuda con modificaciones mayores.'
        }
      ],
      ctaText: 'Solicitar Auditoría Gratuita'
    }
  };

  const solution = solutions[slug];

  if (!solution) {
    return (
      <div className={`min-h-screen w-full text-white font-sans bg-gradient-to-br ${currentBgClass}`}>
        <Header />
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
              <p className="text-xl text-gray-300 mb-6">{solution.shortDescription}</p>
              <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full inline-block mb-8">
                <p className="text-cyan-400 font-bold text-lg">
                  💰 Precios desde {solution.pricing.startingPrice}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(0,255,255,0.6)] text-lg"
                >
                  🚀 Agendar Reunión Gratuita
                </Link>
                <Link
                  href="#solution-pricing-heading"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 px-10 rounded-xl transition-all duration-300 text-lg"
                >
                  Ver Inversión
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                ⚡ Respuesta en menos de 24 horas • Sin compromiso
              </p>
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
                      <WandSparklesIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
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

        {/* Precios y Resultados */}
        <section className="py-20 bg-black/20" aria-labelledby="solution-pricing-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 id="solution-pricing-heading" className="text-3xl md:text-4xl font-bold mb-4 text-center">Inversión</h2>
              <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
                Cada proyecto es único. Trabajamos contigo para crear una solución que se ajuste a tu presupuesto y objetivos.
              </p>
              
              {/* Precio Principal */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl p-10 rounded-3xl border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,255,255,0.3)] mb-8">
                <div className="text-center mb-8">
                  <div className="text-sm text-cyan-400 font-semibold mb-2 tracking-wider uppercase">Inversión desde</div>
                  <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
                    {solution.pricing.startingPrice}
                  </div>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                    {solution.pricing.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {solution.pricing.features.map((feature, index) => (
                    <div key={index} className="flex items-start bg-white/5 p-4 rounded-xl border border-white/10">
                      <WandSparklesIcon className="h-6 w-6 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href="/contacto"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(0,255,255,0.6)] text-lg"
                  >
                    Agendar Reunión Estratégica
                  </Link>
                  <p className="text-sm text-gray-400 mt-4">
                    🎯 Sin compromiso • Consulta gratuita de 30 minutos
                  </p>
                </div>
              </div>

              {/* Resultados Esperados */}
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-center text-cyan-400">Resultados que puedes esperar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {solution.results.map((result, index) => (
                    <div key={index} className="flex items-center bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-4 rounded-xl border border-green-500/20">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-2xl">📈</span>
                      </div>
                      <span className="text-gray-200 font-medium">{result}</span>
                    </div>
                  ))}
                </div>
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
        <section className="py-20 bg-gradient-to-br from-cyan-900/20 to-blue-900/20" aria-labelledby="solution-final-cta-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl p-12 rounded-3xl border-2 border-cyan-400 shadow-[0_0_60px_rgba(0,255,255,0.4)] text-center">
              <h2 id="solution-final-cta-heading" className="text-3xl md:text-5xl font-bold mb-6">
                ¿Listo para dar el siguiente paso?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Agenda una reunión estratégica gratuita de 30 minutos. Analizaremos tu proyecto, responderemos tus preguntas y te entregaremos una propuesta personalizada.
              </p>
              <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl mb-8 max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-sm text-gray-300">Sin compromiso</div>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-sm text-gray-300">Propuesta personalizada</div>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-sm text-gray-300">Respuesta en 24h</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/contacto"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-5 px-12 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(0,255,255,0.7)] text-lg"
                >
                  🚀 Agendar Mi Reunión Gratuita
                </Link>
              </div>
              <Link
                href="/soluciones"
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline transition-colors"
              >
                Ver otras soluciones →
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
