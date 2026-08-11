import { useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

/**
 * Application header: brand, desktop navigation, and a menu button that toggles
 * the mobile navigation panel. The panel closes automatically on navigation and
 * when Escape is pressed.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Allow Escape to close the mobile menu.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="app-header">
      <div className="app-header__bar container container--wide">
        <Link to="/" className="app-brand" aria-label="Procura home">
          <span className="app-brand__mark" aria-hidden="true">
            P
          </span>
          <span className="app-brand__name">Procura</span>
        </Link>

        <DesktopNav />

        <button
          type="button"
          className="app-header__menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="app-header__menu-icon" aria-hidden="true">
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      <div className="container container--wide">
        <MobileNav id={menuId} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      </div>
    </header>
  )
}
