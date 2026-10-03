'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Sheet } from '@/components/ui/Sheet';
import { useToast } from '@/components/ui/Toast';

/** Interactive pieces of the temporary style guide (sheet and toast triggers). */
export function Demo() {
  const [side, setSide] = useState<'right' | 'bottom' | 'left' | null>(null);
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => toast('Kaju Katli (500 g) added')}>
        Show toast
      </Button>
      <Button variant="secondary" onClick={() => setSide('right')}>
        Open drawer
      </Button>
      <Button variant="secondary" onClick={() => setSide('bottom')}>
        Open bottom sheet
      </Button>
      <Button variant="secondary" onClick={() => setSide('left')}>
        Open menu sheet
      </Button>

      {(['right', 'bottom', 'left'] as const).map((s) => (
        <Sheet
          key={s}
          open={side === s}
          onClose={() => setSide(null)}
          side={s}
          label={`${s} sheet demo`}
        >
          <div className="flex h-full flex-col gap-4 p-6 pt-14" data-lenis-prevent>
            <h3 className="font-display text-h3 text-primary">Your cart (3)</h3>
            <p className="max-w-[38ch] text-ink-variant">
              Esc closes this panel, focus stays inside while it is open, and focus returns to the
              button that opened it.
            </p>
            <Button onClick={() => setSide(null)}>Proceed to checkout</Button>
          </div>
        </Sheet>
      ))}
    </div>
  );
}