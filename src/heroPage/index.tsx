import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import LiquidGradient from '@/components/LiquidGradient'

/* ─── tiny hook: reveals element when it enters viewport ─── */
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

/* ─── jobs data ─── */
const JOBS = [
  { year: '2025 — Present', co: 'Union Pacific',   role: 'Lead UX Designer',  bullets: ['Led UX strategy for REMS platform (web + iPad)', 'Redesigned system to enterprise standards', 'Field research to improve workflows', 'Delivered scalable UX with stakeholders'] },
  { year: '2021 — 2025',    co: 'Verizon',          role: 'Lead CX Architect', bullets: ['Designed hybrid network orchestration platform', 'Simplified complex data into dashboards', 'Led UX research and usability testing', 'Built scalable UI systems'] },
  { year: '2020 — 2021',    co: 'Nuvve',            role: 'Lead UX Designer',  bullets: ['Led UX for EV fleet platform', 'Created scalable design system', 'Reduced support queries via UX improvements', 'Improved engagement through testing'] },
  { year: '2018 — 2020',    co: 'Hilton',           role: 'UX Architect',      bullets: ['Designed enterprise tools and support systems', 'Built chatbot UX reducing support load', 'Conducted field research', 'Improved accessibility and workflows'] },
  { year: '2015 — 2018',    co: 'Estuate',          role: 'Senior Designer',   bullets: ['Led internal communication tool UX', 'Mentored junior designers', 'Improved usability and workflows', 'Delivered scalable design solutions'] },
  { year: '2013 — 2015',    co: 'Anameka',          role: 'Junior Designer',   bullets: ['Designed UI for architectural tools', 'Created wireframes and flows', 'Collaborated with senior designers', 'Built client-facing interfaces'] },
  { year: '2010 — 2011',    co: 'Anameka',          role: 'Design Trainee',    bullets: ['Created mockups and wireframes', 'Built clickable prototypes', 'Designed UI flows', 'Maintained design consistency'] },
]

/* ─── roles for the typewriter ─── */
const ROLES = ['UI/UX Designer', 'Creative Thinker', 'Problem Solver', 'User Advocate', 'Visual Storyteller']

export default function HeroPage() {
  const navigate = useNavigate()

  /* typewriter */
  const [idx, setIdx]       = useState(0)
  const [txt, setTxt]       = useState('')
  const [del, setDel]       = useState(false)

  useEffect(() => {
    const cur   = ROLES[idx]
    const speed = del ? 45 : 95
    const t = setTimeout(() => {
      if (!del) {
        setTxt(cur.slice(0, txt.length + 1))
        if (txt === cur) setTimeout(() => setDel(true), 1400)
      } else {
        setTxt(cur.slice(0, txt.length - 1))
        if (txt === '') { setDel(false); setIdx(p => (p + 1) % ROLES.length) }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [txt, del, idx])

  /* section reveal refs */
  const [aboutRef, aboutVisible]   = useReveal()
  const [workRef,  workVisible]    = useReveal()

  /* active job */
  const [activeJob, setActiveJob] = useState(null)

  return (
    <>
      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syne:wght@400;700;800&display=swap');

        :root {
          --gold:   #C9A84C;
          --gold-dim:#7a6020;
          --white:  #F5F0E8;
          --off:    rgba(245,240,232,0.55);
          --line:   rgba(201,168,76,0.25);
        }

        /* ── reveal animation ── */
        .reveal { opacity:0; transform:translateY(36px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); }
        .reveal.show { opacity:1; transform:translateY(0); }

        /* staggered children */
        .stagger > * { opacity:0; transform:translateY(28px); transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1); }
        .stagger.show > *:nth-child(1){ opacity:1;transform:translateY(0);transition-delay:.05s}
        .stagger.show > *:nth-child(2){ opacity:1;transform:translateY(0);transition-delay:.15s}
        .stagger.show > *:nth-child(3){ opacity:1;transform:translateY(0);transition-delay:.25s}
        .stagger.show > *:nth-child(4){ opacity:1;transform:translateY(0);transition-delay:.35s}
        .stagger.show > *:nth-child(5){ opacity:1;transform:translateY(0);transition-delay:.45s}
        .stagger.show > *:nth-child(6){ opacity:1;transform:translateY(0);transition-delay:.55s}
        .stagger.show > *:nth-child(7){ opacity:1;transform:translateY(0);transition-delay:.65s}
        .stagger.show > *:nth-child(8){ opacity:1;transform:translateY(0);transition-delay:.75s}

        /* nav pill */
        .nav-pill {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 8px 22px;
          border-radius: 100px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--white);
          backdrop-filter: blur(12px);
          transition: background 0.25s, border-color 0.25s;
        }
        .nav-pill:hover { background: rgba(201,168,76,0.18); border-color: rgba(201,168,76,0.6); }

        /* hero title */
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(72px, 14vw, 200px);
          line-height: 0.9;
          letter-spacing: -0.01em;
          color: var(--white);
          text-shadow: 0 2px 40px rgba(0,0,0,0.6);
        }

        /* thin rule */
        .rule { height:1px; background: var(--line); }

        /* section label */
        .sec-label {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
        }

        /* about heading */
        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(44px, 7vw, 88px);
          line-height: 1.05;
          color: var(--white);
          text-shadow: 0 2px 30px rgba(0,0,0,0.5);
        }

        /* about body */
        .about-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2.2vw, 24px);
          line-height: 1.7;
          color: var(--off);
          font-weight: 300;
        }

        /* work title */
        .work-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 9vw, 120px);
          letter-spacing: -0.02em;
          color: var(--white);
          line-height: 0.95;
        }

        /* ── JOB CARDS ── */
        .jobs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-top: 48px;
          background: rgba(201,168,76,0.08);
        }

        .job-card {
          position: relative;
          padding: 36px 40px;
          background: rgba(5,4,2,0.75);
          cursor: pointer;
          overflow: hidden;
          transition: background 0.35s;
          border: 1px solid transparent;
        }

        /* spotlight glow that follows mouse — via CSS custom props */
        .job-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--mx, 50%) var(--my, 50%),
            rgba(201,168,76,0.10),
            transparent 55%
          );
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          z-index: 0;
        }
        .job-card:hover::before { opacity: 1; }

        /* top shimmer line on hover */
        .job-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(.16,1,.3,1);
        }
        .job-card:hover::after { transform: scaleX(1); }

        .job-card:hover {
          background: rgba(12,10,4,0.92);
          border-color: rgba(201,168,76,0.15);
        }

        /* index number */
        .job-index {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(201,168,76,0.35);
          margin-bottom: 20px;
          display: block;
          position: relative;
          z-index: 1;
        }

        .job-year {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--gold-dim);
          text-transform: uppercase;
          position: relative;
          z-index: 1;
          margin-bottom: 10px;
        }
        .job-co {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 6px;
          position: relative;
          z-index: 1;
        }
        .job-role {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 2.5vw, 30px);
          font-weight: 300;
          font-style: italic;
          color: var(--white);
          line-height: 1.2;
          position: relative;
          z-index: 1;
          transition: color 0.3s;
        }
        .job-card:hover .job-role { color: #fff; }

        /* bullets — slide down on hover */
        .job-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s cubic-bezier(.16,1,.3,1), opacity 0.4s, margin 0.4s;
          position: relative;
          z-index: 1;
        }
        .job-bullets.open {
          max-height: 200px;
          opacity: 1;
          margin-top: 16px;
        }
        .job-bullets li {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: rgba(245,240,232,0.55);
          padding: 4px 0;
          padding-left: 14px;
          position: relative;
        }
        .job-bullets li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 5px;
          height: 1px;
          background: var(--gold);
        }

        /* arrow indicator */
        .job-arrow {
          position: absolute;
          top: 36px;
          right: 36px;
          font-size: 16px;
          color: var(--gold);
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 1;
        }
        .job-card:hover .job-arrow { opacity: 1; transform: translateY(0); }
        .job-card.active .job-arrow { opacity: 1; transform: rotate(45deg); }

        /* ── CONTACT SECTION ── */
        .contact-section {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 40px;
          overflow: hidden;
        }

        /* big ghost text behind */
        .contact-ghost {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(120px, 20vw, 280px);
          color: rgba(201,168,76,0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* horizontal marquee lines */
        @keyframes marquee-left  { from { transform:translateX(0) }   to { transform:translateX(-50%) } }
        @keyframes marquee-right { from { transform:translateX(-50%) } to { transform:translateX(0) } }

        .marquee-wrap {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 14px 0;
          margin: 48px 0;
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee-left 18s linear infinite;
          gap: 0;
        }
        .marquee-track-r {
          display: flex;
          white-space: nowrap;
          animation: marquee-right 22s linear infinite;
          gap: 0;
        }
        .marquee-item {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.45);
          padding: 0 40px;
          flex-shrink: 0;
        }
        .marquee-dot {
          color: var(--gold);
          padding: 0 8px;
        }

        .contact-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(44px, 7vw, 96px);
          line-height: 1.05;
          color: var(--white);
          text-align: center;
          max-width: 900px;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
          position: relative;
          z-index: 1;
        }

        .contact-heading strong {
          font-style: normal;
          font-weight: 600;
          color: var(--gold);
        }

        .contact-sub {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.45);
          text-align: center;
          margin-top: 20px;
          position: relative;
          z-index: 1;
        }

        /* contact card */
        .contact-card {
          position: relative;
          z-index: 1;
          margin-top: 52px;
          width: 100%;
          max-width: 560px;
          border: 1px solid rgba(201,168,76,0.2);
          background: rgba(4,3,1,0.7);
          backdrop-filter: blur(20px);
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .contact-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .contact-card:hover {
          border-color: rgba(201,168,76,0.4);
          box-shadow: 0 0 60px rgba(201,168,76,0.06);
        }

        .contact-name-tag {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
          margin-bottom: 8px;
        }

        .contact-email {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(20px, 3vw, 28px);
          color: var(--gold);
          letter-spacing: 0.03em;
          text-decoration: none;
          transition: opacity 0.2s;
          margin-top: 4px;
        }
        .contact-email:hover { opacity: 0.75; }

        .contact-divider {
          width: 40px;
          height: 1px;
          background: var(--line);
          margin: 28px auto;
        }

        .contact-btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .c-btn {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 24px;
          border: 1px solid rgba(201,168,76,0.25);
          background: rgba(201,168,76,0.06);
          color: var(--white);
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, transform 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .c-btn:hover { background: rgba(201,168,76,0.14); border-color: rgba(201,168,76,0.5); transform: translateY(-1px); }

        .c-btn-gold {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 28px;
          background: var(--gold);
          color: #0a0802;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s, transform 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .c-btn-gold:hover { opacity: 0.88; transform: translateY(-1px); }
          font-size: 28px;
          font-weight: 300;
          font-style: italic;
          color: var(--white);
          line-height: 1.1;
        }
        .job-bullets {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: var(--off);
          line-height: 1.7;
          list-style: none;
          padding: 0;
          margin: 12px 0 0 0;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(.16,1,.3,1), opacity 0.35s;
          opacity: 0;
        }
        .job-bullets.open { max-height: 160px; opacity: 1; }
        .job-bullets li::before { content: '— '; color: var(--gold); }

        .job-arrow {
          font-size: 20px;
          color: var(--gold);
          transition: transform 0.35s cubic-bezier(.16,1,.3,1), opacity 0.35s;
          opacity: 0.4;
          padding-top: 6px;
          user-select: none;
        }
        .job-row:hover .job-arrow { opacity: 1; transform: rotate(45deg); }

        /* learn more */
        .learn-more {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          cursor: pointer;
          transition: gap 0.3s;
          border: none;
          background: none;
        }
        .learn-more:hover { gap: 20px; }
        .learn-more-line { height:1px; width:48px; background:var(--gold); transition: width 0.3s; }
        .learn-more:hover .learn-more-line { width: 80px; }

        /* hero scroll hint */
        @keyframes bounce-y {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(6px); }
        }
        .scroll-hint { animation: bounce-y 2s ease-in-out infinite; }

        /* hero name */
        .hero-name {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
        }

        /* typewriter */
        .typewriter {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(18px, 2.5vw, 26px);
          color: var(--gold);
          letter-spacing: 0.04em;
        }
        .caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--gold);
          margin-left: 3px;
          vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50%{opacity:0} }

        /* hero entrance */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-enter { animation: fadeUp 1.2s cubic-bezier(.16,1,.3,1) both; }
        .hero-enter-2 { animation: fadeUp 1.2s cubic-bezier(.16,1,.3,1) 0.25s both; }
        .hero-enter-3 { animation: fadeUp 1.2s cubic-bezier(.16,1,.3,1) 0.45s both; }
        .hero-enter-4 { animation: fadeUp 1.2s cubic-bezier(.16,1,.3,1) 0.65s both; }

        /* ── decorative number ── */
        .dec-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 200px;
          font-weight: 300;
          color: rgba(201,168,76,0.06);
          line-height: 1;
          position: absolute;
          right: 0;
          top: -40px;
          pointer-events: none;
          user-select: none;
        }

        /* about stat */
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 300;
          color: var(--gold);
          line-height: 1;
        }
        .stat-label {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--off);
          margin-top: 6px;
        }
      `}</style>

      <div className="w-full overflow-x-hidden text-white relative" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        <LiquidGradient />

        {/* ── dark veil: sits above gradient, below all content ── */}
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(4,4,12,0.78) 0%, rgba(8,6,18,0.65) 50%, rgba(4,4,12,0.78) 100%)',
          pointerEvents: 'none',
        }} />

        {/* ══════════════════ HERO ══════════════════ */}
        <section className="h-screen relative flex flex-col overflow-hidden" style={{ zIndex: 10 }}>

          {/* NAV */}
          <nav className="flex items-center justify-center px-8 py-6 relative z-30 hero-enter">
            <div className="flex gap-3 items-center">
              {[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Work', to: '/work' }].map(item => (
                <Link key={item.label} to={item.to} className="nav-pill">{item.label}</Link>
              ))}
              <Link to="/contact" className="nav-pill">Contact</Link>
            </div>
          </nav>

          {/* HERO BODY */}
          <div className="flex-1 flex flex-col items-center justify-center relative px-8">

            {/* eyebrow */}
            <div className="hero-name mb-10 hero-enter-2">Divya Saketharaman</div>

            {/* BIG TITLE */}
            <div className="text-center hero-enter-3">
              <h1 className="hero-title">Portfolio</h1>
            </div>

            {/* thin rule + typewriter */}
            <div className="rule w-64 my-8 hero-enter-4" />
            <div className="typewriter hero-enter-4">
              {txt}<span className="caret" />
            </div>
          </div>

          {/* scroll hint */}
          <div className="flex flex-col items-center pb-10 gap-2 relative z-30 hero-enter-4">
            <span className="sec-label scroll-hint">Scroll</span>
            <div style={{ width:1, height:32, background:'var(--line)' }} />
          </div>
        </section>

        {/* ══════════════════ ABOUT ══════════════════ */}
        <section
          id="about"
          ref={aboutRef}
          className="relative z-10 px-8 py-32"
          style={{ maxWidth: 1100, margin: '0 auto' }}
        >
          <div className={`stagger ${aboutVisible ? 'show' : ''}`}>

            {/* label */}
            <div className="sec-label mb-12">About</div>

            {/* two-col layout */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>

              {/* LEFT — headline */}
              <div>
                <h2 className="about-heading">
                  Designing<br/>
                  <em style={{color:'var(--gold)'}}>experiences</em><br/>
                  that endure.
                </h2>
              </div>

              {/* RIGHT — body + stats */}
              <div style={{ paddingTop: '12px' }}>
                <p className="about-body" style={{ marginBottom: 40 }}>
                  With over 11 years of experience in UX design, I craft experiences that 
                  blend form and function. I believe in continuous learning, collaborative 
                  leadership, and the power of creative expression to move people.
                </p>

                {/* stats row */}
                <div style={{ display:'flex', gap:48 }}>
                  <div>
                    <div className="stat-num">11+</div>
                    <div className="stat-label">Years of craft</div>
                  </div>
                  <div style={{ width:1, background:'var(--line)' }} />
                  <div>
                    <div className="stat-num">7</div>
                    <div className="stat-label">Companies shaped</div>
                  </div>
                  <div style={{ width:1, background:'var(--line)' }} />
                  <div>
                    <div className="stat-num">∞</div>
                    <div className="stat-label">Problems solved</div>
                  </div>
                </div>

                {/* CTA button → About page */}
                <Link
                  to="/about"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginTop: '44px',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: 'var(--white)',
                    padding: '14px 28px',
                    border: '1px solid rgba(201,168,76,0.4)',
                    background: 'rgba(201,168,76,0.07)',
                    backdropFilter: 'blur(8px)',
                    transition: 'background 0.3s, border-color 0.3s, gap 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(201,168,76,0.16)'
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(201,168,76,0.07)'
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                  }}
                >
                  {/* left gold line accent */}
                  <span style={{ display:'block', width:24, height:1, background:'var(--gold)', flexShrink:0, transition:'width 0.3s' }} />
                  The full story
                  <span style={{ color:'var(--gold)', fontSize:16, lineHeight:1 }}>→</span>
                </Link>
              </div>
            </div>

            {/* rule */}
            <div className="rule mt-20" />
          </div>
        </section>

        {/* ══════════════════ WORK EXPERIENCE ══════════════════ */}
        <section
          id="work"
          ref={workRef}
          className="relative z-10 px-8 pb-32"
          style={{ maxWidth: 1100, margin: '0 auto' }}
        >
          <div className={`reveal ${workVisible ? 'show' : ''}`}>

            {/* title block */}
            <div style={{ position:'relative', marginBottom: 16 }}>
              <span className="dec-num">W</span>
              <div className="sec-label mb-6">Experience</div>
              <h2 className="work-title">
                Work<br/>
                <span style={{ color:'var(--gold)', fontStyle:'italic', fontFamily:'Cormorant Garamond, serif', fontWeight:300 }}>
                  Experience
                </span>
              </h2>
            </div>

            {/* card grid */}
            <div className="jobs-grid">
              {JOBS.map((job, i) => (
                <div
                  key={i}
                  className={`job-card ${activeJob === i ? 'active' : ''}`}
                  onClick={() => setActiveJob(activeJob === i ? null : i)}
                  onMouseMove={e => {
                    const r = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                  }}
                >
                  <span className="job-index">0{i + 1}</span>
                  <div className="job-year">{job.year}</div>
                  <div className="job-co">{job.co}</div>
                  <div className="job-role">{job.role}</div>
                  <ul className={`job-bullets ${activeJob === i ? 'open' : ''}`}>
                    {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                  <div className="job-arrow">↗</div>
                </div>
              ))}

              {/* ── CTA card — lives inside the grid ── */}
              <div
                onClick={() => navigate('/work')}
                className="job-card"
                onMouseMove={e => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.22)',
                  cursor: 'pointer',
                  minHeight: 200,
                }}
              >
                {/* top label */}
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.5)',
                  position: 'relative',
                  zIndex: 1,
                }}>All projects</span>

                {/* big text */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(28px, 3.5vw, 42px)',
                    color: 'var(--white)',
                    lineHeight: 1.15,
                    marginBottom: 20,
                  }}>
                    See the full<br/>
                    <span style={{ color: 'var(--gold)' }}>body of work</span>
                  </div>

                  {/* pill button */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 22px',
                    border: '1px solid rgba(201,168,76,0.5)',
                    background: 'rgba(201,168,76,0.12)',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                  }}>
                    View projects
                    <span style={{ fontSize: 14 }}>→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}