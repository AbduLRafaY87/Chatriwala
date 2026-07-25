import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import logo from "../../assets/logo.jpg"
import ProjectModal from '../common/ProjectModal.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import { Sun, Moon } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/blogs', label: 'Blogs' },
  // { to: '/tools', label: 'Tools' },
  { to: '/get-in-touch', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="brand" href="/" aria-label="Homepage">
            <img src={logo} alt="Chatriwala Logo" className="brand-logo" />
            <span className="brand-text">Chatriwala</span>
          </a>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="theme-toggle-icon">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            </button>
            <div className="nav-cta">
              <button className="email-pill" onClick={() => setIsModalOpen(true)}>
                <span className="btn-spark">{'\u2726'}</span>
                Let's Build Together
              </button>
            </div>
          </div>
        </div>
        <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </nav>
    </header>
  )
}
