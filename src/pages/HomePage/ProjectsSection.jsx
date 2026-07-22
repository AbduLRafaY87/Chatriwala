import React, { useEffect, useRef } from 'react'
import projects from '../../data/projects'
import { NavLink } from 'react-router-dom'
// import './ProjectsShowcaseSection.css'
// import P1 from "../../assets/projects/1.png"


// Curated selection & order — pulled from your real project data
const SHOWCASE_SLUGS = [
    'inbrowser-code-editor',
    'mun-website',
    'artist-premium-portfolio-website',
    // 'cosmetics-website',
    // 'dental-clinic-website',
]

const showcaseProjects = SHOWCASE_SLUGS
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean)

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const ProjectsShowcaseSection = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const node = sectionRef.current
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

    const handleGlow = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--gx', `${e.clientX - rect.left}px`)
        card.style.setProperty('--gy', `${e.clientY - rect.top}px`)
    }

    return (
        <section className="projects-section" ref={sectionRef}>
            <div className="projects-grid-overlay" aria-hidden="true" />
            <span className="projects-bg-text" aria-hidden="true">WORK</span>

            <div className="projects-inner">
                <div className="projects-header reveal-on-scroll">
                    <p className="projects-eyebrow">// selected work</p>
                    <h2 className="projects-headline">
                        A few stories
                        <span className="projects-headline-accent">worth telling.</span>
                    </h2>
                    <p className="projects-sub">
                        A short cut of the full archive — five projects that show the range,
                        not the whole picture.
                    </p>
                </div>

                <div className="projects-grid">
                    {/* <div className="project">
                        <div className="image">
                            <img src={P1} alt="Project 1" />
                        </div>
                        <div className="content">
                            <div>
                                <h3 className="project-title">Sana Sajjad Cosmetics</h3>
                                <p className="project-description">A cosmetics website Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum odit qui beatae reprehenderit ducimus aliquam, facere, rerum voluptates iusto vero molestias animi earum officiis consequuntur.</p>
                            </div>
                            <a href="https://sanasajjadcosmetics.netlify.app" className="project-link">View Project</a>
                        </div>
                    </div> */}
                    <div className="projects-grid">
                        {showcaseProjects.map((project, index) => (
                            <div
                                key={project.slug}
                                className="project reveal-on-scroll"
                                onMouseMove={handleGlow}
                            >
                                <span className="project-number">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="image">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="content">

                                    <div>
                                        <h3 className="project-title">{project.title}</h3>

                                        <p className="project-description">
                                            {project.description}
                                        </p>

                                        <div className="project-tech">
                                            {project.techStack.map((tech) => (
                                                <span key={tech} className="tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                    >
                                        View Project →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <NavLink to="/projects" className="projects-cta ">
                    Explore all projects →
                </NavLink>


            </div>
        </section >
    )
}

export default ProjectsShowcaseSection