import React, { useEffect, useRef, useState } from 'react'
import './PrivacyPolicy.css'
import PageSEO from '../../components/common/PageSEO.jsx'
import { routeSeo } from '../../seo/routeSeo'

const SECTIONS = [
    { id: 'interpretation', label: 'Interpretation & Definitions' },
    { id: 'collecting', label: 'Collecting Your Data' },
    { id: 'use', label: 'How Data Is Used' },
    { id: 'retention', label: 'Retention & Transfer' },
    { id: 'delete', label: 'Your Right to Delete' },
    { id: 'disclosure', label: 'Disclosure' },
    { id: 'security', label: 'Security' },
    { id: 'children', label: "Children's Privacy" },
    { id: 'links', label: 'External Links' },
    { id: 'changes', label: 'Changes to This Policy' },
    { id: 'contact', label: 'Contact' },
]

const useRevealOnScroll = () => {
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
            { threshold: 0.1 }
        )
        items.forEach((item) => observer.observe(item))
        return () => observer.disconnect()
    }, [])
    return ref
}

const PrivacyPolicy = () => {
    const pageRef = useRevealOnScroll()
    const [progress, setProgress] = useState(0)
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id)

    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement
            const scrolled = doc.scrollTop
            const height = doc.scrollHeight - doc.clientHeight
            setProgress(height > 0 ? (scrolled / height) * 100 : 0)

            const centerY = window.innerHeight * 0.3
            let current = SECTIONS[0].id
            for (const s of SECTIONS) {
                const el = document.getElementById(s.id)
                if (el && el.getBoundingClientRect().top <= centerY) {
                    current = s.id
                }
            }
            setActiveSection(current)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <>
            <PageSEO
                pageKey="privacy"
                title={routeSeo.privacy.title}
                description={routeSeo.privacy.description}
                url={routeSeo.privacy.canonical}
                type="WebPage"
                robots={routeSeo.privacy.robots}
            />
        <main className="privacy-page" ref={pageRef}>
            <div className="privacy-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

            {/* ---- Hero ---- */}
            <section className="privacy-hero">
                <div className="privacy-grid-overlay" aria-hidden="true" />
                <span className="privacy-bg-text" aria-hidden="true">TRUST</span>

                <div className="privacy-hero-inner">
                    <p className="privacy-eyebrow reveal-on-scroll">// legal &amp; transparency</p>
                    <h1 className="privacy-hero-headline reveal-on-scroll">
                        Privacy, designed
                        <span className="privacy-hero-accent">with respect.</span>
                    </h1>
                    <p className="privacy-hero-sub reveal-on-scroll">
                        Minimal data collection, clear disclosure, and no surprises —
                        privacy is treated as part of the product, not an afterthought.
                    </p>
                    <p className="privacy-updated reveal-on-scroll">Last updated: May 07, 2025</p>
                </div>
            </section>

            <div className="privacy-body">
                {/* ---- Sticky table of contents ---- */}
                <aside className="privacy-toc reveal-on-scroll">
                    <span className="privacy-toc-label">On this page</span>
                    <nav className="privacy-toc-list">
                        {SECTIONS.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                className={`privacy-toc-item ${activeSection === s.id ? 'is-active' : ''}`}
                                onClick={() => scrollToSection(s.id)}
                            >
                                {s.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* ---- Document content ---- */}
                <div className="privacy-content">
                    <p className="privacy-intro reveal-on-scroll">
                        This Privacy Policy describes Our policies and procedures on the
                        collection, use and disclosure of Your information when You use the
                        Service, and tells You about Your privacy rights and how the law
                        protects You. We use Your Personal data to provide and improve the
                        Service. By using the Service, You agree to the collection and use
                        of information in accordance with this Privacy Policy.
                    </p>

                    <section id="interpretation" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">01</span>
                        <h2 className="privacy-section-title">Interpretation &amp; Definitions</h2>
                        <p>
                            The words of which the initial letter is capitalized have
                            meanings defined under the following conditions. The following
                            definitions shall have the same meaning regardless of whether
                            they appear in singular or in plural.
                        </p>

                        <div className="privacy-term-grid">
                            {[
                                ['Account', 'A unique account created for You to access our Service or parts of our Service.'],
                                ['Affiliate', 'An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.'],
                                ['Company', '(referred to as "the Company", "We", "Us" or "Our") refers to Chatriwala, Karachi, Pakistan.'],
                                ['Cookies', 'Small files placed on Your device by a website, containing details of Your browsing history on that website among its many uses.'],
                                ['Country', 'Refers to: Pakistan.'],
                                ['Device', 'Any device that can access the Service, such as a computer, cellphone, or digital tablet.'],
                                ['Personal Data', 'Any information that relates to an identified or identifiable individual.'],
                                ['Service', 'Refers to the Website.'],
                                ['Service Provider', 'Any natural or legal person who processes data on behalf of the Company — third-party companies or individuals employed to facilitate, provide, or support the Service.'],
                                ['Third-Party Social Media Service', 'Any website or social network through which a User can log in or create an account to use the Service.'],
                                ['Usage Data', 'Data collected automatically, either generated by use of the Service or from the Service infrastructure itself (e.g. the duration of a page visit).'],
                                ['Website', <>Chatriwala Website, accessible from <a href="https://archatriwala.com" rel="external nofollow noopener" target="_blank">archatriwala.com</a></>],
                                ['You', 'The individual accessing or using the Service, or the company or legal entity on whose behalf such individual is accessing or using the Service.'],
                            ].map(([term, def]) => (
                                <div key={term} className="privacy-term">
                                    <span className="privacy-term-name">{term}</span>
                                    <span className="privacy-term-def">{def}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="collecting" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">02</span>
                        <h2 className="privacy-section-title">Collecting Your Data</h2>

                        <h3 className="privacy-subtitle">Personal Data</h3>
                        <p>
                            While using Our Service, We may ask You to provide certain
                            personally identifiable information that can be used to contact
                            or identify You, including but not limited to:
                        </p>
                        <ul className="privacy-list">
                            <li>Email address</li>
                            <li>First name and last name</li>
                            <li>Phone number</li>
                            <li>Address, State, Province, ZIP/Postal code, City</li>
                            <li>Usage Data</li>
                        </ul>

                        <h3 className="privacy-subtitle">Usage Data</h3>
                        <p>
                            Usage Data is collected automatically when using the Service.
                            It may include Your Device's IP address, browser type and
                            version, the pages You visit, the time and date of Your visit,
                            time spent on those pages, unique device identifiers, and other
                            diagnostic data. When accessing the Service through a mobile
                            device, We may also collect Your device type, unique device ID,
                            mobile operating system, and mobile browser type.
                        </p>

                        <h3 className="privacy-subtitle">Third-Party Social Media Services</h3>
                        <p>
                            The Company allows You to create an account and log in through
                            Third-Party Social Media Services including:
                        </p>
                        <div className="privacy-chip-row">
                            {['Google', 'Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((s) => (
                                <span key={s} className="privacy-chip">{s}</span>
                            ))}
                        </div>
                        <p>
                            If You register through or grant Us access to one of these
                            services, We may collect Personal data already associated with
                            that account, such as Your name, email address, activities, or
                            contact list. You may also share additional information with the
                            Company through that account, and doing so gives the Company
                            permission to use, share, and store it consistent with this
                            Privacy Policy.
                        </p>

                        <h3 className="privacy-subtitle">Tracking Technologies &amp; Cookies</h3>
                        <p>
                            We use Cookies and similar tracking technologies to track
                            activity on Our Service and store certain information, including
                            beacons, tags, and scripts. Cookies can be "Persistent" (remain
                            on Your device when You go offline) or "Session" (deleted when
                            You close Your browser). We use both for the purposes below:
                        </p>

                        <div className="privacy-cookie-cards">
                            <div className="privacy-cookie-card">
                                <span className="privacy-cookie-type">Session Cookies</span>
                                <h4>Necessary / Essential</h4>
                                <p>
                                    Essential to provide the services available through the
                                    Website — authenticating users and preventing fraudulent
                                    account use. Without these, requested services cannot be
                                    provided.
                                </p>
                            </div>
                            <div className="privacy-cookie-card">
                                <span className="privacy-cookie-type">Persistent Cookies</span>
                                <h4>Cookies Policy / Notice Acceptance</h4>
                                <p>Identify whether users have accepted the use of cookies on the Website.</p>
                            </div>
                            <div className="privacy-cookie-card">
                                <span className="privacy-cookie-type">Persistent Cookies</span>
                                <h4>Functionality</h4>
                                <p>
                                    Remember choices You make — such as login details or
                                    language preference — for a more personal experience
                                    without re-entering preferences each visit.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="use" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">03</span>
                        <h2 className="privacy-section-title">How Your Data Is Used</h2>
                        <p>The Company may use Personal Data for the following purposes:</p>
                        <ul className="privacy-list">
                            <li><strong>To provide and maintain our Service</strong>, including monitoring its usage.</li>
                            <li><strong>To manage Your Account</strong> as a registered user of the Service.</li>
                            <li><strong>For the performance of a contract:</strong> development and fulfilment of any purchase or agreement made through the Service.</li>
                            <li><strong>To contact You</strong> by email, phone, SMS, or push notification regarding updates or service-related communications.</li>
                            <li><strong>To provide news and offers</strong> about goods and services similar to those You've already used, unless You've opted out.</li>
                            <li><strong>To manage Your requests</strong> to Us.</li>
                            <li><strong>For business transfers</strong> — evaluating or conducting a merger, sale, or restructuring of Our assets.</li>
                            <li><strong>For other purposes</strong> such as data analysis, usage trends, and improving the Service and Your experience.</li>
                        </ul>

                        <p>We may share Your personal information in these situations:</p>
                        <ul className="privacy-list">
                            <li><strong>With Service Providers</strong>, to monitor and analyze use of the Service and to contact You.</li>
                            <li><strong>For business transfers</strong>, in connection with a merger, sale, or acquisition.</li>
                            <li><strong>With Affiliates</strong>, who will be required to honor this Privacy Policy.</li>
                            <li><strong>With business partners</strong>, to offer certain products, services, or promotions.</li>
                            <li><strong>With other users</strong>, if You interact publicly or via a Third-Party Social Media Service.</li>
                            <li><strong>With Your consent</strong>, for any other disclosed purpose.</li>
                        </ul>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="retention" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">04</span>
                        <h2 className="privacy-section-title">Retention &amp; Transfer</h2>
                        <p>
                            The Company retains Your Personal Data only as long as
                            necessary for the purposes in this Policy — to comply with
                            legal obligations, resolve disputes, and enforce our
                            agreements. Usage Data is generally retained for a shorter
                            period, except where needed for security, functionality, or
                            legal reasons.
                        </p>
                        <p>
                            Your information may be transferred to, and maintained on,
                            computers located outside Your jurisdiction, where data
                            protection laws may differ. Your consent to this Policy
                            represents Your agreement to that transfer. The Company will
                            take all reasonable steps to ensure Your data is treated
                            securely, and no transfer will occur without adequate controls
                            in place.
                        </p>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="delete" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">05</span>
                        <h2 className="privacy-section-title">Your Right to Delete</h2>
                        <p>
                            You have the right to delete, or request Our assistance
                            deleting, the Personal Data We've collected about You. Where
                            the Service allows, You may delete certain information directly,
                            or update, amend, or delete it via Your account settings. You
                            may also contact Us directly to request access to, correction
                            of, or deletion of any personal information You've provided.
                            Note that We may need to retain certain information where We
                            have a legal obligation or lawful basis to do so.
                        </p>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="disclosure" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">06</span>
                        <h2 className="privacy-section-title">Disclosure</h2>

                        <h3 className="privacy-subtitle">Business Transactions</h3>
                        <p>
                            If the Company is involved in a merger, acquisition, or asset
                            sale, Your Personal Data may be transferred. We will provide
                            notice before Your Personal Data becomes subject to a different
                            Privacy Policy.
                        </p>

                        <h3 className="privacy-subtitle">Law Enforcement</h3>
                        <p>
                            Under certain circumstances, the Company may be required to
                            disclose Your Personal Data if required to do so by law or in
                            response to valid requests by public authorities.
                        </p>

                        <h3 className="privacy-subtitle">Other Legal Requirements</h3>
                        <p>The Company may disclose Your Personal Data in the good-faith belief that it's necessary to:</p>
                        <ul className="privacy-list">
                            <li>Comply with a legal obligation</li>
                            <li>Protect and defend the rights or property of the Company</li>
                            <li>Prevent or investigate possible wrongdoing connected to the Service</li>
                            <li>Protect the personal safety of Users or the public</li>
                            <li>Protect against legal liability</li>
                        </ul>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="security" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">07</span>
                        <h2 className="privacy-section-title">Security</h2>
                        <p>
                            The security of Your Personal Data matters to Us, but remember
                            that no method of transmission over the Internet, or method of
                            electronic storage, is 100% secure. While We strive to use
                            commercially acceptable means to protect Your Personal Data, We
                            cannot guarantee its absolute security.
                        </p>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="children" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">08</span>
                        <h2 className="privacy-section-title">Children's Privacy</h2>
                        <p>
                            Our Service does not address anyone under the age of 13. We do
                            not knowingly collect personally identifiable information from
                            anyone under 13. If You are a parent or guardian aware that Your
                            child has provided Us with Personal Data, please contact Us. If
                            We become aware of having collected such data without
                            verification of parental consent, We take steps to remove it
                            from Our servers. Where consent is required as a legal basis
                            and Your country requires parental consent, We may require it
                            before collecting and using that information.
                        </p>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="links" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">09</span>
                        <h2 className="privacy-section-title">External Links</h2>
                        <p>
                            Our Service may contain links to other websites not operated by
                            Us. If You click a third-party link, You'll be directed to that
                            site — We strongly advise reviewing the Privacy Policy of every
                            site You visit. We have no control over, and assume no
                            responsibility for, the content, privacy policies, or practices
                            of any third-party sites or services.
                        </p>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="changes" className="privacy-section reveal-on-scroll">
                        <span className="privacy-section-index">10</span>
                        <h2 className="privacy-section-title">Changes to This Policy</h2>
                        <p>
                            We may update Our Privacy Policy from time to time. We'll
                            notify You of changes by posting the new Policy on this page,
                            and via email and/or a prominent notice on Our Service, prior
                            to the change becoming effective — updating the "Last updated"
                            date above. You're advised to review this Policy periodically;
                            changes are effective once posted here.
                        </p>
                    </section>

                    <div className="privacy-divider" aria-hidden="true" />

                    <section id="contact" className="privacy-section privacy-contact-section reveal-on-scroll">
                        <span className="privacy-section-index">11</span>
                        <h2 className="privacy-section-title">Contact</h2>
                        <p>If you have any questions about this Privacy Policy, You can reach Us:</p>
                        <div className="privacy-contact-cards">
                            <a href="mailto:hello.chatriwala@gmail.com" className="privacy-contact-card">
                                <span className="privacy-contact-label">Email</span>
                                <span className="privacy-contact-value">hello.chatriwala@gmail.com</span>
                            </a>
                            <a
                                href="https://archatriwala.com/get-in-touch"
                                target="_blank"
                                rel="external nofollow noopener"
                                className="privacy-contact-card"
                            >
                                <span className="privacy-contact-label">Website</span>
                                <span className="privacy-contact-value">archatriwala.com/get-in-touch</span>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </main>
        </>
    )
}

export default PrivacyPolicy