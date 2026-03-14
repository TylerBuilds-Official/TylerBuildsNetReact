import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import ShieldSvg from "../assets/svg/pages/ShieldSvg";
import InfoCircleSvg from "../assets/svg/common/InfoCircleSvg";
import LayersSvg from "../assets/svg/pages/LayersSvg";

const terminalLines = [
  { prompt: "$ tyler --skills", delay: 0 },
  { text: "├── languages:   ", values: "TypeScript, JavaScript, Python, C#, .NET, SQL, Bash", delay: 400 },
  { text: "├── frontend:    ", values: "React, Vite, XAML/WPF, HTML/CSS, Accessibility", delay: 800 },
  { text: "├── backend:     ", values: "Python, FastAPI, Node.js, REST APIs", delay: 1200 },
  { text: "├── databases:   ", values: "MySQL, MSSQL, PostgreSQL", delay: 1600 },
  { text: "├── devops:      ", values: "Docker, CI/CD, Git, Linux", delay: 2000 },
  { text: "└── cloud:       ", values: "Azure, AWS, Cloudflare", delay: 2400 },
];

const TerminalSkills: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    const terminal = document.getElementById("terminal-skills");
    if (terminal) observer.observe(terminal);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startAnimation = () => {
    const command = terminalLines[0].prompt || "";
    let charIndex = 0;
    
    const typeCommand = setInterval(() => {
      charIndex++;
      setTypedChars(charIndex);
      if (charIndex >= command.length) {
        clearInterval(typeCommand);
        terminalLines.forEach((_, index) => {
          setTimeout(() => {
            setVisibleLines(index + 1);
          }, terminalLines[index].delay);
        });
      }
    }, 50);
  };

  return (
    <div className="terminal" id="terminal-skills">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <span className="terminal-title">tyler@workstation: ~</span>
      </div>
      <div className="terminal-body">
        {/* Command line with typing effect */}
        <div className="terminal-line">
          <span className="terminal-prompt">
            {(terminalLines[0].prompt || "").slice(0, typedChars)}
          </span>
          {typedChars < (terminalLines[0].prompt || "").length && (
            <span className="terminal-cursor">▋</span>
          )}
        </div>

        {/* Output lines */}
        {terminalLines.slice(1).map((line, index) => (
          <div
            key={index}
            className={`terminal-line terminal-output ${visibleLines > index + 1 ? "visible" : ""}`}
          >
            <span className="terminal-tree">{line.text}</span>
            <span className="terminal-values">{line.values}</span>
          </div>
        ))}

        {/* Blinking cursor at end */}
        {visibleLines >= terminalLines.length && (
          <div className="terminal-line">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-cursor blink">▋</span>
          </div>
        )}
      </div>
    </div>
  );
};

const About: React.FC = () => {

  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <p className="eyebrow">About Me</p>
            <h1>From Steel to Software</h1>
            <p className="subtitle">
              I'm Tyler, a developer, builder, and problem-solver based in Spokane, WA. 
              My path into software is a little different: I spent years in construction 
              and fabrication, where reliability and precision aren't optional.
            </p>
            <p className="muted">
              That mindset is baked into how I build websites and tools today: clear scope, 
              clean code, and battle-tested solutions that hold up in the real world.
            </p>
          </div>

          <div className="about-hero-visual">
            <div className="stats-card">
              <div className="stats-card-inner">
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Years Building Things</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">Full-Stack</span>
                  <span className="stat-label">End-to-End Delivery</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">Spokane</span>
                  <span className="stat-label">Based in WA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="container about-mission reveal">
        <div className="card">
          <h2>What I Do</h2>
          <p>
            I help businesses ship custom software that solves real problems. Full-stack 
            applications, automation tooling, database engineering, AI platforms, desktop 
            apps. From front-end UX to back-end services and deployments, I own the 
            entire stack.
          </p>
          <p className="muted">
            If it reduces friction for your customers or saves your team time, I'm interested.
          </p>
          <div style={{ marginTop: "12px" }}>
            <a href="https://portfolio.tylerbuilds.net" className="btn primary" target="_blank" rel="noreferrer">
              See My Full Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container about-values">
        <p className="eyebrow">My Approach</p>
        <h2>Built Different</h2>
        <div className="values-grid">
          <article className="card value-card reveal">
            <div className="value-icon">
              <ShieldSvg />
            </div>
            <h3>Reliability</h3>
            <p className="muted">
              Construction taught me that cutting corners catches up with you. 
              I build things that last and don't break when you need them most.
            </p>
          </article>

          <article className="card value-card reveal">
            <div className="value-icon">
              <InfoCircleSvg size={32} />
            </div>
            <h3>Clarity</h3>
            <p className="muted">
              No jargon, no mystery. You'll always know what's happening, 
              what it costs, and when it'll be done.
            </p>
          </article>

          <article className="card value-card reveal">
            <div className="value-icon">
              <LayersSvg />
            </div>
            <h3>Pragmatism</h3>
            <p className="muted">
              I pick the right tool for the job, not the trendiest one. 
              Solutions that scale with your business, not my resume.
            </p>
          </article>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container about-skills reveal">
        <div className="about-skills-header">
          <p className="eyebrow">Technical</p>
          <h2>Skills & Tools</h2>
        </div>
        <TerminalSkills />
      </section>

      {/* CTA */}
      <section className="cta-strip reveal" role="region" aria-label="Work together">
        <div className="container cta-strip-inner">
          <p><strong>Like what you see?</strong> Let's build something together.</p>
          <Link to="/contact" className="btn primary">Get in Touch</Link>

        </div>
      </section>
    </>
  );
};

export default About;
