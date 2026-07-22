import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
    const [typedText, setTypedText] = useState('')
    const fullText = "System.out.println('404 - Page not found');\n> Status: Lost in the void.\n> Action: Rerouting back to safety..."

    useEffect(() => {
        let currentText = ''
        let currentIndex = 0
        const interval = setInterval(() => {
            currentText += fullText[currentIndex]
            setTypedText(currentText)
            currentIndex++
            if (currentIndex === fullText.length) {
                clearInterval(interval)
            }
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <main className="notfound-page">
            <div className="notfound-grid-overlay" aria-hidden="true" />
            <span className="notfound-bg-text" aria-hidden="true">404</span>

            <div className="notfound-inner">
                <div className="notfound-content reveal-on-load">
                    <p className="notfound-eyebrow">// error code 404</p>
                    <h1 className="notfound-headline">
                        Looks like you've
                        <span className="notfound-headline-accent">wandered off-grid.</span>
                    </h1>
                    <p className="notfound-sub">
                        The page you are looking for doesn't exist, has been moved, or is currently under construction.
                    </p>
                    
                    <div className="notfound-terminal">
                        <div className="notfound-terminal-header">
                            <div className="terminal-dots">
                                <span className="dot dot-red"></span>
                                <span className="dot dot-yellow"></span>
                                <span className="dot dot-green"></span>
                            </div>
                            <span className="terminal-title">error_log.sh</span>
                        </div>
                        <div className="notfound-terminal-body">
                            <pre>
                                <code>{typedText}<span className="terminal-cursor" /></code>
                            </pre>
                        </div>
                    </div>

                    <div className="notfound-actions">
                        <Link to="/" className="notfound-cta">
                            <span aria-hidden="true">←</span>
                            <span>Return to Base</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
