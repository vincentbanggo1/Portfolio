import React from "react";
import { SectionHeader } from "./shared";
import { G } from "./theme";

const EXPERIENCE = [{
  date: "2025 – 2026",
  role: "Frontend Developer Intern",
  company: "Consolidated Paper Inc.",
  desc: "Developed and maintained frontend features using React, collaborated with design and backend teams, and improved performance and accessibility.",
}];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "6rem 6vw", background: G.bg }}>
      <SectionHeader label="// my journey" title="Experience" />
      <div className="reveal" style={{ position: "relative", paddingLeft: "2rem" }}>
        <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom,${G.accent},transparent)` }} />
        {EXPERIENCE.map(({ date, role, company, desc }) => (
          <div key={role} style={{ position: "relative", marginBottom: "3rem", paddingLeft: "1.5rem" }}>
            <div style={{ position: "absolute", left: "-2rem", top: 8, width: 10, height: 10, background: G.accent, borderRadius: "50%", boxShadow: "0 0 12px rgba(124,58,237,0.6)", border: `2px solid ${G.bg}` }} />
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.73rem", color: G.accent2, marginBottom: "0.4rem" }}>{date}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.2rem" }}>{role}</div>
            <div style={{ color: G.muted, fontSize: "0.88rem", marginBottom: "0.7rem" }}>{company}</div>
            <div style={{ color: G.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
