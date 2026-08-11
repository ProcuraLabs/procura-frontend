import { NavLink } from 'react-router-dom'
import { PRIMARY_NAV } from './navigation'

interface MobileNavProps {
  /** Whether the panel is open. */
  open: boolean
  /** id used to link the toggle button (aria-controls) to this panel. */
  id: string
  /** Called when a navigation item is chosen, so the shell can close the panel. */
  onNavigate: () => void
}

/**
 * Collapsible navigation panel for narrow viewports. Rendered inside the header
 * and toggled by the menu button in {@link Header}. Hidden at/above the `md`
 * breakpoint, where {@link DesktopNav} takes over.
 */
export default function MobileNav({ open, id, onNavigate }: MobileNavProps) {
  return (
    <nav
      id={id}
      className="app-mobile-nav"
      aria-label="Primary"
      hidden={!open}
    >
      <ul className="app-mobile-nav__list">
        {PRIMARY_NAV.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                isActive ? 'app-mobile-nav__link is-active' : 'app-mobile-nav__link'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
