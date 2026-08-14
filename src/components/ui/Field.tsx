import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface FieldBaseProps {
  label: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldBaseProps {}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldBaseProps {}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldBaseProps {
  children: ReactNode
}

interface FieldShellProps extends FieldBaseProps {
  id?: string
  children: (id: string, describedBy?: string) => ReactNode
}

function FieldShell({ label, hint, error, className, id, children }: FieldShellProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const hintId = hint ? `${generatedId}-hint` : undefined
  const errorId = error ? `${generatedId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      <label className="label" htmlFor={fieldId}>{label}</label>
      {children(fieldId, describedBy)}
      {hint ? <div id={hintId} className="field__hint">{hint}</div> : null}
      {error ? <div id={errorId} className="field__error" role="alert">{error}</div> : null}
    </div>
  )
}

export function Input({ label, hint, error, className, id, 'aria-describedby': describedBy, 'aria-invalid': invalid, ...props }: InputProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className} id={id}>
      {(generatedId, fieldDescribedBy) => (
        <input
          {...props}
          id={generatedId}
          className="input"
          aria-describedby={describedBy ?? fieldDescribedBy}
          aria-invalid={invalid ?? Boolean(error)}
        />
      )}
    </FieldShell>
  )
}

export function Textarea({ label, hint, error, className, id, 'aria-describedby': describedBy, 'aria-invalid': invalid, ...props }: TextareaProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className} id={id}>
      {(generatedId, fieldDescribedBy) => (
        <textarea
          {...props}
          id={generatedId}
          className="textarea"
          aria-describedby={describedBy ?? fieldDescribedBy}
          aria-invalid={invalid ?? Boolean(error)}
        />
      )}
    </FieldShell>
  )
}

export function Select({ label, hint, error, className, id, children, 'aria-describedby': describedBy, 'aria-invalid': invalid, ...props }: SelectProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className} id={id}>
      {(generatedId, fieldDescribedBy) => (
        <select
          {...props}
          id={generatedId}
          className="select"
          aria-describedby={describedBy ?? fieldDescribedBy}
          aria-invalid={invalid ?? Boolean(error)}
        >
          {children}
        </select>
      )}
    </FieldShell>
  )
}
