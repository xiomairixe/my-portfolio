"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

// ============================================================
// DATA
// ============================================================
const YOUR_NAME     = "Glen Honrado";
const YOUR_FIRST    = "Glen";
const YOUR_TAGLINE  = "I build end-to-end web applications and aspire to secure them — focused on real-world impact, clean code, and growing into cybersecurity.";
const YOUR_EMAIL    = "glenhonrado282004@gmail.com";
const YOUR_PHONE    = "09167060932";
const YOUR_WEBSITE  = "glenprtflio.vercel.app";
const YOUR_GITHUB   = "github.com/xiomairixe";
const YOUR_LINKEDIN = "linkedin.com/in/glen-honrado-8694b4322";
const TYPING_ROLES  = ["Full-Stack", "Frontend", "Backend", "PenTester"];

const SKILL_CATEGORIES = [
  { title: "Frontend",       skills: ["React", "Next.js", "Vue.js", "Quasar", "TypeScript", "TailwindCSS", "Bootstrap"] },
  { title: "Backend",        skills: ["PHP", "Laravel", "Python", "Node.js", "Express.js", "REST APIs"] },
  { title: "Database",       skills: ["MySQL", "MongoDB", "SQLite"] },
  { title: "Infrastructure", skills: ["Docker", "Linux", "WSL", "Raspberry Pi", "Kali Linux"] },
  { title: "Tooling",        skills: ["Git", "GitLab", "Postman", "Figma", "VS Code", "GitHub Actions"] },
  { title: "Deployment",     skills: ["Vercel", "Render", "MongoDB Atlas", "Cloudflare", "Indevfinite"] },
];

const PROJECTS = [
  {
    id: 1,
    title: "Administrative System",
    description: "Comprehensive system covering Facilities Reservation, Visitor Management, and Document Management — with real-time availability, conflict prevention, and a responsive UI.",
    tags: ["PHP", "Bootstrap", "MySQL"],
    images: ["/FacilitiesReservation.png", "/Facilities.png", "/Reservation.png"],
    github: "https://github.com/xiomairixe",
    accent: "#f59e0b",
  },
  {
    id: 2,
    title: "My Store Management System",
    description: "Full-stack system for inventory tracking, sales monitoring, and reporting for small retail stores. Built with a REST API backend and a reactive frontend.",
    tags: ["React", "Express.js", "MongoDB", "Tailwind CSS"],
    images: ["/StoreManagement.png", "/StoreManagement2.png"],
    github: "https://github.com/xiomairixe",
    accent: "#34d399",
  },
  {
    id: 3,
    title: "RFID DTR Attendance System",
    description: "Automated digital time-tracking solution using RFID technology to record employee and student attendance. Tap a card to log time in/out with zero manual input.",
    tags: ["Laravel", "Vue.js", "Quasar", "MySQL"],
    images: [],
    github: "https://github.com/xiomairixe",
    accent: "#60a5fa",
  },
  {
    id: 4,
    title: "FinTrack — Personal Finance Tracker",
    description: "Personal finance application to track income, expenses, and savings goals — giving users a clear picture of where their money goes.",
    tags: ["React", "Node.js", "MongoDB"],
    images: [],
    github: "https://github.com/xiomairixe",
    accent: "#a78bfa",
  },
];

// ============================================================
// PARTICLE BACKGROUND  (amber in dark, indigo-tinted in light)
// ============================================================
function ParticleBg({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const pts       = useRef<{ x:number; y:number; vx:number; vy:number; r:number; pulse:number; ps:number }[]>([]);
  const darkRef   = useRef(dark);
  const COUNT = 78, LINK = 148, SPEED = 0.28;

  useEffect(() => { darkRef.current = dark; }, [dark]);

  const init = useCallback((w: number, h: number) => {
    pts.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,  y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED, vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.4 + 0.5,
      pulse: Math.random() * Math.PI * 2, ps: 0.007 + Math.random() * 0.006,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    const resize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; init(W, H); };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const p   = pts.current;
      const col = darkRef.current ? "245,158,11" : "99,102,241";

      for (const pt of p) {
        pt.x += pt.vx; pt.y += pt.vy; pt.pulse += pt.ps;
        if (pt.x < 0) pt.x = W; if (pt.x > W) pt.x = 0;
        if (pt.y < 0) pt.y = H; if (pt.y > H) pt.y = 0;
      }
      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x, dy = p[i].y - p[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${col},${(1 - d / LINK) * (darkRef.current ? 0.10 : 0.08)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p[i].x, p[i].y); ctx.lineTo(p[j].x, p[j].y);
            ctx.stroke();
          }
        }
      }
      for (const pt of p) {
        const b = 0.5 + 0.5 * Math.sin(pt.pulse);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (0.8 + 0.2 * b), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${(darkRef.current ? 0.28 : 0.18) * (0.55 + 0.45 * b)})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(rafRef.current); };
  }, [init]);

  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }} />;
}

// ============================================================
// IMAGE CAROUSEL
// ============================================================
function ProjectCarousel({ images, accent, title }: { images: string[]; accent: string; title: string }) {
  const [idx,     setIdx]     = useState(0);
  const [loaded,  setLoaded]  = useState<Record<number,boolean>>({});
  const [errored, setErrored] = useState<Record<number,boolean>>({});

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };

  if (images.length === 0 || images.every((_, i) => errored[i]))
    return <PlaceholderIllustration accent={accent} />;

  return (
    <div style={{ position:"relative", width:"100%", height:"100%" }}>
      {images.map((src, i) => (
        <div key={i} style={{ position: i===0?"relative":"absolute", inset:0, opacity: i===idx?1:0, transition:"opacity 0.38s ease", pointerEvents: i===idx?"auto":"none" }}>
          {errored[i] ? <PlaceholderIllustration accent={accent} /> : (
            <>
              <img src={src} alt={`${title} — screenshot ${i+1}`}
                onLoad={() => setLoaded(l => ({...l,[i]:true}))}
                onError={() => setErrored(e => ({...e,[i]:true}))}
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", opacity: loaded[i]?1:0, transition:"opacity 0.3s" }}
              />
              {!loaded[i] && <div style={{ position:"absolute", inset:0 }}><PlaceholderIllustration accent={accent} /></div>}
            </>
          )}
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", zIndex:10, width:32, height:32, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(8,12,20,0.75)", color:"#f1f5f9", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", transition:"background 0.18s" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={next} aria-label="Next" style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", zIndex:10, width:32, height:32, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(8,12,20,0.75)", color:"#f1f5f9", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", transition:"background 0.18s" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, zIndex:10 }}>
            {images.map((_,i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }} aria-label={`Slide ${i+1}`}
                style={{ width: i===idx?20:6, height:6, borderRadius:99, background: i===idx?accent:"rgba(255,255,255,0.28)", border:"none", cursor:"pointer", padding:0, transition:"width 0.25s, background 0.25s" }} />
            ))}
          </div>
          <div style={{ position:"absolute", top:10, right:10, zIndex:10, background:"rgba(8,12,20,0.75)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"3px 9px", fontSize:11, fontWeight:600, color:"rgba(241,245,249,0.65)", backdropFilter:"blur(6px)", letterSpacing:"0.04em" }}>
            {idx+1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// SVG PLACEHOLDER
// ============================================================
function PlaceholderIllustration({ accent = "#f59e0b" }: { accent?: string }) {
  return (
    <svg viewBox="0 0 480 270" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"100%" }}>
      <rect width="480" height="270" fill="#0a0c14"/>
      <rect x="24" y="24" width="432" height="222" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <rect x="24" y="24" width="432" height="28" rx="6" fill="rgba(255,255,255,0.04)"/>
      <circle cx="42" cy="38" r="5" fill="rgba(255,255,255,0.12)"/>
      <circle cx="58" cy="38" r="5" fill="rgba(255,255,255,0.08)"/>
      <circle cx="74" cy="38" r="5" fill="rgba(255,255,255,0.06)"/>
      <rect x="100" y="31" width="180" height="12" rx="4" fill="rgba(255,255,255,0.05)"/>
      <rect x="40" y="72" width="120" height="8" rx="3" fill={accent} opacity="0.45"/>
      <rect x="40" y="88" width="380" height="5" rx="2" fill="rgba(255,255,255,0.08)"/>
      <rect x="40" y="99" width="320" height="5" rx="2" fill="rgba(255,255,255,0.06)"/>
      <rect x="40" y="110" width="350" height="5" rx="2" fill="rgba(255,255,255,0.05)"/>
      <rect x="40" y="132" width="114" height="80" rx="6" fill={accent} opacity="0.07" stroke={accent} strokeWidth="0.8" strokeOpacity="0.22"/>
      <rect x="170" y="132" width="114" height="80" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
      <rect x="300" y="132" width="120" height="80" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
      <rect x="52" y="148" width="60" height="5" rx="2" fill={accent} opacity="0.45"/>
      <rect x="52" y="159" width="80" height="4" rx="2" fill="rgba(255,255,255,0.14)"/>
      <rect x="182" y="148" width="60" height="5" rx="2" fill="rgba(255,255,255,0.18)"/>
      <rect x="182" y="159" width="80" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
      <rect x="312" y="148" width="60" height="5" rx="2" fill="rgba(255,255,255,0.18)"/>
      <rect x="312" y="159" width="80" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
      <text x="240" y="232" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="11" fontFamily="sans-serif">No preview available</text>
    </svg>
  );
}

// ============================================================
// ICONS
// ============================================================
function GithubIcon({ size=18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
}
function LinkedInIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function ArrowRight() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}
function SendIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
}
function SunIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>;
}
function MoonIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
}

// ============================================================
// MAIN
// ============================================================
export default function Portfolio() {
  const [dark,      setDark]      = useState(true);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [formData,  setFormData]  = useState({ name:"", email:"", message:"" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);
  const toggleTheme = () => setDark(d => { localStorage.setItem("theme", !d ? "dark" : "light"); return !d; });

  useEffect(() => {
    const current = TYPING_ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length)
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 90);
    else if (!deleting && displayed.length === current.length)
      timer = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && displayed.length > 0)
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 50);
    else { setDeleting(false); setRoleIndex(i => (i + 1) % TYPING_ROLES.length); }
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIndex]);

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    setSendError("");
    try {
      await emailjs.send(
        "service_09z44wz",
        "template_e7dqknm",
        {
          from_name:  formData.name,
          from_email: formData.email,
          message:    formData.message,
        },
        "wkqj8O7W2q3M8h37j"
      );
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setSendError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`root${dark ? " dark" : " light"}`}>
      <ParticleBg dark={dark} />

      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, opacity:0.022, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, background:`radial-gradient(ellipse at 50% 40%, transparent 35%, ${dark?"rgba(8,12,20,0.65)":"rgba(248,250,252,0.6)"} 100%)`, transition:"background 0.35s" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }

        .dark {
          --bg:          #080c14;
          --bg2:         #0d1220;
          --bg3:         #111827;
          --border:      rgba(255,255,255,0.07);
          --border2:     rgba(255,255,255,0.13);
          --text:        #f1f5f9;
          --muted:       #64748b;
          --dim:         #2d3748;
          --amber:       #f59e0b;
          --amber2:      #fbbf24;
          --amberDim:    rgba(245,158,11,0.12);
          --amberGlow:   rgba(245,158,11,0.06);
          --navBg:       rgba(8,12,20,0.82);
          --shadow:      rgba(0,0,0,0.4);
          --toggleBg:    rgba(255,255,255,0.07);
          --toggleBorder:rgba(255,255,255,0.12);
          --toggleColor: #94a3b8;
        }

        .light {
          --bg:          #f8fafc;
          --bg2:         #ffffff;
          --bg3:         #f1f5f9;
          --border:      rgba(0,0,0,0.08);
          --border2:     rgba(0,0,0,0.13);
          --text:        #0f172a;
          --muted:       #475569;
          --dim:         #94a3b8;
          --amber:       #d97706;
          --amber2:      #b45309;
          --amberDim:    rgba(217,119,6,0.10);
          --amberGlow:   rgba(217,119,6,0.05);
          --navBg:       rgba(248,250,252,0.88);
          --shadow:      rgba(0,0,0,0.08);
          --toggleBg:    rgba(0,0,0,0.05);
          --toggleBorder:rgba(0,0,0,0.12);
          --toggleColor: #64748b;
        }

        .root {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--bg); color: var(--text);
          min-height: 100vh; overflow-x: hidden;
          transition: background 0.35s, color 0.35s;
        }

        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          background: var(--navBg);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          transition: background 0.35s, border-color 0.35s;
        }
        .nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 36px; display: flex; align-items: center; justify-content: space-between; height: 60px; }
        .nav-logo { font-family:'DM Serif Display',serif; font-size:20px; color:var(--text); transition:color 0.35s; }
        .nav-logo span { color:var(--amber); transition:color 0.35s; }
        .nav-links { display:flex; align-items:center; gap:28px; }
        .nav-link { font-size:13.5px; font-weight:500; color:var(--muted); transition:color 0.18s; }
        .nav-link:hover { color:var(--text); }
        .nav-cta { font-size:13px; font-weight:500; color:#fff; background:var(--amber); padding:8px 18px; border-radius:6px; transition:background 0.18s, transform 0.18s; }
        .light .nav-cta { color:#fff; }
        .nav-cta:hover { background:var(--amber2); transform:translateY(-1px); }

        .theme-toggle {
          display:flex; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:9px; flex-shrink:0;
          background:var(--toggleBg); border:1px solid var(--toggleBorder);
          color:var(--toggleColor); cursor:pointer;
          transition:background 0.2s, border-color 0.2s, color 0.2s, transform 0.18s;
        }
        .theme-toggle:hover { background:var(--amberDim); border-color:var(--amber); color:var(--amber); transform:scale(1.08); }

        @media (max-width:640px) { .nav-links .nav-link { display:none; } .nav-inner { padding:0 20px; } }

        .hero { position:relative; z-index:2; min-height:100vh; padding-top:60px; display:flex; align-items:center; max-width:1100px; margin:0 auto; padding-left:36px; padding-right:36px; gap:60px; }
        @media (max-width:860px) { .hero { flex-direction:column; align-items:flex-start; padding-top:120px; padding-bottom:60px; gap:48px; } .hero-photo-col { display:none; } }
        @media (max-width:480px) { .hero { padding-left:20px; padding-right:20px; } }
        .hero-left { flex:1; min-width:0; }

        .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--amber); background:var(--amberDim); border:1px solid rgba(217,119,6,0.22); padding:6px 14px; border-radius:99px; margin-bottom:28px; transition:color 0.35s, background 0.35s; }
        .eyebrow-dot { width:6px; height:6px; border-radius:50%; background:var(--amber); box-shadow:0 0 8px var(--amber); animation:pulse 2.4s ease-in-out infinite; transition:background 0.35s, box-shadow 0.35s; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .hero-name { font-family:'DM Serif Display',serif; font-size:clamp(50px,7vw,84px); line-height:1.0; letter-spacing:-2px; color:var(--text); margin-bottom:18px; transition:color 0.35s; }
        .hero-name .dim { color:var(--dim); transition:color 0.35s; }
        .hero-role-line { font-size:clamp(17px,2.2vw,22px); color:var(--muted); margin-bottom:24px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; transition:color 0.35s; }
        .hero-role-typed { color:var(--amber); font-weight:600; transition:color 0.35s; }
        .caret { display:inline-block; width:2px; height:1em; background:var(--amber); vertical-align:middle; animation:blink 1s step-end infinite; transition:background 0.35s; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-desc { font-size:16px; line-height:1.85; color:var(--muted); max-width:480px; margin-bottom:38px; font-weight:300; transition:color 0.35s; }
        .hero-actions { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px; }

        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:var(--amber); color:#fff; font-size:14px; font-weight:600; padding:13px 26px; border-radius:8px; border:none; cursor:pointer; font-family:inherit; transition:background 0.18s, transform 0.18s; box-shadow:0 4px 24px rgba(217,119,6,0.3); }
        .btn-primary:hover { background:var(--amber2); transform:translateY(-1px); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; background:transparent; color:var(--text); font-size:14px; font-weight:500; padding:12px 22px; border-radius:8px; border:1px solid var(--border2); cursor:pointer; font-family:inherit; transition:border-color 0.18s, background 0.18s, color 0.35s, transform 0.18s; }
        .btn-ghost:hover { border-color:rgba(217,119,6,0.4); background:var(--amberGlow); transform:translateY(-1px); }

        .hero-socials { display:flex; gap:14px; align-items:center; }
        .s-link { display:flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:8px; border:1px solid var(--border); color:var(--muted); transition:border-color 0.18s, color 0.18s, transform 0.18s; }
        .s-link:hover { border-color:var(--amber); color:var(--amber); transform:translateY(-2px); }

        .hero-photo-col { flex-shrink:0; width:320px; position:relative; }
        .hero-photo-frame { width:100%; aspect-ratio:3/4; border-radius:20px; overflow:hidden; background:var(--bg3); border:1px solid var(--border); position:relative; transition:background 0.35s, border-color 0.35s; }
        .hero-photo-frame::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--amber),transparent); z-index:2; transition:background 0.35s; }
        .hero-photo-frame img { width:100%; height:100%; object-fit:cover; display:block; }
        .photo-ph { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:var(--dim); }
        .photo-ph p { font-size:12px; color:var(--muted); text-align:center; line-height:1.6; }
        .hero-photo-label { position:absolute; bottom:-14px; right:-14px; background:var(--amber); color:#fff; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:8px 14px; border-radius:8px; box-shadow:0 4px 20px rgba(217,119,6,0.35); transition:background 0.35s; }
        .hero-photo-year { position:absolute; top:-14px; left:-14px; background:var(--bg3); border:1px solid var(--border); color:var(--muted); font-size:12px; font-weight:500; padding:8px 14px; border-radius:8px; transition:background 0.35s, border-color 0.35s, color 0.35s; }
        .hero-photo-year span { color:var(--text); font-weight:600; transition:color 0.35s; }

        .page-wrap { position:relative; z-index:2; max-width:1100px; margin:0 auto; padding:0 36px; }
        @media (max-width:480px) { .page-wrap { padding:0 20px; } }
        .section { padding:80px 0; }
        .s-label { font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--amber); margin-bottom:8px; transition:color 0.35s; }
        .s-title { font-family:'DM Serif Display',serif; font-size:clamp(28px,3.5vw,40px); color:var(--text); letter-spacing:-1px; margin-bottom:10px; line-height:1.15; transition:color 0.35s; }
        .s-sub { font-size:15px; color:var(--muted); margin-bottom:44px; font-weight:300; max-width:500px; line-height:1.75; transition:color 0.35s; }
        hr { position:relative; z-index:2; border:none; border-top:1px solid var(--border); max-width:1100px; margin:0 auto; transition:border-color 0.35s; }

        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
        @media (max-width:700px) { .about-grid { grid-template-columns:1fr; gap:32px; } }
        .about-text { font-size:15px; line-height:1.85; color:var(--muted); font-weight:300; transition:color 0.35s; }
        .about-text p+p { margin-top:16px; }
        .about-text strong { color:var(--text); font-weight:600; transition:color 0.35s; }
        .fact-row { display:flex; align-items:flex-start; gap:12px; padding:14px 16px; border-radius:10px; background:var(--bg2); border:1px solid var(--border); transition:border-color 0.2s, background 0.35s; margin-bottom:10px; }
        .fact-row:hover { border-color:rgba(217,119,6,0.3); }
        .fact-icon { font-size:17px; flex-shrink:0; margin-top:1px; }
        .fact-label { font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--amber); margin-bottom:3px; transition:color 0.35s; }
        .fact-value { font-size:14px; color:var(--text); font-weight:500; transition:color 0.35s; }

        .skills-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        @media (max-width:760px) { .skills-grid { grid-template-columns:1fr 1fr; } }
        @media (max-width:480px) { .skills-grid { grid-template-columns:1fr; } }
        .skill-card { background:var(--bg2); border:1px solid var(--border); border-radius:12px; padding:20px; transition:border-color 0.2s, transform 0.2s, background 0.35s; }
        .skill-card:hover { border-color:rgba(217,119,6,0.25); transform:translateY(-2px); }
        .skill-card-head { font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--amber); margin-bottom:14px; transition:color 0.35s; }
        .skill-tags { display:flex; flex-wrap:wrap; gap:6px; }
        .skill-tag { font-size:12px; font-weight:500; padding:4px 10px; border-radius:5px; background:var(--bg3); border:1px solid var(--border); color:var(--muted); transition:color 0.18s, border-color 0.18s, background 0.35s; }
        .skill-tag:hover { color:var(--text); border-color:rgba(217,119,6,0.3); }

        .project-row { display:grid; grid-template-columns:1fr 420px; background:var(--bg2); border:1px solid var(--border); border-radius:16px; overflow:hidden; transition:border-color 0.22s, transform 0.22s, background 0.35s; margin-bottom:12px; }
        .project-row:hover { border-color:rgba(217,119,6,0.25); transform:translateY(-2px); }
        @media (max-width:860px) { .project-row { grid-template-columns:1fr; } }
        .project-info { padding:36px 40px; display:flex; flex-direction:column; justify-content:center; }
        @media (max-width:480px) { .project-info { padding:28px 24px; } }
        .project-num { font-family:'DM Serif Display',serif; font-size:13px; color:var(--dim); margin-bottom:16px; letter-spacing:0.05em; transition:color 0.35s; }
        .project-name { font-family:'DM Serif Display',serif; font-size:clamp(20px,2.5vw,26px); color:var(--text); margin-bottom:14px; line-height:1.2; letter-spacing:-0.5px; transition:color 0.35s; }
        .project-desc { font-size:14px; line-height:1.8; color:var(--muted); font-weight:300; margin-bottom:22px; max-width:400px; transition:color 0.35s; }
        .project-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:28px; }
        .project-tag { font-size:11.5px; font-weight:600; padding:4px 10px; border-radius:4px; background:var(--bg3); border:1px solid var(--border); color:var(--muted); transition:background 0.35s, border-color 0.35s, color 0.35s; }
        .proj-link { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:500; padding:8px 16px; border-radius:7px; border:1px solid var(--border); color:var(--muted); width:fit-content; transition:all 0.18s; }
        .proj-link:hover { color:var(--text); border-color:rgba(217,119,6,0.4); background:var(--amberGlow); }
        .project-visual { aspect-ratio:16/11; overflow:hidden; background:var(--bg3); border-left:1px solid var(--border); position:relative; transition:background 0.35s, border-color 0.35s; }
        @media (max-width:860px) { .project-visual { border-left:none; border-top:1px solid var(--border); aspect-ratio:16/9; } }

        /* ── INTERNSHIP ── */
        .internship-card { background:var(--bg2); border:1px solid var(--border); border-radius:16px; padding:32px 36px; transition:border-color 0.2s, background 0.35s; }
        .internship-card:hover { border-color:rgba(217,119,6,0.25); }
        .internship-header { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:16px; }
        .internship-company { font-family:'DM Serif Display',serif; font-size:20px; color:var(--text); letter-spacing:-0.4px; transition:color 0.35s; }
        .internship-role { font-size:13px; color:var(--amber); font-weight:600; margin-top:4px; transition:color 0.35s; }
        .internship-year { font-size:12px; font-weight:600; color:var(--muted); background:var(--bg3); border:1px solid var(--border); padding:5px 12px; border-radius:99px; flex-shrink:0; transition:all 0.35s; }
        .internship-bullets { list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:20px; }
        .internship-bullets li { font-size:14px; line-height:1.75; color:var(--muted); font-weight:300; padding-left:16px; position:relative; transition:color 0.35s; }
        .internship-bullets li::before { content:'→'; position:absolute; left:0; color:var(--amber); font-size:12px; top:2px; transition:color 0.35s; }
        .internship-stack { display:flex; flex-wrap:wrap; gap:6px; }

        .contact-wrap { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
        @media (max-width:700px) { .contact-wrap { grid-template-columns:1fr; gap:40px; } }
        .contact-lede { font-size:15px; color:var(--muted); line-height:1.85; font-weight:300; margin-bottom:32px; transition:color 0.35s; }
        .c-link { display:flex; align-items:center; gap:12px; padding:13px 16px; border-radius:10px; border:1px solid var(--border); background:var(--bg2); font-size:13.5px; color:var(--muted); transition:border-color 0.18s, color 0.18s, transform 0.18s, background 0.35s; margin-bottom:10px; }
        .c-link:hover { border-color:rgba(217,119,6,0.3); color:var(--text); transform:translateX(4px); }
        .c-link-icon { font-size:16px; width:20px; text-align:center; flex-shrink:0; }
        .form-grid { display:flex; flex-direction:column; gap:14px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        @media (max-width:480px) { .form-row { grid-template-columns:1fr; } }
        .form-group { display:flex; flex-direction:column; gap:6px; }
        .form-label { font-size:11.5px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); transition:color 0.35s; }
        .form-input { background:var(--bg2); border:1px solid var(--border); border-radius:9px; padding:11px 14px; font-family:inherit; font-size:14px; color:var(--text); outline:none; transition:border-color 0.18s, background 0.35s, color 0.35s; font-weight:300; }
        .form-input:focus { border-color:rgba(217,119,6,0.5); background:var(--amberGlow); }
        .form-input::placeholder { color:var(--dim); }
        textarea.form-input { resize:vertical; }
        .send-btn { display:flex; align-items:center; justify-content:center; gap:8px; background:var(--amber); color:#fff; border:none; border-radius:9px; padding:13px; font-family:inherit; font-size:14px; font-weight:600; cursor:pointer; transition:background 0.18s; box-shadow:0 4px 20px rgba(217,119,6,0.25); width:100%; }
        .send-btn:hover:not(:disabled) { background:var(--amber2); }
        .send-btn:disabled { opacity:0.6; cursor:not-allowed; }

        .footer-wrap { position:relative; z-index:2; border-top:1px solid var(--border); transition:border-color 0.35s; }
        footer { max-width:1100px; margin:0 auto; padding:28px 36px; display:flex; align-items:center; justify-content:space-between; }
        @media (max-width:480px) { footer { flex-direction:column; gap:12px; text-align:center; padding:24px 20px; } }
        .footer-text { font-size:13px; color:var(--dim); transition:color 0.35s; }
        .footer-links { display:flex; gap:20px; }
        .footer-link { font-size:13px; color:var(--dim); transition:color 0.18s; }
        .footer-link:hover { color:var(--amber); }

        .light .skill-card,
        .light .fact-row,
        .light .project-row,
        .light .internship-card,
        .light .c-link { box-shadow:0 1px 3px var(--shadow); }

        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:var(--bg); }
        ::-webkit-scrollbar-thumb { background:var(--dim); border-radius:2px; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .hero-left > * { animation:fadeUp 0.65s ease both; }
        .hero-left > *:nth-child(1){animation-delay:0.05s}
        .hero-left > *:nth-child(2){animation-delay:0.15s}
        .hero-left > *:nth-child(3){animation-delay:0.23s}
        .hero-left > *:nth-child(4){animation-delay:0.31s}
        .hero-left > *:nth-child(5){animation-delay:0.39s}
        .hero-left > *:nth-child(6){animation-delay:0.47s}
      `}</style>

      {/* ── NAV ── */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">Glen<span>.</span></a>
          <div className="nav-links">
            {["About","Skills","Experience","Projects","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            ))}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              title={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="#contact" className="nav-cta">Hire Me</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position:"relative", zIndex:2 }}>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow"><span className="eyebrow-dot"/>Open to opportunities</div>
            <h1 className="hero-name">{YOUR_FIRST}<br/><span className="dim">Honrado</span></h1>
            <div className="hero-role-line">
              <span className="hero-role-typed">{displayed}<span className="caret"/></span>
              <span>Developer</span>
            </div>
            <p className="hero-desc">{YOUR_TAGLINE}</p>
            <div className="hero-actions">
              <a href="#projects"><button className="btn-primary">View My Work <ArrowRight/></button></a>
              <a href="#contact"><button className="btn-ghost">Get in Touch</button></a>
            </div>
            <div className="hero-socials">
              <a href={`https://${YOUR_GITHUB}`} target="_blank" rel="noopener noreferrer" className="s-link" title="GitHub"><GithubIcon size={17}/></a>
              <a href={`https://${YOUR_LINKEDIN}`} target="_blank" rel="noopener noreferrer" className="s-link" title="LinkedIn"><LinkedInIcon/></a>
              <a href={`mailto:${YOUR_EMAIL}`} className="s-link" title="Email">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
              </a>
              <a href={`https://${YOUR_WEBSITE}`} target="_blank" rel="noopener noreferrer" className="s-link" title="Website">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
            </div>
          </div>
          <div className="hero-photo-col">
            <div style={{ position:"relative" }}>
              <div className="hero-photo-frame">
                <img src="../Graduation Picture.jpg" alt="Glen Honrado"/>
                <div className="photo-ph">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <p>Add your photo<br/><code style={{ color:"var(--dim)", fontSize:"11px" }}>/public/photo.jpg</code></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <div className="page-wrap">
        <section id="about" className="section">
          <p className="s-label">About</p>
          <h2 className="s-title">A bit about me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a <strong>BS Information Technology graduate</strong> with hands-on experience building end-to-end web applications — from database schemas and REST APIs to polished, responsive UIs.</p>
              <p>I've delivered <strong>real-world systems</strong> used by actual people: attendance platforms, administrative tools, and financial trackers. I care about shipping things that work.</p>
              <p>I'm actively pursuing a <strong>career in full-stack development and cybersecurity</strong> — with a growing focus on securing web applications, cloud infrastructure, and network systems.</p>
            </div>
            <div>
              {[
                { icon:"🎓", label:"Education",          value:"BS Information Technology — Bestlink College of the Philippines (2022–2026)" },
                { icon:"📍", label:"Location",           value:"San Jose del Monte, Bulacan · Remote-friendly" },
                { icon:"💼", label:"Looking for",        value:"Full-time roles & freelance projects" },
                { icon:"🔐", label:"Aspiring toward",    value:"Cybersecurity — web app security, cloud infra, network systems" },
              ].map(f => (
                <div key={f.label} className="fact-row">
                  <span className="fact-icon">{f.icon}</span>
                  <div><p className="fact-label">{f.label}</p><p className="fact-value">{f.value}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <hr/>

      {/* ── SKILLS ── */}
      <div className="page-wrap">
        <section id="skills" className="section">
          <p className="s-label">Skills</p>
          <h2 className="s-title">What I work with</h2>
          <p className="s-sub">A growing toolkit — I pick up new technologies quickly and focus on depth where it matters.</p>
          <div className="skills-grid">
            {SKILL_CATEGORIES.map(cat => (
              <div key={cat.title} className="skill-card">
                <p className="skill-card-head">{cat.title}</p>
                <div className="skill-tags">{cat.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <hr/>

      {/* ── EXPERIENCE (INTERNSHIP) ── */}
      <div className="page-wrap">
        <section id="experience" className="section">
          <p className="s-label">Experience</p>
          <h2 className="s-title">Where I've worked</h2>
          <p className="s-sub">Real-world experience shipping production software in a professional team.</p>
          <div className="internship-card">
            <div className="internship-header">
              <div>
                <p className="internship-company">VRTSystems Technologies Corp.</p>
                <p className="internship-role">Full-Stack Developer Intern</p>
              </div>
              <span className="internship-year">2026</span>
            </div>
            <ul className="internship-bullets">
              <li>Developed a DTR Attendance Management System with RFID and fingerprint-based attendance recording.</li>
              <li>Built a REST API backend with Laravel and a Quasar/Vue.js frontend connected to a MySQL database.</li>
              <li>Integrated Raspberry Pi for RFID and fingerprint sensor interfacing; containerized the application with Docker.</li>
              <li>Tested API endpoints via Postman and managed source control with Git in a WSL environment.</li>
            </ul>
            <div className="internship-stack">
              {["Laravel", "Quasar", "Vue.js", "MySQL", "REST API", "Docker", "Raspberry Pi", "Git", "Postman", "WSL"].map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <hr/>

      {/* ── PROJECTS ── */}
      <div className="page-wrap">
        <section id="projects" className="section">
          <p className="s-label">Projects</p>
          <h2 className="s-title">Things I've built</h2>
          <p className="s-sub">Real projects shipped for real users — each one taught me something new.</p>
          {PROJECTS.map((p, i) => (
            <div key={p.id} className="project-row">
              <div className="project-info">
                <p className="project-num">0{i+1} / 0{PROJECTS.length}</p>
                <h3 className="project-name">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">{p.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}</div>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                  <GithubIcon size={14}/> View Code
                </a>
              </div>
              <div className="project-visual">
                <ProjectCarousel images={p.images} accent={p.accent} title={p.title}/>
              </div>
            </div>
          ))}
          <div style={{ textAlign:"center", marginTop:"20px" }}>
            <a href={`https://${YOUR_GITHUB}`} target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost"><GithubIcon size={15}/> See all on GitHub</button>
            </a>
          </div>
        </section>
      </div>

      <hr/>

      {/* ── CONTACT ── */}
      <div className="page-wrap">
        <section id="contact" className="section">
          <p className="s-label">Contact</p>
          <h2 className="s-title">Let's work together</h2>
          <div className="contact-wrap">
            <div>
              <p className="contact-lede">I'm open to freelance projects and full-time roles. Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.</p>
              {[
                { icon:"✉",  text: YOUR_EMAIL,    href:`mailto:${YOUR_EMAIL}` },
                { icon:"📞", text: YOUR_PHONE,    href:`tel:${YOUR_PHONE}` },
                { icon:"🌐", text: YOUR_WEBSITE,  href:`https://${YOUR_WEBSITE}` },
                { icon:"⊙",  text: YOUR_GITHUB,   href:`https://${YOUR_GITHUB}` },
                { icon:"in", text: YOUR_LINKEDIN, href:`https://${YOUR_LINKEDIN}` },
              ].map(l => (
                <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer" className="c-link">
                  <span className="c-link-icon">{l.icon}</span><span>{l.text}</span>
                </a>
              ))}
            </div>
            <div className="form-grid">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" type="text" placeholder="Your name" value={formData.name} onChange={e=>setFormData(f=>({...f,name:e.target.value}))}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="you@example.com" value={formData.email} onChange={e=>setFormData(f=>({...f,email:e.target.value}))}/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows={5} placeholder="Tell me about your project or just say hi..." value={formData.message} onChange={e=>setFormData(f=>({...f,message:e.target.value}))}/>
              </div>
              <button className="send-btn" onClick={handleSubmit} disabled={submitted || sending}>
                {submitted ? "Message Sent!" : sending ? "Sending..." : <><SendIcon/> Send Message</>}
              </button>
              {sendError && (
                <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>{sendError}</p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <div className="footer-wrap">
        <footer>
          <p className="footer-text">© {new Date().getFullYear()} {YOUR_NAME}</p>
          <div className="footer-links">
            <a href={`https://${YOUR_GITHUB}`}  target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href={`https://${YOUR_LINKEDIN}`} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href={`mailto:${YOUR_EMAIL}`} className="footer-link">Email</a>
          </div>
        </footer>
      </div>
    </div>
  );
}