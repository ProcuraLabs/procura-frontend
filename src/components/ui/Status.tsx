import type { HTMLAttributes, ReactNode } from 'react'

export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  tone?: StatusTone
  showIndicator?: boolean
}

export function Badge({ children, className, tone = 'neutral', showIndicator = false, ...props }: BadgeProps) {
  const classes = ['badge', tone !== 'neutral' ? `badge--${tone}` : '', !showIndicator ? 'badge--plain' : '', className]
    .filter(Boolean)
    .join(' ')
  return <span className={classes} {...props}>{children}</span>
}

export type StatusIndicatorProps = Omit<BadgeProps, 'showIndicator'>

export function StatusIndicator(props: StatusIndicatorProps) {
  return <Badge {...props} showIndicator />
}
