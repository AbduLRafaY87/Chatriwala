import { useEffect } from 'react';

/**
 * SEO
 * Sets page title + meta description/OG tags without needing react-helmet.
 * Usage (top of each page component):
 *
 *   <SEO
 *     title="Work | Abdul Rafay Chatriwala"
 *     description="Case studies of web apps, tools, and products I've built."
 *   />
 */
const SEO = ({
  title = 'Abdul Rafay Chatriwala — Full-Stack Developer',
  description = 'Full-stack developer building web apps, custom tools, and digital products.',
  image = '/og-image.png',
  url = typeof window !== 'undefined' ? window.location.href : '',
}) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:url', url, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
  }, [title, description, image, url]);

  return null;
};

export default SEO;
