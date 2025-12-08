import React, { useMemo, useState } from "react";

// --- Estimator ---
type ProjectTypeKey = "dashboard" | "integration" | "automation" | "ai-assistant" | "reporting";

type EstimatorConfig = {
    label: string;
    baseMin: number; // USD
    baseMax: number; // USD
    weeksMin: number;
    weeksMax: number;
};

const ESTIMATES: Record<ProjectTypeKey, EstimatorConfig> = {
    dashboard: { label: "Custom Dashboard", baseMin: 3000, baseMax: 8000, weeksMin: 2, weeksMax: 4 },
    integration: { label: "System Integration", baseMin: 2000, baseMax: 5000, weeksMin: 2, weeksMax: 3 },
    automation: { label: "Workflow Automation", baseMin: 2500, baseMax: 6000, weeksMin: 2, weeksMax: 4 },
    "ai-assistant": { label: "AI Assistant/Chatbot", baseMin: 4000, baseMax: 9000, weeksMin: 3, weeksMax: 6 },
    reporting: { label: "Automated Reporting", baseMin: 1500, baseMax: 4000, weeksMin: 1, weeksMax: 3 },
};

const currency = (n: number) => `$${n.toLocaleString()}`;

const Estimator: React.FC = () => {
    const [type, setType] = useState<ProjectTypeKey>("dashboard");
    const [complexity, setComplexity] = useState<"simple" | "moderate" | "complex">("moderate");
    const [urgency, setUrgency] = useState<"flex" | "normal" | "urgent">("normal");
    const [ctaOpen, setCtaOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<string | null>(null);

    // Compute estimate based on selections
    const { priceMin, priceMax, weeksMin, weeksMax } = useMemo(() => {
        const base = ESTIMATES[type];
        let min = base.baseMin;
        let max = base.baseMax;
        let wMin = base.weeksMin;
        let wMax = base.weeksMax;

        // Complexity modifier
        if (complexity === "simple") {
            min *= 0.7; max *= 0.7;
        } else if (complexity === "complex") {
            min *= 1.4; max *= 1.4;
            wMin = Math.round(wMin * 1.3);
            wMax = Math.round(wMax * 1.3);
        }

        // Urgency modifier
        if (urgency === "flex") {
            min *= 0.9; max *= 0.9; // small discount for flexibility
        } else if (urgency === "urgent") {
            min *= 1.3; max *= 1.3; 
            wMin = Math.max(1, Math.round(wMin * 0.7)); 
            wMax = Math.max(wMin, Math.round(wMax * 0.75));
        }

        // Round nicely
        const round = (x: number) => Math.round(x / 50) * 50; // to nearest $50
        return { priceMin: round(min), priceMax: round(max), weeksMin: wMin, weeksMax: wMax };
    }, [type, complexity, urgency]);

    function onQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const name = String(formData.get("name") || "");
        const email = String(formData.get("email") || "");

        setStatus(`Thanks${name ? `, ${name}` : ""}! I'll send a detailed quote to ${email} within 24 hours. (Demo only—wire to your email service or Formspree.)`);
        form.reset();
    }

    return (
        <section className="stacked">
            <div className="row row-between">
                <div>
                    <p className="eyebrow">Quick Estimator</p>
                    <h3>Get a ballpark estimate</h3>
                    <p className="muted">Answer a few questions to see a rough price range. Then request a detailed quote by email.</p>
                </div>
            </div>

            <div className="grid two">
                {/* Left: Questions */}
                <form className="stacked" onSubmit={(e) => e.preventDefault()}>
                    <label>
                        <span>What do you need?</span>
                        <select value={type} onChange={(e) => setType(e.target.value as ProjectTypeKey)}>
                            {Object.entries(ESTIMATES).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                            ))}
                        </select>
                    </label>

                    <fieldset className="fieldset">
                        <legend className="muted legend-pad">How complex is it?</legend>
                        <div className="segmented wrap" role="tablist" aria-label="Complexity">
                            <button type="button" role="tab" aria-selected={complexity === "simple"} className={complexity === "simple" ? "active" : ""} onClick={() => setComplexity("simple")}>Simple</button>
                            <button type="button" role="tab" aria-selected={complexity === "moderate"} className={complexity === "moderate" ? "active" : ""} onClick={() => setComplexity("moderate")}>Moderate</button>
                            <button type="button" role="tab" aria-selected={complexity === "complex"} className={complexity === "complex" ? "active" : ""} onClick={() => setComplexity("complex")}>Complex</button>
                        </div>
                        <p className="muted" style={{ fontSize: "0.85rem", marginTop: 8 }}>
                            Simple: 1-2 data sources, basic features. Complex: Many integrations, custom logic, multiple user roles.
                        </p>
                    </fieldset>

                    <label>
                        <span>Timeline</span>
                        <div className="segmented wrap" role="tablist" aria-label="Timeline urgency">
                            <button type="button" role="tab" aria-selected={urgency === "flex"} className={urgency === "flex" ? "active" : ""} onClick={() => setUrgency("flex")}>Flexible</button>
                            <button type="button" role="tab" aria-selected={urgency === "normal"} className={urgency === "normal" ? "active" : ""} onClick={() => setUrgency("normal")}>Normal</button>
                            <button type="button" role="tab" aria-selected={urgency === "urgent"} className={urgency === "urgent" ? "active" : ""} onClick={() => setUrgency("urgent")}>Urgent</button>
                        </div>
                    </label>
                </form>

                {/* Right: Results & CTA */}
                <div className="stacked">
                    <div className="card">
                        <h3>Estimated price range</h3>
                        <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                            {currency(priceMin)} – {currency(priceMax)}
                        </p>
                        <ul className="tags">
                            <li>{ESTIMATES[type].label}</li>
                            <li style={{ textTransform: "capitalize" }}>{complexity}</li>
                            <li style={{ textTransform: "capitalize" }}>{urgency}</li>
                        </ul>
                        <p className="muted">This is a ballpark estimate. Final pricing depends on specific requirements and integrations.</p>
                    </div>
                    <div className="card">
                        <h3>Estimated timeline</h3>
                        <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>{weeksMin}–{weeksMax} weeks</p>
                        <p className="muted">Timeline varies based on scope and current availability. Most projects launch in 2-8 weeks.</p>
                    </div>

                    {!ctaOpen ? (
                        <div>
                            <button className="btn primary" onClick={() => setCtaOpen(true)}>Request Detailed Quote</button>
                        </div>
                    ) : (
                        <form className="stacked" onSubmit={onQuoteSubmit} noValidate>
                            <label>
                                <span>Name</span>
                                <input name="name" type="text" placeholder="Your name" />
                            </label>
                            <label>
                                <span>Email</span>
                                <input name="email" type="email" required placeholder="you@example.com" />
                            </label>
                            <button className="btn primary" type="submit">Send Me a Quote</button>
                            {status && <p className="muted" role="status">{status}</p>}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Estimator;
