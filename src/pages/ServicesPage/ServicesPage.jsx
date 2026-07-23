import AllServices from './AllServices'
import ServicesHeader from './ServicesHeader'
import './ServicesPage.css'
import PageSEO from '../../components/common/PageSEO.jsx'
import { routeSeo } from '../../seo/routeSeo'

export default function ServicesPage() {
  return (
    <>
      <PageSEO
        pageKey="Services"
        title={routeSeo.services.title}
        description={routeSeo.services.description}
        url={routeSeo.services.canonical}
        type="Service"
        robots={routeSeo.services.robots}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Web Development & Digital Services',
          provider: {
            '@type': 'Person',
            name: 'Abdul Rafay Chatriwala'
          },
          areaServed: 'Pakistan',
          url: 'https://archatriwala.com/services'
        }}
      />
      <main>
      <ServicesHeader/>
      <AllServices/>
    </main>
    </>
  )
}

