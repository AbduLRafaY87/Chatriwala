import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Check, Copy } from 'lucide-react'
import useBlogs from '../../hooks/useBlogs'
import PageSEO from '../../components/common/PageSEO.jsx'
import './BlogsPage.css'

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

const getYoutubeEmbedUrl = (value) => {
    if (!value) return ''
    try {
        const url = new URL(value)
        let id = ''
        if (url.hostname === 'youtu.be') id = url.pathname.slice(1)
        if (['www.youtube.com', 'youtube.com', 'm.youtube.com'].includes(url.hostname)) {
            id = url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]
        }
        return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : ''
    } catch {
        return ''
    }
}

const ArticleBody = ({ post }) => {
    if (post.fullContent) {
        return <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: post.fullContent }} />
    }

    const paragraphs = (post.content || '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)
    const videoUrl = getYoutubeEmbedUrl(post.youtubeUrl)

    return (
        <article className="blog-detail-content">
            {paragraphs.map((paragraph, index) => {
                if (paragraph.startsWith('## ')) return <h2 key={index}>{paragraph.slice(3)}</h2>
                if (paragraph.startsWith('### ')) return <h3 key={index}>{paragraph.slice(4)}</h3>
                if (paragraph.split('\n').every((line) => /^[-*]\s/.test(line))) {
                    return <ul key={index}>{paragraph.split('\n').map((line, itemIndex) => <li key={itemIndex}>{line.replace(/^[-*]\s/, '')}</li>)}</ul>
                }
                return <p key={index}>{paragraph.split('\n').map((line, lineIndex) => <React.Fragment key={lineIndex}>{lineIndex > 0 && <br />}{line}</React.Fragment>)}</p>
            })}
            {videoUrl && (
                <div className="blog-video-embed">
                    <iframe src={videoUrl} title={`${post.title} video`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
            )}
        </article>
    )
}

const BlogDetail = () => {
    const { id } = useParams()
    const [progress, setProgress] = useState(0)
    const [copied, setCopied] = useState(false)
    const pageRef = useRef(null)
    const { blogs, loading } = useBlogs()

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

    if (!post && loading) return <main className="blog-detail-page"><p className="blogs-empty">Loading article…</p></main>
    if (!post) return <Navigate to="/blogs" replace />

    const related = sorted.filter((blog) => blog.id !== post.id && blog.category === post.category).slice(0, 3)
    const canonicalImage = post.img?.startsWith('http') ? post.img : `https://archatriwala.com${post.img || ''}`

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
                    image: canonicalImage,
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
                {post.img && <img src={post.img} alt={post.title} width="1400" height="auto" loading="eager" decoding="async" />}
            </section>

            {/* ---- Article body ---- */}
            <div className="reveal-on-scroll"><ArticleBody post={post} /></div>

            {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div className="blog-detail-tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            )}
            <div className="blog-detail-share">
                <button type="button" onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(window.location.href)
                        setCopied(true)
                        window.setTimeout(() => setCopied(false), 1800)
                    } catch (shareError) {
                        console.error('Unable to copy article link:', shareError)
                    }
                }}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Link copied' : 'Copy article link'}</button>
            </div>

            {/* ---- Author note ---- */}
            <section className="blog-detail-author reveal-on-scroll">
                <img src={post.writerImg} alt={post.writer} className="blogs-avatar blogs-avatar-lg" />
                <div>
                    <p className="blog-detail-author-name">Written by {post.writer}</p>
                    <p className="blog-detail-author-sub">Sharing what gets learned along the way.</p>
                </div>
            </section>

            {/* ---- Prev / Next ---- */}
            {related.length > 0 && <section className="blog-related reveal-on-scroll">
                <p className="blogs-eyebrow">// keep exploring</p>
                <h2>More in {post.category}</h2>
                <div className="blog-related-grid">{related.map((blog) => (
                    <Link to={`/blogs/${blog.id}`} key={blog.id} className="blog-related-card">
                        {blog.img && <img src={blog.img} alt="" loading="lazy" />}
                        <span>{blog.category}</span><h3>{blog.title}</h3>
                    </Link>
                ))}</div>
            </section>}
        </main>
        </>
    )
}

export default BlogDetail