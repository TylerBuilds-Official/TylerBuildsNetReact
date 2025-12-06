
// --- Process Stepper ---
import React, {useState} from "react";

const steps = [
    {
        title: "Discovery",
        desc:
            "We clarify goals, users, constraints, and success metrics. Quick workshops and a lightweight brief to align scope.",
    },
    {
        title: "Design",
        desc:
            "Wireframes to UI. We validate flows and content early. Accessibility and responsiveness are designed in from the start.",
    },
    {
        title: "Build",
        desc:
            "Iterative development with frequent demos. Type‑safe APIs, tests where it matters, and performance by default.",
    },
    {
        title: "Launch",
        desc:
            "Deploy with CI/CD, monitoring, and analytics. We QA, polish, and switch traffic on with a rollback plan.",
    },
    {
        title: "Support",
        desc:
            "Post‑launch iteration, fixes, and small enhancements. Optional retainers keep things running smoothly.",
    },
];

const ProcessStepper: React.FC = () => {
    const [idx, setIdx] = useState<number>(0);

    function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            setIdx((i) => Math.min(steps.length - 1, i + 1));
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            setIdx((i) => Math.max(0, i - 1));
        }
    }

    return (
        <div className="stacked" onKeyDown={onKeyDown}>
            <div className="segmented wrap" role="tablist" aria-label="Project process steps">
                {steps.map((s, i) => (
                    <button
                        key={s.title}
                        type="button"
                        role="tab"
                        aria-selected={idx === i}
                        className={idx === i ? "active" : ""}
                        onClick={() => setIdx(i)}
                        aria-controls={`step-panel-${i}`}
                        id={`step-tab-${i}`}
                    >
                        <span aria-hidden="true" className="step-badge">{i + 1}</span>
                        <span>{s.title}</span>
                    </button>
                ))}
            </div>

            {/* Progress line */}
            <div aria-hidden="true" className="progress-track">
                <div className="progress-fill" style={{ width: `${(idx / (steps.length - 1)) * 100}%` }} />
            </div>

            <div
                id={`step-panel-${idx}`}
                role="tabpanel"
                aria-labelledby={`step-tab-${idx}`}
                className="fade-in"
            >
                <h4>{steps[idx].title}</h4>
                <p className="muted" aria-live="polite">{steps[idx].desc}</p>
            </div>
        </div>
    );
};


export default ProcessStepper;