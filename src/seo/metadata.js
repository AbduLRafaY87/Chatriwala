export const siteConfig = {
  siteName: 'Chatriwala',
  siteUrl: 'https://archatriwala.com',
  defaultTitle: 'Abdul Rafay Chatriwala | Full-Stack Developer & Digital Product Studio',
  defaultDescription:
    'Abdul Rafay Chatriwala builds fast, accessible, and conversion-focused web experiences for brands, founders, and modern teams.',
  defaultImage: '/og-image.png',
  author: 'Abdul Rafay Chatriwala',
  themeColor: '#06070b',
  keywords: [
    'Abdul Rafay Chatriwala',
    'full stack developer Pakistan',
    'web development Karachi',
    'React developer',
    'UI design',
    'SEO expert',
    'digital products'
  ],
  organization: {
    name: 'Chatriwala',
    url: 'https://archatriwala.com',
    logo: 'https://archatriwala.com/logo.png',
    sameAs: [
      'https://www.linkedin.com/in/abdul-rafay-sajjad/',
      'https://github.com/AbduLRafaY87/',
      'https://instagram.com/rafay.guides'
    ]
  }
}

export const buildMetadata = ({
  title,
  description,
  image = siteConfig.defaultImage,
  url,
  type = 'website',
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  keywords = siteConfig.keywords
}) => {
  const pageTitle = title.includes(siteConfig.siteName) ? title : `${title} | ${siteConfig.siteName}`
  const pageUrl = url || `${siteConfig.siteUrl}/`
  return {
    title: pageTitle,
    description,
    canonical: pageUrl,
    robots,
    keywords,
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      type,
      image: `${siteConfig.siteUrl}${image.startsWith('/') ? image : `/${image}`}`
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      image: `${siteConfig.siteUrl}${image.startsWith('/') ? image : `/${image}`}`
    },
    additionalMetaTags: [
      { name: 'author', content: siteConfig.author },
      { name: 'theme-color', content: siteConfig.themeColor },
      { name: 'language', content: 'en' },
      { name: 'geo.region', content: 'PK' },
      { name: 'geo.placename', content: 'Karachi, Pakistan' }
    ]
  }
}
