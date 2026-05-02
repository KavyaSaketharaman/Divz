import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import TopoBg from '@/components/TopoBg'
import divya2 from '@/assets/divya2.png'

/* ── scroll reveal hook ── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const INTERESTS = [
  { emoji: '✈️', label: 'Travel & long drives' },
  { emoji: '📚', label: 'Books & storytelling' },
  { emoji: '🎨', label: 'Arts & crafts' },
  { emoji: '🎵', label: 'Music & dance' },
  { emoji: '🤝', label: 'Community & giving back' },
  { emoji: '🌱', label: 'Teaching & mentoring' },
]

export default function AboutPage() {
  const [bioRef, bioVisible]       = useReveal(0.08)
  const [dreamsRef, dreamsVisible] = useReveal(0.08)
  const [hobbiesRef, hobVisible]   = useReveal(0.08)

  return (
    <div className="about-root">

      {/* ── font + style injection ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink:    #F0EAE0;
          --ink2:   #C8BFB4;
          --warm:   #D4A96A;
          --paper:  #0F0D0B;
          --paper2: #1A1612;
          --rule:   rgba(212,169,106,0.2);
          --accent: #D4A96A;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .about-root {
          min-height: 100vh;
          overflow-x: hidden;
          background: var(--paper);
          color: var(--ink);
          position: relative;
        }

        /* ── noise grain overlay ── */
        .about-root::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          opacity: 0.06;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* ── nav ── */
        .about-nav {
          position: relative;
          z-index: 30;
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 24px 32px;
        }
        .nav-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 8px 22px;
          border-radius: 100px;
          background: rgba(212,169,106,0.08);
          border: 1px solid rgba(212,169,106,0.25);
          color: var(--ink2);
          backdrop-filter: blur(10px);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          cursor: pointer;
        }
        .nav-pill:hover { background: rgba(212,169,106,0.18); border-color: var(--accent); color: var(--ink); }

        /* ── HERO SPREAD ── */
        .hero-spread {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr 480px;
          min-height: 92vh;
          align-items: stretch;
        }

        /* left text column */
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 64px 64px 72px;
        }

        .issue-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 32px;
        }

        .mag-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(64px, 9vw, 130px);
          line-height: 0.92;
          color: var(--ink);
          letter-spacing: -0.02em;
          text-shadow: 0 2px 40px rgba(0,0,0,0.8);
        }

        .mag-title em {
          font-style: italic;
          color: var(--accent);
        }

        .mag-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(18px, 2.2vw, 26px);
          color: var(--warm);
          margin-top: 24px;
          line-height: 1.4;
        }

        .hero-rule {
          width: 64px;
          height: 2px;
          background: var(--accent);
          margin: 32px 0;
        }

        .hero-byline {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--ink2);
          opacity: 0.6;
          text-transform: uppercase;
        }

        /* right photo column */
        .hero-photo-wrap {
          position: relative;
          overflow: hidden;
        }

        .hero-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 8s ease;
        }

        .hero-photo-wrap:hover img { transform: scale(1.04); }

        /* photo caption bar */
        .photo-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 24px;
          background: linear-gradient(transparent, rgba(28,24,20,0.7));
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,234,224,0.8);
        }

        /* big rotated number behind title */
        .bg-num {
          position: absolute;
          right: 490px;
          bottom: -20px;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 320px;
          color: rgba(212,169,106,0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* ── horizontal rule ── */
        .full-rule {
          height: 1px;
          background: var(--rule);
          margin: 0 72px;
          position: relative;
          z-index: 10;
        }

        /* ── section wrapper ── */
        .section {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 72px;
        }

        .sec-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
          display: block;
        }

        /* ── BIO SECTION ── */
        .bio-grid {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 64px;
          align-items: start;
        }

        .bio-pull {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(28px, 3vw, 38px);
          line-height: 1.3;
          color: var(--ink);
          border-left: 3px solid var(--accent);
          padding-left: 24px;
        }

        .bio-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.85;
          color: var(--ink2);
          font-weight: 300;
        }

        .bio-body p + p { margin-top: 20px; }
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); }
        .reveal.show { opacity: 1; transform: translateY(0); }

        /* ── DREAMS SECTION — warm amber glow on deep dark ── */
        .dreams-wrap {
          background: linear-gradient(135deg, #1A1208 0%, #221A08 50%, #1A1208 100%);
          border-top: 1px solid rgba(212,169,106,0.15);
          border-bottom: 1px solid rgba(212,169,106,0.15);
          color: var(--ink);
          padding: 100px 72px;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .dreams-wrap::before {
          content: '"';
          font-family: 'Playfair Display', serif;
          font-size: 600px;
          color: rgba(212,169,106,0.04);
          position: absolute;
          top: -120px;
          left: 40px;
          line-height: 1;
          pointer-events: none;
        }

        .dreams-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }

        .dreams-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-style: italic;
          font-size: clamp(44px, 5vw, 72px);
          line-height: 1.1;
          color: var(--ink);
        }

        .dreams-heading span { color: var(--accent); }

        .dreams-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.9;
          color: var(--ink2);
          font-weight: 300;
        }

        .dreams-rule { width: 48px; height: 2px; background: var(--accent); margin: 28px 0; }

        /* ── INTERESTS ── */
        .interests-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 40px;
        }

        .interest-tile {
          background: #181410;
          border: 1px solid rgba(212,169,106,0.08);
          padding: 32px 28px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
          cursor: default;
        }

        .interest-tile:hover { background: #221C12; border-color: rgba(212,169,106,0.3); transform: translateY(-2px); }

        .interest-emoji { font-size: 28px; flex-shrink: 0; }

        .interest-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: var(--ink2);
          letter-spacing: 0.02em;
        }

        /* ── FOOTER BAR ── */
        .about-footer {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 72px;
          border-top: 1px solid var(--rule);
        }

        .footer-name {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 18px;
          color: var(--accent);
        }

        .footer-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ink2);
          opacity: 0.45;
        }

        /* ── HERO ENTRANCE ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .he1 { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.1s both; }
        .he2 { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.3s both; }
        .he3 { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.5s both; }
        .he4 { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.7s both; }

        @keyframes photoReveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0% 0 0); } }
        .photo-enter { animation: photoReveal 1.2s cubic-bezier(.77,0,.18,1) 0.2s both; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero-spread { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 48px 32px; }
          .hero-photo-wrap { height: 60vw; }
          .bio-grid { grid-template-columns: 1fr; gap: 32px; }
          .dreams-inner { grid-template-columns: 1fr; gap: 40px; }
          .interests-grid { grid-template-columns: repeat(2, 1fr); }
          .section { padding: 60px 32px; }
          .full-rule { margin: 0 32px; }
          .dreams-wrap { padding: 72px 32px; }
          .about-footer { padding: 24px 32px; flex-direction: column; gap: 8px; text-align: center; }
          .bg-num { display: none; }
        }
      `}</style>

      {/* topo background — rings glow amber on dark */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.55 }}>
        <TopoBg />
      </div>

      {/* ── NAV ── */}
      <nav className="about-nav">
        {[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Work', to: '/work' }].map(item => (
          <Link key={item.label} to={item.to} className="nav-pill">{item.label}</Link>
        ))}
        <Link to="/contact" className="nav-pill">Contact</Link>
      </nav>

      {/* ── HERO SPREAD ── */}
      <div className="hero-spread">

        {/* ghost number */}
        <div className="bg-num">I</div>

        {/* LEFT — editorial title */}
        <div className="hero-left">
          <div className="issue-tag he1">Portfolio · About</div>

          <h1 className="mag-title he2">
            Who<br/>
            <em>is</em><br/>
            She?
          </h1>

          <p className="mag-subtitle he3">
            Designer. Dreamer.<br/>A life lived in full colour.
          </p>

          <div className="hero-rule he4" />

          <p className="hero-byline he4">Divya Saketharaman · Lead UX Designer</p>
        </div>

        {/* RIGHT — photo */}
        <div className="hero-photo-wrap photo-enter">
          <img src={divya2} alt="Divya Saketharaman" />
          <div className="photo-caption">Divya Saketharaman — UX Design Lead</div>
        </div>
      </div>

      {/* ── RULE ── */}
      <div className="full-rule" />

      {/* ── BIO SECTION ── */}
      <div
        className={`section reveal ${bioVisible ? 'show' : ''}`}
        ref={bioRef}
        style={{
          background: 'rgba(10, 8, 6, 0.82)',
          backdropFilter: 'blur(2px)',
          borderRadius: 0,
        }}
      >
        <span className="sec-label">The Story</span>

        <div className="bio-grid">
          {/* pull quote */}
          <div className="bio-pull">
            "Form should always follow function — meticulously."
          </div>

          {/* body text */}
          <div className="bio-body">
            <p>
              With over 12 years of experience in UX design, I'm a staunch believer in the principle 
              that form should always follow function. My keen eye for detail ensures that every project 
              I undertake is meticulously crafted to meet both user needs and business goals. I firmly 
              believe that anything can be learned and that skill is a continuous learning process.
            </p>
            <p>
              As a happy-go-lucky individual, I thrive in environments where I can interact with others 
              and build meaningful connections. Whether in the workplace or in my personal life, I strive 
              to be a better leader — leading by example and fostering a collaborative and supportive 
              team culture.
            </p>
            <p>
              Coming from humble beginnings, I carry with me the values of humility, gratitude, and 
              resilience. As a devoted daughter, wife, and mother to a lively five-year-old son, 
              family is at the core of everything I do.
            </p>
          </div>
        </div>
      </div>

      <div className="full-rule" />

      {/* ── DREAMS SECTION (dark band) ── */}
      <div className="dreams-wrap">
        <div
          className={`dreams-inner reveal ${dreamsVisible ? 'show' : ''}`}
          ref={dreamsRef}
        >
          {/* heading */}
          <div>
            <span className="sec-label" style={{ color: 'rgba(212,169,106,0.45)' }}>What Drives Me</span>
            <h2 className="dreams-heading">
              Dreams<br/>
              <span>in</span><br/>
              Motion.
            </h2>
            <div className="dreams-rule" />
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,169,106,0.35)' }}>
              Growth · Purpose · Community
            </p>
          </div>

          {/* body */}
          <div>
            <p className="dreams-body">
              My dreams drive me forward, pushing me to continually grow and evolve. I thrive on 
              meeting new people, making friends, and exploring new places through travel and long drives. 
              Books are my constant companions, and I find joy in immersing myself in stories and ideas.
            </p>
            <p className="dreams-body" style={{ marginTop: 24 }}>
              I believe in the art of giving back to the community and strive to be a helping hand 
              wherever I can — whether through teaching, volunteering, or simply lending a listening ear.
            </p>
            <p className="dreams-body" style={{ marginTop: 24 }}>
              To me, success is not just a destination but a journey of growth, learning, and fulfillment. 
              I am passionate about building my dreams and helping others do the same, knowing that the 
              journey itself is where the true magic lies.
            </p>
          </div>
        </div>
      </div>

      {/* ── INTERESTS ── */}
      <div
        className={`section reveal ${hobVisible ? 'show' : ''}`}
        ref={hobbiesRef}
        style={{
          paddingBottom: 0,
          background: 'rgba(10, 8, 6, 0.82)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <span className="sec-label">Beyond the Screen</span>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--ink)', marginBottom: 8, fontWeight: 400 }}>
          Life outside the pixels
        </h2>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'var(--accent)', letterSpacing: '0.02em', marginBottom: 0 }}>
          The things that fill me up.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '0 0 80px 0', background: 'rgba(10, 8, 6, 0.82)', backdropFilter: 'blur(2px)' }}>
        <div className="interests-grid" style={{ margin: '32px 0 0 0' }}>
          {INTERESTS.map((item, i) => (
            <div key={i} className="interest-tile">
              <span className="interest-emoji">{item.emoji}</span>
              <span className="interest-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER BAR ── */}
      <div className="full-rule" />
      <footer className="about-footer" style={{ background: 'rgba(10, 8, 6, 0.82)', backdropFilter: 'blur(2px)' }}>
        <div className="footer-name">Divya Saketharaman</div>
        <div className="footer-tag">Lead UX Designer · 12 Years of Craft</div>
        <div className="footer-tag">www.divya.design</div>
      </footer>

    </div>
  )
}