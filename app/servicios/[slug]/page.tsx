import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { getService, services, SITE_URL } from '@/lib/site'
import {
  getServicePageContent,
  serviceCanonical,
} from '@/lib/services-content'

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  const content = getServicePageContent(slug)
  if (!service || !content) return {}

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: serviceCanonical(content.slug),
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: serviceCanonical(content.slug),
      siteName: 'IAenBlanco',
      type: 'website',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: `${service.title}, por IAenBlanco.`,
        },
      ],
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getService(slug)
  const content = getServicePageContent(slug)

  if (!service || !content) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    url: serviceCanonical(content.slug),
    provider: {
      '@type': 'Organization',
      name: 'IAenBlanco SpA',
      url: SITE_URL,
    },
    // Aqui no se puede borrar como en el layout: este provider no lleva
    // PostalAddress, asi que sin esta linea el Service queda sin geografia.
    areaServed: 'Chile',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <ServicePageTemplate service={service} content={content} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
