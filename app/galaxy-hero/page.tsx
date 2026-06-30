import type { Metadata } from 'next'
import { HeroSectionBasic } from '@/components/ui/galaxy-interactive-hero-section-demo'

export const metadata: Metadata = {
  title: 'IAenBlanco SpA | Soluciones con Inteligencia Artificial',
  description: 'Transformamos empresas con soluciones de IA: automatizaciones, chatbots, páginas web a medida y más. Agenda tu reunión gratuita.',
  // Página en evaluación: no indexar hasta decidir publicarla (ver nota del equipo).
  robots: { index: false, follow: false },
}

export default function GalaxyHeroPreviewPage() {
  return <HeroSectionBasic />
}
