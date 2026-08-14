import type { ReactNode, TableHTMLAttributes } from 'react'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode
  caption?: ReactNode
}

/** Responsive native table wrapper; use semantic thead, tbody, th and td children. */
export function Table({ children, caption, className, ...props }: TableProps) {
  return (
    <div className="table-scroll">
      <table className={['table', className].filter(Boolean).join(' ')} {...props}>
        {caption ? <caption>{caption}</caption> : null}
        {children}
      </table>
    </div>
  )
}
