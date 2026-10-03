import { useId } from 'react';
import { cn } from '@/lib/cn';
import { FieldShell, controlBorder, controlClasses, describedBy } from './Field';

type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'className'> & {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function Textarea({
  label,
  hint,
  error,
  className,
  id,
  required,
  ...props
}: TextareaProps) {
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
      <textarea
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(inputId, error, hint)}
        className={cn(controlClasses, controlBorder(error), 'min-h-[120px] resize-y py-3')}
        {...props}
      />
    </FieldShell>
  );
}