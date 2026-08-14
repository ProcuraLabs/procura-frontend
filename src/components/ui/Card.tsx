import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  variant?: 'default' | 'raised' | 'sunken'
}

export function Card({ children, className, variant = 'default', ...props }: CardProps) {
  const classes = ['card', variant !== 'default' ? `card--${variant}` : '', className]
    .filter(Boolean)
    .join(' ')
  return <section className={classes} {...props}>{children}</section>
}
