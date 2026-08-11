/**
 * Primary application navigation.
 *
 * Central list of the top-level sections the shell must accommodate. Both the
 * desktop and mobile navigation render from this single source so they never
 * drift apart. Route content itself is added in later steps.
 */

export interface NavItem {
  /** Router path. */
  to: string
  /** Visible label. */
  label: string
  /** Match the path exactly (used for index-style routes). */
  end?: boolean
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/procurement', label: 'Procurement' },
  { to: '/vendors', label: 'Vendors' },
  { to: '/transactions', label: 'Transactions' },
]
