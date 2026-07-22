import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'

import Navbar from './components/layout/Navbar.jsx'
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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App

