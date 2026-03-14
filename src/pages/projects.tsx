import React, { useState, useEffect } from "react";
import ProcessStepper from "../components/ProjectsProcessStepper.tsx";
import Card from "../components/GlobalUICard.tsx";
import ProjectsInvSyncAutomation from "../components/ProjectsInvSyncAutomation.tsx";
import ProjectsSalesDashboard from "../components/ProjectsSalesDashboard.tsx";
import ProjectsAISupportDemo from "../components/ProjectsAISupportDemo.tsx";
import ProjectsAnimatedMetrics from "../components/ProjectsAnimatedMetrics.tsx";
import { Link } from "react-router-dom";
import PlaySvg from "../assets/svg/pages/PlaySvg";
import CheckmarkSvg from "../assets/svg/common/CheckmarkSvg";
import PersonSvg from "../assets/svg/pages/PersonSvg";
import GearSvg from "../assets/svg/pages/GearSvg";
import RefreshSvg from "../assets/svg/pages/RefreshSvg";
import ShieldCheckSvg from "../assets/svg/pages/ShieldCheckSvg";

type Project = {
  id: string;
  title: string;
  description: string;
  outcome: string;
  type: "shipped" | "demo";
  tags: string[];
  heroMetric?: {
    value: number;
    suffix: string;
    label: string;
  };
  hasDemo?: boolean;
};

const projects: Project[] = [
  {
    id:           "inventory-sync",
    title:        "Inventory Sync Automation",
    description:  "A mid-sized manufacturer was manually copying inventory data between their warehouse system and accounting software every day, about 2 hours of tedious work.",
    outcome:      "Built a custom integration that syncs inventory automatically every hour. Eliminated manual data entry and reduced billing errors by 95%.",
    type:         "demo",
    tags:         ["Error Reduction", "Auto-Sync", "Real-Time"],
    heroMetric:   { value: 10, suffix: "hrs/week", label: "Time Saved" },
    hasDemo:      true,
  },
  {
    id:           "customer-dashboard",
    title:        "Real-Time Sales Dashboard",
    description:  "Leadership team was waiting until end of week to see sales performance. No visibility into daily trends or problem accounts.",
    outcome:      "Created a live dashboard pulling from their CRM and payment processor. Now they spot issues immediately and make faster decisions.",
    type:         "demo",
    tags:         ["Real-Time Data", "Better Decisions", "Mobile Access"],
    heroMetric:   { value: 100, suffix: "%", label: "Visibility" },
    hasDemo:      true,
  },

  {
    id:           "enterprise-ai",
    title:        "Enterprise AI Platform",
    description:  "A manufacturing company had critical data scattered across disconnected systems. Getting answers meant manual reports, IT requests, and hours of waiting.",
    outcome:      "Built a custom AI platform that gives managers instant, conversational access to operational data. Questions that took hours of manual reporting now return in seconds.",
    type:         "shipped",
    tags:         ["AI-Powered", "Instant Answers", "Time Savings"],
    heroMetric:   { value: 30, suffix: "+", label: "Custom AI Tools" },
  },

  {
    id:           "ai-support",
    title:        "AI Customer Support Assistant",
    description:  "Your support team answers the same questions hundreds of times per month. Customers wait hours for simple answers.",
    outcome:      "An AI chatbot trained on your help docs and past tickets. Handles 70% of common questions instantly, freeing your team for complex issues.",
    type:         "demo",
    tags:         ["AI-Powered", "24/7 Availability", "Scalable"],
    heroMetric:   { value: 70, suffix: "%", label: "Auto-Resolved" },
    hasDemo:      true,
  },

  {
    id:           "document-classification",
    title:        "AI Document Classification",
    description:  "Hundreds of documents per project needed to be sorted by type, manually. Coordinators spent hours per project on sorting and misfiled documents caused costly delays.",
    outcome:      "Built an AI classification system that automatically identifies, sorts, and organizes documents by type. Processing time dropped from hours to minutes per project.",
    type:         "shipped",
    tags:         ["AI Classification", "Time Savings", "Error Reduction"],
    heroMetric:   { value: 1000, suffix: "s", label: "Pages Processed" },
  },

  {
    id:           "quality-control",
    title:        "Automated Quality Control",
    description:  "Staff had to manually cross-reference documents against production data to make critical decisions. Mistakes from misread documents meant wasted materials and money.",
    outcome:      "Built an automated system that pulls production data, cross-references it against source documents, and makes accurate decisions instantly. Eliminated costly material waste from human error.",
    type:         "shipped",
    tags:         ["Error Elimination", "Cost Savings", "Automated Decisions"],
    heroMetric:   { value: 100, suffix: "%", label: "Waste Eliminated" },
  },
];

const Projects: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedDemo ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedDemo]);

  return (
    <section className="projects-page">
      {/* Header */}
      <div className="container">
        <div className="projects-header">
          <h1>Projects</h1>
          <p className="muted">
            Real results from real work, plus interactive demos you can try
          </p>
        </div>
      </div>

      {/* How We'll Work Together - CENTERPIECE */}
      <div className="container">
        <div className="process-section reveal">
          <Card>
            <div className="stacked" style={{ textAlign: "center" }}>
              <div>
                <p className="eyebrow process-eyebrow" style={{ color: "var(--brand)" }}>The Process</p>
                <h2 style={{ marginTop: "8px" }}>Here's exactly how we'll work together</h2>
                <p className="muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                  No surprises, no confusion. Just a clear path from your challenge to a working solution.
                </p>
              </div>
              <ProcessStepper />
              <div className="cta" style={{ justifyContent: "center", marginTop: "16px" }}>
                <Link to="/contact" className="btn primary">Start Your Project</Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Projects grid */}
      <div className="container">
        <div className="projects-grid">
          {projects.map((p) => (
            <article 
              key={p.id} 
              className={`project-card-enhanced ${p.type} reveal`}
            >
              {/* Hero Metric */}
              {p.heroMetric && (
                <ProjectsAnimatedMetrics
                  value={p.heroMetric.value} 
                  suffix={p.heroMetric.suffix} 
                  label={p.heroMetric.label} 
                />
              )}

              {/* Card Content */}
              <div className="project-card-content">
                <div className="project-card-header">
                  <span className={`project-type-badge ${p.type}`}>
                    {p.hasDemo ? (
                      <>
                        <PlaySvg />
                        Interactive Demo
                      </>
                    ) : (
                      <>
                        <CheckmarkSvg />
                        Shipped
                      </>
                    )}
                  </span>
                  <h3>{p.title}</h3>
                </div>

                <div className="project-sections">
                  <div className="project-section">
                    <span className="project-section-label">The Challenge</span>
                    <p>{p.description}</p>
                  </div>
                  <div className="project-section">
                    <span className="project-section-label">The Solution</span>
                    <p>{p.outcome}</p>
                  </div>
                </div>

                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                {p.hasDemo && (
                  <button 
                    className="btn project-demo-btn" 
                    onClick={() => setSelectedDemo(p.id)}
                  >
                    View Demo
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Demo popup */}
      {selectedDemo && (
        <div 
          className="demo-overlay" 
          onClick={() => setSelectedDemo(null)}
        >
          <div 
            className={`demo-modal ${selectedDemo === "inventory-sync" || selectedDemo === "customer-dashboard" || selectedDemo === "ai-support" ? "demo-modal-wide" : "card"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedDemo === "inventory-sync" ? (

              <ProjectsInvSyncAutomation onClose={() => setSelectedDemo(null)} />
            ) : selectedDemo === "customer-dashboard" ? (

              <ProjectsSalesDashboard onClose={() => setSelectedDemo(null)} />
            ) : selectedDemo === "ai-support" ? (

              <ProjectsAISupportDemo onClose={() => setSelectedDemo(null)} />
            ) : (
              <div className="stacked">
                <div className="row row-between">
                  <h3>Demo Coming Soon</h3>
                  <button className="btn" onClick={() => setSelectedDemo(null)}>Close</button>
                </div>
                <p className="muted">
                  Interactive demos and detailed case studies are being built out. 
                  For now, <Link to="/contact">get in touch</Link> to discuss how I can build something similar for your business.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Why Choose Me section */}
      <div className="container">

        <section className="why-me-section reveal">
          <div className="why-me-header">
            <p className="eyebrow">Why Work With Me?</p>
            <h2>What makes this different</h2>
          </div>

          <div className="why-me-grid">
            <article className="why-me-card reveal">
              <div className="why-me-icon">
                <PersonSvg />
              </div>
              <h4>You work directly with me</h4>
              <p>No account managers, no junior devs learning on your dime. Just one experienced developer who knows your project inside and out.</p>
            </article>

            <article className="why-me-card reveal">
              <div className="why-me-icon">
                <GearSvg />
              </div>
              <h4>Built for your workflow</h4>
              <p>Not a template or off-the-shelf solution. Every feature is designed around how you actually work, not how I think you should work.</p>
            </article>

            <article className="why-me-card reveal">
              <div className="why-me-icon">
                <RefreshSvg />
              </div>
              <h4>We iterate until it's right</h4>
              <p>Your feedback shapes the final product. No "take it or leave it" deliveries. We refine together until it solves your problem perfectly.</p>
            </article>

            <article className="why-me-card reveal">
              <div className="why-me-icon">
                <ShieldCheckSvg />
              </div>
              <h4>Reliable and maintainable</h4>
              <p>Clean code, clear documentation, easy to update. Built to last and grow with your business.</p>
            </article>
          </div>
        </section>
      </div>

      {/* Portfolio Link */}
      <div className="container reveal">
        <Card>
          <div className="portfolio-callout">
            <p className="eyebrow" style={{ color: "var(--brand)" }}>Full Portfolio</p>
            <h3>Want to see the full technical breakdown?</h3>
            <p className="muted">Detailed case studies, architecture details, and the complete project list.</p>
            <a href="https://portfolio.tylerbuilds.net" className="btn primary" target="_blank" rel="noreferrer">View Developer Portfolio</a>
          </div>
        </Card>
      </div>

      {/* CTA Strip */}
      <section className="cta-strip reveal" role="region" aria-label="Get started">
        <div className="container cta-strip-inner">
          <div>
            <p style={{ fontSize: "1.15rem", marginBottom: "4px" }}><strong>Ready to automate your biggest pain point?</strong></p>
            <p className="muted" style={{ margin: 0 }}>Let's talk about what's slowing your team down</p>
          </div>
          <Link to="/contact" className="btn primary">Start a Conversation</Link>
        </div>
      </section>
    </section>
  );
};

export default Projects;
