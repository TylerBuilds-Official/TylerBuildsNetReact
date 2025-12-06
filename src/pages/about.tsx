import React from "react";

const About: React.FC = () => {
  return (
    <section className="stacked">
      <h2>About Me</h2>
      <h3>From Steel to Software</h3>
      <p>
        I’m Tyler — a developer, builder, and problem‑solver based in Spokane, WA. My path
        into software is a little different: I spent years in construction and fabrication,
        where reliability and precision aren’t optional.
      </p>
      <p className="muted">
        That mindset is baked into how I build websites and tools today: clear scope, clean code,
        and battle‑tested solutions that hold up in the real world.
      </p>
      <p>
        I help small businesses and teams ship fast, tidy web experiences and lightweight internal
        tools—without the bloat. If it reduces friction for your customers or saves your team time,
        I’m interested.
      </p>
      <p>
        I’m Tyler, a full‑stack developer who builds both public‑facing web apps and
        internal tools tailored to a company’s custom data. From front‑end UX to
        back‑end services and deployments, I ship reliable, maintainable software
        that helps teams move faster.
      </p>
      <p className="muted">
        Well‑trusted by startups and internal teams — I focus on security, performance,
        and pragmatic solutions that scale.
      </p>
      <h3>Skills</h3>
      <ul className="tags">
        <li>TypeScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>REST</li>
        <li>GraphQL</li>
        <li>Vite</li>
        <li>Testing</li>
        <li>CI/CD</li>
      </ul>
    </section>
  );
};

export default About;
