import React, { useState } from "react";
import { Link } from "react-router-dom";

const guides = [
  {
    id: "signs",
    number: "01",
    title: "5 signs your business needs automation",
    intro: "If any of these sound familiar, automation could save you significant time and money:",
    items: [
      { label: "Manual data entry", desc: "Your team copies information between systems daily — inventory, orders, customer data, or reports." },
      { label: "Waiting on reports", desc: "You spend hours each week pulling data from different places to create status reports or dashboards." },
      { label: "Repetitive customer questions", desc: "Your support team answers the same questions over and over, slowing response times." },
      { label: "Approval bottlenecks", desc: "Purchase requests, time off, or project approvals sit in email for days with no tracking." },
      { label: "Disconnected tools", desc: "Your CRM, accounting software, and project management tools don't talk to each other." },
    ],
    outro: "Sound like your business? Automation can eliminate these pain points and free up your team for higher-value work.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
  },
  {
    id: "roi",
    number: "02",
    title: "How automation pays for itself",
    intro: "Custom automation is an investment that typically pays back within months through time savings and error reduction:",
    items: [
      { label: "Calculate your cost", desc: "If automation saves 10 hours per week at $50/hour loaded cost, that's $26,000/year in recovered time." },
      { label: "Factor in errors", desc: "Manual processes lead to mistakes — wrong inventory counts, billing errors, missed follow-ups. These cost money to fix." },
      { label: "Consider opportunity cost", desc: "What could your team accomplish with 10+ extra hours per week? New customers? Product improvements?" },
      { label: "Break-even timeline", desc: "Most automation projects in the $3-8k range pay for themselves in 3-6 months through time savings alone." },
    ],
    outro: "Not every process needs automation, but the right ones transform how your business operates.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
  },
  {
    id: "process",
    number: "03",
    title: "What to expect when working together",
    intro: "Here's how a typical project unfolds, from first contact to launch:",
    items: [
      { label: "Discovery (Week 1)", desc: "We discuss your challenge, current workflow, and goals. I ask questions to understand exactly what you need." },
      { label: "Proposal (Week 1-2)", desc: "I send a clear proposal with scope, timeline, and pricing. We refine until it's exactly right." },
      { label: "Build (2-8 weeks)", desc: "I build your solution in phases, showing you progress regularly. You give feedback, I adjust." },
      { label: "Refinement (Final week)", desc: "We polish everything based on real-world testing. Training if needed." },
      { label: "Launch & support", desc: "Deploy smoothly with monitoring. I'm available for questions and ongoing improvements." },
    ],
    outro: "You work directly with me throughout — no handoffs to junior developers or account managers.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
  },
  {
    id: "examples",
    number: "04",
    title: "Common automation projects",
    intro: "Here are examples of problems I've solved for businesses like yours:",
    items: [
      { label: "Inventory sync", desc: "Automatically keep warehouse, accounting, and e-commerce systems in sync. No more manual updates or inventory mismatches." },
      { label: "Automated reporting", desc: "Generate weekly/monthly reports automatically with charts and insights — delivered to your inbox or dashboard." },
      { label: "Customer onboarding portal", desc: "Self-service setup for new customers with document upload, e-signatures, and automatic notifications." },
      { label: "AI support assistant", desc: "Chatbot trained on your help docs that answers common questions 24/7, reducing support load." },
      { label: "Approval workflows", desc: "Track purchase requests, PTO, or project approvals with notifications and clear audit trails." },
      { label: "System integrations", desc: "Connect your CRM, accounting, project management, and communication tools so data flows automatically." },
    ],
    outro: null,
    outroLink: { text: "See more detailed examples and case studies", href: "/projects" },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "How long does a project take?",
    answer: "Most automation projects take 2-8 weeks depending on complexity. Simple integrations can launch in 2 weeks, while custom dashboards or AI solutions might take 6-8 weeks. I'll give you a clear timeline upfront.",
  },
  {
    question: "How much does automation cost?",
    answer: "Projects typically range from $1,000-$10,000 depending on scope. Simple integrations or reports start around $1-3k, while comprehensive dashboards or AI assistants run $5-10k.",
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes — after launch, I'm available for updates, adjustments, and ongoing maintenance. You can work with me on a monthly retainer or as-needed basis. Most clients appreciate having someone who knows their system when they need changes.",
  },
  {
    question: "What if I'm not sure what I need?",
    answer: "That's completely normal! Schedule a free consultation and we'll talk through your pain points. I'll help you identify what's worth automating and what's better left manual. No pressure, no obligation.",
  },
  {
    question: "Will this work with my existing tools?",
    answer: "Almost certainly. I've integrated with everything from modern cloud tools (Salesforce, QuickBooks, Slack) to legacy systems and custom databases. If it has an API or database connection, we can work with it.",
  },
];

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void }> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span>{question}</span>
        <svg
          className="faq-chevron"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className="faq-content">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const Guides: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="guides-page">
      {/* Hero Section */}
      <section className="guides-hero">
        <div className="container">
          <div className="guides-hero-content">
            <p className="eyebrow">Guides</p>
            <h1>Is automation right for your business?</h1>
            <p className="subtitle">
              Practical guidance to help you decide if custom automation makes sense — and what to expect when working together.
            </p>
          </div>
        </div>
      </section>

      {/* Guide Cards */}
      <section className="container guides-grid" aria-label="Helpful guides">
        {guides.map((guide) => (
          <article key={guide.id} className="guide-card">
            <div className="guide-card-header">
              <div className="guide-icon">{guide.icon}</div>
              <span className="guide-number">{guide.number}</span>
            </div>
            <h2>{guide.title}</h2>
            <p className="guide-intro">{guide.intro}</p>
            <ul className="guide-list">
              {guide.items.map((item, idx) => (
                <li key={idx}>
                  <span className="guide-list-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <div>
                    <strong>{item.label}:</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
            {guide.outro && <p className="guide-outro">{guide.outro}</p>}
            {guide.outroLink && (
              <p className="guide-outro">
                <Link to={guide.outroLink.href}>{guide.outroLink.text} →</Link>
              </p>
            )}
          </article>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="container">
        <div className="faq-section">
          <div className="faq-header">
            <p className="eyebrow">FAQ</p>
            <h2>Common questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="cta-strip" role="region" aria-label="Get started">
        <div className="container cta-strip-inner">
          <p><strong>Ready to explore automation for your business?</strong> Let's talk about your specific needs.</p>
          <Link to="/contact" className="btn primary">Schedule a Free Consultation</Link>
        </div>
      </section>
    </div>
  );
};

export default Guides;
