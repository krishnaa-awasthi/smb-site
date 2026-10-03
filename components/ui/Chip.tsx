import { cn } from '@/lib/cn';

type ChipProps = Omit<React.ComponentProps<'button'>, 'className'> & {
  selected?: boolean;
  className?: string;
};

/** Variant and filter chip. Selected state is exposed with aria-pressed. */
export function Chip({
  selected = false,
  className,
  type = 'button',
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex min-h-9 items-center rounded-ctl border px-3 font-body text-small font-medium',
        'transition-colors duration-[160ms] ease-brand disabled:pointer-events-none disabled:opacity-45',
        selected
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-gold/60 bg-ivory text-ink-variant hover:border-primary hover:text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}