import { cn } from '@/lib/cn';

/** Small flourish traced from the logo's gold swirl. A quiet, left-aligned divider (max twice per page). */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="96"
      height="24"
      viewBox="0 0 96 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-gold', className)}
    >
      <path d="M45 12 L48 9 L51 12 L48 15 Z" />
      <path d="M44 12 H30 C24 12 22 6 16 6 C11 6 10 11 14 12 C17 13 19 9 16 8.5" />
      <path d="M12 12 H2" />
      <path d="M52 12 H66 C72 12 74 6 80 6 C85 6 86 11 82 12 C79 13 77 9 80 8.5" />
      <path d="M84 12 H94" />
    </svg>
  );
}