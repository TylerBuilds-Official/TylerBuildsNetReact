import React, { useMemo, useState } from "react";

// --- Estimator ---
type ProjectTypeKey = "landing" | "multi" | "saas" | "ecom" | "app";

type EstimatorConfig = {
    label: string;
    baseMin: number; // USD
    baseMax: number; // USD
    weeksMin: number;
    weeksMax: number;
};

const ESTIMATES: Record<ProjectTypeKey, EstimatorConfig> = {
    landing: { label: "Landing page", baseMin: 1200, baseMax: 2800, weeksMin: 1, weeksMax: 2 },
    multi: { label: "Multi-page site", baseMin: 2500, baseMax: 6500, weeksMin: 2, weeksMax: 4 },
    saas: { label: "SaaS MVP", baseMin: 9000, baseMax: 22000, weeksMin: 4, weeksMax: 8 },
    ecom: { label: "E-commerce", baseMin: 6000, baseMax: 15000, weeksMin: 3, weeksMax: 6 },
    app: { label: "Web app/portal", baseMin: 7000, baseMax: 18000, weeksMin: 3, weeksMax: 7 },
};

const currency = (n: number) => `$${n.toLocaleString()}`;

const Estimator: React.FC = () => {
    const [type, setType] = useState<ProjectTypeKey>("landing");
    const [needsDesign, setNeedsDesign] = useState<boolean>(true);
    const [needsCopy, setNeedsCopy] = useState<boolean>(false);
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

        // Design adds ~15%
        if (needsDesign) {
            min *= 1.15; max *= 1.15; wMin += 0; wMax += 0; // timeline unchanged; included in base for some
        }
        // Copy adds ~8%
        if (needsCopy) {
            min *= 1.08; max *= 1.08; wMin += 0; wMax += 0;
        }
        // Urgency modifier
        if (urgency === "flex") {
            min *= 0.95; max *= 0.95; // small discount for flexibility
        } else if (urgency === "urgent") {
            min *= 1.25; max *= 1.25; wMin = Math.max(1, Math.round(wMin * 0.75)); wMax = Math.max(wMin, Math.round(wMax * 0.8));
        }

        // Round nicely
        const round = (x: number) => Math.round(x / 50) * 50; // to nearest $50
        return { priceMin: round(min), priceMax: round(max), weeksMin: wMin, weeksMax: wMax };
    }, [type, needsDesign, needsCopy, urgency]);

    function onQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const name = String(formData.get("name") || "");
        const email = String(formData.get("email") || "");

        // TODO: Add Azure backend function for calendar and email comms
        // No backend: mirror Contact page behavior
        setStatus(`Thanks${name ? `, ${name}` : ""}! I’ll send a detailed quote to ${email}. (Demo only—wire to your email service or Formspree.)`);
        form.reset();
    }

    return (
        <section className="stacked">
            <div className="row row-between">
                <div>
                    <p className="eyebrow">Estimator</p>
                    <h3>Get a quick project estimate</h3>
                    <p className="muted">Answer a few questions to see a ballpark. Then get a detailed quote by email.</p>
                </div>
            </div>

            <div className="grid two">
                {/* Left: Questions */}
                <form className="stacked" onSubmit={(e) => e.preventDefault()}>
                    <label>
                        <span>Type of project</span>
                        <select value={type} onChange={(e) => setType(e.target.value as ProjectTypeKey)}>
                            {Object.entries(ESTIMATES).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                            ))}
                        </select>
                    </label>

                    <fieldset className="fieldset">
                        <legend className="muted legend-pad">What do you need?</legend>
                        <label className="row" style={{ margin: 0 }}>
                            <input type="checkbox" checked={needsDesign} onChange={(e) => setNeedsDesign(e.target.checked)} />
                            <span>Design</span>
                        </label>
                        <label className="row" style={{ marginTop: 8 }}>
                            <input type="checkbox" checked={needsCopy} onChange={(e) => setNeedsCopy(e.target.checked)} />
                            <span>Copy</span>
                        </label>
                        <p className="muted">Development is always included.</p>
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
                            {needsDesign && <li>Design</li>}
                            {needsCopy && <li>Copy</li>}
                            <li style={{ textTransform: "capitalize" }}>{urgency}</li>
                        </ul>
                        <p className="muted">Not a quote; final pricing depends on scope and integrations.</p>
                    </div>
                    <div className="card">
                        <h3>Estimated timeline</h3>
                        <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>{weeksMin}–{weeksMax} weeks</p>
                        <p className="muted">Subject to availability and complexity.</p>
                    </div>

                    {!ctaOpen ? (
                        <div>
                            <button className="btn primary" onClick={() => setCtaOpen(true)}>Get a detailed quote by email</button>
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
                            <button className="btn primary" type="submit">Send my detailed quote</button>
                            {status && <p className="muted" role="status">{status}</p>}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Estimator;