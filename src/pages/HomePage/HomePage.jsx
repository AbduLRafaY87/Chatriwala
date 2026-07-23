import ApproachSection from '../../components/layout/ApproachSection'
import AboutSection from './AboutSection'
import HeroSection from './HeroSection'
import './HomePage.css'
import ProjectsShowcaseSection from './ProjectsSection'
import TechStackSection from './TechStackSection'
import { routeSeo } from '../../seo/routeSeo'
import PageSEO from '../../components/common/PageSEO.jsx'

export default function HomePage() {
  return (
    <>
      <PageSEO
        pageKey="Home"
        title={routeSeo.home.title}
        description={routeSeo.home.description}
        url={routeSeo.home.canonical}
        type="website"
        robots={routeSeo.home.robots}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Chatriwala',
          url: 'https://archatriwala.com',
          description: routeSeo.home.description,
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://archatriwala.com/projects',
            'query-input': 'required name=search_term_string'
          }
        }}
      />
      <main>
      <HeroSection/>
      <AboutSection/>
      <ProjectsShowcaseSection/>
      <ApproachSection/>
      <TechStackSection/>
    </main>
    </>
  )
}

