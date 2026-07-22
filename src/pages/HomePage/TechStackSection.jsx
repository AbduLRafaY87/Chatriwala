import React, { useState } from 'react'
import {
    Package, FileCode, Layout, Code2, Zap, Terminal, Database, Cloud,
    GitBranch, Settings, Palette, Wifi, Layers, Cpu
} from 'lucide-react'
import { techStackData } from '../../data/techStackData'

const ICONS = {
    Package, FileCode, Layout, Code2, Zap, Terminal, Database, Cloud,
    GitBranch, Settings, Palette, Wifi, Layers, Cpu
}

// Only the site's two accent colors — alternated per tile instead of per-brand hex
const TINTS = ['accent', 'accent-secondary']

const tierLabel = (proficiency) => {
    if (proficiency >= 90) return 'Core toolkit'
    if (proficiency >= 85) return 'Confident'
    return 'Familiar'
}

const tierSpan = (proficiency) => {
    if (proficiency >= 90) return 'tile-lg'
    if (proficiency >= 85) return 'tile-md'
    return 'tile-sm'
}

const TechStackSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeCategory = techStackData[activeIndex]

    return (
        <section className="techstack-section">
            <div className="techstack-grid-overlay" aria-hidden="true" />
            <span className="techstack-bg-text" aria-hidden="true">STACK</span>

            <div className="techstack-inner">
                <p className="techstack-eyebrow">// tools &amp; technologies</p>
                <h2 className="techstack-headline">
                    A toolkit built
                    <span className="techstack-headline-accent">for craft.</span>
                </h2>

                <div className="techstack-tabs" role="tablist" aria-label="Technology categories">
                    {techStackData.map((cat, i) => (
                        <button
                            key={cat.name}
                            role="tab"
                            type="button"
                            aria-selected={i === activeIndex}
                            className={`techstack-tab ${i === activeIndex ? 'is-active' : ''}`}
                            onClick={() => setActiveIndex(i)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <p className="techstack-category-desc">{activeCategory.description}</p>

                <div className="techstack-bento" key={activeCategory.name} role="tabpanel">
                    {activeCategory.technologies.map((tech, i) => {
                        const Icon = ICONS[tech.iconName] || Code2
                        const tint = TINTS[i % TINTS.length]
                        return (
                            <div
                                key={tech.name}
                                className={`techstack-tile ${tierSpan(tech.proficiency)}`}
                                style={{ animationDelay: `${i * 0.05}s` }}
                                tabIndex={0}
                            >
                                <div className={`techstack-icon-wrap tint-${tint}`}>
                                    <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                                </div>
                                <p className="techstack-tile-name">{tech.name}</p>
                                <span className="techstack-tile-tag">{tierLabel(tech.proficiency)}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default TechStackSection