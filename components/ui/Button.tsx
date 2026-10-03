import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'whatsapp';
export type ButtonSize = 'md' | 'lg';

interface StyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-ctl font-body text-button font-semibold ' +
  'transition-[background-color,color,border-color,transform] duration-[160ms] ease-brand ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-ivory hover:bg-crimson',
  secondary:
    'border border-primary/25 bg-ivory text-primary hover:border-primary hover:bg-primary hover:text-ivory',
  text: 'text-primary underline decoration-1 underline-offset-4 hover:decoration-2',
  whatsapp: 'bg-leaf text-ivory hover:brightness-95',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5',
  lg: 'min-h-12 px-6',
};

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: StyleOptions) {
  return cn(
    base,
    variants[variant],
    variant === 'text' ? 'min-h-11' : sizes[size],
    fullWidth && 'w-full',
    className,
  );
}

type ButtonProps = StyleOptions &
  Omit<React.ComponentProps<'button'>, 'className'> & {
    loading?: boolean;
    leadingIcon?: React.ReactNode;
  };

export function Button({
  variant,
  size,
  fullWidth,
  className,
  loading,
  leadingIcon,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {loading ? (
        <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />
      ) : (
        leadingIcon
      )}
      {children}
    </button>
  );
}

type ButtonLinkProps = StyleOptions &
  Omit<React.ComponentProps<'a'>, 'className' | 'href'> & {
    href: string;
    leadingIcon?: React.ReactNode;
  };

/** Styled link. Internal paths use next/link; tel:, mailto: and absolute URLs use a plain anchor. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  leadingIcon,
  href,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, fullWidth, className });
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    return (
      <a href={href} className={classes} {...props}>
        {leadingIcon}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {leadingIcon}
      {children}
    </Link>
  );
}