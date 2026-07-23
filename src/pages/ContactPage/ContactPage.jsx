import React, { useEffect, useRef, useState } from 'react'
import './ContactPage.css'
import PageSEO from '../../components/common/PageSEO.jsx'
import { routeSeo } from '../../seo/routeSeo'

const SOCIAL_LINKS = [
    { label: "Instagram", handle: "@rafay.guides", href: "https://instagram.com/rafay.guides" },
    { label: "LinkedIn", handle: "/in/abdul-rafay-sajjad", href: "https://www.linkedin.com/in/abdul-rafay-sajjad/" },
    { label: "Twitter", handle: "@archatriwala", href: "https://twitter.com/archatriwala" },
    { label: "GitHub", handle: "@yourhandle", href: "#" }, // TODO: confirm real handle
]

const CONTACT_INFO = [
    { label: "Email", value: "hello@archatriwala.com", href: "mailto:hello@archatriwala.com" }, // TODO: confirm real email
    { label: "Location", value: "Karachi, Pakistan", href: null },
    { label: "Availability", value: "Now booking new projects", href: null },
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const useRevealOnScroll = () => {
    const ref = useRef(null)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        const items = node.querySelectorAll('.reveal-on-scroll')

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.15 }
        )

        items.forEach((item) => observer.observe(item))
        return () => observer.disconnect()
    }, [])

    return ref
}

export default function ContactPage() {
    const pageRef = useRevealOnScroll()
    const heroRef = useRef(null)

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | sent | error

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const [errors, setErrors] = useState({})

    const validate = () => {
        const nextErrors = {}
        if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
        if (!form.email.trim()) {
            nextErrors.email = 'Please enter your email.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            nextErrors.email = "That email address doesn't look right."
        }
        if (!form.subject.trim()) nextErrors.subject = 'Please add a subject.'
        if (!form.message.trim()) nextErrors.message = 'Please write a short message.'
        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return   // errors state is now set, so messages render
        setStatus('sending')

        try {
            const response = await fetch('https://formspree.io/f/xgvklzvv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(form)
            })

            if (response.ok) {
                setStatus('sent')
                setTimeout(() => {
                    setStatus('idle')
                    setForm({ name: '', email: '', subject: '', message: '' })
                }, 2800)
            } else {
                setStatus('error')
                setTimeout(() => {
                    setStatus('idle')
                }, 4000)
            }
        } catch (err) {
            console.error('Contact form submission error:', err)
            setStatus('error')
            setTimeout(() => {
                setStatus('idle')
            }, 4000)
        }
    }

    const handleHeroMove = (e) => {
        const hero = heroRef.current
        if (!hero) return
        const rect = hero.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        hero.style.setProperty('--mx', `${x}%`)
        hero.style.setProperty('--my', `${y}%`)
    }

    const handleMagnetMove = (e) => {
        const btn = e.currentTarget
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    }

    const resetMagnet = (e) => {
        e.currentTarget.style.transform = 'translate(0, 0)'
    }

    return (
        <>
            <PageSEO
                pageKey="Contact"
                title={routeSeo.contact.title}
                description={routeSeo.contact.description}
                url={routeSeo.contact.canonical}
                type="ContactPage"
                robots={routeSeo.contact.robots}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: 'Contact Abdul Rafay Chatriwala',
                    url: 'https://archatriwala.com/get-in-touch',
                    description: routeSeo.contact.description
                }}
            />
            <main className="contact-page" ref={pageRef}>

                {/* ---- Hero ---- */}
                <section className="contact-hero" ref={heroRef} onMouseMove={handleHeroMove}>
                    <div className="contact-grid-overlay" aria-hidden="true" />
                    <span className="contact-bg-text" aria-hidden="true">HELLO</span>

                    <div className="contact-hero-inner">
                        <p className="contact-eyebrow reveal-on-scroll">// let's talk</p>
                        <h1 className="contact-hero-headline reveal-on-scroll">
                            Every great project
                            <span className="contact-hero-accent">begins with hello.</span>
                        </h1>
                        <p className="contact-hero-sub reveal-on-scroll">
                            Tell us what you're imagining — we'll handle the rest.
                        </p>
                    </div>
                </section>

                {/* ---- Conversation: intro + info + form ---- */}
                <section className="contact-conversation">
                    <div className="contact-conversation-inner">

                        <div className="contact-intro reveal-on-scroll">
                            <p className="contact-eyebrow">// start a conversation</p>
                            <h2 className="contact-intro-headline">
                                Got an idea?
                                <span className="contact-intro-accent">We're listening.</span>
                            </h2>
                            <p className="contact-intro-sub">
                                No forms that feel like paperwork — just a quick note about
                                what you're building, and we'll take it from there.
                            </p>

                            <ul className="contact-info-list">
                                {CONTACT_INFO.map((item) => (
                                    <li key={item.label} className="contact-info-row">
                                        <span className="contact-info-label">{item.label}</span>
                                        {item.href ? (
                                            <a href={item.href} className="contact-info-value contact-info-link">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="contact-info-value">
                                                {item.label === "Availability" && (
                                                    <span className="contact-info-dot" />
                                                )}
                                                {item.value}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form
                            className="contact-form-card reveal-on-scroll"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="contact-form-header">
                                <span className="contact-form-dot contact-form-dot-red" />
                                <span className="contact-form-dot contact-form-dot-yellow" />
                                <span className="contact-form-dot contact-form-dot-green" />
                                <span className="contact-form-title">message.jsx</span>
                            </div>

                            <div className="contact-form-body">
                                <div className="contact-field">
                                    <span className="contact-field-key">name =</span>
                                    <div className="contact-field-input-wrap">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder=" "
                                            value={form.name}
                                            onChange={handleChange}
                                            aria-invalid={!!errors.name}
                                            required
                                        />
                                        <label htmlFor="name">Your name</label>
                                        {errors.name && <span className="error-msg">{errors.name}</span>}
                                    </div>
                                </div>

                                <div className="contact-field">
                                    <span className="contact-field-key">email =</span>
                                    <div className="contact-field-input-wrap">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder=" "
                                            value={form.email}
                                            onChange={handleChange}
                                            aria-invalid={!!errors.email}
                                            required
                                        />
                                        <label htmlFor="email">you@company.com</label>
                                        {errors.email && <span className="error-msg">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="contact-field">
                                    <span className="contact-field-key">subject =</span>
                                    <div className="contact-field-input-wrap">
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            placeholder=" "
                                            value={form.subject}
                                            onChange={handleChange}
                                            aria-invalid={!!errors.subject}
                                            required
                                        />
                                        <label htmlFor="subject">What's this about?</label>
                                        {errors.subject && <span className="error-msg">{errors.subject}</span>}
                                    </div>
                                </div>

                                <div className="contact-field">
                                    <span className="contact-field-key">message =</span>
                                    <div className="contact-field-input-wrap">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            placeholder=" "
                                            value={form.message}
                                            onChange={handleChange}
                                            aria-invalid={!!errors.message}
                                            required
                                        />
                                        <label htmlFor="message">Tell us about your project</label>
                                        {errors.message && <span className="error-msg">{errors.message}</span>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`contact-submit ${status}`}
                                    onMouseMove={handleMagnetMove}
                                    onMouseLeave={resetMagnet}
                                    disabled={status === 'sending' || status === 'sent'}
                                >
                                    <span>
                                        {status === 'idle' && 'Send Message'}
                                        {status === 'sending' && 'Sending...'}
                                        {status === 'sent' && 'Message Sent ✓'}
                                        {status === 'error' && 'Failed to Send ✗'}
                                    </span>
                                    {status === 'idle' && (
                                        <span className="contact-submit-arrow" aria-hidden="true">→</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* ---- Social presence ---- */}
                <section className="contact-social">
                    <div className="contact-social-inner">
                        <p className="contact-eyebrow reveal-on-scroll">// elsewhere</p>
                        {SOCIAL_LINKS.map((social, i) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-row reveal-on-scroll"
                                style={{ transitionDelay: `${i * 0.06}s` }}
                            >
                                <span className="contact-social-index">{String(i + 1).padStart(2, '0')}</span>
                                <span className="contact-social-label">{social.label}</span>
                                <span className="contact-social-handle">{social.handle}</span>
                                <span className="contact-social-arrow" aria-hidden="true">↗</span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* ---- Closing statement ---- */}
                <section className="contact-closing">
                    <div className="contact-closing-glow" aria-hidden="true" />
                    <p className="contact-eyebrow reveal-on-scroll">// until then</p>
                    <h2 className="contact-closing-headline reveal-on-scroll">
                        We can't wait to
                        <span className="contact-closing-accent">hear your story.</span>
                    </h2>
                    <a
                        href="mailto:hello@archatriwala.com"
                        className="contact-closing-cta reveal-on-scroll"
                        onMouseMove={handleMagnetMove}
                        onMouseLeave={resetMagnet}
                    >
                        <span>Say Hello</span>
                        <span className="contact-cta-arrow" aria-hidden="true">→</span>
                    </a>
                </section>
            </main>
        </>
    )
}