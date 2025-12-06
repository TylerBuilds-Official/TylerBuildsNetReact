import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logoUrl from "../assets/TB_logo.svg";
import HeroVisualInteractive from "../components/HomeHeroVisualInteractive.tsx";

const Home: React.FC = () => {
  const [focus, setFocus] = useState<"web" | "tools">("web");
  const [toolsTab, setToolsTab] = useState<"dashboards" | "integrations" | "automation">("dashboards");
  const subtitle =
    focus === "web"
      ? "I help businesses launch performant, accessible web apps that convert. From concept to production, I design, build, and ship with a wide variety of full-stack modern tooling."
      : "Beyond public-facing sites, I build internal tools tailored to your company’s custom data—dashboards, integrations, workflows, and automation that unblock teams and increase leverage.";

  const toolsCopy = useMemo(() => ({
    dashboards: {
      title: "Dashboards",
      desc:
        "Interactive analytics dashboards wired to your sources (Postgres, BigQuery, Airtable, Sheets) with role-based access and drilldowns.",
      tags: ["React", "Node.js", "Postgres", "Auth"],
    },
    integrations: {
      title: "Integrations",
      desc:
        "Reliable data syncs and automations with APIs like Slack, Salesforce, HubSpot, and custom webhooks. Observability and retries included.",
      tags: ["APIs", "Webhooks", "Queues", "Monitoring"],
    },
    automation: {
      title: "Automation",
      desc:
        "Workflow tools that reduce manual steps: approvals, generators, CSV importers, and scheduled jobs designed for your team.",
      tags: ["Workers", "CRON", "CSV", "RBAC"],
    },
  }), []);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Hello, I'm</p>
            <h1>Tyler — Full‑Stack Developer</h1>
            <div className="segmented" role="tablist" aria-label="Focus">
              <button
                role="tab"
                aria-selected={focus === "web"}
                className={focus === "web" ? "active" : ""}
                onClick={() => setFocus("web")}
              >
                Web Apps
              </button>
              <button
                role="tab"
                aria-selected={focus === "tools"}
                className={focus === "tools" ? "active" : ""}
                onClick={() => setFocus("tools")}
              >
                Internal Tools
              </button>
            </div>
            <p className="subtitle">{subtitle}</p>
            <div className="trust-note" aria-live="polite">
              <span className="trust-dot" aria-hidden="true"></span>
              <span>Well‑trusted by startups and internal teams — reliable, secure, and maintainable builds.</span>
            </div>
            <div className="cta">
              <Link to="/projects" className="btn primary">See Work</Link>
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
          <h3>Design</h3>
          <p className="muted">User‑centered UI design, responsive layouts, and brand‑aligned visuals.</p>
        </article>
        <article className="feature card">
          <h3>Build</h3>
          <p className="muted">TypeScript + React architecture, component libraries, APIs, and robust testing.</p>
        </article>
        <article className="feature card">
          <h3>Launch</h3>
          <p className="muted">CI/CD, analytics, performance tuning, and accessible experiences that scale.</p>
        </article>
      </section>

      {/* Interactive Internal Tools mini-section */}
      <section className="container" aria-labelledby="tools-section-heading">
        <div className="card interactive">
          <div className="stacked">
            <div>
              <p id="tools-section-heading" className="eyebrow">Internal Tools</p>
              <h2>Custom tools for your data</h2>
            </div>
            <div className="segmented" role="tablist" aria-label="Internal tools examples">
              <button
                role="tab"
                aria-selected={toolsTab === "dashboards"}
                className={toolsTab === "dashboards" ? "active" : ""}
                onClick={() => setToolsTab("dashboards")}
              >
                Dashboards
              </button>
              <button
                role="tab"
                aria-selected={toolsTab === "integrations"}
                className={toolsTab === "integrations" ? "active" : ""}
                onClick={() => setToolsTab("integrations")}
              >
                Integrations
              </button>
              <button
                role="tab"
                aria-selected={toolsTab === "automation"}
                className={toolsTab === "automation" ? "active" : ""}
                onClick={() => setToolsTab("automation")}
              >
                Automation
              </button>
            </div>

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
              <Link to="/contact" className="btn primary">Discuss Your Use‑Case</Link>
              <Link to="/projects" className="btn">View Related Work</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-strip" role="region" aria-label="Work together">
        <div className="container cta-strip-inner">
          <p><strong>Have an idea?</strong> Let’s bring it to life.</p>
          <Link to="/contact" className="btn primary">Get in Touch</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
