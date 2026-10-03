'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

type Side = 'right' | 'left' | 'bottom' | 'top';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  side?: Side;
  /** Hide the built-in close button when the content provides its own. */
  hideClose?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Drawer / bottom sheet / top panel on the native <dialog> element.
 * The browser provides the focus trap, Esc handling, inert background and focus return.
 * Lenis smooth scrolling is paused while open. Scrollable content inside should carry data-lenis-prevent.
 */
export function Sheet({
  open,
  onClose,
  label,
  side = 'right',
  hideClose,
  className,
  children,
}: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.removeAttribute('data-closing');
      el.showModal();
      window.__lenis?.stop();
      document.body.style.overflow = 'hidden';
      return;
    }
    if (!open && el.open) {
      el.setAttribute('data-closing', '');
      const t = window.setTimeout(() => {
        el.close();
        el.removeAttribute('data-closing');
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const restore = () => {
      window.__lenis?.start();
      document.body.style.overflow = '';
    };
    el.addEventListener('close', restore);
    return () => {
      el.removeEventListener('close', restore);
      restore();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={cn('sheet', `sheet-${side}`, className)}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // A click on the backdrop targets the dialog element itself (content fills the rest).
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-full max-h-[inherit] w-full flex-col">
        {!hideClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-ctl text-ink-variant transition-colors hover:text-primary"
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
          </button>
        )}
        {children}
      </div>
    </dialog>
  );
}