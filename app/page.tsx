"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

// ============================================================
// DATA
// ============================================================
const YOUR_NAME     = "Glen Honrado";
const YOUR_FIRST    = "Glen";
const YOUR_TAGLINE  = "I build end-to-end web applications — and I'm learning to break them, to make them stronger.";
const YOUR_EMAIL    = "glenhonrado282004@gmail.com";
const YOUR_PHONE    = "09167060932";
const YOUR_WEBSITE  = "glenprtflio.vercel.app";
const YOUR_GITHUB   = "github.com/xiomairixe";
const YOUR_LINKEDIN = "linkedin.com/in/glen-honrado-8694b4322";
const TYPING_ROLES  = ["Full-Stack", "Frontend", "Backend", "PenTester"];

const STATS = [
  { value: "6+", label: "Projects Shipped", icon: "🚀" },
  { value: "7+", label: "Tech Stacks", icon: "⚙️" },
  { value: "1",  label: "Internship Completed", icon: "💼" },
  { value: "4",  label: "Years of Building", icon: "📅" },
];



const SKILL_CATEGORIES = [
  { title: "Frontend",       skills: ["React", "Next.js", "Vue.js", "Quasar", "TypeScript", "TailwindCSS", "Bootstrap"] },
  { title: "Backend",        skills: ["PHP", "Laravel", "Python", "Node.js", "Express.js", "REST APIs"] },
  { title: "Database",       skills: ["MySQL", "MongoDB", "SQLite"] },
  { title: "Infrastructure", skills: ["Docker", "Linux", "WSL", "Raspberry Pi", "Kali Linux"] },
  { title: "Tooling",        skills: ["Git", "GitLab", "Postman", "Figma", "VS Code", "GitHub Actions"] },
  { title: "Deployment",     skills: ["Vercel", "Render", "MongoDB Atlas", "Cloudflare"] },
  { title: "AI Tools",       skills: ["Claude", "ChatGPT", "GitHub Copilot", "Cursor", "v0 by Vercel", "Prompt Engineering"] },
];

const PROJECTS = [
  {
    id: 1,
    title: "Facilities Reservation System",
    subtitle: "ViaHale — Campus Resource Management",
    description: "A comprehensive reservation platform built to eliminate the chaos of manual booking. Features real-time slot availability, conflict prevention logic, and a clean admin dashboard for approving or rejecting requests.",
    challenge: "Manual booking spreadsheets caused double-bookings and miscommunication. This system automated the entire flow.",
    tags: ["PHP", "Bootstrap", "MySQL"],
    images: [
      "/ViaHale/End_Users_Login.png",
      "/ViaHale/End_Users_Landing_Page.png",
      "/ViaHale/End_Users_Date_Filter.png",
      "/ViaHale/End_Users_Request_Form.png",
    ],
    github: "https://github.com/xiomairixe",
    live: "",
    accent: "#f59e0b",
  },
  {
    id: 2,
    title: "My Store Management System",
    subtitle: "Full-Stack Inventory & POS Solution",
    description: "End-to-end retail management system with inventory tracking, POS checkout flow, sales analytics, and low-stock alerts. Built with a REST API backend and a reactive frontend for small business owners.",
    challenge: "Small stores often rely on pen-and-paper inventory. This replaced that with a fast, reliable digital system.",
    tags: ["React", "Express.js", "MongoDB", "Tailwind CSS"],
    images: [
      "/MyStoreManagement/desktop/dashboard.png",
      "/MyStoreManagement/desktop/products.png",
      "/MyStoreManagement/desktop/sales.png",
      "/MyStoreManagement/Dashboard.png",
      "/MyStoreManagement/Inventoryactions.png",
      "/MyStoreManagement/NewProductForm.png",
      "/MyStoreManagement/CheckoutPage.png",
      "/MyStoreManagement/Checkout1.png",
      "/MyStoreManagement/Sales.png",
    ],
    github: "https://github.com/xiomairixe",
    live: "",
    accent: "#34d399",
  },
  {
    id: 3,
    title: "ClockedIn — RFID DTR Attendance System",
    subtitle: "Hardware-Integrated Time & Attendance",
    description: "A production-grade automated attendance system using RFID and fingerprint technology on a Raspberry Pi. Employees and students tap their card or scan a fingerprint to clock in — zero manual input, instant records.",
    challenge: "The hardest part was bridging hardware (Raspberry Pi GPIO) with a web application backend in real-time.",
    tags: ["Laravel", "Vue.js", "Quasar", "MySQL", "Raspberry Pi", "Docker"],
    images: [
      "/ClockedIn/Main_Interface.png",
      "/ClockedIn/ESS_Home_Page.png",
      "/ClockedIn/ESS_Profile.png",
      "/ClockedIn/Admin_Dashboard.png",
      "/ClockedIn/Admin_Dashboard_Dark_Mode.png",
      "/ClockedIn/Admin_Dashboard_Analytic_Tab.png",
      "/ClockedIn/Fingerprint_Enrollment.png",
    ],
    github: "https://github.com/xiomairixe",
    live: "",
    accent: "#60a5fa",
  },
  {
    id: 4,
    title: "FinTrack — Personal Finance Tracker",
    subtitle: "Know where every peso goes",
    description: "A personal finance application to log income, categorize expenses, and set savings goals. Includes visual breakdowns and monthly summaries so users genuinely understand their spending habits.",
    challenge: "Most people don't track spending because it's tedious. The goal was to make logging feel effortless.",
    tags: ["React", "Node.js", "MongoDB"],
    images: [
      "/FinTrack/LoadingPage.png",
      "/FinTrack/Login.png",
      "/FinTrack/Register.png",
      "/FinTrack/Dashboard.png",
      "/FinTrack/Transaction.png",
    ],
    github: "https://github.com/xiomairixe",
    live: "",
    accent: "#a78bfa",
  },
  {
    id: 5,
    title: "Tala — Daily Diary Mobile App",
    subtitle: "A mindful space to reflect on your day",
    description: "A React Native mobile app for daily journaling with mood tracking, goal setting, and monthly analytics. Tala gives users a calm, private space to document their life and understand patterns in their wellbeing.",
    challenge: "Designing a journaling experience that's emotionally safe and genuinely calming — not just another productivity tool.",
    tags: ["React Native", "Node.js", "MongoDB"],
    images: [
      "/Tala/DailyDiary.png",
      "/Tala/EntryForm.png",
      "/Tala/Calendar.png",
      "/Tala/Statistics.png",
      "/Tala/Settings.png",
      "/Tala/Profile.png",
      "/Tala/Goals.png",
      "/Tala/Analytics.png",
    ],
    github: "https://github.com/xiomairixe",
    live: "",
    accent: "#f472b6",
  },
  {
    id: 6,
    title: "DevHub — Connect Freelancer to their Clients",
    subtitle: "Be the Admin, connect to your clients and manage your projects.",
    description: "A platform connecting developers with clients. Developers showcase profiles and projects; clients browse, filter by skills, and reach out directly. Built with a full authentication system, project galleries, and a messaging layer.",
    challenge: "Standing up a two-sided marketplace with auth, profiles, and project display from scratch — and making it actually feel like a product.",
    tags: ["React", "Express.js", "MongoDB"],
    images: [
      "/DevHub/LandingPage.png",
      "/DevHub/Login.png",
      "/DevHub/Register.png",
      "/DevHub/image.png",
      "/DevHub/project.png",
    ],
    github: "https://github.com/xiomairixe",
    live: "https://devhub-liard.vercel.app/",
    accent: "#22d3ee",
  },
];

// ============================================================
// PARTICLE BACKGROUND
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
  const validImages = images.filter(Boolean);
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + validImages.length) % validImages.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % validImages.length); };
  if (validImages.length === 0 || validImages.every((_, i) => errored[i]))
    return <PlaceholderIllustration accent={accent} />;
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:"#0a0c14" }}>
      {validImages.map((src, i) => (
        <div key={i} style={{ position: i===0?"relative":"absolute", inset:0, height:"100%", opacity: i===idx?1:0, transition:"opacity 0.38s ease", pointerEvents: i===idx?"auto":"none" }}>
          {errored[i] ? <PlaceholderIllustration accent={accent} /> : (
            <>
              <img src={src} alt={`${title} — screenshot ${i+1}`}
                onLoad={() => setLoaded(l => ({...l,[i]:true}))}
                onError={() => setErrored(e => ({...e,[i]:true}))}
                style={{ width:"100%", height:"100%", objectFit:"contain", display:"block", opacity: loaded[i]?1:0, transition:"opacity 0.3s" }}
              />
              {!loaded[i] && <div style={{ position:"absolute", inset:0 }}><PlaceholderIllustration accent={accent} /></div>}
            </>
          )}
        </div>
      ))}
      {validImages.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", zIndex:10, width:32, height:32, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(8,12,20,0.75)", color:"#f1f5f9", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", transition:"background 0.18s" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={next} aria-label="Next" style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", zIndex:10, width:32, height:32, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(8,12,20,0.75)", color:"#f1f5f9", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", transition:"background 0.18s" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, zIndex:10 }}>
            {validImages.map((_,i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }} aria-label={`Slide ${i+1}`}
                style={{ width: i===idx?20:6, height:6, borderRadius:99, background: i===idx?accent:"rgba(255,255,255,0.28)", border:"none", cursor:"pointer", padding:0, transition:"width 0.25s, background 0.25s" }} />
            ))}
          </div>
          <div style={{ position:"absolute", top:10, right:10, zIndex:10, background:"rgba(8,12,20,0.75)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"3px 9px", fontSize:11, fontWeight:600, color:"rgba(241,245,249,0.65)", backdropFilter:"blur(6px)", letterSpacing:"0.04em" }}>
            {idx+1} / {validImages.length}
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
// PROJECT MODAL
// ============================================================
type Project = typeof PROJECTS[0] & { live?: string };

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [idx,     setIdx]     = useState(0);
  const [loaded,  setLoaded]  = useState<Record<number, boolean>>({});
  const [errored, setErrored] = useState<Record<number, boolean>>({});
  const validImages = (project?.images ?? []).filter(Boolean);

  useEffect(() => { if (!project) return; setIdx(0); setLoaded({}); setErrored({}); }, [project]);
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + validImages.length) % Math.max(validImages.length, 1));
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % Math.max(validImages.length, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose, validImages.length]);
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  if (!project) return null;
  const hasImages = validImages.length > 0 && !validImages.every((_, i) => errored[i]);

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", animation:"modalFadeIn 0.2s ease" }}>
      <style>{`
        @keyframes modalFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes modalSlideUp { from{opacity:0;transform:translateY(28px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        .modal-close-btn:hover { background:rgba(255,255,255,0.15) !important; }
        .modal-arrow-btn:hover { background:rgba(255,255,255,0.2) !important; }
        .modal-gh-btn:hover    { border-color:rgba(217,119,6,0.5) !important; background:var(--amberGlow) !important; }
        .modal-live-btn:hover  { opacity:0.8 !important; transform:translateY(-1px) !important; }
      `}</style>
      <div onClick={e => e.stopPropagation()} style={{ background:"var(--bg2)", border:"1px solid var(--border2)", borderRadius:20, width:"100%", maxWidth:960, maxHeight:"90vh", overflow:"hidden", display:"flex", flexDirection:"column", animation:"modalSlideUp 0.28s cubic-bezier(0.16,1,0.3,1)", boxShadow:"0 32px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", flexShrink:0, background:"#0a0c14", minHeight:180 }}>
          {hasImages ? (
            <>
              {validImages.map((src, i) => (
                <div key={i} style={{ position: i===0?"relative":"absolute", inset:0, height:"100%", opacity: i===idx?1:0, transition:"opacity 0.38s ease", pointerEvents: i===idx?"auto":"none" }}>
                  {errored[i] ? <PlaceholderIllustration accent={project.accent} /> : (
                    <>
                      <img src={src} alt={`${project.title} screenshot ${i + 1}`}
                        onLoad={() => setLoaded(l => ({...l,[i]:true}))}
                        onError={() => setErrored(e => ({...e,[i]:true}))}
                        style={{ width:"100%", height:"100%", objectFit:"contain", display:"block", opacity: loaded[i]?1:0, transition:"opacity 0.3s" }}
                      />
                      {!loaded[i] && <div style={{ position:"absolute", inset:0 }}><PlaceholderIllustration accent={project.accent} /></div>}
                    </>
                  )}
                </div>
              ))}
              {validImages.length > 1 && (
                <>
                  <button className="modal-arrow-btn" onClick={() => setIdx(i => (i-1+validImages.length)%validImages.length)} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", zIndex:10, width:42, height:42, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.18)", background:"rgba(8,12,20,0.82)", color:"#f1f5f9", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(8px)", transition:"background 0.18s" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button className="modal-arrow-btn" onClick={() => setIdx(i => (i+1)%validImages.length)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", zIndex:10, width:42, height:42, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.18)", background:"rgba(8,12,20,0.82)", color:"#f1f5f9", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(8px)", transition:"background 0.18s" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                  <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:7, zIndex:10 }}>
                    {validImages.map((_,i) => (
                      <button key={i} onClick={() => setIdx(i)} style={{ width:i===idx?22:7, height:7, borderRadius:99, background:i===idx?project.accent:"rgba(255,255,255,0.3)", border:"none", cursor:"pointer", padding:0, transition:"width 0.25s, background 0.25s" }} />
                    ))}
                  </div>
                  <div style={{ position:"absolute", top:14, right:56, zIndex:10, background:"rgba(8,12,20,0.8)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:600, color:"rgba(241,245,249,0.7)", backdropFilter:"blur(6px)" }}>
                    {idx+1} / {validImages.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <PlaceholderIllustration accent={project.accent} />
          )}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${project.accent},transparent)`, zIndex:5 }} />
          <button className="modal-close-btn" onClick={onClose} aria-label="Close" style={{ position:"absolute", top:14, right:14, zIndex:20, width:36, height:36, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.18)", background:"rgba(8,12,20,0.8)", color:"#f1f5f9", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", transition:"background 0.18s" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style={{ padding:"28px 32px 32px", overflowY:"auto", flex:1 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, marginBottom:8, flexWrap:"wrap" }}>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:project.accent, marginBottom:4 }}>Project</p>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(22px,3vw,30px)", color:"var(--text)", letterSpacing:"-0.5px", lineHeight:1.1, margin:0 }}>{project.title}</h2>
              {"subtitle" in project && <p style={{ fontSize:13, color:"var(--muted)", marginTop:4, fontWeight:400 }}>{(project as typeof PROJECTS[0]).subtitle}</p>}
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-gh-btn"
                style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:13, fontWeight:600, padding:"10px 18px", borderRadius:9, border:"1px solid var(--border2)", color:"var(--text)", background:"var(--bg3)", textDecoration:"none", flexShrink:0, transition:"border-color 0.18s, background 0.18s" }}>
                <GithubIcon size={14}/> View on GitHub
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="modal-live-btn"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:13, fontWeight:600, padding:"10px 18px", borderRadius:9, border:`1px solid ${project.accent}55`, color:project.accent, background:`${project.accent}12`, textDecoration:"none", flexShrink:0, transition:"opacity 0.18s, transform 0.18s" }}>
                  <ExternalLinkIcon size={13}/> Visit Live
                </a>
              )}
            </div>
          </div>
          <p style={{ fontSize:15, lineHeight:1.85, color:"var(--muted)", fontWeight:300, marginBottom:16, maxWidth:660 }}>{project.description}</p>
          {"challenge" in project && (project as typeof PROJECTS[0]).challenge && (
            <div style={{ background:"var(--amberDim)", border:`1px solid ${project.accent}30`, borderRadius:10, padding:"12px 16px", marginBottom:20 }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:project.accent, marginBottom:5 }}>The Challenge</p>
              <p style={{ fontSize:13.5, lineHeight:1.75, color:"var(--muted)", fontWeight:300 }}>{(project as typeof PROJECTS[0]).challenge}</p>
            </div>
          )}
          <div style={{ borderTop:"1px solid var(--border)", marginBottom:16 }} />
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:10 }}>Tech Stack</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {project.tags.map(tag => (
                <span key={tag} style={{ fontSize:12, fontWeight:600, padding:"5px 13px", borderRadius:6, background:"var(--amberDim)", border:`1px solid ${project.accent}44`, color:project.accent }}>{tag}</span>
              ))}
            </div>
          </div>
          {validImages.length > 1 && (
            <p style={{ fontSize:11, color:"var(--dim)", marginTop:18, display:"flex", alignItems:"center", gap:6 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/></svg>
              Use ← → arrow keys to navigate · ESC to close
            </p>
          )}
        </div>
      </div>
    </div>
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
function ExpandIcon() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>;
}
function ExternalLinkIcon({ size=14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
}

// ============================================================
// MAIN PORTFOLIO
// ============================================================
export default function Portfolio() {
  const [dark,          setDark]          = useState(true);
  const [displayed,     setDisplayed]     = useState("");
  const [deleting,      setDeleting]      = useState(false);
  const [roleIndex,     setRoleIndex]     = useState(0);
  const [formData,      setFormData]      = useState({ name:"", email:"", message:"" });
  const [submitted,     setSubmitted]     = useState(false);
  const [sending,       setSending]       = useState(false);
  const [sendError,     setSendError]     = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true); setSendError("");
    try {
      await emailjs.send("service_09z44wz", "template_e7dqknm", {
        from_name: formData.name, from_email: formData.email, message: formData.message,
      }, "wkqj8O7W2q3M8h37j");
      setSubmitted(true);
      setFormData({ name:"", email:"", message:"" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setSendError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`root${dark ? " dark" : " light"}`}>
      <ParticleBg dark={dark} />

      {/* Grain overlay */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, opacity:0.022, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, background:`radial-gradient(ellipse at 50% 40%, transparent 35%, ${dark?"rgba(8,12,20,0.65)":"rgba(248,250,252,0.6)"} 100%)`, transition:"background 0.35s" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        a { text-decoration:none; color:inherit; }

        .dark {
          --bg:#080c14; --bg2:#0d1220; --bg3:#111827;
          --border:rgba(255,255,255,0.07); --border2:rgba(255,255,255,0.13);
          --text:#f1f5f9; --muted:#64748b; --dim:#2d3748;
          --amber:#f59e0b; --amber2:#fbbf24;
          --amberDim:rgba(245,158,11,0.10); --amberGlow:rgba(245,158,11,0.06);
          --navBg:rgba(8,12,20,0.82); --shadow:rgba(0,0,0,0.4);
          --toggleBg:rgba(255,255,255,0.07); --toggleBorder:rgba(255,255,255,0.12); --toggleColor:#94a3b8;
          --quoteBar:rgba(245,158,11,0.35);
        }
        .light {
          --bg:#f8fafc; --bg2:#ffffff; --bg3:#f1f5f9;
          --border:rgba(0,0,0,0.08); --border2:rgba(0,0,0,0.13);
          --text:#0f172a; --muted:#475569; --dim:#94a3b8;
          --amber:#d97706; --amber2:#b45309;
          --amberDim:rgba(217,119,6,0.08); --amberGlow:rgba(217,119,6,0.05);
          --navBg:rgba(248,250,252,0.88); --shadow:rgba(0,0,0,0.08);
          --toggleBg:rgba(0,0,0,0.05); --toggleBorder:rgba(0,0,0,0.12); --toggleColor:#64748b;
          --quoteBar:rgba(217,119,6,0.4);
        }

        .root { font-family:'DM Sans',system-ui,sans-serif; background:var(--bg); color:var(--text); min-height:100vh; overflow-x:hidden; transition:background 0.35s, color 0.35s; }

        /* ── NAV ── */
        nav { position:fixed; top:0; left:0; right:0; z-index:50; background:var(--navBg); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border-bottom:1px solid var(--border); transition:background 0.35s, border-color 0.35s; }
        .nav-inner { max-width:1160px; margin:0 auto; padding:0 40px; display:flex; align-items:center; justify-content:space-between; height:62px; }
        .nav-logo { font-family:'DM Serif Display',serif; font-size:21px; color:var(--text); letter-spacing:-0.5px; }
        .nav-logo span { color:var(--amber); }
        .nav-links { display:flex; align-items:center; gap:30px; }
        .nav-link { font-size:13px; font-weight:500; color:var(--muted); transition:color 0.18s; letter-spacing:0.01em; }
        .nav-link:hover { color:var(--text); }
        .nav-cta { font-size:13px; font-weight:600; color:#fff; background:var(--amber); padding:8px 20px; border-radius:7px; transition:background 0.18s, transform 0.18s; letter-spacing:0.01em; }
        .nav-cta:hover { background:var(--amber2); transform:translateY(-1px); }
        .theme-toggle { display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:9px; flex-shrink:0; background:var(--toggleBg); border:1px solid var(--toggleBorder); color:var(--toggleColor); cursor:pointer; transition:background 0.2s, border-color 0.2s, color 0.2s, transform 0.18s; }
        .theme-toggle:hover { background:var(--amberDim); border-color:var(--amber); color:var(--amber); transform:scale(1.08); }
        @media (max-width:640px) { .nav-links .nav-link { display:none; } .nav-inner { padding:0 20px; } }

        /* ── HERO ── */
        .hero { position:relative; z-index:2; min-height:100vh; padding-top:62px; display:flex; align-items:center; max-width:1160px; margin:0 auto; padding-left:40px; padding-right:40px; gap:64px; }
        @media (max-width:880px) { .hero { flex-direction:column; align-items:flex-start; padding-top:120px; padding-bottom:60px; gap:48px; } .hero-photo-col { display:none; } }
        @media (max-width:480px) { .hero { padding-left:20px; padding-right:20px; } }
        .hero-left { flex:1; min-width:0; }
        .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:11.5px; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:var(--amber); background:var(--amberDim); border:1px solid rgba(217,119,6,0.22); padding:7px 15px; border-radius:99px; margin-bottom:30px; }
        .eyebrow-dot { width:6px; height:6px; border-radius:50%; background:var(--amber); box-shadow:0 0 8px var(--amber); animation:pulse 2.4s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero-name { font-family:'DM Serif Display',serif; font-size:clamp(52px,7.5vw,90px); line-height:1.0; letter-spacing:-2.5px; color:var(--text); margin-bottom:20px; }
        .hero-name .dim { color:var(--dim); }
        .hero-role-line { font-size:clamp(17px,2.2vw,22px); color:var(--muted); margin-bottom:26px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .hero-role-typed { color:var(--amber); font-weight:700; }
        .caret { display:inline-block; width:2px; height:1em; background:var(--amber); vertical-align:middle; animation:blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-desc { font-size:16.5px; line-height:1.85; color:var(--muted); max-width:500px; margin-bottom:14px; font-weight:300; }
        .hero-sub-note { font-size:13.5px; color:var(--dim); font-weight:400; margin-bottom:36px; display:flex; align-items:center; gap:6px; }
        .hero-sub-note span { color:var(--amber); font-weight:600; }
        .hero-actions { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px; }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:var(--amber); color:#fff; font-size:14px; font-weight:600; padding:13px 28px; border-radius:8px; border:none; cursor:pointer; font-family:inherit; transition:background 0.18s, transform 0.18s; box-shadow:0 4px 24px rgba(217,119,6,0.3); }
        .btn-primary:hover { background:var(--amber2); transform:translateY(-1px); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; background:transparent; color:var(--text); font-size:14px; font-weight:500; padding:12px 24px; border-radius:8px; border:1px solid var(--border2); cursor:pointer; font-family:inherit; transition:border-color 0.18s, background 0.18s, color 0.35s, transform 0.18s; }
        .btn-ghost:hover { border-color:rgba(217,119,6,0.4); background:var(--amberGlow); transform:translateY(-1px); }
        .hero-socials { display:flex; gap:12px; align-items:center; }
        .s-link { display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:9px; border:1px solid var(--border); color:var(--muted); transition:border-color 0.18s, color 0.18s, transform 0.18s; }
        .s-link:hover { border-color:var(--amber); color:var(--amber); transform:translateY(-2px); }

        .hero-photo-col { flex-shrink:0; width:300px; position:relative; }
        .hero-photo-frame { width:100%; aspect-ratio:3/4; border-radius:20px; overflow:hidden; background:var(--bg3); border:1px solid var(--border); position:relative; }
        .hero-photo-frame::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--amber),transparent); z-index:2; }
        .hero-photo-frame img { width:100%; height:100%; object-fit:cover; display:block; }

        /* ── STATS STRIP ── */
        .stats-strip { position:relative; z-index:2; border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:var(--bg2); transition:background 0.35s, border-color 0.35s; }
        .stats-inner { max-width:1160px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:repeat(4,1fr); }
        @media (max-width:640px) { .stats-inner { grid-template-columns:repeat(2,1fr); } .stats-inner .stat-item:nth-child(1),.stats-inner .stat-item:nth-child(2) { border-bottom:1px solid var(--border); } }
        @media (max-width:480px) { .stats-inner { padding:0 20px; } }
        .stat-item { padding:32px 20px; text-align:center; border-right:1px solid var(--border); }
        .stat-item:last-child { border-right:none; }
        .stat-value { font-family:'DM Serif Display',serif; font-size:clamp(34px,4vw,48px); color:var(--amber); line-height:1; letter-spacing:-1px; margin-bottom:6px; }
        .stat-label { font-size:12.5px; color:var(--muted); font-weight:500; letter-spacing:0.02em; }

        /* ── PAGE WRAP ── */
        .page-wrap { position:relative; z-index:2; max-width:1160px; margin:0 auto; padding:0 40px; }
        @media (max-width:480px) { .page-wrap { padding:0 20px; } }
        .section { padding:88px 0; }
        .s-label { font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:var(--amber); margin-bottom:10px; }
        .s-title { font-family:'DM Serif Display',serif; font-size:clamp(30px,3.8vw,44px); color:var(--text); letter-spacing:-1.2px; margin-bottom:12px; line-height:1.12; }
        .s-sub { font-size:15.5px; color:var(--muted); margin-bottom:48px; font-weight:300; max-width:520px; line-height:1.8; }
        hr { position:relative; z-index:2; border:none; border-top:1px solid var(--border); max-width:1160px; margin:0 auto; }

        /* ── ABOUT ── */
        .about-intro { font-size:18px; line-height:1.85; color:var(--muted); font-weight:300; max-width:780px; margin-bottom:40px; }
        .about-intro strong { color:var(--text); font-weight:600; }
        .about-quote { border-left:3px solid var(--quoteBar); padding:16px 22px; margin:0 0 40px; background:var(--amberDim); border-radius:0 10px 10px 0; }
        .about-quote p { font-family:'DM Serif Display',serif; font-size:17px; color:var(--text); line-height:1.7; font-style:italic; }
        .about-cols { display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-bottom:44px; }
        @media (max-width:700px) { .about-cols { grid-template-columns:1fr; gap:24px; } }
        .about-col-text { font-size:15px; line-height:1.85; color:var(--muted); font-weight:300; }
        .about-col-text p+p { margin-top:14px; }
        .about-col-text strong { color:var(--text); font-weight:600; }
        .facts-list { display:flex; flex-direction:column; gap:10px; }
        .fact-row { display:flex; align-items:flex-start; gap:13px; padding:15px 17px; border-radius:11px; background:var(--bg2); border:1px solid var(--border); transition:border-color 0.2s, background 0.35s; }
        .fact-row:hover { border-color:rgba(217,119,6,0.3); }
        .fact-icon { font-size:17px; flex-shrink:0; margin-top:1px; }
        .fact-label { font-size:10.5px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--amber); margin-bottom:3px; }
        .fact-value { font-size:13.5px; color:var(--text); font-weight:500; line-height:1.5; }
        .values-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        @media (max-width:700px) { .values-grid { grid-template-columns:1fr 1fr; } }
        .value-card { background:var(--bg2); border:1px solid var(--border); border-radius:12px; padding:20px; transition:border-color 0.2s, transform 0.2s, background 0.35s; text-align:center; }
        .value-card:hover { border-color:rgba(217,119,6,0.25); transform:translateY(-2px); }
        .value-icon { font-size:24px; margin-bottom:10px; }
        .value-title { font-size:13.5px; font-weight:700; color:var(--text); margin-bottom:5px; }
        .value-desc { font-size:12.5px; color:var(--muted); line-height:1.6; font-weight:300; }

        /* ── DEVHUB PROMO ── */
        .devhub-banner { position:relative; background:var(--bg2); border:1px solid var(--border); border-radius:20px; overflow:hidden; transition:border-color 0.22s, background 0.35s; }
        .devhub-banner:hover { border-color:rgba(34,211,238,0.35); }
        .devhub-top-bar { height:3px; background:linear-gradient(90deg,#22d3ee,#06b6d4,transparent); }
        .devhub-inner { display:grid; grid-template-columns:1fr 1fr; gap:0; }
        @media (max-width:820px) { .devhub-inner { grid-template-columns:1fr; } .devhub-visual { border-left:none !important; border-top:1px solid var(--border) !important; height:260px !important; aspect-ratio:unset !important; } }
        .devhub-content { padding:44px 48px; display:flex; flex-direction:column; justify-content:center; }
        @media (max-width:480px) { .devhub-content { padding:28px 24px; } }
        .devhub-badge { display:inline-flex; align-items:center; gap:7px; font-size:11px; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:#22d3ee; background:rgba(34,211,238,0.1); border:1px solid rgba(34,211,238,0.22); padding:6px 13px; border-radius:99px; margin-bottom:18px; width:fit-content; }
        .devhub-badge-dot { width:6px; height:6px; border-radius:50%; background:#22d3ee; box-shadow:0 0 8px #22d3ee; animation:pulse 2.4s ease-in-out infinite; }
        .devhub-title { font-family:'DM Serif Display',serif; font-size:clamp(24px,3vw,34px); color:var(--text); letter-spacing:-0.8px; margin-bottom:8px; line-height:1.1; }
        .devhub-subtitle { font-size:13.5px; color:#22d3ee; font-weight:600; margin-bottom:18px; }
        .devhub-desc { font-size:15px; line-height:1.85; color:var(--muted); font-weight:300; margin-bottom:24px; max-width:440px; }
        .devhub-steps { display:flex; flex-direction:column; gap:12px; margin-bottom:28px; }
        .devhub-step { display:flex; align-items:flex-start; gap:13px; }
        .devhub-step-num { width:26px; height:26px; border-radius:50%; background:rgba(34,211,238,0.12); border:1px solid rgba(34,211,238,0.3); color:#22d3ee; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
        .devhub-step-text { font-size:14px; color:var(--muted); line-height:1.65; font-weight:300; }
        .devhub-step-text strong { color:var(--text); font-weight:600; }
        .devhub-cta { display:inline-flex; align-items:center; gap:9px; background:#22d3ee; color:#0a0c14; font-size:14px; font-weight:700; padding:13px 26px; border-radius:9px; text-decoration:none; transition:background 0.18s, transform 0.18s; box-shadow:0 4px 24px rgba(34,211,238,0.25); width:fit-content; }
        .devhub-cta:hover { background:#06b6d4; transform:translateY(-1px); }
        .devhub-visual { aspect-ratio:1/1; overflow:hidden; background:#0a0c14; border-left:1px solid var(--border); position:relative; display:flex; align-items:center; justify-content:center; }

        /* ── SKILLS ── */
        .skills-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        @media (max-width:760px) { .skills-grid { grid-template-columns:1fr 1fr; } }
        @media (max-width:480px) { .skills-grid { grid-template-columns:1fr; } }
        .skill-card { background:var(--bg2); border:1px solid var(--border); border-radius:13px; padding:22px; transition:border-color 0.2s, transform 0.2s, background 0.35s; }
        .skill-card:hover { border-color:rgba(217,119,6,0.25); transform:translateY(-2px); }
        .skill-card-head { font-size:10.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--amber); margin-bottom:14px; }
        .skill-tags { display:flex; flex-wrap:wrap; gap:6px; }
        .skill-tag { font-size:12px; font-weight:500; padding:4px 10px; border-radius:5px; background:var(--bg3); border:1px solid var(--border); color:var(--muted); transition:color 0.18s, border-color 0.18s, background 0.35s; }
        .skill-tag:hover { color:var(--text); border-color:rgba(217,119,6,0.3); }

        /* ── EXPERIENCE ── */
        .exp-card { background:var(--bg2); border:1px solid var(--border); border-radius:18px; overflow:hidden; transition:border-color 0.2s, background 0.35s; }
        .exp-card:hover { border-color:rgba(217,119,6,0.25); }
        .exp-top-bar { height:3px; background:linear-gradient(90deg,var(--amber),transparent); }
        .exp-body { padding:34px 38px; }
        @media (max-width:480px) { .exp-body { padding:24px 22px; } }
        .exp-header { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:14px; margin-bottom:10px; }
        .exp-company { font-family:'DM Serif Display',serif; font-size:22px; color:var(--text); letter-spacing:-0.5px; }
        .exp-meta { display:flex; flex-direction:column; align-items:flex-end; gap:5px; flex-shrink:0; }
        .exp-year { font-size:12px; font-weight:600; color:var(--muted); background:var(--bg3); border:1px solid var(--border); padding:5px 13px; border-radius:99px; }
        .exp-type { font-size:11px; font-weight:600; color:var(--amber); background:var(--amberDim); border:1px solid rgba(217,119,6,0.2); padding:4px 10px; border-radius:99px; }
        .exp-role { font-size:13.5px; color:var(--amber); font-weight:700; margin-bottom:14px; letter-spacing:0.01em; }
        .exp-summary { font-size:14.5px; line-height:1.8; color:var(--muted); font-weight:300; margin-bottom:24px; max-width:680px; }
        .exp-divider { border:none; border-top:1px solid var(--border); margin:0 0 22px; }
        .exp-section-title { font-size:10.5px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); margin-bottom:12px; }
        .exp-bullets { list-style:none; display:flex; flex-direction:column; gap:10px; margin-bottom:28px; }
        .exp-bullets li { font-size:14px; line-height:1.75; color:var(--muted); font-weight:300; padding-left:20px; position:relative; }
        .exp-bullets li::before { content:'→'; position:absolute; left:0; color:var(--amber); font-size:12px; top:3px; }
        .exp-stack { display:flex; flex-wrap:wrap; gap:7px; }
        .exp-tag { font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; background:var(--amberDim); border:1px solid rgba(217,119,6,0.22); color:var(--amber); }

        /* ── PROJECTS ── */
        .project-row { display:grid; grid-template-columns:1fr 420px; background:var(--bg2); border:1px solid var(--border); border-radius:18px; overflow:hidden; transition:border-color 0.22s, transform 0.22s, background 0.35s; margin-bottom:14px; }
        .project-row:hover { border-color:rgba(217,119,6,0.25); transform:translateY(-2px); }
        @media (max-width:880px) {
          .project-row { grid-template-columns:1fr; }
          .project-visual { border-left:none !important; border-top:1px solid var(--border) !important; height:260px !important; aspect-ratio:unset !important; }
        }
        @media (max-width:480px) { .project-visual { height:210px !important; } }
        .project-info { padding:38px 42px; display:flex; flex-direction:column; justify-content:center; }
        @media (max-width:480px) { .project-info { padding:28px 22px; } }
        .project-num { font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--dim); margin-bottom:14px; }
        .project-name { font-family:'DM Serif Display',serif; font-size:clamp(20px,2.5vw,27px); color:var(--text); margin-bottom:5px; line-height:1.2; letter-spacing:-0.5px; }
        .project-subtitle { font-size:13px; color:var(--muted); margin-bottom:16px; font-weight:400; }
        .project-desc { font-size:14px; line-height:1.8; color:var(--muted); font-weight:300; margin-bottom:22px; max-width:400px; }
        .project-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px; }
        .project-tag { font-size:11px; font-weight:600; padding:4px 10px; border-radius:4px; background:var(--bg3); border:1px solid var(--border); color:var(--muted); }
        .project-btns { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
        .proj-link { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:500; padding:8px 16px; border-radius:7px; border:1px solid var(--border); color:var(--muted); width:fit-content; transition:all 0.18s; }
        .proj-link:hover { color:var(--text); border-color:rgba(217,119,6,0.4); background:var(--amberGlow); }
        .proj-live { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:600; padding:8px 16px; border-radius:7px; width:fit-content; transition:all 0.18s; text-decoration:none; }
        .proj-live:hover { opacity:0.82; transform:translateY(-1px); }
        .proj-expand { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:500; padding:8px 14px; border-radius:7px; border:1px solid var(--border); color:var(--muted); cursor:pointer; background:transparent; font-family:inherit; transition:all 0.18s; }
        .proj-expand:hover { color:var(--text); border-color:rgba(217,119,6,0.4); background:var(--amberGlow); }
        .project-visual { aspect-ratio:16/11; overflow:hidden; background:#0a0c14; border-left:1px solid var(--border); position:relative; transition:border-color 0.35s; }

        /* ── EDUCATION ── */
        .edu-card { background:var(--bg2); border:1px solid var(--border); border-radius:18px; padding:34px 38px; transition:border-color 0.2s, background 0.35s; }
        @media (max-width:480px) { .edu-card { padding:24px 22px; } }
        .edu-card:hover { border-color:rgba(217,119,6,0.25); }
        .edu-header { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:14px; margin-bottom:20px; }
        .edu-school { font-family:'DM Serif Display',serif; font-size:20px; color:var(--text); letter-spacing:-0.4px; margin-bottom:4px; }
        .edu-degree { font-size:14px; color:var(--amber); font-weight:600; }
        .edu-year { font-size:12px; font-weight:600; color:var(--muted); background:var(--bg3); border:1px solid var(--border); padding:5px 13px; border-radius:99px; flex-shrink:0; }
        .edu-note { font-size:14.5px; line-height:1.8; color:var(--muted); font-weight:300; margin-bottom:20px; }
        .edu-highlights { display:flex; flex-wrap:wrap; gap:8px; }
        .edu-highlight { font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; background:var(--bg3); border:1px solid var(--border); color:var(--muted); }

        /* ── CONTACT ── */
        .contact-wrap { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
        @media (max-width:700px) { .contact-wrap { grid-template-columns:1fr; gap:40px; } }
        .contact-lede { font-size:15.5px; color:var(--muted); line-height:1.85; font-weight:300; margin-bottom:10px; }
        .contact-lede strong { color:var(--text); font-weight:600; }
        .contact-note { font-size:13px; color:var(--dim); margin-bottom:28px; line-height:1.7; }
        .c-link { display:flex; align-items:center; gap:13px; padding:13px 16px; border-radius:11px; border:1px solid var(--border); background:var(--bg2); font-size:13.5px; color:var(--muted); transition:border-color 0.18s, color 0.18s, transform 0.18s, background 0.35s; margin-bottom:8px; }
        .c-link:hover { border-color:rgba(217,119,6,0.3); color:var(--text); transform:translateX(4px); }
        .c-link-icon { font-size:16px; width:20px; text-align:center; flex-shrink:0; }
        .form-grid { display:flex; flex-direction:column; gap:14px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        @media (max-width:480px) { .form-row { grid-template-columns:1fr; } }
        .form-group { display:flex; flex-direction:column; gap:6px; }
        .form-label { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); }
        .form-input { background:var(--bg2); border:1px solid var(--border); border-radius:9px; padding:12px 14px; font-family:inherit; font-size:14px; color:var(--text); outline:none; transition:border-color 0.18s, background 0.35s, color 0.35s; font-weight:300; }
        .form-input:focus { border-color:rgba(217,119,6,0.5); background:var(--amberGlow); }
        .form-input::placeholder { color:var(--dim); }
        textarea.form-input { resize:vertical; }
        .send-btn { display:flex; align-items:center; justify-content:center; gap:8px; background:var(--amber); color:#fff; border:none; border-radius:9px; padding:13px; font-family:inherit; font-size:14px; font-weight:600; cursor:pointer; transition:background 0.18s; box-shadow:0 4px 20px rgba(217,119,6,0.25); width:100%; }
        .send-btn:hover:not(:disabled) { background:var(--amber2); }
        .send-btn:disabled { opacity:0.6; cursor:not-allowed; }

        /* ── FOOTER ── */
        .footer-wrap { position:relative; z-index:2; border-top:1px solid var(--border); }
        footer { max-width:1160px; margin:0 auto; padding:30px 40px; display:flex; align-items:center; justify-content:space-between; }
        @media (max-width:480px) { footer { flex-direction:column; gap:12px; text-align:center; padding:24px 20px; } }
        .footer-text { font-size:13px; color:var(--dim); }
        .footer-built { font-size:12px; color:var(--dim); }
        .footer-links { display:flex; gap:22px; }
        .footer-link { font-size:13px; color:var(--dim); transition:color 0.18s; }
        .footer-link:hover { color:var(--amber); }

        /* ── MISC ── */
        .light .skill-card, .light .fact-row, .light .project-row, .light .exp-card, .light .c-link, .light .edu-card { box-shadow:0 1px 3px var(--shadow); }
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
        .hero-left > *:nth-child(7){animation-delay:0.54s}
      `}</style>

      {/* ── NAV ── */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">Glen<span>.</span></a>
          <div className="nav-links">
            {["About","Skills","Experience","Projects","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            ))}
            <a href="https://devhub-liard.vercel.app/" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color:"#22d3ee", fontWeight:600 }}>DevHub ↗</a>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={dark?"Switch to light":"Switch to dark"}>
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
            <div className="hero-eyebrow"><span className="eyebrow-dot"/>Open to Opportunities</div>
            <h1 className="hero-name">{YOUR_FIRST}<br/><span className="dim">Honrado</span></h1>
            <div className="hero-role-line">
              <span className="hero-role-typed">{displayed}<span className="caret"/></span>
              <span>Developer</span>
            </div>
            <p className="hero-desc">{YOUR_TAGLINE}</p>
            <p className="hero-sub-note">
              <span>BS IT Graduate · 2026</span> &nbsp;·&nbsp; Bestlink College of the Philippines &nbsp;·&nbsp; VRTSystems Intern
            </p>
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
            <div className="hero-photo-frame">
              <img src="../Graduation Picture.jpg" alt="Glen Honrado — BS IT Graduate"/>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="stats-inner">
          {STATS.map(s => (
            <div key={s.label} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="page-wrap">
        <section id="about" className="section">
          <p className="s-label">About Me</p>
          <h2 className="s-title">The developer behind the work</h2>

          <p className="about-intro">
            I'm <strong>Glen Honrado</strong>, a newly graduated BS Information Technology student from Bestlink College of the Philippines. I've spent the last four years learning — not just in classrooms, but by <strong>building real things for real people</strong>. From RFID-powered attendance systems to mobile diary apps, every project I've shipped has pushed me to understand software more deeply.
          </p>

          <div className="about-quote">
            <p>"I don't just write code — I build systems that actually get used. That's the part that matters to me."</p>
          </div>

          <div className="about-cols">
            <div className="about-col-text">
              <p>My path started with simple curiosity about how websites work. That curiosity grew into a full-stack skill set spanning <strong>React, Laravel, Node.js, Vue, and Docker</strong> — technologies I chose because they're what the real world demands, not just what the curriculum covered.</p>
              <p>During my internship at <strong>VRTSystems Technologies Corp.</strong>, I shipped a production attendance system that integrated physical hardware — Raspberry Pi with RFID and fingerprint sensors — into a polished web interface. That experience taught me how software lives in the real world, where requirements change, hardware is unpredictable, and the user experience actually matters.</p>
              <p>Now I'm focused on <strong>growing into cybersecurity</strong> — specifically web application security, cloud infrastructure hardening, and network analysis. I believe the best security engineers are those who first understand how systems are built.</p>
            </div>
            <div className="facts-list">
              {[
                { icon:"🎓", label:"Degree",         value:"BS Information Technology — Bestlink College of the Philippines (2022–2026)" },
                { icon:"📍", label:"Location",        value:"Caloocan, NCR · Remote-friendly · Open to relocation" },
                { icon:"💼", label:"Seeking",         value:"Full-time roles & freelance projects in web development or cybersecurity" },
                { icon:"🔐", label:"Growing Into",    value:"Web app security, cloud infrastructure hardening, network analysis" },
                { icon:"⚡", label:"Availability",    value:"Immediately available · Can start ASAP" },
              ].map(f => (
                <div key={f.label} className="fact-row">
                  <span className="fact-icon">{f.icon}</span>
                  <div><p className="fact-label">{f.label}</p><p className="fact-value">{f.value}</p></div>
                </div>
              ))}
            </div>
          </div>

          <p className="s-label" style={{ marginBottom:14 }}>What I value</p>
          <div className="values-grid">
            {[
              { icon:"🚢", title:"Ship it.", desc:"Working software in users' hands matters more than endless planning. I bias toward action." },
              { icon:"🔍", title:"Understand it deeply.", desc:"I don't copy-paste until something works. I need to know why it works." },
              { icon:"🛡️", title:"Secure it properly.", desc:"Security isn't an afterthought. It's the reason I'm moving toward cybersecurity." },
              { icon:"🤝", title:"Work with people.", desc:"The best code is written in teams. I communicate clearly and document my decisions." },
              { icon:"📚", title:"Keep learning.", desc:"Technology evolves constantly. I've built 7 different tech stacks in 4 years — on purpose." },
              { icon:"🎯", title:"Build with purpose.", desc:"Every system I've built solved a real problem for real users. That's what drives me." },
            ].map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <hr/>

      {/* ── DEVHUB PROMO ── */}
      <div className="page-wrap">
        <section id="devhub" className="section" style={{ paddingBottom:0 }}>
          <p className="s-label">Hire Me for Freelance</p>
          <h2 className="s-title">Looking for a developer?</h2>
          <p className="s-sub">I built a platform specifically for this — browse my profile, see my work, and reach out directly. It takes less than a minute.</p>
          <div className="devhub-banner">
            <div className="devhub-top-bar"/>
            <div className="devhub-inner">
              <div className="devhub-content">
                <div className="devhub-badge"><span className="devhub-badge-dot"/>Live Platform</div>
                <h3 className="devhub-title">DevHub</h3>
                <p className="devhub-subtitle">Connect Freelancer to their Clients — Be the Admin, connect to your clients and manage your projects.</p>
                <p className="devhub-desc">DevHub is a platform I built to connect developers with clients who need real work done. Instead of back-and-forth emails, you can see exactly who I am, what I've built, and what I offer — then reach out with one click.</p>
                <div className="devhub-steps">
                  <div className="devhub-step">
                    <span className="devhub-step-num">1</span>
                    <p className="devhub-step-text"><strong>Browse my profile</strong> — view my full bio, skills, and the projects I've shipped.</p>
                  </div>
                  <div className="devhub-step">
                    <span className="devhub-step-num">2</span>
                    <p className="devhub-step-text"><strong>Explore my work</strong> — each project is listed with tech stack, description, and screenshots.</p>
                  </div>
                  <div className="devhub-step">
                    <span className="devhub-step-num">3</span>
                    <p className="devhub-step-text"><strong>Send me a message</strong> — tell me what you need and I'll get back to you within 24 hours.</p>
                  </div>
                </div>
                <a href="https://devhub-liard.vercel.app/" target="_blank" rel="noopener noreferrer" className="devhub-cta">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Open DevHub — Find Me
                </a>
              </div>
              <div className="devhub-visual">
                {/* Stylized DevHub mockup */}
                <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"90%", maxWidth:340 }}>
                  <rect width="420" height="420" fill="#070c14"/>
                  {/* card */}
                  <rect x="20" y="20" width="380" height="380" rx="14" fill="#0d1625" stroke="rgba(34,211,238,0.18)" strokeWidth="1"/>
                  {/* top bar */}
                  <rect x="20" y="20" width="380" height="3" rx="2" fill="url(#dh-grad)"/>
                  <defs>
                    <linearGradient id="dh-grad" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#22d3ee"/>
                      <stop offset="0.6" stopColor="#06b6d4"/>
                      <stop offset="1" stopColor="transparent"/>
                    </linearGradient>
                  </defs>
                  {/* avatar circle */}
                  <circle cx="210" cy="100" r="38" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.35)" strokeWidth="1.5"/>
                  <circle cx="210" cy="90" r="14" fill="rgba(34,211,238,0.3)"/>
                  <path d="M182 118 q28-18 56 0" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  {/* name / role lines */}
                  <rect x="150" y="150" width="120" height="10" rx="4" fill="rgba(241,245,249,0.75)"/>
                  <rect x="170" y="168" width="80" height="7" rx="3" fill="rgba(34,211,238,0.55)"/>
                  {/* divider */}
                  <line x1="48" y1="192" x2="372" y2="192" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                  {/* skill tags */}
                  <rect x="48" y="206" width="56" height="20" rx="5" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.25)" strokeWidth="0.8"/>
                  <rect x="112" y="206" width="48" height="20" rx="5" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.25)" strokeWidth="0.8"/>
                  <rect x="168" y="206" width="60" height="20" rx="5" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.25)" strokeWidth="0.8"/>
                  <rect x="236" y="206" width="52" height="20" rx="5" fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.15)" strokeWidth="0.8"/>
                  <rect x="296" y="206" width="76" height="20" rx="5" fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.15)" strokeWidth="0.8"/>
                  <rect x="48" y="234" width="60" height="20" rx="5" fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.15)" strokeWidth="0.8"/>
                  <rect x="116" y="234" width="44" height="20" rx="5" fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.15)" strokeWidth="0.8"/>
                  {/* divider */}
                  <line x1="48" y1="270" x2="372" y2="270" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                  {/* project cards */}
                  <rect x="48" y="284" width="156" height="96" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(34,211,238,0.2)" strokeWidth="0.8"/>
                  <rect x="216" y="284" width="156" height="96" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
                  <rect x="58" y="294" width="80" height="6" rx="2" fill="rgba(34,211,238,0.5)"/>
                  <rect x="58" y="308" width="136" height="4" rx="2" fill="rgba(255,255,255,0.18)"/>
                  <rect x="58" y="320" width="110" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>
                  <rect x="58" y="355" width="50" height="16" rx="4" fill="rgba(34,211,238,0.18)" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8"/>
                  <rect x="226" y="294" width="80" height="6" rx="2" fill="rgba(255,255,255,0.35)"/>
                  <rect x="226" y="308" width="136" height="4" rx="2" fill="rgba(255,255,255,0.14)"/>
                  <rect x="226" y="320" width="110" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
                  <rect x="226" y="355" width="50" height="16" rx="4" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
                  {/* DevHub label */}
                  <text x="210" y="408" textAnchor="middle" fill="rgba(34,211,238,0.35)" fontSize="11" fontFamily="'DM Sans',sans-serif" fontWeight="600" letterSpacing="0.1em">DEVHUB</text>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </div>

      <hr/>

      {/* ── SKILLS ── */}
      <div className="page-wrap">
        <section id="skills" className="section">
          <p className="s-label">Skills & Tooling</p>
          <h2 className="s-title">What I work with</h2>
          <p className="s-sub">A diverse, production-tested toolkit. I pick up new technologies quickly and focus on depth where it matters most.</p>
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

      {/* ── EXPERIENCE ── */}
      <div className="page-wrap">
        <section id="experience" className="section">
          <p className="s-label">Experience</p>
          <h2 className="s-title">Where I've worked</h2>
          <p className="s-sub">Real-world experience shipping production software as part of a professional team.</p>
          <div className="exp-card">
            <div className="exp-top-bar"/>
            <div className="exp-body">
              <div className="exp-header">
                <div>
                  <p className="exp-company">VRTSystems Technologies Corp.</p>
                  <p className="exp-role">Full-Stack Developer Intern</p>
                </div>
                <div className="exp-meta">
                  <span className="exp-year">Jan – May 2026</span>
                  <span className="exp-type">Internship · On-site</span>
                </div>
              </div>

              <p className="exp-summary">
                Joined VRTSystems as a full-stack developer intern and shipped a complete, production-ready DTR Attendance Management System from the ground up. The system integrates RFID card readers and fingerprint sensors via Raspberry Pi, records attendance in real-time into a MySQL database, and surfaces data through a polished Vue.js + Quasar frontend — all containerized with Docker for consistent deployment across environments.
              </p>

              <hr className="exp-divider"/>

              <p className="exp-section-title">Key Contributions</p>
              <ul className="exp-bullets">
                <li>Designed and built the full REST API backend using <strong>Laravel</strong>, covering authentication, employee/student records, real-time attendance logging, and analytics endpoints.</li>
                <li>Developed the admin dashboard and employee self-service portal using <strong>Vue.js and Quasar Framework</strong>, including dark mode, analytics charts, and profile management.</li>
                <li>Integrated <strong>Raspberry Pi GPIO</strong> with RFID (RC522) and fingerprint sensors, writing the Python interface layer that communicates attendance events to the backend API in real-time.</li>
                <li>Containerized the entire application stack (web server, API, database, hardware service) using <strong>Docker and Docker Compose</strong>, enabling reliable local and production deployment.</li>
                <li>Managed API endpoint testing and documentation with <strong>Postman</strong>, and source-controlled all work with <strong>Git in a WSL environment</strong> per the team's workflow standards.</li>
                <li>Collaborated closely with senior engineers to define system architecture, review code, and iterate based on real user feedback from internal trials.</li>
              </ul>

              <p className="exp-section-title">Tech Stack</p>
              <div className="exp-stack">
                {["Laravel","Quasar","Vue.js","MySQL","REST API","Docker","Docker Compose","Raspberry Pi","Python","GPIO","RFID","Fingerprint Sensor","Git","Postman","WSL","Linux"].map(t => (
                  <span key={t} className="exp-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Education card below experience */}
          <div style={{ marginTop:16 }}>
            <div className="edu-card">
              <div className="edu-header">
                <div>
                  <p className="edu-school">Bestlink College of the Philippines</p>
                  <p className="edu-degree">Bachelor of Science in Information Technology</p>
                </div>
                <span className="edu-year">2022 – 2026</span>
              </div>
              <p className="edu-note">
                Four-year program covering software engineering, database systems, networking, and web development. Beyond the curriculum, I independently built <strong>six full-stack projects</strong> using technologies not taught in class — driven by a belief that real learning happens when you're solving actual problems, not following textbook exercises.
              </p>
              <div className="edu-highlights">
                {["Full-Stack Development","Database Design","REST API Architecture","Software Engineering","Networking Fundamentals","UI/UX Principles","Capstone: RFID Attendance System"].map(h => (
                  <span key={h} className="edu-highlight">{h}</span>
                ))}
              </div>
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
          <p className="s-sub">Six real-world systems, each one solving a genuine problem — and teaching me something I couldn't have learned in a classroom.</p>
          {PROJECTS.map((p, i) => (
            <div key={p.id} className="project-row">
              <div className="project-info">
                <p className="project-num">{String(i+1).padStart(2,"0")} / {String(PROJECTS.length).padStart(2,"0")}</p>
                <h3 className="project-name">{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">{p.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}</div>
                <div className="project-btns">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                    <GithubIcon size={14}/> View Code
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj-live"
                      style={{ border:`1px solid ${p.accent}55`, color:p.accent, background:`${p.accent}12` }}>
                      <ExternalLinkIcon size={13}/> Visit Live
                    </a>
                  )}
                  {p.images.filter(Boolean).length > 0 && (
                    <button className="proj-expand" onClick={() => setActiveProject(p)}>
                      <ExpandIcon /> Preview
                    </button>
                  )}
                </div>
              </div>
              <div
                className="project-visual"
                onClick={() => p.images.filter(Boolean).length > 0 && setActiveProject(p)}
                style={{ cursor: p.images.filter(Boolean).length > 0 ? "pointer" : "default" }}
              >
                <ProjectCarousel images={p.images} accent={p.accent} title={p.title}/>
              </div>
            </div>
          ))}
          <div style={{ textAlign:"center", marginTop:"24px" }}>
            <a href={`https://${YOUR_GITHUB}`} target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost"><GithubIcon size={15}/> See all repositories on GitHub</button>
            </a>
          </div>
        </section>
      </div>

      <hr/>

      {/* ── CONTACT ── */}
      <div className="page-wrap">
        <section id="contact" className="section">
          <p className="s-label">Contact</p>
          <h2 className="s-title">Let's build something together</h2>
          <div className="contact-wrap">
            <div>
              <p className="contact-lede">I'm actively looking for <strong>full-time roles in web development or cybersecurity</strong>, and I'm open to freelance projects and collaborations. If you have something you're building and think I'd be a fit — let's talk.</p>
              <p className="contact-note">I typically respond within 24 hours. You can also reach me directly through any of the channels below.</p>
              {[
                { icon:"✉",  text:YOUR_EMAIL,    href:`mailto:${YOUR_EMAIL}`,          label:"Email" },
                { icon:"📞", text:YOUR_PHONE,    href:`tel:${YOUR_PHONE}`,             label:"Phone" },
                { icon:"🌐", text:YOUR_WEBSITE,  href:`https://${YOUR_WEBSITE}`,       label:"Portfolio" },
                { icon:"⊙",  text:YOUR_GITHUB,   href:`https://${YOUR_GITHUB}`,        label:"GitHub" },
                { icon:"in", text:YOUR_LINKEDIN, href:`https://${YOUR_LINKEDIN}`,      label:"LinkedIn" },
              ].map(l => (
                <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer" className="c-link">
                  <span className="c-link-icon">{l.icon}</span>
                  <span style={{ flex:1 }}>{l.text}</span>
                  <span style={{ fontSize:11, color:"var(--dim)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{l.label}</span>
                </a>
              ))}
            </div>
            <div className="form-grid">
              <div style={{ background:"var(--amberDim)", border:"1px solid rgba(217,119,6,0.2)", borderRadius:12, padding:"14px 18px", marginBottom:4 }}>
                <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.7, fontWeight:300 }}>
                  ✍️ &nbsp;Prefer a quick message? Fill out the form and it goes directly to my inbox.
                </p>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" type="text" placeholder="Jane Smith" value={formData.name} onChange={e=>setFormData(f=>({...f,name:e.target.value}))}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="jane@company.com" value={formData.email} onChange={e=>setFormData(f=>({...f,email:e.target.value}))}/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea className="form-input" rows={5} placeholder="Tell me about your project, role, or idea — or just say hi." value={formData.message} onChange={e=>setFormData(f=>({...f,message:e.target.value}))}/>
              </div>
              <button className="send-btn" onClick={handleSubmit} disabled={submitted || sending}>
                {submitted ? "✓ Message Sent — I'll be in touch!" : sending ? "Sending..." : <><SendIcon/> Send Message</>}
              </button>
              {sendError && <p style={{ color:"#f87171", fontSize:"13px", marginTop:"6px" }}>{sendError}</p>}
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <div className="footer-wrap">
        <footer>
          <div>
            <p className="footer-text">© {new Date().getFullYear()} {YOUR_NAME}</p>
            <p className="footer-built" style={{ marginTop:4 }}>BS IT Graduate · Full-Stack Developer · Aspiring Security Engineer</p>
          </div>
          <div className="footer-links">
            <a href={`https://${YOUR_GITHUB}`}  target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href={`https://${YOUR_LINKEDIN}`} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href={`mailto:${YOUR_EMAIL}`} className="footer-link">Email</a>
          </div>
        </footer>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}