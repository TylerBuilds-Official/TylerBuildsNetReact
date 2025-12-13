
// --- Process Stepper ---
import React, {useState} from "react";

const steps = [
    {
        title: "Discovery",
        desc:
            "We talk through your challenge, current workflow, and goals. I ask questions to understand exactly what you need and what success looks like.",
    },
    {
        title: "Proposal",
        desc:
            "I send a clear proposal with scope, timeline, and pricing. We refine it together until it's exactly right — no surprises or hidden costs.",
    },
    {
        title: "Build",
        desc:
            "I build your solution in phases, showing you progress regularly. You give feedback, I adjust. This keeps us aligned and ensures it fits your needs.",
    },
    {
        title: "Refine",
        desc:
            "We polish everything based on real-world testing and your team's feedback. Training if needed, documentation provided.",
    },
    {
        title: "Launch & Support",
        desc:
            "Deploy smoothly with monitoring in place. I'm available for questions, adjustments, and ongoing improvements as your business grows.",
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
            <div className="process-stepper">
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
