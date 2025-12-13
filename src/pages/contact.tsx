import React, { useState } from "react";

const CALENDAR_URL = "https://calendly.com/tylere-tylerbuilds/project-meeting-15-minutes?hide_gdpr_banner=1&background_color=12161b&text_color=5aa9ff&primary_color=5aa9ff";

const Contact: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [challenge, setChallenge] = useState<
    | "manual-data-entry"
    | "disconnected-tools"
    | "repetitive-tasks"
    | "need-reporting"
    | "slow-customer-service"
    | "other"
  >("manual-data-entry");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const details = String(fd.get("details") || "");
    const phone = String(fd.get("phone") || "");
    const company = String(fd.get("company") || "");

    const challengeMap = {
      "manual-data-entry": "Too much manual data entry",
      "disconnected-tools": "Disconnected tools",
      "repetitive-tasks": "Repetitive tasks",
      "need-reporting": "Need better reporting",
      "slow-customer-service": "Customer service takes too long",
      "other": "Other challenge",
    };

    const selectedChallenge = challengeMap[challenge];

    const subject = `New challenge from ${name}: ${selectedChallenge}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\nDetails:\n${details}`;

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        body: JSON.stringify({ subject, body }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setStatus(
          `Thanks${name ? `, ${name}` : ""}! I'll review your situation and reply within 24 hours.\n` +
          `We'll follow up at ${email}.\n\n`
      );

      form.reset();
      setChallenge("manual-data-entry");

    } catch (error) {
      console.error(error);
      setStatus(
          "Whoops! Something went wrong. I still want to hear from you!\n" +
          "Please send your situation over to info@tylerbuilds.net\n\n" +
          "Here's what you sent:\n\n" +
          subject + "\n" +
          body + "\n" +
          "Thanks!"
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className="container contact-page">
      <div className="contact-intro">
        <h2>Let's Talk About Your Challenge</h2>
        <p className="muted">
          Tell me about the problem you're facing. I'll review your situation and we'll schedule a call to explore solutions together — no pressure, no obligation.
        </p>
      </div>

      <div className="contact-grid">
        <form className="card contact-form-card contact-form" onSubmit={onSubmit} noValidate>
          <div className="stacked">
            <div>
              <h3>What's your biggest challenge?</h3>
              <p className="muted">Choose the one that sounds most like your situation:</p>
            </div>

            <fieldset aria-label="Main challenge" className="fieldset">

              <legend className="muted legend-pad">Select your challenge</legend>
              <div className="stacked" style={{ gap: 8 }}>

                  <label className="row" style={{ margin: 0, cursor: "pointer" }}>
                  <input 
                    type="radio" 
                    name="challenge"
                    value="manual-data-entry"
                    checked={challenge === "manual-data-entry"}
                    onChange={(e) => setChallenge(e.target.value as typeof challenge)}/>
                  <span>Too much manual data entry</span>
                </label>

                <label className="row" style={{ margin: 0, cursor: "pointer" }}>
                  <input 
                    type="radio" 
                    name="challenge"
                    value="disconnected-tools"
                    checked={challenge === "disconnected-tools"}
                    onChange={(e) => setChallenge(e.target.value as typeof challenge)}/>
                  <span>Disconnected tools that don't talk to each other</span>
                </label>

                <label className="row" style={{ margin: 0, cursor: "pointer" }}>
                  <input
                    type="radio" 
                    name="challenge"
                    value="repetitive-tasks"
                    checked={challenge === "repetitive-tasks"}
                    onChange={(e) => setChallenge(e.target.value as typeof challenge)}/>
                  <span>Repetitive tasks eating up time</span>
                </label>

                <label className="row" style={{ margin: 0, cursor: "pointer" }}>
                  <input 
                    type="radio" 
                    name="challenge"
                    value="need-reporting"
                    checked={challenge === "need-reporting"}
                    onChange={(e) => setChallenge(e.target.value as typeof challenge)}/>
                  <span>Need better reporting and visibility</span>
                </label>

                <label className="row" style={{ margin: 0, cursor: "pointer" }}>
                  <input 
                    type="radio" 
                    name="challenge"
                    value="slow-customer-service"
                    checked={challenge === "slow-customer-service"}
                    onChange={(e) => setChallenge(e.target.value as typeof challenge)}/>
                  <span>Customer service is too slow</span>
                </label>

                <label className="row" style={{ margin: 0, cursor: "pointer" }}>
                  <input 
                    type="radio" 
                    name="challenge"
                    value="other"
                    checked={challenge === "other"}
                    onChange={(e) => setChallenge(e.target.value as typeof challenge)}/>
                  <span>Something else (explain below)</span>
                </label>

              </div>
            </fieldset>

            <label>
              <span>Tell me more about it</span>
              <textarea 
                name="details" 
                rows={5} 
                required 
                placeholder="What's this costing you in time or money? What have you tried so far? How many people does this affect?"/>
            </label>

            <hr />

            <label>
              <span>Your name</span>
              <input name="name" type="text" required placeholder="Your name" />
            </label>

            <label>
              <span>Email</span>
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>

            <label>
              <span>Phone (optional)</span>
              <input name="phone" type="tel" placeholder="555-123-4567" />
            </label>

            <label>
              <span>Company name (optional)</span>
              <input name="company" type="text" placeholder="Your company" />
            </label>

            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send My Challenge"}
            </button>

            <p className="muted" style={{ marginTop: 8 }}>I'll reply within 24 hours, Monday – Saturday.</p>

            {status && (
              <div className="card contact-status">
                <p className="muted" role="status">
                  {status}
                </p>
              </div>
            )}
          </div>
        </form>

        <div className="stacked">
          <div className="card">
            <div className="stacked">
              <h3>What happens next?</h3>
              <div className="process-steps">
                <div className="process-step">
                  <p className="muted process-step-title">
                    <strong>1. I'll review your situation</strong>
                  </p>
                  <p className="muted process-step-description">
                    Within 24 hours, I'll send a thoughtful reply about your challenge and whether automation makes sense.
                  </p>
                </div>
                <div className="process-step">
                  <p className="muted process-step-title">
                    <strong>2. We'll schedule a free call</strong>
                  </p>
                  <p className="muted process-step-description">
                    30 minutes to dive deeper into your workflow and explore potential solutions. No sales pitch.
                  </p>
                </div>
                <div className="process-step">
                  <p className="muted process-step-title">
                    <strong>3. I'll send you a clear proposal</strong>
                  </p>
                  <p className="muted process-step-description">
                    If it's a fit, you'll get a detailed proposal with timeline, pricing, and exactly what we'll build. No surprises.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="stacked">
              <h3>Or book a call directly</h3>
              <p className="muted">Prefer to talk first? No problem — grab a time that works for you.</p>
              <a className="btn primary" href={CALENDAR_URL} target="_blank" rel="noreferrer">
                Schedule Free 30-Minute Call
              </a>
            </div>
          </div>

          <div className="card">
            <div className="stacked">
              <h3>Other ways to reach me</h3>
              <ul className="contact-methods">
                <li><a href="mailto:info@tylerbuilds.net">info@tylerbuilds.net</a></li>
                <li><a href="https://github.com/tylerbuilds-official" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/tyler-emery-15a612396/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
