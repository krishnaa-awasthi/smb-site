'use client';

import { useEffect } from 'react';
import 'lenis/dist/lenis.css';

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger (docs/trd.md §11.2).
 * - Skipped entirely under prefers-reduced-motion.
 * - Touch devices keep native scrolling (Lenis does not hijack touch by default).
 * - GSAP and Lenis load after first paint, so they are not in the initial bundle.
 * - Drawers and sheets call window.__lenis.stop() / start(); scrollable panels carry data-lenis-prevent.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.__lenis = undefined;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <>{children}</>;
}