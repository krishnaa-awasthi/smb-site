import { useId } from 'react';
import { cn } from '@/lib/cn';
import { FieldShell, controlBorder, controlClasses, describedBy } from './Field';

type InputProps = Omit<React.ComponentProps<'input'>, 'className'> & {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function Input({ label, hint, error, className, id, required, ...props }: InputProps) {
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
      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(inputId, error, hint)}
        className={cn(controlClasses, controlBorder(error), 'min-h-12')}
        {...props}
      />
    </FieldShell>
  );
}