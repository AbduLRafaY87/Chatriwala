import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import projects from '../../data/projects'
import './ProjectsPage.css'
import PageSEO from '../../components/common/PageSEO.jsx'
import { routeSeo } from '../../seo/routeSeo'

const CATEGORIES = ['All', ...new Set(projects.map((p) => p.category))]
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const useRevealOnScroll = (deps = []) => {
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
            { threshold: 0.12 }
        )
        items.forEach((item) => observer.observe(item))
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
    return ref
}

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const gridRef = useRevealOnScroll([activeCategory])

    const visible = activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory)

    const handleGlow = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--gx', `${e.clientX - rect.left}px`)
        card.style.setProperty('--gy', `${e.clientY - rect.top}px`)
    }

    return (
        <>
            <PageSEO
                pageKey="projects"
                title={routeSeo.projects.title}
                description={routeSeo.projects.description}
                url={routeSeo.projects.canonical}
                type="CollectionPage"
                robots={routeSeo.projects.robots}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'Projects & Case Studies',
                    url: 'https://archatriwala.com/projects',
                    description: routeSeo.projects.description
                }}
            />
        <main className="projects-page">
            {/* ---- Hero ---- */}
            <section className="projects-page-hero">
                <div className="projects-page-grid-overlay" aria-hidden="true" />
                <span className="projects-page-bg-text" aria-hidden="true">ARCHIVE</span>

                <div className="projects-page-hero-inner">
                    <p className="projects-page-eyebrow">// the full collection</p>
                    <h1 className="projects-page-headline">
                        Every project,
                        <span className="projects-page-headline-accent">one page at a time.</span>
                    </h1>
                    <p className="projects-page-sub">
                        {projects.length} builds — portfolios, e-commerce, tools, and everything
                        in between. Filter by type or scroll the whole archive.
                    </p>
                </div>
            </section>

            {/* ---- Filterable grid ---- */}
            <section className="projects-page-body" ref={gridRef}>
                <div className="projects-page-filters reveal-on-scroll">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`projects-page-filter ${activeCategory === cat ? 'is-active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat === 'All' ? 'All' : capitalize(cat)}
                        </button>
                    ))}
                    <span className="projects-page-count">{visible.length} shown</span>
                </div>

                <div className="projects-page-grid">
                    {visible.map((project, i) => (
                        <Link
                            to={`/projects/${project.slug}`}
                            key={project.slug}
                            className="project-tile reveal-on-scroll"
                            style={{ transitionDelay: `${(i % 6) * 0.06}s` }}
                            onMouseMove={handleGlow}
                        >
                            <div className="project-tile-glow" aria-hidden="true" />
                            <div className="project-tile-media">
                                <img src={project.image} alt={project.title} loading="lazy" />
                                <span className="project-tile-tag">Live</span>
                            </div>
                            <div className="project-tile-body">
                                <div className="project-tile-meta">
                                    <span className="project-tile-category">{capitalize(project.category)}</span>
                                    <span className="project-tile-arrow" aria-hidden="true">→</span>
                                </div>
                                <h3 className="project-tile-title">{project.title}</h3>
                                <p className="project-tile-desc">{project.description}</p>
                                <div className="project-tile-stack">
                                    {project.techStack.map((t) => (
                                        <span key={t} className="tech-badge tech-badge-sm">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {visible.length === 0 && (
                    <p className="projects-page-empty">No projects in this category yet.</p>
                )}
            </section>

            {/* ---- Closing ---- */}
        </main>
        </>

    )
}