import { useState, useEffect, useRef, useCallback } from "react";


/* ── STYLES ─────────────────────────────────────────────────────── */
const G = {
  bg: "#0a0a0f", bg2: "#0f0f1a", bg3: "#13131f",
  accent: "#7c3aed", accent2: "#a78bfa", accent3: "#c4b5fd",
  text: "#e2e8f0", muted: "#64748b",
  border: "rgba(124,58,237,0.22)", glow: "rgba(124,58,237,0.13)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:${G.bg};color:${G.text};font-family:'Space Grotesk',sans-serif;overflow-x:hidden;cursor:none}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:${G.bg2}}
  ::-webkit-scrollbar-thumb{background:${G.accent};border-radius:3px}
  a{color:inherit;text-decoration:none}
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes pulseGlow{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.12)}}
  @keyframes scrollDrop{0%{opacity:0;transform:scaleY(0);transform-origin:top}50%{opacity:1;transform:scaleY(1);transform-origin:top}100%{opacity:0;transform:scaleY(1);transform-origin:bottom}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .reveal{opacity:0;transform:translateY(36px);transition:opacity .7s ease,transform .7s ease}
  .reveal.visible{opacity:1;transform:none}
  @media(max-width:768px){body{cursor:auto}#cursor,#cursor-ring{display:none!important}}
`;

/* ── DATA ────────────────────────────────────────────────────────── */
const ROLES = [
  "Full Stack Developer",
  "React Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

const SKILLS = [
  {
    cat: "Frontend",
    items: [
      { name: "React.js", pct: 90 },
      {name: "Next.js", pct: 90},
       {name: "Redux", pct: 90},
      { name: "JavaScript (ES6+)", pct: 88 },
      { name: "HTML & CSS", pct: 92 },
      { name: "TypeScript", pct: 75 },
    ],
  },
  {
    cat: "Backend",
    items: [
      { name: "Node.js", pct: 82 },
      { name: "Express.js", pct: 80 },
      { name: "REST APIs", pct: 85 },
      { name: "MongoDB", pct: 76 },
      { name: "PostgresSQL", pct: 76 },
    ],
  },
  {
    cat: "Tools & DevOps",
    items: [
      { name: "Git & GitHub", pct: 90 },
      { name: "Visual Studio Code", pct: 90 },
      { name: "Postman", pct: 78 },
      { name: "Figma", pct: 72 },
    ],
  },
];

const PROJECTS = [
  {
    emoji: "🔭",
    grad: "linear-gradient(135deg,#1e0e30,#30004a)",
    title: "Nasa-Project",
    desc: "A full-stack mission control app where users can schedule, browse, and abort space launches. Built with React, Node.js/Express, and MongoDB to demonstrate full-stack development and REST API integration skills.",
    tags: ["React.js", "Node.js", "Express.js", "JavaScript (ES6)", "HTML5", "CSS3", "RESTful APIs", ],
    gh: "https://github.com/vincentbanggo1/Nasa-Project",
  },

  {
    emoji: "📝",
    grad: "linear-gradient(135deg,#1e0e30,#30004a)",
    title: "Keeper App",
    desc: "Developed a responsive note-taking web application inspired by Google Keep",
    tags: ["React.js", "JavaScript (ES6)", "HTML5", "CSS3",],
    gh: "https://github.com/vincentbanggo1/Keeper-app",
  },

   {
    emoji: "📝",
    grad: "linear-gradient(135deg,#1e0e30,#30004a)",
    title: "Vlogproject",
    desc: "A responsive social media web application where users can create posts, upload photos and videos, and interact through comments. It demonstrates my skills in building interactive, user-friendly, and responsive web applications using modern web technologie ",
    tags: ["React.js", "Zustand", "JavaScript (ES6)", "HTML5", "TailwindCss", "Php", "Laravel",],
    gh: "https://github.com/vincentbanggo1/Vlog-Project",
  },
 
];

const EXPERIENCE = [

  {
    date: "2025 – 2026",
    role: "Frontend Developer Intern",
    company: "Consolidated Paper Inc.",
    desc: "Developed and maintained frontend features using , collaborated with design and backend teams, improved performance and accessibility.",
  },
 
];

/* ── HOOKS ───────────────────────────────────────────────────────── */
function useTypewriter(words, speed = 80, deleteSpeed = 50, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? deleteSpeed : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, deleteSpeed, pause]);

  return text;
}

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useSkillBars() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[data-width]").forEach((bar) => {
              bar.style.width = bar.dataset.width + "%";
            });
          }
        }),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".skills-grid").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── SUB-COMPONENTS ──────────────────────────────────────────────── */

function Cursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  const base = {
    position: "fixed", borderRadius: "50%",
    pointerEvents: "none", zIndex: 9999,
    transform: "translate(-50%,-50%)", transition: "width .2s,height .2s",
  };
  return (
    <>
      <div id="cursor" ref={curRef} style={{ ...base, width: 12, height: 12, background: G.accent }} />
      <div id="cursor-ring" ref={ringRef} style={{ ...base, width: 36, height: 36, border: `1.5px solid ${G.accent2}`, background: "transparent", opacity: 0.6, transition: "width .2s,height .2s,border-color .2s" }} />
    </>
  );
}

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const links = ["about", "skills", "projects", "experience", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.2rem 6vw",
      background: "rgba(10,10,15,0.88)", backdropFilter: "blur(18px)",
      borderBottom: `1px solid ${G.border}`,
    }}>
      <a href="#hero" style={{ fontFamily: "'Space Mono',monospace", fontSize: "1.1rem", color: G.accent2 }}>
        <span style={{ color: G.accent }}>&lt;</span>Vincent<span style={{ color: G.accent }}>/&gt;</span>
      </a>

      {/* Desktop links */}
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", "@media(max-width:768px)": { display: "none" } }}>
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l}`} style={{
              color: active === l ? G.accent2 : G.muted,
              fontFamily: "'Space Mono',monospace", fontSize: "0.78rem",
              letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
              transition: "color .2s",
              borderBottom: active === l ? `1.5px solid ${G.accent2}` : "1.5px solid transparent",
              paddingBottom: "2px",
            }}>{l}</a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} style={{
        display: "none", flexDirection: "column", gap: 5, background: "none",
        border: "none", cursor: "pointer", padding: 4,
        "@media(max-width:768px)": { display: "flex" },
      }} aria-label="Menu">
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 24, height: 2, background: G.accent2, borderRadius: 2, display: "block" }} />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, top: 64,
          background: "rgba(10,10,15,0.97)",
          display: "flex", flexDirection: "column",
          padding: "3rem 6vw", gap: "2rem", zIndex: 99,
        }}>
          {links.map((l) => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)}
              style={{ color: G.text, fontSize: "1.4rem", textTransform: "capitalize", fontWeight: 600 }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div className="reveal">
      <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.75rem", color: G.accent2, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem", opacity: 0.8 }}>{label}</p>
      <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.9rem" }}>{title}</h2>
      <div style={{ width: 56, height: 3, background: `linear-gradient(90deg,${G.accent},${G.accent2})`, borderRadius: 2, marginBottom: "3.5rem" }} />
    </div>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 6vw", position: "relative", overflow: "hidden" }}>
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${G.border} 1px,transparent 1px),linear-gradient(90deg,${G.border} 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)",
        pointerEvents: "none",
      }} />
      {/* Glow orb */}
      <div style={{
        position: "absolute", width: 600, height: 600,
        background: `radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)`,
        top: "50%", left: "45%", animation: "pulseGlow 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "'Space Mono',monospace", fontSize: "0.8rem", color: G.accent2,
          background: `rgba(124,58,237,0.1)`, border: `1px solid ${G.border}`,
          padding: "6px 14px", borderRadius: 100, marginBottom: "1.8rem",
          animation: "fadeUp .6s ease forwards", opacity: 0,
        }}>
          <span style={{ color: G.accent }}>▸</span> Available for new opportunities
        </div>

        <h1 style={{
          fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 700, lineHeight: 1.0,
          letterSpacing: "-0.04em",
          animation: "fadeUp .7s .1s ease forwards", opacity: 0,
        }}>
          Hi, I'm{" "}
          <span style={{ background: `linear-gradient(135deg,${G.accent2},${G.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Vincent<br />
          </span>
        </h1>

        <p style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(1rem,2.5vw,1.25rem)",
          color: G.muted, marginTop: "1rem", minHeight: "2rem",
          animation: "fadeUp .7s .2s ease forwards", opacity: 0,
        }}>
          {typed}
          <span style={{ display: "inline-block", width: 2, height: "1.1em", background: G.accent2, marginLeft: 2, verticalAlign: "middle", animation: "blink .7s infinite" }} />
        </p>

        <p style={{
          color: G.muted, fontSize: "1.05rem", lineHeight: 1.8,
          maxWidth: 520, marginTop: "1.5rem",
          animation: "fadeUp .7s .3s ease forwards", opacity: 0,
        }}>
          A passionate developer who crafts clean, performant, and beautiful digital experiences. I turn ideas into reality through code.
        </p>

        <div style={{
          display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem",
          animation: "fadeUp .7s .4s ease forwards", opacity: 0,
        }}>
          <a href="#projects" style={btnPrimary}>View My Work</a>
          <a href="#contact" style={btnGhost}>Get In Touch</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        color: G.muted, fontSize: "0.72rem", fontFamily: "'Space Mono',monospace",
        letterSpacing: "0.1em", textTransform: "uppercase",
        animation: "fadeUp 1s 1s ease forwards", opacity: 0,
      }}>
        <span>scroll</span>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom,${G.accent2},transparent)`, animation: "scrollDrop 1.5s 1s ease infinite" }} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "6rem 6vw", background: G.bg2 }}>
      <SectionHeader label="// who i am" title="About Me" />
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}>
        {/* Text side */}
        <div>
          {[
            <>Hey there! I'm <strong style={{ color: G.accent2 }}>Vincent</strong>, a developer based in Philippines who loves building things for the web. I have a strong passion for creating elegant solutions to complex problems.</>,
            <>I specialize in building full-stack applications with a focus on performance, accessibility, and great user experiences.,</>,
            <>I believe that the best code is not just functional, but also <strong style={{ color: G.accent2 }}>readable, maintainable, and purposeful</strong>.</>,
          ].map((p, i) => (
            <p key={i} style={{ color: G.muted, lineHeight: 1.8, fontSize: "1rem", marginBottom: "1rem" }}>{p}</p>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
            {[["Fresh Graduate", "Years Experience"], ["5", "Projects Built"], ["10+", "Technologies"], ["∞", "Coffee Consumed"]].map(([n, l]) => (
              <div key={l} style={{
                background: G.bg3, border: `1px solid ${G.border}`, borderRadius: 12, padding: "1.2rem",
                transition: "border-color .2s,transform .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G.accent2; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "'Space Mono',monospace", background: `linear-gradient(135deg,${G.accent2},${G.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                <div style={{ color: G.muted, fontSize: "0.82rem", marginTop: "0.25rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card side */}
        <div style={{ background: G.bg3, border: `1px solid ${G.border}`, borderRadius: 16, padding: "2rem", marginTop: "220px", position: "relative", overflow: "hidden" }}>
          <h3 style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>Vincent</h3>
          <span style={{ display: "inline-block", background: "rgba(124,58,237,0.15)", color: G.accent2, fontFamily: "'Space Mono',monospace", fontSize: "0.76rem", padding: "4px 10px", borderRadius: 4, marginBottom: "1.2rem" }}>Full Stack Developer</span>
          {[ ["🎓", "Degree", "Bachelors Of Science in Information Technology / BSIT"], ["💼", "Status", "Open to Work", "#4ade80"], ].map(([icon, label, val, col]) => (
            <div key={label} style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
              <span>{icon}</span>
              <span style={{ color: G.muted, fontSize: "0.83rem", minWidth: 68 }}>{label}</span>
              <span style={{ fontSize: "0.9rem", color: col || G.text }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.4rem" }}>
            {[["⌥", "https://github.com/vincentbanggo1"], ["in", "https://www.linkedin.com/in/edmund-vincent-banggo-588128362/"], ["M", "mailto:vincentbanggo1@gmail.com"]].map(([icon, href]) => (
              <a key={icon} href={href} target="_blank" rel="noreferrer" style={{
                width: 38, height: 38, border: `1px solid ${G.border}`, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: G.muted, fontSize: "1rem", transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G.accent2; e.currentTarget.style.color = G.accent2; e.currentTarget.style.background = G.glow; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.muted; e.currentTarget.style.background = "transparent"; }}
              >{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  useSkillBars();
  return (
    <section id="skills" style={{ padding: "6rem 6vw", background: G.bg }}>
      <SectionHeader label="// what i work with" title="Skills" />
      <div className="reveal skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.5rem" }}>
        {SKILLS.map(({ cat, items }) => (
          <div key={cat} style={{ background: G.bg3, border: `1px solid ${G.border}`, borderRadius: 14, padding: "1.5rem", transition: "border-color .2s,transform .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = G.accent2; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.76rem", color: G.accent2, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem", paddingBottom: "0.75rem", borderBottom: `1px solid ${G.border}` }}>{cat}</div>
            {items.map(({ name, pct }) => (
              <div key={name} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: "0.87rem", fontWeight: 500 }}>{name}</span>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.76rem", color: G.accent2 }}>{pct}%</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
                  <div data-width={pct} style={{ height: "100%", borderRadius: 100, background: `linear-gradient(90deg,${G.accent},${G.accent2})`, width: 0, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "6rem 6vw", background: G.bg2 }}>
      <SectionHeader label="// what i've built" title="Projects" />
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.5rem" }}>
        {PROJECTS.map(({ emoji, grad, title, desc, tags, gh, live }) => (
          <div key={title} style={{ background: G.bg3, border: `1px solid ${G.border}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color .2s,transform .2s,box-shadow .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = G.accent2; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 48px rgba(124,58,237,0.15)`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ height: 160, background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", position: "relative" }}>
              {emoji}
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 40%,${G.bg3})` }} />
            </div>
            <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.5rem" }}>{title}</div>
              <div style={{ color: G.muted, fontSize: "0.87rem", lineHeight: 1.65, flex: 1, marginBottom: "1rem" }}>{desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.2rem" }}>
                {tags.map((t) => (
                  <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", background: "rgba(124,58,237,0.12)", color: G.accent3, padding: "3px 9px", borderRadius: 4, border: `1px solid rgba(124,58,237,0.2)` }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href={gh} target="_blank" rel="noreferrer" style={{ fontSize: "0.82rem", fontWeight: 600, color: G.accent2, display: "flex", alignItems: "center", gap: 5, transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = G.accent3}
                  onMouseLeave={e => e.currentTarget.style.color = G.accent2}
                >⌥ GitHub</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "6rem 6vw", background: G.bg }}>
      <SectionHeader label="// my journey" title="Experience" />
      <div className="reveal" style={{ position: "relative", paddingLeft: "2rem" }}>
        <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom,${G.accent},transparent)` }} />
        {EXPERIENCE.map(({ date, role, company, desc }) => (
          <div key={role} style={{ position: "relative", marginBottom: "3rem", paddingLeft: "1.5rem" }}>
            <div style={{ position: "absolute", left: "-2rem", top: 8, width: 10, height: 10, background: G.accent, borderRadius: "50%", boxShadow: `0 0 12px rgba(124,58,237,0.6)`, border: `2px solid ${G.bg}` }} />
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

function Contact() {
  
  const inputStyle = {
    background: G.bg3, border: `1px solid ${G.border}`, borderRadius: 8,
    padding: "0.75rem 1rem", color: G.text, fontFamily: "'Space Grotesk',sans-serif",
    fontSize: "0.95rem", outline: "none", width: "100%",
    transition: "border-color .2s,box-shadow .2s",
  };

  return (
    <section id="contact" style={{ padding: "6rem 6vw", background: G.bg2 }}>
      <SectionHeader label="// let's talk" title="Get In Touch" />
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", flexWrap: "wrap" }}>
    
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", justifyContent: "center" }}>
          {[
            ["📧", "Email", "vincentbanggo1@gmail.com"],
            ["⌥", "GitHub", "github.com/vincentbanggo1"],
            ["💼", "Status", "Open to opportunities", "#4ade80"],
          ].map(([icon, label, val, col]) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <div style={{ width: 44, height: 44, flexShrink: 0, background: "rgba(124,58,237,0.12)", border: `1px solid ${G.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{icon}</div>
              <div>
                <div style={{ fontSize: "0.76rem", color: G.muted, marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: "0.95rem", color: col || G.text }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: G.bg, borderTop: `1px solid ${G.border}`, padding: "2rem 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.8rem", color: G.muted }}>
        © 2026 <strong style={{ color: G.accent2 }}>Vincent</strong>. Built with ❤️ and lots of ☕
      </div>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        {[["GitHub", "https://github.com/vincentbanggo1"], ["LinkedIn", "https://www.linkedin.com/in/edmund-vincent-banggo-588128362/"]].map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ color: G.muted, fontSize: "0.82rem", transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = G.accent2}
            onMouseLeave={e => e.currentTarget.style.color = G.muted}
          >{label}</a>
        ))}
      </div>
    </footer>
  );
}

/* ── BUTTON STYLES ───────────────────────────────────────────────── */
const btnPrimary = {
  padding: "0.75rem 2rem", background: G.accent, color: "#fff",
  border: "none", borderRadius: 8, fontFamily: "'Space Grotesk',sans-serif",
  fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
  textDecoration: "none", display: "inline-block",
  boxShadow: "0 0 24px rgba(124,58,237,0.35)",
  transition: "background .2s,transform .15s,box-shadow .2s",
};
const btnGhost = {
  padding: "0.75rem 2rem", background: "transparent",
  color: G.accent2, border: `1px solid ${G.border}`, borderRadius: 8,
  fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.9rem", fontWeight: 600,
  cursor: "pointer", textDecoration: "none", display: "inline-block",
  transition: "background .2s,transform .15s,border-color .2s",
};

/* ── ROOT APP ────────────────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  useScrollReveal();

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <Cursor />
      <Nav active={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}