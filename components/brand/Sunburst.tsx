import { cn } from '@/lib/cn';

/**
 * Decorative rotating rays (24 pairs) from the logo background. Position and size it from the parent;
 * rotate it with GSAP (see docs/UI.md S1 and S5). Never receives focus or pointer events.
 */
export function Sunburst({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div aria-hidden="true" className={cn('sunburst pointer-events-none', className)} {...props} />
  );
}