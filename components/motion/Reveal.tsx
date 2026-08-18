'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

/**
 * Reveals its children once, the first time they scroll into view, then stops
 * observing. It never re-triggers on scroll-back and never gates reading:
 * anything already inside the viewport on load is shown immediately.
 */
export function useInView<T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer (very old browser) or reduced motion: show it, skip the work.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.unobserve(entry.target); // once only
      },
      { rootMargin, threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant,
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger in ms. Keep sequences under ~400ms total so nothing is waited on. */
  delay?: number;
  variant?: 'left' | 'scale';
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const v = variant === 'left' ? 'reveal-left' : variant === 'scale' ? 'reveal-scale' : '';

  return (
    <Tag
      ref={ref}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={`reveal ${v} ${inView ? 'is-in' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
