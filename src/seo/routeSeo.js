import { buildMetadata, siteConfig } from './metadata'

export const routeSeo = {
  home: buildMetadata({
    title: 'Abdul Rafay Chatriwala',
    description: 'Full-stack developer and digital product studio crafting accessible, high-performing websites and product experiences for modern brands.',
    url: `${siteConfig.siteUrl}/`,
    type: 'website'
  }),
  about: buildMetadata({
    title: 'About Abdul Rafay Chatriwala',
    description: 'Learn about Abdul Rafay Chatriwala, his design philosophy, development process, and the values behind Chatriwala.',
    url: `${siteConfig.siteUrl}/about`,
    type: 'profile'
  }),
  projects: buildMetadata({
    title: 'Projects & Case Studies',
    description: 'Explore selected web development, product design, and digital experience projects built by Abdul Rafay Chatriwala.',
    url: `${siteConfig.siteUrl}/projects`,
    type: 'website'
  }),
  services: buildMetadata({
    title: 'Web Development & Digital Services',
    description: 'Professional web design, UI development, SEO engineering, and product design services for founders, teams, and growing businesses.',
    url: `${siteConfig.siteUrl}/services`,
    type: 'website'
  }),
  blogs: buildMetadata({
    title: 'Technical Articles & Insights',
    description: 'Read practical articles about AI, modern web development, product thinking, and the craft behind building better digital products.',
    url: `${siteConfig.siteUrl}/blogs`,
    type: 'website'
  }),
  contact: buildMetadata({
    title: 'Contact Abdul Rafay Chatriwala',
    description: 'Start a conversation about your next product, website, or digital experience project with Abdul Rafay Chatriwala.',
    url: `${siteConfig.siteUrl}/get-in-touch`,
    type: 'website'
  }),
  privacy: buildMetadata({
    title: 'Privacy Policy',
    description: 'Read the privacy policy for the Chatriwala website and understand how visitor data is handled.',
    url: `${siteConfig.siteUrl}/privacy-policy`,
    type: 'website',
    robots: 'noindex,follow'
  })
}
