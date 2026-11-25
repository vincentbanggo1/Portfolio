import React from "react";
import { G } from "./theme";

export function SectionHeader({ label, title }) {
  return (
    <div className="reveal">
      <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.75rem", color: G.accent2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem", opacity: 0.8 }}>{label}</p>
      <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.9rem" }}>{title}</h2>
      <div style={{ width: 56, height: 3, background: `linear-gradient(90deg,${G.accent},${G.accent2})`, borderRadius: 2, marginBottom: "3.5rem" }} />
    </div>
  );
}
