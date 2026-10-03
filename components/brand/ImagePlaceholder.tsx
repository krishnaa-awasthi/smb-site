import { cn } from '@/lib/cn';

/** Stand-in until real photography arrives (and when an image fails). Warm parchment block with the name. */
export function ImagePlaceholder({ name, className }: { name: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={name}
      className={cn('flex h-full w-full items-end bg-parchment p-4', className)}
    >
      <span className="font-display text-product leading-tight text-ink-soft">{name}</span>
    </div>
  );
}