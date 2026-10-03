import { cn } from '@/lib/cn';
import type { Diet } from '@/types';

/** Indian food-labelling mark: outlined square with a dot. Shape plus colour, with an accessible name. */
export function VegMark({ diet, className }: { diet: Diet; className?: string }) {
  const color = diet === 'veg' ? 'var(--leaf)' : 'var(--egg)';
  return (
    <span
      role="img"
      aria-label={diet === 'veg' ? 'Vegetarian' : 'Contains egg'}
      className={cn(
        'inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center border-[1.5px] bg-ivory',
        className,
      )}
      style={{ borderColor: color }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  );
}