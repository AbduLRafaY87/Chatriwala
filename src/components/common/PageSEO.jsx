import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildMetadata, siteConfig } from '../../seo/metadata'
import StructuredData from './StructuredData'

const PageSEO = ({ pageKey, title, description, image, url, type, robots, schema, children }) => {
  const location = useLocation()
  const pageUrl = url || `${siteConfig.siteUrl}${location.pathname}`
  const metadata = buildMetadata({
    title: title || pageKey || siteConfig.defaultTitle,
    description: description || siteConfig.defaultDescription,
    image,
    url: pageUrl,
    type,
    robots,
    keywords: siteConfig.keywords
  })

  useEffect(() => {
    document.title = metadata.title

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', metadata.description)
    setMeta('robots', metadata.robots)
    setMeta('author', siteConfig.author)
    setMeta('keywords', metadata.keywords.join(', '))
    setMeta('theme-color', siteConfig.themeColor)
    setMeta('language', 'en')
    setMeta('viewport', 'width=device-width, initial-scale=1.0')
    setMeta('charset', 'UTF-8', 'charset')

    setMeta('og:title', metadata.openGraph.title, 'property')
    setMeta('og:description', metadata.openGraph.description, 'property')
    setMeta('og:image', metadata.openGraph.image, 'property')
    setMeta('og:url', metadata.openGraph.url, 'property')
    setMeta('og:type', metadata.openGraph.type, 'property')

    setMeta('twitter:card', metadata.twitter.card)
    setMeta('twitter:title', metadata.twitter.title)
    setMeta('twitter:description', metadata.twitter.description)
    setMeta('twitter:image', metadata.twitter.image)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', metadata.canonical)
  }, [metadata])

  return (
    <>
      {schema ? <StructuredData data={schema} /> : null}
      {children}
    </>
  )
}

export default PageSEO
