import React from "react";
import { SectionHeader } from "./shared";
import { G } from "./theme";

const PROJECTS = [
  {
    emoji: "🔭",
    grad: "linear-gradient(135deg,#1e0e30,#30004a)",
    title: "Nasa-Project",
    desc: "A full-stack mission control app where users can schedule, browse, and abort space launches. Built with React, Node.js/Express, and MongoDB to demonstrate full-stack development and REST API integration skills.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "JavaScript (ES6)",
      "HTML5",
      "CSS3",
      "RESTful APIs",
    ],
    gh: "https://github.com/vincentbanggo1/Nasa-Project",
  },
  {
    emoji: "📝",
    grad: "linear-gradient(135deg,#1e0e30,#30004a)",
    title: "Keeper App",
    desc: "A Google Keep-inspired app for creating notes with a title and content, viewing them in a clean interface and deleting them when no longer needed. a responsive note-taking web application inspired by Google Keep",
    tags: ["React.js", "JavaScript (ES6)", "HTML5", "CSS3"],
    gh: "https://github.com/vincentbanggo1/Keeper-app",
  },
  {
    emoji: "🌐",
    grad: "linear-gradient(135deg,#1e0e30,#30004a)",
    title: "Vlogproject",
    desc: "A responsive social media web application where users can create posts, upload photos and videos, and interact through comments.",
    tags: [
      "React.js",
      "Zustand",
      "JavaScript (ES6)",
      "HTML5",
      "TailwindCss",
      "Php",
      "Laravel",
    ],
    gh: "https://github.com/vincentbanggo1/Vlog-Project",
  },
  {
    emoji: "👗",
    grad: "linear-gradient(135deg,#1e0e30,#30004a)",
    title: "StitchSense: AI-Assisted Virtual Gown Fitting",
    desc: "A capstone application concept for body measurement support and 3D virtual gown fitting, with customer and administrator workflows.",
    tags: [
      "React.js",
      "Google Gemini",
      "JavaScript (ES6)",
      "HTML5",
      "TailwindCss",
      "Php",
      "Laravel",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "6rem 6vw", background: G.bg2 }}>
      <SectionHeader label="// what i've built" title="Projects" />
      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))",
          gap: "1.5rem",
        }}
      >
        {PROJECTS.map(({ emoji, grad, title, desc, tags, gh }) => (
          <div
            key={title}
            style={{
              background: G.bg3,
              border: `1px solid ${G.border}`,
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "border-color .2s,transform .2s,box-shadow .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = G.accent2;
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 16px 48px rgba(124,58,237,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = G.border;
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                height: 160,
                background: grad,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                position: "relative",
              }}
            >
              {emoji}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg,transparent 40%,${G.bg3})`,
                }}
              />
            </div>
            <div
              style={{
                padding: "1.4rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  color: G.muted,
                  fontSize: "0.87rem",
                  lineHeight: 1.65,
                  flex: 1,
                  marginBottom: "1rem",
                }}
              >
                {desc}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: "1.2rem",
                }}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: "0.7rem",
                      background: "rgba(124,58,237,0.12)",
                      color: G.accent3,
                      padding: "3px 9px",
                      borderRadius: 4,
                      border: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={gh}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: G.accent2,
                }}
              >
                ⌥ GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
