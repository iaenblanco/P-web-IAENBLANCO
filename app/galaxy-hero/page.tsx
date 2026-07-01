import type { Metadata } from 'next'
import { HeroSection } from '@/components/ui/galaxy-interactive-hero-section'
import { TrustBar } from '@/components/landing/TrustBar'
import { ValueProps } from '@/components/landing/ValueProps'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { ProcessSteps } from '@/components/landing/ProcessSteps'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { Guarantees } from '@/components/landing/Guarantees'
import { FAQ } from '@/components/landing/FAQ'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'IAenBlanco SpA | Soluciones con Inteligencia Artificial',
  description:
    'Agencia chilena de IA. Automatizamos procesos, creamos sitios web inteligentes y soluciones a medida, con resultados medibles. Agenda una reunión gratuita.',
  // Nueva home en revisión: no indexar hasta aprobar el reemplazo de la actual.
  robots: { index: false, follow: false },
}

export default function NuevaHomePage() {
  return (
    <main className="bg-[#060810] text-white">
      <HeroSection />
      <TrustBar />
      <ValueProps />
      <ServicesSection />
      <ProcessSteps />
      <TestimonialsSection />
      <Guarantees />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
