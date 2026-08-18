'use client';

import { useEffect } from 'react';

/**
 * Signals that React actually hydrated. The inline head script watches for this
 * and, if it never arrives, un-gates the scroll-reveal CSS so the page is fully
 * readable even when the bundle fails to load or execute.
 */
export default function MotionGate() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = '1';
  }, []);
  return null;
}
