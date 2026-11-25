import React from "react";
import { SectionHeader } from "./shared";
import { G } from "./theme";

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "6rem 6vw", background: G.bg2 }}>
      <SectionHeader label="// let's talk" title="Get In Touch" />
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", justifyContent: "center" }}>
          {[["📧", "Email", "vincentbanggo1@gmail.com"], ["⌥", "GitHub", "github.com/vincentbanggo1"], ["💼", "Status", "Open to opportunities", "#4ade80"]].map(([icon, label, val, col]) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <div style={{ width: 44, height: 44, flexShrink: 0, background: "rgba(124,58,237,0.12)", border: `1px solid ${G.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{icon}</div>
              <div><div style={{ fontSize: "0.76rem", color: G.muted, marginBottom: 2 }}>{label}</div><div style={{ fontSize: "0.95rem", color: col || G.text }}>{val}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
