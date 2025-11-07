import React from 'react';
import Link from 'next/link';

interface SolutionCardProps {
  slug: string;
  icon: React.ComponentType<{ className?: string; 'aria-label'?: string }>;
  iconColor: string;
  iconAlt: string;
  title: string;
  description: string;
  targetAudience: string;
  benefits: string[];
  href: string;
  showDetailsButton?: boolean;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  icon: IconComponent,
  iconColor,
  iconAlt,
  title,
  description,
  targetAudience,
  benefits,
  href,
  showDetailsButton = true
}) => {
  return (
    <article
      className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-cyan-400 hover:scale-105 group hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] flex flex-col h-full"
      role="listitem"
      aria-labelledby={`solution-title-${title}`}
      aria-describedby={`solution-desc-${title}`}
    >
      <div className="flex-grow">
        <div className="text-center mb-6" aria-hidden="true">
          <IconComponent
            className={`h-16 w-16 ${iconColor} transition-transform duration-300 group-hover:rotate-12 mx-auto mb-4`}
            aria-label={iconAlt}
          />
          <h3 id={`solution-title-${title}`} className="text-2xl font-bold mb-2">{title}</h3>
        </div>
        <p id={`solution-desc-${title}`} className="text-gray-300 mb-4 text-justify">{description}</p>

        <div className="mb-6 text-center">
          <h4 className="text-base font-semibold text-cyan-400 mb-2">Ideal para:</h4>
          <p className="text-sm text-gray-400">{targetAudience}</p>
        </div>

        <div className="mb-6 text-center">
          <h4 className="text-base font-semibold text-cyan-400 mb-2">Beneficios principales:</h4>
          <ul className="text-sm text-gray-400 space-y-1 inline-block text-left">
            {benefits.map((benefit, benefitIndex) => (
              <li key={benefitIndex} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showDetailsButton && (
        <div className="text-center mt-auto">
          <Link
            href={href}
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Ver Detalles e Inversión →
          </Link>
        </div>
      )}
    </article>
  );
};
