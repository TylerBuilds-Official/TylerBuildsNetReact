import React, { useState } from "react";


const CALENDAR_URL = "https://calendly.com/tylere-tylerbuilds/project-meeting-15-minutes?hide_gdpr_banner=1&background_color=12161b&text_color=5aa9ff&primary_color=5aa9ff";

const Contact: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<
    | "New website"
    | "Redesign"
    | "Web app"
    | "Ongoing dev support"
    | "Not sure"
  >("New website");
  const [budget, setBudget] = useState<
    | "<$2k"
    | "$2–5k"
    | "$5–10k"
    | "$10–20k"
    | "$20k+"
    | "Not sure"
  >("$2–5k");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    // @ts-ignore
      const message = String(fd.get("message") || "");
    // Message unused, backend doesn't exist yet

    setStatus(
      `Thanks${name ? `, ${name}` : ""}! I’ll reply within 24 hours (Mon–Fri).\n` +
      `Project type: ${projectType} · Budget: ${budget}.\n` +
      `We’ll follow up at ${email}. (Submission not actually sent — wire this to Formspree/Resend/serverless when ready.)`
    );
    form.reset();
  }

  return (
    <section className="stacked">
      <h2>Contact</h2>
      <p>Have an opportunity or question? I’d love to hear from you.</p>
      <div className="grid two">
        {/* Left: conversion-focused short form */}
        <form className="card" onSubmit={onSubmit} noValidate>
          <label>
            <span>Name</span>
            <input name="name" type="text" required placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" required placeholder="you@example.com" />
          </label>

          <fieldset
            aria-label="Project type"
            style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 12 }}
          >
            <legend className="muted" style={{ padding: "0 6px" }}>Project type</legend>
            <div role="radiogroup" aria-label="Quick select project type" className="segmented" style={{ flexWrap: "wrap" }}>
              {[
                "New website",
                "Redesign",
                "Web app",
                "Ongoing dev support",
                "Not sure",
              ].map((label) => (
                <button
                  key={label}
                  type="button"
                  role="radio"
                  aria-checked={projectType === label}
                  className={projectType === label ? "active" : ""}
                  onClick={() => setProjectType(label as typeof projectType)}
                  style={{ margin: 4 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <label>
            <span>Rough budget</span>
            <select value={budget} onChange={(e) => setBudget(e.target.value as typeof budget)}>
              <option value="<$2k">Under $2k</option>
              <option value="$2–5k">$2–5k</option>
              <option value="$5–10k">$5–10k</option>
              <option value="$10–20k">$10–20k</option>
              <option value="$20k+">$20k+</option>
              <option value="Not sure">Not sure</option>
            </select>
          </label>

          <label>
            <span>Message</span>
            <textarea name="message" rows={5} required placeholder="Tell me a bit about your goals, timelines, and what success looks like." />
          </label>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn primary" type="submit">Send</button>
            <a className="btn" href={CALENDAR_URL} target="_blank" rel="noreferrer">
              Book a free 15‑minute call
            </a>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>I reply within 24 hours, Monday – Saturday.</p>

          {status && (
            <p className="muted" role="status" style={{ whiteSpace: "pre-wrap" }}>
              {status}
            </p>
          )}
        </form>

        <div className="card">
          <h3>Quick chat</h3>
          <p className="muted">Prefer to talk it through? Grab a time that works for you.</p>
          <p>
            <a className="btn primary" href={CALENDAR_URL} target="_blank" rel="noreferrer">Book a free 15‑minute call</a>
          </p>
          <p className="muted">I reply to messages within 24 hours (Mon–Fri).</p>
          <hr style={{ border: 0, borderTop: "1px solid var(--border)", margin: "14px 0" }} />
          <h3>Elsewhere</h3>
          <ul>
            <li><a href="mailto:info@tylerbuilds.net">info@tylerbuilds.net</a></li>
            <li><a href="https://github.com/tylerbuilds" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/tylerbuilds" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>


    </section>



  );
};

export default Contact;
