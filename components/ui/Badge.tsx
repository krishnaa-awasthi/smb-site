import { cn } from '@/lib/cn';

type Tone = 'crimson' | 'maroon';

/** Small label on images. Sentence case; cream text on crimson or maroon keeps contrast above AA. */
export function Badge({
  tone = 'crimson',
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-block rounded-ctl px-2 py-0.5 font-body text-[12px] font-semibold leading-5 text-ivory',
        tone === 'crimson' ? 'bg-crimson' : 'bg-maroon',
        className,
      )}
    >
      {children}
    </span>
  );
}