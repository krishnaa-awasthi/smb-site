import { cn } from '@/lib/cn';

const OUTLINE_PATH = 'M8,0 H92 Q92,8 100,8 V92 Q92,92 92,100 H8 Q8,92 0,92 V8 Q8,8 8,0 Z';

/** Render once in the root layout. Defines the shared clipPath used by <Cartouche>. */
export function CartoucheDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <clipPath id="cartouche" clipPathUnits="objectBoundingBox">
          <path d="M0.08,0 H0.92 Q0.92,0.08 1,0.08 V0.92 Q0.92,0.92 0.92,1 H0.08 Q0.08,0.92 0,0.92 V0.08 Q0.08,0.08 0.08,0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/**
 * The logo's scooped-corner frame. Use only for the legacy reveal and the logo badge.
 * Give the wrapper a size (width and aspect ratio or height). Children fill the clipped area.
 */
export function Cartouche({
  children,
  className,
  outline = true,
}: {
  children: React.ReactNode;
  className?: string;
  outline?: boolean;
}) {
  return (
    <div className={cn('relative', className)}>
      <div className="h-full w-full" style={{ clipPath: 'url(#cartouche)' }}>
        {children}
      </div>
      {outline && (
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-2.5 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d={OUTLINE_PATH}
            stroke="var(--gold)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}