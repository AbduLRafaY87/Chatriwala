import React, { useEffect, useRef, useState } from 'react'
import image from "../../assets/Herobg3.gif"

const ROLES = ["Brand Identity", "Web Experiences", "Motion Design", "Product Strategy"]

const HeroSection = () => {
    const heroRef = useRef(null)
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    // Typewriter effect for the terminal card
    useEffect(() => {
        const current = ROLES[roleIndex]
        let timeout

        if (!isDeleting && displayedText.length < current.length) {
            timeout = setTimeout(() => {
                setDisplayedText(current.slice(0, displayedText.length + 1))
            }, 55)
        } else if (!isDeleting && displayedText.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1400)
        } else if (isDeleting && displayedText.length > 0) {
            timeout = setTimeout(() => {
                setDisplayedText(current.slice(0, displayedText.length - 1))
            }, 30)
        } else if (isDeleting && displayedText.length === 0) {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % ROLES.length)
        }

        return () => clearTimeout(timeout)
    }, [displayedText, isDeleting, roleIndex])

    // Cursor-responsive glow behind the floating card
    const handleMouseMove = (e) => {
        const hero = heroRef.current
        if (!hero) return
        const rect = hero.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        hero.style.setProperty("--mx", `${x}%`)
        hero.style.setProperty("--my", `${y}%`)
    }

    // Magnetic CTA button
    const handleMagnetMove = (e) => {
        const btn = e.currentTarget
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
    }

    const resetMagnet = (e) => {
        e.currentTarget.style.transform = "translate(0, 0)"
    }

    return (
        <section className="hero-section" ref={heroRef} onMouseMove={handleMouseMove}>
            <div className="hero-grid-overlay" aria-hidden="true" />

            <div className="hero-inner">
                <div className="hero-content">
                    <p className="hero-eyebrow">// digital craftsmanship studio</p>

                    <h1 className="hero-headline">
                        We deliver work
                        <span className="hero-headline-accent">that makes a difference.</span>
                    </h1>

                    <p className="hero-sub">
                        A creative studio partnering with schools, businesses and changemakers to
                        design digital experiences that feel considered, not templated.
                    </p>

                    <div className="hero-actions">
                        <a
                            href="/projects"
                            className="hero-cta"
                            onMouseMove={handleMagnetMove}
                            onMouseLeave={resetMagnet}
                        >
                            <span>View Our Work</span>
                            <span className="hero-cta-arrow" aria-hidden="true">→</span>
                        </a>

                        <span className="hero-status">
                            <span className="hero-status-dot" />
                            Now booking new projects
                        </span>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-visual-frame" aria-hidden="true">
                        <img src={image} alt="" className="hero-background" />
                    </div>

                    {/* <div className="terminal-card">
                        <div className="terminal-card-header">
                            <span className="terminal-dot terminal-dot-red" />
                            <span className="terminal-dot terminal-dot-yellow" />
                            <span className="terminal-dot terminal-dot-green" />
                            <span className="terminal-card-title">craft.jsx</span>
                        </div>
                        <div className="terminal-card-body">
                            <p>
                                <span className="terminal-key">const</span>{" "}
                                <span className="terminal-var">focus</span> =
                            </p>
                            <p className="terminal-line">
                                "<span>{displayedText}</span>
                                <span className="terminal-cursor" />"
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="workedWith">
                <h3>Worked With</h3>
                <div className="worked-with-marquee">
                    <div className="worked-with-track">
                        <span>
                            School Of Leadership&nbsp;&nbsp;•&nbsp;&nbsp;TechTics Club&nbsp;&nbsp;•&nbsp;&nbsp;ConnectHear&nbsp;&nbsp;•&nbsp;&nbsp;Mughal Collegiate&nbsp;&nbsp;•&nbsp;&nbsp;Prime Creators&nbsp;&nbsp;•&nbsp;&nbsp;AKESP MUN&nbsp;&nbsp;•&nbsp;&nbsp;Amwaj&nbsp;&nbsp;•&nbsp;&nbsp;
                        </span>
                        <span aria-hidden="true">
                            School Of Leadership&nbsp;&nbsp;•&nbsp;&nbsp;TechTics Club&nbsp;&nbsp;•&nbsp;&nbsp;ConnectHear&nbsp;&nbsp;•&nbsp;&nbsp;Mughal Collegiate&nbsp;&nbsp;•&nbsp;&nbsp;Prime Creators&nbsp;&nbsp;•&nbsp;&nbsp;AKESP MUN&nbsp;&nbsp;•&nbsp;&nbsp;Amwaj&nbsp;&nbsp;•&nbsp;&nbsp;
                        </span>
                        <span>
                            School Of Leadership&nbsp;&nbsp;•&nbsp;&nbsp;TechTics Club&nbsp;&nbsp;•&nbsp;&nbsp;ConnectHear&nbsp;&nbsp;•&nbsp;&nbsp;Mughal Collegiate&nbsp;&nbsp;•&nbsp;&nbsp;Prime Creators&nbsp;&nbsp;•&nbsp;&nbsp;AKESP MUN&nbsp;&nbsp;•&nbsp;&nbsp;Amwaj&nbsp;&nbsp;•&nbsp;&nbsp;
                        </span>
                        <span aria-hidden="true">
                            School Of Leadership&nbsp;&nbsp;•&nbsp;&nbsp;TechTics Club&nbsp;&nbsp;•&nbsp;&nbsp;ConnectHear&nbsp;&nbsp;•&nbsp;&nbsp;Mughal Collegiate&nbsp;&nbsp;•&nbsp;&nbsp;Prime Creators&nbsp;&nbsp;•&nbsp;&nbsp;AKESP MUN&nbsp;&nbsp;•&nbsp;&nbsp;Amwaj&nbsp;&nbsp;•&nbsp;&nbsp;
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection