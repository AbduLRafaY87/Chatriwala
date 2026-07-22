import React, { useEffect, useRef } from 'react'
import portrait from "../../assets/AboutPhoto.png" // same headshot used on the homepage About section

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

export default function AboutPage() {
    const pageRef = useRevealOnScroll()
    const heroRef = useRef(null)

    const handleMouseMove = (e) => {
        const hero = heroRef.current
        if (!hero) return
        const rect = hero.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        hero.style.setProperty('--mx', `${x}%`)
        hero.style.setProperty('--my', `${y}%`)
    }

    return (
        <main className="about-page" ref={pageRef}>
            <section
                className="about-hero"
                ref={heroRef}
                onMouseMove={handleMouseMove}
            >
                <div className="about-hero-grid-overlay" aria-hidden="true" />
                <span className="about-hero-bg-text" aria-hidden="true">ORIGIN</span>

                <div className="about-hero-inner">
                    <div className="about-hero-text">
                        <p className="about-hero-eyebrow reveal-on-scroll">// how it started</p>

                        <h1 className="about-hero-headline">
                            <span className="line reveal-on-scroll" style={{ transitionDelay: '0.05s' }}>
                                Design is more than
                            </span>
                            <span className="line line-accent reveal-on-scroll" style={{ transitionDelay: '0.18s' }}>
                                appearance.
                            </span>
                            <span className="line reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
                                It's communication.
                            </span>
                        </h1>

                        <p className="about-hero-sub reveal-on-scroll" style={{ transitionDelay: '0.42s' }}>
                            Chatriwala started as one developer's refusal to ship anything
                            that felt templated. Every project since has been built on
                            the same belief — that clean code and thoughtful design aren't
                            separate disciplines, they're the same job done properly.
                        </p>

                        <div className="about-hero-divider reveal-on-scroll" style={{ transitionDelay: '0.5s' }} />

                        <p className="about-hero-philosophy reveal-on-scroll" style={{ transitionDelay: '0.58s' }}>
                            "We don't start with a template and fill in the blanks.
                            We start with what makes this project different — and build
                            outward from there."
                        </p>
                    </div>

                    <div className="about-hero-visual reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
                        <div className="about-hero-portrait-frame">
                            <img src={portrait} alt="Abdul Rafay Chatriwala" className="about-hero-portrait" />
                            <div className="about-hero-portrait-overlay" aria-hidden="true" />
                        </div>

                        <div className="about-hero-tag">
                            <span className="about-hero-tag-dot" />
                            Founder &amp; Lead Developer
                        </div>

                        <div className="about-hero-line-accent" aria-hidden="true" />
                    </div>
                </div>

                <div className="about-hero-scroll-cue reveal-on-scroll" style={{ transitionDelay: '0.7s' }}>
                    <span>Scroll to read our story</span>
                    <span className="about-hero-scroll-line" />
                </div>
            </section>
        </main>
    )
}