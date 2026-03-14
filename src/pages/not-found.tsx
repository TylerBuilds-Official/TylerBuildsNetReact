import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

const GlitchText: React.FC<{ text: string }> = ({ text }) => {
    const [display, setDisplay] = useState(text);
    const [settled, setSettled] = useState(false);

    useEffect(() => {
        let frame = 0;
        const totalFrames = 18;

        const interval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;

            setDisplay(
                text
                    .split("")
                    .map((char, i) => {
                        if (i / text.length < progress) return char;
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join("")
            );

            if (frame >= totalFrames) {
                clearInterval(interval);
                setDisplay(text);
                setSettled(true);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [text]);

    return <span className={settled ? "glitch-settled" : "glitch-active"}>{display}</span>;
};

const NotFound: React.FC = () => {
    const location = useLocation();

    return (
        <section className="not-found-page">
            <div className="not-found-content">
                <div className="not-found-code">
                    <GlitchText text="404" />
                </div>

                <h1>Page not found</h1>
                <p className="muted">
                    Nothing exists at <code className="not-found-path">{location.pathname}</code>
                </p>

                <div className="not-found-terminal">
                    <div className="not-found-terminal-header">
                        <span className="terminal-btn close"></span>
                        <span className="terminal-btn minimize"></span>
                        <span className="terminal-btn maximize"></span>
                    </div>
                    <div className="not-found-terminal-body">
                        <span className="not-found-prompt">$</span> curl -I tylerbuilds.net{location.pathname}<br />
                        <span className="not-found-response">HTTP/1.1 404 Not Found</span><br />
                        <span className="not-found-response">x-suggestion: try-one-of-these</span>
                    </div>
                </div>

                <div className="not-found-links">
                    <Link to="/" className="btn primary">Back to Home</Link>
                    <Link to="/projects" className="btn">View Projects</Link>
                    <Link to="/contact" className="btn">Get in Touch</Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
