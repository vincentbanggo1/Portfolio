import React from "react";
import { G } from "./theme";

export default function Footer() {
  return (
    <footer style={{ background: G.bg, borderTop: `1px solid ${G.border}`, padding: "2rem 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.8rem", color: G.muted }}>
        © 2026 <strong style={{ color: G.accent2 }}>Vincent</strong>. Built with ❤️ and lots of ☕
      </div>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        {[["GitHub", "https://github.com/vincentbanggo1"], ["LinkedIn", "https://www.linkedin.com/in/edmund-vincent-banggo-588128362/"]].map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ color: G.muted, fontSize: "0.82rem", transition: "color .2s" }}>{label}</a>
        ))}
      </div>
    </footer>
  );
}
