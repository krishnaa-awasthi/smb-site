import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { FieldShell, controlBorder, controlClasses, describedBy } from './Field';

type SelectProps = Omit<React.ComponentProps<'select'>, 'className'> & {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function Select({
  label,
  hint,
  error,
  className,
  id,
  required,
  children,
  ...props
}: SelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell
      id={inputId}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      <div className="relative">
        <select
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(inputId, error, hint)}
          className={cn(
            controlClasses,
            controlBorder(error),
            'min-h-12 cursor-pointer appearance-none pr-10',
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
          strokeWidth={1.5}
        />
      </div>
    </FieldShell>
  );
}