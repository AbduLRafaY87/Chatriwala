import React, { useEffect, useRef } from 'react'
import photo from "../../assets/AboutPhoto.png" // save the uploaded headshot here
// import './AboutSection.css'

const VALUES = [
    { label: "Clean Code", detail: "Structured, maintainable, built to last past launch day." },
    { label: "Thoughtful UX", detail: "Every screen earns its place — nothing added just to fill space." },
    { label: "Creative Eye", detail: "Design decisions that feel considered, not templated." },
]

const HIGHLIGHTS = [
    { role: "Co-Founder", org: "Prime Creators", detail: "Leads the technical side — building fast, scalable web apps that solve real problems." },
    { role: "Web Developer Intern", org: "ConnectHear", detail: "Built accessible, user-friendly websites for the deaf and hard-of-hearing community." },
    { role: "Course Instructor", org: "Mughal Collegiate", detail: "Taught foundational digital and web development skills through hands-on lessons." },
]

const STACK = ["React.js", "JavaScript", "Tailwind CSS", "Vite", "Bootstrap", "Git/GitHub", "Node.js", "Express.js", "MongoDB", "Supabase", "Canva"]

const AboutSection = () => {
    const sectionRef = useRef(null)

    // Lightweight scroll-reveal — no libraries
    useEffect(() => {
        const node = sectionRef.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add('is-visible')
                    observer.disconnect()
                }
            },
            { threshold: 0.2 }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="about-section" ref={sectionRef}>
            <span className="about-bg-text" aria-hidden="true">ABOUT</span>

            <div className="about-inner">
                <div className="about-visual">
                    <div className="about-frame">
                        <div className="about-frame-header">
                            <span className="about-frame-dot about-frame-dot-red" />
                            <span className="about-frame-dot about-frame-dot-yellow" />
                            <span className="about-frame-dot about-frame-dot-green" />
                            <span className="about-frame-title">rafay.png</span>
                        </div>
                        <img src={photo} alt="Portrait of Abdul Rafay Chatriwala" className="about-photo" width="700" height="900" loading="lazy" decoding="async" />
                    </div>

                    <div className="about-badge about-badge-role">
                        <span className="about-badge-dot" />
                        Full-Stack Developer
                    </div>

                    <div className="about-badge about-badge-stat">
                        <span className="about-badge-number">30+</span>
                        {/* TODO: replace with real project count */}
                        <span className="about-badge-label">Projects Shipped</span>
                    </div>
                </div>

                <div className="about-content">
                    <p className="about-eyebrow">// about the founder</p>

                    <h2 className="about-headline">
                        Code is the medium.
                        <span className="about-headline-accent">Clarity is the craft.</span>
                    </h2>

                    <div className="about-story">
                        <p>
                            Abdul Rafay Chatriwala is a MERN stack developer and the
                            Founder of Chatriwala, where he leads the technical
                            side of building fast, scalable web applications that solve
                            real problems — not just ones that look good in a portfolio.
                        </p>
                        <p>
                            His work spans live code editors, automation tools, and
                            responsive client websites, including an internship at
                            ConnectHear building accessible experiences for the deaf and
                            hard-of-hearing community. Colleagues consistently point to
                            the same thing: clean code paired with a genuine eye for design.
                        </p>
                    </div>

                    <ul className="about-values">
                        {VALUES.map((v) => (
                            <li key={v.label} className="about-value-item">
                                <span className="about-value-marker">→</span>
                                <div>
                                    <p className="about-value-label">{v.label}</p>
                                    <p className="about-value-detail">{v.detail}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* <div className="about-highlights">
                        {HIGHLIGHTS.map((h) => (
                            <div key={h.org} className="about-highlight-card">
                                <p className="about-highlight-role">{h.role}</p>
                                <p className="about-highlight-org">{h.org}</p>
                                <p className="about-highlight-detail">{h.detail}</p>
                            </div>
                        ))}
                    </div> */}

                    {/* <div className="about-stack">
                        {STACK.map((tech) => (
                            <span key={tech} className="about-stack-chip">{tech}</span>
                        ))}
                    </div> */}

                    {/* <a href="/get-in-touch" className="about-cta">
                        <span>Let's build something</span>
                        <span className="about-cta-arrow" aria-hidden="true">→</span>
                    </a> */}
                </div>
            </div>
        </section>
    )
}

export default AboutSection