import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

/** Shared label, hint and error wrapper for Input, Textarea and Select. */
export function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-crimson">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-small text-error"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-small text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export const controlClasses =
  'w-full rounded-ctl border bg-ivory px-3.5 text-body text-ink placeholder:text-ink-soft/70 transition-colors duration-[160ms] focus-visible:border-crimson disabled:opacity-45';
export const controlBorder = (error?: string) => (error ? 'border-error' : 'border-gold/60');