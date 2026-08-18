'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from './Reveal';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts up to `to` once, when scrolled into view. Renders the final value
 * server-side so the number is correct with JS off, and uses tabular figures
 * so the layout does not jitter while it runs.
 */
export default function Counter({
  to,
  duration = 1100,
  prefix = '',
  suffix = '',
  className = '',
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  // Eager margin: fire while the number is still just below the fold. The default
  // -12% margin left the hero stats reading "0" whenever they landed at the fold
  // edge, and a wrong figure on screen is worse than a skipped count-up.
  const { ref, inView } = useInView<HTMLSpanElement>('0px 0px 25% 0px');
  const [value, setValue] = useState(to);
  const started = useRef(false);

  // Only drop to zero once we know JS is driving; otherwise the SSR'd final
  // value stands.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!started.current) setValue(0);
  }, []);

  useEffect(() => {
    if (!inView || started.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }
    started.current = true;

    let raf = 0;
    let t0 = 0;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / duration);
      setValue(Math.round(easeOut(p) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // rAF is throttled to a near halt in a backgrounded tab, which can strand the
    // count partway. These are factual claims about the institution, so a wrong
    // number left on screen is worse than a skipped animation — snap to the truth.
    const settle = setTimeout(() => setValue(to), duration + 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`.trim()}>
      {prefix}
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
