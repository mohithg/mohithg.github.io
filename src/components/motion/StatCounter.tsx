import { useEffect, useRef } from 'react';
import { animate, useInView, useMotionValue, useTransform, useReducedMotion } from 'motion/react';

type Props = {
  to: number;
  suffix?: string;
  duration?: number;
};

// Counts from 0 to `to` with spring smoothing when scrolled into view.
export default function StatCounter({ to, suffix = '', duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const v = useMotionValue(0);
  const display = useTransform(v, (n) => Math.round(n).toString() + suffix);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      v.set(to);
      return;
    }
    const ctl = animate(v, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => ctl.stop();
  }, [inView, reduce, to, duration, v]);

  useEffect(() => {
    return display.on('change', (s) => {
      if (ref.current) ref.current.textContent = s;
    });
  }, [display]);

  return <span ref={ref}>0{suffix}</span>;
}
