import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'

import Navbar from './components/layout/Navbar.jsx'
import PageSEO from './components/common/PageSEO.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'

import HomePage from './pages/HomePage/HomePage.jsx'
import AboutPage from './pages/AboutPage/AboutPage.jsx'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage.jsx'
import ProjectDetailPage from './pages/ProjectsPage/ProjectDetailPage.jsx'
import ServicesPage from './pages/ServicesPage/ServicesPage.jsx'
import BlogsPage from './pages/BlogsPage/BlogsPage.jsx'
import ToolsPage from './pages/ToolsPage/ToolsPage.jsx'
import ContactPage from './pages/ContactPage/ContactPage.jsx'
import BlogDetail from './pages/BlogsPage/BlogDetail.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import PrivacyPolicy from './pages/LegalPage/PrivacyPolicy.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<PageSEO pageKey="home"><HomePage /></PageSEO>} />
          <Route path="/about" element={<PageSEO pageKey="about"><AboutPage /></PageSEO>} />
          <Route path="/projects" element={<PageSEO pageKey="projects"><ProjectsPage /></PageSEO>} />
          <Route path="/projects/:slug" element={<PageSEO pageKey="projects"><ProjectDetailPage /></PageSEO>} />
          <Route path="/services" element={<PageSEO pageKey="services"><ServicesPage /></PageSEO>} />
          <Route path="/blogs" element={<PageSEO pageKey="blogs"><BlogsPage /></PageSEO>} />
          <Route path="/blogs/:id" element={<PageSEO pageKey="blogs"><BlogDetail /></PageSEO>} />
          <Route path="/tools" element={<PageSEO pageKey="tools"><ToolsPage /></PageSEO>} />
          <Route path="/get-in-touch" element={<PageSEO pageKey="contact"><ContactPage /></PageSEO>} />
          <Route path="/privacy-policy" element={<PageSEO pageKey="privacy"><PrivacyPolicy /></PageSEO>} />
          <Route path="*" element={<PageSEO pageKey="not-found" title="Page Not Found" description="The requested page could not be found on Chatriwala." robots="noindex,follow"><NotFoundPage /></PageSEO>} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App

