
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

const EMPTY_BOTTOM =
  'M 0 100 V 100 Q 50 100 100 100 V 100 Z';

const BOTTOM_WAVE =
  'M 0 100 V 50 Q 50 0 100 50 V 100 Z';

const FULL_SCREEN =
  'M 0 100 V 0 Q 50 0 100 0 V 100 Z';

const TOP_WAVE =
  'M 0 0 V 50 Q 50 100 100 50 V 0 Z';

const EMPTY_TOP =
  'M 0 0 V 0 Q 50 0 100 0 V 0 Z';

export function CurveSwipeTransition() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const target = document.querySelector<HTMLElement>(
      '[data-curve-swipe-target]',
    );
    const path = svg?.querySelector<SVGPathElement>(
      '[data-curve-swipe-path]',
    );

    if (!svg || !target || !path) return;

    // Keep the transition invisible for reduced-motion users.
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // The wave rises from the bottom and covers the viewport.
      timeline
        .to(path, {
          morphSVG: BOTTOM_WAVE,
          duration: 1,
          ease: 'power2.in',
        })
        .to(path, {
          morphSVG: FULL_SCREEN,
          duration: 1,
          ease: 'power2.out',
        })
        // The wave then retreats and reveals Four Houses.
        .to(path, {
          morphSVG: TOP_WAVE,
          duration: 1,
          ease: 'power2.in',
        })
        .to(path, {
          morphSVG: EMPTY_TOP,
          duration: 1,
          ease: 'power2.out',
        });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="
        pointer-events-none fixed inset-0
        z-[40] h-[100svh] w-screen
      "
    >
      <defs>
        <linearGradient
          id="smb-curve-gradient"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#6F1017" />
          <stop offset="60%" stopColor="#A20D10" />
          <stop offset="100%" stopColor="#DDAF54" />
        </linearGradient>
      </defs>

      <path
        data-curve-swipe-path
        d={EMPTY_BOTTOM}
        fill="url(#smb-curve-gradient)"
      />
    </svg>
  );
}
