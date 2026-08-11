import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './layout.css'

/**
 * Top-level application shell: a skip link, the header (with desktop + mobile
 * navigation), the routed main content area, and the footer. Rendered as a
 * layout route so every page shares the same chrome.
 */
export default function AppLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <main id="main-content" className="app-main" tabIndex={-1}>
        <div className="container container--wide app-main__inner">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}
