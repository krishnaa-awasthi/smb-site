import { cn } from '@/lib/cn';

/** Page-width wrapper: max 1320 px, 20 px side padding on phones, 48 px on large screens. */
export function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-[1320px] px-5 lg:px-12', className)} {...props} />
  );
}