import React from "react";
import { SectionHeader } from "./shared";
import { G } from "./theme";

export default function About() {
  return (
    <section id="about" style={{ padding: "6rem 6vw", background: G.bg2 }}>
      <SectionHeader label="// who i am" title="About Me" />
      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          {[
            <>
              Hey there! I'm{" "}
              <strong style={{ color: G.accent2 }}>Vincent</strong>, a developer
              based in Philippines who loves building things for the web. I have
              a strong passion for creating elegant solutions to complex
              problems.
            </>,
            <>
              I specialize in building full-stack applications with a focus on
              performance, accessibility, and great user experiences.
            </>,
            <>
              I believe that the best code is not just functional, but also{" "}
              <strong style={{ color: G.accent2 }}>
                readable, maintainable, and purposeful
              </strong>
              .
            </>,
          ].map((p, i) => (
            <p
              key={i}
              style={{
                color: G.muted,
                lineHeight: 1.8,
                fontSize: "1rem",
                marginBottom: "1rem",
              }}
            >
              {p}
            </p>
          ))}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            {[
              ["Fresh Graduate", "Years Experience"],
              ["4", "Projects Built"],
              ["10+", "Technologies"],
              ["∞", "Coffee Consumed"],
            ].map(([n, l]) => (
              <div
                key={l}
                style={{
                  background: G.bg3,
                  border: `1px solid ${G.border}`,
                  borderRadius: 12,
                  padding: "1.2rem",
                  transition: "border-color .2s,transform .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = G.accent2;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = G.border;
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    fontFamily: "'Space Mono',monospace",
                    background: `linear-gradient(135deg,${G.accent2},${G.accent})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    color: G.muted,
                    fontSize: "0.82rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: G.bg3,
            border: `1px solid ${G.border}`,
            borderRadius: 16,
            padding: "2rem",
            marginTop: "220px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h3 style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>
            Vincent
          </h3>
          <span
            style={{
              display: "inline-block",
              background: "rgba(124,58,237,0.15)",
              color: G.accent2,
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.76rem",
              padding: "4px 10px",
              borderRadius: 4,
              marginBottom: "1.2rem",
            }}
          >
            Full Stack Developer
          </span>
          {[
            [
              "🎓",
              "Degree",
              "Bachelors Of Science in Information Technology / BSIT",
            ],
            ["💼", "Status", "Open to Work", "#4ade80"],
          ].map(([icon, label, val, col]) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span>{icon}</span>
              <span
                style={{ color: G.muted, fontSize: "0.83rem", minWidth: 68 }}
              >
                {label}
              </span>
              <span style={{ fontSize: "0.9rem", color: col || G.text }}>
                {val}
              </span>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.4rem" }}>
            {[
              ["⌥", "https://github.com/vincentbanggo1"],
              [
                "in",
                "https://www.linkedin.com/in/edmund-vincent-banggo-588128362/",
              ],
              ["M", "mailto:vincentbanggo1@gmail.com"],
            ].map(([icon, href]) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 38,
                  height: 38,
                  border: `1px solid ${G.border}`,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: G.muted,
                  fontSize: "1rem",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = G.accent2;
                  e.currentTarget.style.color = G.accent2;
                  e.currentTarget.style.background = G.glow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = G.border;
                  e.currentTarget.style.color = G.muted;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
