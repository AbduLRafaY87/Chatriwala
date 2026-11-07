import { useEffect, useMemo, useState } from 'react'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Link } from 'react-router-dom'
import { ArrowLeft, ImagePlus, LogOut, Pencil, Plus, Save, Trash2 } from 'lucide-react'
import { ADMIN_EMAILS, auth, db, isFirebaseConfigured, storage } from '../../lib/firebase'
import './AdminPage.css'

const emptyPost = {
    title: '',
    slug: '',
    excerpt: '',
    category: '',
    tags: '',
    coverImage: '',
    content: '',
    youtubeUrl: '',
    status: 'draft',
}

const makeSlug = (value) => value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const formatDate = (value) => {
    if (!value) return 'Not published'
    const date = value?.toDate ? value.toDate() : new Date(value)
    return Number.isNaN(date.getTime())
        ? 'Not published'
        : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function AdminPage() {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)
    const [posts, setPosts] = useState([])
    const [form, setForm] = useState(emptyPost)
    const [editingId, setEditingId] = useState('')
    const [coverFile, setCoverFile] = useState(null)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState(ADMIN_EMAILS[0]?.startsWith('REPLACE_') ? '' : ADMIN_EMAILS[0])
    const [busy, setBusy] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const imagePreview = useMemo(() => coverFile ? URL.createObjectURL(coverFile) : '', [coverFile])

    const authorized = useMemo(
        () => user?.emailVerified && ADMIN_EMAILS.some((admin) => admin.toLowerCase() === user.email?.toLowerCase()),
        [user],
    )

    useEffect(() => {
        if (!auth) {
            setAuthReady(true)
            return undefined
        }

        return onAuthStateChanged(auth, (nextUser) => {
            setUser(nextUser)
            setAuthReady(true)
        })
    }, [])

    useEffect(() => () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview)
    }, [imagePreview])

    useEffect(() => {
        if (!authorized || !db) return undefined

        return onSnapshot(
            collection(db, 'blogs'),
            (snapshot) => setPosts(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
                .sort((a, b) => (b.updatedAt?.toMillis?.() || 0) - (a.updatedAt?.toMillis?.() || 0))),
            (snapshotError) => {
                console.error('Unable to load admin articles:', snapshotError)
                setError('Could not load articles. Check the Firestore security rules and Firebase connection.')
            },
        )
    }, [authorized])

    const resetForm = () => {
        setEditingId('')
        setForm(emptyPost)
        setCoverFile(null)
    }

    const updateForm = (event) => {
        const { name, value } = event.target
        setForm((current) => ({
            ...current,
            [name]: value,
            ...(name === 'title' && !editingId ? { slug: makeSlug(value) } : {}),
        }))
    }

    const editPost = (post) => {
        setEditingId(post.id)
        setCoverFile(null)
        setForm({
            ...emptyPost,
            ...post,
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
        })
        setError('')
        setMessage('')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        setBusy(true)
        setError('')
        try {
            const result = await signInWithEmailAndPassword(auth, email.trim(), password)
            if (!result.user.emailVerified || !ADMIN_EMAILS.some((admin) => admin.toLowerCase() === result.user.email?.toLowerCase())) {
                await signOut(auth)
                setError('This verified account is not on the admin allowlist.')
            }
        } catch (loginError) {
            console.error('Admin sign-in failed:', loginError)
            setError('Sign-in failed. Check your email, password, and Firebase Authentication settings.')
        } finally {
            setBusy(false)
        }
    }

    const handleSave = async (event) => {
        event.preventDefault()
        setError('')
        setMessage('')
        const slug = makeSlug(form.slug || form.title)
        if (!slug) {
            setError('Add a title or a valid URL slug before saving.')
            return
        }
        if (!form.coverImage && !coverFile) {
            setError('Add a cover image URL or choose an image to upload.')
            return
        }
        if (coverFile && (!coverFile.type.startsWith('image/') || coverFile.size > 5 * 1024 * 1024)) {
            setError('Choose an image smaller than 5 MB.')
            return
        }

        setBusy(true)
        try {
            let coverImage = form.coverImage.trim()
            if (coverFile) {
                const imageRef = ref(storage, `blog-covers/${slug}/${Date.now()}-${coverFile.name.replace(/[^\w.-]/g, '-')}`)
                const result = await uploadBytes(imageRef, coverFile, { contentType: coverFile.type })
                coverImage = await getDownloadURL(result.ref)
            }

            const now = new Date().toISOString()
            const post = {
                title: form.title.trim(),
                slug,
                excerpt: form.excerpt.trim(),
                category: form.category.trim(),
                tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
                coverImage,
                content: form.content.trim(),
                youtubeUrl: form.youtubeUrl.trim(),
                status: form.status,
                writer: user.displayName || 'Abdul Rafay',
                readTime: Math.max(1, Math.ceil(form.content.trim().split(/\s+/).filter(Boolean).length / 200)),
                date: form.status === 'published' ? (form.date || now) : (form.date || ''),
                updatedAt: serverTimestamp(),
                ...(form.status === 'published' ? { publishedAt: now } : {}),
            }
            await setDoc(doc(db, 'blogs', editingId || slug), post)
            setMessage(form.status === 'published' ? 'Article published.' : 'Draft saved.')
            resetForm()
        } catch (saveError) {
            console.error('Unable to save article:', saveError)
            setError('Could not save this article. Check your connection, storage settings, and Firestore rules.')
        } finally {
            setBusy(false)
        }
    }

    const handleDelete = async (post) => {
        if (!window.confirm(`Permanently delete "${post.title}"?`)) return
        setError('')
        setMessage('')
        try {
            await deleteDoc(doc(db, 'blogs', post.id))
            if (editingId === post.id) resetForm()
            setMessage('Article deleted.')
        } catch (deleteError) {
            console.error('Unable to delete article:', deleteError)
            setError('Could not delete the article. Check the Firestore rules and try again.')
        }
    }

    if (!isFirebaseConfigured) {
        return (
            <main className="admin-page">
                <section className="admin-setup">
                    <p className="admin-kicker">BLOG CONTROL ROOM</p>
                    <h1>Connect your Firebase project</h1>
                    <p>To publish articles, add your Firebase web app settings and admin email to <code>src/lib/firebase.js</code>, then enable Email/Password sign-in, Firestore, and Storage.</p>
                    <Link to="/blogs" className="admin-secondary-link"><ArrowLeft size={16} /> Back to the blog</Link>
                </section>
            </main>
        )
    }

    if (!authReady) {
        return <main className="admin-page"><p className="admin-loading">Connecting to Firebase…</p></main>
    }

    if (!authorized) {
        return (
            <main className="admin-page">
                <form className="admin-login" onSubmit={handleLogin}>
                    <Link to="/blogs" className="admin-back-link"><ArrowLeft size={16} /> Back to blog</Link>
                    <p className="admin-kicker">PRIVATE WORKSPACE</p>
                    <h1>Welcome back.</h1>
                    <p className="admin-intro">Sign in with the verified Firebase account on your admin allowlist.</p>
                    {error && <p className="admin-alert is-error" role="alert">{error}</p>}
                    <label className="admin-field">Admin email
                        <input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    </label>
                    <label className="admin-field">Password
                        <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    </label>
                    <button className="admin-primary-button" disabled={busy || !auth}>
                        {busy ? 'Signing in…' : 'Sign in to dashboard'}
                    </button>
                </form>
            </main>
        )
    }

    return (
        <main className="admin-page">
            <div className="admin-shell">
                <header className="admin-header">
                    <div>
                        <p className="admin-kicker">PRIVATE WORKSPACE</p>
                        <h1>Blog dashboard</h1>
                        <p className="admin-intro">Signed in as {user.email}. Only your admin account can publish.</p>
                    </div>
                    <div className="admin-header-actions">
                        <Link to="/blogs" className="admin-secondary-link"><ArrowLeft size={16} /> View blog</Link>
                        <button className="admin-logout" type="button" onClick={() => signOut(auth)}><LogOut size={16} /> Sign out</button>
                    </div>
                </header>

                {error && <p className="admin-alert is-error" role="alert">{error}</p>}
                {message && <p className="admin-alert is-success" role="status">{message}</p>}

                <div className="admin-layout">
                    <form className="admin-editor" onSubmit={handleSave}>
                        <div className="admin-editor-heading">
                            <div>
                                <p className="admin-kicker">{editingId ? 'UPDATE ARTICLE' : 'NEW ARTICLE'}</p>
                                <h2>{editingId ? 'Edit your story' : 'Write a story'}</h2>
                            </div>
                            {editingId && <button className="admin-text-button" type="button" onClick={resetForm}>Start a new post</button>}
                        </div>

                        <label className="admin-field">Title
                            <input name="title" value={form.title} onChange={updateForm} placeholder="A headline worth opening" required maxLength={120} />
                        </label>
                        <div className="admin-field-row">
                            <label className="admin-field">URL slug
                                <input name="slug" value={form.slug} onChange={updateForm} placeholder="your-article-slug" required readOnly={Boolean(editingId)} />
                            </label>
                            <label className="admin-field">Category
                                <input name="category" value={form.category} onChange={updateForm} placeholder="Technology" required />
                            </label>
                        </div>
                        <label className="admin-field">Short description
                            <textarea name="excerpt" value={form.excerpt} onChange={updateForm} placeholder="A concise summary for cards and search previews." rows="3" maxLength={240} required />
                        </label>
                        <label className="admin-field">Tags <span>(comma separated)</span>
                            <input name="tags" value={form.tags} onChange={updateForm} placeholder="React, design, learning" />
                        </label>

                        <div className="admin-field">
                            <span className="admin-label">Cover image</span>
                            <input name="coverImage" value={form.coverImage} onChange={updateForm} placeholder="Paste an image URL (or upload below)" />
                            <label className="admin-upload">
                                <ImagePlus size={18} />
                                <span>{coverFile ? coverFile.name : 'Choose an image · JPG, PNG, WebP · max 5 MB'}</span>
                                <input type="file" accept="image/*" onChange={(event) => setCoverFile(event.target.files?.[0] || null)} />
                            </label>
                        </div>
                        {(coverFile || form.coverImage) && (
                            <img className="admin-image-preview" src={imagePreview || form.coverImage} alt="Cover preview" />
                        )}

                        <label className="admin-field">YouTube video URL <span>(optional)</span>
                            <input name="youtubeUrl" type="url" value={form.youtubeUrl} onChange={updateForm} placeholder="https://www.youtube.com/watch?v=…" />
                        </label>
                        <label className="admin-field">Article body
                            <textarea name="content" className="admin-content-input" value={form.content} onChange={updateForm} placeholder={'Write your article here. Use blank lines to separate paragraphs.\n\nYou can add a YouTube video above.'} required />
                        </label>
                        <p className="admin-editor-hint">Reading time is estimated automatically. Add a YouTube URL to embed a video in the article.</p>
                        <div className="admin-editor-actions">
                            <label className="admin-field admin-status-field">Visibility
                                <select name="status" value={form.status} onChange={updateForm}>
                                    <option value="draft">Save as draft</option>
                                    <option value="published">Publish now</option>
                                </select>
                            </label>
                            <button className="admin-primary-button" disabled={busy}>
                                <Save size={17} /> {busy ? 'Saving…' : editingId ? 'Save changes' : 'Save article'}
                            </button>
                        </div>
                    </form>

                    <section className="admin-posts">
                        <div className="admin-editor-heading">
                            <div><p className="admin-kicker">YOUR LIBRARY</p><h2>Articles <span>{posts.length}</span></h2></div>
                            <button type="button" className="admin-add-button" onClick={resetForm} aria-label="Create a new post"><Plus size={19} /></button>
                        </div>
                        {posts.length === 0 && <p className="admin-empty">Your drafts and published posts will show up here.</p>}
                        <div className="admin-post-list">
                            {posts.map((post) => (
                                <article className="admin-post-row" key={post.id}>
                                    <div className="admin-post-thumb">
                                        {post.coverImage ? <img src={post.coverImage} alt="" /> : <ImagePlus size={19} />}
                                    </div>
                                    <div className="admin-post-info">
                                        <span className={`admin-post-status ${post.status === 'published' ? 'is-published' : ''}`}>{post.status || 'draft'}</span>
                                        <h3>{post.title}</h3>
                                        <p>{formatDate(post.date)}</p>
                                    </div>
                                    <div className="admin-post-actions">
                                        <button type="button" onClick={() => editPost(post)} aria-label={`Edit ${post.title}`}><Pencil size={16} /></button>
                                        <button type="button" onClick={() => handleDelete(post)} aria-label={`Delete ${post.title}`}><Trash2 size={16} /></button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}
