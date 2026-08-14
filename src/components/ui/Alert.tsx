import type { HTMLAttributes, ReactNode } from 'react'
import type { StatusTone } from './Status'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  children: ReactNode
  tone?: StatusTone
  title?: ReactNode
}

export function Alert({ children, className, tone = 'info', title, ...props }: AlertProps) {
  const role = tone === 'danger' ? 'alert' : 'status'
  return (
    <div className={['alert', `alert--${tone}`, className].filter(Boolean).join(' ')} role={role} {...props}>
      {title ? <div className="alert__title">{title}</div> : null}
      <div className="alert__content">{children}</div>
    </div>
  )
}
