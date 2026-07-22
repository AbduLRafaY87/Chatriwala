import React, { useEffect, useRef, useState } from 'react'
// import './ServicesHeader.css'

// The "journey" a service belongs to — this becomes the floating stack visual
const JOURNEY = ['Discover', 'Design', 'Engineer', 'Refine', 'Ship']

const ServicesHeader = () => {
    const headerRef = useRef(null)
    const [headerVisible, setHeaderVisible] = useState(false)
    const [activeStep, setActiveStep] = useState(0)

    // Reveal on mount (hero is above the fold, so no scroll-trigger needed)
    useEffect(() => {
        const t = setTimeout(() => setHeaderVisible(true), 80)
        return () => clearTimeout(t)
    }, [])

    // Cycles the floating card stack to suggest an ongoing process
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % JOURNEY.length)
        }, 2200)
        return () => clearInterval(interval)
    }, [])

    const handleMouseMove = (e) => {
        const el = headerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        el.style.setProperty('--mx', `${x}%`)
        el.style.setProperty('--my', `${y}%`)
    }

    const handleMagnet = (e) => {
        const btn = e.currentTarget
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
    }
    const resetMagnet = (e) => { e.currentTarget.style.transform = 'translate(0,0)' }

    return (
        <header
            className="services-header"
            ref={headerRef}
            onMouseMove={handleMouseMove}
        >
            <div className="services-header-grid-overlay" aria-hidden="true" />
            <span className="services-header-bg-text" aria-hidden="true">SERVICES</span>

            <div className="services-header-inner">
                <div className={`services-header-text ${headerVisible ? 'is-visible' : ''}`}>
                    <p className="services-header-eyebrow">// what I actually do</p>

                    <h1 className="services-header-headline">
                        <span className="line line-1 accent">The best products</span>
                        <span className="line line-2 ">don't happen by accident.</span>
                    </h1>

                    <p className="services-header-sub">
                        I help clients turn ideas into scalable, user-focused products
                        through thoughtful design, modern development, and honest
                        collaboration from first sketch to final deploy.
                    </p>

                    {/* <div className="services-header-actions">
                        <a
                            href="#services-list"
                            className="services-header-cta"
                            onMouseMove={handleMagnet}
                            onMouseLeave={resetMagnet}
                        >
                            <span>Explore My Services</span>
                            <span className="cta-arrow" aria-hidden="true">→</span>
                        </a>
                        <a href="/approach" className="services-header-link">
                            See how I work
                            <span className="link-underline" />
                        </a>
                    </div> */}
                </div>

                {/* Floating journey stack — the "visual storytelling" element */}
                <div className="services-header-visual">
                    <div className="services-journey-stack">
                        {JOURNEY.map((step, i) => {
                            const offset = (i - activeStep + JOURNEY.length) % JOURNEY.length
                            return (
                                <div
                                    key={step}
                                    className={`journey-card ${offset === 0 ? 'is-front' : ''}`}
                                    style={{
                                        '--offset': offset,
                                        zIndex: JOURNEY.length - offset,
                                    }}
                                >
                                    <span className="journey-card-index">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="journey-card-label">{step}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="services-journey-tag">
                        <span className="journey-tag-dot" />
                        One continuous process
                    </div>
                </div>
            </div>
        </header>
    )
}

export default ServicesHeader