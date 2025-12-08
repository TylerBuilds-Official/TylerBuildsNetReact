import React, { useState, useEffect } from "react";

const terminalLines = [
  { prompt: "$ tyler --skills", delay: 0 },
  { text: "├── languages:   ", values: "TypeScript, JavaScript, Python, C#, .NET, SQL, Bash", delay: 400 },
  { text: "├── frontend:    ", values: "React, Vite, Tailwind, HTML/CSS, Accessibility", delay: 800 },
  { text: "├── backend:     ", values: "Node.js, Express, REST APIs", delay: 1200 },
  { text: "├── databases:   ", values: "PostgreSQL, MySQL, MariaDB, Prisma", delay: 1600 },
  { text: "├── devops:      ", values: "Docker, CI/CD, Git, Linux, Nginx", delay: 2000 },
  { text: "└── cloud:       ", values: "AWS, Vercel, Cloudflare", delay: 2400 },
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
              I'm Tyler — a developer, builder, and problem-solver based in Spokane, WA. 
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
      <section className="container about-mission">
        <div className="card">
          <h2>What I Do</h2>
          <p>
            I help small businesses and teams ship fast, tidy web experiences and lightweight 
            internal tools — without the bloat. From front-end UX to back-end services and 
            deployments, I ship reliable, maintainable software that helps teams move faster.
          </p>
          <p className="muted">
            If it reduces friction for your customers or saves your team time, I'm interested.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="container about-values">
        <p className="eyebrow">My Approach</p>
        <h2>Built Different</h2>
        <div className="values-grid">
          <article className="card value-card">
            <div className="value-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>Reliability</h3>
            <p className="muted">
              Construction taught me that cutting corners catches up with you. 
              I build things that last and don't break when you need them most.
            </p>
          </article>

          <article className="card value-card">
            <div className="value-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <h3>Clarity</h3>
            <p className="muted">
              No jargon, no mystery. You'll always know what's happening, 
              what it costs, and when it'll be done.
            </p>
          </article>

          <article className="card value-card">
            <div className="value-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
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
      <section className="container about-skills">
        <div className="about-skills-header">
          <p className="eyebrow">Technical</p>
          <h2>Skills & Tools</h2>
        </div>
        <TerminalSkills />
      </section>

      {/* CTA */}
      <section className="cta-strip" role="region" aria-label="Work together">
        <div className="container cta-strip-inner">
          <p><strong>Like what you see?</strong> Let's build something together.</p>
          <a href="/contact" className="btn primary">Get in Touch</a>
        </div>
      </section>
    </>
  );
};

export default About;
