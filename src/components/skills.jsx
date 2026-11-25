import React, { useEffect } from "react";
import { SectionHeader } from "./shared";
import { G } from "./theme";

const SKILLS = [
  {
    cat: "Programing Languages",
    items: [
      { name: "JavaScript", pct: 88 },
      { name: "PHP", pct: 80 },
      { name: "Python", pct: 86 },
      { name: "Java", pct: 86 },
    ],
  },
  {
    cat: "Frontend",
    items: [
      { name: "React.js", pct: 90 },
      { name: "Next.js", pct: 90 },
      { name: "Redux", pct: 90 },
      { name: "JavaScript (ES6+)", pct: 88 },
      { name: "HTML & CSS", pct: 92 },
      { name: "TypeScript", pct: 75 },
    ],
  },
  {
    cat: "Backend",
    items: [
      { name: "Laravel", pct: 82 },
      { name: "Node.js", pct: 82 },
      { name: "Express.js", pct: 80 },
      { name: "Flask", pct: 85 },
      { name: "Django", pct: 85 },
      { name: "REST APIs", pct: 85 },
    ],
  },
  {
    cat: "DataBase",
    items: [
      { name: "MongoDB", pct: 86 },
      { name: "SQL", pct: 81 },
      { name: "PostgresSQL", pct: 88 },
      { name: "MySQL", pct: 76 },
      { name: "SQLlite", pct: 86 },
    ],
  },
  {
    cat: "Tools & DevOps",
    items: [
      { name: "Git & GitHub", pct: 90 },
      { name: "Visual Studio Code", pct: 90 },
      { name: "Postman", pct: 78 },
      { name: "Figma", pct: 72 },
      { name: "Python(OOP)", pct: 86 },
      { name: " LangChain", pct: 80 },
    ],
  },
];

export default function Skills() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll("[data-width]").forEach((bar) => {
              bar.style.width = bar.dataset.width + "%";
            });
        }),
      { threshold: 0.2 },
    );
    document.querySelectorAll(".skills-grid").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" style={{ padding: "6rem 6vw", background: G.bg }}>
      <SectionHeader label="// what i work with" title="Skills" />
      <div
        className="reveal skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: "1.5rem",
        }}
      >
        {SKILLS.map(({ cat, items }) => (
          <div
            key={cat}
            style={{
              background: G.bg3,
              border: `1px solid ${G.border}`,
              borderRadius: 14,
              padding: "1.5rem",
              transition: "border-color .2s,transform .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = G.accent2;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = G.border;
              e.currentTarget.style.transform = "none";
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.76rem",
                color: G.accent2,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1.2rem",
                paddingBottom: "0.75rem",
                borderBottom: `1px solid ${G.border}`,
              }}
            >
              {cat}
            </div>
            {items.map(({ name, pct }) => (
              <div key={name} style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: "0.87rem", fontWeight: 500 }}>
                    {name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: "0.76rem",
                      color: G.accent2,
                    }}
                  >
                    {pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: 5,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 100,
                    overflow: "hidden",
                  }}
                >
                  <div
                    data-width={pct}
                    style={{
                      height: "100%",
                      borderRadius: 100,
                      background: `linear-gradient(90deg,${G.accent},${G.accent2})`,
                      width: 0,
                      transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
