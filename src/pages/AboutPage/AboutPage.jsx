import './AboutPage.css'
import HeroSection from './HeroSection'
import Milestones from './Milestones'
import Recognition from './Recognition'
import PageSEO from '../../components/common/PageSEO.jsx'
import { routeSeo } from '../../seo/routeSeo'

export default function AboutPage() {
  return (
    <>
      <PageSEO
        pageKey="about"
        title={routeSeo.about.title}
        description={routeSeo.about.description}
        url={routeSeo.about.canonical}
        type="profile"
        robots={routeSeo.about.robots}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Abdul Rafay Chatriwala',
          jobTitle: 'Full-Stack Developer',
          url: 'https://archatriwala.com/about',
          sameAs: [
            'https://www.linkedin.com/in/abdul-rafay-sajjad/',
            'https://github.com/AbduLRafaY87/',
            'https://instagram.com/rafay.guides'
          ],
          description: routeSeo.about.description
        }}
      />
      <main>
      <HeroSection />
      <Milestones />
      <Recognition/>
    </main>
    </>
  )
}

