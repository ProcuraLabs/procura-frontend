import { NavLink } from 'react-router-dom'
import { PRIMARY_NAV } from './navigation'

/**
 * Horizontal navigation shown on wider viewports. Hidden below the `md`
 * breakpoint, where {@link MobileNav} takes over.
 */
export default function DesktopNav() {
  return (
    <nav className="app-nav" aria-label="Primary">
      <ul className="app-nav__list">
        {PRIMARY_NAV.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'app-nav__link is-active' : 'app-nav__link'
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
