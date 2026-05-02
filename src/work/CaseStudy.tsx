import { Link, Navigate, useParams } from 'react-router'
import PrismBackground from '@/components/PrismBackground'
import { caseStudiesBySlug } from './caseStudies'

function PlaceholderImage({ label, height = 'h-64' }: { label: string; height?: string }) {
  return (
    <div
      className={`w-full ${height} rounded-2xl flex items-center justify-center`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,165,0,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="text-center opacity-40">
        <svg
          className="mx-auto mb-3"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p className="text-xs uppercase tracking-widest">{label}</p>
      </div>
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const study = slug ? caseStudiesBySlug[slug] : undefined

  if (!study) {
    return <Navigate to="/work" replace />
  }

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      <PrismBackground />

      <nav className="flex items-center justify-center px-8 py-5 relative z-30">
        <div className="flex gap-4 items-center">
          {[
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Work', to: '/work' },
            { label: 'Contact', to: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="px-5 py-2 rounded-full text-xs uppercase hover:bg-white/20 transition-all"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="relative z-20 px-12 pt-8">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back to Work</span>
        </Link>
      </div>

      <div className="relative z-20 px-12 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs uppercase tracking-widest opacity-60">{study.category}</span>
          <span className="text-xs opacity-40">&mdash;</span>
          <span className="text-xs opacity-40">{study.year}</span>
        </div>

        <h1
          style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(48px, 8vw, 100px)',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          {study.title.toUpperCase()}.
        </h1>

        <p
          className="mt-4 text-lg opacity-70 max-w-2xl"
          style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em' }}
        >
          {study.tagline}
        </p>
      </div>

      <div className="relative z-20 px-12 pb-8">
        <PlaceholderImage label="Hero Image" height="h-80" />
      </div>

      <div className="relative z-20 px-12 pb-12">
        <div
          className="rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Role</p>
            <p style={{ fontFamily: 'Anton, sans-serif', fontSize: '18px', color: '#FFA500' }}>
              {study.role}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Duration</p>
            <p style={{ fontFamily: 'Anton, sans-serif', fontSize: '18px', color: '#FFA500' }}>
              {study.duration}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Tools</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {study.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: 'rgba(255,165,0,0.15)',
                    border: '1px solid rgba(255,165,0,0.3)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 px-12 pb-12 max-w-4xl">
        <h2
          className="mb-4"
          style={{ fontFamily: 'Anton, sans-serif', fontSize: '28px', color: '#FFA500' }}
        >
          Overview
        </h2>
        <p className="text-sm opacity-70 leading-relaxed">{study.overview}</p>
      </div>

      {study.sections.map((section, index) => (
        <div key={section.heading} className="relative z-20 px-12 pb-16">
          <div className="max-w-4xl">
            <span
              className="block mb-2"
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: '48px',
                lineHeight: 1,
                opacity: 0.1,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2
              className="mb-4"
              style={{ fontFamily: 'Anton, sans-serif', fontSize: '28px', color: '#FFA500' }}
            >
              {section.heading}
            </h2>
            <p className="text-sm opacity-70 leading-relaxed">{section.body}</p>
          </div>

          {section.image && (
            <div className="mt-8">
              <PlaceholderImage label={section.heading} height="h-72" />
            </div>
          )}
        </div>
      ))}

      <div className="relative z-20 px-12 pb-24">
        <div className="flex justify-between items-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to All Projects</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-all"
            style={{
              background: '#FFA500',
              color: '#000',
              fontWeight: 700,
            }}
          >
            Let's Work Together
          </Link>
        </div>
      </div>
    </div>
  )
}
