'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

interface ToastItem {
  id: number;
  message: string;
}

interface ToastApi {
  toast: (message: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

const DURATION_MS = 3500;

/** Quiet notifications. Polite live region, auto-dismiss 3.5 s. Top on mobile (under the header), bottom-left on desktop. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const toast = useCallback((message: string) => {
    const id = nextId.current++;
    setItems((prev) => [...prev.slice(-2), { id, message }]);
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), DURATION_MS);
  }, []);

  const api = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-4 top-[calc(env(safe-area-inset-top,0px)+68px)] z-[80] flex flex-col gap-2 md:inset-x-auto md:bottom-6 md:left-6 md:top-auto md:w-[360px]"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className="toast-in pointer-events-auto rounded-ctl border border-gold/35 bg-ivory px-4 py-3 text-small text-ink shadow-sheet"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}