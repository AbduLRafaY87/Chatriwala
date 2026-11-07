import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase'
import staticBlogs from '../data/blogData'

const normalizeBlog = (snapshot) => {
    const data = snapshot.data()
    const date = data.date || data.publishedAt?.toDate?.().toISOString() || data.createdAt?.toDate?.().toISOString()

    return {
        ...data,
        id: snapshot.id,
        img: data.coverImage || data.img || '',
        date,
        writer: data.writer || 'Abdul Rafay',
        writerImg: data.writerImg || staticBlogs[0]?.writerImg || '',
        readTime: data.readTime || Math.max(1, Math.ceil((data.content || '').trim().split(/\s+/).length / 200)),
    }
}

export default function useBlogs() {
    const [blogs, setBlogs] = useState(staticBlogs)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(isFirebaseConfigured)

    useEffect(() => {
        if (!isFirebaseConfigured || !db) {
            setLoading(false)
            return undefined
        }

        return onSnapshot(
            query(collection(db, 'blogs'), where('status', '==', 'published')),
            (snapshot) => {
                const cloudBlogs = snapshot.docs.map(normalizeBlog)
                setBlogs([...staticBlogs, ...cloudBlogs])
                setError('')
                setLoading(false)
            },
            (snapshotError) => {
                console.error('Unable to load published blogs:', snapshotError)
                setError('New articles could not be loaded. Showing the available articles instead.')
                setLoading(false)
            },
        )
    }, [])

    return { blogs, error, loading }
}
