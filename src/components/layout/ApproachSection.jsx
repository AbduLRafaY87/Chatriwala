import React, { useEffect, useRef, useState } from 'react'
import './ApproachSection.css'

const STAGES = [
    {
        num: "01",
        title: "Discover",
        philosophy: "Every project starts with a question, not a template.",
        description: "Understanding the goal, the audience, and the constraint that actually matters before a single line of code exists.",
        outcome: "A clear brief, not a guess.",
    },
    {
        num: "02",
        title: "Design",
        philosophy: "Design is the argument. The interface is just where it's made.",
        description: "Turning the brief into layout, hierarchy, and interaction decisions — every choice justified, nothing decorative by default.",
        outcome: "A structure worth building.",
    },
    {
        num: "03",
        title: "Develop",
        philosophy: "Clean code isn't a preference. It's what lets a project outlive launch day.",
        description: "Building with modern, maintainable tooling — React, thoughtful architecture, performance considered from the first commit.",
        outcome: "Something that scales without dread.",
    },
    {
        num: "04",
        title: "Refine",
        philosophy: "The last ten percent is the only part visitors actually feel.",
        description: "Testing across devices, tightening animations, checking accessibility, catching the small things a rushed build would skip.",
        outcome: "Nothing left that feels unfinished.",
    },
    {
        num: "05",
        title: "Launch & Grow",
        philosophy: "Shipping isn't the finish line — it's the start of the feedback loop.",
        description: "Deploying with confidence, then watching how it's actually used and improving from there.",
        outcome: "A product that keeps getting better.",
    },
]

const ApproachSection = () => {
    const sectionRef = useRef(null)
    const stageRefs = useRef([])
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const updateActiveStage = () => {
            const centerY = window.innerHeight / 2
            let closestIndex = 0
            let closestDist = Infinity
            stageRefs.current.forEach((el, i) => {
                if (!el) return
                const rect = el.getBoundingClientRect()
                const dist = Math.abs(rect.top + rect.height / 2 - centerY)
                if (dist < closestDist) {
                    closestDist = dist
                    closestIndex = i
                }
            })
            setActiveIndex(closestIndex)
        }

        window.addEventListener('scroll', updateActiveStage, { passive: true })
        updateActiveStage()

        return () => {
            window.removeEventListener('scroll', updateActiveStage)
        }
    }, [])

    return (
        <section className="approach-section" ref={sectionRef}>
            <div className="approach-grid-overlay" aria-hidden="true" />

            <div className="approach-inner">
                <div className="approach-header">
                    <p className="approach-eyebrow">// how it gets built</p>
                    <h2 className="approach-headline">
                        Every great product
                        <span className="approach-headline-accent">starts with a process.</span>
                    </h2>
                    <p className="approach-sub">
                        Not a rigid checklist — five stages that each earn the next one.
                    </p>
                </div>

                <div className="approach-thread" aria-hidden="true">
                    <div
                        className="approach-thread-progress"
                        style={{ height: `${((activeIndex + 1) / STAGES.length) * 100}%` }}
                    />
                </div>

                <div className="approach-stages">
                    {STAGES.map((stage, i) => (
                        <div
                            key={stage.num}
                            ref={(el) => (stageRefs.current[i] = el)}
                            className={`approach-stage ${i === activeIndex ? 'is-active' : ''}`}
                        >
                            <span className="approach-stage-num" aria-hidden="true">{stage.num}</span>

                            <div className="approach-stage-content">
                                <div className="approach-stage-index-row">
                                    <span className="approach-stage-index">{stage.num}</span>
                                    <div className="approach-stage-line" />
                                </div>

                                <h3 className="approach-stage-title">{stage.title}</h3>

                                <p className="approach-stage-philosophy">"{stage.philosophy}"</p>

                                <p className="approach-stage-desc">{stage.description}</p>

                                <div className="approach-stage-outcome">
                                    <span className="approach-stage-outcome-label">Outcome</span>
                                    <span className="approach-stage-outcome-value">{stage.outcome}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="approach-closing">
                    <p className="approach-closing-text">
                        Great products aren't rushed —
                        <span className="approach-closing-accent"> they're crafted.</span>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ApproachSection
