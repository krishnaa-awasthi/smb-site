import { cn } from '@/lib/cn';

/** Arch-topped image frame (a nod to mithai-shop doorways). Children (usually next/image with fill) fill it. */
export function ImageArch({
  children,
  className,
  aspect = 'aspect-[4/5]',
}: {
  children: React.ReactNode;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-t-[999px] bg-parchment', aspect, className)}
    >
      {children}
    </div>
  );
}