import React, { useMemo, useState } from "react";
import Estimator from "../components/ProjectsEstimator.tsx";
import ProcessStepper from "../components/ProjectsProcessStepper.tsx";
import TechStackDiagram from "../components/ProjectsStackDiagram.tsx";
import Card from "../components/GlobalUICard.tsx";

type Project = {
  title: string;
  description: string;
  link?: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "This site. React + TypeScript + Vite with clean, responsive UI.",
    link: "#",
    tags: ["React", "TypeScript", "Vite"],
  },
  {
    title: "API Dashboard",
    description: "Monitoring dashboard with charts and real‑time metrics.",
    link: "#",
    tags: ["React", "Charts", "WebSockets"],
  },
  {
    title: "Design System",
    description: "Reusable component library with tokens and theming.",
    link: "#",
    tags: ["Design System", "Storybook", "CSS"],
  },
];

const Projects: React.FC = () => {
  // Interactive mini-chart: toggle between Web Apps vs Internal Tools datasets
  type DataPoint = { label: string; value: number };
  const [view, setView] = useState<"web" | "tools">("web");
  const data = useMemo<Record<typeof view, DataPoint[]>>(
    () => ({
      web: [
        { label: "Landing", value: 6 },
        { label: "App", value: 9 },
        { label: "Auth", value: 7 },
        { label: "API", value: 8 },
        { label: "Perf", value: 5 },
      ],
      tools: [
        { label: "Dash", value: 8 },
        { label: "Syncs", value: 7 },
        { label: "Ops", value: 6 },
        { label: "Import", value: 9 },
        { label: "Jobs", value: 7 },
      ],
    }),
    []
  );

  const current = data[view];
  const [active, setActive] = useState<number | null>(null);

  const maxValue = Math.max(...current.map((d) => d.value), 10);
  const barWidth = 42;
  const gap = 18;
  const chartPadding = 20;
  const height = 200;
  const width = current.length * barWidth + (current.length - 1) * gap + chartPadding * 2;

  return (
    <section className="container stacked">
      <h2>Projects</h2>
      <Card>
        <div className="stacked">
          <div className="row row-between">
            <div>
              <p className="eyebrow">Highlights</p>
              <h3>Recent work at a glance</h3>
            </div>
            <div className="segmented" role="tablist" aria-label="Project view">
              <button
                role="tab"
                aria-selected={view === "web"}
                className={view === "web" ? "active" : ""}
                onClick={() => setView("web")}
              >
                Web Apps
              </button>
              <button
                role="tab"
                aria-selected={view === "tools"}
                className={view === "tools" ? "active" : ""}
                onClick={() => setView("tools")}
              >
                Internal Tools
              </button>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="chart" role="img" aria-label={`Mini bar chart for ${view === "web" ? "Web Apps" : "Internal Tools"} highlights`}>
            <svg viewBox={`0 0 ${width} ${height + chartPadding * 2}`} width="100%" height={height + chartPadding * 2}>
              {/* Axes (subtle) */}
              <line x1={chartPadding} y1={height + chartPadding} x2={width - chartPadding} y2={height + chartPadding} stroke="var(--border)" />
              {/* Bars */}
              {current.map((d, i) => {
                const x = chartPadding + i * (barWidth + gap);
                const barH = Math.round((d.value / maxValue) * height);
                const y = height + chartPadding - barH;
                const isActive = active === i;
                return (
                  <g key={d.label} className="bar">
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barH}
                      rx={8}
                      fill="var(--brand)"
                      opacity={isActive ? 1 : 0.7}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(null)}
                      tabIndex={0}
                      aria-label={`${d.label}: ${d.value}`}
                    />
                    <text x={x + barWidth / 2} y={height + chartPadding + 14} textAnchor="middle" fontSize={12} fill="var(--muted)">
                      {d.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            {active !== null && (
              <div className="chart-tooltip" role="status" aria-live="polite">
                <strong>{current[active].label}</strong>
                <span>{current[active].value}</span>
              </div>
            )}
          </div>
          <p className="muted">
            Hover or focus bars to inspect. Numbers indicate relative scope/throughput across recent work.
          </p>
        </div>
      </Card>

      {/* Tech stack & process visualizations */}
      <div className="grid">
        {/* Interactive process stepper */}
        <article className="card" aria-labelledby="process-heading">
          <div className="stacked">
            <div>
              <p className="eyebrow">Process</p>
              <h3 id="process-heading">From idea to shipped product</h3>
            </div>
            <ProcessStepper />
          </div>
        </article>

        {/* Interactive tech stack diagram */}
        <article className="card" aria-labelledby="stack-heading">
          <div className="stacked">
            <div>
              <p className="eyebrow">Tech Stack</p>
              <h3 id="stack-heading">What I use and why</h3>
            </div>
            <TechStackDiagram />
          </div>
        </article>
      </div>

      {/* Simple Project Estimator */}
      <Card>
        <Estimator />
      </Card>

      <div className="grid">
        {projects.map((p) => (
          <article key={p.title} className="card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="tags">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {p.link && (
              <p>
                <a href={p.link} className="btn" target="_blank" rel="noreferrer">
                  View
                </a>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;