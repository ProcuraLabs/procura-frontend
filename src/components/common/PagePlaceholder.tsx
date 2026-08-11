import type { ReactNode } from 'react'

interface PagePlaceholderProps {
  /** Page title. */
  title: string
  /** Short summary of what this section will contain. */
  description?: ReactNode
}

/**
 * Temporary route content used to demonstrate the application shell. Real pages
 * replace these placeholders in later steps.
 */
export default function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="stack" aria-labelledby="page-title">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span className="badge badge--info">Placeholder</span>
        <h1 id="page-title">{title}</h1>
      </div>
      {description ? (
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '60ch' }}>{description}</p>
      ) : null}
      <div className="card card--sunken">
        <p style={{ color: 'var(--color-text-muted)' }}>
          Content for this section is not implemented yet.
        </p>
      </div>
    </section>
  )
}
