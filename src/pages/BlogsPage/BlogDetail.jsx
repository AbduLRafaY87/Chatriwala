import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import blogs from '../../data/blogData'
import PageSEO from '../../components/common/PageSEO.jsx'

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

const BlogDetail = () => {
    const { id } = useParams()
    const [progress, setProgress] = useState(0)
    const pageRef = useRef(null)

    const sorted = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date))
    const index = sorted.findIndex((b) => String(b.id) === id)
    const post = sorted[index]

    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement
            const scrolled = doc.scrollTop
            const height = doc.scrollHeight - doc.clientHeight
            setProgress(height > 0 ? (scrolled / height) * 100 : 0)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const node = pageRef.current
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
    }, [post])

    if (!post) return <Navigate to="/blogs" replace />

    const prevPost = sorted[(index - 1 + sorted.length) % sorted.length]
    const nextPost = sorted[(index + 1) % sorted.length]

    return (
        <>
            <PageSEO
                title={post.title}
                description={post.excerpt}
                url={`https://archatriwala.com/blogs/${post.id}`}
                type="Article"
                robots="index,follow"
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: post.title,
                    description: post.excerpt,
                    author: {
                        '@type': 'Person',
                        name: post.writer
                    },
                    datePublished: post.date,
                    image: `https://archatriwala.com${post.img}`,
                    url: `https://archatriwala.com/blogs/${post.id}`
                }}
            />
        <main className="blog-detail-page" ref={pageRef}>
            <div className="blogs-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

            {/* ---- Hero ---- */}
            <section className="blog-detail-hero">
                <div className="blogs-grid-overlay" aria-hidden="true" />
                <div className="blog-detail-hero-inner">
                    <Link to="/blogs" className="blog-detail-back reveal-on-scroll">
                        <span aria-hidden="true">←</span> All Articles
                    </Link>
                    <p className="blogs-eyebrow reveal-on-scroll">// {post.category}</p>
                    <h1 className="blog-detail-title reveal-on-scroll">{post.title}</h1>

                    <div className="blog-detail-meta reveal-on-scroll">
                        <img src={post.writerImg} alt={post.writer} className="blogs-avatar" />
                        <div>
                            <span className="blogs-meta-name">{post.writer}</span>
                            <span className="blogs-meta-sub">
                                {formatDate(post.date)} · {post.readTime} min read
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- Cover image ---- */}
            <section className="blog-detail-cover reveal-on-scroll">
                <img src={post.img} alt={post.title} width="1400" height="900" loading="eager" decoding="async" />
            </section>

            {/* ---- Article body ---- */}
            <article
                className="blog-detail-content reveal-on-scroll"
                dangerouslySetInnerHTML={{ __html: post.fullContent }}
            />

            {/* ---- Author note ---- */}
            <section className="blog-detail-author reveal-on-scroll">
                <img src={post.writerImg} alt={post.writer} className="blogs-avatar blogs-avatar-lg" />
                <div>
                    <p className="blog-detail-author-name">Written by {post.writer}</p>
                    <p className="blog-detail-author-sub">Sharing what gets learned along the way.</p>
                </div>
            </section>

            {/* ---- Prev / Next ---- */}
            <section className="blog-detail-nav reveal-on-scroll">
                <Link to={`/blogs/${prevPost.id}`} className="blog-nav-card">
                    <span className="blog-nav-label">← Previous</span>
                    <span className="blog-nav-title">{prevPost.title}</span>
                </Link>
                <Link to={`/blogs/${nextPost.id}`} className="blog-nav-card is-next">
                    <span className="blog-nav-label">Next →</span>
                    <span className="blog-nav-title">{nextPost.title}</span>
                </Link>
            </section>
        </main>
        </>
    )
}

export default BlogDetail