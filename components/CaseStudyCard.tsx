import React from 'react';
import Link from 'next/link';
import { CheckCircleIcon } from './icons';

interface CaseStudyCardProps {
  title: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  results: string[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  image?: string;
  href: string;
  featured?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  client,
  industry,
  problem,
  solution,
  results,
  testimonial,
  testimonialAuthor,
  testimonialRole,
  href,
  featured = false
}) => {
  return (
    <article className={`bg-white/5 backdrop-blur-lg p-8 rounded-2xl border transition-all duration-300 hover:scale-105 group ${featured ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.3)]' : 'border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]'}`}>
      {featured && (
        <div className="bg-cyan-500 text-black text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
          Caso Destacado
        </div>
      )}

      <div className="mb-4">
        <div className="text-sm text-cyan-400 font-semibold mb-1">{industry}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="text-gray-400">{client}</div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-cyan-400 mb-2">El Desafío</h4>
        <p className="text-gray-300 text-sm">{problem}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-cyan-400 mb-2">La Solución IA</h4>
        <p className="text-gray-300 text-sm">{solution}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-green-400 mb-2">Resultados</h4>
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{result}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 p-4 bg-black/20 rounded-lg">
        <p className="text-gray-300 text-sm italic mb-2">"{testimonial}"</p>
        <div className="text-cyan-400 text-sm font-semibold">
          {testimonialAuthor}
        </div>
        <div className="text-gray-400 text-xs">
          {testimonialRole}, {client}
        </div>
      </div>

      <Link
        href={href}
        className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
      >
        Ver Caso Completo
      </Link>
    </article>
  );
};
