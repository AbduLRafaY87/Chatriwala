import React, { useEffect, useRef, useState } from 'react'
import { reelsData, creatorProfile } from '../../data/reelsData'
import './InstagramShowcase.css'

const CATEGORIES = ['All', ...new Set(reelsData.map((r) => r.category))]

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

const InstagramShowcase = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const gridRef = useRevealOnScroll([activeCategory])

    const visible = activeCategory === 'All'
        ? reelsData
        : reelsData.filter((r) => r.category === activeCategory)

    const handleTilt = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.setProperty('--tiltX', `${y * -6}deg`)
        card.style.setProperty('--tiltY', `${x * 6}deg`)
    }
    const resetTilt = (e) => {
        e.currentTarget.style.setProperty('--tiltX', '0deg')
        e.currentTarget.style.setProperty('--tiltY', '0deg')
    }

    return (
        <section className="reels-section" ref={gridRef}>
            <div className="reels-grid-overlay" aria-hidden="true" />
            <span className="reels-bg-text" aria-hidden="true">TEACH</span>

            <div className="reels-inner">
                {/* ---- Header ---- */}
                <div className="reels-header reveal-on-scroll">
                    <p className="reels-eyebrow">// beyond the code</p>
                    <h2 className="reels-headline">
                        Design. Build.
                        <span className="reels-headline-accent">Teach.</span>
                    </h2>
                    <p className="reels-sub">
                        Short-form content on development, UI/UX, and the process behind
                        the polish — documenting the journey, not just the outcome.
                    </p>
                </div>

                {/* ---- Creator profile strip ---- */}
                <div className="reels-profile reveal-on-scroll">
                    <img src={creatorProfile.avatar} alt={creatorProfile.displayName} className="reels-avatar" />
                    <div className="reels-profile-info">
                        <div className="reels-profile-name-row">
                            <span className="reels-profile-name">{creatorProfile.displayName}</span>
                            <span className="reels-verified" title="Creator">✓</span>
                        </div>
                        <span className="reels-profile-handle">@{creatorProfile.username}</span>
                        <p className="reels-profile-bio">{creatorProfile.bio}</p>
                        <div className="reels-profile-tags">
                            {creatorProfile.focusTags.map((tag) => (
                                <span key={tag} className="reels-profile-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <a
                        href={creatorProfile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reels-follow-cta"
                    >
                        <span>Follow the Process</span>
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>

                {/* ---- Category filter ---- */}
                <div className="reels-filters reveal-on-scroll">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`reels-filter ${activeCategory === cat ? 'is-active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ---- Reel gallery ---- */}
                <div className="reels-gallery">
                    {visible.map((reel, i) => (
                        <a
                            key={reel.id}
                            href={reel.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reel-card reveal-on-scroll"
                            style={{ transitionDelay: `${(i % 6) * 0.06}s` }}
                            onMouseMove={handleTilt}
                            onMouseLeave={resetTilt}
                        >
                            <div className="reel-card-frame">
                                <div className="reel-card-notch" aria-hidden="true" />
                                <img src={reel.cover} alt={reel.title} loading="lazy" className="reel-card-cover" />
                                <div className="reel-card-scrim" aria-hidden="true" />

                                {reel.isLatest && <span className="reel-badge">Latest</span>}

                                <div className="reel-play-icon" aria-hidden="true">▶</div>

                                <div className="reel-card-overlay">
                                    <span className="reel-card-category">{reel.category}</span>
                                    <h3 className="reel-card-title">{reel.title}</h3>
                                    <p className="reel-card-desc">{reel.description}</p>
                                    {(reel.views || reel.likes) && (
                                        <div className="reel-card-stats">
                                            {reel.views && <span>{reel.views} views</span>}
                                            {reel.likes && <span>{reel.likes} likes</span>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* ---- Closing CTA ---- */}
                <div className="reels-closing reveal-on-scroll">
                    <p className="reels-closing-text">
                        More lessons, more experiments —
                        <span className="reels-closing-accent"> new content every week.</span>
                    </p>
                    <a
                        href={creatorProfile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reels-closing-cta"
                    >
                        <span>Discover More Ideas</span>
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default InstagramShowcase