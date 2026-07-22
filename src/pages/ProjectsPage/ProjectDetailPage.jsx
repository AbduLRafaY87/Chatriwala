import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import projects from '../../data/projects'
// import './ProjectDetailPage.css'

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

// Splits the long description into 2–3 editorial "chapters" without inventing content —
// just breaking the real paragraph at natural sentence boundaries.
const splitIntoChapters = (text) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    const chunkSize = Math.ceil(sentences.length / 3) || 1
    const chapters = []
    for (let i = 0; i < sentences.length; i += chunkSize) {
        chapters.push(sentences.slice(i, i + chunkSize).join(' ').trim())
    }
    return chapters.filter(Boolean)
}

const CHAPTER_TITLES = ['The Brief', 'Under the Hood', 'The Result']

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

const ProjectDetailPage = () => {
    const { slug } = useParams()
    const pageRef = useRevealOnScroll()
    const heroRef = useRef(null)
    const frameRef = useRef(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    const index = projects.findIndex((p) => p.slug === slug)
    const project = projects[index]

    // Scroll progress bar + parallax frame scale — runs regardless of hook order concerns below
    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement
            const scrolled = doc.scrollTop
            const height = doc.scrollHeight - doc.clientHeight
            setScrollProgress(height > 0 ? (scrolled / height) * 100 : 0)

            if (frameRef.current) {
                const rect = frameRef.current.getBoundingClientRect()
                const vh = window.innerHeight
                const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
                const scale = 0.92 + progress * 0.08
                frameRef.current.style.transform = `scale(${scale})`
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleMagnet = (e) => {
        const btn = e.currentTarget
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
    }
    const resetMagnet = (e) => { e.currentTarget.style.transform = 'translate(0,0)' }

    if (!project) return <Navigate to="/projects" replace />

    const prevProject = projects[(index - 1 + projects.length) % projects.length]
    const nextProject = projects[(index + 1) % projects.length]
    const chapters = splitIntoChapters(project.longDescription)
    let hostname = ''
    try { hostname = new URL(project.liveLink).hostname } catch { hostname = project.liveLink }

    return (
        <main className="pd-page" ref={pageRef}>
            {/* Scroll progress bar */}
            <div className="pd-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

            {/* ---- Cinematic hero ---- */}
            <section className="pd-hero" ref={heroRef}>
                <div className="pd-hero-bg" style={{ backgroundImage: `url(${project.image})` }} aria-hidden="true" />
                <div className="pd-hero-scrim" aria-hidden="true" />
                <div className="pd-grid-overlay" aria-hidden="true" />
                <span className="pd-hero-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                </span>

                <div className="pd-hero-inner">
                    <Link to="/projects" className="pd-back reveal-on-scroll">
                        <span aria-hidden="true">←</span> All Projects
                    </Link>

                    <p className="pd-eyebrow reveal-on-scroll">// {capitalize(project.category)} case study</p>

                    <h1 className="pd-hero-title reveal-on-scroll">{project.title}</h1>

                    <p className="pd-hero-tagline reveal-on-scroll">{project.description}</p>

                    <div className="pd-hero-actions reveal-on-scroll">
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pd-cta"
                            onMouseMove={handleMagnet}
                            onMouseLeave={resetMagnet}
                        >
                            <span className="pd-cta-dot" />
                            <span>View Live Site</span>
                            <span aria-hidden="true">↗</span>
                        </a>
                        <div className="pd-hero-stack">
                            {project.techStack.map((t) => (
                                <span key={t} className="pd-chip">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pd-scroll-cue reveal-on-scroll" aria-hidden="true">
                    <span>Scroll</span>
                    <span className="pd-scroll-line" />
                </div>
            </section>

            {/* ---- Parallax framed showcase ---- */}
            <div className="besiders">
                <section className="pd-showcase">
                    <div className="pd-frame-wrap">
                        <div className="pd-frame" ref={frameRef}>
                            <div className="pd-frame-header">
                                <span className="pd-frame-dot dot-red" />
                                <span className="pd-frame-dot dot-yellow" />
                                <span className="pd-frame-dot dot-green" />
                                <span className="pd-frame-url">{hostname}</span>
                            </div>
                            <img src={project.image} alt={project.title} className="pd-frame-image" />
                        </div>
                    </div>
                </section>

                {/* ---- Editorial chapters ---- */}
                <section className="pd-chapters">
                    {chapters.map((text, i) => (
                        <div key={i} className="pd-chapter reveal-on-scroll">
                            <span className="pd-chapter-num" aria-hidden="true">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="pd-chapter-content">
                                <h2 className="pd-chapter-title">
                                    {CHAPTER_TITLES[i] || `Chapter ${i + 1}`}
                                </h2>
                                <p className="pd-chapter-text">{text}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {/* ---- Tech stack, elegant not colorful ---- */}
            <section className="pd-stack-section reveal-on-scroll">
                <p className="pd-eyebrow">// built with</p>
                <div className="pd-stack-cloud">
                    {project.techStack.map((t, i) => (
                        <span
                            key={t}
                            className="pd-stack-word"
                            style={{ transitionDelay: `${i * 0.05}s` }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            {/* ---- Pull quote ---- */}
            <section className="pd-pullquote reveal-on-scroll">
                <p>"{project.description}"</p>
            </section>

            {/* ---- Prev / Next ---- */}
            <section className="pd-nav reveal-on-scroll">
                <Link to={`/projects/${prevProject.slug}`} className="pd-nav-card">
                    <div className="pd-nav-media">
                        <img src={prevProject.image} alt={prevProject.title} loading="lazy" />
                    </div>
                    <span className="pd-nav-label">← Previous</span>
                    <span className="pd-nav-title">{prevProject.title}</span>
                </Link>
                <Link to={`/projects/${nextProject.slug}`} className="pd-nav-card is-next">
                    <div className="pd-nav-media">
                        <img src={nextProject.image} alt={nextProject.title} loading="lazy" />
                    </div>
                    <span className="pd-nav-label">Next →</span>
                    <span className="pd-nav-title">{nextProject.title}</span>
                </Link>
            </section>

            {/* ---- Closing ---- */}
            <section className="pd-closing reveal-on-scroll">
                <h2 className="pd-closing-headline">
                    Every project teaches
                    <span className="pd-closing-accent">something new.</span>
                </h2>
                <Link
                    to="/contact"
                    className="pd-cta pd-cta-lg"
                    onMouseMove={handleMagnet}
                    onMouseLeave={resetMagnet}
                >
                    <span>Let's build the next one</span>
                    <span aria-hidden="true">→</span>
                </Link>
            </section>
        </main>
    )
}

export default ProjectDetailPage