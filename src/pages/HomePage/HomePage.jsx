import ApproachSection from '../../components/layout/ApproachSection'
import AboutSection from './AboutSection'
import HeroSection from './HeroSection'
import './HomePage.css'
import ProjectsShowcaseSection from './ProjectsSection'
import TechStackSection from './TechStackSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection/>
      <AboutSection/>
      <ProjectsShowcaseSection/>
      <ApproachSection/>
      <TechStackSection/>
    </main>
  )
}

