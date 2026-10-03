export {};

declare global {
  interface Window {
    /** Lenis instance, set by components/motion/SmoothScroll. Used to pause scrolling while sheets are open. */
    __lenis?: { stop(): void; start(): void };
  }
}