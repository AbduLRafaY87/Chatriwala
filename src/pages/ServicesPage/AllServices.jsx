import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import servicesData, { serviceCategories } from '../../data/servicesData'
// import './AllServices.css'

// The two services that anchor the page — core offerings get the large treatment,
// everything else finds its size based on how central it is to the practice.
const FEATURED_IDS = [1, 5]
const MEDIUM_IDS = [2, 4, 9]

const getWeight = (id) => {
    if (FEATURED_IDS.includes(id)) return 'large'
    if (MEDIUM_IDS.includes(id)) return 'medium'
    return 'small'
}

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
            { threshold: 0.1 }
        )
        items.forEach((item) => observer.observe(item))
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
    return ref
}

const AllServices = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [expandedId, setExpandedId] = useState(null)
    const gridRef = useRevealOnScroll([activeCategory])

    const visible = activeCategory === 'all'
        ? servicesData
        : servicesData.filter((s) => s.category === activeCategory)

    const handleSpotlight = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--sx', `${e.clientX - rect.left}px`)
        card.style.setProperty('--sy', `${e.clientY - rect.top}px`)
    }

    const toggleExpand = (id) => {
        setExpandedId((prev) => (prev === id ? null : id))
    }

    return (
        <section className="services-grid-section" ref={gridRef}>
            <div className="services-grid-overlay" aria-hidden="true" />
            {/* <span className="services-grid-bg-text" aria-hidden="true">CAPABILITIES</span> */}

            <div className="services-grid-inner">
                <div className="services-grid-header reveal-on-scroll">
                    {/* <p className="services-grid-eyebrow">// what I can build</p>
                    <h2 className="services-grid-headline">
                        Every service is a piece
                        <span className="services-grid-headline-accent">of the same product.</span>
                    </h2> */}
                    <p className="services-grid-sub">
                        Fifteen capabilities, one practice — pick a category or scroll
                        the full range.
                    </p>
                </div>

                {/* Category filters */}
                <div className="services-grid-filters reveal-on-scroll" role="tablist">
                    {serviceCategories.map((cat) => (
                        <button
                            key={cat.id}
                            role="tab"
                            type="button"
                            aria-selected={activeCategory === cat.id}
                            className={`services-grid-filter ${activeCategory === cat.id ? 'is-active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Bento grid */}
                <div className="services-grid-wall" key={activeCategory}>
                    {visible.map((service, i) => {
                        const Icon = service.icon
                        const weight = getWeight(service.id)
                        const isExpanded = expandedId === service.id
                        const isFeatured = FEATURED_IDS.includes(service.id)

                        return (
                            <div
                                key={service.id}
                                className={`weight-${weight} reveal-on-scroll`}
                                style={{ transitionDelay: `${(i % 8) * 0.05}s` }}
                            >
                                <button
                                    type="button"
                                    className={`service-card ${isExpanded ? 'is-expanded' : ''} ${isFeatured ? 'is-featured' : ''}`}
                                    style={{ height: '100%' }}
                                    onMouseMove={handleSpotlight}
                                    onClick={() => toggleExpand(service.id)}
                                    aria-expanded={isExpanded}
                                >
                                    <div className="service-card-spotlight" aria-hidden="true" />

                                    <span className="service-card-index" aria-hidden="true">
                                        {String(service.id).padStart(2, '0')}
                                    </span>

                                    <div className="service-card-top">
                                        <div className="service-card-icon">
                                            <Icon size={weight === 'large' ? 30 : 24} strokeWidth={1.6} aria-hidden="true" />
                                        </div>
                                        {isFeatured && <span className="service-card-tag">Core Offering</span>}
                                    </div>

                                    <h3 className="service-card-title">{service.title}</h3>
                                    <p className="service-card-text">{service.text}</p>

                                    <div className="service-card-details">
                                        <p className="service-card-desc">{service.description}</p>
                                        <ul className="service-card-features">
                                            {service.features.map((f) => (
                                                <li key={f}>{f}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="service-card-footer">
                                        <span className="service-card-price">{service.price}</span>
                                        <span className="service-card-toggle">
                                            {isExpanded ? 'Show less' : 'Learn more'}
                                            <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        )
                    })}
                </div>

                {/* Closing CTA */}
                <div className="services-grid-closing reveal-on-scroll">
                    <p className="services-grid-closing-eyebrow">// none of these quite fit?</p>
                    <h3 className="services-grid-closing-headline">
                        Need something custom?
                        <span className="services-grid-closing-accent">Let's build it together.</span>
                    </h3>
                    <Link to="/contact" className="services-grid-cta">
                        <span>Start a Project</span>
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AllServices