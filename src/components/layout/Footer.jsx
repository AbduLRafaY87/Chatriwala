import React from 'react'
import './Footer.css'

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/projects" },
    { label: "Contact", href: "/get-in-touch" },
]

const SOCIAL_LINKS = [
    { label: "Instagram", handle: "@rafay.guides", href: "https://instagram.com/rafay.guides" },
    // { label: "Twitter", handle: "@archatriwala", href: "https://twitter.com/archatriwala" },
    { label: "LinkedIn", handle: "/in/abdul-rafay-sajjad", href: "https://www.linkedin.com/in/abdul-rafay-sajjad/" },
    { label: "GitHub", handle: "/AbduLRafay87", href: "https://github.com/AbduLRafaY87/" }, 
]

const Footer = () => {
    const year = new Date().getFullYear()

    const handleMagnetMove = (e) => {
        const btn = e.currentTarget
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    }

    const resetMagnet = (e) => {
        e.currentTarget.style.transform = "translate(0, 0)"
    }

    return (
        <footer className="footer-section" role="contentinfo">
            <div className="footer-grid-overlay" aria-hidden="true" />
            <span className="footer-bg-text" aria-hidden="true">TALK</span>

            <div className="footer-inner">
                <div className="footer-top">
                    <p className="footer-eyebrow">// let's start something</p>

                    <h2 className="footer-headline">
                        Great ideas deserve
                        <span className="footer-headline-accent">great design.</span>
                    </h2>

                    <a
                        href="mailto:hello.chatriwala@gmail.com" // TODO: confirm real email
                        className="footer-cta"
                        onMouseMove={handleMagnetMove}
                        onMouseLeave={resetMagnet}
                    >
                        <span>Start a Project</span>
                        <span className="footer-cta-arrow" aria-hidden="true">→</span>
                    </a>
                </div>

                <div className="footer-divider" />

                <div className="footer-columns">
                    <div className="footer-column">
                        <p className="footer-column-title">Contact</p>
                        <a href="mailto:hello.chatriwala@gmail.com" className="footer-link footer-link-lg">
                            hello.chatriwala@gmail.com {/* TODO: confirm real email */}
                        </a>
                        <p className="footer-meta">Karachi, Pakistan</p>
                        <span className="footer-status">
                            <span className="footer-status-dot" />
                            Now booking new projects
                        </span>
                    </div>

                    <div className="footer-column">
                        <p className="footer-column-title">Navigate</p>
                        <nav className="footer-nav" aria-label="Footer navigation">
                            {NAV_LINKS.map((link) => (
                                <a key={link.label} href={link.href} className="footer-link">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="footer-column">
                        <p className="footer-column-title">Elsewhere</p>
                        <div className="footer-socials">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-social-link"
                                >
                                    <span className="footer-social-label">{social.label}</span>
                                    <span className="footer-social-handle">{social.handle}</span>
                                    <span className="footer-social-arrow" aria-hidden="true">↗</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {year} Abdul Rafay Chatriwala — built with love
                    </p>
                    <p className="footer-signature">designed &amp; developed in-house</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer