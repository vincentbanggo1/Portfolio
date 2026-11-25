import React, { useEffect, useRef, useState } from "react";
import About from "./about";
import Skills from "./skills";
import Projects from "./projects";
import Experience from "./experience";
import Contact from "./contact";
import Footer from "./footer";
import { G } from "./theme";

const ROLES = [
  "Full Stack Developer",
  "React Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

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
  .reveal{opacity:0;transform:translateY(36px);transition:opacity .7s ease,transform .7s ease}
  .reveal.visible{opacity:1;transform:none}
  @media(max-width:768px){body{cursor:auto}#cursor,#cursor-ring{display:none!important}.portfolio-grid{grid-template-columns:1fr!important}}
`;

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
        if (charIdx + 1 === current.length)
          setTimeout(() => setDeleting(true), pause);
        else setCharIdx((count) => count + 1);
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((index) => (index + 1) % words.length);
          setCharIdx(0);
        } else setCharIdx((count) => count - 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, deleteSpeed, pause]);

  return text;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event) => {
      mouse.current = { x: event.clientX, y: event.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = event.clientX + "px";
        cursorRef.current.style.top = event.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    let frame;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  const base = {
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    transform: "translate(-50%,-50%)",
  };
  return (
    <>
      <div
        id="cursor"
        ref={cursorRef}
        style={{ ...base, width: 12, height: 12, background: G.accent }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{
          ...base,
          width: 36,
          height: 36,
          border: `1.5px solid ${G.accent2}`,
          opacity: 0.6,
        }}
      />
    </>
  );
}

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const links = ["about", "skills", "projects", "experience", "contact"];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 6vw",
        background: "rgba(10,10,15,0.88)",
        backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${G.border}`,
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "2.5rem",
          color: G.accent2,
        }}
      >
        <span style={{ color: G.accent }}>&lt;</span>Vincent
        <span style={{ color: G.accent }}>/&gt;</span>
      </a>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link}`}
              style={{
                color: active === link ? G.accent2 : G.muted,
                fontFamily: "'Space Mono',monospace",
                fontSize: "1.5rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderBottom:
                  active === link
                    ? `1.5px solid ${G.accent2}`
                    : "1.5px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: G.accent2,
        }}
      >
        Menu
      </button>
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: 64,
            background: "rgba(10,10,15,0.97)",
            display: "flex",
            flexDirection: "column",
            padding: "3rem 6vw",
            gap: "2rem",
            zIndex: 99,
          }}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setOpen(false)}
              style={{
                color: G.text,
                fontSize: "1.4rem",
                textTransform: "capitalize",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 6vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${G.border} 1px,transparent 1px),linear-gradient(90deg,${G.border} 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)",
          top: "50%",
          left: "45%",
          animation: "pulseGlow 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.8rem",
            color: G.accent2,
            background: "rgba(124,58,237,0.1)",
            border: `1px solid ${G.border}`,
            padding: "6px 14px",
            borderRadius: 100,
            marginBottom: "1.8rem",
            animation: "fadeUp .6s ease forwards",
            opacity: 0,
          }}
        >
          <span style={{ color: G.accent }}>▸</span> Available for new
          opportunities
        </div>
        <h1
          style={{
            fontSize: "clamp(3rem,7vw,6rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            animation: "fadeUp .7s .1s ease forwards",
            opacity: 0,
          }}
        >
          Hi, I'm{" "}
          <span
            style={{
              background: `linear-gradient(135deg,${G.accent2},${G.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Vincent
            <br />
          </span>
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "clamp(1rem,2.5vw,1.25rem)",
            color: G.muted,
            marginTop: "1rem",
            minHeight: "2rem",
            animation: "fadeUp .7s .2s ease forwards",
            opacity: 0,
          }}
        >
          {typed}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1.1em",
              background: G.accent2,
              marginLeft: 2,
              verticalAlign: "middle",
              animation: "blink .7s infinite",
            }}
          />
        </p>
        <p
          style={{
            color: G.muted,
            fontSize: "1.05rem",
            lineHeight: 1.8,
            maxWidth: 520,
            marginTop: "1.5rem",
            animation: "fadeUp .7s .3s ease forwards",
            opacity: 0,
          }}
        >
          A passionate developer who crafts clean, performant, and beautiful
          digital experiences. I turn ideas into reality through code.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "2.5rem",
            animation: "fadeUp .7s .4s ease forwards",
            opacity: 0,
          }}
        >
          <a
            href="#projects"
            style={{
              padding: "0.75rem 2rem",
              background: G.accent,
              color: "#fff",
              borderRadius: 8,
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            style={{
              padding: "0.75rem 2rem",
              color: G.accent2,
              border: `1px solid ${G.border}`,
              borderRadius: 8,
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Get In Touch
          </a>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: G.muted,
          fontSize: "0.72rem",
          fontFamily: "'Space Mono',monospace",
          textTransform: "uppercase",
          animation: "fadeUp 1s 1s ease forwards",
          opacity: 0,
        }}
      >
        <span>scroll</span>
        <div
          style={{
            width: 1,
            height: 48,
            background: `linear-gradient(to bottom,${G.accent2},transparent)`,
            animation: "scrollDrop 1.5s 1s ease infinite",
          }}
        />
      </div>
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  useScrollReveal();

  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }),
      { threshold: 0.4 },
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
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
