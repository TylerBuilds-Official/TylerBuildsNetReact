import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logoUrl from "../assets/TB_logo.png";
import HeroVisualInteractive from "../components/HomeHeroVisualInteractive.tsx";
import SegmentedSlider from "../components/GlobalUISegmentedSlider.tsx";

const Home: React.FC = () => {
  const [focus, setFocus] = useState<"automation" | "ai">("automation");
  const [toolsTab, setToolsTab] = useState<"dashboards" | "integrations" | "automation">("dashboards");
  const subtitle =
    focus === "automation"
      ? "I help mid-sized businesses save time and increase revenue with custom automation and AI-powered tools. From messy manual processes to smooth, automated workflows. I build solutions that fit your business exactly."
      : "Put AI to work for your business. I create custom AI assistants, automated customer support, intelligent data analysis, and more. Real results without the hype. Solutions that actually save you time and money.";

  const toolsCopy = useMemo(() => ({
    dashboards: {
      title: "Real-Time Dashboards",
      desc:
        "See your business data at a glance. Custom dashboards that pull from all your systems into one place. No more hunting through spreadsheets or switching between tools.",
      tags: ["Live Data", "Custom Reports", "Team Access", "Mobile Friendly"],
    },
    integrations: {
      title: "System Integrations",
      desc:
        "Make your tools talk to each other. Connect Slack, Salesforce, QuickBooks, and more. Automate data flow between systems so your team can focus on what matters.",
      tags: ["Connect Anything", "Auto-Sync", "Error-Free", "Always Running"],
    },
    automation: {
      title: "Workflow Automation",
      desc:
        "Stop doing the same tasks over and over. Automated approvals, scheduled reports, data imports, and custom workflows that save hours every week.",
      tags: ["Time Savings", "No More Manual Entry", "Scheduled Jobs", "Smart Workflows"],
    },
  }), []);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Hello, I'm</p>
            <h1>Tyler, Your Automation Partner</h1>
            <div className="segmented" role="tablist" aria-label="Focus">
              <button
                role="tab"
                aria-selected={focus === "automation"}
                className={focus === "automation" ? "active" : ""}
                onClick={() => setFocus("automation")}
              >
                Business Automation
              </button>
              <button
                role="tab"
                aria-selected={focus === "ai"}
                className={focus === "ai" ? "active" : ""}
                onClick={() => setFocus("ai")}
              >
                AI Solutions
              </button>
            </div>
            <p className="subtitle">{subtitle}</p>
            <div className="trust-note" aria-live="polite">
              <span className="trust-dot" aria-hidden="true"></span>
              <span>Available for new projects. Based in Spokane, WA.</span>
            </div>
            <div className="cta">
              <Link to="/projects" className="btn primary">See Work</Link>
              <a href="https://portfolio.tylerbuilds.net" className="btn" target="_blank" rel="noreferrer">Developer Portfolio</a>
              <Link to="/contact" className="btn">Start a Project</Link>
            </div>
          </div>
          <HeroVisualInteractive
          logoUrl={logoUrl}
          animate={true}
          className={"hero-visual"}

          >
          </HeroVisualInteractive>
        </div>
      </section>

      <section className="container features">
        <article className="feature card">
          <h3>Understand</h3>
          <p className="muted">I learn your business inside and out: your workflow, your pain points, your goals.</p>
        </article>
        <article className="feature card">
          <h3>Build</h3>
          <p className="muted">Custom solutions designed exactly for your needs. Fast, reliable tools your team will actually use.</p>
        </article>
        <article className="feature card">
          <h3>Refine</h3>
          <p className="muted">We iterate until it's perfect, then keep it running smoothly as your business grows.</p>
        </article>
      </section>

      {/* Interactive Internal Tools mini-section */}
      <section aria-labelledby="tools-section-heading">
        <div className="card interactive">
          <div className="stacked">
            <div>
              <p id="tools-section-heading" className="eyebrow">What I Build</p>
              <h2>Solutions that save time and money</h2>
            </div>
            <SegmentedSlider
              tabs={[
                { key: "dashboards",    label: "Dashboards" },
                { key: "integrations",  label: "Integrations" },
                { key: "automation",    label: "Automation" },
              ]}
              active={toolsTab}
              onSelect={(key) => setToolsTab(key as typeof toolsTab)}
              ariaLabel="Solution examples"
            />

            <div className="tool-pane fade-in" role="tabpanel" aria-live="polite">
              <h3>{toolsCopy[toolsTab].title}</h3>
              <p className="muted">{toolsCopy[toolsTab].desc}</p>
              <ul className="tags">
                {toolsCopy[toolsTab].tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="cta">
              <Link to="/contact" className="btn primary">Discuss Your Needs</Link>
              <Link to="/projects" className="btn">View Examples</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-strip" role="region" aria-label="Work together">
        <div className="container cta-strip-inner">
          <p><strong>Ready to stop wasting time?</strong> Let's automate it.</p>
          <Link to="/contact" className="btn primary">Get in Touch</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
