import { useState } from 'react'
import { Link } from 'react-router'
import PrismBackground from '@/components/PrismBackground'
import { caseStudies } from './caseStudies'

const projects = caseStudies

export default function ViewMyWork() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="wr">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Syne:wght@400;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .wr {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          font-family: 'Syne', sans-serif;
        }

        /* veil - thin dark wash, prism stays vivid */
        .veil {
          position: fixed;
          inset: 0;
          z-index: 1;
          background: rgba(4, 3, 8, 0.52);
          pointer-events: none;
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 20px;
        }
        .npill {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 7px 18px;
          border-radius: 100px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.7);
          backdrop-filter: blur(20px);
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .npill:hover { background: rgba(255,255,255,0.15); color: #fff; }

        /* LAYOUT: left label col + right project list */
        .layout {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 340px 1fr;
          min-height: 100vh;
        }

        /* LEFT PANEL - fixed label area */
        .left {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 0 64px 64px;
          pointer-events: none;
        }

        .left-label {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 20px;
          display: block;
        }

        .left-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(52px, 6vw, 84px);
          line-height: 0.95;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 0 60px rgba(0,0,0,0.8);
          margin-bottom: 40px;
        }

        .left-preview {
          border-left: 1px solid rgba(255,255,255,0.15);
          padding-left: 20px;
          transition: opacity 0.4s;
        }

        .left-preview-cat {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 10px;
          display: block;
        }

        .left-preview-desc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255,255,255,0.55);
          font-weight: 300;
        }

        /* RIGHT - project list */
        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100vh;
          padding: 120px 80px 80px 80px;
        }

        .entry {
          display: grid;
          grid-template-columns: 64px 1fr 80px;
          align-items: baseline;
          gap: 0 24px;
          padding: 26px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          position: relative;
          transition: border-color 0.3s;
        }
        .entry:first-child { border-top: 1px solid rgba(255,255,255,0.07); }
        .entry:hover { border-color: rgba(255,255,255,0.18); }

        .list-has-hover .entry:not(.entry--active) .entry-num,
        .list-has-hover .entry:not(.entry--active) .entry-title,
        .list-has-hover .entry:not(.entry--active) .entry-year {
          opacity: 0.18 !important;
        }

        .entry-num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
          transition: opacity 0.35s, color 0.35s;
        }
        .entry--active .entry-num {
          color: rgba(255,255,255,0.45) !important;
          opacity: 1 !important;
        }

        .entry-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(28px, 3.8vw, 52px);
          line-height: 1.1;
          color: rgba(255,255,255,0.75);
          transition: opacity 0.35s, color 0.35s, transform 0.4s cubic-bezier(.16,1,.3,1);
          letter-spacing: -0.01em;
        }
        .entry--active .entry-title {
          color: #ffffff !important;
          opacity: 1 !important;
          transform: translateX(8px);
        }

        .entry-year {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.22);
          text-align: right;
          transition: opacity 0.35s, color 0.35s;
        }
        .entry--active .entry-year {
          color: rgba(255,255,255,0.45) !important;
          opacity: 1 !important;
        }

        .entry-arrow {
          position: absolute;
          right: -32px;
          top: 50%;
          transform: translateY(-50%) translateX(-8px);
          font-size: 20px;
          color: rgba(255,255,255,0.6);
          opacity: 0;
          transition: opacity 0.3s, transform 0.4s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .entry--active .entry-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        .count-badge {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-top: 40px;
          display: block;
        }

        .sig {
          position: fixed;
          bottom: 28px;
          left: 64px;
          z-index: 20;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 15px;
          color: rgba(255,255,255,0.18);
          pointer-events: none;
        }

        @media (max-width: 860px) {
          .layout { grid-template-columns: 1fr; }
          .left { display: none; }
          .right { padding: 100px 28px 80px; }
          .entry { grid-template-columns: 48px 1fr 60px; gap: 0 12px; padding: 20px 0; }
          .entry-title { font-size: clamp(22px, 6vw, 36px); }
          .sig { left: 28px; }
        }
      `}</style>

      <PrismBackground />
      <div className="veil" />

      <nav className="nav">
        {[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Work', to: '/work' }].map((item) => (
          <Link key={item.label} to={item.to} className="npill">
            {item.label}
          </Link>
        ))}
        <Link to="/contact" className="npill">
          Contact
        </Link>
      </nav>

      <div className="layout">
        <div className="left">
          <span className="left-label">Selected Work</span>
          <h1 className="left-title">
            My
            <br />
            Work.
          </h1>

          <div className="left-preview" style={{ opacity: active !== null ? 1 : 0 }}>
            <span className="left-preview-cat">
              {active !== null ? projects[active].category : ''}
            </span>
            <p className="left-preview-desc">
              {active !== null ? projects[active].description : ''}
            </p>
          </div>
        </div>

        <div className="right">
          <div className={active !== null ? 'list-has-hover' : ''}>
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/work/${project.slug}`}
                className={`entry ${active === index ? 'entry--active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                <span className="entry-num">{String(project.id).padStart(2, '0')}</span>
                <span className="entry-title">{project.title}</span>
                <span className="entry-year">{project.year}</span>
                <span className="entry-arrow" aria-hidden="true">
                  &nearr;
                </span>
              </Link>
            ))}
            <span className="count-badge">{projects.length} case studies</span>
          </div>
        </div>
      </div>

      <div className="sig">Divya Saketharaman</div>
    </div>
  )
}
