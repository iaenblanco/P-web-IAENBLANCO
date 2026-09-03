import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { getService, OG_IMAGE, services, SITE_URL } from '@/lib/site'
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
      images: [OG_IMAGE],
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

  // Las paginas de servicio son las unicas del sitio con jerarquia real:
  // cuelgan de /servicios/, que a su vez cuelga de la portada. Las rutas de
  // primer nivel no llevan BreadcrumbList: dos eslabones no dicen nada y
  // Google casi nunca los pinta.
  // El @id sale del canonical de cada servicio, asi que es unico por ruta y
  // no choca con el '#organization' del layout, que si se repite a proposito
  // en todo el sitio porque es la misma entidad.
  // El ultimo eslabon usa shortTitle y no title: shortTitle es el rotulo que
  // ya se ve en el desplegable del header y en las tarjetas de /servicios/;
  // title es la frase larga del h1. Va sin item porque es la pagina actual.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${serviceCanonical(content.slug)}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Servicios',
        item: `${SITE_URL}/servicios/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.shortTitle,
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
