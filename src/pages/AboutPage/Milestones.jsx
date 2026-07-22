import React, { useEffect, useRef } from 'react'
// import './Milestones.css'

// Corrected "School of Leadershop" → "School Of Leadership" to match the rest of the site.
// Description/achievements below are drafted from your notes — flagged for your review after the code.
const journeyData = [
    {
        version: "v3.0",
        company: "School Of Leadership",
        role: "Lead Developer",
        dates: "Jan 2026 – May 2026",
        year: "2026",
        description: "Led the shift away from manual, email-based project tracking toward a structured development pipeline for the team.",
        added: ["Replaced ad-hoc email workflows with a defined pipeline", "Improved team coordination and delivery consistency"],
        status: "completed",
    },
    {
        version: "v2.1",
        company: "ConnectHear",
        role: "Full-Stack Developer Intern",
        dates: "Jun 2025 – Jul 2025",
        year: "2025",
        description: "Built a web app for hearing-impaired users using React and Node.js.",
        added: ["Real-time transcription feature", "Performance optimization pass", "Accessibility-focused UX improvements"],
        status: "completed",
    },
    {
        version: "v2.0",
        company: "Prime Creators",
        role: "Co-Founder",
        dates: "2024 — Present",
        year: "2024",
        description: "Leading a creative agency delivering branding and web solutions for real clients.",
        added: ["Launched multiple client projects", "Built a recurring client base", "Set technical direction for the studio"],
        status: "ongoing",
    },
    {
        version: "v1.1",
        company: "Mughal Collegiate",
        role: "Course Instructor",
        dates: "2023 – 2024",
        year: "2023",
        description: "Taught web development and design fundamentals using modern tools and hands-on projects.",
        added: ["Mentored 100+ students", "Several mentees now working in tech"],
        status: "completed",
    },
    {
        version: "v1.0",
        company: "TechTics Club",
        role: "Web Developer Intern",
        dates: "2022 – 2023",
        year: "2022",
        description: "Improved the club's website and implemented responsive features across the board.",
        added: ["Responsive layout overhaul", "20% lift in engagement from UX improvements"],
        status: "completed",
    },
]

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
            { threshold: 0.2 }
        )
        items.forEach((item) => observer.observe(item))
        return () => observer.disconnect()
    }, [])
    return ref
}

const Milestones = () => {
    const sectionRef = useRevealOnScroll()
    const railRef = useRef(null)
    const progressRef = useRef(null)

    // Fills the rail progress line based on scroll position within the section
    useEffect(() => {
        const rail = railRef.current
        const progress = progressRef.current
        if (!rail || !progress) return

        const onScroll = () => {
            const rect = rail.getBoundingClientRect()
            const viewportH = window.innerHeight
            const total = rect.height
            const scrolled = Math.min(Math.max(viewportH * 0.6 - rect.top, 0), total)
            const pct = total > 0 ? (scrolled / total) * 100 : 0
            progress.style.height = `${pct}%`
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <section className="milestones-section" ref={sectionRef}>
            <div className="milestones-grid-overlay" aria-hidden="true" />

            <div className="milestones-inner">
                <div className="milestones-header reveal-on-scroll">
                    <p className="milestones-eyebrow">// CHANGELOG.md</p>
                    <h2 className="milestones-headline">
                        The build log
                        <span className="milestones-headline-accent">of a career.</span>
                    </h2>
                    <p className="milestones-sub">
                        Every role has shipped something — here's the version history.
                    </p>
                </div>

                <div className="milestones-rail" ref={railRef}>
                    <div className="milestones-rail-track" aria-hidden="true">
                        <div className="milestones-rail-progress" ref={progressRef} />
                    </div>

                    {journeyData.map((entry, i) => (
                        <div
                            key={entry.version}
                            className="milestone-row reveal-on-scroll"
                            style={{ transitionDelay: `${i * 0.08}s` }}
                        >
                            <span className="milestone-year-bg" aria-hidden="true">{entry.year}</span>

                            <div className="milestone-marker">
                                <span className={`milestone-marker-dot ${entry.status === 'ongoing' ? 'is-ongoing' : ''}`} />
                            </div>

                            <div className="milestone-card">
                                <div className="milestone-card-header">
                                    <span className="milestone-version">{entry.version}</span>
                                    <span className="milestone-dates">{entry.dates}</span>
                                    {entry.status === 'ongoing' && (
                                        <span className="milestone-live-tag">
                                            <span className="milestone-live-dot" /> ongoing
                                        </span>
                                    )}
                                </div>

                                <h3 className="milestone-role">{entry.role}</h3>
                                <p className="milestone-company">{entry.company}</p>
                                <p className="milestone-desc">{entry.description}</p>

                                <ul className="milestone-added">
                                    {entry.added.map((line) => (
                                        <li key={line}>
                                            <span className="milestone-added-plus">+</span> {line}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Milestones