import React from "react";

const Blog: React.FC = () => {
  return (
    <>
      <section className="container" aria-labelledby="blog-heading">
        <div className="stacked">
          <p className="eyebrow">Blog</p>
          <h1 id="blog-heading">Insights for hiring and building better software</h1>
          <p className="muted">Practical, non‑fluffy guidance for founders and teams planning web projects.</p>
        </div>
      </section>

      <section className="container features" aria-label="Articles">
        <article className="card">
          <h2>What to prepare before hiring a developer</h2>
          <p className="muted">Reduce risk, move faster, and get better proposals by clarifying a few essentials up front.</p>
          <ul className="list">
            <li><strong>Goals:</strong> What outcomes matter? Leads, conversions, internal efficiency, revenue, or learning?</li>
            <li><strong>Scope & must‑haves:</strong> Prioritize the 3–5 capabilities needed for a usable first release.</li>
            <li><strong>Users:</strong> Who will use it, and what are their top tasks?</li>
            <li><strong>Content & data:</strong> Existing brand assets, copy, datasets, API access, and owners.</li>
            <li><strong>Constraints:</strong> Timeline windows, compliance, integrations, budget bands.</li>
            <li><strong>Decision process:</strong> Stakeholders, review cadence, and a single point‑of‑contact.</li>
          </ul>
          <p className="muted">Having these reduces back‑and‑forth and helps me propose accurate timelines and pricing.</p>
        </article>

        <article className="card">
          <h2>How a better website can increase leads</h2>
          <p className="muted">Small changes compound: clarity, speed, and credibility all affect conversion.</p>
          <ul className="list">
            <li><strong>Clear messaging:</strong> Above‑the‑fold value prop, who it’s for, and why it’s different.</li>
            <li><strong>Focused paths:</strong> Primary CTA, fewer competing options, and frictionless forms.</li>
            <li><strong>Speed:</strong> Fast loads improve SEO and reduce bounce. Ship only what’s needed.</li>
            <li><strong>Proof:</strong> Logos, testimonials, case studies, and specific outcomes.</li>
            <li><strong>Measure:</strong> Track events and funnels; iterate on what moves the needle.</li>
          </ul>
          <p className="muted">The result is more qualified conversations with the right prospects.</p>
        </article>

        <article className="card">
          <h2>Non‑technical guide to choosing a tech stack</h2>
          <p className="muted">Pick technology by constraints, not trends. Here’s a plain‑English lens:</p>
          <ul className="list">
            <li><strong>Team fit:</strong> Can your team hire for it or maintain it? Common stacks reduce risk.</li>
            <li><strong>Use‑case:</strong> Marketing sites need speed and CMS; apps need auth, data, and testing.</li>
            <li><strong>Integrations:</strong> Choose what plays nicely with your CRM, analytics, and data sources.</li>
            <li><strong>Time‑to‑value:</strong> Fewer moving parts, proven libraries, and solid hosting.</li>
            <li><strong>Cost:</strong> Avoid lock‑in and surprise usage fees; prefer transparent pricing.</li>
          </ul>
          <p className="muted">My default stack for most web apps: TypeScript, React, Node, and a relational DB with a clean API layer.</p>
        </article>
      </section>

      <section className="container" aria-labelledby="faq-heading">
        <div className="card">
          <div className="stacked">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading">Common questions</h2>
          </div>

          <div className="faq">
            <details>
              <summary>How long does a project take?</summary>
              <p className="muted">It depends on scope. Small sites ship in 2–4 weeks; feature‑rich apps are usually phased over 6–12+ weeks. I’m happy to propose a phased plan with milestones.</p>
            </details>
            <details>
              <summary>How do payments work?</summary>
              <p className="muted">Typically 50% to start, 30% at feature complete, 20% on launch. Fixed‑fee or weekly billing are available depending on the engagement.</p>
            </details>
            <details>
              <summary>Do you offer maintenance?</summary>
              <p className="muted">Yes—ongoing support, updates, and small enhancements are available via monthly retainers or on‑demand blocks.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
