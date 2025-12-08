import React, { useState} from "react";
import ProcessStepper from "../components/ProjectsProcessStepper.tsx";
import Card from "../components/GlobalUICard.tsx";
import ProjectsInvSyncAutomation from "../components/ProjectsInvSyncAutomation.tsx";
import ProjectsSalesDashboard from "../components/ProjectsSalesDashboard.tsx";
import ProjectsAISupportDemo from "../components/ProjectsAISupportDemo.tsx";
import ProjectsAnimatedMetrics from "../components/ProjectsAnimatedMetrics.tsx";
import { Link } from "react-router-dom";

type Project = {
  id: string;
  title: string;
  description: string;
  outcome: string;
  type: "case-study" | "example";
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
    id: "inventory-sync",
    title: "Inventory Sync Automation",
    description: "A mid-sized manufacturer was manually copying inventory data between their warehouse system and accounting software every day — about 2 hours of tedious work.",
    outcome: "Built a custom integration that syncs inventory automatically every hour. Eliminated manual data entry and reduced billing errors by 95%.",
    type: "case-study",
    tags: ["Error Reduction", "Auto-Sync", "Real-Time"],
    heroMetric: { value: 10, suffix: "hrs/week", label: "Time Saved" },
    hasDemo: true,
  },
  {
    id: "customer-dashboard",
    title: "Real-Time Sales Dashboard",
    description: "Leadership team was waiting until end of week to see sales performance. No visibility into daily trends or problem accounts.",
    outcome: "Created a live dashboard pulling from their CRM and payment processor. Now they spot issues immediately and make faster decisions.",
    type: "case-study",
    tags: ["Real-Time Data", "Better Decisions", "Mobile Access"],
    heroMetric: { value: 100, suffix: "%", label: "Visibility" },
    hasDemo: true,
  },
  {
    id: "approval-workflow",
    title: "Automated Approval System",
    description: "Purchase requests were sitting in email inboxes for days. No tracking, no accountability, lots of duplicated work.",
    outcome: "Built a workflow tool with instant notifications and approval tracking. Reduced approval time from 3 days to 4 hours.",
    type: "case-study",
    tags: ["Accountability", "Notifications", "Tracking"],
    heroMetric: { value: 4, suffix: "x", label: "Faster Approvals" },
  },
  {
    id: "ai-support",
    title: "AI Customer Support Assistant",
    description: "Your support team answers the same questions hundreds of times per month. Customers wait hours for simple answers.",
    outcome: "An AI chatbot trained on your help docs and past tickets. Handles 70% of common questions instantly, freeing your team for complex issues.",
    type: "example",
    tags: ["AI-Powered", "24/7 Availability", "Scalable"],
    heroMetric: { value: 70, suffix: "%", label: "Auto-Resolved" },
    hasDemo: true,
  },
  {
    id: "report-automation",
    title: "Automated Weekly Reports",
    description: "Someone on your team spends 3 hours every Friday pulling data, making charts, and formatting reports.",
    outcome: "A system that generates your reports automatically. Clean charts, consistent format, delivered to your inbox every Friday morning.",
    type: "example",
    tags: ["Consistent", "Automatic", "Scheduled"],
    heroMetric: { value: 3, suffix: "hrs", label: "Saved Weekly" },
  },
  {
    id: "onboarding-portal",
    title: "Customer Onboarding Portal",
    description: "New customers email back-and-forth for account setup, document uploads, and initial configuration. Slow and error-prone.",
    outcome: "A guided portal that walks customers through setup step-by-step. Faster onboarding, happier customers, fewer support tickets.",
    type: "example",
    tags: ["Better Experience", "Self-Service", "Guided"],
    heroMetric: { value: 50, suffix: "%", label: "Faster Onboarding" },
  },
];

const Projects: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "case-study" | "example">("all");

  const filteredProjects = projects.filter(p => filter === "all" || p.type === filter);

  return (
    <section className="projects-page">
      {/* Header */}
      <div className="container">
        <div className="projects-header">
          <h1>Projects & Examples</h1>
          <p className="muted">
            Real results from real clients, plus examples of what I can build for your business
          </p>
        </div>
      </div>

      {/* How We'll Work Together - CENTERPIECE */}
      <div className="container">
        <div className="process-section">
          <Card>
            <div className="stacked" style={{ textAlign: "center" }}>
              <div>
                <p className="eyebrow" style={{ color: "var(--brand)" }}>The Process</p>
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

      {/* Filter */}
      <div className="container">
        <div className="projects-filter">
          <h2>See What's Possible</h2>
          <div className="segmented" role="tablist" aria-label="Project filter">
            <button
              role="tab"
              aria-selected={filter === "all"}
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All Projects
            </button>
            <button
              role="tab"
              aria-selected={filter === "case-study"}
              className={filter === "case-study" ? "active" : ""}
              onClick={() => setFilter("case-study")}
            >
              Case Studies
            </button>
            <button
              role="tab"
              aria-selected={filter === "example"}
              className={filter === "example" ? "active" : ""}
              onClick={() => setFilter("example")}
            >
              What I Can Build
            </button>
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="container">
        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <article 
              key={p.id} 
              className={`project-card-enhanced ${p.type}`}
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
                    {p.type === "case-study" ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        Case Study
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                          <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                        Example
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
        <section className="why-me-section">
          <div className="why-me-header">
            <p className="eyebrow">Why Work With Me?</p>
            <h2>What makes this different</h2>
          </div>
          <div className="why-me-grid">
            <article className="why-me-card">
              <div className="why-me-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h4>You work directly with me</h4>
              <p>No account managers, no junior devs learning on your dime. Just one experienced developer who knows your project inside and out.</p>
            </article>

            <article className="why-me-card">
              <div className="why-me-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <h4>Built for your workflow</h4>
              <p>Not a template or off-the-shelf solution. Every feature is designed around how you actually work, not how I think you should work.</p>
            </article>

            <article className="why-me-card">
              <div className="why-me-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </div>
              <h4>We iterate until it's right</h4>
              <p>Your feedback shapes the final product. No "take it or leave it" deliveries — we refine together until it solves your problem perfectly.</p>
            </article>

            <article className="why-me-card">
              <div className="why-me-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
              </div>
              <h4>Reliable and maintainable</h4>
              <p>Clean code, clear documentation, easy to update. Built to last and grow with your business.</p>
            </article>
          </div>
        </section>
      </div>

      {/* CTA Strip */}
      <section className="cta-strip" role="region" aria-label="Get started">
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
