import React, { useEffect, useRef, useState } from 'react'

// Place these files under src/assets/recognition/ using the exact names below
import ibaWin from '../../assets/recognition/IBA_ProBattle_Hackathon_Winner_1st_Pos.jpeg'
import webDev1stCert from '../../assets/recognition/Web_Dev_1st_Pos_Certificate.jpeg'
import webDev1stTrophy from '../../assets/recognition/Web_Development_1st_Pos.jpeg'
import problemSolving from '../../assets/recognition/Problem_SOlving_Certificate.jpeg'
import academics2nd from '../../assets/recognition/Academics_2nd_Pos.jpeg'
import academics3rd from '../../assets/recognition/Academics_3rd_Pos.jpeg'
import academics1st from '../../assets/recognition/Academics_1st_Pos.jpeg'
import webDev3rd from '../../assets/recognition/Web_Dev_3rd_Pos_Certificate.jpeg'
import allShields from '../../assets/recognition/All_the_sheilds.jpeg'
import mos200 from '../../assets/recognition/MOS-200_Certificate.png'

const FILTERS = ['All', 'Hackathon Wins', 'Academic Honors', 'Competitions', 'Sports & Honors']

const exhibits = [
    {
        id: 'iba-probattle',
        title: "IBA ProBattle '26 — Web Development Winner",
        organization: "IBA Computer Science Society",
        year: "2026",
        category: "Hackathon Wins",
        tag: "Featured",
        description: "1st Position — Web Development, ProBattle'26, the flagship hackathon hosted by IBA's Computer Science Society.",
        images: [ibaWin],
        weight: "featured",
    },
    {
        id: 'mos-200',
        title: "MOS 200 — Microsoft Office Specialist",
        organization: "Microsoft",
        year: "2025",
        category: "Competitions",
        tag: "Specialist",
        description: "Microsoft Office Specialist (MOS) 200 certification, demonstrating proficiency in Microsoft Office applications.",
        images: [mos200],
        weight: "small",
    },
    
    {
        id: 'robofest-2025',
        title: "Robofest 2025 — Web Dev (HTML/CSS/JS) Using AI",
        organization: "TechTics Club · Beaconhouse PECHS Campus",
        year: "2025",
        category: "Hackathon Wins",
        tag: "1st Position",
        description: "Secured 1st Position building with AI-assisted web development tooling under competition conditions.",
        images: [webDev1stCert, webDev1stTrophy],
        weight: "medium",
    },
    {
        id: 'academics-2nd',
        title: "Excellence in Academics — 2nd Position",
        organization: "Mama Baby Care School",
        year: "2024",
        category: "Academic Honors",
        tag: "2nd Position",
        description: "Session 2023–24, presented during the school's 34th anniversary of academic excellence.",
        images: [academics2nd],
        weight: "small",
    },
    {
        id: 'academics-1st',
        title: "Academic Golden Trophy",
        organization: "Mama Baby Care School",
        year: "2022",
        category: "Academic Honors",
        tag: "Top Honor",
        description: "Presented under the management of Mrs. Shabih Zehra for academic performance, 2021–22 session.",
        images: [academics1st],
        weight: "medium",
    },
    {
        id: 'academics-3rd',
        title: "Excellence in Academics — 3rd Position",
        organization: "Mama Baby Care School",
        year: "2023",
        category: "Academic Honors",
        tag: "3rd Position",
        description: "Session marking the school's 30th anniversary of academic excellence.",
        images: [academics3rd],
        weight: "medium",
    },
    {
        id: 'robofest-2023',
        title: "Robofest 2023 — WebDev (HTML/CSS)",
        organization: "TechTics Club · Generation's School, South Campus",
        year: "2023",
        category: "Competitions",
        tag: "3rd Position",
        description: "Early competitive web development result — the first entry in a run that led to the ProBattle and Robofest 2025 wins.",
        images: [webDev3rd],
        weight: "small",
    },
    {
        id: 'shelf',
        title: "The School Trophy Shelf",
        organization: "Mama Baby Care School",
        year: "2021 – 2024",
        category: "Sports & Honors",
        tag: "3 Honors",
        description: "A shelf that grew one trophy at a time.",
        images: [allShields],
        weight: "medium",
        subItems: [
            { label: "MBCS Annual Sports — Winner", year: "2024" },
            { label: "Final Term Neatness Award", year: "2021–22" },
            { label: "Sports Day Trophies", year: "2021–23" },
        ],
    },
    {
        id: 'digital-learning',
        title: "Sitarey: National Digital Learning Competition",
        organization: "Knowledge Platform",
        year: "2024",
        category: "Competitions",
        tag: "Problem Solving",
        description: "Certificate of Appreciation for outstanding performance in the Problem Solving category, nationwide.",
        images: [problemSolving],
        weight: "small",
    },
    
]

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

const Recognition = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const sectionRef = useRevealOnScroll([activeFilter])

    const featured = exhibits.find((e) => e.weight === 'featured')
    const rest = exhibits.filter((e) => e.weight !== 'featured')
    const visible = activeFilter === 'All'
        ? rest
        : rest.filter((e) => e.category === activeFilter)

    const handleSpotlight = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--sx', `${e.clientX - rect.left}px`)
        card.style.setProperty('--sy', `${e.clientY - rect.top}px`)
    }

    return (
        <section className="recognition-section" ref={sectionRef}>
            <div className="recognition-grid-overlay" aria-hidden="true" />
            <span className="recognition-bg-text" aria-hidden="true">EARNED</span>

            <div className="recognition-inner">
                <div className="recognition-header reveal-on-scroll">
                    <p className="recognition-eyebrow">// the archive</p>
                    <h2 className="recognition-headline">
                        Recognition.
                        <span className="recognition-headline-accent">Earned, not given.</span>
                    </h2>
                    <p className="recognition-sub">
                        A running record of what's been shipped, judged, and awarded —
                        from a school competition table to a university stage.
                    </p>
                </div>

                {/* Featured spotlight */}
                {featured && (
                    <div
                        className="recognition-featured reveal-on-scroll"
                        onMouseMove={handleSpotlight}
                    >
                        <div className="recognition-featured-spotlight" aria-hidden="true" />
                        <div className="recognition-featured-media">
                            <img src={featured.images[0]} alt={featured.title} loading="lazy" />
                        </div>
                        <div className="recognition-featured-panel">
                            <span className="recognition-featured-tag">{featured.tag}</span>
                            <span className="recognition-featured-year">{featured.year}</span>
                            <h3 className="recognition-featured-title">{featured.title}</h3>
                            <p className="recognition-featured-org">{featured.organization}</p>
                            <p className="recognition-featured-desc">{featured.description}</p>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="recognition-filters reveal-on-scroll" role="tablist">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            role="tab"
                            type="button"
                            aria-selected={activeFilter === f}
                            className={`recognition-filter ${activeFilter === f ? 'is-active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Exhibition wall */}
                <div className="recognition-wall" key={activeFilter}>
                    {visible.map((item, i) => (
                        <div
                            key={item.id}
                            className={`recognition-card weight-${item.weight} reveal-on-scroll`}
                            style={{ transitionDelay: `${i * 0.06}s` }}
                            onMouseMove={handleSpotlight}
                        >
                            <div className="recognition-card-spotlight" aria-hidden="true" />

                            <div className={`recognition-card-media ${item.images.length > 1 ? 'is-diptych' : ''}`}>
                                {item.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={item.title} loading="lazy" />
                                ))}
                            </div>

                            <div className="recognition-card-body">
                                <div className="recognition-card-meta">
                                    <span className="recognition-card-tag">{item.tag}</span>
                                    <span className="recognition-card-year">{item.year}</span>
                                </div>
                                <h3 className="recognition-card-title">{item.title}</h3>
                                <p className="recognition-card-org">{item.organization}</p>

                                {item.subItems ? (
                                    <ul className="recognition-card-sublist">
                                        {item.subItems.map((sub) => (
                                            <li key={sub.label}>
                                                <span>{sub.label}</span>
                                                <span className="recognition-card-subyear">{sub.year}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="recognition-card-desc">{item.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing */}
                <div className="recognition-closing reveal-on-scroll">
                    <p className="recognition-closing-text">
                        Every achievement inspires the next —
                        <span className="recognition-closing-accent"> the collection keeps growing.</span>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Recognition