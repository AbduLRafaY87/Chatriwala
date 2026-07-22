import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import blogs from '../../data/blogData'
import './BlogsPage.css'

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function BlogsPage() {
    const [activeTopic, setActiveTopic] = useState('all')

    const sorted = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date))
    const featured = sorted[0]
    const rest = sorted.slice(1)

    const topics = ['all', ...new Set(blogs.map((b) => b.category))]
    const visible = activeTopic === 'all' ? rest : rest.filter((b) => b.category === activeTopic)

    const handleGlow = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--gx', `${e.clientX - rect.left}px`)
        card.style.setProperty('--gy', `${e.clientY - rect.top}px`)
    }

    return (
        <main className="blogs-page">
            {/* ---- Hero ---- */}
            <section className="blogs-hero">
                <div className="blogs-grid-overlay" aria-hidden="true" />
                <span className="blogs-bg-text" aria-hidden="true">JOURNAL</span>

                <div className="blogs-hero-inner">
                    <p className="blogs-eyebrow">// notes from the journey</p>
                    <h1 className="blogs-hero-headline">
                        Ideas, experiments
                        <span className="blogs-hero-accent">&amp; lessons learned.</span>
                    </h1>
                    <p className="blogs-hero-sub">
                        A space for what I learn, build, and figure out along the way —
                        not polished takeaways, just the actual process.
                    </p>
                </div>
            </section>

            {/* ---- Featured story ---- */}
            <section className="blogs-featured-wrap">
                <Link
                    to={`/blogs/${featured.id}`}
                    className="blogs-featured"
                    onMouseMove={handleGlow}
                >
                    <div className="blogs-featured-glow" aria-hidden="true" />
                    <div className="blogs-featured-media">
                        <img src={featured.img} alt={featured.title} loading="lazy" />
                        <span className="blogs-featured-tag">Latest</span>
                    </div>
                    <div className="blogs-featured-panel">
                        <span className="blogs-featured-category">{featured.category}</span>
                        <h2 className="blogs-featured-title">{featured.title}</h2>
                        <p className="blogs-featured-excerpt">{featured.excerpt}</p>
                        <div className="blogs-featured-meta">
                            <img src={featured.writerImg} alt={featured.writer} className="blogs-avatar" />
                            <div>
                                <span className="blogs-meta-name">{featured.writer}</span>
                                <span className="blogs-meta-sub">
                                    {formatDate(featured.date)} · {featured.readTime} min read
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* ---- Topic cloud (not filter buttons) ---- */}
            <section className="blogs-body">
                <div className="blogs-topics">
                    <span className="blogs-topics-label">Browse by</span>
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            type="button"
                            className={`blogs-topic-word ${activeTopic === topic ? 'is-active' : ''}`}
                            onClick={() => setActiveTopic(topic)}
                        >
                            {topic === 'all' ? 'Everything' : topic}
                        </button>
                    ))}
                </div>

                {/* ---- Editorial asymmetric grid ---- */}
                <div className="blogs-grid">
                    {visible.map((post, i) => (
                        <Link
                            to={`/blogs/${post.id}`}
                            key={post.id}
                            className={`blog-card ${i === 0 && visible.length > 2 ? 'is-wide' : ''}`}
                            style={{ transitionDelay: `${(i % 6) * 0.06}s` }}
                            onMouseMove={handleGlow}
                        >
                            <div className="blog-card-glow" aria-hidden="true" />
                            <div className="blog-card-media">
                                <img src={post.img} alt={post.title} loading="lazy" />
                            </div>
                            <div className="blog-card-body">
                                <div className="blog-card-meta-row">
                                    <span className="blog-card-category">{post.category}</span>
                                    <span className="blog-card-readtime">{post.readTime} min</span>
                                </div>
                                <h3 className="blog-card-title">{post.title}</h3>
                                <p className="blog-card-excerpt">{post.excerpt}</p>
                                <span className="blog-card-date">{formatDate(post.date)}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {visible.length === 0 && (
                    <p className="blogs-empty">No articles in this topic yet.</p>
                )}
            </section>

            {/* ---- Stay connected ---- */}
            <section className="blogs-newsletter">
                <p className="blogs-eyebrow">// stay curious</p>
                <h3 className="blogs-newsletter-headline">
                    Fresh ideas,
                    <span className="blogs-newsletter-accent">delivered occasionally.</span>
                </h3>
                <a href="mailto:hello@archatriwala.com" className="blogs-newsletter-cta">
                    <span>Follow the journey</span>
                    <span aria-hidden="true">→</span>
                </a>
            </section>

            {/* ---- Closing ---- */}
            <section className="blogs-closing">
                <p className="blogs-closing-text">
                    Learning never really ends —
                    <span className="blogs-closing-accent"> the best ideas are still ahead.</span>
                </p>
                <Link to="/projects" className="blogs-closing-link">
                    See what I've built with them <span aria-hidden="true">→</span>
                </Link>
            </section>
        </main>
    )
}