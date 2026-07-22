import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import logo from "../../assets/logo.jpg"
import ProjectModal from '../common/ProjectModal.jsx'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/tools', label: 'Tools' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
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

        <div className="nav-cta">
          <button className="email-pill" onClick={() => setIsModalOpen(true)}>
            <span className="btn-spark">✦</span>
            Let's Build Together
          </button>
        </div>
      </div>
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  )
}

