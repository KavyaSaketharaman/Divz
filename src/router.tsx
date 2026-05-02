import { lazy, Suspense } from 'react'
import { createBrowserRouter, isRouteErrorResponse, Link, Navigate, useRouteError } from 'react-router'
import CaseStudy from './work/CaseStudy'

const HeroPage = lazy(() => import('./heroPage'))
const ViewMyWork = lazy(() => import('./work/viewMywork'))
const AboutPage = lazy(() => import('./about-me'))
const ContactPage = lazy(() => import('./contact'))

const Fallback = () => <div className="h-screen bg-black" />

const wrap = (node: React.ReactNode) => (
  <Suspense fallback={<Fallback />}>{node}</Suspense>
)

function RouteErrorPage() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong.'

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Page Error</p>
        <h1 className="text-4xl font-semibold mb-4">{message}</h1>
        <p className="text-sm text-white/65 mb-8">
          The page could not be loaded, so I sent you back to a safe fallback instead of the default router error screen.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2 rounded-full text-xs uppercase tracking-widest border border-white/20 bg-white/10 hover:bg-white/20 transition-all"
          >
            Home
          </Link>
          <Link
            to="/work"
            className="px-5 py-2 rounded-full text-xs uppercase tracking-widest border border-white/20 bg-white/10 hover:bg-white/20 transition-all"
          >
            Work
          </Link>
        </div>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: wrap(<HeroPage />),
    errorElement: <RouteErrorPage />,
  },
  {
    path: '/work',
    element: wrap(<ViewMyWork />),
    errorElement: <RouteErrorPage />,
  },
  {
    path: '/work/:slug',
    element: wrap(<CaseStudy />),
    errorElement: <RouteErrorPage />,
  },
  {
    path: '/about',
    element: wrap(<AboutPage />),
    errorElement: <RouteErrorPage />,
  },
  {
    path: '/contact',
    element: wrap(<ContactPage />),
    errorElement: <RouteErrorPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default router
