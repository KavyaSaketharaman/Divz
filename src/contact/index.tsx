import { Link } from 'react-router'
import LiquidGradient from '@/components/LiquidGradient'

export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syne:wght@400;700;800&display=swap');

        :root {
          --gold:   #C9A84C;
          --white:  #F5F0E8;
          --off:    rgba(245,240,232,0.55);
          --line:   rgba(201,168,76,0.25);
        }

        .contact-root {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: var(--white);
          font-family: 'Cormorant Garamond', serif;
        }

        /* dark veil over gradient */
        .contact-veil {
          position: fixed;
          inset: 0;
          z-index: 1;
          background: linear-gradient(135deg, rgba(4,4,12,0.78) 0%, rgba(8,6,18,0.65) 50%, rgba(4,4,12,0.78) 100%);
          pointer-events: none;
        }

        /* nav */
        .contact-nav {
          position: relative;
          z-index: 30;
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 24px 32px;
        }
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
          text-decoration: none;
          backdrop-filter: blur(12px);
          transition: background 0.25s, border-color 0.25s;
        }
        .nav-pill:hover {
          background: rgba(201,168,76,0.18);
          border-color: rgba(201,168,76,0.6);
        }

        .contact-section {
          position: relative;
          z-index: 10;
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 40px 80px;
          overflow: hidden;
        }

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
        .marquee-track   { display: flex; white-space: nowrap; animation: marquee-left  18s linear infinite; }
        .marquee-track-r { display: flex; white-space: nowrap; animation: marquee-right 22s linear infinite; }
        .marquee-item {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.45);
          padding: 0 40px;
          flex-shrink: 0;
        }
        .marquee-dot { color: var(--gold); padding: 0 8px; }

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
        .contact-heading strong { font-style: normal; font-weight: 600; color: var(--gold); }

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
          margin-top: 4px;
          transition: opacity 0.2s;
        }
        .contact-email:hover { opacity: 0.75; }

        .contact-divider { width: 40px; height: 1px; background: var(--line); margin: 28px auto; }

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
        .c-btn:hover {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-1px);
        }

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
      `}</style>

      <div className="contact-root">
        <LiquidGradient />
        <div className="contact-veil" />

        {/* NAV */}
        <nav className="contact-nav">
          {[
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Work', to: '/work' },
            { label: 'Contact', to: '/contact' },
          ].map(item => (
            <Link key={item.label} to={item.to} className="nav-pill">{item.label}</Link>
          ))}
        </nav>

        {/* CONTACT SECTION */}
        <section className="contact-section">
          <div className="contact-ghost">CONTACT</div>

          <div className="marquee-wrap">
            <div className="marquee-track">
              {Array(8).fill(null).map((_, i) => (
                <span key={i} className="marquee-item">
                  Available for collaboration <span className="marquee-dot">✦</span>
                  Open to opportunities <span className="marquee-dot">✦</span>
                  Let's create something <span className="marquee-dot">✦</span>
                </span>
              ))}
            </div>
          </div>

          <h1 className="contact-heading">
            Let's build something<br />
            <strong>meaningful</strong> together.
          </h1>

          <p className="contact-sub">
            Always open to thoughtful conversations &amp; new opportunities
          </p>

          <div className="marquee-wrap" style={{ marginTop: 0 }}>
            <div className="marquee-track-r">
              {Array(8).fill(null).map((_, i) => (
                <span key={i} className="marquee-item">
                  UX Design <span className="marquee-dot">·</span>
                  Creative Direction <span className="marquee-dot">·</span>
                  Product Strategy <span className="marquee-dot">·</span>
                  User Research <span className="marquee-dot">·</span>
                </span>
              ))}
            </div>
          </div>

          <div className="contact-card">
            <p className="contact-name-tag">Divya Saketharaman</p>
            <a href="mailto:divya@email.com" className="contact-email">
              divya@email.com
            </a>
            <div className="contact-divider" />
            <div className="contact-btn-row">
              <button
                className="c-btn"
                onClick={() => (window.location.href = 'mailto:divya@email.com')}
              >
                Email Me
              </button>
              <button
                className="c-btn"
                onClick={() => window.open('https://linkedin.com', '_blank')}
              >
                LinkedIn
              </button>
              <a href="/Divya_Saketharaman_Resume.docx" download className="c-btn-gold">
                Download CV
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
