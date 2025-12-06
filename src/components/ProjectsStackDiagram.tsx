
// --- Tech Stack Diagram ---
import React from "react";
import {useState} from "react";

type StackKey = "frontend" | "backend" | "ci" | "hosting";

const STACK_COPY: Record<StackKey, { title: string; desc: string; tags: string[] }> = {
    frontend: {
        title: "Frontend",
        desc: "React + TypeScript for fast, maintainable UIs. Component‑driven, accessible, and responsive by default.",
        tags: ["React", "TypeScript", "Vite", "CSS"],
    },
    backend: {
        title: "Backend",
        desc: "Node.js APIs with Express/Fastify. PostgreSQL with an ORM like Prisma. Auth, validation, and observability.",
        tags: ["Node.js", "Express/Fastify", "PostgreSQL", "Prisma"],
    },
    ci: {
        title: "CI",
        desc: "Automated checks on every push: type‑checks, linting, tests, and build. GitHub Actions keeps shipping safe.",
        tags: ["GitHub Actions", "ESLint", "Prettier", "Vitest"],
    },
    hosting: {
        title: "Hosting",
        desc: "Modern platforms for speed and uptime: Vercel/Netlify for frontends; Render/Fly for apps and workers.",
        tags: ["Vercel", "Netlify", "Render", "Fly.io"],
    },
};

const TechStackDiagram: React.FC = () => {
    const [tab, setTab] = useState<StackKey>("frontend");

    return (
        <div className="stacked">
            <div className="segmented wrap" role="tablist" aria-label="Tech stack categories">
                {(["frontend", "backend", "ci", "hosting"] as StackKey[]).map((k) => (
                    <button
                        key={k}
                        type="button"
                        role="tab"
                        aria-selected={tab === k}
                        className={tab === k ? "active" : ""}
                        onClick={() => setTab(k)}
                        aria-controls={`stack-panel-${k}`}
                        id={`stack-tab-${k}`}
                    >
                        {STACK_COPY[k].title}
                    </button>
                ))}
            </div>

            <div id={`stack-panel-${tab}`} role="tabpanel" aria-labelledby={`stack-tab-${tab}`} className="fade-in">
                <h4>{STACK_COPY[tab].title}</h4>
                <p className="muted">{STACK_COPY[tab].desc}</p>
                <div className="grid grid-tight">
                    <ul className="tags">
                        {STACK_COPY[tab].tags.map((t) => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


export default TechStackDiagram;